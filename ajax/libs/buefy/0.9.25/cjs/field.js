'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./chunk-6654fbbd.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_16 = require('./chunk-af3b1a16.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Field);
  }
};
__chunk_5.use(Plugin);

exports.BField = __chunk_16.Field;
exports.default = Plugin;
