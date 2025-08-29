import { defineComponent, resolveComponent, createElementBlock, openBlock, mergeProps, createElementVNode, createBlock, createCommentVNode, normalizeClass, withDirectives, renderSlot, Fragment, toDisplayString, vModelSelect } from 'vue';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { C as CompatFallthroughMixin } from './CompatFallthroughMixin-C8LPuwDr.js';
import { F as FormElementMixin } from './FormElementMixin-Dd_wkBN5.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';

var _sfc_main = defineComponent({
  name: "BSelect",
  components: {
    BIcon
  },
  mixins: [CompatFallthroughMixin, FormElementMixin],
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
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    mergeProps({
      class: ["control", { "is-expanded": _ctx.expanded, "has-icons-left": _ctx.icon }]
    }, _ctx.rootAttrs),
    [
      createElementVNode(
        "span",
        {
          class: normalizeClass(["select", _ctx.spanClasses])
        },
        [
          withDirectives(createElementVNode("select", mergeProps({
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => _ctx.computedValue = $event),
            ref: "select",
            multiple: _ctx.multiple,
            size: _ctx.nativeSize
          }, _ctx.fallthroughAttrs, {
            onBlur: _cache[1] || (_cache[1] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
            onFocus: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("focus", $event))
          }), [
            _ctx.placeholder ? (openBlock(), createElementBlock(
              Fragment,
              { key: 0 },
              [
                _ctx.computedValue == null ? (openBlock(), createElementBlock(
                  "option",
                  _hoisted_2,
                  toDisplayString(_ctx.placeholder),
                  1
                  /* TEXT */
                )) : createCommentVNode("v-if", true)
              ],
              64
              /* STABLE_FRAGMENT */
            )) : createCommentVNode("v-if", true),
            renderSlot(_ctx.$slots, "default")
          ], 16, _hoisted_1), [
            [vModelSelect, _ctx.computedValue]
          ])
        ],
        2
        /* CLASS */
      ),
      _ctx.icon ? (openBlock(), createBlock(_component_b_icon, {
        key: 0,
        class: "is-left",
        icon: _ctx.icon,
        pack: _ctx.iconPack,
        size: _ctx.iconSize
      }, null, 8, ["icon", "pack", "size"])) : createCommentVNode("v-if", true)
    ],
    16
    /* FULL_PROPS */
  );
}
var BSelect = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);

export { BSelect as B };
