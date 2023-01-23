import { Compiler, WebpackPluginInstance } from 'webpack';
import { } from 'html-webpack-plugin';

declare module 'html-webpack-plugin' {
  export interface Options extends InjectorOptions { }
}

export interface InjectorOptions {
  chunksConfig?: {
    async?: string[],
    defer?: string[],
    removeDefer?: string[],
  }
}

export default class HtmlWebpackInjectorPlugin implements WebpackPluginInstance {
  [index: string]: any;
  apply: (compiler: Compiler) => void;
}