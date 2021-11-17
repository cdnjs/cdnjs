import { openBlock, createElementBlock, normalizeClass, createCommentVNode, renderSlot, createElementVNode } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  props: {
    dismissible: {
      type: Boolean,
      default: false
    },
    duration: {
      type: Number,
      default: 0
    },
    type: {
      type: String,
      default: "info"
    }
  },
  emits: ["dismissed"],
  data() {
    return {
      timeout: 0
    };
  },
  computed: {
    alertClass() {
      return {
        alert: true,
        [`alert-${this.type}`]: Boolean(this.type),
        "alert-dismissible": this.dismissible
      };
    }
  },
  mounted() {
    if (this.duration > 0) {
      this.timeout = setTimeout(this.closeAlert, this.duration);
    }
  },
  unmounted() {
    clearTimeout(this.timeout);
  },
  methods: {
    closeAlert() {
      clearTimeout(this.timeout);
      this.$emit("dismissed");
    }
  }
};
const _hoisted_1 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_2 = [
  _hoisted_1
];
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    role: "alert",
    class: normalizeClass($options.alertClass)
  }, [
    $props.dismissible ? (openBlock(), createElementBlock("button", {
      key: 0,
      type: "button",
      class: "close",
      "aria-label": "Close",
      onClick: _cache[0] || (_cache[0] = (...args) => $options.closeAlert && $options.closeAlert(...args))
    }, _hoisted_2)) : createCommentVNode("", true),
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var Alert = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Alert as default };
