var ls = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var st = (n, t, e) => (ls(n, t, "read from private field"), e ? e.call(n) : t.get(n)), at = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, gt = (n, t, e, s) => (ls(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e);
var cs = (n, t, e) => (ls(n, t, "access private method"), e);
const Rt = document, vn = window, Sr = Rt.documentElement, le = Rt.createElement.bind(Rt), kr = le("div"), hs = le("table"), $a = le("tbody"), Hi = le("tr"), { isArray: Hn, prototype: xr } = Array, { concat: Ma, filter: Ks, indexOf: Tr, map: Nr, push: Aa, slice: Er, some: qs, splice: Ia } = xr, Pa = /^#(?:[\w-]|\\.|[^\x00-\xa0])*$/, Ra = /^\.(?:[\w-]|\\.|[^\x00-\xa0])*$/, Da = /<.+>/, La = /^\w+$/;
function Gs(n, t) {
  const e = za(t);
  return !n || !e && !oe(t) && !Y(t) ? [] : !e && Ra.test(n) ? t.getElementsByClassName(n.slice(1).replace(/\\/g, "")) : !e && La.test(n) ? t.getElementsByTagName(n) : t.querySelectorAll(n);
}
class jn {
  constructor(t, e) {
    if (!t)
      return;
    if (bs(t))
      return t;
    let s = t;
    if (et(t)) {
      const i = e || Rt;
      if (s = Pa.test(t) && oe(i) ? i.getElementById(t.slice(1).replace(/\\/g, "")) : Da.test(t) ? Ar(t) : bs(i) ? i.find(t) : et(i) ? d(i).find(t) : Gs(t, i), !s)
        return;
    } else if (ce(t))
      return this.ready(t);
    (s.nodeType || s === vn) && (s = [s]), this.length = s.length;
    for (let i = 0, r = this.length; i < r; i++)
      this[i] = s[i];
  }
  init(t, e) {
    return new jn(t, e);
  }
}
const S = jn.prototype, d = S.init;
d.fn = d.prototype = S;
S.length = 0;
S.splice = Ia;
typeof Symbol == "function" && (S[Symbol.iterator] = xr[Symbol.iterator]);
function bs(n) {
  return n instanceof jn;
}
function _e(n) {
  return !!n && n === n.window;
}
function oe(n) {
  return !!n && n.nodeType === 9;
}
function za(n) {
  return !!n && n.nodeType === 11;
}
function Y(n) {
  return !!n && n.nodeType === 1;
}
function Fa(n) {
  return !!n && n.nodeType === 3;
}
function Oa(n) {
  return typeof n == "boolean";
}
function ce(n) {
  return typeof n == "function";
}
function et(n) {
  return typeof n == "string";
}
function ft(n) {
  return n === void 0;
}
function Oe(n) {
  return n === null;
}
function $r(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
function Ys(n) {
  if (typeof n != "object" || n === null)
    return !1;
  const t = Object.getPrototypeOf(n);
  return t === null || t === Object.prototype;
}
d.isWindow = _e;
d.isFunction = ce;
d.isArray = Hn;
d.isNumeric = $r;
d.isPlainObject = Ys;
function Z(n, t, e) {
  if (e) {
    let s = n.length;
    for (; s--; )
      if (t.call(n[s], s, n[s]) === !1)
        return n;
  } else if (Ys(n)) {
    const s = Object.keys(n);
    for (let i = 0, r = s.length; i < r; i++) {
      const o = s[i];
      if (t.call(n[o], o, n[o]) === !1)
        return n;
    }
  } else
    for (let s = 0, i = n.length; s < i; s++)
      if (t.call(n[s], s, n[s]) === !1)
        return n;
  return n;
}
d.each = Z;
S.each = function(n) {
  return Z(this, n);
};
S.empty = function() {
  return this.each((n, t) => {
    for (; t.firstChild; )
      t.removeChild(t.firstChild);
  });
};
function wn(...n) {
  const t = Oa(n[0]) ? n.shift() : !1, e = n.shift(), s = n.length;
  if (!e)
    return {};
  if (!s)
    return wn(t, d, e);
  for (let i = 0; i < s; i++) {
    const r = n[i];
    for (const o in r)
      t && (Hn(r[o]) || Ys(r[o])) ? ((!e[o] || e[o].constructor !== r[o].constructor) && (e[o] = new r[o].constructor()), wn(t, e[o], r[o])) : e[o] = r[o];
  }
  return e;
}
d.extend = wn;
S.extend = function(n) {
  return wn(S, n);
};
const Wa = /\S+/g;
function Bn(n) {
  return et(n) ? n.match(Wa) || [] : [];
}
S.toggleClass = function(n, t) {
  const e = Bn(n), s = !ft(t);
  return this.each((i, r) => {
    Y(r) && Z(e, (o, a) => {
      s ? t ? r.classList.add(a) : r.classList.remove(a) : r.classList.toggle(a);
    });
  });
};
S.addClass = function(n) {
  return this.toggleClass(n, !0);
};
S.removeAttr = function(n) {
  const t = Bn(n);
  return this.each((e, s) => {
    Y(s) && Z(t, (i, r) => {
      s.removeAttribute(r);
    });
  });
};
function Ha(n, t) {
  if (n) {
    if (et(n)) {
      if (arguments.length < 2) {
        if (!this[0] || !Y(this[0]))
          return;
        const e = this[0].getAttribute(n);
        return Oe(e) ? void 0 : e;
      }
      return ft(t) ? this : Oe(t) ? this.removeAttr(n) : this.each((e, s) => {
        Y(s) && s.setAttribute(n, t);
      });
    }
    for (const e in n)
      this.attr(e, n[e]);
    return this;
  }
}
S.attr = Ha;
S.removeClass = function(n) {
  return arguments.length ? this.toggleClass(n, !1) : this.attr("class", "");
};
S.hasClass = function(n) {
  return !!n && qs.call(this, (t) => Y(t) && t.classList.contains(n));
};
S.get = function(n) {
  return ft(n) ? Er.call(this) : (n = Number(n), this[n < 0 ? n + this.length : n]);
};
S.eq = function(n) {
  return d(this.get(n));
};
S.first = function() {
  return this.eq(0);
};
S.last = function() {
  return this.eq(-1);
};
function ja(n) {
  return ft(n) ? this.get().map((t) => Y(t) || Fa(t) ? t.textContent : "").join("") : this.each((t, e) => {
    Y(e) && (e.textContent = n);
  });
}
S.text = ja;
function Dt(n, t, e) {
  if (!Y(n))
    return;
  const s = vn.getComputedStyle(n, null);
  return e ? s.getPropertyValue(t) || void 0 : s[t] || n.style[t];
}
function kt(n, t) {
  return parseInt(Dt(n, t), 10) || 0;
}
function ji(n, t) {
  return kt(n, `border${t ? "Left" : "Top"}Width`) + kt(n, `padding${t ? "Left" : "Top"}`) + kt(n, `padding${t ? "Right" : "Bottom"}`) + kt(n, `border${t ? "Right" : "Bottom"}Width`);
}
const us = {};
function Ba(n) {
  if (us[n])
    return us[n];
  const t = le(n);
  Rt.body.insertBefore(t, null);
  const e = Dt(t, "display");
  return Rt.body.removeChild(t), us[n] = e !== "none" ? e : "block";
}
function Bi(n) {
  return Dt(n, "display") === "none";
}
function Mr(n, t) {
  const e = n && (n.matches || n.webkitMatchesSelector || n.msMatchesSelector);
  return !!e && !!t && e.call(n, t);
}
function Vn(n) {
  return et(n) ? (t, e) => Mr(e, n) : ce(n) ? n : bs(n) ? (t, e) => n.is(e) : n ? (t, e) => e === n : () => !1;
}
S.filter = function(n) {
  const t = Vn(n);
  return d(Ks.call(this, (e, s) => t.call(e, s, e)));
};
function Qt(n, t) {
  return t ? n.filter(t) : n;
}
S.detach = function(n) {
  return Qt(this, n).each((t, e) => {
    e.parentNode && e.parentNode.removeChild(e);
  }), this;
};
const Va = /^\s*<(\w+)[^>]*>/, Ua = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, Vi = {
  "*": kr,
  tr: $a,
  td: Hi,
  th: Hi,
  thead: hs,
  tbody: hs,
  tfoot: hs
};
function Ar(n) {
  if (!et(n))
    return [];
  if (Ua.test(n))
    return [le(RegExp.$1)];
  const t = Va.test(n) && RegExp.$1, e = Vi[t] || Vi["*"];
  return e.innerHTML = n, d(e.childNodes).detach().get();
}
d.parseHTML = Ar;
S.has = function(n) {
  const t = et(n) ? (e, s) => Gs(n, s).length : (e, s) => s.contains(n);
  return this.filter(t);
};
S.not = function(n) {
  const t = Vn(n);
  return this.filter((e, s) => (!et(n) || Y(s)) && !t.call(s, e, s));
};
function Ft(n, t, e, s) {
  const i = [], r = ce(t), o = s && Vn(s);
  for (let a = 0, l = n.length; a < l; a++)
    if (r) {
      const c = t(n[a]);
      c.length && Aa.apply(i, c);
    } else {
      let c = n[a][t];
      for (; c != null && !(s && o(-1, c)); )
        i.push(c), c = e ? c[t] : null;
    }
  return i;
}
function Ir(n) {
  return n.multiple && n.options ? Ft(Ks.call(n.options, (t) => t.selected && !t.disabled && !t.parentNode.disabled), "value") : n.value || "";
}
function Ka(n) {
  return arguments.length ? this.each((t, e) => {
    const s = e.multiple && e.options;
    if (s || Wr.test(e.type)) {
      const i = Hn(n) ? Nr.call(n, String) : Oe(n) ? [] : [String(n)];
      s ? Z(e.options, (r, o) => {
        o.selected = i.indexOf(o.value) >= 0;
      }, !0) : e.checked = i.indexOf(e.value) >= 0;
    } else
      e.value = ft(n) || Oe(n) ? "" : n;
  }) : this[0] && Ir(this[0]);
}
S.val = Ka;
S.is = function(n) {
  const t = Vn(n);
  return qs.call(this, (e, s) => t.call(e, s, e));
};
d.guid = 1;
function Nt(n) {
  return n.length > 1 ? Ks.call(n, (t, e, s) => Tr.call(s, t) === e) : n;
}
d.unique = Nt;
S.add = function(n, t) {
  return d(Nt(this.get().concat(d(n, t).get())));
};
S.children = function(n) {
  return Qt(d(Nt(Ft(this, (t) => t.children))), n);
};
S.parent = function(n) {
  return Qt(d(Nt(Ft(this, "parentNode"))), n);
};
S.index = function(n) {
  const t = n ? d(n)[0] : this[0], e = n ? this : d(t).parent().children();
  return Tr.call(e, t);
};
S.closest = function(n) {
  const t = this.filter(n);
  if (t.length)
    return t;
  const e = this.parent();
  return e.length ? e.closest(n) : t;
};
S.siblings = function(n) {
  return Qt(d(Nt(Ft(this, (t) => d(t).parent().children().not(t)))), n);
};
S.find = function(n) {
  return d(Nt(Ft(this, (t) => Gs(n, t))));
};
const qa = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g, Ga = /^$|^module$|\/(java|ecma)script/i, Ya = ["type", "src", "nonce", "noModule"];
function Ja(n, t) {
  const e = d(n);
  e.filter("script").add(e.find("script")).each((s, i) => {
    if (Ga.test(i.type) && Sr.contains(i)) {
      const r = le("script");
      r.text = i.textContent.replace(qa, ""), Z(Ya, (o, a) => {
        i[a] && (r[a] = i[a]);
      }), t.head.insertBefore(r, null), t.head.removeChild(r);
    }
  });
}
function Za(n, t, e, s, i) {
  s ? n.insertBefore(t, e ? n.firstChild : null) : n.nodeName === "HTML" ? n.parentNode.replaceChild(t, n) : n.parentNode.insertBefore(t, e ? n : n.nextSibling), i && Ja(t, n.ownerDocument);
}
function te(n, t, e, s, i, r, o, a) {
  return Z(n, (l, c) => {
    Z(d(c), (u, h) => {
      Z(d(t), (m, f) => {
        const _ = e ? h : f, g = e ? f : h, y = e ? u : m;
        Za(_, y ? g.cloneNode(!0) : g, s, i, !y);
      }, a);
    }, o);
  }, r), t;
}
S.after = function() {
  return te(arguments, this, !1, !1, !1, !0, !0);
};
S.append = function() {
  return te(arguments, this, !1, !1, !0);
};
function Xa(n) {
  if (!arguments.length)
    return this[0] && this[0].innerHTML;
  if (ft(n))
    return this;
  const t = /<script[\s>]/.test(n);
  return this.each((e, s) => {
    Y(s) && (t ? d(s).empty().append(n) : s.innerHTML = n);
  });
}
S.html = Xa;
S.appendTo = function(n) {
  return te(arguments, this, !0, !1, !0);
};
S.wrapInner = function(n) {
  return this.each((t, e) => {
    const s = d(e), i = s.contents();
    i.length ? i.wrapAll(n) : s.append(n);
  });
};
S.before = function() {
  return te(arguments, this, !1, !0);
};
S.wrapAll = function(n) {
  let t = d(n), e = t[0];
  for (; e.children.length; )
    e = e.firstElementChild;
  return this.first().before(t), this.appendTo(e);
};
S.wrap = function(n) {
  return this.each((t, e) => {
    const s = d(n)[0];
    d(e).wrapAll(t ? s.cloneNode(!0) : s);
  });
};
S.insertAfter = function(n) {
  return te(arguments, this, !0, !1, !1, !1, !1, !0);
};
S.insertBefore = function(n) {
  return te(arguments, this, !0, !0);
};
S.prepend = function() {
  return te(arguments, this, !1, !0, !0, !0, !0);
};
S.prependTo = function(n) {
  return te(arguments, this, !0, !0, !0, !1, !1, !0);
};
S.contents = function() {
  return d(Nt(Ft(this, (n) => n.tagName === "IFRAME" ? [n.contentDocument] : n.tagName === "TEMPLATE" ? n.content.childNodes : n.childNodes)));
};
S.next = function(n, t, e) {
  return Qt(d(Nt(Ft(this, "nextElementSibling", t, e))), n);
};
S.nextAll = function(n) {
  return this.next(n, !0);
};
S.nextUntil = function(n, t) {
  return this.next(t, !0, n);
};
S.parents = function(n, t) {
  return Qt(d(Nt(Ft(this, "parentElement", !0, t))), n);
};
S.parentsUntil = function(n, t) {
  return this.parents(t, n);
};
S.prev = function(n, t, e) {
  return Qt(d(Nt(Ft(this, "previousElementSibling", t, e))), n);
};
S.prevAll = function(n) {
  return this.prev(n, !0);
};
S.prevUntil = function(n, t) {
  return this.prev(t, !0, n);
};
S.map = function(n) {
  return d(Ma.apply([], Nr.call(this, (t, e) => n.call(t, e, t))));
};
S.clone = function() {
  return this.map((n, t) => t.cloneNode(!0));
};
S.offsetParent = function() {
  return this.map((n, t) => {
    let e = t.offsetParent;
    for (; e && Dt(e, "position") === "static"; )
      e = e.offsetParent;
    return e || Sr;
  });
};
S.slice = function(n, t) {
  return d(Er.call(this, n, t));
};
const Qa = /-([a-z])/g;
function Js(n) {
  return n.replace(Qa, (t, e) => e.toUpperCase());
}
S.ready = function(n) {
  const t = () => setTimeout(n, 0, d);
  return Rt.readyState !== "loading" ? t() : Rt.addEventListener("DOMContentLoaded", t), this;
};
S.unwrap = function() {
  return this.parent().each((n, t) => {
    if (t.tagName === "BODY")
      return;
    const e = d(t);
    e.replaceWith(e.children());
  }), this;
};
S.offset = function() {
  const n = this[0];
  if (!n)
    return;
  const t = n.getBoundingClientRect();
  return {
    top: t.top + vn.pageYOffset,
    left: t.left + vn.pageXOffset
  };
};
S.position = function() {
  const n = this[0];
  if (!n)
    return;
  const t = Dt(n, "position") === "fixed", e = t ? n.getBoundingClientRect() : this.offset();
  if (!t) {
    const s = n.ownerDocument;
    let i = n.offsetParent || s.documentElement;
    for (; (i === s.body || i === s.documentElement) && Dt(i, "position") === "static"; )
      i = i.parentNode;
    if (i !== n && Y(i)) {
      const r = d(i).offset();
      e.top -= r.top + kt(i, "borderTopWidth"), e.left -= r.left + kt(i, "borderLeftWidth");
    }
  }
  return {
    top: e.top - kt(n, "marginTop"),
    left: e.left - kt(n, "marginLeft")
  };
};
const Pr = {
  /* GENERAL */
  class: "className",
  contenteditable: "contentEditable",
  /* LABEL */
  for: "htmlFor",
  /* INPUT */
  readonly: "readOnly",
  maxlength: "maxLength",
  tabindex: "tabIndex",
  /* TABLE */
  colspan: "colSpan",
  rowspan: "rowSpan",
  /* IMAGE */
  usemap: "useMap"
};
S.prop = function(n, t) {
  if (n) {
    if (et(n))
      return n = Pr[n] || n, arguments.length < 2 ? this[0] && this[0][n] : this.each((e, s) => {
        s[n] = t;
      });
    for (const e in n)
      this.prop(e, n[e]);
    return this;
  }
};
S.removeProp = function(n) {
  return this.each((t, e) => {
    delete e[Pr[n] || n];
  });
};
const tl = /^--/;
function Zs(n) {
  return tl.test(n);
}
const ds = {}, { style: el } = kr, nl = ["webkit", "moz", "ms"];
function sl(n, t = Zs(n)) {
  if (t)
    return n;
  if (!ds[n]) {
    const e = Js(n), s = `${e[0].toUpperCase()}${e.slice(1)}`, i = `${e} ${nl.join(`${s} `)}${s}`.split(" ");
    Z(i, (r, o) => {
      if (o in el)
        return ds[n] = o, !1;
    });
  }
  return ds[n];
}
const il = {
  animationIterationCount: !0,
  columnCount: !0,
  flexGrow: !0,
  flexShrink: !0,
  fontWeight: !0,
  gridArea: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnStart: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowStart: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  widows: !0,
  zIndex: !0
};
function Rr(n, t, e = Zs(n)) {
  return !e && !il[n] && $r(t) ? `${t}px` : t;
}
function rl(n, t) {
  if (et(n)) {
    const e = Zs(n);
    return n = sl(n, e), arguments.length < 2 ? this[0] && Dt(this[0], n, e) : n ? (t = Rr(n, t, e), this.each((s, i) => {
      Y(i) && (e ? i.style.setProperty(n, t) : i.style[n] = t);
    })) : this;
  }
  for (const e in n)
    this.css(e, n[e]);
  return this;
}
S.css = rl;
function Dr(n, t) {
  try {
    return n(t);
  } catch {
    return t;
  }
}
const ol = /^\s+|\s+$/;
function Ui(n, t) {
  const e = n.dataset[t] || n.dataset[Js(t)];
  return ol.test(e) ? e : Dr(JSON.parse, e);
}
function al(n, t, e) {
  e = Dr(JSON.stringify, e), n.dataset[Js(t)] = e;
}
function ll(n, t) {
  if (!n) {
    if (!this[0])
      return;
    const e = {};
    for (const s in this[0].dataset)
      e[s] = Ui(this[0], s);
    return e;
  }
  if (et(n))
    return arguments.length < 2 ? this[0] && Ui(this[0], n) : ft(t) ? this : this.each((e, s) => {
      al(s, n, t);
    });
  for (const e in n)
    this.data(e, n[e]);
  return this;
}
S.data = ll;
function Lr(n, t) {
  const e = n.documentElement;
  return Math.max(n.body[`scroll${t}`], e[`scroll${t}`], n.body[`offset${t}`], e[`offset${t}`], e[`client${t}`]);
}
Z([!0, !1], (n, t) => {
  Z(["Width", "Height"], (e, s) => {
    const i = `${t ? "outer" : "inner"}${s}`;
    S[i] = function(r) {
      if (this[0])
        return _e(this[0]) ? t ? this[0][`inner${s}`] : this[0].document.documentElement[`client${s}`] : oe(this[0]) ? Lr(this[0], s) : this[0][`${t ? "offset" : "client"}${s}`] + (r && t ? kt(this[0], `margin${e ? "Top" : "Left"}`) + kt(this[0], `margin${e ? "Bottom" : "Right"}`) : 0);
    };
  });
});
Z(["Width", "Height"], (n, t) => {
  const e = t.toLowerCase();
  S[e] = function(s) {
    if (!this[0])
      return ft(s) ? void 0 : this;
    if (!arguments.length)
      return _e(this[0]) ? this[0].document.documentElement[`client${t}`] : oe(this[0]) ? Lr(this[0], t) : this[0].getBoundingClientRect()[e] - ji(this[0], !n);
    const i = parseInt(s, 10);
    return this.each((r, o) => {
      if (!Y(o))
        return;
      const a = Dt(o, "boxSizing");
      o.style[e] = Rr(e, i + (a === "border-box" ? ji(o, !n) : 0));
    });
  };
});
const Ki = "___cd";
S.toggle = function(n) {
  return this.each((t, e) => {
    if (!Y(e))
      return;
    const s = Bi(e);
    (ft(n) ? s : n) ? (e.style.display = e[Ki] || "", Bi(e) && (e.style.display = Ba(e.tagName))) : s || (e[Ki] = Dt(e, "display"), e.style.display = "none");
  });
};
S.hide = function() {
  return this.toggle(!1);
};
S.show = function() {
  return this.toggle(!0);
};
const qi = "___ce", Xs = ".", Qs = { focus: "focusin", blur: "focusout" }, zr = { mouseenter: "mouseover", mouseleave: "mouseout" }, cl = /^(mouse|pointer|contextmenu|drag|drop|click|dblclick)/i;
function ti(n) {
  return zr[n] || Qs[n] || n;
}
function ei(n) {
  const t = n.split(Xs);
  return [t[0], t.slice(1).sort()];
}
S.trigger = function(n, t) {
  if (et(n)) {
    const [s, i] = ei(n), r = ti(s);
    if (!r)
      return this;
    const o = cl.test(r) ? "MouseEvents" : "HTMLEvents";
    n = Rt.createEvent(o), n.initEvent(r, !0, !0), n.namespace = i.join(Xs), n.___ot = s;
  }
  n.___td = t;
  const e = n.___ot in Qs;
  return this.each((s, i) => {
    e && ce(i[n.___ot]) && (i[`___i${n.type}`] = !0, i[n.___ot](), i[`___i${n.type}`] = !1), i.dispatchEvent(n);
  });
};
function Fr(n) {
  return n[qi] = n[qi] || {};
}
function hl(n, t, e, s, i) {
  const r = Fr(n);
  r[t] = r[t] || [], r[t].push([e, s, i]), n.addEventListener(t, i);
}
function Or(n, t) {
  return !t || !qs.call(t, (e) => n.indexOf(e) < 0);
}
function bn(n, t, e, s, i) {
  const r = Fr(n);
  if (t)
    r[t] && (r[t] = r[t].filter(([o, a, l]) => {
      if (i && l.guid !== i.guid || !Or(o, e) || s && s !== a)
        return !0;
      n.removeEventListener(t, l);
    }));
  else
    for (t in r)
      bn(n, t, e, s, i);
}
S.off = function(n, t, e) {
  if (ft(n))
    this.each((s, i) => {
      !Y(i) && !oe(i) && !_e(i) || bn(i);
    });
  else if (et(n))
    ce(t) && (e = t, t = ""), Z(Bn(n), (s, i) => {
      const [r, o] = ei(i), a = ti(r);
      this.each((l, c) => {
        !Y(c) && !oe(c) && !_e(c) || bn(c, a, o, t, e);
      });
    });
  else
    for (const s in n)
      this.off(s, n[s]);
  return this;
};
S.remove = function(n) {
  return Qt(this, n).detach().off(), this;
};
S.replaceWith = function(n) {
  return this.before(n).remove();
};
S.replaceAll = function(n) {
  return d(n).replaceWith(this), this;
};
function ul(n, t, e, s, i) {
  if (!et(n)) {
    for (const r in n)
      this.on(r, t, e, n[r], i);
    return this;
  }
  return et(t) || (ft(t) || Oe(t) ? t = "" : ft(e) ? (e = t, t = "") : (s = e, e = t, t = "")), ce(s) || (s = e, e = void 0), s ? (Z(Bn(n), (r, o) => {
    const [a, l] = ei(o), c = ti(a), u = a in zr, h = a in Qs;
    c && this.each((m, f) => {
      if (!Y(f) && !oe(f) && !_e(f))
        return;
      const _ = function(g) {
        if (g.target[`___i${g.type}`])
          return g.stopImmediatePropagation();
        if (g.namespace && !Or(l, g.namespace.split(Xs)) || !t && (h && (g.target !== f || g.___ot === c) || u && g.relatedTarget && f.contains(g.relatedTarget)))
          return;
        let y = f;
        if (t) {
          let w = g.target;
          for (; !Mr(w, t); )
            if (w === f || (w = w.parentNode, !w))
              return;
          y = w;
        }
        Object.defineProperty(g, "currentTarget", {
          configurable: !0,
          get() {
            return y;
          }
        }), Object.defineProperty(g, "delegateTarget", {
          configurable: !0,
          get() {
            return f;
          }
        }), Object.defineProperty(g, "data", {
          configurable: !0,
          get() {
            return e;
          }
        });
        const v = s.call(y, g, g.___td);
        i && bn(f, c, l, t, _), v === !1 && (g.preventDefault(), g.stopPropagation());
      };
      _.guid = s.guid = s.guid || d.guid++, hl(f, c, l, t, _);
    });
  }), this) : this;
}
S.on = ul;
function dl(n, t, e, s) {
  return this.on(n, t, e, s, !0);
}
S.one = dl;
const fl = /\r?\n/g;
function pl(n, t) {
  return `&${encodeURIComponent(n)}=${encodeURIComponent(t.replace(fl, `\r
`))}`;
}
const ml = /file|reset|submit|button|image/i, Wr = /radio|checkbox/i;
S.serialize = function() {
  let n = "";
  return this.each((t, e) => {
    Z(e.elements || [e], (s, i) => {
      if (i.disabled || !i.name || i.tagName === "FIELDSET" || ml.test(i.type) || Wr.test(i.type) && !i.checked)
        return;
      const r = Ir(i);
      if (!ft(r)) {
        const o = Hn(r) ? r : [r];
        Z(o, (a, l) => {
          n += pl(i.name, l);
        });
      }
    });
  }), n.slice(1);
};
window.$ = d;
function gl(n, t) {
  if (n == null)
    return [n, void 0];
  typeof t == "string" && (t = t.split("."));
  const e = t.join(".");
  let s = n;
  const i = [s];
  for (; typeof s == "object" && s !== null && t.length; ) {
    let r = t.shift(), o;
    const a = r.indexOf("[");
    if (a > 0 && a < r.length - 1 && r.endsWith("]") && (o = r.substring(a + 1, r.length - 1), r = r.substring(0, a)), s = s[r], i.push(s), o !== void 0)
      if (typeof s == "object" && s !== null)
        s instanceof Map ? s = s.get(o) : s = s[o], i.push(s);
      else
        throw new Error(`Cannot access property "${r}[${o}]", the full path is "${e}".`);
  }
  if (t.length)
    throw new Error(`Cannot access property with rest path "${t.join(".")}", the full path is "${e}".`);
  return i;
}
function _l(n, t, e) {
  try {
    const s = gl(n, t), i = s[s.length - 1];
    return i === void 0 ? e : i;
  } catch {
    return e;
  }
}
function G(n, ...t) {
  if (t.length === 0)
    return n;
  if (t.length === 1 && typeof t[0] == "object" && t[0]) {
    const e = t[0];
    return Object.keys(e).forEach((s) => {
      const i = e[s] ?? "";
      n = n.replace(new RegExp(`\\{${s}\\}`, "g"), `${i}`);
    }), n;
  }
  for (let e = 0; e < t.length; e++) {
    const s = t[e] ?? "";
    n = n.replace(new RegExp(`\\{${e}\\}`, "g"), `${s}`);
  }
  return n;
}
var ni = /* @__PURE__ */ ((n) => (n[n.B = 1] = "B", n[n.KB = 1024] = "KB", n[n.MB = 1048576] = "MB", n[n.GB = 1073741824] = "GB", n[n.TB = 1099511627776] = "TB", n))(ni || {});
function Et(n, t = 2, e) {
  return Number.isNaN(n) ? "?KB" : (e || (n < 1024 ? e = "B" : n < 1048576 ? e = "KB" : n < 1073741824 ? e = "MB" : n < 1099511627776 ? e = "GB" : e = "TB"), (n / ni[e]).toFixed(t) + e);
}
const an = (n) => {
  const t = /^[0-9]*(B|KB|MB|GB|TB)$/;
  n = n.toUpperCase();
  const e = n.match(t);
  if (!e)
    return 0;
  const s = e[1];
  return n = n.replace(s, ""), Number.parseInt(n, 10) * ni[s];
};
let si = (document.documentElement.getAttribute("lang") || "zh_cn").toLowerCase().replace("-", "_"), jt;
function yl() {
  return si;
}
function vl(n) {
  si = n.toLowerCase();
}
function Hr(n, t) {
  jt || (jt = {}), typeof n == "string" && (n = { [n]: t ?? {} }), d.extend(!0, jt, n);
}
function j(n, t, e, s, i, r) {
  Array.isArray(n) ? jt && n.unshift(jt) : n = jt ? [jt, n] : [n], typeof e == "string" && (r = i, i = s, s = e, e = void 0);
  const o = i || si;
  let a;
  for (const l of n) {
    if (!l)
      continue;
    const c = l[o] || l.default;
    if (!c)
      continue;
    const u = r && l === jt ? `${r}.${t}` : t;
    if (a = _l(c, u), a !== void 0)
      break;
  }
  return a === void 0 ? s : e ? G(a, ...Array.isArray(e) ? e : [e]) : a;
}
function wl(n, t, e, s) {
  return j(void 0, n, t, e, s);
}
j.addLang = Hr;
j.getLang = wl;
j.getCode = yl;
j.setCode = vl;
Hr({
  zh_cn: {
    confirm: "确定",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    reset: "重置",
    add: "添加"
  },
  zh_tw: {
    confirm: "確定",
    save: "儲存",
    cancel: "取消",
    delete: "刪除",
    reset: "重置",
    add: "添加"
  },
  en: {
    confirm: "Confirm",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    reset: "Reset",
    add: "Add"
  }
});
function Gi(n, t, e) {
  n instanceof Headers ? n.set(t, e) : Array.isArray(n) ? n.push([t, e]) : n[t] = e;
}
function Me(n, t, e) {
  e != null && (Array.isArray(e) ? e.forEach((s) => Me(n, t, s)) : n.append(t, e instanceof Blob ? e : String(e)));
}
function bl(n, t) {
  if (n) {
    const e = {
      text: "text/plain",
      html: "text/html",
      json: "application/json",
      ...t
    };
    for (const [s, i] of Object.entries(e))
      if (i.split(",").map((r) => r.trim()).includes(n))
        return s;
  }
  return "text";
}
function Cl(n, t) {
  const e = t || new FormData();
  return n && (typeof n == "string" && (n = new URLSearchParams(n)), n instanceof URLSearchParams ? n.forEach((s, i) => {
    Me(e, i, s);
  }) : Array.isArray(n) ? n.forEach(([s, i]) => {
    Me(e, s, i);
  }) : n instanceof FormData ? n.forEach((s, i) => {
    Me(e, i, s);
  }) : d.isPlainObject(n) && Object.entries(n).forEach(([s, i]) => {
    Me(e, s, i);
  })), e;
}
class jr {
  get completed() {
    return this.data !== void 0 || this.error !== void 0;
  }
  get [Symbol.toStringTag]() {
    return "Ajax";
  }
  constructor(t) {
    this.setting = t, this._controller = new AbortController(), this._callbacks = { success: [], error: [], complete: [] };
  }
  on(t, e) {
    return this._callbacks[t].push(e), this;
  }
  success(t) {
    return this.on("success", t);
  }
  done(t) {
    return this.success(t);
  }
  fail(t) {
    return this.on("error", t);
  }
  complete(t) {
    return this.on("complete", t);
  }
  always(t) {
    return this.complete(t);
  }
  then(t, e) {
    return this.completed ? e && this.error ? e(this.error) : t(this.data) : (this.success((s) => t(s)), e && this.fail(e)), this;
  }
  catch(t) {
    return this.error ? (t(this.error), this) : this.on("error", (e) => t(e));
  }
  finally(t) {
    return this.completed ? (t(), this) : this.complete(() => t());
  }
  abort(t) {
    return this.completed ? !1 : (this._abortError = t, this._controller.abort(), !0);
  }
  getResponseHeader(t) {
    var e;
    return (e = this.response) == null ? void 0 : e.headers.get(t);
  }
  _init() {
    if (this.completed)
      return;
    const {
      url: t,
      type: e,
      data: s,
      processData: i = !0,
      contentType: r,
      crossDomain: o,
      accepts: a,
      dataType: l,
      timeout: c,
      dataFilter: u,
      beforeSend: h,
      success: m,
      error: f,
      complete: _,
      ...g
    } = this.setting;
    if ((h == null ? void 0 : h(g)) === !1)
      return;
    e && (g.method = e);
    let y = s;
    y && (i && (y = Cl(y)), g.body = y), o && (g.mode = "cors");
    const v = g.headers || {};
    Gi(v, "X-Requested-With", "XMLHttpRequest"), r && Gi(v, "Content-Type", r), g.headers = v, g.signal && g.signal.addEventListener("abort", () => {
      this.abort();
    }), m && this.success(m), f && this.fail(f), _ && this.complete(_), g.signal = this._controller.signal, this.url = t, this.request = g;
  }
  _emit(t, ...e) {
    this._callbacks[t].forEach((s) => {
      s.call(this, ...e);
    });
  }
  async send() {
    var c;
    if (this.completed)
      return [];
    this._init();
    const { timeout: t, dataType: e, accepts: s, dataFilter: i, throws: r } = this.setting;
    t && (this._timeoutID = window.setTimeout(() => {
      this.abort(new Error("timeout"));
    }, t));
    let o, a, l;
    try {
      o = await fetch(this.url, this.request), this.response = o;
      const { statusText: u } = o;
      if (o.ok) {
        const h = (c = o.headers.get("Content-Disposition")) == null ? void 0 : c.startsWith("attachment"), m = h ? "blob" : e || bl(o.headers.get("Content-Type"), s);
        h || m === "blob" || m === "file" ? l = await o.blob() : m === "json" ? l = await o.json() : l = await o.text(), this.data = l;
        const f = (i == null ? void 0 : i(l, m)) ?? l;
        this._emit("success", f, u, o);
      } else
        throw new Error(u);
    } catch (u) {
      a = u;
      let h = !1;
      a.name === "AbortError" && (this._abortError ? a = this._abortError : h = !0), this.error = a, h || this._emit("error", a, o == null ? void 0 : o.statusText, a.message);
    }
    if (this._timeoutID && clearTimeout(this._timeoutID), this._emit("complete", o, o == null ? void 0 : o.statusText), a && r)
      throw a;
    return [l, a, o];
  }
}
d.ajax = (n, t) => {
  t = t || {}, typeof n == "string" ? t.url = n : d.extend(t, n);
  const e = new jr(t);
  return e.send(), e;
};
d.getJSON = (n, t, e) => (typeof t == "function" && (e = t, t = void 0), d.ajax({
  url: n,
  data: t,
  success: e,
  dataType: "json"
}));
d.get = (n, t, e, s, i = "GET") => {
  let r, o;
  return typeof t == "function" ? (r = t, o = void 0) : o = t, typeof e == "function" ? (r = e, s = void 0) : s = e, d.ajax({
    method: i,
    url: n,
    data: o,
    success: r,
    dataType: s
  });
};
d.post = (n, t, e, s) => d.get(n, t, e, s, "POST");
d.fn.load = function(n, t, e) {
  typeof t == "function" && (e = t, t = void 0);
  const [s, i] = n.split(" ");
  return d.get(s, t, (r, o, a) => {
    i && (r = d(r).find(i).html()), d(this).html(r), e == null || e.call(this, r, o, a);
  }, "html"), this;
};
async function ii(n, t = [], e) {
  const s = { throws: !0, dataType: "json" };
  if (typeof n == "string")
    s.url = n;
  else if (typeof n == "object")
    d.extend(s, n);
  else if (typeof n == "function") {
    const o = n(...t);
    return o instanceof Promise ? await o : o;
  }
  e && d.extend(s, typeof e == "function" ? e(s) : e);
  const i = new jr(s), [r] = await i.send();
  return r;
}
function ou(n) {
  return !!(n && (typeof n == "string" || typeof n == "object" && n.url || typeof n == "function"));
}
d.fetch = ii;
function ut() {
  return d.guid++;
}
function Cs(n, t) {
  if (n === t)
    return !1;
  if (n && t && typeof n == "object" && typeof t == "object") {
    const e = Array.isArray(n), s = Array.isArray(t);
    if (e !== s)
      return !0;
    if (e && s) {
      if (n.length !== t.length)
        return !0;
      for (let o = 0; o < n.length; o++)
        if (Cs(n[o], t[o]))
          return !0;
      return !0;
    }
    const i = Object.keys(n), r = Object.keys(t);
    if (i.length !== r.length)
      return !0;
    for (const o of i)
      if (Cs(n[o], t[o]))
        return !0;
    return !0;
  }
  return !0;
}
class Cn {
  /**
   * Creates a new Computed instance.
   * @param compute      The function that computes the value.
   * @param dependencies The dependencies of the computed value.
   */
  constructor(t, e) {
    this._compute = t, this._dependencies = e;
  }
  /**
   * Gets the computed value.
   */
  get value() {
    return this.compute();
  }
  /**
   * Gets the cached value of the computed value.
   */
  get cache() {
    return this._lastDependencies ? this._value : this.compute();
  }
  /**
   * Forces the computed value to be recomputed.
   * @param dependencies The new dependencies to use for recomputing the value.
   * @returns The recomputed value.
   */
  forceCompute(t) {
    return this._lastDependencies = void 0, this.compute(t);
  }
  /**
   * Computes the value of the computed value.
   * @param dependencies The dependencies to use for computing the value.
   * @returns The computed value.
   */
  compute(t) {
    t !== void 0 && (this._dependencies = t), t = this._dependencies, typeof t == "function" && (t = t());
    const e = this._lastDependencies;
    return (!e || t.some((s, i) => Cs(s instanceof Cn ? s.value : s, e[i]))) && (this._value = this._compute(), this._lastDependencies = t.map((s) => s instanceof Cn ? s.cache : s)), this._value;
  }
}
function Br(...n) {
  const t = [], e = /* @__PURE__ */ new Map(), s = (i, r) => {
    if (Array.isArray(i) && (r = i[1], i = i[0]), !i.length)
      return;
    const o = e.get(i);
    typeof o == "number" ? t[o][1] = !!r : (e.set(i, t.length), t.push([i, !!r]));
  };
  return n.forEach((i) => {
    typeof i == "function" && (i = i()), Array.isArray(i) ? Br(...i).forEach(s) : i && typeof i == "object" ? Object.entries(i).forEach(s) : typeof i == "string" && i.split(" ").forEach((r) => s(r, !0));
  }), t.sort((i, r) => (e.get(i[0]) || 0) - (e.get(r[0]) || 0));
}
const T = (...n) => Br(...n).reduce((t, [e, s]) => (s && t.push(e), t), []).join(" ");
d.classes = T;
d.fn.setClass = function(n, ...t) {
  return this.each((e, s) => {
    const i = d(s);
    n === !0 ? i.attr("class", T(i.attr("class"), ...t)) : i.addClass(T(n, ...t));
  });
};
const Ae = /* @__PURE__ */ new WeakMap();
function Vr(n, t, e) {
  const s = Ae.has(n), i = s ? Ae.get(n) : {};
  typeof t == "string" ? i[t] = e : t === null ? Object.keys(i).forEach((r) => {
    delete i[r];
  }) : Object.assign(i, t), Object.keys(i).forEach((r) => {
    i[r] === void 0 && delete i[r];
  }), Object.keys(i).length ? (!s && n instanceof Element && Object.assign(i, d(n).dataset(), i), Ae.set(n, i)) : Ae.delete(n);
}
function Ur(n, t, e) {
  let s = Ae.get(n) || {};
  return !e && n instanceof Element && (s = Object.assign({}, d(n).dataset(), s)), t === void 0 ? s : s[t];
}
d.fn.dataset = d.fn.data;
d.fn.data = function(...n) {
  const [t, e] = n;
  return !n.length || n.length === 1 && typeof t == "string" ? this.length ? Ur(this[0], t) : void 0 : this.each((s, i) => Vr(i, t, e));
};
d.fn.removeData = function(n = null) {
  return this.each((t, e) => Vr(e, n));
};
function Ss(n, t = "z-") {
  const e = d(n)[0];
  if (e)
    return Array.from(e.attributes).reduce((s, i) => {
      let { name: r, value: o } = i;
      if (r.startsWith(t)) {
        r = r.slice(t.length).replace(/-([a-z])/g, (a) => a[1].toUpperCase());
        try {
          o.startsWith("RAWJS<") && o.endsWith(">RAWJS") ? o = new Function(`return ${o.substring(6, o.length - 6)}`)() : o = JSON.parse(o);
        } catch {
        }
        s[r] = o;
      }
      return s;
    }, {});
}
function Yi(n, t, e = "z-") {
  const s = d(n);
  Object.keys(t).forEach((i) => {
    let r = t[i];
    typeof r == "function" && (r = `RAWJS<${r}>RAWJS`), typeof r != "string" && (r = JSON.stringify(r)), i = i.replace(/[A-Z]/g, (o) => `-${o.toLowerCase()}`), s.attr(`${e}${i}`, r);
  });
}
function Sl(...n) {
  var e;
  const t = n.length;
  if (!t)
    return Ss(this);
  if (t === 1) {
    const [s] = n;
    return typeof s == "string" ? (e = Ss(this)) == null ? void 0 : e[s] : (d.isPlainObject(s) && Yi(this, s), this);
  }
  return Yi(this, { [n[0]]: n[1] }), this;
}
d.fn.z = Sl;
d.fn._attr = d.fn.attr;
d.fn.extend({
  attr(...n) {
    const [t, e] = n;
    return !n.length || n.length === 1 && typeof t == "string" ? this._attr.apply(this, n) : typeof t == "object" ? (t && Object.keys(t).forEach((s) => {
      const i = t[s];
      i === null ? this.removeAttr(s) : this._attr(s, i);
    }), this) : e === null ? this.removeAttr(t) : this._attr(t, e);
  }
});
d.Event = (n, t) => {
  const [e, ...s] = n.split("."), i = new Event(e, {
    bubbles: !0,
    cancelable: !0
  });
  return i.namespace = s.join("."), i.___ot = e, i.___td = t, i;
};
const Sn = (n, t) => new Promise((e) => {
  const s = window.setTimeout(e, n);
  t && t(s);
}), kl = {};
d.share = kl;
var Un, z, Kr, bt, se, Ji, qr, ks, We = {}, Gr = [], xl = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, Kn = Array.isArray;
function Kt(n, t) {
  for (var e in t)
    n[e] = t[e];
  return n;
}
function Yr(n) {
  var t = n.parentNode;
  t && t.removeChild(n);
}
function xt(n, t, e) {
  var s, i, r, o = {};
  for (r in t)
    r == "key" ? s = t[r] : r == "ref" ? i = t[r] : o[r] = t[r];
  if (arguments.length > 2 && (o.children = arguments.length > 3 ? Un.call(arguments, 2) : e), typeof n == "function" && n.defaultProps != null)
    for (r in n.defaultProps)
      o[r] === void 0 && (o[r] = n.defaultProps[r]);
  return un(n, o, s, i, null);
}
function un(n, t, e, s, i) {
  var r = { type: n, props: t, key: e, ref: s, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: i ?? ++Kr, __i: -1, __u: 0 };
  return i == null && z.vnode != null && z.vnode(r), r;
}
function K() {
  return { current: null };
}
function Ce(n) {
  return n.children;
}
function H(n, t) {
  this.props = n, this.context = t;
}
function ye(n, t) {
  if (t == null)
    return n.__ ? ye(n.__, n.__i + 1) : null;
  for (var e; t < n.__k.length; t++)
    if ((e = n.__k[t]) != null && e.__e != null)
      return e.__e;
  return typeof n.type == "function" ? ye(n) : null;
}
function Jr(n) {
  var t, e;
  if ((n = n.__) != null && n.__c != null) {
    for (n.__e = n.__c.base = null, t = 0; t < n.__k.length; t++)
      if ((e = n.__k[t]) != null && e.__e != null) {
        n.__e = n.__c.base = e.__e;
        break;
      }
    return Jr(n);
  }
}
function Zi(n) {
  (!n.__d && (n.__d = !0) && se.push(n) && !kn.__r++ || Ji !== z.debounceRendering) && ((Ji = z.debounceRendering) || qr)(kn);
}
function kn() {
  var n, t, e, s, i, r, o, a, l;
  for (se.sort(ks); n = se.shift(); )
    n.__d && (t = se.length, s = void 0, r = (i = (e = n).__v).__e, a = [], l = [], (o = e.__P) && ((s = Kt({}, i)).__v = i.__v + 1, z.vnode && z.vnode(s), ri(o, s, i, e.__n, o.ownerSVGElement !== void 0, 32 & i.__u ? [r] : null, a, r ?? ye(i), !!(32 & i.__u), l), s.__.__k[s.__i] = s, Qr(a, s, l), s.__e != r && Jr(s)), se.length > t && se.sort(ks));
  kn.__r = 0;
}
function Zr(n, t, e, s, i, r, o, a, l, c, u) {
  var h, m, f, _, g, y = s && s.__k || Gr, v = t.length;
  for (e.__d = l, Tl(e, t, y), l = e.__d, h = 0; h < v; h++)
    (f = e.__k[h]) != null && typeof f != "boolean" && typeof f != "function" && (m = f.__i === -1 ? We : y[f.__i] || We, f.__i = h, ri(n, f, m, i, r, o, a, l, c, u), _ = f.__e, f.ref && m.ref != f.ref && (m.ref && oi(m.ref, null, f), u.push(f.ref, f.__c || _, f)), g == null && _ != null && (g = _), 65536 & f.__u || m.__k === f.__k ? l = Xr(f, l, n) : typeof f.type == "function" && f.__d !== void 0 ? l = f.__d : _ && (l = _.nextSibling), f.__d = void 0, f.__u &= -196609);
  e.__d = l, e.__e = g;
}
function Tl(n, t, e) {
  var s, i, r, o, a, l = t.length, c = e.length, u = c, h = 0;
  for (n.__k = [], s = 0; s < l; s++)
    (i = n.__k[s] = (i = t[s]) == null || typeof i == "boolean" || typeof i == "function" ? null : typeof i == "string" || typeof i == "number" || typeof i == "bigint" || i.constructor == String ? un(null, i, null, null, i) : Kn(i) ? un(Ce, { children: i }, null, null, null) : i.__b > 0 ? un(i.type, i.props, i.key, i.ref ? i.ref : null, i.__v) : i) != null ? (i.__ = n, i.__b = n.__b + 1, a = Nl(i, e, o = s + h, u), i.__i = a, r = null, a !== -1 && (u--, (r = e[a]) && (r.__u |= 131072)), r == null || r.__v === null ? (a == -1 && h--, typeof i.type != "function" && (i.__u |= 65536)) : a !== o && (a === o + 1 ? h++ : a > o ? u > l - o ? h += a - o : h-- : h = a < o && a == o - 1 ? a - o : 0, a !== s + h && (i.__u |= 65536))) : (r = e[s]) && r.key == null && r.__e && (r.__e == n.__d && (n.__d = ye(r)), xs(r, r, !1), e[s] = null, u--);
  if (u)
    for (s = 0; s < c; s++)
      (r = e[s]) != null && !(131072 & r.__u) && (r.__e == n.__d && (n.__d = ye(r)), xs(r, r));
}
function Xr(n, t, e) {
  var s, i;
  if (typeof n.type == "function") {
    for (s = n.__k, i = 0; s && i < s.length; i++)
      s[i] && (s[i].__ = n, t = Xr(s[i], t, e));
    return t;
  }
  return n.__e != t && (e.insertBefore(n.__e, t || null), t = n.__e), t && t.nextSibling;
}
function xn(n, t) {
  return t = t || [], n == null || typeof n == "boolean" || (Kn(n) ? n.some(function(e) {
    xn(e, t);
  }) : t.push(n)), t;
}
function Nl(n, t, e, s) {
  var i = n.key, r = n.type, o = e - 1, a = e + 1, l = t[e];
  if (l === null || l && i == l.key && r === l.type)
    return e;
  if (s > (l != null && !(131072 & l.__u) ? 1 : 0))
    for (; o >= 0 || a < t.length; ) {
      if (o >= 0) {
        if ((l = t[o]) && !(131072 & l.__u) && i == l.key && r === l.type)
          return o;
        o--;
      }
      if (a < t.length) {
        if ((l = t[a]) && !(131072 & l.__u) && i == l.key && r === l.type)
          return a;
        a++;
      }
    }
  return -1;
}
function Xi(n, t, e) {
  t[0] === "-" ? n.setProperty(t, e ?? "") : n[t] = e == null ? "" : typeof e != "number" || xl.test(t) ? e : e + "px";
}
function ln(n, t, e, s, i) {
  var r;
  t:
    if (t === "style")
      if (typeof e == "string")
        n.style.cssText = e;
      else {
        if (typeof s == "string" && (n.style.cssText = s = ""), s)
          for (t in s)
            e && t in e || Xi(n.style, t, "");
        if (e)
          for (t in e)
            s && e[t] === s[t] || Xi(n.style, t, e[t]);
      }
    else if (t[0] === "o" && t[1] === "n")
      r = t !== (t = t.replace(/(PointerCapture)$|Capture$/, "$1")), t = t.toLowerCase() in n ? t.toLowerCase().slice(2) : t.slice(2), n.l || (n.l = {}), n.l[t + r] = e, e ? s ? e.u = s.u : (e.u = Date.now(), n.addEventListener(t, r ? tr : Qi, r)) : n.removeEventListener(t, r ? tr : Qi, r);
    else {
      if (i)
        t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
      else if (t !== "width" && t !== "height" && t !== "href" && t !== "list" && t !== "form" && t !== "tabIndex" && t !== "download" && t !== "rowSpan" && t !== "colSpan" && t !== "role" && t in n)
        try {
          n[t] = e ?? "";
          break t;
        } catch {
        }
      typeof e == "function" || (e == null || e === !1 && t[4] !== "-" ? n.removeAttribute(t) : n.setAttribute(t, e));
    }
}
function Qi(n) {
  var t = this.l[n.type + !1];
  if (n.t) {
    if (n.t <= t.u)
      return;
  } else
    n.t = Date.now();
  return t(z.event ? z.event(n) : n);
}
function tr(n) {
  return this.l[n.type + !0](z.event ? z.event(n) : n);
}
function ri(n, t, e, s, i, r, o, a, l, c) {
  var u, h, m, f, _, g, y, v, w, b, C, k, x, A, I, M = t.type;
  if (t.constructor !== void 0)
    return null;
  128 & e.__u && (l = !!(32 & e.__u), r = [a = t.__e = e.__e]), (u = z.__b) && u(t);
  t:
    if (typeof M == "function")
      try {
        if (v = t.props, w = (u = M.contextType) && s[u.__c], b = u ? w ? w.props.value : u.__ : s, e.__c ? y = (h = t.__c = e.__c).__ = h.__E : ("prototype" in M && M.prototype.render ? t.__c = h = new M(v, b) : (t.__c = h = new H(v, b), h.constructor = M, h.render = $l), w && w.sub(h), h.props = v, h.state || (h.state = {}), h.context = b, h.__n = s, m = h.__d = !0, h.__h = [], h._sb = []), h.__s == null && (h.__s = h.state), M.getDerivedStateFromProps != null && (h.__s == h.state && (h.__s = Kt({}, h.__s)), Kt(h.__s, M.getDerivedStateFromProps(v, h.__s))), f = h.props, _ = h.state, h.__v = t, m)
          M.getDerivedStateFromProps == null && h.componentWillMount != null && h.componentWillMount(), h.componentDidMount != null && h.__h.push(h.componentDidMount);
        else {
          if (M.getDerivedStateFromProps == null && v !== f && h.componentWillReceiveProps != null && h.componentWillReceiveProps(v, b), !h.__e && (h.shouldComponentUpdate != null && h.shouldComponentUpdate(v, h.__s, b) === !1 || t.__v === e.__v)) {
            for (t.__v !== e.__v && (h.props = v, h.state = h.__s, h.__d = !1), t.__e = e.__e, t.__k = e.__k, t.__k.forEach(function(E) {
              E && (E.__ = t);
            }), C = 0; C < h._sb.length; C++)
              h.__h.push(h._sb[C]);
            h._sb = [], h.__h.length && o.push(h);
            break t;
          }
          h.componentWillUpdate != null && h.componentWillUpdate(v, h.__s, b), h.componentDidUpdate != null && h.__h.push(function() {
            h.componentDidUpdate(f, _, g);
          });
        }
        if (h.context = b, h.props = v, h.__P = n, h.__e = !1, k = z.__r, x = 0, "prototype" in M && M.prototype.render) {
          for (h.state = h.__s, h.__d = !1, k && k(t), u = h.render(h.props, h.state, h.context), A = 0; A < h._sb.length; A++)
            h.__h.push(h._sb[A]);
          h._sb = [];
        } else
          do
            h.__d = !1, k && k(t), u = h.render(h.props, h.state, h.context), h.state = h.__s;
          while (h.__d && ++x < 25);
        h.state = h.__s, h.getChildContext != null && (s = Kt(Kt({}, s), h.getChildContext())), m || h.getSnapshotBeforeUpdate == null || (g = h.getSnapshotBeforeUpdate(f, _)), Zr(n, Kn(I = u != null && u.type === Ce && u.key == null ? u.props.children : u) ? I : [I], t, e, s, i, r, o, a, l, c), h.base = t.__e, t.__u &= -161, h.__h.length && o.push(h), y && (h.__E = h.__ = null);
      } catch (E) {
        t.__v = null, l || r != null ? (t.__e = a, t.__u |= l ? 160 : 32, r[r.indexOf(a)] = null) : (t.__e = e.__e, t.__k = e.__k), z.__e(E, t, e);
      }
    else
      r == null && t.__v === e.__v ? (t.__k = e.__k, t.__e = e.__e) : t.__e = El(e.__e, t, e, s, i, r, o, l, c);
  (u = z.diffed) && u(t);
}
function Qr(n, t, e) {
  t.__d = void 0;
  for (var s = 0; s < e.length; s++)
    oi(e[s], e[++s], e[++s]);
  z.__c && z.__c(t, n), n.some(function(i) {
    try {
      n = i.__h, i.__h = [], n.some(function(r) {
        r.call(i);
      });
    } catch (r) {
      z.__e(r, i.__v);
    }
  });
}
function El(n, t, e, s, i, r, o, a, l) {
  var c, u, h, m, f, _, g, y = e.props, v = t.props, w = t.type;
  if (w === "svg" && (i = !0), r != null) {
    for (c = 0; c < r.length; c++)
      if ((f = r[c]) && "setAttribute" in f == !!w && (w ? f.localName === w : f.nodeType === 3)) {
        n = f, r[c] = null;
        break;
      }
  }
  if (n == null) {
    if (w === null)
      return document.createTextNode(v);
    n = i ? document.createElementNS("http://www.w3.org/2000/svg", w) : document.createElement(w, v.is && v), r = null, a = !1;
  }
  if (w === null)
    y === v || a && n.data === v || (n.data = v);
  else {
    if (r = r && Un.call(n.childNodes), y = e.props || We, !a && r != null)
      for (y = {}, c = 0; c < n.attributes.length; c++)
        y[(f = n.attributes[c]).name] = f.value;
    for (c in y)
      f = y[c], c == "children" || (c == "dangerouslySetInnerHTML" ? h = f : c === "key" || c in v || ln(n, c, null, f, i));
    for (c in v)
      f = v[c], c == "children" ? m = f : c == "dangerouslySetInnerHTML" ? u = f : c == "value" ? _ = f : c == "checked" ? g = f : c === "key" || a && typeof f != "function" || y[c] === f || ln(n, c, f, y[c], i);
    if (u)
      a || h && (u.__html === h.__html || u.__html === n.innerHTML) || (n.innerHTML = u.__html), t.__k = [];
    else if (h && (n.innerHTML = ""), Zr(n, Kn(m) ? m : [m], t, e, s, i && w !== "foreignObject", r, o, r ? r[0] : e.__k && ye(e, 0), a, l), r != null)
      for (c = r.length; c--; )
        r[c] != null && Yr(r[c]);
    a || (c = "value", _ !== void 0 && (_ !== n[c] || w === "progress" && !_ || w === "option" && _ !== y[c]) && ln(n, c, _, y[c], !1), c = "checked", g !== void 0 && g !== n[c] && ln(n, c, g, y[c], !1));
  }
  return n;
}
function oi(n, t, e) {
  try {
    typeof n == "function" ? n(t) : n.current = t;
  } catch (s) {
    z.__e(s, e);
  }
}
function xs(n, t, e) {
  var s, i;
  if (z.unmount && z.unmount(n), (s = n.ref) && (s.current && s.current !== n.__e || oi(s, null, t)), (s = n.__c) != null) {
    if (s.componentWillUnmount)
      try {
        s.componentWillUnmount();
      } catch (r) {
        z.__e(r, t);
      }
    s.base = s.__P = null, n.__c = void 0;
  }
  if (s = n.__k)
    for (i = 0; i < s.length; i++)
      s[i] && xs(s[i], t, e || typeof n.type != "function");
  e || n.__e == null || Yr(n.__e), n.__ = n.__e = n.__d = void 0;
}
function $l(n, t, e) {
  return this.constructor(n, e);
}
function He(n, t, e) {
  var s, i, r, o;
  z.__ && z.__(n, t), i = (s = typeof e == "function") ? null : e && e.__k || t.__k, r = [], o = [], ri(t, n = (!s && e || t).__k = xt(Ce, null, [n]), i || We, We, t.ownerSVGElement !== void 0, !s && e ? [e] : i ? null : t.firstChild ? Un.call(t.childNodes) : null, r, !s && e ? e : i ? i.__e : t.firstChild, s, o), Qr(r, n, o);
}
Un = Gr.slice, z = { __e: function(n, t, e, s) {
  for (var i, r, o; t = t.__; )
    if ((i = t.__c) && !i.__)
      try {
        if ((r = i.constructor) && r.getDerivedStateFromError != null && (i.setState(r.getDerivedStateFromError(n)), o = i.__d), i.componentDidCatch != null && (i.componentDidCatch(n, s || {}), o = i.__d), o)
          return i.__E = i;
      } catch (a) {
        n = a;
      }
  throw n;
} }, Kr = 0, bt = function(n) {
  return n != null && n.constructor == null;
}, H.prototype.setState = function(n, t) {
  var e;
  e = this.__s != null && this.__s !== this.state ? this.__s : this.__s = Kt({}, this.state), typeof n == "function" && (n = n(Kt({}, e), this.props)), n && Kt(e, n), n != null && this.__v && (t && this._sb.push(t), Zi(this));
}, H.prototype.forceUpdate = function(n) {
  this.__v && (this.__e = !0, n && this.__h.push(n), Zi(this));
}, H.prototype.render = Ce, se = [], qr = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, ks = function(n, t) {
  return n.__v.__b - t.__v.__b;
}, kn.__r = 0;
function W(n, ...t) {
  return t.forEach((e) => {
    !e || typeof e != "object" || Object.keys(e).forEach((s) => {
      let i = e[s];
      const r = n[s];
      i !== r && (r !== void 0 && (s === "className" || s.endsWith("Class") ? i = [r, i] : s === "children" ? i = [...xn(r), ...xn(i)] : typeof r == "object" && (s === "style" || s.endsWith("Style") || s === "attrs" || s.endsWith("Attrs") || s === "props") && (i = d.extend(r, i))), n[s] = i);
    });
  }), n;
}
function to(n) {
  return Object.keys(n).forEach((t) => {
    n[t] === void 0 && delete n[t];
  }), n;
}
const Ie = /* @__PURE__ */ new Map();
function Tn(n) {
  const { zui: t } = window;
  return (!Ie.size || n && !Ie.has(n.toUpperCase())) && Object.keys(t).forEach((e) => {
    const s = t[e];
    !s.NAME || !s.ZUI || Ie.set(e.toLowerCase(), s);
  }), n ? Ie.get(n.toLowerCase()) : void 0;
}
function Ml(n, t, e) {
  const s = Tn(n);
  return s ? !s.MULTI_INSTANCE && s.get(t) ? (console.error(`[ZUI] cannot create component "${n}" on element which already has a component instance.`, { element: t, options: e }), null) : new s(t, e) : null;
}
function au(n) {
  if (n) {
    const t = Tn(n);
    t && t.defineFn();
  } else
    Tn(), Ie.forEach((t) => {
      t.defineFn();
    });
}
d.fn.zuiInit = function() {
  return this.find("[zui-create],[data-zui]").each(function() {
    const n = d(this);
    let t = Ss(n, "data-");
    const [e, s] = (t.zui || n.attr("zui-create")).split(":");
    n.zui(e) || (s ? t = d.share[s] : delete t.zui, requestAnimationFrame(() => Ml(e, this, t)));
  }), this.find("[zui-init]").each(function() {
    const n = d(this);
    n.z("zuiInited") || d.runJS(n.z("zuiInited", !0).attr("zui-init"), ["$element", n]);
  }), this.find(".hide-before-init").removeClass("invisible hidden opacity-0"), this.find(".scroll-into-view").scrollIntoView(), this.find('[data-on="inited"]').each((n, t) => {
    const e = d(t);
    e.zui() || e.trigger("inited");
  }), this;
};
d.fn.zui = function(n, t) {
  const e = this[0];
  if (!e)
    return;
  if (typeof n != "string") {
    const i = Ur(e, void 0, !0), r = {};
    let o;
    return Object.keys(i).forEach((a) => {
      if (a.startsWith("zui.")) {
        const l = i[a];
        r[a] = l, (!o || o.gid < l.gid) && (o = r[a]);
      }
    }), n === !0 ? r : o;
  }
  const s = Tn(n);
  if (s)
    return t === !0 ? s.getAll(e) : s.query(e, t);
};
d(() => {
  d("body").zuiInit();
});
function Al(n, t = !0) {
  const e = d(n), s = e[0], i = "zui-disable-scroll";
  if (t) {
    if (e.data(i))
      return;
    if ((e.css("scrollbar-gutter") || "").includes("stable")) {
      e.data(i, { overflow: e.css("overflow") }).css("overflow", "hidden");
      return;
    }
    const r = s === document.body ? window.innerWidth - document.body.clientWidth : s.offsetWidth - s.clientWidth;
    if (!r)
      return;
    const o = e.css("paddingRight") || "0";
    e.data(i, {
      paddingRight: o,
      overflow: e.css("overflow")
    }).css({
      paddingRight: `${r + Number.parseInt(o, 10)}px`,
      overflow: "hidden"
    });
  } else {
    const r = e.data(i);
    if (!r)
      return;
    e.css(r).removeData(i);
  }
}
d.fn.disableScroll = function(n = !0) {
  return this.each((t, e) => {
    Al(e, n);
  });
};
d.fn.enableScroll = function(n = !0) {
  return this.disableScroll(!n);
};
function Il(n) {
  const t = d(this), e = t.dataset();
  if (!(e.on || "click").split(" ").includes(n.type))
    return;
  const s = e.selector ? d(n.target).closest(e.selector) : t;
  if (!s.length)
    return;
  const i = (l) => l === "" ? !0 : l, r = (l) => {
    if (typeof l == "string")
      try {
        l = JSON.parse(l);
      } catch {
      }
    return l;
  };
  if (i(e.once)) {
    if (e.onceCalled)
      return;
    t.dataset("once-called", !0);
  }
  if (i(e.prevent) && n.preventDefault(), i(e.stop) && n.stopPropagation(), i(e.self) && n.currentTarget !== n.target)
    return;
  const o = [["$element", t], ["event", n], ["options", e], ["$target", s]];
  if (e.if && !d.runJS(e.if, ...o))
    return;
  const a = e.call;
  if (a) {
    let l = window[a];
    const c = /^[$A-Z_][0-9A-Z_$.]*$/i.test(a);
    if (l || (l = d.runJS(a, ...o)), !c || !d.isFunction(l))
      return;
    const u = [], h = e.params;
    e.params = u, typeof h == "string" && h.length && (h[0] === "[" ? u.push(...r(h)) : u.push(...h.split(", ").map((m) => (m = m.trim(), m === "$element" ? t : m === "event" ? n : m === "options" ? e : m.startsWith("$element.") || m.startsWith("$event.") || m.startsWith("$options.") ? d.runJS(m, ...o) : r(m))))), l(...u);
  }
  e.do && d.runJS(e.do, ...o);
}
d(document).on("click.zui.global change.zui.global inited.zui.global", "[data-on]", Il);
function Pl(n) {
  if (typeof n == "number")
    return [n];
  let t = n.match(/(\d+)(%|px)?/);
  return t ? [parseInt(t[1]), t[2]] : (t = n.match(/(\d+)\/(\d+)/), t ? [100 * parseInt(t[1]) / parseInt(t[2]), "%"] : [NaN]);
}
function dn(n) {
  if (n == null)
    return null;
  const [t, e = "px"] = Pl(n);
  return Number.isNaN(t) ? typeof n == "string" ? n : null : `${t}${e}`;
}
async function er(n, t) {
  var s, i, r;
  if (n instanceof Blob) {
    const o = document.createElement("a");
    return o.href = window.URL.createObjectURL(n), t && (o.download = decodeURIComponent(t)), o.click(), o.remove(), n;
  }
  if (n instanceof Response) {
    const o = await n.blob();
    return t = t || ((r = (i = (s = n.headers.get("Content-Disposition")) == null ? void 0 : s.split(";")[1]) == null ? void 0 : i.split("=")[1]) == null ? void 0 : r.replace(/"/g, "")), er(o, t);
  }
  const e = await fetch(n);
  return er(e);
}
class Rl {
  constructor(t) {
    this._$target = d(t);
  }
  on(...t) {
    return this._$target.on(...t), this;
  }
  one(...t) {
    return this._$target.one(...t), this;
  }
  off(...t) {
    return this._$target.off(...t), this;
  }
  trigger(...t) {
    return this._$target.trigger(...t), this;
  }
}
const Lt = new Rl(document);
d.bus = Lt;
d.on = Lt.on.bind(Lt);
d.one = Lt.one.bind(Lt);
d.off = Lt.off.bind(Lt);
d.trigger = Lt.trigger.bind(Lt);
var Dl = ["Shift", "Meta", "Alt", "Control"], eo = typeof navigator == "object" ? navigator.platform : "", no = /Mac|iPod|iPhone|iPad/.test(eo), Ll = no ? "Meta" : "Control", zl = eo === "Win32" ? ["Control", "Alt"] : no ? ["Alt"] : [];
function fs(n, t) {
  return typeof n.getModifierState == "function" && (n.getModifierState(t) || zl.includes(t) && n.getModifierState("AltGraph"));
}
function Fl(n) {
  return n.trim().split(" ").map(function(t) {
    var e = t.split(/\b\+/), s = e.pop();
    return [e = e.map(function(i) {
      return i === "$mod" ? Ll : i;
    }), s];
  });
}
function so(n, t) {
  var e;
  t === void 0 && (t = {});
  var s = (e = t.timeout) != null ? e : 1e3, i = Object.keys(n).map(function(a) {
    return [Fl(a), n[a]];
  }), r = /* @__PURE__ */ new Map(), o = null;
  return function(a) {
    a instanceof KeyboardEvent && (i.forEach(function(l) {
      var c = l[0], u = l[1], h = r.get(c) || c;
      (function(m, f) {
        return !(f[1].toUpperCase() !== m.key.toUpperCase() && f[1] !== m.code || f[0].find(function(_) {
          return !fs(m, _);
        }) || Dl.find(function(_) {
          return !f[0].includes(_) && f[1] !== _ && fs(m, _);
        }));
      })(a, h[0]) ? h.length > 1 ? r.set(c, h.slice(1)) : (r.delete(c), u(a)) : fs(a, a.key) || r.delete(c);
    }), o && clearTimeout(o), o = setTimeout(r.clear.bind(r), s));
  };
}
function Ol(n, t, e) {
  var s;
  e === void 0 && (e = {});
  var i = (s = e.event) != null ? s : "keydown", r = so(t, e);
  return n.addEventListener(i, r), function() {
    n.removeEventListener(i, r);
  };
}
function io(n, t = {}) {
  if (!n)
    return;
  const e = Object.keys(t).reduce((s, i) => (t[i].optional || (s[i] = {
    ...t[i]
  }), s), {});
  return Object.keys(n).forEach((s) => {
    const i = n[s];
    i ? i === !0 ? t[s] && (e[s] = {
      ...t[s]
    }) : e[s] = i : delete e[s];
  }), Object.keys(e).reduce((s, i) => {
    const { keys: r, handler: o } = e[i];
    return typeof r == "string" ? s[r] = o : r.forEach((a) => {
      s[a] = o;
    }), s;
  }, {});
}
function ro(n, t, e) {
  const { timeout: s, event: i = "keydown", scope: r, when: o } = e || {}, a = so(t, { timeout: s });
  return d(n).on(`${i}.zui.hotkeys${r ? `.${r}` : ""}`, function(l) {
    o && o(l) === !1 || a(l);
  });
}
function oo(n, t) {
  return d(n).off(`.zui.hotkeys${t ? `.${t}` : ""}`);
}
const lu = Ol;
d.fn.hotkeys = function(n, t) {
  return ro(this, n, t);
};
d.fn.unbindHotkeys = function(n) {
  return oo(this, n);
};
d.hotkeys = function(n, t) {
  ro(window, n, t);
};
d.unbindHotkeys = function(n) {
  oo(window, n);
};
function ai() {
  return document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement;
}
async function Wl(n) {
  (typeof n == "string" || n instanceof Element || n instanceof d) && (n = { target: n });
  const { target: t, onError: e, onSuccess: s, afterExit: i, afterEnter: r } = n, o = d(t), a = o[0];
  if (!a)
    return;
  const l = a.requestFullscreen || a.webkitRequestFullscreen || a.mozRequestFullScreen;
  if (!l) {
    e == null || e.call(a, new Error("[ZUI] The browser does not support full screen feature."));
    return;
  }
  try {
    await l.call(a), s == null || s.call(a), d(a).off(".zui.fullscreen"), i && o.on("exitFullscreen.zui.fullscreen", i), r && o.on("enterFullscreen.zui.fullscreen", r);
  } catch (c) {
    e == null || e.call(a, c);
  }
  document.zuiBindFullscreenChange || (document.zuiBindFullscreenChange = !0, d(document).on("fullscreenchange.zui webkitfullscreenchange.zui mozfullscreenchange.zui", (c) => {
    const u = ai();
    let h = u;
    u ? d(u).addClass("is-in-fullscreen") : (h = d(document).find(".is-in-fullscreen")[0] || document, d(h).removeClass("is-in-fullscreen")), d("body").toggleClass("has-in-fullscreen", !!u);
    const m = { event: c, target: h, fullscreenElement: u };
    d(h).trigger(u ? "enterFullscreen" : "exitFullscreen", m).trigger("toggleFullscreen", m);
  }));
}
async function ao(n) {
  const t = ai();
  return n === !1 && !!t === n ? n : t ? (document.exitFullscreen(), !1) : (await Wl(n), !0);
}
d.fn.fullscreen = function(n) {
  return ao({
    target: this,
    ...n
  });
};
d.getFullscreenElement = ai;
d.toggleFullscreen = ao;
function Se(n) {
  return n.parentNode === document ? !1 : n.parentNode ? Se(n.parentNode) : !0;
}
d.isDetached = Se;
d.fn.isDetached = function() {
  const n = this[0];
  return !n || Se(n);
};
class Ot {
  /**
   * The component constructor.
   *
   * @param options The component initial options.
   */
  constructor(t, e) {
    this._inited = !1, this._autoDestory = 0;
    const { KEY: s, DATA_KEY: i, DEFAULT: r, MULTI_INSTANCE: o, NAME: a } = this.constructor;
    if (!a)
      throw new Error('[ZUI] The component must have a "NAME" static property.');
    const l = d(t);
    if (l.data(s) && !o)
      throw new Error("[ZUI] The component has been initialized on element.");
    const c = l[0], u = ut();
    this._gid = u, this._element = c;
    const h = l.parent();
    if (h.length && (this._mobs = new MutationObserver((m) => {
      m.forEach((f) => {
        f.removedNodes.forEach((_) => {
          _ === c && (this._autoDestory && clearTimeout(this._autoDestory), this._autoDestory = window.setTimeout(() => {
            this._autoDestory = 0, Se(c) && this.destroy();
          }, 100));
        });
      });
    }), this._mobs.observe(h[0], { childList: !0, subtree: !1 })), this._options = { ...r, ...l.dataset() }, this.setOptions(e), this._key = this.options.key ?? `__${u}`, l.data(s, this).attr(i, `${u}`), o) {
      const m = `${s}:ALL`;
      let f = l.data(m);
      f || (f = /* @__PURE__ */ new Map(), l.data(m, f)), f.set(this._key, this);
    }
    this.init(), requestAnimationFrame(async () => {
      this._inited = !0, await this.afterInit(), this.emit("inited", this.options);
    });
  }
  /**
   * ZUI name
   */
  static get ZUI() {
    return this.NAME.replace(/(^[A-Z]+)/, (t) => t.toLowerCase());
  }
  /**
   * Component data key, like "zui.menu"
   */
  static get KEY() {
    return `zui.${this.NAME}`;
  }
  /**
   * Component namespace, like ".zui.menu"
   */
  static get NAMESPACE() {
    return `.zui.${this.ZUI}`;
  }
  static get DATA_KEY() {
    return `data-zui-${this.NAME}`;
  }
  get inited() {
    return this._inited;
  }
  /**
   * Get the component element.
   */
  get element() {
    return this._element;
  }
  get key() {
    return this._key;
  }
  /**
   * Get the component options.
   */
  get options() {
    return this._options;
  }
  /**
   * Get the component global id.
   */
  get gid() {
    return this._gid;
  }
  /**
   * Get the component element as a jQuery like object.
   */
  get $element() {
    return d(this.element);
  }
  /**
   * Get the component event emitter.
   */
  get $emitter() {
    return this.$element;
  }
  /**
   * Get the component i18n data.
   */
  get i18nData() {
    return [this.options.i18n, this.constructor.i18n];
  }
  /**
   * Initialize the component.
   */
  init() {
  }
  /**
   * Do something after the component initialized.
   */
  afterInit() {
  }
  /**
   * Render the component.
   *
   * @param options The component options to override before render.
   */
  render(t) {
    this.setOptions(t);
  }
  /**
   * Destroy the component.
   */
  destroy() {
    var r;
    const { KEY: t, DATA_KEY: e, MULTI_INSTANCE: s } = this.constructor, { $element: i } = this;
    if (this.emit("destroyed"), (r = this._mobs) == null || r.disconnect(), i.off(this.namespace).removeData(t).attr(e, null), s) {
      const o = this.$element.data(`${t}:ALL`);
      if (o)
        if (o.delete(this._key), o.size === 0)
          this.$element.removeData(`${t}:ALL`);
        else {
          const a = o.values().next().value;
          i.data(t, a).attr(e, a.gid);
        }
    }
  }
  /**
   * Set the component options.
   *
   * @param options  The component options to set.
   * @returns The component options.
   */
  setOptions(t) {
    return t && d.extend(this._options, t), this._options;
  }
  /**
   * Emit a component event.
   * @param event  The event name.
   * @param args   The event arguments.
   */
  emit(t, ...e) {
    const s = d.Event(t);
    return s.__src = this, this.$emitter.trigger(s, [this, ...e]), s;
  }
  /**
   * Listen to a component event.
   *
   * @param event     The event name.
   * @param callback  The event callback.
   */
  on(t, e, s) {
    const i = this;
    this.$element[s != null && s.once ? "one" : "on"](this._wrapEvent(t), function(r, o) {
      (!r.__src || r.__src === i) && e.call(this, r, o);
    });
  }
  /**
   * Listen to a component event.
   *
   * @param event     The event name.
   * @param callback  The event callback.
   */
  one(t, e) {
    this.on(t, e, { once: !0 });
  }
  /**
   * Stop listening to a component event.
   * @param event     The event name.
   * @param callback  The event callback.
   */
  off(t) {
    this.$element.off(this._wrapEvent(t));
  }
  /**
   * Get the i18n text.
   *
   * @param key          The i18n key.
   * @param args         The i18n arguments or the default value.
   * @param defaultValue The default value if the key is not found.
   * @returns            The i18n text.
   */
  i18n(t, e, s) {
    const { i18nData: i } = this;
    return j(i, t, e, s, this.options.lang, this.constructor.NAME) ?? j(i, t, e, s, this.options.lang) ?? `{i18n:${t}}`;
  }
  /**
   * Get event namespace.
   * @returns Event namespace.
   */
  get namespace() {
    return `${this.constructor.NAMESPACE}.${this._key}`;
  }
  /**
   * Wrap event names with component namespace.
   *
   * @param names The event names.
   * @returns     The wrapped event names.
   */
  _wrapEvent(t) {
    return t.split(" ").map((e) => e.includes(".") ? e : `${e}${this.namespace}`).join(" ");
  }
  /**
   * Get the component instance of the given element.
   *
   * @param this     Current component constructor.
   * @param selector The component element selector.
   * @returns        The component instance.
   */
  static get(t, e) {
    const s = d(t);
    if (this.MULTI_INSTANCE && e !== void 0) {
      const i = s.data(`${this.KEY}:ALL`);
      return i ? i.get(e) : void 0;
    }
    return s.data(this.KEY);
  }
  /**
   * Ensure the component instance of the given element.
   *
   * @param this      Current component constructor.
   * @param selector  The component element selector.
   * @param options   The component options.
   * @returns         The component instance.
   */
  static ensure(t, e) {
    const s = this.get(t, e == null ? void 0 : e.key);
    return s ? (e && s.setOptions(e), s) : new this(t, e);
  }
  /**
   * Get all component instances.
   *
   * @param this     Current component constructor.
   * @param selector The component element selector.
   * @returns        All component instances.
   */
  static getAll(t) {
    const { MULTI_INSTANCE: e, DATA_KEY: s } = this, i = [];
    return d(t || document).find(`[${s}]`).each((r, o) => {
      if (e) {
        const l = d(o).data(`${this.KEY}:ALL`);
        if (l) {
          i.push(...l.values());
          return;
        }
      }
      const a = d(o).data(this.KEY);
      a && i.push(a);
    }), i.sort((r, o) => r.gid - o.gid);
  }
  /**
   * Query the component instance.
   *
   * @param this     Current component constructor.
   * @param selector The component element selector.
   * @returns        The component instance.
   */
  static query(t, e, s) {
    if (t === void 0) {
      let i = this.getAll();
      return s && (i = i.filter(s)), i.pop();
    }
    return this.get(d(t).closest(`[${this.DATA_KEY}]`), e);
  }
  /**
   * Create cash fn.method for current component.
   *
   * @param name The method name.
   */
  static defineFn(t) {
    let e = t || this.ZUI;
    d.fn[e] && (e = `zui${this.NAME}`);
    const s = this;
    d.fn.extend({
      [e](i, ...r) {
        const o = typeof i == "object" ? i : void 0, a = typeof i == "string" ? i : void 0;
        let l;
        return this.each((c, u) => {
          let h = s.get(u);
          if (h ? o && h.render(o) : h = new s(u, o), a) {
            let m = h[a], f = h;
            m === void 0 && (f = h.$, m = f[a]), typeof m == "function" ? l = m.call(f, ...r) : l = m;
          }
        }), l !== void 0 ? l : this;
      }
    });
  }
}
Ot.DEFAULT = {};
Ot.MULTI_INSTANCE = !1;
class Hl extends Ot {
  init() {
    const { offset: t = 1, side: e, zIndex: s, pinnedClass: i = "is-pinned" } = this.options, { $element: r } = this;
    r.css({ position: "sticky", zIndex: s }), e && r.css(e, -t), this._ob = new IntersectionObserver(
      ([o]) => o.target.classList.toggle(i, o.intersectionRatio < t),
      { threshold: [1] }
    ), this._ob.observe(r[0]);
  }
  destroy() {
    this._ob.disconnect();
  }
}
Hl.NAME = "Sticky";
function li(n, t) {
  const e = d(n)[0];
  if (!e)
    return !1;
  let { viewport: s } = t || {};
  const { left: i, top: r, width: o, height: a } = e.getBoundingClientRect();
  if (!s) {
    const { innerHeight: _, innerWidth: g } = window, { clientHeight: y, clientWidth: v } = document.documentElement;
    s = { left: 0, top: 0, width: g || v, height: _ || y };
  }
  const { left: l, top: c, width: u, height: h } = s;
  if (t != null && t.fullyCheck)
    return i >= l && r >= c && i + o <= u && r + a <= h;
  const m = i <= u && i + o >= l;
  return r <= h && r + a >= c && m;
}
d.fn.isVisible = function(n) {
  return li(this, n);
};
function ci(n, t, e = !1) {
  const s = d(n);
  if (t !== void 0) {
    if (t.length) {
      const i = `zui-runjs-${ut()}`;
      s.append(`<script id="${i}">${t}<\/script>`), e && s.find(`#${i}`).remove();
    }
    return;
  }
  s.find("script").each((i, r) => {
    ci(s, r.innerHTML), r.remove();
  });
}
d.runJS = (n, ...t) => (n = n.trim(), !n.startsWith("return ") && !n.endsWith(";") && (n = `return ${n}`), new Function(...t.map(([s]) => s), n)(...t.map(([, s]) => s)));
d.fn.runJS = function(n) {
  return this.each((t, e) => {
    ci(e, n);
  });
};
function jl(n, t = "both") {
  return (t === "vert" || t === "both") && n.clientHeight < n.scrollHeight || (t === "horz" || t === "both") && n.clientWidth < n.scrollWidth;
}
function lo(n, t) {
  const e = d(n), { ifNeeded: s = !0, container: i, ...r } = t || {};
  return e.each((o, a) => {
    if (i) {
      const l = d(a).closest(i);
      if (!l.length || !jl(l[0]))
        return;
    }
    if (s) {
      if (a.scrollIntoViewIfNeeded)
        return a.scrollIntoViewIfNeeded(r);
      if (li(a, { viewport: a.getBoundingClientRect() }))
        return;
    }
    a.scrollIntoView(r);
  }), e;
}
d.fn.scrollIntoView = function(n) {
  return this.each((t, e) => {
    lo(e, n);
  });
};
d.setLibRoot = function(n) {
  d.libRoot = n;
};
d.registerLib = function(n, t) {
  d.libMap || (d.libMap = {}), !t.name && t.id && (t.id = `zui-lib-${n}`), d.libMap[n] = t;
};
d.getLib = function(n, t, e) {
  return new Promise((s, i) => {
    let r = typeof n == "string" ? { src: n } : d.extend({}, n);
    typeof t == "function" ? r.success = t : t && d.extend(r, t), e && (r.success = e);
    let { src: o } = r;
    if (!o)
      return i(new Error("[ZUI] No src provided for $.getLib."));
    const a = d.libMap && d.libMap[o];
    a && (r = d.extend({}, a, r), o = a.src || r.src);
    const { root: l = d.libRoot } = r;
    l && (o = `${l}${l.endsWith("/") || o.startsWith("/") ? "" : "/"}${o}`);
    const { success: c, name: u } = r, h = () => u ? window[u] : void 0, m = () => {
      s(h()), c == null || c();
    };
    if (h()) {
      m();
      return;
    }
    const { id: f } = r, _ = d(f ? `#${f}` : `script[src="${o}"]`);
    if (_.length) {
      if (_.dataset("loaded"))
        m();
      else {
        const k = _.data("loadCalls") || [];
        k.push(m), _.data("loadCalls", k);
      }
      return;
    }
    const { async: g = !0, defer: y = !1, noModule: v = !1, type: w, integrity: b } = r, C = document.createElement("script");
    C.async = g, C.defer = y, C.noModule = v, w && (C.type = w), b && (C.integrity = b), C.onload = () => {
      m(), (d(C).dataset("loaded", !0).data("loadCalls") || []).forEach((x) => x()), d(C).removeData("loadCalls");
    }, C.onerror = () => {
      i(new Error(`[ZUI] Failed to load lib from: ${o}`));
    }, C.src = o, d("head").append(C);
  });
};
d.getScript = d.getLib;
const cu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isElementDetached: Se,
  isVisible: li,
  runJS: ci,
  scrollIntoView: lo
}, Symbol.toStringTag, { value: "Module" })), co = {};
function rt(n, t) {
  typeof n == "object" ? Object.keys(n).forEach((e) => {
    rt(e, n[e]);
  }) : t && (co[n.toLowerCase()] = t);
}
function Bl(n) {
  return co[n.toLowerCase()];
}
class X extends H {
  constructor() {
    super(...arguments), this._gid = ut();
  }
  get gid() {
    return this._gid;
  }
  get element() {
    return document.querySelector(`[z-gid-${this._gid}]`);
  }
  /**
   * Get the component i18n data.
   */
  get i18nData() {
    return [this.props.i18n, this.constructor.i18n];
  }
  /**
   * Get the i18n text.
   *
   * @param key          The i18n key.
   * @param args         The i18n arguments or the default value.
   * @param defaultValue The default value if the key is not found.
   * @returns            The i18n text.
   */
  i18n(t, e, s) {
    const { i18nData: i } = this;
    return j(i, t, e, s, this.props.lang, this.constructor.NAME) ?? j(i, t, e, s, this.props.lang) ?? `{i18n:${t}}`;
  }
  changeState(t, e) {
    return new Promise((s) => {
      this.setState(t, () => {
        e == null || e(), s(this.state);
      });
    });
  }
  _getClassName(t) {
    return t.className;
  }
  _getProps(t) {
    const { className: e, attrs: s, props: i, data: r, forwardRef: o, children: a, component: l, style: c, class: u, ...h } = t, m = new Set(this.constructor.customProps), f = "dangerouslySetInnerHTML", _ = Object.keys(h).reduce((g, y) => {
      if (!m.has(y) && (y === f || /^(on[A-Z]|data-|zui-|z-)[a-zA-Z-]+/.test(y))) {
        const v = h[y];
        g[y] = y !== f && v && typeof v == "object" ? JSON.stringify(v) : v;
      }
      return g;
    }, {});
    return { ref: o, className: T(this._getClassName(t), u) || void 0, style: c, [`z-gid-${this._gid}`]: "", ..._, ...s, ...i };
  }
  _getComponent(t) {
    const { component: e = "div" } = t;
    return (typeof e == "string" ? Bl(e) : e) || e;
  }
  _getChildren(t) {
    return t.children;
  }
  _beforeRender(t) {
    return t;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _onRender(t, e, s, i) {
    return [t, e, s];
  }
  render(t) {
    t = this._beforeRender(t) || t;
    let e = this._getComponent(t), s = this._getChildren(t), i = this._getProps(t);
    const r = this._onRender(e, i, s, t);
    return r && ([e, i, s] = r), xt(e, i, s);
  }
}
X.HElement = !0;
X.customProps = [];
var Vl = 0;
function p(n, t, e, s, i, r) {
  var o, a, l = {};
  for (a in t)
    a == "ref" ? o = t[a] : l[a] = t[a];
  var c = { type: n, props: l, key: e, ref: o, __k: null, __: null, __b: 0, __e: null, __d: void 0, __c: null, constructor: void 0, __v: --Vl, __i: -1, __u: 0, __source: i, __self: r };
  if (typeof n == "function" && (o = n.defaultProps))
    for (a in o)
      l[a] === void 0 && (l[a] = o[a]);
  return z.vnode && z.vnode(c), c;
}
class ve extends H {
  constructor() {
    super(...arguments), this._ref = K();
  }
  _runJS() {
    this.props.executeScript && d(this._ref.current).runJS().zuiInit();
  }
  componentDidMount() {
    this._runJS();
  }
  componentDidUpdate(t) {
    this.props.html !== t.html && this._runJS();
  }
  render(t) {
    const { executeScript: e, html: s, ...i } = t;
    return /* @__PURE__ */ p(X, { forwardRef: this._ref, dangerouslySetInnerHTML: { __html: s }, ...i });
  }
}
function Ul(n) {
  const {
    tag: t,
    className: e,
    style: s,
    renders: i,
    generateArgs: r = [],
    generatorThis: o,
    generators: a,
    onGenerate: l,
    onRenderItem: c,
    ...u
  } = n, h = [e], m = { ...s }, f = [], _ = [];
  return i.forEach((g) => {
    const y = [];
    if (typeof g == "string" && a && a[g] && (g = a[g]), typeof g == "function")
      if (l)
        y.push(...l.call(o, g, f, ...r));
      else {
        const v = g.call(o, f, ...r);
        v && (Array.isArray(v) ? y.push(...v) : y.push(v));
      }
    else
      y.push(g);
    y.forEach((v) => {
      v != null && (typeof v == "object" && !bt(v) && ("html" in v || "__html" in v || "className" in v || "style" in v || "attrs" in v || "children" in v) ? v.html ? f.push(
        /* @__PURE__ */ p("div", { className: T(v.className), style: v.style, dangerouslySetInnerHTML: { __html: v.html }, ...v.attrs ?? {} })
      ) : v.__html ? _.push(v.__html) : (v.style && Object.assign(m, v.style), v.className && h.push(v.className), v.children && f.push(v.children), v.attrs && Object.assign(u, v.attrs)) : f.push(v));
    });
  }), _.length && Object.assign(u, { dangerouslySetInnerHTML: { __html: _ } }), [{
    className: T(h),
    style: m,
    ...u
  }, f];
}
function ho({
  tag: n = "div",
  ...t
}) {
  const [e, s] = Ul(t);
  return xt(n, e, ...s);
}
function Ts(n) {
  const { content: t, generatorArgs: e, generatorThis: s, ...i } = n;
  let r = t;
  if (typeof r == "function" && (r = r.call(s, ...e || [])), Array.isArray(r))
    return r.map((o) => Ts({ ...i, content: o, generatorThis: s, generatorArgs: e }));
  if (typeof r == "string" || typeof r == "number")
    return Object.keys(i).length ? /* @__PURE__ */ p("div", { ...i, children: r }) : r;
  if (r && typeof r == "object" && (typeof r.html == "string" || r.component)) {
    if (r.html)
      return /* @__PURE__ */ p(ve, { ...W(i, r) });
    let { children: o } = r;
    return o && (o = Array.isArray(o) ? o : [o], r = W({ children: o.map((a) => Ts({ ...i, content: a, generatorThis: s, generatorArgs: e })) }, r)), /* @__PURE__ */ p(X, { ...W(i, r) });
  }
  return bt(r) ? r : (r && (console.groupCollapsed("[ZUI] CustomContent format error"), console.trace("content:", r), console.log("props:", n), console.groupEnd()), null);
}
function V(n) {
  const t = Ts(n);
  return t == null || typeof t == "boolean" ? null : bt(t) ? t : /* @__PURE__ */ p(Ce, { children: t });
}
const nr = (n) => n.startsWith("icon-") ? n : `icon-${n}`;
function Q(n) {
  const { icon: t, className: e, ...s } = n;
  if (!t)
    return null;
  if (bt(t))
    return t;
  const i = ["icon", e];
  if (typeof t == "string")
    i.push(nr(t));
  else if (typeof t == "object") {
    const { className: r, icon: o, ...a } = t;
    i.push(r, o ? nr(o) : ""), Object.assign(s, a);
  }
  return /* @__PURE__ */ p("i", { className: T(i), ...s });
}
function Kl(n) {
  return this.getChildContext = () => n.context, n.children;
}
function uo(n) {
  const t = this, e = n._container;
  t.componentWillUnmount = function() {
    He(null, t._temp), t._temp = null, t._container = null;
  }, t._container && t._container !== e && t.componentWillUnmount(), n._vnode ? (t._temp || (t._container = e, t._temp = {
    nodeType: 1,
    parentNode: e,
    childNodes: [],
    appendChild(s) {
      this.childNodes.push(s), t._container.appendChild(s);
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    insertBefore(s, i) {
      this.childNodes.push(s), t._container.appendChild(s);
    },
    removeChild(s) {
      this.childNodes.splice(this.childNodes.indexOf(s) >>> 1, 1), t._container.removeChild(s);
    }
  }), He(
    xt(Kl, { context: t.context }, n._vnode),
    t._temp
  )) : t._temp && t.componentWillUnmount();
}
function ql(n, t) {
  const e = xt(uo, { _vnode: n, _container: t });
  return e.containerInfo = t, e;
}
rt({
  HElement: X,
  element: X,
  HtmlContent: ve,
  html: ve,
  CustomContent: V,
  custom: V,
  Icon: Q,
  Portal: uo
});
class B extends Ot {
  constructor() {
    super(...arguments), this._ref = K();
  }
  /**
   * The React component instance.
   */
  get $() {
    return this._ref.current;
  }
  /**
   * The i18n data.
   */
  get i18nData() {
    const { i18n: t, i18nData: e } = this.constructor.Component;
    return e ? [...e, this.constructor.i18n] : [t, ...super.i18nData];
  }
  /**
   * Render after component init.
   */
  afterInit() {
    this.render();
  }
  /**
   * Destroy component.
   */
  destroy() {
    var t, e;
    (e = (t = this.$) == null ? void 0 : t.componentWillUnmount) == null || e.call(t), this.element && (this.element.innerHTML = ""), super.destroy();
  }
  /**
   * Render component.
   *
   * @param options new options.
   */
  render(t) {
    const { element: e } = this, { Component: s, replace: i } = this.constructor, { $replace: r = i, ...o } = this.setOptions(t), a = {
      ref: this._ref,
      ...o
    };
    if (r && s.HElement && (e.tagName.toLowerCase() === r || r === !0)) {
      const l = Array.from(e.attributes).reduce((c, u) => {
        const { name: h, value: m } = u;
        return c[h === "class" ? "className" : h] = m, c;
      }, {});
      return He(
        xt(s, W({ component: e.tagName.toLowerCase(), attrs: l }, a)),
        e.parentElement,
        e
      );
    }
    He(
      xt(s, a),
      e
    );
  }
}
B.replace = !1;
class U extends X {
  _beforeRender(t) {
    const { text: e, loading: s, loadingText: i, caret: r, icon: o, trailingIcon: a, children: l } = t;
    this._isEmptyText = e == null || typeof e == "string" && !e.length || s && !i, this._onlyCaret = r && this._isEmptyText && !o && !a && !l && !s;
  }
  _getChildren(t) {
    const { loading: e, loadingIcon: s, loadingText: i, icon: r, text: o, children: a, trailingIcon: l, caret: c } = t;
    return [
      e ? /* @__PURE__ */ p(Q, { icon: s || "icon-spinner-snake", className: "spin" }) : /* @__PURE__ */ p(Q, { icon: r }),
      this._isEmptyText ? null : /* @__PURE__ */ p("span", { className: "text", children: e ? i : o }),
      e ? null : a,
      e ? null : /* @__PURE__ */ p(Q, { icon: l }),
      e ? null : c ? /* @__PURE__ */ p("span", { className: typeof c == "string" ? `caret-${c}` : "caret" }) : null
    ];
  }
  _getClassName(t) {
    const { type: e, className: s, disabled: i, loading: r, active: o, children: a, square: l, size: c, rounded: u } = t;
    return ["btn", e, s, {
      "btn-caret": this._onlyCaret,
      disabled: i || r,
      active: o,
      loading: r,
      square: l === void 0 ? !this._onlyCaret && !a && this._isEmptyText : l
    }, c ? `size-${c}` : "", typeof u == "string" ? `rounded-${u}` : { rounded: u }];
  }
  _getComponent(t) {
    return t.component || (t.url ? "a" : "button");
  }
  _getProps(t) {
    const e = this._getComponent(t), { url: s, target: i, disabled: r, btnType: o = "button", hint: a } = t, l = e === "a", c = {
      ...super._getProps(t),
      disabled: !l && r ? "" : void 0,
      title: a
    };
    return o && (["button", "reset", "submit"].includes(o) ? e === "button" && (c.type = o) : c.className = T([c.className, o])), r || (s !== void 0 && (c[l ? "href" : "data-url"] = s), i !== void 0 && (c[l ? "target" : "data-target"] = i)), c;
  }
}
const Gl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Button: U
}, Symbol.toStringTag, { value: "Module" }));
rt(Gl);
let ot = class extends X {
  constructor(t) {
    super(t), this._handleClick = this._handleClick.bind(this);
  }
  /**
   * Get the root element name, used for class name.
   */
  get name() {
    return this.props.name || this.constructor.NAME;
  }
  /**
   * Get the item element name, used for class name.
   */
  get itemName() {
    return this.props.itemName || this.constructor.ITEM_NAME;
  }
  getItems() {
    return this._items;
  }
  getRenderedItem(t) {
    return this._renderedItems.find((e) => e.key === t);
  }
  getItem(t) {
    return this._items[this.getItemIndex(t)];
  }
  getItemIndex(t) {
    return this._renderedItems.findIndex((e) => e.key === t);
  }
  getItemByIndex(t) {
    return this._items[t];
  }
  /**
   * Get the item key by index.
   *
   * @param index The rendered item index.
   * @returns The item key, if the item is not rendered, return undefined.
   */
  getKey(t) {
    var e, s;
    return (s = (e = this._renderedItems) == null ? void 0 : e[t]) == null ? void 0 : s.key;
  }
  _getItemFromEvent(t, e) {
    var l;
    const s = (e || t.target).closest("[z-item]");
    if (!s || !((l = s.parentElement) != null && l.hasAttribute(`z-gid-${this._gid}`)))
      return;
    const i = +s.getAttribute("z-item"), r = this._items[i];
    if (!r)
      return;
    const o = this.getKey(i);
    if (o === void 0)
      return;
    const a = this._renderedItems[i];
    return { index: i, item: r, element: s, event: t, key: o, renderedItem: a, relativeTarget: this.props.relativeTarget };
  }
  _handleClick(t) {
    var s, i;
    const e = this._getItemFromEvent(t);
    if (e)
      return (s = this.props.onClickItem) == null || s.call(this, e), (i = e.item.onClick) == null || i.call(this, t, e), e;
  }
  /**
   * Render the item content.
   *
   * @param props  Current list properties.
   * @param item   The item to render.
   * @param index  The item index.
   * @returns The item rendered content.
   */
  _renderItem(t, e, s) {
    const { beforeRenderItem: i } = t;
    if (i) {
      const c = i.call(this, e, s);
      c !== void 0 && (e = c);
    }
    const { type: r } = e;
    let { itemRender: o } = t;
    if (o && typeof o == "object" && (o = o[r]), o) {
      const c = o.call(this, e, s);
      if (c !== void 0)
        return /* @__PURE__ */ p(V, { "z-key": e.key, "z-item": s, "z-type": r, content: c });
    }
    const { ItemComponents: a } = this.constructor;
    let l = a[r] || a.default || X;
    if (Array.isArray(l)) {
      let c = l[1];
      typeof c == "function" && (c = c.call(this, e, t)), e = W({}, c, e), l = l[0];
    }
    return /* @__PURE__ */ p(l, { "z-key": e.key, "z-item": s, "z-type": r, ...e });
  }
  /**
   * Get the rendered item final properties.
   *
   * @param props  Current list properties.
   * @param item   The item to render.
   * @param index  The item index.
   * @returns The item to rendered, if return false, the item will not be rendered.
   */
  _getItem(t, e, s) {
    if (!e)
      return !1;
    const { itemProps: i, itemPropsMap: r = {}, getItem: o, itemKey: a = "id" } = t, { type: l = this.constructor.defaultItemType } = e, { name: c, itemName: u } = this, { defaultItemProps: h = {}, defaultItemPropsMap: m = {} } = this.constructor;
    if (e = W(
      { type: l },
      h,
      m[l],
      i,
      r[l],
      { className: [c ? `${c}-${l}` : "", u] },
      e,
      {
        _item: e,
        _index: s,
        key: String((a ? e[a] : e.key) ?? e.key ?? s),
        onClick: void 0
      }
    ), o) {
      const f = o.call(this, e, s);
      if (f !== void 0)
        return f;
    }
    return e;
  }
  _getProps(t) {
    const e = super._getProps(t);
    return { onClick: this._handleClick, ...e };
  }
  /**
   * Get the list root element classname list.
   *
   * @param props  Current list properties.
   * @returns The list root element classname list.
   */
  _getClassName(t) {
    return [this.name, t.className];
  }
  /**
   * Get final rendered item list.
   *
   * @param props  Current list properties.
   * @returns Item list.
   */
  _getItems(t) {
    let { items: e = [] } = t;
    return typeof e == "function" ? e = e.call(this) : Array.isArray(e) || (e = []), e;
  }
  /**
   * Render items.
   *
   * @param props  props  Current list properties.
   * @param items  Render items.
   * @returns React render children.
   */
  _renderItems(t, e) {
    return this._renderedItems = e.map((s, i) => {
      const r = this._getItem(t, s, i);
      return r || void 0;
    }), this._renderedItems.reduce((s, i, r) => (i && s.push(this._renderItem(t, i, r)), s), []);
  }
  /**
   * Get root element rendered children.
   *
   * @param props Current list properties.
   * @returns React render children.
   */
  _getChildren(t) {
    const e = this._getItems(t);
    this._items = e;
    const s = this._renderItems(t, e);
    return t.children && s.push(t.children), s;
  }
  /**
   * Get root element rendered component type.
   *
   * @param props Current list properties.
   * @returns React component type.
   */
  _getComponent(t) {
    return t.component || this.constructor.TAG;
  }
};
ot.NAME = "";
ot.ITEM_NAME = "item";
ot.TAG = "ul";
ot.ItemComponents = {
  default: X,
  divider: [X, { className: "divider" }],
  space: [X, (n) => {
    const { space: t, flex: e, style: s } = n;
    return {
      style: { width: t, height: t, flex: e, ...s }
    };
  }]
};
ot.defaultItemProps = {
  component: "li"
};
ot.defaultItemPropsMap = {};
ot.defaultItemType = "item";
const Yl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  CommonList: ot
}, Symbol.toStringTag, { value: "Module" }));
class hi extends B {
}
hi.NAME = "CommonList";
hi.Component = ot;
hi.replace = ot.TAG;
rt(Yl);
function Jl(n) {
  if (n.indexOf("#") === 0 && (n = n.slice(1)), n.length === 3 && (n = n[0] + n[0] + n[1] + n[1] + n[2] + n[2]), n.length !== 6)
    throw new Error(`Invalid HEX color "${n}".`);
  return [
    parseInt(n.slice(0, 2), 16),
    // r
    parseInt(n.slice(2, 4), 16),
    // g
    parseInt(n.slice(4, 6), 16)
    // b
  ];
}
function Zl(n) {
  const [t, e, s] = typeof n == "string" ? Jl(n) : n;
  return t * 0.299 + e * 0.587 + s * 0.114 > 186;
}
function sr(n, t) {
  return Zl(n) ? (t == null ? void 0 : t.dark) ?? "#333333" : (t == null ? void 0 : t.light) ?? "#ffffff";
}
function ir(n, t = 255) {
  return Math.min(Math.max(n, 0), t);
}
function Xl(n, t, e) {
  n = n % 360 / 360, t = ir(t), e = ir(e);
  const s = e <= 0.5 ? e * (t + 1) : e + t - e * t, i = e * 2 - s, r = (o) => (o = o < 0 ? o + 1 : o > 1 ? o - 1 : o, o * 6 < 1 ? i + (s - i) * o * 6 : o * 2 < 1 ? s : o * 3 < 2 ? i + (s - i) * (2 / 3 - o) * 6 : i);
  return [
    r(n + 1 / 3) * 255,
    r(n) * 255,
    r(n - 1 / 3) * 255
  ];
}
function Ql(n) {
  let t = 0;
  if (typeof n != "string" && (n = String(n)), n && n.length)
    for (let e = 0; e < n.length; ++e)
      t += (e + 1) * n.charCodeAt(e);
  return t;
}
function tc(n, t) {
  return /^[\u4e00-\u9fa5\s]+$/.test(n) ? n.length <= t ? n : n.substring(n.length - t) : /^[A-Za-z\d\s]+$/.test(n) ? n[0].toUpperCase() : n.length <= t ? n : n.substring(0, t);
}
let qn = class extends H {
  render() {
    const {
      className: t,
      style: e,
      size: s = "",
      circle: i,
      rounded: r,
      background: o,
      foreColor: a,
      icon: l,
      text: c,
      code: u,
      maxTextLength: h = 2,
      src: m,
      hueDistance: f = 43,
      saturation: _ = 0.4,
      lightness: g = 0.6,
      children: y,
      ...v
    } = this.props, w = ["avatar", t], b = { ...e, background: o, color: a };
    let C = 32;
    s && (typeof s == "number" ? (b.width = `${s}px`, b.height = `${s}px`, b.fontSize = `${Math.max(12, Math.round(s / 2))}px`, C = s) : (w.push(`size-${s}`), C = { xs: 20, sm: 24, lg: 48, xl: 80 }[s])), i ? w.push("circle") : r && (typeof r == "number" ? b.borderRadius = `${r}px` : w.push(`rounded-${r}`));
    let k;
    if (m)
      w.push("has-img"), k = /* @__PURE__ */ p("img", { className: "avatar-img", src: m, alt: c });
    else if (l)
      w.push("has-icon"), k = /* @__PURE__ */ p(Q, { icon: l });
    else if (c != null && c.length) {
      const x = tc(c, h);
      if (w.push("has-text", `has-text-${x.length}`), o === void 0) {
        const I = u ?? c, M = (typeof I == "number" ? I : Ql(I)) * f % 360;
        if (b.background = `hsl(${M},${_ * 100}%,${g * 100}%)`, !a) {
          const E = Xl(M, _, g);
          b.color = sr(E);
        }
      } else
        !a && o && (b.color = sr(o));
      let A;
      C && C < 14 * x.length && (A = { transform: `scale(${C / (14 * x.length)})`, whiteSpace: "nowrap" }), k = /* @__PURE__ */ p("div", { "data-actualSize": C, className: "avatar-text", style: A, children: x });
    }
    return /* @__PURE__ */ p(
      "div",
      {
        className: T(w),
        style: b,
        ...v,
        children: [
          k,
          y
        ]
      }
    );
  }
};
const ec = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Avatar: qn
}, Symbol.toStringTag, { value: "Module" }));
let Ct = class extends ot {
  _isBtnType({ type: t }) {
    return t === "item" || t === "dropdown";
  }
  _getItem(t, e, s) {
    e.type || (e = d.extend({ type: e.dropdown || e.items ? "dropdown" : "item" }, e));
    let i = super._getItem(t, e, s);
    return i && (this._isBtnType(i) && (i = W({}, this._shareBtnProps, i)), i);
  }
  _beforeRender(t) {
    const { btnProps: e, btnType: s, size: i } = t;
    this._shareBtnProps = W({}, e, to({ btnType: s, size: i }));
  }
};
Ct.NAME = "btn-group";
Ct.TAG = "nav";
Ct.ItemComponents = {
  ...ot.ItemComponents,
  default: U
};
Ct.defaultItemProps = {
  component: void 0
};
const Gn = class fo extends Ct {
  _getProps(t) {
    const { gap: e } = t, s = super._getProps(t);
    return e && (typeof e == "number" ? s.className = T(s.className, `gap-${e}`) : s.style = d.extend(s.style || {}, { gap: e })), s;
  }
  _getItem(t, e, s) {
    const i = super._getItem(t, e, s);
    if (!i)
      return i;
    const { type: r } = i, o = r === "btn-group" || r === "btnGroup";
    return o && (i.btnProps = W({}, this._shareBtnProps, i.btnProps)), (o || r === "dropdown") && !i.relativeTarget && (i.relativeTarget = t.relativeTarget), i;
  }
  static render(t, e, s, i) {
    let r = typeof t == "function" ? t.call(i ?? this, ...e) : t;
    if (r)
      return Array.isArray(r) && (r = {
        items: r
      }), s && (r = W(s, r)), /* @__PURE__ */ p(fo, { ...r });
  }
};
Gn.NAME = "toolbar";
Gn.defaultProps = {
  btnProps: {
    btnType: "ghost"
  }
};
Gn.ItemComponents = {
  ...Ct.ItemComponents,
  btnGroup: Ct,
  "btn-group": Ct
};
let St = Gn;
const nc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Toolbar: St
}, Symbol.toStringTag, { value: "Module" }));
class Yn extends X {
  constructor(t) {
    super(t), this._handleChange = (e) => {
      const { onChange: s } = this.props, i = e.target.indeterminate ? "indeterminate" : e.target.checked;
      s && s.call(this, e, i), this._controlled || this.setState({ checked: i });
    }, this.state = {
      checked: t.checked ?? t.defaultChecked ?? !1
    }, this._controlled = t.checked !== void 0;
  }
  get checked() {
    return this._controlled ? this.props.checked : this.state.checked;
  }
  _getClassName(t) {
    const { disabled: e, type: s = "checkbox" } = t, { checked: i } = this;
    return [t.className, s === "switch" ? s : `${s}-primary`, {
      disabled: e,
      checked: i === !0,
      indeterminate: i === "indeterminate"
    }];
  }
  _getChildren(t) {
    const { name: e, type: s, value: i, id: r, label: o } = t, { checked: a } = this;
    return [
      e ? /* @__PURE__ */ p(
        "input",
        {
          type: s === "radio" ? s : "checkbox",
          name: e,
          id: r,
          value: i,
          onChange: this._handleChange,
          indeterminate: a === "indeterminate",
          checked: typeof a == "boolean" ? a : void 0
        },
        "input"
      ) : null,
      /* @__PURE__ */ p("label", { htmlFor: r, children: /* @__PURE__ */ p(V, { content: o }) }, "label")
    ];
  }
}
class sc extends Yn {
}
sc.defaultProps = {
  type: "radio"
};
class ic extends Yn {
}
ic.defaultProps = {
  type: "switch"
};
class je extends X {
  _renderLeading(t) {
    const {
      icon: e,
      avatar: s,
      toggleIcon: i,
      leading: r,
      leadingClass: o,
      checked: a,
      checkbox: l,
      multiline: c
    } = t, u = [];
    if (i && u.push(/* @__PURE__ */ p(V, { content: i }, "toggleIcon")), a !== void 0 && u.push(/* @__PURE__ */ p(Yn, { className: "item-checkbox", checked: a, ...l }, "checkbox")), e && u.push(/* @__PURE__ */ p(Q, { className: "item-icon", icon: e }, "icon")), s) {
      const m = typeof s == "function" ? s.call(this, t) : s;
      m && (m.className = T("item-avatar", m.className), u.push(/* @__PURE__ */ p(qn, { ...m }, "avatar")));
    }
    const h = r ? /* @__PURE__ */ p(V, { content: r }, "leading") : null;
    return h && u.push(h), c ? u.length ? [
      /* @__PURE__ */ p("div", { className: T("item-leading", o), children: u }, "leading")
    ] : [] : u;
  }
  _renderContent(t, e) {
    const {
      textClass: s,
      titleClass: i,
      titleAttrs: r,
      subtitle: o,
      subtitleClass: a,
      url: l,
      target: c,
      content: u,
      contentClass: h,
      contentAttrs: m
    } = t, f = l && !e, _ = f ? "a" : "div";
    let { title: g, text: y } = t;
    return g === void 0 && (g = y, y = null), [
      /* @__PURE__ */ p("div", { className: T("item-content", h), ...m, children: [
        g ? /* @__PURE__ */ p(_, { className: T("item-title", i), href: f ? l : void 0, target: f ? c : void 0, ...r, children: /* @__PURE__ */ p(V, { content: g }) }, "title") : null,
        o ? /* @__PURE__ */ p("div", { className: T("item-subtitle", a), children: /* @__PURE__ */ p(V, { content: o }) }, "subtitle") : null,
        y ? /* @__PURE__ */ p("div", { className: T("item-text text", s), children: y }, "text") : null,
        u ? /* @__PURE__ */ p(V, { content: u }, "extraContent") : null
      ] }, "content")
    ];
  }
  _renderTrailing(t) {
    const {
      multiline: e,
      trailing: s,
      trailingClass: i,
      trailingIcon: r,
      actions: o
    } = t, a = [];
    r && a.push(/* @__PURE__ */ p(Q, { className: "item-trailing-icon", icon: r }, "trailing-icon")), o && a.push(St.render(o, [t], { key: "actions", relativeTarget: t, size: "sm" }, this));
    const l = s ? /* @__PURE__ */ p(V, { content: s }, "trailing") : null;
    return l && a.push(l), e ? a.length ? [
      /* @__PURE__ */ p("div", { className: T("item-trailing", i), children: [
        a,
        l
      ] }, "trailing")
    ] : [] : a;
  }
  _render(t, e) {
    const {
      innerComponent: s,
      innerClass: i,
      innerAttrs: r,
      url: o,
      actions: a,
      target: l,
      active: c,
      disabled: u,
      divider: h,
      checked: m,
      multiline: f,
      title: _,
      subtitle: g,
      hint: y,
      selected: v
    } = t, w = s || (o && !a ? "a" : "div"), b = w === "a", C = W({
      key: "item",
      title: y,
      className: T("listitem", i, {
        active: c,
        disabled: u,
        "has-divider": h,
        selected: v,
        checked: m,
        multiline: f ?? !!(_ && g),
        state: b && !u
      })
    }, b ? { href: o || "javascript:;", target: l } : null, e, r);
    return /* @__PURE__ */ p(w, { ...C, children: [
      this._renderLeading(t),
      this._renderContent(t, b),
      this._renderTrailing(t)
    ] });
  }
  _onRender(t, e, s, i) {
    const r = Object.keys(e).reduce((o, a) => (a.startsWith("data-") && (o[a] = e[a], delete e[a]), o), {});
    return [t, e, [this._render(i, r), ...xn(s)]];
  }
}
class Jn extends ot {
  constructor(t) {
    super(t), this._activeSet = new Cn(() => {
      const e = /* @__PURE__ */ new Set(), { active: s } = this.props;
      Array.isArray(s) ? s.forEach((r) => e.add(r)) : typeof s == "string" ? e.add(s) : s && Object.keys(s).forEach((r) => s[r] && e.add(r));
      const { activeMap: i } = this.state;
      return Object.keys(i).forEach((r) => i[r] ? e.add(r) : e.delete(r)), e;
    }, () => [this.state.activeMap, this.props.active]), this.state = {
      checked: {},
      activeMap: {}
    };
  }
  get namespace() {
    return `.zui.${this.constructor.NAME}.list_${this.gid}`;
  }
  componentDidMount() {
    this._afterRender(!0), this.tryLoad(), this.props.activeOnHover && !this.props.multipleActive && d(this.element).on(`mouseenter${this.namespace}`, "[z-item]", (t) => {
      const e = this._getItemFromEvent(t);
      e && e.renderedItem.type === "item" && !e.renderedItem.disabled && !this.isActive(e.key) && this.toggleActive(e.key, !0);
    });
  }
  componentDidUpdate() {
    this._afterRender(!1), this.tryLoad();
  }
  componentWillUnmount() {
    var t;
    d(this.element).off(this.namespace), (t = this.props.beforeDestroy) == null || t.call(this);
  }
  setItems(t, e) {
    const { onLoadFail: s } = this.props;
    this.setState({
      loading: !1,
      items: t || [],
      loadFailed: e ? (typeof s == "function" ? s.call(this, e) : s) || String(e) : void 0
    });
  }
  load() {
    const { items: t, onLoad: e } = this.props;
    this._loadedSetting = t, this.setState({ loading: !0, items: [] }, async () => {
      try {
        const s = await ii(t, [this], { throws: !0 });
        this.setItems((e == null ? void 0 : e.call(this, s)) || s);
      } catch (s) {
        this.setItems(void 0, s);
      }
    });
  }
  tryLoad() {
    const { loading: t } = this.state, { items: e } = this.props;
    return t || !e || Array.isArray(e) || e === this._loadedSetting ? !1 : (this.load(), !0);
  }
  isChecked(t, e, s = !1) {
    const i = (typeof e == "number" ? this._items[e] : this.getItem(t)) || {};
    return this.state.checked[t] ?? i.checked ?? s;
  }
  isAllChecked() {
    return this._renderedItems.every(({ key: t }, e) => this.isChecked(t, e) === !0);
  }
  toggleAllChecked(t) {
    return t === void 0 && (t = !this.isAllChecked()), this.toggleChecked(this._renderedItems.map((e) => e.key), t);
  }
  async toggleChecked(t, e) {
    let s;
    if (Array.isArray(t)) {
      if (!t.length)
        return;
      e === void 0 && (e = !this.isChecked(t[0])), s = t.reduce((i, r) => (i[r] = e, i), {});
    } else if (typeof t == "object")
      s = t;
    else {
      const i = this.isChecked(t);
      e === void 0 && (e = !i), s = { [t]: e };
    }
    Object.keys(s).length && await this.changeState((i) => ({
      checked: {
        ...i.checked,
        ...s
      }
    }), () => {
      var r;
      const i = this.state.checked;
      (r = this.props.onCheck) == null || r.call(this, s, Object.keys(i).filter((o) => i[o] === !0));
    });
  }
  getChecks() {
    return this._renderedItems.reduce((t, { key: e }, s) => (e !== void 0 && this.isChecked(e, s) === !0 && t.push(e), t), []);
  }
  isActive(t) {
    return typeof t == "object" && (t = t.key), this._activeSet.cache.has(t);
  }
  getActiveKeys() {
    return [...this._activeSet.value];
  }
  getActiveKey() {
    return this.getActiveKeys()[0];
  }
  async toggleActive(t, e) {
    typeof t == "string" && (t = [t]), t.length && (e = e ?? !this.isActive(t[0]), await this.changeState((s) => ({ activeMap: this.props.multipleActive ? t.reduce((r, o) => (r[o] = e, r), { ...s.activeMap }) : { [t[0]]: e } }), () => {
      var s;
      (s = this.props.onActive) == null || s.call(this, t, e);
    }));
  }
  getNextItem(t, e, s = 1, i = void 0) {
    if (i = i || this._renderedItems, t === void 0)
      return i.at(s ? 0 : -1);
    const r = i.length;
    let o = i.findIndex((l) => l.key === t);
    if (o < 0 || r < 2)
      return i.at(s ? 0 : -1);
    let a = 0;
    for (e = e || ((l) => l.type === "item" && !l.disabled); a < r; ) {
      o = (o + s + r) % r;
      const l = i[o];
      if (l && e.call(this, l, o))
        return l;
      a++;
    }
  }
  getPrevItem(t, e) {
    return this.getNextItem(t, e, -1);
  }
  activeNext(t, e = 1) {
    const s = this.getNextItem(this.getActiveKey(), t, e);
    s && this.toggleActive(s.key);
  }
  activePrev(t) {
    this.activeNext(t, -1);
  }
  _afterRender(t) {
    var e;
    (e = this.props.afterRender) == null || e.call(this, t);
  }
  _getItems(t) {
    const { items: e } = t, { items: s } = this.state;
    return s || (Array.isArray(e) ? e : []);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _getRenderedItem(t, e, s) {
    const { divider: i, multiline: r } = t;
    e = W({}, to({
      divider: i,
      multiline: r
    }), e);
    const { itemName: o, name: a } = this;
    if (e.innerClass = [o ? `${o}-inner${a ? ` ${a}-${e.type}-inner` : ""}` : "", e.innerClass], e.type === "item") {
      const { checkbox: l } = t;
      l && (e.checked = this.isChecked(e.key, s, e.checked), typeof l == "object" && (e.checkbox = e.checkbox ? d.extend({}, l, e.checkbox) : l), t.selectOnChecked && e.checked === !0 && (e.selected = !0)), e.active === void 0 && this.isActive(e) && (e.active = !0);
    }
    return e.icon && (this._hasIcons = !0), e.checked !== void 0 && (this._hasCheckbox = !0), e;
  }
  _getItem(t, e, s) {
    const i = super._getItem(t, e, s);
    return i && this._getRenderedItem(t, i, s);
  }
  _renderItem(t, e, s) {
    return e.type === "item" && this._hasIcons && e.icon === void 0 && (e.icon = "EMPTY"), super._renderItem(t, e, s);
  }
  _handleClick(t) {
    const e = super._handleClick(t);
    let { checkOnClick: s } = this.props;
    if (s === "any" ? s = ".item-checkbox,.item-content,.item-icon" : s === !0 && (s = ".item-checkbox"), s && e && t.target.closest(s)) {
      this.toggleChecked(e.key), t.stopPropagation();
      return;
    }
    return e;
  }
  _getClassName(t) {
    const { loading: e, loadFailed: s } = this.state;
    return [super._getClassName(t), e ? "loading" : s ? "is-load-failed" : ""];
  }
  _getProps(t) {
    const { className: e, ...s } = super._getProps(t);
    return {
      ...s,
      className: T(e, this._hasIcons ? "has-icons" : "", this._hasCheckbox ? "has-checkbox" : "")
    };
  }
  _getChildren(t) {
    this._hasIcons = !1, this._hasCheckbox = !1, this._activeSet.compute();
    const e = super._getChildren(t), { loadFailed: s } = this.state;
    return s && e.push(s), e;
  }
}
Jn.ItemComponents = {
  ...ot.ItemComponents,
  default: X,
  item: je,
  heading: je
};
Jn.NAME = "list";
const ps = "```ZUI_STR\n";
class tn {
  /**
   * Create new store instance.
   * @param id   Store profile ID.
   * @param type Store type.
   */
  constructor(t = "", e = "local") {
    this._type = e, this._id = t, this._name = `ZUI_STORE:${this._id}`, this._storage = e === "local" ? localStorage : sessionStorage;
  }
  /**
   * Get store type.
   */
  get type() {
    return this._type;
  }
  /**
   * Get session type store instance.
   */
  get session() {
    return this.type === "session" ? this : (this._altStorage || (this._altStorage = new tn(this._id, "session")), this._altStorage);
  }
  _getKey(t) {
    return `${this._name}:${t}`;
  }
  /**
   * Switch store profile.
   *
   * @param id Store profile ID.
   */
  switch(t) {
    this._id = t, this._name = `ZUI_STORE:${this._id}`;
  }
  /**
   * Get value from store.
   *
   * @param key          Key to get.
   * @param defaultValue Default value to return if key is not found.
   * @returns Value of key or defaultValue if key is not found.
   */
  get(t, e) {
    const s = this._storage.getItem(this._getKey(t));
    if (typeof s == "string") {
      if (s.startsWith(ps))
        return s.substring(ps.length);
      try {
        return JSON.parse(s);
      } catch {
      }
    }
    return s ?? e;
  }
  /**
   * Set key-value pair in store.
   *
   * @param key Key to set.
   * @param value Value to set.
   */
  set(t, e) {
    if (e == null)
      return this.remove(t);
    this._storage.setItem(this._getKey(t), typeof e == "string" ? `${ps}${e}` : JSON.stringify(e));
  }
  /**
   * Remove key-value pair from store.
   *
   * @param key Key to remove.
   */
  remove(t) {
    this._storage.removeItem(this._getKey(t));
  }
  /**
   * Iterate all key-value pairs in store.
   *
   * @param callback Callback function to call for each key-value pair in the store.
   */
  each(t) {
    for (let e = 0; e < this._storage.length; e++) {
      const s = this._storage.key(e);
      if (s != null && s.startsWith(this._name)) {
        const i = this._storage.getItem(s);
        typeof i == "string" && t(s.substring(this._name.length + 1), JSON.parse(i));
      }
    }
  }
  /**
   * Get all key values in store.
   *
   * @returns All key-value pairs in the store.
   */
  getAll() {
    const t = {};
    return this.each((e, s) => {
      t[e] = s;
    }), t;
  }
}
const Ns = new tn("DEFAULT");
function rc(n, t = "local") {
  return new tn(n, t);
}
Object.assign(Ns, { create: rc });
function po(n, t) {
  const { children: e } = n;
  e.length && e.forEach((s) => {
    t(s), po(s, t);
  });
}
function oc(n, t) {
  let e = n.parent;
  for (; e; )
    t(e), e = e.parent;
}
function ms(n) {
  return n.split(":").reduce((t, e, s) => (t.push(s ? t[s - 1] + ":" + e : e), t), []);
}
function ui(n, t, e, s, i = 0, r) {
  return n.reduce((o, a, l) => {
    if (!a)
      return o;
    const c = String((t ? a[t] : a.key) ?? a.key ?? l), u = r ? `${r.keyPath}:${c}` : c, h = {
      key: c,
      level: i,
      keyPath: u,
      parentKey: r == null ? void 0 : r.keyPath,
      parent: r,
      data: a,
      children: []
    };
    return r && r.children.push(h), o = e(o, h), Array.isArray(a.items) ? ui(a.items, t, e, o, i + 1, h) : o;
  }, s);
}
function ac(n, t, e = /* @__PURE__ */ new Map()) {
  return ui(n, t, (s, i) => (s.set(i.keyPath, i), s), e);
}
class ke extends Jn {
  constructor(t) {
    super(t);
    const { defaultNestedShow: e, preserve: s, nestedShow: i } = t;
    if (d.extend(
      this.state,
      typeof e == "boolean" ? { defaultShow: e, nestedShow: {} } : { nestedShow: e || {} },
      i !== void 0 ? { nestedShow: i } : null
    ), s && i === void 0) {
      this._storeID = `${this.constructor.NAME}:${s}:state`;
      const r = Ns.get(this._storeID);
      r && d.extend(this.state, r);
    }
    if (!t.level) {
      const r = this.state.nestedShow;
      r && Object.keys(r).forEach((o) => {
        r[o] && ms(o).forEach((a) => {
          r[a] = !0;
        });
      }), this._needInitChecks = !0;
    }
    this._renderedItemMap = /* @__PURE__ */ new Map(), this._handleHover = this._handleHover.bind(this), this._handleClick = this._handleClick.bind(this), this._beforeRenderNestedItem = this._beforeRenderNestedItem.bind(this), this._handleNestedToggle = this._handleNestedToggle.bind(this), this._handleNestedCheck = this._handleNestedCheck.bind(this), this._preserveState = this._preserveState.bind(this);
  }
  get isRoot() {
    return !this.props.level;
  }
  get nestedShow() {
    return this.props.nestedShow ?? this.state.nestedShow ?? !1;
  }
  get isHoverTrigger() {
    return this.props.nestedTrigger === "hover";
  }
  setItems(t, e) {
    this.isRoot && (this._needInitChecks = !0), super.setItems(t, e);
  }
  getItemMap() {
    return this._itemMap || (this._itemMap = ac(this._items, this.props.itemKey)), this._itemMap;
  }
  getRenderedItem(t) {
    return this._renderedItemMap.get(t);
  }
  getItem(t) {
    var s;
    if (this._itemMap)
      return (s = this._itemMap.get(t)) == null ? void 0 : s.data;
    const e = this.getRenderedItem(t);
    return e ? e._item : super.getItem(t);
  }
  isExpanded(t) {
    const { nestedShow: e } = this;
    return typeof e == "boolean" ? e : !!(e[t] ?? this.state.defaultShow);
  }
  async toggle(t, e) {
    const s = this.isExpanded(t);
    if (e === s)
      return;
    e === void 0 && (e = !s);
    const { nestedShow: i, onToggle: r, accordion: o } = this.props;
    r && r.call(this, t, e) === !1 || i === void 0 && await this.changeState((a) => {
      let l = {
        ...a.nestedShow,
        [t]: e
      };
      if (e && o) {
        let c = `${t.split(":").slice(0, -1).join(":")}`;
        c.length && (c += ":"), Object.keys(l).forEach((u) => {
          u !== t && u.startsWith(c) && (l[u] = !1);
        });
      }
      return l = e ? ms(t).reduce((c, u) => (c[u] = e, c), l) : l, this.isHoverTrigger && !e && Object.keys(l).forEach((c) => {
        !l[c] || !c.startsWith(`${t}:`) || ms(t).forEach((u) => {
          l[u] = !0;
        });
      }), {
        nestedShow: l
      };
    }, this._preserveState);
  }
  toggleAll(t) {
    if (this.props.nestedShow === void 0)
      return this.setState({ nestedShow: {}, defaultShow: t }, this._preserveState);
  }
  getChecks() {
    return Array.from(this.getItemMap().values()).reduce((t, { keyPath: e, data: s }) => {
      const i = this.state.checked[e];
      return (i === !0 || s.checked && i !== !1) === !0 && t.push(e), t;
    }, []);
  }
  isChecked(t, e, s = !1) {
    const i = (typeof e == "number" ? this._items[e] : this.getItem(t)) || {};
    return this.isRoot ? this.state.checked[t] ?? i.checked ?? s : this.props.checkedState[`${this.props.parentKey}:${t}`] ?? i.checked ?? s;
  }
  async toggleChecked(t, e) {
    let s;
    if (Array.isArray(t)) {
      if (!t.length)
        return;
      e === void 0 && (e = !this.isChecked(t[0])), s = t.reduce((a, l) => (a[l] = e, a), {});
    } else
      typeof t == "object" ? s = t : (e === void 0 && (e = !this.isChecked(t)), s = { [t]: e });
    if (!Object.keys(s).length)
      return;
    if (this.isRoot) {
      const a = this.getItemMap();
      await this.changeState(({ checked: l }) => {
        const c = (u) => s[u.keyPath] ?? l[u.keyPath] ?? u.data.checked ?? !1;
        return Object.keys(s).forEach((u) => {
          e = s[u];
          const h = a.get(u);
          h && (po(h, (m) => {
            c(m) !== e && (s[m.keyPath] = e);
          }), oc(h, (m) => {
            const { children: f } = m, _ = f.reduce((g, y) => (c(y) && g++, g), 0);
            s[m.keyPath] = _ === f.length ? !0 : _ ? "indeterminate" : !1;
          }));
        }), {
          checked: {
            ...l,
            ...s
          }
        };
      }, () => {
        var c;
        const l = this.state.checked;
        (c = this.props.onCheck) == null || c.call(this, s, Object.keys(l).filter((u) => l[u] === !0));
      });
      return;
    }
    const { parentKey: i, onCheck: r } = this.props, o = Object.keys(s).reduce((a, l) => (a[`${i !== void 0 ? `${i}:` : ""}${l}`] = s[l], a), {});
    r.call(this, o, []);
  }
  getKeyPath(t) {
    if (this.isRoot)
      return t;
    const e = this.props.parentKey;
    return t.startsWith(e + ":") ? t : `${e}:${t}`;
  }
  isActive(t) {
    if (typeof t == "object") {
      const e = t._keyPath ?? t.key;
      if (e === void 0)
        return !1;
      t = e;
    }
    return this._activeSet.cache.has(this.getKeyPath(t));
  }
  async toggleActive(t, e) {
    if (typeof t == "string" && (t = [t]), t = t.map((s) => this.getKeyPath(s)), this.isRoot) {
      await super.toggleActive(t, e), this.props.toggleOnActive && t.forEach((s) => {
        this.isActive(s) && !this.isExpanded(s) && this.toggle(s, !0);
      });
      return;
    }
    this.props.onActive.call(this, t, e ?? !this.isActive(t[0]));
  }
  activeNext(t, e = 1) {
    const s = this.getNextItem(this.getActiveKey(), t, e);
    s && this.toggleActive(s._keyPath);
  }
  getNextItem(t, e, s = 1, i = void 0) {
    return i = i || ui(this._items, this.props.itemKey, (r, o) => (r.push({
      _keyPath: o.keyPath,
      type: "item",
      ...o.data,
      ...this._renderedItemMap.get(o.keyPath),
      key: o.keyPath
    }), r), []), super.getNextItem(t, e, s, i);
  }
  _afterRender(t) {
    if (super._afterRender(t), this._needInitChecks) {
      const e = {};
      this.getItemMap().forEach((i) => {
        i.data.checked !== void 0 && (e[i.keyPath] = i.data.checked);
      }), this.toggleChecked(e), this._needInitChecks = !1;
    }
  }
  _preserveState() {
    this._storeID && Ns.set(this._storeID, this.state);
  }
  _getClassName(t) {
    return [super._getClassName(t), "is-nested", t.level ? "is-nested-sub" : "is-nested-root"];
  }
  _getNestedProps(t, e, s, i) {
    const {
      parentKey: r,
      level: o = 0
    } = t, { isRoot: a } = this;
    return W(this.constructor.inheritNestedProps.reduce((l, c) => (l[c] = t[c], l), {}), {
      key: s.key,
      level: o + 1,
      className: `is-nested-${i ? "expanded" : "collapsed"}`,
      items: e,
      parentKey: r ? `${r}:${s.key}` : s.key,
      nestedShow: this.nestedShow,
      defaultNestedShow: this.state.defaultShow,
      checkedState: t.checkedState || this.state.checked,
      onCheck: a ? this._handleNestedCheck : t.onCheck,
      onToggle: a ? this._handleNestedToggle : t.onToggle,
      beforeRenderItem: a ? this._beforeRenderNestedItem : t.beforeRenderItem,
      active: a ? this.getActiveKeys() : t.active,
      onActive: a ? this.toggleActive.bind(this) : t.onActive
    }, s.listProps);
  }
  _renderNestedList(t, e, s, i) {
    if (!i && !t.renderCollapsedList)
      return;
    const r = this._getNestedProps(t, e, s, i), o = this.constructor;
    return /* @__PURE__ */ p(o, { ...r }, `nested:${s.key}`);
  }
  _renderNestedToggle(t, e) {
    let s, i = "";
    const { toggleIcons: r = {} } = t;
    return typeof e == "boolean" ? (s = e ? r.expanded || /* @__PURE__ */ p("span", { className: "caret-down" }) : r.collapsed || /* @__PURE__ */ p("span", { className: "caret-right" }), i = `state is-${e ? "expanded" : "collapsed"}`) : (s = /* @__PURE__ */ p(Q, { icon: r.normal }), i = "is-empty"), /* @__PURE__ */ p("span", { className: T(`${this.name}-toggle nested-toggle-icon`, i), children: s });
  }
  _getItems(t) {
    const e = super._getItems(t);
    return this.isRoot && e !== this._items && (this._itemMap = void 0), e;
  }
  _getItem(t, e, s) {
    const i = super._getItem(t, e, s) ?? e;
    if (!i)
      return i;
    const { parentKey: r } = t, o = i.key, a = `${r !== void 0 ? `${r}:` : ""}${o}`;
    if (i.items) {
      const l = i.expanded ?? this.isExpanded(a);
      W(i, {
        expanded: l,
        className: ["is-nested", `is-nested-${l ? "show" : "hide"}`]
      }), this._hasNestedItems = !0;
    }
    return W(i, {
      _level: t.level,
      _keyPath: a,
      parentKey: r
    });
  }
  _beforeRenderNestedItem(t) {
    return this._renderedItemMap.set(t._keyPath, t), t;
  }
  _renderItem(t, e, s) {
    this._hasNestedItems && e.type === "item" && e.toggleIcon === void 0 && (e.toggleIcon = this._renderNestedToggle(t, e.expanded));
    const i = e.items ? this._renderNestedList(t, e.items, e, e.expanded) : null;
    return e = W(e, {
      "z-parent": e.parentKey,
      "z-key-path": e._keyPath
    }, this._needHandleHover ? {
      onMouseEnter: this._handleHover,
      onMouseLeave: this._handleHover
    } : null, i ? { children: i } : null), this._renderedItemMap.set(e._keyPath, e), super._renderItem(t, e, s);
  }
  _getItemFromEvent(t, e) {
    const s = super._getItemFromEvent(t, e);
    if (!s)
      return;
    (t.type === "mouseenter" || t.type === "mouseleave") && (s.hover = t.type === "mouseenter");
    const { parentKey: i } = this.props;
    return { ...s, parentKey: i, keyPath: `${i !== void 0 ? `${i}:` : ""}${s.key}`, target: e || t.target };
  }
  _toggleFromEvent(t) {
    const { item: e, hover: s, event: i, keyPath: r, target: o } = t, { nestedToggle: a } = this.props, { isHoverTrigger: l } = this;
    if (!e.items || i.defaultPrevented || l && s === void 0 || !l && i.type !== "click" || o.closest(".not-nested-toggle") || a && !o.closest(a) || !a && o.closest("a,.btn,.item-checkbox") && !o.closest(".nested-toggle-icon,.item-icon"))
      return t;
    const c = typeof s == "boolean" ? s : void 0;
    this.toggle(r, c);
  }
  _handleNestedToggle(t, e) {
    this.toggle(t, e);
  }
  _handleClick(t) {
    const e = super._handleClick(t);
    return e && this._toggleFromEvent(e);
  }
  _handleHover(t) {
    var i;
    const e = this._getItemFromEvent(t);
    if (!e || ((i = this.props.onHoverItem) == null || i.call(this, e), !this.isHoverTrigger))
      return;
    const s = this._hoverInfo;
    s && (s.info.keyPath === e.keyPath ? clearTimeout(s.timer) : this._toggleFromEvent(s.info)), this._hoverInfo = {
      info: e,
      timer: window.setTimeout(() => {
        this._hoverInfo = void 0, this._toggleFromEvent(e);
      }, e.hover ? 0 : 200)
    };
  }
  _handleNestedCheck(t) {
    this.toggleChecked(t);
  }
  _getProps(t) {
    const { level: e = 0, indent: s = 20, parentKey: i } = t, r = W(super._getProps(t), {
      "z-level": e,
      "z-parent-key": i,
      style: { "--list-nested-indent": `${e * s}px`, "--list-indent": `${s}px` },
      className: this._hasNestedItems ? "has-nested-items" : "no-nested-items"
    });
    return r.className = T(r.className), r;
  }
  _beforeRender(t) {
    return this._renderedItemMap.clear(), this._hasIcons = !1, this._hasNestedItems = !this.isRoot, this._needHandleHover = !!(t.onHoverItem || this.isHoverTrigger), super._beforeRender(t);
  }
}
ke.defaultProps = {
  defaultNestedShow: !1,
  level: 0,
  indent: 20
};
ke.inheritNestedProps = ["component", "name", "itemName", "itemKey", "indent", "hover", "divider", "multiline", "toggleIcons", "nestedToggle", "accordion", "itemRender", "itemProps", "beforeRenderItem", "onToggle", "checkbox", "getItem", "checkOnClick", "selectOnChecked", "checkedState", "onClickItem", "activeOnHover", "multipleActive", "onActive"];
let J = class extends ke {
  _getClassName(t) {
    return T(super._getClassName(t), this._hasNestedItems ? "menu-nested" : "", t.className, t.wrap ? { "scrollbar-thin": t.scrollbarThin, "scrollbar-hover": t.scrollbarHover } : { popup: t.popup, compact: t.compact });
  }
  _getWrapClass(t) {
    return ["menu-wrapper", t.wrapClass, { popup: t.popup, compact: t.compact }];
  }
  _getWrapperProps(t) {
    const { wrapAttrs: e, height: s, maxHeight: i } = t, r = W({}, e, s || i ? { style: { height: s, maxHeight: i } } : null);
    return r.className = T(this._getWrapClass(t), r.className), r;
  }
  _renderWrapperHeader(t) {
    return /* @__PURE__ */ p(V, { content: t.header }, "header");
  }
  _renderWrapperFooter(t) {
    return /* @__PURE__ */ p(V, { content: t.footer }, "footer");
  }
  render(t) {
    const e = super.render(t);
    return t.wrap ? /* @__PURE__ */ p("menu", { ...this._getWrapperProps(t), children: [
      this._renderWrapperHeader(t),
      e,
      this._renderWrapperFooter(t)
    ] }) : super.render(t);
  }
};
J.NAME = "menu";
J.TAG = "menu";
J.inheritNestedProps = [...ke.inheritNestedProps, "compact"];
J.ItemComponents = {
  ...ke.ItemComponents,
  item: [je, { innerComponent: "a" }]
};
J.defaultProps = {
  ...ke.defaultProps,
  scrollbarHover: !0
};
let Zn = class extends H {
  constructor(t) {
    super(t), this._input = K(), this._timer = 0, this._handleClearBtnClick = (e) => {
      e.stopPropagation(), this.clear(e);
    }, this._handleChange = (e) => {
      const s = this.state.value, i = e.target.value, { onChange: r, delay: o } = this.props;
      this.setState({ value: i }, () => {
        !r || s === i || (o ? (this._clearTimer(), this._timer = window.setTimeout(() => {
          r(i, e), this._timer = 0;
        }, o)) : r(i, e));
      });
    }, this._handleFocus = (e) => {
      const s = e.type === "focus";
      this.setState({ focus: s }, () => {
        const i = s ? this.props.onFocus : this.props.onBlur;
        i == null || i(e);
      });
    }, this.state = { focus: !1, value: t.defaultValue || "" }, this._gid = t.id || `search-box-${ut()}`;
  }
  componentDidMount() {
    const { hotkeys: t } = this.props;
    if (t) {
      const e = io(t, {
        clear: {
          keys: "Escape",
          handler: (s) => {
            this.clear(s);
          }
        },
        enter: {
          keys: "Enter",
          handler: (s) => {
            var i, r;
            (r = (i = this.props).onEnter) == null || r.call(i, this.state.value, s);
          }
        }
      });
      e && (this._hotkeysScope = `SearchBox_${this._gid}`, d(this.input).hotkeys(e, {
        scope: this._hotkeysScope,
        event: "keydown"
      }));
    }
  }
  componentWillUnmount() {
    this._hotkeysScope && d(this.input).unbindHotkeys(this._hotkeysScope);
  }
  get id() {
    return this._gid;
  }
  get input() {
    return this._input.current;
  }
  focus() {
    var t;
    (t = this.input) == null || t.focus();
  }
  blur() {
    var t;
    (t = this.input) == null || t.blur();
  }
  clear(t) {
    const e = this.state.value;
    this.setState({ value: "" }, () => {
      const { onChange: s, onClear: i } = this.props;
      i == null || i(t), this.focus(), e.trim() !== "" && (s == null || s("", t));
    });
  }
  _clearTimer() {
    this._timer && clearTimeout(this._timer), this._timer = 0;
  }
  render(t, e) {
    const { style: s, className: i, rootClass: r, rootStyle: o, readonly: a, disabled: l, circle: c, placeholder: u, mergeIcon: h, searchIcon: m, clearIcon: f, value: _, compact: g, prefixClass: y, suffixClass: v } = t, { focus: w, value: b } = e, { id: C } = this, k = _ ?? b, x = typeof k != "string" || !k.trim().length;
    let A, I, M;
    return m && (M = m === !0 ? /* @__PURE__ */ p("span", { class: "magnifier" }) : /* @__PURE__ */ p(Q, { icon: m })), !h && m && (A = /* @__PURE__ */ p("label", { for: C, class: T("input-control-prefix", y), children: M }, "prefix")), f && !x ? I = /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        class: "btn ghost size-sm square rounded-full",
        onClick: this._handleClearBtnClick,
        children: f === !0 ? /* @__PURE__ */ p("span", { class: "close" }) : /* @__PURE__ */ p(Q, { icon: f })
      }
    ) : h && m && (I = M), I && (I = /* @__PURE__ */ p("label", { for: C, class: T("input-control-suffix", v), children: I }, "suffix")), /* @__PURE__ */ p("div", { class: T("search-box input-control", r, { focus: w, empty: x, compact: g, "has-prefix-icon": A, "has-suffix-icon": I }), style: o, children: [
      A,
      /* @__PURE__ */ p(
        "input",
        {
          ref: this._input,
          id: C,
          type: "text",
          class: T("form-control", i, { "rounded-full": c, "size-sm": g }),
          style: s,
          placeholder: u,
          disabled: l,
          readonly: a,
          value: k,
          onInput: this._handleChange,
          onChange: this._handleChange,
          onFocus: this._handleFocus,
          onBlur: this._handleFocus
        },
        "input"
      ),
      I
    ] });
  }
};
Zn.defaultProps = {
  clearIcon: !0,
  searchIcon: !0,
  delay: 500,
  hotkeys: !0
};
const lc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  SearchBox: Zn
}, Symbol.toStringTag, { value: "Module" }));
let yt = class extends J {
  constructor(t) {
    super(t), this._handleSearchChange = (e) => {
      const s = this.constructor.getSearchKeys(e);
      this._searchKeys = s, this.setState({ search: s.join(" ") });
    }, this.state.search = t.search ?? t.defaultSearch, this._searchKeys = this.constructor.getSearchKeys(this.state.search), this._isNestedItemMatch = this._isNestedItemMatch.bind(this);
  }
  componentWillUpdate(t) {
    this.isRoot && t.search !== void 0 && t.search !== this.props.search && (this._searchKeys = this.constructor.getSearchKeys(t.search));
  }
  componentDidMount() {
    super.componentDidMount(), this._updateMatchedParents();
  }
  componentDidUpdate() {
    super.componentDidUpdate(), this._updateMatchedParents();
  }
  isExpanded(t) {
    return this.props.expandOnSearch && this._searchKeys.length ? !0 : super.isExpanded(t);
  }
  _updateMatchedParents() {
    var e;
    if (!this.isRoot)
      return;
    const t = d(this.element);
    t.find(".item.is-nested.is-not-match").filter((s, i) => this._matchedParents.has(i.getAttribute("z-key-path") || "")).addClass("has-match-child"), t.parent().toggleClass("no-match-child", !!((e = this._searchKeys) != null && e.length) && !t.children(".item").not(".is-not-match").length);
  }
  _isItemMatch(t, e, s, i) {
    const { isItemMatch: r } = t, o = r ? r.call(this, e, this._searchKeys, s, i) : this.constructor.isItemMatch(e, this._searchKeys, t.searchProps);
    if (this.isRoot && o && i !== void 0) {
      let a = "";
      String(i).split(":").forEach((l) => {
        a += `${a.length ? ":" : ""}${l}`, this._matchedParents.add(a);
      });
    }
    return o;
  }
  _isNestedItemMatch(t, e, s, i) {
    return this._isItemMatch(this.props, t, s, i);
  }
  _getNestedProps(t, e, s, i) {
    const r = super._getNestedProps(t, e, s, i);
    return this.isRoot && (r.isItemMatch = this._isNestedItemMatch, r.search = this._searchKeys.join(" ")), r;
  }
  _getItem(t, e, s) {
    const i = super._getItem(t, e, s);
    return i && (i.hidden = !this._isItemMatch(t, e, s, t.parentKey), i);
  }
  _renderItem(t, e, s) {
    return e.className = [e.className, e.hidden ? "is-not-match" : ""], t.underlineKeys && this._searchKeys.length && ["text", "title", "subtitle", "content"].forEach((i) => {
      typeof e[i] == "string" && (e[i] = this.constructor.underlineKeys(this._searchKeys, [e[i]]));
    }), super._renderItem(t, e, s);
  }
  _getWrapClass(t) {
    const e = this.isRoot && this._searchKeys.length;
    return T(super._getWrapClass(t), "search-menu", t.searchBox ? `search-menu-on-${t.searchPlacement || "top"}` : "", e ? "is-search-mode" : "", e && t.expandOnSearch ? "no-toggle-on-search" : "");
  }
  _renderSearchBox(t) {
    const { searchBox: e } = t;
    if (!e || !this.isRoot)
      return null;
    const s = {
      compact: !0,
      onChange: this._handleSearchChange
    };
    return typeof e == "object" && d.extend(s, e), t.search !== void 0 && (s.value = this._searchKeys.join(" "), s.disabled = !0), /* @__PURE__ */ p(Zn, { ...s }, "search");
  }
  _renderWrapperHeader(t) {
    const e = t.header, s = this.isRoot && t.searchBox && t.searchPlacement !== "bottom", { noMatchHint: i } = t;
    return !e && !s && !i ? null : [
      i ? /* @__PURE__ */ p("div", { className: "search-menu-no-match-hint", children: i }, "noMatchHint") : null,
      e || s ? /* @__PURE__ */ p("header", { className: "search-menu-header", children: [
        e ? super._renderWrapperHeader(t) : null,
        s ? this._renderSearchBox(t) : null
      ] }, "header") : null
    ];
  }
  _renderWrapperFooter(t) {
    const e = t.footer, s = this.isRoot && t.searchBox && t.searchPlacement === "bottom";
    return !e && !s ? null : /* @__PURE__ */ p("footer", { className: "search-menu-footer", children: [
      e ? super._renderWrapperFooter(t) : null,
      this._renderSearchBox(t)
    ] }, "footer");
  }
  _beforeRender(t) {
    return this.isRoot && (this._matchedParents = /* @__PURE__ */ new Set()), super._beforeRender(t);
  }
  /**
   * Check whether item is matched.
   *
   * @param item          Item to match.
   * @param searchKeys    Search keys.
   * @returns Whether item is matched.
   */
  static isItemMatch(t, e, s = ["keys", "text", "title", "subtitle"]) {
    return e.length ? e.every((i) => s.some((r) => {
      const o = t[r];
      return typeof o == "string" && o.length && o.toLowerCase().includes(i);
    })) : !0;
  }
  /**
   * Convert search string to search keys.
   *
   * @param search    Search string.
   * @returns Search keys array.
   */
  static getSearchKeys(t = "") {
    return d.unique(t.toLowerCase().split(" ").filter((e) => e.length));
  }
  static underlineKeys(t, e, s = "is-match-keys") {
    return t.reduce((i, r) => [...i].reduce((o, a) => {
      if (typeof a != "string")
        return o.push(a), o;
      const l = a.toLowerCase().split(r);
      if (l.length === 1)
        return o.push(a), o;
      let c = 0;
      return l.forEach((u, h) => {
        h && (o.push(/* @__PURE__ */ p("span", { class: s, children: a.substring(c, c + r.length) })), c += r.length), o.push(a.substring(c, c + u.length)), c += u.length;
      }), o;
    }, []), e);
  }
};
yt.inheritNestedProps = [...J.inheritNestedProps, "isItemMatch", "search", "underlineKeys"];
yt.defaultProps = {
  ...J.defaultProps,
  defaultNestedShow: !0,
  wrap: !0
};
const cc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Menu: J,
  SearchMenu: yt
}, Symbol.toStringTag, { value: "Module" }));
class di extends B {
}
di.NAME = "Menu";
di.Component = J;
di.replace = J.TAG;
class fi extends B {
}
fi.NAME = "SearchMenu";
fi.Component = yt;
fi.replace = yt.TAG;
rt(cc);
function hc({
  className: n,
  style: t,
  actions: e,
  heading: s,
  content: i,
  contentClass: r,
  children: o,
  close: a,
  onClose: l,
  icon: c,
  iconClass: u,
  ...h
}) {
  let m;
  a === !0 ? m = /* @__PURE__ */ p(U, { className: "alert-close btn ghost square text-inherit", square: !0, onClick: l, children: /* @__PURE__ */ p("span", { class: "close" }) }) : bt(a) ? m = a : typeof a == "object" && (m = /* @__PURE__ */ p(U, { ...a, onClick: l }));
  const f = St.render(e, []);
  return /* @__PURE__ */ p("div", { className: T("alert", n), style: t, ...h, children: [
    /* @__PURE__ */ p(Q, { icon: c, className: T("alert-icon", u) }),
    typeof i != "string" ? /* @__PURE__ */ p(V, { content: i }) : /* @__PURE__ */ p("div", { className: T("alert-content", r), children: [
      typeof s != "string" ? /* @__PURE__ */ p(V, { content: s }) : s && /* @__PURE__ */ p("div", { className: "alert-heading", children: s }),
      /* @__PURE__ */ p("div", { className: "alert-text", children: i }),
      s ? f : null
    ] }),
    s ? null : f,
    m,
    o
  ] });
}
function uc(n) {
  if (n === "center")
    return "fade-from-center";
  if (n) {
    if (n.includes("top"))
      return "fade-from-top";
    if (n.includes("bottom"))
      return "fade-from-bottom";
  }
  return "fade";
}
function dc({
  margin: n,
  type: t,
  placement: e,
  animation: s,
  show: i,
  className: r,
  time: o,
  ...a
}) {
  return /* @__PURE__ */ p(
    hc,
    {
      className: T("messager", r, t, s === !0 ? uc(e) : s, i ? "in" : ""),
      ...a
    }
  );
}
var fc = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, pc = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, Ee = (n, t, e) => (fc(n, t, "access private method"), e), ee, ue;
class pi extends B {
  constructor() {
    super(...arguments), pc(this, ee), this._show = !1, this._showTimer = 0, this._afterRender = ({ firstRender: t }) => {
      t && this.show();
      const { margin: e } = this.options;
      e && this.$element.css("margin", `${e}px`);
    };
  }
  get isShown() {
    return this._show;
  }
  afterInit() {
    this.on("click", (t) => {
      d(t.target).closest('.alert-close,[data-dismiss="messager"]').length && (t.preventDefault(), t.stopPropagation(), this.hide());
    });
  }
  setOptions(t) {
    return t = super.setOptions(t), {
      ...t,
      show: this._show,
      afterRender: this._afterRender
    };
  }
  show() {
    this.render(), this.emit("show"), Ee(this, ee, ue).call(this, () => {
      this._show = !0, this.render(), Ee(this, ee, ue).call(this, () => {
        this.emit("shown");
        const { time: t } = this.options;
        t && Ee(this, ee, ue).call(this, () => this.hide(), t);
      });
    }, 100);
  }
  hide() {
    this._show && Ee(this, ee, ue).call(this, () => {
      this.emit("hide"), this._show = !1, this.render(), Ee(this, ee, ue).call(this, () => {
        this.emit("hidden");
      });
    }, 50);
  }
}
ee = /* @__PURE__ */ new WeakSet();
ue = function(n, t = 200) {
  this._showTimer && clearTimeout(this._showTimer), this._showTimer = window.setTimeout(() => {
    n(), this._showTimer = 0;
  }, t);
};
pi.NAME = "MessagerItem";
pi.Component = dc;
const Xn = class mo extends Ot {
  get isShown() {
    var t;
    return !!((t = this._item) != null && t.isShown);
  }
  show(t) {
    this.setOptions(t), this._getItem().show();
  }
  hide() {
    var t;
    (t = this._item) == null || t.hide();
  }
  _getItem() {
    if (this._item)
      this._item.setOptions(this.options);
    else {
      const t = this._getHolder(), e = new pi(t, this.options);
      e.on("hidden", () => {
        e.destroy(), t == null || t.remove(), this._holder = void 0, this._item = void 0;
      }), this._item = e;
    }
    return this._item;
  }
  _getHolder() {
    if (this._holder)
      return this._holder;
    const { placement: t = "top" } = this.options;
    let e = this.$element.find(`.messagers-${t}`);
    e.length || (e = d(`<div class="messagers messagers-${t}"></div>`).appendTo(this.$element));
    let s = e.find(`#messager-${this.gid}`);
    return s.length || (s = d(`<div class="messager-holder" id="messager-${this.gid}"></div>`).appendTo(e), this._holder = s[0]), s[0];
  }
  static show(t) {
    typeof t == "string" && (t = { content: t });
    const { container: e, ...s } = t, i = mo.ensure(e || "body", { key: `messager_${ut()}`, ...s });
    return i.hide(), i.show(), i;
  }
};
Xn.NAME = "messager";
Xn.DEFAULT = {
  placement: "top",
  animation: !0,
  close: !0,
  margin: 6,
  time: 5e3
};
Xn.MULTI_INSTANCE = !0;
let gu = Xn;
class mi extends H {
  render(t) {
    const { percent: e = 50, color: s, background: i = null, height: r, width: o, children: a, className: l, style: c } = t;
    return /* @__PURE__ */ p("div", { class: T("progress", l), style: {
      width: o,
      height: r,
      "--progress-bg": i,
      "--progress-bar-color": s,
      ...c
    }, children: [
      /* @__PURE__ */ p("div", { class: "progress-bar", style: { width: `${e}%` } }),
      a
    ] });
  }
}
mi.defaultProps = {
  percent: 50,
  height: 20,
  width: "auto"
};
const mc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ProgressBar: mi
}, Symbol.toStringTag, { value: "Module" }));
rt(mc);
let Qn = class extends H {
  render(t) {
    const { percent: e = 50, size: s = 24, circleBg: i, circleColor: r, text: o, className: a, textStyle: l, textX: c, textY: u, children: h } = t, m = s / 2;
    let { circleWidth: f = 0.1 } = t;
    f < 1 && (f = s * f);
    const _ = (s - f) / 2;
    return /* @__PURE__ */ p("svg", { className: a, width: s, height: s, children: [
      /* @__PURE__ */ p("circle", { cx: m, cy: m, r: _, "stroke-width": f, stroke: i, fill: "transparent" }),
      /* @__PURE__ */ p("circle", { cx: m, cy: m, r: _, "stroke-width": f, stroke: r, fill: "transparent", "stroke-linecap": "round", "stroke-dasharray": Math.PI * _ * 2, "stroke-dashoffset": Math.PI * _ * 2 * (100 - e) / 100, style: { transformOrigin: "center", transform: "rotate(-90deg)" } }),
      o ? /* @__PURE__ */ p("text", { x: c ?? m, y: u ?? m + f / 2, "dominant-baseline": "middle", "text-anchor": "middle", style: l || { fontSize: `${_}px` }, children: o === !0 ? Math.round(e) : o }) : null,
      h
    ] });
  }
};
Qn.defaultProps = {
  circleBg: "var(--color-surface)",
  circleColor: "var(--color-primary-500)",
  text: !0
};
class go extends B {
}
go.NAME = "ProgressCircle";
go.Component = Qn;
const gc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ProgressCircle: Qn
}, Symbol.toStringTag, { value: "Module" }));
rt(gc);
class _o extends B {
}
_o.NAME = "Avatar";
_o.Component = qn;
rt(ec);
class yo extends B {
}
yo.NAME = "BtnGroup";
yo.Component = Ct;
const _c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  BtnGroup: Ct
}, Symbol.toStringTag, { value: "Module" }));
rt(_c);
const Es = Symbol("EVENT_PICK");
class gi extends H {
  constructor(t) {
    super(t), this._handleClick = this._handleClick.bind(this), this._hasInput = !!d(`#${t.id}`).length;
  }
  get hasInput() {
    return this._hasInput;
  }
  _handleClick(t) {
    const { togglePop: e, clickType: s, onClick: i } = this.props;
    let r = s === "open" ? !0 : void 0;
    const o = d(t.target), a = i == null ? void 0 : i(t);
    if (!t.defaultPrevented) {
      if (typeof a == "boolean")
        r = a;
      else {
        if (o.closest('[data-dismiss="pick"]').length) {
          e(!1);
          return;
        }
        if (o.closest("a,input").length)
          return;
      }
      requestAnimationFrame(() => e(r));
    }
  }
  _getClass(t) {
    const { state: e, className: s, disabled: i, readonly: r, pickerName: o, empty: a } = t, { open: l } = e;
    return T(
      "pick",
      s,
      o ? `${o}-pick` : "",
      l && "is-open focus",
      i && "disabled",
      r && "readonly",
      a ? "is-empty-value" : ""
    );
  }
  _getProps(t) {
    const { id: e, style: s, attrs: i } = t;
    return {
      id: `pick-${e}`,
      className: this._getClass(t),
      style: s,
      tabIndex: -1,
      onClick: this._handleClick,
      ...i
    };
  }
  _renderTrigger(t) {
    const { children: e, state: s } = t;
    return e ?? s.value;
  }
  _renderValue(t) {
    const { name: e, state: { value: s = "" }, disabled: i, readonly: r, id: o } = t;
    if (e)
      if (this._hasInput)
        d(`#${o}`).val(s);
      else
        return /* @__PURE__ */ p("input", { id: o, type: "hidden", className: "pick-value", name: e, value: s, readonly: r, disabled: i });
    return null;
  }
  componentDidMount() {
    const { id: t } = this.props;
    d(`#${t}`).on(`change.zui.pick.${t} syncValue.zui.pick.${t}`, (e, s) => {
      if (s === Es)
        return;
      const i = e.target.value;
      this._skipTriggerChange = i, this.props.changeState({ value: i });
    });
  }
  componentWillUnmount() {
    const { id: t } = this.props;
    d(`#${t}`).off(`change.zui.pick.${t}`);
  }
  componentDidUpdate(t) {
    const { id: e, state: s, name: i } = this.props;
    i && t.state.value !== s.value && (this._skipTriggerChange !== s.value && d(`#${e}`).trigger("change", Es), this._skipTriggerChange = !1);
  }
  render(t) {
    return xt(
      t.tagName || "div",
      this._getProps(t),
      this._renderTrigger(t),
      this._renderValue(t)
    );
  }
}
const Gt = Math.min, ct = Math.max, Nn = Math.round, cn = Math.floor, Yt = (n) => ({
  x: n,
  y: n
}), yc = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, vc = {
  start: "end",
  end: "start"
};
function $s(n, t, e) {
  return ct(n, Gt(t, e));
}
function xe(n, t) {
  return typeof n == "function" ? n(t) : n;
}
function Jt(n) {
  return n.split("-")[0];
}
function Te(n) {
  return n.split("-")[1];
}
function vo(n) {
  return n === "x" ? "y" : "x";
}
function _i(n) {
  return n === "y" ? "height" : "width";
}
function en(n) {
  return ["top", "bottom"].includes(Jt(n)) ? "y" : "x";
}
function yi(n) {
  return vo(en(n));
}
function wc(n, t, e) {
  e === void 0 && (e = !1);
  const s = Te(n), i = yi(n), r = _i(i);
  let o = i === "x" ? s === (e ? "end" : "start") ? "right" : "left" : s === "start" ? "bottom" : "top";
  return t.reference[r] > t.floating[r] && (o = En(o)), [o, En(o)];
}
function bc(n) {
  const t = En(n);
  return [Ms(n), t, Ms(t)];
}
function Ms(n) {
  return n.replace(/start|end/g, (t) => vc[t]);
}
function Cc(n, t, e) {
  const s = ["left", "right"], i = ["right", "left"], r = ["top", "bottom"], o = ["bottom", "top"];
  switch (n) {
    case "top":
    case "bottom":
      return e ? t ? i : s : t ? s : i;
    case "left":
    case "right":
      return t ? r : o;
    default:
      return [];
  }
}
function Sc(n, t, e, s) {
  const i = Te(n);
  let r = Cc(Jt(n), e === "start", s);
  return i && (r = r.map((o) => o + "-" + i), t && (r = r.concat(r.map(Ms)))), r;
}
function En(n) {
  return n.replace(/left|right|bottom|top/g, (t) => yc[t]);
}
function kc(n) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...n
  };
}
function wo(n) {
  return typeof n != "number" ? kc(n) : {
    top: n,
    right: n,
    bottom: n,
    left: n
  };
}
function $n(n) {
  return {
    ...n,
    top: n.y,
    left: n.x,
    right: n.x + n.width,
    bottom: n.y + n.height
  };
}
function rr(n, t, e) {
  let {
    reference: s,
    floating: i
  } = n;
  const r = en(t), o = yi(t), a = _i(o), l = Jt(t), c = r === "y", u = s.x + s.width / 2 - i.width / 2, h = s.y + s.height / 2 - i.height / 2, m = s[a] / 2 - i[a] / 2;
  let f;
  switch (l) {
    case "top":
      f = {
        x: u,
        y: s.y - i.height
      };
      break;
    case "bottom":
      f = {
        x: u,
        y: s.y + s.height
      };
      break;
    case "right":
      f = {
        x: s.x + s.width,
        y: h
      };
      break;
    case "left":
      f = {
        x: s.x - i.width,
        y: h
      };
      break;
    default:
      f = {
        x: s.x,
        y: s.y
      };
  }
  switch (Te(t)) {
    case "start":
      f[o] -= m * (e && c ? -1 : 1);
      break;
    case "end":
      f[o] += m * (e && c ? -1 : 1);
      break;
  }
  return f;
}
const xc = async (n, t, e) => {
  const {
    placement: s = "bottom",
    strategy: i = "absolute",
    middleware: r = [],
    platform: o
  } = e, a = r.filter(Boolean), l = await (o.isRTL == null ? void 0 : o.isRTL(t));
  let c = await o.getElementRects({
    reference: n,
    floating: t,
    strategy: i
  }), {
    x: u,
    y: h
  } = rr(c, s, l), m = s, f = {}, _ = 0;
  for (let g = 0; g < a.length; g++) {
    const {
      name: y,
      fn: v
    } = a[g], {
      x: w,
      y: b,
      data: C,
      reset: k
    } = await v({
      x: u,
      y: h,
      initialPlacement: s,
      placement: m,
      strategy: i,
      middlewareData: f,
      rects: c,
      platform: o,
      elements: {
        reference: n,
        floating: t
      }
    });
    if (u = w ?? u, h = b ?? h, f = {
      ...f,
      [y]: {
        ...f[y],
        ...C
      }
    }, k && _ <= 50) {
      _++, typeof k == "object" && (k.placement && (m = k.placement), k.rects && (c = k.rects === !0 ? await o.getElementRects({
        reference: n,
        floating: t,
        strategy: i
      }) : k.rects), {
        x: u,
        y: h
      } = rr(c, m, l)), g = -1;
      continue;
    }
  }
  return {
    x: u,
    y: h,
    placement: m,
    strategy: i,
    middlewareData: f
  };
};
async function vi(n, t) {
  var e;
  t === void 0 && (t = {});
  const {
    x: s,
    y: i,
    platform: r,
    rects: o,
    elements: a,
    strategy: l
  } = n, {
    boundary: c = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: h = "floating",
    altBoundary: m = !1,
    padding: f = 0
  } = xe(t, n), _ = wo(f), y = a[m ? h === "floating" ? "reference" : "floating" : h], v = $n(await r.getClippingRect({
    element: (e = await (r.isElement == null ? void 0 : r.isElement(y))) == null || e ? y : y.contextElement || await (r.getDocumentElement == null ? void 0 : r.getDocumentElement(a.floating)),
    boundary: c,
    rootBoundary: u,
    strategy: l
  })), w = h === "floating" ? {
    ...o.floating,
    x: s,
    y: i
  } : o.reference, b = await (r.getOffsetParent == null ? void 0 : r.getOffsetParent(a.floating)), C = await (r.isElement == null ? void 0 : r.isElement(b)) ? await (r.getScale == null ? void 0 : r.getScale(b)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, k = $n(r.convertOffsetParentRelativeRectToViewportRelativeRect ? await r.convertOffsetParentRelativeRectToViewportRelativeRect({
    rect: w,
    offsetParent: b,
    strategy: l
  }) : w);
  return {
    top: (v.top - k.top + _.top) / C.y,
    bottom: (k.bottom - v.bottom + _.bottom) / C.y,
    left: (v.left - k.left + _.left) / C.x,
    right: (k.right - v.right + _.right) / C.x
  };
}
const Tc = (n) => ({
  name: "arrow",
  options: n,
  async fn(t) {
    const {
      x: e,
      y: s,
      placement: i,
      rects: r,
      platform: o,
      elements: a,
      middlewareData: l
    } = t, {
      element: c,
      padding: u = 0
    } = xe(n, t) || {};
    if (c == null)
      return {};
    const h = wo(u), m = {
      x: e,
      y: s
    }, f = yi(i), _ = _i(f), g = await o.getDimensions(c), y = f === "y", v = y ? "top" : "left", w = y ? "bottom" : "right", b = y ? "clientHeight" : "clientWidth", C = r.reference[_] + r.reference[f] - m[f] - r.floating[_], k = m[f] - r.reference[f], x = await (o.getOffsetParent == null ? void 0 : o.getOffsetParent(c));
    let A = x ? x[b] : 0;
    (!A || !await (o.isElement == null ? void 0 : o.isElement(x))) && (A = a.floating[b] || r.floating[_]);
    const I = C / 2 - k / 2, M = A / 2 - g[_] / 2 - 1, E = Gt(h[v], M), P = Gt(h[w], M), R = E, L = A - g[_] - P, $ = A / 2 - g[_] / 2 + I, O = $s(R, $, L), tt = !l.arrow && Te(i) != null && $ != O && r.reference[_] / 2 - ($ < R ? E : P) - g[_] / 2 < 0, mt = tt ? $ < R ? $ - R : $ - L : 0;
    return {
      [f]: m[f] + mt,
      data: {
        [f]: O,
        centerOffset: $ - O - mt,
        ...tt && {
          alignmentOffset: mt
        }
      },
      reset: tt
    };
  }
}), wi = function(n) {
  return n === void 0 && (n = {}), {
    name: "flip",
    options: n,
    async fn(t) {
      var e, s;
      const {
        placement: i,
        middlewareData: r,
        rects: o,
        initialPlacement: a,
        platform: l,
        elements: c
      } = t, {
        mainAxis: u = !0,
        crossAxis: h = !0,
        fallbackPlacements: m,
        fallbackStrategy: f = "bestFit",
        fallbackAxisSideDirection: _ = "none",
        flipAlignment: g = !0,
        ...y
      } = xe(n, t);
      if ((e = r.arrow) != null && e.alignmentOffset)
        return {};
      const v = Jt(i), w = Jt(a) === a, b = await (l.isRTL == null ? void 0 : l.isRTL(c.floating)), C = m || (w || !g ? [En(a)] : bc(a));
      !m && _ !== "none" && C.push(...Sc(a, g, _, b));
      const k = [a, ...C], x = await vi(t, y), A = [];
      let I = ((s = r.flip) == null ? void 0 : s.overflows) || [];
      if (u && A.push(x[v]), h) {
        const R = wc(i, o, b);
        A.push(x[R[0]], x[R[1]]);
      }
      if (I = [...I, {
        placement: i,
        overflows: A
      }], !A.every((R) => R <= 0)) {
        var M, E;
        const R = (((M = r.flip) == null ? void 0 : M.index) || 0) + 1, L = k[R];
        if (L)
          return {
            data: {
              index: R,
              overflows: I
            },
            reset: {
              placement: L
            }
          };
        let $ = (E = I.filter((O) => O.overflows[0] <= 0).sort((O, tt) => O.overflows[1] - tt.overflows[1])[0]) == null ? void 0 : E.placement;
        if (!$)
          switch (f) {
            case "bestFit": {
              var P;
              const O = (P = I.map((tt) => [tt.placement, tt.overflows.filter((mt) => mt > 0).reduce((mt, as) => mt + as, 0)]).sort((tt, mt) => tt[1] - mt[1])[0]) == null ? void 0 : P[0];
              O && ($ = O);
              break;
            }
            case "initialPlacement":
              $ = a;
              break;
          }
        if (i !== $)
          return {
            reset: {
              placement: $
            }
          };
      }
      return {};
    }
  };
};
async function Nc(n, t) {
  const {
    placement: e,
    platform: s,
    elements: i
  } = n, r = await (s.isRTL == null ? void 0 : s.isRTL(i.floating)), o = Jt(e), a = Te(e), l = en(e) === "y", c = ["left", "top"].includes(o) ? -1 : 1, u = r && l ? -1 : 1, h = xe(t, n);
  let {
    mainAxis: m,
    crossAxis: f,
    alignmentAxis: _
  } = typeof h == "number" ? {
    mainAxis: h,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...h
  };
  return a && typeof _ == "number" && (f = a === "end" ? _ * -1 : _), l ? {
    x: f * u,
    y: m * c
  } : {
    x: m * c,
    y: f * u
  };
}
const bi = function(n) {
  return n === void 0 && (n = 0), {
    name: "offset",
    options: n,
    async fn(t) {
      var e, s;
      const {
        x: i,
        y: r,
        placement: o,
        middlewareData: a
      } = t, l = await Nc(t, n);
      return o === ((e = a.offset) == null ? void 0 : e.placement) && (s = a.arrow) != null && s.alignmentOffset ? {} : {
        x: i + l.x,
        y: r + l.y,
        data: {
          ...l,
          placement: o
        }
      };
    }
  };
}, Ci = function(n) {
  return n === void 0 && (n = {}), {
    name: "shift",
    options: n,
    async fn(t) {
      const {
        x: e,
        y: s,
        placement: i
      } = t, {
        mainAxis: r = !0,
        crossAxis: o = !1,
        limiter: a = {
          fn: (y) => {
            let {
              x: v,
              y: w
            } = y;
            return {
              x: v,
              y: w
            };
          }
        },
        ...l
      } = xe(n, t), c = {
        x: e,
        y: s
      }, u = await vi(t, l), h = en(Jt(i)), m = vo(h);
      let f = c[m], _ = c[h];
      if (r) {
        const y = m === "y" ? "top" : "left", v = m === "y" ? "bottom" : "right", w = f + u[y], b = f - u[v];
        f = $s(w, f, b);
      }
      if (o) {
        const y = h === "y" ? "top" : "left", v = h === "y" ? "bottom" : "right", w = _ + u[y], b = _ - u[v];
        _ = $s(w, _, b);
      }
      const g = a.fn({
        ...t,
        [m]: f,
        [h]: _
      });
      return {
        ...g,
        data: {
          x: g.x - e,
          y: g.y - s
        }
      };
    }
  };
}, bo = function(n) {
  return n === void 0 && (n = {}), {
    name: "size",
    options: n,
    async fn(t) {
      const {
        placement: e,
        rects: s,
        platform: i,
        elements: r
      } = t, {
        apply: o = () => {
        },
        ...a
      } = xe(n, t), l = await vi(t, a), c = Jt(e), u = Te(e), h = en(e) === "y", {
        width: m,
        height: f
      } = s.floating;
      let _, g;
      c === "top" || c === "bottom" ? (_ = c, g = u === (await (i.isRTL == null ? void 0 : i.isRTL(r.floating)) ? "start" : "end") ? "left" : "right") : (g = c, _ = u === "end" ? "top" : "bottom");
      const y = f - l[_], v = m - l[g], w = !t.middlewareData.shift;
      let b = y, C = v;
      if (h) {
        const x = m - l.left - l.right;
        C = u || w ? Gt(v, x) : x;
      } else {
        const x = f - l.top - l.bottom;
        b = u || w ? Gt(y, x) : x;
      }
      if (w && !u) {
        const x = ct(l.left, 0), A = ct(l.right, 0), I = ct(l.top, 0), M = ct(l.bottom, 0);
        h ? C = m - 2 * (x !== 0 || A !== 0 ? x + A : ct(l.left, l.right)) : b = f - 2 * (I !== 0 || M !== 0 ? I + M : ct(l.top, l.bottom));
      }
      await o({
        ...t,
        availableWidth: C,
        availableHeight: b
      });
      const k = await i.getDimensions(r.floating);
      return m !== k.width || f !== k.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function Zt(n) {
  return Co(n) ? (n.nodeName || "").toLowerCase() : "#document";
}
function dt(n) {
  var t;
  return (n == null || (t = n.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function Wt(n) {
  var t;
  return (t = (Co(n) ? n.ownerDocument : n.document) || window.document) == null ? void 0 : t.documentElement;
}
function Co(n) {
  return n instanceof Node || n instanceof dt(n).Node;
}
function zt(n) {
  return n instanceof Element || n instanceof dt(n).Element;
}
function Tt(n) {
  return n instanceof HTMLElement || n instanceof dt(n).HTMLElement;
}
function or(n) {
  return typeof ShadowRoot > "u" ? !1 : n instanceof ShadowRoot || n instanceof dt(n).ShadowRoot;
}
function nn(n) {
  const {
    overflow: t,
    overflowX: e,
    overflowY: s,
    display: i
  } = _t(n);
  return /auto|scroll|overlay|hidden|clip/.test(t + s + e) && !["inline", "contents"].includes(i);
}
function Ec(n) {
  return ["table", "td", "th"].includes(Zt(n));
}
function Si(n) {
  const t = ki(), e = _t(n);
  return e.transform !== "none" || e.perspective !== "none" || (e.containerType ? e.containerType !== "normal" : !1) || !t && (e.backdropFilter ? e.backdropFilter !== "none" : !1) || !t && (e.filter ? e.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((s) => (e.willChange || "").includes(s)) || ["paint", "layout", "strict", "content"].some((s) => (e.contain || "").includes(s));
}
function $c(n) {
  let t = we(n);
  for (; Tt(t) && !ts(t); ) {
    if (Si(t))
      return t;
    t = we(t);
  }
  return null;
}
function ki() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function ts(n) {
  return ["html", "body", "#document"].includes(Zt(n));
}
function _t(n) {
  return dt(n).getComputedStyle(n);
}
function es(n) {
  return zt(n) ? {
    scrollLeft: n.scrollLeft,
    scrollTop: n.scrollTop
  } : {
    scrollLeft: n.pageXOffset,
    scrollTop: n.pageYOffset
  };
}
function we(n) {
  if (Zt(n) === "html")
    return n;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    n.assignedSlot || // DOM Element detected.
    n.parentNode || // ShadowRoot detected.
    or(n) && n.host || // Fallback.
    Wt(n)
  );
  return or(t) ? t.host : t;
}
function So(n) {
  const t = we(n);
  return ts(t) ? n.ownerDocument ? n.ownerDocument.body : n.body : Tt(t) && nn(t) ? t : So(t);
}
function Be(n, t, e) {
  var s;
  t === void 0 && (t = []), e === void 0 && (e = !0);
  const i = So(n), r = i === ((s = n.ownerDocument) == null ? void 0 : s.body), o = dt(i);
  return r ? t.concat(o, o.visualViewport || [], nn(i) ? i : [], o.frameElement && e ? Be(o.frameElement) : []) : t.concat(i, Be(i, [], e));
}
function ko(n) {
  const t = _t(n);
  let e = parseFloat(t.width) || 0, s = parseFloat(t.height) || 0;
  const i = Tt(n), r = i ? n.offsetWidth : e, o = i ? n.offsetHeight : s, a = Nn(e) !== r || Nn(s) !== o;
  return a && (e = r, s = o), {
    width: e,
    height: s,
    $: a
  };
}
function xi(n) {
  return zt(n) ? n : n.contextElement;
}
function ge(n) {
  const t = xi(n);
  if (!Tt(t))
    return Yt(1);
  const e = t.getBoundingClientRect(), {
    width: s,
    height: i,
    $: r
  } = ko(t);
  let o = (r ? Nn(e.width) : e.width) / s, a = (r ? Nn(e.height) : e.height) / i;
  return (!o || !Number.isFinite(o)) && (o = 1), (!a || !Number.isFinite(a)) && (a = 1), {
    x: o,
    y: a
  };
}
const Mc = /* @__PURE__ */ Yt(0);
function xo(n) {
  const t = dt(n);
  return !ki() || !t.visualViewport ? Mc : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function Ac(n, t, e) {
  return t === void 0 && (t = !1), !e || t && e !== dt(n) ? !1 : t;
}
function ae(n, t, e, s) {
  t === void 0 && (t = !1), e === void 0 && (e = !1);
  const i = n.getBoundingClientRect(), r = xi(n);
  let o = Yt(1);
  t && (s ? zt(s) && (o = ge(s)) : o = ge(n));
  const a = Ac(r, e, s) ? xo(r) : Yt(0);
  let l = (i.left + a.x) / o.x, c = (i.top + a.y) / o.y, u = i.width / o.x, h = i.height / o.y;
  if (r) {
    const m = dt(r), f = s && zt(s) ? dt(s) : s;
    let _ = m.frameElement;
    for (; _ && s && f !== m; ) {
      const g = ge(_), y = _.getBoundingClientRect(), v = _t(_), w = y.left + (_.clientLeft + parseFloat(v.paddingLeft)) * g.x, b = y.top + (_.clientTop + parseFloat(v.paddingTop)) * g.y;
      l *= g.x, c *= g.y, u *= g.x, h *= g.y, l += w, c += b, _ = dt(_).frameElement;
    }
  }
  return $n({
    width: u,
    height: h,
    x: l,
    y: c
  });
}
function Ic(n) {
  let {
    rect: t,
    offsetParent: e,
    strategy: s
  } = n;
  const i = Tt(e), r = Wt(e);
  if (e === r)
    return t;
  let o = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = Yt(1);
  const l = Yt(0);
  if ((i || !i && s !== "fixed") && ((Zt(e) !== "body" || nn(r)) && (o = es(e)), Tt(e))) {
    const c = ae(e);
    a = ge(e), l.x = c.x + e.clientLeft, l.y = c.y + e.clientTop;
  }
  return {
    width: t.width * a.x,
    height: t.height * a.y,
    x: t.x * a.x - o.scrollLeft * a.x + l.x,
    y: t.y * a.y - o.scrollTop * a.y + l.y
  };
}
function Pc(n) {
  return Array.from(n.getClientRects());
}
function To(n) {
  return ae(Wt(n)).left + es(n).scrollLeft;
}
function Rc(n) {
  const t = Wt(n), e = es(n), s = n.ownerDocument.body, i = ct(t.scrollWidth, t.clientWidth, s.scrollWidth, s.clientWidth), r = ct(t.scrollHeight, t.clientHeight, s.scrollHeight, s.clientHeight);
  let o = -e.scrollLeft + To(n);
  const a = -e.scrollTop;
  return _t(s).direction === "rtl" && (o += ct(t.clientWidth, s.clientWidth) - i), {
    width: i,
    height: r,
    x: o,
    y: a
  };
}
function Dc(n, t) {
  const e = dt(n), s = Wt(n), i = e.visualViewport;
  let r = s.clientWidth, o = s.clientHeight, a = 0, l = 0;
  if (i) {
    r = i.width, o = i.height;
    const c = ki();
    (!c || c && t === "fixed") && (a = i.offsetLeft, l = i.offsetTop);
  }
  return {
    width: r,
    height: o,
    x: a,
    y: l
  };
}
function Lc(n, t) {
  const e = ae(n, !0, t === "fixed"), s = e.top + n.clientTop, i = e.left + n.clientLeft, r = Tt(n) ? ge(n) : Yt(1), o = n.clientWidth * r.x, a = n.clientHeight * r.y, l = i * r.x, c = s * r.y;
  return {
    width: o,
    height: a,
    x: l,
    y: c
  };
}
function ar(n, t, e) {
  let s;
  if (t === "viewport")
    s = Dc(n, e);
  else if (t === "document")
    s = Rc(Wt(n));
  else if (zt(t))
    s = Lc(t, e);
  else {
    const i = xo(n);
    s = {
      ...t,
      x: t.x - i.x,
      y: t.y - i.y
    };
  }
  return $n(s);
}
function No(n, t) {
  const e = we(n);
  return e === t || !zt(e) || ts(e) ? !1 : _t(e).position === "fixed" || No(e, t);
}
function zc(n, t) {
  const e = t.get(n);
  if (e)
    return e;
  let s = Be(n, [], !1).filter((a) => zt(a) && Zt(a) !== "body"), i = null;
  const r = _t(n).position === "fixed";
  let o = r ? we(n) : n;
  for (; zt(o) && !ts(o); ) {
    const a = _t(o), l = Si(o);
    !l && a.position === "fixed" && (i = null), (r ? !l && !i : !l && a.position === "static" && !!i && ["absolute", "fixed"].includes(i.position) || nn(o) && !l && No(n, o)) ? s = s.filter((u) => u !== o) : i = a, o = we(o);
  }
  return t.set(n, s), s;
}
function Fc(n) {
  let {
    element: t,
    boundary: e,
    rootBoundary: s,
    strategy: i
  } = n;
  const o = [...e === "clippingAncestors" ? zc(t, this._c) : [].concat(e), s], a = o[0], l = o.reduce((c, u) => {
    const h = ar(t, u, i);
    return c.top = ct(h.top, c.top), c.right = Gt(h.right, c.right), c.bottom = Gt(h.bottom, c.bottom), c.left = ct(h.left, c.left), c;
  }, ar(t, a, i));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function Oc(n) {
  return ko(n);
}
function Wc(n, t, e) {
  const s = Tt(t), i = Wt(t), r = e === "fixed", o = ae(n, !0, r, t);
  let a = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = Yt(0);
  if (s || !s && !r)
    if ((Zt(t) !== "body" || nn(i)) && (a = es(t)), s) {
      const c = ae(t, !0, r, t);
      l.x = c.x + t.clientLeft, l.y = c.y + t.clientTop;
    } else
      i && (l.x = To(i));
  return {
    x: o.left + a.scrollLeft - l.x,
    y: o.top + a.scrollTop - l.y,
    width: o.width,
    height: o.height
  };
}
function lr(n, t) {
  return !Tt(n) || _t(n).position === "fixed" ? null : t ? t(n) : n.offsetParent;
}
function Eo(n, t) {
  const e = dt(n);
  if (!Tt(n))
    return e;
  let s = lr(n, t);
  for (; s && Ec(s) && _t(s).position === "static"; )
    s = lr(s, t);
  return s && (Zt(s) === "html" || Zt(s) === "body" && _t(s).position === "static" && !Si(s)) ? e : s || $c(n) || e;
}
const Hc = async function(n) {
  let {
    reference: t,
    floating: e,
    strategy: s
  } = n;
  const i = this.getOffsetParent || Eo, r = this.getDimensions;
  return {
    reference: Wc(t, await i(e), s),
    floating: {
      x: 0,
      y: 0,
      ...await r(e)
    }
  };
};
function jc(n) {
  return _t(n).direction === "rtl";
}
const Bc = {
  convertOffsetParentRelativeRectToViewportRelativeRect: Ic,
  getDocumentElement: Wt,
  getClippingRect: Fc,
  getOffsetParent: Eo,
  getElementRects: Hc,
  getClientRects: Pc,
  getDimensions: Oc,
  getScale: ge,
  isElement: zt,
  isRTL: jc
};
function Vc(n, t) {
  let e = null, s;
  const i = Wt(n);
  function r() {
    clearTimeout(s), e && e.disconnect(), e = null;
  }
  function o(a, l) {
    a === void 0 && (a = !1), l === void 0 && (l = 1), r();
    const {
      left: c,
      top: u,
      width: h,
      height: m
    } = n.getBoundingClientRect();
    if (a || t(), !h || !m)
      return;
    const f = cn(u), _ = cn(i.clientWidth - (c + h)), g = cn(i.clientHeight - (u + m)), y = cn(c), w = {
      rootMargin: -f + "px " + -_ + "px " + -g + "px " + -y + "px",
      threshold: ct(0, Gt(1, l)) || 1
    };
    let b = !0;
    function C(k) {
      const x = k[0].intersectionRatio;
      if (x !== l) {
        if (!b)
          return o();
        x ? o(!1, x) : s = setTimeout(() => {
          o(!1, 1e-7);
        }, 100);
      }
      b = !1;
    }
    try {
      e = new IntersectionObserver(C, {
        ...w,
        // Handle <iframe>s
        root: i.ownerDocument
      });
    } catch {
      e = new IntersectionObserver(C, w);
    }
    e.observe(n);
  }
  return o(!0), r;
}
function $o(n, t, e, s) {
  s === void 0 && (s = {});
  const {
    ancestorScroll: i = !0,
    ancestorResize: r = !0,
    elementResize: o = typeof ResizeObserver == "function",
    layoutShift: a = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = s, c = xi(n), u = i || r ? [...c ? Be(c) : [], ...Be(t)] : [];
  u.forEach((v) => {
    i && v.addEventListener("scroll", e, {
      passive: !0
    }), r && v.addEventListener("resize", e);
  });
  const h = c && a ? Vc(c, e) : null;
  let m = -1, f = null;
  o && (f = new ResizeObserver((v) => {
    let [w] = v;
    w && w.target === c && f && (f.unobserve(t), cancelAnimationFrame(m), m = requestAnimationFrame(() => {
      f && f.observe(t);
    })), e();
  }), c && !l && f.observe(c), f.observe(t));
  let _, g = l ? ae(n) : null;
  l && y();
  function y() {
    const v = ae(n);
    g && (v.x !== g.x || v.y !== g.y || v.width !== g.width || v.height !== g.height) && e(), g = v, _ = requestAnimationFrame(y);
  }
  return e(), () => {
    u.forEach((v) => {
      i && v.removeEventListener("scroll", e), r && v.removeEventListener("resize", e);
    }), h && h(), f && f.disconnect(), f = null, l && cancelAnimationFrame(_);
  };
}
const Ti = (n, t, e) => {
  const s = /* @__PURE__ */ new Map(), i = {
    platform: Bc,
    ...e
  }, r = {
    ...i.platform,
    _c: s
  };
  return xc(n, t, {
    ...i,
    platform: r
  });
};
class Mo extends H {
  constructor(t) {
    super(t), this._ref = K(), this._handleDocClick = (e) => {
      const { state: { open: s }, id: i, togglePop: r } = this.props, o = d(e.target);
      s !== "closing" && !o.closest(`#pick-${i},#pick-pop-${i}`).length && o.parent().length && r(!1);
    }, this._handleClick = this._handleClick.bind(this);
  }
  get trigger() {
    return d(`#pick-${this.props.id}`)[0];
  }
  get element() {
    var t;
    return (t = this._ref) == null ? void 0 : t.current;
  }
  get container() {
    return this._container;
  }
  _handleClick(t) {
    const { togglePop: e } = this.props, s = d(t.target), i = s.closest("[data-pick-value]");
    if (i.length)
      return t.stopPropagation(), e(!1, { value: `${i.dataset("pickValue")}` });
    if (s.closest('[data-dismiss="pick"]').length)
      return e(!1);
  }
  _getClass(t) {
    const { className: e, state: s, pickerName: i, empty: r } = t, { open: o } = s;
    return T(
      "pick-pop",
      i ? `${i}-pick-pop` : "",
      e,
      o === !0 && "in",
      r ? "is-empty-value" : ""
    );
  }
  _getProps(t) {
    const {
      id: e,
      style: s,
      maxHeight: i,
      maxWidth: r,
      minHeight: o,
      minWidth: a
    } = t, l = d.extend({
      maxHeight: i,
      maxWidth: r,
      minHeight: o,
      minWidth: a
    }, s);
    return {
      id: `pick-pop-${e}`,
      className: this._getClass(t),
      style: l,
      ref: this._ref,
      onClick: this._handleClick
    };
  }
  _getContainer(t) {
    if (!this._container) {
      const e = d(t.container || "body");
      let s = e.find(".pick-container");
      s.length || (s = d("<div>").addClass("pick-container").appendTo(e)), this._container = s[0];
    }
    return this._container;
  }
  _render(t) {
    return /* @__PURE__ */ p("div", { ...this._getProps(t), children: this._renderPop(t) });
  }
  _renderPop(t) {
    return t.children;
  }
  _getWidth() {
    const { width: t } = this.props;
    if (t === "100%")
      return d(this.trigger).outerWidth();
    if (typeof t == "function")
      return t();
    if (t)
      return dn(t);
  }
  layout() {
    const { element: t, trigger: e, props: s } = this, { state: i } = s;
    if (!t || !e || !i.open) {
      this._layoutWatcher && (this._layoutWatcher(), this._layoutWatcher = void 0);
      return;
    }
    this._layoutWatcher || (this._layoutWatcher = $o(e, t, () => {
      const { placement: r, width: o } = s;
      Ti(e, t, {
        placement: !r || r === "auto" ? "bottom-start" : r,
        middleware: [r === "auto" ? wi() : null, Ci(), bi(1)].filter(Boolean)
      }).then(({ x: a, y: l }) => {
        var c, u;
        d.isDetached(e) || (d(t).css({
          left: a,
          top: l,
          width: this._getWidth()
        }), (u = (c = this.props).onLayout) == null || u.call(c, t));
      }), o === "100%" && d(t).css({ width: this._getWidth() });
    }));
  }
  componentDidMount() {
    var t, e;
    this.layout(), d(document).on("click", this._handleDocClick), (e = (t = this.props).afterRender) == null || e.call(t, { firstRender: !0 });
  }
  componentDidUpdate() {
    var t, e;
    (e = (t = this.props).afterRender) == null || e.call(t, { firstRender: !1 });
  }
  componentWillUnmount() {
    var e, s;
    d(document).off("click", this._handleDocClick);
    const t = this._layoutWatcher;
    t && (t(), this._layoutWatcher = void 0), this._container = void 0, this._ref = void 0, d(`#pick-pop-${this.props.id}`).remove(), (s = (e = this.props).beforeDestroy) == null || s.call(e);
  }
  render(t) {
    return ql(this._render(t), this._getContainer(t));
  }
}
let vt = class extends H {
  constructor(t) {
    super(t), this._toggleTimer = 0, this._pop = K(), this._trigger = K(), this.toggle = async (e, s) => {
      (this.props.disabled || this.props.readonly) && (e = !1);
      const { state: i } = this;
      if (typeof e == "boolean" && e === (!!i.open && i.open !== "closing"))
        return s && await this.changeState(s), this.state;
      this._toggleTimer && (clearTimeout(this._toggleTimer), this._toggleTimer = 0);
      let r = await this.changeState((a) => (e = e ?? !a.open, {
        open: e ? "opening" : "closing",
        ...s
      }));
      const { open: o } = r;
      return o === "closing" ? (await Sn(200, (a) => {
        this._toggleTimer = a;
      }), this._toggleTimer = 0, r = await this.changeState({ open: !1 })) : o === "opening" && (await Sn(50, (a) => {
        this._toggleTimer = a;
      }), this._toggleTimer = 0, r = await this.changeState({ open: !0 })), r;
    }, this.state = {
      value: String(t.defaultValue ?? ""),
      open: !1
    }, this._id = t.id ?? `_pick${ut()}`, this.changeState = this.changeState.bind(this);
  }
  get id() {
    return this._id;
  }
  get pop() {
    return this._pop.current;
  }
  get value() {
    return this.state.value;
  }
  changeState(t, e) {
    return new Promise((s) => {
      this.setState(t, () => {
        e == null || e(), s(this.state);
      });
    });
  }
  open(t) {
    return this.toggle(!0, t);
  }
  close(t) {
    return this.toggle(!1, t);
  }
  _getTriggerProps(t, e) {
    return {
      id: this.id,
      ref: this._trigger,
      state: e,
      className: t.className,
      pickerName: t.pickerName,
      style: t.style,
      name: t.name,
      tagName: t.tagName,
      attrs: t.attrs,
      disabled: t.disabled,
      readonly: t.readonly,
      clickType: t.clickType,
      onClick: t.onClick,
      changeState: this.changeState,
      togglePop: this.toggle
    };
  }
  _getPopProps(t, e) {
    return {
      id: this.id,
      state: e,
      className: t.popClass,
      pickerName: t.pickerName,
      style: t.popStyle,
      disabled: t.disabled,
      readonly: t.readonly,
      changeState: this.changeState,
      togglePop: this.toggle,
      placement: t.popPlacement,
      container: t.popContainer,
      width: t.popWidth,
      height: t.popHeight,
      minHeight: t.popMinHeight,
      maxHeight: t.popMaxHeight,
      maxWidth: t.popMaxWidth,
      minWidth: t.popMinWidth
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderTrigger(t, e) {
    return null;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderPop(t, e) {
    return null;
  }
  _afterRender(t = !1) {
    var e;
    (e = this.props.afterRender) == null || e.call(this, { firstRender: t });
  }
  _getPop(t) {
    return t.Pop || this.constructor.Pop;
  }
  _getTrigger(t) {
    return t.Trigger || this.constructor.Trigger;
  }
  _isEmptyValue() {
    const { value: t } = this.state;
    return t == null || t === "";
  }
  _handleChange(t, e) {
    const { onChange: s } = this.props;
    s && s.call(this, t, e);
  }
  _handlePopToggle(t) {
    const { onPopShown: e, onPopHidden: s } = this.props;
    t && e ? e() : !t && s && s();
  }
  setValue(t, e) {
    if (e) {
      const s = this._trigger.current;
      s && (s._skipTriggerChange = t);
    }
    return this.changeState({ value: t });
  }
  componentDidMount() {
    this._afterRender(!0);
  }
  componentWillUpdate(t, e) {
    const { open: s } = this.state, { open: i } = e;
    if (s === i)
      return;
    const { onPopShow: r, onPopHide: o } = this.props;
    i && r ? r() : !i && o && o();
  }
  componentDidUpdate(t, e) {
    const { open: s, value: i } = this.state, { open: r, value: o } = e;
    !!s != !!r && this._handlePopToggle(!!s), i !== o && this._handleChange(i, o), this._afterRender();
  }
  componentWillUnmount() {
    var e;
    (e = this.props.beforeDestroy) == null || e.call(this), this._toggleTimer && clearTimeout(this._toggleTimer);
    const t = this._pop.current;
    t && t.componentWillUnmount && t.componentWillUnmount();
  }
  render(t, e) {
    const { open: s } = e, i = this._getTrigger(t);
    let r;
    if (s && (!t.hidePopWhenEmpty || !this._isEmptyValue())) {
      const o = this._getPop(t);
      r = /* @__PURE__ */ p(o, { ref: this._pop, ...this._getPopProps(t, e), children: this._renderPop(t, e) }, "pop");
    }
    return /* @__PURE__ */ p(Ce, { children: [
      /* @__PURE__ */ p(i, { ...this._getTriggerProps(t, e), children: this._renderTrigger(t, e) }, "pick"),
      r
    ] });
  }
};
vt.Trigger = gi;
vt.Pop = Mo;
vt.defaultProps = {
  popContainer: "body",
  popClass: "popup",
  popWidth: "100%",
  popPlacement: "auto",
  popMinWidth: 50,
  popMinHeight: 32,
  popMaxHeight: 300,
  clickType: "open"
};
let Ao = class extends vt {
  constructor(t) {
    super(t), this.state.value === void 0 && t.required && (this.state.value = this.getColors()[0]);
  }
  getColors() {
    const { colors: t } = this.props;
    return typeof t == "string" ? t.split(",") : t || [];
  }
  componentDidMount() {
    this.syncColor();
  }
  syncColor() {
    const { syncBackground: t, syncBorder: e, syncColor: s, syncValue: i } = this.props, r = this.state.value || "";
    if (t && d(t).css("backgroundColor", r), e && d(e).css("borderColor", r), s && d(s).css("color", r), i) {
      const o = d(i);
      o.is("input,textarea,select") ? o.val(r) : o.text(r);
    }
  }
  _handleChange(t, e) {
    this.props.disabled || (super._handleChange(t, e), this.syncColor());
  }
  _renderTrigger(t, e) {
    const { icon: s } = t, { value: i } = e;
    return [
      s ? /* @__PURE__ */ p(Q, { icon: s }, "icon") : /* @__PURE__ */ p("span", { class: "color-picker-item bg-current ring ring-gray ring-inset", style: { background: i } })
    ];
  }
  _getTriggerProps(t, e) {
    const s = super._getTriggerProps(t, e);
    return s.style = d.extend({
      color: e.value
    }, s.style), s.className = T("color-picker", s.className, { disabled: t.disabled }), s;
  }
  _renderPop(t, e) {
    const { closeBtn: s, heading: i } = t, r = this.getColors(), { value: o } = e;
    let a;
    return i && (a = /* @__PURE__ */ p("div", { className: "color-picker-heading", children: [
      i,
      s ? /* @__PURE__ */ p("button", { className: "btn ghost square rounded size-sm", "data-dismiss": "pick", children: /* @__PURE__ */ p("span", { class: "close" }) }) : null
    ] }, "heading")), [
      a,
      /* @__PURE__ */ p("div", { className: "color-picker-row", children: [
        r.map((l) => /* @__PURE__ */ p("button", { className: "btn color-picker-item", style: { backgroundColor: l }, "data-pick-value": l, children: o === l ? /* @__PURE__ */ p(Q, { icon: "check" }) : null }, l)),
        /* @__PURE__ */ p("button", { className: "btn color-picker-item", "data-pick-value": "", children: /* @__PURE__ */ p(Q, { className: "text-fore", icon: "trash" }) })
      ] }, "row")
    ];
  }
};
Ao.defaultProps = {
  ...vt.defaultProps,
  className: "rounded btn square size-sm ghost",
  popClass: "color-picker-pop popup",
  colors: ["#ef4444", "#f97316", "#eab308", "#84cc16", "#22c55e", "#14b8a6", "#0ea5e9", "#6366f1", "#a855f7", "#d946ef", "#ec4899"],
  closeBtn: !0,
  popWidth: "auto",
  popMinWidth: 184
};
class Io extends B {
}
Io.NAME = "ColorPicker";
Io.Component = Ao;
const Ve = 24 * 60 * 60 * 1e3, F = (n) => n ? (n instanceof Date || (typeof n == "string" && (n = n.trim(), /^\d+$/.test(n) && (n = Number.parseInt(n, 10))), typeof n == "number" && n < 1e10 && (n *= 1e3), n = new Date(n)), n) : /* @__PURE__ */ new Date(), Uc = (n, t, e = "day") => {
  if (typeof t == "string") {
    const s = Number.parseInt(t, 10);
    e = t.replace(s.toString(), ""), t = s;
  }
  return n = new Date(F(n).getTime()), e === "month" ? n.setMonth(n.getMonth() + t) : e === "year" ? n.setFullYear(n.getFullYear() + t) : e === "week" ? n.setDate(n.getDate() + t * 7) : e === "hour" ? n.setHours(n.getHours() + t) : e === "minute" ? n.setMinutes(n.getMinutes() + t) : e === "second" ? n.setSeconds(n.getSeconds() + t) : n.setDate(n.getDate() + t), n;
}, re = (n, t = /* @__PURE__ */ new Date()) => F(n).toDateString() === F(t).toDateString(), As = (n, t = /* @__PURE__ */ new Date()) => F(n).getFullYear() === F(t).getFullYear(), Po = (n, t = /* @__PURE__ */ new Date()) => (n = F(n), t = F(t), n.getFullYear() === t.getFullYear() && n.getMonth() === t.getMonth()), wu = (n, t = /* @__PURE__ */ new Date()) => {
  n = F(n), t = F(t);
  const e = 1e3 * 60 * 60 * 24, s = Math.floor(n.getTime() / e), i = Math.floor(t.getTime() / e);
  return Math.floor((s + 4) / 7) === Math.floor((i + 4) / 7);
}, bu = (n, t) => re(F(t), n), Cu = (n, t) => re(F(t).getTime() - Ve, n), Su = (n, t) => re(F(t).getTime() + Ve, n), Ro = (n) => !Number.isNaN(F(n).getTime()), pt = (n, t = "yyyy-MM-dd hh:mm", e = "") => {
  if (n = F(n), !Ro(n))
    return e;
  const s = {
    "M+": n.getMonth() + 1,
    "d+": n.getDate(),
    "h+": n.getHours(),
    "H+": n.getHours() % 12,
    "m+": n.getMinutes(),
    "s+": n.getSeconds(),
    "S+": n.getMilliseconds()
  };
  return /(y+)/i.test(t) && (t.includes("[yyyy-]") && (t = t.replace("[yyyy-]", As(n) ? "" : "yyyy-")), t = t.replace(RegExp.$1, `${n.getFullYear()}`.substring(4 - RegExp.$1.length))), Object.keys(s).forEach((i) => {
    if (new RegExp(`(${i})`).test(t)) {
      const r = `${s[i]}`;
      t = t.replace(RegExp.$1, RegExp.$1.length === 1 ? r : `00${r}`.substring(r.length));
    }
  }), t;
}, ku = (n, t, e) => {
  const s = {
    full: "yyyy-M-d",
    month: "M-d",
    day: "d",
    str: "{0} ~ {1}",
    ...e
  }, i = pt(n, As(n) ? s.month : s.full);
  if (re(n, t))
    return i;
  const r = pt(t, As(n, t) ? Po(n, t) ? s.day : s.month : s.full);
  return s.str.replace("{0}", i).replace("{1}", r);
};
class Do extends H {
  constructor() {
    super(...arguments), this._ref = K(), this._handleClickItem = (t, e) => {
      var s, i;
      (i = (s = this.props).onChange) == null || i.call(s, t, +e.item.key);
    };
  }
  componentDidMount() {
    setTimeout(() => {
      d(this._ref.current).find(".menu-item>.active").scrollIntoView({ container: ".menu" });
    }, 100);
  }
  render(t) {
    const { minuteStep: e = 5, hour: s, minute: i } = t, r = [], o = [];
    for (let l = 0; l < 24; ++l)
      r.push({ key: String(l), text: l < 10 ? `0${l}` : l, active: s === l });
    for (let l = 0; l < 60; l += e)
      o.push({ key: String(l), text: l < 10 ? `0${l}` : l, active: i === l });
    const a = "col w-10 max-h-full overflow-y-auto scrollbar-thin scrollbar-hover";
    return /* @__PURE__ */ p("div", { className: "time-picker-menu row", ref: this._ref, children: [
      /* @__PURE__ */ p(
        J,
        {
          className: a,
          items: r,
          onClickItem: this._handleClickItem.bind(this, "hour")
        }
      ),
      /* @__PURE__ */ p(
        J,
        {
          className: a,
          items: o,
          onClickItem: this._handleClickItem.bind(this, "minute")
        }
      )
    ] });
  }
}
const cr = (n) => {
  if (!n)
    return;
  const t = F(`1999-01-01 ${n}`);
  if (!Number.isNaN(t.getDay()))
    return t;
};
let Lo = class extends vt {
  constructor(t) {
    super(t), this._handleInputFocus = () => {
      this.toggle(!0);
    }, this._handleInputChange = (s) => {
      this.setTime(s.target.value);
    }, this._handleSetTime = (s, i) => {
      this.setTime({ [s]: String(i) });
    }, this._handleClearBtnClick = () => {
      this.setTime("");
    };
    const e = this.state;
    e.value === "now" && (e.value = pt(/* @__PURE__ */ new Date(), t.format));
  }
  setTime(t) {
    if (this.props.disabled || this.props.readonly)
      return;
    let e = "";
    if (typeof t == "string")
      e = t;
    else {
      const [a, l] = (this.state.value || "00:00").split(":"), { hour: c = +a, minute: u = +l } = t;
      e = `${c}:${u}`;
    }
    const s = cr(e), { onInvalid: i, required: r, defaultValue: o } = this.props;
    this.setState({ value: s ? pt(s, this.props.format) : r ? o : "" }, () => {
      !s && i && i(e);
    });
  }
  getTime() {
    const t = cr(this.state.value);
    return t ? [t.getHours(), t.getMinutes()] : null;
  }
  _renderTrigger(t, e) {
    const { placeholder: s, icon: i, required: r, disabled: o, readonly: a } = t, { value: l = "", open: c } = e, u = `time-picker-${this.id}`;
    let h;
    return c && !r && l.length ? h = /* @__PURE__ */ p("button", { type: "button", className: "btn size-sm square ghost", onClick: this._handleClearBtnClick, children: /* @__PURE__ */ p("span", { className: "close" }) }) : i && (i === !0 ? h = /* @__PURE__ */ p("i", { class: "i-time" }) : h = /* @__PURE__ */ p(Q, { icon: i })), [
      /* @__PURE__ */ p("input", { id: u, type: "text", className: "form-control", placeholder: s, value: l, disabled: o, readOnly: a, autoComplete: "off", onFocus: this._handleInputFocus, onChange: this._handleInputChange }, "input"),
      h ? /* @__PURE__ */ p("label", { for: u, className: "input-control-suffix", children: h }, "icon") : null
    ];
  }
  _getTriggerProps(t, e) {
    const s = super._getTriggerProps(t, e);
    return {
      ...s,
      className: T(s.className, "time-picker input-control has-suffix-icon")
    };
  }
  _renderPop(t) {
    const [e, s] = this.getTime() || [];
    return /* @__PURE__ */ p(Do, { hour: e, minute: s, minuteStep: t.minuteStep, onChange: this._handleSetTime });
  }
};
Lo.defaultProps = {
  ...vt.defaultProps,
  popWidth: "auto",
  popMaxHeight: 320,
  minuteStep: 5,
  format: "hh:mm",
  icon: !0
};
j.addLang({
  zh_cn: {
    today: "今天",
    yearFormat: "{0}年",
    weekNames: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  zh_tw: {
    today: "今天",
    yearFormat: "{0}年",
    weekNames: ["日", "一", "二", "三", "四", "五", "六"],
    monthNames: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  en: {
    today: "Today",
    yearFormat: "{0}",
    weekNames: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    monthNames: ["Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sept.", "Oct.", "Nov.", "Dec."]
  }
});
const Kc = (n, t, e = 0) => {
  const s = new Date(n, t - 1, 1), i = s.getDay(), r = s.getTime() - (7 + i - e) % 7 * Ve;
  return {
    days: 7 * 5,
    startTime: r,
    firstDay: s.getTime()
  };
}, hr = (n, t) => new Set((Array.isArray(n) ? n : [n]).map((e) => pt(e, t)));
class qc extends H {
  constructor() {
    super(...arguments), this._handleClickDate = (t) => {
      const { onClickDate: e } = this.props;
      if (!e)
        return;
      const s = d(t.target).closest(".mini-calendar-day").dataset("date");
      s && e(s);
    };
  }
  render(t) {
    var M, E;
    const e = /* @__PURE__ */ new Date(), {
      weekStart: s = 1,
      weekNames: i = j.getLang("weekNames"),
      monthNames: r = j.getLang("monthNames"),
      year: o = e.getFullYear(),
      month: a = e.getMonth() + 1,
      highlights: l = [],
      selections: c = [],
      maxDate: u,
      minDate: h
    } = t, m = [], f = "btn ghost square rounded-full";
    for (let P = 0; P < 7; P++) {
      const R = (s + P) % 7;
      m.push(/* @__PURE__ */ p("div", { className: T("col mini-calendar-day", { "is-weekend": R === 0 || R === 6 }), children: /* @__PURE__ */ p("div", { children: i ? i[R] : R }) }, P));
    }
    const { startTime: _, days: g, firstDay: y } = Kc(o, a, s), v = y + g * Ve;
    let w = _;
    const b = [], C = "yyyy-MM-dd", k = hr(l, C), x = hr(c, C), A = ((M = u ? F(u) : null) == null ? void 0 : M.getTime()) ?? Number.MAX_SAFE_INTEGER, I = ((E = h ? F(h) : null) == null ? void 0 : E.getTime()) ?? 0;
    for (; w <= v; ) {
      const P = [];
      for (let R = 0; R < 7; R++) {
        const L = new Date(w), $ = L.getDate(), O = pt(L, C), tt = L.getDay(), mt = Po(L, y), as = T("col mini-calendar-day", {
          active: k.has(O),
          selected: x.has(O),
          "is-first": $ === 1,
          "is-in-month": mt,
          "is-out-month": !mt,
          "is-today": re(L, e),
          "is-weekend": tt === 0 || tt === 6,
          disabled: !re(L, A) && !re(L, I) && (w > A || w < I)
        });
        P.push(
          /* @__PURE__ */ p("div", { className: as, "data-date": O, children: /* @__PURE__ */ p("button", { type: "button", className: f, onClick: this._handleClickDate, children: $ === 1 && r ? r[L.getMonth()] : L.getDate() }) }, O)
        ), w += Ve;
      }
      b.push(/* @__PURE__ */ p("div", { className: "row", children: P }, w));
    }
    return /* @__PURE__ */ p("div", { className: "mini-calendar", children: [
      /* @__PURE__ */ p("div", { className: "row", children: m }),
      b
    ] });
  }
}
var zn, Fn;
class ur extends H {
  constructor() {
    super(...arguments);
    at(this, zn, K());
    at(this, Fn, (e) => {
      const { onChange: s } = this.props;
      if (!s)
        return;
      const r = d(e.target).closest("[data-value]").dataset("value");
      r && (s(+r), e.stopPropagation());
    });
  }
  render(e) {
    const { className: s, max: i, min: r, value: o } = e, a = [], l = (/* @__PURE__ */ new Date()).getFullYear();
    for (let c = r; c <= i; ++c)
      a.push(/* @__PURE__ */ p(U, { type: "ghost", "data-value": c, active: c === o, className: T(l === c ? "is-current" : ""), onClick: st(this, Fn), children: c }, c));
    return /* @__PURE__ */ p("div", { className: s, ref: st(this, zn), children: a });
  }
}
zn = new WeakMap(), Fn = new WeakMap();
var Ge, Ye, Je, Ze, Xe, Qe, On, zo, Wn, Fo;
class Gc extends H {
  constructor(e) {
    super(e);
    at(this, On);
    at(this, Wn);
    at(this, Ge, void 0);
    at(this, Ye, void 0);
    at(this, Je, void 0);
    at(this, Ze, void 0);
    at(this, Xe, void 0);
    at(this, Qe, void 0);
    gt(this, Ge, K()), gt(this, Ye, (r) => {
      const o = d(r.target).closest("[data-set-date]");
      o.length && this.changeDate(o.dataset("set-date"));
    }), gt(this, Je, () => {
      const { year: r, month: o } = this.state;
      o === 1 ? this.setState({ year: r - 1, month: 12 }) : this.setState({ month: o - 1 });
    }), gt(this, Ze, () => {
      const { year: r, month: o } = this.state;
      o === 12 ? this.setState({ year: r + 1, month: 1 }) : this.setState({ month: o + 1 });
    }), gt(this, Xe, (r) => {
      this.setState({ year: r, select: "day" });
    }), gt(this, Qe, (r) => {
      this.setState({ month: r, select: "day" });
    }), this.changeDate = (r) => {
      var o, a;
      if (r.startsWith("today")) {
        let l = /* @__PURE__ */ new Date();
        r.length > 3 && (l = Uc(l, r.substring(5).replace("+", ""))), r = pt(l, "yyyy-MM-dd");
      }
      (a = (o = this.props).onChange) == null || a.call(o, r);
    };
    const { date: s } = e, i = s ? new Date(s) : /* @__PURE__ */ new Date();
    this.state = {
      select: "day",
      year: i.getFullYear(),
      month: i.getMonth() + 1
    };
  }
  _showSelect(e) {
    this.setState((s) => s.select === e ? { select: "day" } : { select: e });
  }
  render(e, s) {
    const {
      date: i,
      yearText: r = j.getLang("yearFormat") || "{0}",
      weekNames: o = j.getLang("weekNames"),
      monthNames: a = j.getLang("monthNames"),
      minDate: l = "1970-1-1",
      maxDate: c = "2099-1-1",
      weekStart: u
    } = e, h = i ? new Date(i) : void 0, {
      year: m,
      month: f,
      select: _
    } = s, g = _ === "day", y = F(typeof l == "function" ? l(h) : l), v = F(typeof c == "function" ? c(h) : c);
    return /* @__PURE__ */ p("div", { className: "date-picker-menu row", ref: st(this, Ge), onClick: st(this, Ye), children: [
      cs(this, On, zo).call(this, e),
      /* @__PURE__ */ p("div", { className: "cell", style: "width: 312px", children: [
        /* @__PURE__ */ p("div", { className: "row p-2", children: [
          /* @__PURE__ */ p(U, { type: _ === "year" ? "primary-pale" : "ghost", size: "sm", caret: !0, onClick: this._showSelect.bind(this, "year"), children: G(r, m) }),
          /* @__PURE__ */ p(U, { type: _ === "month" ? "primary-pale" : "ghost", size: "sm", caret: !0, onClick: this._showSelect.bind(this, "month"), children: a ? a[f - 1] : f }),
          /* @__PURE__ */ p("div", { className: "flex-auto" }),
          g ? /* @__PURE__ */ p("div", { children: [
            /* @__PURE__ */ p(U, { type: "ghost", size: "sm", square: !0, onClick: st(this, Je), children: /* @__PURE__ */ p("i", { className: "chevron-left" }) }),
            /* @__PURE__ */ p(U, { type: "ghost", size: "sm", square: !0, onClick: st(this, Ze), children: /* @__PURE__ */ p("i", { className: "chevron-right" }) })
          ] }) : null
        ] }),
        g ? /* @__PURE__ */ p(
          qc,
          {
            weekStart: u,
            weekNames: o,
            monthNames: a,
            maxDate: v,
            minDate: y,
            year: m,
            month: f,
            selections: h,
            onClickDate: this.changeDate
          }
        ) : null,
        _ === "year" ? /* @__PURE__ */ p(
          ur,
          {
            className: "date-pick-menu-years overflow-y-auto scrollbar-hover scrollbar-thin",
            value: m,
            min: y.getFullYear(),
            max: v.getFullYear(),
            onChange: st(this, Xe)
          }
        ) : _ === "month" ? /* @__PURE__ */ p(
          ur,
          {
            className: "date-pick-menu-month overflow-y-auto scrollbar-hover scrollbar-thin",
            value: f,
            min: 1,
            max: 12,
            onChange: st(this, Qe)
          }
        ) : null,
        g ? cs(this, Wn, Fo).call(this, e) : null
      ] })
    ] });
  }
}
Ge = new WeakMap(), Ye = new WeakMap(), Je = new WeakMap(), Ze = new WeakMap(), Xe = new WeakMap(), Qe = new WeakMap(), On = new WeakSet(), zo = function(e) {
  let { menu: s } = e;
  return s ? (Array.isArray(s) && (s = { items: s }), /* @__PURE__ */ p(J, { ...s })) : null;
}, Wn = new WeakSet(), Fo = function(e) {
  let { actions: s } = e;
  const { todayText: i, clearText: r } = e;
  return s || (s = [{ text: i, "data-set-date": pt(/* @__PURE__ */ new Date(), "yyyy-MM-dd") }]), Array.isArray(s) && (s = { items: s }), /* @__PURE__ */ p("div", { className: "date-picker-menu-footer", children: [
    /* @__PURE__ */ p(St, { btnProps: { className: "ghost text-primary" }, ...s }),
    r ? /* @__PURE__ */ p(U, { type: "ghost text-link", "data-set-date": "", children: r }) : null
  ] });
};
let ns = class extends vt {
  constructor(t) {
    super(t), this.setDate = (s) => {
      const { onInvalid: i, defaultValue: r = "", required: o, disabled: a, readonly: l, format: c, minDate: u, maxDate: h } = this.props;
      if (a || l)
        return;
      let m = F(s);
      if (u) {
        const _ = F(typeof u == "function" ? u(m) : u);
        m < _ && (m = _);
      }
      if (h) {
        const _ = F(typeof h == "function" ? h(m) : h);
        m > _ && (m = _);
      }
      const f = !s || Number.isNaN(m.getDay());
      this.setState({ value: f ? o ? r : "" : pt(m, c) }, () => {
        !f && i && i(s), this._afterSetDate();
      });
    }, this._handleInputFocus = () => {
      this.toggle(!0);
    }, this._handleInputChange = (s) => {
      this.setDate(s.target.value);
    }, this._handleClearBtnClick = () => {
      this.setDate("");
    }, this._handleSetDate = (s) => {
      this.setDate(s);
    };
    const { value: e } = this.state;
    e && (this.state.value = pt(e === "today" ? /* @__PURE__ */ new Date() : e, t.format));
  }
  getDate() {
    const { value: t } = this.state;
    if (!t.length)
      return null;
    const e = F(t);
    return Ro(e) ? e : null;
  }
  _afterSetDate() {
    this.toggle(!1);
  }
  _renderTrigger(t, e) {
    const { placeholder: s, icon: i, required: r, disabled: o, readonly: a } = t, { value: l = "", open: c } = e, u = `date-picker-${this.id}`;
    let h;
    return c && !r && l.length ? h = /* @__PURE__ */ p("button", { type: "button", className: "btn size-sm square ghost", onClick: this._handleClearBtnClick, children: /* @__PURE__ */ p("span", { className: "close" }) }) : i && (i === !0 ? h = /* @__PURE__ */ p("i", { class: "i-calendar" }) : h = /* @__PURE__ */ p(Q, { icon: i })), [
      /* @__PURE__ */ p(
        "input",
        {
          id: u,
          type: "text",
          className: "form-control",
          placeholder: s,
          value: l,
          disabled: o,
          readOnly: a,
          autoComplete: "off",
          onFocus: this._handleInputFocus,
          onChange: this._handleInputChange
        },
        "input"
      ),
      h ? /* @__PURE__ */ p("label", { for: u, className: "input-control-suffix", children: h }, "icon") : null
    ];
  }
  _getTriggerProps(t, e) {
    const s = super._getTriggerProps(t, e);
    return {
      ...s,
      className: T(s.className, "date-picker input-control has-suffix-icon")
    };
  }
  _getPopProps(t, e) {
    const s = super._getPopProps(t, e);
    return {
      ...s,
      className: T(s.className, "popup")
    };
  }
  _renderPop(t, e) {
    const { weekNames: s, monthNames: i, weekStart: r, yearText: o, todayText: a = j.getLang("today"), clearText: l, menu: c, actions: u, minDate: h, maxDate: m, required: f } = t;
    return /* @__PURE__ */ p(
      Gc,
      {
        onChange: this._handleSetDate,
        date: e.value,
        weekNames: s,
        monthNames: i,
        weekStart: r,
        yearText: o,
        todayText: a,
        clearText: f ? "" : l,
        menu: c,
        actions: u,
        minDate: h,
        maxDate: m
      }
    );
  }
};
ns.defaultProps = {
  ...vt.defaultProps,
  popWidth: "auto",
  popMaxHeight: 320,
  format: "yyyy-MM-dd",
  icon: !0
};
let Oo = class extends ns {
  constructor() {
    super(...arguments), this._handleSetDate = (t) => {
      const e = F(t), s = this.getDate() || /* @__PURE__ */ new Date();
      e.setHours(s.getHours()), e.setMinutes(s.getMinutes()), this.setDate(pt(e, this.props.format));
    }, this._handleSetTime = (t, e) => {
      const s = this.getDate() || /* @__PURE__ */ new Date();
      t === "hour" ? s.setHours(e) : s.setMinutes(e), this.setDate(pt(s, this.props.format));
    };
  }
  getTime() {
    const t = this.getDate();
    return t ? [t.getHours(), t.getMinutes()] : null;
  }
  _afterSetDate() {
  }
  _renderPop(t, e) {
    const [s, i] = this.getTime() || [];
    return /* @__PURE__ */ p("div", { className: "datetime-picker-menu row", children: [
      super._renderPop(t, e),
      /* @__PURE__ */ p("div", { className: "divider" }),
      /* @__PURE__ */ p(
        Do,
        {
          hour: s,
          minute: i,
          minuteStep: t.minuteStep,
          onChange: this._handleSetTime
        }
      )
    ] });
  }
};
Oo.defaultProps = {
  ...ns.defaultProps,
  popMaxHeight: 310,
  format: "yyyy-MM-dd hh:mm",
  minuteStep: 5
};
class Wo extends B {
}
Wo.NAME = "TimePicker";
Wo.Component = Lo;
class Ho extends B {
}
Ho.NAME = "DatePicker";
Ho.Component = ns;
class jo extends B {
}
jo.NAME = "DatetimePicker";
jo.Component = Oo;
const dr = "show", fr = "in", Yc = '[data-dismiss="modal"]', gs = "modal-hide", Ne = class ne extends Ot {
  constructor() {
    super(...arguments), this._timer = 0, this._handleClick = (t) => {
      const e = t.target, s = e.closest(".modal");
      !s || s !== this.modalElement || (e.closest(Yc) || this.options.backdrop === !0 && e === s) && (t.preventDefault(), this.hide());
    };
  }
  get modalElement() {
    return this.element;
  }
  get shown() {
    return this._shown;
  }
  get dialog() {
    return this.modalElement.querySelector(".modal-dialog");
  }
  get rob() {
    return this._rob;
  }
  _observeResize() {
    var t;
    if (this.options.responsive && typeof ResizeObserver < "u") {
      (t = this._rob) == null || t.disconnect();
      const { dialog: e } = this;
      if (e) {
        const s = new ResizeObserver(() => {
          if (!this._shown)
            return;
          const i = e.clientWidth, r = e.clientHeight, [o, a] = this._lastDialogSize || [];
          (o !== i || a !== r) && (this._lastDialogSize = [i, r], this.layout());
        });
        s.observe(e), this._rob = s;
      }
    }
  }
  afterInit() {
    this.on("click", this._handleClick), this.options.show && this.show(), this._observeResize(), this.on("hidden", () => {
      ne.getAll().some((t) => t.shown) || d("html").enableScroll();
    }), this.on("show", () => {
      d("html").disableScroll();
    }), this.shown && d("html").disableScroll();
  }
  destroy() {
    super.destroy(), this._rob && (this._rob.disconnect(), this._rob = void 0);
  }
  show(t) {
    const { modalElement: e } = this, s = d(e);
    if (this._shown)
      return s.removeClass(gs).css("z-index", `${ne.zIndex++}`), !1;
    this._shown = !0, this.setOptions(t);
    const { animation: i, backdrop: r, className: o, style: a } = this.options;
    s.setClass({
      "modal-trans": i,
      "modal-no-backdrop": !r,
      [gs]: !1
    }, dr, o).css({
      zIndex: `${ne.zIndex++}`,
      ...a
    });
    const l = this.constructor;
    return l.hideOthers && this.options.hideOthers !== !1 && l.getAll().forEach((c) => {
      c !== this && c.shown && !s.closest(c.modalElement).length && c.hideForOther();
    }), this.options.closeOthers && l.getAll().forEach((c) => {
      c !== this && !s.closest(c.modalElement).length && c.hide();
    }), this.layout(), this.emit("show"), this._setTimer(() => {
      s.addClass(fr), this._setTimer(() => {
        this.emit("shown");
      });
    }, 50), !0;
  }
  hideForOther() {
    d(this.modalElement).addClass(gs);
  }
  hide() {
    var e;
    if (!this._shown)
      return !1;
    this._shown = !1, d(this.modalElement).removeClass(fr), this.emit("hide"), this._setTimer(() => {
      d(this.modalElement).removeClass(dr), this.emit("hidden");
    });
    const t = this.constructor;
    return t.hideOthers && ((e = t.getAll().findLast((s) => s.shown && s !== this)) == null || e.show()), !0;
  }
  layout(t, e) {
    if (!this._shown)
      return;
    const { dialog: s } = this;
    if (!s)
      return;
    const i = d(s);
    if (e = e ?? this.options.size, e) {
      i.removeAttr("data-size");
      const u = { width: "", height: "" };
      typeof e == "object" ? (u.width = e.width, u.height = e.height) : typeof e == "string" && ["md", "sm", "lg", "full"].includes(e) ? i.attr("data-size", e) : e && (u.width = e), i.css(u);
    }
    t = t ?? this.options.position ?? "fit";
    const r = s.clientWidth, o = s.clientHeight;
    this._lastDialogSize = [r, o], typeof t == "function" && (t = t({ width: r, height: o }));
    const a = {
      left: null,
      bottom: null,
      right: null
    };
    let l = null, c = "center";
    typeof t == "number" ? (c = "flex-start", l = t) : typeof t == "object" && t ? (Object.assign(a, t), l = a.top ?? l, c = a.alignSelf ?? "flex-start") : t === "fit" ? (c = "flex-start", l = `${Math.max(0, Math.floor((window.innerHeight - o) / 3))}px`) : t === "bottom" ? c = "flex-end" : t === "top" ? c = "flex-start" : t !== "center" && typeof t == "string" && (c = "flex-start", l = t), a.top = l, a.alignSelf = c, i.css(a), d(this.modalElement).css("justifyContent", a.left ? "flex-start" : "center");
  }
  _setTimer(t, e) {
    this._timer && (clearTimeout(this._timer), this._timer = 0), t && (this.options.animation ? this._timer = window.setTimeout(t, e ?? this.options.transTime) : t());
  }
  static last(t) {
    return ne.query(t, void 0, (e) => e.shown);
  }
  static hide(t) {
    var e;
    (e = ne.last(t)) == null || e.hide();
  }
  static show(t) {
    var e;
    (e = ne.query(t, void 0, (s) => !s.shown)) == null || e.show();
  }
};
Ne.NAME = "Modal";
Ne.MULTI_INSTANCE = !0;
Ne.DEFAULT = {
  position: "fit",
  show: !0,
  keyboard: !0,
  animation: !0,
  backdrop: !0,
  responsive: !0,
  transTime: 300
};
Ne.hideOthers = !0;
Ne.zIndex = 1500;
let Ue = Ne;
d(window).on(`resize.${Ue.NAMESPACE}`, () => {
  Ue.getAll().forEach((n) => {
    const t = n;
    t.shown && t.options.responsive && t.layout();
  });
});
class Bo extends H {
  componentDidMount() {
    var t;
    (t = this.props.afterRender) == null || t.call(this, { firstRender: !0 });
  }
  componentDidUpdate() {
    var t;
    (t = this.props.afterRender) == null || t.call(this, { firstRender: !1 });
  }
  componentWillUnmount() {
    var t;
    (t = this.props.beforeDestroy) == null || t.call(this);
  }
  renderHeader() {
    const {
      header: t,
      headerClass: e,
      title: s
    } = this.props;
    return bt(t) ? t : t === !1 || !s ? null : /* @__PURE__ */ p("div", { className: T("modal-header", e), children: /* @__PURE__ */ p("div", { className: "modal-title", children: s }) });
  }
  renderActions() {
    const {
      actions: t,
      closeBtn: e
    } = this.props;
    return !e && !t ? null : bt(t) ? t : /* @__PURE__ */ p("div", { className: "modal-actions", children: [
      t ? /* @__PURE__ */ p(St, { ...t }) : null,
      e ? /* @__PURE__ */ p("button", { type: "button", class: "btn square ghost", "data-dismiss": "modal", children: /* @__PURE__ */ p("span", { class: "close" }) }) : null
    ] });
  }
  renderBody() {
    const {
      body: t,
      bodyClass: e
    } = this.props;
    return t ? bt(t) ? t : /* @__PURE__ */ p("div", { className: T("modal-body", e), children: t }) : null;
  }
  renderFooter() {
    const {
      footer: t,
      footerClass: e,
      footerActions: s
    } = this.props;
    return bt(t) ? t : t === !1 || !s ? null : /* @__PURE__ */ p("div", { className: T("modal-footer", e), children: s ? /* @__PURE__ */ p(St, { ...s }) : null });
  }
  render() {
    const {
      className: t,
      style: e,
      contentClass: s,
      children: i
    } = this.props;
    return /* @__PURE__ */ p("div", { className: T("modal-dialog", t), style: e, children: /* @__PURE__ */ p("div", { className: T("modal-content", s), children: [
      this.renderHeader(),
      this.renderActions(),
      this.renderBody(),
      i,
      this.renderFooter()
    ] }) });
  }
}
Bo.defaultProps = { closeBtn: !0 };
class Vo extends H {
  constructor() {
    super(...arguments), this._ref = K(), this.state = {}, this._watchIframeHeight = () => {
      var s, i;
      const t = (i = (s = this._ref.current) == null ? void 0 : s.contentWindow) == null ? void 0 : i.document;
      if (!t)
        return;
      let e = this._rob;
      e == null || e.disconnect(), e = new ResizeObserver(() => {
        const r = t.body, o = t.documentElement, a = Math.ceil(Math.max(r.scrollHeight, r.offsetHeight, o.offsetHeight)) + 1;
        this.setState({ height: a });
      }), e.observe(t.body), e.observe(t.documentElement), this._rob = e;
    };
  }
  componentDidMount() {
    this.props.watchHeight && this._watchIframeHeight();
  }
  componentWillUnmount() {
    var t;
    (t = this._rob) == null || t.disconnect();
  }
  render() {
    const { url: t, watchHeight: e } = this.props;
    return /* @__PURE__ */ p(
      "iframe",
      {
        className: "modal-iframe",
        style: this.state,
        src: t,
        ref: this._ref,
        onLoad: e ? this._watchIframeHeight : void 0
      }
    );
  }
}
Vo.defaultProps = {
  watchHeight: !0
};
var Ni = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, wt = (n, t, e) => (Ni(n, t, "read from private field"), e ? e.call(n) : t.get(n)), $e = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, he = (n, t, e, s) => (Ni(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), fn = (n, t, e) => (Ni(n, t, "access private method"), e), $t, Pe, Mt, Mn, Ei, pn, Is;
function Jc(n, t) {
  const { custom: e, title: s, content: i } = t;
  return {
    body: i,
    title: s,
    ...typeof e == "function" ? e() : e
  };
}
async function Zc(n, t) {
  const { dataType: e = "html", url: s, request: i, custom: r, title: o, replace: a = !0, executeScript: l = !0 } = t, c = await d.ajax({
    url: s,
    headers: {
      "X-ZUI-Modal": "true"
    },
    ...i
  });
  if (e !== "html")
    try {
      const u = JSON.parse(c);
      return {
        title: o,
        ...r,
        ...u
      };
    } catch {
    }
  return a !== !1 && e === "html" ? [c] : {
    title: o,
    ...r,
    body: e === "html" ? /* @__PURE__ */ p(ve, { className: "modal-body", html: c, executeScript: l }) : c
  };
}
async function Xc(n, t) {
  const { url: e, custom: s, title: i, size: r } = t, o = typeof r == "object" && typeof r.height == "number";
  return {
    title: i,
    ...s,
    body: /* @__PURE__ */ p(Vo, { url: e, watchHeight: !o })
  };
}
const Qc = {
  custom: Jc,
  ajax: Zc,
  iframe: Xc
}, pr = "loading", Uo = class de extends Ue {
  constructor() {
    super(...arguments), $e(this, Mn), $e(this, pn), $e(this, $t, void 0), $e(this, Pe, void 0), $e(this, Mt, void 0);
  }
  get id() {
    return wt(this, Pe);
  }
  get loading() {
    var t;
    return (t = wt(this, $t)) == null ? void 0 : t.classList.contains(pr);
  }
  get shown() {
    var t;
    return !!((t = wt(this, $t)) != null && t.classList.contains("show"));
  }
  get modalElement() {
    let t = wt(this, $t);
    if (!t) {
      const { options: e } = this;
      let s = wt(this, Pe);
      s || (s = e.id || `modal-${ut()}`, he(this, Pe, s));
      const { $element: i } = this;
      if (t = i.find(`#${s}`)[0], !t) {
        const r = this.key;
        t = d("<div>").attr({
          id: s,
          "data-key": r
        }).data(this.constructor.KEY, this).css(e.style || {}).setClass("modal modal-async load-indicator", e.className).appendTo(i)[0];
      }
      he(this, $t, t);
    }
    return t;
  }
  get $emitter() {
    const t = wt(this, $t);
    return t ? d(t) : this.$element;
  }
  afterInit() {
    super.afterInit(), this.options.destoryOnHide && this.on("hidden", () => {
      this.destroy();
    });
  }
  show(t) {
    return super.show(t) ? (this.buildDialog(), !0) : !1;
  }
  destroy() {
    super.destroy();
    const t = wt(this, $t);
    t && (d(t).removeData(this.constructor.KEY).remove(), he(this, $t, void 0));
  }
  render(t) {
    return super.render(t), this.buildDialog();
  }
  async buildDialog() {
    if (this.loading)
      return !1;
    wt(this, Mt) && clearTimeout(wt(this, Mt));
    const { modalElement: t, options: e } = this, s = d(t), { type: i, loadTimeout: r, loadingClass: o = pr, loadingText: a = null } = e, l = Qc[i];
    if (!l)
      return console.warn(`Modal: Cannot build modal with type "${i}"`), !1;
    s.attr("data-loading", a).addClass(o), r && he(this, Mt, window.setTimeout(() => {
      he(this, Mt, 0), fn(this, pn, Is).call(this, this.options.timeoutTip);
    }, r));
    const c = await l.call(this, t, e);
    return c === !1 ? await fn(this, pn, Is).call(this, this.options.failedTip) : c && typeof c == "object" && await fn(this, Mn, Ei).call(this, c), wt(this, Mt) && (clearTimeout(wt(this, Mt)), he(this, Mt, 0)), this.layout(), await Sn(100), s.removeClass(o), !0;
  }
  static open(t) {
    return new Promise((e) => {
      const { container: s = document.body, ...i } = t, r = { show: !0, ...i };
      !r.type && r.url && (r.type = "ajax"), r.key === void 0 && (r.key = r.id);
      const o = de.ensure(s, r), a = `${de.NAMESPACE}.open${ut()}`;
      o.on(`hidden${a}`, () => {
        o.off(a), e(o);
      }), o.show();
    });
  }
  static async alert(t) {
    typeof t == "string" && (t = { message: t });
    const { type: e, message: s, icon: i, iconClass: r = "icon-lg muted", actions: o = "confirm", onClickAction: a, custom: l, key: c = "__alert", ...u } = t, h = (typeof l == "function" ? l() : l) || {};
    let m = typeof s == "object" && s.html ? /* @__PURE__ */ p("div", { dangerouslySetInnerHTML: { __html: s.html } }) : /* @__PURE__ */ p("div", { children: s });
    i ? m = /* @__PURE__ */ p("div", { className: T("modal-body row gap-4 items-center", h.bodyClass), children: [
      /* @__PURE__ */ p("div", { className: `icon ${i} ${r}` }),
      m
    ] }) : m = /* @__PURE__ */ p("div", { className: T("modal-body", h.bodyClass), children: m });
    const f = [];
    (Array.isArray(o) ? o : [o]).forEach((y) => {
      y = {
        ...typeof y == "string" ? { key: y } : y
      }, typeof y.key == "string" && (y.text || (y.text = j.getLang(y.key, y.key)), y.btnType || (y.btnType = `btn-wide ${y.key === "confirm" ? "primary" : "btn-default"}`)), y && f.push(y);
    }, []);
    let _;
    const g = f.length ? {
      gap: 4,
      items: f,
      onClickItem: ({ item: y, event: v }) => {
        const w = de.query(v.target, c);
        _ = y.key, (a == null ? void 0 : a(y, w)) !== !1 && w && w.hide();
      }
    } : void 0;
    return await de.open({
      key: c,
      type: "custom",
      size: 400,
      className: "modal-alert",
      content: m,
      backdrop: "static",
      hideOthers: !1,
      custom: { footerActions: g, ...h },
      ...u
    }), _;
  }
  static async confirm(t) {
    typeof t == "string" && (t = { message: t });
    const { onClickAction: e, onResult: s, ...i } = t;
    return await de.alert({
      actions: ["confirm", "cancel"],
      onClickAction: (o, a) => {
        s == null || s(o.key === "confirm", a), e == null || e(o, a);
      },
      ...i
    }) === "confirm";
  }
};
$t = /* @__PURE__ */ new WeakMap();
Pe = /* @__PURE__ */ new WeakMap();
Mt = /* @__PURE__ */ new WeakMap();
Mn = /* @__PURE__ */ new WeakSet();
Ei = function(n) {
  return new Promise((t) => {
    if (Array.isArray(n))
      return d(this.modalElement).html(n[0]).zuiInit(), this.layout(), this._observeResize(), t();
    const { afterRender: e, ...s } = n;
    n = {
      afterRender: (i) => {
        this.layout(), e == null || e(i), this._observeResize(), t();
      },
      ...s
    }, He(
      /* @__PURE__ */ p(Bo, { ...n }),
      this.modalElement
    );
  });
};
pn = /* @__PURE__ */ new WeakSet();
Is = function(n) {
  if (n)
    return fn(this, Mn, Ei).call(this, {
      body: /* @__PURE__ */ p("div", { className: "modal-load-failed", children: n })
    });
};
Uo.DEFAULT = {
  ...Ue.DEFAULT,
  loadTimeout: 1e4,
  destoryOnHide: !0
};
let Ps = Uo;
const th = '[data-toggle="modal"]';
class Rs extends Ot {
  get modal() {
    return this._modal;
  }
  get container() {
    const { container: t } = this.options;
    return typeof t == "string" ? document.querySelector(t) : t instanceof HTMLElement ? t : document.body;
  }
  show() {
    var t;
    return (t = this._initModal()) == null ? void 0 : t.show();
  }
  hide() {
    var t;
    return (t = this._modal) == null ? void 0 : t.hide();
  }
  _getBuilderOptions() {
    const {
      container: t,
      ...e
    } = this.options, s = e, i = this.$element.attr("href") || "";
    return s.type || (s.target || i[0] === "#" ? s.type = "static" : s.type = s.type || (s.url || i ? "ajax" : "custom")), !s.url && (s.type === "iframe" || s.type === "ajax") && i[0] !== "#" && (s.url = i), s.key === void 0 && (s.key = `${this._key}`), s;
  }
  _initModal() {
    const t = this._getBuilderOptions();
    let e = this._modal;
    if (e)
      return e.setOptions(t), e;
    if (t.type === "static") {
      const s = this._getStaticModalElement();
      if (!s)
        return;
      e = Ue.ensure(s, t);
    } else
      e = Ps.ensure(this.container, t);
    return this._modal = e, e.on("destroyed", () => {
      this._modal = void 0;
    }), e;
  }
  _getStaticModalElement() {
    let t = this.options.target;
    if (!t) {
      const { $element: e } = this;
      if (e.is("a")) {
        const s = e.attr("href");
        s != null && s.startsWith("#") && (t = s);
      }
    }
    return this.container.querySelector(t || ".modal");
  }
}
Rs.NAME = "ModalTrigger";
d(document).on(`click${Rs.NAMESPACE}`, th, (n) => {
  const t = d(n.currentTarget);
  if (t.length && !t.is("[disabled],.disabled,.open-in-parent,no-global-listener")) {
    const e = Rs.ensure(t);
    e && (e.show(), n.preventDefault());
  }
});
const eh = {
  zh_cn: {
    selectFile: "选择文件",
    fileSelectTip: "（不超过 {maxFileSize}）",
    removeFile: "移除文件",
    renameFile: "重命名",
    duplicatedTip: "文件 “{name}”（{size}） 已存在。",
    exceededSizeTip: "文件 “{name}”（{size}） 超过了 {maxSize} 的限制。",
    exceededTotalSizeTip: "文件 “{name}”（{size}） 超过了总大小 {totalFileSize} 的限制。",
    exceededCountTip: "文件 “{name}”（{size}） 超过了数量 {maxFileCount} 的限制。"
  },
  zh_tw: {
    selectFile: "選擇文件",
    fileSelectTip: "（不超過 {maxFileSize}）",
    removeFile: "移除文件",
    renameFile: "重命名",
    duplicatedTip: "文件 “{name}”（{size}） 已存在。",
    exceededSizeTip: "文件 “{name}”（{size}） 超過了 {maxFileSize} 的限制。",
    exceededTotalSizeTip: "文件 “{name}”（{size}） 超過了總大小 {totalFileSize} 的限制。",
    exceededCountTip: "文件 “{name}”（{size}） 超過了數量 {maxFileCount} 的限制。"
  },
  en: {
    selectFile: "Select File",
    fileSelectTip: "(Not exceeding {maxFileSize})",
    removeFile: "Remove File",
    renameFile: "Rename",
    duplicatedTip: "File “{name}” ({size}) already exists.",
    exceededSizeTip: "File “{name}” ({size}) exceeds the limit of {maxFileSize}.",
    exceededTotalSizeTip: "File “{name}” ({size}) exceeds the total size limit of {totalFileSize}.",
    exceededCountTip: "File “{name}” ({size}) exceeds the limit of {maxFileCount}."
  }
};
let Xt = class extends X {
  constructor(t) {
    super(t), this._input = K(), this._file = K(), this._id = `file-selector-input-${ut()}`, this._data = new DataTransfer(), this.stopRenameFile = () => {
      const { renaming: e, newName: s } = this.state;
      this.cancelRenameFile(), !(!e || !s) && this.renameFile(e, s);
    }, this.cancelRenameFile = () => {
      this.setState({ renaming: "" });
    }, this._handleChange = (e) => {
      const s = e.target;
      s.files && (this.selectFiles(s.files), this.setState({ inputKey: ut() }));
    }, this._handleDragOver = (e) => {
      e.preventDefault(), this.state.dragging || this.setState({ dragging: !0 });
    }, this._handleDragLeave = (e) => {
      e.preventDefault(), this.setState({ dragging: !1 });
    }, this._handleDrop = (e) => {
      var i;
      this._handleDragLeave(e);
      const s = this.constructor.filterFiles(((i = e.dataTransfer) == null ? void 0 : i.files) || [], this.props.accept);
      s.length && (this.selectFiles(s), this.setState({ inputKey: ut() }));
    }, this._handleRenameChange = (e) => {
      this.setState({
        newName: e.target.value
      });
    }, this._handleClick = (e) => {
      if (this.props.disabled)
        return;
      const i = d(e.target).closest("[data-remove-file],[data-rename-file]");
      if (!i.length)
        return;
      const r = i.data();
      r.renameFile ? this.startRenameFile(r.renameFile) : r.removeFile && this.removeFile(r.removeFile);
    }, this.state = {
      files: (t.defaultFiles || []).map((e) => this.constructor.getInfo(e)),
      inputKey: 0
    };
  }
  get size() {
    return this.state.files.reduce((t, e) => t + e.size, 0);
  }
  get count() {
    return this.state.files.length;
  }
  get multiple() {
    const { multiple: t, maxFileCount: e, name: s = "" } = this.props;
    return !!(e !== 1 && (t ?? s.endsWith("[]")));
  }
  get info() {
    const { maxFileSize: t = 0, maxFileCount: e = Number.MAX_SAFE_INTEGER } = this.props;
    return {
      size: Et(this.size, 1),
      maxFileSize: Et(typeof t == "string" ? an(t) : t, 1),
      maxFileCount: e,
      count: this.count
    };
  }
  get files() {
    return this._data.files;
  }
  componentDidMount() {
    const t = this.state.files.reduce((e, s) => (s.file && e.push(s.file), e), []);
    t.length && (t.forEach((e) => this._data.items.add(e)), this._syncFiles());
  }
  getFile(t) {
    return this.state.files.find((e) => e.id === t);
  }
  getFileByName(t) {
    return this.state.files.find((e) => e.name === t);
  }
  select() {
    var t;
    (t = this._input.current) == null || t.click();
  }
  async selectFiles(t) {
    var e;
    if (((e = this.props.onSelect) == null ? void 0 : e.call(this, t)) !== !1) {
      this._skipAddMore = !1;
      for (let s = 0; s < t.length && (await this.addFile(t[s]), !this._skipAddMore); s++)
        ;
    }
  }
  async _checkDuplicated(t) {
    const { allowSameName: e, onDuplicated: s, duplicatedTip: i = this.i18n("duplicatedTip") } = this.props, { name: r } = t, o = e ? this.getFile(t.id) : this.getFileByName(r);
    return o ? ((s == null ? void 0 : s.call(this, r, t, o)) === !0 || i && await this._showAlert(i, {
      name: r,
      size: Et(t.size, 1)
    }), !0) : !1;
  }
  async _checkExceededSize(t) {
    const { maxFileSize: e, onExceededSize: s, exceededSizeTip: i = this.i18n("exceededSizeTip") } = this.props;
    if (!e)
      return !1;
    const r = typeof e == "string" ? an(e) : e;
    return t.size <= r ? !1 : ((s == null ? void 0 : s.call(this, r, t)) === !0 || i && await this._showAlert(i, {
      name: t.name,
      size: Et(t.size, 1)
    }), !0);
  }
  async _checkTotalSize(t) {
    const { totalFileSize: e, onExceededTotalSize: s, exceededTotalSizeTip: i = this.i18n("exceededTotalSizeTip") } = this.props;
    if (!e)
      return !1;
    const r = typeof e == "string" ? an(e) : e, o = t.size + this.size;
    return o <= r ? !1 : ((s == null ? void 0 : s.call(this, r, t)) === !0 || i && await this._showAlert(i, {
      name: t.name,
      size: Et(t.size, 1),
      totalSize: Et(o, 1)
    }), !0);
  }
  async _checkExceededCount(t) {
    const { maxFileCount: e = 0, onExceededCount: s, exceededCountTip: i = this.i18n("exceededCountTip") } = this.props;
    if (!e)
      return !1;
    const r = this.count + 1;
    return r <= e ? !1 : ((s == null ? void 0 : s.call(this, e, t)) === !0 || i && await this._showAlert(i, {
      name: t.name,
      size: Et(t.size, 1),
      exceededCount: r
    }), !0);
  }
  async addFile(t) {
    const { onAdd: e, disabled: s } = this.props;
    if (s)
      return !1;
    const i = this.constructor.getInfo(t);
    return await this._checkExceededCount(i) ? (this._skipAddMore = !0, !1) : await this._checkDuplicated(i) ? !1 : await this._checkExceededSize(i) ? (this._skipAddMore = !0, !1) : await this._checkTotalSize(i) ? (this._skipAddMore = !0, !1) : e && e.call(this, i) === !1 ? !1 : (this._data.items.add(t), this._syncFiles(), await this.changeState((c) => ({ files: [...c.files, i] })), !0);
  }
  startRenameFile(t) {
    this.setState({ renaming: t, newName: void 0 }, () => {
      const e = d(this._file.current).closest(".file-selector").find(".file-selector-rename-input")[0];
      e && (e.select(), e.focus());
    });
  }
  async renameFile(t, e) {
    const s = this.getFile(t);
    if (!s || s.name === e)
      return;
    const { onRename: i } = this.props;
    if (i && await i.call(this, e, s.name, s) === !1)
      return;
    const r = s.file;
    if (r) {
      const l = new File([r], e, { type: r.type, lastModified: r.lastModified }), c = Array.from(this._data.files).indexOf(r);
      c >= 0 && this._data.items.remove(c), this._data.items.add(l), this._syncFiles(), s.file = l;
    }
    s.name = e, s.ext = this.constructor.getExt(e);
    const { files: o } = this.state, a = o.indexOf(s);
    a >= 0 ? o.splice(a, 1, s) : o.push(s), this.setState({ files: [...o] });
  }
  async removeFile(t) {
    const e = this.getFile(t);
    if (!e)
      return;
    const { onRemove: s, removeConfirm: i } = this.props;
    if (i) {
      let o = i;
      if (typeof o == "string" && (o = { message: o }), typeof o.message == "string" && (o.message = G(o.message, {
        name: e.name,
        size: Et(e.size, 1)
      })), !await Ps.confirm(o))
        return;
    }
    if (s && await s.call(this, e) === !1)
      return;
    if (e.file) {
      const o = Array.from(this._data.files).indexOf(e.file);
      o >= 0 && this._data.items.remove(o);
    }
    const r = this.state.files.indexOf(e);
    r >= 0 && (this.state.files.splice(r, 1), this.setState({ files: this.state.files }));
  }
  _syncFiles() {
    this._file.current.files = this._data.files;
  }
  _showAlert(t, e) {
    return typeof t == "string" && (t = { message: t }), typeof t.message == "string" && (t.message = G(t.message, { ...this.info, ...e })), Ps.alert(t);
  }
  _getTip(t) {
    return typeof t == "string" ? G(t, this.info) : t;
  }
  _renderInput(t) {
    return /* @__PURE__ */ p("input", { id: this._id, multiple: this.multiple, accept: t.accept, style: "display:none", type: "file", ref: this._input, onChange: this._handleChange }, `input${this.state.inputKey}`);
  }
  _getDraggableProps() {
    const t = {};
    return this.props.draggable && !this.props.disabled && (t.onDragOver = this._handleDragOver, t.onDragLeave = this._handleDragLeave, t.onDrop = this._handleDrop), t;
  }
  _renderUpload(t) {
    const { mode: e, disabled: s, tip: i = this.i18n("fileSelectTip"), uploadBtn: r } = t, o = W({
      component: "label",
      attrs: {
        for: s ? void 0 : this._id
      },
      disabled: s,
      text: this.i18n("selectFile")
    }, typeof r == "object" ? r : typeof r == "string" ? { text: r } : {}), a = /* @__PURE__ */ p("div", { className: "file-selector-tip", children: /* @__PURE__ */ p(V, { content: this._getTip(i), generatorThis: this, generatorArgs: [this.state] }) }), l = e === "grid", c = l ? {} : this._getDraggableProps();
    return l || e === "box" ? /* @__PURE__ */ p(U, { ...o, ...c, className: T(l ? "file-selector-grid-btn" : "file-selector-box", o.className), children: a }, "upload") : /* @__PURE__ */ p("div", { className: "file-selector-btn", ...c, children: [
      /* @__PURE__ */ p(U, { rounded: "full", size: "sm", ...o }),
      a
    ] }, "upload");
  }
  _renderForForm(t) {
    const { name: e, accept: s } = t;
    return /* @__PURE__ */ p("input", { ref: this._file, type: "file", name: e, multiple: this.multiple, accept: s, style: "display:none" }, "form");
  }
  _getIcon(t) {
    let { fileIcons: e } = this.props;
    if (e)
      return typeof e == "string" && (e = { default: e }), e[t.ext] ?? e.default;
  }
  _getThumbnail(t) {
    if ((t.file || t.url) && this.props.thumbnail && this.constructor.isImage(t))
      return t.url || URL.createObjectURL(t.file);
  }
  _getAvatar(t) {
    const e = this._getThumbnail(t);
    let s;
    if (e)
      s = { src: e };
    else {
      const i = this._getIcon(t);
      i && (s = { icon: i });
    }
    return s && {
      size: this.props.mode === "grid" ? void 0 : "sm",
      ...s
    };
  }
  _getFileActions(t) {
    if (this.props.disabled)
      return;
    let { removeBtn: e, renameBtn: s } = this.props;
    typeof e == "function" && (e = e.call(this, t)), typeof e == "string" ? e = { text: e } : e === !0 && (e = { hint: this.i18n("removeFile"), icon: "trash" }), typeof s == "function" && (s = s.call(this, t)), typeof s == "string" ? s = { text: s } : s === !0 && (s = { hint: this.i18n("renameFile"), icon: "edit" });
    const i = [];
    return s && i.push({
      "data-rename-file": t.id,
      ...s
    }), e && i.push({
      "data-remove-file": t.id,
      ...e
    }), i;
  }
  _renderFile(t) {
    let { itemProps: e } = this.props;
    return e = W({
      className: this.props.mode === "grid" ? "file-selector-grid-item" : "file-selector-item",
      multiline: !1,
      title: t.name,
      subtitle: Et(t.size, 1),
      avatar: this._getAvatar(t),
      actions: this._getFileActions(t),
      "z-id": t.id
    }, typeof e == "function" ? e.call(this, t) : e), /* @__PURE__ */ p(je, { ...e }, t.id);
  }
  _renderFileRename(t) {
    let { itemProps: e } = this.props;
    if (typeof e == "function")
      e = e.call(this, t);
    else {
      const { newName: s = t.name } = this.state, i = this.props.mode === "grid", r = /* @__PURE__ */ p("div", { className: "file-selector-rename-text", children: [
        /* @__PURE__ */ p("div", { className: "form-control size-sm", children: s }),
        /* @__PURE__ */ p("input", { type: "text", defaultValue: t.name, className: "form-control size-sm select-all file-selector-rename-input", autofocus: !0, onBlur: i ? this.stopRenameFile : void 0, onChange: this._handleRenameChange, onInput: this._handleRenameChange })
      ] });
      e = W({
        className: `${i ? "file-selector-grid-item" : "file-selector-item"} is-renaming`,
        multiline: !1,
        avatar: this._getAvatar(t),
        "z-id": t.id,
        contentClass: "file-selector-rename",
        content: i ? r : [
          r,
          /* @__PURE__ */ p(U, { icon: "check", text: this.i18n("confirm"), type: "primary-pale", size: "sm", onClick: this.stopRenameFile }),
          /* @__PURE__ */ p(U, { icon: "close", text: this.i18n("cancel"), type: "gray-pale", size: "sm", onClick: this.cancelRenameFile })
        ]
      }, e);
    }
    return /* @__PURE__ */ p(je, { ...e }, t.id);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _renderList(t) {
    const { files: e, renaming: s } = this.state;
    return /* @__PURE__ */ p("div", { className: `file-selector-list${e.length ? "" : " is-empty"}`, onClick: this._handleClick, children: e.map((i) => i.id === s ? this._renderFileRename(i) : this._renderFile(i)) }, "list");
  }
  _renderGrid(t) {
    const e = this._getDraggableProps(), { gridWidth: s = 120, gridHeight: i = 148, gridGap: r = 12 } = t, o = {
      "--file-selector-grid-width": dn(s),
      "--file-selector-grid-height": dn(i),
      "--file-selector-grid-gap": dn(r)
    }, { files: a, renaming: l } = this.state;
    return /* @__PURE__ */ p("div", { className: "file-selector-grid", style: o, onClick: this._handleClick, ...e, children: [
      a.map((c) => c.id === l ? this._renderFileRename(c) : this._renderFile(c)),
      this._renderUpload(t)
    ] }, "grid");
  }
  _getClassName(t) {
    return ["file-selector", `is-mode-${t.mode}`, t.className, this.state.dragging ? "is-dragging" : ""];
  }
  _getChildren(t) {
    const e = t.mode === "grid";
    return [
      e ? null : this._renderUpload(t),
      e ? this._renderGrid(t) : this._renderList(t),
      this._renderInput(t),
      this._renderForForm(t)
    ];
  }
  static getExt(t) {
    return (t.split(".").pop() || "").toLowerCase();
  }
  static getInfo(t) {
    const { name: e, size: s, type: i } = t;
    if (t instanceof File)
      return {
        name: e,
        size: s,
        type: i,
        file: t,
        id: [e, s].join(":"),
        ext: this.getExt(e)
      };
    const r = typeof s == "string" ? an(s) : s;
    return {
      name: e,
      size: r,
      id: t.id ?? [e, r].join(":"),
      type: i ?? "",
      ext: this.getExt(e),
      file: t.file,
      url: t.url
    };
  }
  static isAccept(t, e) {
    return !e || !e.length ? !0 : (Array.isArray(e) ? e : e.split(",")).some((i) => t.type && i === t.type ? !0 : i.startsWith(".") ? t.name.endsWith(i) : i.endsWith("/*") ? t.type.startsWith(i.slice(0, -1)) : !1);
  }
  static isImage(t) {
    return this.isAccept(t, this.imageAccepts);
  }
  static filterFiles(t, e) {
    if (!e || !e.length)
      return t;
    t instanceof FileList && (t = Array.from(t));
    const s = e.split(",");
    return t.filter((i) => this.isAccept(i, s));
  }
};
Xt.defaultProps = {
  mode: "button",
  maxFileSize: "100MB",
  fileIcons: "file",
  renameBtn: !0,
  removeBtn: !0,
  draggable: !0,
  thumbnail: !0,
  maxFileCount: 0
};
Xt.i18n = eh;
Xt.imageAccepts = "image/*,.png,.jpg,.jpeg,.gif";
let $i = class extends Xt {
};
$i.defaultProps = {
  ...Xt.defaultProps,
  mode: "grid",
  accept: Xt.imageAccepts
};
const nh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FileSelector: Xt,
  ImageSelector: $i
}, Symbol.toStringTag, { value: "Module" }));
class Mi extends B {
}
Mi.NAME = "FileSelector";
Mi.Component = Xt;
Mi.replace = !0;
class Ai extends B {
}
Ai.NAME = "ImageSelector";
Ai.Component = $i;
Ai.replace = !0;
rt(nh);
let ss = class extends Jn {
  _getClassName(t) {
    const { type: e, stacked: s } = t;
    return [super._getClassName(t), e ? `nav-${e}` : "", s ? "nav-stacked" : ""];
  }
};
ss.NAME = "nav";
ss.defaultItemProps = {
  component: "li",
  innerComponent: "a"
};
const sh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Nav: ss
}, Symbol.toStringTag, { value: "Module" }));
class Ko extends B {
}
Ko.NAME = "Nav";
Ko.Component = ss;
rt(sh);
function Ke(n, t) {
  const e = n.pageTotal || Math.ceil(n.recTotal / n.recPerPage);
  return typeof t == "string" && (t === "first" ? t = 1 : t === "last" ? t = e : t === "prev" ? t = n.page - 1 : t === "next" ? t = n.page + 1 : t === "current" ? t = n.page : t = Number.parseInt(t, 10)), t = t !== void 0 ? Math.max(1, Math.min(t < 0 ? e + t : t, e)) : n.page, {
    ...n,
    pageTotal: e,
    page: t
  };
}
function qo({
  key: n,
  type: t,
  btnType: e,
  page: s,
  format: i,
  pagerInfo: r,
  linkCreator: o,
  ...a
}) {
  const l = Ke(r, s);
  return a.text === void 0 && !a.icon && i && (a.text = typeof i == "function" ? i(l) : G(i, l)), a.url === void 0 && o && (a.url = typeof o == "function" ? o(l) : G(o, l)), a.disabled === void 0 && (a.disabled = s !== void 0 && l.page === r.page), /* @__PURE__ */ p(U, { type: e, ...a });
}
function Go({
  key: n,
  type: t,
  page: e,
  text: s = "",
  pagerInfo: i,
  children: r,
  ...o
}) {
  const a = Ke(i, e);
  return s = typeof s == "function" ? s(a) : G(s, a), /* @__PURE__ */ p(X, { ...o, children: [
    r,
    s
  ] });
}
function ih({
  type: n,
  btnType: t,
  count: e = 12,
  pagerInfo: s,
  linkCreator: i,
  ...r
}) {
  if (!s.pageTotal)
    return;
  const o = { ...r, square: !0 }, a = () => (o.text = "", o.icon = "icon-ellipsis-h", o.disabled = !0, /* @__PURE__ */ p(U, { type: t, ...o })), l = (u, h) => {
    const m = [];
    for (let f = u; f <= h; f++) {
      o.text = f, delete o.icon, o.disabled = !1;
      const _ = Ke(s, f);
      i && (o.url = typeof i == "function" ? i(_) : G(i, _)), m.push(/* @__PURE__ */ p(U, { type: t, ...o }));
    }
    return m;
  };
  let c = [];
  return c = [...l(1, 1)], s.pageTotal <= 1 || (s.pageTotal <= e ? c = [...c, ...l(2, s.pageTotal)] : s.page < e - 2 ? c = [...c, ...l(2, e - 2), a(), ...l(s.pageTotal, s.pageTotal)] : s.page > s.pageTotal - e + 3 ? c = [...c, a(), ...l(s.pageTotal - e + 3, s.pageTotal)] : c = [...c, a(), ...l(s.page - Math.ceil((e - 4) / 2), s.page + Math.floor((e - 4) / 2)), a(), ...l(s.pageTotal, s.pageTotal)]), c;
}
let rh = class extends H {
  render(t) {
    const {
      id: e,
      popup: s,
      title: i,
      content: r,
      style: o,
      className: a,
      closeBtn: l,
      arrow: c,
      headingClass: u,
      titleClass: h,
      contentClass: m,
      arrowStyle: f,
      onlyInner: _
    } = t;
    let g = /* @__PURE__ */ p(V, { content: r }, "content");
    (m || i) && (g = /* @__PURE__ */ p("div", { className: m, children: g }, "content"));
    const y = [], v = l ? /* @__PURE__ */ p("button", { className: "btn ghost square size-sm btn-close", "data-dismiss": "popover", children: /* @__PURE__ */ p("span", { className: "close" }) }) : null;
    return i ? y.push(/* @__PURE__ */ p("div", { className: u, children: [
      i ? /* @__PURE__ */ p("div", { className: h, children: i }) : null,
      v
    ] }, "heading")) : y.push(v), y.push(g), c && y.push(/* @__PURE__ */ p("div", { className: typeof c == "string" ? c : "arrow", style: f }, "arrow")), _ ? y : /* @__PURE__ */ p("div", { id: e, className: T("popover", a, { popup: s }), style: o, children: y });
  }
};
class Ii extends B {
}
Ii.NAME = "PopoverPanel";
Ii.Component = rh;
const oh = '[data-toggle="popover"]', mr = "show", gr = "in";
class ht extends Ot {
  constructor() {
    super(...arguments), this._getClickBounding = () => {
      const t = this._triggerEvent;
      return {
        x: t.clientX,
        y: t.clientY,
        left: t.clientX,
        top: t.clientY,
        width: 0,
        height: 0,
        bottom: t.clientY,
        right: t.clientX
      };
    }, this._onClickDoc = (t) => {
      const e = d(t.target);
      !e.closest(`#${this._id}`).length && (this._virtual || !e.closest(this._triggerElement).length) && this._targetElement !== e.closest(".popover")[0] && this.hide();
    };
  }
  get shown() {
    return this._shown;
  }
  get id() {
    return this._id;
  }
  afterInit() {
    const { trigger: t, id: e, triggerEvent: s } = this.options;
    this._triggerEvent = s, this._id = e || `popover_${this.gid}`;
    const i = this.getTriggerElement();
    if (i instanceof HTMLElement) {
      const o = d(i), { namespace: a } = this;
      t === "hover" ? o.on(`pointerenter${a}`, (l) => {
        if (o.is("[disabled],.disabled"))
          return;
        const c = o.dataset("target");
        c && this.setOptions({ target: c }), this.show({ delay: !0, event: l });
      }).on(`pointerleave${a} pointercancel${a}`, () => {
        this.delayHide();
      }) : t && o.on(`${t}${a}`, (l) => {
        if (o.is("[disabled],.disabled"))
          return;
        const c = o.dataset("target");
        !this.shown && c && this.setOptions({ target: c }), this.toggle({ event: l }), l.preventDefault();
      });
    }
    const { show: r } = this.options;
    r && this.show({ delay: typeof r == "number" ? r : !1 });
  }
  getTriggerElement() {
    if (!this._triggerElement) {
      let { element: t = this.element } = this.options;
      t === document.body && (t = {
        getBoundingClientRect: this._getClickBounding
      }), this._triggerElement = t, this._virtual = !(t instanceof HTMLElement);
    }
    return this._triggerElement;
  }
  initTarget() {
    let t = this.options.target;
    return this._dynamic = !t, t ? (typeof t == "function" && (t = t()), d(t)[0]) : this._createTarget();
  }
  show(t) {
    const { delay: e, event: s, hideOthers: i } = t || {};
    if (s && (this._triggerEvent = s), e)
      return this._resetTimer(() => {
        this.show();
      }, e === !0 ? this.options.delay : e);
    if (!this.inited) {
      this.setOptions({ show: !0 });
      return;
    }
    if (this._shown)
      return;
    const r = this.initTarget();
    if (!r)
      return;
    this._targetElement = r;
    const o = d(r), { animation: a, mask: l, onShow: c, onShown: u, trigger: h } = this.options;
    o.addClass(mr), a && o.addClass(a === !0 ? "fade" : a), this._shown = !0, this.render(), c == null || c.call(this), this.emit("show");
    const m = this.constructor, { hideOthers: f } = this.options;
    (i || m.hideOthers && this.options.hideOthers !== !1 || f) && m.getAll().forEach((g) => {
      g !== this && g.shown && !o.closest(g.element).length && g.hide();
    });
    const { namespace: _ } = this;
    h === "hover" && (this._clearDelayHide(), o.off(_).on(`pointerenter${_}`, () => {
      this._clearDelayHide();
    }).on(`pointerleave${_}`, () => {
      this.delayHide();
    })), o.on(`click${_}`, '[data-dismiss="popover"]', () => {
      this.hide();
    }), this._virtual || d(this._triggerElement).addClass("with-popover-show"), this._resetTimer(() => {
      o.addClass(gr), this._resetTimer(() => {
        u == null || u.call(this), this.emit("shown");
      }, 200), l && d(document).off(`click${this.namespace}`, this._onClickDoc).on(`click${this.namespace}`, this._onClickDoc);
    }, 50);
  }
  hide(t) {
    (!this._shown || !this._targetElement) && this._resetTimer();
    const { destroyOnHide: e, animation: s, onHide: i, onHidden: r, trigger: o } = this.options, a = d(this._targetElement);
    this._shown = !1, i == null || i.call(this), this.emit("hide"), a.removeClass(gr), o === "hover" && (this._clearDelayHide(), a.off(this.namespace)), this._virtual || d(this._triggerElement).removeClass("with-popover-show").removeAttr("data-pop-placement"), d(document).off(this.namespace), this._resetTimer(() => {
      r == null || r.call(this), this.emit("hidden"), a.removeClass(mr), (e || t) && this._resetTimer(() => {
        this.destroy();
      }, !t && typeof e == "number" ? e : 0), this._destoryTarget();
    }, s ? 200 : 0);
  }
  toggle(t) {
    this._shown ? this.hide() : this.show(t);
  }
  destroy() {
    if (super.destroy(), d(document).off(this.namespace), !this._virtual) {
      const { namespace: t } = this;
      d(this._triggerElement).off(t);
    }
    this._resetTimer(), this._destoryTarget(), this._clearDelayHide();
  }
  layout() {
    const t = this._triggerElement, e = this._targetElement, s = this._layoutWatcher;
    if (!e || !t || !this._shown) {
      s && (s(), this._layoutWatcher = void 0);
      return;
    }
    s || (this._layoutWatcher = $o(t, e, () => {
      const { animation: i, name: r = "popover" } = this.options;
      if (!this._virtual) {
        const o = {}, { width: a, height: l } = this.options;
        a && (o.width = typeof a == "function" ? a() : a === "100%" ? d(t).width() : a), l && (o.height = typeof l == "function" ? l() : l), Object.keys(o).length && d(e).css(o);
      }
      Ti(...this._getLayoutOptions()).then(({ x: o, y: a, middlewareData: l, placement: c, strategy: u }) => {
        if (t instanceof HTMLElement && Se(t)) {
          this.hide(!0);
          return;
        }
        const h = {
          position: u,
          left: o,
          top: a
        }, m = d(e).css(h), f = c.split("-")[0], _ = {
          top: "bottom",
          right: "left",
          bottom: "top",
          left: "right"
        }[f], g = l.arrow;
        g && m.attr("data-pop-placement", f).find(".arrow").css({
          left: g.x,
          top: g.y
        }).attr("class", `arrow ${r}-arrow arrow-${_}`), i === !0 && m.attr("class", `${m.attr("class").split(" ").filter((y) => y !== "fade" && !y.startsWith("fade-from")).join(" ")} fade-from-${_}`), this._virtual || d(this._triggerElement).attr("data-pop-placement", f);
      });
    }));
  }
  render(t) {
    super.render(t);
    const e = this._targetElement;
    if (!e)
      return;
    const s = this._getRenderOptions(), i = d(e);
    if (i.toggleClass("popup", s.popup).css(s.style), s.className && i.setClass(s.className), this._dynamic) {
      let r = this._panel;
      r && r.element !== e && (r.destroy(), r = void 0), r ? r.render(s) : (r = new Ii(e, s), r.on("inited", () => this.layout())), this._panel = r;
    } else
      s.arrow && (i.find(".arrow").length || i.append(d('<div class="arrow"></div>').css(s.arrowStyle))), this.layout();
  }
  delayHide(t = 100) {
    this._resetTimer(), this._clearDelayHide(), this._hideTimer = window.setTimeout(() => {
      this._hideTimer = 0, this.hide();
    }, t);
  }
  _clearDelayHide() {
    this._hideTimer && (clearTimeout(this._hideTimer), this._hideTimer = 0);
  }
  _getLayoutOptions() {
    const t = this._triggerElement, e = this._targetElement, { placement: s, flip: i, limitSize: r, shift: o, offset: a, arrow: l, strategy: c } = this.options, u = l ? e.querySelector(".arrow") : null, h = u ? typeof l == "number" ? l : 5 : 0;
    return [t, e, {
      placement: s,
      strategy: c,
      middleware: [
        i ? wi() : null,
        o ? Ci(typeof o == "object" ? o : void 0) : null,
        a || h ? bi((a || 0) + h) : null,
        l ? Tc({ element: u }) : null,
        r ? bo({
          apply({ availableWidth: m, availableHeight: f, placement: _ }) {
            d(e).css({ maxHeight: f - (["top", "bottom"].includes(_.split("-")[0]) ? h : 0) - 2, maxWidth: m - 2 });
          }
        }) : null
      ].filter(Boolean)
    }];
  }
  _getRenderOptions() {
    const { name: t = "popover" } = this.options, {
      popup: e,
      title: s,
      content: i,
      headingClass: r = `${t}-heading`,
      titleClass: o = `${t}-title`,
      contentClass: a = `${t}-content`,
      style: l,
      className: c = t,
      closeBtn: u,
      arrow: h
    } = this.options;
    return {
      popup: e,
      title: s,
      titleClass: o,
      headingClass: r,
      contentClass: a,
      content: i,
      style: { zIndex: this.constructor.Z_INDEX++, ...l },
      className: c,
      closeBtn: u,
      arrow: h ? `arrow ${t}-arrow` : !1,
      arrowStyle: { "--arrow-size": `${typeof h == "number" ? h : 5}px` },
      onlyInner: !0
    };
  }
  _destoryTarget() {
    var t, e, s;
    (t = this._layoutWatcher) == null || t.call(this), this._layoutWatcher = void 0, this._dynamic && ((e = this._panel) == null || e.destroy(), (s = this._targetElement) == null || s.remove(), this._panel = void 0, this._targetElement = void 0);
  }
  _resetTimer(t, e = 0) {
    this._timer && clearTimeout(this._timer), t && (this._timer = window.setTimeout(() => {
      this._timer = 0, t();
    }, e));
  }
  _createTarget() {
    const { container: t = "body" } = this.options, e = d(t);
    let s = e.find(`#${this._id}`);
    return s.length || (s = d("<div />").attr({ id: this._id, class: "popover" }).appendTo(e)), s[0];
  }
  static show(t) {
    const { element: e, event: s, ...i } = t, r = e || (s == null ? void 0 : s.currentTarget);
    return this.ensure(r instanceof HTMLElement ? r : document.body, { element: r, show: !0, destroyOnHide: !0, triggerEvent: s, ...i });
  }
}
ht.NAME = "Popover";
ht.Z_INDEX = 1700;
ht.MULTI_INSTANCE = !0;
ht.DEFAULT = {
  placement: "top",
  strategy: "absolute",
  flip: !0,
  arrow: !0,
  offset: 1,
  trigger: "click",
  mask: !0,
  delay: 0,
  animation: !0,
  closeBtn: !0,
  popup: !0
};
ht.hideOthers = !1;
d(document).on(`click${ht.NAMESPACE} pointerenter${ht.NAMESPACE}`, oh, (n) => {
  const t = d(n.currentTarget);
  if (t.length && !t.data(ht.KEY)) {
    const e = t.data("trigger") || "click";
    if ((n.type === "mouseover" || n.type === "pointerenter" ? "hover" : "click") !== e)
      return;
    ht.ensure(t, { show: !0, triggerEvent: n }), n.preventDefault();
  }
});
const ah = '[data-toggle="dropdown"]';
class qt extends ht {
  constructor() {
    super(...arguments), this._onClickDoc = (t) => {
      const e = d(t.target);
      !e.closest(".not-hide-menu,.form-control,input,label,.nested-toggle-icon").length && (this._virtual || !e.closest(this._triggerElement).length) && this.hide();
    };
  }
  _getMenuOptions() {
    const { items: t, placement: e, menu: s, tree: i, onClickItem: r, relativeTarget: o = this._triggerElement } = this.options;
    return {
      items: t,
      placement: e,
      tree: i,
      onClickItem: r,
      nestedToggle: ".item",
      accordion: !0,
      relativeTarget: { target: o, event: this.options.triggerEvent, dropdown: this },
      popup: !0,
      ...s
    };
  }
  _getRenderOptions() {
    const t = super._getRenderOptions();
    return this._dynamic ? {
      ...t,
      contentClass: "",
      popup: !1,
      content: xt(Pi, this._getMenuOptions())
    } : t;
  }
}
qt.NAME = "Dropdown";
qt.DEFAULT = {
  ...ht.DEFAULT,
  name: "dropdown",
  placement: "bottom-start",
  arrow: !1,
  closeBtn: !1,
  animation: "fade",
  limitSize: !0
};
d(document).on(`click${qt.NAMESPACE} mouseenter${qt.NAMESPACE}`, ah, (n) => {
  const t = d(n.currentTarget);
  if (t.length && !t.data(qt.KEY) && !t.is("[disabled],.disabled")) {
    const e = t.data() || {}, s = e.trigger || "click";
    if ((n.type === "mouseover" ? "hover" : "click") !== s)
      return;
    const r = {
      ...e,
      show: !0,
      triggerEvent: n
    };
    if (!r.target && t.is("a")) {
      const o = t.attr("href");
      o && "#.".includes(o[0]) && (r.target = o);
    }
    !r.target && !r.items && !r.menu && (r.target = t.next(".dropdown-menu")), qt.ensure(t, r), n.preventDefault();
  }
});
class is extends U {
  constructor() {
    super(...arguments), this._ref = K();
  }
  get triggerElement() {
    return this._ref.current;
  }
  _updateData() {
    const { dropdown: t, menu: e, items: s, onClickItem: i, relativeTarget: r = this.triggerElement } = this.props, o = d(this.triggerElement), a = qt.get(this.triggerElement), l = {
      items: s,
      onClickItem: i,
      menu: e,
      relativeTarget: r,
      ...t
    };
    a ? a.setOptions(l) : o.data(l);
  }
  componentDidMount() {
    this._updateData();
  }
  componentDidUpdate() {
    this._updateData();
  }
  componentWillUnmount() {
    var t;
    (t = qt.get(this.triggerElement)) == null || t.destroy();
  }
  _getProps(t) {
    const { trigger: e, placement: s } = t;
    return {
      ...super._getProps(t),
      "data-toggle": "dropdown",
      "data-trigger": e,
      "data-placement": s,
      ref: this._ref
    };
  }
}
is.defaultProps = {
  caret: !0
};
Object.assign(Ct.ItemComponents, { dropdown: is });
Object.assign(St.ItemComponents, { dropdown: is });
class Pi extends yt {
  get isHoverTrigger() {
    const { nestedTrigger: t, tree: e } = this.props;
    return t ? t === "hover" : !e;
  }
  layout() {
    var r;
    if (this.props.tree || this.isRoot)
      return;
    const t = (r = this.element) == null ? void 0 : r.parentElement, i = d(t).parent().children(".dropdown-menu").children(`[z-key-path="${this.props.parentKey}"]`)[0];
    !t || !i || Ti(i, t, {
      placement: this.props.placement,
      middleware: [wi(), Ci(), bi(1), bo({
        apply({ availableWidth: o, availableHeight: a }) {
          d(t).css({ maxHeight: a - 2, maxWidth: o - 2 });
        }
      })]
    }).then(({ x: o, y: a }) => {
      d(t).css({
        left: o,
        top: a
      });
    });
  }
  _getClassName(t) {
    return ["dropdown-menu scrollbar-hover scrollbar-thin", super._getClassName(t)];
  }
  _afterRender(t) {
    super._afterRender(t), this.layout();
  }
  _getNestedProps(t, e, s, i) {
    return W(this.isHoverTrigger ? {
      "z-key": s.key,
      "z-hover": this.props.parentKey ?? "root",
      onMouseEnter: this._handleHover,
      onMouseLeave: this._handleHover
    } : {}, super._getNestedProps(t, e, s, i));
  }
  _getItemFromEvent(t) {
    const e = super._getItemFromEvent(t);
    if (e)
      return e;
    const s = d(t.target).closest(".dropdown-menu[z-key]");
    if (s.length) {
      const i = s.attr("z-key"), r = s.parent().parent().children(".dropdown-menu").children(`[z-key="${i}"]`);
      if (r.length)
        return super._getItemFromEvent(t, r[0]);
    }
  }
  _renderNestedList(t, e, s, i) {
    const r = super._renderNestedList(t, e, s, i);
    if (this.props.tree)
      return r;
    this._nestedContextMenu.push(r);
  }
  _getWrapClass(t) {
    return [super._getWrapClass(t), t.tree ? "is-tree" : this.isRoot ? "is-contextmenu" : "is-contextmenu popup"];
  }
  _renderWrapperFooter(t) {
    const e = super._renderWrapperFooter(t), s = this._nestedContextMenu;
    return this.props.tree || !s.length ? e : [e, ...s];
  }
  _renderNestedToggle(t, e) {
    if (this.props.tree)
      return super._renderNestedToggle(t, e);
    if (typeof e == "boolean")
      return /* @__PURE__ */ p("span", { className: `${this.name}-toggle nested-toggle-icon`, children: /* @__PURE__ */ p("span", { className: "caret-right" }) });
  }
  _beforeRender(t) {
    return this._nestedContextMenu = [], super._beforeRender(t);
  }
}
Pi.defaultProps = {
  ...yt.defaultProps,
  searchBox: !1,
  placement: "right-start",
  defaultNestedShow: !1,
  expandOnSearch: !1
};
Pi.inheritNestedProps = [...yt.inheritNestedProps, "container", "tree"];
function lh({
  type: n,
  pagerInfo: t,
  linkCreator: e,
  items: s = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 100, 200, 500, 1e3, 2e3],
  dropdown: i = {},
  itemProps: r,
  ...o
}) {
  var l;
  i.items = i.items || s.map((c) => {
    const u = { ...t, recPerPage: c };
    return {
      ...r,
      key: c,
      text: `${c}`,
      active: c === t.recPerPage,
      url: typeof e == "function" ? e(u) : G(e, u)
    };
  });
  const { text: a = "" } = o;
  return o.text = typeof a == "function" ? a(t) : G(a, t), i.menu = { ...i.menu, className: T((l = i.menu) == null ? void 0 : l.className, "pager-size-menu") }, /* @__PURE__ */ p(is, { dropdown: i, ...o });
}
function Yo({
  key: n,
  page: t,
  type: e,
  btnType: s,
  pagerInfo: i,
  size: r,
  onClick: o,
  onChange: a,
  linkCreator: l,
  ...c
}) {
  const u = { ...c };
  let h;
  const m = (g) => {
    var y;
    h = Number((y = g.target) == null ? void 0 : y.value) || 1, h = h > i.pageTotal ? i.pageTotal : h;
  }, f = (g) => {
    if (!(g != null && g.target))
      return;
    h = h <= i.pageTotal ? h : i.pageTotal;
    const y = Ke(i, h);
    a && !a({ info: y, event: g }) || (g.target.href = u.url = typeof l == "function" ? l(y) : G(l, y));
  }, _ = Ke(i, t || 0);
  return u.url = typeof l == "function" ? l(_) : G(l, _), /* @__PURE__ */ p("div", { className: T("input-group", "pager-goto-group", r ? `size-${r}` : ""), children: [
    /* @__PURE__ */ p("input", { type: "number", class: "form-control", max: i.pageTotal, min: "1", onInput: m }),
    /* @__PURE__ */ p(U, { type: s, ...u, onClick: f })
  ] });
}
let sn = class extends St {
  get pagerInfo() {
    return this._pagerInfo;
  }
  _isBtnType(t) {
    const { type: e } = t;
    return super._isBtnType(t) || ["link", "nav", "size-menu", "goto"].includes(e);
  }
  _beforeRender(t) {
    const { page: e = 1, recTotal: s = 0, recPerPage: i = 10 } = this.props;
    return this._pagerInfo = { page: +e, recTotal: +s, recPerPage: +i, pageTotal: i ? Math.ceil(s / i) : 0 }, super._beforeRender(t);
  }
  _getItem(t, e, s) {
    const i = super._getItem(t, e, s);
    if (!i)
      return i;
    const { type: r = "item" } = e, o = this._pagerInfo;
    return r === "info" ? d.extend(i, { pagerInfo: o }) : (r === "link" || r === "size-menu" || r === "nav" || r === "goto") && d.extend(i, { pagerInfo: o, linkCreator: t.linkCreator }), i;
  }
};
sn.NAME = "pager";
sn.ItemComponents = {
  ...St.ItemComponents,
  info: Go,
  link: qo,
  nav: ih,
  "size-menu": lh,
  goto: Yo
};
sn.defaultItemProps = {
  btnType: "ghost",
  size: "sm"
};
class Jo extends B {
}
Jo.NAME = "Pager";
Jo.Component = sn;
const ch = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Pager: sn,
  PagerGoto: Yo,
  PagerInfoItem: Go,
  PagerLink: qo
}, Symbol.toStringTag, { value: "Module" }));
rt(ch);
class Ri extends B {
}
Ri.NAME = "Pick";
Ri.Component = vt;
Ri.replace = !0;
class Zo extends H {
  constructor(t) {
    super(t), this._searchInput = K(), this._measure = K(), this._changeTimer = 0, this._handleChange = (e) => {
      const s = e.target.value;
      this.setState({ search: s }, () => {
        const { onSearch: i } = this.props;
        i && (this._changeTimer && clearTimeout(this._changeTimer), this._changeTimer = window.setTimeout(() => {
          this._changeTimer = 0, i(s);
        }, this.props.debounce || 300));
      }), e.stopPropagation();
    }, this._handleClear = (e) => {
      e.stopPropagation(), this.clear();
    }, this.state = { search: t.defaultSearch ?? "" };
  }
  get $pop() {
    return d(`#pick-pop-${this.props.id}`);
  }
  focus() {
    var t;
    (t = this._searchInput.current) == null || t.focus();
  }
  clear() {
    var t, e;
    (e = (t = this.props).onClear) == null || e.call(t), this.setState({ search: "" }, () => this.focus());
  }
  componentDidMount() {
    this.focus();
    const { hotkeys: t } = this.props;
    if (t) {
      const e = io(t, {
        clear: {
          keys: "Escape",
          handler: () => {
            this.state.search.trim().length ? this.clear() : this.$pop.trigger("hidePop");
          }
        },
        enter: {
          keys: "Enter",
          handler: () => {
            this.$pop.trigger("selectActive");
          }
        },
        activeNext: {
          keys: "ArrowDown",
          handler: () => {
            this.$pop.trigger("activeNext");
          }
        },
        activePrev: {
          keys: "ArrowUp",
          handler: () => {
            this.$pop.trigger("activePrev");
          }
        }
      });
      e && (this._hotkeysScope = `PickerSearch_${ut()}`, d(this._searchInput.current).hotkeys(e, {
        scope: this._hotkeysScope,
        event: "keydown"
      }));
    }
  }
  componentDidUpdate() {
    const { inline: t } = this.props;
    if (t) {
      const { current: e } = this._measure, { current: s } = this._searchInput;
      if (e && s) {
        const i = d(s).parent();
        i.width(Math.ceil(Math.min(e.clientWidth, i.closest(".picker").outerWidth() - 32)));
      }
    }
  }
  componentWillUnmount() {
    clearTimeout(this._changeTimer), this._hotkeysScope && d(this._searchInput.current).unbindHotkeys(this._hotkeysScope);
  }
  render(t, e) {
    const { placeholder: s, inline: i } = t, { search: r } = e, o = r.trim().length > 0;
    let a;
    return i ? a = /* @__PURE__ */ p("div", { className: "picker-search-measure", ref: this._measure, children: r }) : o ? a = /* @__PURE__ */ p("button", { type: "button", className: "btn picker-search-clear square size-sm ghost", onClick: this._handleClear, children: /* @__PURE__ */ p("span", { className: "close" }) }) : a = /* @__PURE__ */ p("span", { className: "magnifier" }), /* @__PURE__ */ p("div", { className: `picker-search${i ? " is-inline" : ""}`, children: [
      /* @__PURE__ */ p(
        "input",
        {
          className: "form-control picker-search-input",
          type: "text",
          placeholder: s,
          value: r,
          autoComplete: "off",
          onChange: this._handleChange,
          onInput: this._handleChange,
          ref: this._searchInput
        }
      ),
      a
    ] });
  }
}
class hh extends gi {
  constructor() {
    super(...arguments), this._search = K(), this._handleDeselectClick = (t) => {
      const { onDeselect: e, state: { selections: s } } = this.props, i = d(t.target).closest(".picker-deselect-btn").attr("data-value");
      e && s.length && typeof i == "string" && e(i), t.stopPropagation();
    }, this._handleSearch = (t) => {
      this.props.changeState({ search: t });
    }, this._handleSearchClear = () => {
      this.props.togglePop(!0, { search: "" });
    }, this._renderSelection = (t) => {
      const { text: e } = t;
      return /* @__PURE__ */ p("div", { className: "picker-multi-selection", title: typeof e == "string" ? e : void 0, children: [
        /* @__PURE__ */ p("span", { className: "text", children: /* @__PURE__ */ p(V, { content: e }) }),
        this.props.disabled || this.props.readonly ? null : /* @__PURE__ */ p("div", { className: "picker-deselect-btn btn size-xs ghost", onClick: this._handleDeselectClick, "data-value": t.value, children: /* @__PURE__ */ p("span", { className: "close" }) })
      ] }, t.value);
    };
  }
  _handleClick(t) {
    var e;
    super._handleClick(t), (e = this._search.current) == null || e.focus();
  }
  _getClass(t) {
    return T(
      super._getClass(t),
      "picker-select picker-select-multi form-control"
    );
  }
  _renderSearch(t) {
    const { state: { search: e }, searchHint: s, hotkeys: i } = t;
    return /* @__PURE__ */ p(
      Zo,
      {
        inline: !0,
        id: t.id,
        ref: this._search,
        defaultSearch: e,
        onSearch: this._handleSearch,
        onClear: this._handleSearchClear,
        placeholder: s,
        hotkeys: i
      }
    );
  }
  _renderTrigger(t) {
    const { state: { selections: e = [], open: s }, search: i, placeholder: r, children: o } = this.props, a = s && i, l = /* @__PURE__ */ p("span", { class: "caret" }, "caret");
    return !a && !e.length ? [
      /* @__PURE__ */ p("span", { className: "picker-select-placeholder", children: r }, "selections"),
      l
    ] : [
      /* @__PURE__ */ p("div", { className: "picker-multi-selections", children: [
        e.map(this._renderSelection),
        a ? this._renderSearch(t) : null
      ] }, "selections"),
      o,
      l
    ];
  }
  _renderValue(t) {
    const { name: e, state: { value: s = "" }, disabled: i, readonly: r, id: o, valueList: a, emptyValue: l } = t;
    if (e)
      if (this.hasInput)
        d(`#${o}`).val(s);
      else {
        const c = a.length ? a : [l];
        return /* @__PURE__ */ p("select", { id: o, multiple: !0, className: "pick-value", name: e.endsWith("[]") ? e : `${e}[]`, disabled: i, readonly: r, style: { display: "none" }, children: c.map((u) => /* @__PURE__ */ p("option", { value: u, children: u }, u)) });
      }
    return null;
  }
  componentDidMount() {
    super.componentDidMount();
    const { id: t, valueList: e, emptyValue: s } = this.props;
    d(`#${t}`).val(e.length ? e : [s]);
  }
  componentDidUpdate(t) {
    const { id: e, state: s, name: i, valueList: r, emptyValue: o } = this.props;
    if (i && t.state.value !== s.value) {
      const a = d(`#${e}`).val(r.length ? r : [o]);
      this._skipTriggerChange !== s.value && a.trigger("change", Es), this._skipTriggerChange = !1;
    }
  }
}
class uh extends gi {
  constructor() {
    super(...arguments), this._search = K(), this._handleDeselectClick = (t) => {
      this.props.disabled || (this.props.onClear(), t.stopPropagation());
    }, this._handleSearch = (t) => {
      this.props.changeState({ search: t });
    }, this._handleSearchClear = () => {
      this.props.togglePop(!0, { search: "" });
    };
  }
  _getSearchPlaceholder() {
    const { searchHint: t, state: { value: e, selections: s } } = this.props;
    let i = t;
    if (i === void 0) {
      const r = s.find((o) => o.value === e);
      r && typeof r.text == "string" && (i = r.text);
    }
    return i;
  }
  _handleClick(t) {
    var e;
    super._handleClick(t), (e = this._search.current) == null || e.focus();
  }
  _getClass(t) {
    return T(
      super._getClass(t),
      "picker-select picker-select-single form-control"
    );
  }
  _renderSearch(t) {
    const { state: { search: e }, hotkeys: s } = t;
    return /* @__PURE__ */ p(
      Zo,
      {
        ref: this._search,
        id: t.id,
        defaultSearch: e,
        onSearch: this._handleSearch,
        onClear: this._handleSearchClear,
        placeholder: this._getSearchPlaceholder(),
        hotkeys: s
      }
    );
  }
  _renderTrigger(t) {
    const { children: e, state: { selections: s = [], open: i }, placeholder: r, search: o, disabled: a, readonly: l, clearable: c } = t, [u] = s, h = i && o;
    let m;
    if (h)
      m = this._renderSearch(t);
    else if (u) {
      const { text: g } = u;
      m = /* @__PURE__ */ p("span", { className: "picker-single-selection", title: typeof g == "string" ? g : void 0, children: /* @__PURE__ */ p(V, { content: g }) }, "main");
    } else
      m = /* @__PURE__ */ p("span", { className: "picker-select-placeholder", children: r }, "main");
    const f = c && !h ? /* @__PURE__ */ p("button", { type: "button", className: "btn picker-deselect-btn size-sm square ghost", disabled: a, readonly: l, onClick: this._handleDeselectClick, children: /* @__PURE__ */ p("span", { className: "close" }) }, "deselect") : null;
    return [
      m,
      e,
      f,
      h ? null : /* @__PURE__ */ p("span", { className: "caret" }, "caret")
    ];
  }
}
class rn extends J {
  _getItem(t, e, s) {
    return this.constructor.getTreeItem(t, super._getItem(t, e, s));
  }
  static getTreeItem(t, e) {
    return e && (e.type === "item" && (e.icon === void 0 && (e.icon = e.items ? e.expanded ? t.expandedIcon : t.collapsedIcon : t.normalIcon), e.actions === void 0 && (e.actions = t.itemActions)), e);
  }
}
rn.NAME = "tree";
rn.defaultProps = {
  ...J.defaultProps,
  indent: 12
};
rn.defaultItemProps = {
  ...J.defaultItemProps,
  innerComponent: "div"
};
rn.inheritNestedProps = [...J.inheritNestedProps, "itemActions", "expandedIcon", "collapsedIcon", "normalIcon"];
class rs extends yt {
  _getItem(t, e, s) {
    return rn.getTreeItem(t, super._getItem(t, e, s));
  }
}
rs.NAME = "tree";
rs.inheritNestedProps = [...yt.inheritNestedProps, "itemActions", "expandedIcon", "collapsedIcon", "normalIcon"];
rs.defaultItemProps = {
  ...yt.defaultProps,
  innerComponent: "div"
};
function Xo(n, t) {
  return n.reduce((e, s) => (Array.isArray(s.items) && Xo(s.items, e), typeof s.value == "string" && e.set(s.value, s), e), t || /* @__PURE__ */ new Map());
}
class dh extends Mo {
  constructor() {
    super(...arguments), this._menu = K(), this._disabledSet = /* @__PURE__ */ new Set(), this._getItem = (t, e) => {
      var c;
      if (t.parentKey !== void 0)
        return t;
      const s = new Set(this.props.valueList);
      let i = t.items, r = !1, o = !1;
      Array.isArray(i) && (r = !0, i = i.reduce((u, h, m) => {
        const f = this._getItem(h, m);
        return f && (f.selected ? o = !0 : r = !1, u.push(f)), u;
      }, []));
      const a = r || s.has(t.value);
      t = {
        selected: a,
        hint: typeof t.text == "string" ? t.text : void 0,
        ...t,
        checked: this._hasCheckbox || typeof t.checked == "boolean" ? r ? !0 : o ? "indeterminate" : a : void 0,
        className: T(t.className, { hover: t.value !== void 0 && t.value === this.props.state.hoverItem }),
        items: i
      }, a && !t.disabled && this._firstSelected === void 0 && (this._firstSelected = t.key), t.content && t.text && delete t.text;
      const l = ((c = this._getItemCallback) == null ? void 0 : c.call(this, t, e)) ?? t;
      return l && (l.disabled && this._disabledSet.add(l.value), l);
    }, this._beforeRenderItem = (t, e) => {
      var s;
      return (s = this._renderItemCallback) == null ? void 0 : s.call(this, t, e);
    }, this._handleItemClick = ({ item: t, event: e }) => {
      const s = t.value, i = e.target;
      if (t.disabled || s === void 0 || i.closest(".item-icon,.nested-toggle-icon,.disabled") || Array.isArray(t.items) && t.items.every((u) => this._disabledSet.has(u.value)))
        return;
      const { multiple: r, onToggleValue: o, onSelect: a, togglePop: l, onDeselect: c } = this.props;
      if (r)
        if (t.items) {
          const h = [...Xo(t.items).values()].filter((m) => !m.items && !this._disabledSet.has(m.value)).map((m) => m.value);
          d(i).closest(".item").children(".item-inner.selected").length ? c(h) : a(h);
        } else
          o(s);
      else
        a(s), l(!1, { search: "" });
    };
  }
  get menu() {
    return this._menu.current;
  }
  componentDidMount() {
    var t, e;
    super.componentDidMount(), this._firstSelected === void 0 ? (t = this.menu) == null || t.activeNext() : (e = this.menu) == null || e.toggleActive(this._firstSelected, !0), d(this.element).on("activeNext.zui.Picker", () => {
      var s;
      (s = this.menu) == null || s.activeNext();
    }).on("activePrev.zui.Picker", () => {
      var s;
      (s = this.menu) == null || s.activePrev();
    }).on("selectActive.zui.Picker", () => {
      const s = this.menu;
      if (!s)
        return;
      const i = s.getActiveKey();
      if (i !== void 0) {
        const r = s.getRenderedItem(i);
        r && d(this.element).find(`.item[z-key-path="${r._keyPath}"]`).trigger("click");
      }
    }).on("hidePop.zui.Picker", () => {
      this.props.togglePop(!1);
    });
  }
  componentWillUnmount() {
    super.componentWillUnmount(), d(this.element).off(".zui.Picker");
  }
  _getClass(t) {
    return T(
      super._getClass(t),
      "picker-menu"
    );
  }
  _getMenuProps(t) {
    const { menu: e, tree: s, state: i, checkbox: r, header: o, footer: a, noMatchHint: l } = t, { items: c, search: u } = i;
    return W({
      ref: this._menu,
      className: "picker-menu-list",
      underlineKeys: !0,
      items: c,
      defaultNestedShow: !0,
      activeOnHover: !0,
      search: u,
      onClickItem: this._handleItemClick,
      nestedToggle: ".nested-toggle-icon,.item-icon",
      checkbox: r,
      searchProps: ["keys", "text", "title", "subtitle", "value"],
      header: o,
      footer: a,
      noMatchHint: l
    }, e, s);
  }
  _renderPop(t) {
    const { tree: e } = t;
    this._firstSelected = void 0, this._disabledSet.clear();
    const s = this._getMenuProps(t);
    return this._hasCheckbox = !!s.checkbox, this._getItemCallback = s.getItem, this._renderItemCallback = s.beforeRenderItem, s.getItem = this._getItem, s.beforeRenderItem = this._beforeRenderItem, e ? /* @__PURE__ */ p(rs, { ...s }) : /* @__PURE__ */ p(yt, { ...s });
  }
}
function fe(n, t) {
  return n.reduce((e, s) => (Array.isArray(s.items) && fe(s.items, e), e.set(String(s.value), s), e), t || /* @__PURE__ */ new Map());
}
let Di = class extends vt {
  constructor(t) {
    super(t), this._updateTimer = 0, this.isEmptyValue = (r) => this._emptyValueSet.has(r), this.toggleValue = (r, o) => {
      if (!this.props.multiple)
        return o || r !== this.value ? this.setValue(r) : this.setValue();
      const { valueList: a } = this, l = a.indexOf(r);
      if (o !== l >= 0)
        return l > -1 ? a.splice(l, 1) : a.push(r), this.setValue(a);
    }, this.deselect = (r = []) => {
      const { valueList: o } = this, a = new Set(this.formatValueList(r)), l = o.filter((c) => !a.has(c));
      this.setValue(l);
    }, this.clear = () => {
      this.setValue();
    }, this.select = (r) => {
      const o = this.formatValueList(r), a = this.props.multiple ? [...this.valueList, ...o] : o[0];
      return this.setValue(a);
    }, this.isSelected = (r) => this.valueList.includes(r), d.extend(this.state, {
      loading: !1,
      search: "",
      items: t.items,
      selections: []
    });
    const { valueSplitter: e = ",", emptyValue: s = "" } = this.props;
    this._emptyValueSet = new Set(s.split(e)), this.setValue = this.setValue.bind(this);
    const { items: i } = this.state;
    if (Array.isArray(i) && i.length) {
      if (i.forEach((r) => r.value = String(r.value)), t.limitValueInList) {
        const r = fe(i);
        this.state.value = this.valueList.filter((o) => r.has(o)).join(t.valueSplitter);
      }
      !this.valueList.length && t.required && !t.multiple && (this.state.value = i[0].value ?? "");
    }
  }
  get valueList() {
    return this.formatValueList(this.state.value);
  }
  get firstEmptyValue() {
    return this._emptyValueSet.values().next().value;
  }
  deselectAll() {
    this.setValue([]);
  }
  selectAll() {
    const { items: t } = this.state;
    if (!Array.isArray(t))
      return;
    const s = [...fe(t).values()].reduce((i, r) => (r.disabled || i.push(r.value), i), []);
    return this.select(s);
  }
  isSelectedAll() {
    const { items: t } = this.state;
    if (!Array.isArray(t))
      return !1;
    const e = fe(t), s = new Set(this.valueList);
    return [...e.values()].every((i) => i.disabled || s.has(i.value));
  }
  /**
   * @todo Let SearchMenu to load items.
   */
  async load() {
    let t = this._abort;
    t && t.abort(), t = new AbortController(), this._abort = t;
    const { items: e = [], searchDelay: s } = this.props, { search: i } = this.state;
    let r = [];
    if (Array.isArray(e))
      r = e;
    else if (await Sn(s || 500), this._abort !== t || (r = await ii(e, [this, i], { signal: t.signal }), this._abort !== t))
      return r;
    return this._abort = void 0, r;
  }
  changeState(t, e) {
    return super.changeState((s) => {
      const i = typeof t == "function" ? t(s) : t;
      if (i.value !== void 0 && i.value !== s.value || i.items && i.items !== s.items) {
        const r = i.items || s.items, o = fe(r);
        i.selections = this.formatValueList(i.value ?? s.value).reduce((a, l) => (this.isEmptyValue(l) || a.push(o.get(l) || { value: l, text: l }), a), []);
      }
      return i;
    }, e);
  }
  async update(t) {
    const { state: e, props: s } = this, i = this._itemsCacheInfo || {}, r = {};
    if (this._itemsCacheInfo = i, !e.loading && (t || i.search !== e.search || s.items !== i.items)) {
      await this.changeState({ loading: !0 });
      const a = await this.load();
      r.items = a.filter((l) => (l.key = l.key ?? l.value, l.value = String(l.value), !this.isEmptyValue(l.value))), r.loading = !1, i.items = s.items, i.search = e.search;
    } else
      i.items && !e.open && s.cache === !1 && !Array.isArray(s.items) && (i.items = void 0);
    (t || i.value !== e.value) && (i.value = e.value);
    const o = r.items;
    s.required && !s.multiple && this.isEmptyValue(this.state.value) && Array.isArray(o) && o.length && (r.value = o[0].value), Object.keys(r).length && await this.changeState(r);
  }
  async tryUpdate() {
    this._updateTimer && clearTimeout(this._updateTimer), this._updateTimer = window.setTimeout(() => {
      this._updateTimer = 0, this.update();
    }, 50);
  }
  componentDidUpdate(t, e) {
    super.componentDidUpdate(t, e), this.tryUpdate();
  }
  componentDidMount() {
    super.componentDidMount(), this.tryUpdate();
  }
  componentWillUnmount() {
    var t;
    (t = this._abort) == null || t.abort(), this._abort = void 0, this._itemsCacheInfo = void 0, clearTimeout(this._updateTimer), super.componentWillUnmount();
  }
  _getTriggerProps(t, e) {
    return {
      ...super._getTriggerProps(t, e),
      multiple: t.multiple,
      hotkeys: t.hotkeys,
      placeholder: t.placeholder,
      search: t.search,
      searchHint: t.searchHint,
      clearable: !!this.valueList.length && !t.required,
      valueList: this.valueList,
      emptyValue: this.firstEmptyValue,
      onDeselect: this.deselect,
      onSelect: this.select,
      onClear: this.clear,
      onToggleValue: this.toggleValue,
      onSetValue: this.setValue
    };
  }
  _getPopProps(t, e) {
    return {
      ...super._getPopProps(t, e),
      menu: t.menu,
      tree: t.tree,
      checkbox: t.checkbox,
      multiple: t.multiple,
      search: t.search,
      footer: this._renderToolbar(),
      valueList: this.valueList,
      noMatchHint: t.searchEmptyHint ?? j.getLang("searchEmptyHint"),
      onDeselect: this.deselect,
      onSelect: this.select,
      onClear: this.clear,
      onToggleValue: this.toggleValue,
      onSetValue: this.setValue
    };
  }
  _getTrigger(t) {
    return t.Trigger || (t.multiple ? hh : uh);
  }
  _renderToolbar() {
    let { toolbar: t } = this.props;
    return t ? (t === !0 && (t = [{
      key: "selectAll",
      text: j.getLang("selectAll")
    }, {
      key: "cancelSelect",
      text: j.getLang("cancelSelect")
    }]), St.render(t, [], { size: "sm", getItem: (e) => (e.onClick || (e.key === "selectAll" ? (e.onClick = this.selectAll.bind(this), e.disabled = this.isSelectedAll()) : e.key === "cancelSelect" && (e.onClick = this.deselectAll.bind(this), e.disabled = !this.valueList.length)), e) }, this)) : null;
  }
  formatValueList(t) {
    let e;
    return typeof t == "string" && t.length ? e = t.split(this.props.valueSplitter ?? ",") : Array.isArray(t) ? e = t : e = [t], d.unique(e).reduce((s, i) => (i == null || (i = typeof i != "string" ? String(i) : i, this.isEmptyValue(i) || s.push(i)), s), []);
  }
  formatValue(t) {
    const e = this.formatValueList(t);
    return e.length ? e.join(this.props.valueSplitter ?? ",") : this.firstEmptyValue;
  }
  setValue(t = [], e) {
    let s = this.formatValueList(t);
    if (s.length) {
      const { items: r, limitValueInList: o } = this.props;
      if (o) {
        const a = fe(Array.isArray(r) ? r : this.state.items);
        s = s.filter((l) => a.has(l));
      }
    }
    const i = this.formatValue(s);
    return super.setValue(i, e);
  }
};
Di.defaultProps = {
  ...vt.defaultProps,
  className: "picker",
  valueSplitter: ",",
  limitValueInList: !0,
  search: !0,
  emptyValue: "",
  cache: !0,
  hotkeys: !0
};
Di.Pop = dh;
class Qo extends B {
}
Qo.NAME = "Picker";
Qo.Component = Di;
j.addLang({
  zh_cn: {
    selectAll: "全选",
    cancelSelect: "取消选择",
    searchEmptyHint: "无匹配选项"
  },
  zh_tw: {
    selectAll: "全選",
    cancelSelect: "取消選擇",
    searchEmptyHint: "無匹配選項"
  },
  en: {
    selectAll: "Select All",
    cancelSelect: "Cancel Select",
    searchEmptyHint: "No matching options"
  }
});
class ta extends B {
}
ta.NAME = "SearchBox";
ta.Component = Zn;
rt(lc);
class ea extends B {
}
ea.NAME = "Toolbar";
ea.Component = St;
rt(nc);
const fh = '[data-toggle="tooltip"]';
class Bt extends ht {
  _getRenderOptions() {
    const { type: t, className: e, title: s, content: i } = this.options;
    let r = s, o = i;
    return o === void 0 && (o = r, r = void 0), {
      ...super._getRenderOptions(),
      title: r,
      content: o,
      className: T("tooltip", t, e, r ? "tooltip-has-title" : ""),
      contentClass: r ? "tooltip-content" : ""
    };
  }
}
Bt.NAME = "Tooltip";
Bt.DEFAULT = {
  ...ht.DEFAULT,
  trigger: "hover",
  delay: 500,
  closeBtn: !1,
  popup: !1,
  name: "tooltip",
  animation: "fade",
  destroyOnHide: 5e3
};
Bt.hideOthers = !0;
d(document).on(`click${Bt.NAMESPACE} mouseenter${Bt.NAMESPACE}`, fh, (n) => {
  const t = d(n.currentTarget);
  if (t.length && !t.data(Bt.KEY)) {
    const e = t.data("trigger") || "hover";
    if ((n.type === "mouseover" ? "hover" : "click") !== e)
      return;
    Bt.ensure(t, { show: Bt.DEFAULT.delay || !0 }), n.preventDefault();
  }
});
var Vt, Ut;
class _r extends H {
  constructor(e) {
    super(e);
    at(this, Vt, void 0);
    at(this, Ut, void 0);
    gt(this, Vt, 0), gt(this, Ut, null), this._handleWheel = (s) => {
      const { wheelContainer: i } = this.props, r = s.target;
      if (!(!r || !i) && (typeof i == "string" && r.closest(i) || typeof i == "object")) {
        const o = (this.props.type === "horz" ? s.deltaX : s.deltaY) * (this.props.wheelSpeed ?? 1);
        this.scrollOffset(o) && s.preventDefault();
      }
    }, this._handleMouseMove = (s) => {
      const { dragStart: i } = this.state;
      i && (st(this, Vt) && cancelAnimationFrame(st(this, Vt)), gt(this, Vt, requestAnimationFrame(() => {
        const r = this.props.type === "horz" ? s.clientX - i.x : s.clientY - i.y;
        this.scroll(i.offset + r * this.props.scrollSize / this.props.clientSize), gt(this, Vt, 0);
      })), s.preventDefault());
    }, this._handleMouseUp = () => {
      this.state.dragStart && this.setState({
        dragStart: !1
      });
    }, this._handleMouseDown = (s) => {
      this.state.dragStart || this.setState({ dragStart: { x: s.clientX, y: s.clientY, offset: this.scrollPos } }), s.stopPropagation();
    }, this._handleClick = (s) => {
      const i = s.currentTarget;
      if (!i)
        return;
      const r = i.getBoundingClientRect(), { type: o, clientSize: a, scrollSize: l } = this.props, c = (o === "horz" ? s.clientX - r.left : s.clientY - r.top) - this.barSize / 2;
      this.scroll(c * l / a), s.preventDefault();
    }, this.state = {
      scrollPos: this.props.defaultScrollPos ?? 0,
      dragStart: !1
    };
  }
  get scrollPos() {
    return this.props.scrollPos ?? this.state.scrollPos;
  }
  get controlled() {
    return this.props.scrollPos !== void 0;
  }
  get maxScrollPos() {
    const { scrollSize: e, clientSize: s } = this.props;
    return Math.max(0, e - s);
  }
  get barSize() {
    const { clientSize: e, scrollSize: s, size: i = 12, minBarSize: r = 3 * i } = this.props;
    return Math.max(Math.round(e * e / s), r);
  }
  componentDidMount() {
    document.addEventListener("mousemove", this._handleMouseMove), document.addEventListener("mouseup", this._handleMouseUp);
    const { wheelContainer: e } = this.props;
    e && (gt(this, Ut, typeof e == "string" ? document : e.current), st(this, Ut).addEventListener("wheel", this._handleWheel, { passive: !1 }));
  }
  componentWillUnmount() {
    document.removeEventListener("mousemove", this._handleMouseMove), document.removeEventListener("mouseup", this._handleMouseUp), st(this, Ut) && st(this, Ut).removeEventListener("wheel", this._handleWheel);
  }
  scroll(e) {
    return e = Math.max(0, Math.min(Math.round(e), this.maxScrollPos)), e === this.scrollPos ? !1 : (this.controlled ? this._afterScroll(e) : this.setState({
      scrollPos: e
    }, this._afterScroll.bind(this, e)), !0);
  }
  scrollOffset(e) {
    return this.scroll(this.scrollPos + e);
  }
  _afterScroll(e) {
    const { onScroll: s } = this.props;
    s && s(e, this.props.type ?? "vert");
  }
  render() {
    const {
      clientSize: e,
      type: s,
      size: i = 12,
      className: r,
      style: o,
      left: a,
      top: l,
      bottom: c,
      right: u
    } = this.props, { maxScrollPos: h, scrollPos: m } = this, { dragStart: f } = this.state, _ = {
      left: a,
      top: l,
      bottom: c,
      right: u,
      ...o
    }, g = {};
    return s === "horz" ? (_.height = i, _.width = e, g.width = this.barSize, g.left = Math.round(Math.min(h, m) * (e - g.width) / h)) : (_.width = i, _.height = e, g.height = this.barSize, g.top = Math.round(Math.min(h, m) * (e - g.height) / h)), /* @__PURE__ */ p(
      "div",
      {
        className: T("scrollbar", r, {
          "is-vert": s === "vert",
          "is-horz": s === "horz",
          "is-dragging": f
        }),
        style: _,
        onMouseDown: this._handleClick,
        children: /* @__PURE__ */ p(
          "div",
          {
            className: "scrollbar-bar",
            style: g,
            onMouseDown: this._handleMouseDown
          }
        )
      }
    );
  }
}
Vt = new WeakMap(), Ut = new WeakMap();
const An = /* @__PURE__ */ new Map(), In = [];
function na(n, t) {
  const { name: e } = n;
  if (!(t != null && t.override) && An.has(e))
    throw new Error(`DTable: Plugin with name ${e} already exists`);
  An.set(e, n), t != null && t.buildIn && !In.includes(e) && In.push(e);
}
function nt(n, t) {
  na(n, t);
  const e = (s) => {
    if (!s)
      return n;
    const { defaultOptions: i, ...r } = n;
    return {
      ...r,
      defaultOptions: { ...i, ...s }
    };
  };
  return e.plugin = n, e;
}
function sa(n) {
  return An.delete(n);
}
function ph(n) {
  if (typeof n == "string") {
    const t = An.get(n);
    return t || console.warn(`DTable: Cannot found plugin "${n}"`), t;
  }
  if (typeof n == "function" && "plugin" in n)
    return n.plugin;
  if (typeof n == "object")
    return n;
  console.warn("DTable: Invalid plugin", n);
}
function ia(n, t, e) {
  return t.forEach((s) => {
    var r;
    if (!s)
      return;
    const i = ph(s);
    i && (e.has(i.name) || ((r = i.plugins) != null && r.length && ia(n, i.plugins, e), n.push(i), e.add(i.name)));
  }), n;
}
function mh(n = [], t = !0) {
  return t && In.length && n.unshift(...In), n != null && n.length ? ia([], n, /* @__PURE__ */ new Set()) : [];
}
function ra() {
  return {
    cols: [],
    data: [],
    rowKey: "id",
    width: "100%",
    height: "auto",
    rowHeight: 35,
    defaultColWidth: 80,
    minColWidth: 20,
    maxColWidth: 9999,
    header: !0,
    footer: void 0,
    headerHeight: 0,
    footerHeight: 0,
    rowHover: !0,
    colHover: !1,
    cellHover: !1,
    bordered: !1,
    striped: !0,
    responsive: !1,
    scrollbarHover: !0,
    horzScrollbarPos: "outside"
  };
}
function gh(n, t, e) {
  return n && (t && (n = Math.max(t, n)), e && (n = Math.min(e, n))), n;
}
function yr(n, t) {
  return typeof n == "string" && (n = n.endsWith("%") ? parseFloat(n) / 100 : parseFloat(n)), typeof t == "number" && (typeof n != "number" || isNaN(n)) && (n = t), n;
}
function _s(n, t = !1) {
  if (!n.list.length)
    return;
  if (n.widthSetting && n.width !== n.widthSetting) {
    n.width = n.widthSetting;
    const s = n.width - n.totalWidth;
    if (!t && s > 0 || t && s !== 0) {
      const i = n.flexList.length ? n.flexList : n.list, r = i.reduce((o, a) => o + (a.flex || 1), 0);
      i.forEach((o) => {
        const a = Math[s < 0 ? "max" : "min"](s, Math.ceil(s * ((o.flex || 1) / r)));
        o.realWidth = o.width + a;
      });
    }
  }
  let e = 0;
  n.list.forEach((s) => {
    s.realWidth || (s.realWidth = s.width), s.left = e, e += s.realWidth;
  });
}
function _h(n, t, e, s) {
  const { defaultColWidth: i, minColWidth: r, maxColWidth: o, fixedLeftWidth: a = 0, fixedRightWidth: l = 0 } = t, c = (w) => (typeof w == "function" && (w = w.call(n)), w = yr(w, 0), w < 1 && (w = Math.round(w * s)), w), u = {
    width: 0,
    list: [],
    flexList: [],
    widthSetting: 0,
    totalWidth: 0
  }, h = {
    ...u,
    list: [],
    flexList: [],
    widthSetting: c(a)
  }, m = {
    ...u,
    list: [],
    flexList: [],
    widthSetting: c(l)
  }, f = [], _ = {};
  let g = !1;
  const y = [], v = {};
  if (e.forEach((w) => {
    const { colTypes: b, onAddCol: C } = w;
    b && Object.entries(b).forEach(([k, x]) => {
      v[k] || (v[k] = []), v[k].push(x);
    }), C && y.push(C);
  }), t.cols.forEach((w) => {
    if (w.hidden)
      return;
    const { type: b = "", name: C } = w, k = {
      fixed: !1,
      flex: !1,
      width: i,
      minWidth: r,
      maxWidth: o,
      ...w,
      type: b
    }, x = {
      name: C,
      type: b,
      setting: k,
      flex: 0,
      left: 0,
      width: 0,
      realWidth: 0,
      visible: !0,
      index: f.length
    }, A = v[b];
    A && A.forEach(($) => {
      const O = typeof $ == "function" ? $.call(n, k) : $;
      O && Object.assign(k, O, w);
    });
    const { fixed: I, flex: M, minWidth: E = r, maxWidth: P = o } = k, R = yr(k.width || i, i);
    x.flex = M === !0 ? 1 : typeof M == "number" ? M : 0, x.width = gh(R < 1 ? Math.round(R * s) : R, E, P), y.forEach(($) => $.call(n, x)), f.push(x), _[x.name] = x;
    const L = I ? I === "left" ? h : m : u;
    L.list.push(x), L.totalWidth += x.width, L.width = L.totalWidth, x.flex && L.flexList.push(x), typeof k.order == "number" && (g = !0);
  }), g) {
    const w = (b, C) => (b.setting.order ?? 0) - (C.setting.order ?? 0);
    f.sort(w), h.list.sort(w), u.list.sort(w), m.list.sort(w);
  }
  return _s(h, !0), _s(m, !0), u.widthSetting = s - h.width - m.width, _s(u), {
    list: f,
    map: _,
    left: h,
    center: u,
    right: m
  };
}
function yh(n) {
  var L;
  const { col: t, className: e, height: s, row: i, onRenderCell: r, style: o, outerStyle: a, children: l, outerClass: c, width: u, left: h, top: m, ...f } = n, _ = {
    left: h ?? t.left,
    top: m ?? i.top,
    width: u ?? t.realWidth,
    height: s,
    ...a
  }, { align: g, border: y } = t.setting, v = {
    justifyContent: g ? g === "left" ? "start" : g === "right" ? "end" : g : void 0,
    ...t.setting.cellStyle,
    ...o
  }, w = ["dtable-cell", c, e, t.setting.className, {
    "has-border-left": y === !0 || y === "left",
    "has-border-right": y === !0 || y === "right"
  }], b = ["dtable-cell-content", t.setting.cellClass], C = (L = i.data) == null ? void 0 : L[t.name], k = [l ?? C ?? ""], x = r ? r(k, { row: i, col: t, value: C }, n, xt) : k, A = [], I = [], M = {}, E = {};
  let P = "div";
  x == null || x.forEach(($) => {
    if (typeof $ == "object" && $ && !bt($) && ("html" in $ || "className" in $ || "style" in $ || "attrs" in $ || "children" in $ || "tagName" in $)) {
      const O = $.outer ? A : I;
      $.html ? O.push(/* @__PURE__ */ p("div", { className: T("dtable-cell-html", $.className), style: $.style, dangerouslySetInnerHTML: { __html: $.html }, ...$.attrs ?? {} })) : ($.style && Object.assign($.outer ? _ : v, $.style), $.className && ($.outer ? w : b).push($.className), $.children && O.push($.children), $.attrs && Object.assign($.outer ? M : E, $.attrs)), $.tagName && !$.outer && (P = $.tagName);
    } else
      I.push($);
  });
  const R = P;
  return /* @__PURE__ */ p(
    "div",
    {
      className: T(w),
      style: _,
      "data-col": t.name,
      "data-row": i.id,
      "data-type": t.type || null,
      ...f,
      ...M,
      children: [
        I.length > 0 && /* @__PURE__ */ p(R, { className: T(b), style: v, ...E, children: I }),
        A
      ]
    }
  );
}
function ys({
  rows: n = [],
  cols: t,
  rowHeight: e,
  scrollLeft: s = 0,
  scrollTop: i = 0,
  left: r = 0,
  top: o = 0,
  width: a,
  height: l = "100%",
  className: c,
  CellComponent: u = yh,
  onRenderCell: h
}) {
  var g;
  const m = Array.isArray(n) ? n : [n], f = ((g = m[0]) == null ? void 0 : g.top) ?? 0, _ = m.length;
  return /* @__PURE__ */ p(
    "div",
    {
      className: T("dtable-cells", c),
      style: { top: o, left: r, width: a, height: l },
      children: /* @__PURE__ */ p("div", { className: "dtable-cells-container", style: { left: -s, top: -i + f }, children: m.reduce((y, v, w) => {
        const b = t.length;
        return t.forEach((C, k) => {
          y.push(
            /* @__PURE__ */ p(
              u,
              {
                className: T(
                  `is-${v.index % 2 ? "odd" : "even"}-row`,
                  k ? "" : "is-first-in-row",
                  k === b - 1 ? "is-last-in-row" : "",
                  w ? "" : "is-first-row",
                  w === _ - 1 ? "is-last-row" : ""
                ),
                col: C,
                row: v,
                top: v.top - f,
                height: e,
                onRenderCell: h
              },
              `${v.index}:${C.name}`
            )
          );
        }), y;
      }, []) })
    }
  );
}
function oa({
  top: n,
  height: t,
  rowHeight: e,
  rows: s,
  cols: { left: i, center: r, right: o },
  scrollLeft: a,
  scrollTop: l,
  className: c,
  style: u,
  onRenderCell: h,
  children: m
}) {
  let f = null;
  i.list.length && (f = /* @__PURE__ */ p(
    ys,
    {
      className: "dtable-fixed-left",
      rows: s,
      scrollTop: l,
      cols: i.list,
      width: i.width,
      rowHeight: e,
      onRenderCell: h
    },
    "left"
  ));
  let _ = null;
  r.list.length && (_ = /* @__PURE__ */ p(
    ys,
    {
      rows: s,
      className: "dtable-scroll-center",
      scrollLeft: a,
      scrollTop: l,
      cols: r.list,
      left: i.width,
      width: r.width,
      rowHeight: e,
      onRenderCell: h
    },
    "center"
  ));
  let g = null;
  return o.list.length && (g = /* @__PURE__ */ p(
    ys,
    {
      className: "dtable-fixed-right",
      rows: s,
      scrollTop: l,
      cols: o.list,
      left: i.width + r.width,
      width: o.width,
      rowHeight: e,
      onRenderCell: h
    },
    "right"
  )), /* @__PURE__ */ p(
    "div",
    {
      className: T("dtable-block", c),
      style: { ...u, top: n, height: t },
      children: [
        f,
        _,
        g,
        m
      ]
    }
  );
}
var Li = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, N = (n, t, e) => (Li(n, t, "read from private field"), e ? e.call(n) : t.get(n)), D = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, q = (n, t, e, s) => (Li(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), lt = (n, t, e) => (Li(n, t, "access private method"), e), pe, Re, be, Pt, ie, it, It, At, De, mn, Pn, qe, Ht, Le, ze, Ds, aa, Ls, la, zs, ca, Fs, ha, gn, Os, os, Rn, Ws, Hs, js, Bs, Fe, _n, Dn, zi, Fi, ua, Vs, da;
let Oi = class extends H {
  constructor(t) {
    super(t), D(this, Ds), D(this, Ls), D(this, zs), D(this, Fs), D(this, gn), D(this, Fe), D(this, Dn), D(this, Fi), D(this, Vs), this.ref = K(), D(this, pe, 0), D(this, Re, void 0), D(this, be, !1), D(this, Pt, void 0), D(this, ie, void 0), D(this, it, []), D(this, It, void 0), D(this, At, /* @__PURE__ */ new Map()), D(this, De, {}), D(this, mn, void 0), D(this, Pn, []), D(this, qe, { in: !1 }), this.updateLayout = () => {
      N(this, pe) && cancelAnimationFrame(N(this, pe)), q(this, pe, requestAnimationFrame(() => {
        this.update({ dirtyType: "layout" }), q(this, pe, 0);
      }));
    }, D(this, Ht, (e, s) => {
      s = s || e.type;
      const i = N(this, At).get(s);
      if (i != null && i.length) {
        for (const r of i)
          if (r.call(this, e) === !1) {
            e.stopPropagation(), e.preventDefault();
            break;
          }
      }
    }), D(this, Le, (e) => {
      N(this, Ht).call(this, e, `window_${e.type}`);
    }), D(this, ze, (e) => {
      N(this, Ht).call(this, e, `document_${e.type}`);
    }), D(this, os, (e, s, i, r) => {
      const { row: o, col: a } = s;
      s.value = this.getCellValue(o, a), e[0] = s.value;
      const l = o.id === "HEADER" ? "onRenderHeaderCell" : "onRenderCell";
      return a.setting[l] && (e = a.setting[l].call(this, e, s, i, r)), N(this, it).forEach((c) => {
        c[l] && (e = c[l].call(this, e, s, i, r));
      }), this.options[l] && (e = this.options[l].call(this, e, s, i, r)), e;
    }), D(this, Rn, (e, s) => {
      s === "horz" ? this.scroll({ scrollLeft: e }) : this.scroll({ scrollTop: e });
    }), D(this, Ws, (e) => {
      var a, l, c;
      const s = this.getPointerInfo(e);
      if (!s)
        return;
      const { rowID: i, colName: r, cellElement: o } = s;
      if (i === "HEADER")
        o && ((a = this.options.onHeaderCellClick) == null || a.call(this, e, { colName: r, element: o }), N(this, it).forEach((u) => {
          var h;
          (h = u.onHeaderCellClick) == null || h.call(this, e, { colName: r, element: o });
        }));
      else {
        const u = this.layout.visibleRows.find((h) => h.id === i);
        if (o) {
          if (((l = this.options.onCellClick) == null ? void 0 : l.call(this, e, { colName: r, rowID: i, rowInfo: u, element: o })) === !0)
            return;
          for (const h of N(this, it))
            if (((c = h.onCellClick) == null ? void 0 : c.call(this, e, { colName: r, rowID: i, rowInfo: u, element: o })) === !0)
              return;
        }
      }
    }), D(this, Hs, (e) => {
      const s = e.key.toLowerCase();
      if (["pageup", "pagedown", "home", "end"].includes(s))
        return !this.scroll({ to: s.replace("page", "") });
    }), D(this, js, (e) => {
      const s = d(e.target).closest(".dtable-cell");
      if (!s.length)
        return lt(this, Fe, _n).call(this, !1);
      lt(this, Fe, _n).call(this, [s.attr("data-row"), s.attr("data-col")]);
    }), D(this, Bs, () => {
      lt(this, Fe, _n).call(this, !1);
    }), q(this, Re, t.id ?? `dtable-${ut()}`), this.state = { scrollTop: 0, scrollLeft: 0, renderCount: 0 }, q(this, ie, Object.freeze(mh(t.plugins))), N(this, ie).forEach((e) => {
      const { methods: s, data: i, state: r } = e;
      s && Object.entries(s).forEach(([o, a]) => {
        typeof a == "function" && Object.assign(this, { [o]: a.bind(this) });
      }), i && Object.assign(N(this, De), i.call(this)), r && Object.assign(this.state, r.call(this));
    }), lt(this, Dn, zi).call(this), N(this, it).forEach((e) => {
      var s;
      (s = e.onCreate) == null || s.call(this, e);
    });
  }
  get options() {
    var t;
    return ((t = N(this, It)) == null ? void 0 : t.options) || N(this, Pt) || ra();
  }
  get plugins() {
    return N(this, it);
  }
  get layout() {
    return N(this, It);
  }
  get id() {
    return N(this, Re);
  }
  get data() {
    return N(this, De);
  }
  get element() {
    return this.ref.current;
  }
  get parent() {
    var t;
    return this.props.parent ?? ((t = this.element) == null ? void 0 : t.parentElement);
  }
  get hoverInfo() {
    return N(this, qe);
  }
  componentWillReceiveProps() {
    q(this, Pt, void 0);
  }
  componentDidMount() {
    N(this, be) ? this.forceUpdate() : lt(this, gn, Os).call(this), this.on("click", N(this, Ws)), this.on("keydown", N(this, Hs));
    const { options: t } = this;
    (t.rowHover || t.colHover) && (this.on("mouseover", N(this, js)), this.on("mouseleave", N(this, Bs)));
    let { responsive: e } = t;
    if (e) {
      e === !0 && (e = "window,parent");
      const s = e.split(",");
      if (typeof ResizeObserver < "u") {
        const i = [], r = new ResizeObserver(this.updateLayout);
        q(this, mn, r);
        const { parent: o } = this;
        s.forEach((a) => {
          a !== "window" && (a === "parent" ? o && r.observe(o) : a[0] === "~" ? i.push(a.slice(1)) : d(a).each((l, c) => r.observe(c)));
        }), i.length && this.on(i.join(" "), this.updateLayout);
      }
      s.includes("window") && this.on("window_resize", this.updateLayout);
    }
    N(this, it).forEach((s) => {
      var r;
      let { events: i } = s;
      i && (typeof i == "function" && (i = i.call(this)), Object.entries(i).forEach(([o, a]) => {
        a && this.on(o, a);
      })), (r = s.onMounted) == null || r.call(this);
    });
  }
  componentDidUpdate() {
    lt(this, gn, Os).call(this), N(this, it).forEach((t) => {
      var e;
      (e = t.onUpdated) == null || e.call(this);
    });
  }
  componentWillUnmount() {
    var e;
    (e = N(this, mn)) == null || e.disconnect();
    const { element: t } = this;
    if (t)
      for (const s of N(this, At).keys())
        s.startsWith("window_") ? window.removeEventListener(s.replace("window_", ""), N(this, Le)) : s.startsWith("document_") ? document.removeEventListener(s.replace("document_", ""), N(this, ze)) : t.removeEventListener(s, N(this, Ht));
    N(this, it).forEach((s) => {
      var i;
      (i = s.onUnmounted) == null || i.call(this);
    }), N(this, ie).forEach((s) => {
      var i;
      (i = s.onDestory) == null || i.call(this);
    }), q(this, De, {}), N(this, At).clear(), this._noAnimation && clearTimeout(this._noAnimation);
  }
  on(t, e, s) {
    var r;
    s && (t = `${s}_${t}`);
    const i = N(this, At).get(t);
    i ? i.push(e) : (N(this, At).set(t, [e]), t.startsWith("window_") ? window.addEventListener(t.replace("window_", ""), N(this, Le)) : t.startsWith("document_") ? document.addEventListener(t.replace("document_", ""), N(this, ze)) : (r = this.element) == null || r.addEventListener(t, N(this, Ht)));
  }
  off(t, e, s) {
    var o;
    s && (t = `${s}_${t}`);
    const i = N(this, At).get(t);
    if (!i)
      return;
    const r = i.indexOf(e);
    r >= 0 && i.splice(r, 1), i.length || (N(this, At).delete(t), t.startsWith("window_") ? window.removeEventListener(t.replace("window_", ""), N(this, Le)) : t.startsWith("document_") ? document.removeEventListener(t.replace("document_", ""), N(this, ze)) : (o = this.element) == null || o.removeEventListener(t, N(this, Ht)));
  }
  emitCustomEvent(t, e) {
    N(this, Ht).call(this, e instanceof Event ? e : new CustomEvent(t, { detail: e }), t);
  }
  disableAnimation(t = 200) {
    var e;
    this._noAnimation && clearTimeout(this._noAnimation), (e = this.element) == null || e.classList.add("no-animation"), this._noAnimation = window.setTimeout(() => {
      var s;
      this._noAnimation = void 0, (s = this.element) == null || s.classList.remove("no-animation");
    }, t);
  }
  scroll(t, e) {
    const { scrollLeft: s, scrollTop: i, rowsHeightTotal: r, rowsHeight: o, rowHeight: a, cols: { center: { totalWidth: l, width: c } } } = this.layout, { to: u } = t;
    let { scrollLeft: h, scrollTop: m } = t;
    if (u === "up" || u === "down")
      m = i + (u === "down" ? 1 : -1) * Math.floor(o / a) * a;
    else if (u === "left" || u === "right")
      h = s + (u === "right" ? 1 : -1) * c;
    else if (u === "top")
      m = 0;
    else if (u === "bottom")
      m = r - o;
    else if (u === "begin")
      h = 0;
    else if (u === "end")
      h = l - c;
    else {
      const { offsetLeft: _, offsetTop: g } = t;
      typeof _ == "number" && (h = s + _), typeof g == "number" && (m = i + g);
    }
    const f = {};
    return typeof h == "number" && (h = Math.max(0, Math.min(h, l - c)), h !== s && (f.scrollLeft = h)), typeof m == "number" && (m = Math.max(0, Math.min(m, r - o)), m !== i && (f.scrollTop = m)), Object.keys(f).length ? (this.setState(f, () => {
      var _;
      (_ = this.options.onScroll) == null || _.call(this, f), e == null || e.call(this, !0);
    }), !0) : (e == null || e.call(this, !1), !1);
  }
  getColInfo(t) {
    if (t === void 0)
      return;
    if (typeof t == "object")
      return t;
    const { cols: e } = this.layout;
    return typeof t == "number" ? e.list[t] : e.map[t];
  }
  getRowInfo(t) {
    if (t === void 0)
      return;
    if (typeof t == "object")
      return t;
    if (t === -1 || t === "HEADER")
      return { id: "HEADER", index: -1, top: 0 };
    const { rows: e, rowsMap: s, allRows: i } = this.layout;
    return typeof t == "number" ? e[t] : s[t] || i.find((r) => r.id === t);
  }
  getCellValue(t, e) {
    var a;
    const s = typeof t == "object" ? t : this.getRowInfo(t);
    if (!s)
      return;
    const i = typeof e == "object" ? e : this.getColInfo(e);
    if (!i)
      return;
    let r = s.id === "HEADER" ? i.setting.title : (a = s.data) == null ? void 0 : a[i.name];
    const { cellValueGetter: o } = this.options;
    return o && (r = o.call(this, s, i, r)), r;
  }
  getRowInfoByIndex(t) {
    return this.layout.rows[t];
  }
  update(t = {}, e) {
    if (!N(this, Pt))
      return;
    typeof t == "function" && (e = t, t = {});
    const { dirtyType: s, state: i } = t;
    if (s === "layout")
      q(this, It, void 0);
    else if (s === "options") {
      if (q(this, Pt, void 0), !N(this, It))
        return;
      q(this, It, void 0);
    }
    this.setState(i ?? ((r) => ({ renderCount: r.renderCount + 1 })), e);
  }
  getPointerInfo(t) {
    const e = t.target;
    if (!e || e.closest(".no-cell-event"))
      return;
    const s = d(e).closest(".dtable-cell");
    if (!s.length)
      return;
    const i = s.attr("data-row"), r = s.attr("data-col");
    if (!(typeof r != "string" || typeof i != "string"))
      return {
        cellElement: s[0],
        colName: r,
        rowID: i,
        target: e
      };
  }
  i18n(t, e, s) {
    return j(N(this, Pn), t, e, s, this.options.lang) ?? `{i18n:${t}}`;
  }
  getPlugin(t) {
    return this.plugins.find((e) => e.name === t);
  }
  render() {
    let t = lt(this, Vs, da).call(this);
    const { className: e, rowHover: s, colHover: i, cellHover: r, bordered: o, striped: a, scrollbarHover: l, beforeRender: c, emptyTip: u } = this.options, h = {}, m = ["dtable", e, {
      "dtable-hover-row": s,
      "dtable-hover-col": i,
      "dtable-hover-cell": r,
      "dtable-bordered": o,
      "dtable-striped": a,
      "scrollbar-hover": l,
      "no-animation": this._noAnimation
    }], f = [];
    if (t) {
      const _ = !t.rows.length;
      if (c) {
        const g = c.call(this, t);
        g && (t = g);
      }
      N(this, it).forEach((g) => {
        var v;
        const y = (v = g.beforeRender) == null ? void 0 : v.call(this, t);
        y && (t = y);
      }), h.width = t.width, h.height = t.height, h["--dtable-row-height"] = `${t.rowHeight}px`, m.push(
        t.className,
        _ ? "dtable-is-empty" : "",
        {
          "dtable-scrolled-down": t.scrollTop > 0,
          "dtable-scrolled-bottom": t.scrollTop >= t.rowsHeightTotal - t.rowsHeight,
          "dtable-scrolled-right": t.scrollLeft > 0,
          "dtable-scrolled-end": t.scrollLeft >= t.cols.center.totalWidth - t.cols.center.width
        }
      ), t.children && f.push(...t.children), _ && u ? (delete h.height, f.push(
        /* @__PURE__ */ p("div", { className: "dtable-empty-tip", children: /* @__PURE__ */ p(V, { content: u, generatorThis: this, generatorArgs: [t] }) }, "empty-tip")
      )) : (f.push(
        lt(this, Ds, aa).call(this, t),
        lt(this, Ls, la).call(this, t),
        lt(this, zs, ca).call(this, t)
      ), t.scrollable && f.push(lt(this, Fs, ha).call(this, t))), N(this, it).forEach((g) => {
        var v;
        const y = (v = g.onRender) == null ? void 0 : v.call(this, t);
        y && (y.style && Object.assign(h, y.style), y.className && m.push(y.className), y.children && f.push(y.children));
      });
    }
    return /* @__PURE__ */ p(
      "div",
      {
        id: N(this, Re),
        className: T(m),
        style: h,
        ref: this.ref,
        tabIndex: -1,
        children: f
      }
    );
  }
};
pe = /* @__PURE__ */ new WeakMap();
Re = /* @__PURE__ */ new WeakMap();
be = /* @__PURE__ */ new WeakMap();
Pt = /* @__PURE__ */ new WeakMap();
ie = /* @__PURE__ */ new WeakMap();
it = /* @__PURE__ */ new WeakMap();
It = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
De = /* @__PURE__ */ new WeakMap();
mn = /* @__PURE__ */ new WeakMap();
Pn = /* @__PURE__ */ new WeakMap();
qe = /* @__PURE__ */ new WeakMap();
Ht = /* @__PURE__ */ new WeakMap();
Le = /* @__PURE__ */ new WeakMap();
ze = /* @__PURE__ */ new WeakMap();
Ds = /* @__PURE__ */ new WeakSet();
aa = function(n) {
  const { header: t, cols: e, headerHeight: s, scrollLeft: i, headerChildren: r } = n;
  if (!t)
    return null;
  if (t === !0)
    return /* @__PURE__ */ p(
      oa,
      {
        className: "dtable-header",
        cols: e,
        height: s,
        scrollLeft: i,
        rowHeight: s,
        scrollTop: 0,
        rows: { id: "HEADER", index: -1, top: 0 },
        top: 0,
        onRenderCell: N(this, os),
        children: r
      },
      "header"
    );
  const o = Array.isArray(t) ? t : [t];
  return /* @__PURE__ */ p(
    ho,
    {
      className: "dtable-header",
      style: { height: s },
      renders: o,
      generateArgs: [n],
      generatorThis: this,
      children: r
    },
    "header"
  );
};
Ls = /* @__PURE__ */ new WeakSet();
la = function(n) {
  const { headerHeight: t, rowsHeight: e, visibleRows: s, rowHeight: i, cols: r, scrollLeft: o, scrollTop: a, bodyChildren: l } = n;
  return /* @__PURE__ */ p(
    oa,
    {
      className: "dtable-body",
      top: t,
      height: e,
      rows: s,
      rowHeight: i,
      scrollLeft: o,
      scrollTop: a,
      cols: r,
      onRenderCell: N(this, os),
      children: l
    },
    "body"
  );
};
zs = /* @__PURE__ */ new WeakSet();
ca = function(n) {
  let { footer: t } = n;
  if (typeof t == "function" && (t = t.call(this, n)), !t)
    return null;
  const e = Array.isArray(t) ? t : [t];
  return /* @__PURE__ */ p(
    ho,
    {
      className: "dtable-footer",
      style: { height: n.footerHeight, top: n.rowsHeight + n.headerHeight },
      renders: e,
      generateArgs: [n],
      generatorThis: this,
      generators: n.footerGenerators,
      children: n.footerChildren
    },
    "footer"
  );
};
Fs = /* @__PURE__ */ new WeakSet();
ha = function(n) {
  const t = [], { scrollLeft: e, cols: { left: { width: s }, center: { width: i, totalWidth: r } }, scrollTop: o, rowsHeight: a, rowsHeightTotal: l, footerHeight: c, headerHeight: u } = n, { scrollbarSize: h = 12, horzScrollbarPos: m } = this.options;
  return r > i && t.push(
    /* @__PURE__ */ p(
      _r,
      {
        type: "horz",
        scrollPos: e,
        scrollSize: r,
        clientSize: i,
        onScroll: N(this, Rn),
        left: s,
        bottom: (m === "inside" ? 0 : -h) + c,
        size: h,
        wheelContainer: this.ref
      },
      "horz"
    ),
    /* @__PURE__ */ p("div", { className: "dtable-scroll-shadow is-left", style: { left: s, height: u + a } }),
    /* @__PURE__ */ p("div", { className: "dtable-scroll-shadow is-right", style: { left: s + i, height: u + a } })
  ), l > a && t.push(
    /* @__PURE__ */ p(
      _r,
      {
        type: "vert",
        scrollPos: o,
        scrollSize: l,
        clientSize: a,
        onScroll: N(this, Rn),
        right: 0,
        size: h,
        top: u,
        wheelContainer: this.ref
      },
      "vert"
    )
  ), t.length ? t : null;
};
gn = /* @__PURE__ */ new WeakSet();
Os = function() {
  var n;
  q(this, be, !1), N(this, it).forEach((t) => {
    var e;
    return (e = t.afterRender) == null ? void 0 : e.call(this);
  }), (n = this.options.afterRender) == null || n.call(this);
};
os = /* @__PURE__ */ new WeakMap();
Rn = /* @__PURE__ */ new WeakMap();
Ws = /* @__PURE__ */ new WeakMap();
Hs = /* @__PURE__ */ new WeakMap();
js = /* @__PURE__ */ new WeakMap();
Bs = /* @__PURE__ */ new WeakMap();
Fe = /* @__PURE__ */ new WeakSet();
_n = function(n) {
  const { element: t, options: e } = this;
  if (!t)
    return;
  const s = d(t), i = n ? { in: !0, row: n[0], col: n[1] } : { in: !1 };
  e.colHover === "header" && i.row !== "HEADER" && (i.col = void 0);
  const r = N(this, qe);
  i.in !== r.in && s.toggleClass("dtable-hover", i.in), i.row !== r.row && (s.find(".is-hover-row").removeClass("is-hover-row"), i.row && s.find(`.dtable-cell[data-row="${i.row}"]`).addClass("is-hover-row")), i.col !== r.col && (s.find(".is-hover-col").removeClass("is-hover-col"), i.col && s.find(`.dtable-cell[data-col="${i.col}"]`).addClass("is-hover-col")), q(this, qe, i);
};
Dn = /* @__PURE__ */ new WeakSet();
zi = function() {
  if (N(this, Pt))
    return !1;
  const t = { ...ra(), ...N(this, ie).reduce((e, s) => {
    const { defaultOptions: i } = s;
    return i && Object.assign(e, i), e;
  }, {}), ...this.props };
  return q(this, Pt, t), q(this, it, N(this, ie).reduce((e, s) => {
    const { when: i, options: r } = s;
    let o = t;
    return r && (o = Object.assign({ ...o }, typeof r == "function" ? r.call(this, t) : r)), (!i || i(o)) && (o !== t && Object.assign(t, o), e.push(s)), e;
  }, [])), q(this, Pn, [this.options.i18n, ...this.plugins.map((e) => e.i18n)].filter(Boolean)), !0;
};
Fi = /* @__PURE__ */ new WeakSet();
ua = function() {
  var I, M;
  const { plugins: n } = this;
  let t = N(this, Pt);
  const e = {
    flex: /* @__PURE__ */ p("div", { style: "flex:auto" }),
    divider: /* @__PURE__ */ p("div", { style: "width:1px;margin:var(--space);background:var(--color-border);height:50%" })
  };
  n.forEach((E) => {
    var R;
    const P = (R = E.beforeLayout) == null ? void 0 : R.call(this, t);
    P && (t = { ...t, ...P }), Object.assign(e, E.footer);
  });
  let s = t.width, i = 0;
  if (typeof s == "function" && (s = s.call(this)), s === "100%") {
    const { parent: E } = this;
    if (E)
      i = E.clientWidth;
    else {
      q(this, be, !0);
      return;
    }
  }
  const r = _h(this, t, n, i), { data: o, rowKey: a = "id", rowHeight: l } = t, c = [], u = (E, P, R) => {
    var $, O;
    const L = { data: R ?? { [a]: E }, id: E, index: c.length, top: 0 };
    if (R || (L.lazy = !0), c.push(L), (($ = t.onAddRow) == null ? void 0 : $.call(this, L, P)) !== !1) {
      for (const tt of n)
        if (((O = tt.onAddRow) == null ? void 0 : O.call(this, L, P)) === !1)
          return;
    }
  };
  if (typeof o == "number")
    for (let E = 0; E < o; E++)
      u(`${E}`, E);
  else
    Array.isArray(o) && o.forEach((E, P) => {
      typeof E == "object" ? u(`${E[a] ?? ""}`, P, E) : u(`${E ?? ""}`, P);
    });
  let h = c;
  const m = {};
  if (t.onAddRows) {
    const E = t.onAddRows.call(this, h, r);
    E && (h = E);
  }
  for (const E of n) {
    const P = (I = E.onAddRows) == null ? void 0 : I.call(this, h, r);
    P && (h = P);
  }
  h.forEach((E, P) => {
    m[E.id] = E, E.index = P, E.top = E.index * l;
  });
  const { header: f, footer: _ } = t, g = f ? t.headerHeight || l : 0, y = _ ? t.footerHeight || l : 0;
  let v = t.height, w = 0;
  const b = h.length * l, C = g + y + b;
  if (typeof v == "function" && (v = v.call(this, C)), v === "auto")
    w = C;
  else if (typeof v == "object")
    w = Math.min(v.max, Math.max(v.min, C));
  else if (v === "100%") {
    const { parent: E } = this;
    if (E)
      w = E.clientHeight;
    else {
      w = 0, q(this, be, !0);
      return;
    }
  } else
    w = v;
  const k = w - g - y, x = {
    options: t,
    allRows: c,
    width: i,
    height: w,
    rows: h,
    rowsMap: m,
    rowHeight: l,
    rowsHeight: k,
    rowsHeightTotal: b,
    header: f,
    footer: _,
    footerGenerators: e,
    headerHeight: g,
    footerHeight: y,
    cols: r
  }, A = (M = t.onLayout) == null ? void 0 : M.call(this, x);
  A && Object.assign(x, A), n.forEach((E) => {
    if (E.onLayout) {
      const P = E.onLayout.call(this, x);
      P && Object.assign(x, P);
    }
  }), q(this, It, x);
};
Vs = /* @__PURE__ */ new WeakSet();
da = function() {
  (lt(this, Dn, zi).call(this) || !N(this, It)) && lt(this, Fi, ua).call(this);
  const { layout: n } = this;
  if (!n)
    return;
  const { cols: { center: t } } = n;
  let { scrollLeft: e } = this.state;
  e = Math.min(Math.max(0, t.totalWidth - t.width), e);
  let s = 0;
  t.list.forEach((_) => {
    _.left = s, s += _.realWidth, _.visible = _.left + _.realWidth >= e && _.left <= e + t.width;
  });
  const { rowsHeightTotal: i, rowsHeight: r, rows: o, rowHeight: a } = n, l = Math.min(Math.max(0, i - r), this.state.scrollTop), c = Math.floor(l / a), u = l + r, h = Math.min(o.length, Math.ceil(u / a)), m = [], { rowDataGetter: f } = this.options;
  for (let _ = c; _ < h; _++) {
    const g = o[_];
    g.lazy && f && (g.data = f([g.id])[0], g.lazy = !1), m.push(g);
  }
  return Object.assign(n, {
    visibleRows: m,
    scrollTop: l,
    scrollLeft: e,
    headerChildren: [],
    bodyChildren: [],
    footerChildren: [],
    children: [],
    className: "",
    scrollable: !0
  }), n;
};
Oi.addPlugin = na;
Oi.removePlugin = sa;
function fa(n, t, e, s) {
  if (typeof n == "function" && (n = n(t)), typeof n == "string" && n.length && (n = { url: n }), !n)
    return e;
  const { url: i, ...r } = n, { setting: o } = t.col, a = {};
  return o && Object.keys(o).forEach((l) => {
    l.startsWith("data-") && (a[l] = o[l]);
  }), /* @__PURE__ */ p("a", { href: G(i, t.row.data), ...s, ...r, ...a, children: e });
}
function Wi(n, t, e) {
  var s;
  if (n != null)
    return e = e ?? ((s = t.row.data) == null ? void 0 : s[t.col.name]), typeof n == "function" ? n(e, t) : G(n, e);
}
function pa(n, t, e, s) {
  var i;
  return e ? (e = e ?? ((i = t.row.data) == null ? void 0 : i[t.col.name]), n === !1 ? e : (n === !0 && (n = "[yyyy-]MM-dd hh:mm"), typeof n == "function" && (n = n(e, t)), pt(e, n, s ?? e))) : s ?? e;
}
function ma(n, t) {
  const { link: e } = t.col.setting, s = fa(e, t, n[0]);
  return s && (n[0] = s), n;
}
function ga(n, t) {
  const { format: e } = t.col.setting;
  return e && (n[0] = Wi(e, t, n[0])), n;
}
function _a(n, t) {
  const { map: e } = t.col.setting;
  return typeof e == "function" ? n[0] = e(n[0], t) : typeof e == "object" && e && (n[0] = e[n[0]] ?? n[0]), n;
}
function ya(n, t, e) {
  const s = {};
  return typeof n == "function" ? Object.assign(s, n(e)) : Object.keys(n).forEach((i) => {
    var o;
    const r = (o = e.row.data) == null ? void 0 : o[n[i]];
    r !== void 0 && (s[i] = r);
  }), Object.keys(s).length && t.push({ style: s }), t;
}
function va(n, t, e = "[yyyy-]MM-dd hh:mm") {
  const { formatDate: s = e, invalidDate: i } = t.col.setting;
  return n[0] = pa(s, t, n[0], i), n;
}
function Us(n, t, e = !1) {
  const { html: s = e } = t.col.setting;
  if (s === !1)
    return n;
  const i = n[0], r = s === !0 ? i : Wi(s, t, i);
  return n[0] = {
    html: r
  }, n;
}
const vh = {
  name: "rich",
  colTypes: {
    html: {
      onRenderCell(n, t) {
        return Us(n, t, !0);
      }
    },
    progress: {
      align: "center",
      onRenderCell(n, { col: t }) {
        const { progressType: e, barColor: s, barBgColor: i, barHeight: r = 6, barWidth: o = 64, circleSize: a = 24, circleBorderSize: l = 1, circleBgColor: c = "var(--color-border)", circleColor: u = "var(--color-success-500)" } = t.setting, h = n[0];
        return n[0] = e === "bar" ? /* @__PURE__ */ p(
          mi,
          {
            className: "rounded-full",
            width: o,
            height: r,
            color: s || u,
            background: i,
            percent: h
          }
        ) : /* @__PURE__ */ p(
          Qn,
          {
            percent: h,
            size: a,
            circleWidth: l,
            circleBg: c,
            circleColor: u,
            text: !0
          }
        ), n;
      }
    },
    datetime: {
      formatDate: "[yyyy-]MM-dd hh:mm"
    },
    date: {
      formatDate: "yyyy-MM-dd"
    },
    time: {
      formatDate: "hh:mm"
    }
  },
  onRenderCell(n, t) {
    const { formatDate: e, html: s, hint: i, styleMap: r } = t.col.setting;
    if (e && (n = va(n, t, e)), n = _a(n, t), n = ga(n, t), s ? n = Us(n, t) : n = ma(n, t), i) {
      let o = t.value;
      typeof i == "function" ? o = i.call(this, t) : typeof i == "string" ? o = G(i, t.row.data) : typeof n[0] == "string" && (o = n[0]), n.push({ attrs: { title: o } });
    }
    return r && (n = ya(r, n, t)), n;
  }
}, wh = nt(vh, { buildIn: !0 }), bh = {
  default: (n, t, e) => {
    var r, o;
    const s = (r = n.data) == null ? void 0 : r[e.name], i = (o = t.data) == null ? void 0 : o[e.name];
    return s === i ? 0 : s == null ? 1 : String(s).localeCompare(String(i));
  },
  date: (n, t, e) => {
    var r, o;
    const s = F(((r = n.data) == null ? void 0 : r[e.name]) ?? 0), i = F(((o = t.data) == null ? void 0 : o[e.name]) ?? 0);
    return s.getTime() - i.getTime();
  },
  number: (n, t, e) => {
    var r, o;
    const s = (r = n.data) == null ? void 0 : r[e.name], i = (o = t.data) == null ? void 0 : o[e.name];
    return Number.parseFloat(s) - Number.parseFloat(i);
  }
}, Ch = {
  name: "sort",
  defaultOptions: { sort: !0 },
  when: (n) => !!n.sort,
  onCreate() {
    const { sortBy: n } = this.options;
    n && (this.state.sortBy = Array.isArray(n) ? n : [n]);
  },
  onAddRows(n, t) {
    const { sortBy: e } = this.state;
    if (!e || !e.length)
      return;
    const { sort: s } = this.options, i = {
      ...bh,
      ...typeof s == "function" ? { default: s } : typeof s == "object" ? s : {}
    };
    return [...n].sort((r, o) => {
      for (const { name: a, order: l } of e) {
        const c = t.map[a];
        if (!c)
          continue;
        let u = c.setting.sort;
        if (u === !0 ? u = i.default : typeof u == "string" && (u = i[u]), !u)
          continue;
        const h = u.call(this, r, o, c);
        if (h)
          return l === "asc" ? h : -h;
      }
      return 0;
    });
  },
  onHeaderCellClick(n, t) {
    if (!n.target.closest(".dtable-sort-link"))
      return;
    const e = this.getColInfo(t.colName);
    if (!e || !e.setting.sort)
      return;
    const { sortBy: s = [] } = this.state, i = s.findIndex((a) => a.name === e.name), { multiSort: r } = this.options;
    let o = "asc";
    if (i >= 0) {
      const a = s[i].order;
      a === "asc" ? o = "desc" : a === "desc" && (o = "none"), r && s.splice(i, 1);
    }
    r || (s.length = 0), this.update({ dirtyType: "layout", state: { sortBy: [{ name: t.colName, order: o }, ...s].filter((a) => a.order !== "none") } });
  },
  onRenderHeaderCell(n, t) {
    var l;
    const { col: e } = t, { sortBy: s } = this.state;
    if (!e.setting.sort)
      return n;
    const o = ((l = s == null ? void 0 : s.find((c) => c.name === e.name)) == null ? void 0 : l.order) || "none", a = /* @__PURE__ */ p("div", { className: `dtable-sort dtable-sort-${o}` });
    return n[0] = /* @__PURE__ */ p("a", { className: "dtable-sort-link", href: "javascript:;", children: [
      n[0],
      a
    ] }), n.push(
      { outer: !0, attrs: { "data-sort": o } }
    ), n;
  }
}, Sh = nt(Ch, { buildIn: !0 }), kh = {
  html: { component: ve }
}, xh = {
  name: "custom",
  onRenderCell(n, t) {
    const { col: e } = t;
    let { custom: s } = e.setting;
    if (typeof s == "function" && (s = s.call(this, t)), !s)
      return n;
    const i = Array.isArray(s) ? s : [s], { customMap: r } = this.options;
    return i.forEach((o) => {
      let a;
      typeof o == "string" ? a = o.startsWith("<") ? {
        component: ve,
        props: { html: G(o, { value: t.value, ...t.row.data, $value: t.value }) }
      } : {
        component: o
      } : a = o;
      let { component: l } = a;
      const c = [a];
      typeof l == "string" && c.unshift(kh[l], r == null ? void 0 : r[l]);
      const u = {};
      c.forEach((m) => {
        if (m) {
          const { props: f } = m;
          f && d.extend(u, typeof f == "function" ? f.call(this, t) : f), l = m.component || l;
        }
      }, { props: {} });
      const h = l;
      n[0] = { outer: !0, className: "dtable-custom-cell", children: /* @__PURE__ */ p(h, { ...u }) };
    }), n;
  }
}, Th = nt(xh);
function Nh(n, t, e = !1) {
  var a, l;
  typeof n == "boolean" && (t = n, n = void 0);
  const s = this.state.checkedRows, i = {}, { canRowCheckable: r } = this.options, o = (c, u) => {
    const h = r ? r.call(this, c) : !0;
    !h || e && h === "disabled" || !!s[c] === u || (u ? s[c] = !0 : delete s[c], i[c] = u);
  };
  if (n === void 0 ? (t === void 0 && (t = !wa.call(this)), (a = this.layout) == null || a.allRows.forEach(({ id: c }) => {
    o(c, !!t);
  })) : (Array.isArray(n) || (n = [n]), n.forEach((c) => {
    o(c, t ?? !s[c]);
  })), Object.keys(i).length) {
    const c = (l = this.options.beforeCheckRows) == null ? void 0 : l.call(this, n, i, s);
    c && Object.keys(c).forEach((u) => {
      c[u] ? s[u] = !0 : delete s[u];
    }), this.setState({ checkedRows: { ...s } }, () => {
      var u;
      (u = this.options.onCheckChange) == null || u.call(this, i);
    });
  }
  return i;
}
function Eh(n) {
  return this.state.checkedRows[n] ?? !1;
}
function wa() {
  var s, i;
  const n = (s = this.layout) == null ? void 0 : s.allRows.length;
  if (!n)
    return !1;
  const t = this.getChecks().length, { canRowCheckable: e } = this.options;
  return e ? t === ((i = this.layout) == null ? void 0 : i.allRows.reduce((r, o) => r + (e.call(this, o.id) ? 1 : 0), 0)) : t === n;
}
function $h() {
  var t;
  const n = new Set((t = this.layout) == null ? void 0 : t.allRows.map((e) => e.id));
  return Object.keys(this.state.checkedRows).filter((e) => n.has(e));
}
function Mh(n) {
  const { checkable: t } = this.options;
  n === void 0 && (n = !t), t !== n && this.setState({ forceCheckable: n });
}
function vr(n, t, e = !1) {
  return /* @__PURE__ */ p(Yn, { className: "dtable-checkbox", checked: n, disabled: e });
}
const wr = 'input[type="checkbox"],.dtable-checkbox', Ah = {
  name: "checkable",
  defaultOptions: {
    checkable: "auto",
    checkboxRender: vr
  },
  when: (n) => !!n.checkable,
  options(n) {
    const { forceCheckable: t } = this.state;
    return t !== void 0 ? n.checkable = t : n.checkable === "auto" && (n.checkable = !!n.cols.some((e) => e.checkbox)), n;
  },
  state() {
    return { checkedRows: {} };
  },
  methods: {
    toggleCheckRows: Nh,
    isRowChecked: Eh,
    isAllRowChecked: wa,
    getChecks: $h,
    toggleCheckable: Mh
  },
  i18n: {
    zh_cn: {
      checkedCountInfo: "已选择 {selected} 项",
      totalCountInfo: "共 {total} 项"
    },
    zh_tw: {
      checkedCountInfo: "已選擇 {selected} 項",
      totalCountInfo: "共 {total} 項"
    },
    en: {
      checkedCountInfo: "Selected {selected} items",
      totalCountInfo: "Total {total} items"
    }
  },
  footer: {
    checkbox() {
      const n = this.isAllRowChecked();
      return [
        /* @__PURE__ */ p("div", { style: { paddingRight: "calc(3*var(--space))", display: "flex", alignItems: "center" }, onClick: () => this.toggleCheckRows(), children: vr(n) })
      ];
    },
    checkedInfo(n, t) {
      const e = this.getChecks(), { checkInfo: s } = this.options;
      if (s)
        return [/* @__PURE__ */ p(V, { className: "dtable-check-info", content: s.call(this, e) })];
      const i = e.length, r = [];
      return i && r.push(this.i18n("checkedCountInfo", { selected: i })), r.push(this.i18n("totalCountInfo", { total: t.allRows.length })), [
        /* @__PURE__ */ p("div", { className: "dtable-check-info", children: r.join(", ") })
      ];
    }
  },
  onCreate() {
    const { checkedRows: n } = this.options;
    n && this.setState((t) => ({
      checkedRows: {
        ...t.checkedRows,
        ...n.reduce((e, s) => (e[s] = !0, e), {})
      }
    }));
  },
  onRenderCell(n, { row: t, col: e }) {
    var c;
    const { id: s } = t, { canRowCheckable: i } = this.options, r = i ? i.call(this, s) : !0;
    if (!r)
      return n;
    const { checkbox: o } = e.setting, a = typeof o == "function" ? o.call(this, s) : o, l = this.isRowChecked(s);
    if (a) {
      const u = (c = this.options.checkboxRender) == null ? void 0 : c.call(this, l, s, r === "disabled");
      n.push(
        u,
        { outer: !0, className: "has-checkbox" }
      );
    }
    return l && n.push({ outer: !0, className: "is-checked" }), n;
  },
  onRenderHeaderCell(n, { row: t, col: e }) {
    var o;
    const { id: s } = t, { checkbox: i } = e.setting;
    if (typeof i == "function" ? i.call(this, s) : i) {
      const a = this.isAllRowChecked(), l = (o = this.options.checkboxRender) == null ? void 0 : o.call(this, a, s);
      n.push(l, { outer: !0, className: "has-checkbox" });
    }
    return n;
  },
  onHeaderCellClick(n) {
    if (this.data.disableCheckable)
      return;
    const t = n.target;
    if (!t)
      return;
    const e = t.closest(wr);
    e && this.toggleCheckRows(e.checked);
  },
  onCellClick(n, { rowID: t }) {
    if (this.data.disableCheckable)
      return;
    const e = d(n.target);
    if (!e.length || e.closest("btn,a,button.not-checkable,.form-control,.btn").length)
      return;
    (e.closest(wr).not(".disabled").length || this.options.checkOnClickRow) && this.toggleCheckRows(t, void 0, !0);
  }
}, Ih = nt(Ah), Ph = {
  name: "store",
  defaultOptions: {
    store: !0
  },
  when: (n) => !!n.store,
  data() {
    return { store: new tn(`DTable:${this.id}`) };
  }
}, Rh = nt(Ph);
var ba = /* @__PURE__ */ ((n) => (n.unknown = "", n.collapsed = "collapsed", n.expanded = "expanded", n.hidden = "hidden", n.normal = "normal", n))(ba || {});
function Ln(n) {
  const t = this.data.nestedMap.get(n);
  if (!t || t.state !== "")
    return t ?? { state: "normal", level: -1 };
  if (!t.parent && !t.children)
    return t.state = "normal", t;
  const e = t.children && this.state.nestedState[n];
  let s = !1, { parent: i } = t;
  for (; i; ) {
    const r = Ln.call(this, i);
    if (r.state !== "expanded") {
      s = !0;
      break;
    }
    i = r.parent;
  }
  return t.state = s ? "hidden" : e ? "collapsed" : t.children ? "expanded" : "normal", t.level = t.parent ? Ln.call(this, t.parent).level + 1 : 0, t;
}
function Dh(n) {
  return n !== void 0 ? Ln.call(this, n) : this.data.nestedMap;
}
function Lh(n, t) {
  let { nestedState: e } = this.state;
  const { nestedMap: s } = this.data;
  if (n === "HEADER")
    if (t === void 0 && (t = !Ca.call(this)), t) {
      const i = s.entries();
      for (const [r, o] of i)
        o.state === "expanded" && (e[r] = !0);
    } else
      e = {};
  else {
    const i = Array.isArray(n) ? n : [n];
    t === void 0 && (t = !e[i[0]]), i.forEach((r) => {
      const o = s.get(r);
      t && (o != null && o.children) ? e[r] = !0 : delete e[r];
    });
  }
  this.update({
    dirtyType: "layout",
    state: { nestedState: { ...e } }
  }, () => {
    const { onNestedChange: i, preserveNested: r } = this.options;
    i == null || i.call(this), r && this.data.store.set("nestedState", e);
  });
}
function Ca() {
  const n = this.data.nestedMap.values();
  for (const t of n)
    if (t.state === "expanded")
      return !1;
  return !0;
}
function Sa(n, t = 0, e, s = 0) {
  var i;
  e || (e = [...n.keys()]);
  for (const r of e) {
    const o = n.get(r);
    o && (o.level === s && (o.order = t++), (i = o.children) != null && i.length && (t = Sa(n, t, o.children, s + 1)));
  }
  return t;
}
function ka(n, t, e, s) {
  const i = n.getNestedRowInfo(t);
  return !i || i.state === "" || !i.children || i.children.forEach((r) => {
    s[r] = e, ka(n, r, e, s);
  }), i;
}
function xa(n, t, e, s, i) {
  var a;
  const r = n.getNestedRowInfo(t);
  if (!r || r.state === "")
    return;
  ((a = r.children) == null ? void 0 : a.every((l) => {
    const c = !!(s[l] !== void 0 ? s[l] : i[l]);
    return e === c;
  })) && (s[t] = e), r.parent && xa(n, r.parent, e, s, i);
}
const hn = "dtable-nested-toggle", zh = {
  name: "nested",
  plugins: [Rh],
  defaultOptions: {
    nested: "auto",
    nestedParentKey: "parent",
    asParentKey: "asParent",
    nestedIndent: 20,
    canSortTo(n, t) {
      const { nestedMap: e } = this.data, s = e.get(n.id), i = e.get(t.id);
      return (s == null ? void 0 : s.parent) === (i == null ? void 0 : i.parent);
    },
    beforeCheckRows(n, t, e) {
      if (!this.options.checkable || !(n != null && n.length))
        return;
      const s = {};
      return Object.entries(t).forEach(([i, r]) => {
        const o = ka(this, i, r, s);
        o != null && o.parent && xa(this, o.parent, r, s, e);
      }), s;
    }
  },
  options(n) {
    return n.nested === "auto" && (n.nested = !!n.cols.some((t) => t.nestedToggle)), n;
  },
  when: (n) => !!n.nested,
  data() {
    return { nestedMap: /* @__PURE__ */ new Map() };
  },
  state() {
    return { nestedState: {} };
  },
  methods: {
    getNestedInfo: Dh,
    toggleRow: Lh,
    isAllCollapsed: Ca,
    getNestedRowInfo: Ln
  },
  onCreate() {
    let { defaultNestedState: n } = this.options;
    if (this.options.preserveNested) {
      const t = this.data.store.get("nestedState");
      t && (n = t);
    }
    this.state.nestedState = n || {};
  },
  beforeLayout() {
    this.data.nestedMap.clear();
  },
  onAddRow(n) {
    var i, r;
    const { nestedMap: t } = this.data, e = String((i = n.data) == null ? void 0 : i[this.options.nestedParentKey ?? "parent"]), s = t.get(n.id) ?? {
      state: "",
      level: 0
    };
    if (s.parent = e === "0" ? void 0 : e, (r = n.data) != null && r[this.options.asParentKey ?? "asParent"] && (s.children = []), t.set(n.id, s), e) {
      let o = t.get(e);
      o || (o = {
        state: "",
        level: 0
      }, t.set(e, o)), o.children || (o.children = []), o.children.push(n.id);
    }
  },
  onAddRows(n) {
    return n = n.filter(
      (t) => this.getNestedRowInfo(t.id).state !== "hidden"
      /* hidden */
    ), Sa(this.data.nestedMap), n.sort((t, e) => {
      const s = this.getNestedRowInfo(t.id), i = this.getNestedRowInfo(e.id), r = (s.order ?? 0) - (i.order ?? 0);
      return r === 0 ? t.index - e.index : r;
    }), n;
  },
  onRenderCell(n, { col: t, row: e }) {
    var a;
    const { id: s, data: i } = e, { nestedToggle: r } = t.setting, o = this.getNestedRowInfo(s);
    if (r && (o.children || o.parent) && n.push(
      ((a = this.options.onRenderNestedToggle) == null ? void 0 : a.call(this, o, s, t, i)) ?? /* @__PURE__ */ p("a", { className: `${hn} state${o.children ? "" : " is-no-child"}`, children: /* @__PURE__ */ p("span", { className: "toggle-icon" }) }),
      { outer: !0, className: `is-${o.state}` }
    ), o.level) {
      let { nestedIndent: l = r } = t.setting;
      l && (l === !0 && (l = this.options.nestedIndent ?? 12), n.push(/* @__PURE__ */ p("div", { className: "dtable-nested-indent", style: { width: l * o.level + "px" } })));
    }
    return n;
  },
  onRenderHeaderCell(n, { row: t, col: e }) {
    var i;
    const { id: s } = t;
    return e.setting.nestedToggle && n.push(
      ((i = this.options.onRenderNestedToggle) == null ? void 0 : i.call(this, void 0, s, e, void 0)) ?? /* @__PURE__ */ p("a", { className: `${hn} state`, children: /* @__PURE__ */ p("span", { className: "toggle-icon" }) }),
      { outer: !0, className: `is-${this.isAllCollapsed() ? "collapsed" : "expanded"}` }
    ), n;
  },
  onHeaderCellClick(n) {
    const t = n.target;
    if (!(!t || !t.closest(`.${hn}`)))
      return this.toggleRow("HEADER"), !0;
  },
  onCellClick(n, { rowID: t }) {
    const e = n.target;
    if (!(!e || !this.getNestedRowInfo(t).children || !e.closest(`.${hn}`)))
      return this.toggleRow(t), !0;
  }
}, Fh = nt(zh);
function vs(n, { row: t, col: e }) {
  const { data: s } = t, i = s ? s[e.name] : void 0;
  if (!(i != null && i.length))
    return n;
  const { avatarClass: r = "rounded-full", avatarKey: o = `${e.name}Avatar`, avatarCodeKey: a, avatarNameKey: l = `${e.name}Name` } = e.setting;
  let { avatarProps: c = {} } = e.setting;
  typeof c == "function" && (c = c(e, t));
  const u = (s ? s[l] : i) || n[0], h = {
    size: "xs",
    src: s ? s[o] : void 0,
    text: u,
    code: a ? s ? s[a] : void 0 : i,
    ...c,
    className: T(r, c.className, "flex-none")
  };
  if (n[0] = /* @__PURE__ */ p(qn, { ...h }), e.type === "avatarBtn") {
    const { avatarBtnProps: m } = e.setting, f = typeof m == "function" ? m(e, t) : m;
    n[0] = /* @__PURE__ */ p("button", { type: "button", className: "btn btn-avatar", ...f, children: [
      n[0],
      /* @__PURE__ */ p("div", { children: u })
    ] });
  } else
    e.type === "avatarName" && (n[0] = /* @__PURE__ */ p("div", { className: "flex items-center gap-1", children: [
      n[0],
      /* @__PURE__ */ p("span", { children: u })
    ] }));
  return n;
}
const Oh = {
  name: "avatar",
  colTypes: {
    avatar: {
      onRenderCell: vs
    },
    avatarBtn: {
      onRenderCell: vs
    },
    avatarName: {
      onRenderCell: vs
    }
  }
}, Wh = nt(Oh, { buildIn: !0 }), Hh = {
  name: "sort-type",
  onRenderHeaderCell(n, t) {
    const { col: e } = t;
    if (e.setting.sort !== void 0)
      return n;
    let { sortType: s } = e.setting;
    const { sortLink: i, orderBy: r } = this.options;
    if (r && r[e.name] !== void 0 && (s = r[e.name]), s) {
      const o = s === !0 ? "none" : s, a = /* @__PURE__ */ p("div", { className: `dtable-sort dtable-sort-${o}` });
      n.push(
        { outer: !0, attrs: { "data-sort": o } }
      );
      let { sortLink: l = i } = e.setting;
      if (l) {
        const c = o === "asc" ? "desc" : "asc";
        typeof l == "function" && (l = l.call(this, e, c, o)), typeof l == "string" && (l = { url: l });
        const { url: u, ...h } = l;
        n[0] = /* @__PURE__ */ p("a", { className: "dtable-sort-link", href: G(u, { ...e.setting, sortType: c }), ...h, children: [
          n[0],
          a
        ] });
      } else
        n.push(a);
    }
    return n;
  }
}, jh = nt(Hh, { buildIn: !0 }), ws = (n) => {
  n.length !== 1 && n.forEach((t, e) => {
    !e || t.setting.border || t.setting.group === n[e - 1].setting.group || (t.setting.border = "left");
  });
}, Bh = {
  name: "group",
  defaultOptions: {
    groupDivider: !0
  },
  when: (n) => !!n.groupDivider,
  onLayout(n) {
    if (!this.options.groupDivider)
      return;
    const { cols: t } = n;
    ws(t.left.list), ws(t.center.list), ws(t.right.list);
  }
}, Vh = nt(Bh);
const Uh = {
  name: "header-group",
  defaultOptions: {
    headerGroup: !0
  },
  data() {
    return { headerGroups: /* @__PURE__ */ new Map() };
  },
  when: (n) => !!n.headerGroup,
  beforeLayout(n) {
    const { headerGroups: t } = this.data;
    t.clear();
    const { cols: e } = n;
    if (!(e != null && e.length))
      return;
    const s = {};
    return e.forEach((i, r) => {
      const { headerGroup: o } = i;
      if (!o) {
        s[i.name] = r;
        return;
      }
      let a = t.get(o);
      a ? a.cols.push(i.name) : (a = { cols: [i.name], index: r }, t.set(o, a)), s[i.name] = a.index + a.cols.length / e.length;
    }), e.sort((i, r) => s[i.name] - s[r.name]), {
      headerHeight: !n.headerHeight && n.rowHeight ? n.rowHeight * 2 : void 0,
      cols: e
    };
  },
  onRenderHeaderCell(n, { col: t }) {
    const { headerGroup: e } = t.setting;
    if (e) {
      const s = this.data.headerGroups.get(e), i = this.layout.headerHeight / 2;
      if (t.name === s.cols[0]) {
        const r = s.cols.reduce((a, l) => {
          var c;
          return a + (((c = this.getColInfo(l)) == null ? void 0 : c.realWidth) ?? 0);
        }, 0), o = {
          height: i - 1,
          width: r - 1
        };
        n.push(/* @__PURE__ */ p("div", { class: "dtable-header-group", style: o, children: e }));
      }
      n.push({
        className: "dtable-header-as-group",
        style: { paddingTop: i }
      });
    }
    return n;
  }
}, Kh = nt(Uh), qh = {
  name: "cellspan",
  when: (n) => !!n.getCellSpan,
  data() {
    return { cellSpanMap: /* @__PURE__ */ new Map(), overlayedCellSet: /* @__PURE__ */ new Set() };
  },
  onLayout(n) {
    const { getCellSpan: t } = this.options;
    if (!t)
      return;
    const { cellSpanMap: e, overlayedCellSet: s } = this.data, { rows: i, cols: r, rowHeight: o } = n;
    e.clear(), s.clear();
    const a = (l, c, u) => {
      const { index: h } = c;
      l.forEach((m, f) => {
        const { index: _ } = m, g = `C${_}R${h}`;
        if (s.has(g))
          return;
        const y = t.call(this, { row: c, col: m });
        if (!y)
          return;
        const v = Math.min(y.colSpan || 1, l.length - f), w = Math.min(y.rowSpan || 1, i.length - u);
        if (v <= 1 && w <= 1)
          return;
        let b = 0;
        for (let C = 0; C < v; C++) {
          b += l[f + C].realWidth;
          for (let k = 0; k < w; k++) {
            const x = `C${_ + C}R${h + k}`;
            x !== g && s.add(x);
          }
        }
        e.set(g, {
          colSpan: v,
          rowSpan: w,
          width: b,
          height: o * w
        });
      });
    };
    i.forEach((l, c) => {
      ["left", "center", "right"].forEach((u) => {
        a(r[u].list, l, c);
      });
    });
  },
  onRenderCell(n, { row: t, col: e }) {
    const s = `C${e.index}R${t.index}`;
    if (this.data.overlayedCellSet.has(s))
      n.push({ outer: !0, style: { display: "none", className: "cellspan-overlayed-cell" } });
    else {
      const i = this.data.cellSpanMap.get(s);
      i && n.push({
        outer: !0,
        style: {
          width: i.width,
          height: i.height
        }
      });
    }
    return n;
  }
}, Gh = nt(qh), Yh = {
  name: "mousemove",
  events: {
    mousemove(n) {
      this.data.mmRafID && (cancelAnimationFrame(this.data.mmRafID), this.data.mmRafID = 0), this.data.mmRafID = requestAnimationFrame(() => {
        this.emitCustomEvent("mousemovesmooth", n);
      }), n.preventDefault();
    },
    document_mousemove(n) {
      this.data.dmmRafID && (cancelAnimationFrame(this.data.dmmRafID), this.data.dmmRafID = 0), this.data.dmmRafID = requestAnimationFrame(() => {
        this.emitCustomEvent("document_mousemovesmooth", n);
      }), n.preventDefault();
    }
  }
}, Ta = nt(Yh);
function Jh() {
  var w, b;
  const { scrollToMouse: n } = this.data;
  if (!n)
    return this.stopScrollToMouse();
  const { position: t, startTime: e, delay: s } = n;
  if (!t || Date.now() - e < s)
    return;
  const i = (b = (w = this.ref.current) == null ? void 0 : w.querySelector(".dtable-body")) == null ? void 0 : b.getBoundingClientRect();
  if (!i)
    return;
  const { maxStep: r, detectPadding: o, speed: a, side: l } = n, { x: c, y: u } = t, { left: h, top: m, right: f, bottom: _ } = i;
  let g = 0;
  c < h - o ? g = -Math.max(r, h - o - c) : c > f - o && (g = Math.max(r, c - (f - o)));
  let y = 0;
  if (u < m - o ? y = -Math.max(r, m - o - u) : u > _ - o && (y = Math.max(r, u - (_ - o))), l) {
    const C = new Set((Array.isArray(l) ? l : [l]).reduce((k, x) => (x === "x" ? k.push("left", "right") : x === "y" ? k.push("top", "bottom") : k.push(x), k), []));
    (!C.has("left") && g < 0 || !C.has("right") && g > 0) && (g = 0), (!C.has("top") && y < 0 || !C.has("bottom") && y > 0) && (y = 0);
  }
  const v = {};
  g !== 0 && (v.scrollLeft = this.layout.scrollLeft + a * g), y !== 0 && (v.scrollTop = this.layout.scrollTop + a * y), this.scroll(v);
}
const Zh = {
  name: "autoscroll",
  plugins: [Ta],
  events: {
    document_mousemovesmooth(n) {
      if (!this.data.scrollToMouse)
        return;
      const { clientX: t, clientY: e } = n;
      this.data.scrollToMouse.position = { x: t, y: e };
    }
  },
  methods: {
    scrollTo({ col: n, row: t, extra: e = 2 }) {
      const s = this.getColInfo(n), i = this.getRowInfo(t);
      if (!s && !i)
        return !1;
      const r = {}, { layout: o } = this;
      if (s) {
        const { scrollLeft: a, cols: l } = o, c = s.left + s.realWidth;
        s.left < a ? r.scrollLeft = s.left - e : c > l.center.width + a && (r.scrollLeft = c - l.center.width + e);
      }
      if (i) {
        const { scrollTop: a, rowHeight: l, rowsHeight: c } = o, u = i.top + l;
        i.top < a ? r.scrollTop = i.top - e : u > c + a && (r.scrollTop = u - c + e);
      }
      return this.scroll(r), !0;
    },
    startScrollToMouse(n) {
      const t = {
        interval: 60,
        speed: 0.2,
        delay: 200,
        maxStep: this.options.rowHeight,
        onlyInside: !1,
        detectPadding: 30,
        startTime: Date.now(),
        ...n
      };
      this.data.scrollToMouse = t, clearInterval(this.data.scrollToTimer), this.data.scrollToTimer = window.setInterval(Jh.bind(this), t.interval);
    },
    stopScrollToMouse() {
      clearInterval(this.data.scrollToTimer), this.data.scrollToMouse = void 0;
    }
  },
  onUnmounted() {
    clearInterval(this.data.scrollToTimer);
  }
}, Xh = nt(Zh);
const Qh = {
  name: "sortable",
  defaultOptions: {
    sortable: !0,
    canSortTo(n, t) {
      return this.options.nested ? this.getNestedRowInfo(n.id).parent === this.getNestedRowInfo(t.id).parent : !0;
    }
  },
  when: (n) => !!n.sortable,
  plugins: [Ta, Xh],
  events: {
    mousedown(n) {
      var r;
      if (this.data.disableSortable)
        return;
      const { sortHandler: t = ".dtable-cell" } = this.options;
      if (!d(n.target).closest(t).length)
        return;
      const s = this.getPointerInfo(n);
      if (!s || s.rowID === "HEADER")
        return;
      const i = this.getRowInfo(s.rowID);
      !i || ((r = this.options.onSortStart) == null ? void 0 : r.call(this, i, n)) === !1 || (this.data.sortableInfo = { from: i, offset: n.clientY - s.cellElement.getBoundingClientRect().top });
    },
    document_mouseup(n) {
      var e;
      if (!this.data.sortableInfo)
        return;
      this.stopScrollToMouse();
      const t = this.getSortingState(n);
      if (t) {
        let s;
        const { sortingFrom: i, sortingTo: r, sortingSide: o } = t;
        if (r && o) {
          const a = [...this.layout.rows], l = i.index, c = r.index, u = a.splice(l, 1);
          a.splice(c, 0, u[0]), s = {};
          const h = [];
          a.forEach(({ id: m }, f) => {
            s[m] = f, h.push(m);
          }), ((e = this.options.onSort) == null ? void 0 : e.call(this, i, r, o, h)) === !1 && (s = void 0);
        }
        this.disableAnimation(), this.update({
          dirtyType: "layout",
          state: d.extend({
            sortingFrom: void 0,
            sortingPos: void 0,
            sortingTo: void 0,
            sortingSide: void 0
          }, s ? { rowOrders: s } : null)
        }, () => {
          var a;
          (a = this.options.onSortEnd) == null || a.call(this, i, r, o), setTimeout(() => {
            this.data.disableCheckable = void 0;
          }, 50);
        });
      }
      this.data.sortableInfo = void 0;
    },
    document_mousemovesmooth(n) {
      const { sortableInfo: t } = this.data;
      if (!t)
        return;
      const e = this.getSortingState(n);
      e && (t.state || (this.startScrollToMouse({ side: "y" }), this.data.disableCheckable = !0), t.state = e, this.setState(e));
    }
  },
  methods: {
    getSortingState(n) {
      var x;
      const { disableSortable: t, sortableInfo: e } = this.data;
      if (t || !e)
        return;
      const { headerHeight: s, footerHeight: i, visibleRows: r, scrollTop: o, rowHeight: a } = this.layout, l = this.element.getBoundingClientRect(), c = l.width, u = l.height - s - i, h = n.clientX - l.left, m = n.clientY - l.top - s;
      if (h < 0 || h > c || m < 0 || m > u)
        return e.state;
      const f = m + o, _ = r.find((A) => A.top <= f && A.top + a > f);
      if (!_)
        return e.state;
      const g = e.from, y = _.id !== g.id ? _.id : void 0, v = y ? this.getRowInfo(y) : void 0, w = m, b = f < _.top + a / 2 ? "before" : "after";
      return v && ((x = this.options.canSortTo) == null ? void 0 : x.call(this, g, v, b)) !== !1 ? {
        sortingFrom: g,
        sortingPos: w,
        sortingTo: v,
        sortingSide: b
      } : {
        sortingFrom: g,
        sortingPos: w,
        sortingTo: void 0,
        sortingSide: void 0
      };
    }
  },
  onAddRows(n) {
    const { rowOrders: t } = this.state;
    if (t)
      return n = n.sort((e, s) => t[e.id] - t[s.id]), n;
  },
  beforeRender(n) {
    const { sortingFrom: t } = this.state, { visibleRows: e } = n;
    t && (e.some((s) => s.id === t.id) || (n.visibleRows = [...e, t]), n.className = T(n.className, "dtable-sorting"));
  },
  onRenderCell(n, t, e) {
    const { sortingFrom: s, sortingPos: i, sortingTo: r, sortingSide: o } = this.state;
    if (!s)
      return n;
    const a = t.row, l = {}, c = [];
    if (s.id === a.id)
      l.top = i - this.data.sortableInfo.offset + ((e.top ?? a.top) - (a.top - this.layout.scrollTop)), c.push("is-sorting-from");
    else if (r) {
      const u = r.id === a.id;
      u && c.push(`text-primary is-sorting-to is-sorting-to-${o}`), s.index > a.index && (u && o === "before" || a.index > r.index) ? c.push("is-sorting-before") : s.index < a.index && (u && o === "after" || a.index < r.index) && c.push("is-sorting-after");
    }
    return c.length && n.push({
      outer: !0,
      style: l,
      className: c
    }), n;
  }
}, tu = nt(Qh), eu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  NestedRowState: ba,
  avatar: Wh,
  cellspan: Gh,
  checkable: Ih,
  custom: Th,
  group: Vh,
  headerGroup: Kh,
  nested: Fh,
  renderDatetime: pa,
  renderDatetimeCell: va,
  renderFormat: Wi,
  renderFormatCell: ga,
  renderHtmlCell: Us,
  renderLink: fa,
  renderLinkCell: ma,
  renderMapCell: _a,
  renderStyleMapCell: ya,
  rich: wh,
  sort: Sh,
  sortType: jh,
  sortable: tu
}, Symbol.toStringTag, { value: "Module" }));
class on extends B {
  setOptions(t) {
    return t = super.setOptions(t), t.parent || (t.parent = this.element), t;
  }
}
on.NAME = "DTable";
on.Component = Oi;
on.definePlugin = nt;
on.removePlugin = sa;
on.plugins = eu;
var Na = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, br = (n, t, e) => (Na(n, t, "read from private field"), e ? e.call(n) : t.get(n)), nu = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, Cr = (n, t, e, s) => (Na(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), me;
const su = "nav", yn = '[data-toggle="tab"]', iu = "active";
class Ea extends Ot {
  constructor() {
    super(...arguments), nu(this, me, 0);
  }
  active(t) {
    const e = this.$element, s = e.find(yn);
    let i = t ? d(t).closest(yn) : s.filter(`.${iu}`);
    if (!i.length && (i = e.find(yn).first(), !i.length))
      return;
    s.removeClass("active"), i.addClass("active");
    const r = i.attr("href") || i.data("target"), o = i.data("name") || r, a = d(r);
    a.length && (a.parent().children(".tab-pane").removeClass("active in"), a.addClass("active").trigger("show", [o]), this.emit("show", o), br(this, me) && clearTimeout(br(this, me)), Cr(this, me, setTimeout(() => {
      a.addClass("in").trigger("shown", [o]), this.emit("shown", o), Cr(this, me, 0);
    }, 10)));
  }
}
me = /* @__PURE__ */ new WeakMap();
Ea.NAME = "Tabs";
d(document).on("click.tabs.zui", yn, (n) => {
  n.preventDefault();
  const t = d(n.target), e = t.closest(`.${su}`);
  e.length && Ea.ensure(e).active(t);
});
export {
  d as $,
  jr as Ajax,
  _o as Avatar,
  yo as BtnGroup,
  Rl as Bus,
  Io as ColorPicker,
  hi as CommonList,
  Ot as Component,
  B as ComponentFromReact,
  Cn as Computed,
  V as CustomContent,
  ho as CustomRender,
  on as DTable,
  Ho as DatePicker,
  jo as DatetimePicker,
  qt as Dropdown,
  Mi as FileSelector,
  X as HElement,
  ve as HtmlContent,
  Q as Icon,
  Ai as ImageSelector,
  di as Menu,
  gu as Messager,
  Ps as Modal,
  Ue as ModalBase,
  Rs as ModalTrigger,
  Ko as Nav,
  Jo as Pager,
  Ri as Pick,
  Qo as Picker,
  uo as Portal,
  go as ProgressCircle,
  H as ReactComponent,
  ta as SearchBox,
  fi as SearchMenu,
  Hl as Sticky,
  Ve as TIME_DAY,
  Ea as Tabs,
  Wo as TimePicker,
  ea as Toolbar,
  Bt as Tooltip,
  Uc as addDate,
  ro as bindHotkeys,
  Lt as bus,
  d as cash,
  T as classes,
  Ie as componentsMap,
  an as convertBytes,
  Ml as create,
  F as createDate,
  Cl as createFormData,
  ql as createPortal,
  K as createRef,
  _l as deepGet,
  gl as deepGetPath,
  au as defineFn,
  Sn as delay,
  Al as disableScroll,
  cu as dom,
  er as downloadFile,
  Wl as enterFullscreen,
  ii as fetchData,
  Et as formatBytes,
  pt as formatDate,
  ku as formatDateSpan,
  G as formatString,
  Br as getClassList,
  Tn as getComponent,
  ai as getFullscreenElement,
  io as getHotkeysMap,
  Bl as getReactComponent,
  Ss as getZData,
  xt as h,
  lu as hotkeys,
  j as i18n,
  Cs as isDiff,
  ou as isFetchSetting,
  re as isSameDay,
  Po as isSameMonth,
  wu as isSameWeek,
  As as isSameYear,
  bu as isToday,
  Su as isTomorrow,
  Ro as isValidDate,
  bt as isValidElement,
  Cu as isYesterday,
  W as mergeProps,
  ut as nextGid,
  Pl as parseSize,
  co as reactComponents,
  rt as registerReactComponent,
  to as removeUndefinedProps,
  He as render,
  Ts as renderCustomContent,
  Ul as renderCustomResult,
  Yi as setZData,
  kl as shareData,
  Ns as store,
  Vr as storeData,
  Ur as takeData,
  dn as toCssSize,
  ao as toggleFullscreen,
  oo as unbindHotkeys
};
//# sourceMappingURL=zui.esm.js.map
