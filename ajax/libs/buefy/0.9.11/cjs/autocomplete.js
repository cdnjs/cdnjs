'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-6a1bcdab.js');
require('./chunk-93375e49.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-64d0a112.js');
var __chunk_7 = require('./chunk-aed1b295.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
