'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Image = require('./Image-c4bcd9b3.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Image.Image);
  }
};
plugins.use(Plugin);

exports.BImage = Image.Image;
exports["default"] = Plugin;
