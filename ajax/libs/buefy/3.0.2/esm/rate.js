import { defineComponent, resolveComponent, createElementBlock, openBlock, normalizeClass, createCommentVNode, Fragment, renderList, withModifiers, createVNode, createBlock, normalizeStyle, createElementVNode, toDisplayString } from 'vue';
import { c as config } from './config-CKuo-p6e.js';
import { B as BIcon } from './Icon-DPyGDeRK.js';
import { _ as _export_sfc } from './_plugin-vue_export-helper-OJRSZE6i.js';
import { a as registerComponent } from './plugins-B172kuKE.js';
import './helpers.js';

const Rate$1 = defineComponent({
  name: "BRate",
  components: {
    BIcon
  },
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 5
    },
    icon: {
      type: String,
      default: "star"
    },
    iconPack: String,
    size: String,
    spaced: Boolean,
    rtl: Boolean,
    disabled: Boolean,
    showScore: Boolean,
    showText: Boolean,
    customText: String,
    texts: Array,
    locale: {
      type: [String, Array],
      default: () => {
        return config.defaultLocale;
      }
    }
  },
  emits: {
    /* eslint-disable @typescript-eslint/no-unused-vars */
    change: (newValue) => true,
    "update:modelValue": (newValue) => true
    /* eslint-enable @typescript-eslint/no-unused-vars */
  },
  data() {
    return {
      newValue: this.modelValue,
      hoverValue: 0
    };
  },
  computed: {
    halfStyle() {
      return `width:${this.valueDecimal}%`;
    },
    showMe() {
      let result = "";
      if (this.showScore) {
        result = this.disabled ? this.modelValue.toString() : this.newValue.toString();
        if (Number(result) === 0) {
          result = "";
        } else {
          result = new Intl.NumberFormat(this.locale).format(this.modelValue);
        }
      } else if (this.showText && this.texts) {
        result = this.texts[Math.ceil(this.newValue) - 1];
      }
      return result;
    },
    valueDecimal() {
      return this.modelValue * 100 - Math.floor(this.modelValue) * 100;
    }
  },
  watch: {
    // When v-model is changed set the new value.
    modelValue(value) {
      this.newValue = value;
    }
  },
  methods: {
    resetNewValue() {
      if (this.disabled) return;
      this.hoverValue = 0;
    },
    previewRate(index, event) {
      if (this.disabled) return;
      this.hoverValue = index;
      event.stopPropagation();
    },
    confirmValue(index) {
      if (this.disabled) return;
      this.newValue = index;
      this.$emit("change", this.newValue);
      this.$emit("update:modelValue", this.newValue);
    },
    checkHalf(index) {
      const showWhenDisabled = this.disabled && this.valueDecimal > 0 && index - 1 < this.modelValue && index > this.modelValue;
      return showWhenDisabled;
    },
    rateClass(index) {
      let output = "";
      const currentValue = this.hoverValue !== 0 ? this.hoverValue : this.newValue;
      if (index <= currentValue) {
        output = "set-on";
      } else if (this.disabled && Math.ceil(this.modelValue) === index) {
        output = "set-half";
      }
      return output;
    }
  }
});

const _hoisted_1 = ["onMousemove", "onClick"];
const _hoisted_2 = { key: 0 };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_b_icon = resolveComponent("b-icon");
  return openBlock(), createElementBlock(
    "div",
    {
      class: normalizeClass(["rate", { "is-disabled": _ctx.disabled, "is-spaced": _ctx.spaced, "is-rtl": _ctx.rtl }])
    },
    [
      (openBlock(true), createElementBlock(
        Fragment,
        null,
        renderList(_ctx.max, (item, index) => {
          return openBlock(), createElementBlock("div", {
            class: normalizeClass(["rate-item", _ctx.rateClass(item)]),
            key: index,
            onMousemove: ($event) => _ctx.previewRate(item, $event),
            onMouseleave: _cache[0] || (_cache[0] = (...args) => _ctx.resetNewValue && _ctx.resetNewValue(...args)),
            onClick: withModifiers(($event) => _ctx.confirmValue(item), ["prevent"])
          }, [
            createVNode(_component_b_icon, {
              pack: _ctx.iconPack,
              icon: _ctx.icon,
              size: _ctx.size
            }, null, 8, ["pack", "icon", "size"]),
            _ctx.checkHalf(item) ? (openBlock(), createBlock(_component_b_icon, {
              key: 0,
              class: "is-half",
              pack: _ctx.iconPack,
              icon: _ctx.icon,
              size: _ctx.size,
              style: normalizeStyle(_ctx.halfStyle)
            }, null, 8, ["pack", "icon", "size", "style"])) : createCommentVNode("v-if", true)
          ], 42, _hoisted_1);
        }),
        128
        /* KEYED_FRAGMENT */
      )),
      _ctx.showText || _ctx.showScore || _ctx.customText ? (openBlock(), createElementBlock(
        "div",
        {
          key: 0,
          class: normalizeClass(["rate-text", _ctx.size])
        },
        [
          createElementVNode(
            "span",
            null,
            toDisplayString(_ctx.showMe),
            1
            /* TEXT */
          ),
          _ctx.customText && !_ctx.showText ? (openBlock(), createElementBlock(
            "span",
            _hoisted_2,
            toDisplayString(_ctx.customText),
            1
            /* TEXT */
          )) : createCommentVNode("v-if", true)
        ],
        2
        /* CLASS */
      )) : createCommentVNode("v-if", true)
    ],
    2
    /* CLASS */
  );
}
var Rate = /* @__PURE__ */ _export_sfc(Rate$1, [["render", _sfc_render]]);

const Plugin = {
  install(Vue) {
    registerComponent(Vue, Rate);
  }
};

export { Rate as BRate, Plugin as default };
