'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var vue = require('vue');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var FormElementMixin = require('./FormElementMixin-DavX4iOv.js');
var ssr = require('./ssr-DVRFTu_P.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');
var plugins = require('./plugins-DbyYGVpp.js');
require('./config-DR826Ki2.js');

const Upload$1 = vue.defineComponent({
  name: "BUpload",
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin, FormElementMixin.FormElementMixin],
  props: {
    modelValue: {
      type: [Object, Function, ssr.File, Array]
    },
    multiple: Boolean,
    disabled: Boolean,
    accept: String,
    dragDrop: Boolean,
    type: {
      type: String,
      default: "is-primary"
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
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    invalid: () => true,
    "update:modelValue": (newValue) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.modelValue,
      dragDropFocus: false,
      _elementRef: "input"
    };
  },
  computed: {
    disabledOrUndefined() {
      return this.disabled || void 0;
    }
  },
  watch: {
    modelValue(value) {
      this.newValue = value;
      if (!value || Array.isArray(value) && value.length === 0) {
        this.$refs.input.value = "";
      }
      !this.isValid && !this.dragDrop && this.checkHtml5Validity();
    }
  },
  methods: {
    onFileChange(event) {
      var _a, _b;
      if (this.disabled || this.loading) return;
      if (this.dragDrop) this.updateDragDropFocus(false);
      const value = (_b = (_a = event.target.files) != null ? _a : event.dataTransfer.files) != null ? _b : [];
      if (value.length === 0) {
        if (!this.newValue) return;
        if (this.native) this.newValue = null;
      } else if (!this.multiple) {
        if (this.dragDrop && value.length !== 1) return;
        else {
          const file = value[0];
          if (this.checkType(file)) this.newValue = file;
          else if (this.newValue) {
            this.newValue = null;
            this.clearInput();
          } else {
            this.clearInput();
            this.checkHtml5Validity();
            return;
          }
        }
      } else {
        let newValues = false;
        if (this.native || !this.newValue) {
          this.newValue = [];
          newValues = true;
        }
        for (let i = 0; i < value.length; i++) {
          const file = value[i];
          if (this.checkType(file) && Array.isArray(this.newValue)) {
            this.newValue.push(file);
            newValues = true;
          }
        }
        if (!newValues) return;
      }
      this.$emit("update:modelValue", this.newValue);
      !this.dragDrop && this.checkHtml5Validity();
    },
    clearInput() {
      this.$refs.input.value = "";
    },
    updateDragDropFocus(focus) {
      if (!this.disabled && !this.loading) {
        this.dragDropFocus = focus;
      }
    },
    checkType(file) {
      if (!this.accept) return true;
      const types = this.accept.split(",");
      if (types.length === 0) return true;
      let valid = false;
      for (let i = 0; i < types.length && !valid; i++) {
        const type = types[i].trim();
        if (type) {
          if (type.substring(0, 1) === ".") {
            const extension = file.name.toLowerCase().slice(-type.length);
            if (extension === type.toLowerCase()) {
              valid = true;
            }
          } else {
            if (file.type.match(type)) {
              valid = true;
            }
          }
        }
      }
      if (!valid) this.$emit("invalid");
      return valid;
    }
  }
});

const _hoisted_1 = ["multiple", "accept", "disabled"];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return vue.openBlock(), vue.createElementBlock(
    "label",
    vue.mergeProps({ class: "upload control" }, _ctx.rootAttrs, {
      class: [{ "is-expanded": _ctx.expanded, "is-rounded": _ctx.rounded }]
    }),
    [
      !_ctx.dragDrop ? vue.renderSlot(_ctx.$slots, "default", { key: 0 }) : (vue.openBlock(), vue.createElementBlock(
        "div",
        {
          key: 1,
          class: vue.normalizeClass(["upload-draggable", [_ctx.type, {
            "is-loading": _ctx.loading,
            "is-disabled": _ctx.disabled,
            "is-hovered": _ctx.dragDropFocus,
            "is-expanded": _ctx.expanded
          }]]),
          onDragover: _cache[0] || (_cache[0] = vue.withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
          onDragleave: _cache[1] || (_cache[1] = vue.withModifiers(($event) => _ctx.updateDragDropFocus(false), ["prevent"])),
          onDragenter: _cache[2] || (_cache[2] = vue.withModifiers(($event) => _ctx.updateDragDropFocus(true), ["prevent"])),
          onDrop: _cache[3] || (_cache[3] = vue.withModifiers((...args) => _ctx.onFileChange && _ctx.onFileChange(...args), ["prevent"]))
        },
        [
          vue.renderSlot(_ctx.$slots, "default")
        ],
        34
        /* CLASS, NEED_HYDRATION */
      )),
      vue.createElementVNode("input", vue.mergeProps({
        ref: "input",
        type: "file"
      }, _ctx.fallthroughAttrs, {
        multiple: _ctx.multiple,
        accept: _ctx.accept,
        disabled: _ctx.disabledOrUndefined,
        onChange: _cache[4] || (_cache[4] = (...args) => _ctx.onFileChange && _ctx.onFileChange(...args))
      }), null, 16, _hoisted_1)
    ],
    16
    /* FULL_PROPS */
  );
}
var Upload = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(Upload$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    plugins.registerComponent(Vue, Upload);
  }
};

exports.BUpload = Upload;
exports.default = Plugin;
