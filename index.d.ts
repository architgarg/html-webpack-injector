import { type WebpackPluginInstance } from 'webpack';

declare module "html-webpack-plugin" {
  declare namespace HtmlWebpackPlugin {
    interface Options {
      chunksConfig: {
        async: string[],
        defer: string[],
        removeDefer: string[],
      }
    }
  }
}

class HtmlWebpackInjectorPlugin implements WebpackPluginInstance { }

module.exports = HtmlWebpackInjectorPlugin;
