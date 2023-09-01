import g, { PureComponent as S, createRef as _ } from "react";
const M = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, f = (s, t, e) => Math.min(Math.max(s, t), e), E = (...s) => s.filter((t) => t && typeof t == "string").join(" "), P = (s, t) => s === t || s.width === t.width && s.height === t.height && s.x === t.x && s.y === t.y && s.unit === t.unit;
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
function X(s, t, e, o, i, r = 0, a = 0, d = o, h = i) {
  const n = { ...s };
  let w = Math.min(r, o), c = Math.min(a, i), p = Math.min(d, o), l = Math.min(h, i);
  t && (t > 1 ? (w = a ? a * t : w, c = w / t, p = d * t) : (c = r ? r / t : c, w = c * t, l = h / t)), n.y < 0 && (n.height = Math.max(n.height + n.y, c), n.y = 0), n.x < 0 && (n.width = Math.max(n.width + n.x, w), n.x = 0);
  const u = o - (n.x + n.width);
  u < 0 && (n.x = Math.min(n.x, o - w), n.width += u);
  const C = i - (n.y + n.height);
  if (C < 0 && (n.y = Math.min(n.y, i - c), n.height += C), n.width < w && ((e === "sw" || e == "nw") && (n.x -= w - n.width), n.width = w), n.height < c && ((e === "nw" || e == "ne") && (n.y -= c - n.height), n.height = c), n.width > p && ((e === "sw" || e == "nw") && (n.x -= p - n.width), n.width = p), n.height > l && ((e === "nw" || e == "ne") && (n.y -= l - n.height), n.height = l), t) {
    const R = n.width / n.height;
    if (R < t) {
      const x = Math.max(n.width / t, c);
      (e === "nw" || e == "ne") && (n.y -= x - n.height), n.height = x;
    } else if (R > t) {
      const x = Math.max(n.height * t, w);
      (e === "sw" || e == "nw") && (n.x -= x - n.width), n.width = x;
    }
  }
  return n;
}
function K(s, t, e, o) {
  const i = { ...s };
  return t === "ArrowLeft" ? o === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : o === "w" ? (i.x -= e, i.width += e) : o === "sw" ? (i.x -= e, i.width += e, i.height += e) : o === "ne" ? (i.y += e, i.width -= e, i.height -= e) : o === "e" ? i.width -= e : o === "se" && (i.width -= e, i.height -= e) : t === "ArrowRight" && (o === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : o === "w" ? (i.x += e, i.width -= e) : o === "sw" ? (i.x += e, i.width -= e, i.height -= e) : o === "ne" ? (i.y -= e, i.width += e, i.height += e) : o === "e" ? i.width += e : o === "se" && (i.width += e, i.height += e)), t === "ArrowUp" ? o === "nw" ? (i.x -= e, i.y -= e, i.width += e, i.height += e) : o === "n" ? (i.y -= e, i.height += e) : o === "ne" ? (i.y -= e, i.width += e, i.height += e) : o === "sw" ? (i.x += e, i.width -= e, i.height -= e) : o === "s" ? i.height -= e : o === "se" && (i.width -= e, i.height -= e) : t === "ArrowDown" && (o === "nw" ? (i.x += e, i.y += e, i.width -= e, i.height -= e) : o === "n" ? (i.y += e, i.height -= e) : o === "ne" ? (i.y += e, i.width -= e, i.height -= e) : o === "sw" ? (i.x -= e, i.width += e, i.height += e) : o === "s" ? i.height += e : o === "se" && (i.width += e, i.height += e)), i;
}
const b = { capture: !0, passive: !1 }, v = class m extends S {
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
      const r = y(e, i.width, i.height);
      if (o)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = t.target.dataset.ord, d = !!a;
      let h = t.clientX, n = t.clientY, w = r.x, c = r.y;
      if (a) {
        const p = t.clientX - i.x, l = t.clientY - i.y;
        let u = 0, C = 0;
        a === "ne" || a == "e" ? (u = p - (r.x + r.width), C = l - r.y, w = r.x, c = r.y + r.height) : a === "se" || a === "s" ? (u = p - (r.x + r.width), C = l - (r.y + r.height), w = r.x, c = r.y) : a === "sw" || a == "w" ? (u = p - r.x, C = l - (r.y + r.height), w = r.x + r.width, c = r.y) : (a === "nw" || a == "n") && (u = p - r.x, C = l - r.y, w = r.x + r.width, c = r.y + r.height), h = w + i.x + u, n = c + i.y + C;
      }
      this.evData = {
        startClientX: h,
        startClientY: n,
        startCropX: w,
        startCropY: c,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: d,
        ord: a
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (t) => {
      const { crop: e, disabled: o, locked: i, keepSelection: r, onChange: a } = this.props, d = this.getBox();
      if (o || i || r && e)
        return;
      t.cancelable && t.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const h = t.clientX - d.x, n = t.clientY - d.y, w = {
        unit: "px",
        x: h,
        y: n,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: t.clientX,
        startClientY: t.clientY,
        startCropX: h,
        startCropY: n,
        clientX: t.clientX,
        clientY: t.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, a(y(w, d.width, d.height), D(w, d.width, d.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (t) => {
      const { crop: e, disabled: o, onChange: i, onDragStart: r } = this.props, a = this.getBox();
      if (o || !e || !this.mouseDownOnCrop)
        return;
      t.cancelable && t.preventDefault(), this.dragStarted || (this.dragStarted = !0, r && r(t));
      const { evData: d } = this;
      d.clientX = t.clientX, d.clientY = t.clientY;
      let h;
      d.isResize ? h = this.resizeCrop() : h = this.dragCrop(), P(e, h) || i(
        y(h, a.width, a.height),
        D(h, a.width, a.height)
      );
    }, this.onComponentKeyDown = (t) => {
      const { crop: e, disabled: o, onChange: i, onComplete: r } = this.props;
      if (o)
        return;
      const a = t.key;
      let d = !1;
      if (!e)
        return;
      const h = this.getBox(), n = this.makePixelCrop(h), c = (navigator.platform.match("Mac") ? t.metaKey : t.ctrlKey) ? m.nudgeStepLarge : t.shiftKey ? m.nudgeStepMedium : m.nudgeStep;
      if (a === "ArrowLeft" ? (n.x -= c, d = !0) : a === "ArrowRight" ? (n.x += c, d = !0) : a === "ArrowUp" ? (n.y -= c, d = !0) : a === "ArrowDown" && (n.y += c, d = !0), d) {
        t.cancelable && t.preventDefault(), n.x = f(n.x, 0, h.width - n.width), n.y = f(n.y, 0, h.height - n.height);
        const p = y(n, h.width, h.height), l = D(n, h.width, h.height);
        i(p, l), r && r(p, l);
      }
    }, this.onHandlerKeyDown = (t, e) => {
      const {
        aspect: o = 0,
        crop: i,
        disabled: r,
        minWidth: a = 0,
        minHeight: d = 0,
        maxWidth: h,
        maxHeight: n,
        onChange: w,
        onComplete: c
      } = this.props, p = this.getBox();
      if (r || !i)
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
        d,
        h,
        n
      );
      if (!P(i, x)) {
        const Y = D(x, p.width, p.height);
        w(x, Y), c && c(x, Y);
      }
    }, this.onDocPointerDone = (t) => {
      const { crop: e, disabled: o, onComplete: i, onDragEnd: r } = this.props, a = this.getBox();
      this.unbindDocMove(), !(o || !e) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, r && r(t), i && i(y(e, a.width, a.height), D(e, a.width, a.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
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
    const { x: e, y: o, width: i, height: r } = t.getBoundingClientRect();
    return { x: e, y: o, width: i, height: r };
  }
  componentDidUpdate(t) {
    const { crop: e, onComplete: o } = this.props;
    if (o && !t.crop && e) {
      const { width: i, height: r } = this.getBox();
      i && r && o(y(e, i, r), D(e, i, r));
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
    const { evData: t } = this, e = this.getBox(), o = this.makePixelCrop(e), i = t.clientX - t.startClientX, r = t.clientY - t.startClientY;
    return o.x = f(t.startCropX + i, 0, e.width - o.width), o.y = f(t.startCropY + r, 0, e.height - o.height), o;
  }
  getPointRegion(t, e, o, i) {
    const { evData: r } = this, a = r.clientX - t.x, d = r.clientY - t.y;
    let h;
    i && e ? h = e === "nw" || e === "n" || e === "ne" : h = d < r.startCropY;
    let n;
    return o && e ? n = e === "nw" || e === "w" || e === "sw" : n = a < r.startCropX, n ? h ? "nw" : "sw" : h ? "ne" : "se";
  }
  resolveMinDimensions(t, e, o = 0, i = 0) {
    let r = Math.min(o, t.width), a = Math.min(i, t.height);
    if (!e || !r && !a)
      return [r, a];
    const d = Math.max(r, a);
    return e > 1 ? [d, d / e] : [d * e, d];
  }
  resizeCrop() {
    const { evData: t } = this, { aspect: e = 0, maxWidth: o, maxHeight: i } = this.props, r = this.getBox(), [a, d] = this.resolveMinDimensions(r, e, this.props.minWidth, this.props.minHeight);
    let h = this.makePixelCrop(r), n = this.getPointRegion(r, t.ord, a, d);
    const w = t.ord || n;
    let c = t.clientX - t.startClientX, p = t.clientY - t.startClientY;
    (a && w === "nw" || w === "w" || w === "sw") && (c = Math.min(c, -a)), (d && w === "nw" || w === "n" || w === "ne") && (p = Math.min(p, -d));
    const l = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    n === "ne" ? (l.x = t.startCropX, l.width = c, e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(p), l.y = t.startCropY - l.height)) : n === "se" ? (l.x = t.startCropX, l.y = t.startCropY, l.width = c, e ? l.height = l.width / e : l.height = p) : n === "sw" ? (l.x = t.startCropX + c, l.y = t.startCropY, l.width = Math.abs(c), e ? l.height = l.width / e : l.height = p) : n === "nw" && (l.x = t.startCropX + c, l.width = Math.abs(c), e ? (l.height = l.width / e, l.y = t.startCropY - l.height) : (l.height = Math.abs(p), l.y = t.startCropY + p));
    const u = X(
      l,
      e,
      n,
      r.width,
      r.height,
      a,
      d,
      o,
      i
    );
    return e || m.xyOrds.indexOf(w) > -1 ? h = u : m.xOrds.indexOf(w) > -1 ? (h.x = u.x, h.width = u.width) : m.yOrds.indexOf(w) > -1 && (h.y = u.y, h.height = u.height), h.x = f(h.x, 0, r.width - h.width), h.y = f(h.y, 0, r.height - h.height), h;
  }
  createCropSelection() {
    const {
      ariaLabels: t = m.defaultProps.ariaLabels,
      disabled: e,
      locked: o,
      renderSelectionAddon: i,
      ruleOfThirds: r,
      crop: a
    } = this.props, d = this.getCropStyle();
    if (a)
      return /* @__PURE__ */ g.createElement(
        "div",
        {
          style: d,
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
        r && /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(t) {
    const e = { ...M, ...this.props.crop || {} };
    return y(e, t.width, t.height);
  }
  render() {
    const { aspect: t, children: e, circularCrop: o, className: i, crop: r, disabled: a, locked: d, style: h, ruleOfThirds: n } = this.props, { cropIsActive: w, newCropIsBeingDrawn: c } = this.state, p = r ? this.createCropSelection() : null, l = E(
      "ReactCrop",
      i,
      w && "ReactCrop--active",
      a && "ReactCrop--disabled",
      d && "ReactCrop--locked",
      c && "ReactCrop--new-crop",
      r && t && "ReactCrop--fixed-aspect",
      r && o && "ReactCrop--circular-crop",
      r && n && "ReactCrop--rule-of-thirds",
      !this.dragStarted && r && !r.width && !r.height && "ReactCrop--invisible-crop",
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
  E as cls,
  X as containCrop,
  D as convertToPercentCrop,
  y as convertToPixelCrop,
  I as default,
  M as defaultCrop,
  H as makeAspectCrop,
  K as nudgeCrop
};
