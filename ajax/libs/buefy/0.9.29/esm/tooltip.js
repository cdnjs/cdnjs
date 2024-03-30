import { T as Tooltip } from './Tooltip-c67e7511.js';
export { T as BTooltip } from './Tooltip-c67e7511.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './config-e7d4b9c2.js';
import './helpers.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Tooltip);
  }
};
use(Plugin);

export { Plugin as default };
