'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-87a116d9.js');
require('./chunk-73f8eef8.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_17 = require('./chunk-1f7e4ed3.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_17.Select);
  }
};
__chunk_5.use(Plugin);

exports.BSelect = __chunk_17.Select;
exports.default = Plugin;
