'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var Modal = require('./Modal-4cf07210.js');
var config = require('./config-8cfb5a4a.js');
var helpers = require('./helpers.js');
var plugins = require('./plugins-7f41b028.js');
require('./trapFocus-261420b0.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');

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
    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || config.VueInstance;
    var ModalComponent = vm.extend(Modal.Modal);
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
    plugins.registerComponent(Vue, Modal.Modal);
    plugins.registerComponentProgrammatic(Vue, 'modal', ModalProgrammatic);
  }
};
plugins.use(Plugin);

exports.BModal = Modal.Modal;
exports.ModalProgrammatic = ModalProgrammatic;
exports["default"] = Plugin;
