import g, { PureComponent as E, createRef as M } from "react";
const _ = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
};
function R(e, n, i) {
  return Math.min(Math.max(e, n), i);
}
function Y(e, n) {
  return e.width === n.width && e.height === n.height && e.x === n.x && e.y === n.y && e.unit === n.unit;
}
function k(e, n, i, r) {
  const t = C(e, i, r);
  return e.width && (t.height = t.width / n), e.height && (t.width = t.height * n), t.y + t.height > r && (t.height = r - t.y, t.width = t.height * n), t.x + t.width > i && (t.width = i - t.x, t.height = t.width / n), e.unit === "%" ? y(t, i, r) : t;
}
function H(e, n, i) {
  const r = C(e, n, i);
  return r.x = (n - r.width) / 2, r.y = (i - r.height) / 2, e.unit === "%" ? y(r, n, i) : r;
}
function y(e, n, i) {
  return e.unit === "%" ? { ..._, ...e, unit: "%" } : {
    unit: "%",
    x: e.x ? e.x / n * 100 : 0,
    y: e.y ? e.y / i * 100 : 0,
    width: e.width ? e.width / n * 100 : 0,
    height: e.height ? e.height / i * 100 : 0
  };
}
function C(e, n, i) {
  return e.unit ? e.unit === "px" ? { ..._, ...e, unit: "px" } : {
    unit: "px",
    x: e.x ? e.x * n / 100 : 0,
    y: e.y ? e.y * i / 100 : 0,
    width: e.width ? e.width * n / 100 : 0,
    height: e.height ? e.height * i / 100 : 0
  } : { ..._, ...e, unit: "px" };
}
function P(e, n, i, r, t, s = 0, w = 0, a = r, l = t) {
  const o = { ...e };
  let d = Math.min(s, r), c = Math.min(w, t), h = Math.min(a, r), p = Math.min(l, t);
  n && (n > 1 ? (d = w ? w * n : d, c = d / n, h = a * n) : (c = s ? s / n : c, d = c * n, p = l / n)), o.y < 0 && (o.height = Math.max(o.height + o.y, c), o.y = 0), o.x < 0 && (o.width = Math.max(o.width + o.x, d), o.x = 0);
  const m = r - (o.x + o.width);
  m < 0 && (o.x = Math.min(o.x, r - d), o.width += m);
  const b = t - (o.y + o.height);
  if (b < 0 && (o.y = Math.min(o.y, t - c), o.height += b), o.width < d && ((i === "sw" || i == "nw") && (o.x -= d - o.width), o.width = d), o.height < c && ((i === "nw" || i == "ne") && (o.y -= c - o.height), o.height = c), o.width > h && ((i === "sw" || i == "nw") && (o.x -= h - o.width), o.width = h), o.height > p && ((i === "nw" || i == "ne") && (o.y -= p - o.height), o.height = p), n) {
    const D = o.width / o.height;
    if (D < n) {
      const x = Math.max(o.width / n, c);
      (i === "nw" || i == "ne") && (o.y -= x - o.height), o.height = x;
    } else if (D > n) {
      const x = Math.max(o.height * n, d);
      (i === "sw" || i == "nw") && (o.x -= x - o.width), o.width = x;
    }
  }
  return o;
}
function S(e, n, i, r) {
  const t = { ...e };
  return n === "ArrowLeft" ? r === "nw" ? (t.x -= i, t.y -= i, t.width += i, t.height += i) : r === "w" ? (t.x -= i, t.width += i) : r === "sw" ? (t.x -= i, t.width += i, t.height += i) : r === "ne" ? (t.y += i, t.width -= i, t.height -= i) : r === "e" ? t.width -= i : r === "se" && (t.width -= i, t.height -= i) : n === "ArrowRight" && (r === "nw" ? (t.x += i, t.y += i, t.width -= i, t.height -= i) : r === "w" ? (t.x += i, t.width -= i) : r === "sw" ? (t.x += i, t.width -= i, t.height -= i) : r === "ne" ? (t.y -= i, t.width += i, t.height += i) : r === "e" ? t.width += i : r === "se" && (t.width += i, t.height += i)), n === "ArrowUp" ? r === "nw" ? (t.x -= i, t.y -= i, t.width += i, t.height += i) : r === "n" ? (t.y -= i, t.height += i) : r === "ne" ? (t.y -= i, t.width += i, t.height += i) : r === "sw" ? (t.x += i, t.width -= i, t.height -= i) : r === "s" ? t.height -= i : r === "se" && (t.width -= i, t.height -= i) : n === "ArrowDown" && (r === "nw" ? (t.x += i, t.y += i, t.width -= i, t.height -= i) : r === "n" ? (t.y += i, t.height -= i) : r === "ne" ? (t.y += i, t.width -= i, t.height -= i) : r === "sw" ? (t.x -= i, t.width += i, t.height += i) : r === "s" ? t.height += i : r === "se" && (t.width += i, t.height += i)), t;
}
function X(e) {
  var n, i, r = "";
  if (typeof e == "string" || typeof e == "number")
    r += e;
  else if (typeof e == "object")
    if (Array.isArray(e))
      for (n = 0; n < e.length; n++)
        e[n] && (i = X(e[n])) && (r && (r += " "), r += i);
    else
      for (n in e)
        e[n] && (r && (r += " "), r += n);
  return r;
}
function K() {
  for (var e, n, i = 0, r = ""; i < arguments.length; )
    (e = arguments[i++]) && (n = X(e)) && (r && (r += " "), r += n);
  return r;
}
const f = { capture: !0, passive: !1 }, u = class extends E {
  constructor() {
    super(...arguments), this.docMoveBound = !1, this.mouseDownOnCrop = !1, this.dragStarted = !1, this.evData = {
      startClientX: 0,
      startClientY: 0,
      startCropX: 0,
      startCropY: 0,
      clientX: 0,
      clientY: 0,
      isResize: !0
    }, this.componentRef = M(), this.mediaRef = M(), this.initChangeCalled = !1, this.state = {
      cropIsActive: !1,
      newCropIsBeingDrawn: !1
    }, this.onCropPointerDown = (e) => {
      const { crop: n, disabled: i } = this.props, r = this.getBox();
      if (!n)
        return;
      const t = C(n, r.width, r.height);
      if (i)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const s = e.target.dataset.ord, w = !!s;
      let a = e.clientX, l = e.clientY, o = t.x, d = t.y;
      if (s) {
        const c = e.clientX - r.x, h = e.clientY - r.y;
        let p = 0, m = 0;
        s === "ne" || s == "e" ? (p = c - (t.x + t.width), m = h - t.y, o = t.x, d = t.y + t.height) : s === "se" || s === "s" ? (p = c - (t.x + t.width), m = h - (t.y + t.height), o = t.x, d = t.y) : s === "sw" || s == "w" ? (p = c - t.x, m = h - (t.y + t.height), o = t.x + t.width, d = t.y) : (s === "nw" || s == "n") && (p = c - t.x, m = h - t.y, o = t.x + t.width, d = t.y + t.height), a = o + r.x + p, l = d + r.y + m;
      }
      this.evData = {
        startClientX: a,
        startClientY: l,
        startCropX: o,
        startCropY: d,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: w,
        ord: s
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (e) => {
      const { crop: n, disabled: i, locked: r, keepSelection: t, onChange: s } = this.props, w = this.getBox();
      if (i || r || t && n)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = e.clientX - w.x, l = e.clientY - w.y, o = {
        unit: "px",
        x: a,
        y: l,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCropX: a,
        startCropY: l,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, s(C(o, w.width, w.height), y(o, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (e) => {
      const { crop: n, disabled: i, onChange: r, onDragStart: t } = this.props, s = this.getBox();
      if (i || !n || !this.mouseDownOnCrop)
        return;
      e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = !0, t && t(e));
      const { evData: w } = this;
      w.clientX = e.clientX, w.clientY = e.clientY;
      let a;
      w.isResize ? a = this.resizeCrop() : a = this.dragCrop(), Y(n, a) || r(
        C(a, s.width, s.height),
        y(a, s.width, s.height)
      );
    }, this.onComponentKeyDown = (e) => {
      const { crop: n, disabled: i, onChange: r, onComplete: t } = this.props, s = this.getBox();
      if (i)
        return;
      const w = e.key;
      let a = !1;
      if (!n)
        return;
      const l = this.makePixelCrop(), d = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? u.nudgeStepLarge : e.shiftKey ? u.nudgeStepMedium : u.nudgeStep;
      if (w === "ArrowLeft" ? (l.x -= d, a = !0) : w === "ArrowRight" ? (l.x += d, a = !0) : w === "ArrowUp" ? (l.y -= d, a = !0) : w === "ArrowDown" && (l.y += d, a = !0), a) {
        e.cancelable && e.preventDefault(), l.x = R(l.x, 0, s.width - l.width), l.y = R(l.y, 0, s.height - l.height);
        const c = C(l, s.width, s.height), h = y(l, s.width, s.height);
        r(c, h), t && t(c, h);
      }
    }, this.onHandlerKeyDown = (e, n) => {
      const {
        aspect: i = 0,
        crop: r,
        disabled: t,
        minWidth: s = 0,
        minHeight: w = 0,
        maxWidth: a,
        maxHeight: l,
        onChange: o,
        onComplete: d
      } = this.props, c = this.getBox();
      if (t || !r)
        return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        e.stopPropagation(), e.preventDefault();
      else
        return;
      const p = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? u.nudgeStepLarge : e.shiftKey ? u.nudgeStepMedium : u.nudgeStep, m = C(r, c.width, c.height), b = S(m, e.key, p, n), D = P(
        b,
        i,
        n,
        c.width,
        c.height,
        s,
        w,
        a,
        l
      );
      if (!Y(r, D)) {
        const x = y(D, c.width, c.height);
        o(D, x), d && d(D, x);
      }
    }, this.onDocPointerDone = (e) => {
      const { crop: n, disabled: i, onComplete: r, onDragEnd: t } = this.props, s = this.getBox();
      this.unbindDocMove(), !(i || !n) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, t && t(e), r && r(C(n, s.width, s.height), y(n, s.width, s.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    }, this.onDragFocus = (e) => {
      var n;
      (n = this.componentRef.current) == null || n.scrollTo(0, 0);
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
    const { x: n, y: i, width: r, height: t } = e.getBoundingClientRect();
    return { x: n, y: i, width: r, height: t };
  }
  componentDidUpdate(e) {
    const { crop: n, onComplete: i } = this.props;
    if (i && !e.crop && n) {
      const { width: r, height: t } = this.getBox();
      r && t && i(C(n, r, t), y(n, r, t));
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
    const { evData: e } = this, n = this.getBox(), i = this.makePixelCrop(), r = e.clientX - e.startClientX, t = e.clientY - e.startClientY;
    return i.x = R(e.startCropX + r, 0, n.width - i.width), i.y = R(e.startCropY + t, 0, n.height - i.height), i;
  }
  getPointRegion(e) {
    const { evData: n } = this, i = n.clientX - e.x, t = n.clientY - e.y < n.startCropY;
    return i < n.startCropX ? t ? "nw" : "sw" : t ? "ne" : "se";
  }
  resizeCrop() {
    const { evData: e } = this, n = this.getBox(), { aspect: i = 0, minWidth: r = 0, minHeight: t = 0, maxWidth: s, maxHeight: w } = this.props, a = this.getPointRegion(n), l = this.makePixelCrop(), o = e.ord ? e.ord : a, d = e.clientX - e.startClientX, c = e.clientY - e.startClientY, h = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    a === "ne" ? (h.x = e.startCropX, h.width = d, i ? (h.height = h.width / i, h.y = e.startCropY - h.height) : (h.height = Math.abs(c), h.y = e.startCropY - h.height)) : a === "se" ? (h.x = e.startCropX, h.y = e.startCropY, h.width = d, i ? h.height = h.width / i : h.height = c) : a === "sw" ? (h.x = e.startCropX + d, h.y = e.startCropY, h.width = Math.abs(d), i ? h.height = h.width / i : h.height = c) : a === "nw" && (h.x = e.startCropX + d, h.width = Math.abs(d), i ? (h.height = h.width / i, h.y = e.startCropY - h.height) : (h.height = Math.abs(c), h.y = e.startCropY + c));
    const p = P(
      h,
      i,
      a,
      n.width,
      n.height,
      r,
      t,
      s,
      w
    );
    return i || u.xyOrds.indexOf(o) > -1 ? (l.x = p.x, l.y = p.y, l.width = p.width, l.height = p.height) : u.xOrds.indexOf(o) > -1 ? (l.x = p.x, l.width = p.width) : u.yOrds.indexOf(o) > -1 && (l.y = p.y, l.height = p.height), l;
  }
  createCropSelection() {
    const {
      ariaLabels: e = u.defaultProps.ariaLabels,
      disabled: n,
      locked: i,
      renderSelectionAddon: r,
      ruleOfThirds: t,
      crop: s
    } = this.props, w = this.getCropStyle();
    if (s)
      return /* @__PURE__ */ g.createElement(
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
        !n && !i && /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-nw",
            "data-ord": "nw",
            tabIndex: 0,
            "aria-label": e.nwDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "nw"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-n",
            "data-ord": "n",
            tabIndex: 0,
            "aria-label": e.nDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "n"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-ne",
            "data-ord": "ne",
            tabIndex: 0,
            "aria-label": e.neDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "ne"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-e",
            "data-ord": "e",
            tabIndex: 0,
            "aria-label": e.eDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "e"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-se",
            "data-ord": "se",
            tabIndex: 0,
            "aria-label": e.seDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "se"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-s",
            "data-ord": "s",
            tabIndex: 0,
            "aria-label": e.sDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "s"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
          "div",
          {
            className: "ReactCrop__drag-handle ord-sw",
            "data-ord": "sw",
            tabIndex: 0,
            "aria-label": e.swDragHandle,
            onKeyDown: (a) => this.onHandlerKeyDown(a, "sw"),
            role: "button"
          }
        ), /* @__PURE__ */ g.createElement(
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
        r && /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__selection-addon", onMouseDown: (a) => a.stopPropagation() }, r(this.state)),
        t && /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop() {
    const e = { ..._, ...this.props.crop || {} }, n = this.getBox();
    return C(e, n.width, n.height);
  }
  render() {
    const { aspect: e, children: n, circularCrop: i, className: r, crop: t, disabled: s, locked: w, style: a, ruleOfThirds: l } = this.props, { cropIsActive: o, newCropIsBeingDrawn: d } = this.state, c = t ? this.createCropSelection() : null, h = K("ReactCrop", r, {
      "ReactCrop--active": o,
      "ReactCrop--disabled": s,
      "ReactCrop--locked": w,
      "ReactCrop--new-crop": d,
      "ReactCrop--fixed-aspect": t && e,
      "ReactCrop--circular-crop": t && i,
      "ReactCrop--rule-of-thirds": t && l,
      "ReactCrop--invisible-crop": !this.dragStarted && t && !t.width && !t.height
    });
    return /* @__PURE__ */ g.createElement("div", { ref: this.componentRef, className: h, style: a }, /* @__PURE__ */ g.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, n), c);
  }
};
let v = u;
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
export {
  v as Component,
  v as ReactCrop,
  Y as areCropsEqual,
  H as centerCrop,
  R as clamp,
  P as containCrop,
  y as convertToPercentCrop,
  C as convertToPixelCrop,
  v as default,
  _ as defaultCrop,
  k as makeAspectCrop,
  S as nudgeCrop
};
