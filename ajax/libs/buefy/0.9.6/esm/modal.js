import './chunk-1fafdf15.js';
import { merge } from './helpers.js';
import { V as VueInstance } from './chunk-953eb524.js';
import { r as registerComponent, a as registerComponentProgrammatic, u as use } from './chunk-cca88db8.js';
import './chunk-42f463e6.js';
import { M as Modal } from './chunk-24346fe8.js';
export { M as BModal } from './chunk-24346fe8.js';

var localVueInstance;
var ModalProgrammatic = {
  open: function open(params) {
    var parent;

    if (typeof params === 'string') {
      params = {
        content: params
      };
    }

    var defaultParam = {
      programmatic: true
    };

    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.content)) {
      slot = params.content;
      delete params.content;
    }

    var propsData = merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || VueInstance;
    var ModalComponent = vm.extend(Modal);
    var component = new ModalComponent({
      parent: parent,
      el: document.createElement('div'),
      propsData: propsData
    });

    if (slot) {
      component.$slots.default = slot;
      component.$forceUpdate();
    }

    return component;
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    registerComponent(Vue, Modal);
    registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
  }
};
use(Plugin);

export default Plugin;
export { ModalProgrammatic };
