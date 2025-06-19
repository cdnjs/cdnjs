var _ = Object.defineProperty;
var $ = (a, h, e) => h in a ? _(a, h, { enumerable: !0, configurable: !0, writable: !0, value: e }) : a[h] = e;
var m = (a, h, e) => $(a, typeof h != "symbol" ? h + "" : h, e);
import u, { PureComponent as K, createRef as P } from "react";
const E = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, b = (a, h, e) => Math.min(Math.max(a, h), e), H = (...a) => a.filter((h) => h && typeof h == "string").join(" "), X = (a, h) => a === h || a.width === h.width && a.height === h.height && a.x === h.x && a.y === h.y && a.unit === h.unit;
function B(a, h, e, n) {
  const t = D(a, e, n);
  return a.width && (t.height = t.width / h), a.height && (t.width = t.height * h), t.y + t.height > n && (t.height = n - t.y, t.width = t.height * h), t.x + t.width > e && (t.width = e - t.x, t.height = t.width / h), a.unit === "%" ? v(t, e, n) : t;
}
function L(a, h, e) {
  const n = D(a, h, e);
  return n.x = (h - n.width) / 2, n.y = (e - n.height) / 2, a.unit === "%" ? v(n, h, e) : n;
}
function v(a, h, e) {
  return a.unit === "%" ? { ...E, ...a, unit: "%" } : {
    unit: "%",
    x: a.x ? a.x / h * 100 : 0,
    y: a.y ? a.y / e * 100 : 0,
    width: a.width ? a.width / h * 100 : 0,
    height: a.height ? a.height / e * 100 : 0
  };
}
function D(a, h, e) {
  return a.unit ? a.unit === "px" ? { ...E, ...a, unit: "px" } : {
    unit: "px",
    x: a.x ? a.x * h / 100 : 0,
    y: a.y ? a.y * e / 100 : 0,
    width: a.width ? a.width * h / 100 : 0,
    height: a.height ? a.height * e / 100 : 0
  } : { ...E, ...a, unit: "px" };
}
function k(a, h, e, n, t, d = 0, r = 0, o = n, w = t) {
  const i = { ...a };
  let s = Math.min(d, n), c = Math.min(r, t), g = Math.min(o, n), p = Math.min(w, t);
  h && (h > 1 ? (s = r ? r * h : s, c = s / h, g = o * h) : (c = d ? d / h : c, s = c * h, p = w / h)), i.y < 0 && (i.height = Math.max(i.height + i.y, c), i.y = 0), i.x < 0 && (i.width = Math.max(i.width + i.x, s), i.x = 0);
  const l = n - (i.x + i.width);
  l < 0 && (i.x = Math.min(i.x, n - s), i.width += l);
  const C = t - (i.y + i.height);
  if (C < 0 && (i.y = Math.min(i.y, t - c), i.height += C), i.width < s && ((e === "sw" || e == "nw") && (i.x -= s - i.width), i.width = s), i.height < c && ((e === "nw" || e == "ne") && (i.y -= c - i.height), i.height = c), i.width > g && ((e === "sw" || e == "nw") && (i.x -= g - i.width), i.width = g), i.height > p && ((e === "nw" || e == "ne") && (i.y -= p - i.height), i.height = p), h) {
    const y = i.width / i.height;
    if (y < h) {
      const f = Math.max(i.width / h, c);
      (e === "nw" || e == "ne") && (i.y -= f - i.height), i.height = f;
    } else if (y > h) {
      const f = Math.max(i.height * h, s);
      (e === "sw" || e == "nw") && (i.x -= f - i.width), i.width = f;
    }
  }
  return i;
}
function I(a, h, e, n) {
  const t = { ...a };
  return h === "ArrowLeft" ? n === "nw" ? (t.x -= e, t.y -= e, t.width += e, t.height += e) : n === "w" ? (t.x -= e, t.width += e) : n === "sw" ? (t.x -= e, t.width += e, t.height += e) : n === "ne" ? (t.y += e, t.width -= e, t.height -= e) : n === "e" ? t.width -= e : n === "se" && (t.width -= e, t.height -= e) : h === "ArrowRight" && (n === "nw" ? (t.x += e, t.y += e, t.width -= e, t.height -= e) : n === "w" ? (t.x += e, t.width -= e) : n === "sw" ? (t.x += e, t.width -= e, t.height -= e) : n === "ne" ? (t.y -= e, t.width += e, t.height += e) : n === "e" ? t.width += e : n === "se" && (t.width += e, t.height += e)), h === "ArrowUp" ? n === "nw" ? (t.x -= e, t.y -= e, t.width += e, t.height += e) : n === "n" ? (t.y -= e, t.height += e) : n === "ne" ? (t.y -= e, t.width += e, t.height += e) : n === "sw" ? (t.x += e, t.width -= e, t.height -= e) : n === "s" ? t.height -= e : n === "se" && (t.width -= e, t.height -= e) : h === "ArrowDown" && (n === "nw" ? (t.x += e, t.y += e, t.width -= e, t.height -= e) : n === "n" ? (t.y += e, t.height -= e) : n === "ne" ? (t.y += e, t.width -= e, t.height -= e) : n === "sw" ? (t.x -= e, t.width += e, t.height += e) : n === "s" ? t.height += e : n === "se" && (t.width += e, t.height += e)), t;
}
const M = { capture: !0, passive: !1 };
let N = 0;
const x = class x extends K {
  constructor() {
    super(...arguments);
    m(this, "docMoveBound", !1);
    m(this, "mouseDownOnCrop", !1);
    m(this, "dragStarted", !1);
    m(this, "evData", {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    });
    m(this, "componentRef", P());
    m(this, "mediaRef", P());
    m(this, "resizeObserver");
    m(this, "initChangeCalled", !1);
    m(this, "instanceId", `rc-${N++}`);
    m(this, "state", {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    });
    m(this, "onCropPointerDown", (e) => {
      const { crop: n, disabled: t } = this.props, d = this.getBox();
      if (!n)
        return;
      const r = D(n, d.width, d.height);
      if (t)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const o = e.target.dataset.ord, w = !!o;
      let i = e.clientX, s = e.clientY, c = r.x, g = r.y;
      if (o) {
        const p = e.clientX - d.x, l = e.clientY - d.y;
        let C = 0, y = 0;
        o === "ne" || o == "e" ? (C = p - (r.x + r.width), y = l - r.y, c = r.x, g = r.y + r.height) : o === "se" || o === "s" ? (C = p - (r.x + r.width), y = l - (r.y + r.height), c = r.x, g = r.y) : o === "sw" || o == "w" ? (C = p - r.x, y = l - (r.y + r.height), c = r.x + r.width, g = r.y) : (o === "nw" || o == "n") && (C = p - r.x, y = l - r.y, c = r.x + r.width, g = r.y + r.height), i = c + d.x + C, s = g + d.y + y;
      }
      this.evData = {
        startClientX: i,
        startClientY: s,
        startCropX: c,
        startCropY: g,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: w,
        ord: o
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    });
    m(this, "onComponentPointerDown", (e) => {
      const { crop: n, disabled: t, locked: d, keepSelection: r, onChange: o } = this.props, w = this.getBox();
      if (t || d || r && n)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const i = e.clientX - w.x, s = e.clientY - w.y, c = {
        unit: "px",
        x: i,
        y: s,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCropX: i,
        startCropY: s,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, o(D(c, w.width, w.height), v(c, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    });
    m(this, "onDocPointerMove", (e) => {
      const { crop: n, disabled: t, onChange: d, onDragStart: r } = this.props, o = this.getBox();
      if (t || !n || !this.mouseDownOnCrop)
        return;
      e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = !0, r && r(e));
      const { evData: w } = this;
      w.clientX = e.clientX, w.clientY = e.clientY;
      let i;
      w.isResize ? i = this.resizeCrop() : i = this.dragCrop(), X(n, i) || d(
        D(i, o.width, o.height),
        v(i, o.width, o.height)
      );
    });
    m(this, "onComponentKeyDown", (e) => {
      const { crop: n, disabled: t, onChange: d, onComplete: r } = this.props;
      if (t)
        return;
      const o = e.key;
      let w = !1;
      if (!n)
        return;
      const i = this.getBox(), s = this.makePixelCrop(i), g = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? x.nudgeStepLarge : e.shiftKey ? x.nudgeStepMedium : x.nudgeStep;
      if (o === "ArrowLeft" ? (s.x -= g, w = !0) : o === "ArrowRight" ? (s.x += g, w = !0) : o === "ArrowUp" ? (s.y -= g, w = !0) : o === "ArrowDown" && (s.y += g, w = !0), w) {
        e.cancelable && e.preventDefault(), s.x = b(s.x, 0, i.width - s.width), s.y = b(s.y, 0, i.height - s.height);
        const p = D(s, i.width, i.height), l = v(s, i.width, i.height);
        d(p, l), r && r(p, l);
      }
    });
    m(this, "onHandlerKeyDown", (e, n) => {
      const {
        aspect: t = 0,
        crop: d,
        disabled: r,
        minWidth: o = 0,
        minHeight: w = 0,
        maxWidth: i,
        maxHeight: s,
        onChange: c,
        onComplete: g
      } = this.props, p = this.getBox();
      if (r || !d)
        return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        e.stopPropagation(), e.preventDefault();
      else
        return;
      const C = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? x.nudgeStepLarge : e.shiftKey ? x.nudgeStepMedium : x.nudgeStep, y = D(d, p.width, p.height), f = I(y, e.key, C, n), R = k(
        f,
        t,
        n,
        p.width,
        p.height,
        o,
        w,
        i,
        s
      );
      if (!X(d, R)) {
        const Y = v(R, p.width, p.height);
        c(R, Y), g && g(R, Y);
      }
    });
    m(this, "onDocPointerDone", (e) => {
      const { crop: n, disabled: t, onComplete: d, onDragEnd: r } = this.props, o = this.getBox();
      this.unbindDocMove(), !(t || !n) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, r && r(e), d && d(D(n, o.width, o.height), v(n, o.width, o.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    });
    m(this, "onDragFocus", () => {
      var e;
      (e = this.componentRef.current) == null || e.scrollTo(0, 0);
    });
  }
  get document() {
    return document;
  }
  // We unfortunately get the bounding box every time as x+y changes
  // due to scrolling.
  getBox() {
    const e = this.mediaRef.current;
    if (!e)
      return { x: 0, y: 0, width: 0, height: 0 };
    const { x: n, y: t, width: d, height: r } = e.getBoundingClientRect();
    return { x: n, y: t, width: d, height: r };
  }
  componentDidUpdate(e) {
    const { crop: n, onComplete: t } = this.props;
    if (t && !e.crop && n) {
      const { width: d, height: r } = this.getBox();
      d && r && t(D(n, d, r), v(n, d, r));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect(), this.unbindDocMove();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, M), this.document.addEventListener("pointerup", this.onDocPointerDone, M), this.document.addEventListener("pointercancel", this.onDocPointerDone, M), this.docMoveBound = !0);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, M), this.document.removeEventListener("pointerup", this.onDocPointerDone, M), this.document.removeEventListener("pointercancel", this.onDocPointerDone, M), this.docMoveBound = !1);
  }
  getCropStyle() {
    const { crop: e } = this.props;
    if (e)
      return {
        top: `${e.y}${e.unit}`,
        left: `${e.x}${e.unit}`,
        width: `${e.width}${e.unit}`,
        height: `${e.height}${e.unit}`
      };
  }
  dragCrop() {
    const { evData: e } = this, n = this.getBox(), t = this.makePixelCrop(n), d = e.clientX - e.startClientX, r = e.clientY - e.startClientY;
    return t.x = b(e.startCropX + d, 0, n.width - t.width), t.y = b(e.startCropY + r, 0, n.height - t.height), t;
  }
  getPointRegion(e, n, t, d) {
    const { evData: r } = this, o = r.clientX - e.x, w = r.clientY - e.y;
    let i;
    d && n ? i = n === "nw" || n === "n" || n === "ne" : i = w < r.startCropY;
    let s;
    return t && n ? s = n === "nw" || n === "w" || n === "sw" : s = o < r.startCropX, s ? i ? "nw" : "sw" : i ? "ne" : "se";
  }
  resolveMinDimensions(e, n, t = 0, d = 0) {
    const r = Math.min(t, e.width), o = Math.min(d, e.height);
    return !n || !r && !o ? [r, o] : n > 1 ? r ? [r, r / n] : [o * n, o] : o ? [o * n, o] : [r, r / n];
  }
  resizeCrop() {
    const { evData: e } = this, { aspect: n = 0, maxWidth: t, maxHeight: d } = this.props, r = this.getBox(), [o, w] = this.resolveMinDimensions(r, n, this.props.minWidth, this.props.minHeight);
    let i = this.makePixelCrop(r);
    const s = this.getPointRegion(r, e.ord, o, w), c = e.ord || s;
    let g = e.clientX - e.startClientX, p = e.clientY - e.startClientY;
    (o && c === "nw" || c === "w" || c === "sw") && (g = Math.min(g, -o)), (w && c === "nw" || c === "n" || c === "ne") && (p = Math.min(p, -w));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    s === "ne" ? (l.x = e.startCropX, l.width = g, n ? (l.height = l.width / n, l.y = e.startCropY - l.height) : (l.height = Math.abs(p), l.y = e.startCropY - l.height)) : s === "se" ? (l.x = e.startCropX, l.y = e.startCropY, l.width = g, n ? l.height = l.width / n : l.height = p) : s === "sw" ? (l.x = e.startCropX + g, l.y = e.startCropY, l.width = Math.abs(g), n ? l.height = l.width / n : l.height = p) : s === "nw" && (l.x = e.startCropX + g, l.width = Math.abs(g), n ? (l.height = l.width / n, l.y = e.startCropY - l.height) : (l.height = Math.abs(p), l.y = e.startCropY + p));
    const C = k(
      l,
      n,
      s,
      r.width,
      r.height,
      o,
      w,
      t,
      d
    );
    return n || x.xyOrds.indexOf(c) > -1 ? i = C : x.xOrds.indexOf(c) > -1 ? (i.x = C.x, i.width = C.width) : x.yOrds.indexOf(c) > -1 && (i.y = C.y, i.height = C.height), i.x = b(i.x, 0, r.width - i.width), i.y = b(i.y, 0, r.height - i.height), i;
  }
  renderCropSelection() {
    const {
      ariaLabels: e = x.defaultProps.ariaLabels,
      disabled: n,
      locked: t,
      renderSelectionAddon: d,
      ruleOfThirds: r,
      crop: o
    } = this.props, w = this.getCropStyle();
    if (o)
      return /* @__PURE__ */ u.createElement(
        "div",
        {
          style: w,
          className: "ReactCrop__crop-selection",
          onPointerDown: this.onCropPointerDown,
          "aria-label": e.cropArea,
          tabIndex: 0,
          onKeyDown: this.onComponentKeyDown,
          role: "group"
        },
        !n && !t && /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": e.nwDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": e.nDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": e.neDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": e.eDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": e.seDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": e.sDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": e.swDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ u.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": e.wDragHandle,
            onKeyDown: (i) => this.onHandlerKeyDown(i, "w"),
            role: "button"
          }
        )),
        d && /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (i) => i.stopPropagation() }, d(this.state)),
        r && /* @__PURE__ */ u.createElement(u.Fragment, null, /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ u.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(e) {
    const n = { ...E, ...this.props.crop || {} };
    return D(n, e.width, e.height);
  }
  render() {
    const { aspect: e, children: n, circularCrop: t, className: d, crop: r, disabled: o, locked: w, style: i, ruleOfThirds: s } = this.props, { cropIsActive: c, newCropIsBeingDrawn: g } = this.state, p = r ? this.renderCropSelection() : null, l = H(
      "ReactCrop",
      d,
      c && "ReactCrop--active",
      o && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      g && "ReactCrop--new-crop",
      r && e && "ReactCrop--fixed-aspect",
      r && t && "ReactCrop--circular-crop",
      r && s && "ReactCrop--rule-of-thirds",
      !this.dragStarted && r && !r.width && !r.height && "ReactCrop--invisible-crop",
      t && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ u.createElement("div", { ref: this.componentRef, className: l, style: i }, /* @__PURE__ */ u.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, n), r ? /* @__PURE__ */ u.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ u.createElement("defs", null, /* @__PURE__ */ u.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ u.createElement("rect", { width: "100%", height: "100%", fill: "white" }), t ? /* @__PURE__ */ u.createElement(
      "ellipse",
      {
        cx: `${r.x + r.width / 2}${r.unit}`,
        cy: `${r.y + r.height / 2}${r.unit}`,
        rx: `${r.width / 2}${r.unit}`,
        ry: `${r.height / 2}${r.unit}`,
        fill: "black"
      }
    ) : /* @__PURE__ */ u.createElement(
      "rect",
      {
        x: `${r.x}${r.unit}`,
        y: `${r.y}${r.unit}`,
        width: `${r.width}${r.unit}`,
        height: `${r.height}${r.unit}`,
        fill: "black"
      }
    ))), /* @__PURE__ */ u.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, p);
  }
};
m(x, "xOrds", ["e", "w"]), m(x, "yOrds", ["n", "s"]), m(x, "xyOrds", ["nw", "ne", "se", "sw"]), m(x, "nudgeStep", 1), m(x, "nudgeStepMedium", 10), m(x, "nudgeStepLarge", 100), m(x, "defaultProps", {
  ariaLabels: {
    cropArea: "Use the arrow keys to move the crop selection area",
    nwDragHandle: "Use the arrow keys to move the north west drag handle to change the crop selection area",
    nDragHandle: "Use the up and down arrow keys to move the north drag handle to change the crop selection area",
    neDragHandle: "Use the arrow keys to move the north east drag handle to change the crop selection area",
    eDragHandle: "Use the up and down arrow keys to move the east drag handle to change the crop selection area",
    seDragHandle: "Use the arrow keys to move the south east drag handle to change the crop selection area",
    sDragHandle: "Use the up and down arrow keys to move the south drag handle to change the crop selection area",
    swDragHandle: "Use the arrow keys to move the south west drag handle to change the crop selection area",
    wDragHandle: "Use the up and down arrow keys to move the west drag handle to change the crop selection area"
  }
});
let S = x;
export {
  S as Component,
  S as ReactCrop,
  X as areCropsEqual,
  L as centerCrop,
  b as clamp,
  H as cls,
  k as containCrop,
  v as convertToPercentCrop,
  D as convertToPixelCrop,
  S as default,
  E as defaultCrop,
  B as makeAspectCrop,
  I as nudgeCrop
};
