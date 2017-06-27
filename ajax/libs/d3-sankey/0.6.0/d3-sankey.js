// https://github.com/d3/d3-sankey Version 0.6.0. Copyright 2017 Mike Bostock.
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('d3-array'), require('d3-collection'), require('d3-shape')) :
	typeof define === 'function' && define.amd ? define(['exports', 'd3-array', 'd3-collection', 'd3-shape'], factory) :
	(factory((global.d3 = global.d3 || {}),global.d3,global.d3,global.d3));
}(this, (function (exports,d3Array,d3Collection,d3Shape) { 'use strict';

function constant(x) {
  return function() {
    return x;
  };
}

function ascendingSourceBreadth(a, b) {
  return ascendingBreadth(a.source, b.source) || a.index - b.index;
}

function ascendingTargetBreadth(a, b) {
  return ascendingBreadth(a.target, b.target) || a.index - b.index;
}

function ascendingBreadth(a, b) {
  return a.y0 - b.y0;
}

function value(d) {
  return d.value;
}

function nodeCenter(node) {
  return (node.y0 + node.y1) / 2;
}

function weightedSource(link) {
  return nodeCenter(link.source) * link.value;
}

function weightedTarget(link) {
  return nodeCenter(link.target) * link.value;
}

function defaultNodes(graph) {
  return graph.nodes;
}

function defaultLinks(graph) {
  return graph.links;
}

var sankey = function() {
  var x0 = 0, y0 = 0, x1 = 1, y1 = 1, // extent
      dx = 24, // nodeWidth
      py = 8, // nodePadding
      nodes = defaultNodes,
      links = defaultLinks,
      iterations = 32;

  function sankey() {
    var graph = {nodes: nodes.apply(null, arguments), links: links.apply(null, arguments)};
    computeNodeLinks(graph);
    computeNodeValues(graph);
    computeNodeDepths(graph);
    computeNodeBreadths(graph, iterations);
    computeLinkBreadths(graph);
    return graph;
  }

  sankey.update = function(graph) {
    computeLinkBreadths(graph);
    return graph;
  };

  sankey.nodeWidth = function(_) {
    return arguments.length ? (dx = +_, sankey) : dx;
  };

  sankey.nodePadding = function(_) {
    return arguments.length ? (py = +_, sankey) : py;
  };

  sankey.nodes = function(_) {
    return arguments.length ? (nodes = typeof _ === "function" ? _ : constant(_), sankey) : nodes;
  };

  sankey.links = function(_) {
    return arguments.length ? (links = typeof _ === "function" ? _ : constant(_), sankey) : links;
  };

  sankey.size = function(_) {
    return arguments.length ? (x0 = y0 = 0, x1 = +_[0], y1 = +_[1], sankey) : [x1 - x0, y1 - y0];
  };

  sankey.extent = function(_) {
    return arguments.length ? (x0 = +_[0][0], x1 = +_[1][0], y0 = +_[0][1], y1 = +_[1][1], sankey) : [[x0, y0], [x1, y1]];
  };

  sankey.iterations = function(_) {
    return arguments.length ? (iterations = +_, sankey) : iterations;
  };

  // Populate the sourceLinks and targetLinks for each node.
  // Also, if the source and target are not objects, assume they are indices.
  function computeNodeLinks(graph) {
    graph.nodes.forEach(function(node, i) {
      node.index = i;
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    graph.links.forEach(function(link, i) {
      var source = link.source, target = link.target;
      if (typeof source === "number") source = link.source = graph.nodes[link.source];
      if (typeof target === "number") target = link.target = graph.nodes[link.target];
      link.index = i;
      source.sourceLinks.push(link);
      target.targetLinks.push(link);
    });
  }

  // Compute the value (size) of each node by summing the associated links.
  function computeNodeValues(graph) {
    graph.nodes.forEach(function(node) {
      node.value = Math.max(
        d3Array.sum(node.sourceLinks, value),
        d3Array.sum(node.targetLinks, value)
      );
    });
  }

  // Iteratively assign the depth (x-position) for each node.
  // Nodes are assigned the maximum depth of incoming neighbors plus one;
  // nodes with no incoming links are assigned depth zero, while
  // nodes with no outgoing links are assigned the maximum depth.
  function computeNodeDepths(graph) {
    var remainingNodes = graph.nodes,
        nextNodes,
        depth = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.depth = depth;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++depth;
    }

    //
    moveSinksRight(graph, depth);
    scaleNodeDepths(graph, depth);
  }

  // function moveSourcesRight(graph) {
  //   graph.nodes.forEach(function(node) {
  //     if (!node.targetLinks.length) {
  //       node.depth = min(node.sourceLinks, function(d) { return d.target.depth; }) - 1;
  //     }
  //   });
  // }

  function moveSinksRight(graph, depth) {
    graph.nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.depth = depth - 1;
      }
    });
  }

  function scaleNodeDepths(graph, depth) {
    var kx = (x1 - x0 - dx) / (depth - 1);
    graph.nodes.forEach(function(node) {
      node.x1 = (node.x0 = x0 + node.depth * kx) + dx;
    });
  }

  function computeNodeBreadths(graph) {
    var nodesByDepth = d3Collection.nest()
        .key(function(d) { return d.depth; })
        .sortKeys(d3Array.ascending)
        .entries(graph.nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeBreadth();
    resolveCollisions();
    for (var alpha = 1, n = iterations; n > 0; --n) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeBreadth() {
      var ky = d3Array.min(nodesByDepth, function(nodes) {
        return (y1 - y0 - (nodes.length - 1) * py) / d3Array.sum(nodes, value);
      });

      nodesByDepth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y1 = (node.y0 = i) + node.value * ky;
        });
      });

      graph.links.forEach(function(link) {
        link.width = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByDepth.forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            var dy = (d3Array.sum(node.targetLinks, weightedSource) / d3Array.sum(node.targetLinks, value) - nodeCenter(node)) * alpha;
            node.y0 += dy, node.y1 += dy;
          }
        });
      });
    }

    function relaxRightToLeft(alpha) {
      nodesByDepth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            var dy = (d3Array.sum(node.sourceLinks, weightedTarget) / d3Array.sum(node.sourceLinks, value) - nodeCenter(node)) * alpha;
            node.y0 += dy, node.y1 += dy;
          }
        });
      });
    }

    function resolveCollisions() {
      nodesByDepth.forEach(function(nodes) {
        var node,
            dy,
            y = y0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingBreadth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y - node.y0;
          if (dy > 0) node.y0 += dy, node.y1 += dy;
          y = node.y1 + py;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y - py - y1;
        if (dy > 0) {
          y = (node.y0 -= dy), node.y1 -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y1 + py - y;
            if (dy > 0) node.y0 -= dy, node.y1 -= dy;
            y = node.y0;
          }
        }
      });
    }
  }

  function computeLinkBreadths(graph) {
    graph.nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetBreadth);
      node.targetLinks.sort(ascendingSourceBreadth);
    });
    graph.nodes.forEach(function(node) {
      var y0 = node.y0, y1 = y0;
      node.sourceLinks.forEach(function(link) {
        link.y0 = y0 + link.width / 2, y0 += link.width;
      });
      node.targetLinks.forEach(function(link) {
        link.y1 = y1 + link.width / 2, y1 += link.width;
      });
    });
  }

  return sankey;
};

function horizontalSource(d) {
  return [d.source.x1, d.y0];
}

function horizontalTarget(d) {
  return [d.target.x0, d.y1];
}

var sankeyLinkHorizontal = function() {
  return d3Shape.linkHorizontal()
      .source(horizontalSource)
      .target(horizontalTarget);
};

exports.sankey = sankey;
exports.sankeyLinkHorizontal = sankeyLinkHorizontal;

Object.defineProperty(exports, '__esModule', { value: true });

})));
