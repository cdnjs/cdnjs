'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./chunk-1bb51959.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_14 = require('./chunk-cd6f631e.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_14.Field);
  }
};
__chunk_5.use(Plugin);

exports.BField = __chunk_14.Field;
exports.default = Plugin;
