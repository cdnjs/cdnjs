'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./chunk-437dd7a0.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_16 = require('./chunk-4702fda4.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Field);
  }
};
__chunk_5.use(Plugin);

exports.BField = __chunk_16.Field;
exports.default = Plugin;
