'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-60255743.js');
require('./chunk-816cba7a.js');
require('./chunk-3acb500b.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-916a2858.js');
var __chunk_7 = require('./chunk-c902bc8f.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
