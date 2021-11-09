'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-9e4cf4c5.js');
require('./chunk-d120e215.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-f5106717.js');
var __chunk_7 = require('./chunk-30670fac.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
