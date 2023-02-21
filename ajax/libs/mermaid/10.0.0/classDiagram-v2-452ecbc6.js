import { p as _, d as L, s as I } from "./styles-7ff74f5d.js";
import { l as d, g as y, f as k, e as C } from "./config-0b7a4e7d.js";
import { G as M } from "./index-7f531408.js";
import { r as R } from "./index-88b1ee15.js";
import { u as B, z as g, x, y as G } from "./utils-c190d844.js";
import { s as $ } from "./setupGraphViewbox-a7344a0b.js";
import "./mermaidAPI-f2dd6058.js";
import "./errorRenderer-89ef1884.js";
import "./commonDb-9eb4b6e7.js";
import "./isPlainObject-0b348591.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./edges-69864166.js";
import "./svgDraw-1c03c25e.js";
const D = (s) => C.sanitizeText(s, y());
let E = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10
};
const z = function(s, a, f, r) {
  const t = Object.keys(s);
  d.info("keys:", t), d.info(s), t.forEach(function(l) {
    const e = s[l];
    let c = "";
    e.cssClasses.length > 0 && (c = c + " " + e.cssClasses.join(" "));
    const o = { labelStyle: "" };
    let b = e.text !== void 0 ? e.text : e.id, i = 0, p = "";
    switch (e.type) {
      case "class":
        p = "class_box";
        break;
      default:
        p = "class_box";
    }
    a.setNode(e.id, {
      labelStyle: o.labelStyle,
      shape: p,
      labelText: D(b),
      classData: e,
      rx: i,
      ry: i,
      class: c,
      style: o.style,
      id: e.id,
      domId: e.domId,
      tooltip: r.db.getTooltip(e.id) || "",
      haveCallback: e.haveCallback,
      link: e.link,
      width: e.type === "group" ? 500 : void 0,
      type: e.type,
      padding: y().flowchart.padding
    }), d.info("setNode", {
      labelStyle: o.labelStyle,
      shape: p,
      labelText: b,
      rx: i,
      ry: i,
      class: c,
      style: o.style,
      id: e.id,
      width: e.type === "group" ? 500 : void 0,
      type: e.type,
      padding: y().flowchart.padding
    });
  });
}, J = function(s, a, f, r) {
  d.info(s), s.forEach(function(t, l) {
    const e = t;
    let c = "";
    const o = { labelStyle: "", style: "" };
    let b = e.text, i = 0, p = "note";
    if (a.setNode(e.id, {
      labelStyle: o.labelStyle,
      shape: p,
      labelText: D(b),
      noteData: e,
      rx: i,
      ry: i,
      class: c,
      style: o.style,
      id: e.id,
      domId: e.id,
      tooltip: "",
      type: "note",
      padding: y().flowchart.padding
    }), d.info("setNode", {
      labelStyle: o.labelStyle,
      shape: p,
      labelText: b,
      rx: i,
      ry: i,
      style: o.style,
      id: e.id,
      type: "note",
      padding: y().flowchart.padding
    }), !e.class || !(e.class in r))
      return;
    const u = f + l, n = {};
    n.classes = "relation", n.pattern = "dotted", n.id = `edgeNote${u}`, n.arrowhead = "none", d.info(`Note edge: ${JSON.stringify(n)}, ${JSON.stringify(e)}`), n.startLabelRight = "", n.endLabelLeft = "", n.arrowTypeStart = "none", n.arrowTypeEnd = "none";
    let m = "fill:none", w = "";
    n.style = m, n.labelStyle = w, n.curve = g(E.curve, x), a.setEdge(e.id, e.class, n, u);
  });
}, q = function(s, a) {
  const f = y().flowchart;
  let r = 0;
  s.forEach(function(t) {
    r++;
    const l = {};
    l.classes = "relation", l.pattern = t.relation.lineType == 1 ? "dashed" : "solid", l.id = "id" + r, t.type === "arrow_open" ? l.arrowhead = "none" : l.arrowhead = "normal", d.info(l, t), l.startLabelRight = t.relationTitle1 === "none" ? "" : t.relationTitle1, l.endLabelLeft = t.relationTitle2 === "none" ? "" : t.relationTitle2, l.arrowTypeStart = N(t.relation.type1), l.arrowTypeEnd = N(t.relation.type2);
    let e = "", c = "";
    if (t.style !== void 0) {
      const o = G(t.style);
      e = o.style, c = o.labelStyle;
    } else
      e = "fill:none";
    l.style = e, l.labelStyle = c, t.interpolate !== void 0 ? l.curve = g(t.interpolate, x) : s.defaultInterpolate !== void 0 ? l.curve = g(s.defaultInterpolate, x) : l.curve = g(f.curve, x), t.text = t.title, t.text === void 0 ? t.style !== void 0 && (l.arrowheadStyle = "fill: #333") : (l.arrowheadStyle = "fill: #333", l.labelpos = "c", y().flowchart.htmlLabels ? (l.labelType = "html", l.label = '<span class="edgeLabel">' + t.text + "</span>") : (l.labelType = "text", l.label = t.text.replace(C.lineBreakRegex, `
`), t.style === void 0 && (l.style = l.style || "stroke: #333; stroke-width: 1.5px;fill:none"), l.labelStyle = l.labelStyle.replace("color:", "fill:"))), a.setEdge(t.id1, t.id2, l, r);
  });
}, F = function(s) {
  Object.keys(s).forEach(function(f) {
    E[f] = s[f];
  });
}, H = function(s, a, f, r) {
  d.info("Drawing class - ", a);
  const t = y().flowchart, l = y().securityLevel;
  d.info("config:", t);
  const e = t.nodeSpacing || 50, c = t.rankSpacing || 50, o = new M({
    multigraph: !0,
    compound: !0
  }).setGraph({
    rankdir: r.db.getDirection(),
    nodesep: e,
    ranksep: c,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  }), b = r.db.getClasses(), i = r.db.getRelations(), p = r.db.getNotes();
  d.info(i), z(b, o, a, r), q(i, o), J(p, o, i.length + 1, b);
  let u;
  l === "sandbox" && (u = k("#i" + a));
  const n = l === "sandbox" ? k(u.nodes()[0].contentDocument.body) : k("body"), m = n.select(`[id="${a}"]`), w = n.select("#" + a + " g");
  if (R(
    w,
    o,
    ["aggregation", "extension", "composition", "dependency", "lollipop"],
    "classDiagram",
    a
  ), B.insertTitle(m, "classTitleText", t.titleTopMargin, r.db.getDiagramTitle()), $(o, m, t.diagramPadding, t.useMaxWidth), !t.htmlLabels) {
    const T = l === "sandbox" ? u.nodes()[0].contentDocument : document, A = T.querySelectorAll('[id="' + a + '"] .edgeLabel .label');
    for (const S of A) {
      const v = S.getBBox(), h = T.createElementNS("http://www.w3.org/2000/svg", "rect");
      h.setAttribute("rx", 0), h.setAttribute("ry", 0), h.setAttribute("width", v.width), h.setAttribute("height", v.height), S.insertBefore(h, S.firstChild);
    }
  }
};
function N(s) {
  let a;
  switch (s) {
    case 0:
      a = "aggregation";
      break;
    case 1:
      a = "extension";
      break;
    case 2:
      a = "composition";
      break;
    case 3:
      a = "dependency";
      break;
    case 4:
      a = "lollipop";
      break;
    default:
      a = "none";
  }
  return a;
}
const P = {
  setConf: F,
  draw: H
}, ae = {
  parser: _,
  db: L,
  renderer: P,
  styles: I,
  init: (s) => {
    s.class || (s.class = {}), s.class.arrowMarkerAbsolute = s.arrowMarkerAbsolute, L.clear();
  }
};
export {
  ae as diagram
};
//# sourceMappingURL=classDiagram-v2-452ecbc6.js.map
