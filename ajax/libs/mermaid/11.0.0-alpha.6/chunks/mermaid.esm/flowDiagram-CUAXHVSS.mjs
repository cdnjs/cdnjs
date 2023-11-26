import {
  addHtmlLabel,
  applyClass,
  applyStyle,
  applyTransition,
  edgeToId,
  flowDb_default,
  flowRenderer_v2_default,
  flow_default,
  isSubgraph,
  styles_default
} from "./chunk-YOVYGJMA.mjs";
import "./chunk-7X5N4G4X.mjs";
import "./chunk-ILFCNAY3.mjs";
import "./chunk-NIE3KUHP.mjs";
import "./chunk-UBK4ATPH.mjs";
import {
  Graph,
  defaults_default,
  forEach_default,
  has_default,
  layout,
  pick_default,
  range_default,
  uniqueId_default
} from "./chunk-6VGLYYIQ.mjs";
import "./chunk-GI3XPZAN.mjs";
import {
  getStylesFromArray,
  interpolateToCurve
} from "./chunk-43ZLPYW7.mjs";
import "./chunk-4RVYQ3EB.mjs";
import "./chunk-BHRT2E43.mjs";
import "./chunk-XJO53F2G.mjs";
import {
  __name,
  common_default,
  evaluate,
  getConfig2 as getConfig,
  line_default,
  linear_default,
  log,
  selectAll_default,
  select_default,
  setupGraphViewbox,
  svg
} from "./chunk-T24N4LJA.mjs";

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/arrows.js
var arrows = {
  normal,
  vee,
  undirected
};
function setArrows(value) {
  arrows = value;
}
__name(setArrows, "setArrows");
function normal(parent, id, edge, type) {
  var marker = parent.append("marker").attr("id", id).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerUnits", "strokeWidth").attr("markerWidth", 8).attr("markerHeight", 6).attr("orient", "auto");
  var path = marker.append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  applyStyle(path, edge[type + "Style"]);
  if (edge[type + "Class"]) {
    path.attr("class", edge[type + "Class"]);
  }
}
__name(normal, "normal");
function vee(parent, id, edge, type) {
  var marker = parent.append("marker").attr("id", id).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerUnits", "strokeWidth").attr("markerWidth", 8).attr("markerHeight", 6).attr("orient", "auto");
  var path = marker.append("path").attr("d", "M 0 0 L 10 5 L 0 10 L 4 5 z").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  applyStyle(path, edge[type + "Style"]);
  if (edge[type + "Class"]) {
    path.attr("class", edge[type + "Class"]);
  }
}
__name(vee, "vee");
function undirected(parent, id, edge, type) {
  var marker = parent.append("marker").attr("id", id).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerUnits", "strokeWidth").attr("markerWidth", 8).attr("markerHeight", 6).attr("orient", "auto");
  var path = marker.append("path").attr("d", "M 0 5 L 10 5").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  applyStyle(path, edge[type + "Style"]);
  if (edge[type + "Class"]) {
    path.attr("class", edge[type + "Class"]);
  }
}
__name(undirected, "undirected");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/label/add-svg-label.js
function addSVGLabel(root, node) {
  var domNode = root;
  domNode.node().appendChild(node.label);
  applyStyle(domNode, node.labelStyle);
  return domNode;
}
__name(addSVGLabel, "addSVGLabel");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/label/add-text-label.js
function addTextLabel(root, node) {
  var domNode = root.append("text");
  var lines = processEscapeSequences(node.label).split("\n");
  for (var i = 0; i < lines.length; i++) {
    domNode.append("tspan").attr("xml:space", "preserve").attr("dy", "1em").attr("x", "1").text(lines[i]);
  }
  applyStyle(domNode, node.labelStyle);
  return domNode;
}
__name(addTextLabel, "addTextLabel");
function processEscapeSequences(text) {
  var newText = "";
  var escaped = false;
  var ch;
  for (var i = 0; i < text.length; ++i) {
    ch = text[i];
    if (escaped) {
      switch (ch) {
        case "n":
          newText += "\n";
          break;
        default:
          newText += ch;
      }
      escaped = false;
    } else if (ch === "\\") {
      escaped = true;
    } else {
      newText += ch;
    }
  }
  return newText;
}
__name(processEscapeSequences, "processEscapeSequences");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/label/add-label.js
function addLabel(root, node, location2) {
  var label = node.label;
  var labelSvg = root.append("g");
  if (node.labelType === "svg") {
    addSVGLabel(labelSvg, node);
  } else if (typeof label !== "string" || node.labelType === "html") {
    addHtmlLabel(labelSvg, node);
  } else {
    addTextLabel(labelSvg, node);
  }
  var labelBBox = labelSvg.node().getBBox();
  var y;
  switch (location2) {
    case "top":
      y = -node.height / 2;
      break;
    case "bottom":
      y = node.height / 2 - labelBBox.height;
      break;
    default:
      y = -labelBBox.height / 2;
  }
  labelSvg.attr("transform", "translate(" + -labelBBox.width / 2 + "," + y + ")");
  return labelSvg;
}
__name(addLabel, "addLabel");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/create-clusters.js
var createClusters = /* @__PURE__ */ __name(function(selection, g) {
  var clusters = g.nodes().filter(function(v) {
    return isSubgraph(g, v);
  });
  var svgClusters = selection.selectAll("g.cluster").data(clusters, function(v) {
    return v;
  });
  applyTransition(svgClusters.exit(), g).style("opacity", 0).remove();
  var enterSelection = svgClusters.enter().append("g").attr("class", "cluster").attr("id", function(v) {
    var node = g.node(v);
    return node.id;
  }).style("opacity", 0).each(function(v) {
    var node = g.node(v);
    var thisGroup = select_default(this);
    select_default(this).append("rect");
    var labelGroup = thisGroup.append("g").attr("class", "label");
    addLabel(labelGroup, node, node.clusterLabelPos);
  });
  svgClusters = svgClusters.merge(enterSelection);
  svgClusters = applyTransition(svgClusters, g).style("opacity", 1);
  svgClusters.selectAll("rect").each(function(c) {
    var node = g.node(c);
    var domCluster = select_default(this);
    applyStyle(domCluster, node.style);
  });
  return svgClusters;
}, "createClusters");
function setCreateClusters(value) {
  createClusters = value;
}
__name(setCreateClusters, "setCreateClusters");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/create-edge-labels.js
var createEdgeLabels = /* @__PURE__ */ __name(function(selection, g) {
  var svgEdgeLabels = selection.selectAll("g.edgeLabel").data(g.edges(), function(e) {
    return edgeToId(e);
  }).classed("update", true);
  svgEdgeLabels.exit().remove();
  svgEdgeLabels.enter().append("g").classed("edgeLabel", true).style("opacity", 0);
  svgEdgeLabels = selection.selectAll("g.edgeLabel");
  svgEdgeLabels.each(function(e) {
    var root = select_default(this);
    root.select(".label").remove();
    var edge = g.edge(e);
    var label = addLabel(root, g.edge(e), 0).classed("label", true);
    var bbox = label.node().getBBox();
    if (edge.labelId) {
      label.attr("id", edge.labelId);
    }
    if (!has_default(edge, "width")) {
      edge.width = bbox.width;
    }
    if (!has_default(edge, "height")) {
      edge.height = bbox.height;
    }
  });
  var exitSelection;
  if (svgEdgeLabels.exit) {
    exitSelection = svgEdgeLabels.exit();
  } else {
    exitSelection = svgEdgeLabels.selectAll(null);
  }
  applyTransition(exitSelection, g).style("opacity", 0).remove();
  return svgEdgeLabels;
}, "createEdgeLabels");
function setCreateEdgeLabels(value) {
  createEdgeLabels = value;
}
__name(setCreateEdgeLabels, "setCreateEdgeLabels");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/intersect/intersect-node.js
function intersectNode(node, point) {
  return node.intersect(point);
}
__name(intersectNode, "intersectNode");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/create-edge-paths.js
var createEdgePaths = /* @__PURE__ */ __name(function(selection, g, arrows2) {
  var previousPaths = selection.selectAll("g.edgePath").data(g.edges(), function(e) {
    return edgeToId(e);
  }).classed("update", true);
  var newPaths = enter(previousPaths, g);
  exit(previousPaths, g);
  var svgPaths = previousPaths.merge !== void 0 ? previousPaths.merge(newPaths) : previousPaths;
  applyTransition(svgPaths, g).style("opacity", 1);
  svgPaths.each(function(e) {
    var domEdge = select_default(this);
    var edge = g.edge(e);
    edge.elem = this;
    if (edge.id) {
      domEdge.attr("id", edge.id);
    }
    applyClass(
      domEdge,
      edge["class"],
      (domEdge.classed("update") ? "update " : "") + "edgePath"
    );
  });
  svgPaths.selectAll("path.path").each(function(e) {
    var edge = g.edge(e);
    edge.arrowheadId = uniqueId_default("arrowhead");
    var domEdge = select_default(this).attr("marker-end", function() {
      return "url(" + makeFragmentRef(location.href, edge.arrowheadId) + ")";
    }).style("fill", "none");
    applyTransition(domEdge, g).attr("d", function(e2) {
      return calcPoints(g, e2);
    });
    applyStyle(domEdge, edge.style);
  });
  svgPaths.selectAll("defs *").remove();
  svgPaths.selectAll("defs").each(function(e) {
    var edge = g.edge(e);
    var arrowhead = arrows2[edge.arrowhead];
    arrowhead(select_default(this), edge.arrowheadId, edge, "arrowhead");
  });
  return svgPaths;
}, "createEdgePaths");
function setCreateEdgePaths(value) {
  createEdgePaths = value;
}
__name(setCreateEdgePaths, "setCreateEdgePaths");
function makeFragmentRef(url, fragmentId) {
  var baseUrl = url.split("#")[0];
  return baseUrl + "#" + fragmentId;
}
__name(makeFragmentRef, "makeFragmentRef");
function calcPoints(g, e) {
  var edge = g.edge(e);
  var tail = g.node(e.v);
  var head = g.node(e.w);
  var points = edge.points.slice(1, edge.points.length - 1);
  points.unshift(intersectNode(tail, points[0]));
  points.push(intersectNode(head, points[points.length - 1]));
  return createLine(edge, points);
}
__name(calcPoints, "calcPoints");
function createLine(edge, points) {
  var line = (line_default || svg.line)().x(function(d) {
    return d.x;
  }).y(function(d) {
    return d.y;
  });
  (line.curve || line.interpolate)(edge.curve);
  return line(points);
}
__name(createLine, "createLine");
function getCoords(elem) {
  var bbox = elem.getBBox();
  var matrix = elem.ownerSVGElement.getScreenCTM().inverse().multiply(elem.getScreenCTM()).translate(bbox.width / 2, bbox.height / 2);
  return { x: matrix.e, y: matrix.f };
}
__name(getCoords, "getCoords");
function enter(svgPaths, g) {
  var svgPathsEnter = svgPaths.enter().append("g").attr("class", "edgePath").style("opacity", 0);
  svgPathsEnter.append("path").attr("class", "path").attr("d", function(e) {
    var edge = g.edge(e);
    var sourceElem = g.node(e.v).elem;
    var points = range_default(edge.points.length).map(function() {
      return getCoords(sourceElem);
    });
    return createLine(edge, points);
  });
  svgPathsEnter.append("defs");
  return svgPathsEnter;
}
__name(enter, "enter");
function exit(svgPaths, g) {
  var svgPathExit = svgPaths.exit();
  applyTransition(svgPathExit, g).style("opacity", 0).remove();
}
__name(exit, "exit");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/create-nodes.js
var createNodes = /* @__PURE__ */ __name(function(selection, g, shapes2) {
  var simpleNodes = g.nodes().filter(function(v) {
    return !isSubgraph(g, v);
  });
  var svgNodes = selection.selectAll("g.node").data(simpleNodes, function(v) {
    return v;
  }).classed("update", true);
  svgNodes.exit().remove();
  svgNodes.enter().append("g").attr("class", "node").style("opacity", 0);
  svgNodes = selection.selectAll("g.node");
  svgNodes.each(function(v) {
    var node = g.node(v);
    var thisGroup = select_default(this);
    applyClass(
      thisGroup,
      node["class"],
      (thisGroup.classed("update") ? "update " : "") + "node"
    );
    thisGroup.select("g.label").remove();
    var labelGroup = thisGroup.append("g").attr("class", "label");
    var labelDom = addLabel(labelGroup, node);
    var shape = shapes2[node.shape];
    var bbox = pick_default(labelDom.node().getBBox(), "width", "height");
    node.elem = this;
    if (node.id) {
      thisGroup.attr("id", node.id);
    }
    if (node.labelId) {
      labelGroup.attr("id", node.labelId);
    }
    if (has_default(node, "width")) {
      bbox.width = node.width;
    }
    if (has_default(node, "height")) {
      bbox.height = node.height;
    }
    bbox.width += node.paddingLeft + node.paddingRight;
    bbox.height += node.paddingTop + node.paddingBottom;
    labelGroup.attr(
      "transform",
      "translate(" + (node.paddingLeft - node.paddingRight) / 2 + "," + (node.paddingTop - node.paddingBottom) / 2 + ")"
    );
    var root = select_default(this);
    root.select(".label-container").remove();
    var shapeSvg = shape(root, bbox, node).classed("label-container", true);
    applyStyle(shapeSvg, node.style);
    var shapeBBox = shapeSvg.node().getBBox();
    node.width = shapeBBox.width;
    node.height = shapeBBox.height;
  });
  var exitSelection;
  if (svgNodes.exit) {
    exitSelection = svgNodes.exit();
  } else {
    exitSelection = svgNodes.selectAll(null);
  }
  applyTransition(exitSelection, g).style("opacity", 0).remove();
  return svgNodes;
}, "createNodes");
function setCreateNodes(value) {
  createNodes = value;
}
__name(setCreateNodes, "setCreateNodes");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/position-clusters.js
function positionClusters(selection, g) {
  var created = selection.filter(function() {
    return !select_default(this).classed("update");
  });
  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }
  __name(translate, "translate");
  created.attr("transform", translate);
  applyTransition(selection, g).style("opacity", 1).attr("transform", translate);
  applyTransition(created.selectAll("rect"), g).attr("width", function(v) {
    return g.node(v).width;
  }).attr("height", function(v) {
    return g.node(v).height;
  }).attr("x", function(v) {
    var node = g.node(v);
    return -node.width / 2;
  }).attr("y", function(v) {
    var node = g.node(v);
    return -node.height / 2;
  });
}
__name(positionClusters, "positionClusters");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/position-edge-labels.js
function positionEdgeLabels(selection, g) {
  var created = selection.filter(function() {
    return !select_default(this).classed("update");
  });
  function translate(e) {
    var edge = g.edge(e);
    return has_default(edge, "x") ? "translate(" + edge.x + "," + edge.y + ")" : "";
  }
  __name(translate, "translate");
  created.attr("transform", translate);
  applyTransition(selection, g).style("opacity", 1).attr("transform", translate);
}
__name(positionEdgeLabels, "positionEdgeLabels");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/position-nodes.js
function positionNodes(selection, g) {
  var created = selection.filter(function() {
    return !select_default(this).classed("update");
  });
  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }
  __name(translate, "translate");
  created.attr("transform", translate);
  applyTransition(selection, g).style("opacity", 1).attr("transform", translate);
}
__name(positionNodes, "positionNodes");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/intersect/intersect-ellipse.js
function intersectEllipse(node, rx, ry, point) {
  var cx = node.x;
  var cy = node.y;
  var px = cx - point.x;
  var py = cy - point.y;
  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);
  var dx = Math.abs(rx * ry * px / det);
  if (point.x < cx) {
    dx = -dx;
  }
  var dy = Math.abs(rx * ry * py / det);
  if (point.y < cy) {
    dy = -dy;
  }
  return { x: cx + dx, y: cy + dy };
}
__name(intersectEllipse, "intersectEllipse");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/intersect/intersect-circle.js
function intersectCircle(node, rx, point) {
  return intersectEllipse(node, rx, rx, point);
}
__name(intersectCircle, "intersectCircle");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/intersect/intersect-line.js
function intersectLine(p1, p2, q1, q2) {
  var a1, a2, b1, b2, c1, c2;
  var r1, r2, r3, r4;
  var denom, offset, num;
  var x, y;
  a1 = p2.y - p1.y;
  b1 = p1.x - p2.x;
  c1 = p2.x * p1.y - p1.x * p2.y;
  r3 = a1 * q1.x + b1 * q1.y + c1;
  r4 = a1 * q2.x + b1 * q2.y + c1;
  if (r3 !== 0 && r4 !== 0 && sameSign(r3, r4)) {
    return;
  }
  a2 = q2.y - q1.y;
  b2 = q1.x - q2.x;
  c2 = q2.x * q1.y - q1.x * q2.y;
  r1 = a2 * p1.x + b2 * p1.y + c2;
  r2 = a2 * p2.x + b2 * p2.y + c2;
  if (r1 !== 0 && r2 !== 0 && sameSign(r1, r2)) {
    return;
  }
  denom = a1 * b2 - a2 * b1;
  if (denom === 0) {
    return;
  }
  offset = Math.abs(denom / 2);
  num = b1 * c2 - b2 * c1;
  x = num < 0 ? (num - offset) / denom : (num + offset) / denom;
  num = a2 * c1 - a1 * c2;
  y = num < 0 ? (num - offset) / denom : (num + offset) / denom;
  return { x, y };
}
__name(intersectLine, "intersectLine");
function sameSign(r1, r2) {
  return r1 * r2 > 0;
}
__name(sameSign, "sameSign");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/intersect/intersect-polygon.js
function intersectPolygon(node, polyPoints, point) {
  var x1 = node.x;
  var y1 = node.y;
  var intersections = [];
  var minX = Number.POSITIVE_INFINITY;
  var minY = Number.POSITIVE_INFINITY;
  polyPoints.forEach(function(entry) {
    minX = Math.min(minX, entry.x);
    minY = Math.min(minY, entry.y);
  });
  var left = x1 - node.width / 2 - minX;
  var top = y1 - node.height / 2 - minY;
  for (var i = 0; i < polyPoints.length; i++) {
    var p1 = polyPoints[i];
    var p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
    var intersect = intersectLine(
      node,
      point,
      { x: left + p1.x, y: top + p1.y },
      { x: left + p2.x, y: top + p2.y }
    );
    if (intersect) {
      intersections.push(intersect);
    }
  }
  if (!intersections.length) {
    console.log("NO INTERSECTION FOUND, RETURN NODE CENTER", node);
    return node;
  }
  if (intersections.length > 1) {
    intersections.sort(function(p, q) {
      var pdx = p.x - point.x;
      var pdy = p.y - point.y;
      var distp = Math.sqrt(pdx * pdx + pdy * pdy);
      var qdx = q.x - point.x;
      var qdy = q.y - point.y;
      var distq = Math.sqrt(qdx * qdx + qdy * qdy);
      return distp < distq ? -1 : distp === distq ? 0 : 1;
    });
  }
  return intersections[0];
}
__name(intersectPolygon, "intersectPolygon");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/intersect/intersect-rect.js
function intersectRect(node, point) {
  var x = node.x;
  var y = node.y;
  var dx = point.x - x;
  var dy = point.y - y;
  var w = node.width / 2;
  var h = node.height / 2;
  var sx, sy;
  if (Math.abs(dy) * w > Math.abs(dx) * h) {
    if (dy < 0) {
      h = -h;
    }
    sx = dy === 0 ? 0 : h * dx / dy;
    sy = h;
  } else {
    if (dx < 0) {
      w = -w;
    }
    sx = w;
    sy = dx === 0 ? 0 : w * dy / dx;
  }
  return { x: x + sx, y: y + sy };
}
__name(intersectRect, "intersectRect");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/shapes.js
var shapes = {
  rect,
  ellipse,
  circle,
  diamond
};
function setShapes(value) {
  shapes = value;
}
__name(setShapes, "setShapes");
function rect(parent, bbox, node) {
  var shapeSvg = parent.insert("rect", ":first-child").attr("rx", node.rx).attr("ry", node.ry).attr("x", -bbox.width / 2).attr("y", -bbox.height / 2).attr("width", bbox.width).attr("height", bbox.height);
  node.intersect = function(point) {
    return intersectRect(node, point);
  };
  return shapeSvg;
}
__name(rect, "rect");
function ellipse(parent, bbox, node) {
  var rx = bbox.width / 2;
  var ry = bbox.height / 2;
  var shapeSvg = parent.insert("ellipse", ":first-child").attr("x", -bbox.width / 2).attr("y", -bbox.height / 2).attr("rx", rx).attr("ry", ry);
  node.intersect = function(point) {
    return intersectEllipse(node, rx, ry, point);
  };
  return shapeSvg;
}
__name(ellipse, "ellipse");
function circle(parent, bbox, node) {
  var r = Math.max(bbox.width, bbox.height) / 2;
  var shapeSvg = parent.insert("circle", ":first-child").attr("x", -bbox.width / 2).attr("y", -bbox.height / 2).attr("r", r);
  node.intersect = function(point) {
    return intersectCircle(node, r, point);
  };
  return shapeSvg;
}
__name(circle, "circle");
function diamond(parent, bbox, node) {
  var w = bbox.width * Math.SQRT2 / 2;
  var h = bbox.height * Math.SQRT2 / 2;
  var points = [
    { x: 0, y: -h },
    { x: -w, y: 0 },
    { x: 0, y: h },
    { x: w, y: 0 }
  ];
  var shapeSvg = parent.insert("polygon", ":first-child").attr(
    "points",
    points.map(function(p) {
      return p.x + "," + p.y;
    }).join(" ")
  );
  node.intersect = function(p) {
    return intersectPolygon(node, points, p);
  };
  return shapeSvg;
}
__name(diamond, "diamond");

// ../../node_modules/.pnpm/dagre-d3-es@7.0.10/node_modules/dagre-d3-es/src/dagre-js/render.js
function render() {
  var fn = /* @__PURE__ */ __name(function(svg2, g) {
    preProcessGraph(g);
    var outputGroup = createOrSelectGroup(svg2, "output");
    var clustersGroup = createOrSelectGroup(outputGroup, "clusters");
    var edgePathsGroup = createOrSelectGroup(outputGroup, "edgePaths");
    var edgeLabels = createEdgeLabels(createOrSelectGroup(outputGroup, "edgeLabels"), g);
    var nodes = createNodes(createOrSelectGroup(outputGroup, "nodes"), g, shapes);
    layout(g);
    positionNodes(nodes, g);
    positionEdgeLabels(edgeLabels, g);
    createEdgePaths(edgePathsGroup, g, arrows);
    var clusters = createClusters(clustersGroup, g);
    positionClusters(clusters, g);
    postProcessGraph(g);
  }, "fn");
  fn.createNodes = function(value) {
    if (!arguments.length)
      return createNodes;
    setCreateNodes(value);
    return fn;
  };
  fn.createClusters = function(value) {
    if (!arguments.length)
      return createClusters;
    setCreateClusters(value);
    return fn;
  };
  fn.createEdgeLabels = function(value) {
    if (!arguments.length)
      return createEdgeLabels;
    setCreateEdgeLabels(value);
    return fn;
  };
  fn.createEdgePaths = function(value) {
    if (!arguments.length)
      return createEdgePaths;
    setCreateEdgePaths(value);
    return fn;
  };
  fn.shapes = function(value) {
    if (!arguments.length)
      return shapes;
    setShapes(value);
    return fn;
  };
  fn.arrows = function(value) {
    if (!arguments.length)
      return arrows;
    setArrows(value);
    return fn;
  };
  return fn;
}
__name(render, "render");
var NODE_DEFAULT_ATTRS = {
  paddingLeft: 10,
  paddingRight: 10,
  paddingTop: 10,
  paddingBottom: 10,
  rx: 0,
  ry: 0,
  shape: "rect"
};
var EDGE_DEFAULT_ATTRS = {
  arrowhead: "normal",
  curve: linear_default
};
function preProcessGraph(g) {
  g.nodes().forEach(function(v) {
    var node = g.node(v);
    if (!has_default(node, "label") && !g.children(v).length) {
      node.label = v;
    }
    if (has_default(node, "paddingX")) {
      defaults_default(node, {
        paddingLeft: node.paddingX,
        paddingRight: node.paddingX
      });
    }
    if (has_default(node, "paddingY")) {
      defaults_default(node, {
        paddingTop: node.paddingY,
        paddingBottom: node.paddingY
      });
    }
    if (has_default(node, "padding")) {
      defaults_default(node, {
        paddingLeft: node.padding,
        paddingRight: node.padding,
        paddingTop: node.padding,
        paddingBottom: node.padding
      });
    }
    defaults_default(node, NODE_DEFAULT_ATTRS);
    forEach_default(["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"], function(k) {
      node[k] = Number(node[k]);
    });
    if (has_default(node, "width")) {
      node._prevWidth = node.width;
    }
    if (has_default(node, "height")) {
      node._prevHeight = node.height;
    }
  });
  g.edges().forEach(function(e) {
    var edge = g.edge(e);
    if (!has_default(edge, "label")) {
      edge.label = "";
    }
    defaults_default(edge, EDGE_DEFAULT_ATTRS);
  });
}
__name(preProcessGraph, "preProcessGraph");
function postProcessGraph(g) {
  forEach_default(g.nodes(), function(v) {
    var node = g.node(v);
    if (has_default(node, "_prevWidth")) {
      node.width = node._prevWidth;
    } else {
      delete node.width;
    }
    if (has_default(node, "_prevHeight")) {
      node.height = node._prevHeight;
    } else {
      delete node.height;
    }
    delete node._prevWidth;
    delete node._prevHeight;
  });
}
__name(postProcessGraph, "postProcessGraph");
function createOrSelectGroup(root, name) {
  var selection = root.select("g." + name);
  if (selection.empty()) {
    selection = root.append("g").attr("class", name);
  }
  return selection;
}
__name(createOrSelectGroup, "createOrSelectGroup");

// src/diagrams/flowchart/flowChartShapes.js
function question(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const s = (w + h) * 0.9;
  const points = [
    { x: s / 2, y: 0 },
    { x: s, y: -s / 2 },
    { x: s / 2, y: -s },
    { x: 0, y: -s / 2 }
  ];
  const shapeSvg = insertPolygonShape(parent, s, s, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(question, "question");
function hexagon(parent, bbox, node) {
  const f = 4;
  const h = bbox.height;
  const m = h / f;
  const w = bbox.width + 2 * m;
  const points = [
    { x: m, y: 0 },
    { x: w - m, y: 0 },
    { x: w, y: -h / 2 },
    { x: w - m, y: -h },
    { x: m, y: -h },
    { x: 0, y: -h / 2 }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(hexagon, "hexagon");
function rect_left_inv_arrow(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: -h / 2, y: 0 },
    { x: w, y: 0 },
    { x: w, y: -h },
    { x: -h / 2, y: -h },
    { x: 0, y: -h / 2 }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(rect_left_inv_arrow, "rect_left_inv_arrow");
function lean_right(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: -2 * h / 6, y: 0 },
    { x: w - h / 6, y: 0 },
    { x: w + 2 * h / 6, y: -h },
    { x: h / 6, y: -h }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(lean_right, "lean_right");
function lean_left(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: 2 * h / 6, y: 0 },
    { x: w + h / 6, y: 0 },
    { x: w - 2 * h / 6, y: -h },
    { x: -h / 6, y: -h }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(lean_left, "lean_left");
function trapezoid(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: -2 * h / 6, y: 0 },
    { x: w + 2 * h / 6, y: 0 },
    { x: w - h / 6, y: -h },
    { x: h / 6, y: -h }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(trapezoid, "trapezoid");
function inv_trapezoid(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: h / 6, y: 0 },
    { x: w - h / 6, y: 0 },
    { x: w + 2 * h / 6, y: -h },
    { x: -2 * h / 6, y: -h }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(inv_trapezoid, "inv_trapezoid");
function rect_right_inv_arrow(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: 0, y: 0 },
    { x: w + h / 2, y: 0 },
    { x: w, y: -h / 2 },
    { x: w + h / 2, y: -h },
    { x: 0, y: -h }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(rect_right_inv_arrow, "rect_right_inv_arrow");
function stadium(parent, bbox, node) {
  const h = bbox.height;
  const w = bbox.width + h / 4;
  const shapeSvg = parent.insert("rect", ":first-child").attr("rx", h / 2).attr("ry", h / 2).attr("x", -w / 2).attr("y", -h / 2).attr("width", w).attr("height", h);
  node.intersect = function(point) {
    return intersectRect(node, point);
  };
  return shapeSvg;
}
__name(stadium, "stadium");
function subroutine(parent, bbox, node) {
  const w = bbox.width;
  const h = bbox.height;
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w, y: -h },
    { x: 0, y: -h },
    { x: 0, y: 0 },
    { x: -8, y: 0 },
    { x: w + 8, y: 0 },
    { x: w + 8, y: -h },
    { x: -8, y: -h },
    { x: -8, y: 0 }
  ];
  const shapeSvg = insertPolygonShape(parent, w, h, points);
  node.intersect = function(point) {
    return intersectPolygon(node, points, point);
  };
  return shapeSvg;
}
__name(subroutine, "subroutine");
function cylinder(parent, bbox, node) {
  const w = bbox.width;
  const rx = w / 2;
  const ry = rx / (2.5 + w / 50);
  const h = bbox.height + ry;
  const shape = "M 0," + ry + " a " + rx + "," + ry + " 0,0,0 " + w + " 0 a " + rx + "," + ry + " 0,0,0 " + -w + " 0 l 0," + h + " a " + rx + "," + ry + " 0,0,0 " + w + " 0 l 0," + -h;
  const shapeSvg = parent.attr("label-offset-y", ry).insert("path", ":first-child").attr("d", shape).attr("transform", "translate(" + -w / 2 + "," + -(h / 2 + ry) + ")");
  node.intersect = function(point) {
    const pos = intersectRect(node, point);
    const x = pos.x - node.x;
    if (rx != 0 && (Math.abs(x) < node.width / 2 || Math.abs(x) == node.width / 2 && Math.abs(pos.y - node.y) > node.height / 2 - ry)) {
      let y = ry * ry * (1 - x * x / (rx * rx));
      if (y != 0) {
        y = Math.sqrt(y);
      }
      y = ry - y;
      if (point.y - node.y > 0) {
        y = -y;
      }
      pos.y += y;
    }
    return pos;
  };
  return shapeSvg;
}
__name(cylinder, "cylinder");
function addToRender(render2) {
  render2.shapes().question = question;
  render2.shapes().hexagon = hexagon;
  render2.shapes().stadium = stadium;
  render2.shapes().subroutine = subroutine;
  render2.shapes().cylinder = cylinder;
  render2.shapes().rect_left_inv_arrow = rect_left_inv_arrow;
  render2.shapes().lean_right = lean_right;
  render2.shapes().lean_left = lean_left;
  render2.shapes().trapezoid = trapezoid;
  render2.shapes().inv_trapezoid = inv_trapezoid;
  render2.shapes().rect_right_inv_arrow = rect_right_inv_arrow;
}
__name(addToRender, "addToRender");
function addToRenderV2(addShape) {
  addShape({ question });
  addShape({ hexagon });
  addShape({ stadium });
  addShape({ subroutine });
  addShape({ cylinder });
  addShape({ rect_left_inv_arrow });
  addShape({ lean_right });
  addShape({ lean_left });
  addShape({ trapezoid });
  addShape({ inv_trapezoid });
  addShape({ rect_right_inv_arrow });
}
__name(addToRenderV2, "addToRenderV2");
function insertPolygonShape(parent, w, h, points) {
  return parent.insert("polygon", ":first-child").attr(
    "points",
    points.map(function(d) {
      return d.x + "," + d.y;
    }).join(" ")
  ).attr("transform", "translate(" + -w / 2 + "," + h / 2 + ")");
}
__name(insertPolygonShape, "insertPolygonShape");
var flowChartShapes_default = {
  addToRender,
  addToRenderV2
};

// src/diagrams/flowchart/flowRenderer.js
var conf = {};
var setConf = /* @__PURE__ */ __name(function(cnf) {
  const keys = Object.keys(cnf);
  for (const key of keys) {
    conf[key] = cnf[key];
  }
}, "setConf");
var addVertices = /* @__PURE__ */ __name(function(vert, g, svgId, root, _doc, diagObj) {
  const svg2 = !root ? select_default(`[id="${svgId}"]`) : root.select(`[id="${svgId}"]`);
  const doc = !_doc ? document : _doc;
  const keys = Object.keys(vert);
  keys.forEach(function(id) {
    const vertex = vert[id];
    let classStr = "default";
    if (vertex.classes.length > 0) {
      classStr = vertex.classes.join(" ");
    }
    const styles = getStylesFromArray(vertex.styles);
    let vertexText = vertex.text !== void 0 ? vertex.text : vertex.id;
    let vertexNode;
    if (evaluate(getConfig().flowchart.htmlLabels)) {
      const node = {
        label: vertexText.replace(
          /fa[blrs]?:fa-[\w-]+/g,
          (s) => `<i class='${s.replace(":", " ")}'></i>`
        )
      };
      vertexNode = addHtmlLabel(svg2, node).node();
      vertexNode.parentNode.removeChild(vertexNode);
    } else {
      const svgLabel = doc.createElementNS("http://www.w3.org/2000/svg", "text");
      svgLabel.setAttribute("style", styles.labelStyle.replace("color:", "fill:"));
      const rows = vertexText.split(common_default.lineBreakRegex);
      for (const row of rows) {
        const tspan = doc.createElementNS("http://www.w3.org/2000/svg", "tspan");
        tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
        tspan.setAttribute("dy", "1em");
        tspan.setAttribute("x", "1");
        tspan.textContent = row;
        svgLabel.appendChild(tspan);
      }
      vertexNode = svgLabel;
    }
    let radious = 0;
    let _shape = "";
    switch (vertex.type) {
      case "round":
        radious = 5;
        _shape = "rect";
        break;
      case "square":
        _shape = "rect";
        break;
      case "diamond":
        _shape = "question";
        break;
      case "hexagon":
        _shape = "hexagon";
        break;
      case "odd":
        _shape = "rect_left_inv_arrow";
        break;
      case "lean_right":
        _shape = "lean_right";
        break;
      case "lean_left":
        _shape = "lean_left";
        break;
      case "trapezoid":
        _shape = "trapezoid";
        break;
      case "inv_trapezoid":
        _shape = "inv_trapezoid";
        break;
      case "odd_right":
        _shape = "rect_left_inv_arrow";
        break;
      case "circle":
        _shape = "circle";
        break;
      case "ellipse":
        _shape = "ellipse";
        break;
      case "stadium":
        _shape = "stadium";
        break;
      case "subroutine":
        _shape = "subroutine";
        break;
      case "cylinder":
        _shape = "cylinder";
        break;
      case "group":
        _shape = "rect";
        break;
      default:
        _shape = "rect";
    }
    log.warn("Adding node", vertex.id, vertex.domId);
    g.setNode(diagObj.db.lookUpDomId(vertex.id), {
      labelType: "svg",
      labelStyle: styles.labelStyle,
      shape: _shape,
      label: vertexNode,
      rx: radious,
      ry: radious,
      class: classStr,
      style: styles.style,
      id: diagObj.db.lookUpDomId(vertex.id)
    });
  });
}, "addVertices");
var addEdges = /* @__PURE__ */ __name(function(edges, g, diagObj) {
  let cnt = 0;
  let defaultStyle;
  let defaultLabelStyle;
  if (edges.defaultStyle !== void 0) {
    const defaultStyles = getStylesFromArray(edges.defaultStyle);
    defaultStyle = defaultStyles.style;
    defaultLabelStyle = defaultStyles.labelStyle;
  }
  edges.forEach(function(edge) {
    cnt++;
    const linkId = "L-" + edge.start + "-" + edge.end;
    const linkNameStart = "LS-" + edge.start;
    const linkNameEnd = "LE-" + edge.end;
    const edgeData = {};
    if (edge.type === "arrow_open") {
      edgeData.arrowhead = "none";
    } else {
      edgeData.arrowhead = "normal";
    }
    let style = "";
    let labelStyle = "";
    if (edge.style !== void 0) {
      const styles = getStylesFromArray(edge.style);
      style = styles.style;
      labelStyle = styles.labelStyle;
    } else {
      switch (edge.stroke) {
        case "normal":
          style = "fill:none";
          if (defaultStyle !== void 0) {
            style = defaultStyle;
          }
          if (defaultLabelStyle !== void 0) {
            labelStyle = defaultLabelStyle;
          }
          break;
        case "dotted":
          style = "fill:none;stroke-width:2px;stroke-dasharray:3;";
          break;
        case "thick":
          style = " stroke-width: 3.5px;fill:none";
          break;
      }
    }
    edgeData.style = style;
    edgeData.labelStyle = labelStyle;
    if (edge.interpolate !== void 0) {
      edgeData.curve = interpolateToCurve(edge.interpolate, linear_default);
    } else if (edges.defaultInterpolate !== void 0) {
      edgeData.curve = interpolateToCurve(edges.defaultInterpolate, linear_default);
    } else {
      edgeData.curve = interpolateToCurve(conf.curve, linear_default);
    }
    if (edge.text === void 0) {
      if (edge.style !== void 0) {
        edgeData.arrowheadStyle = "fill: #333";
      }
    } else {
      edgeData.arrowheadStyle = "fill: #333";
      edgeData.labelpos = "c";
      if (evaluate(getConfig().flowchart.htmlLabels)) {
        edgeData.labelType = "html";
        edgeData.label = `<span id="L-${linkId}" class="edgeLabel L-${linkNameStart}' L-${linkNameEnd}" style="${edgeData.labelStyle}">${edge.text.replace(
          /fa[blrs]?:fa-[\w-]+/g,
          (s) => `<i class='${s.replace(":", " ")}'></i>`
        )}</span>`;
      } else {
        edgeData.labelType = "text";
        edgeData.label = edge.text.replace(common_default.lineBreakRegex, "\n");
        if (edge.style === void 0) {
          edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none";
        }
        edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
      }
    }
    edgeData.id = linkId;
    edgeData.class = linkNameStart + " " + linkNameEnd;
    edgeData.minlen = edge.length || 1;
    g.setEdge(diagObj.db.lookUpDomId(edge.start), diagObj.db.lookUpDomId(edge.end), edgeData, cnt);
  });
}, "addEdges");
var getClasses = /* @__PURE__ */ __name(function(text, diagObj) {
  log.info("Extracting classes");
  return diagObj.db.getClasses();
}, "getClasses");
var draw = /* @__PURE__ */ __name(function(text, id, _version, diagObj) {
  log.info("Drawing flowchart");
  const { securityLevel, flowchart: conf2 } = getConfig();
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select_default("#i" + id);
  }
  const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
  const doc = securityLevel === "sandbox" ? sandboxElement.nodes()[0].contentDocument : document;
  let dir = diagObj.db.getDirection();
  if (dir === void 0) {
    dir = "TD";
  }
  const nodeSpacing = conf2.nodeSpacing || 50;
  const rankSpacing = conf2.rankSpacing || 50;
  const g = new Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: dir,
    nodesep: nodeSpacing,
    ranksep: rankSpacing,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  });
  let subG;
  const subGraphs = diagObj.db.getSubGraphs();
  for (let i2 = subGraphs.length - 1; i2 >= 0; i2--) {
    subG = subGraphs[i2];
    diagObj.db.addVertex(subG.id, subG.title, "group", void 0, subG.classes);
  }
  const vert = diagObj.db.getVertices();
  log.warn("Get vertices", vert);
  const edges = diagObj.db.getEdges();
  let i = 0;
  for (i = subGraphs.length - 1; i >= 0; i--) {
    subG = subGraphs[i];
    selectAll_default("cluster").append("text");
    for (let j = 0; j < subG.nodes.length; j++) {
      log.warn(
        "Setting subgraph",
        subG.nodes[j],
        diagObj.db.lookUpDomId(subG.nodes[j]),
        diagObj.db.lookUpDomId(subG.id)
      );
      g.setParent(diagObj.db.lookUpDomId(subG.nodes[j]), diagObj.db.lookUpDomId(subG.id));
    }
  }
  addVertices(vert, g, id, root, doc, diagObj);
  addEdges(edges, g, diagObj);
  const render2 = new render();
  flowChartShapes_default.addToRender(render2);
  render2.arrows().none = /* @__PURE__ */ __name(function normal2(parent, id2, edge, type) {
    const marker = parent.append("marker").attr("id", id2).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerUnits", "strokeWidth").attr("markerWidth", 8).attr("markerHeight", 6).attr("orient", "auto");
    const path = marker.append("path").attr("d", "M 0 0 L 0 0 L 0 0 z");
    applyStyle(path, edge[type + "Style"]);
  }, "normal");
  render2.arrows().normal = /* @__PURE__ */ __name(function normal2(parent, id2) {
    const marker = parent.append("marker").attr("id", id2).attr("viewBox", "0 0 10 10").attr("refX", 9).attr("refY", 5).attr("markerUnits", "strokeWidth").attr("markerWidth", 8).attr("markerHeight", 6).attr("orient", "auto");
    marker.append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowheadPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  }, "normal");
  const svg2 = root.select(`[id="${id}"]`);
  const element = root.select("#" + id + " g");
  render2(element, g);
  element.selectAll("g.node").attr("title", function() {
    return diagObj.db.getTooltip(this.id);
  });
  diagObj.db.indexNodes("subGraph" + i);
  for (i = 0; i < subGraphs.length; i++) {
    subG = subGraphs[i];
    if (subG.title !== "undefined") {
      const clusterRects = doc.querySelectorAll(
        "#" + id + ' [id="' + diagObj.db.lookUpDomId(subG.id) + '"] rect'
      );
      const clusterEl = doc.querySelectorAll(
        "#" + id + ' [id="' + diagObj.db.lookUpDomId(subG.id) + '"]'
      );
      const xPos = clusterRects[0].x.baseVal.value;
      const yPos = clusterRects[0].y.baseVal.value;
      const _width = clusterRects[0].width.baseVal.value;
      const cluster = select_default(clusterEl[0]);
      const te = cluster.select(".label");
      te.attr("transform", `translate(${xPos + _width / 2}, ${yPos + 14})`);
      te.attr("id", id + "Text");
      for (let j = 0; j < subG.classes.length; j++) {
        clusterEl[0].classList.add(subG.classes[j]);
      }
    }
  }
  if (!conf2.htmlLabels) {
    const labels = doc.querySelectorAll('[id="' + id + '"] .edgeLabel .label');
    for (const label of labels) {
      const dim = label.getBBox();
      const rect2 = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect2.setAttribute("rx", 0);
      rect2.setAttribute("ry", 0);
      rect2.setAttribute("width", dim.width);
      rect2.setAttribute("height", dim.height);
      label.insertBefore(rect2, label.firstChild);
    }
  }
  setupGraphViewbox(g, svg2, conf2.diagramPadding, conf2.useMaxWidth);
  const keys = Object.keys(vert);
  keys.forEach(function(key) {
    const vertex = vert[key];
    if (vertex.link) {
      const node = root.select("#" + id + ' [id="' + diagObj.db.lookUpDomId(key) + '"]');
      if (node) {
        const link = doc.createElementNS("http://www.w3.org/2000/svg", "a");
        link.setAttributeNS("http://www.w3.org/2000/svg", "class", vertex.classes.join(" "));
        link.setAttributeNS("http://www.w3.org/2000/svg", "href", vertex.link);
        link.setAttributeNS("http://www.w3.org/2000/svg", "rel", "noopener");
        if (securityLevel === "sandbox") {
          link.setAttributeNS("http://www.w3.org/2000/svg", "target", "_top");
        } else if (vertex.linkTarget) {
          link.setAttributeNS("http://www.w3.org/2000/svg", "target", vertex.linkTarget);
        }
        const linkNode = node.insert(function() {
          return link;
        }, ":first-child");
        const shape = node.select(".label-container");
        if (shape) {
          linkNode.append(function() {
            return shape.node();
          });
        }
        const label = node.select(".label");
        if (label) {
          linkNode.append(function() {
            return label.node();
          });
        }
      }
    }
  });
}, "draw");
var flowRenderer_default = {
  setConf,
  addVertices,
  addEdges,
  getClasses,
  draw
};

// src/diagrams/flowchart/flowDiagram.ts
var diagram = {
  parser: flow_default,
  db: flowDb_default,
  renderer: flowRenderer_v2_default,
  styles: styles_default,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    flowRenderer_default.setConf(cnf.flowchart);
    flowDb_default.clear();
    flowDb_default.setGen("gen-1");
  }
};
export {
  diagram
};
