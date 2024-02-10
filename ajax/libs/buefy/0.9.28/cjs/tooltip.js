'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Tooltip = require('./Tooltip-c1df7ee3.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Tooltip.Tooltip);
  }
};
plugins.use(Plugin);

exports.BTooltip = Tooltip.Tooltip;
exports["default"] = Plugin;
