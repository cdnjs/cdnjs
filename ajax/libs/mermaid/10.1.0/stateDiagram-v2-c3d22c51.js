import { D as Q, a as U, b as X, S as Z, c as j, e as I, p as tt, d as B, s as et } from "./styles-55de9f38.js";
import { G as ot } from "./layout-492ec81d.js";
import { l as a, g, h as x, f as G } from "./commonDb-41f8b4c5.js";
import { r as st } from "./index-6271e032.js";
import { u as nt, v as ct } from "./utils-8ea37061.js";
import "./mermaidAPI-67f627de.js";
import "./edges-de377bae.js";
import "./createText-23817c58.js";
import "./svgDraw-0a992cdb.js";
import "./line-05ccbb85.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
const h = "rect", C = "rectWithTitle", it = "start", rt = "end", lt = "divider", at = "roundedWithTitle", dt = "note", Et = "noteGroup", u = "statediagram", St = "state", Tt = `${u}-${St}`, V = "transition", pt = "note", ut = "note-edge", _t = `${V} ${ut}`, ft = `${u}-${pt}`, Dt = "cluster", At = `${u}-${Dt}`, bt = "cluster-alt", ht = `${u}-${bt}`, Y = "parent", W = "note", yt = "state", N = "----", gt = `${N}${W}`, H = `${N}${Y}`, m = "fill:none", z = "fill: #333", q = "c", K = "text", F = "normal";
let y = {}, E = 0;
const Rt = function(t) {
  const n = Object.keys(t);
  for (const o of n)
    t[o];
}, xt = function(t, n) {
  a.trace("Extracting classes"), n.db.clear();
  try {
    return n.parser.parse(t), n.db.extract(n.db.getRootDocV2()), n.db.getClasses();
  } catch (o) {
    return o;
  }
};
function Ct(t) {
  return t == null ? "" : t.classes ? t.classes.join(" ") : "";
}
function $(t = "", n = 0, o = "", c = N) {
  const i = o !== null && o.length > 0 ? `${c}${o}` : "";
  return `${yt}-${t}${i}-${n}`;
}
const D = (t, n, o, c, i, r) => {
  const e = o.id, _ = Ct(c[e]);
  if (e !== "root") {
    let T = h;
    o.start === !0 && (T = it), o.start === !1 && (T = rt), o.type !== U && (T = o.type), y[e] || (y[e] = {
      id: e,
      shape: T,
      description: G.sanitizeText(e, g()),
      classes: `${_} ${Tt}`
    });
    const s = y[e];
    o.description && (Array.isArray(s.description) ? (s.shape = C, s.description.push(o.description)) : s.description.length > 0 ? (s.shape = C, s.description === e ? s.description = [o.description] : s.description = [s.description, o.description]) : (s.shape = h, s.description = o.description), s.description = G.sanitizeTextOrArray(s.description, g())), s.description.length === 1 && s.shape === C && (s.shape = h), !s.type && o.doc && (a.info("Setting cluster for ", e, w(o)), s.type = "group", s.dir = w(o), s.shape = o.type === X ? lt : at, s.classes = s.classes + " " + At + " " + (r ? ht : ""));
    const p = {
      labelStyle: "",
      shape: s.shape,
      labelText: s.description,
      // typeof newNode.description === 'object'
      //   ? newNode.description[0]
      //   : newNode.description,
      classes: s.classes,
      style: "",
      //styles.style,
      id: e,
      dir: s.dir,
      domId: $(e, E),
      type: s.type,
      padding: 15
      //getConfig().flowchart.padding
    };
    if (p.centerLabel = !0, o.note) {
      const d = {
        labelStyle: "",
        shape: dt,
        labelText: o.note.text,
        classes: ft,
        // useHtmlLabels: false,
        style: "",
        // styles.style,
        id: e + gt + "-" + E,
        domId: $(e, E, W),
        type: s.type,
        padding: 15
        //getConfig().flowchart.padding
      }, A = {
        labelStyle: "",
        shape: Et,
        labelText: o.note.text,
        classes: s.classes,
        style: "",
        // styles.style,
        id: e + H,
        domId: $(e, E, Y),
        type: "group",
        padding: 0
        //getConfig().flowchart.padding
      };
      E++;
      const l = e + H;
      t.setNode(l, A), t.setNode(d.id, d), t.setNode(e, p), t.setParent(e, l), t.setParent(d.id, l);
      let b = e, S = d.id;
      o.note.position === "left of" && (b = d.id, S = e), t.setEdge(b, S, {
        arrowhead: "none",
        arrowType: "",
        style: m,
        labelStyle: "",
        classes: _t,
        arrowheadStyle: z,
        labelpos: q,
        labelType: K,
        thickness: F
      });
    } else
      t.setNode(e, p);
  }
  n && n.id !== "root" && (a.trace("Setting node ", e, " to be child of its parent ", n.id), t.setParent(e, n.id)), o.doc && (a.trace("Adding nodes children "), $t(t, o, o.doc, c, i, !r));
}, $t = (t, n, o, c, i, r) => {
  a.trace("items", o), o.forEach((e) => {
    switch (e.stmt) {
      case j:
        D(t, n, e, c, i, r);
        break;
      case U:
        D(t, n, e, c, i, r);
        break;
      case Z:
        {
          D(t, n, e.state1, c, i, r), D(t, n, e.state2, c, i, r);
          const _ = {
            id: "edge" + E,
            arrowhead: "normal",
            arrowTypeEnd: "arrow_barb",
            style: m,
            labelStyle: "",
            label: G.sanitizeText(e.description, g()),
            arrowheadStyle: z,
            labelpos: q,
            labelType: K,
            thickness: F,
            classes: V
          };
          t.setEdge(e.state1.id, e.state2.id, _, E), E++;
        }
        break;
    }
  });
}, w = (t, n = I) => {
  let o = n;
  if (t.doc)
    for (let c = 0; c < t.doc.length; c++) {
      const i = t.doc[c];
      i.stmt === "dir" && (o = i.value);
    }
  return o;
}, Gt = function(t, n, o, c) {
  a.info("Drawing state diagram (v2)", n), y = {};
  let i = c.db.getDirection();
  i === void 0 && (i = Q);
  const { securityLevel: r, state: e } = g(), _ = e.nodeSpacing || 50, T = e.rankSpacing || 50;
  a.info(c.db.getRootDocV2()), c.db.extract(c.db.getRootDocV2()), a.info(c.db.getRootDocV2());
  const s = c.db.getStates(), p = new ot({
    multigraph: !0,
    compound: !0
  }).setGraph({
    rankdir: w(c.db.getRootDocV2()),
    nodesep: _,
    ranksep: T,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  });
  D(p, void 0, c.db.getRootDocV2(), s, c.db, !0);
  let d;
  r === "sandbox" && (d = x("#i" + n));
  const A = r === "sandbox" ? x(d.nodes()[0].contentDocument.body) : x("body"), l = A.select(`[id="${n}"]`), b = A.select("#" + n + " g");
  st(b, p, ["barb"], u, n);
  const S = 8;
  nt.insertTitle(l, "statediagramTitleText", e.titleTopMargin, c.db.getDiagramTitle());
  const L = l.node().getBBox(), P = L.width + S * 2, O = L.height + S * 2;
  l.attr("class", u);
  const k = l.node().getBBox();
  ct(l, O, P, e.useMaxWidth);
  const M = `${k.x - S} ${k.y - S} ${P} ${O}`;
  a.debug(`viewBox ${M}`), l.attr("viewBox", M);
  const J = document.querySelectorAll('[id="' + n + '"] .edgeLabel .label');
  for (const R of J) {
    const v = R.getBBox(), f = document.createElementNS("http://www.w3.org/2000/svg", h);
    f.setAttribute("rx", 0), f.setAttribute("ry", 0), f.setAttribute("width", v.width), f.setAttribute("height", v.height), R.insertBefore(f, R.firstChild);
  }
}, wt = {
  setConf: Rt,
  getClasses: xt,
  draw: Gt
}, Wt = {
  parser: tt,
  db: B,
  renderer: wt,
  styles: et,
  init: (t) => {
    t.state || (t.state = {}), t.state.arrowMarkerAbsolute = t.arrowMarkerAbsolute, B.clear();
  }
};
export {
  Wt as diagram
};
//# sourceMappingURL=stateDiagram-v2-c3d22c51.js.map
