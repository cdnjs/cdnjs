'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-437dd7a0.js');
require('./chunk-fb8ff6be.js');
require('./chunk-a6b29437.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-a39776c7.js');
require('./chunk-841c0e0f.js');
require('./chunk-ae7e641a.js');
require('./chunk-dddb035c.js');
require('./chunk-4702fda4.js');
require('./chunk-e90b3d05.js');
var __chunk_19 = require('./chunk-660b0dfb.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_19.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_19.Datepicker;
exports.default = Plugin;
