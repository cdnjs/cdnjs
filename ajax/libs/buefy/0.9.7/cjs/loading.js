'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-1bb51959.js');
var __chunk_5 = require('./chunk-13e039f5.js');
require('./chunk-f1df1c63.js');
var __chunk_20 = require('./chunk-f175f450.js');

var localVueInstance;
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || __chunk_2.VueInstance;
    var LoadingComponent = vm.extend(__chunk_20.Loading);
    return new LoadingComponent({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    __chunk_5.registerComponent(Vue, __chunk_20.Loading);
    __chunk_5.registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
__chunk_5.use(Plugin);

exports.BLoading = __chunk_20.Loading;
exports.LoadingProgrammatic = LoadingProgrammatic;
exports.default = Plugin;
