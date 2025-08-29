'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Pagination = require('./Pagination-D1MVdiLp.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('vue');
require('./config-DR826Ki2.js');
require('./_plugin-vue_export-helper-Die8u8yB.js');
require('./Icon-lsDKE2wQ.js');
require('./helpers.js');

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Pagination.BPagination);
    plugins.registerComponent(Vue, Pagination.PaginationButton);
  }
};

exports.BPagination = Pagination.BPagination;
exports.BPaginationButton = Pagination.PaginationButton;
exports.default = Plugin;
