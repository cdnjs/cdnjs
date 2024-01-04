import { S as Select } from './Select-97781d4e.js';
export { S as BSelect } from './Select-97781d4e.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './Icon-60d47b31.js';
import './config-e7d4b9c2.js';
import './helpers.js';
import './FormElementMixin-b223d3c7.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Select);
  }
};
use(Plugin);

export { Plugin as default };
