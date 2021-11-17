import { openBlock, createElementBlock, renderSlot } from "vue";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {};
const _hoisted_1 = {
  class: "btn-toolbar",
  role: "toolbar"
};
function _sfc_render(_ctx, _cache) {
  return openBlock(), createElementBlock("div", _hoisted_1, [
    renderSlot(_ctx.$slots, "default")
  ]);
}
var BtnToolbar = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { BtnToolbar as default };
