'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Autocomplete = require('./Autocomplete-DEUs3z7g.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./helpers.js');
require('./CompatFallthroughMixin-hhK0Gkhr.js');
require('./config-DR826Ki2.js');
require('./FormElementMixin-DavX4iOv.js');
require('./Input-BcloGeZ3.js');
require('./Icon-lsDKE2wQ.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Autocomplete.BAutocomplete);
  }
};

exports.BAutocomplete = Autocomplete.BAutocomplete;
exports.default = Plugin;
