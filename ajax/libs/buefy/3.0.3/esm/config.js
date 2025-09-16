import { s as setOptions, c as config } from './config-CKuo-p6e.js';
import { merge } from './helpers.js';
import { inject } from 'vue';

const configInjectionKey = Symbol("Buefy Config Component");
function useConfigComponent() {
  return inject(configInjectionKey);
}
var ConfigComponent = {
  getOptions() {
    return config;
  },
  setOptions(options) {
    setOptions(merge(config, options, true));
  }
};

export { configInjectionKey, ConfigComponent as default, useConfigComponent };
