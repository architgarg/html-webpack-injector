<div>
  <h1 align="center">HTML Webpack Injector Plugin</h1>
  <p>Plugin that simplifies injection of chunks into <b>head</b> and <b>body</b> using <a href="https://github.com/jantimon/html-webpack-plugin">HtmlWebpackPlugin</a> (with ability to provide async/defer)</p>
</div>

<h2>Installation</h2>

```bash
  npm i --save-dev html-webpack-injector
```

```bash
  yarn add --dev html-webpack-injector
```


This is a [webpack](http://webpack.js.org/) plugin that simplifies injection of chunks in `head` and `body` tags of HTML files using `HtmlWebpackPlugin` to serve your `webpack` bundles. This is especially useful when you want to inject some chunks to head and some chunks to body using HtmlWebpackPlugin.


<h2>Usage</h2>
Suppose you want have `2 chunks` that you want to inject in the html document using HtmlWebpackPlugin. If you want to inject `one chunk in head` and `one chunk in body` of the same html document.

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
    new HtmlWebpackInjector()      // Initialize plugin
  ]
}
```

This will generate a file `dist/index.html` containing the following

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Archit's App</title>
    <script type="text/javascript" src="index_head.bundle.js"></script></head>
  </head>
  <body>
    <script src="index_bundle.js"></script>
  </body>
</html>
```

You have to add `_head` in the entry point chunk name and it will be automatically injected in the head.


<h2>Provide Async Defer (Optional)</h2>
You can specify scripts to be async or defer by adding additional `chunksConfig` option.

 ```js
plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./dist/index.html",
      chunks: ["index", "index_head"],
      chunksConfig: {             // Added option
        async: ["index_head"],    
        defer: ["index"]
      }
    }),
    new HtmlWebpackInjector()     
  ]
```
