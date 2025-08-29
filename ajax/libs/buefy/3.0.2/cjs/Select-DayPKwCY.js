'use strict';

var vue = require('vue');
var Icon = require('./Icon-lsDKE2wQ.js');
var CompatFallthroughMixin = require('./CompatFallthroughMixin-hhK0Gkhr.js');
var FormElementMixin = require('./FormElementMixin-DavX4iOv.js');
var _pluginVue_exportHelper = require('./_plugin-vue_export-helper-Die8u8yB.js');

var _sfc_main = vue.defineComponent({
  name: "BSelect",
  components: {
    BIcon: Icon.BIcon
  },
  mixins: [CompatFallthroughMixin.CompatFallthroughMixin, FormElementMixin.FormElementMixin],
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Boolean,
        Object,
        Array,
        Function,
        Date,
        null
      ],
      default: null
    },
    placeholder: String,
    multiple: Boolean,
    nativeSize: [String, Number]
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    blur: (_event) => true,
    focus: (_event) => true,
    "update:modelValue": (_value) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      selected: this.modelValue,
      _elementRef: "select"
    };
  },
  computed: {
    computedValue: {
      get() {
        return this.selected;
      },
      set(value) {
        this.selected = value;
        this.$emit("update:modelValue", value);
        !this.isValid && this.checkHtml5Validity();
      }
    },
    spanClasses() {
      return [this.size, this.statusType, {
        "is-fullwidth": this.expanded,
        "is-loading": this.loading,
        "is-multiple": this.multiple,
        "is-rounded": this.rounded,
        "is-empty": this.selected === null
      }];
    }
  },
  watch: {
    /*
    * When v-model is changed:
    *   1. Set the selected option.
    *   2. If it's invalid, validate again.
    */
    modelValue(value) {
      this.selected = value;
      !this.isValid && this.checkHtml5Validity();
    }
  }
});

const _hoisted_1 = ["multiple", "size"];
const _hoisted_2 = {
  key: 0,
  value: null,
  disabled: "",
  hidden: ""
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = vue.resolveComponent("b-icon");
  return vue.openBlock(), vue.createElementBlock(
    "div",
    vue.mergeProps({
      class: ["control", { "is-expanded": _ctx.expanded, "has-icons-left": _ctx.icon }]
    }, _ctx.rootAttrs),
    [
      vue.createElementVNode(
        "span",
        {
          class: vue.normalizeClass(["select", _ctx.spanClasses])
        },
        [
          vue.withDirectives(vue.createElementVNode("select", vue.mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
            ref: "select",
            multiple: _ctx.multiple,
            size: _ctx.nativeSize
          }, _ctx.fallthroughAttrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("focus", $event))
          }), [
            _ctx.placeholder ? (vue.openBlock(), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              [
                _ctx.computedValue == null ? (vue.openBlock(), vue.createElementBlock(
                  "option",
                  _hoisted_2,
                  vue.toDisplayString(_ctx.placeholder),
                  1
                  /* TEXT */
                )) : vue.createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            vue.renderSlot(_ctx.$slots, "default")
          ], 16, _hoisted_1), [
            [vue.vModelSelect, _ctx.computedValue]
          ])
        ],
        2
        /* CLASS */
      ),
      _ctx.icon ? (vue.openBlock(), vue.createBlock(_component_b_icon, {
        key: 0,
        class: "is-left",
        icon: _ctx.icon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize
      }, null, 8, ["icon", "pack", "size"])) : vue.createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var BSelect = /* @__PURE__ */ _pluginVue_exportHelper._export_sfc(_sfc_main, [["render", _sfc_render]]);

exports.BSelect = BSelect;
