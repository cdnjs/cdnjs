import { l as g, m as _, g as w, h as L, b as z } from "./commonDb-41f8b4c5.js";
import { c as P } from "./createText-898ab18c.js";
import { p as D } from "./mermaidAPI-12c6e56f.js";
import { p as Q } from "./svgDraw-0a992cdb.js";
import { u as U, G as V } from "./utils-8ea37061.js";
import { l as et } from "./line-05ccbb85.js";
const st = (r, t, a, n) => {
  t.forEach((e) => {
    bt[e](r, a, n);
  });
}, it = (r, t, a) => {
  g.trace("Making markers for ", a), r.append("defs").append("marker").attr("id", t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 0).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), r.append("defs").append("marker").attr("id", t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, nt = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 0).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, lt = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 0).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, ct = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 0).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, ht = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 0).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "white").attr("cx", 6).attr("cy", 7).attr("r", 6);
}, ot = (r, t) => {
  r.append("marker").attr("id", t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 12 20").attr("refX", 10).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 0).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, ft = (r, t) => {
  r.append("marker").attr("id", t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, dt = (r, t) => {
  r.append("marker").attr("id", t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, pt = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "strokeWidth").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, bt = {
  extension: it,
  composition: nt,
  aggregation: lt,
  dependency: ct,
  lollipop: ht,
  point: ot,
  circle: ft,
  cross: dt,
  barb: pt
}, Pt = st;
function xt(r, t) {
  t && r.attr("style", t);
}
function gt(r) {
  const t = L(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")), a = t.append("xhtml:div"), n = r.label, e = r.isNode ? "nodeLabel" : "edgeLabel";
  return a.html(
    '<span class="' + e + '" ' + (r.labelStyle ? 'style="' + r.labelStyle + '"' : "") + ">" + n + "</span>"
  ), xt(a, r.labelStyle), a.style("display", "inline-block"), a.style("white-space", "nowrap"), a.attr("xmlns", "http://www.w3.org/1999/xhtml"), t.node();
}
const yt = (r, t, a, n) => {
  let e = r || "";
  if (typeof e == "object" && (e = e[0]), _(w().flowchart.htmlLabels)) {
    e = e.replace(/\\n|\n/g, "<br />"), g.info("vertexText" + e);
    const i = {
      isNode: n,
      label: D(e).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (l) => `<i class='${l.replace(":", " ")}'></i>`
      ),
      labelStyle: t.replace("fill:", "color:")
    };
    return gt(i);
  } else {
    const i = document.createElementNS("http://www.w3.org/2000/svg", "text");
    i.setAttribute("style", t.replace("color:", "fill:"));
    let s = [];
    typeof e == "string" ? s = e.split(/\\n|\n|<br\s*\/?>/gi) : Array.isArray(e) ? s = e : s = [];
    for (const l of s) {
      const h = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      h.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), h.setAttribute("dy", "1em"), h.setAttribute("x", "0"), a ? h.setAttribute("class", "title-row") : h.setAttribute("class", "row"), h.textContent = l.trim(), i.appendChild(h);
    }
    return i;
  }
}, T = yt, S = (r, t, a, n) => {
  let e;
  a ? e = a : e = "node default";
  const i = r.insert("g").attr("class", e).attr("id", t.domId || t.id), s = i.insert("g").attr("class", "label").attr("style", t.labelStyle);
  let l;
  t.labelText === void 0 ? l = "" : l = typeof t.labelText == "string" ? t.labelText : t.labelText[0];
  const h = s.node();
  let o;
  t.labelType === "markdown" ? o = P(s, z(D(l), w()), {
    useHtmlLabels: w().flowchart.htmlLabels,
    width: t.width || w().flowchart.wrappingWidth,
    classes: "markdown-node-label"
  }) : o = h.appendChild(
    T(
      z(D(l), w()),
      t.labelStyle,
      !1,
      n
    )
  );
  let c = o.getBBox();
  if (_(w().flowchart.htmlLabels)) {
    const b = o.children[0], d = L(o);
    c = b.getBoundingClientRect(), d.attr("width", c.width), d.attr("height", c.height);
  }
  const f = t.padding / 2;
  return w().flowchart.htmlLabels ? s.attr("transform", "translate(" + -c.width / 2 + ", " + -c.height / 2 + ")") : s.attr("transform", "translate(" + 0 + ", " + -c.height / 2 + ")"), s.insert("rect", ":first-child"), { shapeSvg: i, bbox: c, halfPadding: f, label: s };
}, m = (r, t) => {
  const a = t.node().getBBox();
  r.width = a.width, r.height = a.height;
};
function N(r, t, a, n) {
  return r.insert("polygon", ":first-child").attr(
    "points",
    n.map(function(e) {
      return e.x + "," + e.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + a / 2 + ")");
}
function ut(r, t) {
  return r.intersect(t);
}
function tt(r, t, a, n) {
  var e = r.x, i = r.y, s = e - n.x, l = i - n.y, h = Math.sqrt(t * t * l * l + a * a * s * s), o = Math.abs(t * a * s / h);
  n.x < e && (o = -o);
  var c = Math.abs(t * a * l / h);
  return n.y < i && (c = -c), { x: e + o, y: i + c };
}
function wt(r, t, a) {
  return tt(r, t, t, a);
}
function mt(r, t, a, n) {
  var e, i, s, l, h, o, c, f, b, d, p, x, y, k, R;
  if (e = t.y - r.y, s = r.x - t.x, h = t.x * r.y - r.x * t.y, b = e * a.x + s * a.y + h, d = e * n.x + s * n.y + h, !(b !== 0 && d !== 0 && J(b, d)) && (i = n.y - a.y, l = a.x - n.x, o = n.x * a.y - a.x * n.y, c = i * r.x + l * r.y + o, f = i * t.x + l * t.y + o, !(c !== 0 && f !== 0 && J(c, f)) && (p = e * l - i * s, p !== 0)))
    return x = Math.abs(p / 2), y = s * o - l * h, k = y < 0 ? (y - x) / p : (y + x) / p, y = i * h - e * o, R = y < 0 ? (y - x) / p : (y + x) / p, { x: k, y: R };
}
function J(r, t) {
  return r * t > 0;
}
function kt(r, t, a) {
  var n = r.x, e = r.y, i = [], s = Number.POSITIVE_INFINITY, l = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(p) {
    s = Math.min(s, p.x), l = Math.min(l, p.y);
  }) : (s = Math.min(s, t.x), l = Math.min(l, t.y));
  for (var h = n - r.width / 2 - s, o = e - r.height / 2 - l, c = 0; c < t.length; c++) {
    var f = t[c], b = t[c < t.length - 1 ? c + 1 : 0], d = mt(
      r,
      a,
      { x: h + f.x, y: o + f.y },
      { x: h + b.x, y: o + b.y }
    );
    d && i.push(d);
  }
  return i.length ? (i.length > 1 && i.sort(function(p, x) {
    var y = p.x - a.x, k = p.y - a.y, R = Math.sqrt(y * y + k * k), $ = x.x - a.x, B = x.y - a.y, X = Math.sqrt($ * $ + B * B);
    return R < X ? -1 : R === X ? 0 : 1;
  }), i[0]) : r;
}
const vt = (r, t) => {
  var a = r.x, n = r.y, e = t.x - a, i = t.y - n, s = r.width / 2, l = r.height / 2, h, o;
  return Math.abs(i) * s > Math.abs(e) * l ? (i < 0 && (l = -l), h = i === 0 ? 0 : l * e / i, o = l) : (e < 0 && (s = -s), h = s, o = e === 0 ? 0 : s * i / e), { x: a + h, y: n + o };
}, Lt = vt, u = {
  node: ut,
  circle: wt,
  ellipse: tt,
  polygon: kt,
  rect: Lt
}, St = (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = S(r, t, "node " + t.classes, !0);
  g.info("Classes = ", t.classes);
  const i = a.insert("rect", ":first-child");
  return i.attr("rx", t.rx).attr("ry", t.ry).attr("x", -n.width / 2 - e).attr("y", -n.height / 2 - e).attr("width", n.width + t.padding).attr("height", n.height + t.padding), m(t, i), t.intersect = function(s) {
    return u.rect(t, s);
  }, a;
}, Et = St, q = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = e + i, l = [
    { x: s / 2, y: 0 },
    { x: s, y: -s / 2 },
    { x: s / 2, y: -s },
    { x: 0, y: -s / 2 }
  ];
  g.info("Question main (Circle)");
  const h = N(a, s, s, l);
  return h.attr("style", t.style), m(t, h), t.intersect = function(o) {
    return g.warn("Intersect called"), u.polygon(t, l, o);
  }, a;
}, Bt = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), n = 28, e = [
    { x: 0, y: n / 2 },
    { x: n / 2, y: 0 },
    { x: 0, y: -n / 2 },
    { x: -n / 2, y: 0 }
  ];
  return a.insert("polygon", ":first-child").attr(
    "points",
    e.map(function(s) {
      return s.x + "," + s.y;
    }).join(" ")
  ).attr("class", "state-start").attr("r", 7).attr("width", 28).attr("height", 28), t.width = 28, t.height = 28, t.intersect = function(s) {
    return u.circle(t, 14, s);
  }, a;
}, Mt = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = 4, i = n.height + t.padding, s = i / e, l = n.width + 2 * s + t.padding, h = [
    { x: s, y: 0 },
    { x: l - s, y: 0 },
    { x: l, y: -i / 2 },
    { x: l - s, y: -i },
    { x: s, y: -i },
    { x: 0, y: -i / 2 }
  ], o = N(a, l, i, h);
  return o.attr("style", t.style), m(t, o), t.intersect = function(c) {
    return u.polygon(t, h, c);
  }, a;
}, Ct = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: -i / 2, y: 0 },
    { x: e, y: 0 },
    { x: e, y: -i },
    { x: -i / 2, y: -i },
    { x: 0, y: -i / 2 }
  ];
  return N(a, e, i, s).attr("style", t.style), t.width = e + i, t.height = i, t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, Tt = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: -2 * i / 6, y: 0 },
    { x: e - i / 6, y: 0 },
    { x: e + 2 * i / 6, y: -i },
    { x: i / 6, y: -i }
  ], l = N(a, e, i, s);
  return l.attr("style", t.style), m(t, l), t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, Rt = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: 2 * i / 6, y: 0 },
    { x: e + i / 6, y: 0 },
    { x: e - 2 * i / 6, y: -i },
    { x: -i / 6, y: -i }
  ], l = N(a, e, i, s);
  return l.attr("style", t.style), m(t, l), t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, It = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: -2 * i / 6, y: 0 },
    { x: e + 2 * i / 6, y: 0 },
    { x: e - i / 6, y: -i },
    { x: i / 6, y: -i }
  ], l = N(a, e, i, s);
  return l.attr("style", t.style), m(t, l), t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, _t = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: i / 6, y: 0 },
    { x: e - i / 6, y: 0 },
    { x: e + 2 * i / 6, y: -i },
    { x: -2 * i / 6, y: -i }
  ], l = N(a, e, i, s);
  return l.attr("style", t.style), m(t, l), t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, Nt = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: 0, y: 0 },
    { x: e + i / 2, y: 0 },
    { x: e, y: -i / 2 },
    { x: e + i / 2, y: -i },
    { x: 0, y: -i }
  ], l = N(a, e, i, s);
  return l.attr("style", t.style), m(t, l), t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, $t = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = e / 2, s = i / (2.5 + e / 50), l = n.height + s + t.padding, h = "M 0," + s + " a " + i + "," + s + " 0,0,0 " + e + " 0 a " + i + "," + s + " 0,0,0 " + -e + " 0 l 0," + l + " a " + i + "," + s + " 0,0,0 " + e + " 0 l 0," + -l, o = a.attr("label-offset-y", s).insert("path", ":first-child").attr("style", t.style).attr("d", h).attr("transform", "translate(" + -e / 2 + "," + -(l / 2 + s) + ")");
  return m(t, o), t.intersect = function(c) {
    const f = u.rect(t, c), b = f.x - t.x;
    if (i != 0 && (Math.abs(b) < t.width / 2 || Math.abs(b) == t.width / 2 && Math.abs(f.y - t.y) > t.height / 2 - s)) {
      let d = s * s * (1 - b * b / (i * i));
      d != 0 && (d = Math.sqrt(d)), d = s - d, c.y - t.y > 0 && (d = -d), f.y += d;
    }
    return f;
  }, a;
}, Ht = (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = S(r, t, "node " + t.classes, !0), i = a.insert("rect", ":first-child"), s = n.width + t.padding * 2, l = n.height + t.padding * 2;
  if (i.attr("class", "basic label-container").attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", -n.width / 2 - t.padding).attr("y", -n.height / 2 - t.padding).attr("width", s).attr("height", l), t.props) {
    const h = new Set(Object.keys(t.props));
    t.props.borders && (rt(i, t.props.borders, s, l), h.delete("borders")), h.forEach((o) => {
      g.warn(`Unknown node property ${o}`);
    });
  }
  return m(t, i), t.intersect = function(h) {
    return u.rect(t, h);
  }, a;
}, Wt = (r, t) => {
  const { shapeSvg: a } = S(r, t, "label", !0);
  g.info("Classes = ", t.classes);
  const n = a.insert("rect", ":first-child"), e = 0, i = 0;
  if (n.attr("width", e).attr("height", i), a.attr("class", "label edgeLabel"), t.props) {
    const s = new Set(Object.keys(t.props));
    t.props.borders && (rt(n, t.props.borders, e, i), s.delete("borders")), s.forEach((l) => {
      g.warn(`Unknown node property ${l}`);
    });
  }
  return m(t, n), t.intersect = function(s) {
    return u.rect(t, s);
  }, a;
};
function rt(r, t, a, n) {
  const e = [], i = (l) => {
    e.push(l, 0);
  }, s = (l) => {
    e.push(0, l);
  };
  t.includes("t") ? (g.debug("add top border"), i(a)) : s(a), t.includes("r") ? (g.debug("add right border"), i(n)) : s(n), t.includes("b") ? (g.debug("add bottom border"), i(a)) : s(a), t.includes("l") ? (g.debug("add left border"), i(n)) : s(n), r.attr("stroke-dasharray", e.join(" "));
}
const Xt = (r, t) => {
  let a;
  t.classes ? a = "node " + t.classes : a = "node default";
  const n = r.insert("g").attr("class", a).attr("id", t.domId || t.id), e = n.insert("rect", ":first-child"), i = n.insert("line"), s = n.insert("g").attr("class", "label"), l = t.labelText.flat ? t.labelText.flat() : t.labelText;
  let h = "";
  typeof l == "object" ? h = l[0] : h = l, g.info("Label text abc79", h, l, typeof l == "object");
  const o = s.node().appendChild(T(h, t.labelStyle, !0, !0));
  let c = { width: 0, height: 0 };
  if (_(w().flowchart.htmlLabels)) {
    const x = o.children[0], y = L(o);
    c = x.getBoundingClientRect(), y.attr("width", c.width), y.attr("height", c.height);
  }
  g.info("Text 2", l);
  const f = l.slice(1, l.length);
  let b = o.getBBox();
  const d = s.node().appendChild(
    T(f.join ? f.join("<br/>") : f, t.labelStyle, !0, !0)
  );
  if (_(w().flowchart.htmlLabels)) {
    const x = d.children[0], y = L(d);
    c = x.getBoundingClientRect(), y.attr("width", c.width), y.attr("height", c.height);
  }
  const p = t.padding / 2;
  return L(d).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (c.width > b.width ? 0 : (b.width - c.width) / 2) + ", " + (b.height + p + 5) + ")"
  ), L(o).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (c.width < b.width ? 0 : -(b.width - c.width) / 2) + ", " + 0 + ")"
  ), c = s.node().getBBox(), s.attr(
    "transform",
    "translate(" + -c.width / 2 + ", " + (-c.height / 2 - p + 3) + ")"
  ), e.attr("class", "outer title-state").attr("x", -c.width / 2 - p).attr("y", -c.height / 2 - p).attr("width", c.width + t.padding).attr("height", c.height + t.padding), i.attr("class", "divider").attr("x1", -c.width / 2 - p).attr("x2", c.width / 2 + p).attr("y1", -c.height / 2 - p + b.height + p).attr("y2", -c.height / 2 - p + b.height + p), m(t, e), t.intersect = function(x) {
    return u.rect(t, x);
  }, n;
}, Yt = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.height + t.padding, i = n.width + e / 4 + t.padding, s = a.insert("rect", ":first-child").attr("style", t.style).attr("rx", e / 2).attr("ry", e / 2).attr("x", -i / 2).attr("y", -e / 2).attr("width", i).attr("height", e);
  return m(t, s), t.intersect = function(l) {
    return u.rect(t, l);
  }, a;
}, Ut = (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = S(r, t, void 0, !0), i = a.insert("circle", ":first-child");
  return i.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", n.width / 2 + e).attr("width", n.width + t.padding).attr("height", n.height + t.padding), g.info("Circle main"), m(t, i), t.intersect = function(s) {
    return g.info("Circle intersect", t, n.width / 2 + e, s), u.circle(t, n.width / 2 + e, s);
  }, a;
}, At = (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = S(r, t, void 0, !0), i = 5, s = a.insert("g", ":first-child"), l = s.insert("circle"), h = s.insert("circle");
  return l.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", n.width / 2 + e + i).attr("width", n.width + t.padding + i * 2).attr("height", n.height + t.padding + i * 2), h.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", n.width / 2 + e).attr("width", n.width + t.padding).attr("height", n.height + t.padding), g.info("DoubleCircle main"), m(t, l), t.intersect = function(o) {
    return g.info("DoubleCircle intersect", t, n.width / 2 + e + i, o), u.circle(t, n.width / 2 + e + i, o);
  }, a;
}, Ot = (r, t) => {
  const { shapeSvg: a, bbox: n } = S(r, t, void 0, !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: 0, y: 0 },
    { x: e, y: 0 },
    { x: e, y: -i },
    { x: 0, y: -i },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: e + 8, y: 0 },
    { x: e + 8, y: -i },
    { x: -8, y: -i },
    { x: -8, y: 0 }
  ], l = N(a, e, i, s);
  return l.attr("style", t.style), m(t, l), t.intersect = function(h) {
    return u.polygon(t, s, h);
  }, a;
}, jt = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), n = a.insert("circle", ":first-child");
  return n.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), m(t, n), t.intersect = function(e) {
    return u.circle(t, 7, e);
  }, a;
}, F = (r, t, a) => {
  const n = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id);
  let e = 70, i = 10;
  a === "LR" && (e = 10, i = 70);
  const s = n.append("rect").attr("x", -1 * e / 2).attr("y", -1 * i / 2).attr("width", e).attr("height", i).attr("class", "fork-join");
  return m(t, s), t.height = t.height + t.padding / 2, t.width = t.width + t.padding / 2, t.intersect = function(l) {
    return u.rect(t, l);
  }, n;
}, Dt = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), n = a.insert("circle", ":first-child"), e = a.insert("circle", ":first-child");
  return e.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), n.attr("class", "state-end").attr("r", 5).attr("width", 10).attr("height", 10), m(t, e), t.intersect = function(i) {
    return u.circle(t, 7, i);
  }, a;
}, Zt = (r, t) => {
  const a = t.padding / 2, n = 4, e = 8;
  let i;
  t.classes ? i = "node " + t.classes : i = "node default";
  const s = r.insert("g").attr("class", i).attr("id", t.domId || t.id), l = s.insert("rect", ":first-child"), h = s.insert("line"), o = s.insert("line");
  let c = 0, f = n;
  const b = s.insert("g").attr("class", "label");
  let d = 0;
  const p = t.classData.annotations && t.classData.annotations[0], x = t.classData.annotations[0] ? "«" + t.classData.annotations[0] + "»" : "", y = b.node().appendChild(T(x, t.labelStyle, !0, !0));
  let k = y.getBBox();
  if (_(w().flowchart.htmlLabels)) {
    const E = y.children[0], M = L(y);
    k = E.getBoundingClientRect(), M.attr("width", k.width), M.attr("height", k.height);
  }
  t.classData.annotations[0] && (f += k.height + n, c += k.width);
  let R = t.classData.label;
  t.classData.type !== void 0 && t.classData.type !== "" && (w().flowchart.htmlLabels ? R += "&lt;" + t.classData.type + "&gt;" : R += "<" + t.classData.type + ">");
  const $ = b.node().appendChild(T(R, t.labelStyle, !0, !0));
  L($).attr("class", "classTitle");
  let B = $.getBBox();
  if (_(w().flowchart.htmlLabels)) {
    const E = $.children[0], M = L($);
    B = E.getBoundingClientRect(), M.attr("width", B.width), M.attr("height", B.height);
  }
  f += B.height + n, B.width > c && (c = B.width);
  const X = [];
  t.classData.members.forEach((E) => {
    const M = Q(E);
    let H = M.displayText;
    w().flowchart.htmlLabels && (H = H.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const I = b.node().appendChild(
      T(
        H,
        M.cssStyle ? M.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let C = I.getBBox();
    if (_(w().flowchart.htmlLabels)) {
      const j = I.children[0], Y = L(I);
      C = j.getBoundingClientRect(), Y.attr("width", C.width), Y.attr("height", C.height);
    }
    C.width > c && (c = C.width), f += C.height + n, X.push(I);
  }), f += e;
  const Z = [];
  if (t.classData.methods.forEach((E) => {
    const M = Q(E);
    let H = M.displayText;
    w().flowchart.htmlLabels && (H = H.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const I = b.node().appendChild(
      T(
        H,
        M.cssStyle ? M.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let C = I.getBBox();
    if (_(w().flowchart.htmlLabels)) {
      const j = I.children[0], Y = L(I);
      C = j.getBoundingClientRect(), Y.attr("width", C.width), Y.attr("height", C.height);
    }
    C.width > c && (c = C.width), f += C.height + n, Z.push(I);
  }), f += e, p) {
    let E = (c - k.width) / 2;
    L(y).attr(
      "transform",
      "translate( " + (-1 * c / 2 + E) + ", " + -1 * f / 2 + ")"
    ), d = k.height + n;
  }
  let at = (c - B.width) / 2;
  return L($).attr(
    "transform",
    "translate( " + (-1 * c / 2 + at) + ", " + (-1 * f / 2 + d) + ")"
  ), d += B.height + n, h.attr("class", "divider").attr("x1", -c / 2 - a).attr("x2", c / 2 + a).attr("y1", -f / 2 - a + e + d).attr("y2", -f / 2 - a + e + d), d += e, X.forEach((E) => {
    L(E).attr(
      "transform",
      "translate( " + -c / 2 + ", " + (-1 * f / 2 + d + e / 2) + ")"
    ), d += B.height + n;
  }), d += e, o.attr("class", "divider").attr("x1", -c / 2 - a).attr("x2", c / 2 + a).attr("y1", -f / 2 - a + e + d).attr("y2", -f / 2 - a + e + d), d += e, Z.forEach((E) => {
    L(E).attr(
      "transform",
      "translate( " + -c / 2 + ", " + (-1 * f / 2 + d) + ")"
    ), d += B.height + n;
  }), l.attr("class", "outer title-state").attr("x", -c / 2 - a).attr("y", -(f / 2) - a).attr("width", c + t.padding).attr("height", f + t.padding), m(t, l), t.intersect = function(E) {
    return u.rect(t, E);
  }, s;
}, G = {
  rhombus: q,
  question: q,
  rect: Ht,
  labelRect: Wt,
  rectWithTitle: Xt,
  choice: Bt,
  circle: Ut,
  doublecircle: At,
  stadium: Yt,
  hexagon: Mt,
  rect_left_inv_arrow: Ct,
  lean_right: Tt,
  lean_left: Rt,
  trapezoid: It,
  inv_trapezoid: _t,
  rect_right_inv_arrow: Nt,
  cylinder: $t,
  start: jt,
  end: Dt,
  note: Et,
  subroutine: Ot,
  fork: F,
  join: F,
  class_box: Zt
};
let W = {};
const tr = (r, t, a) => {
  let n, e;
  if (t.link) {
    let i;
    w().securityLevel === "sandbox" ? i = "_top" : t.linkTarget && (i = t.linkTarget || "_blank"), n = r.insert("svg:a").attr("xlink:href", t.link).attr("target", i), e = G[t.shape](n, t, a);
  } else
    e = G[t.shape](r, t, a), n = e;
  return t.tooltip && e.attr("title", t.tooltip), t.class && e.attr("class", "node default " + t.class), W[t.id] = n, t.haveCallback && W[t.id].attr("class", W[t.id].attr("class") + " clickable"), n;
}, rr = (r, t) => {
  W[t.id] = r;
}, ar = () => {
  W = {};
}, er = (r) => {
  const t = W[r.id];
  g.trace(
    "Transforming node",
    r.diff,
    r,
    "translate(" + (r.x - r.width / 2 - 5) + ", " + r.width / 2 + ")"
  );
  const a = 8, n = r.diff || 0;
  return r.clusterNode ? t.attr(
    "transform",
    "translate(" + (r.x + n - r.width / 2) + ", " + (r.y - r.height / 2 - a) + ")"
  ) : t.attr("transform", "translate(" + r.x + ", " + r.y + ")"), n;
};
let O = {}, v = {};
const sr = () => {
  O = {}, v = {};
}, ir = (r, t) => {
  const a = _(w().flowchart.htmlLabels), n = t.labelType === "markdown" ? P(r, t.label, {
    style: t.labelStyle,
    useHtmlLabels: a,
    addSvgBackground: !0
  }) : T(t.label, t.labelStyle);
  g.info("abc82", t, t.labelType);
  const e = r.insert("g").attr("class", "edgeLabel"), i = e.insert("g").attr("class", "label");
  i.node().appendChild(n);
  let s = n.getBBox();
  if (a) {
    const h = n.children[0], o = L(n);
    s = h.getBoundingClientRect(), o.attr("width", s.width), o.attr("height", s.height);
  }
  i.attr("transform", "translate(" + -s.width / 2 + ", " + -s.height / 2 + ")"), O[t.id] = e, t.width = s.width, t.height = s.height;
  let l;
  if (t.startLabelLeft) {
    const h = T(t.startLabelLeft, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), c = o.insert("g").attr("class", "inner");
    l = c.node().appendChild(h);
    const f = h.getBBox();
    c.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), v[t.id] || (v[t.id] = {}), v[t.id].startLeft = o, A(l, t.startLabelLeft);
  }
  if (t.startLabelRight) {
    const h = T(t.startLabelRight, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), c = o.insert("g").attr("class", "inner");
    l = o.node().appendChild(h), c.node().appendChild(h);
    const f = h.getBBox();
    c.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), v[t.id] || (v[t.id] = {}), v[t.id].startRight = o, A(l, t.startLabelRight);
  }
  if (t.endLabelLeft) {
    const h = T(t.endLabelLeft, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), c = o.insert("g").attr("class", "inner");
    l = c.node().appendChild(h);
    const f = h.getBBox();
    c.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), o.node().appendChild(h), v[t.id] || (v[t.id] = {}), v[t.id].endLeft = o, A(l, t.endLabelLeft);
  }
  if (t.endLabelRight) {
    const h = T(t.endLabelRight, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), c = o.insert("g").attr("class", "inner");
    l = c.node().appendChild(h);
    const f = h.getBBox();
    c.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), o.node().appendChild(h), v[t.id] || (v[t.id] = {}), v[t.id].endRight = o, A(l, t.endLabelRight);
  }
  return n;
};
function A(r, t) {
  w().flowchart.htmlLabels && r && (r.style.width = t.length * 9 + "px", r.style.height = "12px");
}
const nr = (r, t) => {
  g.info("Moving label abc78 ", r.id, r.label, O[r.id]);
  let a = t.updatedPath ? t.updatedPath : t.originalPath;
  if (r.label) {
    const n = O[r.id];
    let e = r.x, i = r.y;
    if (a) {
      const s = U.calcLabelPosition(a);
      g.info(
        "Moving label " + r.label + " from (",
        e,
        ",",
        i,
        ") to (",
        s.x,
        ",",
        s.y,
        ") abc78"
      ), t.updatedPath && (e = s.x, i = s.y);
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.startLabelLeft) {
    const n = v[r.id].startLeft;
    let e = r.x, i = r.y;
    if (a) {
      const s = U.calcTerminalLabelPosition(r.arrowTypeStart ? 10 : 0, "start_left", a);
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.startLabelRight) {
    const n = v[r.id].startRight;
    let e = r.x, i = r.y;
    if (a) {
      const s = U.calcTerminalLabelPosition(
        r.arrowTypeStart ? 10 : 0,
        "start_right",
        a
      );
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.endLabelLeft) {
    const n = v[r.id].endLeft;
    let e = r.x, i = r.y;
    if (a) {
      const s = U.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_left", a);
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.endLabelRight) {
    const n = v[r.id].endRight;
    let e = r.x, i = r.y;
    if (a) {
      const s = U.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_right", a);
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
}, zt = (r, t) => {
  const a = r.x, n = r.y, e = Math.abs(t.x - a), i = Math.abs(t.y - n), s = r.width / 2, l = r.height / 2;
  return e >= s || i >= l;
}, Qt = (r, t, a) => {
  g.warn(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(a)}
  node        : x:${r.x} y:${r.y} w:${r.width} h:${r.height}`);
  const n = r.x, e = r.y, i = Math.abs(n - a.x), s = r.width / 2;
  let l = a.x < t.x ? s - i : s + i;
  const h = r.height / 2, o = Math.abs(t.y - a.y), c = Math.abs(t.x - a.x);
  if (Math.abs(e - t.y) * s > Math.abs(n - t.x) * h) {
    let f = a.y < t.y ? t.y - h - e : e - h - t.y;
    l = c * f / o;
    const b = {
      x: a.x < t.x ? a.x + l : a.x - c + l,
      y: a.y < t.y ? a.y + o - f : a.y - o + f
    };
    return l === 0 && (b.x = t.x, b.y = t.y), c === 0 && (b.x = t.x), o === 0 && (b.y = t.y), g.warn(`abc89 topp/bott calc, Q ${o}, q ${f}, R ${c}, r ${l}`, b), b;
  } else {
    a.x < t.x ? l = t.x - s - n : l = n - s - t.x;
    let f = o * l / c, b = a.x < t.x ? a.x + c - l : a.x - c + l, d = a.y < t.y ? a.y + f : a.y - f;
    return g.warn(`sides calc abc89, Q ${o}, q ${f}, R ${c}, r ${l}`, { _x: b, _y: d }), l === 0 && (b = t.x, d = t.y), c === 0 && (b = t.x), o === 0 && (d = t.y), { x: b, y: d };
  }
}, K = (r, t) => {
  g.warn("abc88 cutPathAtIntersect", r, t);
  let a = [], n = r[0], e = !1;
  return r.forEach((i) => {
    if (g.info("abc88 checking point", i, t), !zt(t, i) && !e) {
      const s = Qt(t, n, i);
      g.warn("abc88 inside", i, n, s), g.warn("abc88 intersection", s);
      let l = !1;
      a.forEach((h) => {
        l = l || h.x === s.x && h.y === s.y;
      }), a.some((h) => h.x === s.x && h.y === s.y) ? g.warn("abc88 no intersect", s, a) : a.push(s), e = !0;
    } else
      g.warn("abc88 outside", i, n), n = i, e || a.push(i);
  }), g.warn("abc88 returning points", a), a;
}, lr = function(r, t, a, n, e, i) {
  let s = a.points, l = !1;
  const h = i.node(t.v);
  var o = i.node(t.w);
  g.info("abc88 InsertEdge: ", a), o.intersect && h.intersect && (s = s.slice(1, a.points.length - 1), s.unshift(h.intersect(s[0])), g.info(
    "Last point",
    s[s.length - 1],
    o,
    o.intersect(s[s.length - 1])
  ), s.push(o.intersect(s[s.length - 1]))), a.toCluster && (g.info("to cluster abc88", n[a.toCluster]), s = K(a.points, n[a.toCluster].node), l = !0), a.fromCluster && (g.info("from cluster abc88", n[a.fromCluster]), s = K(s.reverse(), n[a.fromCluster].node).reverse(), l = !0);
  const c = s.filter((k) => !Number.isNaN(k.y));
  let f;
  e === "graph" || e === "flowchart" ? f = a.curve || V : f = V;
  const b = et().x(function(k) {
    return k.x;
  }).y(function(k) {
    return k.y;
  }).curve(f);
  let d;
  switch (a.thickness) {
    case "normal":
      d = "edge-thickness-normal";
      break;
    case "thick":
      d = "edge-thickness-thick";
      break;
    case "invisible":
      d = "edge-thickness-thick";
      break;
    default:
      d = "";
  }
  switch (a.pattern) {
    case "solid":
      d += " edge-pattern-solid";
      break;
    case "dotted":
      d += " edge-pattern-dotted";
      break;
    case "dashed":
      d += " edge-pattern-dashed";
      break;
  }
  const p = r.append("path").attr("d", b(c)).attr("id", a.id).attr("class", " " + d + (a.classes ? " " + a.classes : "")).attr("style", a.style);
  let x = "";
  switch ((w().flowchart.arrowMarkerAbsolute || w().state.arrowMarkerAbsolute) && (x = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, x = x.replace(/\(/g, "\\("), x = x.replace(/\)/g, "\\)")), g.info("arrowTypeStart", a.arrowTypeStart), g.info("arrowTypeEnd", a.arrowTypeEnd), a.arrowTypeStart) {
    case "arrow_cross":
      p.attr("marker-start", "url(" + x + "#" + e + "-crossStart)");
      break;
    case "arrow_point":
      p.attr("marker-start", "url(" + x + "#" + e + "-pointStart)");
      break;
    case "arrow_barb":
      p.attr("marker-start", "url(" + x + "#" + e + "-barbStart)");
      break;
    case "arrow_circle":
      p.attr("marker-start", "url(" + x + "#" + e + "-circleStart)");
      break;
    case "aggregation":
      p.attr("marker-start", "url(" + x + "#" + e + "-aggregationStart)");
      break;
    case "extension":
      p.attr("marker-start", "url(" + x + "#" + e + "-extensionStart)");
      break;
    case "composition":
      p.attr("marker-start", "url(" + x + "#" + e + "-compositionStart)");
      break;
    case "dependency":
      p.attr("marker-start", "url(" + x + "#" + e + "-dependencyStart)");
      break;
    case "lollipop":
      p.attr("marker-start", "url(" + x + "#" + e + "-lollipopStart)");
      break;
  }
  switch (a.arrowTypeEnd) {
    case "arrow_cross":
      p.attr("marker-end", "url(" + x + "#" + e + "-crossEnd)");
      break;
    case "arrow_point":
      p.attr("marker-end", "url(" + x + "#" + e + "-pointEnd)");
      break;
    case "arrow_barb":
      p.attr("marker-end", "url(" + x + "#" + e + "-barbEnd)");
      break;
    case "arrow_circle":
      p.attr("marker-end", "url(" + x + "#" + e + "-circleEnd)");
      break;
    case "aggregation":
      p.attr("marker-end", "url(" + x + "#" + e + "-aggregationEnd)");
      break;
    case "extension":
      p.attr("marker-end", "url(" + x + "#" + e + "-extensionEnd)");
      break;
    case "composition":
      p.attr("marker-end", "url(" + x + "#" + e + "-compositionEnd)");
      break;
    case "dependency":
      p.attr("marker-end", "url(" + x + "#" + e + "-dependencyEnd)");
      break;
    case "lollipop":
      p.attr("marker-end", "url(" + x + "#" + e + "-lollipopEnd)");
      break;
  }
  let y = {};
  return l && (y.updatedPath = s), y.originalPath = a.points, y;
};
export {
  Pt as a,
  ar as b,
  T as c,
  sr as d,
  tr as e,
  ir as f,
  lr as g,
  nr as h,
  Lt as i,
  S as l,
  er as p,
  rr as s,
  m as u
};
//# sourceMappingURL=edges-1ecdb580.js.map
