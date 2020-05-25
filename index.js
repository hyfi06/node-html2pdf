/* 
Copyright (c) 2020 Hector Olvera-Vital
Licensed under the MIT License
*/
const HTML2PDF = require('./lib/html2pdf');

/**
 * Check the type of variables
 * @param {Object} res response
 * @param {*} variable value of variable
 * @param {string} type type of variable
 * @param {string} message error message
 */
function typingCheck(res, variable, type, message) {
  if (typeof variable !== `${type}`) {
    res.sendStatus(500).end();
    throw new Error(message);
  }
}

/**
 * Create response with content-type application/pdf and stream
 * @param {*} res response
 * @param {string} filename PDF name
 * @param {string} htmlString PDF content as html string
 * @param {object} options options of puppeteer pdf
 * @param {string[]} lunchArgs args of puppeteer launch
 */
async function createResponse(res, filename, htmlString, options, lunchArgs) {
  res.header('Content-Type', 'application/pdf');
  res.header('Content-Disposition', `inline; filename="${filename}"`);
  res.header('Content-Transfer-Encoding', 'binary');

  const pdfStream = await HTML2PDF(htmlString, options, lunchArgs);

  pdfStream.pipe(res);
  pdfStream.on('end', function () {
    res.end();
  });
}


/**
 * Check params and call response
 * @param {Object} object
 * @param {string} object.filename PDF name
 * @param {string} object.htmlString PDF content as html string
 * @param {Object} object.options options of puppeteer pdf
 * @param {string[]} object.lunchArgs args of puppeteer launch
 */
async function expressHTML2PDF({
  filename = 'file.pdf',
  htmlString,
  options,
  lunchArgs
}) {
  const res = this;

  if (!htmlString) {
    res.sendStatus(500).end();
    throw new Error('htmlString is required', 'htmlString must be a string');
  }

  typingCheck(res, filename, 'string', 'filename must be a string');
  typingCheck(res, htmlString, 'string', 'htmlString must be a string');

  await createResponse(
    res,
    filename,
    htmlString,
    options,
    lunchArgs
  );
}

function PDF(req, res, next) {
  res.html2pdf = expressHTML2PDF;
  next();
}

exports = module.exports = PDF;