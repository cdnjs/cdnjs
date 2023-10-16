'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-6654fbbd.js');
require('./chunk-ad4b0b18.js');
require('./chunk-6543eeb8.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-d99687e8.js');
require('./chunk-a18d4d4d.js');
require('./chunk-ae7e641a.js');
require('./chunk-ff5384ad.js');
require('./chunk-af3b1a16.js');
require('./chunk-e258ed29.js');
var __chunk_19 = require('./chunk-ddb5e420.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_19.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_19.Datepicker;
exports.default = Plugin;
