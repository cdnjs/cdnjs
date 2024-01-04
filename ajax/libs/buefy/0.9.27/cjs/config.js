'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('./config-8cfb5a4a.js');
var helpers = require('./helpers.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');

var ConfigComponent = {
  getOptions: function getOptions() {
    return config.config;
  },
  setOptions: function setOptions(options) {
    config.setOptions(helpers.merge(config.config, options, true));
  }
};

exports["default"] = ConfigComponent;
