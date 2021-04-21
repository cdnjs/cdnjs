'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __chunk_1 = require('./chunk-14c82365.js');
var helpers = require('./helpers.js');
var __chunk_2 = require('./chunk-1bb51959.js');
var __chunk_4 = require('./chunk-7f8af05c.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_12 = require('./chunk-ae7e641a.js');
var __chunk_18 = require('./chunk-78b05a5b.js');

var script = {
  name: 'BDialog',
  components: __chunk_1._defineProperty({}, __chunk_4.Icon.name, __chunk_4.Icon),
  directives: {
    trapFocus: __chunk_12.trapFocus
  },
  extends: __chunk_18.Modal,
  props: {
    title: String,
    message: [String, Array],
    icon: String,
    iconPack: String,
    hasIcon: Boolean,
    type: {
      type: String,
      default: 'is-primary'
    },
    size: String,
    confirmText: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultDialogConfirmText ? __chunk_2.config.defaultDialogConfirmText : 'OK';
      }
    },
    cancelText: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultDialogCancelText ? __chunk_2.config.defaultDialogCancelText : 'Cancel';
      }
    },
    hasInput: Boolean,
    // Used internally to know if it's prompt
    inputAttrs: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    onConfirm: {
      type: Function,
      default: function _default() {}
    },
    closeOnConfirm: {
      type: Boolean,
      default: true
    },
    container: {
      type: String,
      default: function _default() {
        return __chunk_2.config.defaultContainerElement;
      }
    },
    focusOn: {
      type: String,
      default: 'confirm'
    },
    trapFocus: {
      type: Boolean,
      default: function _default() {
        return __chunk_2.config.defaultTrapFocus;
      }
    },
    ariaRole: {
      type: String,
      validator: function validator(value) {
        return ['dialog', 'alertdialog'].indexOf(value) >= 0;
      }
    },
    ariaModal: Boolean
  },
  data: function data() {
    var prompt = this.hasInput ? this.inputAttrs.value || '' : '';
    return {
      prompt: prompt,
      isActive: false,
      validationMessage: ''
    };
  },
  computed: {
    dialogClass: function dialogClass() {
      return [this.size, {
        'has-custom-container': this.container !== null
      }];
    },

    /**
    * Icon name (MDI) based on the type.
    */
    iconByType: function iconByType() {
      switch (this.type) {
        case 'is-info':
          return 'information';

        case 'is-success':
          return 'check-circle';

        case 'is-warning':
          return 'alert';

        case 'is-danger':
          return 'alert-circle';

        default:
          return null;
      }
    },
    showCancel: function showCancel() {
      return this.cancelOptions.indexOf('button') >= 0;
    }
  },
  methods: {
    /**
    * If it's a prompt Dialog, validate the input.
    * Call the onConfirm prop (function) and close the Dialog.
    */
    confirm: function confirm() {
      var _this = this;

      if (this.$refs.input !== undefined) {
        if (!this.$refs.input.checkValidity()) {
          this.validationMessage = this.$refs.input.validationMessage;
          this.$nextTick(function () {
            return _this.$refs.input.select();
          });
          return;
        }
      }

      this.$emit('confirm', this.prompt);
      this.onConfirm(this.prompt, this);
      if (this.closeOnConfirm) this.close();
    },

    /**
    * Close the Dialog.
    */
    close: function close() {
      var _this2 = this;

      this.isActive = false; // Timeout for the animation complete before destroying

      setTimeout(function () {
        _this2.$destroy();

        helpers.removeElement(_this2.$el);
      }, 150);
    }
  },
  beforeMount: function beforeMount() {
    var _this3 = this;

    // Insert the Dialog component in the element container
    if (typeof window !== 'undefined') {
      this.$nextTick(function () {
        var container = document.querySelector(_this3.container) || document.body;
        container.appendChild(_this3.$el);
      });
    }
  },
  mounted: function mounted() {
    var _this4 = this;

    this.isActive = true;

    if (typeof this.inputAttrs.required === 'undefined') {
      this.$set(this.inputAttrs, 'required', true);
    }

    this.$nextTick(function () {
      // Handle which element receives focus
      if (_this4.hasInput) {
        _this4.$refs.input.focus();
      } else if (_this4.focusOn === 'cancel' && _this4.showCancel) {
        _this4.$refs.cancelButton.focus();
      } else {
        _this4.$refs.confirmButton.focus();
      }
    });
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{directives:[{name:"trap-focus",rawName:"v-trap-focus",value:(_vm.trapFocus),expression:"trapFocus"}],staticClass:"dialog modal is-active",class:_vm.dialogClass,attrs:{"role":_vm.ariaRole,"aria-modal":_vm.ariaModal}},[_c('div',{staticClass:"modal-background",on:{"click":function($event){return _vm.cancel('outside')}}}),_c('div',{staticClass:"modal-card animation-content"},[(_vm.title)?_c('header',{staticClass:"modal-card-head"},[_c('p',{staticClass:"modal-card-title"},[_vm._v(_vm._s(_vm.title))])]):_vm._e(),_c('section',{staticClass:"modal-card-body",class:{ 'is-titleless': !_vm.title, 'is-flex': _vm.hasIcon }},[_c('div',{staticClass:"media"},[(_vm.hasIcon && (_vm.icon || _vm.iconByType))?_c('div',{staticClass:"media-left"},[_c('b-icon',{attrs:{"icon":_vm.icon ? _vm.icon : _vm.iconByType,"pack":_vm.iconPack,"type":_vm.type,"both":!_vm.icon,"size":"is-large"}})],1):_vm._e(),_c('div',{staticClass:"media-content"},[_c('p',[(_vm.$slots.default)?[_vm._t("default")]:[_c('div',{domProps:{"innerHTML":_vm._s(_vm.message)}})]],2),(_vm.hasInput)?_c('div',{staticClass:"field"},[_c('div',{staticClass:"control"},[(((_vm.inputAttrs).type)==='checkbox')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":"checkbox"},domProps:{"checked":Array.isArray(_vm.prompt)?_vm._i(_vm.prompt,null)>-1:(_vm.prompt)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"change":function($event){var $$a=_vm.prompt,$$el=$event.target,$$c=$$el.checked?(true):(false);if(Array.isArray($$a)){var $$v=null,$$i=_vm._i($$a,$$v);if($$el.checked){$$i<0&&(_vm.prompt=$$a.concat([$$v]));}else{$$i>-1&&(_vm.prompt=$$a.slice(0,$$i).concat($$a.slice($$i+1)));}}else{_vm.prompt=$$c;}}}},'input',_vm.inputAttrs,false)):(((_vm.inputAttrs).type)==='radio')?_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":"radio"},domProps:{"checked":_vm._q(_vm.prompt,null)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"change":function($event){_vm.prompt=null;}}},'input',_vm.inputAttrs,false)):_c('input',_vm._b({directives:[{name:"model",rawName:"v-model",value:(_vm.prompt),expression:"prompt"}],ref:"input",staticClass:"input",class:{ 'is-danger': _vm.validationMessage },attrs:{"type":(_vm.inputAttrs).type},domProps:{"value":(_vm.prompt)},on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.confirm($event)},"input":function($event){if($event.target.composing){ return; }_vm.prompt=$event.target.value;}}},'input',_vm.inputAttrs,false))]),_c('p',{staticClass:"help is-danger"},[_vm._v(_vm._s(_vm.validationMessage))])]):_vm._e()])])]),_c('footer',{staticClass:"modal-card-foot"},[(_vm.showCancel)?_c('button',{ref:"cancelButton",staticClass:"button",on:{"click":function($event){return _vm.cancel('button')}}},[_vm._v(_vm._s(_vm.cancelText))]):_vm._e(),_c('button',{ref:"confirmButton",staticClass:"button",class:_vm.type,on:{"click":_vm.confirm}},[_vm._v(_vm._s(_vm.confirmText))])])])]):_vm._e()])};
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
  

  
  var Dialog = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

var localVueInstance;

function open(propsData) {
  var slot;

  if (Array.isArray(propsData.message)) {
    slot = propsData.message;
    delete propsData.message;
  }

  var vm = typeof window !== 'undefined' && window.Vue ? window.Vue : localVueInstance || __chunk_2.VueInstance;
  var DialogComponent = vm.extend(Dialog);
  var component = new DialogComponent({
    el: document.createElement('div'),
    propsData: propsData
  });

  if (slot) {
    component.$slots.default = slot;
    component.$forceUpdate();
  }

  if (!__chunk_2.config.defaultProgrammaticPromise) {
    return component;
  } else {
    return new Promise(function (resolve) {
      component.$on('confirm', function (event) {
        return resolve({
          result: event || true,
          dialog: component
        });
      });
      component.$on('cancel', function () {
        return resolve({
          result: false,
          dialog: component
        });
      });
    });
  }
}

var DialogProgrammatic = {
  alert: function alert(params) {
    if (typeof params === 'string') {
      params = {
        message: params
      };
    }

    var defaultParam = {
      canCancel: false
    };
    var propsData = helpers.merge(defaultParam, params);
    return open(propsData);
  },
  confirm: function confirm(params) {
    var defaultParam = {};
    var propsData = helpers.merge(defaultParam, params);
    return open(propsData);
  },
  prompt: function prompt(params) {
    var defaultParam = {
      hasInput: true
    };
    var propsData = helpers.merge(defaultParam, params);
    return open(propsData);
  }
};
var Plugin = {
  install: function install(Vue) {
    localVueInstance = Vue;
    __chunk_5.registerComponent(Vue, Dialog);
    __chunk_5.registerComponentProgrammatic(Vue, 'dialog', DialogProgrammatic);
  }
};
__chunk_5.use(Plugin);

exports.BDialog = Dialog;
exports.DialogProgrammatic = DialogProgrammatic;
exports.default = Plugin;
