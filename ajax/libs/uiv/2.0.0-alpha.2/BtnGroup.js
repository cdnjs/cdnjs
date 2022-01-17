import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
const _sfc_main = {
  props: {
    size: { type: String, default: void 0 },
    vertical: { type: Boolean, default: false },
    justified: { type: Boolean, default: false }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass({
          "btn-group": !__props.vertical,
          "btn-group-vertical": __props.vertical,
          "btn-group-justified": __props.justified,
          [`btn-group-${__props.size}`]: __props.size
        }),
        role: "group",
        "data-toggle": "buttons"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
export { _sfc_main as default };
