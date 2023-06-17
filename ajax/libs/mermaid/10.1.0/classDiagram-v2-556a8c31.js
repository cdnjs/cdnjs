import { p as M, d as k, s as B } from "./styles-b64b35cd.js";
import { l as p, g as r, h as v, f as C } from "./commonDb-41f8b4c5.js";
import { G as R } from "./layout-492ec81d.js";
import { r as G } from "./index-6271e032.js";
import { u as I, B as _, A as D, y as A, z } from "./utils-8ea37061.js";
import "./mermaidAPI-67f627de.js";
import "./edges-de377bae.js";
import "./createText-23817c58.js";
import "./svgDraw-0a992cdb.js";
import "./line-05ccbb85.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
const E = (o) => C.sanitizeText(o, r());
let S = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10,
  curve: void 0
};
const $ = function(o, l, b, a) {
  const e = Object.keys(o);
  p.info("keys:", e), p.info(o), e.forEach(function(s) {
    var y, f;
    const t = o[s];
    let i = "";
    t.cssClasses.length > 0 && (i = i + " " + t.cssClasses.join(" "));
    const n = { labelStyle: "", style: "" }, m = t.label ?? t.id, c = 0, u = "class_box", d = {
      labelStyle: n.labelStyle,
      shape: u,
      labelText: E(m),
      classData: t,
      rx: c,
      ry: c,
      class: i,
      style: n.style,
      id: t.id,
      domId: t.domId,
      tooltip: a.db.getTooltip(t.id) || "",
      haveCallback: t.haveCallback,
      link: t.link,
      width: t.type === "group" ? 500 : void 0,
      type: t.type,
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: ((y = r().flowchart) == null ? void 0 : y.padding) ?? ((f = r().class) == null ? void 0 : f.padding)
    };
    l.setNode(t.id, d), p.info("setNode", d);
  });
}, q = function(o, l, b, a) {
  p.info(o), o.forEach(function(e, s) {
    var x, h;
    const t = e, i = "", n = { labelStyle: "", style: "" }, m = t.text, c = 0, u = "note", d = {
      labelStyle: n.labelStyle,
      shape: u,
      labelText: E(m),
      noteData: t,
      rx: c,
      ry: c,
      class: i,
      style: n.style,
      id: t.id,
      domId: t.id,
      tooltip: "",
      type: "note",
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: ((x = r().flowchart) == null ? void 0 : x.padding) ?? ((h = r().class) == null ? void 0 : h.padding)
    };
    if (l.setNode(t.id, d), p.info("setNode", d), !t.class || !(t.class in a))
      return;
    const y = b + s, f = {
      id: `edgeNote${y}`,
      //Set relationship style and line type
      classes: "relation",
      pattern: "dotted",
      // Set link type for rendering
      arrowhead: "none",
      //Set edge extra labels
      startLabelRight: "",
      endLabelLeft: "",
      //Set relation arrow types
      arrowTypeStart: "none",
      arrowTypeEnd: "none",
      style: "fill:none",
      labelStyle: "",
      curve: D(S.curve, A)
    };
    l.setEdge(t.id, t.class, f, y);
  });
}, F = function(o, l) {
  const b = r().flowchart;
  let a = 0;
  o.forEach(function(e) {
    var t;
    a++;
    const s = {
      //Set relationship style and line type
      classes: "relation",
      pattern: e.relation.lineType == 1 ? "dashed" : "solid",
      id: "id" + a,
      // Set link type for rendering
      arrowhead: e.type === "arrow_open" ? "none" : "normal",
      //Set edge extra labels
      startLabelRight: e.relationTitle1 === "none" ? "" : e.relationTitle1,
      endLabelLeft: e.relationTitle2 === "none" ? "" : e.relationTitle2,
      //Set relation arrow types
      arrowTypeStart: L(e.relation.type1),
      arrowTypeEnd: L(e.relation.type2),
      style: "fill:none",
      labelStyle: "",
      curve: D(b == null ? void 0 : b.curve, A)
    };
    if (p.info(s, e), e.style !== void 0) {
      const i = z(e.style);
      s.style = i.style, s.labelStyle = i.labelStyle;
    }
    e.text = e.title, e.text === void 0 ? e.style !== void 0 && (s.arrowheadStyle = "fill: #333") : (s.arrowheadStyle = "fill: #333", s.labelpos = "c", ((t = r().flowchart) == null ? void 0 : t.htmlLabels) ?? r().htmlLabels ? (s.labelType = "html", s.label = '<span class="edgeLabel">' + e.text + "</span>") : (s.labelType = "text", s.label = e.text.replace(C.lineBreakRegex, `
`), e.style === void 0 && (s.style = s.style || "stroke: #333; stroke-width: 1.5px;fill:none"), s.labelStyle = s.labelStyle.replace("color:", "fill:"))), l.setEdge(e.id1, e.id2, s, a);
  });
}, H = function(o) {
  S = {
    ...S,
    ...o
  };
}, P = function(o, l, b, a) {
  p.info("Drawing class - ", l);
  const e = r().flowchart ?? r().class, s = r().securityLevel;
  p.info("config:", e);
  const t = (e == null ? void 0 : e.nodeSpacing) ?? 50, i = (e == null ? void 0 : e.rankSpacing) ?? 50, n = new R({
    multigraph: !0,
    compound: !0
  }).setGraph({
    rankdir: a.db.getDirection(),
    nodesep: t,
    ranksep: i,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  }), m = a.db.getClasses(), c = a.db.getRelations(), u = a.db.getNotes();
  p.info(c), $(m, n, l, a), F(c, n), q(u, n, c.length + 1, m);
  let d;
  s === "sandbox" && (d = v("#i" + l));
  const y = s === "sandbox" ? (
    // @ts-ignore Ignore type error for now
    v(d.nodes()[0].contentDocument.body)
  ) : v("body"), f = y.select(`[id="${l}"]`), x = y.select("#" + l + " g");
  if (G(
    x,
    n,
    ["aggregation", "extension", "composition", "dependency", "lollipop"],
    "classDiagram",
    l
  ), I.insertTitle(f, "classTitleText", (e == null ? void 0 : e.titleTopMargin) ?? 5, a.db.getDiagramTitle()), _(n, f, e == null ? void 0 : e.diagramPadding, e == null ? void 0 : e.useMaxWidth), !(e != null && e.htmlLabels)) {
    const h = s === "sandbox" ? d.nodes()[0].contentDocument : document, N = h.querySelectorAll('[id="' + l + '"] .edgeLabel .label');
    for (const w of N) {
      const T = w.getBBox(), g = h.createElementNS("http://www.w3.org/2000/svg", "rect");
      g.setAttribute("rx", 0), g.setAttribute("ry", 0), g.setAttribute("width", T.width), g.setAttribute("height", T.height), w.insertBefore(g, w.firstChild);
    }
  }
};
function L(o) {
  let l;
  switch (o) {
    case 0:
      l = "aggregation";
      break;
    case 1:
      l = "extension";
      break;
    case 2:
      l = "composition";
      break;
    case 3:
      l = "dependency";
      break;
    case 4:
      l = "lollipop";
      break;
    default:
      l = "none";
  }
  return l;
}
const V = {
  setConf: H,
  draw: P
}, se = {
  parser: M,
  db: k,
  renderer: V,
  styles: B,
  init: (o) => {
    o.class || (o.class = {}), o.class.arrowMarkerAbsolute = o.arrowMarkerAbsolute, k.clear();
  }
};
export {
  se as diagram
};
//# sourceMappingURL=classDiagram-v2-556a8c31.js.map
