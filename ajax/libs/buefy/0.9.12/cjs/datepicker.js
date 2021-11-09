'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-bd1feb6c.js');
require('./chunk-c00639be.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-adaa5792.js');
require('./chunk-2dc027c9.js');
require('./chunk-ae7e641a.js');
require('./chunk-3aaecc36.js');
require('./chunk-7b13241d.js');
require('./chunk-47e1b22b.js');
var __chunk_18 = require('./chunk-d9a33552.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_18.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_18.Datepicker;
exports.default = Plugin;
