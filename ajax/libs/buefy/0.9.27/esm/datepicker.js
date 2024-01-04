import { D as Datepicker } from './Datepicker-f6d7e487.js';
export { D as BDatepicker } from './Datepicker-f6d7e487.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './FormElementMixin-b223d3c7.js';
import './config-e7d4b9c2.js';
import './helpers.js';
import './DropdownItem-05c52fa0.js';
import './trapFocus-f0736873.js';
import './InjectedChildMixin-b4220787.js';
import './Input-7eac11ee.js';
import './Icon-60d47b31.js';
import './Field-3ceba31e.js';
import './Select-97781d4e.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Datepicker);
  }
};
use(Plugin);

export { Plugin as default };
