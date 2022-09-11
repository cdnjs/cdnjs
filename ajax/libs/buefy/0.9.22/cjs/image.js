'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-437dd7a0.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_10 = require('./chunk-e0373ab6.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_10.Image);
  }
};
__chunk_5.use(Plugin);

exports.BImage = __chunk_10.Image;
exports.default = Plugin;
