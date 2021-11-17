import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  props: {
    left: Boolean,
    right: Boolean
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("form", {
    class: normalizeClass({
      "navbar-form": true,
      "navbar-left": $props.left,
      "navbar-right": $props.right
    })
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 2);
}
var NavbarForm = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { NavbarForm as default };
