/* 
Copyright (c) 2020 Hector Olvera-Vital
Licensed under the MIT License
*/
const HTML2PDF = require('./lib/html2pdf');

/**
 * Check the type of variables
 * @param {Object} res 
 * @param {*} variable 
 * @param {string} type 
 * @param {string} message 
 */
function typingCheck(res, variable, type, message) {
  if (typeof variable !== `${type}`) {
    res.sendStatus(500).end();
    throw new Error(message);
  }
}

/**
 * Create response with content-type application/pdf and stream
 * @param {*} res 
 * @param {string} filename 
 * @param {string} htmlString 
 * @param {object} options 
 */
async function createResponse(res, filename, htmlString, options) {
  res.header('Content-Type', 'application/pdf');
  res.header('Content-Disposition', `inline; filename="${filename}"`);
  res.header('Content-Transfer-Encoding', 'binary');

  const pdfStream = await HTML2PDF(htmlString, options);

  pdfStream.pipe(res);
  pdfStream.on('end', function () {
    res.end();
  });
}


/**
 * Check params and call response
 * @param {Object} object
 * @param {string} object.filename
 * @param {string} object.htmlString
 * @param {Object} object.options
 */
async function expressHTML2PDF({
  filename = 'file.pdf',
  htmlString,
  options,
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
    options
  );
}

function PDF(req, res, next) {
  res.html2pdf = expressHTML2PDF;
  next();
}

exports = module.exports = PDF;