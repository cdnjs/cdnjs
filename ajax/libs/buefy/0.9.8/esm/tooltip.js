import './chunk-1fafdf15.js';
import './helpers.js';
import './chunk-652f2dad.js';
import { r as registerComponent, u as use } from './chunk-cca88db8.js';
import { T as Tooltip } from './chunk-cf72ce36.js';
export { T as BTooltip } from './chunk-cf72ce36.js';

var Plugin = {
  install: function install(Vue) {
    registerComponent(Vue, Tooltip);
  }
};
use(Plugin);

export default Plugin;
