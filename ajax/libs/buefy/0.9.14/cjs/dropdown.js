'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-c0adb618.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-eb8d954b.js');
require('./chunk-ae7e641a.js');
var __chunk_15 = require('./chunk-02406b6a.js');

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
