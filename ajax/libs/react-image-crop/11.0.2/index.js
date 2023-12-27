import p, { PureComponent as k, createRef as E } from "react";
const M = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, v = (o, e, t) => Math.min(Math.max(o, e), t), S = (...o) => o.filter((e) => e && typeof e == "string").join(" "), Y = (o, e) => o === e || o.width === e.width && o.height === e.height && o.x === e.x && o.y === e.y && o.unit === e.unit;
function H(o, e, t, h) {
  const i = y(o, t, h);
  return o.width && (i.height = i.width / e), o.height && (i.width = i.height * e), i.y + i.height > h && (i.height = h - i.y, i.width = i.height * e), i.x + i.width > t && (i.width = t - i.x, i.height = i.width / e), o.unit === "%" ? D(i, t, h) : i;
}
function I(o, e, t) {
  const h = y(o, e, t);
  return h.x = (e - h.width) / 2, h.y = (t - h.height) / 2, o.unit === "%" ? D(h, e, t) : h;
}
function D(o, e, t) {
  return o.unit === "%" ? { ...M, ...o, unit: "%" } : {
    unit: "%",
    x: o.x ? o.x / e * 100 : 0,
    y: o.y ? o.y / t * 100 : 0,
    width: o.width ? o.width / e * 100 : 0,
    height: o.height ? o.height / t * 100 : 0
  };
}
function y(o, e, t) {
  return o.unit ? o.unit === "px" ? { ...M, ...o, unit: "px" } : {
    unit: "px",
    x: o.x ? o.x * e / 100 : 0,
    y: o.y ? o.y * t / 100 : 0,
    width: o.width ? o.width * e / 100 : 0,
    height: o.height ? o.height * t / 100 : 0
  } : { ...M, ...o, unit: "px" };
}
function P(o, e, t, h, i, n = 0, s = 0, w = h, a = i) {
  const r = { ...o };
  let c = Math.min(n, h), d = Math.min(s, i), g = Math.min(w, h), l = Math.min(a, i);
  e && (e > 1 ? (c = s ? s * e : c, d = c / e, g = w * e) : (d = n ? n / e : d, c = d * e, l = a / e)), r.y < 0 && (r.height = Math.max(r.height + r.y, d), r.y = 0), r.x < 0 && (r.width = Math.max(r.width + r.x, c), r.x = 0);
  const m = h - (r.x + r.width);
  m < 0 && (r.x = Math.min(r.x, h - c), r.width += m);
  const x = i - (r.y + r.height);
  if (x < 0 && (r.y = Math.min(r.y, i - d), r.height += x), r.width < c && ((t === "sw" || t == "nw") && (r.x -= c - r.width), r.width = c), r.height < d && ((t === "nw" || t == "ne") && (r.y -= d - r.height), r.height = d), r.width > g && ((t === "sw" || t == "nw") && (r.x -= g - r.width), r.width = g), r.height > l && ((t === "nw" || t == "ne") && (r.y -= l - r.height), r.height = l), e) {
    const b = r.width / r.height;
    if (b < e) {
      const C = Math.max(r.width / e, d);
      (t === "nw" || t == "ne") && (r.y -= C - r.height), r.height = C;
    } else if (b > e) {
      const C = Math.max(r.height * e, c);
      (t === "sw" || t == "nw") && (r.x -= C - r.width), r.width = C;
    }
  }
  return r;
}
function _(o, e, t, h) {
  const i = { ...o };
  return e === "ArrowLeft" ? h === "nw" ? (i.x -= t, i.y -= t, i.width += t, i.height += t) : h === "w" ? (i.x -= t, i.width += t) : h === "sw" ? (i.x -= t, i.width += t, i.height += t) : h === "ne" ? (i.y += t, i.width -= t, i.height -= t) : h === "e" ? i.width -= t : h === "se" && (i.width -= t, i.height -= t) : e === "ArrowRight" && (h === "nw" ? (i.x += t, i.y += t, i.width -= t, i.height -= t) : h === "w" ? (i.x += t, i.width -= t) : h === "sw" ? (i.x += t, i.width -= t, i.height -= t) : h === "ne" ? (i.y -= t, i.width += t, i.height += t) : h === "e" ? i.width += t : h === "se" && (i.width += t, i.height += t)), e === "ArrowUp" ? h === "nw" ? (i.x -= t, i.y -= t, i.width += t, i.height += t) : h === "n" ? (i.y -= t, i.height += t) : h === "ne" ? (i.y -= t, i.width += t, i.height += t) : h === "sw" ? (i.x += t, i.width -= t, i.height -= t) : h === "s" ? i.height -= t : h === "se" && (i.width -= t, i.height -= t) : e === "ArrowDown" && (h === "nw" ? (i.x += t, i.y += t, i.width -= t, i.height -= t) : h === "n" ? (i.y += t, i.height -= t) : h === "ne" ? (i.y += t, i.width -= t, i.height -= t) : h === "sw" ? (i.x -= t, i.width += t, i.height += t) : h === "s" ? i.height += t : h === "se" && (i.width += t, i.height += t)), i;
}
const f = { capture: !0, passive: !1 };
let $ = 0;
const u = class u extends k {
  constructor() {
    super(...arguments), this.docMoveBound = !1, this.mouseDownOnCrop = !1, this.dragStarted = !1, this.evData = {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }, this.componentRef = E(), this.mediaRef = E(), this.initChangeCalled = !1, this.instanceId = `rc-${$++}`, this.state = {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }, this.onCropPointerDown = (e) => {
      const { crop: t, disabled: h } = this.props, i = this.getBox();
      if (!t)
        return;
      const n = y(t, i.width, i.height);
      if (h)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const s = e.target.dataset.ord, w = !!s;
      let a = e.clientX, r = e.clientY, c = n.x, d = n.y;
      if (s) {
        const g = e.clientX - i.x, l = e.clientY - i.y;
        let m = 0, x = 0;
        s === "ne" || s == "e" ? (m = g - (n.x + n.width), x = l - n.y, c = n.x, d = n.y + n.height) : s === "se" || s === "s" ? (m = g - (n.x + n.width), x = l - (n.y + n.height), c = n.x, d = n.y) : s === "sw" || s == "w" ? (m = g - n.x, x = l - (n.y + n.height), c = n.x + n.width, d = n.y) : (s === "nw" || s == "n") && (m = g - n.x, x = l - n.y, c = n.x + n.width, d = n.y + n.height), a = c + i.x + m, r = d + i.y + x;
      }
      this.evData = {
        startClientX: a,
        startClientY: r,
        startCropX: c,
        startCropY: d,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: w,
        ord: s
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (e) => {
      const { crop: t, disabled: h, locked: i, keepSelection: n, onChange: s } = this.props, w = this.getBox();
      if (h || i || n && t)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = e.clientX - w.x, r = e.clientY - w.y, c = {
        unit: "px",
        x: a,
        y: r,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCropX: a,
        startCropY: r,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, s(y(c, w.width, w.height), D(c, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (e) => {
      const { crop: t, disabled: h, onChange: i, onDragStart: n } = this.props, s = this.getBox();
      if (h || !t || !this.mouseDownOnCrop)
        return;
      e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = !0, n && n(e));
      const { evData: w } = this;
      w.clientX = e.clientX, w.clientY = e.clientY;
      let a;
      w.isResize ? a = this.resizeCrop() : a = this.dragCrop(), Y(t, a) || i(
        y(a, s.width, s.height),
        D(a, s.width, s.height)
      );
    }, this.onComponentKeyDown = (e) => {
      const { crop: t, disabled: h, onChange: i, onComplete: n } = this.props;
      if (h)
        return;
      const s = e.key;
      let w = !1;
      if (!t)
        return;
      const a = this.getBox(), r = this.makePixelCrop(a), d = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? u.nudgeStepLarge : e.shiftKey ? u.nudgeStepMedium : u.nudgeStep;
      if (s === "ArrowLeft" ? (r.x -= d, w = !0) : s === "ArrowRight" ? (r.x += d, w = !0) : s === "ArrowUp" ? (r.y -= d, w = !0) : s === "ArrowDown" && (r.y += d, w = !0), w) {
        e.cancelable && e.preventDefault(), r.x = v(r.x, 0, a.width - r.width), r.y = v(r.y, 0, a.height - r.height);
        const g = y(r, a.width, a.height), l = D(r, a.width, a.height);
        i(g, l), n && n(g, l);
      }
    }, this.onHandlerKeyDown = (e, t) => {
      const {
        aspect: h = 0,
        crop: i,
        disabled: n,
        minWidth: s = 0,
        minHeight: w = 0,
        maxWidth: a,
        maxHeight: r,
        onChange: c,
        onComplete: d
      } = this.props, g = this.getBox();
      if (n || !i)
        return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        e.stopPropagation(), e.preventDefault();
      else
        return;
      const m = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? u.nudgeStepLarge : e.shiftKey ? u.nudgeStepMedium : u.nudgeStep, x = y(i, g.width, g.height), b = _(x, e.key, m, t), C = P(
        b,
        h,
        t,
        g.width,
        g.height,
        s,
        w,
        a,
        r
      );
      if (!Y(i, C)) {
        const R = D(C, g.width, g.height);
        c(C, R), d && d(C, R);
      }
    }, this.onDocPointerDone = (e) => {
      const { crop: t, disabled: h, onComplete: i, onDragEnd: n } = this.props, s = this.getBox();
      this.unbindDocMove(), !(h || !t) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, n && n(e), i && i(y(t, s.width, s.height), D(t, s.width, s.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    }, this.onDragFocus = () => {
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
    const e = this.mediaRef.current;
    if (!e)
      return { x: 0, y: 0, width: 0, height: 0 };
    const { x: t, y: h, width: i, height: n } = e.getBoundingClientRect();
    return { x: t, y: h, width: i, height: n };
  }
  componentDidUpdate(e) {
    const { crop: t, onComplete: h } = this.props;
    if (h && !e.crop && t) {
      const { width: i, height: n } = this.getBox();
      i && n && h(y(t, i, n), D(t, i, n));
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
    const { evData: e } = this, t = this.getBox(), h = this.makePixelCrop(t), i = e.clientX - e.startClientX, n = e.clientY - e.startClientY;
    return h.x = v(e.startCropX + i, 0, t.width - h.width), h.y = v(e.startCropY + n, 0, t.height - h.height), h;
  }
  getPointRegion(e, t, h, i) {
    const { evData: n } = this, s = n.clientX - e.x, w = n.clientY - e.y;
    let a;
    i && t ? a = t === "nw" || t === "n" || t === "ne" : a = w < n.startCropY;
    let r;
    return h && t ? r = t === "nw" || t === "w" || t === "sw" : r = s < n.startCropX, r ? a ? "nw" : "sw" : a ? "ne" : "se";
  }
  resolveMinDimensions(e, t, h = 0, i = 0) {
    const n = Math.min(h, e.width), s = Math.min(i, e.height);
    return !t || !n && !s ? [n, s] : t > 1 ? n ? [n, n / t] : [s * t, s] : s ? [s * t, s] : [n, n / t];
  }
  resizeCrop() {
    const { evData: e } = this, { aspect: t = 0, maxWidth: h, maxHeight: i } = this.props, n = this.getBox(), [s, w] = this.resolveMinDimensions(n, t, this.props.minWidth, this.props.minHeight);
    let a = this.makePixelCrop(n);
    const r = this.getPointRegion(n, e.ord, s, w), c = e.ord || r;
    let d = e.clientX - e.startClientX, g = e.clientY - e.startClientY;
    (s && c === "nw" || c === "w" || c === "sw") && (d = Math.min(d, -s)), (w && c === "nw" || c === "n" || c === "ne") && (g = Math.min(g, -w));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    r === "ne" ? (l.x = e.startCropX, l.width = d, t ? (l.height = l.width / t, l.y = e.startCropY - l.height) : (l.height = Math.abs(g), l.y = e.startCropY - l.height)) : r === "se" ? (l.x = e.startCropX, l.y = e.startCropY, l.width = d, t ? l.height = l.width / t : l.height = g) : r === "sw" ? (l.x = e.startCropX + d, l.y = e.startCropY, l.width = Math.abs(d), t ? l.height = l.width / t : l.height = g) : r === "nw" && (l.x = e.startCropX + d, l.width = Math.abs(d), t ? (l.height = l.width / t, l.y = e.startCropY - l.height) : (l.height = Math.abs(g), l.y = e.startCropY + g));
    const m = P(
      l,
      t,
      r,
      n.width,
      n.height,
      s,
      w,
      h,
      i
    );
    return t || u.xyOrds.indexOf(c) > -1 ? a = m : u.xOrds.indexOf(c) > -1 ? (a.x = m.x, a.width = m.width) : u.yOrds.indexOf(c) > -1 && (a.y = m.y, a.height = m.height), a.x = v(a.x, 0, n.width - a.width), a.y = v(a.y, 0, n.height - a.height), a;
  }
  renderCropSelection() {
    const {
      ariaLabels: e = u.defaultProps.ariaLabels,
      disabled: t,
      locked: h,
      renderSelectionAddon: i,
      ruleOfThirds: n,
      crop: s
    } = this.props, w = this.getCropStyle();
    if (s)
      return /* @__PURE__ */ p.createElement(
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
        !t && !h && /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": e.nwDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": e.nDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": e.neDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": e.eDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": e.seDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": e.sDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": e.swDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ p.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": e.wDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "w"),
            role: "button"
          }
        )),
        i && /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__selection-addon", onPointerDown: (a) => a.stopPropagation() }, i(this.state)),
        n && /* @__PURE__ */ p.createElement(p.Fragment, null, /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ p.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(e) {
    const t = { ...M, ...this.props.crop || {} };
    return y(t, e.width, e.height);
  }
  render() {
    const { aspect: e, children: t, circularCrop: h, className: i, crop: n, disabled: s, locked: w, style: a, ruleOfThirds: r } = this.props, { cropIsActive: c, newCropIsBeingDrawn: d } = this.state, g = n ? this.renderCropSelection() : null, l = S(
      "ReactCrop",
      i,
      c && "ReactCrop--active",
      s && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      d && "ReactCrop--new-crop",
      n && e && "ReactCrop--fixed-aspect",
      n && h && "ReactCrop--circular-crop",
      n && r && "ReactCrop--rule-of-thirds",
      !this.dragStarted && n && !n.width && !n.height && "ReactCrop--invisible-crop",
      h && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ p.createElement("div", { ref: this.componentRef, className: l, style: a }, /* @__PURE__ */ p.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, t), n ? /* @__PURE__ */ p.createElement("svg", { className: "ReactCrop__crop-mask", width: "100%", height: "100%" }, /* @__PURE__ */ p.createElement("defs", null, /* @__PURE__ */ p.createElement("mask", { id: `hole-${this.instanceId}` }, /* @__PURE__ */ p.createElement("rect", { width: "100%", height: "100%", fill: "white" }), h ? /* @__PURE__ */ p.createElement(
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
    ))), /* @__PURE__ */ p.createElement("rect", { fill: "black", fillOpacity: 0.5, width: "100%", height: "100%", mask: `url(#hole-${this.instanceId})` })) : void 0, g);
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
  I as centerCrop,
  v as clamp,
  S as cls,
  P as containCrop,
  D as convertToPercentCrop,
  y as convertToPixelCrop,
  X as default,
  M as defaultCrop,
  H as makeAspectCrop,
  _ as nudgeCrop
};
