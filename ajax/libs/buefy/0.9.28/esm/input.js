import { I as Input } from './Input-20612b63.js';
export { I as BInput } from './Input-20612b63.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './Icon-60d47b31.js';
import './config-e7d4b9c2.js';
import './helpers.js';
import './FormElementMixin-b223d3c7.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Input);
  }
};
use(Plugin);

export { Plugin as default };
