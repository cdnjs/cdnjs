import { createVNode as y } from "vue";
function V(t) {
  return typeof t < "u" && t !== null;
}
function B(t) {
  return typeof t == "function";
}
function M(t) {
  return typeof t == "string";
}
const o = {
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
}, f = {
  CLICK: "click",
  HOVER: "hover",
  FOCUS: "focus",
  HOVER_FOCUS: "hover-focus",
  OUTSIDE_CLICK: "outside-click",
  MANUAL: "manual"
}, n = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
};
function F() {
  const t = window.innerWidth || 0, e = window.innerHeight || 0;
  return { width: t, height: e };
}
function m(t, e, s) {
  t.addEventListener(e, s);
}
function T(t, e, s) {
  t.removeEventListener(e, s);
}
function E(t) {
  return t && t.nodeType === Node.ELEMENT_NODE;
}
function R(t) {
  E(t) && E(t.parentNode) && t.parentNode.removeChild(t);
}
function A(t, e) {
  !E(t) || t.classList.add(e);
}
function b(t, e) {
  !E(t) || t.classList.remove(e);
}
function P(t, e) {
  return E(t) ? t.classList.contains(e) : !1;
}
function N(t, e, s) {
  const i = t.getBoundingClientRect(), h = e.getBoundingClientRect(), w = F();
  let O = !0, C = !0, u = !0, d = !0;
  switch (s) {
    case n.TOP:
      O = i.top >= h.height, d = i.left + i.width / 2 >= h.width / 2, C = i.right - i.width / 2 + h.width / 2 <= w.width;
      break;
    case n.BOTTOM:
      u = i.bottom + h.height <= w.height, d = i.left + i.width / 2 >= h.width / 2, C = i.right - i.width / 2 + h.width / 2 <= w.width;
      break;
    case n.RIGHT:
      C = i.right + h.width <= w.width, O = i.top + i.height / 2 >= h.height / 2, u = i.bottom - i.height / 2 + h.height / 2 <= w.height;
      break;
    case n.LEFT:
      d = i.left >= h.width, O = i.top + i.height / 2 >= h.height / 2, u = i.bottom - i.height / 2 + h.height / 2 <= w.height;
      break;
  }
  return O && C && u && d;
}
function H(t, e, s, i, h, w, O) {
  if (!E(t) || !E(e))
    return;
  const C = t && t.className && t.className.indexOf("popover") >= 0;
  let u, d;
  if (!V(h) || h === "body" || w === "body") {
    const r = document.documentElement;
    d = (window.pageXOffset || r.scrollLeft) - (r.clientLeft || 0), u = (window.pageYOffset || r.scrollTop) - (r.clientTop || 0);
  } else {
    const r = $(w || h);
    d = r.scrollLeft, u = r.scrollTop;
  }
  if (i) {
    const r = [
      n.RIGHT,
      n.BOTTOM,
      n.LEFT,
      n.TOP
    ], I = (c) => {
      r.forEach((S) => {
        b(t, S);
      }), A(t, c);
    };
    if (!N(e, t, s)) {
      for (let c = 0, S = r.length; c < S; c++)
        if (I(r[c]), N(e, t, r[c])) {
          s = r[c];
          break;
        }
      I(s);
    }
  }
  const l = e.getBoundingClientRect(), p = t.getBoundingClientRect();
  let a, g;
  s === n.BOTTOM ? (a = u + l.top + l.height, g = d + l.left + l.width / 2 - p.width / 2) : s === n.LEFT ? (a = u + l.top + l.height / 2 - p.height / 2, g = d + l.left - p.width) : s === n.RIGHT ? (a = u + l.top + l.height / 2 - p.height / 2, g = d + l.left + l.width + 1) : (a = u + l.top - p.height, g = d + l.left + l.width / 2 - p.width / 2);
  let L;
  if (M(O) ? L = document.querySelector(O) : B(O) && (L = O(e)), E(L)) {
    const r = C ? 11 : 0, I = L.getBoundingClientRect(), c = u + I.top, S = d + I.left, _ = c + I.height, v = S + I.width;
    a < c ? a = c : a + p.height > _ && (a = _ - p.height), g < S ? g = S : g + p.width > v && (g = v - p.width), s === n.BOTTOM ? a -= r : s === n.LEFT ? g += r : s === n.RIGHT ? g -= r : a += r;
  }
  t.style.top = `${a}px`, t.style.left = `${g}px`;
}
const k = "modal-backdrop";
function x() {
  return document.querySelectorAll(`.${k}`);
}
function D() {
  return x().length;
}
function $(t) {
  return M(t) ? document.querySelector(t) : E(t) ? t : E(t.$el) ? t.$el : null;
}
const U = "in", K = {
  props: {
    modelValue: {
      type: Boolean,
      default: !1
    },
    tag: {
      type: String,
      default: "span"
    },
    placement: {
      type: String,
      default: n.TOP
    },
    autoPlacement: {
      type: Boolean,
      default: !0
    },
    appendTo: {
      type: null,
      default: "body"
    },
    positionBy: {
      type: null,
      default: null
    },
    transition: {
      type: Number,
      default: 150
    },
    hideDelay: {
      type: Number,
      default: 0
    },
    showDelay: {
      type: Number,
      default: 0
    },
    enable: {
      type: Boolean,
      default: !0
    },
    enterable: {
      type: Boolean,
      default: !0
    },
    target: null,
    viewport: null,
    customClass: String
  },
  data() {
    return {
      triggerEl: null,
      hideTimeoutId: 0,
      showTimeoutId: 0,
      transitionTimeoutId: 0,
      autoTimeoutId: 0
    };
  },
  watch: {
    modelValue(t) {
      t ? this.show() : this.hide();
    },
    trigger() {
      this.clearListeners(), this.initListeners();
    },
    target(t) {
      this.clearListeners(), this.initTriggerElByTarget(t), this.initListeners();
    },
    allContent(t) {
      this.isNotEmpty() ? this.$nextTick(() => {
        this.isShown() && this.resetPosition();
      }) : this.hide();
    },
    enable(t) {
      t || this.hide();
    }
  },
  mounted() {
    R(this.$refs.popup), this.$nextTick(() => {
      this.initTriggerElByTarget(this.target), this.initListeners(), this.modelValue && this.show();
    });
  },
  beforeUnmount() {
    this.clearListeners(), R(this.$refs.popup);
  },
  methods: {
    initTriggerElByTarget(t) {
      if (t)
        this.triggerEl = $(t);
      else {
        const e = this.$el.querySelector('[data-role="trigger"]');
        if (e)
          this.triggerEl = e;
        else {
          const s = this.$el.querySelector("*");
          this.triggerEl = s === this.$refs.popup ? null : s;
        }
      }
    },
    initListeners() {
      this.triggerEl && (this.trigger === f.HOVER ? (m(this.triggerEl, o.MOUSE_ENTER, this.show), m(this.triggerEl, o.MOUSE_LEAVE, this.hide)) : this.trigger === f.FOCUS ? (m(this.triggerEl, o.FOCUS, this.show), m(this.triggerEl, o.BLUR, this.hide)) : this.trigger === f.HOVER_FOCUS ? (m(this.triggerEl, o.MOUSE_ENTER, this.handleAuto), m(this.triggerEl, o.MOUSE_LEAVE, this.handleAuto), m(this.triggerEl, o.FOCUS, this.handleAuto), m(this.triggerEl, o.BLUR, this.handleAuto)) : (this.trigger === f.CLICK || this.trigger === f.OUTSIDE_CLICK) && m(this.triggerEl, o.CLICK, this.toggle)), m(window, o.CLICK, this.windowClicked);
    },
    clearListeners() {
      this.triggerEl && (T(this.triggerEl, o.FOCUS, this.show), T(this.triggerEl, o.BLUR, this.hide), T(this.triggerEl, o.MOUSE_ENTER, this.show), T(this.triggerEl, o.MOUSE_LEAVE, this.hide), T(this.triggerEl, o.CLICK, this.toggle), T(this.triggerEl, o.MOUSE_ENTER, this.handleAuto), T(this.triggerEl, o.MOUSE_LEAVE, this.handleAuto), T(this.triggerEl, o.FOCUS, this.handleAuto), T(this.triggerEl, o.BLUR, this.handleAuto)), T(window, o.CLICK, this.windowClicked), this.clearTimeouts();
    },
    clearTimeouts() {
      this.hideTimeoutId && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = 0), this.showTimeoutId && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.transitionTimeoutId && (clearTimeout(this.transitionTimeoutId), this.transitionTimeoutId = 0), this.autoTimeoutId && (clearTimeout(this.autoTimeoutId), this.autoTimeoutId = 0);
    },
    resetPosition() {
      const t = this.$refs.popup;
      t && (H(
        t,
        this.triggerEl,
        this.placement,
        this.autoPlacement,
        this.appendTo,
        this.positionBy,
        this.viewport
      ), t.offsetHeight);
    },
    hideOnLeave() {
      (this.trigger === f.HOVER || this.trigger === f.HOVER_FOCUS && !this.triggerEl.matches(":focus")) && this.$hide();
    },
    toggle() {
      this.isShown() ? this.hide() : this.show();
    },
    show() {
      if (this.enable && this.triggerEl && this.isNotEmpty() && !this.isShown()) {
        const t = this.hideTimeoutId > 0;
        t && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = 0), this.transitionTimeoutId > 0 && (clearTimeout(this.transitionTimeoutId), this.transitionTimeoutId = 0), clearTimeout(this.showTimeoutId), this.showTimeoutId = setTimeout(() => {
          this.showTimeoutId = 0;
          const e = this.$refs.popup;
          if (e) {
            const s = D();
            if (s > 1) {
              const i = this.name === "popover" ? 1060 : 1070, h = (s - 1) * 20;
              e.style.zIndex = `${i + h}`;
            }
            t || (e.className = `${this.name} ${this.placement} ${this.customClass ? this.customClass : ""} fade`, $(this.appendTo).appendChild(e), this.resetPosition()), A(e, U), this.$emit("update:modelValue", !0), this.$emit("show");
          }
        }, this.showDelay);
      }
    },
    hide() {
      this.showTimeoutId > 0 && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.isShown() && (this.enterable && (this.trigger === f.HOVER || this.trigger === f.HOVER_FOCUS) ? (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = setTimeout(() => {
        this.hideTimeoutId = 0;
        const t = this.$refs.popup;
        t && !t.matches(":hover") && this.$hide();
      }, 100)) : this.$hide());
    },
    $hide() {
      this.isShown() && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = setTimeout(() => {
        this.hideTimeoutId = 0, b(this.$refs.popup, U), this.transitionTimeoutId = setTimeout(() => {
          this.transitionTimeoutId = 0, R(this.$refs.popup), this.$emit("update:modelValue", !1), this.$emit("hide");
        }, this.transition);
      }, this.hideDelay));
    },
    isShown() {
      return P(this.$refs.popup, U);
    },
    windowClicked(t) {
      this.triggerEl && B(this.triggerEl.contains) && !this.triggerEl.contains(t.target) && this.trigger === f.OUTSIDE_CLICK && !(this.$refs.popup && this.$refs.popup.contains(t.target)) && this.isShown() && this.hide();
    },
    handleAuto() {
      clearTimeout(this.autoTimeoutId), this.autoTimeoutId = setTimeout(() => {
        this.autoTimeoutId = 0, this.triggerEl.matches(":hover, :focus") ? this.show() : this.hide();
      }, 20);
    }
  }
}, z = {
  mixins: [K],
  props: {
    text: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: f.HOVER_FOCUS
    }
  },
  data() {
    return {
      name: "tooltip"
    };
  },
  computed: {
    allContent() {
      return this.text;
    }
  },
  methods: {
    isNotEmpty() {
      return this.text;
    }
  },
  render() {
    const t = this.tag;
    return y(t, null, {
      default: () => {
        var e, s;
        return [(s = (e = this.$slots).default) == null ? void 0 : s.call(e), y("div", {
          ref: "popup",
          role: "tooltip",
          onMouseleave: this.hideOnLeave
        }, [y("div", {
          class: "tooltip-arrow"
        }, null), y("div", {
          class: "tooltip-inner"
        }, [this.text])])];
      }
    });
  }
};
export {
  z as default
};
