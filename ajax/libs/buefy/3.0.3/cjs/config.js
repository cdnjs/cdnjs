'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-DR826Ki2.js');
var helpers = require('./helpers.js');
var vue = require('vue');

const configInjectionKey = Symbol("Buefy Config Component");
function useConfigComponent() {
  return vue.inject(configInjectionKey);
}
var ConfigComponent = {
  getOptions() {
    return config.config;
  },
  setOptions(options) {
    config.setOptions(helpers.merge(config.config, options, true));
  }
};

exports.configInjectionKey = configInjectionKey;
exports.default = ConfigComponent;
exports.useConfigComponent = useConfigComponent;
