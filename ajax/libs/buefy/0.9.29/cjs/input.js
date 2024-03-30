'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Input = require('./Input-e5a72d97.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./Icon-78961800.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');
require('./FormElementMixin-193a88b8.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Input.Input);
  }
};
plugins.use(Plugin);

exports.BInput = Input.Input;
exports["default"] = Plugin;
