import { B as Button } from './Button-521f6efc.js';
export { B as BButton } from './Button-521f6efc.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './Icon-60d47b31.js';
import './config-e7d4b9c2.js';
import './helpers.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Button);
  }
};
use(Plugin);

export { Plugin as default };
