'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-9e4cf4c5.js');
require('./chunk-d120e215.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_17 = require('./chunk-114191ae.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_17.Select);
  }
};
__chunk_5.use(Plugin);

exports.BSelect = __chunk_17.Select;
exports.default = Plugin;
