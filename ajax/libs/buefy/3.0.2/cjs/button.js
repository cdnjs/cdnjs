'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Button = require('./Button-Cq7yqI8p.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./Icon-lsDKE2wQ.js');
require('./config-DR826Ki2.js');
require('./helpers.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Button.BButton);
  }
};

exports.BButton = Button.BButton;
exports.default = Plugin;
