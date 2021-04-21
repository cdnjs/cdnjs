import './chunk-1fafdf15.js';
import { merge } from './helpers.js';
import { c as config, a as setOptions } from './chunk-953eb524.js';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export default ConfigComponent;
