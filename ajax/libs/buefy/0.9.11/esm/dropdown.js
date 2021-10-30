import './chunk-2452e3d3.js';
import './helpers.js';
import './chunk-8ed29c41.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-2ef19b56.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-e2606096.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-e2606096.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
