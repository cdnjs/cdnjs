'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-c0adb618.js');
require('./chunk-1061ac68.js');
require('./chunk-d7d30e52.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_17 = require('./chunk-0d901f36.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_17.Select);
  }
};
__chunk_5.use(Plugin);

exports.BSelect = __chunk_17.Select;
exports.default = Plugin;
