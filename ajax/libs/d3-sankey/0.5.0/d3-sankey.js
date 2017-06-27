// https://github.com/d3/d3-sankey Version 0.5.0. Copyright 2017 Mike Bostock.
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

function ascendingSourceDepth(a, b) {
  return a.source.y - b.source.y;
}

function ascendingTargetDepth(a, b) {
  return a.target.y - b.target.y;
}

function ascendingDepth(a, b) {
  return a.y - b.y;
}

function value(d) {
  return d.value;
}

function nodeCenter(node) {
  return node.y + node.dy / 2;
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
    computeNodeBreadths(graph);
    computeNodeDepths(graph, iterations);
    computeLinkDepths(graph);
    return graph;
  }

  sankey.update = function(graph) {
    computeLinkDepths(graph);
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
    graph.nodes.forEach(function(node) {
      node.sourceLinks = [];
      node.targetLinks = [];
    });
    graph.links.forEach(function(link) {
      var source = link.source, target = link.target;
      if (typeof source === "number") source = link.source = graph.nodes[link.source];
      if (typeof target === "number") target = link.target = graph.nodes[link.target];
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

  // Iteratively assign the breadth (x-position) for each node.
  // Nodes are assigned the maximum breadth of incoming neighbors plus one;
  // nodes with no incoming links are assigned breadth zero, while
  // nodes with no outgoing links are assigned the maximum breadth.
  function computeNodeBreadths(graph) {
    var remainingNodes = graph.nodes,
        nextNodes,
        x = 0;

    while (remainingNodes.length) {
      nextNodes = [];
      remainingNodes.forEach(function(node) {
        node.x = x;
        node.dx = dx;
        node.sourceLinks.forEach(function(link) {
          if (nextNodes.indexOf(link.target) < 0) {
            nextNodes.push(link.target);
          }
        });
      });
      remainingNodes = nextNodes;
      ++x;
    }

    //
    moveSinksRight(graph, x);
    scaleNodeBreadths(graph, (x1 - x0 - dx) / (x - 1));
  }

  // function moveSourcesRight(graph) {
  //   graph.nodes.forEach(function(node) {
  //     if (!node.targetLinks.length) {
  //       node.x = min(node.sourceLinks, function(d) { return d.target.x; }) - 1;
  //     }
  //   });
  // }

  function moveSinksRight(graph, x) {
    graph.nodes.forEach(function(node) {
      if (!node.sourceLinks.length) {
        node.x = x - 1;
      }
    });
  }

  function scaleNodeBreadths(graph, kx) {
    graph.nodes.forEach(function(node) {
      node.x = x0 + node.x * kx;
    });
  }

  function computeNodeDepths(graph) {
    var nodesByBreadth = d3Collection.nest()
        .key(function(d) { return d.x; })
        .sortKeys(d3Array.ascending)
        .entries(graph.nodes)
        .map(function(d) { return d.values; });

    //
    initializeNodeDepth();
    resolveCollisions();
    for (var alpha = 1, n = iterations; n > 0; --n) {
      relaxRightToLeft(alpha *= 0.99);
      resolveCollisions();
      relaxLeftToRight(alpha);
      resolveCollisions();
    }

    function initializeNodeDepth() {
      var ky = d3Array.min(nodesByBreadth, function(nodes) {
        return (y1 - y0 - (nodes.length - 1) * py) / d3Array.sum(nodes, value);
      });

      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node, i) {
          node.y = i;
          node.dy = node.value * ky;
        });
      });

      graph.links.forEach(function(link) {
        link.dy = link.value * ky;
      });
    }

    function relaxLeftToRight(alpha) {
      nodesByBreadth.forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.targetLinks.length) {
            node.y += (d3Array.sum(node.targetLinks, weightedSource) / d3Array.sum(node.targetLinks, value) - nodeCenter(node)) * alpha;
          }
        });
      });
    }

    function relaxRightToLeft(alpha) {
      nodesByBreadth.slice().reverse().forEach(function(nodes) {
        nodes.forEach(function(node) {
          if (node.sourceLinks.length) {
            node.y += (d3Array.sum(node.sourceLinks, weightedTarget) / d3Array.sum(node.sourceLinks, value) - nodeCenter(node)) * alpha;
          }
        });
      });
    }

    function resolveCollisions() {
      nodesByBreadth.forEach(function(nodes) {
        var node,
            dy,
            y = y0,
            n = nodes.length,
            i;

        // Push any overlapping nodes down.
        nodes.sort(ascendingDepth);
        for (i = 0; i < n; ++i) {
          node = nodes[i];
          dy = y - node.y;
          if (dy > 0) node.y += dy;
          y = node.y + node.dy + py;
        }

        // If the bottommost node goes outside the bounds, push it back up.
        dy = y - py - y1;
        if (dy > 0) {
          y = node.y -= dy;

          // Push any overlapping nodes back up.
          for (i = n - 2; i >= 0; --i) {
            node = nodes[i];
            dy = node.y + node.dy + py - y;
            if (dy > 0) node.y -= dy;
            y = node.y;
          }
        }
      });
    }
  }

  function computeLinkDepths(graph) {
    graph.nodes.forEach(function(node) {
      node.sourceLinks.sort(ascendingTargetDepth);
      node.targetLinks.sort(ascendingSourceDepth);
    });
    graph.nodes.forEach(function(node) {
      var sy = 0, ty = 0;
      node.sourceLinks.forEach(function(link) {
        link.sy = sy;
        sy += link.dy;
      });
      node.targetLinks.forEach(function(link) {
        link.ty = ty;
        ty += link.dy;
      });
    });
  }

  return sankey;
};

function horizontalSource(d) {
  return [d.source.x + d.source.dx, d.source.y + d.sy + d.dy / 2];
}

function horizontalTarget(d) {
  return [d.target.x, d.target.y + d.ty + d.dy / 2];
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
