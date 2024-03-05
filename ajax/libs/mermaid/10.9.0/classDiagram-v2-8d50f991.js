import { p as R, d as N, s as $ } from "./styles-4bdb8b48.js";
import { l as c, c as r, j as k, A as B, t as G, o as E, q as A, n as C, f as _ } from "./mermaid-00886c59.js";
import { G as q } from "./graph-dee88f0d.js";
import { r as z } from "./index-14a831a4.js";
import "./layout-03086fc5.js";
import "./clone-a4e35854.js";
import "./edges-4734986e.js";
import "./createText-0ee50ac4.js";
import "./line-79437661.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
const S = (o) => _.sanitizeText(o, r());
let v = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10,
  curve: void 0
};
const P = function(o, e, p, n) {
  const t = Object.keys(o);
  c.info("keys:", t), c.info(o), t.forEach(function(s) {
    var y, d;
    const l = o[s], i = {
      shape: "rect",
      id: l.id,
      domId: l.domId,
      labelText: S(l.id),
      labelStyle: "",
      style: "fill: none; stroke: black",
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: ((y = r().flowchart) == null ? void 0 : y.padding) ?? ((d = r().class) == null ? void 0 : d.padding)
    };
    e.setNode(l.id, i), I(l.classes, e, p, n, l.id), c.info("setNode", i);
  });
}, I = function(o, e, p, n, t) {
  const s = Object.keys(o);
  c.info("keys:", s), c.info(o), s.filter((l) => o[l].parent == t).forEach(function(l) {
    var u, m;
    const a = o[l], i = a.cssClasses.join(" "), y = E(a.styles), d = a.label ?? a.id, f = 0, h = "class_box", b = {
      labelStyle: y.labelStyle,
      shape: h,
      labelText: S(d),
      classData: a,
      rx: f,
      ry: f,
      class: i,
      style: y.style,
      id: a.id,
      domId: a.domId,
      tooltip: n.db.getTooltip(a.id, t) || "",
      haveCallback: a.haveCallback,
      link: a.link,
      width: a.type === "group" ? 500 : void 0,
      type: a.type,
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: ((u = r().flowchart) == null ? void 0 : u.padding) ?? ((m = r().class) == null ? void 0 : m.padding)
    };
    e.setNode(a.id, b), t && e.setParent(a.id, t), c.info("setNode", b);
  });
}, F = function(o, e, p, n) {
  c.info(o), o.forEach(function(t, s) {
    var m, g;
    const l = t, a = "", i = { labelStyle: "", style: "" }, y = l.text, d = 0, f = "note", h = {
      labelStyle: i.labelStyle,
      shape: f,
      labelText: S(y),
      noteData: l,
      rx: d,
      ry: d,
      class: a,
      style: i.style,
      id: l.id,
      domId: l.id,
      tooltip: "",
      type: "note",
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: ((m = r().flowchart) == null ? void 0 : m.padding) ?? ((g = r().class) == null ? void 0 : g.padding)
    };
    if (e.setNode(l.id, h), c.info("setNode", h), !l.class || !(l.class in n))
      return;
    const b = p + s, u = {
      id: `edgeNote${b}`,
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
      curve: A(v.curve, C)
    };
    e.setEdge(l.id, l.class, u, b);
  });
}, H = function(o, e) {
  const p = r().flowchart;
  let n = 0;
  o.forEach(function(t) {
    var l;
    n++;
    const s = {
      //Set relationship style and line type
      classes: "relation",
      pattern: t.relation.lineType == 1 ? "dashed" : "solid",
      id: `id_${t.id1}_${t.id2}_${n}`,
      // Set link type for rendering
      arrowhead: t.type === "arrow_open" ? "none" : "normal",
      //Set edge extra labels
      startLabelRight: t.relationTitle1 === "none" ? "" : t.relationTitle1,
      endLabelLeft: t.relationTitle2 === "none" ? "" : t.relationTitle2,
      //Set relation arrow types
      arrowTypeStart: D(t.relation.type1),
      arrowTypeEnd: D(t.relation.type2),
      style: "fill:none",
      labelStyle: "",
      curve: A(p == null ? void 0 : p.curve, C)
    };
    if (c.info(s, t), t.style !== void 0) {
      const a = E(t.style);
      s.style = a.style, s.labelStyle = a.labelStyle;
    }
    t.text = t.title, t.text === void 0 ? t.style !== void 0 && (s.arrowheadStyle = "fill: #333") : (s.arrowheadStyle = "fill: #333", s.labelpos = "c", ((l = r().flowchart) == null ? void 0 : l.htmlLabels) ?? r().htmlLabels ? (s.labelType = "html", s.label = '<span class="edgeLabel">' + t.text + "</span>") : (s.labelType = "text", s.label = t.text.replace(_.lineBreakRegex, `
`), t.style === void 0 && (s.style = s.style || "stroke: #333; stroke-width: 1.5px;fill:none"), s.labelStyle = s.labelStyle.replace("color:", "fill:"))), e.setEdge(t.id1, t.id2, s, n);
  });
}, V = function(o) {
  v = {
    ...v,
    ...o
  };
}, W = async function(o, e, p, n) {
  c.info("Drawing class - ", e);
  const t = r().flowchart ?? r().class, s = r().securityLevel;
  c.info("config:", t);
  const l = (t == null ? void 0 : t.nodeSpacing) ?? 50, a = (t == null ? void 0 : t.rankSpacing) ?? 50, i = new q({
    multigraph: !0,
    compound: !0
  }).setGraph({
    rankdir: n.db.getDirection(),
    nodesep: l,
    ranksep: a,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  }), y = n.db.getNamespaces(), d = n.db.getClasses(), f = n.db.getRelations(), h = n.db.getNotes();
  c.info(f), P(y, i, e, n), I(d, i, e, n), H(f, i), F(h, i, f.length + 1, d);
  let b;
  s === "sandbox" && (b = k("#i" + e));
  const u = s === "sandbox" ? k(b.nodes()[0].contentDocument.body) : k("body"), m = u.select(`[id="${e}"]`), g = u.select("#" + e + " g");
  if (await z(
    g,
    i,
    ["aggregation", "extension", "composition", "dependency", "lollipop"],
    "classDiagram",
    e
  ), B.insertTitle(m, "classTitleText", (t == null ? void 0 : t.titleTopMargin) ?? 5, n.db.getDiagramTitle()), G(i, m, t == null ? void 0 : t.diagramPadding, t == null ? void 0 : t.useMaxWidth), !(t != null && t.htmlLabels)) {
    const T = s === "sandbox" ? b.nodes()[0].contentDocument : document, M = T.querySelectorAll('[id="' + e + '"] .edgeLabel .label');
    for (const w of M) {
      const L = w.getBBox(), x = T.createElementNS("http://www.w3.org/2000/svg", "rect");
      x.setAttribute("rx", 0), x.setAttribute("ry", 0), x.setAttribute("width", L.width), x.setAttribute("height", L.height), w.insertBefore(x, w.firstChild);
    }
  }
};
function D(o) {
  let e;
  switch (o) {
    case 0:
      e = "aggregation";
      break;
    case 1:
      e = "extension";
      break;
    case 2:
      e = "composition";
      break;
    case 3:
      e = "dependency";
      break;
    case 4:
      e = "lollipop";
      break;
    default:
      e = "none";
  }
  return e;
}
const J = {
  setConf: V,
  draw: W
}, ot = {
  parser: R,
  db: N,
  renderer: J,
  styles: $,
  init: (o) => {
    o.class || (o.class = {}), o.class.arrowMarkerAbsolute = o.arrowMarkerAbsolute, N.clear();
  }
};
export {
  ot as diagram
};
