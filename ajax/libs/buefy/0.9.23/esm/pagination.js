import './chunk-851d1b8f.js';
import './helpers.js';
import './chunk-e92e3389.js';
import './chunk-4b289821.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-048831a9.js';
export { P as BPagination, a as BPaginationButton } from './chunk-048831a9.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
