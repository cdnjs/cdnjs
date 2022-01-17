import { openBlock, createElementBlock, renderSlot } from "vue";
const _hoisted_1 = {
  class: "btn-toolbar",
  role: "toolbar"
};
const _sfc_main = {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "default")
      ]);
    };
  }
};
export { _sfc_main as default };
