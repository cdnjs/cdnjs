'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Loading = require('./Loading-6f2c7075.js');
var config = require('./config-8cfb5a4a.js');
var helpers = require('./helpers.js');
var plugins = require('./plugins-7f41b028.js');
require('./ssr-20dba236.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');

var localVueInstance;
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || config.VueInstance;
    var LoadingComponent = vm.extend(Loading.Loading);
    return new LoadingComponent({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    plugins.registerComponent(Vue, Loading.Loading);
    plugins.registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
plugins.use(Plugin);

exports.BLoading = Loading.Loading;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports["default"] = Plugin;
