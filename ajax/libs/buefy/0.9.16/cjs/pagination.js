'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-45739695.js');
require('./helpers.js');
require('./chunk-9103eeda.js');
require('./chunk-73f8eef8.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_26 = require('./chunk-545e1c7f.js');

var Plugin = {
  install: function install(Vue) {
    __chunk_5.registerComponent(Vue, __chunk_26.Pagination);
    __chunk_5.registerComponent(Vue, __chunk_26.PaginationButton);
  }
};
__chunk_5.use(Plugin);

exports.BPagination = __chunk_26.Pagination;
exports.BPaginationButton = __chunk_26.PaginationButton;
exports.default = Plugin;
