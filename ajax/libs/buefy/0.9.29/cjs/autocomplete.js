'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Autocomplete = require('./Autocomplete-7a39c5ce.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./helpers.js');
require('./FormElementMixin-193a88b8.js');
require('./config-8cfb5a4a.js');
require('./Input-e5a72d97.js');
require('./Icon-78961800.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Autocomplete.Autocomplete);
  }
};
plugins.use(Plugin);

exports.BAutocomplete = Autocomplete.Autocomplete;
exports["default"] = Plugin;
