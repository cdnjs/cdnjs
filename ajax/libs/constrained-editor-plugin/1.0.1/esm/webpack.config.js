//ignorei18n_start
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const SRC_PATH = '../src';
const ESM_FOLDER_PATH = '../dist/esm';
const DIST_PATH = '../dist';
const MAIN_INPUT_NAME = 'constrainedEditor';
const OUTPUT_NAME = 'constrainedEditorPlugin';
module.exports = [{
  mode: 'none',
  target: 'web',
  devtool: "source-map",
  entry: {
    [OUTPUT_NAME]: path.join(__dirname, SRC_PATH, MAIN_INPUT_NAME + '.js'),
  },
  output: {
    filename: process.env.MODE === 'production' ? '[name].min.js' : '[name].js',
    library: {
      name: [MAIN_INPUT_NAME],
      type: 'window',
      export: 'default'
    },
  }
}, {
  entry: {},
  mode: "none",
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, SRC_PATH),
          globOptions: {
            ignore: ["webpack.config.js"]
          },
          to: path.join(__dirname, ESM_FOLDER_PATH)
        }
      ]
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.join(__dirname, SRC_PATH, MAIN_INPUT_NAME + '.css'),
          to: path.join(__dirname, DIST_PATH, OUTPUT_NAME + '.css')
        }
      ]
    })
  ]
}];
//ignorei18n_end