import './chunk-851d1b8f.js';
import { merge } from './helpers.js';
import { c as config, a as setOptions } from './chunk-10ce22e9.js';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export default ConfigComponent;
