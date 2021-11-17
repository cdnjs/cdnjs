import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  props: {
    size: { type: String, default: void 0 },
    vertical: {
      type: Boolean,
      default: false
    },
    justified: {
      type: Boolean,
      default: false
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass({
      "btn-group": !$props.vertical,
      "btn-group-vertical": $props.vertical,
      "btn-group-justified": $props.justified,
      [`btn-group-${$props.size}`]: $props.size
    }),
    role: "group",
    "data-toggle": "buttons"
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var BtnGroup = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { BtnGroup as default };
