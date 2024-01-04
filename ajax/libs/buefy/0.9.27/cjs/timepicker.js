'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Timepicker = require('./Timepicker-97ff2e5c.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./TimepickerMixin-6c1a4ab4.js');
require('./FormElementMixin-193a88b8.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');
require('./DropdownItem-697c9f73.js');
require('./trapFocus-261420b0.js');
require('./InjectedChildMixin-d6bf7f91.js');
require('./Input-b2ccdc17.js');
require('./Icon-78961800.js');
require('./Field-4557b10c.js');
require('./Select-2b3879bc.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Timepicker.Timepicker);
  }
};
plugins.use(Plugin);

exports.BTimepicker = Timepicker.Timepicker;
exports["default"] = Plugin;
