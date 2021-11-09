import './chunk-2452e3d3.js';
import { merge } from './helpers.js';
import { V as VueInstance } from './chunk-8ed29c41.js';
import { r as registerComponent, a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import './chunk-b9bdb0e4.js';
import { L as Loading } from './chunk-c9c58d0c.js';
export { L as BLoading } from './chunk-c9c58d0c.js';

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
