'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-60255743.js');
require('./chunk-a3692b4c.js');
require('./chunk-3acb500b.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-b31bdce7.js');
require('./chunk-dcdbe2e8.js');
require('./chunk-ae7e641a.js');
require('./chunk-6c490ddf.js');
require('./chunk-adb01a93.js');
require('./chunk-6963051d.js');
var __chunk_16 = require('./chunk-34b36649.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
