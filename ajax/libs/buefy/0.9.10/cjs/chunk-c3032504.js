'use strict';

var helpers = require('./helpers.js');
var __chunk_5 = require('./chunk-13e039f5.js');
var __chunk_19 = require('./chunk-f1df1c63.js');

//
var script = {
  name: 'BLoading',
  // deprecated, to replace with default 'value' in the next breaking change
  model: {
    prop: 'active',
    event: 'update:active'
  },
  props: {
    active: Boolean,
    programmatic: Boolean,
    container: [Object, Function, __chunk_19.HTMLElement],
    isFullPage: {
      type: Boolean,
      default: true
    },
    animation: {
      type: String,
      default: 'fade'
    },
    canCancel: {
      type: Boolean,
      default: false
    },
    onCancel: {
      type: Function,
      default: function _default() {}
    }
  },
  data: function data() {
    return {
      isActive: this.active || false,
      displayInFullPage: this.isFullPage
    };
  },
  watch: {
    active: function active(value) {
      this.isActive = value;
    },
    isFullPage: function isFullPage(value) {
      this.displayInFullPage = value;
    }
  },
  methods: {
    /**
    * Close the Modal if canCancel.
    */
    cancel: function cancel() {
      if (!this.canCancel || !this.isActive) return;
      this.close();
    },

    /**
    * Emit events, and destroy modal if it's programmatic.
    */
    close: function close() {
      var _this = this;

      this.onCancel.apply(null, arguments);
      this.$emit('close');
      this.$emit('update:active', false); // Timeout for the animation complete before destroying

      if (this.programmatic) {
        this.isActive = false;
        setTimeout(function () {
          _this.$destroy();

          helpers.removeElement(_this.$el);
        }, 150);
      }
    },

    /**
    * Keypress event that is bound to the document.
    */
    keyPress: function keyPress(_ref) {
      var key = _ref.key;
      if (key === 'Escape' || key === 'Esc') this.cancel();
    }
  },
  created: function created() {
    if (typeof window !== 'undefined') {
      document.addEventListener('keyup', this.keyPress);
    }
  },
  beforeMount: function beforeMount() {
    // Insert the Loading component in body tag
    // only if it's programmatic
    if (this.programmatic) {
      if (!this.container) {
        document.body.appendChild(this.$el);
      } else {
        this.displayInFullPage = false;
        this.$emit('update:is-full-page', false);
        this.container.appendChild(this.$el);
      }
    }
  },
  mounted: function mounted() {
    if (this.programmatic) this.isActive = true;
  },
  beforeDestroy: function beforeDestroy() {
    if (typeof window !== 'undefined') {
      document.removeEventListener('keyup', this.keyPress);
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":_vm.animation}},[(_vm.isActive)?_c('div',{staticClass:"loading-overlay is-active",class:{ 'is-full-page': _vm.displayInFullPage }},[_c('div',{staticClass:"loading-background",on:{"click":_vm.cancel}}),_vm._t("default",[_c('div',{staticClass:"loading-icon"})])],2):_vm._e()])};
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
  

  
  var Loading = __chunk_5.__vue_normalize__(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    undefined,
    undefined
  );

exports.Loading = Loading;
