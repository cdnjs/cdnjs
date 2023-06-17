import { b as G, a as b, m as D, G as j, l as A } from "./layout-492ec81d.js";
import { c as O, i as X, a as M, b as _, d as $, u as H, s as V, e as U, f as W, p as B, g as Y, h as q } from "./edges-de377bae.js";
import { l as i, m as N, g as E, h as L } from "./commonDb-41f8b4c5.js";
import { c as z } from "./createText-23817c58.js";
var K = 4;
function Q(e) {
  return G(e, K);
}
function y(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: Z(e),
    edges: I(e)
  };
  return b(e.graph()) || (t.value = Q(e.graph())), t;
}
function Z(e) {
  return D(e.nodes(), function(t) {
    var n = e.node(t), r = e.parent(t), s = { v: t };
    return b(n) || (s.value = n), b(r) || (s.parent = r), s;
  });
}
function I(e) {
  return D(e.edges(), function(t) {
    var n = e.edge(t), r = { v: t.v, w: t.w };
    return b(t.name) || (r.name = t.name), b(n) || (r.value = n), r;
  });
}
let f = {}, x = {}, T = {};
const tt = () => {
  x = {}, T = {}, f = {};
}, S = (e, t) => (i.trace("In isDecendant", t, " ", e, " = ", x[t].includes(e)), !!x[t].includes(e)), et = (e, t) => (i.info("Decendants of ", t, " is ", x[t]), i.info("Edge is ", e), e.v === t || e.w === t ? !1 : x[t] ? x[t].includes(e.v) || S(e.v, t) || S(e.w, t) || x[t].includes(e.w) : (i.debug("Tilt, ", t, ",not in decendants"), !1)), J = (e, t, n, r) => {
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
      J(a, t, n, r);
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
      const l = t.edges(a);
      i.debug("Copying Edges", l), l.forEach((d) => {
        i.info("Edge", d);
        const g = t.edge(d.v, d.w, d.name);
        i.info("Edge data", g, r);
        try {
          et(d, r) ? (i.info("Copying as ", d.v, d.w, g, d.name), n.setEdge(d.v, d.w, g, d.name), i.info("newGraph edges ", n.edges(), n.edge(n.edges()[0]))) : i.info(
            "Skipping copy of edge ",
            d.v,
            "-->",
            d.w,
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
}, R = (e, t) => {
  const n = t.children(e);
  let r = [...n];
  for (const s of n)
    T[s] = e, r = [...r, ...R(s, t)];
  return r;
}, m = (e, t) => {
  i.trace("Searching", e);
  const n = t.children(e);
  if (i.trace("Searching children of id ", e, n), n.length < 1)
    return i.trace("This is a valid node", e), e;
  for (const r of n) {
    const s = m(r, t);
    if (s)
      return i.trace("Found replacement for", e, " => ", s), s;
  }
}, v = (e) => !f[e] || !f[e].externalConnections ? e : f[e] ? f[e].id : e, nt = (e, t) => {
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
      m(n, e)
    ), x[n] = R(n, e), f[n] = { id: m(n, e), clusterData: e.node(n) });
  }), e.nodes().forEach(function(n) {
    const r = e.children(n), s = e.edges();
    r.length > 0 ? (i.debug("Cluster identified", n, x), s.forEach((a) => {
      if (a.v !== n && a.w !== n) {
        const u = S(a.v, n), l = S(a.w, n);
        u ^ l && (i.warn("Edge: ", a, " leaves cluster ", n), i.warn("Decendants of XXX ", n, ": ", x[n]), f[n].externalConnections = !0);
      }
    })) : i.debug("Not a cluster ", n, x);
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
      i.warn("Fixing and trixing link to self - removing XXX", n.v, n.w, n.name), i.warn("Fixing and trixing - removing XXX", n.v, n.w, n.name), s = v(n.v), a = v(n.w), e.removeEdge(n.v, n.w, n.name);
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
      const l = JSON.parse(JSON.stringify(r)), d = JSON.parse(JSON.stringify(r));
      l.label = "", l.arrowTypeEnd = "none", d.label = "", l.fromCluster = n.v, d.toCluster = n.v, e.setEdge(s, u, l, n.name + "-cyclic-special"), e.setEdge(u, a, d, n.name + "-cyclic-special");
    } else
      (f[n.v] || f[n.w]) && (i.warn("Fixing and trixing - removing XXX", n.v, n.w, n.name), s = v(n.v), a = v(n.w), e.removeEdge(n.v, n.w, n.name), s !== n.v && (r.fromCluster = n.v), a !== n.w && (r.toCluster = n.w), i.warn("Fix Replacing with XXX", s, a, n.name), e.setEdge(s, a, r, n.name));
  }), i.warn("Adjusted Graph", y(e)), p(e, 0), i.trace(f);
}, p = (e, t) => {
  if (i.warn("extractor - ", t, y(e), e.children("D")), t > 10) {
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
      const l = new j({
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
      i.warn("Old graph before copy", y(e)), J(s, e, l, s), e.setNode(s, {
        clusterNode: !0,
        id: s,
        clusterData: f[s].clusterData,
        labelText: f[s].labelText,
        graph: l
      }), i.warn("New graph after copy node: (", s, ")", y(l)), i.debug("Old graph after copy", y(e));
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
    i.warn(" Now next level", s, a), a.clusterNode && p(a.graph, t + 1);
  }
}, P = (e, t) => {
  if (t.length === 0)
    return [];
  let n = Object.assign(t);
  return t.forEach((r) => {
    const s = e.children(r), a = P(e, s);
    n = [...n, ...a];
  }), n;
}, it = (e) => P(e, e.children()), st = (e, t) => {
  i.info("Creating subgraph rect for ", t.id, t);
  const n = e.insert("g").attr("class", "cluster" + (t.class ? " " + t.class : "")).attr("id", t.id), r = n.insert("rect", ":first-child"), s = N(E().flowchart.htmlLabels), a = n.insert("g").attr("class", "cluster-label"), u = t.labelType === "markdown" ? z(a, t.labelText, { style: t.labelStyle, useHtmlLabels: s }) : a.node().appendChild(O(t.labelText, t.labelStyle, void 0, !0));
  let l = u.getBBox();
  if (N(E().flowchart.htmlLabels)) {
    const o = u.children[0], h = L(u);
    l = o.getBoundingClientRect(), h.attr("width", l.width), h.attr("height", l.height);
  }
  const d = 0 * t.padding, g = d / 2, w = t.width <= l.width + d ? l.width + d : t.width;
  t.width <= l.width + d ? t.diff = (l.width - t.width) / 2 - t.padding / 2 : t.diff = -t.padding / 2, i.trace("Data ", t, JSON.stringify(t)), r.attr("style", t.style).attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - w / 2).attr("y", t.y - t.height / 2 - g).attr("width", w).attr("height", t.height + d), s ? a.attr(
    "transform",
    // This puts the labal on top of the box instead of inside it
    "translate(" + (t.x - l.width / 2) + ", " + (t.y - t.height / 2) + ")"
  ) : a.attr(
    "transform",
    // This puts the labal on top of the box instead of inside it
    "translate(" + t.x + ", " + (t.y - t.height / 2) + ")"
  );
  const c = r.node().getBBox();
  return t.width = c.width, t.height = c.height, t.intersect = function(o) {
    return X(t, o);
  }, n;
}, rt = (e, t) => {
  const n = e.insert("g").attr("class", "note-cluster").attr("id", t.id), r = n.insert("rect", ":first-child"), s = 0 * t.padding, a = s / 2;
  r.attr("rx", t.rx).attr("ry", t.ry).attr("x", t.x - t.width / 2 - a).attr("y", t.y - t.height / 2 - a).attr("width", t.width + s).attr("height", t.height + s).attr("fill", "none");
  const u = r.node().getBBox();
  return t.width = u.width, t.height = u.height, t.intersect = function(l) {
    return X(t, l);
  }, n;
}, at = (e, t) => {
  const n = e.insert("g").attr("class", t.classes).attr("id", t.id), r = n.insert("rect", ":first-child"), s = n.insert("g").attr("class", "cluster-label"), a = n.append("rect"), u = s.node().appendChild(O(t.labelText, t.labelStyle, void 0, !0));
  let l = u.getBBox();
  if (N(E().flowchart.htmlLabels)) {
    const o = u.children[0], h = L(u);
    l = o.getBoundingClientRect(), h.attr("width", l.width), h.attr("height", l.height);
  }
  l = u.getBBox();
  const d = 0 * t.padding, g = d / 2, w = t.width <= l.width + t.padding ? l.width + t.padding : t.width;
  t.width <= l.width + t.padding ? t.diff = (l.width + t.padding * 0 - t.width) / 2 : t.diff = -t.padding / 2, r.attr("class", "outer").attr("x", t.x - w / 2 - g).attr("y", t.y - t.height / 2 - g).attr("width", w + d).attr("height", t.height + d), a.attr("class", "inner").attr("x", t.x - w / 2 - g).attr("y", t.y - t.height / 2 - g + l.height - 1).attr("width", w + d).attr("height", t.height + d - l.height - 3), s.attr(
    "transform",
    "translate(" + (t.x - l.width / 2) + ", " + (t.y - t.height / 2 - t.padding / 3 + (N(E().flowchart.htmlLabels) ? 5 : 3)) + ")"
  );
  const c = r.node().getBBox();
  return t.height = c.height, t.intersect = function(o) {
    return X(t, o);
  }, n;
}, ct = (e, t) => {
  const n = e.insert("g").attr("class", t.classes).attr("id", t.id), r = n.insert("rect", ":first-child"), s = 0 * t.padding, a = s / 2;
  r.attr("class", "divider").attr("x", t.x - t.width / 2 - a).attr("y", t.y - t.height / 2).attr("width", t.width + s).attr("height", t.height + s);
  const u = r.node().getBBox();
  return t.width = u.width, t.height = u.height, t.diff = -t.padding / 2, t.intersect = function(l) {
    return X(t, l);
  }, n;
}, ot = { rect: st, roundedWithTitle: at, noteGroup: rt, divider: ct };
let F = {};
const lt = (e, t) => {
  i.trace("Inserting cluster");
  const n = t.shape || "rect";
  F[t.id] = ot[n](e, t);
}, ft = () => {
  F = {};
}, k = (e, t, n, r) => {
  i.info("Graph in recursive render: XXX", y(t), r);
  const s = t.graph().rankdir;
  i.trace("Dir in recursive render - dir:", s);
  const a = e.insert("g").attr("class", "root");
  t.nodes() ? i.info("Recursive render XXX", t.nodes()) : i.info("No nodes found for", t), t.edges().length > 0 && i.trace("Recursive edges", t.edge(t.edges()[0]));
  const u = a.insert("g").attr("class", "clusters"), l = a.insert("g").attr("class", "edgePaths"), d = a.insert("g").attr("class", "edgeLabels"), g = a.insert("g").attr("class", "nodes");
  t.nodes().forEach(function(c) {
    const o = t.node(c);
    if (r !== void 0) {
      const h = JSON.parse(JSON.stringify(r.clusterData));
      i.info("Setting data for cluster XXX (", c, ") ", h, r), t.setNode(r.id, h), t.parent(c) || (i.trace("Setting parent", c, r.id), t.setParent(c, r.id, h));
    }
    if (i.info("(Insert) Node XXX" + c + ": " + JSON.stringify(t.node(c))), o && o.clusterNode) {
      i.info("Cluster identified", c, o.width, t.node(c));
      const h = k(g, o.graph, n, t.node(c)), C = h.elem;
      H(o, C), o.diff = h.diff || 0, i.info("Node bounds (abc123)", c, o, o.width, o.x, o.y), V(C, o), i.warn("Recursive render complete ", C, o);
    } else
      t.children(c).length > 0 ? (i.info("Cluster - the non recursive path XXX", c, o.id, o, t), i.info(m(o.id, t)), f[o.id] = { id: m(o.id, t), node: o }) : (i.info("Node - the non recursive path", c, o.id, o), U(g, t.node(c), s));
  }), t.edges().forEach(function(c) {
    const o = t.edge(c.v, c.w, c.name);
    i.info("Edge " + c.v + " -> " + c.w + ": " + JSON.stringify(c)), i.info("Edge " + c.v + " -> " + c.w + ": ", c, " ", JSON.stringify(t.edge(c))), i.info("Fix", f, "ids:", c.v, c.w, "Translateing: ", f[c.v], f[c.w]), W(d, o);
  }), t.edges().forEach(function(c) {
    i.info("Edge " + c.v + " -> " + c.w + ": " + JSON.stringify(c));
  }), i.info("#############################################"), i.info("###                Layout                 ###"), i.info("#############################################"), i.info(t), A(t), i.info("Graph after layout:", y(t));
  let w = 0;
  return it(t).forEach(function(c) {
    const o = t.node(c);
    i.info("Position " + c + ": " + JSON.stringify(t.node(c))), i.info(
      "Position " + c + ": (" + o.x,
      "," + o.y,
      ") width: ",
      o.width,
      " height: ",
      o.height
    ), o && o.clusterNode ? B(o) : t.children(c).length > 0 ? (lt(u, o), f[o.id].node = o) : B(o);
  }), t.edges().forEach(function(c) {
    const o = t.edge(c);
    i.info("Edge " + c.v + " -> " + c.w + ": " + JSON.stringify(o), o);
    const h = Y(l, c, o, f, n, t);
    q(o, h);
  }), t.nodes().forEach(function(c) {
    const o = t.node(c);
    i.info(c, o.type, o.diff), o.type === "group" && (w = o.diff);
  }), { elem: a, diff: w };
}, wt = (e, t, n, r, s) => {
  M(e, n, r, s), _(), $(), ft(), tt(), i.warn("Graph at first:", y(t)), nt(t), i.warn("Graph after:", y(t)), k(e, t, r);
};
export {
  wt as r
};
//# sourceMappingURL=index-6271e032.js.map
