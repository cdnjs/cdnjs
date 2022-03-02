'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-87a116d9.js');
require('./chunk-73f8eef8.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-5058e659.js');
require('./chunk-841c0e0f.js');
require('./chunk-ae7e641a.js');
require('./chunk-03279fd8.js');
require('./chunk-c8abb3ed.js');
require('./chunk-1f7e4ed3.js');
var __chunk_19 = require('./chunk-779e6a5d.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_19.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_19.Datepicker;
exports.default = Plugin;
