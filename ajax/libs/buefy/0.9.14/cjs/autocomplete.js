'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-c0adb618.js');
require('./chunk-1061ac68.js');
require('./chunk-d7d30e52.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-74fb31db.js');
var __chunk_7 = require('./chunk-2a2403f9.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_7.Autocomplete);
  }
};
__chunk_5.use(Plugin);

exports.BAutocomplete = __chunk_7.Autocomplete;
exports.default = Plugin;
