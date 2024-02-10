'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var FormElementMixin = require('./FormElementMixin-193a88b8.js');
var ssr = require('./ssr-20dba236.js');
var plugins = require('./plugins-7f41b028.js');
require('./config-8cfb5a4a.js');
require('./helpers.js');
require('./_rollupPluginBabelHelpers-8b2e54ad.js');

//
var script = {
  name: 'BUpload',
  mixins: [FormElementMixin.FormElementMixin],
  inheritAttrs: false,
  props: {
    value: {
      type: [Object, Function, ssr.File, Array]
    },
    multiple: Boolean,
    disabled: Boolean,
    accept: String,
    dragDrop: Boolean,
    type: {
      type: String,
      default: 'is-primary'
    },
    native: {
      type: Boolean,
      default: false
    },
    expanded: {
      type: Boolean,
      default: false
    },
    rounded: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      newValue: this.value,
      dragDropFocus: false,
      _elementRef: 'input'
    };
  },
  watch: {
    /**
     *   When v-model is changed:
     *   1. Set internal value.
     *   2. Reset internal input file value
     *   3. If it's invalid, validate again.
     */
    value: function value(_value) {
      this.newValue = _value;
      if (!_value || Array.isArray(_value) && _value.length === 0) {
        this.$refs.input.value = null;
      }
      !this.isValid && !this.dragDrop && this.checkHtml5Validity();
    }
  },
  methods: {
    /**
    * Listen change event on input type 'file',
    * emit 'input' event and validate
    */
    onFileChange: function onFileChange(event) {
      if (this.disabled || this.loading) return;
      if (this.dragDrop) this.updateDragDropFocus(false);
      var value = event.target.files || event.dataTransfer.files;
      if (value.length === 0) {
        if (!this.newValue) return;
        if (this.native) this.newValue = null;
      } else if (!this.multiple) {
        // only one element in case drag drop mode and isn't multiple
        if (this.dragDrop && value.length !== 1) return;else {
          var file = value[0];
          if (this.checkType(file)) this.newValue = file;else if (this.newValue) {
            this.newValue = null;
            this.clearInput();
          } else {
            // Force input back to empty state and recheck validity
            this.clearInput();
            this.checkHtml5Validity();
            return;
          }
        }
      } else {
        // always new values if native or undefined local
        var newValues = false;
        if (this.native || !this.newValue) {
          this.newValue = [];
          newValues = true;
        }
        for (var i = 0; i < value.length; i++) {
          var _file = value[i];
          if (this.checkType(_file)) {
            this.newValue.push(_file);
            newValues = true;
          }
        }
        if (!newValues) return;
      }
      this.$emit('input', this.newValue);
      !this.dragDrop && this.checkHtml5Validity();
    },
    /*
    * Reset file input value
    */
    clearInput: function clearInput() {
      this.$refs.input.value = null;
    },
    /**
    * Listen drag-drop to update internal variable
    */
    updateDragDropFocus: function updateDragDropFocus(focus) {
      if (!this.disabled && !this.loading) {
        this.dragDropFocus = focus;
      }
    },
    /**
    * Check mime type of file
    */
    checkType: function checkType(file) {
      if (!this.accept) return true;
      var types = this.accept.split(',');
      if (types.length === 0) return true;
      var valid = false;
      for (var i = 0; i < types.length && !valid; i++) {
        var type = types[i].trim();
        if (type) {
          if (type.substring(0, 1) === '.') {
            // check extension
            var extension = file.name.toLowerCase().slice(-type.length);
            if (extension === type.toLowerCase()) {
              valid = true;
            }
          } else {
            // check mime type
            if (file.type.match(type)) {
              valid = true;
            }
          }
        }
      }
      if (!valid) this.$emit('invalid');
      return valid;
    }
  }
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{staticClass:"upload control",class:{'is-expanded' : _vm.expanded, 'is-rounded' : _vm.rounded}},[(!_vm.dragDrop)?[_vm._t("default")]:_c('div',{staticClass:"upload-draggable",class:[_vm.type, {
            'is-loading': _vm.loading,
            'is-disabled': _vm.disabled,
            'is-hovered': _vm.dragDropFocus,
            'is-expanded': _vm.expanded,
        }],on:{"dragover":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"dragleave":function($event){$event.preventDefault();return _vm.updateDragDropFocus(false)},"dragenter":function($event){$event.preventDefault();return _vm.updateDragDropFocus(true)},"drop":function($event){$event.preventDefault();return _vm.onFileChange($event)}}},[_vm._t("default")],2),_c('input',_vm._b({ref:"input",attrs:{"type":"file","multiple":_vm.multiple,"accept":_vm.accept,"disabled":_vm.disabled},on:{"change":_vm.onFileChange}},'input',_vm.$attrs,false))],2)};
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
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/plugins.normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

  var Upload = __vue_component__;

var Plugin = {
  install: function install(Vue) {
    plugins.registerComponent(Vue, Upload);
  }
};
plugins.use(Plugin);

exports.BUpload = Upload;
exports["default"] = Plugin;
