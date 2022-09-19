import { createVNode as y, h as H, render as A } from "vue";
function D(t) {
  return typeof t < "u" && t !== null;
}
function M(t) {
  return typeof t == "function";
}
function V(t) {
  return typeof t == "string";
}
function K(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
const r = {
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
}, m = {
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
function G() {
  const t = window.innerWidth || 0, e = window.innerHeight || 0;
  return { width: t, height: e };
}
function E(t, e, i) {
  t.addEventListener(e, i);
}
function w(t, e, i) {
  t.removeEventListener(e, i);
}
function O(t) {
  return t && t.nodeType === Node.ELEMENT_NODE;
}
function L(t) {
  O(t) && O(t.parentNode) && t.parentNode.removeChild(t);
}
function P(t, e) {
  !O(t) || t.classList.add(e);
}
function F(t, e) {
  !O(t) || t.classList.remove(e);
}
function z(t, e) {
  return O(t) ? t.classList.contains(e) : !1;
}
function B(t, e, i) {
  const s = t.getBoundingClientRect(), h = e.getBoundingClientRect(), a = G();
  let d = !0, S = !0, o = !0, c = !0;
  switch (i) {
    case n.TOP:
      d = s.top >= h.height, c = s.left + s.width / 2 >= h.width / 2, S = s.right - s.width / 2 + h.width / 2 <= a.width;
      break;
    case n.BOTTOM:
      o = s.bottom + h.height <= a.height, c = s.left + s.width / 2 >= h.width / 2, S = s.right - s.width / 2 + h.width / 2 <= a.width;
      break;
    case n.RIGHT:
      S = s.right + h.width <= a.width, d = s.top + s.height / 2 >= h.height / 2, o = s.bottom - s.height / 2 + h.height / 2 <= a.height;
      break;
    case n.LEFT:
      c = s.left >= h.width, d = s.top + s.height / 2 >= h.height / 2, o = s.bottom - s.height / 2 + h.height / 2 <= a.height;
      break;
  }
  return d && S && o && c;
}
function W(t, e, i, s, h, a, d) {
  if (!O(t) || !O(e))
    return;
  const S = t && t.className && t.className.indexOf("popover") >= 0;
  let o, c;
  if (!D(h) || h === "body" || a === "body") {
    const l = document.documentElement;
    c = (window.pageXOffset || l.scrollLeft) - (l.clientLeft || 0), o = (window.pageYOffset || l.scrollTop) - (l.clientTop || 0);
  } else {
    const l = U(a || h);
    c = l.scrollLeft, o = l.scrollTop;
  }
  if (s) {
    const l = [
      n.RIGHT,
      n.BOTTOM,
      n.LEFT,
      n.TOP
    ], C = (p) => {
      l.forEach((I) => {
        F(t, I);
      }), P(t, p);
    };
    if (!B(e, t, i)) {
      for (let p = 0, I = l.length; p < I; p++)
        if (C(l[p]), B(e, t, l[p])) {
          i = l[p];
          break;
        }
      C(i);
    }
  }
  const u = e.getBoundingClientRect(), T = t.getBoundingClientRect();
  let f, g;
  i === n.BOTTOM ? (f = o + u.top + u.height, g = c + u.left + u.width / 2 - T.width / 2) : i === n.LEFT ? (f = o + u.top + u.height / 2 - T.height / 2, g = c + u.left - T.width) : i === n.RIGHT ? (f = o + u.top + u.height / 2 - T.height / 2, g = c + u.left + u.width + 1) : (f = o + u.top - T.height, g = c + u.left + u.width / 2 - T.width / 2);
  let v;
  if (V(d) ? v = document.querySelector(d) : M(d) && (v = d(e)), O(v)) {
    const l = S ? 11 : 0, C = v.getBoundingClientRect(), p = o + C.top, I = c + C.left, $ = p + C.height, N = I + C.width;
    f < p ? f = p : f + T.height > $ && (f = $ - T.height), g < I ? g = I : g + T.width > N && (g = N - T.width), i === n.BOTTOM ? f -= l : i === n.LEFT ? g += l : i === n.RIGHT ? g -= l : f += l;
  }
  t.style.top = `${f}px`, t.style.left = `${g}px`;
}
const Y = "modal-backdrop";
function b() {
  return document.querySelectorAll(`.${Y}`);
}
function Z() {
  return b().length;
}
function U(t) {
  return V(t) ? document.querySelector(t) : O(t) ? t : O(t.$el) ? t.$el : null;
}
const R = "in", X = {
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
    L(this.$refs.popup), this.$nextTick(() => {
      this.initTriggerElByTarget(this.target), this.initListeners(), this.modelValue && this.show();
    });
  },
  beforeUnmount() {
    this.clearListeners(), L(this.$refs.popup);
  },
  methods: {
    initTriggerElByTarget(t) {
      if (t)
        this.triggerEl = U(t);
      else {
        const e = this.$el.querySelector('[data-role="trigger"]');
        if (e)
          this.triggerEl = e;
        else {
          const i = this.$el.querySelector("*");
          this.triggerEl = i === this.$refs.popup ? null : i;
        }
      }
    },
    initListeners() {
      this.triggerEl && (this.trigger === m.HOVER ? (E(this.triggerEl, r.MOUSE_ENTER, this.show), E(this.triggerEl, r.MOUSE_LEAVE, this.hide)) : this.trigger === m.FOCUS ? (E(this.triggerEl, r.FOCUS, this.show), E(this.triggerEl, r.BLUR, this.hide)) : this.trigger === m.HOVER_FOCUS ? (E(this.triggerEl, r.MOUSE_ENTER, this.handleAuto), E(this.triggerEl, r.MOUSE_LEAVE, this.handleAuto), E(this.triggerEl, r.FOCUS, this.handleAuto), E(this.triggerEl, r.BLUR, this.handleAuto)) : (this.trigger === m.CLICK || this.trigger === m.OUTSIDE_CLICK) && E(this.triggerEl, r.CLICK, this.toggle)), E(window, r.CLICK, this.windowClicked);
    },
    clearListeners() {
      this.triggerEl && (w(this.triggerEl, r.FOCUS, this.show), w(this.triggerEl, r.BLUR, this.hide), w(this.triggerEl, r.MOUSE_ENTER, this.show), w(this.triggerEl, r.MOUSE_LEAVE, this.hide), w(this.triggerEl, r.CLICK, this.toggle), w(this.triggerEl, r.MOUSE_ENTER, this.handleAuto), w(this.triggerEl, r.MOUSE_LEAVE, this.handleAuto), w(this.triggerEl, r.FOCUS, this.handleAuto), w(this.triggerEl, r.BLUR, this.handleAuto)), w(window, r.CLICK, this.windowClicked), this.clearTimeouts();
    },
    clearTimeouts() {
      this.hideTimeoutId && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = 0), this.showTimeoutId && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.transitionTimeoutId && (clearTimeout(this.transitionTimeoutId), this.transitionTimeoutId = 0), this.autoTimeoutId && (clearTimeout(this.autoTimeoutId), this.autoTimeoutId = 0);
    },
    resetPosition() {
      const t = this.$refs.popup;
      t && (W(
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
      (this.trigger === m.HOVER || this.trigger === m.HOVER_FOCUS && !this.triggerEl.matches(":focus")) && this.$hide();
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
            const i = Z();
            if (i > 1) {
              const s = this.name === "popover" ? 1060 : 1070, h = (i - 1) * 20;
              e.style.zIndex = `${s + h}`;
            }
            t || (e.className = `${this.name} ${this.placement} ${this.customClass ? this.customClass : ""} fade`, U(this.appendTo).appendChild(e), this.resetPosition()), P(e, R), this.$emit("update:modelValue", !0), this.$emit("show");
          }
        }, this.showDelay);
      }
    },
    hide() {
      this.showTimeoutId > 0 && (clearTimeout(this.showTimeoutId), this.showTimeoutId = 0), this.isShown() && (this.enterable && (this.trigger === m.HOVER || this.trigger === m.HOVER_FOCUS) ? (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = setTimeout(() => {
        this.hideTimeoutId = 0;
        const t = this.$refs.popup;
        t && !t.matches(":hover") && this.$hide();
      }, 100)) : this.$hide());
    },
    $hide() {
      this.isShown() && (clearTimeout(this.hideTimeoutId), this.hideTimeoutId = setTimeout(() => {
        this.hideTimeoutId = 0, F(this.$refs.popup, R), this.transitionTimeoutId = setTimeout(() => {
          this.transitionTimeoutId = 0, L(this.$refs.popup), this.$emit("update:modelValue", !1), this.$emit("hide");
        }, this.transition);
      }, this.hideDelay));
    },
    isShown() {
      return z(this.$refs.popup, R);
    },
    windowClicked(t) {
      this.triggerEl && M(this.triggerEl.contains) && !this.triggerEl.contains(t.target) && this.trigger === m.OUTSIDE_CLICK && !(this.$refs.popup && this.$refs.popup.contains(t.target)) && this.isShown() && this.hide();
    },
    handleAuto() {
      clearTimeout(this.autoTimeoutId), this.autoTimeoutId = setTimeout(() => {
        this.autoTimeoutId = 0, this.triggerEl.matches(":hover, :focus") ? this.show() : this.hide();
      }, 20);
    }
  }
}, j = {
  mixins: [X],
  props: {
    text: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: m.HOVER_FOCUS
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
        var e, i;
        return [(i = (e = this.$slots).default) == null ? void 0 : i.call(e), y("div", {
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
}, _ = "_uiv_tooltip_instance", k = (t, e) => {
  x(t);
  const i = [];
  for (const o in e.modifiers)
    K(e.modifiers, o) && e.modifiers[o] && i.push(o);
  let s, h, a;
  i.forEach((o) => {
    /(top)|(left)|(right)|(bottom)/.test(o) ? s = o : /(hover)|(focus)|(click)/.test(o) ? h = o : /unenterable/.test(o) && (a = !1);
  });
  const d = H(j, {
    target: t,
    appendTo: e.arg && "#" + e.arg,
    text: typeof e.value == "string" ? e.value && e.value.toString() : e.value && e.value.text && e.value.text.toString(),
    positionBy: e.value && e.value.positionBy && e.value.positionBy.toString(),
    viewport: e.value && e.value.viewport && e.value.viewport.toString(),
    customClass: e.value && e.value.customClass && e.value.customClass.toString(),
    showDelay: e.value && e.value.showDelay,
    hideDelay: e.value && e.value.hideDelay,
    enterable: a,
    placement: s,
    trigger: h
  }), S = document.createElement("div");
  A(d, S), t[_] = { container: S, vNode: d };
}, x = (t) => {
  const e = t[_];
  if (e) {
    try {
      L(e.vNode.component.ctx.$refs.popup);
    } catch {
    }
    A(null, e.container);
  }
  delete t[_];
}, q = (t, e) => {
  e.value !== e.oldValue && k(t, e);
}, Q = { mounted: k, unmounted: x, updated: q };
export {
  Q as default
};
