import { a as Dropdown, D as DropdownItem } from './DropdownItem-55682322.js';
export { a as BDropdown, D as BDropdownItem } from './DropdownItem-55682322.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './trapFocus-f0736873.js';
import './config-e7d4b9c2.js';
import './helpers.js';
import './InjectedChildMixin-b4220787.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Dropdown);
    registerComponent(Vue, DropdownItem);
  }
};
use(Plugin);

export { Plugin as default };
