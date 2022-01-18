'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-92621ff7.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-c0adb618.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-f1df1c63.js');
var __chunk_22 = require('./chunk-1d2f05e0.js');

var localVueInstance;
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || __chunk_2.VueInstance;
    var LoadingComponent = vm.extend(__chunk_22.Loading);
    return new LoadingComponent({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    __chunk_5.registerComponent(Vue, __chunk_22.Loading);
    __chunk_5.registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
__chunk_5.use(Plugin);

exports.BLoading = __chunk_22.Loading;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports.default = Plugin;
