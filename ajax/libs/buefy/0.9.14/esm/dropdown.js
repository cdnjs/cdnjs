import './chunk-2452e3d3.js';
import './helpers.js';
import './chunk-8cad1844.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-91404fa9.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-b66a83ce.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-b66a83ce.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
