'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Button = require('./Button-01827709.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./Icon-78961800.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Button.Button);
  }
};
plugins.use(Plugin);

exports.BButton = Button.Button;
exports["default"] = Plugin;
