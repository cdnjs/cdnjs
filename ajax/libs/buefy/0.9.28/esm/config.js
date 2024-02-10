import { c as config, a as setOptions } from './config-e7d4b9c2.js';
import { merge } from './helpers.js';
import './_rollupPluginBabelHelpers-df313029.js';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export { ConfigComponent as default };
