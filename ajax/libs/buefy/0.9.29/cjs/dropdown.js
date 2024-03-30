'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var DropdownItem = require('./DropdownItem-422f8c34.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./trapFocus-261420b0.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');
require('./InjectedChildMixin-d6bf7f91.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, DropdownItem.Dropdown);
    plugins.registerComponent(Vue, DropdownItem.DropdownItem);
  }
};
plugins.use(Plugin);

exports.BDropdown = DropdownItem.Dropdown;
exports.BDropdownItem = DropdownItem.DropdownItem;
exports["default"] = Plugin;
