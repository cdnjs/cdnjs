import { openBlock, createElementBlock, normalizeClass, renderSlot } from "vue";
const _sfc_main = {
  props: {
    left: Boolean,
    right: Boolean
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("p", {
        class: normalizeClass({
          "navbar-text": true,
          "navbar-left": __props.left,
          "navbar-right": __props.right
        })
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
export { _sfc_main as default };
