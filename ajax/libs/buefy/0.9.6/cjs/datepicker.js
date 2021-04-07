'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-1bb51959.js');
require('./chunk-2e522c9c.js');
require('./chunk-6d6da562.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-92656c77.js');
require('./chunk-9f70be3b.js');
require('./chunk-ae7e641a.js');
require('./chunk-a388c6c8.js');
require('./chunk-cd6f631e.js');
require('./chunk-7bfbb52d.js');
var __chunk_16 = require('./chunk-af3ad914.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
