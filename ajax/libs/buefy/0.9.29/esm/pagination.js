import { P as Pagination, a as PaginationButton } from './Pagination-68f12c1e.js';
export { P as BPagination, a as BPaginationButton } from './Pagination-68f12c1e.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './config-e7d4b9c2.js';
import './Icon-60d47b31.js';
import './helpers.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export { Plugin as default };
