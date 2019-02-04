[![npm][npm]][npm-url]

<div align="center">
  <h1>HTML Webpack Injector Plugin</h1>
  <p>Plugin that simplifies injection of chunks into head and body using <a src="https://github.com/jantimon/html-webpack-plugin">HtmlWebpackPlugin</a></p>
</div>

<h2 align="center">Installation</h2>

```bash
  npm i --save-dev html-webpack-injector
```

```bash
  yarn add --dev html-webpack-injector
```


This is a [webpack](http://webpack.js.org/) plugin that simplifies injection of chunks in `head` and `body` tags of HTML files using `HtmlWebpackPlugin` to serve your `webpack` bundles. This is especially useful when you want to inject some chunks to head and some chunks to body using HtmlWebpackPlugin.


<h2 align="center">Zero Config</h2>

The `html-webpack-injector` works without configuration.  
- Just add `_head` after the name of the bundles you want to inject in the `head` section.
- All other bundles will be injected at the end of `body` tag.

<h2 align="center">Plugins</h2>

The `html-webpack-injector` is based on the [hooks](https://github.com/jantimon/html-webpack-plugin#events) provided by HtmlWebpackPlugin.

<h2 align="center">Usage</h2>
Suppose you want have 4 chunks that you want to inject in the html document using `HtmlWebpackPlugin`. Now out of these 4 chunks there is 1 chunk that you want to inject in the head.

**webpack.config.js**
```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInjector = require('html-webpack-injector');

module.exports = {
  entry: {
    index: "./index.ts",
    index_head: "./index.css" // add "_head" at the end to inject in head.
  },
  output: {
    path: "./dist",
    filename: "[name].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./dist/index.html",
      chunks: ["index", "index_head"]
    }),
    new HtmlWebpackInjector()
  ]
}
```

This will generate a file `dist/index.html` containing the following

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Webpack App</title>
    <script type="text/javascript" src="index_head.bundle.js"></script></head>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

You have to add `_head` in the entry point chunk name and it will be automatically injected in the head.
