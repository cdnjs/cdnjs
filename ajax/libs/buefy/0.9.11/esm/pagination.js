import './chunk-2452e3d3.js';
import './helpers.js';
import './chunk-8ed29c41.js';
import './chunk-bd411d56.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-56fb1149.js';
export { P as BPagination, a as BPaginationButton } from './chunk-56fb1149.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
