'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Datepicker = require('./Datepicker-680659bc.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./FormElementMixin-193a88b8.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');
require('./DropdownItem-422f8c34.js');
require('./trapFocus-261420b0.js');
require('./InjectedChildMixin-d6bf7f91.js');
require('./Input-e5a72d97.js');
require('./Icon-78961800.js');
require('./Field-4557b10c.js');
require('./Select-2b3879bc.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Datepicker.Datepicker);
  }
};
plugins.use(Plugin);

exports.BDatepicker = Datepicker.Datepicker;
exports["default"] = Plugin;
