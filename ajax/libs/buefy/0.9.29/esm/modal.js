import { M as Modal } from './Modal-7da7641f.js';
export { M as BModal } from './Modal-7da7641f.js';
import { V as VueInstance } from './config-e7d4b9c2.js';
import { merge } from './helpers.js';
import { u as use, a as registerComponent, r as registerComponentProgrammatic } from './plugins-218aea86.js';
import './trapFocus-f0736873.js';
import './_rollupPluginBabelHelpers-df313029.js';

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

export { ModalProgrammatic, Plugin as default };
