# @hyfi06/html2pdf

Create pdf from html string. Express middleware.

## Install

```bash
npm install --save @hyfi06/html2pdf
```

## Examples

```js
const express = require("express");
const app = express();
const pdf = require("../index");

app.use(pdf);

app.use("/pdf", async function (req, res) {
  try {
    await res.html2pdf({
      filename: "example.pdf",
      htmlString: "<html><body>example</body></html>",
    });
  } catch (err) {
    console.log(err);
  }
});

app.listen(3000, function () {
  console.log("Listening http://localhost:3000");
});
```

Using express router:

```js
const express = require("express");
const pdf = require("../index");

function pdfApi(app) {
  const router = express.Router();
  app.use("/pdf");

  router.get("/", pdf, async function (req, res) {
    try {
      await res.html2pdf({
        filename: "example.pdf",
        htmlString: "<html><body>example</body></html>",
      });
    } catch (err) {
      console.log(err);
    }
  });
}

module.exports = pdfApi;
```

## Options and args

```js
res.html2pdf({
      filename: '',
      htmlString: ',
      [options],
      [launchArgs]
    });
```

- `options` <[Object]> Options object which might have the following properties:
  - `scale` <[number]> Scale of the webpage rendering. Defaults to `1`. Scale amount must be between 0.1 and 2.
  - `displayHeaderFooter` <[boolean]> Display header and footer. Defaults to `false`.
  - `headerTemplate` <[string]> HTML template for the print header. Should be valid HTML markup with following classes used to inject printing values into them:
    - `date` formatted print date
    - `title` document title
    - `url` document location
    - `pageNumber` current page number
    - `totalPages` total pages in the document
  - `footerTemplate` <[string]> HTML template for the print footer. Should use the same format as the `headerTemplate`.
  - `printBackground` <[boolean]> Print background graphics. Defaults to `false`.
  - `landscape` <[boolean]> Paper orientation. Defaults to `false`.
  - `pageRanges` <[string]> Paper ranges to print, e.g., '1-5, 8, 11-13'. Defaults to the empty string, which means print all pages.
  - `format` <[string]> Paper format. If set, takes priority over `width` or `height` options. Defaults to 'Letter'.
  - `width` <[string]|[number]> Paper width, accepts values labeled with units.
  - `height` <[string]|[number]> Paper height, accepts values labeled with units.
  - `margin` <[Object]> Paper margins, defaults to none.
    - `top` <[string]|[number]> Top margin, accepts values labeled with units.
    - `right` <[string]|[number]> Right margin, accepts values labeled with units.
    - `bottom` <[string]|[number]> Bottom margin, accepts values labeled with units.
    - `left` <[string]|[number]> Left margin, accepts values labeled with units.
  - `preferCSSPageSize` <[boolean]> Give any CSS `@page` size declared in the page priority over what is declared in `width` and `height` or `format` options. Defaults to `false`, which will scale the content to fit the paper size.

[See puppeteer docs](https://github.com/puppeteer/puppeteer/blob/v3.1.0/docs/api.md#pagepdfoptions).

- `launchArgs` <[Array]<[string]> Additional arguments to pass to the browser instance. The list of Chromium flags can be found [here](http://peter.sh/experiments/chromium-command-line-switches/), and here is the list of [Firefox flags](https://developer.mozilla.org/en-US/docs/Mozilla/Command_Line_Options).

## Licence

Licensed under the [MIT License](https://github.com/hyfi06/node-html2pdf/blob/master/LICENSE).
