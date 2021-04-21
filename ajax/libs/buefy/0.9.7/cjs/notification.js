'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./chunk-14c82365.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-1bb51959.js');
require('./chunk-7f8af05c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_21 = require('./chunk-8f028adb.js');
var __chunk_22 = require('./chunk-96dc349e.js');

//
var script = {
  name: 'BNotification',
  mixins: [__chunk_21.MessageMixin],
  props: {
    position: String,
    ariaCloseLabel: String,
    animation: {
      type: String,
      default: 'fade'
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[_c('article',{directives:[{name:"show",rawName:"v-show",value:(_vm.isActive),expression:"isActive"}],staticClass:"notification",class:[_vm.type, _vm.position]},[(_vm.closable)?_c('button',{staticClass:"delete",attrs:{"type":"button","aria-label":_vm.ariaCloseLabel},on:{"click":_vm.close}}):_vm._e(),(_vm.$slots.default || _vm.message)?_c('div',{staticClass:"media"},[(_vm.computedIcon && _vm.hasIcon)?_c('div',{staticClass:"media-left"},[_c('b-icon',{attrs:{"icon":_vm.computedIcon,"pack":_vm.iconPack,"both":"","size":"is-large","aria-hidden":""}})],1):_vm._e(),_c('div',{staticClass:"media-content"},[(_vm.$slots.default)?[_vm._t("default")]:[_c('p',{staticClass:"text",domProps:{"innerHTML":_vm._s(_vm.message)}})]],2)]):_vm._e()])])};
var __vue_staticRenderFns__ = [];

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var Notification = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'BNotificationNotice',
  mixins: [__chunk_22.NoticeMixin],
  data: function data() {
    return {
      newDuration: this.duration || __chunk_2.config.defaultNotificationDuration
    };
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('b-notification',_vm._b({on:{"close":_vm.close}},'b-notification',_vm.$options.propsData,false),[_vm._t("default")],2)};
var __vue_staticRenderFns__$1 = [];

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  

  
  var NotificationNotice = __chunk_5.__vue_normalize__(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    undefined,
    undefined
  );

var localVueInstance;
var NotificationProgrammatic = {
  open: function open(params) {
    var parent;

    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      position: __chunk_2.config.defaultNotificationPosition || 'is-top-right'
    };

    if (params.parent) {
      parent = params.parent;
      delete params.parent;
    }

    var slot;

    if (Array.isArray(params.message)) {
      slot = params.message;
      delete params.message;
    } // fix animation


    params.active = false;
    var propsData = helpers.merge(defaultParam, params);
    var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || __chunk_2.VueInstance;
    var NotificationNoticeComponent = vm.extend(NotificationNotice);
    var component = new NotificationNoticeComponent({
      parent: parent,
      el: document.createElement('div'),
      propsData: propsData
    });

    if (slot) {
      component.$slots.default = slot;
      component.$forceUpdate();
    } // fix animation


    component.$children[0].isActive = true;
    return component;
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    __chunk_5.registerComponent(Vue, Notification);
    __chunk_5.registerComponentProgrammatic(Vue, 'notification', NotificationProgrammatic);
  }
};
__chunk_5.use(Plugin);

exports.BNotification = Notification;
exports.NotificationProgrammatic = NotificationProgrammatic;
exports.default = Plugin;
