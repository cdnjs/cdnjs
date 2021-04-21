'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
require('./helpers.js');
require('./chunk-1bb51959.js');
require('./chunk-330693d5.js');
require('./chunk-7f8af05c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-99088816.js');
require('./chunk-21985800.js');
require('./chunk-ae7e641a.js');
require('./chunk-026b445c.js');
require('./chunk-cd6f631e.js');
require('./chunk-e7833c70.js');
var __chunk_16 = require('./chunk-ce6abaaa.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_16.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_16.Datepicker;
exports.default = Plugin;
