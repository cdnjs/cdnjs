'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Pagination = require('./Pagination-d6b3fb85.js');
var plugins = require('./plugins-7f41b028.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');
require('./config-8cfb5a4a.js');
require('./Icon-78961800.js');
require('./helpers.js');

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Pagination.Pagination);
    plugins.registerComponent(Vue, Pagination.PaginationButton);
  }
};
plugins.use(Plugin);

exports.BPagination = Pagination.Pagination;
exports.BPaginationButton = Pagination.PaginationButton;
exports["default"] = Plugin;
