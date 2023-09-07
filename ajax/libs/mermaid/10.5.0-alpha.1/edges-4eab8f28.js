import { l as x, p as $, c as m, aR as Q, j as C, d as V, z as A, F as st } from "./mermaid-2aa9f9d3.js";
import { c as rt } from "./createText-4209acc9.js";
import { l as it } from "./line-f7faaa1a.js";
const nt = (r, t, a, n) => {
  t.forEach((e) => {
    gt[e](r, a, n);
  });
}, lt = (r, t, a) => {
  x.trace("Making markers for ", a), r.append("defs").append("marker").attr("id", t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), r.append("defs").append("marker").attr("id", t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, ct = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, ht = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, ot = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), r.append("defs").append("marker").attr("id", t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, ft = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), r.append("defs").append("marker").attr("id", t + "-lollipopEnd").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
}, pt = (r, t) => {
  r.append("marker").attr("id", t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 6).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 0).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, dt = (r, t) => {
  r.append("marker").attr("id", t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, yt = (r, t) => {
  r.append("marker").attr("id", t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), r.append("marker").attr("id", t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, ut = (r, t) => {
  r.append("defs").append("marker").attr("id", t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "strokeWidth").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, gt = {
  extension: lt,
  composition: ct,
  aggregation: ht,
  dependency: ot,
  lollipop: ft,
  point: pt,
  circle: dt,
  cross: yt,
  barb: ut
}, Gt = nt;
function xt(r, t) {
  t && r.attr("style", t);
}
function bt(r) {
  const t = C(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")), a = t.append("xhtml:div"), n = r.label, e = r.isNode ? "nodeLabel" : "edgeLabel";
  return a.html(
    '<span class="' + e + '" ' + (r.labelStyle ? 'style="' + r.labelStyle + '"' : "") + ">" + n + "</span>"
  ), xt(a, r.labelStyle), a.style("display", "inline-block"), a.style("white-space", "nowrap"), a.attr("xmlns", "http://www.w3.org/1999/xhtml"), t.node();
}
const wt = (r, t, a, n) => {
  let e = r || "";
  if (typeof e == "object" && (e = e[0]), $(m().flowchart.htmlLabels)) {
    e = e.replace(/\\n|\n/g, "<br />"), x.info("vertexText" + e);
    const i = {
      isNode: n,
      label: Q(e).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (l) => `<i class='${l.replace(":", " ")}'></i>`
      ),
      labelStyle: t.replace("fill:", "color:")
    };
    return bt(i);
  } else {
    const i = document.createElementNS("http://www.w3.org/2000/svg", "text");
    i.setAttribute("style", t.replace("color:", "fill:"));
    let s = [];
    typeof e == "string" ? s = e.split(/\\n|\n|<br\s*\/?>/gi) : Array.isArray(e) ? s = e : s = [];
    for (const l of s) {
      const c = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      c.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), c.setAttribute("dy", "1em"), c.setAttribute("x", "0"), a ? c.setAttribute("class", "title-row") : c.setAttribute("class", "row"), c.textContent = l.trim(), i.appendChild(c);
    }
    return i;
  }
}, N = wt, T = async (r, t, a, n) => {
  let e;
  const i = t.useHtmlLabels || $(m().flowchart.htmlLabels);
  a ? e = a : e = "node default";
  const s = r.insert("g").attr("class", e).attr("id", t.domId || t.id), l = s.insert("g").attr("class", "label").attr("style", t.labelStyle);
  let c;
  t.labelText === void 0 ? c = "" : c = typeof t.labelText == "string" ? t.labelText : t.labelText[0];
  const o = l.node();
  let h;
  t.labelType === "markdown" ? h = rt(l, V(Q(c), m()), {
    useHtmlLabels: i,
    width: t.width || m().flowchart.wrappingWidth,
    classes: "markdown-node-label"
  }) : h = o.appendChild(
    N(
      V(Q(c), m()),
      t.labelStyle,
      !1,
      n
    )
  );
  let f = h.getBBox();
  const d = t.padding / 2;
  if ($(m().flowchart.htmlLabels)) {
    const y = h.children[0], u = C(h), g = y.getElementsByTagName("img");
    if (g) {
      const p = c.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...g].map(
          (w) => new Promise((M) => {
            function E() {
              if (w.style.display = "flex", w.style.flexDirection = "column", p) {
                const b = m().fontSize ? m().fontSize : window.getComputedStyle(document.body).fontSize, R = 5;
                w.style.width = parseInt(b, 10) * R + "px";
              } else
                w.style.width = "100%";
              M(w);
            }
            setTimeout(() => {
              w.complete && E();
            }), w.addEventListener("error", E), w.addEventListener("load", E);
          })
        )
      );
    }
    f = y.getBoundingClientRect(), u.attr("width", f.width), u.attr("height", f.height);
  }
  return i ? l.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")") : l.attr("transform", "translate(0, " + -f.height / 2 + ")"), t.centerLabel && l.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), l.insert("rect", ":first-child"), { shapeSvg: s, bbox: f, halfPadding: d, label: l };
}, S = (r, t) => {
  const a = t.node().getBBox();
  r.width = a.width, r.height = a.height;
};
function Y(r, t, a, n) {
  return r.insert("polygon", ":first-child").attr(
    "points",
    n.map(function(e) {
      return e.x + "," + e.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + a / 2 + ")");
}
function mt(r, t) {
  return r.intersect(t);
}
function at(r, t, a, n) {
  var e = r.x, i = r.y, s = e - n.x, l = i - n.y, c = Math.sqrt(t * t * l * l + a * a * s * s), o = Math.abs(t * a * s / c);
  n.x < e && (o = -o);
  var h = Math.abs(t * a * l / c);
  return n.y < i && (h = -h), { x: e + o, y: i + h };
}
function kt(r, t, a) {
  return at(r, t, t, a);
}
function Lt(r, t, a, n) {
  var e, i, s, l, c, o, h, f, d, y, u, g, p, w, M;
  if (e = t.y - r.y, s = r.x - t.x, c = t.x * r.y - r.x * t.y, d = e * a.x + s * a.y + c, y = e * n.x + s * n.y + c, !(d !== 0 && y !== 0 && J(d, y)) && (i = n.y - a.y, l = a.x - n.x, o = n.x * a.y - a.x * n.y, h = i * r.x + l * r.y + o, f = i * t.x + l * t.y + o, !(h !== 0 && f !== 0 && J(h, f)) && (u = e * l - i * s, u !== 0)))
    return g = Math.abs(u / 2), p = s * o - l * c, w = p < 0 ? (p - g) / u : (p + g) / u, p = i * c - e * o, M = p < 0 ? (p - g) / u : (p + g) / u, { x: w, y: M };
}
function J(r, t) {
  return r * t > 0;
}
function vt(r, t, a) {
  var n = r.x, e = r.y, i = [], s = Number.POSITIVE_INFINITY, l = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(u) {
    s = Math.min(s, u.x), l = Math.min(l, u.y);
  }) : (s = Math.min(s, t.x), l = Math.min(l, t.y));
  for (var c = n - r.width / 2 - s, o = e - r.height / 2 - l, h = 0; h < t.length; h++) {
    var f = t[h], d = t[h < t.length - 1 ? h + 1 : 0], y = Lt(
      r,
      a,
      { x: c + f.x, y: o + f.y },
      { x: c + d.x, y: o + d.y }
    );
    y && i.push(y);
  }
  return i.length ? (i.length > 1 && i.sort(function(u, g) {
    var p = u.x - a.x, w = u.y - a.y, M = Math.sqrt(p * p + w * w), E = g.x - a.x, b = g.y - a.y, R = Math.sqrt(E * E + b * b);
    return M < R ? -1 : M === R ? 0 : 1;
  }), i[0]) : r;
}
const St = (r, t) => {
  var a = r.x, n = r.y, e = t.x - a, i = t.y - n, s = r.width / 2, l = r.height / 2, c, o;
  return Math.abs(i) * s > Math.abs(e) * l ? (i < 0 && (l = -l), c = i === 0 ? 0 : l * e / i, o = l) : (e < 0 && (s = -s), c = s, o = e === 0 ? 0 : s * i / e), { x: a + c, y: n + o };
}, Et = St, k = {
  node: mt,
  circle: kt,
  ellipse: at,
  polygon: vt,
  rect: Et
}, Mt = async (r, t) => {
  t.useHtmlLabels || m().flowchart.htmlLabels || (t.centerLabel = !0);
  const { shapeSvg: n, bbox: e, halfPadding: i } = await T(
    r,
    t,
    "node " + t.classes,
    !0
  );
  x.info("Classes = ", t.classes);
  const s = n.insert("rect", ":first-child");
  return s.attr("rx", t.rx).attr("ry", t.ry).attr("x", -e.width / 2 - i).attr("y", -e.height / 2 - i).attr("width", e.width + t.padding).attr("height", e.height + t.padding), S(t, s), t.intersect = function(l) {
    return k.rect(t, l);
  }, n;
}, Bt = Mt, q = (r) => r ? " " + r : "", H = (r, t) => `${t || "node default"}${q(r.classes)} ${q(
  r.class
)}`, K = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = e + i, l = [
    { x: s / 2, y: 0 },
    { x: s, y: -s / 2 },
    { x: s / 2, y: -s },
    { x: 0, y: -s / 2 }
  ];
  x.info("Question main (Circle)");
  const c = Y(a, s, s, l);
  return c.attr("style", t.style), S(t, c), t.intersect = function(o) {
    return x.warn("Intersect called"), k.polygon(t, l, o);
  }, a;
}, Ct = (r, t) => {
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
    return k.circle(t, 14, s);
  }, a;
}, Tt = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = 4, i = n.height + t.padding, s = i / e, l = n.width + 2 * s + t.padding, c = [
    { x: s, y: 0 },
    { x: l - s, y: 0 },
    { x: l, y: -i / 2 },
    { x: l - s, y: -i },
    { x: s, y: -i },
    { x: 0, y: -i / 2 }
  ], o = Y(a, l, i, c);
  return o.attr("style", t.style), S(t, o), t.intersect = function(h) {
    return k.polygon(t, c, h);
  }, a;
}, Rt = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: -i / 2, y: 0 },
    { x: e, y: 0 },
    { x: e, y: -i },
    { x: -i / 2, y: -i },
    { x: 0, y: -i / 2 }
  ];
  return Y(a, e, i, s).attr("style", t.style), t.width = e + i, t.height = i, t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, It = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(r, t, H(t), !0), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: -2 * i / 6, y: 0 },
    { x: e - i / 6, y: 0 },
    { x: e + 2 * i / 6, y: -i },
    { x: i / 6, y: -i }
  ], l = Y(a, e, i, s);
  return l.attr("style", t.style), S(t, l), t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, Ht = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: 2 * i / 6, y: 0 },
    { x: e + i / 6, y: 0 },
    { x: e - 2 * i / 6, y: -i },
    { x: -i / 6, y: -i }
  ], l = Y(a, e, i, s);
  return l.attr("style", t.style), S(t, l), t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, Nt = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: -2 * i / 6, y: 0 },
    { x: e + 2 * i / 6, y: 0 },
    { x: e - i / 6, y: -i },
    { x: i / 6, y: -i }
  ], l = Y(a, e, i, s);
  return l.attr("style", t.style), S(t, l), t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, _t = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: i / 6, y: 0 },
    { x: e - i / 6, y: 0 },
    { x: e + 2 * i / 6, y: -i },
    { x: -2 * i / 6, y: -i }
  ], l = Y(a, e, i, s);
  return l.attr("style", t.style), S(t, l), t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, $t = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = [
    { x: 0, y: 0 },
    { x: e + i / 2, y: 0 },
    { x: e, y: -i / 2 },
    { x: e + i / 2, y: -i },
    { x: 0, y: -i }
  ], l = Y(a, e, i, s);
  return l.attr("style", t.style), S(t, l), t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, Xt = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = e / 2, s = i / (2.5 + e / 50), l = n.height + s + t.padding, c = "M 0," + s + " a " + i + "," + s + " 0,0,0 " + e + " 0 a " + i + "," + s + " 0,0,0 " + -e + " 0 l 0," + l + " a " + i + "," + s + " 0,0,0 " + e + " 0 l 0," + -l, o = a.attr("label-offset-y", s).insert("path", ":first-child").attr("style", t.style).attr("d", c).attr("transform", "translate(" + -e / 2 + "," + -(l / 2 + s) + ")");
  return S(t, o), t.intersect = function(h) {
    const f = k.rect(t, h), d = f.x - t.x;
    if (i != 0 && (Math.abs(d) < t.width / 2 || Math.abs(d) == t.width / 2 && Math.abs(f.y - t.y) > t.height / 2 - s)) {
      let y = s * s * (1 - d * d / (i * i));
      y != 0 && (y = Math.sqrt(y)), y = s - y, h.y - t.y > 0 && (y = -y), f.y += y;
    }
    return f;
  }, a;
}, Ot = async (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = await T(
    r,
    t,
    "node " + t.classes + " " + t.class,
    !0
  ), i = a.insert("rect", ":first-child"), s = n.width + t.padding, l = n.height + t.padding;
  if (i.attr("class", "basic label-container").attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", -n.width / 2 - e).attr("y", -n.height / 2 - e).attr("width", s).attr("height", l), t.props) {
    const c = new Set(Object.keys(t.props));
    t.props.borders && (et(i, t.props.borders, s, l), c.delete("borders")), c.forEach((o) => {
      x.warn(`Unknown node property ${o}`);
    });
  }
  return S(t, i), t.intersect = function(c) {
    return k.rect(t, c);
  }, a;
}, Yt = async (r, t) => {
  const { shapeSvg: a } = await T(r, t, "label", !0);
  x.trace("Classes = ", t.class);
  const n = a.insert("rect", ":first-child"), e = 0, i = 0;
  if (n.attr("width", e).attr("height", i), a.attr("class", "label edgeLabel"), t.props) {
    const s = new Set(Object.keys(t.props));
    t.props.borders && (et(n, t.props.borders, e, i), s.delete("borders")), s.forEach((l) => {
      x.warn(`Unknown node property ${l}`);
    });
  }
  return S(t, n), t.intersect = function(s) {
    return k.rect(t, s);
  }, a;
};
function et(r, t, a, n) {
  const e = [], i = (l) => {
    e.push(l, 0);
  }, s = (l) => {
    e.push(0, l);
  };
  t.includes("t") ? (x.debug("add top border"), i(a)) : s(a), t.includes("r") ? (x.debug("add right border"), i(n)) : s(n), t.includes("b") ? (x.debug("add bottom border"), i(a)) : s(a), t.includes("l") ? (x.debug("add left border"), i(n)) : s(n), r.attr("stroke-dasharray", e.join(" "));
}
const Wt = (r, t) => {
  let a;
  t.classes ? a = "node " + t.classes : a = "node default";
  const n = r.insert("g").attr("class", a).attr("id", t.domId || t.id), e = n.insert("rect", ":first-child"), i = n.insert("line"), s = n.insert("g").attr("class", "label"), l = t.labelText.flat ? t.labelText.flat() : t.labelText;
  let c = "";
  typeof l == "object" ? c = l[0] : c = l, x.info("Label text abc79", c, l, typeof l == "object");
  const o = s.node().appendChild(N(c, t.labelStyle, !0, !0));
  let h = { width: 0, height: 0 };
  if ($(m().flowchart.htmlLabels)) {
    const g = o.children[0], p = C(o);
    h = g.getBoundingClientRect(), p.attr("width", h.width), p.attr("height", h.height);
  }
  x.info("Text 2", l);
  const f = l.slice(1, l.length);
  let d = o.getBBox();
  const y = s.node().appendChild(
    N(f.join ? f.join("<br/>") : f, t.labelStyle, !0, !0)
  );
  if ($(m().flowchart.htmlLabels)) {
    const g = y.children[0], p = C(y);
    h = g.getBoundingClientRect(), p.attr("width", h.width), p.attr("height", h.height);
  }
  const u = t.padding / 2;
  return C(y).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (h.width > d.width ? 0 : (d.width - h.width) / 2) + ", " + (d.height + u + 5) + ")"
  ), C(o).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (h.width < d.width ? 0 : -(d.width - h.width) / 2) + ", 0)"
  ), h = s.node().getBBox(), s.attr(
    "transform",
    "translate(" + -h.width / 2 + ", " + (-h.height / 2 - u + 3) + ")"
  ), e.attr("class", "outer title-state").attr("x", -h.width / 2 - u).attr("y", -h.height / 2 - u).attr("width", h.width + t.padding).attr("height", h.height + t.padding), i.attr("class", "divider").attr("x1", -h.width / 2 - u).attr("x2", h.width / 2 + u).attr("y1", -h.height / 2 - u + d.height + u).attr("y2", -h.height / 2 - u + d.height + u), S(t, e), t.intersect = function(g) {
    return k.rect(t, g);
  }, n;
}, Dt = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.height + t.padding, i = n.width + e / 4 + t.padding, s = a.insert("rect", ":first-child").attr("style", t.style).attr("rx", e / 2).attr("ry", e / 2).attr("x", -i / 2).attr("y", -e / 2).attr("width", i).attr("height", e);
  return S(t, s), t.intersect = function(l) {
    return k.rect(t, l);
  }, a;
}, jt = async (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), i = a.insert("circle", ":first-child");
  return i.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", n.width / 2 + e).attr("width", n.width + t.padding).attr("height", n.height + t.padding), x.info("Circle main"), S(t, i), t.intersect = function(s) {
    return x.info("Circle intersect", t, n.width / 2 + e, s), k.circle(t, n.width / 2 + e, s);
  }, a;
}, At = async (r, t) => {
  const { shapeSvg: a, bbox: n, halfPadding: e } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), i = 5, s = a.insert("g", ":first-child"), l = s.insert("circle"), c = s.insert("circle");
  return s.attr("class", t.class), l.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", n.width / 2 + e + i).attr("width", n.width + t.padding + i * 2).attr("height", n.height + t.padding + i * 2), c.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", n.width / 2 + e).attr("width", n.width + t.padding).attr("height", n.height + t.padding), x.info("DoubleCircle main"), S(t, l), t.intersect = function(o) {
    return x.info("DoubleCircle intersect", t, n.width / 2 + e + i, o), k.circle(t, n.width / 2 + e + i, o);
  }, a;
}, Ut = async (r, t) => {
  const { shapeSvg: a, bbox: n } = await T(
    r,
    t,
    H(t, void 0),
    !0
  ), e = n.width + t.padding, i = n.height + t.padding, s = [
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
  ], l = Y(a, e, i, s);
  return l.attr("style", t.style), S(t, l), t.intersect = function(c) {
    return k.polygon(t, s, c);
  }, a;
}, zt = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), n = a.insert("circle", ":first-child");
  return n.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), S(t, n), t.intersect = function(e) {
    return k.circle(t, 7, e);
  }, a;
}, G = (r, t, a) => {
  const n = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id);
  let e = 70, i = 10;
  a === "LR" && (e = 10, i = 70);
  const s = n.append("rect").attr("x", -1 * e / 2).attr("y", -1 * i / 2).attr("width", e).attr("height", i).attr("class", "fork-join");
  return S(t, s), t.height = t.height + t.padding / 2, t.width = t.width + t.padding / 2, t.intersect = function(l) {
    return k.rect(t, l);
  }, n;
}, Zt = (r, t) => {
  const a = r.insert("g").attr("class", "node default").attr("id", t.domId || t.id), n = a.insert("circle", ":first-child"), e = a.insert("circle", ":first-child");
  return e.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), n.attr("class", "state-end").attr("r", 5).attr("width", 10).attr("height", 10), S(t, e), t.intersect = function(i) {
    return k.circle(t, 7, i);
  }, a;
}, Ft = (r, t) => {
  const a = t.padding / 2, n = 4, e = 8;
  let i;
  t.classes ? i = "node " + t.classes : i = "node default";
  const s = r.insert("g").attr("class", i).attr("id", t.domId || t.id), l = s.insert("rect", ":first-child"), c = s.insert("line"), o = s.insert("line");
  let h = 0, f = n;
  const d = s.insert("g").attr("class", "label");
  let y = 0;
  const u = t.classData.annotations && t.classData.annotations[0], g = t.classData.annotations[0] ? "«" + t.classData.annotations[0] + "»" : "", p = d.node().appendChild(N(g, t.labelStyle, !0, !0));
  let w = p.getBBox();
  if ($(m().flowchart.htmlLabels)) {
    const L = p.children[0], v = C(p);
    w = L.getBoundingClientRect(), v.attr("width", w.width), v.attr("height", w.height);
  }
  t.classData.annotations[0] && (f += w.height + n, h += w.width);
  let M = t.classData.label;
  t.classData.type !== void 0 && t.classData.type !== "" && (m().flowchart.htmlLabels ? M += "&lt;" + t.classData.type + "&gt;" : M += "<" + t.classData.type + ">");
  const E = d.node().appendChild(N(M, t.labelStyle, !0, !0));
  C(E).attr("class", "classTitle");
  let b = E.getBBox();
  if ($(m().flowchart.htmlLabels)) {
    const L = E.children[0], v = C(E);
    b = L.getBoundingClientRect(), v.attr("width", b.width), v.attr("height", b.height);
  }
  f += b.height + n, b.width > h && (h = b.width);
  const R = [];
  t.classData.members.forEach((L) => {
    const v = L.getDisplayDetails();
    let W = v.displayText;
    m().flowchart.htmlLabels && (W = W.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const O = d.node().appendChild(
      N(
        W,
        v.cssStyle ? v.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let I = O.getBBox();
    if ($(m().flowchart.htmlLabels)) {
      const F = O.children[0], j = C(O);
      I = F.getBoundingClientRect(), j.attr("width", I.width), j.attr("height", I.height);
    }
    I.width > h && (h = I.width), f += I.height + n, R.push(O);
  }), f += e;
  const _ = [];
  if (t.classData.methods.forEach((L) => {
    const v = L.getDisplayDetails();
    let W = v.displayText;
    m().flowchart.htmlLabels && (W = W.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const O = d.node().appendChild(
      N(
        W,
        v.cssStyle ? v.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let I = O.getBBox();
    if ($(m().flowchart.htmlLabels)) {
      const F = O.children[0], j = C(O);
      I = F.getBoundingClientRect(), j.attr("width", I.width), j.attr("height", I.height);
    }
    I.width > h && (h = I.width), f += I.height + n, _.push(O);
  }), f += e, u) {
    let L = (h - w.width) / 2;
    C(p).attr(
      "transform",
      "translate( " + (-1 * h / 2 + L) + ", " + -1 * f / 2 + ")"
    ), y = w.height + n;
  }
  let X = (h - b.width) / 2;
  return C(E).attr(
    "transform",
    "translate( " + (-1 * h / 2 + X) + ", " + (-1 * f / 2 + y) + ")"
  ), y += b.height + n, c.attr("class", "divider").attr("x1", -h / 2 - a).attr("x2", h / 2 + a).attr("y1", -f / 2 - a + e + y).attr("y2", -f / 2 - a + e + y), y += e, R.forEach((L) => {
    C(L).attr(
      "transform",
      "translate( " + -h / 2 + ", " + (-1 * f / 2 + y + e / 2) + ")"
    );
    const v = L == null ? void 0 : L.getBBox();
    y += ((v == null ? void 0 : v.height) ?? 0) + n;
  }), y += e, o.attr("class", "divider").attr("x1", -h / 2 - a).attr("x2", h / 2 + a).attr("y1", -f / 2 - a + e + y).attr("y2", -f / 2 - a + e + y), y += e, _.forEach((L) => {
    C(L).attr(
      "transform",
      "translate( " + -h / 2 + ", " + (-1 * f / 2 + y) + ")"
    );
    const v = L == null ? void 0 : L.getBBox();
    y += ((v == null ? void 0 : v.height) ?? 0) + n;
  }), l.attr("class", "outer title-state").attr("x", -h / 2 - a).attr("y", -(f / 2) - a).attr("width", h + t.padding).attr("height", f + t.padding), S(t, l), t.intersect = function(L) {
    return k.rect(t, L);
  }, s;
}, P = {
  rhombus: K,
  question: K,
  rect: Ot,
  labelRect: Yt,
  rectWithTitle: Wt,
  choice: Ct,
  circle: jt,
  doublecircle: At,
  stadium: Dt,
  hexagon: Tt,
  rect_left_inv_arrow: Rt,
  lean_right: It,
  lean_left: Ht,
  trapezoid: Nt,
  inv_trapezoid: _t,
  rect_right_inv_arrow: $t,
  cylinder: Xt,
  start: zt,
  end: Zt,
  note: Bt,
  subroutine: Ut,
  fork: G,
  join: G,
  class_box: Ft
};
let D = {};
const Pt = async (r, t, a) => {
  let n, e;
  if (t.link) {
    let i;
    m().securityLevel === "sandbox" ? i = "_top" : t.linkTarget && (i = t.linkTarget || "_blank"), n = r.insert("svg:a").attr("xlink:href", t.link).attr("target", i), e = await P[t.shape](n, t, a);
  } else
    e = await P[t.shape](r, t, a), n = e;
  return t.tooltip && e.attr("title", t.tooltip), t.class && e.attr("class", "node default " + t.class), D[t.id] = n, t.haveCallback && D[t.id].attr("class", D[t.id].attr("class") + " clickable"), n;
}, tr = (r, t) => {
  D[t.id] = r;
}, rr = () => {
  D = {};
}, ar = (r) => {
  const t = D[r.id];
  x.trace(
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
let Z = {}, B = {};
const er = () => {
  Z = {}, B = {};
}, sr = (r, t) => {
  const a = $(m().flowchart.htmlLabels), n = t.labelType === "markdown" ? rt(r, t.label, {
    style: t.labelStyle,
    useHtmlLabels: a,
    addSvgBackground: !0
  }) : N(t.label, t.labelStyle);
  x.info("abc82", t, t.labelType);
  const e = r.insert("g").attr("class", "edgeLabel"), i = e.insert("g").attr("class", "label");
  i.node().appendChild(n);
  let s = n.getBBox();
  if (a) {
    const c = n.children[0], o = C(n);
    s = c.getBoundingClientRect(), o.attr("width", s.width), o.attr("height", s.height);
  }
  i.attr("transform", "translate(" + -s.width / 2 + ", " + -s.height / 2 + ")"), Z[t.id] = e, t.width = s.width, t.height = s.height;
  let l;
  if (t.startLabelLeft) {
    const c = N(t.startLabelLeft, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), B[t.id] || (B[t.id] = {}), B[t.id].startLeft = o, U(l, t.startLabelLeft);
  }
  if (t.startLabelRight) {
    const c = N(t.startLabelRight, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = o.node().appendChild(c), h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), B[t.id] || (B[t.id] = {}), B[t.id].startRight = o, U(l, t.startLabelRight);
  }
  if (t.endLabelLeft) {
    const c = N(t.endLabelLeft, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), o.node().appendChild(c), B[t.id] || (B[t.id] = {}), B[t.id].endLeft = o, U(l, t.endLabelLeft);
  }
  if (t.endLabelRight) {
    const c = N(t.endLabelRight, t.labelStyle), o = r.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    l = h.node().appendChild(c);
    const f = c.getBBox();
    h.attr("transform", "translate(" + -f.width / 2 + ", " + -f.height / 2 + ")"), o.node().appendChild(c), B[t.id] || (B[t.id] = {}), B[t.id].endRight = o, U(l, t.endLabelRight);
  }
  return n;
};
function U(r, t) {
  m().flowchart.htmlLabels && r && (r.style.width = t.length * 9 + "px", r.style.height = "12px");
}
const ir = (r, t) => {
  x.info("Moving label abc78 ", r.id, r.label, Z[r.id]);
  let a = t.updatedPath ? t.updatedPath : t.originalPath;
  if (r.label) {
    const n = Z[r.id];
    let e = r.x, i = r.y;
    if (a) {
      const s = A.calcLabelPosition(a);
      x.info(
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
    const n = B[r.id].startLeft;
    let e = r.x, i = r.y;
    if (a) {
      const s = A.calcTerminalLabelPosition(r.arrowTypeStart ? 10 : 0, "start_left", a);
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.startLabelRight) {
    const n = B[r.id].startRight;
    let e = r.x, i = r.y;
    if (a) {
      const s = A.calcTerminalLabelPosition(
        r.arrowTypeStart ? 10 : 0,
        "start_right",
        a
      );
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.endLabelLeft) {
    const n = B[r.id].endLeft;
    let e = r.x, i = r.y;
    if (a) {
      const s = A.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_left", a);
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
  if (r.endLabelRight) {
    const n = B[r.id].endRight;
    let e = r.x, i = r.y;
    if (a) {
      const s = A.calcTerminalLabelPosition(r.arrowTypeEnd ? 10 : 0, "end_right", a);
      e = s.x, i = s.y;
    }
    n.attr("transform", "translate(" + e + ", " + i + ")");
  }
}, Qt = (r, t) => {
  const a = r.x, n = r.y, e = Math.abs(t.x - a), i = Math.abs(t.y - n), s = r.width / 2, l = r.height / 2;
  return e >= s || i >= l;
}, Vt = (r, t, a) => {
  x.warn(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(a)}
  node        : x:${r.x} y:${r.y} w:${r.width} h:${r.height}`);
  const n = r.x, e = r.y, i = Math.abs(n - a.x), s = r.width / 2;
  let l = a.x < t.x ? s - i : s + i;
  const c = r.height / 2, o = Math.abs(t.y - a.y), h = Math.abs(t.x - a.x);
  if (Math.abs(e - t.y) * s > Math.abs(n - t.x) * c) {
    let f = a.y < t.y ? t.y - c - e : e - c - t.y;
    l = h * f / o;
    const d = {
      x: a.x < t.x ? a.x + l : a.x - h + l,
      y: a.y < t.y ? a.y + o - f : a.y - o + f
    };
    return l === 0 && (d.x = t.x, d.y = t.y), h === 0 && (d.x = t.x), o === 0 && (d.y = t.y), x.warn(`abc89 topp/bott calc, Q ${o}, q ${f}, R ${h}, r ${l}`, d), d;
  } else {
    a.x < t.x ? l = t.x - s - n : l = n - s - t.x;
    let f = o * l / h, d = a.x < t.x ? a.x + h - l : a.x - h + l, y = a.y < t.y ? a.y + f : a.y - f;
    return x.warn(`sides calc abc89, Q ${o}, q ${f}, R ${h}, r ${l}`, { _x: d, _y: y }), l === 0 && (d = t.x, y = t.y), h === 0 && (d = t.x), o === 0 && (y = t.y), { x: d, y };
  }
}, tt = (r, t) => {
  x.warn("abc88 cutPathAtIntersect", r, t);
  let a = [], n = r[0], e = !1;
  return r.forEach((i) => {
    if (x.info("abc88 checking point", i, t), !Qt(t, i) && !e) {
      const s = Vt(t, n, i);
      x.warn("abc88 inside", i, n, s), x.warn("abc88 intersection", s);
      let l = !1;
      a.forEach((c) => {
        l = l || c.x === s.x && c.y === s.y;
      }), a.some((c) => c.x === s.x && c.y === s.y) ? x.warn("abc88 no intersect", s, a) : a.push(s), e = !0;
    } else
      x.warn("abc88 outside", i, n), n = i, e || a.push(i);
  }), x.warn("abc88 returning points", a), a;
};
function z(r, t) {
  const [a, n] = [r.x, r.y], [e, i] = [t.x, t.y], s = e - a, l = i - n;
  return { angle: Math.atan(l / s), deltaX: s, deltaY: l };
}
const nr = function(r, t, a, n, e, i) {
  let s = a.points, l = !1;
  const c = i.node(t.v);
  var o = i.node(t.w);
  x.info("abc88 InsertEdge: ", a), o.intersect && c.intersect && (s = s.slice(1, a.points.length - 1), s.unshift(c.intersect(s[0])), x.info(
    "Last point",
    s[s.length - 1],
    o,
    o.intersect(s[s.length - 1])
  ), s.push(o.intersect(s[s.length - 1]))), a.toCluster && (x.info("to cluster abc88", n[a.toCluster]), s = tt(a.points, n[a.toCluster].node), l = !0), a.fromCluster && (x.info("from cluster abc88", n[a.fromCluster]), s = tt(s.reverse(), n[a.fromCluster].node).reverse(), l = !0);
  const h = s.filter((M) => !Number.isNaN(M.y));
  let f = st;
  a.curve && (e === "graph" || e === "flowchart") && (f = a.curve);
  const d = {
    aggregation: 18,
    extension: 18,
    composition: 18,
    dependency: 6,
    lollipop: 13.5,
    arrow_point: 5.3
  }, y = it().x(function(M, E, b) {
    let R = 0;
    if (E === 0 && Object.hasOwn(d, a.arrowTypeStart)) {
      const { angle: _, deltaX: X } = z(b[0], b[1]);
      R = d[a.arrowTypeStart] * Math.cos(_) * (X >= 0 ? 1 : -1) || 0;
    } else if (E === b.length - 1 && Object.hasOwn(d, a.arrowTypeEnd)) {
      const { angle: _, deltaX: X } = z(
        b[b.length - 1],
        b[b.length - 2]
      );
      R = d[a.arrowTypeEnd] * Math.cos(_) * (X >= 0 ? 1 : -1) || 0;
    }
    return M.x + R;
  }).y(function(M, E, b) {
    let R = 0;
    if (E === 0 && Object.hasOwn(d, a.arrowTypeStart)) {
      const { angle: _, deltaY: X } = z(b[0], b[1]);
      R = d[a.arrowTypeStart] * Math.abs(Math.sin(_)) * (X >= 0 ? 1 : -1);
    } else if (E === b.length - 1 && Object.hasOwn(d, a.arrowTypeEnd)) {
      const { angle: _, deltaY: X } = z(
        b[b.length - 1],
        b[b.length - 2]
      );
      R = d[a.arrowTypeEnd] * Math.abs(Math.sin(_)) * (X >= 0 ? 1 : -1);
    }
    return M.y + R;
  }).curve(f);
  let u;
  switch (a.thickness) {
    case "normal":
      u = "edge-thickness-normal";
      break;
    case "thick":
      u = "edge-thickness-thick";
      break;
    case "invisible":
      u = "edge-thickness-thick";
      break;
    default:
      u = "";
  }
  switch (a.pattern) {
    case "solid":
      u += " edge-pattern-solid";
      break;
    case "dotted":
      u += " edge-pattern-dotted";
      break;
    case "dashed":
      u += " edge-pattern-dashed";
      break;
  }
  const g = r.append("path").attr("d", y(h)).attr("id", a.id).attr("class", " " + u + (a.classes ? " " + a.classes : "")).attr("style", a.style);
  let p = "";
  switch ((m().flowchart.arrowMarkerAbsolute || m().state.arrowMarkerAbsolute) && (p = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, p = p.replace(/\(/g, "\\("), p = p.replace(/\)/g, "\\)")), x.info("arrowTypeStart", a.arrowTypeStart), x.info("arrowTypeEnd", a.arrowTypeEnd), a.arrowTypeStart) {
    case "arrow_cross":
      g.attr("marker-start", "url(" + p + "#" + e + "-crossStart)");
      break;
    case "arrow_point":
      g.attr("marker-start", "url(" + p + "#" + e + "-pointStart)");
      break;
    case "arrow_barb":
      g.attr("marker-start", "url(" + p + "#" + e + "-barbStart)");
      break;
    case "arrow_circle":
      g.attr("marker-start", "url(" + p + "#" + e + "-circleStart)");
      break;
    case "aggregation":
      g.attr("marker-start", "url(" + p + "#" + e + "-aggregationStart)");
      break;
    case "extension":
      g.attr("marker-start", "url(" + p + "#" + e + "-extensionStart)");
      break;
    case "composition":
      g.attr("marker-start", "url(" + p + "#" + e + "-compositionStart)");
      break;
    case "dependency":
      g.attr("marker-start", "url(" + p + "#" + e + "-dependencyStart)");
      break;
    case "lollipop":
      g.attr("marker-start", "url(" + p + "#" + e + "-lollipopStart)");
      break;
  }
  switch (a.arrowTypeEnd) {
    case "arrow_cross":
      g.attr("marker-end", "url(" + p + "#" + e + "-crossEnd)");
      break;
    case "arrow_point":
      g.attr("marker-end", "url(" + p + "#" + e + "-pointEnd)");
      break;
    case "arrow_barb":
      g.attr("marker-end", "url(" + p + "#" + e + "-barbEnd)");
      break;
    case "arrow_circle":
      g.attr("marker-end", "url(" + p + "#" + e + "-circleEnd)");
      break;
    case "aggregation":
      g.attr("marker-end", "url(" + p + "#" + e + "-aggregationEnd)");
      break;
    case "extension":
      g.attr("marker-end", "url(" + p + "#" + e + "-extensionEnd)");
      break;
    case "composition":
      g.attr("marker-end", "url(" + p + "#" + e + "-compositionEnd)");
      break;
    case "dependency":
      g.attr("marker-end", "url(" + p + "#" + e + "-dependencyEnd)");
      break;
    case "lollipop":
      g.attr("marker-end", "url(" + p + "#" + e + "-lollipopEnd)");
      break;
  }
  let w = {};
  return l && (w.updatedPath = s), w.originalPath = a.points, w;
};
export {
  Gt as a,
  rr as b,
  N as c,
  er as d,
  Pt as e,
  sr as f,
  nr as g,
  ir as h,
  Et as i,
  T as l,
  ar as p,
  tr as s,
  S as u
};
