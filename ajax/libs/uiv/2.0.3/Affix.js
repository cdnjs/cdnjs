import { ref as v, computed as m, openBlock as _, createElementBlock as S, withDirectives as T, normalizeClass as k, unref as i, normalizeStyle as N, renderSlot as D, nextTick as g } from "vue";
function A(e) {
  return typeof e == "function";
}
const x = {
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
function B(e, t, o) {
  e.addEventListener(t, o);
}
function H(e, t, o) {
  e.removeEventListener(t, o);
}
const u = "_uiv_scroll_handler", h = [x.RESIZE, x.SCROLL], L = (e, t) => {
  const o = t.value;
  !A(o) || (O(e), e[u] = o, h.forEach((n) => {
    B(window, n, e[u]);
  }));
}, O = (e) => {
  h.forEach((t) => {
    H(window, t, e[u]);
  }), delete e[u];
}, I = (e, t) => {
  t.value !== t.oldValue && L(e, t);
}, K = { mounted: L, unmounted: O, updated: I }, Y = {
  __name: "Affix",
  props: {
    offset: { type: Number, default: 0 }
  },
  emits: ["affix", "affixed", "unfix", "unfixed"],
  setup(e, { emit: t }) {
    const o = e, n = v(null), s = v(!1), C = m(() => ({ affix: s.value })), R = m(() => ({
      top: s.value ? o.offset + "px" : null
    }));
    function U() {
      var d, E, p;
      if (!(((d = n.value) == null ? void 0 : d.offsetWidth) || ((E = n.value) == null ? void 0 : E.offsetHeight) || ((p = n.value) == null ? void 0 : p.getClientRects().length)))
        return;
      const c = {}, a = {}, w = n.value.getBoundingClientRect(), y = document.body;
      ["Top", "Left"].forEach((l) => {
        const f = l.toLowerCase();
        c[f] = window["page" + (l === "Top" ? "Y" : "X") + "Offset"], a[f] = c[f] + w[f] - (n.value["client" + l] || y["client" + l] || 0);
      });
      const r = c.top > a.top - o.offset;
      s.value !== r && (s.value = r, t(s.value ? "affix" : "unfix"), g(() => {
        t(s.value ? "affixed" : "unfixed");
      }));
    }
    return (c, a) => (_(), S("div", {
      ref_key: "el",
      ref: n,
      class: "hidden-print"
    }, [
      T((_(), S("div", {
        class: k(i(C)),
        style: N(i(R))
      }, [
        D(c.$slots, "default")
      ], 6)), [
        [i(K), U]
      ])
    ], 512));
  }
};
export {
  Y as default
};
