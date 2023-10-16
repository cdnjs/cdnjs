'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-6654fbbd.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-a18d4d4d.js');
require('./chunk-ae7e641a.js');
var __chunk_15 = require('./chunk-ff5384ad.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_15.Dropdown);
    __chunk_5.registerComponent(Vue, __chunk_15.DropdownItem);
  }
};
__chunk_5.use(Plugin);

exports.BDropdown = __chunk_15.Dropdown;
exports.BDropdownItem = __chunk_15.DropdownItem;
exports.default = Plugin;
