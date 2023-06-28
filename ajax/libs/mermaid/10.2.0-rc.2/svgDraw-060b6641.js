import { B as k, x as E, l as f, C as B } from "./mermaid-72e0d5b8.js";
import { l as I } from "./line-c8edd8dc.js";
let T = 0;
const O = function(i, e, t, n, r) {
  const l = function(o) {
    switch (o) {
      case r.db.relationType.AGGREGATION:
        return "aggregation";
      case r.db.relationType.EXTENSION:
        return "extension";
      case r.db.relationType.COMPOSITION:
        return "composition";
      case r.db.relationType.DEPENDENCY:
        return "dependency";
      case r.db.relationType.LOLLIPOP:
        return "lollipop";
    }
  };
  e.points = e.points.filter((o) => !Number.isNaN(o.y));
  const a = e.points, g = I().x(function(o) {
    return o.x;
  }).y(function(o) {
    return o.y;
  }).curve(k), d = i.append("path").attr("d", g(a)).attr("id", "edge" + T).attr("class", "relation");
  let c = "";
  n.arrowMarkerAbsolute && (c = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, c = c.replace(/\(/g, "\\("), c = c.replace(/\)/g, "\\)")), t.relation.lineType == 1 && d.attr("class", "relation dashed-line"), t.relation.lineType == 10 && d.attr("class", "relation dotted-line"), t.relation.type1 !== "none" && d.attr(
    "marker-start",
    "url(" + c + "#" + l(t.relation.type1) + "Start)"
  ), t.relation.type2 !== "none" && d.attr(
    "marker-end",
    "url(" + c + "#" + l(t.relation.type2) + "End)"
  );
  let h, s;
  const p = e.points.length;
  let x = E.calcLabelPosition(e.points);
  h = x.x, s = x.y;
  let y, S, v, w;
  if (p % 2 !== 0 && p > 1) {
    let o = E.calcCardinalityPosition(
      t.relation.type1 !== "none",
      e.points,
      e.points[0]
    ), b = E.calcCardinalityPosition(
      t.relation.type2 !== "none",
      e.points,
      e.points[p - 1]
    );
    f.debug("cardinality_1_point " + JSON.stringify(o)), f.debug("cardinality_2_point " + JSON.stringify(b)), y = o.x, S = o.y, v = b.x, w = b.y;
  }
  if (t.title !== void 0) {
    const o = i.append("g").attr("class", "classLabel"), b = o.append("text").attr("class", "label").attr("x", h).attr("y", s).attr("fill", "red").attr("text-anchor", "middle").text(t.title);
    window.label = b;
    const u = b.node().getBBox();
    o.insert("rect", ":first-child").attr("class", "box").attr("x", u.x - n.padding / 2).attr("y", u.y - n.padding / 2).attr("width", u.width + n.padding).attr("height", u.height + n.padding);
  }
  f.info("Rendering relation " + JSON.stringify(t)), t.relationTitle1 !== void 0 && t.relationTitle1 !== "none" && i.append("g").attr("class", "cardinality").append("text").attr("class", "type1").attr("x", y).attr("y", S).attr("fill", "black").attr("font-size", "6").text(t.relationTitle1), t.relationTitle2 !== void 0 && t.relationTitle2 !== "none" && i.append("g").attr("class", "cardinality").append("text").attr("class", "type2").attr("x", v).attr("y", w).attr("fill", "black").attr("font-size", "6").text(t.relationTitle2), T++;
}, P = function(i, e, t, n) {
  f.debug("Rendering class ", e, t);
  const r = e.id, l = {
    id: r,
    label: e.id,
    width: 0,
    height: 0
  }, a = i.append("g").attr("id", n.db.lookUpDomId(r)).attr("class", "classGroup");
  let g;
  e.link ? g = a.append("svg:a").attr("xlink:href", e.link).attr("target", e.linkTarget).append("text").attr("y", t.textHeight + t.padding).attr("x", 0) : g = a.append("text").attr("y", t.textHeight + t.padding).attr("x", 0);
  let d = !0;
  e.annotations.forEach(function(m) {
    const H = g.append("tspan").text("«" + m + "»");
    d || H.attr("dy", t.textHeight), d = !1;
  });
  let c = M(e);
  const h = g.append("tspan").text(c).attr("class", "title");
  d || h.attr("dy", t.textHeight);
  const s = g.node().getBBox().height, p = a.append("line").attr("x1", 0).attr("y1", t.padding + s + t.dividerMargin / 2).attr("y2", t.padding + s + t.dividerMargin / 2), x = a.append("text").attr("x", t.padding).attr("y", s + t.dividerMargin + t.textHeight).attr("fill", "white").attr("class", "classText");
  d = !0, e.members.forEach(function(m) {
    C(x, m, d, t), d = !1;
  });
  const y = x.node().getBBox(), S = a.append("line").attr("x1", 0).attr("y1", t.padding + s + t.dividerMargin + y.height).attr("y2", t.padding + s + t.dividerMargin + y.height), v = a.append("text").attr("x", t.padding).attr("y", s + 2 * t.dividerMargin + y.height + t.textHeight).attr("fill", "white").attr("class", "classText");
  d = !0, e.methods.forEach(function(m) {
    C(v, m, d, t), d = !1;
  });
  const w = a.node().getBBox();
  var o = " ";
  e.cssClasses.length > 0 && (o = o + e.cssClasses.join(" "));
  const u = a.insert("rect", ":first-child").attr("x", 0).attr("y", 0).attr("width", w.width + 2 * t.padding).attr("height", w.height + t.padding + 0.5 * t.dividerMargin).attr("class", o).node().getBBox().width;
  return g.node().childNodes.forEach(function(m) {
    m.setAttribute("x", (u - m.getBBox().width) / 2);
  }), e.tooltip && g.insert("title").text(e.tooltip), p.attr("x2", u), S.attr("x2", u), l.width = u, l.height = w.height + t.padding + 0.5 * t.dividerMargin, l;
}, M = function(i) {
  let e = i.id;
  return i.type && (e += "<" + i.type + ">"), e;
}, L = function(i, e, t, n) {
  f.debug("Rendering note ", e, t);
  const r = e.id, l = {
    id: r,
    text: e.text,
    width: 0,
    height: 0
  }, a = i.append("g").attr("id", r).attr("class", "classGroup");
  let g = a.append("text").attr("y", t.textHeight + t.padding).attr("x", 0);
  const d = JSON.parse(`"${e.text}"`).split(`
`);
  d.forEach(function(p) {
    f.debug(`Adding line: ${p}`), g.append("tspan").text(p).attr("class", "title").attr("dy", t.textHeight);
  });
  const c = a.node().getBBox(), s = a.insert("rect", ":first-child").attr("x", 0).attr("y", 0).attr("width", c.width + 2 * t.padding).attr(
    "height",
    c.height + d.length * t.textHeight + t.padding + 0.5 * t.dividerMargin
  ).node().getBBox().width;
  return g.node().childNodes.forEach(function(p) {
    p.setAttribute("x", (s - p.getBBox().width) / 2);
  }), l.width = s, l.height = c.height + d.length * t.textHeight + t.padding + 0.5 * t.dividerMargin, l;
}, _ = function(i) {
  const e = /^([#+~-])?(\w+)(~\w+~|\[])?\s+(\w+) *([$*])?$/, t = /^([#+|~-])?(\w+) *\( *(.*)\) *([$*])? *(\w*[[\]|~]*\s*\w*~?)$/;
  let n = i.match(e), r = i.match(t);
  return n && !r ? R(n) : r ? A(r) : $(i);
}, R = function(i) {
  let e = "", t = "";
  try {
    let n = i[1] ? i[1].trim() : "", r = i[2] ? i[2].trim() : "", l = i[3] ? B(i[3].trim()) : "", a = i[4] ? i[4].trim() : "", g = i[5] ? i[5].trim() : "";
    t = n + r + l + " " + a, e = N(g);
  } catch {
    t = i;
  }
  return {
    displayText: t,
    cssStyle: e
  };
}, A = function(i) {
  let e = "", t = "";
  try {
    let n = i[1] ? i[1].trim() : "", r = i[2] ? i[2].trim() : "", l = i[3] ? B(i[3].trim()) : "", a = i[4] ? i[4].trim() : "", g = i[5] ? " : " + B(i[5]).trim() : "";
    t = n + r + "(" + l + ")" + g, e = N(a);
  } catch {
    t = i;
  }
  return {
    displayText: t,
    cssStyle: e
  };
}, $ = function(i) {
  let e = "", t = "", n = "", r = "", l = i.substring(0, 1), a = i.substring(i.length - 1, i.length);
  l.match(/[#+~-]/) && (r = l);
  let g = /[\s\w)~]/;
  a.match(g) || (t = N(a));
  let d = r === "" ? 0 : 1, c = t === "" ? i.length : i.length - 1;
  i = i.substring(d, c);
  let h = i.indexOf("("), s = i.indexOf(")");
  if (h > 1 && s > h && s <= i.length) {
    let p = i.substring(0, h).trim();
    const x = i.substring(h + 1, s);
    if (e = r + p + "(" + B(x.trim()) + ")", s < i.length) {
      let y = i.substring(s + 1, s + 2);
      t === "" && !y.match(g) ? (t = N(y), n = i.substring(s + 2).trim()) : n = i.substring(s + 1).trim(), n !== "" && (n.charAt(0) === ":" && (n = n.substring(1).trim()), n = " : " + B(n), e += n);
    }
  } else
    e = B(i);
  return {
    displayText: e,
    cssStyle: t
  };
}, C = function(i, e, t, n) {
  let r = _(e);
  const l = i.append("tspan").attr("x", n.padding).text(r.displayText);
  r.cssStyle !== "" && l.attr("style", r.cssStyle), t || l.attr("dy", n.textHeight);
}, N = function(i) {
  switch (i) {
    case "*":
      return "font-style:italic;";
    case "$":
      return "text-decoration:underline;";
    default:
      return "";
  }
}, F = {
  getClassTitleString: M,
  drawClass: P,
  drawEdge: O,
  drawNote: L,
  parseMember: _
};
export {
  _ as p,
  F as s
};
