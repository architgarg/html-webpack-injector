const HtmlWebpackPlugin = require("html-webpack-plugin");

class HtmlWebpackInjectorPlugin {
  apply(compiler) {
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (HtmlWebpackPlugin.getHooks) {
      compiler.hooks.compilation.tap('HtmlWebpackInjectorPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'HtmlWebpackInjectorPlugin',
          (data, callback) => {
            const chunks = [...data.headTags, ...data.bodyTags];
            const headChunks = [];
            const bodyChunks = [];

            chunks.forEach(chunk => {
              if (chunk.attributes.src && chunk.attributes.src.includes("_head")) {
                headChunks.push(chunk);
              } else {
                bodyChunks.push(chunk);
              }
            });

            data.headTags = headChunks;
            data.bodyTags = bodyChunks;

            callback(null, data)
          }
        )
      });
    } else {
      // HtmlWebpackPlugin version 3.2.0
      compiler.plugin("compilation", compilation => {
        compilation.plugin("html-webpack-plugin-alter-asset-tags", object => {
          const chunks = [...object.head, ...object.body];
          const headChunks = [];
          const bodyChunks = [];

          chunks.forEach(chunk => {
            if (chunk.attributes.src.includes("_head")) {
              headChunks.push(chunk);
            } else {
              bodyChunks.push(chunk);
            }
          });

          object.head = headChunks;
          object.body = bodyChunks;
        });
      });
    }
  }
}

module.exports = HtmlWebpackInjectorPlugin;