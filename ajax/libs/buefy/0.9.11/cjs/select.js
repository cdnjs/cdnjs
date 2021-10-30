'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-6a1bcdab.js');
require('./chunk-93375e49.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_15 = require('./chunk-e28fd249.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_15.Select);
  }
};
__chunk_5.use(Plugin);

exports.BSelect = __chunk_15.Select;
exports.default = Plugin;
