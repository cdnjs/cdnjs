'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-19c14f30.js');
require('./chunk-02ea522d.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-9a5bee11.js');
require('./chunk-a18d4d4d.js');
require('./chunk-ae7e641a.js');
require('./chunk-64612b38.js');
require('./chunk-592c7eb7.js');
require('./chunk-3242100a.js');
var __chunk_19 = require('./chunk-e639659a.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_19.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_19.Datepicker;
exports.default = Plugin;
