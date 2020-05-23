const express = require('express');
const app = express();
const pdf = require('../index');

app.use(pdf);


app.use('/pdf', async function (req, res) {
  try {
    await res.html2pdf({
      filename: 'example.pdf',
      htmlString: '<html><body>example</body></html>',
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log('Listening http://localhost:3000');
});