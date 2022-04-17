import './chunk-455cdeae.js';
import './helpers.js';
import './chunk-8ed29c41.js';
import './chunk-e044aa02.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-1a4fde6d.js';
export { P as BPagination, a as BPaginationButton } from './chunk-1a4fde6d.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
