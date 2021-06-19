import './chunk-1fafdf15.js';
import { merge } from './helpers.js';
import { c as config, a as setOptions } from './chunk-652f2dad.js';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export default ConfigComponent;
