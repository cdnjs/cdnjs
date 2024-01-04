import { F as Field } from './Field-3ceba31e.js';
export { F as BField } from './Field-3ceba31e.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './config-e7d4b9c2.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Field);
  }
};
use(Plugin);

export { Plugin as default };
