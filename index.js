const HtmlWebpackPlugin = require("html-webpack-plugin");

function getHeadAndBodyChunks(chunks) {
  const headChunks = [];
  const bodyChunks = [];

  chunks.forEach(chunk => {
    if (chunk.attributes && ((chunk.attributes.src && chunk.attributes.src.includes("_head")) || chunk.attributes.href)) {
      headChunks.push(chunk);
    } else {
      bodyChunks.push(chunk);
    }
  });

  return {headChunks, bodyChunks};
}

function addAttributesToTag(tag, name, attributes) {
  if (tag.attributes.src) {
    const regex = new RegExp(`(\/${name}\\.)|(${name}\\.)`);
    if (tag.attributes.src.match(regex)) {
      tag.attributes = {...tag.attributes, ...attributes}
    }
  }
}

function handleChunksConfig(data, tags) {
  if (data.plugin.options.chunksConfig) {
    const asyncNames = data.plugin.options.chunksConfig.async;
    const deferNames = data.plugin.options.chunksConfig.defer;

    if(asyncNames && typeof asyncNames === "object" && asyncNames.length){
      tags.forEach(tag => {
        // add async only on script tags.
        if (!tag.attributes.href && tag.attributes.src) {
          asyncNames.forEach(name => {
            addAttributesToTag(tag, name, {async: true});
          });
        }
      });
    }

    if(deferNames && typeof deferNames === "object" && deferNames.length){
      tags.forEach(tag => {
        // add defer only on script tags.
        if (!tag.attributes.href && tag.attributes.src) {
          deferNames.forEach(name => {
            addAttributesToTag(tag, name, {defer: true});
          })
        }
      });
    }
  }
}

class HtmlWebpackInjectorPlugin {
  apply(compiler) {
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (HtmlWebpackPlugin.getHooks) {
      compiler.hooks.compilation.tap('HtmlWebpackInjectorPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'HtmlWebpackInjectorPlugin', (data, callback) => {

            const tags = [...data.bodyTags, ...data.headTags];
            handleChunksConfig(data, tags);
            const chunks = getHeadAndBodyChunks(tags);

            data.headTags = chunks.headChunks;
            data.bodyTags = chunks.bodyChunks;

            callback(null, data)
          }
        )
      });
    } else {
      // HtmlWebpackPlugin version 3.2.0
      compiler.plugin("compilation", compilation => {
        compilation.plugin("html-webpack-plugin-alter-asset-tags", data => {

          const tags = [...data.body, ...data.head];
          handleChunksConfig(data, tags);
          const chunks = getHeadAndBodyChunks(tags);

          data.head = chunks.headChunks;
          data.body = chunks.bodyChunks;
        });
      });
    }
  }
}

module.exports = HtmlWebpackInjectorPlugin;
