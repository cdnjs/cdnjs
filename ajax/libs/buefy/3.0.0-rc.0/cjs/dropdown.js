'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Dropdown = require('./Dropdown-DtpKU9qf.js');
var DropdownItem = require('./DropdownItem-IMOKyRGV.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./trapFocus-BlX6xykt.js');
require('./config-DR826Ki2.js');
require('./helpers.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Dropdown.BDropdown);
    plugins.registerComponent(Vue, DropdownItem.BDropdownItem);
  }
};

exports.BDropdown = Dropdown.BDropdown;
exports.BDropdownItem = DropdownItem.BDropdownItem;
exports.default = Plugin;
