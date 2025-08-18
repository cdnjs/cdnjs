'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-DR826Ki2.js');
var helpers = require('./helpers.js');
require('vue');

var ConfigComponent = {
  getOptions() {
    return config.config;
  },
  setOptions(options) {
    config.setOptions(helpers.merge(config.config, options, true));
  }
};

exports.default = ConfigComponent;
