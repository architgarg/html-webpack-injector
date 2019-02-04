class HtmlWebpackInjectorPlugin {
    apply(compiler) {
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

module.exports = HtmlWebpackInjectorPlugin;