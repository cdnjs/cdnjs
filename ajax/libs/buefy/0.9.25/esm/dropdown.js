import './chunk-851d1b8f.js';
import './helpers.js';
import './chunk-10ce22e9.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-a67eba42.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-a4483055.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-a4483055.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
