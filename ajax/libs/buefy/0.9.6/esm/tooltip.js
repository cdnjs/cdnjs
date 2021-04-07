import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-953eb524.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { T as Tooltip } from './chunk-fd78ac8f.js';
export { T as BTooltip } from './chunk-fd78ac8f.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Tooltip);
  }
};
use(Plugin);

export default Plugin;
