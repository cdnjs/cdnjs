'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Field = require('./Field-19ZCJFF8.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./config-DR826Ki2.js');
require('./helpers.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Field.Field);
  }
};

exports.BField = Field.Field;
exports.default = Plugin;
