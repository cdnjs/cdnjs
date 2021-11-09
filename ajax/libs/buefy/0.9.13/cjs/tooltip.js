'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_26 = require('./chunk-34949503.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_26.Tooltip);
  }
};
__chunk_5.use(Plugin);

exports.BTooltip = __chunk_26.Tooltip;
exports.default = Plugin;
