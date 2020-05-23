const express = require('express');
const pdf = require('../index');

function pdfApi(app) {
  const router = express.Router();
  app.use('/pdf');

  router.get('/', pdf, async function (req, res) {
    try {
      await res.html2pdf({
        filename: 'example.pdf',
        htmlString: '<html><body>example</body></html>',
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = pdfApi;