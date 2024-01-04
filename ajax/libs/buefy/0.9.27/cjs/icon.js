'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Icon = require('./Icon-78961800.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Icon.Icon);
  }
};
plugins.use(Plugin);

exports.BIcon = Icon.Icon;
exports["default"] = Plugin;
