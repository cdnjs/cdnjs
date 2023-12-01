import p, { PureComponent as k, createRef as E } from "react";
const M = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, v = (s, t, e) => Math.min(Math.max(s, t), e), S = (...s) => s.filter((t) => t && typeof t == "string").join(" "), Y = (s, t) => s === t || s.width === t.width && s.height === t.height && s.x === t.x && s.y === t.y && s.unit === t.unit;
function $(s, t, e, h) {
  const i = y(s, e, h);
  return s.width && (i.height = i.width / t), s.height && (i.width = i.height * t), i.y + i.height > h && (i.height = h - i.y, i.width = i.height * t), i.x + i.width > e && (i.width = e - i.x, i.height = i.width / t), s.unit === "%" ? D(i, e, h) : i;
}
function H(s, t, e) {
  const h = y(s, t, e);
  return h.x = (t - h.width) / 2, h.y = (e - h.height) / 2, s.unit === "%" ? D(h, t, e) : h;
}
function D(s, t, e) {
  return s.unit === "%" ? { ...M, ...s, unit: "%" } : {
    unit: "%",
    x: s.x ? s.x / t * 100 : 0,
    y: s.y ? s.y / e * 100 : 0,
    width: s.width ? s.width / t * 100 : 0,
    height: s.height ? s.height / e * 100 : 0
  };
}
function y(s, t, e) {
  return s.unit ? s.unit === "px" ? { ...M, ...s, unit: "px" } : {
    unit: "px",
    x: s.x ? s.x * t / 100 : 0,
    y: s.y ? s.y * e / 100 : 0,
    width: s.width ? s.width * t / 100 : 0,
    height: s.height ? s.height * e / 100 : 0
  } : { ...M, ...s, unit: "px" };
}
function P(s, t, e, h, i, n = 0, o = 0, w = h, a = i) {
  const r = { ...s };
  let c = Math.min(n, h), d = Math.min(o, i), g = Math.min(w, h), l = Math.min(a, i);
  t && (t > 1 ? (c = o ? o * t : c, d = c / t, g = w * t) : (d = n ? n / t : d, c = d * t, l = a / t)), r.y < 0 && (r.height = Math.max(r.height + r.y, d), r.y = 0), r.x < 0 && (r.width = Math.max(r.width + r.x, c), r.x = 0);
  const m = h - (r.x + r.width);
  m < 0 && (r.x = Math.min(r.x, h - c), r.width += m);
  const x = i - (r.y + r.height);
  if (x < 0 && (r.y = Math.min(r.y, i - d), r.height += x), r.width < c && ((e === "sw" || e == "nw") && (r.x -= c - r.width), r.width = c), r.height < d && ((e === "nw" || e == "ne") && (r.y -= d - r.height), r.height = d), r.width > g && ((e === "sw" || e == "nw") && (r.x -= g - r.width), r.width = g), r.height > l && ((e === "nw" || e == "ne") && (r.y -= l - r.height), r.height = l), t) {
    const b = r.width / r.height;
    if (b < t) {
      const C = Math.max(r.width / t, d);
      (e === "nw" || e == "ne") && (r.y -= C - r.height), r.height = C;
    } else if (b > t) {
      const C = Math.max(r.height * t, c);
      (e === "sw" || e == "nw") && (r.x -= C - r.width), r.width = C;
    }
  }
  return r;
}
function _(s, t, e, h) {
  const i = { ...s };
  return t === "ArrowLeft" ? h === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : h === "w" ? (i.x -= e, i.width += e) : h === "sw" ? (i.x -= e, i.width += e, i.height += e) : h === "ne" ? (i.y += e, i.width -= e, i.height -= e) : h === "e" ? i.width -= e : h === "se" && (i.width -= e, i.height -= e) : t === "ArrowRight" && (h === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : h === "w" ? (i.x += e, i.width -= e) : h === "sw" ? (i.x += e, i.width -= e, i.height -= e) : h === "ne" ? (i.y -= e, i.width += e, i.height += e) : h === "e" ? i.width += e : h === "se" && (i.width += e, i.height += e)), t === "ArrowUp" ? h === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : h === "n" ? (i.y -= e, i.height += e) : h === "ne" ? (i.y -= e, i.width += e, i.height += e) : h === "sw" ? (i.x += e, i.width -= e, i.height -= e) : h === "s" ? i.height -= e : h === "se" && (i.width -= e, i.height -= e) : t === "ArrowDown" && (h === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : h === "n" ? (i.y += e, i.height -= e) : h === "ne" ? (i.y += e, i.width -= e, i.height -= e) : h === "sw" ? (i.x -= e, i.width += e, i.height += e) : h === "s" ? i.height += e : h === "se" && (i.width += e, i.height += e)), i;
}
const f = { capture: !0, passive: !1 }, u = class u extends k {
  constructor() {
    super(...arguments), this.docMoveBound = !1, this.mouseDownOnCrop = !1, this.dragStarted = !1, this.evData = {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }, this.componentRef = E(), this.mediaRef = E(), this.initChangeCalled = !1, this.state = {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }, this.onCropPointerDown = (t) => {
      const { crop: e, disabled: h } = this.props, i = this.getBox();
      if (!e)
        return;
      const n = y(e, i.width, i.height);
      if (h)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const o = t.target.dataset.ord, w = !!o;
      let a = t.clientX, r = t.clientY, c = n.x, d = n.y;
      if (o) {
        const g = t.clientX - i.x, l = t.clientY - i.y;
        let m = 0, x = 0;
        o === "ne" || o == "e" ? (m = g - (n.x + n.width), x = l - n.y, c = n.x, d = n.y + n.height) : o === "se" || o === "s" ? (m = g - (n.x + n.width), x = l - (n.y + n.height), c = n.x, d = n.y) : o === "sw" || o == "w" ? (m = g - n.x, x = l - (n.y + n.height), c = n.x + n.width, d = n.y) : (o === "nw" || o == "n") && (m = g - n.x, x = l - n.y, c = n.x + n.width, d = n.y + n.height), a = c + i.x + m, r = d + i.y + x;
      }
      this.evData = {
        startClientX: a,
        startClientY: r,
        startCropX: c,
        startCropY: d,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: w,
        ord: o
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (t) => {
      const { crop: e, disabled: h, locked: i, keepSelection: n, onChange: o } = this.props, w = this.getBox();
      if (h || i || n && e)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = t.clientX - w.x, r = t.clientY - w.y, c = {
        unit: "px",
        x: a,
        y: r,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: t.clientX,
        startClientY: t.clientY,
        startCropX: a,
        startCropY: r,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, o(y(c, w.width, w.height), D(c, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (t) => {
      const { crop: e, disabled: h, onChange: i, onDragStart: n } = this.props, o = this.getBox();
      if (h || !e || !this.mouseDownOnCrop)
        return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = !0, n && n(t));
      const { evData: w } = this;
      w.clientX = t.clientX, w.clientY = t.clientY;
      let a;
      w.isResize ? a = this.resizeCrop() : a = this.dragCrop(), Y(e, a) || i(
        y(a, o.width, o.height),
        D(a, o.width, o.height)
      );
    }, this.onComponentKeyDown = (t) => {
      const { crop: e, disabled: h, onChange: i, onComplete: n } = this.props;
      if (h)
        return;
      const o = t.key;
      let w = !1;
      if (!e)
        return;
      const a = this.getBox(), r = this.makePixelCrop(a), d = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? u.nudgeStepLarge : t.shiftKey ? u.nudgeStepMedium : u.nudgeStep;
      if (o === "ArrowLeft" ? (r.x -= d, w = !0) : o === "ArrowRight" ? (r.x += d, w = !0) : o === "ArrowUp" ? (r.y -= d, w = !0) : o === "ArrowDown" && (r.y += d, w = !0), w) {
        t.cancelable && t.preventDefault(), r.x = v(r.x, 0, a.width - r.width), r.y = v(r.y, 0, a.height - r.height);
        const g = y(r, a.width, a.height), l = D(r, a.width, a.height);
        i(g, l), n && n(g, l);
      }
    }, this.onHandlerKeyDown = (t, e) => {
      const {
        aspect: h = 0,
        crop: i,
        disabled: n,
        minWidth: o = 0,
        minHeight: w = 0,
        maxWidth: a,
        maxHeight: r,
        onChange: c,
        onComplete: d
      } = this.props, g = this.getBox();
      if (n || !i)
        return;
      if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight")
        t.stopPropagation(), t.preventDefault();
      else
        return;
      const m = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? u.nudgeStepLarge : t.shiftKey ? u.nudgeStepMedium : u.nudgeStep, x = y(i, g.width, g.height), b = _(x, t.key, m, e), C = P(
        b,
        h,
        e,
        g.width,
        g.height,
        o,
        w,
        a,
        r
      );
      if (!Y(i, C)) {
        const R = D(C, g.width, g.height);
        c(C, R), d && d(C, R);
      }
    }, this.onDocPointerDone = (t) => {
      const { crop: e, disabled: h, onComplete: i, onDragEnd: n } = this.props, o = this.getBox();
      this.unbindDocMove(), !(h || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, n && n(t), i && i(y(e, o.width, o.height), D(e, o.width, o.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    }, this.onDragFocus = (t) => {
      var e;
      (e = this.componentRef.current) == null || e.scrollTo(0, 0);
    };
  }
  get document() {
    return document;
  }
  // We unfortunately get the bounding box every time as x+y changes
  // due to scrolling.
  getBox() {
    const t = this.mediaRef.current;
    if (!t)
      return { x: 0, y: 0, width: 0, height: 0 };
    const { x: e, y: h, width: i, height: n } = t.getBoundingClientRect();
    return { x: e, y: h, width: i, height: n };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: h } = this.props;
    if (h && !t.crop && e) {
      const { width: i, height: n } = this.getBox();
      i && n && h(y(e, i, n), D(e, i, n));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, f), this.document.addEventListener("pointerup", this.onDocPointerDone, f), this.document.addEventListener("pointercancel", this.onDocPointerDone, f), this.docMoveBound = !0);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, f), this.document.removeEventListener("pointerup", this.onDocPointerDone, f), this.document.removeEventListener("pointercancel", this.onDocPointerDone, f), this.docMoveBound = !1);
  }
  getCropStyle() {
    const { crop: t } = this.props;
    if (t)
      return {
        top: `${t.y}${t.unit}`,
        left: `${t.x}${t.unit}`,
        width: `${t.width}${t.unit}`,
        height: `${t.height}${t.unit}`
      };
  }
  dragCrop() {
    const { evData: t } = this, e = this.getBox(), h = this.makePixelCrop(e), i = t.clientX - t.startClientX, n = t.clientY - t.startClientY;
    return h.x = v(t.startCropX + i, 0, e.width - h.width), h.y = v(t.startCropY + n, 0, e.height - h.height), h;
  }
  getPointRegion(t, e, h, i) {
    const { evData: n } = this, o = n.clientX - t.x, w = n.clientY - t.y;
    let a;
    i && e ? a = e === "nw" || e === "n" || e === "ne" : a = w < n.startCropY;
    let r;
    return h && e ? r = e === "nw" || e === "w" || e === "sw" : r = o < n.startCropX, r ? a ? "nw" : "sw" : a ? "ne" : "se";
  }
  resolveMinDimensions(t, e, h = 0, i = 0) {
    let n = Math.min(h, t.width), o = Math.min(i, t.height);
    return !e || !n && !o ? [n, o] : e > 1 ? n ? [n, n / e] : [o * e, o] : o ? [o * e, o] : [n, n / e];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: h, maxHeight: i } = this.props, n = this.getBox(), [o, w] = this.resolveMinDimensions(n, e, this.props.minWidth, this.props.minHeight);
    let a = this.makePixelCrop(n), r = this.getPointRegion(n, t.ord, o, w);
    const c = t.ord || r;
    let d = t.clientX - t.startClientX, g = t.clientY - t.startClientY;
    (o && c === "nw" || c === "w" || c === "sw") && (d = Math.min(d, -o)), (w && c === "nw" || c === "n" || c === "ne") && (g = Math.min(g, -w));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    r === "ne" ? (l.x = t.startCropX, l.width = d, e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(g), l.y = t.startCropY - l.height)) : r === "se" ? (l.x = t.startCropX, l.y = t.startCropY, l.width = d, e ? l.height = l.width / e : l.height = g) : r === "sw" ? (l.x = t.startCropX + d, l.y = t.startCropY, l.width = Math.abs(d), e ? l.height = l.width / e : l.height = g) : r === "nw" && (l.x = t.startCropX + d, l.width = Math.abs(d), e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(g), l.y = t.startCropY + g));
    const m = P(
      l,
      e,
      r,
      n.width,
      n.height,
      o,
      w,
      h,
      i
    );
    return e || u.xyOrds.indexOf(c) > -1 ? a = m : u.xOrds.indexOf(c) > -1 ? (a.x = m.x, a.width = m.width) : u.yOrds.indexOf(c) > -1 && (a.y = m.y, a.height = m.height), a.x = v(a.x, 0, n.width - a.width), a.y = v(a.y, 0, n.height - a.height), a;
  }
  renderCropSelection() {
    const {
      ariaLabels: t = u.defaultProps.ariaLabels,
      disabled: e,
      locked: h,
      renderSelectionAddon: i,
      ruleOfThirds: n,
      crop: o
    } = this.props, w = this.getCropStyle();
    if (o)
      return /* @__PURE__ */ p.createElement(
        "div",
        {
          style: w,
          className: "ReactCrop__crop-selection",
          onPointerDown: this.onCropPointerDown,
          "aria-label": t.cropArea,
          tabIndex: 0,
          onKeyDown: this.onComponentKeyDown,
          role: "group"
        },
        !e && !h && /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": t.nwDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": t.nDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": t.neDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": t.eDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": t.seDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": t.sDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": t.swDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": t.wDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "w"),
            role: "button"
          }
        )),
        i && /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (a) => a.stopPropagation() }, i(this.state)),
        n && /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(t) {
    const e = { ...M, ...this.props.crop || {} };
    return y(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: h, className: i, crop: n, disabled: o, locked: w, style: a, ruleOfThirds: r } = this.props, { cropIsActive: c, newCropIsBeingDrawn: d } = this.state, g = n ? this.renderCropSelection() : null, l = S(
      "ReactCrop",
      i,
      c && "ReactCrop--active",
      o && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      d && "ReactCrop--new-crop",
      n && t && "ReactCrop--fixed-aspect",
      n && h && "ReactCrop--circular-crop",
      n && r && "ReactCrop--rule-of-thirds",
      !this.dragStarted && n && !n.width && !n.height && "ReactCrop--invisible-crop",
      h && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ p.createElement("div", { ref: this.componentRef, className: l, style: a }, /* @__PURE__ */ p.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, e), n ? /* @__PURE__ */ p.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement("mask", { id: "hole" }, /* @__PURE__ */ p.createElement("rect", { width: "100%", height: "100%", fill: "white" }), h ? /* @__PURE__ */ p.createElement(
      "ellipse",
      {
        cx: `${n.x + n.width / 2}${n.unit}`,
        cy: `${n.y + n.height / 2}${n.unit}`,
        rx: `${n.width / 2}${n.unit}`,
        ry: `${n.height / 2}${n.unit}`,
        fill: "black"
      }
    ) : /* @__PURE__ */ p.createElement(
      "rect",
      {
        x: `${n.x}${n.unit}`,
        y: `${n.y}${n.unit}`,
        width: `${n.width}${n.unit}`,
        height: `${n.height}${n.unit}`,
        fill: "black"
      }
    ))), /* @__PURE__ */ p.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: "url(#hole)" })) : void 0, g);
  }
};
u.xOrds = ["e", "w"], u.yOrds = ["n", "s"], u.xyOrds = ["nw", "ne", "se", "sw"], u.nudgeStep = 1, u.nudgeStepMedium = 10, u.nudgeStepLarge = 100, u.defaultProps = {
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
};
let X = u;
export {
  X as Component,
  X as ReactCrop,
  Y as areCropsEqual,
  H as centerCrop,
  v as clamp,
  S as cls,
  P as containCrop,
  D as convertToPercentCrop,
  y as convertToPixelCrop,
  X as default,
  M as defaultCrop,
  $ as makeAspectCrop,
  _ as nudgeCrop
};
