import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-652f2dad.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import './chunk-1297c2c9.js';
import './chunk-42f463e6.js';
import { D as Dropdown, a as DropdownItem } from './chunk-6714baef.js';
export { D as BDropdown, a as BDropdownItem } from './chunk-6714baef.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export default Plugin;
