import './chunk-455cdeae.js';
import { merge } from './helpers.js';
import { c as config, a as setOptions } from './chunk-8ed29c41.js';

var ConfigComponent = {
  getOptions: function getOptions() {
    return config;
  },
  setOptions: function setOptions$1(options) {
    setOptions(merge(config, options, true));
  }
};

export default ConfigComponent;
