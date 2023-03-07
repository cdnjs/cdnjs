'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-437dd7a0.js');
require('./chunk-fb8ff6be.js');
require('./chunk-a6b29437.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_6 = require('./chunk-a39776c7.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_6.Input);
  }
};
__chunk_5.use(Plugin);

exports.BInput = __chunk_6.Input;
exports.default = Plugin;
