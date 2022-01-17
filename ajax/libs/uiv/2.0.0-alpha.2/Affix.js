import { ref, computed, openBlock, createElementBlock, withDirectives, normalizeClass, unref, normalizeStyle, renderSlot, nextTick } from "vue";
function isFunction(obj) {
  return typeof obj === "function";
}
const EVENTS = {
  MOUSE_ENTER: "mouseenter",
  MOUSE_LEAVE: "mouseleave",
  MOUSE_DOWN: "mousedown",
  MOUSE_UP: "mouseup",
  FOCUS: "focus",
  BLUR: "blur",
  CLICK: "click",
  INPUT: "input",
  KEY_DOWN: "keydown",
  KEY_UP: "keyup",
  KEY_PRESS: "keypress",
  RESIZE: "resize",
  SCROLL: "scroll",
  TOUCH_START: "touchstart",
  TOUCH_END: "touchend"
};
function on(element, event, handler) {
  element.addEventListener(event, handler);
}
function off(element, event, handler) {
  element.removeEventListener(event, handler);
}
const HANDLER = "_uiv_scroll_handler";
const events = [EVENTS.RESIZE, EVENTS.SCROLL];
const mounted = (el, binding) => {
  const callback = binding.value;
  if (!isFunction(callback)) {
    return;
  }
  unmounted(el);
  el[HANDLER] = callback;
  events.forEach((event) => {
    on(window, event, el[HANDLER]);
  });
};
const unmounted = (el) => {
  events.forEach((event) => {
    off(window, event, el[HANDLER]);
  });
  delete el[HANDLER];
};
const updated = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    mounted(el, binding);
  }
};
var vScroll = { mounted, unmounted, updated };
const _sfc_main = {
  props: {
    offset: { type: Number, default: 0 }
  },
  emits: ["affix", "affixed", "unfix", "unfixed"],
  setup(__props, { emit }) {
    const props = __props;
    const el = ref(null);
    const affixed = ref(false);
    const classes = computed(() => ({ affix: affixed.value }));
    const styles = computed(() => ({
      top: affixed.value ? props.offset + "px" : null
    }));
    function onScroll() {
      var _a, _b, _c;
      if (!(((_a = el.value) == null ? void 0 : _a.offsetWidth) || ((_b = el.value) == null ? void 0 : _b.offsetHeight) || ((_c = el.value) == null ? void 0 : _c.getClientRects().length))) {
        return;
      }
      const scroll = {};
      const element = {};
      const rect = el.value.getBoundingClientRect();
      const body = document.body;
      const types = ["Top", "Left"];
      types.forEach((type) => {
        const t = type.toLowerCase();
        scroll[t] = window["page" + (type === "Top" ? "Y" : "X") + "Offset"];
        element[t] = scroll[t] + rect[t] - (el.value["client" + type] || body["client" + type] || 0);
      });
      const fix = scroll.top > element.top - props.offset;
      if (affixed.value !== fix) {
        affixed.value = fix;
        emit(affixed.value ? "affix" : "unfix");
        nextTick(() => {
          emit(affixed.value ? "affixed" : "unfixed");
        });
      }
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "el",
        ref: el,
        class: "hidden-print"
      }, [
        withDirectives((openBlock(), createElementBlock("div", {
          class: normalizeClass(unref(classes)),
          style: normalizeStyle(unref(styles))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6)), [
          [unref(vScroll), onScroll]
        ])
      ], 512);
    };
  }
};
export { _sfc_main as default };
