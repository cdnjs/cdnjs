'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Select = require('./Select-DayPKwCY.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./Icon-lsDKE2wQ.js');
require('./config-DR826Ki2.js');
require('./helpers.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');
require('./CompatFallthroughMixin-hhK0Gkhr.js');
require('./FormElementMixin-DavX4iOv.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Select.BSelect);
  }
};

exports.BSelect = Select.BSelect;
exports.default = Plugin;
