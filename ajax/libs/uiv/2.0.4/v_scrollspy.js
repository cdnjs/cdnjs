const E = {
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
function v() {
  const e = window.innerWidth || 0, t = window.innerHeight || 0;
  return { width: e, height: t };
}
function w(e, t, s) {
  e.addEventListener(t, s);
}
function y(e, t, s) {
  e.removeEventListener(t, s);
}
function u(e) {
  return e && e.nodeType === Node.ELEMENT_NODE;
}
function d(e, t) {
  !u(e) || e.classList.add(t);
}
function T(e, t) {
  !u(e) || e.classList.remove(t);
}
function U(e, t) {
  return u(e) ? e.closest(t) : null;
}
function a(e, t, s = null) {
  const o = [];
  let l = e.parentElement;
  for (; l; ) {
    if (l.matches(t))
      o.push(l);
    else if (s && (s === l || l.matches(s)))
      break;
    l = l.parentElement;
  }
  return o;
}
function c(e, t = "body", s = {}) {
  this.el = e, this.opts = { ...c.DEFAULTS, ...s }, this.opts.target = t, t === "body" ? this.scrollElement = window : this.scrollElement = document.querySelector(`[id=${t}]`), this.selector = "li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.scrollElement && (this.refresh(), this.process());
}
c.DEFAULTS = {
  offset: 10,
  callback: (e) => 0
};
c.prototype.getScrollHeight = function() {
  return this.scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
};
c.prototype.refresh = function() {
  this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight();
  const e = [...this.el.querySelectorAll(this.selector)], t = this.scrollElement === window;
  e.map((s) => {
    const o = s.getAttribute("href");
    if (/^#./.test(o)) {
      const n = (t ? document : this.scrollElement).querySelector(`[id='${o.slice(1)}']`);
      return [t ? n.getBoundingClientRect().top : n.offsetTop, o];
    } else
      return null;
  }).filter((s) => s).sort((s, o) => s[0] - o[0]).forEach((s) => {
    this.offsets.push(s[0]), this.targets.push(s[1]);
  });
};
c.prototype.process = function() {
  const e = this.scrollElement === window, t = (e ? window.pageYOffset : this.scrollElement.scrollTop) + this.opts.offset, s = this.getScrollHeight(), o = e ? v().height : this.scrollElement.getBoundingClientRect().height, l = this.opts.offset + s - o, n = this.offsets, i = this.targets, h = this.activeTarget;
  let r;
  if (this.scrollHeight !== s && this.refresh(), t >= l)
    return h !== (r = i[i.length - 1]) && this.activate(r);
  if (h && t < n[0])
    return this.activeTarget = null, this.clear();
  for (r = n.length; r--; )
    h !== i[r] && t >= n[r] && (n[r + 1] === void 0 || t < n[r + 1]) && this.activate(i[r]);
};
c.prototype.activate = function(e) {
  this.activeTarget = e, this.clear();
  const t = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]', s = this.opts.callback;
  [...this.el.querySelectorAll(t)].forEach((l) => {
    a(l, "li").forEach((n) => {
      d(n, "active"), s(n);
    }), a(l, ".dropdown-menu").length && d(U(l, "li.dropdown"), "active");
  });
};
c.prototype.clear = function() {
  [...this.el.querySelectorAll(this.selector)].forEach((t) => {
    a(t, ".active", this.opts.target).forEach((s) => {
      T(s, "active");
    });
  });
};
const f = "_uiv_scrollspy_instance", p = [E.RESIZE, E.SCROLL], g = (e, t) => {
  S(e);
}, m = (e, t) => {
  const s = new c(e, t.arg, t.value);
  s.scrollElement && (s.handler = () => {
    s.process();
  }, p.forEach((o) => {
    w(s.scrollElement, o, s.handler);
  })), e[f] = s;
}, S = (e) => {
  const t = e[f];
  t && t.scrollElement && (p.forEach((s) => {
    y(t.scrollElement, s, t.handler);
  }), delete e[f]);
}, C = (e, t) => {
  const s = t.arg !== t.oldArg, o = t.value !== t.oldValue;
  (s || o) && (g(e), m(e, t));
}, H = {
  beforeMount: g,
  mounted: m,
  updated: C,
  unmounted: S
};
export {
  H as default
};
