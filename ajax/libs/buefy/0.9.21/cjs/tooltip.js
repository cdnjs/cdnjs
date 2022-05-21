'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-437dd7a0.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_18 = require('./chunk-99367591.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_18.Tooltip);
  }
};
__chunk_5.use(Plugin);

exports.BTooltip = __chunk_18.Tooltip;
exports.default = Plugin;
