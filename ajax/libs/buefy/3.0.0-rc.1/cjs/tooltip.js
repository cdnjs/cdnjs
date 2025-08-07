'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Tooltip = require('./Tooltip-Cgighv0j.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./config-DR826Ki2.js');
require('./helpers.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Tooltip.Tooltip);
  }
};

exports.BTooltip = Tooltip.Tooltip;
exports.default = Plugin;
