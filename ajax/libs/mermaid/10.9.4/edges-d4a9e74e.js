import { l as g, c as b, p as H, b7 as Q, j as B, d as V, A as j, F as lt } from "./mermaid-e07dac3d.js";
import { a as st } from "./createText-908267de.js";
import { l as ct } from "./line-6e74982d.js";
const ht = (a, t, e, i) => {
  t.forEach((l) => {
    wt[l](a, e, i);
  });
}, ot = (a, t, e) => {
  g.trace("Making markers for ", e), a.append("defs").append("marker").attr("id", e + "_" + t + "-extensionStart").attr("class", "marker extension " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z"), a.append("defs").append("marker").attr("id", e + "_" + t + "-extensionEnd").attr("class", "marker extension " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, yt = (a, t, e) => {
  a.append("defs").append("marker").attr("id", e + "_" + t + "-compositionStart").attr("class", "marker composition " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), a.append("defs").append("marker").attr("id", e + "_" + t + "-compositionEnd").attr("class", "marker composition " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, ft = (a, t, e) => {
  a.append("defs").append("marker").attr("id", e + "_" + t + "-aggregationStart").attr("class", "marker aggregation " + t).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z"), a.append("defs").append("marker").attr("id", e + "_" + t + "-aggregationEnd").attr("class", "marker aggregation " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, pt = (a, t, e) => {
  a.append("defs").append("marker").attr("id", e + "_" + t + "-dependencyStart").attr("class", "marker dependency " + t).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z"), a.append("defs").append("marker").attr("id", e + "_" + t + "-dependencyEnd").attr("class", "marker dependency " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, dt = (a, t, e) => {
  a.append("defs").append("marker").attr("id", e + "_" + t + "-lollipopStart").attr("class", "marker lollipop " + t).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6), a.append("defs").append("marker").attr("id", e + "_" + t + "-lollipopEnd").attr("class", "marker lollipop " + t).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
}, xt = (a, t, e) => {
  a.append("marker").attr("id", e + "_" + t + "-pointEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 6).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), a.append("marker").attr("id", e + "_" + t + "-pointStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 12).attr("markerHeight", 12).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, gt = (a, t, e) => {
  a.append("marker").attr("id", e + "_" + t + "-circleEnd").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0"), a.append("marker").attr("id", e + "_" + t + "-circleStart").attr("class", "marker " + t).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, ut = (a, t, e) => {
  a.append("marker").attr("id", e + "_" + t + "-crossEnd").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0"), a.append("marker").attr("id", e + "_" + t + "-crossStart").attr("class", "marker cross " + t).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, bt = (a, t, e) => {
  a.append("defs").append("marker").attr("id", e + "_" + t + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "strokeWidth").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, wt = {
  extension: ot,
  composition: yt,
  aggregation: ft,
  dependency: pt,
  lollipop: dt,
  point: xt,
  circle: gt,
  cross: ut,
  barb: bt
}, hr = ht;
function mt(a, t) {
  t && a.attr("style", t);
}
function kt(a, t) {
  const e = B(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject")), i = e.append("xhtml:div"), l = a.label, r = a.isNode ? "nodeLabel" : "edgeLabel";
  return i.html(
    V(
      '<span class="' + r + '" ' + (a.labelStyle ? 'style="' + a.labelStyle + '"' : "") + ">" + l + "</span>",
      t
    )
  ), mt(i, a.labelStyle), i.style("display", "inline-block"), i.style("white-space", "nowrap"), i.attr("xmlns", "http://www.w3.org/1999/xhtml"), e.node();
}
const vt = (a, t, e, i) => {
  let l = a || "";
  typeof l == "object" && (l = l[0]);
  const r = b();
  if (H(r.flowchart.htmlLabels)) {
    l = l.replace(/\\n|\n/g, "<br />"), g.debug("vertexText" + l);
    const s = {
      isNode: i,
      label: Q(l).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        // cspell: disable-line
        (c) => `<i class='${c.replace(":", " ")}'></i>`
      ),
      labelStyle: t.replace("fill:", "color:")
    };
    return kt(s, r);
  } else {
    const s = document.createElementNS("http://www.w3.org/2000/svg", "text");
    s.setAttribute("style", t.replace("color:", "fill:"));
    let n = [];
    typeof l == "string" ? n = l.split(/\\n|\n|<br\s*\/?>/gi) : Array.isArray(l) ? n = l : n = [];
    for (const c of n) {
      const o = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      o.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), o.setAttribute("dy", "1em"), o.setAttribute("x", "0"), e ? o.setAttribute("class", "title-row") : o.setAttribute("class", "row"), o.textContent = c.trim(), s.appendChild(o);
    }
    return s;
  }
}, R = vt, M = async (a, t, e, i) => {
  let l;
  const r = t.useHtmlLabels || H(b().flowchart.htmlLabels);
  e ? l = e : l = "node default";
  const s = a.insert("g").attr("class", l).attr("id", t.domId || t.id), n = s.insert("g").attr("class", "label").attr("style", t.labelStyle);
  let c;
  t.labelText === void 0 ? c = "" : c = typeof t.labelText == "string" ? t.labelText : t.labelText[0];
  const o = n.node();
  let h;
  t.labelType === "markdown" ? h = st(n, V(Q(c), b()), {
    useHtmlLabels: r,
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
  let y = h.getBBox();
  const p = t.padding / 2;
  if (H(b().flowchart.htmlLabels)) {
    const f = h.children[0], x = B(h), k = f.getElementsByTagName("img");
    if (k) {
      const d = c.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...k].map(
          (u) => new Promise((S) => {
            function E() {
              if (u.style.display = "flex", u.style.flexDirection = "column", d) {
                const C = b().fontSize ? b().fontSize : window.getComputedStyle(document.body).fontSize, W = 5, A = parseInt(C, 10) * W + "px";
                u.style.minWidth = A, u.style.maxWidth = A;
              } else
                u.style.width = "100%";
              S(u);
            }
            setTimeout(() => {
              u.complete && E();
            }), u.addEventListener("error", E), u.addEventListener("load", E);
          })
        )
      );
    }
    y = f.getBoundingClientRect(), x.attr("width", y.width), x.attr("height", y.height);
  }
  return r ? n.attr("transform", "translate(" + -y.width / 2 + ", " + -y.height / 2 + ")") : n.attr("transform", "translate(0, " + -y.height / 2 + ")"), t.centerLabel && n.attr("transform", "translate(" + -y.width / 2 + ", " + -y.height / 2 + ")"), n.insert("rect", ":first-child"), { shapeSvg: s, bbox: y, halfPadding: p, label: n };
}, m = (a, t) => {
  const e = t.node().getBBox();
  a.width = e.width, a.height = e.height;
};
function I(a, t, e, i) {
  return a.insert("polygon", ":first-child").attr(
    "points",
    i.map(function(l) {
      return l.x + "," + l.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -t / 2 + "," + e / 2 + ")");
}
function Lt(a, t) {
  return a.intersect(t);
}
function it(a, t, e, i) {
  var l = a.x, r = a.y, s = l - i.x, n = r - i.y, c = Math.sqrt(t * t * n * n + e * e * s * s), o = Math.abs(t * e * s / c);
  i.x < l && (o = -o);
  var h = Math.abs(t * e * n / c);
  return i.y < r && (h = -h), { x: l + o, y: r + h };
}
function St(a, t, e) {
  return it(a, t, t, e);
}
function Mt(a, t, e, i) {
  var l, r, s, n, c, o, h, y, p, f, x, k, d, u, S;
  if (l = t.y - a.y, s = a.x - t.x, c = t.x * a.y - a.x * t.y, p = l * e.x + s * e.y + c, f = l * i.x + s * i.y + c, !(p !== 0 && f !== 0 && J(p, f)) && (r = i.y - e.y, n = e.x - i.x, o = i.x * e.y - e.x * i.y, h = r * a.x + n * a.y + o, y = r * t.x + n * t.y + o, !(h !== 0 && y !== 0 && J(h, y)) && (x = l * n - r * s, x !== 0)))
    return k = Math.abs(x / 2), d = s * o - n * c, u = d < 0 ? (d - k) / x : (d + k) / x, d = r * c - l * o, S = d < 0 ? (d - k) / x : (d + k) / x, { x: u, y: S };
}
function J(a, t) {
  return a * t > 0;
}
function Tt(a, t, e) {
  var i = a.x, l = a.y, r = [], s = Number.POSITIVE_INFINITY, n = Number.POSITIVE_INFINITY;
  typeof t.forEach == "function" ? t.forEach(function(x) {
    s = Math.min(s, x.x), n = Math.min(n, x.y);
  }) : (s = Math.min(s, t.x), n = Math.min(n, t.y));
  for (var c = i - a.width / 2 - s, o = l - a.height / 2 - n, h = 0; h < t.length; h++) {
    var y = t[h], p = t[h < t.length - 1 ? h + 1 : 0], f = Mt(
      a,
      e,
      { x: c + y.x, y: o + y.y },
      { x: c + p.x, y: o + p.y }
    );
    f && r.push(f);
  }
  return r.length ? (r.length > 1 && r.sort(function(x, k) {
    var d = x.x - e.x, u = x.y - e.y, S = Math.sqrt(d * d + u * u), E = k.x - e.x, C = k.y - e.y, W = Math.sqrt(E * E + C * C);
    return S < W ? -1 : S === W ? 0 : 1;
  }), r[0]) : a;
}
const Et = (a, t) => {
  var e = a.x, i = a.y, l = t.x - e, r = t.y - i, s = a.width / 2, n = a.height / 2, c, o;
  return Math.abs(r) * s > Math.abs(l) * n ? (r < 0 && (n = -n), c = r === 0 ? 0 : n * l / r, o = n) : (l < 0 && (s = -s), c = s, o = l === 0 ? 0 : s * r / l), { x: e + c, y: i + o };
}, Bt = Et, w = {
  node: Lt,
  circle: St,
  ellipse: it,
  polygon: Tt,
  rect: Bt
}, Ct = async (a, t) => {
  t.useHtmlLabels || b().flowchart.htmlLabels || (t.centerLabel = !0);
  const { shapeSvg: i, bbox: l, halfPadding: r } = await M(
    a,
    t,
    "node " + t.classes,
    !0
  );
  g.info("Classes = ", t.classes);
  const s = i.insert("rect", ":first-child");
  return s.attr("rx", t.rx).attr("ry", t.ry).attr("x", -l.width / 2 - r).attr("y", -l.height / 2 - r).attr("width", l.width + t.padding).attr("height", l.height + t.padding), m(t, s), t.intersect = function(n) {
    return w.rect(t, n);
  }, i;
}, $t = Ct, _t = (a) => {
  const t = /* @__PURE__ */ new Set();
  for (const e of a)
    switch (e) {
      case "x":
        t.add("right"), t.add("left");
        break;
      case "y":
        t.add("up"), t.add("down");
        break;
      default:
        t.add(e);
        break;
    }
  return t;
}, Rt = (a, t, e) => {
  const i = _t(a), l = 2, r = t.height + 2 * e.padding, s = r / l, n = t.width + 2 * s + e.padding, c = e.padding / 2;
  return i.has("right") && i.has("left") && i.has("up") && i.has("down") ? [
    // Bottom
    { x: 0, y: 0 },
    { x: s, y: 0 },
    { x: n / 2, y: 2 * c },
    { x: n - s, y: 0 },
    { x: n, y: 0 },
    // Right
    { x: n, y: -r / 3 },
    { x: n + 2 * c, y: -r / 2 },
    { x: n, y: -2 * r / 3 },
    { x: n, y: -r },
    // Top
    { x: n - s, y: -r },
    { x: n / 2, y: -r - 2 * c },
    { x: s, y: -r },
    // Left
    { x: 0, y: -r },
    { x: 0, y: -2 * r / 3 },
    { x: -2 * c, y: -r / 2 },
    { x: 0, y: -r / 3 }
  ] : i.has("right") && i.has("left") && i.has("up") ? [
    { x: s, y: 0 },
    { x: n - s, y: 0 },
    { x: n, y: -r / 2 },
    { x: n - s, y: -r },
    { x: s, y: -r },
    { x: 0, y: -r / 2 }
  ] : i.has("right") && i.has("left") && i.has("down") ? [
    { x: 0, y: 0 },
    { x: s, y: -r },
    { x: n - s, y: -r },
    { x: n, y: 0 }
  ] : i.has("right") && i.has("up") && i.has("down") ? [
    { x: 0, y: 0 },
    { x: n, y: -s },
    { x: n, y: -r + s },
    { x: 0, y: -r }
  ] : i.has("left") && i.has("up") && i.has("down") ? [
    { x: n, y: 0 },
    { x: 0, y: -s },
    { x: 0, y: -r + s },
    { x: n, y: -r }
  ] : i.has("right") && i.has("left") ? [
    { x: s, y: 0 },
    { x: s, y: -c },
    { x: n - s, y: -c },
    { x: n - s, y: 0 },
    { x: n, y: -r / 2 },
    { x: n - s, y: -r },
    { x: n - s, y: -r + c },
    { x: s, y: -r + c },
    { x: s, y: -r },
    { x: 0, y: -r / 2 }
  ] : i.has("up") && i.has("down") ? [
    // Bottom center
    { x: n / 2, y: 0 },
    // Left pont of bottom arrow
    { x: 0, y: -c },
    { x: s, y: -c },
    // Left top over vertical section
    { x: s, y: -r + c },
    { x: 0, y: -r + c },
    // Top of arrow
    { x: n / 2, y: -r },
    { x: n, y: -r + c },
    // Top of right vertical bar
    { x: n - s, y: -r + c },
    { x: n - s, y: -c },
    { x: n, y: -c }
  ] : i.has("right") && i.has("up") ? [
    { x: 0, y: 0 },
    { x: n, y: -s },
    { x: 0, y: -r }
  ] : i.has("right") && i.has("down") ? [
    { x: 0, y: 0 },
    { x: n, y: 0 },
    { x: 0, y: -r }
  ] : i.has("left") && i.has("up") ? [
    { x: n, y: 0 },
    { x: 0, y: -s },
    { x: n, y: -r }
  ] : i.has("left") && i.has("down") ? [
    { x: n, y: 0 },
    { x: 0, y: 0 },
    { x: n, y: -r }
  ] : i.has("right") ? [
    { x: s, y: -c },
    { x: s, y: -c },
    { x: n - s, y: -c },
    { x: n - s, y: 0 },
    { x: n, y: -r / 2 },
    { x: n - s, y: -r },
    { x: n - s, y: -r + c },
    // top left corner of arrow
    { x: s, y: -r + c },
    { x: s, y: -r + c }
  ] : i.has("left") ? [
    { x: s, y: 0 },
    { x: s, y: -c },
    // Two points, the right corners
    { x: n - s, y: -c },
    { x: n - s, y: -r + c },
    { x: s, y: -r + c },
    { x: s, y: -r },
    { x: 0, y: -r / 2 }
  ] : i.has("up") ? [
    // Bottom center
    { x: s, y: -c },
    // Left top over vertical section
    { x: s, y: -r + c },
    { x: 0, y: -r + c },
    // Top of arrow
    { x: n / 2, y: -r },
    { x: n, y: -r + c },
    // Top of right vertical bar
    { x: n - s, y: -r + c },
    { x: n - s, y: -c }
  ] : i.has("down") ? [
    // Bottom center
    { x: n / 2, y: 0 },
    // Left pont of bottom arrow
    { x: 0, y: -c },
    { x: s, y: -c },
    // Left top over vertical section
    { x: s, y: -r + c },
    { x: n - s, y: -r + c },
    { x: n - s, y: -c },
    { x: n, y: -c }
  ] : [{ x: 0, y: 0 }];
}, K = (a) => a ? " " + a : "", _ = (a, t) => `${t || "node default"}${K(a.classes)} ${K(
  a.class
)}`, P = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = l + r, n = [
    { x: s / 2, y: 0 },
    { x: s, y: -s / 2 },
    { x: s / 2, y: -s },
    { x: 0, y: -s / 2 }
  ];
  g.info("Question main (Circle)");
  const c = I(e, s, s, n);
  return c.attr("style", t.style), m(t, c), t.intersect = function(o) {
    return g.warn("Intersect called"), w.polygon(t, n, o);
  }, e;
}, Ht = (a, t) => {
  const e = a.insert("g").attr("class", "node default").attr("id", t.domId || t.id), i = 28, l = [
    { x: 0, y: i / 2 },
    { x: i / 2, y: 0 },
    { x: 0, y: -i / 2 },
    { x: -i / 2, y: 0 }
  ];
  return e.insert("polygon", ":first-child").attr(
    "points",
    l.map(function(s) {
      return s.x + "," + s.y;
    }).join(" ")
  ).attr("class", "state-start").attr("r", 7).attr("width", 28).attr("height", 28), t.width = 28, t.height = 28, t.intersect = function(s) {
    return w.circle(t, 14, s);
  }, e;
}, It = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = 4, r = i.height + t.padding, s = r / l, n = i.width + 2 * s + t.padding, c = [
    { x: s, y: 0 },
    { x: n - s, y: 0 },
    { x: n, y: -r / 2 },
    { x: n - s, y: -r },
    { x: s, y: -r },
    { x: 0, y: -r / 2 }
  ], o = I(e, n, r, c);
  return o.attr("style", t.style), m(t, o), t.intersect = function(h) {
    return w.polygon(t, c, h);
  }, e;
}, Nt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(a, t, void 0, !0), l = 2, r = i.height + 2 * t.padding, s = r / l, n = i.width + 2 * s + t.padding, c = Rt(t.directions, i, t), o = I(e, n, r, c);
  return o.attr("style", t.style), m(t, o), t.intersect = function(h) {
    return w.polygon(t, c, h);
  }, e;
}, Ot = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: -r / 2, y: 0 },
    { x: l, y: 0 },
    { x: l, y: -r },
    { x: -r / 2, y: -r },
    { x: 0, y: -r / 2 }
  ];
  return I(e, l, r, s).attr("style", t.style), t.width = l + r, t.height = r, t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, Wt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(a, t, _(t), !0), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: -2 * r / 6, y: 0 },
    { x: l - r / 6, y: 0 },
    { x: l + 2 * r / 6, y: -r },
    { x: r / 6, y: -r }
  ], n = I(e, l, r, s);
  return n.attr("style", t.style), m(t, n), t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, Xt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: 2 * r / 6, y: 0 },
    { x: l + r / 6, y: 0 },
    { x: l - 2 * r / 6, y: -r },
    { x: -r / 6, y: -r }
  ], n = I(e, l, r, s);
  return n.attr("style", t.style), m(t, n), t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, Yt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: -2 * r / 6, y: 0 },
    { x: l + 2 * r / 6, y: 0 },
    { x: l - r / 6, y: -r },
    { x: r / 6, y: -r }
  ], n = I(e, l, r, s);
  return n.attr("style", t.style), m(t, n), t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, At = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: r / 6, y: 0 },
    { x: l - r / 6, y: 0 },
    { x: l + 2 * r / 6, y: -r },
    { x: -2 * r / 6, y: -r }
  ], n = I(e, l, r, s);
  return n.attr("style", t.style), m(t, n), t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, Dt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: 0, y: 0 },
    { x: l + r / 2, y: 0 },
    { x: l, y: -r / 2 },
    { x: l + r / 2, y: -r },
    { x: 0, y: -r }
  ], n = I(e, l, r, s);
  return n.attr("style", t.style), m(t, n), t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, jt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = l / 2, s = r / (2.5 + l / 50), n = i.height + s + t.padding, c = "M 0," + s + " a " + r + "," + s + " 0,0,0 " + l + " 0 a " + r + "," + s + " 0,0,0 " + -l + " 0 l 0," + n + " a " + r + "," + s + " 0,0,0 " + l + " 0 l 0," + -n, o = e.attr("label-offset-y", s).insert("path", ":first-child").attr("style", t.style).attr("d", c).attr("transform", "translate(" + -l / 2 + "," + -(n / 2 + s) + ")");
  return m(t, o), t.intersect = function(h) {
    const y = w.rect(t, h), p = y.x - t.x;
    if (r != 0 && (Math.abs(p) < t.width / 2 || Math.abs(p) == t.width / 2 && Math.abs(y.y - t.y) > t.height / 2 - s)) {
      let f = s * s * (1 - p * p / (r * r));
      f != 0 && (f = Math.sqrt(f)), f = s - f, h.y - t.y > 0 && (f = -f), y.y += f;
    }
    return y;
  }, e;
}, Ut = async (a, t) => {
  const { shapeSvg: e, bbox: i, halfPadding: l } = await M(
    a,
    t,
    "node " + t.classes + " " + t.class,
    !0
  ), r = e.insert("rect", ":first-child"), s = t.positioned ? t.width : i.width + t.padding, n = t.positioned ? t.height : i.height + t.padding, c = t.positioned ? -s / 2 : -i.width / 2 - l, o = t.positioned ? -n / 2 : -i.height / 2 - l;
  if (r.attr("class", "basic label-container").attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", c).attr("y", o).attr("width", s).attr("height", n), t.props) {
    const h = new Set(Object.keys(t.props));
    t.props.borders && (q(r, t.props.borders, s, n), h.delete("borders")), h.forEach((y) => {
      g.warn(`Unknown node property ${y}`);
    });
  }
  return m(t, r), t.intersect = function(h) {
    return w.rect(t, h);
  }, e;
}, zt = async (a, t) => {
  const { shapeSvg: e, bbox: i, halfPadding: l } = await M(
    a,
    t,
    "node " + t.classes,
    !0
  ), r = e.insert("rect", ":first-child"), s = t.positioned ? t.width : i.width + t.padding, n = t.positioned ? t.height : i.height + t.padding, c = t.positioned ? -s / 2 : -i.width / 2 - l, o = t.positioned ? -n / 2 : -i.height / 2 - l;
  if (r.attr("class", "basic cluster composite label-container").attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", c).attr("y", o).attr("width", s).attr("height", n), t.props) {
    const h = new Set(Object.keys(t.props));
    t.props.borders && (q(r, t.props.borders, s, n), h.delete("borders")), h.forEach((y) => {
      g.warn(`Unknown node property ${y}`);
    });
  }
  return m(t, r), t.intersect = function(h) {
    return w.rect(t, h);
  }, e;
}, Zt = async (a, t) => {
  const { shapeSvg: e } = await M(a, t, "label", !0);
  g.trace("Classes = ", t.class);
  const i = e.insert("rect", ":first-child"), l = 0, r = 0;
  if (i.attr("width", l).attr("height", r), e.attr("class", "label edgeLabel"), t.props) {
    const s = new Set(Object.keys(t.props));
    t.props.borders && (q(i, t.props.borders, l, r), s.delete("borders")), s.forEach((n) => {
      g.warn(`Unknown node property ${n}`);
    });
  }
  return m(t, i), t.intersect = function(s) {
    return w.rect(t, s);
  }, e;
};
function q(a, t, e, i) {
  const l = [], r = (n) => {
    l.push(n, 0);
  }, s = (n) => {
    l.push(0, n);
  };
  t.includes("t") ? (g.debug("add top border"), r(e)) : s(e), t.includes("r") ? (g.debug("add right border"), r(i)) : s(i), t.includes("b") ? (g.debug("add bottom border"), r(e)) : s(e), t.includes("l") ? (g.debug("add left border"), r(i)) : s(i), a.attr("stroke-dasharray", l.join(" "));
}
const Gt = (a, t) => {
  let e;
  t.classes ? e = "node " + t.classes : e = "node default";
  const i = a.insert("g").attr("class", e).attr("id", t.domId || t.id), l = i.insert("rect", ":first-child"), r = i.insert("line"), s = i.insert("g").attr("class", "label"), n = t.labelText.flat ? t.labelText.flat() : t.labelText;
  let c = "";
  typeof n == "object" ? c = n[0] : c = n, g.info("Label text abc79", c, n, typeof n == "object");
  const o = s.node().appendChild(R(c, t.labelStyle, !0, !0));
  let h = { width: 0, height: 0 };
  if (H(b().flowchart.htmlLabels)) {
    const k = o.children[0], d = B(o);
    h = k.getBoundingClientRect(), d.attr("width", h.width), d.attr("height", h.height);
  }
  g.info("Text 2", n);
  const y = n.slice(1, n.length);
  let p = o.getBBox();
  const f = s.node().appendChild(
    R(y.join ? y.join("<br/>") : y, t.labelStyle, !0, !0)
  );
  if (H(b().flowchart.htmlLabels)) {
    const k = f.children[0], d = B(f);
    h = k.getBoundingClientRect(), d.attr("width", h.width), d.attr("height", h.height);
  }
  const x = t.padding / 2;
  return B(f).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (h.width > p.width ? 0 : (p.width - h.width) / 2) + ", " + (p.height + x + 5) + ")"
  ), B(o).attr(
    "transform",
    "translate( " + // (titleBox.width - bbox.width) / 2 +
    (h.width < p.width ? 0 : -(p.width - h.width) / 2) + ", 0)"
  ), h = s.node().getBBox(), s.attr(
    "transform",
    "translate(" + -h.width / 2 + ", " + (-h.height / 2 - x + 3) + ")"
  ), l.attr("class", "outer title-state").attr("x", -h.width / 2 - x).attr("y", -h.height / 2 - x).attr("width", h.width + t.padding).attr("height", h.height + t.padding), r.attr("class", "divider").attr("x1", -h.width / 2 - x).attr("x2", h.width / 2 + x).attr("y1", -h.height / 2 - x + p.height + x).attr("y2", -h.height / 2 - x + p.height + x), m(t, l), t.intersect = function(k) {
    return w.rect(t, k);
  }, i;
}, Ft = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.height + t.padding, r = i.width + l / 4 + t.padding, s = e.insert("rect", ":first-child").attr("style", t.style).attr("rx", l / 2).attr("ry", l / 2).attr("x", -r / 2).attr("y", -l / 2).attr("width", r).attr("height", l);
  return m(t, s), t.intersect = function(n) {
    return w.rect(t, n);
  }, e;
}, Qt = async (a, t) => {
  const { shapeSvg: e, bbox: i, halfPadding: l } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), r = e.insert("circle", ":first-child");
  return r.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", i.width / 2 + l).attr("width", i.width + t.padding).attr("height", i.height + t.padding), g.info("Circle main"), m(t, r), t.intersect = function(s) {
    return g.info("Circle intersect", t, i.width / 2 + l, s), w.circle(t, i.width / 2 + l, s);
  }, e;
}, Vt = async (a, t) => {
  const { shapeSvg: e, bbox: i, halfPadding: l } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), r = 5, s = e.insert("g", ":first-child"), n = s.insert("circle"), c = s.insert("circle");
  return s.attr("class", t.class), n.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", i.width / 2 + l + r).attr("width", i.width + t.padding + r * 2).attr("height", i.height + t.padding + r * 2), c.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("r", i.width / 2 + l).attr("width", i.width + t.padding).attr("height", i.height + t.padding), g.info("DoubleCircle main"), m(t, n), t.intersect = function(o) {
    return g.info("DoubleCircle intersect", t, i.width / 2 + l + r, o), w.circle(t, i.width / 2 + l + r, o);
  }, e;
}, qt = async (a, t) => {
  const { shapeSvg: e, bbox: i } = await M(
    a,
    t,
    _(t, void 0),
    !0
  ), l = i.width + t.padding, r = i.height + t.padding, s = [
    { x: 0, y: 0 },
    { x: l, y: 0 },
    { x: l, y: -r },
    { x: 0, y: -r },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: l + 8, y: 0 },
    { x: l + 8, y: -r },
    { x: -8, y: -r },
    { x: -8, y: 0 }
  ], n = I(e, l, r, s);
  return n.attr("style", t.style), m(t, n), t.intersect = function(c) {
    return w.polygon(t, s, c);
  }, e;
}, Jt = (a, t) => {
  const e = a.insert("g").attr("class", "node default").attr("id", t.domId || t.id), i = e.insert("circle", ":first-child");
  return i.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), m(t, i), t.intersect = function(l) {
    return w.circle(t, 7, l);
  }, e;
}, tt = (a, t, e) => {
  const i = a.insert("g").attr("class", "node default").attr("id", t.domId || t.id);
  let l = 70, r = 10;
  e === "LR" && (l = 10, r = 70);
  const s = i.append("rect").attr("x", -1 * l / 2).attr("y", -1 * r / 2).attr("width", l).attr("height", r).attr("class", "fork-join");
  return m(t, s), t.height = t.height + t.padding / 2, t.width = t.width + t.padding / 2, t.intersect = function(n) {
    return w.rect(t, n);
  }, i;
}, Kt = (a, t) => {
  const e = a.insert("g").attr("class", "node default").attr("id", t.domId || t.id), i = e.insert("circle", ":first-child"), l = e.insert("circle", ":first-child");
  return l.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14), i.attr("class", "state-end").attr("r", 5).attr("width", 10).attr("height", 10), m(t, l), t.intersect = function(r) {
    return w.circle(t, 7, r);
  }, e;
}, Pt = (a, t) => {
  const e = t.padding / 2, i = 4, l = 8;
  let r;
  t.classes ? r = "node " + t.classes : r = "node default";
  const s = a.insert("g").attr("class", r).attr("id", t.domId || t.id), n = s.insert("rect", ":first-child"), c = s.insert("line"), o = s.insert("line");
  let h = 0, y = i;
  const p = s.insert("g").attr("class", "label");
  let f = 0;
  const x = t.classData.annotations && t.classData.annotations[0], k = t.classData.annotations[0] ? "«" + t.classData.annotations[0] + "»" : "", d = p.node().appendChild(R(k, t.labelStyle, !0, !0));
  let u = d.getBBox();
  if (H(b().flowchart.htmlLabels)) {
    const v = d.children[0], L = B(d);
    u = v.getBoundingClientRect(), L.attr("width", u.width), L.attr("height", u.height);
  }
  t.classData.annotations[0] && (y += u.height + i, h += u.width);
  let S = t.classData.label;
  t.classData.type !== void 0 && t.classData.type !== "" && (b().flowchart.htmlLabels ? S += "&lt;" + t.classData.type + "&gt;" : S += "<" + t.classData.type + ">");
  const E = p.node().appendChild(R(S, t.labelStyle, !0, !0));
  B(E).attr("class", "classTitle");
  let C = E.getBBox();
  if (H(b().flowchart.htmlLabels)) {
    const v = E.children[0], L = B(E);
    C = v.getBoundingClientRect(), L.attr("width", C.width), L.attr("height", C.height);
  }
  y += C.height + i, C.width > h && (h = C.width);
  const W = [];
  t.classData.members.forEach((v) => {
    const L = v.getDisplayDetails();
    let X = L.displayText;
    b().flowchart.htmlLabels && (X = X.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const N = p.node().appendChild(
      R(
        X,
        L.cssStyle ? L.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let $ = N.getBBox();
    if (H(b().flowchart.htmlLabels)) {
      const F = N.children[0], D = B(N);
      $ = F.getBoundingClientRect(), D.attr("width", $.width), D.attr("height", $.height);
    }
    $.width > h && (h = $.width), y += $.height + i, W.push(N);
  }), y += l;
  const A = [];
  if (t.classData.methods.forEach((v) => {
    const L = v.getDisplayDetails();
    let X = L.displayText;
    b().flowchart.htmlLabels && (X = X.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
    const N = p.node().appendChild(
      R(
        X,
        L.cssStyle ? L.cssStyle : t.labelStyle,
        !0,
        !0
      )
    );
    let $ = N.getBBox();
    if (H(b().flowchart.htmlLabels)) {
      const F = N.children[0], D = B(N);
      $ = F.getBoundingClientRect(), D.attr("width", $.width), D.attr("height", $.height);
    }
    $.width > h && (h = $.width), y += $.height + i, A.push(N);
  }), y += l, x) {
    let v = (h - u.width) / 2;
    B(d).attr(
      "transform",
      "translate( " + (-1 * h / 2 + v) + ", " + -1 * y / 2 + ")"
    ), f = u.height + i;
  }
  let nt = (h - C.width) / 2;
  return B(E).attr(
    "transform",
    "translate( " + (-1 * h / 2 + nt) + ", " + (-1 * y / 2 + f) + ")"
  ), f += C.height + i, c.attr("class", "divider").attr("x1", -h / 2 - e).attr("x2", h / 2 + e).attr("y1", -y / 2 - e + l + f).attr("y2", -y / 2 - e + l + f), f += l, W.forEach((v) => {
    B(v).attr(
      "transform",
      "translate( " + -h / 2 + ", " + (-1 * y / 2 + f + l / 2) + ")"
    );
    const L = v == null ? void 0 : v.getBBox();
    f += ((L == null ? void 0 : L.height) ?? 0) + i;
  }), f += l, o.attr("class", "divider").attr("x1", -h / 2 - e).attr("x2", h / 2 + e).attr("y1", -y / 2 - e + l + f).attr("y2", -y / 2 - e + l + f), f += l, A.forEach((v) => {
    B(v).attr(
      "transform",
      "translate( " + -h / 2 + ", " + (-1 * y / 2 + f) + ")"
    );
    const L = v == null ? void 0 : v.getBBox();
    f += ((L == null ? void 0 : L.height) ?? 0) + i;
  }), n.attr("style", t.style).attr("class", "outer title-state").attr("x", -h / 2 - e).attr("y", -(y / 2) - e).attr("width", h + t.padding).attr("height", y + t.padding), m(t, n), t.intersect = function(v) {
    return w.rect(t, v);
  }, s;
}, rt = {
  rhombus: P,
  composite: zt,
  question: P,
  rect: Ut,
  labelRect: Zt,
  rectWithTitle: Gt,
  choice: Ht,
  circle: Qt,
  doublecircle: Vt,
  stadium: Ft,
  hexagon: It,
  block_arrow: Nt,
  rect_left_inv_arrow: Ot,
  lean_right: Wt,
  lean_left: Xt,
  trapezoid: Yt,
  inv_trapezoid: At,
  rect_right_inv_arrow: Dt,
  cylinder: jt,
  start: Jt,
  end: Kt,
  note: $t,
  subroutine: qt,
  fork: tt,
  join: tt,
  class_box: Pt
};
let Y = {};
const or = async (a, t, e) => {
  let i, l;
  if (t.link) {
    let r;
    b().securityLevel === "sandbox" ? r = "_top" : t.linkTarget && (r = t.linkTarget || "_blank"), i = a.insert("svg:a").attr("xlink:href", t.link).attr("target", r), l = await rt[t.shape](i, t, e);
  } else
    l = await rt[t.shape](a, t, e), i = l;
  return t.tooltip && l.attr("title", t.tooltip), t.class && l.attr("class", "node default " + t.class), i.attr("data-node", "true"), i.attr("data-id", t.id), Y[t.id] = i, t.haveCallback && Y[t.id].attr("class", Y[t.id].attr("class") + " clickable"), i;
}, yr = (a, t) => {
  Y[t.id] = a;
}, fr = () => {
  Y = {};
}, pr = (a) => {
  const t = Y[a.id];
  g.trace(
    "Transforming node",
    a.diff,
    a,
    "translate(" + (a.x - a.width / 2 - 5) + ", " + a.width / 2 + ")"
  );
  const e = 8, i = a.diff || 0;
  return a.clusterNode ? t.attr(
    "transform",
    "translate(" + (a.x + i - a.width / 2) + ", " + (a.y - a.height / 2 - e) + ")"
  ) : t.attr("transform", "translate(" + a.x + ", " + a.y + ")"), i;
}, tr = ({
  flowchart: a
}) => {
  var l, r;
  const t = ((l = a == null ? void 0 : a.subGraphTitleMargin) == null ? void 0 : l.top) ?? 0, e = ((r = a == null ? void 0 : a.subGraphTitleMargin) == null ? void 0 : r.bottom) ?? 0, i = t + e;
  return {
    subGraphTitleTopMargin: t,
    subGraphTitleBottomMargin: e,
    subGraphTitleTotalMargin: i
  };
}, O = {
  aggregation: 18,
  extension: 18,
  composition: 18,
  dependency: 6,
  lollipop: 13.5,
  arrow_point: 5.3
};
function U(a, t) {
  if (a === void 0 || t === void 0)
    return { angle: 0, deltaX: 0, deltaY: 0 };
  a = Z(a), t = Z(t);
  const [e, i] = [a.x, a.y], [l, r] = [t.x, t.y], s = l - e, n = r - i;
  return { angle: Math.atan(n / s), deltaX: s, deltaY: n };
}
const Z = (a) => Array.isArray(a) ? { x: a[0], y: a[1] } : a, rr = (a) => ({
  x: function(t, e, i) {
    let l = 0;
    if (e === 0 && Object.hasOwn(O, a.arrowTypeStart)) {
      const { angle: r, deltaX: s } = U(i[0], i[1]);
      l = O[a.arrowTypeStart] * Math.cos(r) * (s >= 0 ? 1 : -1);
    } else if (e === i.length - 1 && Object.hasOwn(O, a.arrowTypeEnd)) {
      const { angle: r, deltaX: s } = U(
        i[i.length - 1],
        i[i.length - 2]
      );
      l = O[a.arrowTypeEnd] * Math.cos(r) * (s >= 0 ? 1 : -1);
    }
    return Z(t).x + l;
  },
  y: function(t, e, i) {
    let l = 0;
    if (e === 0 && Object.hasOwn(O, a.arrowTypeStart)) {
      const { angle: r, deltaY: s } = U(i[0], i[1]);
      l = O[a.arrowTypeStart] * Math.abs(Math.sin(r)) * (s >= 0 ? 1 : -1);
    } else if (e === i.length - 1 && Object.hasOwn(O, a.arrowTypeEnd)) {
      const { angle: r, deltaY: s } = U(
        i[i.length - 1],
        i[i.length - 2]
      );
      l = O[a.arrowTypeEnd] * Math.abs(Math.sin(r)) * (s >= 0 ? 1 : -1);
    }
    return Z(t).y + l;
  }
}), ar = (a, t, e, i, l) => {
  t.arrowTypeStart && at(a, "start", t.arrowTypeStart, e, i, l), t.arrowTypeEnd && at(a, "end", t.arrowTypeEnd, e, i, l);
}, er = {
  arrow_cross: "cross",
  arrow_point: "point",
  arrow_barb: "barb",
  arrow_circle: "circle",
  aggregation: "aggregation",
  extension: "extension",
  composition: "composition",
  dependency: "dependency",
  lollipop: "lollipop"
}, at = (a, t, e, i, l, r) => {
  const s = er[e];
  if (!s) {
    g.warn(`Unknown arrow type: ${e}`);
    return;
  }
  const n = t === "start" ? "Start" : "End";
  a.attr(`marker-${t}`, `url(${i}#${l}_${r}-${s}${n})`);
};
let G = {}, T = {};
const dr = () => {
  G = {}, T = {};
}, xr = (a, t) => {
  const e = H(b().flowchart.htmlLabels), i = t.labelType === "markdown" ? st(a, t.label, {
    style: t.labelStyle,
    useHtmlLabels: e,
    addSvgBackground: !0
  }) : R(t.label, t.labelStyle), l = a.insert("g").attr("class", "edgeLabel"), r = l.insert("g").attr("class", "label");
  r.node().appendChild(i);
  let s = i.getBBox();
  if (e) {
    const c = i.children[0], o = B(i);
    s = c.getBoundingClientRect(), o.attr("width", s.width), o.attr("height", s.height);
  }
  r.attr("transform", "translate(" + -s.width / 2 + ", " + -s.height / 2 + ")"), G[t.id] = l, t.width = s.width, t.height = s.height;
  let n;
  if (t.startLabelLeft) {
    const c = R(t.startLabelLeft, t.labelStyle), o = a.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    n = h.node().appendChild(c);
    const y = c.getBBox();
    h.attr("transform", "translate(" + -y.width / 2 + ", " + -y.height / 2 + ")"), T[t.id] || (T[t.id] = {}), T[t.id].startLeft = o, z(n, t.startLabelLeft);
  }
  if (t.startLabelRight) {
    const c = R(t.startLabelRight, t.labelStyle), o = a.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    n = o.node().appendChild(c), h.node().appendChild(c);
    const y = c.getBBox();
    h.attr("transform", "translate(" + -y.width / 2 + ", " + -y.height / 2 + ")"), T[t.id] || (T[t.id] = {}), T[t.id].startRight = o, z(n, t.startLabelRight);
  }
  if (t.endLabelLeft) {
    const c = R(t.endLabelLeft, t.labelStyle), o = a.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    n = h.node().appendChild(c);
    const y = c.getBBox();
    h.attr("transform", "translate(" + -y.width / 2 + ", " + -y.height / 2 + ")"), o.node().appendChild(c), T[t.id] || (T[t.id] = {}), T[t.id].endLeft = o, z(n, t.endLabelLeft);
  }
  if (t.endLabelRight) {
    const c = R(t.endLabelRight, t.labelStyle), o = a.insert("g").attr("class", "edgeTerminals"), h = o.insert("g").attr("class", "inner");
    n = h.node().appendChild(c);
    const y = c.getBBox();
    h.attr("transform", "translate(" + -y.width / 2 + ", " + -y.height / 2 + ")"), o.node().appendChild(c), T[t.id] || (T[t.id] = {}), T[t.id].endRight = o, z(n, t.endLabelRight);
  }
  return i;
};
function z(a, t) {
  b().flowchart.htmlLabels && a && (a.style.width = t.length * 9 + "px", a.style.height = "12px");
}
const gr = (a, t) => {
  g.debug("Moving label abc88 ", a.id, a.label, G[a.id], t);
  let e = t.updatedPath ? t.updatedPath : t.originalPath;
  const i = b(), { subGraphTitleTotalMargin: l } = tr(i);
  if (a.label) {
    const r = G[a.id];
    let s = a.x, n = a.y;
    if (e) {
      const c = j.calcLabelPosition(e);
      g.debug(
        "Moving label " + a.label + " from (",
        s,
        ",",
        n,
        ") to (",
        c.x,
        ",",
        c.y,
        ") abc88"
      ), t.updatedPath && (s = c.x, n = c.y);
    }
    r.attr("transform", `translate(${s}, ${n + l / 2})`);
  }
  if (a.startLabelLeft) {
    const r = T[a.id].startLeft;
    let s = a.x, n = a.y;
    if (e) {
      const c = j.calcTerminalLabelPosition(a.arrowTypeStart ? 10 : 0, "start_left", e);
      s = c.x, n = c.y;
    }
    r.attr("transform", `translate(${s}, ${n})`);
  }
  if (a.startLabelRight) {
    const r = T[a.id].startRight;
    let s = a.x, n = a.y;
    if (e) {
      const c = j.calcTerminalLabelPosition(
        a.arrowTypeStart ? 10 : 0,
        "start_right",
        e
      );
      s = c.x, n = c.y;
    }
    r.attr("transform", `translate(${s}, ${n})`);
  }
  if (a.endLabelLeft) {
    const r = T[a.id].endLeft;
    let s = a.x, n = a.y;
    if (e) {
      const c = j.calcTerminalLabelPosition(a.arrowTypeEnd ? 10 : 0, "end_left", e);
      s = c.x, n = c.y;
    }
    r.attr("transform", `translate(${s}, ${n})`);
  }
  if (a.endLabelRight) {
    const r = T[a.id].endRight;
    let s = a.x, n = a.y;
    if (e) {
      const c = j.calcTerminalLabelPosition(a.arrowTypeEnd ? 10 : 0, "end_right", e);
      s = c.x, n = c.y;
    }
    r.attr("transform", `translate(${s}, ${n})`);
  }
}, sr = (a, t) => {
  const e = a.x, i = a.y, l = Math.abs(t.x - e), r = Math.abs(t.y - i), s = a.width / 2, n = a.height / 2;
  return l >= s || r >= n;
}, ir = (a, t, e) => {
  g.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(t)}
  insidePoint : ${JSON.stringify(e)}
  node        : x:${a.x} y:${a.y} w:${a.width} h:${a.height}`);
  const i = a.x, l = a.y, r = Math.abs(i - e.x), s = a.width / 2;
  let n = e.x < t.x ? s - r : s + r;
  const c = a.height / 2, o = Math.abs(t.y - e.y), h = Math.abs(t.x - e.x);
  if (Math.abs(l - t.y) * s > Math.abs(i - t.x) * c) {
    let y = e.y < t.y ? t.y - c - l : l - c - t.y;
    n = h * y / o;
    const p = {
      x: e.x < t.x ? e.x + n : e.x - h + n,
      y: e.y < t.y ? e.y + o - y : e.y - o + y
    };
    return n === 0 && (p.x = t.x, p.y = t.y), h === 0 && (p.x = t.x), o === 0 && (p.y = t.y), g.debug(`abc89 topp/bott calc, Q ${o}, q ${y}, R ${h}, r ${n}`, p), p;
  } else {
    e.x < t.x ? n = t.x - s - i : n = i - s - t.x;
    let y = o * n / h, p = e.x < t.x ? e.x + h - n : e.x - h + n, f = e.y < t.y ? e.y + y : e.y - y;
    return g.debug(`sides calc abc89, Q ${o}, q ${y}, R ${h}, r ${n}`, { _x: p, _y: f }), n === 0 && (p = t.x, f = t.y), h === 0 && (p = t.x), o === 0 && (f = t.y), { x: p, y: f };
  }
}, et = (a, t) => {
  g.debug("abc88 cutPathAtIntersect", a, t);
  let e = [], i = a[0], l = !1;
  return a.forEach((r) => {
    if (!sr(t, r) && !l) {
      const s = ir(t, i, r);
      let n = !1;
      e.forEach((c) => {
        n = n || c.x === s.x && c.y === s.y;
      }), e.some((c) => c.x === s.x && c.y === s.y) || e.push(s), l = !0;
    } else
      i = r, l || e.push(r);
  }), e;
}, ur = function(a, t, e, i, l, r, s) {
  let n = e.points;
  g.debug("abc88 InsertEdge: edge=", e, "e=", t);
  let c = !1;
  const o = r.node(t.v);
  var h = r.node(t.w);
  h != null && h.intersect && (o != null && o.intersect) && (n = n.slice(1, e.points.length - 1), n.unshift(o.intersect(n[0])), n.push(h.intersect(n[n.length - 1]))), e.toCluster && (g.debug("to cluster abc88", i[e.toCluster]), n = et(e.points, i[e.toCluster].node), c = !0), e.fromCluster && (g.debug("from cluster abc88", i[e.fromCluster]), n = et(n.reverse(), i[e.fromCluster].node).reverse(), c = !0);
  const y = n.filter((C) => !Number.isNaN(C.y));
  let p = lt;
  e.curve && (l === "graph" || l === "flowchart") && (p = e.curve);
  const { x: f, y: x } = rr(e), k = ct().x(f).y(x).curve(p);
  let d;
  switch (e.thickness) {
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
  switch (e.pattern) {
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
  const u = a.append("path").attr("d", k(y)).attr("id", e.id).attr("class", " " + d + (e.classes ? " " + e.classes : "")).attr("style", e.style);
  let S = "";
  (b().flowchart.arrowMarkerAbsolute || b().state.arrowMarkerAbsolute) && (S = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, S = S.replace(/\(/g, "\\("), S = S.replace(/\)/g, "\\)")), ar(u, e, S, s, l);
  let E = {};
  return c && (E.updatedPath = n), E.originalPath = e.points, E;
};
export {
  hr as a,
  fr as b,
  R as c,
  dr as d,
  or as e,
  xr as f,
  tr as g,
  ur as h,
  Bt as i,
  gr as j,
  rr as k,
  M as l,
  ar as m,
  pr as p,
  yr as s,
  m as u
};
