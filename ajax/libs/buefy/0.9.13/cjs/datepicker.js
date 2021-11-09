'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-9e4cf4c5.js');
require('./chunk-d120e215.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-f5106717.js');
require('./chunk-3cc5d9a6.js');
require('./chunk-ae7e641a.js');
require('./chunk-c6fbc7b4.js');
require('./chunk-7da0c017.js');
require('./chunk-114191ae.js');
var __chunk_18 = require('./chunk-2911aa4b.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_18.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_18.Datepicker;
exports.default = Plugin;
