import { I as Icon } from './Icon-60d47b31.js';
export { I as BIcon } from './Icon-60d47b31.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './config-e7d4b9c2.js';
import './helpers.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Icon);
  }
};
use(Plugin);

export { Plugin as default };
