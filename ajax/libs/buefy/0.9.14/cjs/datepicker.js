'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-c0adb618.js');
require('./chunk-1061ac68.js');
require('./chunk-d7d30e52.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-74fb31db.js');
require('./chunk-eb8d954b.js');
require('./chunk-ae7e641a.js');
require('./chunk-02406b6a.js');
require('./chunk-a267720d.js');
require('./chunk-0d901f36.js');
var __chunk_18 = require('./chunk-e8dc6270.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_18.Datepicker);
  }
};
__chunk_5.use(Plugin);

exports.BDatepicker = __chunk_18.Datepicker;
exports.default = Plugin;
