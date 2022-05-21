import './chunk-455cdeae.js';
import './helpers.js';
import './chunk-e92e3389.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-60a03517.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-ade5b253.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-ade5b253.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
