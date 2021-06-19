import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-652f2dad.js';
import './chunk-7fd02ffe.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-56040896.js';
export { P as BPagination, a as BPaginationButton } from './chunk-56040896.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
