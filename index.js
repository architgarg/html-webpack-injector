const HtmlWebpackPlugin = require("html-webpack-plugin");

class HtmlWebpackInjectorPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlWebpackInjectorPlugin', (compilation) => {
            HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
              'HtmlWebpackInjectorPlugin',
              (data, callback) => {
                  const chunks = [...data.headTags, ...data.bodyTags];
                  const headChunks = [];
                  const bodyChunks = [];

                  chunks.forEach(chunk => {
                      if (chunk.attributes.src.includes("_head")) {
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
        })
    }
}

module.exports = HtmlWebpackInjectorPlugin;