'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Field = require('./Field-ed10a252.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./config-8cfb5a4a.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Field.Field);
  }
};
plugins.use(Plugin);

exports.BField = Field.Field;
exports["default"] = Plugin;
