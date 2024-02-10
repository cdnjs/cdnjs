import { L as Loading } from './Loading-ae028ea5.js';
export { L as BLoading } from './Loading-ae028ea5.js';
import { V as VueInstance } from './config-e7d4b9c2.js';
import { merge } from './helpers.js';
import { u as use, a as registerComponent, r as registerComponentProgrammatic } from './plugins-218aea86.js';
import './ssr-b847d137.js';
import './_rollupPluginBabelHelpers-df313029.js';

var localVueInstance;
var LoadingProgrammatic = {
  open: function open(params) {
    var defaultParam = {
      programmatic: true
    };
    var propsData = merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    var LoadingComponent = vm.extend(Loading);
    return new LoadingComponent({
      el: document.createElement('div'),
      propsData: propsData
    });
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    registerComponent(Vue, Loading);
    registerComponentProgrammatic(Vue, 'loading', LoadingProgrammatic);
  }
};
use(Plugin);

export { LoadingProgrammatic, Plugin as default };
