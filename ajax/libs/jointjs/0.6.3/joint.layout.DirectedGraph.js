/*! JointJS v0.6.0 - JavaScript diagramming library  2013-09-10 


This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
/*
Copyright (c) 2012 Chris Pettitt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
(function() {
  dagre = {};
dagre.version = "0.0.6";
/*
 * Directed multi-graph used during layout.
 */
dagre.graph = {};

/*
 * Creates a new directed multi-graph. This should be invoked with
 * `var g = dagre.graph()` and _not_ `var g = new dagre.graph()`.
 */
dagre.graph = function() {
  var nodes = {},
      inEdges = {},
      outEdges = {},
      edges = {},
      graph = {},
      idCounter = 0;

  graph.addNode = function(u, value) {
    if (graph.hasNode(u)) {
      throw new Error("Graph already has node '" + u + "':\n" + graph.toString());
    }
    nodes[u] = { id: u, value: value };
    inEdges[u] = {};
    outEdges[u] = {};
  };

  graph.delNode = function(u) {
    strictGetNode(u);

    graph.edges(u).forEach(function(e) { graph.delEdge(e); });

    delete inEdges[u];
    delete outEdges[u];
    delete nodes[u];
  };

  graph.node = function(u) {
    return strictGetNode(u).value;
  };

  graph.hasNode = function(u) {
    return u in nodes;
  };

  graph.addEdge = function(e, source, target, value) {
    strictGetNode(source);
    strictGetNode(target);

    if (e === null) {
      e = "_ANON-" + ++idCounter;
    }
    else if (graph.hasEdge(e)) {
      throw new Error("Graph already has edge '" + e + "':\n" + graph.toString());
    }

    edges[e] = { id: e, source: source, target: target, value: value };
    addEdgeToMap(inEdges[target], source, e);
    addEdgeToMap(outEdges[source], target, e);
  };

  graph.delEdge = function(e) {
    var edge = strictGetEdge(e);
    delEdgeFromMap(inEdges[edge.target], edge.source, e);
    delEdgeFromMap(outEdges[edge.source], edge.target, e);
    delete edges[e];
  };

  graph.edge = function(e) {
    return strictGetEdge(e).value;
  };

  graph.source = function(e) {
    return strictGetEdge(e).source;
  };

  graph.target = function(e) {
    return strictGetEdge(e).target;
  };

  graph.hasEdge = function(e) {
    return e in edges;
  };

  graph.successors = function(u) {
    strictGetNode(u);
    return keys(outEdges[u]).map(function(v) { return nodes[v].id; });
  };

  graph.predecessors = function(u) {
    strictGetNode(u);
    return keys(inEdges[u]).map(function(v) { return nodes[v].id; });
  };

  graph.neighbors = function(u) {
    strictGetNode(u);
    var vs = {};
    keys(outEdges[u]).map(function(v) { vs[v] = true; });
    keys(inEdges[u]).map(function(v) { vs[v] = true; });
    return keys(vs).map(function(v) { return nodes[v].id; });
  };

  graph.nodes = function() {
    var nodes = [];
    graph.eachNode(function(id, _) { nodes.push(id); });
    return nodes;
  };

  graph.eachNode = function(func) {
    for (var k in nodes) {
      var node = nodes[k];
      func(node.id, node.value);
    }
  };

  /*
   * Return all edges with no arguments,
   * the ones that are incident on a node (one argument),
   * or all edges from a source to a target (two arguments)
   */
  graph.edges = function(u, v) {
    var es, sourceEdges;
    if (!arguments.length) {
      es = [];
      graph.eachEdge(function(id) { es.push(id); });
      return es;
    } else if (arguments.length === 1) {
      return union([graph.inEdges(u), graph.outEdges(u)]);
    } else if (arguments.length === 2) {
      strictGetNode(u);
      strictGetNode(v);
      sourceEdges = outEdges[u];
      es = (v in sourceEdges) ? keys(sourceEdges[v].edges) : [];
      return es.map(function(e) { return edges[e].id; });
    }
  };

  graph.eachEdge = function(func) {
    for (var k in edges) {
      var edge = edges[k];
      func(edge.id, edge.source, edge.target, edge.value);
    }
  };

  /*
   * Return all in edges to a target node
   */
  graph.inEdges = function(target) {
    strictGetNode(target);
    return concat(values(inEdges[target]).map(function(es) { return keys(es.edges); }));
  };

  /*
   * Return all out edges from a source node
   */
  graph.outEdges = function(source) {
    strictGetNode(source);
    return concat(values(outEdges[source]).map(function(es) { return keys(es.edges); }));
  };

  graph.subgraph = function(us) {
    var g = dagre.graph();
    us.forEach(function(u) {
      g.addNode(u, graph.node(u));
    });
    values(edges).forEach(function(e) {
      if (g.hasNode(e.source) && g.hasNode(e.target)) {
        g.addEdge(e.id, e.source, e.target, graph.edge(e.id));
      }
    });
    return g;
  };

  graph.toString = function() {
    var str = "GRAPH:\n";
    str += "    Nodes:\n";
    keys(nodes).forEach(function(u) {
      str += "        " + u + ": " + JSON.stringify(nodes[u].value) + "\n";
    });
    str += "    Edges:\n";
    keys(edges).forEach(function(e) {
      var edge = edges[e];
      str += "        " + e + " (" + edge.source + " -> " + edge.target + "): " + JSON.stringify(edges[e].value) + "\n";
    });
    return str;
  };

  function addEdgeToMap(map, v, e) {
    var vEntry = map[v];
    if (!vEntry) {
      vEntry = map[v] = { count: 0, edges: {} };
    }
    vEntry.count++;
    vEntry.edges[e] = true;
  }

  function delEdgeFromMap(map, v, e) {
    var vEntry = map[v];
    if (--vEntry.count === 0) {
      delete map[v];
    } else {
      delete vEntry.edges[e];
    }
  }

  function strictGetNode(u) {
    var node = nodes[u];
    if (!(u in nodes)) {
      throw new Error("Node '" + u + "' is not in graph:\n" + graph.toString());
    }
    return node;
  }

  function strictGetEdge(e) {
    var edge = edges[e];
    if (!edge) {
      throw new Error("Edge '" + e + "' is not in graph:\n" + graph.toString());
    }
    return edge;
  }

  return graph;
};
dagre.layout = function() {
  // External configuration
  var config = {
      // Nodes to lay out. At minimum must have `width` and `height` attributes.
      nodes: [],
      // Edges to lay out. At mimimum must have `source` and `target` attributes.
      edges: [],
      // How much debug information to include?
      debugLevel: 0,
  };

  var timer = createTimer();

  // Phase functions
  var
      acyclic = dagre.layout.acyclic(),
      rank = dagre.layout.rank(),
      order = dagre.layout.order(),
      position = dagre.layout.position();

  // This layout object
  var self = {};

  self.nodes = propertyAccessor(self, config, "nodes");
  self.edges = propertyAccessor(self, config, "edges");

  self.orderIters = delegateProperty(order.iterations);

  self.nodeSep = delegateProperty(position.nodeSep);
  self.edgeSep = delegateProperty(position.edgeSep);
  self.universalSep = delegateProperty(position.universalSep);
  self.rankSep = delegateProperty(position.rankSep);
  self.rankDir = delegateProperty(position.rankDir);
  self.debugAlignment = delegateProperty(position.debugAlignment);

  self.debugLevel = propertyAccessor(self, config, "debugLevel", function(x) {
    timer.enabled(x);
    acyclic.debugLevel(x);
    rank.debugLevel(x);
    order.debugLevel(x);
    position.debugLevel(x);
  });

  self.run = timer.wrap("Total layout", run);

  self._normalize = normalize;

  return self;

  /*
   * Constructs an adjacency graph using the nodes and edges specified through
   * config. For each node and edge we add a property `dagre` that contains an
   * object that will hold intermediate and final layout information. Some of
   * the contents include:
   *
   *  1) A generated ID that uniquely identifies the object.
   *  2) Dimension information for nodes (copied from the source node).
   *  3) Optional dimension information for edges.
   *
   * After the adjacency graph is constructed the code no longer needs to use
   * the original nodes and edges passed in via config.
   */
  function buildAdjacencyGraph() {
    var g = dagre.graph();
    var nextId = 0;

    // Get the node id for the type ("source" or "target") or throw if we
    // haven't seen the node.
    function safeGetNodeId(type, edge) {
      var nodeId = edge[type].dagre.id;
      if (!g.hasNode(nodeId)) {
        throw new Error(type + " node for '" + e + "' not in node list");
      }
      return nodeId;
    }

    // Tag each node so that we can properly represent relationships when
    // we add edges. Also copy relevant dimension information.
    config.nodes.forEach(function(u) {
      var id = "id" in u ? u.id : "_N" + nextId++;
      u.dagre = { id: id, width: u.width, height: u.height };
      g.addNode(id, u.dagre);
    });

    config.edges.forEach(function(e) {
      var source = safeGetNodeId("source", e);
      var target = safeGetNodeId("target", e);

      e.dagre = { points: [] };

      // Track edges that aren't self loops - layout does nothing for self
      // loops, so they can be skipped.
      if (source !== target) {
        var id = "id" in e ? e.id : "_E" + nextId++;
        e.dagre.id = id;
        e.dagre.minLen = e.minLen || 1;
        e.dagre.width = e.width || 0;
        e.dagre.height = e.height || 0;
        g.addEdge(id, source, target, e.dagre);
      }
    });

    return g;
  }

  function run () {
    var rankSep = self.rankSep();
    try {
      if (!config.nodes.length) {
        return;
      }

      // Build internal graph
      var g = buildAdjacencyGraph();

      // Make space for edge labels
      g.eachEdge(function(e, s, t, a) {
        a.minLen *= 2;
      });
      self.rankSep(rankSep / 2);

      // Reverse edges to get an acyclic graph, we keep the graph in an acyclic
      // state until the very end.
      acyclic.run(g);

      // Determine the rank for each node. Nodes with a lower rank will appear
      // above nodes of higher rank.
      rank.run(g);

      // Normalize the graph by ensuring that every edge is proper (each edge has
      // a length of 1). We achieve this by adding dummy nodes to long edges,
      // thus shortening them.
      normalize(g);

      // Order the nodes so that edge crossings are minimized.
      order.run(g);

      // Find the x and y coordinates for every node in the graph.
      position.run(g);

      // De-normalize the graph by removing dummy nodes and augmenting the
      // original long edges with coordinate information.
      undoNormalize(g);

      // Reverses points for edges that are in a reversed state.
      fixupEdgePoints(g);

      // Reverse edges that were revered previously to get an acyclic graph.
      acyclic.undo(g);
    } finally {
      self.rankSep(rankSep);
    }

    return self;
  }

  /*
   * This function is responsible for "normalizing" the graph. The process of
   * normalization ensures that no edge in the graph has spans more than one
   * rank. To do this it inserts dummy nodes as needed and links them by adding
   * dummy edges. This function keeps enough information in the dummy nodes and
   * edges to ensure that the original graph can be reconstructed later.
   *
   * This method assumes that the input graph is cycle free.
   */
  function normalize(g) {
    var dummyCount = 0;
    g.eachEdge(function(e, s, t, a) {
      var sourceRank = g.node(s).rank;
      var targetRank = g.node(t).rank;
      if (sourceRank + 1 < targetRank) {
        for (var u = s, rank = sourceRank + 1, i = 0; rank < targetRank; ++rank, ++i) {
          var v = "_D" + ++dummyCount;
          var node = {
            width: a.width,
            height: a.height,
            edge: { id: e, source: s, target: t, attrs: a },
            rank: rank,
            dummy: true
          };

          // If this node represents a bend then we will use it as a control
          // point. For edges with 2 segments this will be the center dummy
          // node. For edges with more than two segments, this will be the
          // first and last dummy node.
          if (i === 0) node.index = 0;
          else if (rank + 1 === targetRank) node.index = 1;

          g.addNode(v, node);
          g.addEdge(null, u, v, {});
          u = v;
        }
        g.addEdge(null, u, t, {});
        g.delEdge(e);
      }
    });
  }

  /*
   * Reconstructs the graph as it was before normalization. The positions of
   * dummy nodes are used to build an array of points for the original "long"
   * edge. Dummy nodes and edges are removed.
   */
  function undoNormalize(g) {
    var visited = {};

    g.eachNode(function(u, a) {
      if (a.dummy && "index" in a) {
        var edge = a.edge;
        if (!g.hasEdge(edge.id)) {
          g.addEdge(edge.id, edge.source, edge.target, edge.attrs);
        }
        var points = g.edge(edge.id).points;
        points[a.index] = { x: a.x, y: a.y, ul: a.ul, ur: a.ur, dl: a.dl, dr: a.dr };
        g.delNode(u);
      }
    });
  }

  /*
   * For each edge that was reversed during the `acyclic` step, reverse its
   * array of points.
   */
  function fixupEdgePoints(g) {
    g.eachEdge(function(e, s, t, a) { if (a.reversed) a.points.reverse(); });
  }

  /*
   * Given a function, a new function is returned that invokes the given
   * function. The return value from the function is always the `self` object.
   */
  function delegateProperty(f) {
    return function() {
      if (!arguments.length) return f();
      f.apply(null, arguments);
      return self;
    };
  }
};
dagre.layout.acyclic = function() {
  // External configuration
  var config = {
    debugLevel: 0
  };

  var timer = createTimer();

  var self = {};

  self.debugLevel = propertyAccessor(self, config, "debugLevel", function(x) {
    timer.enabled(x);
  });

  self.run = timer.wrap("Acyclic Phase", run);

  self.undo = function(g) {
    g.eachEdge(function(e, s, t, a) {
      if (a.reversed) {
        delete a.reversed;
        g.delEdge(e);
        g.addEdge(e, t, s, a);
      }
    });
  };

  return self;

  function run(g) {
    var onStack = {},
        visited = {},
        reverseCount = 0;

    function dfs(u) {
      if (u in visited) return;

      visited[u] = onStack[u] = true;
      g.outEdges(u).forEach(function(e) {
        var t = g.target(e),
            a;

        if (t in onStack) {
          a = g.edge(e);
          g.delEdge(e);
          a.reversed = true;
          ++reverseCount;
          g.addEdge(e, t, u, a);
        } else {
          dfs(t);
        }
      });

      delete onStack[u];
    }

    g.eachNode(function(u) { dfs(u); });

    if (config.debugLevel >= 2) console.log("Acyclic Phase: reversed " + reverseCount + " edge(s)");
  }
};
dagre.layout.rank = function() {
  // External configuration
  var config = {
    debugLevel: 0
  };

  var timer = createTimer();

  var self = {};

  self.debugLevel = propertyAccessor(self, config, "debugLevel", function(x) {
    timer.enabled(x);
  });

  self.run = timer.wrap("Rank Phase", run);

  return self;

  function run(g) {
    initRank(g);
    components(g).forEach(function(cmpt) {
      var subgraph = g.subgraph(cmpt);
      feasibleTree(subgraph);
      normalize(subgraph);
    });
  }

  function initRank(g) {
    var minRank = {};
    var pq = priorityQueue();

    g.eachNode(function(u) {
      pq.add(u, g.inEdges(u).length);
      minRank[u] = 0;
    });

    while (pq.size() > 0) {
      var minId = pq.min();
      if (pq.priority(minId) > 0) {
        throw new Error("Input graph is not acyclic: " + g.toString());
      }
      pq.removeMin();

      var rank = minRank[minId];
      g.node(minId).rank = rank;

      g.outEdges(minId).forEach(function(e) {
        var target = g.target(e);
        minRank[target] = Math.max(minRank[target], rank + (g.edge(e).minLen || 1));
        pq.decrease(target, pq.priority(target) - 1);
      });
    }
  }

  function feasibleTree(g) {
    // Precompute minimum lengths for each directed edge
    var minLen = {};
    g.eachEdge(function(e, source, target, edge) {
      var id = incidenceId(source, target);
      minLen[id] = Math.max(minLen[id] || 1, edge.minLen || 1);
    });

    var tree = dagre.util.prim(g, function(u, v) {
      return Math.abs(g.node(u).rank - g.node(v).rank) - minLen[incidenceId(u, v)];
    });

    var visited = {};
    function dfs(u, rank) {
      visited[u] = true;
      g.node(u).rank = rank;

      tree[u].forEach(function(v) {
        if (!(v in visited)) {
          var delta = minLen[incidenceId(u, v)];
          dfs(v, rank + (g.edges(u, v).length ? delta : -delta));
        }
      });
    }

    dfs(g.nodes()[0], 0);

    return tree;
  }

  function normalize(g) {
    var m = min(g.nodes().map(function(u) { return g.node(u).rank; }));
    g.eachNode(function(u, node) { node.rank -= m; });
  }

  /*
   * This id can be used to group (in an undirected manner) multi-edges
   * incident on the same two nodes.
   */
  function incidenceId(u, v) {
    return u < v ?  u.length + ":" + u + "-" + v : v.length + ":" + v + "-" + u;
  }
};
dagre.layout.order = function() {
  var config = {
    iterations: 24, // max number of iterations
    debugLevel: 0
  };

  var timer = createTimer();

  var self = {};

  self.iterations = propertyAccessor(self, config, "iterations");

  self.debugLevel = propertyAccessor(self, config, "debugLevel", function(x) {
    timer.enabled(x);
  });

  self.run = timer.wrap("Order Phase", run);

  return self;

  function run(g) {
    var layering = initOrder(g);
    var bestLayering = copyLayering(layering);
    var bestCC = crossCount(g, layering);

    if (config.debugLevel >= 2) {
      console.log("Order phase start cross count: " + bestCC);
    }

    var cc, i, lastBest;
    for (i = 0, lastBest = 0; lastBest < 4 && i < config.iterations; ++i, ++lastBest) {
      cc = sweep(g, i, layering);
      if (cc < bestCC) {
        bestLayering = copyLayering(layering);
        bestCC = cc;
        lastBest = 0;
      }
      if (config.debugLevel >= 3) {
        console.log("Order phase iter " + i + " cross count: " + bestCC);
      }
    }

    bestLayering.forEach(function(layer) {
      layer.forEach(function(u, i) {
        g.node(u).order = i;
      });
    });

    if (config.debugLevel >= 2) {
      console.log("Order iterations: " + i);
      console.log("Order phase best cross count: " + bestCC);
    }

    return bestLayering;
  }

  function initOrder(g) {
    var layering = [];
    g.eachNode(function(n, a) {
      var layer = layering[a.rank] || (layering[a.rank] = []);
      layer.push(n);
    });
    return layering;
  }

  /*
   * Returns a function that will return the predecessors for a node. This
   * function differs from `g.predecessors(u)` in that a predecessor appears
   * for each incident edge (`g.predecessors(u)` treats predecessors as a set).
   * This allows pseudo-weighting of predecessor nodes.
   */
  function multiPredecessors(g) {
    return function(u) {
      var preds = [];
      g.inEdges(u).forEach(function(e) {
        preds.push(g.source(e));
      });
      return preds;
    };
  }

  /*
   * Same as `multiPredecessors(g)` but for successors.
   */
  function multiSuccessors(g) {
    return function(u) {
      var sucs = [];
      g.outEdges(u).forEach(function(e) {
        sucs.push(g.target(e));
      });
      return sucs;
    };
  }

  function sweep(g, iter, layering) {
    var i;
    if (iter % 2 === 0) {
      for (i = 1; i < layering.length; ++i) {
        sortLayer(layering[i], multiPredecessors(g), layerPos(layering[i-1]));
      }
    } else {
      for (i = layering.length - 2; i >= 0; --i) {
        sortLayer(layering[i], multiSuccessors(g), layerPos(layering[i+1]));
      }
    }
    return crossCount(g, layering);
  }

  /*
   * Given a list of nodes, a function that returns neighbors of a node, and
   * a mapping of the neighbor nodes to their weights, this function sorts
   * the node list by the barycenter calculated for each node.
   */
  function sortLayer(nodes, neighbors, weights) {
    var pos = layerPos(nodes);
    var bs = barycenters(nodes, neighbors, weights);

    var toSort = nodes.filter(function(u) { return bs[u] !== -1; });
    toSort.sort(function(x, y) {
      return bs[x] - bs[y] || pos[x] - pos[y];
    });

    for (var i = nodes.length - 1; i >= 0; --i) {
      if (bs[nodes[i]] !== -1) {
        nodes[i] = toSort.pop();
      }
    }
  }

  /*
   * Given a list of nodes, a function that returns neighbors of a node, and
   * a mapping of the neighbor nodes to their weights, this function returns
   * a mapping of the input nodes to their calculated barycenters. The
   * barycenter values are the average weights of all neighbors of the
   * node. If a node has no neighbors it is assigned a barycenter of -1.
   */
  function barycenters(nodes, neighbors, weights) {
    var bs = {}; // barycenters

    nodes.forEach(function(u) {
      var vs = neighbors(u);
      var b = -1;
      if (vs.length > 0)
        b = sum(vs.map(function(v) { return weights[v]; })) / vs.length;
      bs[u] = b;
    });

    return bs;
  }

  function copyLayering(layering) {
    return layering.map(function(l) { return l.slice(0); });
  }
};

var crossCount = dagre.layout.order.crossCount = function(g, layering) {
  var cc = 0;
  var prevLayer;
  layering.forEach(function(layer) {
    if (prevLayer) {
      cc += bilayerCrossCount(g, prevLayer, layer);
    }
    prevLayer = layer;
  });
  return cc;
};

/*
 * This function searches through a ranked and ordered graph and counts the
 * number of edges that cross. This algorithm is derived from:
 *
 *    W. Barth et al., Bilayer Cross Counting, JGAA, 8(2) 179–194 (2004)
 */
var bilayerCrossCount = dagre.layout.order.bilayerCrossCount = function(g, layer1, layer2) {
  var layer2Pos = layerPos(layer2);

  var indices = [];
  layer1.forEach(function(u) {
    var nodeIndices = [];
    g.outEdges(u).forEach(function(e) { nodeIndices.push(layer2Pos[g.target(e)]); });
    nodeIndices.sort(function(x, y) { return x - y; });
    indices = indices.concat(nodeIndices);
  });

  var firstIndex = 1;
  while (firstIndex < layer2.length) firstIndex <<= 1;

  var treeSize = 2 * firstIndex - 1;
  firstIndex -= 1;

  var tree = [];
  for (var i = 0; i < treeSize; ++i) { tree[i] = 0; }

  var cc = 0;
  indices.forEach(function(i) {
    var treeIndex = i + firstIndex;
    ++tree[treeIndex];
    var weightSum = 0;
    while (treeIndex > 0) {
      if (treeIndex % 2) {
        cc += tree[treeIndex + 1];
      }
      treeIndex = (treeIndex - 1) >> 1;
      ++tree[treeIndex];
    }
  });

  return cc;
};

function layerPos(layer) {
  var pos = {};
  layer.forEach(function(u, i) { pos[u] = i; });
  return pos;
}
/*
 * The algorithms here are based on Brandes and Köpf, "Fast and Simple
 * Horizontal Coordinate Assignment".
 */
dagre.layout.position = function() {
  // External configuration
  var config = {
    nodeSep: 50,
    edgeSep: 10,
    universalSep: null,
    rankSep: 30,
    rankDir: "TB",
    debugLevel: 0
  };

  var timer = createTimer();

  var self = {};

  self.nodeSep = propertyAccessor(self, config, "nodeSep");
  self.edgeSep = propertyAccessor(self, config, "edgeSep");
  // If not null this separation value is used for all nodes and edges
  // regardless of their widths. `nodeSep` and `edgeSep` are ignored with this
  // option.
  self.universalSep = propertyAccessor(self, config, "universalSep");
  self.rankSep = propertyAccessor(self, config, "rankSep");
  self.rankDir = propertyAccessor(self, config, "rankDir");
  self.debugLevel = propertyAccessor(self, config, "debugLevel", function(x) {
    timer.enabled(x);
  });

  self.run = timer.wrap("Position Phase", run);

  return self;

  function run(g) {
    var layering = [];
    g.eachNode(function(u, node) {
      var layer = layering[node.rank] || (layering[node.rank] = []);
      layer[node.order] = u;
    });

    var conflicts = findConflicts(g, layering);

    var xss = {};
    ["u", "d"].forEach(function(vertDir) {
      if (vertDir === "d") layering.reverse();

      ["l", "r"].forEach(function(horizDir) {
        if (horizDir === "r") reverseInnerOrder(layering);

        var dir = vertDir + horizDir;
        var align = verticalAlignment(g, layering, conflicts, vertDir === "u" ? "predecessors" : "successors");
        xss[dir]= horizontalCompaction(g, layering, align.pos, align.root, align.align);
        if (horizDir === "r") flipHorizontally(xss[dir]);

        if (horizDir === "r") reverseInnerOrder(layering);
      });

      if (vertDir === "d") layering.reverse();
    });

    balance(g, layering, xss);
    g.eachNode(function(v) {
      var xs = [];
      for (var alignment in xss) {
        xDebug(alignment, g, v, xss[alignment][v]);
        xs.push(xss[alignment][v]);
      }
      xs.sort(function(x, y) { return x - y; });
      x(g, v, (xs[1] + xs[2]) / 2);
    });

    // Translate layout so left edge of bounding rectangle has coordinate 0
    var minX = min(g.nodes().map(function(u) { return x(g, u) - width(g, u) / 2; }));
    g.eachNode(function(u) { x(g, u, x(g, u) - minX); });

    // Align y coordinates with ranks
    var posY = 0;
    layering.forEach(function(layer) {
      var maxHeight = max(layer.map(function(u) { return height(g, u); }));
      posY += maxHeight / 2;
      layer.forEach(function(u) { y(g, u, posY); });
      posY += maxHeight / 2 + config.rankSep;
    });
  };

  /*
   * Generate an ID that can be used to represent any undirected edge that is
   * incident on `u` and `v`.
   */
  function undirEdgeId(u, v) {
    return u < v
      ? u.toString().length + ":" + u + "-" + v
      : v.toString().length + ":" + v + "-" + u;
  }

  function findConflicts(g, layering) {
    var conflicts = {}, // Set of conflicting edge ids
        pos = {};       // Position of node in its layer

    if (layering.length <= 2) return conflicts;

    layering[1].forEach(function(u, i) { pos[u] = i; });
    for (var i = 1; i < layering.length - 1; ++i) {
      var prevLayer = layering[i];
      var currLayer = layering[i+1];
      var k0 = 0; // Position of the last inner segment in the previous layer
      var l = 0;  // Current position in the current layer (for iteration up to `l1`)

      // Scan current layer for next node that is incident to an inner segement
      // between layering[i+1] and layering[i].
      for (var l1 = 0; l1 < currLayer.length; ++l1) {
        var u = currLayer[l1]; // Next inner segment in the current layer or
                               // last node in the current layer
        pos[u] = l1;

        var k1 = undefined; // Position of the next inner segment in the previous layer or
                            // the position of the last element in the previous layer
        if (g.node(u).dummy) {
          var uPred = g.predecessors(u)[0];
          if (g.node(uPred).dummy)
            k1 = pos[uPred];
        }
        if (k1 === undefined && l1 === currLayer.length - 1)
          k1 = prevLayer.length - 1;

        if (k1 !== undefined) {
          for (; l <= l1; ++l) {
            g.predecessors(currLayer[l]).forEach(function(v) {
              var k = pos[v];
              if (k < k0 || k > k1)
                conflicts[undirEdgeId(currLayer[l], v)] = true;
            });
          }
          k0 = k1;
        }
      }
    }

    return conflicts;
  }

  function verticalAlignment(g, layering, conflicts, relationship) {
    var pos = {},   // Position for a node in its layer
        root = {},  // Root of the block that the node participates in
        align = {}; // Points to the next node in the block or, if the last
                    // element in the block, points to the first block's root

    layering.forEach(function(layer) {
      layer.forEach(function(u, i) {
        root[u] = u;
        align[u] = u;
        pos[u] = i;
      });
    });

    layering.forEach(function(layer) {
      var prevIdx = -1;
      layer.forEach(function(v) {
        var related = g[relationship](v), // Adjacent nodes from the previous layer
            mid;                          // The mid point in the related array

        if (related.length > 0) {
          related.sort(function(x, y) { return pos[x] - pos[y]; });
          mid = (related.length - 1) / 2;
          related.slice(Math.floor(mid), Math.ceil(mid) + 1).forEach(function(u) {
            if (align[v] === v) {
              if (!conflicts[undirEdgeId(u, v)] && prevIdx < pos[u]) {
                align[u] = v;
                align[v] = root[v] = root[u];
                prevIdx = pos[u];
              }
            }
          });
        }
      });
    });

    return { pos: pos, root: root, align: align };
  }

  // This function deviates from the standard BK algorithm in two ways. First
  // it takes into account the size of the nodes. Second it includes a fix to
  // the original algorithm that is described in Carstens, "Node and Label
  // Placement in a Layered Layout Algorithm".
  function horizontalCompaction(g, layering, pos, root, align) {
    var sink = {},  // Mapping of node id -> sink node id for class
        shift = {}, // Mapping of sink node id -> x delta
        pred = {},  // Mapping of node id -> predecessor node (or null)
        xs = {};    // Calculated X positions

    layering.forEach(function(layer) {
      layer.forEach(function(u, i) {
        sink[u] = u;
        if (i > 0)
          pred[u] = layer[i - 1];
      });
    });

    function placeBlock(v) {
      if (!(v in xs)) {
        xs[v] = 0;
        var w = v;
        do {
          if (pos[w] > 0) {
            var u = root[pred[w]];
            placeBlock(u);
            if (sink[v] === v) {
              sink[v] = sink[u];
            }
            var delta = sep(g, pred[w]) + sep(g, w);
            if (sink[v] !== sink[u]) {
              shift[sink[u]] = Math.min(shift[sink[u]] || Number.POSITIVE_INFINITY, xs[v] - xs[u] - delta);
            } else {
              xs[v] = Math.max(xs[v], xs[u] + delta);
            }
          }
          w = align[w];
        } while (w !== v);
      }
    }

    // Root coordinates relative to sink
    values(root).forEach(function(v) {
      placeBlock(v);
    });

    // Absolute coordinates
    layering.forEach(function(layer) {
      layer.forEach(function(v) {
        xs[v] = xs[root[v]];
        var xDelta = shift[sink[v]];
        if (root[v] === v && xDelta < Number.POSITIVE_INFINITY)
          xs[v] += xDelta;
      });
    });

    return xs;
  }

  function findMinCoord(g, layering, xs) {
    return min(layering.map(function(layer) {
      var u = layer[0];
      return xs[u];
    }));
  }

  function findMaxCoord(g, layering, xs) {
    return max(layering.map(function(layer) {
      var u = layer[layer.length - 1];
      return xs[u];
    }));
  }

  function balance(g, layering, xss) {
    var min = {},                            // Min coordinate for the alignment
        max = {},                            // Max coordinate for the alginment
        smallestAlignment,
        shift = {};                          // Amount to shift a given alignment

    var smallest = Number.POSITIVE_INFINITY;
    for (var alignment in xss) {
      var xs = xss[alignment];
      min[alignment] = findMinCoord(g, layering, xs);
      max[alignment] = findMaxCoord(g, layering, xs);
      var w = max[alignment] - min[alignment];
      if (w < smallest) {
        smallest = w;
        smallestAlignment = alignment;
      }
    }

    // Determine how much to adjust positioning for each alignment
    ["u", "d"].forEach(function(vertDir) {
      ["l", "r"].forEach(function(horizDir) {
        var alignment = vertDir + horizDir;
        shift[alignment] = horizDir === "l"
            ? min[smallestAlignment] - min[alignment]
            : max[smallestAlignment] - max[alignment];
      });
    });

    // Find average of medians for xss array
    for (var alignment in xss) {
      g.eachNode(function(v) {
        xss[alignment][v] += shift[alignment];
      });
    }
  }

  function flipHorizontally(xs) {
    for (var u in xs) {
      xs[u] = -xs[u];
    }
  }

  function reverseInnerOrder(layering) {
    layering.forEach(function(layer) {
      layer.reverse();
    });
  }

  function width(g, u) {
    switch (config.rankDir) {
      case "LR": return g.node(u).height;
      default:   return g.node(u).width;
    }
  }

  function height(g, u) {
    switch(config.rankDir) {
      case "LR": return g.node(u).width;
      default:   return g.node(u).height;
    }
  }

  function sep(g, u) {
    if (config.universalSep !== null) {
      return config.universalSep;
    }
    var w = width(g, u);
    var s = g.node(u).dummy ? config.edgeSep : config.nodeSep;
    return (w + s) / 2;
  }

  function x(g, u, x) {
    switch (config.rankDir) {
      case "LR":
        if (arguments.length < 3) {
          return g.node(u).y;
        } else {
          g.node(u).y = x;
        }
        break;
      default:
        if (arguments.length < 3) {
          return g.node(u).x;
        } else {
          g.node(u).x = x;
        }
    }
  }

  function xDebug(name, g, u, x) {
    switch (config.rankDir) {
      case "LR":
        if (arguments.length < 3) {
          return g.node(u)[name];
        } else {
          g.node(u)[name] = x;
        }
        break;
      default:
        if (arguments.length < 3) {
          return g.node(u)[name];
        } else {
          g.node(u)[name] = x;
        }
    }
  }

  function y(g, u, y) {
    switch (config.rankDir) {
      case "LR":
        if (arguments.length < 3) {
          return g.node(u).x;
        } else {
          g.node(u).x = y;
        }
        break;
      default:
        if (arguments.length < 3) {
          return g.node(u).y;
        } else {
          g.node(u).y = y;
        }
    }
  }
};
dagre.util = {};

/*
 * Copies attributes from `src` to `dst`. If an attribute name is in both
 * `src` and `dst` then the attribute value from `src` takes precedence.
 */
function mergeAttributes(src, dst) {
  Object.keys(src).forEach(function(k) { dst[k] = src[k]; });
}

/*
 * Returns the smallest value in the array.
 */
function min(values) {
  return Math.min.apply(null, values);
}

/*
 * Returns the largest value in the array.
 */
function max(values) {
  return Math.max.apply(null, values);
}

/*
 * Accumulates the sum of elements in the given array using the `+` operator.
 */
var sum = dagre.util.sum = function(values) {
  return values.reduce(function(acc, x) { return acc + x; }, 0);
};

/*
 * Joins all of the given arrays into a single array.
 */
function concat(arrays) {
  return Array.prototype.concat.apply([], arrays);
}

var keys = dagre.util.keys = Object.keys;

/*
 * Returns an array of all values in the given object.
 */
function values(obj) {
  return Object.keys(obj).map(function(k) { return obj[k]; });
}

/*
 * Treats each input array as a set and returns the union of all of the arrays.
 * This function biases towards the last array. That is, if an "equivalent"
 * key appears in more than on array, the resulting array will contain the last
 * "equivalent" key.
 */
function union(arrays) {
  var obj = {};
  for (var i = 0; i < arrays.length; ++i) {
    var a = arrays[i];
    for (var j = 0; j < a.length; ++j) {
      var v = a[j];
      obj[v] = v;
    }
  }

  var results = [];
  for (var k in obj) {
    results.push(obj[k]);
  }

  return results;
}

/*
 * Returns all components in the graph using undirected navigation.
 */
var components = dagre.util.components = function(g) {
  var results = [];
  var visited = {};

  function dfs(u, component) {
    if (!(u in visited)) {
      visited[u] = true;
      component.push(u);
      g.neighbors(u).forEach(function(v) {
        dfs(v, component);
      });
    }
  }

  g.eachNode(function(u) {
    var component = [];
    dfs(u, component);
    if (component.length > 0) {
      results.push(component);
    }
  });

  return results;
};

/*
 * This algorithm uses undirected traversal to find a miminum spanning tree
 * using the supplied weight function. The algorithm is described in
 * Cormen, et al., "Introduction to Algorithms". The returned structure
 * is an array of node id to an array of adjacent nodes.
 */
var prim = dagre.util.prim = function(g, weight) {
  var result = {};
  var parent = {};
  var q = priorityQueue();

  if (g.nodes().length === 0) {
    return result;
  }

  g.eachNode(function(u) {
    q.add(u, Number.POSITIVE_INFINITY);
    result[u] = [];
  });

  // Start from arbitrary node
  q.decrease(g.nodes()[0], 0);

  var u;
  var init = false;
  while (q.size() > 0) {
    u = q.removeMin();
    if (u in parent) {
      result[u].push(parent[u]);
      result[parent[u]].push(u);
    } else if (init) {
      throw new Error("Input graph is not connected:\n" + g.toString());
    } else {
      init = true;
    }

    g.neighbors(u).forEach(function(v) {
      var pri = q.priority(v);
      if (pri !== undefined) {
        var edgeWeight = weight(u, v);
        if (edgeWeight < pri) {
          parent[v] = u;
          q.decrease(v, edgeWeight);
        }
      }
    });
  }

  return result;
};

var intersectRect = dagre.util.intersectRect = function(rect, point) {
  var x = rect.x;
  var y = rect.y;

  // For now we only support rectangles

  // Rectangle intersection algorithm from:
  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
  var dx = point.x - x;
  var dy = point.y - y;
  var w = rect.width / 2;
  var h = rect.height / 2;

  var sx, sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    // Intersection is top or bottom of rect.
    if (dy < 0) {
      h = -h;
    }
    sx = dy === 0 ? 0 : h * dx / dy;
    sy = h;
  } else {
    // Intersection is left or right of rect.
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = dx === 0 ? 0 : w * dy / dx;
  }

  return {x: x + sx, y: y + sy};
};

var pointStr = dagre.util.pointStr = function(point) {
  return point.x + "," + point.y;
};

var createTimer = function() {
  var self = {},
      enabled = false;

  self.enabled = function(x) {
    if (!arguments.length) return enabled;
    enabled = x;
    return self;
  };

  self.wrap = function(name, func) {
    return function() {
      var start = enabled ? new Date().getTime() : null;
      try {
        return func.apply(null, arguments);
      } finally {
        if (start) console.log(name + " time: " + (new Date().getTime() - start) + "ms");
      }
    };
  };

  return self;
};

function propertyAccessor(self, config, field, setHook) {
  return function(x) {
    if (!arguments.length) return config[field];
    config[field] = x;
    if (setHook) setHook(x);
    return self;
  };
}
function priorityQueue() {
  var _arr = [];
  var _keyIndices = {};

  function _heapify(i) {
    var arr = _arr;
    var l = 2 * i,
        r = l + 1,
        largest = i;
    if (l < arr.length) {
      largest = arr[l].pri < arr[largest].pri ? l : largest;
      if (r < arr.length) {
        largest = arr[r].pri < arr[largest].pri ? r : largest;
      }
      if (largest !== i) {
        _swap(i, largest);
        _heapify(largest);
      }
    }
  }

  function _decrease(index) {
    var arr = _arr;
    var pri = arr[index].pri;
    var parent;
    while (index > 0) {
      parent = index >> 1;
      if (arr[parent].pri < pri) {
        break;
      }
      _swap(index, parent);
      index = parent;
    }
  }

  function _swap(i, j) {
    var arr = _arr;
    var keyIndices = _keyIndices;
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    keyIndices[arr[i].key] = i;
    keyIndices[arr[j].key] = j;
  }

  function size() { return _arr.length; }

  function keys() { return Object.keys(_keyIndices); }

  function has(key) { return key in _keyIndices; }

  function priority(key) {
    var index = _keyIndices[key];
    if (index !== undefined) {
      return _arr[index].pri;
    }
  }

  function add(key, pri) {
    if (!(key in _keyIndices)) {
      var entry = {key: key, pri: pri};
      var index = _arr.length;
      _keyIndices[key] = index;
      _arr.push(entry);
      _decrease(index);
      return true;
    }
    return false;
  }

  function min() {
    if (size() > 0) {
      return _arr[0].key;
    }
  }

  function removeMin() {
    _swap(0, _arr.length - 1);
    var min = _arr.pop();
    delete _keyIndices[min.key];
    _heapify(0);
    return min.key;
  }

  function decrease(key, pri) {
    var index = _keyIndices[key];
    if (pri > _arr[index].pri) {
      throw new Error("New priority is greater than current priority. " +
          "Key: " + key + " Old: " + _arr[index].pri + " New: " + pri);
    }
    _arr[index].pri = pri;
    _decrease(index);
  }

  return {
    size: size,
    keys: keys,
    has: has,
    priority: priority,
    add: add,
    min: min,
    removeMin: removeMin,
    decrease: decrease
  };
}
dagre.dot = {};

dagre.dot.toGraph = function(str) {
  var parseTree = dot_parser.parse(str);
  var g = dagre.graph();
  var undir = parseTree.type === "graph";

  function createNode(id, attrs) {
    if (!(g.hasNode(id))) {
      // We only apply default attributes to a node when it is first defined.
      // If the node is subsequently used in edges, we skip apply default
      // attributes.
      g.addNode(id, defaultAttrs.get("node", { id: id }));

      // The "label" attribute is given special treatment: if it is not
      // defined we set it to the id of the node.
      if (g.node(id).label === undefined) {
        g.node(id).label = id;
      }
    }
    if (attrs) {
      mergeAttributes(attrs, g.node(id));
    }
  }

  var edgeCount = {};
  function createEdge(source, target, attrs) {
    var edgeKey = source + "-" + target;
    var count = edgeCount[edgeKey];
    if (!count) {
      count = edgeCount[edgeKey] = 0;
    }
    edgeCount[edgeKey]++;

    var id = attrs.id || edgeKey + "-" + count;
    var edge = {};
    mergeAttributes(defaultAttrs.get("edge", attrs), edge);
    mergeAttributes({ id: id }, edge);
    g.addEdge(id, source, target, edge);
  }

  function collectNodeIds(stmt) {
    var ids = {},
        stack = [],
        curr;
    function pushStack(e) { stack.push(e); }

    pushStack(stmt);
    while (stack.length !== 0) {
      curr = stack.pop();
      switch (curr.type) {
        case "node": ids[curr.id] = true; break;
        case "edge":
          curr.elems.forEach(pushStack);
          break;
        case "subgraph":
          curr.stmts.forEach(pushStack);
          break;
      }
    }
    return dagre.util.keys(ids);
  }

  /*
   * We use a chain of prototypes to maintain properties as we descend into
   * subgraphs. This allows us to simply get the value for a property and have
   * the VM do appropriate resolution. When we leave a subgraph we simply set
   * the current context to the prototype of the current defaults object.
   * Alternatively, this could have been written using a stack.
   */
  var defaultAttrs = {
    _default: {},

    get: function get(type, attrs) {
      if (typeof this._default[type] !== "undefined") {
        var mergedAttrs = {};
        // clone default attributes so they won't get overwritten in the next step
        mergeAttributes(this._default[type], mergedAttrs);
        // merge statement attributes with default attributes, precedence give to stmt attributes
        mergeAttributes(attrs, mergedAttrs);
        return mergedAttrs;
      } else {
        return attrs;
      }
    },

    set: function set(type, attrs) {
      this._default[type] = this.get(type, attrs);
    },

    enterSubGraph: function() {
      function SubGraph() {}
      SubGraph.prototype = this._default;
      var subgraph = new SubGraph();
      this._default = subgraph;
    },

    exitSubGraph: function() {
      this._default = Object.getPrototypeOf(this._default);
    }
  };

  function handleStmt(stmt) {
    var attrs = stmt.attrs;
    switch (stmt.type) {
      case "node":
        createNode(stmt.id, attrs);
        break;
      case "edge":
        var prev,
            curr;
        stmt.elems.forEach(function(elem) {
          handleStmt(elem);

          switch(elem.type) {
            case "node": curr = [elem.id]; break;
            case "subgraph": curr = collectNodeIds(elem); break;
            default:
              // We don't currently support subgraphs incident on an edge
              throw new Error("Unsupported type incident on edge: " + elem.type);
          }

          if (prev) {
            prev.forEach(function(p) {
              curr.forEach(function(c) {
                createEdge(p, c, attrs);
                if (undir) {
                  createEdge(c, p, attrs);
                }
              });
            });
          }
          prev = curr;
        });
        break;
      case "subgraph":
        defaultAttrs.enterSubGraph();
        stmt.stmts.forEach(function(s) { handleStmt(s); });
        defaultAttrs.exitSubGraph();
        break;
      case "attr":
        defaultAttrs.set(stmt.attrType, attrs);
        break;
      default:
        throw new Error("Unsupported statement type: " + stmt.type);
    }
  }

  if (parseTree.stmts) {
    parseTree.stmts.forEach(function(stmt) {
      handleStmt(stmt);
    });
  }

  return g;
};

dagre.dot.toObjects = function(str) {
  var g = dagre.dot.toGraph(str);
  var nodes = g.nodes().map(function(u) { return g.node(u); });
  var edges = g.edges().map(function(e) {
    var edge = g.edge(e);
    edge.source = g.node(g.source(e));
    edge.target = g.node(g.target(e));
    return edge;
  });
  return { nodes: nodes, edges: edges };
};
dot_parser = (function(){
  /*
   * Generated by PEG.js 0.7.0.
   *
   * http://pegjs.majda.cz/
   */
  
  function quote(s) {
    /*
     * ECMA-262, 5th ed., 7.8.4: All characters may appear literally in a
     * string literal except for the closing quote character, backslash,
     * carriage return, line separator, paragraph separator, and line feed.
     * Any character may appear in the form of an escape sequence.
     *
     * For portability, we also escape escape all control and non-ASCII
     * characters. Note that "\0" and "\v" escape sequences are not used
     * because JSHint does not like the first and IE the second.
     */
     return '"' + s
      .replace(/\\/g, '\\\\')  // backslash
      .replace(/"/g, '\\"')    // closing quote character
      .replace(/\x08/g, '\\b') // backspace
      .replace(/\t/g, '\\t')   // horizontal tab
      .replace(/\n/g, '\\n')   // line feed
      .replace(/\f/g, '\\f')   // form feed
      .replace(/\r/g, '\\r')   // carriage return
      .replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape)
      + '"';
  }
  
  var result = {
    /*
     * Parses the input with a generated parser. If the parsing is successfull,
     * returns a value explicitly or implicitly specified by the grammar from
     * which the parser was generated (see |PEG.buildParser|). If the parsing is
     * unsuccessful, throws |PEG.parser.SyntaxError| describing the error.
     */
    parse: function(input, startRule) {
      var parseFunctions = {
        "start": parse_start,
        "stmtList": parse_stmtList,
        "stmt": parse_stmt,
        "attrStmt": parse_attrStmt,
        "inlineAttrStmt": parse_inlineAttrStmt,
        "nodeStmt": parse_nodeStmt,
        "edgeStmt": parse_edgeStmt,
        "subgraphStmt": parse_subgraphStmt,
        "attrList": parse_attrList,
        "attrListBlock": parse_attrListBlock,
        "aList": parse_aList,
        "edgeRHS": parse_edgeRHS,
        "idDef": parse_idDef,
        "nodeIdOrSubgraph": parse_nodeIdOrSubgraph,
        "nodeId": parse_nodeId,
        "port": parse_port,
        "compassPt": parse_compassPt,
        "id": parse_id,
        "node": parse_node,
        "edge": parse_edge,
        "graph": parse_graph,
        "digraph": parse_digraph,
        "subgraph": parse_subgraph,
        "strict": parse_strict,
        "graphType": parse_graphType,
        "whitespace": parse_whitespace,
        "comment": parse_comment,
        "_": parse__
      };
      
      if (startRule !== undefined) {
        if (parseFunctions[startRule] === undefined) {
          throw new Error("Invalid rule name: " + quote(startRule) + ".");
        }
      } else {
        startRule = "start";
      }
      
      var pos = 0;
      var reportFailures = 0;
      var rightmostFailuresPos = 0;
      var rightmostFailuresExpected = [];
      
      function padLeft(input, padding, length) {
        var result = input;
        
        var padLength = length - input.length;
        for (var i = 0; i < padLength; i++) {
          result = padding + result;
        }
        
        return result;
      }
      
      function escape(ch) {
        var charCode = ch.charCodeAt(0);
        var escapeChar;
        var length;
        
        if (charCode <= 0xFF) {
          escapeChar = 'x';
          length = 2;
        } else {
          escapeChar = 'u';
          length = 4;
        }
        
        return '\\' + escapeChar + padLeft(charCode.toString(16).toUpperCase(), '0', length);
      }
      
      function matchFailed(failure) {
        if (pos < rightmostFailuresPos) {
          return;
        }
        
        if (pos > rightmostFailuresPos) {
          rightmostFailuresPos = pos;
          rightmostFailuresExpected = [];
        }
        
        rightmostFailuresExpected.push(failure);
      }
      
      function parse_start() {
        var result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11, result12;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = [];
        result1 = parse__();
        while (result1 !== null) {
          result0.push(result1);
          result1 = parse__();
        }
        if (result0 !== null) {
          pos2 = pos;
          result1 = parse_strict();
          if (result1 !== null) {
            result2 = parse__();
            if (result2 !== null) {
              result1 = [result1, result2];
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result2 = parse_graphType();
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                result4 = parse_id();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result5 = [];
                  result6 = parse__();
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse__();
                  }
                  if (result5 !== null) {
                    if (input.charCodeAt(pos) === 123) {
                      result6 = "{";
                      pos++;
                    } else {
                      result6 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"{\"");
                      }
                    }
                    if (result6 !== null) {
                      result7 = [];
                      result8 = parse__();
                      while (result8 !== null) {
                        result7.push(result8);
                        result8 = parse__();
                      }
                      if (result7 !== null) {
                        result8 = parse_stmtList();
                        result8 = result8 !== null ? result8 : "";
                        if (result8 !== null) {
                          result9 = [];
                          result10 = parse__();
                          while (result10 !== null) {
                            result9.push(result10);
                            result10 = parse__();
                          }
                          if (result9 !== null) {
                            if (input.charCodeAt(pos) === 125) {
                              result10 = "}";
                              pos++;
                            } else {
                              result10 = null;
                              if (reportFailures === 0) {
                                matchFailed("\"}\"");
                              }
                            }
                            if (result10 !== null) {
                              result11 = [];
                              result12 = parse__();
                              while (result12 !== null) {
                                result11.push(result12);
                                result12 = parse__();
                              }
                              if (result11 !== null) {
                                result0 = [result0, result1, result2, result3, result4, result5, result6, result7, result8, result9, result10, result11];
                              } else {
                                result0 = null;
                                pos = pos1;
                              }
                            } else {
                              result0 = null;
                              pos = pos1;
                            }
                          } else {
                            result0 = null;
                            pos = pos1;
                          }
                        } else {
                          result0 = null;
                          pos = pos1;
                        }
                      } else {
                        result0 = null;
                        pos = pos1;
                      }
                    } else {
                      result0 = null;
                      pos = pos1;
                    }
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, type, id, stmts) {
                return {type: type, id: id, stmts: stmts};
              })(pos0, result0[2], result0[4], result0[8]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_stmtList() {
        var result0, result1, result2, result3, result4, result5, result6, result7;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_stmt();
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 59) {
              result2 = ";";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\";\"");
              }
            }
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = [];
              pos2 = pos;
              result4 = [];
              result5 = parse__();
              while (result5 !== null) {
                result4.push(result5);
                result5 = parse__();
              }
              if (result4 !== null) {
                result5 = parse_stmt();
                if (result5 !== null) {
                  result6 = [];
                  result7 = parse__();
                  while (result7 !== null) {
                    result6.push(result7);
                    result7 = parse__();
                  }
                  if (result6 !== null) {
                    if (input.charCodeAt(pos) === 59) {
                      result7 = ";";
                      pos++;
                    } else {
                      result7 = null;
                      if (reportFailures === 0) {
                        matchFailed("\";\"");
                      }
                    }
                    result7 = result7 !== null ? result7 : "";
                    if (result7 !== null) {
                      result4 = [result4, result5, result6, result7];
                    } else {
                      result4 = null;
                      pos = pos2;
                    }
                  } else {
                    result4 = null;
                    pos = pos2;
                  }
                } else {
                  result4 = null;
                  pos = pos2;
                }
              } else {
                result4 = null;
                pos = pos2;
              }
              while (result4 !== null) {
                result3.push(result4);
                pos2 = pos;
                result4 = [];
                result5 = parse__();
                while (result5 !== null) {
                  result4.push(result5);
                  result5 = parse__();
                }
                if (result4 !== null) {
                  result5 = parse_stmt();
                  if (result5 !== null) {
                    result6 = [];
                    result7 = parse__();
                    while (result7 !== null) {
                      result6.push(result7);
                      result7 = parse__();
                    }
                    if (result6 !== null) {
                      if (input.charCodeAt(pos) === 59) {
                        result7 = ";";
                        pos++;
                      } else {
                        result7 = null;
                        if (reportFailures === 0) {
                          matchFailed("\";\"");
                        }
                      }
                      result7 = result7 !== null ? result7 : "";
                      if (result7 !== null) {
                        result4 = [result4, result5, result6, result7];
                      } else {
                        result4 = null;
                        pos = pos2;
                      }
                    } else {
                      result4 = null;
                      pos = pos2;
                    }
                  } else {
                    result4 = null;
                    pos = pos2;
                  }
                } else {
                  result4 = null;
                  pos = pos2;
                }
              }
              if (result3 !== null) {
                result0 = [result0, result1, result2, result3];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, first, rest) {
                var result = [first];
                for (var i = 0; i < rest.length; ++i) {
                    result.push(rest[i][1]);
                }
                return result;
              })(pos0, result0[0], result0[3]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_stmt() {
        var result0;
        
        result0 = parse_attrStmt();
        if (result0 === null) {
          result0 = parse_edgeStmt();
          if (result0 === null) {
            result0 = parse_subgraphStmt();
            if (result0 === null) {
              result0 = parse_inlineAttrStmt();
              if (result0 === null) {
                result0 = parse_nodeStmt();
              }
            }
          }
        }
        return result0;
      }
      
      function parse_attrStmt() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_graph();
        if (result0 === null) {
          result0 = parse_node();
          if (result0 === null) {
            result0 = parse_edge();
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_attrList();
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, type, attrs) {
                return { type: "attr", attrType: type, attrs: attrs || {}};
              })(pos0, result0[0], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_inlineAttrStmt() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_id();
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 61) {
              result2 = "=";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"=\"");
              }
            }
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                result4 = parse_id();
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, k, v) {
                var attrs = {};
                attrs[k] = v;
                return { type: "inlineAttr", attrs: attrs };
              })(pos0, result0[0], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_nodeStmt() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_nodeId();
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_attrList();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, id, attrs) { return {type: "node", id: id, attrs: attrs || {}}; })(pos0, result0[0], result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_edgeStmt() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_nodeIdOrSubgraph();
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_edgeRHS();
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                result4 = parse_attrList();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, lhs, rhs, attrs) {
                var elems = [lhs];
                for (var i = 0; i < rhs.length; ++i) {
                    elems.push(rhs[i]);
                }
                return { type: "edge", elems: elems, attrs: attrs || {} };
              })(pos0, result0[0], result0[2], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_subgraphStmt() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1, pos2, pos3;
        
        pos0 = pos;
        pos1 = pos;
        pos2 = pos;
        result0 = parse_subgraph();
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            pos3 = pos;
            result2 = parse_id();
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos3;
              }
            } else {
              result2 = null;
              pos = pos3;
            }
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos2;
            }
          } else {
            result0 = null;
            pos = pos2;
          }
        } else {
          result0 = null;
          pos = pos2;
        }
        result0 = result0 !== null ? result0 : "";
        if (result0 !== null) {
          if (input.charCodeAt(pos) === 123) {
            result1 = "{";
            pos++;
          } else {
            result1 = null;
            if (reportFailures === 0) {
              matchFailed("\"{\"");
            }
          }
          if (result1 !== null) {
            result2 = [];
            result3 = parse__();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse__();
            }
            if (result2 !== null) {
              result3 = parse_stmtList();
              if (result3 !== null) {
                result4 = [];
                result5 = parse__();
                while (result5 !== null) {
                  result4.push(result5);
                  result5 = parse__();
                }
                if (result4 !== null) {
                  if (input.charCodeAt(pos) === 125) {
                    result5 = "}";
                    pos++;
                  } else {
                    result5 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"}\"");
                    }
                  }
                  if (result5 !== null) {
                    result0 = [result0, result1, result2, result3, result4, result5];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, id, stmts) {
                id = id[2] || [];
                return { type: "subgraph", id: id[0], stmts: stmts };
              })(pos0, result0[0], result0[3]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_attrList() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_attrListBlock();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = [];
          result3 = parse__();
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse__();
          }
          if (result2 !== null) {
            result3 = parse_attrListBlock();
            if (result3 !== null) {
              result2 = [result2, result3];
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = [];
            result3 = parse__();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse__();
            }
            if (result2 !== null) {
              result3 = parse_attrListBlock();
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, first, rest) {
                var result = first;
                for (var i = 0; i < rest.length; ++i) {
                    result = rightBiasedMerge(result, rest[i][1]);
                }
                return result;
              })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_attrListBlock() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        if (input.charCodeAt(pos) === 91) {
          result0 = "[";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"[\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_aList();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                if (input.charCodeAt(pos) === 93) {
                  result4 = "]";
                  pos++;
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"]\"");
                  }
                }
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, aList) { return aList; })(pos0, result0[2]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_aList() {
        var result0, result1, result2, result3, result4, result5;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_idDef();
        if (result0 !== null) {
          result1 = [];
          pos2 = pos;
          result2 = [];
          result3 = parse__();
          while (result3 !== null) {
            result2.push(result3);
            result3 = parse__();
          }
          if (result2 !== null) {
            if (input.charCodeAt(pos) === 44) {
              result3 = ",";
              pos++;
            } else {
              result3 = null;
              if (reportFailures === 0) {
                matchFailed("\",\"");
              }
            }
            result3 = result3 !== null ? result3 : "";
            if (result3 !== null) {
              result4 = [];
              result5 = parse__();
              while (result5 !== null) {
                result4.push(result5);
                result5 = parse__();
              }
              if (result4 !== null) {
                result5 = parse_idDef();
                if (result5 !== null) {
                  result2 = [result2, result3, result4, result5];
                } else {
                  result2 = null;
                  pos = pos2;
                }
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          } else {
            result2 = null;
            pos = pos2;
          }
          while (result2 !== null) {
            result1.push(result2);
            pos2 = pos;
            result2 = [];
            result3 = parse__();
            while (result3 !== null) {
              result2.push(result3);
              result3 = parse__();
            }
            if (result2 !== null) {
              if (input.charCodeAt(pos) === 44) {
                result3 = ",";
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("\",\"");
                }
              }
              result3 = result3 !== null ? result3 : "";
              if (result3 !== null) {
                result4 = [];
                result5 = parse__();
                while (result5 !== null) {
                  result4.push(result5);
                  result5 = parse__();
                }
                if (result4 !== null) {
                  result5 = parse_idDef();
                  if (result5 !== null) {
                    result2 = [result2, result3, result4, result5];
                  } else {
                    result2 = null;
                    pos = pos2;
                  }
                } else {
                  result2 = null;
                  pos = pos2;
                }
              } else {
                result2 = null;
                pos = pos2;
              }
            } else {
              result2 = null;
              pos = pos2;
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, first, rest) {
                var result = first;
                for (var i = 0; i < rest.length; ++i) {
                    result = rightBiasedMerge(result, rest[i][3]);
                }
                return result;
              })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_edgeRHS() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        pos2 = pos;
        if (input.substr(pos, 2) === "--") {
          result0 = "--";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"--\"");
          }
        }
        if (result0 !== null) {
          result1 = (function(offset) { return directed; })(pos) ? null : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos2;
          }
        } else {
          result0 = null;
          pos = pos2;
        }
        if (result0 === null) {
          pos2 = pos;
          if (input.substr(pos, 2) === "->") {
            result0 = "->";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"->\"");
            }
          }
          if (result0 !== null) {
            result1 = (function(offset) { return directed; })(pos) ? "" : null;
            if (result1 !== null) {
              result0 = [result0, result1];
            } else {
              result0 = null;
              pos = pos2;
            }
          } else {
            result0 = null;
            pos = pos2;
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_nodeIdOrSubgraph();
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                result4 = parse_edgeRHS();
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, rhs, rest) {
                var result = [rhs];
                for (var i = 0; i < rest.length; ++i) {
                    result.push(rest[i]);
                }
                return result;
              })(pos0, result0[2], result0[4]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_idDef() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_id();
        if (result0 !== null) {
          pos2 = pos;
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            if (input.charCodeAt(pos) === 61) {
              result2 = "=";
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"=\"");
              }
            }
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                result4 = parse_id();
                if (result4 !== null) {
                  result1 = [result1, result2, result3, result4];
                } else {
                  result1 = null;
                  pos = pos2;
                }
              } else {
                result1 = null;
                pos = pos2;
              }
            } else {
              result1 = null;
              pos = pos2;
            }
          } else {
            result1 = null;
            pos = pos2;
          }
          result1 = result1 !== null ? result1 : "";
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, k, v) {
                var result = {};
                result[k] = v[3];
                return result;
              })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_nodeIdOrSubgraph() {
        var result0;
        var pos0;
        
        result0 = parse_subgraphStmt();
        if (result0 === null) {
          pos0 = pos;
          result0 = parse_nodeId();
          if (result0 !== null) {
            result0 = (function(offset, id) { return { type: "node", id: id, attrs: {} }; })(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        return result0;
      }
      
      function parse_nodeId() {
        var result0, result1, result2;
        var pos0, pos1;
        
        pos0 = pos;
        pos1 = pos;
        result0 = parse_id();
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_port();
            result2 = result2 !== null ? result2 : "";
            if (result2 !== null) {
              result0 = [result0, result1, result2];
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, id) { return id; })(pos0, result0[0]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_port() {
        var result0, result1, result2, result3, result4, result5, result6;
        var pos0, pos1;
        
        pos0 = pos;
        if (input.charCodeAt(pos) === 58) {
          result0 = ":";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\":\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          result2 = parse__();
          while (result2 !== null) {
            result1.push(result2);
            result2 = parse__();
          }
          if (result1 !== null) {
            result2 = parse_id();
            if (result2 !== null) {
              result3 = [];
              result4 = parse__();
              while (result4 !== null) {
                result3.push(result4);
                result4 = parse__();
              }
              if (result3 !== null) {
                pos1 = pos;
                if (input.charCodeAt(pos) === 58) {
                  result4 = ":";
                  pos++;
                } else {
                  result4 = null;
                  if (reportFailures === 0) {
                    matchFailed("\":\"");
                  }
                }
                if (result4 !== null) {
                  result5 = [];
                  result6 = parse__();
                  while (result6 !== null) {
                    result5.push(result6);
                    result6 = parse__();
                  }
                  if (result5 !== null) {
                    result6 = parse_compassPt();
                    if (result6 !== null) {
                      result4 = [result4, result5, result6];
                    } else {
                      result4 = null;
                      pos = pos1;
                    }
                  } else {
                    result4 = null;
                    pos = pos1;
                  }
                } else {
                  result4 = null;
                  pos = pos1;
                }
                result4 = result4 !== null ? result4 : "";
                if (result4 !== null) {
                  result0 = [result0, result1, result2, result3, result4];
                } else {
                  result0 = null;
                  pos = pos0;
                }
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        return result0;
      }
      
      function parse_compassPt() {
        var result0;
        
        if (input.charCodeAt(pos) === 110) {
          result0 = "n";
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"n\"");
          }
        }
        if (result0 === null) {
          if (input.substr(pos, 2) === "ne") {
            result0 = "ne";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"ne\"");
            }
          }
          if (result0 === null) {
            if (input.charCodeAt(pos) === 101) {
              result0 = "e";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"e\"");
              }
            }
            if (result0 === null) {
              if (input.substr(pos, 2) === "se") {
                result0 = "se";
                pos += 2;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"se\"");
                }
              }
              if (result0 === null) {
                if (input.charCodeAt(pos) === 115) {
                  result0 = "s";
                  pos++;
                } else {
                  result0 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"s\"");
                  }
                }
                if (result0 === null) {
                  if (input.substr(pos, 2) === "sw") {
                    result0 = "sw";
                    pos += 2;
                  } else {
                    result0 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"sw\"");
                    }
                  }
                  if (result0 === null) {
                    if (input.charCodeAt(pos) === 119) {
                      result0 = "w";
                      pos++;
                    } else {
                      result0 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"w\"");
                      }
                    }
                    if (result0 === null) {
                      if (input.substr(pos, 2) === "nw") {
                        result0 = "nw";
                        pos += 2;
                      } else {
                        result0 = null;
                        if (reportFailures === 0) {
                          matchFailed("\"nw\"");
                        }
                      }
                      if (result0 === null) {
                        if (input.charCodeAt(pos) === 99) {
                          result0 = "c";
                          pos++;
                        } else {
                          result0 = null;
                          if (reportFailures === 0) {
                            matchFailed("\"c\"");
                          }
                        }
                        if (result0 === null) {
                          if (input.charCodeAt(pos) === 95) {
                            result0 = "_";
                            pos++;
                          } else {
                            result0 = null;
                            if (reportFailures === 0) {
                              matchFailed("\"_\"");
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return result0;
      }
      
      function parse_id() {
        var result0, result1, result2, result3, result4;
        var pos0, pos1, pos2, pos3;
        
        reportFailures++;
        pos0 = pos;
        pos1 = pos;
        if (/^[a-zA-Z\u0200-\u0377_]/.test(input.charAt(pos))) {
          result0 = input.charAt(pos);
          pos++;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("[a-zA-Z\\u0200-\\u0377_]");
          }
        }
        if (result0 !== null) {
          result1 = [];
          if (/^[a-zA-Z\u0200-\u0377_0-9]/.test(input.charAt(pos))) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[a-zA-Z\\u0200-\\u0377_0-9]");
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            if (/^[a-zA-Z\u0200-\u0377_0-9]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[a-zA-Z\\u0200-\\u0377_0-9]");
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos1;
          }
        } else {
          result0 = null;
          pos = pos1;
        }
        if (result0 !== null) {
          result0 = (function(offset, fst, rest) { return fst + rest.join(""); })(pos0, result0[0], result0[1]);
        }
        if (result0 === null) {
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          pos1 = pos;
          if (input.charCodeAt(pos) === 45) {
            result0 = "-";
            pos++;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"-\"");
            }
          }
          result0 = result0 !== null ? result0 : "";
          if (result0 !== null) {
            if (input.charCodeAt(pos) === 46) {
              result1 = ".";
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("\".\"");
              }
            }
            if (result1 !== null) {
              if (/^[0-9]/.test(input.charAt(pos))) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("[0-9]");
                }
              }
              if (result3 !== null) {
                result2 = [];
                while (result3 !== null) {
                  result2.push(result3);
                  if (/^[0-9]/.test(input.charAt(pos))) {
                    result3 = input.charAt(pos);
                    pos++;
                  } else {
                    result3 = null;
                    if (reportFailures === 0) {
                      matchFailed("[0-9]");
                    }
                  }
                }
              } else {
                result2 = null;
              }
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
          } else {
            result0 = null;
            pos = pos1;
          }
          if (result0 !== null) {
            result0 = (function(offset, sign, dot, after) { return sign + dot + after.join(""); })(pos0, result0[0], result0[1], result0[2]);
          }
          if (result0 === null) {
            pos = pos0;
          }
          if (result0 === null) {
            pos0 = pos;
            pos1 = pos;
            if (input.charCodeAt(pos) === 45) {
              result0 = "-";
              pos++;
            } else {
              result0 = null;
              if (reportFailures === 0) {
                matchFailed("\"-\"");
              }
            }
            result0 = result0 !== null ? result0 : "";
            if (result0 !== null) {
              if (/^[0-9]/.test(input.charAt(pos))) {
                result2 = input.charAt(pos);
                pos++;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("[0-9]");
                }
              }
              if (result2 !== null) {
                result1 = [];
                while (result2 !== null) {
                  result1.push(result2);
                  if (/^[0-9]/.test(input.charAt(pos))) {
                    result2 = input.charAt(pos);
                    pos++;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("[0-9]");
                    }
                  }
                }
              } else {
                result1 = null;
              }
              if (result1 !== null) {
                pos2 = pos;
                if (input.charCodeAt(pos) === 46) {
                  result2 = ".";
                  pos++;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\".\"");
                  }
                }
                if (result2 !== null) {
                  result3 = [];
                  if (/^[0-9]/.test(input.charAt(pos))) {
                    result4 = input.charAt(pos);
                    pos++;
                  } else {
                    result4 = null;
                    if (reportFailures === 0) {
                      matchFailed("[0-9]");
                    }
                  }
                  while (result4 !== null) {
                    result3.push(result4);
                    if (/^[0-9]/.test(input.charAt(pos))) {
                      result4 = input.charAt(pos);
                      pos++;
                    } else {
                      result4 = null;
                      if (reportFailures === 0) {
                        matchFailed("[0-9]");
                      }
                    }
                  }
                  if (result3 !== null) {
                    result2 = [result2, result3];
                  } else {
                    result2 = null;
                    pos = pos2;
                  }
                } else {
                  result2 = null;
                  pos = pos2;
                }
                result2 = result2 !== null ? result2 : "";
                if (result2 !== null) {
                  result0 = [result0, result1, result2];
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
            } else {
              result0 = null;
              pos = pos1;
            }
            if (result0 !== null) {
              result0 = (function(offset, sign, before, after) { return sign + before.join("") + (after[0] || "") + (after[1] || []).join(""); })(pos0, result0[0], result0[1], result0[2]);
            }
            if (result0 === null) {
              pos = pos0;
            }
            if (result0 === null) {
              pos0 = pos;
              pos1 = pos;
              if (input.charCodeAt(pos) === 34) {
                result0 = "\"";
                pos++;
              } else {
                result0 = null;
                if (reportFailures === 0) {
                  matchFailed("\"\\\"\"");
                }
              }
              if (result0 !== null) {
                result1 = [];
                pos2 = pos;
                if (input.substr(pos, 2) === "\\\"") {
                  result2 = "\\\"";
                  pos += 2;
                } else {
                  result2 = null;
                  if (reportFailures === 0) {
                    matchFailed("\"\\\\\\\"\"");
                  }
                }
                if (result2 !== null) {
                  result2 = (function(offset) { return '"'; })(pos2);
                }
                if (result2 === null) {
                  pos = pos2;
                }
                if (result2 === null) {
                  pos2 = pos;
                  pos3 = pos;
                  if (input.charCodeAt(pos) === 92) {
                    result2 = "\\";
                    pos++;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"\\\\\"");
                    }
                  }
                  if (result2 !== null) {
                    if (/^[^"]/.test(input.charAt(pos))) {
                      result3 = input.charAt(pos);
                      pos++;
                    } else {
                      result3 = null;
                      if (reportFailures === 0) {
                        matchFailed("[^\"]");
                      }
                    }
                    if (result3 !== null) {
                      result2 = [result2, result3];
                    } else {
                      result2 = null;
                      pos = pos3;
                    }
                  } else {
                    result2 = null;
                    pos = pos3;
                  }
                  if (result2 !== null) {
                    result2 = (function(offset, ch) { return "\\" + ch; })(pos2, result2[1]);
                  }
                  if (result2 === null) {
                    pos = pos2;
                  }
                  if (result2 === null) {
                    if (/^[^"]/.test(input.charAt(pos))) {
                      result2 = input.charAt(pos);
                      pos++;
                    } else {
                      result2 = null;
                      if (reportFailures === 0) {
                        matchFailed("[^\"]");
                      }
                    }
                  }
                }
                while (result2 !== null) {
                  result1.push(result2);
                  pos2 = pos;
                  if (input.substr(pos, 2) === "\\\"") {
                    result2 = "\\\"";
                    pos += 2;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"\\\\\\\"\"");
                    }
                  }
                  if (result2 !== null) {
                    result2 = (function(offset) { return '"'; })(pos2);
                  }
                  if (result2 === null) {
                    pos = pos2;
                  }
                  if (result2 === null) {
                    pos2 = pos;
                    pos3 = pos;
                    if (input.charCodeAt(pos) === 92) {
                      result2 = "\\";
                      pos++;
                    } else {
                      result2 = null;
                      if (reportFailures === 0) {
                        matchFailed("\"\\\\\"");
                      }
                    }
                    if (result2 !== null) {
                      if (/^[^"]/.test(input.charAt(pos))) {
                        result3 = input.charAt(pos);
                        pos++;
                      } else {
                        result3 = null;
                        if (reportFailures === 0) {
                          matchFailed("[^\"]");
                        }
                      }
                      if (result3 !== null) {
                        result2 = [result2, result3];
                      } else {
                        result2 = null;
                        pos = pos3;
                      }
                    } else {
                      result2 = null;
                      pos = pos3;
                    }
                    if (result2 !== null) {
                      result2 = (function(offset, ch) { return "\\" + ch; })(pos2, result2[1]);
                    }
                    if (result2 === null) {
                      pos = pos2;
                    }
                    if (result2 === null) {
                      if (/^[^"]/.test(input.charAt(pos))) {
                        result2 = input.charAt(pos);
                        pos++;
                      } else {
                        result2 = null;
                        if (reportFailures === 0) {
                          matchFailed("[^\"]");
                        }
                      }
                    }
                  }
                }
                if (result1 !== null) {
                  if (input.charCodeAt(pos) === 34) {
                    result2 = "\"";
                    pos++;
                  } else {
                    result2 = null;
                    if (reportFailures === 0) {
                      matchFailed("\"\\\"\"");
                    }
                  }
                  if (result2 !== null) {
                    result0 = [result0, result1, result2];
                  } else {
                    result0 = null;
                    pos = pos1;
                  }
                } else {
                  result0 = null;
                  pos = pos1;
                }
              } else {
                result0 = null;
                pos = pos1;
              }
              if (result0 !== null) {
                result0 = (function(offset, id) { return id.join(""); })(pos0, result0[1]);
              }
              if (result0 === null) {
                pos = pos0;
              }
            }
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("identifier");
        }
        return result0;
      }
      
      function parse_node() {
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 4).toLowerCase() === "node") {
          result0 = input.substr(pos, 4);
          pos += 4;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"node\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return k.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_edge() {
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 4).toLowerCase() === "edge") {
          result0 = input.substr(pos, 4);
          pos += 4;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"edge\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return k.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_graph() {
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 5).toLowerCase() === "graph") {
          result0 = input.substr(pos, 5);
          pos += 5;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"graph\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return k.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_digraph() {
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 7).toLowerCase() === "digraph") {
          result0 = input.substr(pos, 7);
          pos += 7;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"digraph\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return k.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_subgraph() {
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 8).toLowerCase() === "subgraph") {
          result0 = input.substr(pos, 8);
          pos += 8;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"subgraph\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return k.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_strict() {
        var result0;
        var pos0;
        
        pos0 = pos;
        if (input.substr(pos, 6).toLowerCase() === "strict") {
          result0 = input.substr(pos, 6);
          pos += 6;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"strict\"");
          }
        }
        if (result0 !== null) {
          result0 = (function(offset, k) { return k.toLowerCase(); })(pos0, result0);
        }
        if (result0 === null) {
          pos = pos0;
        }
        return result0;
      }
      
      function parse_graphType() {
        var result0;
        var pos0;
        
        result0 = parse_graph();
        if (result0 === null) {
          pos0 = pos;
          result0 = parse_digraph();
          if (result0 !== null) {
            result0 = (function(offset, graph) {
                  directed = graph === "digraph";
                  return graph;
                })(pos0, result0);
          }
          if (result0 === null) {
            pos = pos0;
          }
        }
        return result0;
      }
      
      function parse_whitespace() {
        var result0, result1;
        
        reportFailures++;
        if (/^[ \t\r\n]/.test(input.charAt(pos))) {
          result1 = input.charAt(pos);
          pos++;
        } else {
          result1 = null;
          if (reportFailures === 0) {
            matchFailed("[ \\t\\r\\n]");
          }
        }
        if (result1 !== null) {
          result0 = [];
          while (result1 !== null) {
            result0.push(result1);
            if (/^[ \t\r\n]/.test(input.charAt(pos))) {
              result1 = input.charAt(pos);
              pos++;
            } else {
              result1 = null;
              if (reportFailures === 0) {
                matchFailed("[ \\t\\r\\n]");
              }
            }
          }
        } else {
          result0 = null;
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("whitespace");
        }
        return result0;
      }
      
      function parse_comment() {
        var result0, result1, result2, result3;
        var pos0, pos1, pos2;
        
        reportFailures++;
        pos0 = pos;
        if (input.substr(pos, 2) === "//") {
          result0 = "//";
          pos += 2;
        } else {
          result0 = null;
          if (reportFailures === 0) {
            matchFailed("\"//\"");
          }
        }
        if (result0 !== null) {
          result1 = [];
          if (/^[^\n]/.test(input.charAt(pos))) {
            result2 = input.charAt(pos);
            pos++;
          } else {
            result2 = null;
            if (reportFailures === 0) {
              matchFailed("[^\\n]");
            }
          }
          while (result2 !== null) {
            result1.push(result2);
            if (/^[^\n]/.test(input.charAt(pos))) {
              result2 = input.charAt(pos);
              pos++;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("[^\\n]");
              }
            }
          }
          if (result1 !== null) {
            result0 = [result0, result1];
          } else {
            result0 = null;
            pos = pos0;
          }
        } else {
          result0 = null;
          pos = pos0;
        }
        if (result0 === null) {
          pos0 = pos;
          if (input.substr(pos, 2) === "/*") {
            result0 = "/*";
            pos += 2;
          } else {
            result0 = null;
            if (reportFailures === 0) {
              matchFailed("\"/*\"");
            }
          }
          if (result0 !== null) {
            result1 = [];
            pos1 = pos;
            pos2 = pos;
            reportFailures++;
            if (input.substr(pos, 2) === "*/") {
              result2 = "*/";
              pos += 2;
            } else {
              result2 = null;
              if (reportFailures === 0) {
                matchFailed("\"*/\"");
              }
            }
            reportFailures--;
            if (result2 === null) {
              result2 = "";
            } else {
              result2 = null;
              pos = pos2;
            }
            if (result2 !== null) {
              if (input.length > pos) {
                result3 = input.charAt(pos);
                pos++;
              } else {
                result3 = null;
                if (reportFailures === 0) {
                  matchFailed("any character");
                }
              }
              if (result3 !== null) {
                result2 = [result2, result3];
              } else {
                result2 = null;
                pos = pos1;
              }
            } else {
              result2 = null;
              pos = pos1;
            }
            while (result2 !== null) {
              result1.push(result2);
              pos1 = pos;
              pos2 = pos;
              reportFailures++;
              if (input.substr(pos, 2) === "*/") {
                result2 = "*/";
                pos += 2;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"*/\"");
                }
              }
              reportFailures--;
              if (result2 === null) {
                result2 = "";
              } else {
                result2 = null;
                pos = pos2;
              }
              if (result2 !== null) {
                if (input.length > pos) {
                  result3 = input.charAt(pos);
                  pos++;
                } else {
                  result3 = null;
                  if (reportFailures === 0) {
                    matchFailed("any character");
                  }
                }
                if (result3 !== null) {
                  result2 = [result2, result3];
                } else {
                  result2 = null;
                  pos = pos1;
                }
              } else {
                result2 = null;
                pos = pos1;
              }
            }
            if (result1 !== null) {
              if (input.substr(pos, 2) === "*/") {
                result2 = "*/";
                pos += 2;
              } else {
                result2 = null;
                if (reportFailures === 0) {
                  matchFailed("\"*/\"");
                }
              }
              if (result2 !== null) {
                result0 = [result0, result1, result2];
              } else {
                result0 = null;
                pos = pos0;
              }
            } else {
              result0 = null;
              pos = pos0;
            }
          } else {
            result0 = null;
            pos = pos0;
          }
        }
        reportFailures--;
        if (reportFailures === 0 && result0 === null) {
          matchFailed("comment");
        }
        return result0;
      }
      
      function parse__() {
        var result0;
        
        result0 = parse_whitespace();
        if (result0 === null) {
          result0 = parse_comment();
        }
        return result0;
      }
      
      
      function cleanupExpected(expected) {
        expected.sort();
        
        var lastExpected = null;
        var cleanExpected = [];
        for (var i = 0; i < expected.length; i++) {
          if (expected[i] !== lastExpected) {
            cleanExpected.push(expected[i]);
            lastExpected = expected[i];
          }
        }
        return cleanExpected;
      }
      
      function computeErrorPosition() {
        /*
         * The first idea was to use |String.split| to break the input up to the
         * error position along newlines and derive the line and column from
         * there. However IE's |split| implementation is so broken that it was
         * enough to prevent it.
         */
        
        var line = 1;
        var column = 1;
        var seenCR = false;
        
        for (var i = 0; i < Math.max(pos, rightmostFailuresPos); i++) {
          var ch = input.charAt(i);
          if (ch === "\n") {
            if (!seenCR) { line++; }
            column = 1;
            seenCR = false;
          } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
            line++;
            column = 1;
            seenCR = true;
          } else {
            column++;
            seenCR = false;
          }
        }
        
        return { line: line, column: column };
      }
      
      
          var directed;
      
          function rightBiasedMerge(lhs, rhs) {
              var result = {};
              for (var k in lhs) {
                  result[k] = lhs[k];
              }
              for (var k in rhs) {
                  result[k] = rhs[k];
              }
              return result;     
          }
      
      
      var result = parseFunctions[startRule]();
      
      /*
       * The parser is now in one of the following three states:
       *
       * 1. The parser successfully parsed the whole input.
       *
       *    - |result !== null|
       *    - |pos === input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 2. The parser successfully parsed only a part of the input.
       *
       *    - |result !== null|
       *    - |pos < input.length|
       *    - |rightmostFailuresExpected| may or may not contain something
       *
       * 3. The parser did not successfully parse any part of the input.
       *
       *   - |result === null|
       *   - |pos === 0|
       *   - |rightmostFailuresExpected| contains at least one failure
       *
       * All code following this comment (including called functions) must
       * handle these states.
       */
      if (result === null || pos !== input.length) {
        var offset = Math.max(pos, rightmostFailuresPos);
        var found = offset < input.length ? input.charAt(offset) : null;
        var errorPosition = computeErrorPosition();
        
        throw new this.SyntaxError(
          cleanupExpected(rightmostFailuresExpected),
          found,
          offset,
          errorPosition.line,
          errorPosition.column
        );
      }
      
      return result;
    },
    
    /* Returns the parser source code. */
    toSource: function() { return this._source; }
  };
  
  /* Thrown when a parser encounters a syntax error. */
  
  result.SyntaxError = function(expected, found, offset, line, column) {
    function buildMessage(expected, found) {
      var expectedHumanized, foundHumanized;
      
      switch (expected.length) {
        case 0:
          expectedHumanized = "end of input";
          break;
        case 1:
          expectedHumanized = expected[0];
          break;
        default:
          expectedHumanized = expected.slice(0, expected.length - 1).join(", ")
            + " or "
            + expected[expected.length - 1];
      }
      
      foundHumanized = found ? quote(found) : "end of input";
      
      return "Expected " + expectedHumanized + " but " + foundHumanized + " found.";
    }
    
    this.name = "SyntaxError";
    this.expected = expected;
    this.found = found;
    this.message = buildMessage(expected, found);
    this.offset = offset;
    this.line = line;
    this.column = column;
  };
  
  result.SyntaxError.prototype = Error.prototype;
  
  return result;
})();
})();

joint.layout.DirectedGraph = {

    layout: function(graph, opt) {

        opt = opt || {};

        var data = this._prepareData(graph);
        dagre.layout().nodes(data.nodeData).edges(data.edgeData).debugLevel(3).run();
        
        _.each(data.nodeData, function(node) {

            graph.get('cells').get(node.id).set('position', { x: node.dagre.x, y: node.dagre.y });
        });

        if (opt.setLinkVertices) {

            _.each(data.edgeData, function(edge) {

                graph.get('cells').get(edge.id).set('vertices', edge.dagre.points);
            });
        }
    },
    
    _prepareData: function() {

        var nodeData = [];
        var edgeData = [];

        var nodeDataHash = {};
        var edgeDataHash = {};

        // For each element.
        graph.get('cells').each(function(cell) {

            if (!(cell instanceof joint.dia.Element)) return;

            if (!nodeDataHash[cell.id]) {
                
                var node = {
                    id: cell.id,
                    inEdges: [],
                    outEdges: [],
                    width: cell.get('size').width,
                    height: cell.get('size').height
                };
                nodeData.push(node);
                nodeDataHash[cell.id] = node;
            }
        });

        // For each link.
        graph.get('cells').each(function(cell) {

            if (!(cell instanceof joint.dia.Link)) return;
            
            var sourceId = cell.get('source').id;
            var targetId = cell.get('target').id;

            var source = nodeDataHash[sourceId];
            var target = nodeDataHash[targetId];

            var edge;
            if (edgeDataHash[cell.id]) {

                edge = edgeDataHash[cell.id];
                
            } else {

                edge = { id: cell.id, source: source, target: target, label: 'fooedge' };
                edgeDataHash[cell.id] = edge;
                edgeData.push(edge);
            }
            
            if (!_.contains(source.outEdges, edge)) source.outEdges.push(edge);
            if (!_.contains(target.inEdges, edge)) target.inEdges.push(edge);
        });

        return {
            nodeData: nodeData,
            edgeData: edgeData
        };
    }
};