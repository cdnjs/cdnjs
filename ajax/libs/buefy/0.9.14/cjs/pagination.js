'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
require('./helpers.js');
require('./chunk-c0adb618.js');
require('./chunk-d7d30e52.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_25 = require('./chunk-fbf3566e.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_25.Pagination);
    __chunk_5.registerComponent(Vue, __chunk_25.PaginationButton);
  }
};
__chunk_5.use(Plugin);

exports.BPagination = __chunk_25.Pagination;
exports.BPaginationButton = __chunk_25.PaginationButton;
exports.default = Plugin;
