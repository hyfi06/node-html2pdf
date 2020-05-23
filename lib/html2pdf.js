const puppeteer = require('puppeteer');
const fs = require('fs');


/**
 * Create a stream pdf from html string
 * @param {string} content html string
 * @param {Object} options options of puppeteer pdf
 * @returns {ReadStream} stream of pdf
 */
const html2pdf = async (content, options) => {
  if (options) {
    delete options.path;
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--disable-file-system',
    ]
  });

  const page = await browser.newPage();

  await page.setJavaScriptEnabled(false);
  await page.setContent(content);
  await page.emulateMediaType('print');
  const buffer = await page.pdf(options);
  await browser.close();

  const stream = fs.createReadStream(buffer);

  return stream;
};


module.exports = html2pdf;