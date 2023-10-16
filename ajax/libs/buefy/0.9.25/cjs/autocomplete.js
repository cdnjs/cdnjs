'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-6654fbbd.js');
require('./chunk-ad4b0b18.js');
require('./chunk-6543eeb8.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-d99687e8.js');
var __chunk_7 = require('./chunk-25752dce.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
