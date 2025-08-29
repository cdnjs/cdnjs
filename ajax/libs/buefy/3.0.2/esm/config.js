import { s as setOptions, c as config } from './config-CKuo-p6e.js';
import { merge } from './helpers.js';
import 'vue';

var ConfigComponent = {
  getOptions() {
    return config;
  },
  setOptions(options) {
    setOptions(merge(config, options, true));
  }
};

export { ConfigComponent as default };
