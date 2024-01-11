import { l as y, p as I, c as b, aR as Q, j as E, d as V, z as A, F as lt } from "./mermaid-8d01e515.js";
import { a as et } from "./createText-cadb7b3f.js";
import { l as ct } from "./line-973c5b8b.js";
const ht = (r, t, a, i) => {
  t.forEach((s) => {
    wt[s](r, a, i);
  });
}, ot = (r, t, a) => {
  y.trace("Making markers for ", a), r.append("defs").append("marker").attr("id", a + "_" + t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, ft = (r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, pt = (r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, dt = (r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", a + "_" + t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, yt = (r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), r.append("defs").append("marker").attr("id", a + "_" + t + "-lollipopEnd").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
}, gt = (r, t, a) => {
  r.append("marker").attr("id", a + "_" + t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 6).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, xt = (r, t, a) => {
  r.append("marker").attr("id", a + "_" + t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, ut = (r, t, a) => {
  r.append("marker").attr("id", a + "_" + t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", a + "_" + t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, bt = (r, t, a) => {
  r.append("defs").append("marker").attr("id", a + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "strokeWidth").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, wt = {
  extension: ot,
  composition: ft,
  aggregation: pt,
  dependency: dt,
  lollipop: yt,
  point: gt,
  circle: xt,
  cross: ut,
  barb: bt
}, ir = ht;
function mt(r, t) {
  t && r.attr("style", t);
}
function kt(r) {
  const t = E(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")), a = t.append("xhtml:div"), i = r.label, s = r.isNode ? "nodeLabel" : "edgeLabel";
  return a.html(
    '<span class="' + s + '" ' + (r.labelStyle ? 'style="' + r.labelStyle + '"' : "") + ">" + i + "</span>"
  ), mt(a, r.labelStyle), a.style("display", "inline-block"), a.style("white-space", "nowrap"), a.attr("xmlns", "http://www.w3.org/1999/xhtml"), t.node();
}
const Lt = (r, t, a, i) => {
  let s = r || "";
  if (typeof s == "object" && (s = s[0]), I(b().flowchart.htmlLabels)) {
    s = s.replace(/\\n|\n/g, "<br />"), y.info("vertexText" + s);
    const e = {
      isNode: i,
      label: Q(s).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (l) => `<i class='${l.replace(":", " ")}'></i>`
      ),
      labelStyle: t.replace("fill:", "color:")
    };
    return kt(e);
  } else {
    const e = document.createElementNS("http://www.w3.org/2000/svg", "text");
    e.setAttribute("style", t.replace("color:", "fill:"));
    let n = [];
    typeof s == "string" ? n = s.split(/\\n|\n|<br\s*\/?>/gi) : Array.isArray(s) ? n = s : n = [];
    for (const l of n) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      c.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), c.setAttribute("dy", "1em"), c.setAttribute("x", "0"), a ? c.setAttribute("class", "title-row") : c.setAttribute("class", "row"), c.textContent = l.trim(), e.appendChild(c);
    }
    return e;
  }
}, R = Lt, B = async (r, t, a, i) => {
  let s;
  const e = t.useHtmlLabels || I(b().flowchart.htmlLabels);
  a ? s = a : s = "node default";
  const n = r.insert("g").attr("class", s).attr("id", t.domId || t.id), l = n.insert("g").attr("class", "label").attr("style", t.labelStyle);
  let c;
  t.labelText === void 0 ? c = "" : c = typeof t.labelText == "string" ? t.labelText : t.labelText[0];
  const o = l.node();
  let h;
  t.labelType === "markdown" ? h = et(l, V(Q(c), b()), {
    useHtmlLabels: e,
    width: t.width || b().flowchart.wrappingWidth,
    classes: "markdown-node-label"
  }) : h = o.appendChild(
    R(
      V(Q(c), b()),
      t.labelStyle,
      !1,
      i
    )
  );
  let f = h.getBBox();
  const d = t.padding / 2;
  if (I(b().flowchart.htmlLabels)) {
    const p = h.children[0], x = E(h), m = p.getElementsByTagName("img");
    if (m) {
      const g = c.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...m].map(
          (u) => new Promise((S) => {
            function M() {
              if (u.style.display = "flex", u.style.flexDirection = "column", g) {
                const C = b().fontSize ? b().fontSize : window.getComputedStyle(document.body).fontSize, O = 5, j = parseInt(C, 10) * O + "px";
                u.style.minWidth = j, u.style.maxWidth = j;
              } else
                u.style.width = "100%";
              S(u);
            }
            setTimeout(() => {
              u.complete && M();
            }), u.addEventListener("error", M), u.addEventListener("load", M);
          })
        )
      );
    }
    f = p.getBoundingClientRect(), x.attr("width", f.width), x.attr("height", f.height);
  }
  return e ? l.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")") : l.attr("transform", "translate(0, " + -f.height / 2 + ")"), t.centerLabel && l.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), l.insert("rect", ":first-child"), { shapeSvg: n, bbox: f, halfPadding: d, label: l };
}, v = (r, t) => {
  const a = t.node().getBBox();
  r.width = a.width, r.height = a.height;
};
function N(r, t, a, i) {
  return r.insert("polygon", ":first-child").attr(
    "points",
    i.map(function(s) {
      return s.x + "," + s.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + a / 2 + ")");
}
function vt(r, t) {
  return r.intersect(t);
}
function st(r, t, a, i) {
  var s = r.x, e = r.y, n = s - i.x, l = e - i.y, c = Math.sqrt(t * t * l * l + a * a * n * n), o = Math.abs(t * a * n / c);
  i.x < s && (o = -o);
  var h = Math.abs(t * a * l / c);
  return i.y < e && (h = -h), { x: s + o, y: e + h };
}
function St(r, t, a) {
  return st(r, t, t, a);
}
function Tt(r, t, a, i) {
  var s, e, n, l, c, o, h, f, d, p, x, m, g, u, S;
  if (s = t.y - r.y, n = r.x - t.x, c = t.x * r.y - r.x * t.y, d = s * a.x + n * a.y + c, p = s * i.x + n * i.y + c, !(d !== 0 && p !== 0 && J(d, p)) && (e = i.y - a.y, l = a.x - i.x, o = i.x * a.y - a.x * i.y, h = e * r.x + l * r.y + o, f = e * t.x + l * t.y + o, !(h !== 0 && f !== 0 && J(h, f)) && (x = s * l - e * n, x !== 0)))
    return m = Math.abs(x / 2), g = n * o - l * c, u = g < 0 ? (g - m) / x : (g + m) / x, g = e * c - s * o, S = g < 0 ? (g - m) / x : (g + m) / x, { x: u, y: S };
}
function J(r, t) {
  return r * t > 0;
}
function Mt(r, t, a) {
  var i = r.x, s = r.y, e = [], n = Number.POSITIVE_INFINITY, l = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(x) {
    n = Math.min(n, x.x), l = Math.min(l, x.y);
  }) : (n = Math.min(n, t.x), l = Math.min(l, t.y));
  for (var c = i - r.width / 2 - n, o = s - r.height / 2 - l, h = 0; h < t.length; h++) {
    var f = t[h], d = t[h < t.length - 1 ? h + 1 : 0], p = Tt(
      r,
      a,
      { x: c + f.x, y: o + f.y },
      { x: c + d.x, y: o + d.y }
    );
    p && e.push(p);
  }
  return e.length ? (e.length > 1 && e.sort(function(x, m) {
    var g = x.x - a.x, u = x.y - a.y, S = Math.sqrt(g * g + u * u), M = m.x - a.x, C = m.y - a.y, O = Math.sqrt(M * M + C * C);
    return S < O ? -1 : S === O ? 0 : 1;
  }), e[0]) : r;
}
const Et = (r, t) => {
  var a = r.x, i = r.y, s = t.x - a, e = t.y - i, n = r.width / 2, l = r.height / 2, c, o;
  return Math.abs(e) * n > Math.abs(s) * l ? (e < 0 && (l = -l), c = e === 0 ? 0 : l * s / e, o = l) : (s < 0 && (n = -n), c = n, o = s === 0 ? 0 : n * e / s), { x: a + c, y: i + o };
}, Bt = Et, w = {
  node: vt,
  circle: St,
  ellipse: st,
  polygon: Mt,
  rect: Bt
}, Ct = async (r, t) => {
  t.useHtmlLabels || b().flowchart.htmlLabels || (t.centerLabel = !0);
  const { shapeSvg: i, bbox: s, halfPadding: e } = await B(
    r,
    t,
    "node " + t.classes,
    !0
  );
  y.info("Classes = ", t.classes);
  const n = i.insert("rect", ":first-child");
  return n.attr("rx", t.rx).attr("ry", t.ry).attr("x", -s.width / 2 - e).attr("y", -s.height / 2 - e).attr("width", s.width + t.padding).attr("height", s.height + t.padding), v(t, n), t.intersect = function(l) {
    return w.rect(t, l);
  }, i;
}, $t = Ct, q = (r) => r ? " " + r : "", _ = (r, t) => `${t || "node default"}${q(r.classes)} ${q(
  r.class
)}`, K = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = s + e, l = [
    { x: n / 2, y: 0 },
    { x: n, y: -n / 2 },
    { x: n / 2, y: -n },
    { x: 0, y: -n / 2 }
  ];
  y.info("Question main (Circle)");
  const c = N(a, n, n, l);
  return c.attr("style", t.style), v(t, c), t.intersect = function(o) {
    return y.warn("Intersect called"), w.polygon(t, l, o);
  }, a;
}, _t = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), i = 28, s = [
    { x: 0, y: i / 2 },
    { x: i / 2, y: 0 },
    { x: 0, y: -i / 2 },
    { x: -i / 2, y: 0 }
  ];
  return a.insert("polygon", ":first-child").attr(
    "points",
    s.map(function(n) {
      return n.x + "," + n.y;
    }).join(" ")
  ).attr("class", "state-start").attr("r", 7).attr("width", 28).attr("height", 28), t.width = 28, t.height = 28, t.intersect = function(n) {
    return w.circle(t, 14, n);
  }, a;
}, Rt = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = 4, e = i.height + t.padding, n = e / s, l = i.width + 2 * n + t.padding, c = [
    { x: n, y: 0 },
    { x: l - n, y: 0 },
    { x: l, y: -e / 2 },
    { x: l - n, y: -e },
    { x: n, y: -e },
    { x: 0, y: -e / 2 }
  ], o = N(a, l, e, c);
  return o.attr("style", t.style), v(t, o), t.intersect = function(h) {
    return w.polygon(t, c, h);
  }, a;
}, It = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: -e / 2, y: 0 },
    { x: s, y: 0 },
    { x: s, y: -e },
    { x: -e / 2, y: -e },
    { x: 0, y: -e / 2 }
  ];
  return N(a, s, e, n).attr("style", t.style), t.width = s + e, t.height = e, t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Ht = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(r, t, _(t), !0), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: -2 * e / 6, y: 0 },
    { x: s - e / 6, y: 0 },
    { x: s + 2 * e / 6, y: -e },
    { x: e / 6, y: -e }
  ], l = N(a, s, e, n);
  return l.attr("style", t.style), v(t, l), t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Nt = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: 2 * e / 6, y: 0 },
    { x: s + e / 6, y: 0 },
    { x: s - 2 * e / 6, y: -e },
    { x: -e / 6, y: -e }
  ], l = N(a, s, e, n);
  return l.attr("style", t.style), v(t, l), t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Xt = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: -2 * e / 6, y: 0 },
    { x: s + 2 * e / 6, y: 0 },
    { x: s - e / 6, y: -e },
    { x: e / 6, y: -e }
  ], l = N(a, s, e, n);
  return l.attr("style", t.style), v(t, l), t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Ot = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: e / 6, y: 0 },
    { x: s - e / 6, y: 0 },
    { x: s + 2 * e / 6, y: -e },
    { x: -2 * e / 6, y: -e }
  ], l = N(a, s, e, n);
  return l.attr("style", t.style), v(t, l), t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Wt = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: 0, y: 0 },
    { x: s + e / 2, y: 0 },
    { x: s, y: -e / 2 },
    { x: s + e / 2, y: -e },
    { x: 0, y: -e }
  ], l = N(a, s, e, n);
  return l.attr("style", t.style), v(t, l), t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Yt = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = s / 2, n = e / (2.5 + s / 50), l = i.height + n + t.padding, c = "M 0," + n + " a " + e + "," + n + " 0,0,0 " + s + " 0 a " + e + "," + n + " 0,0,0 " + -s + " 0 l 0," + l + " a " + e + "," + n + " 0,0,0 " + s + " 0 l 0," + -l, o = a.attr("label-offset-y", n).insert("path", ":first-child").attr("style", t.style).attr("d", c).attr("transform", "translate(" + -s / 2 + "," + -(l / 2 + n) + ")");
  return v(t, o), t.intersect = function(h) {
    const f = w.rect(t, h), d = f.x - t.x;
    if (e != 0 && (Math.abs(d) < t.width / 2 || Math.abs(d) == t.width / 2 && Math.abs(f.y - t.y) > t.height / 2 - n)) {
      let p = n * n * (1 - d * d / (e * e));
      p != 0 && (p = Math.sqrt(p)), p = n - p, h.y - t.y > 0 && (p = -p), f.y += p;
    }
    return f;
  }, a;
}, jt = async (r, t) => {
  const { shapeSvg: a, bbox: i, halfPadding: s } = await B(
    r,
    t,
    "node " + t.classes + " " + t.class,
    !0
  ), e = a.insert("rect", ":first-child"), n = i.width + t.padding, l = i.height + t.padding;
  if (e.attr("class", "basic label-container").attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", -i.width / 2 - s).attr("y", -i.height / 2 - s).attr("width", n).attr("height", l), t.props) {
    const c = new Set(Object.keys(t.props));
    t.props.borders && (it(e, t.props.borders, n, l), c.delete("borders")), c.forEach((o) => {
      y.warn(`Unknown node property ${o}`);
    });
  }
  return v(t, e), t.intersect = function(c) {
    return w.rect(t, c);
  }, a;
}, Dt = async (r, t) => {
  const { shapeSvg: a } = await B(r, t, "label", !0);
  y.trace("Classes = ", t.class);
  const i = a.insert("rect", ":first-child"), s = 0, e = 0;
  if (i.attr("width", s).attr("height", e), a.attr("class", "label edgeLabel"), t.props) {
    const n = new Set(Object.keys(t.props));
    t.props.borders && (it(i, t.props.borders, s, e), n.delete("borders")), n.forEach((l) => {
      y.warn(`Unknown node property ${l}`);
    });
  }
  return v(t, i), t.intersect = function(n) {
    return w.rect(t, n);
  }, a;
};
function it(r, t, a, i) {
  const s = [], e = (l) => {
    s.push(l, 0);
  }, n = (l) => {
    s.push(0, l);
  };
  t.includes("t") ? (y.debug("add top border"), e(a)) : n(a), t.includes("r") ? (y.debug("add right border"), e(i)) : n(i), t.includes("b") ? (y.debug("add bottom border"), e(a)) : n(a), t.includes("l") ? (y.debug("add left border"), e(i)) : n(i), r.attr("stroke-dasharray", s.join(" "));
}
const At = (r, t) => {
  let a;
  t.classes ? a = "node " + t.classes : a = "node default";
  const i = r.insert("g").attr("class", a).attr("id", t.domId || t.id), s = i.insert("rect", ":first-child"), e = i.insert("line"), n = i.insert("g").attr("class", "label"), l = t.labelText.flat ? t.labelText.flat() : t.labelText;
  let c = "";
  typeof l == "object" ? c = l[0] : c = l, y.info("Label text abc79", c, l, typeof l == "object");
  const o = n.node().appendChild(R(c, t.labelStyle, !0, !0));
  let h = { width: 0, height: 0 };
  if (I(b().flowchart.htmlLabels)) {
    const m = o.children[0], g = E(o);
    h = m.getBoundingClientRect(), g.attr("width", h.width), g.attr("height", h.height);
  }
  y.info("Text 2", l);
  const f = l.slice(1, l.length);
  let d = o.getBBox();
  const p = n.node().appendChild(
    R(f.join ? f.join("<br/>") : f, t.labelStyle, !0, !0)
  );
  if (I(b().flowchart.htmlLabels)) {
    const m = p.children[0], g = E(p);
    h = m.getBoundingClientRect(), g.attr("width", h.width), g.attr("height", h.height);
  }
  const x = t.padding / 2;
  return E(p).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (h.width > d.width ? 0 : (d.width - h.width) / 2) + ", " + (d.height + x + 5) + ")"
  ), E(o).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (h.width < d.width ? 0 : -(d.width - h.width) / 2) + ", 0)"
  ), h = n.node().getBBox(), n.attr(
    "transform",
    "translate(" + -h.width / 2 + ", " + (-h.height / 2 - x + 3) + ")"
  ), s.attr("class", "outer title-state").attr("x", -h.width / 2 - x).attr("y", -h.height / 2 - x).attr("width", h.width + t.padding).attr("height", h.height + t.padding), e.attr("class", "divider").attr("x1", -h.width / 2 - x).attr("x2", h.width / 2 + x).attr("y1", -h.height / 2 - x + d.height + x).attr("y2", -h.height / 2 - x + d.height + x), v(t, s), t.intersect = function(m) {
    return w.rect(t, m);
  }, i;
}, Ut = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.height + t.padding, e = i.width + s / 4 + t.padding, n = a.insert("rect", ":first-child").attr("style", t.style).attr("rx", s / 2).attr("ry", s / 2).attr("x", -e / 2).attr("y", -s / 2).attr("width", e).attr("height", s);
  return v(t, n), t.intersect = function(l) {
    return w.rect(t, l);
  }, a;
}, zt = async (r, t) => {
  const { shapeSvg: a, bbox: i, halfPadding: s } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), e = a.insert("circle", ":first-child");
  return e.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", i.width / 2 + s).attr("width", i.width + t.padding).attr("height", i.height + t.padding), y.info("Circle main"), v(t, e), t.intersect = function(n) {
    return y.info("Circle intersect", t, i.width / 2 + s, n), w.circle(t, i.width / 2 + s, n);
  }, a;
}, Zt = async (r, t) => {
  const { shapeSvg: a, bbox: i, halfPadding: s } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), e = 5, n = a.insert("g", ":first-child"), l = n.insert("circle"), c = n.insert("circle");
  return n.attr("class", t.class), l.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", i.width / 2 + s + e).attr("width", i.width + t.padding + e * 2).attr("height", i.height + t.padding + e * 2), c.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", i.width / 2 + s).attr("width", i.width + t.padding).attr("height", i.height + t.padding), y.info("DoubleCircle main"), v(t, l), t.intersect = function(o) {
    return y.info("DoubleCircle intersect", t, i.width / 2 + s + e, o), w.circle(t, i.width / 2 + s + e, o);
  }, a;
}, Gt = async (r, t) => {
  const { shapeSvg: a, bbox: i } = await B(
    r,
    t,
    _(t, void 0),
    !0
  ), s = i.width + t.padding, e = i.height + t.padding, n = [
    { x: 0, y: 0 },
    { x: s, y: 0 },
    { x: s, y: -e },
    { x: 0, y: -e },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: s + 8, y: 0 },
    { x: s + 8, y: -e },
    { x: -8, y: -e },
    { x: -8, y: 0 }
  ], l = N(a, s, e, n);
  return l.attr("style", t.style), v(t, l), t.intersect = function(c) {
    return w.polygon(t, n, c);
  }, a;
}, Ft = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), i = a.insert("circle", ":first-child");
  return i.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), v(t, i), t.intersect = function(s) {
    return w.circle(t, 7, s);
  }, a;
}, P = (r, t, a) => {
  const i = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id);
  let s = 70, e = 10;
  a === "LR" && (s = 10, e = 70);
  const n = i.append("rect").attr("x", -1 * s / 2).attr("y", -1 * e / 2).attr("width", s).attr("height", e).attr("class", "fork-join");
  return v(t, n), t.height = t.height + t.padding / 2, t.width = t.width + t.padding / 2, t.intersect = function(l) {
    return w.rect(t, l);
  }, i;
}, Qt = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), i = a.insert("circle", ":first-child"), s = a.insert("circle", ":first-child");
  return s.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), i.attr("class", "state-end").attr("r", 5).attr("width", 10).attr("height", 10), v(t, s), t.intersect = function(e) {
    return w.circle(t, 7, e);
  }, a;
}, Vt = (r, t) => {
  const a = t.padding / 2, i = 4, s = 8;
  let e;
  t.classes ? e = "node " + t.classes : e = "node default";
  const n = r.insert("g").attr("class", e).attr("id", t.domId || t.id), l = n.insert("rect", ":first-child"), c = n.insert("line"), o = n.insert("line");
  let h = 0, f = i;
  const d = n.insert("g").attr("class", "label");
  let p = 0;
  const x = t.classData.annotations && t.classData.annotations[0], m = t.classData.annotations[0] ? "«" + t.classData.annotations[0] + "»" : "", g = d.node().appendChild(R(m, t.labelStyle, !0, !0));
  let u = g.getBBox();
  if (I(b().flowchart.htmlLabels)) {
    const k = g.children[0], L = E(g);
    u = k.getBoundingClientRect(), L.attr("width", u.width), L.attr("height", u.height);
  }
  t.classData.annotations[0] && (f += u.height + i, h += u.width);
  let S = t.classData.label;
  t.classData.type !== void 0 && t.classData.type !== "" && (b().flowchart.htmlLabels ? S += "&lt;" + t.classData.type + "&gt;" : S += "<" + t.classData.type + ">");
  const M = d.node().appendChild(R(S, t.labelStyle, !0, !0));
  E(M).attr("class", "classTitle");
  let C = M.getBBox();
  if (I(b().flowchart.htmlLabels)) {
    const k = M.children[0], L = E(M);
    C = k.getBoundingClientRect(), L.attr("width", C.width), L.attr("height", C.height);
  }
  f += C.height + i, C.width > h && (h = C.width);
  const O = [];
  t.classData.members.forEach((k) => {
    const L = k.getDisplayDetails();
    let W = L.displayText;
    b().flowchart.htmlLabels && (W = W.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const H = d.node().appendChild(
      R(
        W,
        L.cssStyle ? L.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let $ = H.getBBox();
    if (I(b().flowchart.htmlLabels)) {
      const F = H.children[0], D = E(H);
      $ = F.getBoundingClientRect(), D.attr("width", $.width), D.attr("height", $.height);
    }
    $.width > h && (h = $.width), f += $.height + i, O.push(H);
  }), f += s;
  const j = [];
  if (t.classData.methods.forEach((k) => {
    const L = k.getDisplayDetails();
    let W = L.displayText;
    b().flowchart.htmlLabels && (W = W.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const H = d.node().appendChild(
      R(
        W,
        L.cssStyle ? L.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let $ = H.getBBox();
    if (I(b().flowchart.htmlLabels)) {
      const F = H.children[0], D = E(H);
      $ = F.getBoundingClientRect(), D.attr("width", $.width), D.attr("height", $.height);
    }
    $.width > h && (h = $.width), f += $.height + i, j.push(H);
  }), f += s, x) {
    let k = (h - u.width) / 2;
    E(g).attr(
      "transform",
      "translate( " + (-1 * h / 2 + k) + ", " + -1 * f / 2 + ")"
    ), p = u.height + i;
  }
  let nt = (h - C.width) / 2;
  return E(M).attr(
    "transform",
    "translate( " + (-1 * h / 2 + nt) + ", " + (-1 * f / 2 + p) + ")"
  ), p += C.height + i, c.attr("class", "divider").attr("x1", -h / 2 - a).attr("x2", h / 2 + a).attr("y1", -f / 2 - a + s + p).attr("y2", -f / 2 - a + s + p), p += s, O.forEach((k) => {
    E(k).attr(
      "transform",
      "translate( " + -h / 2 + ", " + (-1 * f / 2 + p + s / 2) + ")"
    );
    const L = k == null ? void 0 : k.getBBox();
    p += ((L == null ? void 0 : L.height) ?? 0) + i;
  }), p += s, o.attr("class", "divider").attr("x1", -h / 2 - a).attr("x2", h / 2 + a).attr("y1", -f / 2 - a + s + p).attr("y2", -f / 2 - a + s + p), p += s, j.forEach((k) => {
    E(k).attr(
      "transform",
      "translate( " + -h / 2 + ", " + (-1 * f / 2 + p) + ")"
    );
    const L = k == null ? void 0 : k.getBBox();
    p += ((L == null ? void 0 : L.height) ?? 0) + i;
  }), l.attr("style", t.style).attr("class", "outer title-state").attr("x", -h / 2 - a).attr("y", -(f / 2) - a).attr("width", h + t.padding).attr("height", f + t.padding), v(t, l), t.intersect = function(k) {
    return w.rect(t, k);
  }, n;
}, tt = {
  rhombus: K,
  question: K,
  rect: jt,
  labelRect: Dt,
  rectWithTitle: At,
  choice: _t,
  circle: zt,
  doublecircle: Zt,
  stadium: Ut,
  hexagon: Rt,
  rect_left_inv_arrow: It,
  lean_right: Ht,
  lean_left: Nt,
  trapezoid: Xt,
  inv_trapezoid: Ot,
  rect_right_inv_arrow: Wt,
  cylinder: Yt,
  start: Ft,
  end: Qt,
  note: $t,
  subroutine: Gt,
  fork: P,
  join: P,
  class_box: Vt
};
let Y = {};
const nr = async (r, t, a) => {
  let i, s;
  if (t.link) {
    let e;
    b().securityLevel === "sandbox" ? e = "_top" : t.linkTarget && (e = t.linkTarget || "_blank"), i = r.insert("svg:a").attr("xlink:href", t.link).attr("target", e), s = await tt[t.shape](i, t, a);
  } else
    s = await tt[t.shape](r, t, a), i = s;
  return t.tooltip && s.attr("title", t.tooltip), t.class && s.attr("class", "node default " + t.class), Y[t.id] = i, t.haveCallback && Y[t.id].attr("class", Y[t.id].attr("class") + " clickable"), i;
}, lr = (r, t) => {
  Y[t.id] = r;
}, cr = () => {
  Y = {};
}, hr = (r) => {
  const t = Y[r.id];
  y.trace(
    "Transforming node",
    r.diff,
    r,
    "translate(" + (r.x - r.width / 2 - 5) + ", " + r.width / 2 + ")"
  );
  const a = 8, i = r.diff || 0;
  return r.clusterNode ? t.attr(
    "transform",
    "translate(" + (r.x + i - r.width / 2) + ", " + (r.y - r.height / 2 - a) + ")"
  ) : t.attr("transform", "translate(" + r.x + ", " + r.y + ")"), i;
}, Jt = ({
  flowchart: r
}) => {
  var s, e;
  const t = ((s = r == null ? void 0 : r.subGraphTitleMargin) == null ? void 0 : s.top) ?? 0, a = ((e = r == null ? void 0 : r.subGraphTitleMargin) == null ? void 0 : e.bottom) ?? 0, i = t + a;
  return {
    subGraphTitleTopMargin: t,
    subGraphTitleBottomMargin: a,
    subGraphTitleTotalMargin: i
  };
}, X = {
  aggregation: 18,
  extension: 18,
  composition: 18,
  dependency: 6,
  lollipop: 13.5,
  arrow_point: 5.3
};
function U(r, t) {
  if (r === void 0 || t === void 0)
    return { angle: 0, deltaX: 0, deltaY: 0 };
  r = Z(r), t = Z(t);
  const [a, i] = [r.x, r.y], [s, e] = [t.x, t.y], n = s - a, l = e - i;
  return { angle: Math.atan(l / n), deltaX: n, deltaY: l };
}
const Z = (r) => Array.isArray(r) ? { x: r[0], y: r[1] } : r, qt = (r) => ({
  x: function(t, a, i) {
    let s = 0;
    if (a === 0 && Object.hasOwn(X, r.arrowTypeStart)) {
      const { angle: e, deltaX: n } = U(i[0], i[1]);
      s = X[r.arrowTypeStart] * Math.cos(e) * (n >= 0 ? 1 : -1);
    } else if (a === i.length - 1 && Object.hasOwn(X, r.arrowTypeEnd)) {
      const { angle: e, deltaX: n } = U(
        i[i.length - 1],
        i[i.length - 2]
      );
      s = X[r.arrowTypeEnd] * Math.cos(e) * (n >= 0 ? 1 : -1);
    }
    return Z(t).x + s;
  },
  y: function(t, a, i) {
    let s = 0;
    if (a === 0 && Object.hasOwn(X, r.arrowTypeStart)) {
      const { angle: e, deltaY: n } = U(i[0], i[1]);
      s = X[r.arrowTypeStart] * Math.abs(Math.sin(e)) * (n >= 0 ? 1 : -1);
    } else if (a === i.length - 1 && Object.hasOwn(X, r.arrowTypeEnd)) {
      const { angle: e, deltaY: n } = U(
        i[i.length - 1],
        i[i.length - 2]
      );
      s = X[r.arrowTypeEnd] * Math.abs(Math.sin(e)) * (n >= 0 ? 1 : -1);
    }
    return Z(t).y + s;
  }
}), Kt = (r, t, a, i, s) => {
  t.arrowTypeStart && rt(r, "start", t.arrowTypeStart, a, i, s), t.arrowTypeEnd && rt(r, "end", t.arrowTypeEnd, a, i, s);
}, Pt = {
  arrow_cross: "cross",
  arrow_point: "point",
  arrow_barb: "barb",
  arrow_circle: "circle",
  aggregation: "aggregation",
  extension: "extension",
  composition: "composition",
  dependency: "dependency",
  lollipop: "lollipop"
}, rt = (r, t, a, i, s, e) => {
  const n = Pt[a];
  if (!n) {
    y.warn(`Unknown arrow type: ${a}`);
    return;
  }
  const l = t === "start" ? "Start" : "End";
  r.attr(`marker-${t}`, `url(${i}#${s}_${e}-${n}${l})`);
};
let G = {}, T = {};
const or = () => {
  G = {}, T = {};
}, fr = (r, t) => {
  const a = I(b().flowchart.htmlLabels), i = t.labelType === "markdown" ? et(r, t.label, {
    style: t.labelStyle,
    useHtmlLabels: a,
    addSvgBackground: !0
  }) : R(t.label, t.labelStyle);
  y.info("abc82", t, t.labelType);
  const s = r.insert("g").attr("class", "edgeLabel"), e = s.insert("g").attr("class", "label");
  e.node().appendChild(i);
  let n = i.getBBox();
  if (a) {
    const c = i.children[0], o = E(i);
    n = c.getBoundingClientRect(), o.attr("width", n.width), o.attr("height", n.height);
  }
  e.attr("transform", "translate(" + -n.width / 2 + ", " + -n.height / 2 + ")"), G[t.id] = s, t.width = n.width, t.height = n.height;
  let l;
  if (t.startLabelLeft) {
    const c = R(t.startLabelLeft, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), T[t.id] || (T[t.id] = {}), T[t.id].startLeft = o, z(l, t.startLabelLeft);
  }
  if (t.startLabelRight) {
    const c = R(t.startLabelRight, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = o.node().appendChild(c), h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), T[t.id] || (T[t.id] = {}), T[t.id].startRight = o, z(l, t.startLabelRight);
  }
  if (t.endLabelLeft) {
    const c = R(t.endLabelLeft, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), o.node().appendChild(c), T[t.id] || (T[t.id] = {}), T[t.id].endLeft = o, z(l, t.endLabelLeft);
  }
  if (t.endLabelRight) {
    const c = R(t.endLabelRight, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), o.node().appendChild(c), T[t.id] || (T[t.id] = {}), T[t.id].endRight = o, z(l, t.endLabelRight);
  }
  return i;
};
function z(r, t) {
  b().flowchart.htmlLabels && r && (r.style.width = t.length * 9 + "px", r.style.height = "12px");
}
const pr = (r, t) => {
  y.info("Moving label abc78 ", r.id, r.label, G[r.id]);
  let a = t.updatedPath ? t.updatedPath : t.originalPath;
  const i = b(), { subGraphTitleTotalMargin: s } = Jt(i);
  if (r.label) {
    const e = G[r.id];
    let n = r.x, l = r.y;
    if (a) {
      const c = A.calcLabelPosition(a);
      y.info(
        "Moving label " + r.label + " from (",
        n,
        ",",
        l,
        ") to (",
        c.x,
        ",",
        c.y,
        ") abc78"
      ), t.updatedPath && (n = c.x, l = c.y);
    }
    e.attr("transform", `translate(${n}, ${l + s / 2})`);
  }
  if (r.startLabelLeft) {
    const e = T[r.id].startLeft;
    let n = r.x, l = r.y;
    if (a) {
      const c = A.calcTerminalLabelPosition(r.arrowTypeStart ? 10 : 0, "start_left", a);
      n = c.x, l = c.y;
    }
    e.attr("transform", `translate(${n}, ${l})`);
  }
  if (r.startLabelRight) {
    const e = T[r.id].startRight;
    let n = r.x, l = r.y;
    if (a) {
      const c = A.calcTerminalLabelPosition(
        r.arrowTypeStart ? 10 : 0,
        "start_right",
        a
      );
      n = c.x, l = c.y;
    }
    e.attr("transform", `translate(${n}, ${l})`);
  }
  if (r.endLabelLeft) {
    const e = T[r.id].endLeft;
    let n = r.x, l = r.y;
    if (a) {
      const c = A.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_left", a);
      n = c.x, l = c.y;
    }
    e.attr("transform", `translate(${n}, ${l})`);
  }
  if (r.endLabelRight) {
    const e = T[r.id].endRight;
    let n = r.x, l = r.y;
    if (a) {
      const c = A.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_right", a);
      n = c.x, l = c.y;
    }
    e.attr("transform", `translate(${n}, ${l})`);
  }
}, tr = (r, t) => {
  const a = r.x, i = r.y, s = Math.abs(t.x - a), e = Math.abs(t.y - i), n = r.width / 2, l = r.height / 2;
  return s >= n || e >= l;
}, rr = (r, t, a) => {
  y.warn(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(a)}
  node        : x:${r.x} y:${r.y} w:${r.width} h:${r.height}`);
  const i = r.x, s = r.y, e = Math.abs(i - a.x), n = r.width / 2;
  let l = a.x < t.x ? n - e : n + e;
  const c = r.height / 2, o = Math.abs(t.y - a.y), h = Math.abs(t.x - a.x);
  if (Math.abs(s - t.y) * n > Math.abs(i - t.x) * c) {
    let f = a.y < t.y ? t.y - c - s : s - c - t.y;
    l = h * f / o;
    const d = {
      x: a.x < t.x ? a.x + l : a.x - h + l,
      y: a.y < t.y ? a.y + o - f : a.y - o + f
    };
    return l === 0 && (d.x = t.x, d.y = t.y), h === 0 && (d.x = t.x), o === 0 && (d.y = t.y), y.warn(`abc89 topp/bott calc, Q ${o}, q ${f}, R ${h}, r ${l}`, d), d;
  } else {
    a.x < t.x ? l = t.x - n - i : l = i - n - t.x;
    let f = o * l / h, d = a.x < t.x ? a.x + h - l : a.x - h + l, p = a.y < t.y ? a.y + f : a.y - f;
    return y.warn(`sides calc abc89, Q ${o}, q ${f}, R ${h}, r ${l}`, { _x: d, _y: p }), l === 0 && (d = t.x, p = t.y), h === 0 && (d = t.x), o === 0 && (p = t.y), { x: d, y: p };
  }
}, at = (r, t) => {
  y.warn("abc88 cutPathAtIntersect", r, t);
  let a = [], i = r[0], s = !1;
  return r.forEach((e) => {
    if (y.info("abc88 checking point", e, t), !tr(t, e) && !s) {
      const n = rr(t, i, e);
      y.warn("abc88 inside", e, i, n), y.warn("abc88 intersection", n);
      let l = !1;
      a.forEach((c) => {
        l = l || c.x === n.x && c.y === n.y;
      }), a.some((c) => c.x === n.x && c.y === n.y) ? y.warn("abc88 no intersect", n, a) : a.push(n), s = !0;
    } else
      y.warn("abc88 outside", e, i), i = e, s || a.push(e);
  }), y.warn("abc88 returning points", a), a;
}, dr = function(r, t, a, i, s, e, n) {
  let l = a.points, c = !1;
  const o = e.node(t.v);
  var h = e.node(t.w);
  y.info("abc88 InsertEdge: ", a), h.intersect && o.intersect && (l = l.slice(1, a.points.length - 1), l.unshift(o.intersect(l[0])), y.info(
    "Last point",
    l[l.length - 1],
    h,
    h.intersect(l[l.length - 1])
  ), l.push(h.intersect(l[l.length - 1]))), a.toCluster && (y.info("to cluster abc88", i[a.toCluster]), l = at(a.points, i[a.toCluster].node), c = !0), a.fromCluster && (y.info("from cluster abc88", i[a.fromCluster]), l = at(l.reverse(), i[a.fromCluster].node).reverse(), c = !0);
  const f = l.filter((C) => !Number.isNaN(C.y));
  let d = lt;
  a.curve && (s === "graph" || s === "flowchart") && (d = a.curve);
  const { x: p, y: x } = qt(a), m = ct().x(p).y(x).curve(d);
  let g;
  switch (a.thickness) {
    case "normal":
      g = "edge-thickness-normal";
      break;
    case "thick":
      g = "edge-thickness-thick";
      break;
    case "invisible":
      g = "edge-thickness-thick";
      break;
    default:
      g = "";
  }
  switch (a.pattern) {
    case "solid":
      g += " edge-pattern-solid";
      break;
    case "dotted":
      g += " edge-pattern-dotted";
      break;
    case "dashed":
      g += " edge-pattern-dashed";
      break;
  }
  const u = r.append("path").attr("d", m(f)).attr("id", a.id).attr("class", " " + g + (a.classes ? " " + a.classes : "")).attr("style", a.style);
  let S = "";
  (b().flowchart.arrowMarkerAbsolute || b().state.arrowMarkerAbsolute) && (S = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, S = S.replace(/\(/g, "\\("), S = S.replace(/\)/g, "\\)")), y.info("arrowTypeStart", a.arrowTypeStart), y.info("arrowTypeEnd", a.arrowTypeEnd), Kt(u, a, S, n, s);
  let M = {};
  return c && (M.updatedPath = l), M.originalPath = a.points, M;
};
export {
  ir as a,
  cr as b,
  R as c,
  or as d,
  nr as e,
  fr as f,
  Jt as g,
  dr as h,
  Bt as i,
  pr as j,
  qt as k,
  B as l,
  Kt as m,
  hr as p,
  lr as s,
  v as u
};
