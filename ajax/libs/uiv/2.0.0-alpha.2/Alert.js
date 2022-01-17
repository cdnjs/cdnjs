import { computed, onMounted, onUnmounted, openBlock, createElementBlock, normalizeClass, unref, createCommentVNode, renderSlot, createElementVNode } from "vue";
const _hoisted_1 = /* @__PURE__ */ createElementVNode("span", { "aria-hidden": "true" }, "\xD7", -1);
const _hoisted_2 = [
  _hoisted_1
];
const _sfc_main = {
  props: {
    dismissible: { type: Boolean, default: false },
    duration: { type: Number, default: 0 },
    type: { type: String, default: "info" }
  },
  emits: ["dismissed"],
  setup(__props, { emit }) {
    const props = __props;
    let timeout = 0;
    const alertClass = computed(() => ({
      alert: true,
      [`alert-${props.type}`]: !!props.type,
      "alert-dismissible": props.dismissible
    }));
    function closeAlert() {
      clearTimeout(timeout);
      emit("dismissed");
    }
    onMounted(() => {
      if (props.duration > 0) {
        timeout = setTimeout(closeAlert, props.duration);
      }
    });
    onUnmounted(() => {
      clearTimeout(timeout);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        role: "alert",
        class: normalizeClass(unref(alertClass))
      }, [
        __props.dismissible ? (openBlock(), createElementBlock("button", {
          key: 0,
          type: "button",
          class: "close",
          "aria-label": "Close",
          onClick: closeAlert
        }, _hoisted_2)) : createCommentVNode("", true),
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
};
export { _sfc_main as default };
