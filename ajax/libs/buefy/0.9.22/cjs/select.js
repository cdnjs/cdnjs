'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-437dd7a0.js');
require('./chunk-fb8ff6be.js');
require('./chunk-a6b29437.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_17 = require('./chunk-e90b3d05.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_17.Select);
  }
};
__chunk_5.use(Plugin);

exports.BSelect = __chunk_17.Select;
exports.default = Plugin;
