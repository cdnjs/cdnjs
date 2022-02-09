import { defineComponent, ref, watch, onMounted, h, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, renderSlot, createVNode, withCtx } from "vue";
function isElement(el) {
  return el && el.nodeType === Node.ELEMENT_NODE;
}
function addClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  el.classList.add(className);
}
function removeClass(el, className) {
  if (!isElement(el)) {
    return;
  }
  el.classList.remove(className);
}
const _sfc_main$1 = defineComponent({
  props: {
    tag: { type: String, default: "div" },
    modelValue: { type: Boolean, default: false },
    transition: { type: Number, default: 350 }
  },
  emits: ["show", "shown", "hide", "hidden"],
  setup(props, { emit, slots }) {
    const COLLAPSE = "collapse";
    const IN = "in";
    const COLLAPSING = "collapsing";
    let timeoutId = 0;
    const element = ref(null);
    function toggle() {
      const show = props.modelValue;
      const el = element.value;
      clearTimeout(timeoutId);
      if (!el) {
        return;
      }
      if (show) {
        emit("show");
        removeClass(el, COLLAPSE);
        el.style.height = "auto";
        const height = window.getComputedStyle(el).height;
        el.style.height = null;
        addClass(el, COLLAPSING);
        el.offsetHeight;
        el.style.height = height;
        timeoutId = setTimeout(() => {
          removeClass(el, COLLAPSING);
          addClass(el, COLLAPSE);
          addClass(el, IN);
          el.style.height = null;
          timeoutId = 0;
          emit("shown");
        }, props.transition);
      } else {
        emit("hide");
        el.style.height = window.getComputedStyle(el).height;
        removeClass(el, IN);
        removeClass(el, COLLAPSE);
        el.offsetHeight;
        el.style.height = null;
        addClass(el, COLLAPSING);
        timeoutId = setTimeout(() => {
          addClass(el, COLLAPSE);
          removeClass(el, COLLAPSING);
          el.style.height = null;
          timeoutId = 0;
          emit("hidden");
        }, props.transition);
      }
    }
    watch(() => props.modelValue, () => {
      toggle();
    });
    onMounted(() => {
      if (props.modelValue) {
        addClass(element.value, IN);
      }
    });
    return () => {
      var _a;
      return h(props.tag, { ref: element, class: COLLAPSE }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const _hoisted_1 = { class: "navbar-header" };
const _hoisted_2 = /* @__PURE__ */ createElementVNode("span", { class: "sr-only" }, "Toggle navigation", -1);
const _hoisted_3 = /* @__PURE__ */ createElementVNode("span", { class: "icon-bar" }, null, -1);
const _hoisted_4 = /* @__PURE__ */ createElementVNode("span", { class: "icon-bar" }, null, -1);
const _hoisted_5 = /* @__PURE__ */ createElementVNode("span", { class: "icon-bar" }, null, -1);
const _hoisted_6 = [
  _hoisted_2,
  _hoisted_3,
  _hoisted_4,
  _hoisted_5
];
const _sfc_main = {
  props: {
    modelValue: Boolean,
    fluid: { type: Boolean, default: true },
    fixedTop: Boolean,
    fixedBottom: Boolean,
    staticTop: Boolean,
    inverse: Boolean
  },
  emits: ["update:modalValue"],
  setup(__props, { emit }) {
    const props = __props;
    const show = ref(false);
    const navClasses = computed(() => ({
      navbar: true,
      "navbar-default": !props.inverse,
      "navbar-inverse": props.inverse,
      "navbar-static-top": props.staticTop,
      "navbar-fixed-bottom": props.fixedBottom,
      "navbar-fixed-top": props.fixedTop
    }));
    watch(() => props.modelValue, (v) => {
      show.value = v;
    });
    onMounted(() => {
      show.value = !!props.modelValue;
    });
    function toggle() {
      show.value = !show.value;
      emit("update:modalValue", show.value);
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("nav", {
        class: normalizeClass(unref(navClasses))
      }, [
        createElementVNode("div", {
          class: normalizeClass(__props.fluid ? "container-fluid" : "container")
        }, [
          createElementVNode("div", _hoisted_1, [
            renderSlot(_ctx.$slots, "collapse-btn", {}, () => [
              createElementVNode("button", {
                type: "button",
                class: "navbar-toggle collapsed",
                onClick: toggle
              }, _hoisted_6)
            ]),
            renderSlot(_ctx.$slots, "brand")
          ]),
          renderSlot(_ctx.$slots, "default"),
          createVNode(_sfc_main$1, {
            modelValue: show.value,
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => show.value = $event),
            class: "navbar-collapse"
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "collapse")
            ]),
            _: 3
          }, 8, ["modelValue"])
        ], 2)
      ], 2);
    };
  }
};
export { _sfc_main as default };
