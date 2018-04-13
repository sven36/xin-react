export default function (markup, name) {
  const IS_DEV = process.env.NODE_ENV !== 'production' ? true : false;
  const assets = require(process.env.ASSETS_MANIFEST);

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,viewport-fit=cover">
    <meta name="format-detection" content="telephone=no">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="wap-font-scale" content="no">
    <meta content="white" name="apple-mobile-web-app-status-bar-style">
    <meta content="yes" name="apple-mobile-web-app-capable">
    <link rel="shortcut icon" href="${IS_DEV ? 'http://localhost:3001/static/media/favicon.ico' : '/static/media/favicon.ico'}" />
  </head>
  <body>
    <div id="root" class="st">${markup}</div>
  <script>
   window.__REDUX_DATA__ = ${JSON.stringify('')};
  </script>
  <script src="${IS_DEV ? 'http://localhost:3001/static/js/runtime.js' : assets['runtime.js']}"></script>
  <script src="${IS_DEV ? 'http://localhost:3001/static/js/vendor.js' : assets['vendor.js']}"></script>
  <script src="${IS_DEV ? `http://localhost:3001/static/js/${name}.js` : assets[`${name}.js`]}"></script>
  </body>
  </html>
`;
};
