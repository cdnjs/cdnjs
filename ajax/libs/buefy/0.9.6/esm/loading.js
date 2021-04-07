import './chunk-1fafdf15.js';
import { merge } from './helpers.js';
import { V as VueInstance } from './chunk-953eb524.js';
import { r as registerComponent, a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import './chunk-b9bdb0e4.js';
import { L as Loading } from './chunk-4ed89be2.js';
export { L as BLoading } from './chunk-4ed89be2.js';

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

export default Plugin;
export { LoadingProgrammatic };
