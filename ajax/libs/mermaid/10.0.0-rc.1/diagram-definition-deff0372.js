import { l as p, s as I, g as G, i as V, a as O, b as H, e as q, c as J, d as U, f as K, h as R, j as D, k as Q, m as Z, n as X, p as Y } from "./mermaid-39873191.js";
const j = (t, r, e) => {
  const { parentById: a } = e, o = /* @__PURE__ */ new Set();
  let l = t;
  for (; l; ) {
    if (o.add(l), l === r)
      return l;
    l = a[l];
  }
  for (l = r; l; ) {
    if (o.has(l))
      return l;
    l = a[l];
  }
  return "root";
};
let P;
const E = {}, tt = {};
let _ = {};
const et = function(t, r, e, a, o, l, x) {
  const n = e.select(`[id="${r}"]`), y = n.insert("g").attr("class", "nodes");
  return Object.keys(t).forEach(function(h) {
    const i = t[h];
    let k = "default";
    i.classes.length > 0 && (k = i.classes.join(" "));
    const S = H(i.styles);
    let s = i.text !== void 0 ? i.text : i.id, u;
    const b = { width: 0, height: 0 };
    if (q(G().flowchart.htmlLabels)) {
      const f = {
        label: s.replace(
          /fa[blrs]?:fa-[\w-]+/g,
          (v) => `<i class='${v.replace(":", " ")}'></i>`
        )
      };
      u = J(n, f).node();
      const T = u.getBBox();
      b.width = T.width, b.height = T.height, b.labelNode = u, u.parentNode.removeChild(u);
    } else {
      const f = a.createElementNS("http://www.w3.org/2000/svg", "text");
      f.setAttribute("style", S.labelStyle.replace("color:", "fill:"));
      const T = s.split(U.lineBreakRegex);
      for (const F of T) {
        const L = a.createElementNS("http://www.w3.org/2000/svg", "tspan");
        L.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve"), L.setAttribute("dy", "1em"), L.setAttribute("x", "1"), L.textContent = F, f.appendChild(L);
      }
      u = f;
      const v = u.getBBox();
      b.width = v.width, b.height = v.height, b.labelNode = u;
    }
    const B = [
      {
        id: i.id + "-west",
        layoutOptions: {
          "port.side": "WEST"
        }
      },
      {
        id: i.id + "-east",
        layoutOptions: {
          "port.side": "EAST"
        }
      },
      {
        id: i.id + "-south",
        layoutOptions: {
          "port.side": "SOUTH"
        }
      },
      {
        id: i.id + "-north",
        layoutOptions: {
          "port.side": "NORTH"
        }
      }
    ];
    let g = 0, d = "", $ = {};
    switch (i.type) {
      case "round":
        g = 5, d = "rect";
        break;
      case "square":
        d = "rect";
        break;
      case "diamond":
        d = "question", $ = {
          portConstraints: "FIXED_SIDE"
        };
        break;
      case "hexagon":
        d = "hexagon";
        break;
      case "odd":
        d = "rect_left_inv_arrow";
        break;
      case "lean_right":
        d = "lean_right";
        break;
      case "lean_left":
        d = "lean_left";
        break;
      case "trapezoid":
        d = "trapezoid";
        break;
      case "inv_trapezoid":
        d = "inv_trapezoid";
        break;
      case "odd_right":
        d = "rect_left_inv_arrow";
        break;
      case "circle":
        d = "circle";
        break;
      case "ellipse":
        d = "ellipse";
        break;
      case "stadium":
        d = "stadium";
        break;
      case "subroutine":
        d = "subroutine";
        break;
      case "cylinder":
        d = "cylinder";
        break;
      case "group":
        d = "rect";
        break;
      case "doublecircle":
        d = "doublecircle";
        break;
      default:
        d = "rect";
    }
    const N = {
      labelStyle: S.labelStyle,
      shape: d,
      labelText: s,
      rx: g,
      ry: g,
      class: k,
      style: S.style,
      id: i.id,
      link: i.link,
      linkTarget: i.linkTarget,
      tooltip: o.db.getTooltip(i.id) || "",
      domId: o.db.lookUpDomId(i.id),
      haveCallback: i.haveCallback,
      width: i.type === "group" ? 500 : void 0,
      dir: i.dir,
      type: i.type,
      props: i.props,
      padding: G().flowchart.padding
    };
    let m, C;
    N.type !== "group" && (C = K(y, N, i.dir), m = C.node().getBBox());
    const w = {
      id: i.id,
      ports: i.type === "diamond" ? B : [],
      // labelStyle: styles.labelStyle,
      // shape: _shape,
      layoutOptions: $,
      labelText: s,
      labelData: b,
      // labels: [{ text: vertexText }],
      // rx: radius,
      // ry: radius,
      // class: classStr,
      // style: styles.style,
      // link: vertex.link,
      // linkTarget: vertex.linkTarget,
      // tooltip: diagObj.db.getTooltip(vertex.id) || '',
      domId: o.db.lookUpDomId(i.id),
      // haveCallback: vertex.haveCallback,
      width: m == null ? void 0 : m.width,
      height: m == null ? void 0 : m.height,
      // dir: vertex.dir,
      type: i.type,
      // props: vertex.props,
      // padding: getConfig().flowchart.padding,
      // boundingBox,
      el: C,
      parent: l.parentById[i.id]
    };
    _[N.id] = w;
  }), x;
}, A = (t, r, e) => {
  const a = {
    TB: {
      in: {
        north: "north"
      },
      out: {
        south: "west",
        west: "east",
        east: "south"
      }
    },
    LR: {
      in: {
        west: "west"
      },
      out: {
        east: "south",
        south: "north",
        north: "east"
      }
    },
    RL: {
      in: {
        east: "east"
      },
      out: {
        west: "north",
        north: "south",
        south: "west"
      }
    },
    BT: {
      in: {
        south: "south"
      },
      out: {
        north: "east",
        east: "west",
        west: "north"
      }
    }
  };
  return a.TD = a.TB, p.info("abc88", e, r, t), a[e][r][t];
}, z = (t, r, e) => {
  if (p.info("getNextPort abc88", { node: t, edgeDirection: r, graphDirection: e }), !E[t])
    switch (e) {
      case "TB":
      case "TD":
        E[t] = {
          inPosition: "north",
          outPosition: "south"
        };
        break;
      case "BT":
        E[t] = {
          inPosition: "south",
          outPosition: "north"
        };
        break;
      case "RL":
        E[t] = {
          inPosition: "east",
          outPosition: "west"
        };
        break;
      case "LR":
        E[t] = {
          inPosition: "west",
          outPosition: "east"
        };
        break;
    }
  const a = r === "in" ? E[t].inPosition : E[t].outPosition;
  return r === "in" ? E[t].inPosition = A(
    E[t].inPosition,
    r,
    e
  ) : E[t].outPosition = A(
    E[t].outPosition,
    r,
    e
  ), a;
}, rt = (t, r) => {
  let e = t.start, a = t.end;
  const o = _[e], l = _[a];
  return !o || !l ? { source: e, target: a } : (o.type === "diamond" && (e = `${e}-${z(e, "out", r)}`), l.type === "diamond" && (a = `${a}-${z(a, "in", r)}`), { source: e, target: a });
}, at = function(t, r, e, a) {
  p.info("abc78 edges = ", t);
  const o = a.insert("g").attr("class", "edgeLabels");
  let l = {}, x = r.db.getDirection(), n, y;
  if (t.defaultStyle !== void 0) {
    const c = H(t.defaultStyle);
    n = c.style, y = c.labelStyle;
  }
  return t.forEach(function(c) {
    var h = "L-" + c.start + "-" + c.end;
    l[h] === void 0 ? (l[h] = 0, p.info("abc78 new entry", h, l[h])) : (l[h]++, p.info("abc78 new entry", h, l[h]));
    let i = h + "-" + l[h];
    p.info("abc78 new link id to be used is", h, i, l[h]);
    var k = "LS-" + c.start, S = "LE-" + c.end;
    const s = { style: "", labelStyle: "" };
    switch (s.minlen = c.length || 1, c.type === "arrow_open" ? s.arrowhead = "none" : s.arrowhead = "normal", s.arrowTypeStart = "arrow_open", s.arrowTypeEnd = "arrow_open", c.type) {
      case "double_arrow_cross":
        s.arrowTypeStart = "arrow_cross";
      case "arrow_cross":
        s.arrowTypeEnd = "arrow_cross";
        break;
      case "double_arrow_point":
        s.arrowTypeStart = "arrow_point";
      case "arrow_point":
        s.arrowTypeEnd = "arrow_point";
        break;
      case "double_arrow_circle":
        s.arrowTypeStart = "arrow_circle";
      case "arrow_circle":
        s.arrowTypeEnd = "arrow_circle";
        break;
    }
    let u = "", b = "";
    switch (c.stroke) {
      case "normal":
        u = "fill:none;", n !== void 0 && (u = n), y !== void 0 && (b = y), s.thickness = "normal", s.pattern = "solid";
        break;
      case "dotted":
        s.thickness = "normal", s.pattern = "dotted", s.style = "fill:none;stroke-width:2px;stroke-dasharray:3;";
        break;
      case "thick":
        s.thickness = "thick", s.pattern = "solid", s.style = "stroke-width: 3.5px;fill:none;";
        break;
    }
    if (c.style !== void 0) {
      const $ = H(c.style);
      u = $.style, b = $.labelStyle;
    }
    s.style = s.style += u, s.labelStyle = s.labelStyle += b, c.interpolate !== void 0 ? s.curve = R(c.interpolate, D) : t.defaultInterpolate !== void 0 ? s.curve = R(t.defaultInterpolate, D) : s.curve = R(tt.curve, D), c.text === void 0 ? c.style !== void 0 && (s.arrowheadStyle = "fill: #333") : (s.arrowheadStyle = "fill: #333", s.labelpos = "c"), s.labelType = "text", s.label = c.text.replace(U.lineBreakRegex, `
`), c.style === void 0 && (s.style = s.style || "stroke: #333; stroke-width: 1.5px;fill:none;"), s.labelStyle = s.labelStyle.replace("color:", "fill:"), s.id = i, s.classes = "flowchart-link " + k + " " + S;
    const B = Q(o, s), { source: g, target: d } = rt(c, x);
    p.debug("abc78 source and target", g, d), e.edges.push({
      id: "e" + c.start + c.end,
      sources: [g],
      targets: [d],
      labelEl: B,
      labels: [
        {
          width: s.width,
          height: s.height,
          orgWidth: s.width,
          orgHeight: s.height,
          text: s.label,
          layoutOptions: {
            "edgeLabels.inline": "true",
            "edgeLabels.placement": "CENTER"
          }
        }
      ],
      edgeData: s
    });
  }), e;
}, st = function(t, r, e, a) {
  let o = "";
  switch (a && (o = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search, o = o.replace(/\(/g, "\\("), o = o.replace(/\)/g, "\\)")), r.arrowTypeStart) {
    case "arrow_cross":
      t.attr("marker-start", "url(" + o + "#" + e + "-crossStart)");
      break;
    case "arrow_point":
      t.attr("marker-start", "url(" + o + "#" + e + "-pointStart)");
      break;
    case "arrow_barb":
      t.attr("marker-start", "url(" + o + "#" + e + "-barbStart)");
      break;
    case "arrow_circle":
      t.attr("marker-start", "url(" + o + "#" + e + "-circleStart)");
      break;
    case "aggregation":
      t.attr("marker-start", "url(" + o + "#" + e + "-aggregationStart)");
      break;
    case "extension":
      t.attr("marker-start", "url(" + o + "#" + e + "-extensionStart)");
      break;
    case "composition":
      t.attr("marker-start", "url(" + o + "#" + e + "-compositionStart)");
      break;
    case "dependency":
      t.attr("marker-start", "url(" + o + "#" + e + "-dependencyStart)");
      break;
    case "lollipop":
      t.attr("marker-start", "url(" + o + "#" + e + "-lollipopStart)");
      break;
  }
  switch (r.arrowTypeEnd) {
    case "arrow_cross":
      t.attr("marker-end", "url(" + o + "#" + e + "-crossEnd)");
      break;
    case "arrow_point":
      t.attr("marker-end", "url(" + o + "#" + e + "-pointEnd)");
      break;
    case "arrow_barb":
      t.attr("marker-end", "url(" + o + "#" + e + "-barbEnd)");
      break;
    case "arrow_circle":
      t.attr("marker-end", "url(" + o + "#" + e + "-circleEnd)");
      break;
    case "aggregation":
      t.attr("marker-end", "url(" + o + "#" + e + "-aggregationEnd)");
      break;
    case "extension":
      t.attr("marker-end", "url(" + o + "#" + e + "-extensionEnd)");
      break;
    case "composition":
      t.attr("marker-end", "url(" + o + "#" + e + "-compositionEnd)");
      break;
    case "dependency":
      t.attr("marker-end", "url(" + o + "#" + e + "-dependencyEnd)");
      break;
    case "lollipop":
      t.attr("marker-end", "url(" + o + "#" + e + "-lollipopEnd)");
      break;
  }
}, ot = function(t, r) {
  p.info("Extracting classes"), r.db.clear("ver-2");
  try {
    return r.parse(t), r.db.getClasses();
  } catch {
    return {};
  }
}, lt = function(t) {
  const r = { parentById: {}, childrenById: {} }, e = t.getSubGraphs();
  return p.info("Subgraphs - ", e), e.forEach(function(a) {
    a.nodes.forEach(function(o) {
      r.parentById[o] = a.id, r.childrenById[a.id] === void 0 && (r.childrenById[a.id] = []), r.childrenById[a.id].push(o);
    });
  }), e.forEach(function(a) {
    a.id, r.parentById[a.id] !== void 0 && r.parentById[a.id];
  }), r;
}, nt = function(t, r, e) {
  const a = j(t, r, e);
  if (a === void 0 || a === "root")
    return { x: 0, y: 0 };
  const o = _[a].offset;
  return { x: o.posX, y: o.posY };
}, it = function(t, r, e, a, o) {
  const l = nt(r.sources[0], r.targets[0], o), x = r.sections[0].startPoint, n = r.sections[0].endPoint, c = (r.sections[0].bendPoints ? r.sections[0].bendPoints : []).map((b) => [b.x + l.x, b.y + l.y]), h = [
    [x.x + l.x, x.y + l.y],
    ...c,
    [n.x + l.x, n.y + l.y]
  ], i = Z().curve(D), k = t.insert("path").attr("d", i(h)).attr("class", "path").attr("fill", "none"), S = t.insert("g").attr("class", "edgeLabel"), s = I(S.node().appendChild(r.labelEl)), u = s.node().firstChild.getBoundingClientRect();
  s.attr("width", u.width), s.attr("height", u.height), S.attr(
    "transform",
    `translate(${r.labels[0].x + l.x}, ${r.labels[0].y + l.y})`
  ), st(k, e, a.type, a.arrowMarkerAbsolute);
}, M = (t, r) => {
  t.forEach((e) => {
    e.children || (e.children = []);
    const a = r.childrenById[e.id];
    a && a.forEach((o) => {
      e.children.push(_[o]);
    }), M(e.children, r);
  });
}, ct = async function(t, r, e, a) {
  var C;
  if (!P) {
    const w = (await import("./elk.bundled-c4da73e7.js").then((f) => f.e)).default;
    P = new w();
  }
  a.db.clear(), _ = {}, a.db.setGen("gen-2"), a.parser.parse(t);
  const o = I("body").append("div").attr("style", "height:400px").attr("id", "cy");
  let l = {
    id: "root",
    layoutOptions: {
      "elk.hierarchyHandling": "INCLUDE_CHILDREN",
      "org.eclipse.elk.padding": "[top=100, left=100, bottom=110, right=110]",
      "elk.layered.spacing.edgeNodeBetweenLayers": "30",
      // 'elk.layered.mergeEdges': 'true',
      "elk.direction": "DOWN"
      // 'elk.ports.sameLayerEdges': true,
      // 'nodePlacement.strategy': 'SIMPLE',
    },
    children: [],
    edges: []
  };
  switch (p.info("Drawing flowchart using v3 renderer", P), a.db.getDirection()) {
    case "BT":
      l.layoutOptions["elk.direction"] = "UP";
      break;
    case "TB":
      l.layoutOptions["elk.direction"] = "DOWN";
      break;
    case "LR":
      l.layoutOptions["elk.direction"] = "RIGHT";
      break;
    case "RL":
      l.layoutOptions["elk.direction"] = "LEFT";
      break;
  }
  const { securityLevel: n, flowchart: y } = G();
  let c;
  n === "sandbox" && (c = I("#i" + r));
  const h = n === "sandbox" ? I(c.nodes()[0].contentDocument.body) : I("body"), i = n === "sandbox" ? c.nodes()[0].contentDocument : document, k = h.select(`[id="${r}"]`);
  V(k, ["point", "circle", "cross"], a.type, a.arrowMarkerAbsolute);
  const s = a.db.getVertices();
  let u;
  const b = a.db.getSubGraphs();
  p.info("Subgraphs - ", b);
  for (let w = b.length - 1; w >= 0; w--)
    u = b[w], a.db.addVertex(u.id, u.title, "group", void 0, u.classes, u.dir);
  const B = k.insert("g").attr("class", "subgraphs"), g = lt(a.db);
  l = et(s, r, h, i, a, g, l);
  const d = k.insert("g").attr("class", "edges edgePath"), $ = a.db.getEdges();
  l = at($, a, l, k), Object.keys(_).forEach((w) => {
    const f = _[w];
    f.parent || l.children.push(f), g.childrenById[w] !== void 0 && (f.labels = [
      {
        text: f.labelText,
        layoutOptions: {
          "nodeLabels.placement": "[H_CENTER, V_TOP, INSIDE]"
        },
        width: f.labelData.width,
        height: f.labelData.height
      }
    ], delete f.x, delete f.y, delete f.width, delete f.height);
  }), M(l.children, g), p.info("after layout", JSON.stringify(l, null, 2));
  const m = await P.layout(l);
  W(0, 0, m.children, k, B, a, 0), p.info("after layout", m), (C = m.edges) == null || C.map((w) => {
    it(d, w, w.edgeData, a, g);
  }), O({}, k, y.diagramPadding, y.useMaxWidth), o.remove();
}, W = (t, r, e, a, o, l, x) => {
  e.forEach(function(n) {
    if (n)
      if (_[n.id].offset = {
        posX: n.x + t,
        posY: n.y + r,
        x: t,
        y: r,
        depth: x,
        width: n.width,
        height: n.height
      }, n.type === "group") {
        const y = o.insert("g").attr("class", "subgraph");
        y.insert("rect").attr("class", "subgraph subgraph-lvl-" + x % 5 + " node").attr("x", n.x + t).attr("y", n.y + r).attr("width", n.width).attr("height", n.height);
        const c = y.insert("g").attr("class", "label");
        c.attr(
          "transform",
          `translate(${n.labels[0].x + t + n.x}, ${n.labels[0].y + r + n.y})`
        ), c.node().appendChild(n.labelData.labelNode), p.info("Id (UGH)= ", n.type, n.labels);
      } else
        p.info("Id (UGH)= ", n.id), n.el.attr(
          "transform",
          `translate(${n.x + t + n.width / 2}, ${n.y + r + n.height / 2})`
        );
  }), e.forEach(function(n) {
    n && n.type === "group" && W(t + n.x, r + n.y, n.children, a, o, l, x + 1);
  });
}, dt = {
  getClasses: ot,
  draw: ct
}, ut = (t) => {
  let r = "";
  for (let e = 0; e < 5; e++)
    r += `
      .subgraph-lvl-${e} {
        fill: ${t[`surface${e}`]};
        stroke: ${t[`surfacePeer${e}`]};
      }
    `;
  return r;
}, ht = (t) => `.label {
    font-family: ${t.fontFamily};
    color: ${t.nodeTextColor || t.textColor};
  }
  .cluster-label text {
    fill: ${t.titleColor};
  }
  .cluster-label span {
    color: ${t.titleColor};
  }

  .label text,span {
    fill: ${t.nodeTextColor || t.textColor};
    color: ${t.nodeTextColor || t.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${t.mainBkg};
    stroke: ${t.nodeBorder};
    stroke-width: 1px;
  }

  .node .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }

  .arrowheadPath {
    fill: ${t.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${t.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${t.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${t.edgeLabelBackground};
    rect {
      opacity: 0.5;
      background-color: ${t.edgeLabelBackground};
      fill: ${t.edgeLabelBackground};
    }
    text-align: center;
  }

  .cluster rect {
    fill: ${t.clusterBkg};
    stroke: ${t.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${t.titleColor};
  }

  .cluster span {
    color: ${t.titleColor};
  }
  /* .cluster div {
    color: ${t.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${t.fontFamily};
    font-size: 12px;
    background: ${t.tertiaryColor};
    border: 1px solid ${t.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.textColor};
  }
  .subgraph {
    stroke-width:2;
    rx:3;
  }
  // .subgraph-lvl-1 {
  //   fill:#ccc;
  //   // stroke:black;
  // }
  ${ut(t)}
`, bt = ht, pt = {
  db: X,
  renderer: dt,
  parser: Y,
  styles: bt
};
export {
  pt as diagram
};
//# sourceMappingURL=diagram-definition-deff0372.js.map
