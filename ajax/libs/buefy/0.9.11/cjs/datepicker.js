'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-6a1bcdab.js');
require('./chunk-93375e49.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-64d0a112.js');
require('./chunk-bf413553.js');
require('./chunk-ae7e641a.js');
require('./chunk-b12ed562.js');
require('./chunk-0655ffed.js');
require('./chunk-e28fd249.js');
var __chunk_16 = require('./chunk-28e5bfba.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
