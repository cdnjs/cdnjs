import { createVNode as v, h as D, render as A } from "vue";
function K(t) {
  return typeof t < "u" && t !== null;
}
function M(t) {
  return typeof t == "function";
}
function P(t) {
  return typeof t == "string";
}
function x(t, e) {
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
}, l = {
  TOP: "top",
  RIGHT: "right",
  BOTTOM: "bottom",
  LEFT: "left"
};
function b() {
  const t = window.innerWidth || 0, e = window.innerHeight || 0;
  return { width: t, height: e };
}
function E(t, e, s) {
  t.addEventListener(e, s);
}
function w(t, e, s) {
  t.removeEventListener(e, s);
}
function O(t) {
  return t && t.nodeType === Node.ELEMENT_NODE;
}
function L(t) {
  O(t) && O(t.parentNode) && t.parentNode.removeChild(t);
}
function V(t, e) {
  !O(t) || t.classList.add(e);
}
function k(t, e) {
  !O(t) || t.classList.remove(e);
}
function G(t, e) {
  return O(t) ? t.classList.contains(e) : !1;
}
function B(t, e, s) {
  const i = t.getBoundingClientRect(), o = e.getBoundingClientRect(), a = b();
  let c = !0, S = !0, h = !0, d = !0;
  switch (s) {
    case l.TOP:
      c = i.top >= o.height, d = i.left + i.width / 2 >= o.width / 2, S = i.right - i.width / 2 + o.width / 2 <= a.width;
      break;
    case l.BOTTOM:
      h = i.bottom + o.height <= a.height, d = i.left + i.width / 2 >= o.width / 2, S = i.right - i.width / 2 + o.width / 2 <= a.width;
      break;
    case l.RIGHT:
      S = i.right + o.width <= a.width, c = i.top + i.height / 2 >= o.height / 2, h = i.bottom - i.height / 2 + o.height / 2 <= a.height;
      break;
    case l.LEFT:
      d = i.left >= o.width, c = i.top + i.height / 2 >= o.height / 2, h = i.bottom - i.height / 2 + o.height / 2 <= a.height;
      break;
  }
  return c && S && h && d;
}
function z(t, e, s, i, o, a, c) {
  if (!O(t) || !O(e))
    return;
  const S = t && t.className && t.className.indexOf("popover") >= 0;
  let h, d;
  if (!K(o) || o === "body" || a === "body") {
    const n = document.documentElement;
    d = (window.pageXOffset || n.scrollLeft) - (n.clientLeft || 0), h = (window.pageYOffset || n.scrollTop) - (n.clientTop || 0);
  } else {
    const n = U(a || o);
    d = n.scrollLeft, h = n.scrollTop;
  }
  if (i) {
    const n = [
      l.RIGHT,
      l.BOTTOM,
      l.LEFT,
      l.TOP
    ], C = (p) => {
      n.forEach((I) => {
        k(t, I);
      }), V(t, p);
    };
    if (!B(e, t, s)) {
      for (let p = 0, I = n.length; p < I; p++)
        if (C(n[p]), B(e, t, n[p])) {
          s = n[p];
          break;
        }
      C(s);
    }
  }
  const u = e.getBoundingClientRect(), T = t.getBoundingClientRect();
  let f, g;
  s === l.BOTTOM ? (f = h + u.top + u.height, g = d + u.left + u.width / 2 - T.width / 2) : s === l.LEFT ? (f = h + u.top + u.height / 2 - T.height / 2, g = d + u.left - T.width) : s === l.RIGHT ? (f = h + u.top + u.height / 2 - T.height / 2, g = d + u.left + u.width + 1) : (f = h + u.top - T.height, g = d + u.left + u.width / 2 - T.width / 2);
  let y;
  if (P(c) ? y = document.querySelector(c) : M(c) && (y = c(e)), O(y)) {
    const n = S ? 11 : 0, C = y.getBoundingClientRect(), p = h + C.top, I = d + C.left, N = p + C.height, _ = I + C.width;
    f < p ? f = p : f + T.height > N && (f = N - T.height), g < I ? g = I : g + T.width > _ && (g = _ - T.width), s === l.BOTTOM ? f -= n : s === l.LEFT ? g += n : s === l.RIGHT ? g -= n : f += n;
  }
  t.style.top = `${f}px`, t.style.left = `${g}px`;
}
const W = "modal-backdrop";
function Y() {
  return document.querySelectorAll(`.${W}`);
}
function Z() {
  return Y().length;
}
function U(t) {
  return P(t) ? document.querySelector(t) : O(t) ? t : O(t.$el) ? t.$el : null;
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
      default: l.TOP
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
          const s = this.$el.querySelector("*");
          this.triggerEl = s === this.$refs.popup ? null : s;
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
      t && (z(
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
            const s = Z();
            if (s > 1) {
              const i = this.name === "popover" ? 1060 : 1070, o = (s - 1) * 20;
              e.style.zIndex = `${i + o}`;
            }
            t || (e.className = `${this.name} ${this.placement} ${this.customClass ? this.customClass : ""} fade`, U(this.appendTo).appendChild(e), this.resetPosition()), V(e, R), this.$emit("update:modelValue", !0), this.$emit("show");
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
        this.hideTimeoutId = 0, k(this.$refs.popup, R), this.transitionTimeoutId = setTimeout(() => {
          this.transitionTimeoutId = 0, L(this.$refs.popup), this.$emit("update:modelValue", !1), this.$emit("hide");
        }, this.transition);
      }, this.hideDelay));
    },
    isShown() {
      return G(this.$refs.popup, R);
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
    title: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    trigger: {
      type: String,
      default: m.OUTSIDE_CLICK
    }
  },
  data() {
    return {
      name: "popover"
    };
  },
  computed: {
    allContent() {
      return this.title + this.content;
    }
  },
  methods: {
    isNotEmpty() {
      return this.title || this.content || this.$slots.popover;
    }
  },
  render() {
    const t = this.tag;
    return v(t, null, {
      default: () => {
        var e, s, i, o;
        return [(s = (e = this.$slots).default) == null ? void 0 : s.call(e), v("div", {
          style: {
            display: "block"
          },
          ref: "popup",
          onMouseleave: this.hideOnLeave
        }, [v("div", {
          class: "arrow"
        }, null), this.title ? v("h3", {
          class: "popover-title"
        }, [this.title]) : null, v("div", {
          className: "popover-content"
        }, [this.content || ((o = (i = this.$slots).popover) == null ? void 0 : o.call(i))])])];
      }
    });
  }
}, $ = "_uiv_popover_instance", F = (t, e) => {
  H(t);
  const s = [];
  for (const h in e.modifiers)
    x(e.modifiers, h) && e.modifiers[h] && s.push(h);
  let i, o, a;
  s.forEach((h) => {
    /(top)|(left)|(right)|(bottom)/.test(h) ? i = h : /(hover)|(focus)|(click)/.test(h) ? o = h : /unenterable/.test(h) && (a = !1);
  });
  const c = D(j, {
    target: t,
    appendTo: e.arg && "#" + e.arg,
    title: e.value && e.value.title && e.value.title.toString(),
    positionBy: e.value && e.value.positionBy && e.value.positionBy.toString(),
    content: e.value && e.value.content && e.value.content.toString(),
    viewport: e.value && e.value.viewport && e.value.viewport.toString(),
    customClass: e.value && e.value.customClass && e.value.customClass.toString(),
    enterable: a,
    placement: i,
    trigger: o
  }), S = document.createElement("div");
  A(c, S), t[$] = S;
}, H = (t) => {
  const e = t[$];
  e && A(null, e), delete t[$];
}, q = (t, e) => {
  e.value !== e.oldValue && F(t, e);
}, Q = { mounted: F, unmounted: H, updated: q };
export {
  Q as default
};
