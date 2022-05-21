import './chunk-455cdeae.js';
import './helpers.js';
import './chunk-e92e3389.js';
import './chunk-7e17a637.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { P as Pagination, a as PaginationButton } from './chunk-c5284276.js';
export { P as BPagination, a as BPaginationButton } from './chunk-c5284276.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Pagination);
    registerComponent(Vue, PaginationButton);
  }
};
use(Plugin);

export default Plugin;
