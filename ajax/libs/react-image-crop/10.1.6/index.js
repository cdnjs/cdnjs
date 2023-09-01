import g, { PureComponent as E, createRef as _ } from "react";
const M = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  unit: "px"
}, R = (s, e, t) => Math.min(Math.max(s, e), t), S = (...s) => s.filter((e) => e && typeof e == "string").join(" "), P = (s, e) => s === e || s.width === e.width && s.height === e.height && s.x === e.x && s.y === e.y && s.unit === e.unit;
function k(s, e, t, r) {
  const i = y(s, t, r);
  return s.width && (i.height = i.width / e), s.height && (i.width = i.height * e), i.y + i.height > r && (i.height = r - i.y, i.width = i.height * e), i.x + i.width > t && (i.width = t - i.x, i.height = i.width / e), s.unit === "%" ? D(i, t, r) : i;
}
function H(s, e, t) {
  const r = y(s, e, t);
  return r.x = (e - r.width) / 2, r.y = (t - r.height) / 2, s.unit === "%" ? D(r, e, t) : r;
}
function D(s, e, t) {
  return s.unit === "%" ? { ...M, ...s, unit: "%" } : {
    unit: "%",
    x: s.x ? s.x / e * 100 : 0,
    y: s.y ? s.y / t * 100 : 0,
    width: s.width ? s.width / e * 100 : 0,
    height: s.height ? s.height / t * 100 : 0
  };
}
function y(s, e, t) {
  return s.unit ? s.unit === "px" ? { ...M, ...s, unit: "px" } : {
    unit: "px",
    x: s.x ? s.x * e / 100 : 0,
    y: s.y ? s.y * t / 100 : 0,
    width: s.width ? s.width * e / 100 : 0,
    height: s.height ? s.height * t / 100 : 0
  } : { ...M, ...s, unit: "px" };
}
function X(s, e, t, r, i, o = 0, l = 0, w = r, a = i) {
  const n = { ...s };
  let d = Math.min(o, r), c = Math.min(l, i), p = Math.min(w, r), h = Math.min(a, i);
  e && (e > 1 ? (d = l ? l * e : d, c = d / e, p = w * e) : (c = o ? o / e : c, d = c * e, h = a / e)), n.y < 0 && (n.height = Math.max(n.height + n.y, c), n.y = 0), n.x < 0 && (n.width = Math.max(n.width + n.x, d), n.x = 0);
  const u = r - (n.x + n.width);
  u < 0 && (n.x = Math.min(n.x, r - d), n.width += u);
  const C = i - (n.y + n.height);
  if (C < 0 && (n.y = Math.min(n.y, i - c), n.height += C), n.width < d && ((t === "sw" || t == "nw") && (n.x -= d - n.width), n.width = d), n.height < c && ((t === "nw" || t == "ne") && (n.y -= c - n.height), n.height = c), n.width > p && ((t === "sw" || t == "nw") && (n.x -= p - n.width), n.width = p), n.height > h && ((t === "nw" || t == "ne") && (n.y -= h - n.height), n.height = h), e) {
    const b = n.width / n.height;
    if (b < e) {
      const x = Math.max(n.width / e, c);
      (t === "nw" || t == "ne") && (n.y -= x - n.height), n.height = x;
    } else if (b > e) {
      const x = Math.max(n.height * e, d);
      (t === "sw" || t == "nw") && (n.x -= x - n.width), n.width = x;
    }
  }
  return n;
}
function K(s, e, t, r) {
  const i = { ...s };
  return e === "ArrowLeft" ? r === "nw" ? (i.x -= t, i.y -= t, i.width += t, i.height += t) : r === "w" ? (i.x -= t, i.width += t) : r === "sw" ? (i.x -= t, i.width += t, i.height += t) : r === "ne" ? (i.y += t, i.width -= t, i.height -= t) : r === "e" ? i.width -= t : r === "se" && (i.width -= t, i.height -= t) : e === "ArrowRight" && (r === "nw" ? (i.x += t, i.y += t, i.width -= t, i.height -= t) : r === "w" ? (i.x += t, i.width -= t) : r === "sw" ? (i.x += t, i.width -= t, i.height -= t) : r === "ne" ? (i.y -= t, i.width += t, i.height += t) : r === "e" ? i.width += t : r === "se" && (i.width += t, i.height += t)), e === "ArrowUp" ? r === "nw" ? (i.x -= t, i.y -= t, i.width += t, i.height += t) : r === "n" ? (i.y -= t, i.height += t) : r === "ne" ? (i.y -= t, i.width += t, i.height += t) : r === "sw" ? (i.x += t, i.width -= t, i.height -= t) : r === "s" ? i.height -= t : r === "se" && (i.width -= t, i.height -= t) : e === "ArrowDown" && (r === "nw" ? (i.x += t, i.y += t, i.width -= t, i.height -= t) : r === "n" ? (i.y += t, i.height -= t) : r === "ne" ? (i.y += t, i.width -= t, i.height -= t) : r === "sw" ? (i.x -= t, i.width += t, i.height += t) : r === "s" ? i.height += t : r === "se" && (i.width += t, i.height += t)), i;
}
const f = { capture: !0, passive: !1 }, v = class m extends E {
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
    }, this.onCropPointerDown = (e) => {
      const { crop: t, disabled: r } = this.props, i = this.getBox();
      if (!t)
        return;
      const o = y(t, i.width, i.height);
      if (r)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const l = e.target.dataset.ord, w = !!l;
      let a = e.clientX, n = e.clientY, d = o.x, c = o.y;
      if (l) {
        const p = e.clientX - i.x, h = e.clientY - i.y;
        let u = 0, C = 0;
        l === "ne" || l == "e" ? (u = p - (o.x + o.width), C = h - o.y, d = o.x, c = o.y + o.height) : l === "se" || l === "s" ? (u = p - (o.x + o.width), C = h - (o.y + o.height), d = o.x, c = o.y) : l === "sw" || l == "w" ? (u = p - o.x, C = h - (o.y + o.height), d = o.x + o.width, c = o.y) : (l === "nw" || l == "n") && (u = p - o.x, C = h - o.y, d = o.x + o.width, c = o.y + o.height), a = d + i.x + u, n = c + i.y + C;
      }
      this.evData = {
        startClientX: a,
        startClientY: n,
        startCropX: d,
        startCropY: c,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: w,
        ord: l
      }, this.mouseDownOnCrop = !0, this.setState({ cropIsActive: !0 });
    }, this.onComponentPointerDown = (e) => {
      const { crop: t, disabled: r, locked: i, keepSelection: o, onChange: l } = this.props, w = this.getBox();
      if (r || i || o && t)
        return;
      e.cancelable && e.preventDefault(), this.bindDocMove(), this.componentRef.current.focus({ preventScroll: !0 });
      const a = e.clientX - w.x, n = e.clientY - w.y, d = {
        unit: "px",
        x: a,
        y: n,
        width: 0,
        height: 0
      };
      this.evData = {
        startClientX: e.clientX,
        startClientY: e.clientY,
        startCropX: a,
        startCropY: n,
        clientX: e.clientX,
        clientY: e.clientY,
        isResize: !0
      }, this.mouseDownOnCrop = !0, l(y(d, w.width, w.height), D(d, w.width, w.height)), this.setState({ cropIsActive: !0, newCropIsBeingDrawn: !0 });
    }, this.onDocPointerMove = (e) => {
      const { crop: t, disabled: r, onChange: i, onDragStart: o } = this.props, l = this.getBox();
      if (r || !t || !this.mouseDownOnCrop)
        return;
      e.cancelable && e.preventDefault(), this.dragStarted || (this.dragStarted = !0, o && o(e));
      const { evData: w } = this;
      w.clientX = e.clientX, w.clientY = e.clientY;
      let a;
      w.isResize ? a = this.resizeCrop() : a = this.dragCrop(), P(t, a) || i(
        y(a, l.width, l.height),
        D(a, l.width, l.height)
      );
    }, this.onComponentKeyDown = (e) => {
      const { crop: t, disabled: r, onChange: i, onComplete: o } = this.props;
      if (r)
        return;
      const l = e.key;
      let w = !1;
      if (!t)
        return;
      const a = this.getBox(), n = this.makePixelCrop(a), c = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? m.nudgeStepLarge : e.shiftKey ? m.nudgeStepMedium : m.nudgeStep;
      if (l === "ArrowLeft" ? (n.x -= c, w = !0) : l === "ArrowRight" ? (n.x += c, w = !0) : l === "ArrowUp" ? (n.y -= c, w = !0) : l === "ArrowDown" && (n.y += c, w = !0), w) {
        e.cancelable && e.preventDefault(), n.x = R(n.x, 0, a.width - n.width), n.y = R(n.y, 0, a.height - n.height);
        const p = y(n, a.width, a.height), h = D(n, a.width, a.height);
        i(p, h), o && o(p, h);
      }
    }, this.onHandlerKeyDown = (e, t) => {
      const {
        aspect: r = 0,
        crop: i,
        disabled: o,
        minWidth: l = 0,
        minHeight: w = 0,
        maxWidth: a,
        maxHeight: n,
        onChange: d,
        onComplete: c
      } = this.props, p = this.getBox();
      if (o || !i)
        return;
      if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key === "ArrowLeft" || e.key === "ArrowRight")
        e.stopPropagation(), e.preventDefault();
      else
        return;
      const u = (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) ? m.nudgeStepLarge : e.shiftKey ? m.nudgeStepMedium : m.nudgeStep, C = y(i, p.width, p.height), b = K(C, e.key, u, t), x = X(
        b,
        r,
        t,
        p.width,
        p.height,
        l,
        w,
        a,
        n
      );
      if (!P(i, x)) {
        const Y = D(x, p.width, p.height);
        d(x, Y), c && c(x, Y);
      }
    }, this.onDocPointerDone = (e) => {
      const { crop: t, disabled: r, onComplete: i, onDragEnd: o } = this.props, l = this.getBox();
      this.unbindDocMove(), !(r || !t) && this.mouseDownOnCrop && (this.mouseDownOnCrop = !1, this.dragStarted = !1, o && o(e), i && i(y(t, l.width, l.height), D(t, l.width, l.height)), this.setState({ cropIsActive: !1, newCropIsBeingDrawn: !1 }));
    }, this.onDragFocus = (e) => {
      var t;
      (t = this.componentRef.current) == null || t.scrollTo(0, 0);
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
    const { x: t, y: r, width: i, height: o } = e.getBoundingClientRect();
    return { x: t, y: r, width: i, height: o };
  }
  componentDidUpdate(e) {
    const { crop: t, onComplete: r } = this.props;
    if (r && !e.crop && t) {
      const { width: i, height: o } = this.getBox();
      i && o && r(y(t, i, o), D(t, i, o));
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
    const { evData: e } = this, t = this.getBox(), r = this.makePixelCrop(t), i = e.clientX - e.startClientX, o = e.clientY - e.startClientY;
    return r.x = R(e.startCropX + i, 0, t.width - r.width), r.y = R(e.startCropY + o, 0, t.height - r.height), r;
  }
  getPointRegion(e) {
    const { evData: t } = this, r = t.clientX - e.x, o = t.clientY - e.y < t.startCropY;
    return r < t.startCropX ? o ? "nw" : "sw" : o ? "ne" : "se";
  }
  resolveMinDimensions(e = 0, t = 0, r = 0) {
    return e ? e > 1 ? [t, t / e] : [r * e, r] : [t, r];
  }
  resizeCrop() {
    const { evData: e } = this, { aspect: t = 0, maxWidth: r, maxHeight: i } = this.props, [o, l] = this.resolveMinDimensions(t, this.props.minWidth, this.props.minHeight), w = this.getBox();
    let a = this.makePixelCrop(w), n = this.getPointRegion(w);
    const d = e.ord || n;
    let c = e.clientX - e.startClientX, p = e.clientY - e.startClientY;
    t ? (o && (["nw", "sw"].includes(d) ? (n = d, c = Math.min(c, -o)) : ["ne", "se"].includes(d) && (n = d)), l && (["nw", "ne"].includes(d) ? (n = d, p = Math.min(p, -l)) : ["sw", "se"].includes(d) && (n = d))) : (o && (["nw", "w", "sw"].includes(d) ? (n = "nw", c = Math.min(c, -o)) : ["ne", "e", "se"].includes(d) && (n = "ne")), l && (["nw", "n", "ne"].includes(d) ? (n = "nw", p = Math.min(p, -l)) : ["sw", "s", "se"].includes(d) && (n = "sw")));
    const h = {
      unit: "px",
      x: 0,
      y: 0,
      width: 0,
      height: 0
    };
    n === "ne" ? (h.x = e.startCropX, h.width = c, t ? (h.height = h.width / t, h.y = e.startCropY - h.height) : (h.height = Math.abs(p), h.y = e.startCropY - h.height)) : n === "se" ? (h.x = e.startCropX, h.y = e.startCropY, h.width = c, t ? h.height = h.width / t : h.height = p) : n === "sw" ? (h.x = e.startCropX + c, h.y = e.startCropY, h.width = Math.abs(c), t ? h.height = h.width / t : h.height = p) : n === "nw" && (h.x = e.startCropX + c, h.width = Math.abs(c), t ? (h.height = h.width / t, h.y = e.startCropY - h.height) : (h.height = Math.abs(p), h.y = e.startCropY + p));
    const u = X(
      h,
      t,
      n,
      w.width,
      w.height,
      o,
      l,
      r,
      i
    );
    return t || m.xyOrds.indexOf(d) > -1 ? a = u : m.xOrds.indexOf(d) > -1 ? (a.x = u.x, a.width = u.width) : m.yOrds.indexOf(d) > -1 && (a.y = u.y, a.height = u.height), a;
  }
  createCropSelection() {
    const {
      ariaLabels: e = m.defaultProps.ariaLabels,
      disabled: t,
      locked: r,
      renderSelectionAddon: i,
      ruleOfThirds: o,
      crop: l
    } = this.props, w = this.getCropStyle();
    if (l)
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
        !t && !r && /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-elements", onFocus: this.onDragFocus }, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-n", "data-ord": "n" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-e", "data-ord": "e" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-s", "data-ord": "s" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__drag-bar ord-w", "data-ord": "w" }), /* @__PURE__ */ g.createElement(
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
        i && /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__selection-addon", onMouseDown: (a) => a.stopPropagation() }, i(this.state)),
        o && /* @__PURE__ */ g.createElement(g.Fragment, null, /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-hz" }), /* @__PURE__ */ g.createElement("div", { className: "ReactCrop__rule-of-thirds-vt" }))
      );
  }
  makePixelCrop(e) {
    const t = { ...M, ...this.props.crop || {} };
    return y(t, e.width, e.height);
  }
  render() {
    const { aspect: e, children: t, circularCrop: r, className: i, crop: o, disabled: l, locked: w, style: a, ruleOfThirds: n } = this.props, { cropIsActive: d, newCropIsBeingDrawn: c } = this.state, p = o ? this.createCropSelection() : null, h = S(
      "ReactCrop",
      i,
      d && "ReactCrop--active",
      l && "ReactCrop--disabled",
      w && "ReactCrop--locked",
      c && "ReactCrop--new-crop",
      o && e && "ReactCrop--fixed-aspect",
      o && r && "ReactCrop--circular-crop",
      o && n && "ReactCrop--rule-of-thirds",
      !this.dragStarted && o && !o.width && !o.height && "ReactCrop--invisible-crop",
      r && "ReactCrop--no-animate"
    );
    return /* @__PURE__ */ g.createElement("div", { ref: this.componentRef, className: h, style: a }, /* @__PURE__ */ g.createElement("div", { ref: this.mediaRef, className: "ReactCrop__child-wrapper", onPointerDown: this.onComponentPointerDown }, t), p);
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
let N = v;
export {
  N as Component,
  N as ReactCrop,
  P as areCropsEqual,
  H as centerCrop,
  R as clamp,
  S as cls,
  X as containCrop,
  D as convertToPercentCrop,
  y as convertToPixelCrop,
  N as default,
  M as defaultCrop,
  k as makeAspectCrop,
  K as nudgeCrop
};
