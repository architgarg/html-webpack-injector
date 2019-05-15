const HtmlWebpackPlugin = require("html-webpack-plugin");

function getHeadAndBodyChunks(chunks) {
  const headChunks = [];
  const bodyChunks = [];

  chunks.forEach(chunk => {
    if (chunk.attributes.src && chunk.attributes.src.includes("_head")) {
      headChunks.push(chunk);
    } else {
      bodyChunks.push(chunk);
    }
  });

  return {headChunks, bodyChunks};
}

class HtmlWebpackInjectorPlugin {
  apply(compiler) {
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (HtmlWebpackPlugin.getHooks) {
      compiler.hooks.compilation.tap('HtmlWebpackInjectorPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'HtmlWebpackInjectorPlugin', (data, callback) => {

            const ch = getHeadAndBodyChunks([...data.headTags, ...data.bodyTags]);

            data.headTags = ch.headChunks;
            data.bodyTags = ch.bodyChunks;

            callback(null, data)
          }
        )
      });
    } else {
      // HtmlWebpackPlugin version 3.2.0
      compiler.plugin("compilation", compilation => {
        compilation.plugin("html-webpack-plugin-alter-asset-tags", data => {

          const ch = getHeadAndBodyChunks([...data.head, ...data.body]);

          data.head = ch.headChunks;
          data.body = ch.bodyChunks;
        });
      });
    }
  }
}

module.exports = HtmlWebpackInjectorPlugin;