/* 
Copyright (c) 2020 Hector Olvera-Vital
Licensed under the MIT License
*/
const puppeteer = require('puppeteer');
const { Duplex } = require('stream');


/**
 * Create stream pdf from html string
 * @param {string} content html string
 * @param {Object} options options of puppeteer pdf
 * @returns {ReadStream} stream of pdf
 */
const HTML2PDF = async (content, options) => {
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

  const stream = new Duplex();
  stream.push(buffer);
  stream.push(null);

  return stream;
};


module.exports = HTML2PDF;