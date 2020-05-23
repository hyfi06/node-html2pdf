# @hyfi06/html2pdf

Create a pdf from an html. Express middleware.

## Install

```bash
npm install --save @hyfi06/html2pdf
```

## Examples

```js
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
```

Using express router:

```js
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
```

## Licence

Licensed under the [MIT License](https://github.com/hyfi06/node-html2pdf/blob/master/LICENSE).
