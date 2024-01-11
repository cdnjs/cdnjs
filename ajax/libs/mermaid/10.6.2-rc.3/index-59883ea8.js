import { b as A, i as N, m as L, G as _, l as H } from "./layout-05534f1b.js";
import { c as J, g as T, i as D, a as V, b as U, d as W, u as Y, s as q, e as z, f as K, p, h as Q, j as Z } from "./edges-55a3dd09.js";
import { l as i, c as O, p as X, j as R } from "./mermaid-8d01e515.js";
import { a as I } from "./createText-cadb7b3f.js";
var tt = 4;
function et(e) {
  return A(e, tt);
}
function b(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: nt(e),
    edges: it(e)
  };
  return N(e.graph()) || (t.value = et(e.graph())), t;
}
function nt(e) {
  return L(e.nodes(), function(t) {
    var n = e.node(t), r = e.parent(t), s = { v: t };
    return N(n) || (s.value = n), N(r) || (s.parent = r), s;
  });
}
function it(e) {
  return L(e.edges(), function(t) {
    var n = e.edge(t), r = { v: t.v, w: t.w };
    return N(t.name) || (r.name = t.name), N(n) || (r.value = n), r;
  });
}
let f = {}, g = {}, P = {};
const st = () => {
  g = {}, P = {}, f = {};
}, B = (e, t) => (i.trace("In isDecendant", t, " ", e, " = ", g[t].includes(e)), !!g[t].includes(e)), rt = (e, t) => (i.info("Decendants of ", t, " is ", g[t]), i.info("Edge is ", e), e.v === t || e.w === t ? !1 : g[t] ? g[t].includes(e.v) || B(e.v, t) || B(e.w, t) || g[t].includes(e.w) : (i.debug("Tilt, ", t, ",not in decendants"), !1)), F = (e, t, n, r) => {
  i.warn(
    "Copying children of ",
    e,
    "root",
    r,
    "data",
    t.node(e),
    r
  );
  const s = t.children(e) || [];
  e !== r && s.push(e), i.warn("Copying (nodes) clusterId", e, "nodes", s), s.forEach((a) => {
    if (t.children(a).length > 0)
      F(a, t, n, r);
    else {
      const u = t.node(a);
      i.info("cp ", a, " to ", r, " with parent ", e), n.setNode(a, u), r !== t.parent(a) && (i.warn("Setting parent", a, t.parent(a)), n.setParent(a, t.parent(a))), e !== r && a !== e ? (i.debug("Setting parent", a, e), n.setParent(a, e)) : (i.info("In copy ", e, "root", r, "data", t.node(e), r), i.debug(
        "Not Setting parent for node=",
        a,
        "cluster!==rootId",
        e !== r,
        "node!==clusterId",
        a !== e
      ));
      const d = t.edges(a);
      i.debug("Copying Edges", d), d.forEach((l) => {
        i.info("Edge", l);
        const h = t.edge(l.v, l.w, l.name);
        i.info("Edge data", h, r);
        try {
          rt(l, r) ? (i.info("Copying as ", l.v, l.w, h, l.name), n.setEdge(l.v, l.w, h, l.name), i.info("newGraph edges ", n.edges(), n.edge(n.edges()[0]))) : i.info(
            "Skipping copy of edge ",
            l.v,
            "-->",
            l.w,
            " rootId: ",
            r,
            " clusterId:",
            e
          );
        } catch (w) {
          i.error(w);
        }
      });
    }
    i.debug("Removing node", a), t.removeNode(a);
  });
}, G = (e, t) => {
  const n = t.children(e);
  let r = [...n];
  for (const s of n)
    P[s] = e, r = [...r, ...G(s, t)];
  return r;
}, S = (e, t) => {
  i.trace("Searching", e);
  const n = t.children(e);
  if (i.trace("Searching children of id ", e, n), n.length < 1)
    return i.trace("This is a valid node", e), e;
  for (const r of n) {
    const s = S(r, t);
    if (s)
      return i.trace("Found replacement for", e, " => ", s), s;
  }
}, C = (e) => !f[e] || !f[e].externalConnections ? e : f[e] ? f[e].id : e, at = (e, t) => {
  if (!e || t > 10) {
    i.debug("Opting out, no graph ");
    return;
  } else
    i.debug("Opting in, graph ");
  e.nodes().forEach(function(n) {
    e.children(n).length > 0 && (i.warn(
      "Cluster identified",
      n,
      " Replacement id in edges: ",
      S(n, e)
    ), g[n] = G(n, e), f[n] = { id: S(n, e), clusterData: e.node(n) });
  }), e.nodes().forEach(function(n) {
    const r = e.children(n), s = e.edges();
    r.length > 0 ? (i.debug("Cluster identified", n, g), s.forEach((a) => {
      if (a.v !== n && a.w !== n) {
        const u = B(a.v, n), d = B(a.w, n);
        u ^ d && (i.warn("Edge: ", a, " leaves cluster ", n), i.warn("Decendants of XXX ", n, ": ", g[n]), f[n].externalConnections = !0);
      }
    })) : i.debug("Not a cluster ", n, g);
  }), e.edges().forEach(function(n) {
    const r = e.edge(n);
    i.warn("Edge " + n.v + " -> " + n.w + ": " + JSON.stringify(n)), i.warn("Edge " + n.v + " -> " + n.w + ": " + JSON.stringify(e.edge(n)));
    let s = n.v, a = n.w;
    if (i.warn(
      "Fix XXX",
      f,
      "ids:",
      n.v,
      n.w,
      "Translating: ",
      f[n.v],
      " --- ",
      f[n.w]
    ), f[n.v] && f[n.w] && f[n.v] === f[n.w]) {
      i.warn("Fixing and trixing link to self - removing XXX", n.v, n.w, n.name), i.warn("Fixing and trixing - removing XXX", n.v, n.w, n.name), s = C(n.v), a = C(n.w), e.removeEdge(n.v, n.w, n.name);
      const u = n.w + "---" + n.v;
      e.setNode(u, {
        domId: u,
        id: u,
        labelStyle: "",
        labelText: r.label,
        padding: 0,
        shape: "labelRect",
        style: ""
      });
      const d = structuredClone(r), l = structuredClone(r);
      d.label = "", d.arrowTypeEnd = "none", l.label = "", d.fromCluster = n.v, l.toCluster = n.v, e.setEdge(s, u, d, n.name + "-cyclic-special"), e.setEdge(u, a, l, n.name + "-cyclic-special");
    } else
      (f[n.v] || f[n.w]) && (i.warn("Fixing and trixing - removing XXX", n.v, n.w, n.name), s = C(n.v), a = C(n.w), e.removeEdge(n.v, n.w, n.name), s !== n.v && (r.fromCluster = n.v), a !== n.w && (r.toCluster = n.w), i.warn("Fix Replacing with XXX", s, a, n.name), e.setEdge(s, a, r, n.name));
  }), i.warn("Adjusted Graph", b(e)), k(e, 0), i.trace(f);
}, k = (e, t) => {
  if (i.warn("extractor - ", t, b(e), e.children("D")), t > 10) {
    i.error("Bailing out");
    return;
  }
  let n = e.nodes(), r = !1;
  for (const s of n) {
    const a = e.children(s);
    r = r || a.length > 0;
  }
  if (!r) {
    i.debug("Done, no node has children", e.nodes());
    return;
  }
  i.debug("Nodes = ", n, t);
  for (const s of n)
    if (i.debug(
      "Extracting node",
      s,
      f,
      f[s] && !f[s].externalConnections,
      !e.parent(s),
      e.node(s),
      e.children("D"),
      " Depth ",
      t
    ), !f[s])
      i.debug("Not a cluster", s, t);
    else if (!f[s].externalConnections && // !graph.parent(node) &&
    e.children(s) && e.children(s).length > 0) {
      i.warn(
        "Cluster without external connections, without a parent and with children",
        s,
        t
      );
      let u = e.graph().rankdir === "TB" ? "LR" : "TB";
      f[s] && f[s].clusterData && f[s].clusterData.dir && (u = f[s].clusterData.dir, i.warn("Fixing dir", f[s].clusterData.dir, u));
      const d = new _({
        multigraph: !0,
        compound: !0
      }).setGraph({
        rankdir: u,
        // Todo: set proper spacing
        nodesep: 50,
        ranksep: 50,
        marginx: 8,
        marginy: 8
      }).setDefaultEdgeLabel(function() {
        return {};
      });
      i.warn("Old graph before copy", b(e)), F(s, e, d, s), e.setNode(s, {
        clusterNode: !0,
        id: s,
        clusterData: f[s].clusterData,
        labelText: f[s].labelText,
        graph: d
      }), i.warn("New graph after copy node: (", s, ")", b(d)), i.debug("Old graph after copy", b(e));
    } else
      i.warn(
        "Cluster ** ",
        s,
        " **not meeting the criteria !externalConnections:",
        !f[s].externalConnections,
        " no parent: ",
        !e.parent(s),
        " children ",
        e.children(s) && e.children(s).length > 0,
        e.children("D"),
        t
      ), i.debug(f);
  n = e.nodes(), i.warn("New list of nodes", n);
  for (const s of n) {
    const a = e.node(s);
    i.warn(" Now next level", s, a), a.clusterNode && k(a.graph, t + 1);
  }
}, M = (e, t) => {
  if (t.length === 0)
    return [];
  let n = Object.assign(t);
  return t.forEach((r) => {
    const s = e.children(r), a = M(e, s);
    n = [...n, ...a];
  }), n;
}, ct = (e) => M(e, e.children()), ot = (e, t) => {
  i.info("Creating subgraph rect for ", t.id, t);
  const n = O(), r = e.insert("g").attr("class", "cluster" + (t.class ? " " + t.class : "")).attr("id", t.id), s = r.insert("rect", ":first-child"), a = X(n.flowchart.htmlLabels), u = r.insert("g").attr("class", "cluster-label"), d = t.labelType === "markdown" ? I(u, t.labelText, { style: t.labelStyle, useHtmlLabels: a }) : u.node().appendChild(J(t.labelText, t.labelStyle, void 0, !0));
  let l = d.getBBox();
  if (X(n.flowchart.htmlLabels)) {
    const c = d.children[0], o = R(d);
    l = c.getBoundingClientRect(), o.attr("width", l.width), o.attr("height", l.height);
  }
  const h = 0 * t.padding, w = h / 2, y = t.width <= l.width + h ? l.width + h : t.width;
  t.width <= l.width + h ? t.diff = (l.width - t.width) / 2 - t.padding / 2 : t.diff = -t.padding / 2, i.trace("Data ", t, JSON.stringify(t)), s.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - y / 2).attr("y", t.y - t.height / 2 - w).attr("width", y).attr("height", t.height + h);
  const { subGraphTitleTopMargin: v } = T(n);
  a ? u.attr(
    "transform",
    // This puts the labal on top of the box instead of inside it
    `translate(${t.x - l.width / 2}, ${t.y - t.height / 2 + v})`
  ) : u.attr(
    "transform",
    // This puts the labal on top of the box instead of inside it
    `translate(${t.x}, ${t.y - t.height / 2 + v})`
  );
  const x = s.node().getBBox();
  return t.width = x.width, t.height = x.height, t.intersect = function(c) {
    return D(t, c);
  }, r;
}, lt = (e, t) => {
  const n = e.insert("g").attr("class", "note-cluster").attr("id", t.id), r = n.insert("rect", ":first-child"), s = 0 * t.padding, a = s / 2;
  r.attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - t.width / 2 - a).attr("y", t.y - t.height / 2 - a).attr("width", t.width + s).attr("height", t.height + s).attr("fill", "none");
  const u = r.node().getBBox();
  return t.width = u.width, t.height = u.height, t.intersect = function(d) {
    return D(t, d);
  }, n;
}, ft = (e, t) => {
  const n = O(), r = e.insert("g").attr("class", t.classes).attr("id", t.id), s = r.insert("rect", ":first-child"), a = r.insert("g").attr("class", "cluster-label"), u = r.append("rect"), d = a.node().appendChild(J(t.labelText, t.labelStyle, void 0, !0));
  let l = d.getBBox();
  if (X(n.flowchart.htmlLabels)) {
    const c = d.children[0], o = R(d);
    l = c.getBoundingClientRect(), o.attr("width", l.width), o.attr("height", l.height);
  }
  l = d.getBBox();
  const h = 0 * t.padding, w = h / 2, y = t.width <= l.width + t.padding ? l.width + t.padding : t.width;
  t.width <= l.width + t.padding ? t.diff = (l.width + t.padding * 0 - t.width) / 2 : t.diff = -t.padding / 2, s.attr("class", "outer").attr("x", t.x - y / 2 - w).attr("y", t.y - t.height / 2 - w).attr("width", y + h).attr("height", t.height + h), u.attr("class", "inner").attr("x", t.x - y / 2 - w).attr("y", t.y - t.height / 2 - w + l.height - 1).attr("width", y + h).attr("height", t.height + h - l.height - 3);
  const { subGraphTitleTopMargin: v } = T(n);
  a.attr(
    "transform",
    "translate(" + (t.x - l.width / 2) + ", " + (t.y - t.height / 2 - t.padding / 3 + (X(n.flowchart.htmlLabels) ? 5 : 3)) + v + ")"
  );
  const x = s.node().getBBox();
  return t.height = x.height, t.intersect = function(c) {
    return D(t, c);
  }, r;
}, dt = (e, t) => {
  const n = e.insert("g").attr("class", t.classes).attr("id", t.id), r = n.insert("rect", ":first-child"), s = 0 * t.padding, a = s / 2;
  r.attr("class", "divider").attr("x", t.x - t.width / 2 - a).attr("y", t.y - t.height / 2).attr("width", t.width + s).attr("height", t.height + s);
  const u = r.node().getBBox();
  return t.width = u.width, t.height = u.height, t.diff = -t.padding / 2, t.intersect = function(d) {
    return D(t, d);
  }, n;
}, ut = { rect: ot, roundedWithTitle: ft, noteGroup: lt, divider: dt };
let $ = {};
const ht = (e, t) => {
  i.trace("Inserting cluster");
  const n = t.shape || "rect";
  $[t.id] = ut[n](e, t);
}, gt = () => {
  $ = {};
}, j = async (e, t, n, r, s, a) => {
  i.info("Graph in recursive render: XXX", b(t), s);
  const u = t.graph().rankdir;
  i.trace("Dir in recursive render - dir:", u);
  const d = e.insert("g").attr("class", "root");
  t.nodes() ? i.info("Recursive render XXX", t.nodes()) : i.info("No nodes found for", t), t.edges().length > 0 && i.trace("Recursive edges", t.edge(t.edges()[0]));
  const l = d.insert("g").attr("class", "clusters"), h = d.insert("g").attr("class", "edgePaths"), w = d.insert("g").attr("class", "edgeLabels"), y = d.insert("g").attr("class", "nodes");
  await Promise.all(
    t.nodes().map(async function(c) {
      const o = t.node(c);
      if (s !== void 0) {
        const m = JSON.parse(JSON.stringify(s.clusterData));
        i.info("Setting data for cluster XXX (", c, ") ", m, s), t.setNode(s.id, m), t.parent(c) || (i.trace("Setting parent", c, s.id), t.setParent(c, s.id, m));
      }
      if (i.info("(Insert) Node XXX" + c + ": " + JSON.stringify(t.node(c))), o && o.clusterNode) {
        i.info("Cluster identified", c, o.width, t.node(c));
        const m = await j(
          y,
          o.graph,
          n,
          r,
          t.node(c),
          a
        ), E = m.elem;
        Y(o, E), o.diff = m.diff || 0, i.info("Node bounds (abc123)", c, o, o.width, o.x, o.y), q(E, o), i.warn("Recursive render complete ", E, o);
      } else
        t.children(c).length > 0 ? (i.info("Cluster - the non recursive path XXX", c, o.id, o, t), i.info(S(o.id, t)), f[o.id] = { id: S(o.id, t), node: o }) : (i.info("Node - the non recursive path", c, o.id, o), await z(y, t.node(c), u));
    })
  ), t.edges().forEach(function(c) {
    const o = t.edge(c.v, c.w, c.name);
    i.info("Edge " + c.v + " -> " + c.w + ": " + JSON.stringify(c)), i.info("Edge " + c.v + " -> " + c.w + ": ", c, " ", JSON.stringify(t.edge(c))), i.info("Fix", f, "ids:", c.v, c.w, "Translateing: ", f[c.v], f[c.w]), K(w, o);
  }), t.edges().forEach(function(c) {
    i.info("Edge " + c.v + " -> " + c.w + ": " + JSON.stringify(c));
  }), i.info("#############################################"), i.info("###                Layout                 ###"), i.info("#############################################"), i.info(t), H(t), i.info("Graph after layout:", b(t));
  let v = 0;
  const { subGraphTitleTotalMargin: x } = T(a);
  return ct(t).forEach(function(c) {
    const o = t.node(c);
    i.info("Position " + c + ": " + JSON.stringify(t.node(c))), i.info(
      "Position " + c + ": (" + o.x,
      "," + o.y,
      ") width: ",
      o.width,
      " height: ",
      o.height
    ), o && o.clusterNode ? (o.y += x, p(o)) : t.children(c).length > 0 ? (o.height += x, ht(l, o), f[o.id].node = o) : (o.y += x / 2, p(o));
  }), t.edges().forEach(function(c) {
    const o = t.edge(c);
    i.info("Edge " + c.v + " -> " + c.w + ": " + JSON.stringify(o), o), o.points.forEach((E) => E.y += x / 2);
    const m = Q(h, c, o, f, n, t, r);
    Z(o, m);
  }), t.nodes().forEach(function(c) {
    const o = t.node(c);
    i.info(c, o.type, o.diff), o.type === "group" && (v = o.diff);
  }), { elem: d, diff: v };
}, mt = async (e, t, n, r, s) => {
  V(e, n, r, s), U(), W(), gt(), st(), i.warn("Graph at first:", JSON.stringify(b(t))), at(t), i.warn("Graph after:", JSON.stringify(b(t)));
  const a = O();
  await j(e, t, r, s, void 0, a);
};
export {
  mt as r
};
