import { I as Image } from './Image-75808acb.js';
export { I as BImage } from './Image-75808acb.js';
import { u as use, a as registerComponent } from './plugins-218aea86.js';
import './_rollupPluginBabelHelpers-df313029.js';
import './config-e7d4b9c2.js';
import './helpers.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Image);
  }
};
use(Plugin);

export { Plugin as default };
