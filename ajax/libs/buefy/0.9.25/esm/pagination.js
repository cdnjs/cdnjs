import './chunk-851d1b8f.js';
import './helpers.js';
import './chunk-10ce22e9.js';
import './chunk-136c8df7.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-ee230468.js';
export { P as BPagination, a as BPaginationButton } from './chunk-ee230468.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
