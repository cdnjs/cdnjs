(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.dagreD3 = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @license
 * Copyright (c) 2012-2013 Chris Pettitt
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
module.exports =  {
  graphlib: require("./lib/graphlib"),
  dagre: require("./lib/dagre"),
  intersect: require("./lib/intersect"),
  render: require("./lib/render"),
  util: require("./lib/util"),
  version: require("./lib/version")
};

},{"./lib/dagre":8,"./lib/graphlib":9,"./lib/intersect":10,"./lib/render":25,"./lib/util":27,"./lib/version":28}],2:[function(require,module,exports){
var util = require("./util");

module.exports = {
  "default": normal,
  "normal": normal,
  "vee": vee,
  "undirected": undirected
};

function normal(parent, id, edge, type) {
  var marker = parent.append("marker")
    .attr("id", id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 9)
    .attr("refY", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 8)
    .attr("markerHeight", 6)
    .attr("orient", "auto");

  var path = marker.append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 z")
    .style("stroke-width", 1)
    .style("stroke-dasharray", "1,0");
  util.applyStyle(path, edge[type + "Style"]);
  if (edge[type + "Class"]) {
    path.attr("class", edge[type + "Class"]);
  }
}

function vee(parent, id, edge, type) {
  var marker = parent.append("marker")
    .attr("id", id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 9)
    .attr("refY", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 8)
    .attr("markerHeight", 6)
    .attr("orient", "auto");

  var path = marker.append("path")
    .attr("d", "M 0 0 L 10 5 L 0 10 L 4 5 z")
    .style("stroke-width", 1)
    .style("stroke-dasharray", "1,0");
  util.applyStyle(path, edge[type + "Style"]);
  if (edge[type + "Class"]) {
    path.attr("class", edge[type + "Class"]);
  }
}

function undirected(parent, id, edge, type) {
  var marker = parent.append("marker")
    .attr("id", id)
    .attr("viewBox", "0 0 10 10")
    .attr("refX", 9)
    .attr("refY", 5)
    .attr("markerUnits", "strokeWidth")
    .attr("markerWidth", 8)
    .attr("markerHeight", 6)
    .attr("orient", "auto");

  var path = marker.append("path")
    .attr("d", "M 0 5 L 10 5")
    .style("stroke-width", 1)
    .style("stroke-dasharray", "1,0");
  util.applyStyle(path, edge[type + "Style"]);
  if (edge[type + "Class"]) {
    path.attr("class", edge[type + "Class"]);
  }
}

},{"./util":27}],3:[function(require,module,exports){
var util = require("./util"),
    addLabel = require("./label/add-label");

module.exports = createClusters;

function createClusters(selection, g) {
  var clusters = g.nodes().filter(function(v) { return util.isSubgraph(g, v); }),
      svgClusters = selection.selectAll("g.cluster")
        .data(clusters, function(v) { return v; });

  svgClusters.selectAll("*").remove();
  svgClusters.enter()
    .append("g")
      .attr("class", "cluster")
      .attr("id",function(v){
          var node = g.node(v);
          return node.id;
      })
      .style("opacity", 0);

  util.applyTransition(svgClusters, g)
    .style("opacity", 1);

  svgClusters.each(function(v) {
    var node = g.node(v),
        thisGroup = d3.select(this);
    d3.select(this).append("rect");
    var labelGroup = thisGroup.append("g").attr("class", "label");
    addLabel(labelGroup, node, node.clusterLabelPos);
  });

  svgClusters.selectAll("rect").each(function(c) {
    var node = g.node(c);
    var domCluster = d3.select(this);
    util.applyStyle(domCluster, node.style);
  });

  util.applyTransition(svgClusters.exit(), g)
    .style("opacity", 0)
    .remove();

  return svgClusters;
}

},{"./label/add-label":18,"./util":27}],4:[function(require,module,exports){
"use strict";

var _ = require("./lodash"),
    addLabel = require("./label/add-label"),
    util = require("./util"),
    d3 = require("./d3");

module.exports = createEdgeLabels;

function createEdgeLabels(selection, g) {
  var svgEdgeLabels = selection.selectAll("g.edgeLabel")
    .data(g.edges(), function(e) { return util.edgeToId(e); })
    .classed("update", true);

  svgEdgeLabels.selectAll("*").remove();
  svgEdgeLabels.enter()
    .append("g")
      .classed("edgeLabel", true)
      .style("opacity", 0);
  svgEdgeLabels.each(function(e) {
    var edge = g.edge(e),
        label = addLabel(d3.select(this), g.edge(e), 0, 0).classed("label", true),
        bbox = label.node().getBBox();

    if (edge.labelId) { label.attr("id", edge.labelId); }
    if (!_.has(edge, "width")) { edge.width = bbox.width; }
    if (!_.has(edge, "height")) { edge.height = bbox.height; }
  });

  util.applyTransition(svgEdgeLabels.exit(), g)
    .style("opacity", 0)
    .remove();

  return svgEdgeLabels;
}

},{"./d3":7,"./label/add-label":18,"./lodash":21,"./util":27}],5:[function(require,module,exports){
"use strict";

var _ = require("./lodash"),
    intersectNode = require("./intersect/intersect-node"),
    util = require("./util"),
    d3 = require("./d3");
module.exports = createEdgePaths;

function createEdgePaths(selection, g, arrows) {
  var svgPaths = selection.selectAll("g.edgePath")
    .data(g.edges(), function(e) { return util.edgeToId(e); })
    .classed("update", true);

  enter(svgPaths, g);
  exit(svgPaths, g);

  util.applyTransition(svgPaths, g)
    .style("opacity", 1);

  // Save DOM element in the path group, and set ID and class
  svgPaths.each(function(e) {
    var domEdge = d3.select(this);
    var edge = g.edge(e);
    edge.elem = this;

    if (edge.id) {
      domEdge.attr("id", edge.id);
    }

    util.applyClass(domEdge, edge["class"],
      (domEdge.classed("update") ? "update " : "") + "edgePath");
  });

  svgPaths.selectAll("path.path")
    .each(function(e) {
      var edge = g.edge(e);
      edge.arrowheadId = _.uniqueId("arrowhead");

      var domEdge = d3.select(this)
        .attr("marker-end", function() {
            return "url(" + location.href + "#" + edge.arrowheadId + ")";
        })
        .style("fill", "none");

      util.applyTransition(domEdge, g)
        .attr("d", function(e) { return calcPoints(g, e); });

      util.applyStyle(domEdge, edge.style);
    });

  svgPaths.selectAll("defs *").remove();
  svgPaths.selectAll("defs")
    .each(function(e) {
      var edge = g.edge(e),
          arrowhead = arrows[edge.arrowhead];
      arrowhead(d3.select(this), edge.arrowheadId, edge, "arrowhead");
    });

  return svgPaths;
}

function calcPoints(g, e) {
  var edge = g.edge(e),
      tail = g.node(e.v),
      head = g.node(e.w),
      points = edge.points.slice(1, edge.points.length - 1);
  points.unshift(intersectNode(tail, points[0]));
  points.push(intersectNode(head, points[points.length - 1]));

  return createLine(edge, points);
}

function createLine(edge, points) {
  var line = d3.svg.line()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; });

  if (_.has(edge, "lineInterpolate")) {
    line.interpolate(edge.lineInterpolate);
  }

  if (_.has(edge, "lineTension")) {
    line.tension(Number(edge.lineTension));
  }

  return line(points);
}

function getCoords(elem) {
  var bbox = elem.getBBox(),
      matrix = elem.ownerSVGElement.getScreenCTM()
        .inverse()
        .multiply(elem.getScreenCTM())
        .translate(bbox.width / 2, bbox.height / 2);
  return { x: matrix.e, y: matrix.f };
}

function enter(svgPaths, g) {
  var svgPathsEnter = svgPaths.enter()
    .append("g")
      .attr("class", "edgePath")
      .style("opacity", 0);
  svgPathsEnter.append("path")
    .attr("class", "path")
    .attr("d", function(e) {
      var edge = g.edge(e),
          sourceElem = g.node(e.v).elem,
          points = _.range(edge.points.length).map(function() { return getCoords(sourceElem); });
      return createLine(edge, points);
    });
  svgPathsEnter.append("defs");
}

function exit(svgPaths, g) {
  var svgPathExit = svgPaths.exit();
  util.applyTransition(svgPathExit, g)
    .style("opacity", 0)
    .remove();

  util.applyTransition(svgPathExit.select("path.path"), g)
    .attr("d", function(e) {
      var source = g.node(e.v);

      if (source) {
        var points = _.range(this.getTotalLength()).map(function() { return source; });
        return createLine({}, points);
      } else {
        return d3.select(this).attr("d");
      }
    });
}

},{"./d3":7,"./intersect/intersect-node":14,"./lodash":21,"./util":27}],6:[function(require,module,exports){
"use strict";

var _ = require("./lodash"),
    addLabel = require("./label/add-label"),
    util = require("./util"),
    d3 = require("./d3");

module.exports = createNodes;

function createNodes(selection, g, shapes) {
  var simpleNodes = g.nodes().filter(function(v) { return !util.isSubgraph(g, v); });
  var svgNodes = selection.selectAll("g.node")
    .data(simpleNodes, function(v) { return v; })
    .classed("update", true);

  svgNodes.selectAll("*").remove();
  svgNodes.enter()
    .append("g")
      .attr("class", "node")
      .style("opacity", 0);
  svgNodes.each(function(v) {
    var node = g.node(v),
        thisGroup = d3.select(this),
        labelGroup = thisGroup.append("g").attr("class", "label"),
        labelDom = addLabel(labelGroup, node),
        shape = shapes[node.shape],
        bbox = _.pick(labelDom.node().getBBox(), "width", "height");

    node.elem = this;

    if (node.id) { thisGroup.attr("id", node.id); }
    if (node.labelId) { labelGroup.attr("id", node.labelId); }
    util.applyClass(thisGroup, node["class"],
      (thisGroup.classed("update") ? "update " : "") + "node");

    if (_.has(node, "width")) { bbox.width = node.width; }
    if (_.has(node, "height")) { bbox.height = node.height; }

    bbox.width += node.paddingLeft + node.paddingRight;
    bbox.height += node.paddingTop + node.paddingBottom;
    labelGroup.attr("transform", "translate(" +
      ((node.paddingLeft - node.paddingRight) / 2) + "," +
      ((node.paddingTop - node.paddingBottom) / 2) + ")");

    var shapeSvg = shape(d3.select(this), bbox, node);
    util.applyStyle(shapeSvg, node.style);

    var shapeBBox = shapeSvg.node().getBBox();
    node.width = shapeBBox.width;
    node.height = shapeBBox.height;
  });

  util.applyTransition(svgNodes.exit(), g)
    .style("opacity", 0)
    .remove();

  return svgNodes;
}

},{"./d3":7,"./label/add-label":18,"./lodash":21,"./util":27}],7:[function(require,module,exports){
// Stub to get D3 either via NPM or from the global object
module.exports = window.d3;

},{}],8:[function(require,module,exports){
/* global window */

var dagre;

if (require) {
  try {
    dagre = require("dagre");
  } catch (e) {}
}

if (!dagre) {
  dagre = window.dagre;
}

module.exports = dagre;

},{"dagre":undefined}],9:[function(require,module,exports){
/* global window */

var graphlib;

if (require) {
  try {
    graphlib = require("graphlib");
  } catch (e) {}
}

if (!graphlib) {
  graphlib = window.graphlib;
}

module.exports = graphlib;

},{"graphlib":undefined}],10:[function(require,module,exports){
module.exports = {
  node: require("./intersect-node"),
  circle: require("./intersect-circle"),
  ellipse: require("./intersect-ellipse"),
  polygon: require("./intersect-polygon"),
  rect: require("./intersect-rect")
};

},{"./intersect-circle":11,"./intersect-ellipse":12,"./intersect-node":14,"./intersect-polygon":15,"./intersect-rect":16}],11:[function(require,module,exports){
var intersectEllipse = require("./intersect-ellipse");

module.exports = intersectCircle;

function intersectCircle(node, rx, point) {
  return intersectEllipse(node, rx, rx, point);
}

},{"./intersect-ellipse":12}],12:[function(require,module,exports){
module.exports = intersectEllipse;

function intersectEllipse(node, rx, ry, point) {
  // Formulae from: http://mathworld.wolfram.com/Ellipse-LineIntersection.html

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

  return {x: cx + dx, y: cy + dy};
}


},{}],13:[function(require,module,exports){
module.exports = intersectLine;

/*
 * Returns the point at which two lines, p and q, intersect or returns
 * undefined if they do not intersect.
 */
function intersectLine(p1, p2, q1, q2) {
  // Algorithm from J. Avro, (ed.) Graphics Gems, No 2, Morgan Kaufmann, 1994,
  // p7 and p473.

  var a1, a2, b1, b2, c1, c2;
  var r1, r2 , r3, r4;
  var denom, offset, num;
  var x, y;

  // Compute a1, b1, c1, where line joining points 1 and 2 is F(x,y) = a1 x +
  // b1 y + c1 = 0.
  a1 = p2.y - p1.y;
  b1 = p1.x - p2.x;
  c1 = (p2.x * p1.y) - (p1.x * p2.y);

  // Compute r3 and r4.
  r3 = ((a1 * q1.x) + (b1 * q1.y) + c1);
  r4 = ((a1 * q2.x) + (b1 * q2.y) + c1);

  // Check signs of r3 and r4. If both point 3 and point 4 lie on
  // same side of line 1, the line segments do not intersect.
  if ((r3 !== 0) && (r4 !== 0) && sameSign(r3, r4)) {
    return /*DONT_INTERSECT*/;
  }

  // Compute a2, b2, c2 where line joining points 3 and 4 is G(x,y) = a2 x + b2 y + c2 = 0
  a2 = q2.y - q1.y;
  b2 = q1.x - q2.x;
  c2 = (q2.x * q1.y) - (q1.x * q2.y);

  // Compute r1 and r2
  r1 = (a2 * p1.x) + (b2 * p1.y) + c2;
  r2 = (a2 * p2.x) + (b2 * p2.y) + c2;

  // Check signs of r1 and r2. If both point 1 and point 2 lie
  // on same side of second line segment, the line segments do
  // not intersect.
  if ((r1 !== 0) && (r2 !== 0) && (sameSign(r1, r2))) {
    return /*DONT_INTERSECT*/;
  }

  // Line segments intersect: compute intersection point.
  denom = (a1 * b2) - (a2 * b1);
  if (denom === 0) {
    return /*COLLINEAR*/;
  }

  offset = Math.abs(denom / 2);

  // The denom/2 is to get rounding instead of truncating. It
  // is added or subtracted to the numerator, depending upon the
  // sign of the numerator.
  num = (b1 * c2) - (b2 * c1);
  x = (num < 0) ? ((num - offset) / denom) : ((num + offset) / denom);

  num = (a2 * c1) - (a1 * c2);
  y = (num < 0) ? ((num - offset) / denom) : ((num + offset) / denom);

  return { x: x, y: y };
}

function sameSign(r1, r2) {
  return r1 * r2 > 0;
}

},{}],14:[function(require,module,exports){
module.exports = intersectNode;

function intersectNode(node, point) {
  return node.intersect(point);
}

},{}],15:[function(require,module,exports){
var intersectLine = require("./intersect-line");

module.exports = intersectPolygon;

/*
 * Returns the point ({x, y}) at which the point argument intersects with the
 * node argument assuming that it has the shape specified by polygon.
 */
function intersectPolygon(node, polyPoints, point) {
  var x1 = node.x;
  var y1 = node.y;

  var intersections = [];

  var minX = Number.POSITIVE_INFINITY,
      minY = Number.POSITIVE_INFINITY;
  polyPoints.forEach(function(entry) {
    minX = Math.min(minX, entry.x);
    minY = Math.min(minY, entry.y);
  });

  var left = x1 - node.width / 2 - minX;
  var top =  y1 - node.height / 2 - minY;

  for (var i = 0; i < polyPoints.length; i++) {
    var p1 = polyPoints[i];
    var p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
    var intersect = intersectLine(node, point,
      {x: left + p1.x, y: top + p1.y}, {x: left + p2.x, y: top + p2.y});
    if (intersect) {
      intersections.push(intersect);
    }
  }

  if (!intersections.length) {
    console.log("NO INTERSECTION FOUND, RETURN NODE CENTER", node);
    return node;
  }

  if (intersections.length > 1) {
    // More intersections, find the one nearest to edge end point
    intersections.sort(function(p, q) {
      var pdx = p.x - point.x,
          pdy = p.y - point.y,
          distp = Math.sqrt(pdx * pdx + pdy * pdy),

          qdx = q.x - point.x,
          qdy = q.y - point.y,
          distq = Math.sqrt(qdx * qdx + qdy * qdy);

      return (distp < distq) ? -1 : (distp === distq ? 0 : 1);
    });
  }
  return intersections[0];
}

},{"./intersect-line":13}],16:[function(require,module,exports){
module.exports = intersectRect;

function intersectRect(node, point) {
  var x = node.x;
  var y = node.y;

  // Rectangle intersection algorithm from:
  // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
  var dx = point.x - x;
  var dy = point.y - y;
  var w = node.width / 2;
  var h = node.height / 2;

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
}

},{}],17:[function(require,module,exports){
var util = require("../util");

module.exports = addHtmlLabel;

function addHtmlLabel(root, node) {
  var fo = root
    .append("foreignObject")
      .attr("width", "100000");

  var div = fo
    .append("xhtml:div");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");

  var label = node.label;
  switch(typeof label) {
    case "function":
      div.insert(label);
      break;
    case "object":
      // Currently we assume this is a DOM object.
      div.insert(function() { return label; });
      break;
    default: div.html(label);
  }

  util.applyStyle(div, node.labelStyle);
  div.style("display", "inline-block");
  // Fix for firefox
  div.style("white-space", "nowrap");

  var client = div[0][0].getBoundingClientRect();
  fo
    .attr("width", client.width)
    .attr("height", client.height); 

  return fo;
}

},{"../util":27}],18:[function(require,module,exports){
var addTextLabel = require("./add-text-label"),
    addHtmlLabel = require("./add-html-label"),
    addSVGLabel  = require("./add-svg-label");

module.exports = addLabel;

function addLabel(root, node, location) {
  var label = node.label;
  var labelSvg = root.append("g");

  // Allow the label to be a string, a function that returns a DOM element, or
  // a DOM element itself.
  if (node.labelType === "svg") {
    addSVGLabel(labelSvg, node);
  } else if (typeof label !== "string" || node.labelType === "html") {
    addHtmlLabel(labelSvg, node);
  } else {
    addTextLabel(labelSvg, node);
  }

  var labelBBox = labelSvg.node().getBBox();
  var y;
  switch(location) {
    case "top":
      y = (-node.height / 2);
      break;
    case "bottom":
      y = (node.height / 2) - labelBBox.height;
      break;
    default:
      y = (-labelBBox.height / 2);
  }
  labelSvg.attr("transform",
                "translate(" + (-labelBBox.width / 2) + "," + y + ")");

  return labelSvg;
}

},{"./add-html-label":17,"./add-svg-label":19,"./add-text-label":20}],19:[function(require,module,exports){
var util = require("../util");

module.exports = addSVGLabel;

function addSVGLabel(root, node) {
  var domNode = root;

  domNode.node().appendChild(node.label);

  util.applyStyle(domNode, node.labelStyle);

  return domNode;
}

},{"../util":27}],20:[function(require,module,exports){
var util = require("../util");

module.exports = addTextLabel;

/*
 * Attaches a text label to the specified root. Handles escape sequences.
 */
function addTextLabel(root, node) {
  var domNode = root.append("text");

  var lines = processEscapeSequences(node.label).split("\n");
  for (var i = 0; i < lines.length; i++) {
    domNode
      .append("tspan")
        .attr("xml:space", "preserve")
        .attr("dy", "1em")
        .attr("x", "1")
        .text(lines[i]);
  }

  util.applyStyle(domNode, node.labelStyle);

  return domNode;
}

function processEscapeSequences(text) {
  var newText = "",
      escaped = false,
      ch;
  for (var i = 0; i < text.length; ++i) {
    ch = text[i];
    if (escaped) {
      switch(ch) {
        case "n": newText += "\n"; break;
        default: newText += ch;
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

},{"../util":27}],21:[function(require,module,exports){
/* global window */

var lodash;

if (require) {
  try {
    lodash = require("lodash");
  } catch (e) {}
}

if (!lodash) {
  lodash = window._;
}

module.exports = lodash;

},{"lodash":undefined}],22:[function(require,module,exports){
"use strict";

var util = require("./util"),
    d3 = require("./d3");

module.exports = positionClusters;

function positionClusters(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });

  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g)
      .style("opacity", 1)
      .attr("transform", translate);

  util.applyTransition(created.selectAll("rect"), g)
      .attr("width", function(v) { return g.node(v).width; })
      .attr("height", function(v) { return g.node(v).height; })
      .attr("x", function(v) {
        var node = g.node(v);
        return -node.width / 2;
      })
      .attr("y", function(v) {
        var node = g.node(v);
        return -node.height / 2;
      });

}

},{"./d3":7,"./util":27}],23:[function(require,module,exports){
"use strict";

var util = require("./util"),
    d3 = require("./d3"),
    _ = require("./lodash");

module.exports = positionEdgeLabels;

function positionEdgeLabels(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });

  function translate(e) {
    var edge = g.edge(e);
    return _.has(edge, "x") ? "translate(" + edge.x + "," + edge.y + ")" : "";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g)
    .style("opacity", 1)
    .attr("transform", translate);
}

},{"./d3":7,"./lodash":21,"./util":27}],24:[function(require,module,exports){
"use strict";

var util = require("./util"),
    d3 = require("./d3");

module.exports = positionNodes;

function positionNodes(selection, g) {
  var created = selection.filter(function() { return !d3.select(this).classed("update"); });

  function translate(v) {
    var node = g.node(v);
    return "translate(" + node.x + "," + node.y + ")";
  }

  created.attr("transform", translate);

  util.applyTransition(selection, g)
    .style("opacity", 1)
    .attr("transform", translate);
}

},{"./d3":7,"./util":27}],25:[function(require,module,exports){
var _ = require("./lodash"),
    layout = require("./dagre").layout;

module.exports = render;

// This design is based on http://bost.ocks.org/mike/chart/.
function render() {
  var createNodes = require("./create-nodes"),
      createClusters = require("./create-clusters"),
      createEdgeLabels = require("./create-edge-labels"),
      createEdgePaths = require("./create-edge-paths"),
      positionNodes = require("./position-nodes"),
      positionEdgeLabels = require("./position-edge-labels"),
      positionClusters = require("./position-clusters"),
      shapes = require("./shapes"),
      arrows = require("./arrows");

  var fn = function(svg, g) {
    preProcessGraph(g);

    var outputGroup = createOrSelectGroup(svg, "output"),
        clustersGroup = createOrSelectGroup(outputGroup, "clusters"),
        edgePathsGroup = createOrSelectGroup(outputGroup, "edgePaths"),
        edgeLabels = createEdgeLabels(createOrSelectGroup(outputGroup, "edgeLabels"), g),
        nodes = createNodes(createOrSelectGroup(outputGroup, "nodes"), g, shapes);

    layout(g);

    positionNodes(nodes, g);
    positionEdgeLabels(edgeLabels, g);
    createEdgePaths(edgePathsGroup, g, arrows);

    var clusters = createClusters(clustersGroup, g);
    positionClusters(clusters, g);

    postProcessGraph(g);
  };

  fn.createNodes = function(value) {
    if (!arguments.length) return createNodes;
    createNodes = value;
    return fn;
  };

  fn.createClusters = function(value) {
    if (!arguments.length) return createClusters;
    createClusters = value;
    return fn;
  };

  fn.createEdgeLabels = function(value) {
    if (!arguments.length) return createEdgeLabels;
    createEdgeLabels = value;
    return fn;
  };

  fn.createEdgePaths = function(value) {
    if (!arguments.length) return createEdgePaths;
    createEdgePaths = value;
    return fn;
  };

  fn.shapes = function(value) {
    if (!arguments.length) return shapes;
    shapes = value;
    return fn;
  };

  fn.arrows = function(value) {
    if (!arguments.length) return arrows;
    arrows = value;
    return fn;
  };

  return fn;
}

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
  lineInterpolate: "linear"
};

function preProcessGraph(g) {
  g.nodes().forEach(function(v) {
    var node = g.node(v);
    if (!_.has(node, "label") && !g.children(v).length) { node.label = v; }

    if (_.has(node, "paddingX")) {
      _.defaults(node, {
        paddingLeft: node.paddingX,
        paddingRight: node.paddingX
      });
    }

    if (_.has(node, "paddingY")) {
      _.defaults(node, {
        paddingTop: node.paddingY,
        paddingBottom: node.paddingY
      });
    }

    if (_.has(node, "padding")) {
      _.defaults(node, {
        paddingLeft: node.padding,
        paddingRight: node.padding,
        paddingTop: node.padding,
        paddingBottom: node.padding
      });
    }

    _.defaults(node, NODE_DEFAULT_ATTRS);

    _.each(["paddingLeft", "paddingRight", "paddingTop", "paddingBottom"], function(k) {
      node[k] = Number(node[k]);
    });

    // Save dimensions for restore during post-processing
    if (_.has(node, "width")) { node._prevWidth = node.width; }
    if (_.has(node, "height")) { node._prevHeight = node.height; }
  });

  g.edges().forEach(function(e) {
    var edge = g.edge(e);
    if (!_.has(edge, "label")) { edge.label = ""; }
    _.defaults(edge, EDGE_DEFAULT_ATTRS);
  });
}

function postProcessGraph(g) {
  _.each(g.nodes(), function(v) {
    var node = g.node(v);

    // Restore original dimensions
    if (_.has(node, "_prevWidth")) {
      node.width = node._prevWidth;
    } else {
      delete node.width;
    }

    if (_.has(node, "_prevHeight")) {
      node.height = node._prevHeight;
    } else {
      delete node.height;
    }

    delete node._prevWidth;
    delete node._prevHeight;
  });
}

function createOrSelectGroup(root, name) {
  var selection = root.select("g." + name);
  if (selection.empty()) {
    selection = root.append("g").attr("class", name);
  }
  return selection;
}

},{"./arrows":2,"./create-clusters":3,"./create-edge-labels":4,"./create-edge-paths":5,"./create-nodes":6,"./dagre":8,"./lodash":21,"./position-clusters":22,"./position-edge-labels":23,"./position-nodes":24,"./shapes":26}],26:[function(require,module,exports){
"use strict";

var intersectRect = require("./intersect/intersect-rect"),
    intersectEllipse = require("./intersect/intersect-ellipse"),
    intersectCircle = require("./intersect/intersect-circle"),
    intersectPolygon = require("./intersect/intersect-polygon");

module.exports = {
  rect: rect,
  ellipse: ellipse,
  circle: circle,
  diamond: diamond
};

function rect(parent, bbox, node) {
  var shapeSvg = parent.insert("rect", ":first-child")
        .attr("rx", node.rx)
        .attr("ry", node.ry)
        .attr("x", -bbox.width / 2)
        .attr("y", -bbox.height / 2)
        .attr("width", bbox.width)
        .attr("height", bbox.height);

  node.intersect = function(point) {
    return intersectRect(node, point);
  };

  return shapeSvg;
}

function ellipse(parent, bbox, node) {
  var rx = bbox.width / 2,
      ry = bbox.height / 2,
      shapeSvg = parent.insert("ellipse", ":first-child")
        .attr("x", -bbox.width / 2)
        .attr("y", -bbox.height / 2)
        .attr("rx", rx)
        .attr("ry", ry);

  node.intersect = function(point) {
    return intersectEllipse(node, rx, ry, point);
  };

  return shapeSvg;
}

function circle(parent, bbox, node) {
  var r = Math.max(bbox.width, bbox.height) / 2,
      shapeSvg = parent.insert("circle", ":first-child")
        .attr("x", -bbox.width / 2)
        .attr("y", -bbox.height / 2)
        .attr("r", r);

  node.intersect = function(point) {
    return intersectCircle(node, r, point);
  };

  return shapeSvg;
}

// Circumscribe an ellipse for the bounding box with a diamond shape. I derived
// the function to calculate the diamond shape from:
// http://mathforum.org/kb/message.jspa?messageID=3750236
function diamond(parent, bbox, node) {
  var w = (bbox.width * Math.SQRT2) / 2,
      h = (bbox.height * Math.SQRT2) / 2,
      points = [
        { x:  0, y: -h },
        { x: -w, y:  0 },
        { x:  0, y:  h },
        { x:  w, y:  0 }
      ],
      shapeSvg = parent.insert("polygon", ":first-child")
        .attr("points", points.map(function(p) { return p.x + "," + p.y; }).join(" "));

  node.intersect = function(p) {
    return intersectPolygon(node, points, p);
  };

  return shapeSvg;
}

},{"./intersect/intersect-circle":11,"./intersect/intersect-ellipse":12,"./intersect/intersect-polygon":15,"./intersect/intersect-rect":16}],27:[function(require,module,exports){
var _ = require("./lodash");

// Public utility functions
module.exports = {
  isSubgraph: isSubgraph,
  edgeToId: edgeToId,
  applyStyle: applyStyle,
  applyClass: applyClass,
  applyTransition: applyTransition
};

/*
 * Returns true if the specified node in the graph is a subgraph node. A
 * subgraph node is one that contains other nodes.
 */
function isSubgraph(g, v) {
  return !!g.children(v).length;
}

function edgeToId(e) {
  return escapeId(e.v) + ":" + escapeId(e.w) + ":" + escapeId(e.name);
}

var ID_DELIM = /:/g;
function escapeId(str) {
  return str ? String(str).replace(ID_DELIM, "\\:") : "";
}

function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}

function applyClass(dom, classFn, otherClasses) {
  if (classFn) {
    dom
      .attr("class", classFn)
      .attr("class", otherClasses + " " + dom.attr("class"));
  }
}

function applyTransition(selection, g) {
  var graph = g.graph();

  if (_.isPlainObject(graph)) {
    var transition = graph.transition;
    if (_.isFunction(transition)) {
      return transition(selection);
    }
  }

  return selection;
}

},{"./lodash":21}],28:[function(require,module,exports){
module.exports = "0.4.16";

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hcnJvd3MuanMiLCJsaWIvY3JlYXRlLWNsdXN0ZXJzLmpzIiwibGliL2NyZWF0ZS1lZGdlLWxhYmVscy5qcyIsImxpYi9jcmVhdGUtZWRnZS1wYXRocy5qcyIsImxpYi9jcmVhdGUtbm9kZXMuanMiLCJsaWIvZDMuanMiLCJsaWIvZGFncmUuanMiLCJsaWIvZ3JhcGhsaWIuanMiLCJsaWIvaW50ZXJzZWN0L2luZGV4LmpzIiwibGliL2ludGVyc2VjdC9pbnRlcnNlY3QtY2lyY2xlLmpzIiwibGliL2ludGVyc2VjdC9pbnRlcnNlY3QtZWxsaXBzZS5qcyIsImxpYi9pbnRlcnNlY3QvaW50ZXJzZWN0LWxpbmUuanMiLCJsaWIvaW50ZXJzZWN0L2ludGVyc2VjdC1ub2RlLmpzIiwibGliL2ludGVyc2VjdC9pbnRlcnNlY3QtcG9seWdvbi5qcyIsImxpYi9pbnRlcnNlY3QvaW50ZXJzZWN0LXJlY3QuanMiLCJsaWIvbGFiZWwvYWRkLWh0bWwtbGFiZWwuanMiLCJsaWIvbGFiZWwvYWRkLWxhYmVsLmpzIiwibGliL2xhYmVsL2FkZC1zdmctbGFiZWwuanMiLCJsaWIvbGFiZWwvYWRkLXRleHQtbGFiZWwuanMiLCJsaWIvbG9kYXNoLmpzIiwibGliL3Bvc2l0aW9uLWNsdXN0ZXJzLmpzIiwibGliL3Bvc2l0aW9uLWVkZ2UtbGFiZWxzLmpzIiwibGliL3Bvc2l0aW9uLW5vZGVzLmpzIiwibGliL3JlbmRlci5qcyIsImxpYi9zaGFwZXMuanMiLCJsaWIvdXRpbC5qcyIsImxpYi92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDEzIENocmlzIFBldHRpdHRcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICB7XG4gIGdyYXBobGliOiByZXF1aXJlKFwiLi9saWIvZ3JhcGhsaWJcIiksXG4gIGRhZ3JlOiByZXF1aXJlKFwiLi9saWIvZGFncmVcIiksXG4gIGludGVyc2VjdDogcmVxdWlyZShcIi4vbGliL2ludGVyc2VjdFwiKSxcbiAgcmVuZGVyOiByZXF1aXJlKFwiLi9saWIvcmVuZGVyXCIpLFxuICB1dGlsOiByZXF1aXJlKFwiLi9saWIvdXRpbFwiKSxcbiAgdmVyc2lvbjogcmVxdWlyZShcIi4vbGliL3ZlcnNpb25cIilcbn07XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcImRlZmF1bHRcIjogbm9ybWFsLFxuICBcIm5vcm1hbFwiOiBub3JtYWwsXG4gIFwidmVlXCI6IHZlZSxcbiAgXCJ1bmRpcmVjdGVkXCI6IHVuZGlyZWN0ZWRcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbChwYXJlbnQsIGlkLCBlZGdlLCB0eXBlKSB7XG4gIHZhciBtYXJrZXIgPSBwYXJlbnQuYXBwZW5kKFwibWFya2VyXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBpZClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgXCIwIDAgMTAgMTBcIilcbiAgICAuYXR0cihcInJlZlhcIiwgOSlcbiAgICAuYXR0cihcInJlZllcIiwgNSlcbiAgICAuYXR0cihcIm1hcmtlclVuaXRzXCIsIFwic3Ryb2tlV2lkdGhcIilcbiAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsIDgpXG4gICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiwgNilcbiAgICAuYXR0cihcIm9yaWVudFwiLCBcImF1dG9cIik7XG5cbiAgdmFyIHBhdGggPSBtYXJrZXIuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiZFwiLCBcIk0gMCAwIEwgMTAgNSBMIDAgMTAgelwiKVxuICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKVxuICAgIC5zdHlsZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgXCIxLDBcIik7XG4gIHV0aWwuYXBwbHlTdHlsZShwYXRoLCBlZGdlW3R5cGUgKyBcIlN0eWxlXCJdKTtcbiAgaWYgKGVkZ2VbdHlwZSArIFwiQ2xhc3NcIl0pIHtcbiAgICBwYXRoLmF0dHIoXCJjbGFzc1wiLCBlZGdlW3R5cGUgKyBcIkNsYXNzXCJdKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB2ZWUocGFyZW50LCBpZCwgZWRnZSwgdHlwZSkge1xuICB2YXIgbWFya2VyID0gcGFyZW50LmFwcGVuZChcIm1hcmtlclwiKVxuICAgIC5hdHRyKFwiaWRcIiwgaWQpXG4gICAgLmF0dHIoXCJ2aWV3Qm94XCIsIFwiMCAwIDEwIDEwXCIpXG4gICAgLmF0dHIoXCJyZWZYXCIsIDkpXG4gICAgLmF0dHIoXCJyZWZZXCIsIDUpXG4gICAgLmF0dHIoXCJtYXJrZXJVbml0c1wiLCBcInN0cm9rZVdpZHRoXCIpXG4gICAgLmF0dHIoXCJtYXJrZXJXaWR0aFwiLCA4KVxuICAgIC5hdHRyKFwibWFya2VySGVpZ2h0XCIsIDYpXG4gICAgLmF0dHIoXCJvcmllbnRcIiwgXCJhdXRvXCIpO1xuXG4gIHZhciBwYXRoID0gbWFya2VyLmFwcGVuZChcInBhdGhcIilcbiAgICAuYXR0cihcImRcIiwgXCJNIDAgMCBMIDEwIDUgTCAwIDEwIEwgNCA1IHpcIilcbiAgICAuc3R5bGUoXCJzdHJva2Utd2lkdGhcIiwgMSlcbiAgICAuc3R5bGUoXCJzdHJva2UtZGFzaGFycmF5XCIsIFwiMSwwXCIpO1xuICB1dGlsLmFwcGx5U3R5bGUocGF0aCwgZWRnZVt0eXBlICsgXCJTdHlsZVwiXSk7XG4gIGlmIChlZGdlW3R5cGUgKyBcIkNsYXNzXCJdKSB7XG4gICAgcGF0aC5hdHRyKFwiY2xhc3NcIiwgZWRnZVt0eXBlICsgXCJDbGFzc1wiXSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5kaXJlY3RlZChwYXJlbnQsIGlkLCBlZGdlLCB0eXBlKSB7XG4gIHZhciBtYXJrZXIgPSBwYXJlbnQuYXBwZW5kKFwibWFya2VyXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBpZClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgXCIwIDAgMTAgMTBcIilcbiAgICAuYXR0cihcInJlZlhcIiwgOSlcbiAgICAuYXR0cihcInJlZllcIiwgNSlcbiAgICAuYXR0cihcIm1hcmtlclVuaXRzXCIsIFwic3Ryb2tlV2lkdGhcIilcbiAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsIDgpXG4gICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiwgNilcbiAgICAuYXR0cihcIm9yaWVudFwiLCBcImF1dG9cIik7XG5cbiAgdmFyIHBhdGggPSBtYXJrZXIuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiZFwiLCBcIk0gMCA1IEwgMTAgNVwiKVxuICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKVxuICAgIC5zdHlsZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgXCIxLDBcIik7XG4gIHV0aWwuYXBwbHlTdHlsZShwYXRoLCBlZGdlW3R5cGUgKyBcIlN0eWxlXCJdKTtcbiAgaWYgKGVkZ2VbdHlwZSArIFwiQ2xhc3NcIl0pIHtcbiAgICBwYXRoLmF0dHIoXCJjbGFzc1wiLCBlZGdlW3R5cGUgKyBcIkNsYXNzXCJdKTtcbiAgfVxufVxuIiwidmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGFkZExhYmVsID0gcmVxdWlyZShcIi4vbGFiZWwvYWRkLWxhYmVsXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNsdXN0ZXJzO1xuXG5mdW5jdGlvbiBjcmVhdGVDbHVzdGVycyhzZWxlY3Rpb24sIGcpIHtcbiAgdmFyIGNsdXN0ZXJzID0gZy5ub2RlcygpLmZpbHRlcihmdW5jdGlvbih2KSB7IHJldHVybiB1dGlsLmlzU3ViZ3JhcGgoZywgdik7IH0pLFxuICAgICAgc3ZnQ2x1c3RlcnMgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKFwiZy5jbHVzdGVyXCIpXG4gICAgICAgIC5kYXRhKGNsdXN0ZXJzLCBmdW5jdGlvbih2KSB7IHJldHVybiB2OyB9KTtcblxuICBzdmdDbHVzdGVycy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICBzdmdDbHVzdGVycy5lbnRlcigpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJjbHVzdGVyXCIpXG4gICAgICAuYXR0cihcImlkXCIsZnVuY3Rpb24odil7XG4gICAgICAgICAgdmFyIG5vZGUgPSBnLm5vZGUodik7XG4gICAgICAgICAgcmV0dXJuIG5vZGUuaWQ7XG4gICAgICB9KVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzdmdDbHVzdGVycywgZylcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuXG4gIHN2Z0NsdXN0ZXJzLmVhY2goZnVuY3Rpb24odikge1xuICAgIHZhciBub2RlID0gZy5ub2RlKHYpLFxuICAgICAgICB0aGlzR3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZChcInJlY3RcIik7XG4gICAgdmFyIGxhYmVsR3JvdXAgPSB0aGlzR3JvdXAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKTtcbiAgICBhZGRMYWJlbChsYWJlbEdyb3VwLCBub2RlLCBub2RlLmNsdXN0ZXJMYWJlbFBvcyk7XG4gIH0pO1xuXG4gIHN2Z0NsdXN0ZXJzLnNlbGVjdEFsbChcInJlY3RcIikuZWFjaChmdW5jdGlvbihjKSB7XG4gICAgdmFyIG5vZGUgPSBnLm5vZGUoYyk7XG4gICAgdmFyIGRvbUNsdXN0ZXIgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgdXRpbC5hcHBseVN0eWxlKGRvbUNsdXN0ZXIsIG5vZGUuc3R5bGUpO1xuICB9KTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzdmdDbHVzdGVycy5leGl0KCksIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgIC5yZW1vdmUoKTtcblxuICByZXR1cm4gc3ZnQ2x1c3RlcnM7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF8gPSByZXF1aXJlKFwiLi9sb2Rhc2hcIiksXG4gICAgYWRkTGFiZWwgPSByZXF1aXJlKFwiLi9sYWJlbC9hZGQtbGFiZWxcIiksXG4gICAgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIiksXG4gICAgZDMgPSByZXF1aXJlKFwiLi9kM1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVFZGdlTGFiZWxzO1xuXG5mdW5jdGlvbiBjcmVhdGVFZGdlTGFiZWxzKHNlbGVjdGlvbiwgZykge1xuICB2YXIgc3ZnRWRnZUxhYmVscyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoXCJnLmVkZ2VMYWJlbFwiKVxuICAgIC5kYXRhKGcuZWRnZXMoKSwgZnVuY3Rpb24oZSkgeyByZXR1cm4gdXRpbC5lZGdlVG9JZChlKTsgfSlcbiAgICAuY2xhc3NlZChcInVwZGF0ZVwiLCB0cnVlKTtcblxuICBzdmdFZGdlTGFiZWxzLnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gIHN2Z0VkZ2VMYWJlbHMuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuY2xhc3NlZChcImVkZ2VMYWJlbFwiLCB0cnVlKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgc3ZnRWRnZUxhYmVscy5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWRnZSA9IGcuZWRnZShlKSxcbiAgICAgICAgbGFiZWwgPSBhZGRMYWJlbChkMy5zZWxlY3QodGhpcyksIGcuZWRnZShlKSwgMCwgMCkuY2xhc3NlZChcImxhYmVsXCIsIHRydWUpLFxuICAgICAgICBiYm94ID0gbGFiZWwubm9kZSgpLmdldEJCb3goKTtcblxuICAgIGlmIChlZGdlLmxhYmVsSWQpIHsgbGFiZWwuYXR0cihcImlkXCIsIGVkZ2UubGFiZWxJZCk7IH1cbiAgICBpZiAoIV8uaGFzKGVkZ2UsIFwid2lkdGhcIikpIHsgZWRnZS53aWR0aCA9IGJib3gud2lkdGg7IH1cbiAgICBpZiAoIV8uaGFzKGVkZ2UsIFwiaGVpZ2h0XCIpKSB7IGVkZ2UuaGVpZ2h0ID0gYmJveC5oZWlnaHQ7IH1cbiAgfSk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnRWRnZUxhYmVscy5leGl0KCksIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgIC5yZW1vdmUoKTtcblxuICByZXR1cm4gc3ZnRWRnZUxhYmVscztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuL2xvZGFzaFwiKSxcbiAgICBpbnRlcnNlY3ROb2RlID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0L2ludGVyc2VjdC1ub2RlXCIpLFxuICAgIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGQzID0gcmVxdWlyZShcIi4vZDNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVkZ2VQYXRocztcblxuZnVuY3Rpb24gY3JlYXRlRWRnZVBhdGhzKHNlbGVjdGlvbiwgZywgYXJyb3dzKSB7XG4gIHZhciBzdmdQYXRocyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoXCJnLmVkZ2VQYXRoXCIpXG4gICAgLmRhdGEoZy5lZGdlcygpLCBmdW5jdGlvbihlKSB7IHJldHVybiB1dGlsLmVkZ2VUb0lkKGUpOyB9KVxuICAgIC5jbGFzc2VkKFwidXBkYXRlXCIsIHRydWUpO1xuXG4gIGVudGVyKHN2Z1BhdGhzLCBnKTtcbiAgZXhpdChzdmdQYXRocywgZyk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnUGF0aHMsIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcblxuICAvLyBTYXZlIERPTSBlbGVtZW50IGluIHRoZSBwYXRoIGdyb3VwLCBhbmQgc2V0IElEIGFuZCBjbGFzc1xuICBzdmdQYXRocy5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZG9tRWRnZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICB2YXIgZWRnZSA9IGcuZWRnZShlKTtcbiAgICBlZGdlLmVsZW0gPSB0aGlzO1xuXG4gICAgaWYgKGVkZ2UuaWQpIHtcbiAgICAgIGRvbUVkZ2UuYXR0cihcImlkXCIsIGVkZ2UuaWQpO1xuICAgIH1cblxuICAgIHV0aWwuYXBwbHlDbGFzcyhkb21FZGdlLCBlZGdlW1wiY2xhc3NcIl0sXG4gICAgICAoZG9tRWRnZS5jbGFzc2VkKFwidXBkYXRlXCIpID8gXCJ1cGRhdGUgXCIgOiBcIlwiKSArIFwiZWRnZVBhdGhcIik7XG4gIH0pO1xuXG4gIHN2Z1BhdGhzLnNlbGVjdEFsbChcInBhdGgucGF0aFwiKVxuICAgIC5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlZGdlID0gZy5lZGdlKGUpO1xuICAgICAgZWRnZS5hcnJvd2hlYWRJZCA9IF8udW5pcXVlSWQoXCJhcnJvd2hlYWRcIik7XG5cbiAgICAgIHZhciBkb21FZGdlID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBcInVybChcIiArIGxvY2F0aW9uLmhyZWYgKyBcIiNcIiArIGVkZ2UuYXJyb3doZWFkSWQgKyBcIilcIjtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG5cbiAgICAgIHV0aWwuYXBwbHlUcmFuc2l0aW9uKGRvbUVkZ2UsIGcpXG4gICAgICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbihlKSB7IHJldHVybiBjYWxjUG9pbnRzKGcsIGUpOyB9KTtcblxuICAgICAgdXRpbC5hcHBseVN0eWxlKGRvbUVkZ2UsIGVkZ2Uuc3R5bGUpO1xuICAgIH0pO1xuXG4gIHN2Z1BhdGhzLnNlbGVjdEFsbChcImRlZnMgKlwiKS5yZW1vdmUoKTtcbiAgc3ZnUGF0aHMuc2VsZWN0QWxsKFwiZGVmc1wiKVxuICAgIC5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlZGdlID0gZy5lZGdlKGUpLFxuICAgICAgICAgIGFycm93aGVhZCA9IGFycm93c1tlZGdlLmFycm93aGVhZF07XG4gICAgICBhcnJvd2hlYWQoZDMuc2VsZWN0KHRoaXMpLCBlZGdlLmFycm93aGVhZElkLCBlZGdlLCBcImFycm93aGVhZFwiKTtcbiAgICB9KTtcblxuICByZXR1cm4gc3ZnUGF0aHM7XG59XG5cbmZ1bmN0aW9uIGNhbGNQb2ludHMoZywgZSkge1xuICB2YXIgZWRnZSA9IGcuZWRnZShlKSxcbiAgICAgIHRhaWwgPSBnLm5vZGUoZS52KSxcbiAgICAgIGhlYWQgPSBnLm5vZGUoZS53KSxcbiAgICAgIHBvaW50cyA9IGVkZ2UucG9pbnRzLnNsaWNlKDEsIGVkZ2UucG9pbnRzLmxlbmd0aCAtIDEpO1xuICBwb2ludHMudW5zaGlmdChpbnRlcnNlY3ROb2RlKHRhaWwsIHBvaW50c1swXSkpO1xuICBwb2ludHMucHVzaChpbnRlcnNlY3ROb2RlKGhlYWQsIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pKTtcblxuICByZXR1cm4gY3JlYXRlTGluZShlZGdlLCBwb2ludHMpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5lKGVkZ2UsIHBvaW50cykge1xuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbihkKSB7IHJldHVybiBkLng7IH0pXG4gICAgLnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55OyB9KTtcblxuICBpZiAoXy5oYXMoZWRnZSwgXCJsaW5lSW50ZXJwb2xhdGVcIikpIHtcbiAgICBsaW5lLmludGVycG9sYXRlKGVkZ2UubGluZUludGVycG9sYXRlKTtcbiAgfVxuXG4gIGlmIChfLmhhcyhlZGdlLCBcImxpbmVUZW5zaW9uXCIpKSB7XG4gICAgbGluZS50ZW5zaW9uKE51bWJlcihlZGdlLmxpbmVUZW5zaW9uKSk7XG4gIH1cblxuICByZXR1cm4gbGluZShwb2ludHMpO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYmJveCA9IGVsZW0uZ2V0QkJveCgpLFxuICAgICAgbWF0cml4ID0gZWxlbS5vd25lclNWR0VsZW1lbnQuZ2V0U2NyZWVuQ1RNKClcbiAgICAgICAgLmludmVyc2UoKVxuICAgICAgICAubXVsdGlwbHkoZWxlbS5nZXRTY3JlZW5DVE0oKSlcbiAgICAgICAgLnRyYW5zbGF0ZShiYm94LndpZHRoIC8gMiwgYmJveC5oZWlnaHQgLyAyKTtcbiAgcmV0dXJuIHsgeDogbWF0cml4LmUsIHk6IG1hdHJpeC5mIH07XG59XG5cbmZ1bmN0aW9uIGVudGVyKHN2Z1BhdGhzLCBnKSB7XG4gIHZhciBzdmdQYXRoc0VudGVyID0gc3ZnUGF0aHMuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiZWRnZVBhdGhcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gIHN2Z1BhdGhzRW50ZXIuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlZGdlID0gZy5lZGdlKGUpLFxuICAgICAgICAgIHNvdXJjZUVsZW0gPSBnLm5vZGUoZS52KS5lbGVtLFxuICAgICAgICAgIHBvaW50cyA9IF8ucmFuZ2UoZWRnZS5wb2ludHMubGVuZ3RoKS5tYXAoZnVuY3Rpb24oKSB7IHJldHVybiBnZXRDb29yZHMoc291cmNlRWxlbSk7IH0pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUxpbmUoZWRnZSwgcG9pbnRzKTtcbiAgICB9KTtcbiAgc3ZnUGF0aHNFbnRlci5hcHBlbmQoXCJkZWZzXCIpO1xufVxuXG5mdW5jdGlvbiBleGl0KHN2Z1BhdGhzLCBnKSB7XG4gIHZhciBzdmdQYXRoRXhpdCA9IHN2Z1BhdGhzLmV4aXQoKTtcbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnUGF0aEV4aXQsIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgIC5yZW1vdmUoKTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzdmdQYXRoRXhpdC5zZWxlY3QoXCJwYXRoLnBhdGhcIiksIGcpXG4gICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBnLm5vZGUoZS52KTtcblxuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICB2YXIgcG9pbnRzID0gXy5yYW5nZSh0aGlzLmdldFRvdGFsTGVuZ3RoKCkpLm1hcChmdW5jdGlvbigpIHsgcmV0dXJuIHNvdXJjZTsgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGVMaW5lKHt9LCBwb2ludHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGQzLnNlbGVjdCh0aGlzKS5hdHRyKFwiZFwiKTtcbiAgICAgIH1cbiAgICB9KTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuL2xvZGFzaFwiKSxcbiAgICBhZGRMYWJlbCA9IHJlcXVpcmUoXCIuL2xhYmVsL2FkZC1sYWJlbFwiKSxcbiAgICB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKSxcbiAgICBkMyA9IHJlcXVpcmUoXCIuL2QzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZU5vZGVzO1xuXG5mdW5jdGlvbiBjcmVhdGVOb2RlcyhzZWxlY3Rpb24sIGcsIHNoYXBlcykge1xuICB2YXIgc2ltcGxlTm9kZXMgPSBnLm5vZGVzKCkuZmlsdGVyKGZ1bmN0aW9uKHYpIHsgcmV0dXJuICF1dGlsLmlzU3ViZ3JhcGgoZywgdik7IH0pO1xuICB2YXIgc3ZnTm9kZXMgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKFwiZy5ub2RlXCIpXG4gICAgLmRhdGEoc2ltcGxlTm9kZXMsIGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHY7IH0pXG4gICAgLmNsYXNzZWQoXCJ1cGRhdGVcIiwgdHJ1ZSk7XG5cbiAgc3ZnTm9kZXMuc2VsZWN0QWxsKFwiKlwiKS5yZW1vdmUoKTtcbiAgc3ZnTm9kZXMuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwibm9kZVwiKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgc3ZnTm9kZXMuZWFjaChmdW5jdGlvbih2KSB7XG4gICAgdmFyIG5vZGUgPSBnLm5vZGUodiksXG4gICAgICAgIHRoaXNHcm91cCA9IGQzLnNlbGVjdCh0aGlzKSxcbiAgICAgICAgbGFiZWxHcm91cCA9IHRoaXNHcm91cC5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBcImxhYmVsXCIpLFxuICAgICAgICBsYWJlbERvbSA9IGFkZExhYmVsKGxhYmVsR3JvdXAsIG5vZGUpLFxuICAgICAgICBzaGFwZSA9IHNoYXBlc1tub2RlLnNoYXBlXSxcbiAgICAgICAgYmJveCA9IF8ucGljayhsYWJlbERvbS5ub2RlKCkuZ2V0QkJveCgpLCBcIndpZHRoXCIsIFwiaGVpZ2h0XCIpO1xuXG4gICAgbm9kZS5lbGVtID0gdGhpcztcblxuICAgIGlmIChub2RlLmlkKSB7IHRoaXNHcm91cC5hdHRyKFwiaWRcIiwgbm9kZS5pZCk7IH1cbiAgICBpZiAobm9kZS5sYWJlbElkKSB7IGxhYmVsR3JvdXAuYXR0cihcImlkXCIsIG5vZGUubGFiZWxJZCk7IH1cbiAgICB1dGlsLmFwcGx5Q2xhc3ModGhpc0dyb3VwLCBub2RlW1wiY2xhc3NcIl0sXG4gICAgICAodGhpc0dyb3VwLmNsYXNzZWQoXCJ1cGRhdGVcIikgPyBcInVwZGF0ZSBcIiA6IFwiXCIpICsgXCJub2RlXCIpO1xuXG4gICAgaWYgKF8uaGFzKG5vZGUsIFwid2lkdGhcIikpIHsgYmJveC53aWR0aCA9IG5vZGUud2lkdGg7IH1cbiAgICBpZiAoXy5oYXMobm9kZSwgXCJoZWlnaHRcIikpIHsgYmJveC5oZWlnaHQgPSBub2RlLmhlaWdodDsgfVxuXG4gICAgYmJveC53aWR0aCArPSBub2RlLnBhZGRpbmdMZWZ0ICsgbm9kZS5wYWRkaW5nUmlnaHQ7XG4gICAgYmJveC5oZWlnaHQgKz0gbm9kZS5wYWRkaW5nVG9wICsgbm9kZS5wYWRkaW5nQm90dG9tO1xuICAgIGxhYmVsR3JvdXAuYXR0cihcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZShcIiArXG4gICAgICAoKG5vZGUucGFkZGluZ0xlZnQgLSBub2RlLnBhZGRpbmdSaWdodCkgLyAyKSArIFwiLFwiICtcbiAgICAgICgobm9kZS5wYWRkaW5nVG9wIC0gbm9kZS5wYWRkaW5nQm90dG9tKSAvIDIpICsgXCIpXCIpO1xuXG4gICAgdmFyIHNoYXBlU3ZnID0gc2hhcGUoZDMuc2VsZWN0KHRoaXMpLCBiYm94LCBub2RlKTtcbiAgICB1dGlsLmFwcGx5U3R5bGUoc2hhcGVTdmcsIG5vZGUuc3R5bGUpO1xuXG4gICAgdmFyIHNoYXBlQkJveCA9IHNoYXBlU3ZnLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgbm9kZS53aWR0aCA9IHNoYXBlQkJveC53aWR0aDtcbiAgICBub2RlLmhlaWdodCA9IHNoYXBlQkJveC5oZWlnaHQ7XG4gIH0pO1xuXG4gIHV0aWwuYXBwbHlUcmFuc2l0aW9uKHN2Z05vZGVzLmV4aXQoKSwgZylcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApXG4gICAgLnJlbW92ZSgpO1xuXG4gIHJldHVybiBzdmdOb2Rlcztcbn1cbiIsIi8vIFN0dWIgdG8gZ2V0IEQzIGVpdGhlciB2aWEgTlBNIG9yIGZyb20gdGhlIGdsb2JhbCBvYmplY3Rcbm1vZHVsZS5leHBvcnRzID0gd2luZG93LmQzO1xuIiwiLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG52YXIgZGFncmU7XG5cbmlmIChyZXF1aXJlKSB7XG4gIHRyeSB7XG4gICAgZGFncmUgPSByZXF1aXJlKFwiZGFncmVcIik7XG4gIH0gY2F0Y2ggKGUpIHt9XG59XG5cbmlmICghZGFncmUpIHtcbiAgZGFncmUgPSB3aW5kb3cuZGFncmU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGFncmU7XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5cbnZhciBncmFwaGxpYjtcblxuaWYgKHJlcXVpcmUpIHtcbiAgdHJ5IHtcbiAgICBncmFwaGxpYiA9IHJlcXVpcmUoXCJncmFwaGxpYlwiKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuaWYgKCFncmFwaGxpYikge1xuICBncmFwaGxpYiA9IHdpbmRvdy5ncmFwaGxpYjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBncmFwaGxpYjtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBub2RlOiByZXF1aXJlKFwiLi9pbnRlcnNlY3Qtbm9kZVwiKSxcbiAgY2lyY2xlOiByZXF1aXJlKFwiLi9pbnRlcnNlY3QtY2lyY2xlXCIpLFxuICBlbGxpcHNlOiByZXF1aXJlKFwiLi9pbnRlcnNlY3QtZWxsaXBzZVwiKSxcbiAgcG9seWdvbjogcmVxdWlyZShcIi4vaW50ZXJzZWN0LXBvbHlnb25cIiksXG4gIHJlY3Q6IHJlcXVpcmUoXCIuL2ludGVyc2VjdC1yZWN0XCIpXG59O1xuIiwidmFyIGludGVyc2VjdEVsbGlwc2UgPSByZXF1aXJlKFwiLi9pbnRlcnNlY3QtZWxsaXBzZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RDaXJjbGU7XG5cbmZ1bmN0aW9uIGludGVyc2VjdENpcmNsZShub2RlLCByeCwgcG9pbnQpIHtcbiAgcmV0dXJuIGludGVyc2VjdEVsbGlwc2Uobm9kZSwgcngsIHJ4LCBwb2ludCk7XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdEVsbGlwc2U7XG5cbmZ1bmN0aW9uIGludGVyc2VjdEVsbGlwc2Uobm9kZSwgcngsIHJ5LCBwb2ludCkge1xuICAvLyBGb3JtdWxhZSBmcm9tOiBodHRwOi8vbWF0aHdvcmxkLndvbGZyYW0uY29tL0VsbGlwc2UtTGluZUludGVyc2VjdGlvbi5odG1sXG5cbiAgdmFyIGN4ID0gbm9kZS54O1xuICB2YXIgY3kgPSBub2RlLnk7XG5cbiAgdmFyIHB4ID0gY3ggLSBwb2ludC54O1xuICB2YXIgcHkgPSBjeSAtIHBvaW50Lnk7XG5cbiAgdmFyIGRldCA9IE1hdGguc3FydChyeCAqIHJ4ICogcHkgKiBweSArIHJ5ICogcnkgKiBweCAqIHB4KTtcblxuICB2YXIgZHggPSBNYXRoLmFicyhyeCAqIHJ5ICogcHggLyBkZXQpO1xuICBpZiAocG9pbnQueCA8IGN4KSB7XG4gICAgZHggPSAtZHg7XG4gIH1cbiAgdmFyIGR5ID0gTWF0aC5hYnMocnggKiByeSAqIHB5IC8gZGV0KTtcbiAgaWYgKHBvaW50LnkgPCBjeSkge1xuICAgIGR5ID0gLWR5O1xuICB9XG5cbiAgcmV0dXJuIHt4OiBjeCArIGR4LCB5OiBjeSArIGR5fTtcbn1cblxuIiwibW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RMaW5lO1xuXG4vKlxuICogUmV0dXJucyB0aGUgcG9pbnQgYXQgd2hpY2ggdHdvIGxpbmVzLCBwIGFuZCBxLCBpbnRlcnNlY3Qgb3IgcmV0dXJuc1xuICogdW5kZWZpbmVkIGlmIHRoZXkgZG8gbm90IGludGVyc2VjdC5cbiAqL1xuZnVuY3Rpb24gaW50ZXJzZWN0TGluZShwMSwgcDIsIHExLCBxMikge1xuICAvLyBBbGdvcml0aG0gZnJvbSBKLiBBdnJvLCAoZWQuKSBHcmFwaGljcyBHZW1zLCBObyAyLCBNb3JnYW4gS2F1Zm1hbm4sIDE5OTQsXG4gIC8vIHA3IGFuZCBwNDczLlxuXG4gIHZhciBhMSwgYTIsIGIxLCBiMiwgYzEsIGMyO1xuICB2YXIgcjEsIHIyICwgcjMsIHI0O1xuICB2YXIgZGVub20sIG9mZnNldCwgbnVtO1xuICB2YXIgeCwgeTtcblxuICAvLyBDb21wdXRlIGExLCBiMSwgYzEsIHdoZXJlIGxpbmUgam9pbmluZyBwb2ludHMgMSBhbmQgMiBpcyBGKHgseSkgPSBhMSB4ICtcbiAgLy8gYjEgeSArIGMxID0gMC5cbiAgYTEgPSBwMi55IC0gcDEueTtcbiAgYjEgPSBwMS54IC0gcDIueDtcbiAgYzEgPSAocDIueCAqIHAxLnkpIC0gKHAxLnggKiBwMi55KTtcblxuICAvLyBDb21wdXRlIHIzIGFuZCByNC5cbiAgcjMgPSAoKGExICogcTEueCkgKyAoYjEgKiBxMS55KSArIGMxKTtcbiAgcjQgPSAoKGExICogcTIueCkgKyAoYjEgKiBxMi55KSArIGMxKTtcblxuICAvLyBDaGVjayBzaWducyBvZiByMyBhbmQgcjQuIElmIGJvdGggcG9pbnQgMyBhbmQgcG9pbnQgNCBsaWUgb25cbiAgLy8gc2FtZSBzaWRlIG9mIGxpbmUgMSwgdGhlIGxpbmUgc2VnbWVudHMgZG8gbm90IGludGVyc2VjdC5cbiAgaWYgKChyMyAhPT0gMCkgJiYgKHI0ICE9PSAwKSAmJiBzYW1lU2lnbihyMywgcjQpKSB7XG4gICAgcmV0dXJuIC8qRE9OVF9JTlRFUlNFQ1QqLztcbiAgfVxuXG4gIC8vIENvbXB1dGUgYTIsIGIyLCBjMiB3aGVyZSBsaW5lIGpvaW5pbmcgcG9pbnRzIDMgYW5kIDQgaXMgRyh4LHkpID0gYTIgeCArIGIyIHkgKyBjMiA9IDBcbiAgYTIgPSBxMi55IC0gcTEueTtcbiAgYjIgPSBxMS54IC0gcTIueDtcbiAgYzIgPSAocTIueCAqIHExLnkpIC0gKHExLnggKiBxMi55KTtcblxuICAvLyBDb21wdXRlIHIxIGFuZCByMlxuICByMSA9IChhMiAqIHAxLngpICsgKGIyICogcDEueSkgKyBjMjtcbiAgcjIgPSAoYTIgKiBwMi54KSArIChiMiAqIHAyLnkpICsgYzI7XG5cbiAgLy8gQ2hlY2sgc2lnbnMgb2YgcjEgYW5kIHIyLiBJZiBib3RoIHBvaW50IDEgYW5kIHBvaW50IDIgbGllXG4gIC8vIG9uIHNhbWUgc2lkZSBvZiBzZWNvbmQgbGluZSBzZWdtZW50LCB0aGUgbGluZSBzZWdtZW50cyBkb1xuICAvLyBub3QgaW50ZXJzZWN0LlxuICBpZiAoKHIxICE9PSAwKSAmJiAocjIgIT09IDApICYmIChzYW1lU2lnbihyMSwgcjIpKSkge1xuICAgIHJldHVybiAvKkRPTlRfSU5URVJTRUNUKi87XG4gIH1cblxuICAvLyBMaW5lIHNlZ21lbnRzIGludGVyc2VjdDogY29tcHV0ZSBpbnRlcnNlY3Rpb24gcG9pbnQuXG4gIGRlbm9tID0gKGExICogYjIpIC0gKGEyICogYjEpO1xuICBpZiAoZGVub20gPT09IDApIHtcbiAgICByZXR1cm4gLypDT0xMSU5FQVIqLztcbiAgfVxuXG4gIG9mZnNldCA9IE1hdGguYWJzKGRlbm9tIC8gMik7XG5cbiAgLy8gVGhlIGRlbm9tLzIgaXMgdG8gZ2V0IHJvdW5kaW5nIGluc3RlYWQgb2YgdHJ1bmNhdGluZy4gSXRcbiAgLy8gaXMgYWRkZWQgb3Igc3VidHJhY3RlZCB0byB0aGUgbnVtZXJhdG9yLCBkZXBlbmRpbmcgdXBvbiB0aGVcbiAgLy8gc2lnbiBvZiB0aGUgbnVtZXJhdG9yLlxuICBudW0gPSAoYjEgKiBjMikgLSAoYjIgKiBjMSk7XG4gIHggPSAobnVtIDwgMCkgPyAoKG51bSAtIG9mZnNldCkgLyBkZW5vbSkgOiAoKG51bSArIG9mZnNldCkgLyBkZW5vbSk7XG5cbiAgbnVtID0gKGEyICogYzEpIC0gKGExICogYzIpO1xuICB5ID0gKG51bSA8IDApID8gKChudW0gLSBvZmZzZXQpIC8gZGVub20pIDogKChudW0gKyBvZmZzZXQpIC8gZGVub20pO1xuXG4gIHJldHVybiB7IHg6IHgsIHk6IHkgfTtcbn1cblxuZnVuY3Rpb24gc2FtZVNpZ24ocjEsIHIyKSB7XG4gIHJldHVybiByMSAqIHIyID4gMDtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0Tm9kZTtcblxuZnVuY3Rpb24gaW50ZXJzZWN0Tm9kZShub2RlLCBwb2ludCkge1xuICByZXR1cm4gbm9kZS5pbnRlcnNlY3QocG9pbnQpO1xufVxuIiwidmFyIGludGVyc2VjdExpbmUgPSByZXF1aXJlKFwiLi9pbnRlcnNlY3QtbGluZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RQb2x5Z29uO1xuXG4vKlxuICogUmV0dXJucyB0aGUgcG9pbnQgKHt4LCB5fSkgYXQgd2hpY2ggdGhlIHBvaW50IGFyZ3VtZW50IGludGVyc2VjdHMgd2l0aCB0aGVcbiAqIG5vZGUgYXJndW1lbnQgYXNzdW1pbmcgdGhhdCBpdCBoYXMgdGhlIHNoYXBlIHNwZWNpZmllZCBieSBwb2x5Z29uLlxuICovXG5mdW5jdGlvbiBpbnRlcnNlY3RQb2x5Z29uKG5vZGUsIHBvbHlQb2ludHMsIHBvaW50KSB7XG4gIHZhciB4MSA9IG5vZGUueDtcbiAgdmFyIHkxID0gbm9kZS55O1xuXG4gIHZhciBpbnRlcnNlY3Rpb25zID0gW107XG5cbiAgdmFyIG1pblggPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFksXG4gICAgICBtaW5ZID0gTnVtYmVyLlBPU0lUSVZFX0lORklOSVRZO1xuICBwb2x5UG9pbnRzLmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICBtaW5YID0gTWF0aC5taW4obWluWCwgZW50cnkueCk7XG4gICAgbWluWSA9IE1hdGgubWluKG1pblksIGVudHJ5LnkpO1xuICB9KTtcblxuICB2YXIgbGVmdCA9IHgxIC0gbm9kZS53aWR0aCAvIDIgLSBtaW5YO1xuICB2YXIgdG9wID0gIHkxIC0gbm9kZS5oZWlnaHQgLyAyIC0gbWluWTtcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHBvbHlQb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgcDEgPSBwb2x5UG9pbnRzW2ldO1xuICAgIHZhciBwMiA9IHBvbHlQb2ludHNbaSA8IHBvbHlQb2ludHMubGVuZ3RoIC0gMSA/IGkgKyAxIDogMF07XG4gICAgdmFyIGludGVyc2VjdCA9IGludGVyc2VjdExpbmUobm9kZSwgcG9pbnQsXG4gICAgICB7eDogbGVmdCArIHAxLngsIHk6IHRvcCArIHAxLnl9LCB7eDogbGVmdCArIHAyLngsIHk6IHRvcCArIHAyLnl9KTtcbiAgICBpZiAoaW50ZXJzZWN0KSB7XG4gICAgICBpbnRlcnNlY3Rpb25zLnB1c2goaW50ZXJzZWN0KTtcbiAgICB9XG4gIH1cblxuICBpZiAoIWludGVyc2VjdGlvbnMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5sb2coXCJOTyBJTlRFUlNFQ1RJT04gRk9VTkQsIFJFVFVSTiBOT0RFIENFTlRFUlwiLCBub2RlKTtcbiAgICByZXR1cm4gbm9kZTtcbiAgfVxuXG4gIGlmIChpbnRlcnNlY3Rpb25zLmxlbmd0aCA+IDEpIHtcbiAgICAvLyBNb3JlIGludGVyc2VjdGlvbnMsIGZpbmQgdGhlIG9uZSBuZWFyZXN0IHRvIGVkZ2UgZW5kIHBvaW50XG4gICAgaW50ZXJzZWN0aW9ucy5zb3J0KGZ1bmN0aW9uKHAsIHEpIHtcbiAgICAgIHZhciBwZHggPSBwLnggLSBwb2ludC54LFxuICAgICAgICAgIHBkeSA9IHAueSAtIHBvaW50LnksXG4gICAgICAgICAgZGlzdHAgPSBNYXRoLnNxcnQocGR4ICogcGR4ICsgcGR5ICogcGR5KSxcblxuICAgICAgICAgIHFkeCA9IHEueCAtIHBvaW50LngsXG4gICAgICAgICAgcWR5ID0gcS55IC0gcG9pbnQueSxcbiAgICAgICAgICBkaXN0cSA9IE1hdGguc3FydChxZHggKiBxZHggKyBxZHkgKiBxZHkpO1xuXG4gICAgICByZXR1cm4gKGRpc3RwIDwgZGlzdHEpID8gLTEgOiAoZGlzdHAgPT09IGRpc3RxID8gMCA6IDEpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBpbnRlcnNlY3Rpb25zWzBdO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3RSZWN0O1xuXG5mdW5jdGlvbiBpbnRlcnNlY3RSZWN0KG5vZGUsIHBvaW50KSB7XG4gIHZhciB4ID0gbm9kZS54O1xuICB2YXIgeSA9IG5vZGUueTtcblxuICAvLyBSZWN0YW5nbGUgaW50ZXJzZWN0aW9uIGFsZ29yaXRobSBmcm9tOlxuICAvLyBodHRwOi8vbWF0aC5zdGFja2V4Y2hhbmdlLmNvbS9xdWVzdGlvbnMvMTA4MTEzL2ZpbmQtZWRnZS1iZXR3ZWVuLXR3by1ib3hlc1xuICB2YXIgZHggPSBwb2ludC54IC0geDtcbiAgdmFyIGR5ID0gcG9pbnQueSAtIHk7XG4gIHZhciB3ID0gbm9kZS53aWR0aCAvIDI7XG4gIHZhciBoID0gbm9kZS5oZWlnaHQgLyAyO1xuXG4gIHZhciBzeCwgc3k7XG4gIGlmIChNYXRoLmFicyhkeSkgKiB3ID4gTWF0aC5hYnMoZHgpICogaCkge1xuICAgIC8vIEludGVyc2VjdGlvbiBpcyB0b3Agb3IgYm90dG9tIG9mIHJlY3QuXG4gICAgaWYgKGR5IDwgMCkge1xuICAgICAgaCA9IC1oO1xuICAgIH1cbiAgICBzeCA9IGR5ID09PSAwID8gMCA6IGggKiBkeCAvIGR5O1xuICAgIHN5ID0gaDtcbiAgfSBlbHNlIHtcbiAgICAvLyBJbnRlcnNlY3Rpb24gaXMgbGVmdCBvciByaWdodCBvZiByZWN0LlxuICAgIGlmIChkeCA8IDApIHtcbiAgICAgIHcgPSAtdztcbiAgICB9XG4gICAgc3ggPSB3O1xuICAgIHN5ID0gZHggPT09IDAgPyAwIDogdyAqIGR5IC8gZHg7XG4gIH1cblxuICByZXR1cm4ge3g6IHggKyBzeCwgeTogeSArIHN5fTtcbn1cbiIsInZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkSHRtbExhYmVsO1xuXG5mdW5jdGlvbiBhZGRIdG1sTGFiZWwocm9vdCwgbm9kZSkge1xuICB2YXIgZm8gPSByb290XG4gICAgLmFwcGVuZChcImZvcmVpZ25PYmplY3RcIilcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgXCIxMDAwMDBcIik7XG5cbiAgdmFyIGRpdiA9IGZvXG4gICAgLmFwcGVuZChcInhodG1sOmRpdlwiKTtcbiAgZGl2LmF0dHIoXCJ4bWxuc1wiLCBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIik7XG5cbiAgdmFyIGxhYmVsID0gbm9kZS5sYWJlbDtcbiAgc3dpdGNoKHR5cGVvZiBsYWJlbCkge1xuICAgIGNhc2UgXCJmdW5jdGlvblwiOlxuICAgICAgZGl2Lmluc2VydChsYWJlbCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICAvLyBDdXJyZW50bHkgd2UgYXNzdW1lIHRoaXMgaXMgYSBET00gb2JqZWN0LlxuICAgICAgZGl2Lmluc2VydChmdW5jdGlvbigpIHsgcmV0dXJuIGxhYmVsOyB9KTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6IGRpdi5odG1sKGxhYmVsKTtcbiAgfVxuXG4gIHV0aWwuYXBwbHlTdHlsZShkaXYsIG5vZGUubGFiZWxTdHlsZSk7XG4gIGRpdi5zdHlsZShcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XG4gIC8vIEZpeCBmb3IgZmlyZWZveFxuICBkaXYuc3R5bGUoXCJ3aGl0ZS1zcGFjZVwiLCBcIm5vd3JhcFwiKTtcblxuICB2YXIgY2xpZW50ID0gZGl2WzBdWzBdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBmb1xuICAgIC5hdHRyKFwid2lkdGhcIiwgY2xpZW50LndpZHRoKVxuICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGNsaWVudC5oZWlnaHQpOyBcblxuICByZXR1cm4gZm87XG59XG4iLCJ2YXIgYWRkVGV4dExhYmVsID0gcmVxdWlyZShcIi4vYWRkLXRleHQtbGFiZWxcIiksXG4gICAgYWRkSHRtbExhYmVsID0gcmVxdWlyZShcIi4vYWRkLWh0bWwtbGFiZWxcIiksXG4gICAgYWRkU1ZHTGFiZWwgID0gcmVxdWlyZShcIi4vYWRkLXN2Zy1sYWJlbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhZGRMYWJlbDtcblxuZnVuY3Rpb24gYWRkTGFiZWwocm9vdCwgbm9kZSwgbG9jYXRpb24pIHtcbiAgdmFyIGxhYmVsID0gbm9kZS5sYWJlbDtcbiAgdmFyIGxhYmVsU3ZnID0gcm9vdC5hcHBlbmQoXCJnXCIpO1xuXG4gIC8vIEFsbG93IHRoZSBsYWJlbCB0byBiZSBhIHN0cmluZywgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYSBET00gZWxlbWVudCwgb3JcbiAgLy8gYSBET00gZWxlbWVudCBpdHNlbGYuXG4gIGlmIChub2RlLmxhYmVsVHlwZSA9PT0gXCJzdmdcIikge1xuICAgIGFkZFNWR0xhYmVsKGxhYmVsU3ZnLCBub2RlKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbGFiZWwgIT09IFwic3RyaW5nXCIgfHwgbm9kZS5sYWJlbFR5cGUgPT09IFwiaHRtbFwiKSB7XG4gICAgYWRkSHRtbExhYmVsKGxhYmVsU3ZnLCBub2RlKTtcbiAgfSBlbHNlIHtcbiAgICBhZGRUZXh0TGFiZWwobGFiZWxTdmcsIG5vZGUpO1xuICB9XG5cbiAgdmFyIGxhYmVsQkJveCA9IGxhYmVsU3ZnLm5vZGUoKS5nZXRCQm94KCk7XG4gIHZhciB5O1xuICBzd2l0Y2gobG9jYXRpb24pIHtcbiAgICBjYXNlIFwidG9wXCI6XG4gICAgICB5ID0gKC1ub2RlLmhlaWdodCAvIDIpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcImJvdHRvbVwiOlxuICAgICAgeSA9IChub2RlLmhlaWdodCAvIDIpIC0gbGFiZWxCQm94LmhlaWdodDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB5ID0gKC1sYWJlbEJCb3guaGVpZ2h0IC8gMik7XG4gIH1cbiAgbGFiZWxTdmcuYXR0cihcInRyYW5zZm9ybVwiLFxuICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlKFwiICsgKC1sYWJlbEJCb3gud2lkdGggLyAyKSArIFwiLFwiICsgeSArIFwiKVwiKTtcblxuICByZXR1cm4gbGFiZWxTdmc7XG59XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFNWR0xhYmVsO1xuXG5mdW5jdGlvbiBhZGRTVkdMYWJlbChyb290LCBub2RlKSB7XG4gIHZhciBkb21Ob2RlID0gcm9vdDtcblxuICBkb21Ob2RlLm5vZGUoKS5hcHBlbmRDaGlsZChub2RlLmxhYmVsKTtcblxuICB1dGlsLmFwcGx5U3R5bGUoZG9tTm9kZSwgbm9kZS5sYWJlbFN0eWxlKTtcblxuICByZXR1cm4gZG9tTm9kZTtcbn1cbiIsInZhciB1dGlsID0gcmVxdWlyZShcIi4uL3V0aWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkVGV4dExhYmVsO1xuXG4vKlxuICogQXR0YWNoZXMgYSB0ZXh0IGxhYmVsIHRvIHRoZSBzcGVjaWZpZWQgcm9vdC4gSGFuZGxlcyBlc2NhcGUgc2VxdWVuY2VzLlxuICovXG5mdW5jdGlvbiBhZGRUZXh0TGFiZWwocm9vdCwgbm9kZSkge1xuICB2YXIgZG9tTm9kZSA9IHJvb3QuYXBwZW5kKFwidGV4dFwiKTtcblxuICB2YXIgbGluZXMgPSBwcm9jZXNzRXNjYXBlU2VxdWVuY2VzKG5vZGUubGFiZWwpLnNwbGl0KFwiXFxuXCIpO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgZG9tTm9kZVxuICAgICAgLmFwcGVuZChcInRzcGFuXCIpXG4gICAgICAgIC5hdHRyKFwieG1sOnNwYWNlXCIsIFwicHJlc2VydmVcIilcbiAgICAgICAgLmF0dHIoXCJkeVwiLCBcIjFlbVwiKVxuICAgICAgICAuYXR0cihcInhcIiwgXCIxXCIpXG4gICAgICAgIC50ZXh0KGxpbmVzW2ldKTtcbiAgfVxuXG4gIHV0aWwuYXBwbHlTdHlsZShkb21Ob2RlLCBub2RlLmxhYmVsU3R5bGUpO1xuXG4gIHJldHVybiBkb21Ob2RlO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzRXNjYXBlU2VxdWVuY2VzKHRleHQpIHtcbiAgdmFyIG5ld1RleHQgPSBcIlwiLFxuICAgICAgZXNjYXBlZCA9IGZhbHNlLFxuICAgICAgY2g7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7ICsraSkge1xuICAgIGNoID0gdGV4dFtpXTtcbiAgICBpZiAoZXNjYXBlZCkge1xuICAgICAgc3dpdGNoKGNoKSB7XG4gICAgICAgIGNhc2UgXCJuXCI6IG5ld1RleHQgKz0gXCJcXG5cIjsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6IG5ld1RleHQgKz0gY2g7XG4gICAgICB9XG4gICAgICBlc2NhcGVkID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChjaCA9PT0gXCJcXFxcXCIpIHtcbiAgICAgIGVzY2FwZWQgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdUZXh0ICs9IGNoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3VGV4dDtcbn1cbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cblxudmFyIGxvZGFzaDtcblxuaWYgKHJlcXVpcmUpIHtcbiAgdHJ5IHtcbiAgICBsb2Rhc2ggPSByZXF1aXJlKFwibG9kYXNoXCIpO1xuICB9IGNhdGNoIChlKSB7fVxufVxuXG5pZiAoIWxvZGFzaCkge1xuICBsb2Rhc2ggPSB3aW5kb3cuXztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsb2Rhc2g7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGQzID0gcmVxdWlyZShcIi4vZDNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zaXRpb25DbHVzdGVycztcblxuZnVuY3Rpb24gcG9zaXRpb25DbHVzdGVycyhzZWxlY3Rpb24sIGcpIHtcbiAgdmFyIGNyZWF0ZWQgPSBzZWxlY3Rpb24uZmlsdGVyKGZ1bmN0aW9uKCkgeyByZXR1cm4gIWQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwidXBkYXRlXCIpOyB9KTtcblxuICBmdW5jdGlvbiB0cmFuc2xhdGUodikge1xuICAgIHZhciBub2RlID0gZy5ub2RlKHYpO1xuICAgIHJldHVybiBcInRyYW5zbGF0ZShcIiArIG5vZGUueCArIFwiLFwiICsgbm9kZS55ICsgXCIpXCI7XG4gIH1cblxuICBjcmVhdGVkLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgdHJhbnNsYXRlKTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzZWxlY3Rpb24sIGcpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgICAuYXR0cihcInRyYW5zZm9ybVwiLCB0cmFuc2xhdGUpO1xuXG4gIHV0aWwuYXBwbHlUcmFuc2l0aW9uKGNyZWF0ZWQuc2VsZWN0QWxsKFwicmVjdFwiKSwgZylcbiAgICAgIC5hdHRyKFwid2lkdGhcIiwgZnVuY3Rpb24odikgeyByZXR1cm4gZy5ub2RlKHYpLndpZHRoOyB9KVxuICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgZnVuY3Rpb24odikgeyByZXR1cm4gZy5ub2RlKHYpLmhlaWdodDsgfSlcbiAgICAgIC5hdHRyKFwieFwiLCBmdW5jdGlvbih2KSB7XG4gICAgICAgIHZhciBub2RlID0gZy5ub2RlKHYpO1xuICAgICAgICByZXR1cm4gLW5vZGUud2lkdGggLyAyO1xuICAgICAgfSlcbiAgICAgIC5hdHRyKFwieVwiLCBmdW5jdGlvbih2KSB7XG4gICAgICAgIHZhciBub2RlID0gZy5ub2RlKHYpO1xuICAgICAgICByZXR1cm4gLW5vZGUuaGVpZ2h0IC8gMjtcbiAgICAgIH0pO1xuXG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGQzID0gcmVxdWlyZShcIi4vZDNcIiksXG4gICAgXyA9IHJlcXVpcmUoXCIuL2xvZGFzaFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb3NpdGlvbkVkZ2VMYWJlbHM7XG5cbmZ1bmN0aW9uIHBvc2l0aW9uRWRnZUxhYmVscyhzZWxlY3Rpb24sIGcpIHtcbiAgdmFyIGNyZWF0ZWQgPSBzZWxlY3Rpb24uZmlsdGVyKGZ1bmN0aW9uKCkgeyByZXR1cm4gIWQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKFwidXBkYXRlXCIpOyB9KTtcblxuICBmdW5jdGlvbiB0cmFuc2xhdGUoZSkge1xuICAgIHZhciBlZGdlID0gZy5lZGdlKGUpO1xuICAgIHJldHVybiBfLmhhcyhlZGdlLCBcInhcIikgPyBcInRyYW5zbGF0ZShcIiArIGVkZ2UueCArIFwiLFwiICsgZWRnZS55ICsgXCIpXCIgOiBcIlwiO1xuICB9XG5cbiAgY3JlYXRlZC5hdHRyKFwidHJhbnNmb3JtXCIsIHRyYW5zbGF0ZSk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc2VsZWN0aW9uLCBnKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSlcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCB0cmFuc2xhdGUpO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKSxcbiAgICBkMyA9IHJlcXVpcmUoXCIuL2QzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvc2l0aW9uTm9kZXM7XG5cbmZ1bmN0aW9uIHBvc2l0aW9uTm9kZXMoc2VsZWN0aW9uLCBnKSB7XG4gIHZhciBjcmVhdGVkID0gc2VsZWN0aW9uLmZpbHRlcihmdW5jdGlvbigpIHsgcmV0dXJuICFkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcInVwZGF0ZVwiKTsgfSk7XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHYpIHtcbiAgICB2YXIgbm9kZSA9IGcubm9kZSh2KTtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBub2RlLnggKyBcIixcIiArIG5vZGUueSArIFwiKVwiO1xuICB9XG5cbiAgY3JlYXRlZC5hdHRyKFwidHJhbnNmb3JtXCIsIHRyYW5zbGF0ZSk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc2VsZWN0aW9uLCBnKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMSlcbiAgICAuYXR0cihcInRyYW5zZm9ybVwiLCB0cmFuc2xhdGUpO1xufVxuIiwidmFyIF8gPSByZXF1aXJlKFwiLi9sb2Rhc2hcIiksXG4gICAgbGF5b3V0ID0gcmVxdWlyZShcIi4vZGFncmVcIikubGF5b3V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlbmRlcjtcblxuLy8gVGhpcyBkZXNpZ24gaXMgYmFzZWQgb24gaHR0cDovL2Jvc3Qub2Nrcy5vcmcvbWlrZS9jaGFydC8uXG5mdW5jdGlvbiByZW5kZXIoKSB7XG4gIHZhciBjcmVhdGVOb2RlcyA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1ub2Rlc1wiKSxcbiAgICAgIGNyZWF0ZUNsdXN0ZXJzID0gcmVxdWlyZShcIi4vY3JlYXRlLWNsdXN0ZXJzXCIpLFxuICAgICAgY3JlYXRlRWRnZUxhYmVscyA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1lZGdlLWxhYmVsc1wiKSxcbiAgICAgIGNyZWF0ZUVkZ2VQYXRocyA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1lZGdlLXBhdGhzXCIpLFxuICAgICAgcG9zaXRpb25Ob2RlcyA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uLW5vZGVzXCIpLFxuICAgICAgcG9zaXRpb25FZGdlTGFiZWxzID0gcmVxdWlyZShcIi4vcG9zaXRpb24tZWRnZS1sYWJlbHNcIiksXG4gICAgICBwb3NpdGlvbkNsdXN0ZXJzID0gcmVxdWlyZShcIi4vcG9zaXRpb24tY2x1c3RlcnNcIiksXG4gICAgICBzaGFwZXMgPSByZXF1aXJlKFwiLi9zaGFwZXNcIiksXG4gICAgICBhcnJvd3MgPSByZXF1aXJlKFwiLi9hcnJvd3NcIik7XG5cbiAgdmFyIGZuID0gZnVuY3Rpb24oc3ZnLCBnKSB7XG4gICAgcHJlUHJvY2Vzc0dyYXBoKGcpO1xuXG4gICAgdmFyIG91dHB1dEdyb3VwID0gY3JlYXRlT3JTZWxlY3RHcm91cChzdmcsIFwib3V0cHV0XCIpLFxuICAgICAgICBjbHVzdGVyc0dyb3VwID0gY3JlYXRlT3JTZWxlY3RHcm91cChvdXRwdXRHcm91cCwgXCJjbHVzdGVyc1wiKSxcbiAgICAgICAgZWRnZVBhdGhzR3JvdXAgPSBjcmVhdGVPclNlbGVjdEdyb3VwKG91dHB1dEdyb3VwLCBcImVkZ2VQYXRoc1wiKSxcbiAgICAgICAgZWRnZUxhYmVscyA9IGNyZWF0ZUVkZ2VMYWJlbHMoY3JlYXRlT3JTZWxlY3RHcm91cChvdXRwdXRHcm91cCwgXCJlZGdlTGFiZWxzXCIpLCBnKSxcbiAgICAgICAgbm9kZXMgPSBjcmVhdGVOb2RlcyhjcmVhdGVPclNlbGVjdEdyb3VwKG91dHB1dEdyb3VwLCBcIm5vZGVzXCIpLCBnLCBzaGFwZXMpO1xuXG4gICAgbGF5b3V0KGcpO1xuXG4gICAgcG9zaXRpb25Ob2Rlcyhub2RlcywgZyk7XG4gICAgcG9zaXRpb25FZGdlTGFiZWxzKGVkZ2VMYWJlbHMsIGcpO1xuICAgIGNyZWF0ZUVkZ2VQYXRocyhlZGdlUGF0aHNHcm91cCwgZywgYXJyb3dzKTtcblxuICAgIHZhciBjbHVzdGVycyA9IGNyZWF0ZUNsdXN0ZXJzKGNsdXN0ZXJzR3JvdXAsIGcpO1xuICAgIHBvc2l0aW9uQ2x1c3RlcnMoY2x1c3RlcnMsIGcpO1xuXG4gICAgcG9zdFByb2Nlc3NHcmFwaChnKTtcbiAgfTtcblxuICBmbi5jcmVhdGVOb2RlcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY3JlYXRlTm9kZXM7XG4gICAgY3JlYXRlTm9kZXMgPSB2YWx1ZTtcbiAgICByZXR1cm4gZm47XG4gIH07XG5cbiAgZm4uY3JlYXRlQ2x1c3RlcnMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNyZWF0ZUNsdXN0ZXJzO1xuICAgIGNyZWF0ZUNsdXN0ZXJzID0gdmFsdWU7XG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIGZuLmNyZWF0ZUVkZ2VMYWJlbHMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNyZWF0ZUVkZ2VMYWJlbHM7XG4gICAgY3JlYXRlRWRnZUxhYmVscyA9IHZhbHVlO1xuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICBmbi5jcmVhdGVFZGdlUGF0aHMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNyZWF0ZUVkZ2VQYXRocztcbiAgICBjcmVhdGVFZGdlUGF0aHMgPSB2YWx1ZTtcbiAgICByZXR1cm4gZm47XG4gIH07XG5cbiAgZm4uc2hhcGVzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzaGFwZXM7XG4gICAgc2hhcGVzID0gdmFsdWU7XG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIGZuLmFycm93cyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gYXJyb3dzO1xuICAgIGFycm93cyA9IHZhbHVlO1xuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICByZXR1cm4gZm47XG59XG5cbnZhciBOT0RFX0RFRkFVTFRfQVRUUlMgPSB7XG4gIHBhZGRpbmdMZWZ0OiAxMCxcbiAgcGFkZGluZ1JpZ2h0OiAxMCxcbiAgcGFkZGluZ1RvcDogMTAsXG4gIHBhZGRpbmdCb3R0b206IDEwLFxuICByeDogMCxcbiAgcnk6IDAsXG4gIHNoYXBlOiBcInJlY3RcIlxufTtcblxudmFyIEVER0VfREVGQVVMVF9BVFRSUyA9IHtcbiAgYXJyb3doZWFkOiBcIm5vcm1hbFwiLFxuICBsaW5lSW50ZXJwb2xhdGU6IFwibGluZWFyXCJcbn07XG5cbmZ1bmN0aW9uIHByZVByb2Nlc3NHcmFwaChnKSB7XG4gIGcubm9kZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICB2YXIgbm9kZSA9IGcubm9kZSh2KTtcbiAgICBpZiAoIV8uaGFzKG5vZGUsIFwibGFiZWxcIikgJiYgIWcuY2hpbGRyZW4odikubGVuZ3RoKSB7IG5vZGUubGFiZWwgPSB2OyB9XG5cbiAgICBpZiAoXy5oYXMobm9kZSwgXCJwYWRkaW5nWFwiKSkge1xuICAgICAgXy5kZWZhdWx0cyhub2RlLCB7XG4gICAgICAgIHBhZGRpbmdMZWZ0OiBub2RlLnBhZGRpbmdYLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IG5vZGUucGFkZGluZ1hcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChfLmhhcyhub2RlLCBcInBhZGRpbmdZXCIpKSB7XG4gICAgICBfLmRlZmF1bHRzKG5vZGUsIHtcbiAgICAgICAgcGFkZGluZ1RvcDogbm9kZS5wYWRkaW5nWSxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogbm9kZS5wYWRkaW5nWVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKF8uaGFzKG5vZGUsIFwicGFkZGluZ1wiKSkge1xuICAgICAgXy5kZWZhdWx0cyhub2RlLCB7XG4gICAgICAgIHBhZGRpbmdMZWZ0OiBub2RlLnBhZGRpbmcsXG4gICAgICAgIHBhZGRpbmdSaWdodDogbm9kZS5wYWRkaW5nLFxuICAgICAgICBwYWRkaW5nVG9wOiBub2RlLnBhZGRpbmcsXG4gICAgICAgIHBhZGRpbmdCb3R0b206IG5vZGUucGFkZGluZ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgXy5kZWZhdWx0cyhub2RlLCBOT0RFX0RFRkFVTFRfQVRUUlMpO1xuXG4gICAgXy5lYWNoKFtcInBhZGRpbmdMZWZ0XCIsIFwicGFkZGluZ1JpZ2h0XCIsIFwicGFkZGluZ1RvcFwiLCBcInBhZGRpbmdCb3R0b21cIl0sIGZ1bmN0aW9uKGspIHtcbiAgICAgIG5vZGVba10gPSBOdW1iZXIobm9kZVtrXSk7XG4gICAgfSk7XG5cbiAgICAvLyBTYXZlIGRpbWVuc2lvbnMgZm9yIHJlc3RvcmUgZHVyaW5nIHBvc3QtcHJvY2Vzc2luZ1xuICAgIGlmIChfLmhhcyhub2RlLCBcIndpZHRoXCIpKSB7IG5vZGUuX3ByZXZXaWR0aCA9IG5vZGUud2lkdGg7IH1cbiAgICBpZiAoXy5oYXMobm9kZSwgXCJoZWlnaHRcIikpIHsgbm9kZS5fcHJldkhlaWdodCA9IG5vZGUuaGVpZ2h0OyB9XG4gIH0pO1xuXG4gIGcuZWRnZXMoKS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWRnZSA9IGcuZWRnZShlKTtcbiAgICBpZiAoIV8uaGFzKGVkZ2UsIFwibGFiZWxcIikpIHsgZWRnZS5sYWJlbCA9IFwiXCI7IH1cbiAgICBfLmRlZmF1bHRzKGVkZ2UsIEVER0VfREVGQVVMVF9BVFRSUyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwb3N0UHJvY2Vzc0dyYXBoKGcpIHtcbiAgXy5lYWNoKGcubm9kZXMoKSwgZnVuY3Rpb24odikge1xuICAgIHZhciBub2RlID0gZy5ub2RlKHYpO1xuXG4gICAgLy8gUmVzdG9yZSBvcmlnaW5hbCBkaW1lbnNpb25zXG4gICAgaWYgKF8uaGFzKG5vZGUsIFwiX3ByZXZXaWR0aFwiKSkge1xuICAgICAgbm9kZS53aWR0aCA9IG5vZGUuX3ByZXZXaWR0aDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG5vZGUud2lkdGg7XG4gICAgfVxuXG4gICAgaWYgKF8uaGFzKG5vZGUsIFwiX3ByZXZIZWlnaHRcIikpIHtcbiAgICAgIG5vZGUuaGVpZ2h0ID0gbm9kZS5fcHJldkhlaWdodDtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIG5vZGUuaGVpZ2h0O1xuICAgIH1cblxuICAgIGRlbGV0ZSBub2RlLl9wcmV2V2lkdGg7XG4gICAgZGVsZXRlIG5vZGUuX3ByZXZIZWlnaHQ7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPclNlbGVjdEdyb3VwKHJvb3QsIG5hbWUpIHtcbiAgdmFyIHNlbGVjdGlvbiA9IHJvb3Quc2VsZWN0KFwiZy5cIiArIG5hbWUpO1xuICBpZiAoc2VsZWN0aW9uLmVtcHR5KCkpIHtcbiAgICBzZWxlY3Rpb24gPSByb290LmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIG5hbWUpO1xuICB9XG4gIHJldHVybiBzZWxlY3Rpb247XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGludGVyc2VjdFJlY3QgPSByZXF1aXJlKFwiLi9pbnRlcnNlY3QvaW50ZXJzZWN0LXJlY3RcIiksXG4gICAgaW50ZXJzZWN0RWxsaXBzZSA9IHJlcXVpcmUoXCIuL2ludGVyc2VjdC9pbnRlcnNlY3QtZWxsaXBzZVwiKSxcbiAgICBpbnRlcnNlY3RDaXJjbGUgPSByZXF1aXJlKFwiLi9pbnRlcnNlY3QvaW50ZXJzZWN0LWNpcmNsZVwiKSxcbiAgICBpbnRlcnNlY3RQb2x5Z29uID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0L2ludGVyc2VjdC1wb2x5Z29uXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgcmVjdDogcmVjdCxcbiAgZWxsaXBzZTogZWxsaXBzZSxcbiAgY2lyY2xlOiBjaXJjbGUsXG4gIGRpYW1vbmQ6IGRpYW1vbmRcbn07XG5cbmZ1bmN0aW9uIHJlY3QocGFyZW50LCBiYm94LCBub2RlKSB7XG4gIHZhciBzaGFwZVN2ZyA9IHBhcmVudC5pbnNlcnQoXCJyZWN0XCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgIC5hdHRyKFwicnhcIiwgbm9kZS5yeClcbiAgICAgICAgLmF0dHIoXCJyeVwiLCBub2RlLnJ5KVxuICAgICAgICAuYXR0cihcInhcIiwgLWJib3gud2lkdGggLyAyKVxuICAgICAgICAuYXR0cihcInlcIiwgLWJib3guaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBiYm94LndpZHRoKVxuICAgICAgICAuYXR0cihcImhlaWdodFwiLCBiYm94LmhlaWdodCk7XG5cbiAgbm9kZS5pbnRlcnNlY3QgPSBmdW5jdGlvbihwb2ludCkge1xuICAgIHJldHVybiBpbnRlcnNlY3RSZWN0KG5vZGUsIHBvaW50KTtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVTdmc7XG59XG5cbmZ1bmN0aW9uIGVsbGlwc2UocGFyZW50LCBiYm94LCBub2RlKSB7XG4gIHZhciByeCA9IGJib3gud2lkdGggLyAyLFxuICAgICAgcnkgPSBiYm94LmhlaWdodCAvIDIsXG4gICAgICBzaGFwZVN2ZyA9IHBhcmVudC5pbnNlcnQoXCJlbGxpcHNlXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgIC5hdHRyKFwieFwiLCAtYmJveC53aWR0aCAvIDIpXG4gICAgICAgIC5hdHRyKFwieVwiLCAtYmJveC5oZWlnaHQgLyAyKVxuICAgICAgICAuYXR0cihcInJ4XCIsIHJ4KVxuICAgICAgICAuYXR0cihcInJ5XCIsIHJ5KTtcblxuICBub2RlLmludGVyc2VjdCA9IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIGludGVyc2VjdEVsbGlwc2Uobm9kZSwgcngsIHJ5LCBwb2ludCk7XG4gIH07XG5cbiAgcmV0dXJuIHNoYXBlU3ZnO1xufVxuXG5mdW5jdGlvbiBjaXJjbGUocGFyZW50LCBiYm94LCBub2RlKSB7XG4gIHZhciByID0gTWF0aC5tYXgoYmJveC53aWR0aCwgYmJveC5oZWlnaHQpIC8gMixcbiAgICAgIHNoYXBlU3ZnID0gcGFyZW50Lmluc2VydChcImNpcmNsZVwiLCBcIjpmaXJzdC1jaGlsZFwiKVxuICAgICAgICAuYXR0cihcInhcIiwgLWJib3gud2lkdGggLyAyKVxuICAgICAgICAuYXR0cihcInlcIiwgLWJib3guaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoXCJyXCIsIHIpO1xuXG4gIG5vZGUuaW50ZXJzZWN0ID0gZnVuY3Rpb24ocG9pbnQpIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0Q2lyY2xlKG5vZGUsIHIsIHBvaW50KTtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVTdmc7XG59XG5cbi8vIENpcmN1bXNjcmliZSBhbiBlbGxpcHNlIGZvciB0aGUgYm91bmRpbmcgYm94IHdpdGggYSBkaWFtb25kIHNoYXBlLiBJIGRlcml2ZWRcbi8vIHRoZSBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIGRpYW1vbmQgc2hhcGUgZnJvbTpcbi8vIGh0dHA6Ly9tYXRoZm9ydW0ub3JnL2tiL21lc3NhZ2UuanNwYT9tZXNzYWdlSUQ9Mzc1MDIzNlxuZnVuY3Rpb24gZGlhbW9uZChwYXJlbnQsIGJib3gsIG5vZGUpIHtcbiAgdmFyIHcgPSAoYmJveC53aWR0aCAqIE1hdGguU1FSVDIpIC8gMixcbiAgICAgIGggPSAoYmJveC5oZWlnaHQgKiBNYXRoLlNRUlQyKSAvIDIsXG4gICAgICBwb2ludHMgPSBbXG4gICAgICAgIHsgeDogIDAsIHk6IC1oIH0sXG4gICAgICAgIHsgeDogLXcsIHk6ICAwIH0sXG4gICAgICAgIHsgeDogIDAsIHk6ICBoIH0sXG4gICAgICAgIHsgeDogIHcsIHk6ICAwIH1cbiAgICAgIF0sXG4gICAgICBzaGFwZVN2ZyA9IHBhcmVudC5pbnNlcnQoXCJwb2x5Z29uXCIsIFwiOmZpcnN0LWNoaWxkXCIpXG4gICAgICAgIC5hdHRyKFwicG9pbnRzXCIsIHBvaW50cy5tYXAoZnVuY3Rpb24ocCkgeyByZXR1cm4gcC54ICsgXCIsXCIgKyBwLnk7IH0pLmpvaW4oXCIgXCIpKTtcblxuICBub2RlLmludGVyc2VjdCA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0UG9seWdvbihub2RlLCBwb2ludHMsIHApO1xuICB9O1xuXG4gIHJldHVybiBzaGFwZVN2Zztcbn1cbiIsInZhciBfID0gcmVxdWlyZShcIi4vbG9kYXNoXCIpO1xuXG4vLyBQdWJsaWMgdXRpbGl0eSBmdW5jdGlvbnNcbm1vZHVsZS5leHBvcnRzID0ge1xuICBpc1N1YmdyYXBoOiBpc1N1YmdyYXBoLFxuICBlZGdlVG9JZDogZWRnZVRvSWQsXG4gIGFwcGx5U3R5bGU6IGFwcGx5U3R5bGUsXG4gIGFwcGx5Q2xhc3M6IGFwcGx5Q2xhc3MsXG4gIGFwcGx5VHJhbnNpdGlvbjogYXBwbHlUcmFuc2l0aW9uXG59O1xuXG4vKlxuICogUmV0dXJucyB0cnVlIGlmIHRoZSBzcGVjaWZpZWQgbm9kZSBpbiB0aGUgZ3JhcGggaXMgYSBzdWJncmFwaCBub2RlLiBBXG4gKiBzdWJncmFwaCBub2RlIGlzIG9uZSB0aGF0IGNvbnRhaW5zIG90aGVyIG5vZGVzLlxuICovXG5mdW5jdGlvbiBpc1N1YmdyYXBoKGcsIHYpIHtcbiAgcmV0dXJuICEhZy5jaGlsZHJlbih2KS5sZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGVkZ2VUb0lkKGUpIHtcbiAgcmV0dXJuIGVzY2FwZUlkKGUudikgKyBcIjpcIiArIGVzY2FwZUlkKGUudykgKyBcIjpcIiArIGVzY2FwZUlkKGUubmFtZSk7XG59XG5cbnZhciBJRF9ERUxJTSA9IC86L2c7XG5mdW5jdGlvbiBlc2NhcGVJZChzdHIpIHtcbiAgcmV0dXJuIHN0ciA/IFN0cmluZyhzdHIpLnJlcGxhY2UoSURfREVMSU0sIFwiXFxcXDpcIikgOiBcIlwiO1xufVxuXG5mdW5jdGlvbiBhcHBseVN0eWxlKGRvbSwgc3R5bGVGbikge1xuICBpZiAoc3R5bGVGbikge1xuICAgIGRvbS5hdHRyKFwic3R5bGVcIiwgc3R5bGVGbik7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXBwbHlDbGFzcyhkb20sIGNsYXNzRm4sIG90aGVyQ2xhc3Nlcykge1xuICBpZiAoY2xhc3NGbikge1xuICAgIGRvbVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBjbGFzc0ZuKVxuICAgICAgLmF0dHIoXCJjbGFzc1wiLCBvdGhlckNsYXNzZXMgKyBcIiBcIiArIGRvbS5hdHRyKFwiY2xhc3NcIikpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VHJhbnNpdGlvbihzZWxlY3Rpb24sIGcpIHtcbiAgdmFyIGdyYXBoID0gZy5ncmFwaCgpO1xuXG4gIGlmIChfLmlzUGxhaW5PYmplY3QoZ3JhcGgpKSB7XG4gICAgdmFyIHRyYW5zaXRpb24gPSBncmFwaC50cmFuc2l0aW9uO1xuICAgIGlmIChfLmlzRnVuY3Rpb24odHJhbnNpdGlvbikpIHtcbiAgICAgIHJldHVybiB0cmFuc2l0aW9uKHNlbGVjdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHNlbGVjdGlvbjtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gXCIwLjQuMTZcIjtcbiJdfQ==
