import { resolveDirective, openBlock, createElementBlock, withDirectives, createElementVNode, normalizeClass, normalizeStyle, renderSlot } from "vue";
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
const bind = (el, binding) => {
  const callback = binding.value;
  if (!isFunction(callback)) {
    return;
  }
  unbind(el);
  el[HANDLER] = callback;
  events.forEach((event) => {
    on(window, event, el[HANDLER]);
  });
};
const unbind = (el) => {
  events.forEach((event) => {
    off(window, event, el[HANDLER]);
  });
  delete el[HANDLER];
};
const update = (el, binding) => {
  if (binding.value !== binding.oldValue) {
    bind(el, binding);
  }
};
var scroll = { mounted: bind, unmounted: unbind, updated: update };
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const _sfc_main = {
  directives: {
    scroll
  },
  props: {
    offset: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      affixed: false
    };
  },
  computed: {
    classes() {
      return {
        affix: this.affixed
      };
    },
    styles() {
      return {
        top: this.affixed ? this.offset + "px" : null
      };
    }
  },
  methods: {
    onScroll() {
      if (!(this.$el.offsetWidth || this.$el.offsetHeight || this.$el.getClientRects().length)) {
        return;
      }
      const scroll2 = {};
      const element = {};
      const rect = this.$el.getBoundingClientRect();
      const body = document.body;
      const types = ["Top", "Left"];
      types.forEach((type) => {
        const t = type.toLowerCase();
        scroll2[t] = window["page" + (type === "Top" ? "Y" : "X") + "Offset"];
        element[t] = scroll2[t] + rect[t] - (this.$el["client" + type] || body["client" + type] || 0);
      });
      const fix = scroll2.top > element.top - this.offset;
      if (this.affixed !== fix) {
        this.affixed = fix;
        this.$emit(this.affixed ? "affix" : "unfix");
        this.$nextTick(() => {
          this.$emit(this.affixed ? "affixed" : "unfixed");
        });
      }
    }
  }
};
const _hoisted_1 = { class: "hidden-print" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  const _directive_scroll = resolveDirective("scroll");
  return openBlock(), createElementBlock("div", _hoisted_1, [
    withDirectives(createElementVNode("div", {
      class: normalizeClass($options.classes),
      style: normalizeStyle($options.styles)
    }, [
      renderSlot(_ctx.$slots, "default")
    ], 6), [
      [_directive_scroll, $options.onScroll]
    ])
  ]);
}
var Affix = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Affix as default };
