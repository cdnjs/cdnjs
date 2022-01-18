import './chunk-2452e3d3.js';
import './helpers.js';
import './chunk-8cad1844.js';
import './chunk-ea9bc877.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-bbf5d78a.js';
export { P as BPagination, a as BPaginationButton } from './chunk-bbf5d78a.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
