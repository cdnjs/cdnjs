import g, { PureComponent as E, createRef as _ } from "react";
const M = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, f = (s, t, e) => Math.min(Math.max(s, t), e), S = (...s) => s.filter((t) => t && typeof t == "string").join(" "), P = (s, t) => s === t || s.width === t.width && s.height === t.height && s.x === t.x && s.y === t.y && s.unit === t.unit;
function H(s, t, e, o) {
  const i = y(s, e, o);
  return s.width && (i.height = i.width / t), s.height && (i.width = i.height * t), i.y + i.height > o && (i.height = o - i.y, i.width = i.height * t), i.x + i.width > e && (i.width = e - i.x, i.height = i.width / t), s.unit === "%" ? D(i, e, o) : i;
}
function N(s, t, e) {
  const o = y(s, t, e);
  return o.x = (t - o.width) / 2, o.y = (e - o.height) / 2, s.unit === "%" ? D(o, t, e) : o;
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
function X(s, t, e, o, i, n = 0, a = 0, w = o, h = i) {
  const r = { ...s };
  let c = Math.min(n, o), d = Math.min(a, i), p = Math.min(w, o), l = Math.min(h, i);
  t && (t > 1 ? (c = a ? a * t : c, d = c / t, p = w * t) : (d = n ? n / t : d, c = d * t, l = h / t)), r.y < 0 && (r.height = Math.max(r.height + r.y, d), r.y = 0), r.x < 0 && (r.width = Math.max(r.width + r.x, c), r.x = 0);
  const u = o - (r.x + r.width);
  u < 0 && (r.x = Math.min(r.x, o - c), r.width += u);
  const C = i - (r.y + r.height);
  if (C < 0 && (r.y = Math.min(r.y, i - d), r.height += C), r.width < c && ((e === "sw" || e == "nw") && (r.x -= c - r.width), r.width = c), r.height < d && ((e === "nw" || e == "ne") && (r.y -= d - r.height), r.height = d), r.width > p && ((e === "sw" || e == "nw") && (r.x -= p - r.width), r.width = p), r.height > l && ((e === "nw" || e == "ne") && (r.y -= l - r.height), r.height = l), t) {
    const R = r.width / r.height;
    if (R < t) {
      const x = Math.max(r.width / t, d);
      (e === "nw" || e == "ne") && (r.y -= x - r.height), r.height = x;
    } else if (R > t) {
      const x = Math.max(r.height * t, c);
      (e === "sw" || e == "nw") && (r.x -= x - r.width), r.width = x;
    }
  }
  return r;
}
function K(s, t, e, o) {
  const i = { ...s };
  return t === "ArrowLeft" ? o === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : o === "w" ? (i.x -= e, i.width += e) : o === "sw" ? (i.x -= e, i.width += e, i.height += e) : o === "ne" ? (i.y += e, i.width -= e, i.height -= e) : o === "e" ? i.width -= e : o === "se" && (i.width -= e, i.height -= e) : t === "ArrowRight" && (o === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : o === "w" ? (i.x += e, i.width -= e) : o === "sw" ? (i.x += e, i.width -= e, i.height -= e) : o === "ne" ? (i.y -= e, i.width += e, i.height += e) : o === "e" ? i.width += e : o === "se" && (i.width += e, i.height += e)), t === "ArrowUp" ? o === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : o === "n" ? (i.y -= e, i.height += e) : o === "ne" ? (i.y -= e, i.width += e, i.height += e) : o === "sw" ? (i.x += e, i.width -= e, i.height -= e) : o === "s" ? i.height -= e : o === "se" && (i.width -= e, i.height -= e) : t === "ArrowDown" && (o === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : o === "n" ? (i.y += e, i.height -= e) : o === "ne" ? (i.y += e, i.width -= e, i.height -= e) : o === "sw" ? (i.x -= e, i.width += e, i.height += e) : o === "s" ? i.height += e : o === "se" && (i.width += e, i.height += e)), i;
}
const b = { capture: !0, passive: !1 }, v = class m extends E {
  constructor() {
    super(...arguments), this.docMoveBound = !1, this.mouseDownOnCrop = !1, this.dragStarted = !1, this.evData = {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }, this.componentRef = _(), this.mediaRef = _(), this.initChangeCalled = !1, this.state = {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }, this.onCropPointerDown = (t) => {
      const { crop: e, disabled: o } = this.props, i = this.getBox();
      if (!e)
        return;
      const n = y(e, i.width, i.height);
      if (o)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = t.target.dataset.ord, w = !!a;
      let h = t.clientX, r = t.clientY, c = n.x, d = n.y;
      if (a) {
        const p = t.clientX - i.x, l = t.clientY - i.y;
        let u = 0, C = 0;
        a === "ne" || a == "e" ? (u = p - (n.x + n.width), C = l - n.y, c = n.x, d = n.y + n.height) : a === "se" || a === "s" ? (u = p - (n.x + n.width), C = l - (n.y + n.height), c = n.x, d = n.y) : a === "sw" || a == "w" ? (u = p - n.x, C = l - (n.y + n.height), c = n.x + n.width, d = n.y) : (a === "nw" || a == "n") && (u = p - n.x, C = l - n.y, c = n.x + n.width, d = n.y + n.height), h = c + i.x + u, r = d + i.y + C;
      }
      this.evData = {
        startClientX: h,
        startClientY: r,
        startCropX: c,
        startCropY: d,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: w,
        ord: a
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (t) => {
      const { crop: e, disabled: o, locked: i, keepSelection: n, onChange: a } = this.props, w = this.getBox();
      if (o || i || n && e)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const h = t.clientX - w.x, r = t.clientY - w.y, c = {
        unit: "px",
        x: h,
        y: r,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: t.clientX,
        startClientY: t.clientY,
        startCropX: h,
        startCropY: r,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, a(y(c, w.width, w.height), D(c, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (t) => {
      const { crop: e, disabled: o, onChange: i, onDragStart: n } = this.props, a = this.getBox();
      if (o || !e || !this.mouseDownOnCrop)
        return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = !0, n && n(t));
      const { evData: w } = this;
      w.clientX = t.clientX, w.clientY = t.clientY;
      let h;
      w.isResize ? h = this.resizeCrop() : h = this.dragCrop(), P(e, h) || i(
        y(h, a.width, a.height),
        D(h, a.width, a.height)
      );
    }, this.onComponentKeyDown = (t) => {
      const { crop: e, disabled: o, onChange: i, onComplete: n } = this.props;
      if (o)
        return;
      const a = t.key;
      let w = !1;
      if (!e)
        return;
      const h = this.getBox(), r = this.makePixelCrop(h), d = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? m.nudgeStepLarge : t.shiftKey ? m.nudgeStepMedium : m.nudgeStep;
      if (a === "ArrowLeft" ? (r.x -= d, w = !0) : a === "ArrowRight" ? (r.x += d, w = !0) : a === "ArrowUp" ? (r.y -= d, w = !0) : a === "ArrowDown" && (r.y += d, w = !0), w) {
        t.cancelable && t.preventDefault(), r.x = f(r.x, 0, h.width - r.width), r.y = f(r.y, 0, h.height - r.height);
        const p = y(r, h.width, h.height), l = D(r, h.width, h.height);
        i(p, l), n && n(p, l);
      }
    }, this.onHandlerKeyDown = (t, e) => {
      const {
        aspect: o = 0,
        crop: i,
        disabled: n,
        minWidth: a = 0,
        minHeight: w = 0,
        maxWidth: h,
        maxHeight: r,
        onChange: c,
        onComplete: d
      } = this.props, p = this.getBox();
      if (n || !i)
        return;
      if (t.key === "ArrowUp" || t.key === "ArrowDown" || t.key === "ArrowLeft" || t.key === "ArrowRight")
        t.stopPropagation(), t.preventDefault();
      else
        return;
      const u = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? m.nudgeStepLarge : t.shiftKey ? m.nudgeStepMedium : m.nudgeStep, C = y(i, p.width, p.height), R = K(C, t.key, u, e), x = X(
        R,
        o,
        e,
        p.width,
        p.height,
        a,
        w,
        h,
        r
      );
      if (!P(i, x)) {
        const Y = D(x, p.width, p.height);
        c(x, Y), d && d(x, Y);
      }
    }, this.onDocPointerDone = (t) => {
      const { crop: e, disabled: o, onComplete: i, onDragEnd: n } = this.props, a = this.getBox();
      this.unbindDocMove(), !(o || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, n && n(t), i && i(y(e, a.width, a.height), D(e, a.width, a.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
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
    const { x: e, y: o, width: i, height: n } = t.getBoundingClientRect();
    return { x: e, y: o, width: i, height: n };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: o } = this.props;
    if (o && !t.crop && e) {
      const { width: i, height: n } = this.getBox();
      i && n && o(y(e, i, n), D(e, i, n));
    }
  }
  componentWillUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect();
  }
  bindDocMove() {
    this.docMoveBound || (this.document.addEventListener("pointermove", this.onDocPointerMove, b), this.document.addEventListener("pointerup", this.onDocPointerDone, b), this.document.addEventListener("pointercancel", this.onDocPointerDone, b), this.docMoveBound = !0);
  }
  unbindDocMove() {
    this.docMoveBound && (this.document.removeEventListener("pointermove", this.onDocPointerMove, b), this.document.removeEventListener("pointerup", this.onDocPointerDone, b), this.document.removeEventListener("pointercancel", this.onDocPointerDone, b), this.docMoveBound = !1);
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
    const { evData: t } = this, e = this.getBox(), o = this.makePixelCrop(e), i = t.clientX - t.startClientX, n = t.clientY - t.startClientY;
    return o.x = f(t.startCropX + i, 0, e.width - o.width), o.y = f(t.startCropY + n, 0, e.height - o.height), o;
  }
  getPointRegion(t, e, o, i) {
    const { evData: n } = this, a = n.clientX - t.x, w = n.clientY - t.y;
    let h;
    i && e ? h = e === "nw" || e === "n" || e === "ne" : h = w < n.startCropY;
    let r;
    return o && e ? r = e === "nw" || e === "w" || e === "sw" : r = a < n.startCropX, r ? h ? "nw" : "sw" : h ? "ne" : "se";
  }
  resolveMinDimensions(t, e, o = 0, i = 0) {
    let n = Math.min(o, t.width), a = Math.min(i, t.height);
    return !e || !n && !a ? [n, a] : e > 1 ? n ? [n, n / e] : [a * e, a] : a ? [a * e, a] : [n, n / e];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: o, maxHeight: i } = this.props, n = this.getBox(), [a, w] = this.resolveMinDimensions(n, e, this.props.minWidth, this.props.minHeight);
    let h = this.makePixelCrop(n), r = this.getPointRegion(n, t.ord, a, w);
    const c = t.ord || r;
    let d = t.clientX - t.startClientX, p = t.clientY - t.startClientY;
    (a && c === "nw" || c === "w" || c === "sw") && (d = Math.min(d, -a)), (w && c === "nw" || c === "n" || c === "ne") && (p = Math.min(p, -w));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    r === "ne" ? (l.x = t.startCropX, l.width = d, e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(p), l.y = t.startCropY - l.height)) : r === "se" ? (l.x = t.startCropX, l.y = t.startCropY, l.width = d, e ? l.height = l.width / e : l.height = p) : r === "sw" ? (l.x = t.startCropX + d, l.y = t.startCropY, l.width = Math.abs(d), e ? l.height = l.width / e : l.height = p) : r === "nw" && (l.x = t.startCropX + d, l.width = Math.abs(d), e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(p), l.y = t.startCropY + p));
    const u = X(
      l,
      e,
      r,
      n.width,
      n.height,
      a,
      w,
      o,
      i
    );
    return e || m.xyOrds.indexOf(c) > -1 ? h = u : m.xOrds.indexOf(c) > -1 ? (h.x = u.x, h.width = u.width) : m.yOrds.indexOf(c) > -1 && (h.y = u.y, h.height = u.height), h.x = f(h.x, 0, n.width - h.width), h.y = f(h.y, 0, n.height - h.height), h;
  }
  createCropSelection() {
    const {
      ariaLabels: t = m.defaultProps.ariaLabels,
      disabled: e,
      locked: o,
      renderSelectionAddon: i,
      ruleOfThirds: n,
      crop: a
    } = this.props, w = this.getCropStyle();
    if (a)
      return /* @__PURE__ */ g.createElement(
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
        !e && !o && /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": t.nwDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": t.nDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": t.neDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": t.eDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": t.seDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": t.sDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": t.swDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-w",
            "data-ord": "w",
            tabIndex: 0,
            "aria-label": t.wDragHandle,
            onKeyDown: (h) => this.onHandlerKeyDown(h, "w"),
            role: "button"
          }
        )),
        i && /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__selection-addon", onMouseDown: (h) => h.stopPropagation() }, i(this.state)),
        n && /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(t) {
    const e = { ...M, ...this.props.crop || {} };
    return y(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: o, className: i, crop: n, disabled: a, locked: w, style: h, ruleOfThirds: r } = this.props, { cropIsActive: c, newCropIsBeingDrawn: d } = this.state, p = n ? this.createCropSelection() : null, l = S(
      "ReactCrop",
      i,
      c && "ReactCrop--active",
      a && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      d && "ReactCrop--new-crop",
      n && t && "ReactCrop--fixed-aspect",
      n && o && "ReactCrop--circular-crop",
      n && r && "ReactCrop--rule-of-thirds",
      !this.dragStarted && n && !n.width && !n.height && "ReactCrop--invisible-crop",
      o && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ g.createElement("div", { ref: this.componentRef, className: l, style: h }, /* @__PURE__ */ g.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, e), p);
  }
};
v.xOrds = ["e", "w"];
v.yOrds = ["n", "s"];
v.xyOrds = ["nw", "ne", "se", "sw"];
v.nudgeStep = 1;
v.nudgeStepMedium = 10;
v.nudgeStepLarge = 100;
v.defaultProps = {
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
let I = v;
export {
  I as Component,
  I as ReactCrop,
  P as areCropsEqual,
  N as centerCrop,
  f as clamp,
  S as cls,
  X as containCrop,
  D as convertToPercentCrop,
  y as convertToPixelCrop,
  I as default,
  M as defaultCrop,
  H as makeAspectCrop,
  K as nudgeCrop
};
