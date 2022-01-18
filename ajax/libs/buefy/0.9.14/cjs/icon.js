'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-c0adb618.js');
var __chunk_4 = require('./chunk-d7d30e52.js');
var __chunk_5 = require('./chunk-13e039f5.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_4.Icon);
  }
};
__chunk_5.use(Plugin);

exports.BIcon = __chunk_4.Icon;
exports.default = Plugin;
