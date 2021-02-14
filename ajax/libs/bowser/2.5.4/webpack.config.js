const path = require('path');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  plugins: [
    new CompressionPlugin(),
  ],
  mode: 'production', // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    bundled: ['@babel/polyfill', './src/bowser.js'],
    es5: './src/bowser.js',
  }, // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path: path.resolve(__dirname, './'), // string
    // the target directory for all output files
    // must be an absolute path (use the Node.js path module)
    filename: '[name].js', // string
    // the filename template for entry chunks
    library: 'bowser',
    libraryTarget: 'umd', // universal module definition
    // the type of the exported library
    globalObject: 'this',
  },
  module: {
    // configuration regarding modules
    rules: [
      // rules for modules (configure loaders, parser options, etc.)
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};
