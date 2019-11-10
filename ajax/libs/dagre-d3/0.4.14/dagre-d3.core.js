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
        var points = _.range(this.pathSegList.length).map(function() { return source; });
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

  // TODO find a better way to get dimensions for foreignObjects...
  var w, h;
  div
    .each(function() {
      w = this.clientWidth;
      h = this.clientHeight;
    });

  fo
    .attr("width", w)
    .attr("height", h);

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
module.exports = "0.4.14";

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpbmRleC5qcyIsImxpYi9hcnJvd3MuanMiLCJsaWIvY3JlYXRlLWNsdXN0ZXJzLmpzIiwibGliL2NyZWF0ZS1lZGdlLWxhYmVscy5qcyIsImxpYi9jcmVhdGUtZWRnZS1wYXRocy5qcyIsImxpYi9jcmVhdGUtbm9kZXMuanMiLCJsaWIvZDMuanMiLCJsaWIvZGFncmUuanMiLCJsaWIvZ3JhcGhsaWIuanMiLCJsaWIvaW50ZXJzZWN0L2luZGV4LmpzIiwibGliL2ludGVyc2VjdC9pbnRlcnNlY3QtY2lyY2xlLmpzIiwibGliL2ludGVyc2VjdC9pbnRlcnNlY3QtZWxsaXBzZS5qcyIsImxpYi9pbnRlcnNlY3QvaW50ZXJzZWN0LWxpbmUuanMiLCJsaWIvaW50ZXJzZWN0L2ludGVyc2VjdC1ub2RlLmpzIiwibGliL2ludGVyc2VjdC9pbnRlcnNlY3QtcG9seWdvbi5qcyIsImxpYi9pbnRlcnNlY3QvaW50ZXJzZWN0LXJlY3QuanMiLCJsaWIvbGFiZWwvYWRkLWh0bWwtbGFiZWwuanMiLCJsaWIvbGFiZWwvYWRkLWxhYmVsLmpzIiwibGliL2xhYmVsL2FkZC1zdmctbGFiZWwuanMiLCJsaWIvbGFiZWwvYWRkLXRleHQtbGFiZWwuanMiLCJsaWIvbG9kYXNoLmpzIiwibGliL3Bvc2l0aW9uLWNsdXN0ZXJzLmpzIiwibGliL3Bvc2l0aW9uLWVkZ2UtbGFiZWxzLmpzIiwibGliL3Bvc2l0aW9uLW5vZGVzLmpzIiwibGliL3JlbmRlci5qcyIsImxpYi9zaGFwZXMuanMiLCJsaWIvdXRpbC5qcyIsImxpYi92ZXJzaW9uLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMURBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3REQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoYykgMjAxMi0yMDEzIENocmlzIFBldHRpdHRcbiAqXG4gKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYSBjb3B5XG4gKiBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG4gKiBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG4gKiB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsXG4gKiBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcbiAqIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4gKlxuICogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbiAqIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuICpcbiAqIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1JcbiAqIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuICogRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gKiBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4gKiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuICogT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuICogVEhFIFNPRlRXQVJFLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICB7XG4gIGdyYXBobGliOiByZXF1aXJlKFwiLi9saWIvZ3JhcGhsaWJcIiksXG4gIGRhZ3JlOiByZXF1aXJlKFwiLi9saWIvZGFncmVcIiksXG4gIGludGVyc2VjdDogcmVxdWlyZShcIi4vbGliL2ludGVyc2VjdFwiKSxcbiAgcmVuZGVyOiByZXF1aXJlKFwiLi9saWIvcmVuZGVyXCIpLFxuICB1dGlsOiByZXF1aXJlKFwiLi9saWIvdXRpbFwiKSxcbiAgdmVyc2lvbjogcmVxdWlyZShcIi4vbGliL3ZlcnNpb25cIilcbn07XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBcImRlZmF1bHRcIjogbm9ybWFsLFxuICBcIm5vcm1hbFwiOiBub3JtYWwsXG4gIFwidmVlXCI6IHZlZSxcbiAgXCJ1bmRpcmVjdGVkXCI6IHVuZGlyZWN0ZWRcbn07XG5cbmZ1bmN0aW9uIG5vcm1hbChwYXJlbnQsIGlkLCBlZGdlLCB0eXBlKSB7XG4gIHZhciBtYXJrZXIgPSBwYXJlbnQuYXBwZW5kKFwibWFya2VyXCIpXG4gICAgLmF0dHIoXCJpZFwiLCBpZClcbiAgICAuYXR0cihcInZpZXdCb3hcIiwgXCIwIDAgMTAgMTBcIilcbiAgICAuYXR0cihcInJlZlhcIiwgOSlcbiAgICAuYXR0cihcInJlZllcIiwgNSlcbiAgICAuYXR0cihcIm1hcmtlclVuaXRzXCIsIFwic3Ryb2tlV2lkdGhcIilcbiAgICAuYXR0cihcIm1hcmtlcldpZHRoXCIsIDgpXG4gICAgLmF0dHIoXCJtYXJrZXJIZWlnaHRcIiwgNilcbiAgICAuYXR0cihcIm9yaWVudFwiLCBcImF1dG9cIik7XG5cbiAgdmFyIHBhdGggPSBtYXJrZXIuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiZFwiLCBcIk0gMCAwIEwgMTAgNSBMIDAgMTAgelwiKVxuICAgIC5zdHlsZShcInN0cm9rZS13aWR0aFwiLCAxKVxuICAgIC5zdHlsZShcInN0cm9rZS1kYXNoYXJyYXlcIiwgXCIxLDBcIik7XG4gIHV0aWwuYXBwbHlTdHlsZShwYXRoLCBlZGdlW3R5cGUgKyBcIlN0eWxlXCJdKTtcbn1cblxuZnVuY3Rpb24gdmVlKHBhcmVudCwgaWQsIGVkZ2UsIHR5cGUpIHtcbiAgdmFyIG1hcmtlciA9IHBhcmVudC5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAuYXR0cihcImlkXCIsIGlkKVxuICAgIC5hdHRyKFwidmlld0JveFwiLCBcIjAgMCAxMCAxMFwiKVxuICAgIC5hdHRyKFwicmVmWFwiLCA5KVxuICAgIC5hdHRyKFwicmVmWVwiLCA1KVxuICAgIC5hdHRyKFwibWFya2VyVW5pdHNcIiwgXCJzdHJva2VXaWR0aFwiKVxuICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiwgOClcbiAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLCA2KVxuICAgIC5hdHRyKFwib3JpZW50XCIsIFwiYXV0b1wiKTtcblxuICB2YXIgcGF0aCA9IG1hcmtlci5hcHBlbmQoXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJkXCIsIFwiTSAwIDAgTCAxMCA1IEwgMCAxMCBMIDQgNSB6XCIpXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgLnN0eWxlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBcIjEsMFwiKTtcbiAgdXRpbC5hcHBseVN0eWxlKHBhdGgsIGVkZ2VbdHlwZSArIFwiU3R5bGVcIl0pO1xufVxuXG5mdW5jdGlvbiB1bmRpcmVjdGVkKHBhcmVudCwgaWQsIGVkZ2UsIHR5cGUpIHtcbiAgdmFyIG1hcmtlciA9IHBhcmVudC5hcHBlbmQoXCJtYXJrZXJcIilcbiAgICAuYXR0cihcImlkXCIsIGlkKVxuICAgIC5hdHRyKFwidmlld0JveFwiLCBcIjAgMCAxMCAxMFwiKVxuICAgIC5hdHRyKFwicmVmWFwiLCA5KVxuICAgIC5hdHRyKFwicmVmWVwiLCA1KVxuICAgIC5hdHRyKFwibWFya2VyVW5pdHNcIiwgXCJzdHJva2VXaWR0aFwiKVxuICAgIC5hdHRyKFwibWFya2VyV2lkdGhcIiwgOClcbiAgICAuYXR0cihcIm1hcmtlckhlaWdodFwiLCA2KVxuICAgIC5hdHRyKFwib3JpZW50XCIsIFwiYXV0b1wiKTtcblxuICB2YXIgcGF0aCA9IG1hcmtlci5hcHBlbmQoXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJkXCIsIFwiTSAwIDUgTCAxMCA1XCIpXG4gICAgLnN0eWxlKFwic3Ryb2tlLXdpZHRoXCIsIDEpXG4gICAgLnN0eWxlKFwic3Ryb2tlLWRhc2hhcnJheVwiLCBcIjEsMFwiKTtcbiAgdXRpbC5hcHBseVN0eWxlKHBhdGgsIGVkZ2VbdHlwZSArIFwiU3R5bGVcIl0pO1xufVxuIiwidmFyIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGFkZExhYmVsID0gcmVxdWlyZShcIi4vbGFiZWwvYWRkLWxhYmVsXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNsdXN0ZXJzO1xuXG5mdW5jdGlvbiBjcmVhdGVDbHVzdGVycyhzZWxlY3Rpb24sIGcpIHtcbiAgdmFyIGNsdXN0ZXJzID0gZy5ub2RlcygpLmZpbHRlcihmdW5jdGlvbih2KSB7IHJldHVybiB1dGlsLmlzU3ViZ3JhcGgoZywgdik7IH0pLFxuICAgICAgc3ZnQ2x1c3RlcnMgPSBzZWxlY3Rpb24uc2VsZWN0QWxsKFwiZy5jbHVzdGVyXCIpXG4gICAgICAgIC5kYXRhKGNsdXN0ZXJzLCBmdW5jdGlvbih2KSB7IHJldHVybiB2OyB9KTtcblxuICBzdmdDbHVzdGVycy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICBzdmdDbHVzdGVycy5lbnRlcigpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJjbHVzdGVyXCIpXG4gICAgICAuYXR0cihcImlkXCIsZnVuY3Rpb24odil7XG4gICAgICAgICAgdmFyIG5vZGUgPSBnLm5vZGUodik7XG4gICAgICAgICAgcmV0dXJuIG5vZGUuaWQ7XG4gICAgICB9KVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzdmdDbHVzdGVycywgZylcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpO1xuXG4gIHN2Z0NsdXN0ZXJzLmVhY2goZnVuY3Rpb24odikge1xuICAgIHZhciBub2RlID0gZy5ub2RlKHYpLFxuICAgICAgICB0aGlzR3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgZDMuc2VsZWN0KHRoaXMpLmFwcGVuZChcInJlY3RcIik7XG4gICAgdmFyIGxhYmVsR3JvdXAgPSB0aGlzR3JvdXAuYXBwZW5kKFwiZ1wiKS5hdHRyKFwiY2xhc3NcIiwgXCJsYWJlbFwiKTtcbiAgICBhZGRMYWJlbChsYWJlbEdyb3VwLCBub2RlLCBub2RlLmNsdXN0ZXJMYWJlbFBvcyk7XG4gIH0pO1xuXG4gIHN2Z0NsdXN0ZXJzLnNlbGVjdEFsbChcInJlY3RcIikuZWFjaChmdW5jdGlvbihjKSB7XG4gICAgdmFyIG5vZGUgPSBnLm5vZGUoYyk7XG4gICAgdmFyIGRvbUNsdXN0ZXIgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgdXRpbC5hcHBseVN0eWxlKGRvbUNsdXN0ZXIsIG5vZGUuc3R5bGUpO1xuICB9KTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzdmdDbHVzdGVycy5leGl0KCksIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgIC5yZW1vdmUoKTtcblxuICByZXR1cm4gc3ZnQ2x1c3RlcnM7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF8gPSByZXF1aXJlKFwiLi9sb2Rhc2hcIiksXG4gICAgYWRkTGFiZWwgPSByZXF1aXJlKFwiLi9sYWJlbC9hZGQtbGFiZWxcIiksXG4gICAgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIiksXG4gICAgZDMgPSByZXF1aXJlKFwiLi9kM1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVFZGdlTGFiZWxzO1xuXG5mdW5jdGlvbiBjcmVhdGVFZGdlTGFiZWxzKHNlbGVjdGlvbiwgZykge1xuICB2YXIgc3ZnRWRnZUxhYmVscyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoXCJnLmVkZ2VMYWJlbFwiKVxuICAgIC5kYXRhKGcuZWRnZXMoKSwgZnVuY3Rpb24oZSkgeyByZXR1cm4gdXRpbC5lZGdlVG9JZChlKTsgfSlcbiAgICAuY2xhc3NlZChcInVwZGF0ZVwiLCB0cnVlKTtcblxuICBzdmdFZGdlTGFiZWxzLnNlbGVjdEFsbChcIipcIikucmVtb3ZlKCk7XG4gIHN2Z0VkZ2VMYWJlbHMuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuY2xhc3NlZChcImVkZ2VMYWJlbFwiLCB0cnVlKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKTtcbiAgc3ZnRWRnZUxhYmVscy5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZWRnZSA9IGcuZWRnZShlKSxcbiAgICAgICAgbGFiZWwgPSBhZGRMYWJlbChkMy5zZWxlY3QodGhpcyksIGcuZWRnZShlKSwgMCwgMCkuY2xhc3NlZChcImxhYmVsXCIsIHRydWUpLFxuICAgICAgICBiYm94ID0gbGFiZWwubm9kZSgpLmdldEJCb3goKTtcblxuICAgIGlmIChlZGdlLmxhYmVsSWQpIHsgbGFiZWwuYXR0cihcImlkXCIsIGVkZ2UubGFiZWxJZCk7IH1cbiAgICBpZiAoIV8uaGFzKGVkZ2UsIFwid2lkdGhcIikpIHsgZWRnZS53aWR0aCA9IGJib3gud2lkdGg7IH1cbiAgICBpZiAoIV8uaGFzKGVkZ2UsIFwiaGVpZ2h0XCIpKSB7IGVkZ2UuaGVpZ2h0ID0gYmJveC5oZWlnaHQ7IH1cbiAgfSk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnRWRnZUxhYmVscy5leGl0KCksIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgIC5yZW1vdmUoKTtcblxuICByZXR1cm4gc3ZnRWRnZUxhYmVscztcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgXyA9IHJlcXVpcmUoXCIuL2xvZGFzaFwiKSxcbiAgICBpbnRlcnNlY3ROb2RlID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0L2ludGVyc2VjdC1ub2RlXCIpLFxuICAgIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGQzID0gcmVxdWlyZShcIi4vZDNcIik7XG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUVkZ2VQYXRocztcblxuZnVuY3Rpb24gY3JlYXRlRWRnZVBhdGhzKHNlbGVjdGlvbiwgZywgYXJyb3dzKSB7XG4gIHZhciBzdmdQYXRocyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoXCJnLmVkZ2VQYXRoXCIpXG4gICAgLmRhdGEoZy5lZGdlcygpLCBmdW5jdGlvbihlKSB7IHJldHVybiB1dGlsLmVkZ2VUb0lkKGUpOyB9KVxuICAgIC5jbGFzc2VkKFwidXBkYXRlXCIsIHRydWUpO1xuXG4gIGVudGVyKHN2Z1BhdGhzLCBnKTtcbiAgZXhpdChzdmdQYXRocywgZyk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnUGF0aHMsIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKTtcblxuICAvLyBTYXZlIERPTSBlbGVtZW50IGluIHRoZSBwYXRoIGdyb3VwLCBhbmQgc2V0IElEIGFuZCBjbGFzc1xuICBzdmdQYXRocy5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgZG9tRWRnZSA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICB2YXIgZWRnZSA9IGcuZWRnZShlKTtcbiAgICBlZGdlLmVsZW0gPSB0aGlzO1xuXG4gICAgaWYgKGVkZ2UuaWQpIHtcbiAgICAgIGRvbUVkZ2UuYXR0cihcImlkXCIsIGVkZ2UuaWQpO1xuICAgIH1cblxuICAgIHV0aWwuYXBwbHlDbGFzcyhkb21FZGdlLCBlZGdlW1wiY2xhc3NcIl0sXG4gICAgICAoZG9tRWRnZS5jbGFzc2VkKFwidXBkYXRlXCIpID8gXCJ1cGRhdGUgXCIgOiBcIlwiKSArIFwiZWRnZVBhdGhcIik7XG4gIH0pO1xuXG4gIHN2Z1BhdGhzLnNlbGVjdEFsbChcInBhdGgucGF0aFwiKVxuICAgIC5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlZGdlID0gZy5lZGdlKGUpO1xuICAgICAgZWRnZS5hcnJvd2hlYWRJZCA9IF8udW5pcXVlSWQoXCJhcnJvd2hlYWRcIik7XG5cbiAgICAgIHZhciBkb21FZGdlID0gZDMuc2VsZWN0KHRoaXMpXG4gICAgICAgIC5hdHRyKFwibWFya2VyLWVuZFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBcInVybChcIiArIGxvY2F0aW9uLmhyZWYgKyBcIiNcIiArIGVkZ2UuYXJyb3doZWFkSWQgKyBcIilcIjtcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKFwiZmlsbFwiLCBcIm5vbmVcIik7XG5cbiAgICAgIHV0aWwuYXBwbHlUcmFuc2l0aW9uKGRvbUVkZ2UsIGcpXG4gICAgICAgIC5hdHRyKFwiZFwiLCBmdW5jdGlvbihlKSB7IHJldHVybiBjYWxjUG9pbnRzKGcsIGUpOyB9KTtcblxuICAgICAgdXRpbC5hcHBseVN0eWxlKGRvbUVkZ2UsIGVkZ2Uuc3R5bGUpO1xuICAgIH0pO1xuXG4gIHN2Z1BhdGhzLnNlbGVjdEFsbChcImRlZnMgKlwiKS5yZW1vdmUoKTtcbiAgc3ZnUGF0aHMuc2VsZWN0QWxsKFwiZGVmc1wiKVxuICAgIC5lYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlZGdlID0gZy5lZGdlKGUpLFxuICAgICAgICAgIGFycm93aGVhZCA9IGFycm93c1tlZGdlLmFycm93aGVhZF07XG4gICAgICBhcnJvd2hlYWQoZDMuc2VsZWN0KHRoaXMpLCBlZGdlLmFycm93aGVhZElkLCBlZGdlLCBcImFycm93aGVhZFwiKTtcbiAgICB9KTtcblxuICByZXR1cm4gc3ZnUGF0aHM7XG59XG5cbmZ1bmN0aW9uIGNhbGNQb2ludHMoZywgZSkge1xuICB2YXIgZWRnZSA9IGcuZWRnZShlKSxcbiAgICAgIHRhaWwgPSBnLm5vZGUoZS52KSxcbiAgICAgIGhlYWQgPSBnLm5vZGUoZS53KSxcbiAgICAgIHBvaW50cyA9IGVkZ2UucG9pbnRzLnNsaWNlKDEsIGVkZ2UucG9pbnRzLmxlbmd0aCAtIDEpO1xuICBwb2ludHMudW5zaGlmdChpbnRlcnNlY3ROb2RlKHRhaWwsIHBvaW50c1swXSkpO1xuICBwb2ludHMucHVzaChpbnRlcnNlY3ROb2RlKGhlYWQsIHBvaW50c1twb2ludHMubGVuZ3RoIC0gMV0pKTtcblxuICByZXR1cm4gY3JlYXRlTGluZShlZGdlLCBwb2ludHMpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5lKGVkZ2UsIHBvaW50cykge1xuICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lKClcbiAgICAueChmdW5jdGlvbihkKSB7IHJldHVybiBkLng7IH0pXG4gICAgLnkoZnVuY3Rpb24oZCkgeyByZXR1cm4gZC55OyB9KTtcblxuICBpZiAoXy5oYXMoZWRnZSwgXCJsaW5lSW50ZXJwb2xhdGVcIikpIHtcbiAgICBsaW5lLmludGVycG9sYXRlKGVkZ2UubGluZUludGVycG9sYXRlKTtcbiAgfVxuXG4gIGlmIChfLmhhcyhlZGdlLCBcImxpbmVUZW5zaW9uXCIpKSB7XG4gICAgbGluZS50ZW5zaW9uKE51bWJlcihlZGdlLmxpbmVUZW5zaW9uKSk7XG4gIH1cblxuICByZXR1cm4gbGluZShwb2ludHMpO1xufVxuXG5mdW5jdGlvbiBnZXRDb29yZHMoZWxlbSkge1xuICB2YXIgYmJveCA9IGVsZW0uZ2V0QkJveCgpLFxuICAgICAgbWF0cml4ID0gZWxlbS5vd25lclNWR0VsZW1lbnQuZ2V0U2NyZWVuQ1RNKClcbiAgICAgICAgLmludmVyc2UoKVxuICAgICAgICAubXVsdGlwbHkoZWxlbS5nZXRTY3JlZW5DVE0oKSlcbiAgICAgICAgLnRyYW5zbGF0ZShiYm94LndpZHRoIC8gMiwgYmJveC5oZWlnaHQgLyAyKTtcbiAgcmV0dXJuIHsgeDogbWF0cml4LmUsIHk6IG1hdHJpeC5mIH07XG59XG5cbmZ1bmN0aW9uIGVudGVyKHN2Z1BhdGhzLCBnKSB7XG4gIHZhciBzdmdQYXRoc0VudGVyID0gc3ZnUGF0aHMuZW50ZXIoKVxuICAgIC5hcHBlbmQoXCJnXCIpXG4gICAgICAuYXR0cihcImNsYXNzXCIsIFwiZWRnZVBhdGhcIilcbiAgICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMCk7XG4gIHN2Z1BhdGhzRW50ZXIuYXBwZW5kKFwicGF0aFwiKVxuICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJwYXRoXCIpXG4gICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBlZGdlID0gZy5lZGdlKGUpLFxuICAgICAgICAgIHNvdXJjZUVsZW0gPSBnLm5vZGUoZS52KS5lbGVtLFxuICAgICAgICAgIHBvaW50cyA9IF8ucmFuZ2UoZWRnZS5wb2ludHMubGVuZ3RoKS5tYXAoZnVuY3Rpb24oKSB7IHJldHVybiBnZXRDb29yZHMoc291cmNlRWxlbSk7IH0pO1xuICAgICAgcmV0dXJuIGNyZWF0ZUxpbmUoZWRnZSwgcG9pbnRzKTtcbiAgICB9KTtcbiAgc3ZnUGF0aHNFbnRlci5hcHBlbmQoXCJkZWZzXCIpO1xufVxuXG5mdW5jdGlvbiBleGl0KHN2Z1BhdGhzLCBnKSB7XG4gIHZhciBzdmdQYXRoRXhpdCA9IHN2Z1BhdGhzLmV4aXQoKTtcbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnUGF0aEV4aXQsIGcpXG4gICAgLnN0eWxlKFwib3BhY2l0eVwiLCAwKVxuICAgIC5yZW1vdmUoKTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihzdmdQYXRoRXhpdC5zZWxlY3QoXCJwYXRoLnBhdGhcIiksIGcpXG4gICAgLmF0dHIoXCJkXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBnLm5vZGUoZS52KTtcblxuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICB2YXIgcG9pbnRzID0gXy5yYW5nZSh0aGlzLnBhdGhTZWdMaXN0Lmxlbmd0aCkubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gc291cmNlOyB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUxpbmUoe30sIHBvaW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZDMuc2VsZWN0KHRoaXMpLmF0dHIoXCJkXCIpO1xuICAgICAgfVxuICAgIH0pO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfID0gcmVxdWlyZShcIi4vbG9kYXNoXCIpLFxuICAgIGFkZExhYmVsID0gcmVxdWlyZShcIi4vbGFiZWwvYWRkLWxhYmVsXCIpLFxuICAgIHV0aWwgPSByZXF1aXJlKFwiLi91dGlsXCIpLFxuICAgIGQzID0gcmVxdWlyZShcIi4vZDNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlTm9kZXM7XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVzKHNlbGVjdGlvbiwgZywgc2hhcGVzKSB7XG4gIHZhciBzaW1wbGVOb2RlcyA9IGcubm9kZXMoKS5maWx0ZXIoZnVuY3Rpb24odikgeyByZXR1cm4gIXV0aWwuaXNTdWJncmFwaChnLCB2KTsgfSk7XG4gIHZhciBzdmdOb2RlcyA9IHNlbGVjdGlvbi5zZWxlY3RBbGwoXCJnLm5vZGVcIilcbiAgICAuZGF0YShzaW1wbGVOb2RlcywgZnVuY3Rpb24odikgeyByZXR1cm4gdjsgfSlcbiAgICAuY2xhc3NlZChcInVwZGF0ZVwiLCB0cnVlKTtcblxuICBzdmdOb2Rlcy5zZWxlY3RBbGwoXCIqXCIpLnJlbW92ZSgpO1xuICBzdmdOb2Rlcy5lbnRlcigpXG4gICAgLmFwcGVuZChcImdcIilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgXCJub2RlXCIpXG4gICAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDApO1xuICBzdmdOb2Rlcy5lYWNoKGZ1bmN0aW9uKHYpIHtcbiAgICB2YXIgbm9kZSA9IGcubm9kZSh2KSxcbiAgICAgICAgdGhpc0dyb3VwID0gZDMuc2VsZWN0KHRoaXMpLFxuICAgICAgICBsYWJlbEdyb3VwID0gdGhpc0dyb3VwLmFwcGVuZChcImdcIikuYXR0cihcImNsYXNzXCIsIFwibGFiZWxcIiksXG4gICAgICAgIGxhYmVsRG9tID0gYWRkTGFiZWwobGFiZWxHcm91cCwgbm9kZSksXG4gICAgICAgIHNoYXBlID0gc2hhcGVzW25vZGUuc2hhcGVdLFxuICAgICAgICBiYm94ID0gXy5waWNrKGxhYmVsRG9tLm5vZGUoKS5nZXRCQm94KCksIFwid2lkdGhcIiwgXCJoZWlnaHRcIik7XG5cbiAgICBub2RlLmVsZW0gPSB0aGlzO1xuXG4gICAgaWYgKG5vZGUuaWQpIHsgdGhpc0dyb3VwLmF0dHIoXCJpZFwiLCBub2RlLmlkKTsgfVxuICAgIGlmIChub2RlLmxhYmVsSWQpIHsgbGFiZWxHcm91cC5hdHRyKFwiaWRcIiwgbm9kZS5sYWJlbElkKTsgfVxuICAgIHV0aWwuYXBwbHlDbGFzcyh0aGlzR3JvdXAsIG5vZGVbXCJjbGFzc1wiXSxcbiAgICAgICh0aGlzR3JvdXAuY2xhc3NlZChcInVwZGF0ZVwiKSA/IFwidXBkYXRlIFwiIDogXCJcIikgKyBcIm5vZGVcIik7XG5cbiAgICBpZiAoXy5oYXMobm9kZSwgXCJ3aWR0aFwiKSkgeyBiYm94LndpZHRoID0gbm9kZS53aWR0aDsgfVxuICAgIGlmIChfLmhhcyhub2RlLCBcImhlaWdodFwiKSkgeyBiYm94LmhlaWdodCA9IG5vZGUuaGVpZ2h0OyB9XG5cbiAgICBiYm94LndpZHRoICs9IG5vZGUucGFkZGluZ0xlZnQgKyBub2RlLnBhZGRpbmdSaWdodDtcbiAgICBiYm94LmhlaWdodCArPSBub2RlLnBhZGRpbmdUb3AgKyBub2RlLnBhZGRpbmdCb3R0b207XG4gICAgbGFiZWxHcm91cC5hdHRyKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlKFwiICtcbiAgICAgICgobm9kZS5wYWRkaW5nTGVmdCAtIG5vZGUucGFkZGluZ1JpZ2h0KSAvIDIpICsgXCIsXCIgK1xuICAgICAgKChub2RlLnBhZGRpbmdUb3AgLSBub2RlLnBhZGRpbmdCb3R0b20pIC8gMikgKyBcIilcIik7XG5cbiAgICB2YXIgc2hhcGVTdmcgPSBzaGFwZShkMy5zZWxlY3QodGhpcyksIGJib3gsIG5vZGUpO1xuICAgIHV0aWwuYXBwbHlTdHlsZShzaGFwZVN2Zywgbm9kZS5zdHlsZSk7XG5cbiAgICB2YXIgc2hhcGVCQm94ID0gc2hhcGVTdmcubm9kZSgpLmdldEJCb3goKTtcbiAgICBub2RlLndpZHRoID0gc2hhcGVCQm94LndpZHRoO1xuICAgIG5vZGUuaGVpZ2h0ID0gc2hhcGVCQm94LmhlaWdodDtcbiAgfSk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc3ZnTm9kZXMuZXhpdCgpLCBnKVxuICAgIC5zdHlsZShcIm9wYWNpdHlcIiwgMClcbiAgICAucmVtb3ZlKCk7XG5cbiAgcmV0dXJuIHN2Z05vZGVzO1xufVxuIiwiLy8gU3R1YiB0byBnZXQgRDMgZWl0aGVyIHZpYSBOUE0gb3IgZnJvbSB0aGUgZ2xvYmFsIG9iamVjdFxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuZDM7XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5cbnZhciBkYWdyZTtcblxuaWYgKHJlcXVpcmUpIHtcbiAgdHJ5IHtcbiAgICBkYWdyZSA9IHJlcXVpcmUoXCJkYWdyZVwiKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuaWYgKCFkYWdyZSkge1xuICBkYWdyZSA9IHdpbmRvdy5kYWdyZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkYWdyZTtcbiIsIi8qIGdsb2JhbCB3aW5kb3cgKi9cblxudmFyIGdyYXBobGliO1xuXG5pZiAocmVxdWlyZSkge1xuICB0cnkge1xuICAgIGdyYXBobGliID0gcmVxdWlyZShcImdyYXBobGliXCIpO1xuICB9IGNhdGNoIChlKSB7fVxufVxuXG5pZiAoIWdyYXBobGliKSB7XG4gIGdyYXBobGliID0gd2luZG93LmdyYXBobGliO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdyYXBobGliO1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIG5vZGU6IHJlcXVpcmUoXCIuL2ludGVyc2VjdC1ub2RlXCIpLFxuICBjaXJjbGU6IHJlcXVpcmUoXCIuL2ludGVyc2VjdC1jaXJjbGVcIiksXG4gIGVsbGlwc2U6IHJlcXVpcmUoXCIuL2ludGVyc2VjdC1lbGxpcHNlXCIpLFxuICBwb2x5Z29uOiByZXF1aXJlKFwiLi9pbnRlcnNlY3QtcG9seWdvblwiKSxcbiAgcmVjdDogcmVxdWlyZShcIi4vaW50ZXJzZWN0LXJlY3RcIilcbn07XG4iLCJ2YXIgaW50ZXJzZWN0RWxsaXBzZSA9IHJlcXVpcmUoXCIuL2ludGVyc2VjdC1lbGxpcHNlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdENpcmNsZTtcblxuZnVuY3Rpb24gaW50ZXJzZWN0Q2lyY2xlKG5vZGUsIHJ4LCBwb2ludCkge1xuICByZXR1cm4gaW50ZXJzZWN0RWxsaXBzZShub2RlLCByeCwgcngsIHBvaW50KTtcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gaW50ZXJzZWN0RWxsaXBzZTtcblxuZnVuY3Rpb24gaW50ZXJzZWN0RWxsaXBzZShub2RlLCByeCwgcnksIHBvaW50KSB7XG4gIC8vIEZvcm11bGFlIGZyb206IGh0dHA6Ly9tYXRod29ybGQud29sZnJhbS5jb20vRWxsaXBzZS1MaW5lSW50ZXJzZWN0aW9uLmh0bWxcblxuICB2YXIgY3ggPSBub2RlLng7XG4gIHZhciBjeSA9IG5vZGUueTtcblxuICB2YXIgcHggPSBjeCAtIHBvaW50Lng7XG4gIHZhciBweSA9IGN5IC0gcG9pbnQueTtcblxuICB2YXIgZGV0ID0gTWF0aC5zcXJ0KHJ4ICogcnggKiBweSAqIHB5ICsgcnkgKiByeSAqIHB4ICogcHgpO1xuXG4gIHZhciBkeCA9IE1hdGguYWJzKHJ4ICogcnkgKiBweCAvIGRldCk7XG4gIGlmIChwb2ludC54IDwgY3gpIHtcbiAgICBkeCA9IC1keDtcbiAgfVxuICB2YXIgZHkgPSBNYXRoLmFicyhyeCAqIHJ5ICogcHkgLyBkZXQpO1xuICBpZiAocG9pbnQueSA8IGN5KSB7XG4gICAgZHkgPSAtZHk7XG4gIH1cblxuICByZXR1cm4ge3g6IGN4ICsgZHgsIHk6IGN5ICsgZHl9O1xufVxuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdExpbmU7XG5cbi8qXG4gKiBSZXR1cm5zIHRoZSBwb2ludCBhdCB3aGljaCB0d28gbGluZXMsIHAgYW5kIHEsIGludGVyc2VjdCBvciByZXR1cm5zXG4gKiB1bmRlZmluZWQgaWYgdGhleSBkbyBub3QgaW50ZXJzZWN0LlxuICovXG5mdW5jdGlvbiBpbnRlcnNlY3RMaW5lKHAxLCBwMiwgcTEsIHEyKSB7XG4gIC8vIEFsZ29yaXRobSBmcm9tIEouIEF2cm8sIChlZC4pIEdyYXBoaWNzIEdlbXMsIE5vIDIsIE1vcmdhbiBLYXVmbWFubiwgMTk5NCxcbiAgLy8gcDcgYW5kIHA0NzMuXG5cbiAgdmFyIGExLCBhMiwgYjEsIGIyLCBjMSwgYzI7XG4gIHZhciByMSwgcjIgLCByMywgcjQ7XG4gIHZhciBkZW5vbSwgb2Zmc2V0LCBudW07XG4gIHZhciB4LCB5O1xuXG4gIC8vIENvbXB1dGUgYTEsIGIxLCBjMSwgd2hlcmUgbGluZSBqb2luaW5nIHBvaW50cyAxIGFuZCAyIGlzIEYoeCx5KSA9IGExIHggK1xuICAvLyBiMSB5ICsgYzEgPSAwLlxuICBhMSA9IHAyLnkgLSBwMS55O1xuICBiMSA9IHAxLnggLSBwMi54O1xuICBjMSA9IChwMi54ICogcDEueSkgLSAocDEueCAqIHAyLnkpO1xuXG4gIC8vIENvbXB1dGUgcjMgYW5kIHI0LlxuICByMyA9ICgoYTEgKiBxMS54KSArIChiMSAqIHExLnkpICsgYzEpO1xuICByNCA9ICgoYTEgKiBxMi54KSArIChiMSAqIHEyLnkpICsgYzEpO1xuXG4gIC8vIENoZWNrIHNpZ25zIG9mIHIzIGFuZCByNC4gSWYgYm90aCBwb2ludCAzIGFuZCBwb2ludCA0IGxpZSBvblxuICAvLyBzYW1lIHNpZGUgb2YgbGluZSAxLCB0aGUgbGluZSBzZWdtZW50cyBkbyBub3QgaW50ZXJzZWN0LlxuICBpZiAoKHIzICE9PSAwKSAmJiAocjQgIT09IDApICYmIHNhbWVTaWduKHIzLCByNCkpIHtcbiAgICByZXR1cm4gLypET05UX0lOVEVSU0VDVCovO1xuICB9XG5cbiAgLy8gQ29tcHV0ZSBhMiwgYjIsIGMyIHdoZXJlIGxpbmUgam9pbmluZyBwb2ludHMgMyBhbmQgNCBpcyBHKHgseSkgPSBhMiB4ICsgYjIgeSArIGMyID0gMFxuICBhMiA9IHEyLnkgLSBxMS55O1xuICBiMiA9IHExLnggLSBxMi54O1xuICBjMiA9IChxMi54ICogcTEueSkgLSAocTEueCAqIHEyLnkpO1xuXG4gIC8vIENvbXB1dGUgcjEgYW5kIHIyXG4gIHIxID0gKGEyICogcDEueCkgKyAoYjIgKiBwMS55KSArIGMyO1xuICByMiA9IChhMiAqIHAyLngpICsgKGIyICogcDIueSkgKyBjMjtcblxuICAvLyBDaGVjayBzaWducyBvZiByMSBhbmQgcjIuIElmIGJvdGggcG9pbnQgMSBhbmQgcG9pbnQgMiBsaWVcbiAgLy8gb24gc2FtZSBzaWRlIG9mIHNlY29uZCBsaW5lIHNlZ21lbnQsIHRoZSBsaW5lIHNlZ21lbnRzIGRvXG4gIC8vIG5vdCBpbnRlcnNlY3QuXG4gIGlmICgocjEgIT09IDApICYmIChyMiAhPT0gMCkgJiYgKHNhbWVTaWduKHIxLCByMikpKSB7XG4gICAgcmV0dXJuIC8qRE9OVF9JTlRFUlNFQ1QqLztcbiAgfVxuXG4gIC8vIExpbmUgc2VnbWVudHMgaW50ZXJzZWN0OiBjb21wdXRlIGludGVyc2VjdGlvbiBwb2ludC5cbiAgZGVub20gPSAoYTEgKiBiMikgLSAoYTIgKiBiMSk7XG4gIGlmIChkZW5vbSA9PT0gMCkge1xuICAgIHJldHVybiAvKkNPTExJTkVBUiovO1xuICB9XG5cbiAgb2Zmc2V0ID0gTWF0aC5hYnMoZGVub20gLyAyKTtcblxuICAvLyBUaGUgZGVub20vMiBpcyB0byBnZXQgcm91bmRpbmcgaW5zdGVhZCBvZiB0cnVuY2F0aW5nLiBJdFxuICAvLyBpcyBhZGRlZCBvciBzdWJ0cmFjdGVkIHRvIHRoZSBudW1lcmF0b3IsIGRlcGVuZGluZyB1cG9uIHRoZVxuICAvLyBzaWduIG9mIHRoZSBudW1lcmF0b3IuXG4gIG51bSA9IChiMSAqIGMyKSAtIChiMiAqIGMxKTtcbiAgeCA9IChudW0gPCAwKSA/ICgobnVtIC0gb2Zmc2V0KSAvIGRlbm9tKSA6ICgobnVtICsgb2Zmc2V0KSAvIGRlbm9tKTtcblxuICBudW0gPSAoYTIgKiBjMSkgLSAoYTEgKiBjMik7XG4gIHkgPSAobnVtIDwgMCkgPyAoKG51bSAtIG9mZnNldCkgLyBkZW5vbSkgOiAoKG51bSArIG9mZnNldCkgLyBkZW5vbSk7XG5cbiAgcmV0dXJuIHsgeDogeCwgeTogeSB9O1xufVxuXG5mdW5jdGlvbiBzYW1lU2lnbihyMSwgcjIpIHtcbiAgcmV0dXJuIHIxICogcjIgPiAwO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBpbnRlcnNlY3ROb2RlO1xuXG5mdW5jdGlvbiBpbnRlcnNlY3ROb2RlKG5vZGUsIHBvaW50KSB7XG4gIHJldHVybiBub2RlLmludGVyc2VjdChwb2ludCk7XG59XG4iLCJ2YXIgaW50ZXJzZWN0TGluZSA9IHJlcXVpcmUoXCIuL2ludGVyc2VjdC1saW5lXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdFBvbHlnb247XG5cbi8qXG4gKiBSZXR1cm5zIHRoZSBwb2ludCAoe3gsIHl9KSBhdCB3aGljaCB0aGUgcG9pbnQgYXJndW1lbnQgaW50ZXJzZWN0cyB3aXRoIHRoZVxuICogbm9kZSBhcmd1bWVudCBhc3N1bWluZyB0aGF0IGl0IGhhcyB0aGUgc2hhcGUgc3BlY2lmaWVkIGJ5IHBvbHlnb24uXG4gKi9cbmZ1bmN0aW9uIGludGVyc2VjdFBvbHlnb24obm9kZSwgcG9seVBvaW50cywgcG9pbnQpIHtcbiAgdmFyIHgxID0gbm9kZS54O1xuICB2YXIgeTEgPSBub2RlLnk7XG5cbiAgdmFyIGludGVyc2VjdGlvbnMgPSBbXTtcblxuICB2YXIgbWluWCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWSxcbiAgICAgIG1pblkgPSBOdW1iZXIuUE9TSVRJVkVfSU5GSU5JVFk7XG4gIHBvbHlQb2ludHMuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgIG1pblggPSBNYXRoLm1pbihtaW5YLCBlbnRyeS54KTtcbiAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgZW50cnkueSk7XG4gIH0pO1xuXG4gIHZhciBsZWZ0ID0geDEgLSBub2RlLndpZHRoIC8gMiAtIG1pblg7XG4gIHZhciB0b3AgPSAgeTEgLSBub2RlLmhlaWdodCAvIDIgLSBtaW5ZO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcG9seVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBwMSA9IHBvbHlQb2ludHNbaV07XG4gICAgdmFyIHAyID0gcG9seVBvaW50c1tpIDwgcG9seVBvaW50cy5sZW5ndGggLSAxID8gaSArIDEgOiAwXTtcbiAgICB2YXIgaW50ZXJzZWN0ID0gaW50ZXJzZWN0TGluZShub2RlLCBwb2ludCxcbiAgICAgIHt4OiBsZWZ0ICsgcDEueCwgeTogdG9wICsgcDEueX0sIHt4OiBsZWZ0ICsgcDIueCwgeTogdG9wICsgcDIueX0pO1xuICAgIGlmIChpbnRlcnNlY3QpIHtcbiAgICAgIGludGVyc2VjdGlvbnMucHVzaChpbnRlcnNlY3QpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghaW50ZXJzZWN0aW9ucy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmxvZyhcIk5PIElOVEVSU0VDVElPTiBGT1VORCwgUkVUVVJOIE5PREUgQ0VOVEVSXCIsIG5vZGUpO1xuICAgIHJldHVybiBub2RlO1xuICB9XG5cbiAgaWYgKGludGVyc2VjdGlvbnMubGVuZ3RoID4gMSkge1xuICAgIC8vIE1vcmUgaW50ZXJzZWN0aW9ucywgZmluZCB0aGUgb25lIG5lYXJlc3QgdG8gZWRnZSBlbmQgcG9pbnRcbiAgICBpbnRlcnNlY3Rpb25zLnNvcnQoZnVuY3Rpb24ocCwgcSkge1xuICAgICAgdmFyIHBkeCA9IHAueCAtIHBvaW50LngsXG4gICAgICAgICAgcGR5ID0gcC55IC0gcG9pbnQueSxcbiAgICAgICAgICBkaXN0cCA9IE1hdGguc3FydChwZHggKiBwZHggKyBwZHkgKiBwZHkpLFxuXG4gICAgICAgICAgcWR4ID0gcS54IC0gcG9pbnQueCxcbiAgICAgICAgICBxZHkgPSBxLnkgLSBwb2ludC55LFxuICAgICAgICAgIGRpc3RxID0gTWF0aC5zcXJ0KHFkeCAqIHFkeCArIHFkeSAqIHFkeSk7XG5cbiAgICAgIHJldHVybiAoZGlzdHAgPCBkaXN0cSkgPyAtMSA6IChkaXN0cCA9PT0gZGlzdHEgPyAwIDogMSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIGludGVyc2VjdGlvbnNbMF07XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGludGVyc2VjdFJlY3Q7XG5cbmZ1bmN0aW9uIGludGVyc2VjdFJlY3Qobm9kZSwgcG9pbnQpIHtcbiAgdmFyIHggPSBub2RlLng7XG4gIHZhciB5ID0gbm9kZS55O1xuXG4gIC8vIFJlY3RhbmdsZSBpbnRlcnNlY3Rpb24gYWxnb3JpdGhtIGZyb206XG4gIC8vIGh0dHA6Ly9tYXRoLnN0YWNrZXhjaGFuZ2UuY29tL3F1ZXN0aW9ucy8xMDgxMTMvZmluZC1lZGdlLWJldHdlZW4tdHdvLWJveGVzXG4gIHZhciBkeCA9IHBvaW50LnggLSB4O1xuICB2YXIgZHkgPSBwb2ludC55IC0geTtcbiAgdmFyIHcgPSBub2RlLndpZHRoIC8gMjtcbiAgdmFyIGggPSBub2RlLmhlaWdodCAvIDI7XG5cbiAgdmFyIHN4LCBzeTtcbiAgaWYgKE1hdGguYWJzKGR5KSAqIHcgPiBNYXRoLmFicyhkeCkgKiBoKSB7XG4gICAgLy8gSW50ZXJzZWN0aW9uIGlzIHRvcCBvciBib3R0b20gb2YgcmVjdC5cbiAgICBpZiAoZHkgPCAwKSB7XG4gICAgICBoID0gLWg7XG4gICAgfVxuICAgIHN4ID0gZHkgPT09IDAgPyAwIDogaCAqIGR4IC8gZHk7XG4gICAgc3kgPSBoO1xuICB9IGVsc2Uge1xuICAgIC8vIEludGVyc2VjdGlvbiBpcyBsZWZ0IG9yIHJpZ2h0IG9mIHJlY3QuXG4gICAgaWYgKGR4IDwgMCkge1xuICAgICAgdyA9IC13O1xuICAgIH1cbiAgICBzeCA9IHc7XG4gICAgc3kgPSBkeCA9PT0gMCA/IDAgOiB3ICogZHkgLyBkeDtcbiAgfVxuXG4gIHJldHVybiB7eDogeCArIHN4LCB5OiB5ICsgc3l9O1xufVxuIiwidmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhZGRIdG1sTGFiZWw7XG5cbmZ1bmN0aW9uIGFkZEh0bWxMYWJlbChyb290LCBub2RlKSB7XG4gIHZhciBmbyA9IHJvb3RcbiAgICAuYXBwZW5kKFwiZm9yZWlnbk9iamVjdFwiKVxuICAgICAgLmF0dHIoXCJ3aWR0aFwiLCBcIjEwMDAwMFwiKTtcblxuICB2YXIgZGl2ID0gZm9cbiAgICAuYXBwZW5kKFwieGh0bWw6ZGl2XCIpO1xuXG4gIHZhciBsYWJlbCA9IG5vZGUubGFiZWw7XG4gIHN3aXRjaCh0eXBlb2YgbGFiZWwpIHtcbiAgICBjYXNlIFwiZnVuY3Rpb25cIjpcbiAgICAgIGRpdi5pbnNlcnQobGFiZWwpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgLy8gQ3VycmVudGx5IHdlIGFzc3VtZSB0aGlzIGlzIGEgRE9NIG9iamVjdC5cbiAgICAgIGRpdi5pbnNlcnQoZnVuY3Rpb24oKSB7IHJldHVybiBsYWJlbDsgfSk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OiBkaXYuaHRtbChsYWJlbCk7XG4gIH1cblxuICB1dGlsLmFwcGx5U3R5bGUoZGl2LCBub2RlLmxhYmVsU3R5bGUpO1xuICBkaXYuc3R5bGUoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpO1xuICAvLyBGaXggZm9yIGZpcmVmb3hcbiAgZGl2LnN0eWxlKFwid2hpdGUtc3BhY2VcIiwgXCJub3dyYXBcIik7XG5cbiAgLy8gVE9ETyBmaW5kIGEgYmV0dGVyIHdheSB0byBnZXQgZGltZW5zaW9ucyBmb3IgZm9yZWlnbk9iamVjdHMuLi5cbiAgdmFyIHcsIGg7XG4gIGRpdlxuICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdyA9IHRoaXMuY2xpZW50V2lkdGg7XG4gICAgICBoID0gdGhpcy5jbGllbnRIZWlnaHQ7XG4gICAgfSk7XG5cbiAgZm9cbiAgICAuYXR0cihcIndpZHRoXCIsIHcpXG4gICAgLmF0dHIoXCJoZWlnaHRcIiwgaCk7XG5cbiAgcmV0dXJuIGZvO1xufVxuIiwidmFyIGFkZFRleHRMYWJlbCA9IHJlcXVpcmUoXCIuL2FkZC10ZXh0LWxhYmVsXCIpLFxuICAgIGFkZEh0bWxMYWJlbCA9IHJlcXVpcmUoXCIuL2FkZC1odG1sLWxhYmVsXCIpLFxuICAgIGFkZFNWR0xhYmVsICA9IHJlcXVpcmUoXCIuL2FkZC1zdmctbGFiZWxcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTGFiZWw7XG5cbmZ1bmN0aW9uIGFkZExhYmVsKHJvb3QsIG5vZGUsIGxvY2F0aW9uKSB7XG4gIHZhciBsYWJlbCA9IG5vZGUubGFiZWw7XG4gIHZhciBsYWJlbFN2ZyA9IHJvb3QuYXBwZW5kKFwiZ1wiKTtcblxuICAvLyBBbGxvdyB0aGUgbGFiZWwgdG8gYmUgYSBzdHJpbmcsIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgRE9NIGVsZW1lbnQsIG9yXG4gIC8vIGEgRE9NIGVsZW1lbnQgaXRzZWxmLlxuICBpZiAobm9kZS5sYWJlbFR5cGUgPT09IFwic3ZnXCIpIHtcbiAgICBhZGRTVkdMYWJlbChsYWJlbFN2Zywgbm9kZSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGxhYmVsICE9PSBcInN0cmluZ1wiIHx8IG5vZGUubGFiZWxUeXBlID09PSBcImh0bWxcIikge1xuICAgIGFkZEh0bWxMYWJlbChsYWJlbFN2Zywgbm9kZSk7XG4gIH0gZWxzZSB7XG4gICAgYWRkVGV4dExhYmVsKGxhYmVsU3ZnLCBub2RlKTtcbiAgfVxuXG4gIHZhciBsYWJlbEJCb3ggPSBsYWJlbFN2Zy5ub2RlKCkuZ2V0QkJveCgpO1xuICB2YXIgeTtcbiAgc3dpdGNoKGxvY2F0aW9uKSB7XG4gICAgY2FzZSBcInRvcFwiOlxuICAgICAgeSA9ICgtbm9kZS5oZWlnaHQgLyAyKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJib3R0b21cIjpcbiAgICAgIHkgPSAobm9kZS5oZWlnaHQgLyAyKSAtIGxhYmVsQkJveC5oZWlnaHQ7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgeSA9ICgtbGFiZWxCQm94LmhlaWdodCAvIDIpO1xuICB9XG4gIGxhYmVsU3ZnLmF0dHIoXCJ0cmFuc2Zvcm1cIixcbiAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZShcIiArICgtbGFiZWxCQm94LndpZHRoIC8gMikgKyBcIixcIiArIHkgKyBcIilcIik7XG5cbiAgcmV0dXJuIGxhYmVsU3ZnO1xufVxuIiwidmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vdXRpbFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBhZGRTVkdMYWJlbDtcblxuZnVuY3Rpb24gYWRkU1ZHTGFiZWwocm9vdCwgbm9kZSkge1xuICB2YXIgZG9tTm9kZSA9IHJvb3Q7XG5cbiAgZG9tTm9kZS5ub2RlKCkuYXBwZW5kQ2hpbGQobm9kZS5sYWJlbCk7XG5cbiAgdXRpbC5hcHBseVN0eWxlKGRvbU5vZGUsIG5vZGUubGFiZWxTdHlsZSk7XG5cbiAgcmV0dXJuIGRvbU5vZGU7XG59XG4iLCJ2YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZFRleHRMYWJlbDtcblxuLypcbiAqIEF0dGFjaGVzIGEgdGV4dCBsYWJlbCB0byB0aGUgc3BlY2lmaWVkIHJvb3QuIEhhbmRsZXMgZXNjYXBlIHNlcXVlbmNlcy5cbiAqL1xuZnVuY3Rpb24gYWRkVGV4dExhYmVsKHJvb3QsIG5vZGUpIHtcbiAgdmFyIGRvbU5vZGUgPSByb290LmFwcGVuZChcInRleHRcIik7XG5cbiAgdmFyIGxpbmVzID0gcHJvY2Vzc0VzY2FwZVNlcXVlbmNlcyhub2RlLmxhYmVsKS5zcGxpdChcIlxcblwiKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIGRvbU5vZGVcbiAgICAgIC5hcHBlbmQoXCJ0c3BhblwiKVxuICAgICAgICAuYXR0cihcInhtbDpzcGFjZVwiLCBcInByZXNlcnZlXCIpXG4gICAgICAgIC5hdHRyKFwiZHlcIiwgXCIxZW1cIilcbiAgICAgICAgLmF0dHIoXCJ4XCIsIFwiMVwiKVxuICAgICAgICAudGV4dChsaW5lc1tpXSk7XG4gIH1cblxuICB1dGlsLmFwcGx5U3R5bGUoZG9tTm9kZSwgbm9kZS5sYWJlbFN0eWxlKTtcblxuICByZXR1cm4gZG9tTm9kZTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc0VzY2FwZVNlcXVlbmNlcyh0ZXh0KSB7XG4gIHZhciBuZXdUZXh0ID0gXCJcIixcbiAgICAgIGVzY2FwZWQgPSBmYWxzZSxcbiAgICAgIGNoO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyArK2kpIHtcbiAgICBjaCA9IHRleHRbaV07XG4gICAgaWYgKGVzY2FwZWQpIHtcbiAgICAgIHN3aXRjaChjaCkge1xuICAgICAgICBjYXNlIFwiblwiOiBuZXdUZXh0ICs9IFwiXFxuXCI7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiBuZXdUZXh0ICs9IGNoO1xuICAgICAgfVxuICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAoY2ggPT09IFwiXFxcXFwiKSB7XG4gICAgICBlc2NhcGVkID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3VGV4dCArPSBjaDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld1RleHQ7XG59XG4iLCIvKiBnbG9iYWwgd2luZG93ICovXG5cbnZhciBsb2Rhc2g7XG5cbmlmIChyZXF1aXJlKSB7XG4gIHRyeSB7XG4gICAgbG9kYXNoID0gcmVxdWlyZShcImxvZGFzaFwiKTtcbiAgfSBjYXRjaCAoZSkge31cbn1cblxuaWYgKCFsb2Rhc2gpIHtcbiAgbG9kYXNoID0gd2luZG93Ll87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbG9kYXNoO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKSxcbiAgICBkMyA9IHJlcXVpcmUoXCIuL2QzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBvc2l0aW9uQ2x1c3RlcnM7XG5cbmZ1bmN0aW9uIHBvc2l0aW9uQ2x1c3RlcnMoc2VsZWN0aW9uLCBnKSB7XG4gIHZhciBjcmVhdGVkID0gc2VsZWN0aW9uLmZpbHRlcihmdW5jdGlvbigpIHsgcmV0dXJuICFkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcInVwZGF0ZVwiKTsgfSk7XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHYpIHtcbiAgICB2YXIgbm9kZSA9IGcubm9kZSh2KTtcbiAgICByZXR1cm4gXCJ0cmFuc2xhdGUoXCIgKyBub2RlLnggKyBcIixcIiArIG5vZGUueSArIFwiKVwiO1xuICB9XG5cbiAgY3JlYXRlZC5hdHRyKFwidHJhbnNmb3JtXCIsIHRyYW5zbGF0ZSk7XG5cbiAgdXRpbC5hcHBseVRyYW5zaXRpb24oc2VsZWN0aW9uLCBnKVxuICAgICAgLnN0eWxlKFwib3BhY2l0eVwiLCAxKVxuICAgICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgdHJhbnNsYXRlKTtcblxuICB1dGlsLmFwcGx5VHJhbnNpdGlvbihjcmVhdGVkLnNlbGVjdEFsbChcInJlY3RcIiksIGcpXG4gICAgICAuYXR0cihcIndpZHRoXCIsIGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGcubm9kZSh2KS53aWR0aDsgfSlcbiAgICAgIC5hdHRyKFwiaGVpZ2h0XCIsIGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGcubm9kZSh2KS5oZWlnaHQ7IH0pXG4gICAgICAuYXR0cihcInhcIiwgZnVuY3Rpb24odikge1xuICAgICAgICB2YXIgbm9kZSA9IGcubm9kZSh2KTtcbiAgICAgICAgcmV0dXJuIC1ub2RlLndpZHRoIC8gMjtcbiAgICAgIH0pXG4gICAgICAuYXR0cihcInlcIiwgZnVuY3Rpb24odikge1xuICAgICAgICB2YXIgbm9kZSA9IGcubm9kZSh2KTtcbiAgICAgICAgcmV0dXJuIC1ub2RlLmhlaWdodCAvIDI7XG4gICAgICB9KTtcblxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKSxcbiAgICBkMyA9IHJlcXVpcmUoXCIuL2QzXCIpLFxuICAgIF8gPSByZXF1aXJlKFwiLi9sb2Rhc2hcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gcG9zaXRpb25FZGdlTGFiZWxzO1xuXG5mdW5jdGlvbiBwb3NpdGlvbkVkZ2VMYWJlbHMoc2VsZWN0aW9uLCBnKSB7XG4gIHZhciBjcmVhdGVkID0gc2VsZWN0aW9uLmZpbHRlcihmdW5jdGlvbigpIHsgcmV0dXJuICFkMy5zZWxlY3QodGhpcykuY2xhc3NlZChcInVwZGF0ZVwiKTsgfSk7XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKGUpIHtcbiAgICB2YXIgZWRnZSA9IGcuZWRnZShlKTtcbiAgICByZXR1cm4gXy5oYXMoZWRnZSwgXCJ4XCIpID8gXCJ0cmFuc2xhdGUoXCIgKyBlZGdlLnggKyBcIixcIiArIGVkZ2UueSArIFwiKVwiIDogXCJcIjtcbiAgfVxuXG4gIGNyZWF0ZWQuYXR0cihcInRyYW5zZm9ybVwiLCB0cmFuc2xhdGUpO1xuXG4gIHV0aWwuYXBwbHlUcmFuc2l0aW9uKHNlbGVjdGlvbiwgZylcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgdHJhbnNsYXRlKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIiksXG4gICAgZDMgPSByZXF1aXJlKFwiLi9kM1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBwb3NpdGlvbk5vZGVzO1xuXG5mdW5jdGlvbiBwb3NpdGlvbk5vZGVzKHNlbGVjdGlvbiwgZykge1xuICB2YXIgY3JlYXRlZCA9IHNlbGVjdGlvbi5maWx0ZXIoZnVuY3Rpb24oKSB7IHJldHVybiAhZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoXCJ1cGRhdGVcIik7IH0pO1xuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZSh2KSB7XG4gICAgdmFyIG5vZGUgPSBnLm5vZGUodik7XG4gICAgcmV0dXJuIFwidHJhbnNsYXRlKFwiICsgbm9kZS54ICsgXCIsXCIgKyBub2RlLnkgKyBcIilcIjtcbiAgfVxuXG4gIGNyZWF0ZWQuYXR0cihcInRyYW5zZm9ybVwiLCB0cmFuc2xhdGUpO1xuXG4gIHV0aWwuYXBwbHlUcmFuc2l0aW9uKHNlbGVjdGlvbiwgZylcbiAgICAuc3R5bGUoXCJvcGFjaXR5XCIsIDEpXG4gICAgLmF0dHIoXCJ0cmFuc2Zvcm1cIiwgdHJhbnNsYXRlKTtcbn1cbiIsInZhciBfID0gcmVxdWlyZShcIi4vbG9kYXNoXCIpLFxuICAgIGxheW91dCA9IHJlcXVpcmUoXCIuL2RhZ3JlXCIpLmxheW91dDtcblxubW9kdWxlLmV4cG9ydHMgPSByZW5kZXI7XG5cbi8vIFRoaXMgZGVzaWduIGlzIGJhc2VkIG9uIGh0dHA6Ly9ib3N0Lm9ja3Mub3JnL21pa2UvY2hhcnQvLlxuZnVuY3Rpb24gcmVuZGVyKCkge1xuICB2YXIgY3JlYXRlTm9kZXMgPSByZXF1aXJlKFwiLi9jcmVhdGUtbm9kZXNcIiksXG4gICAgICBjcmVhdGVDbHVzdGVycyA9IHJlcXVpcmUoXCIuL2NyZWF0ZS1jbHVzdGVyc1wiKSxcbiAgICAgIGNyZWF0ZUVkZ2VMYWJlbHMgPSByZXF1aXJlKFwiLi9jcmVhdGUtZWRnZS1sYWJlbHNcIiksXG4gICAgICBjcmVhdGVFZGdlUGF0aHMgPSByZXF1aXJlKFwiLi9jcmVhdGUtZWRnZS1wYXRoc1wiKSxcbiAgICAgIHBvc2l0aW9uTm9kZXMgPSByZXF1aXJlKFwiLi9wb3NpdGlvbi1ub2Rlc1wiKSxcbiAgICAgIHBvc2l0aW9uRWRnZUxhYmVscyA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uLWVkZ2UtbGFiZWxzXCIpLFxuICAgICAgcG9zaXRpb25DbHVzdGVycyA9IHJlcXVpcmUoXCIuL3Bvc2l0aW9uLWNsdXN0ZXJzXCIpLFxuICAgICAgc2hhcGVzID0gcmVxdWlyZShcIi4vc2hhcGVzXCIpLFxuICAgICAgYXJyb3dzID0gcmVxdWlyZShcIi4vYXJyb3dzXCIpO1xuXG4gIHZhciBmbiA9IGZ1bmN0aW9uKHN2ZywgZykge1xuICAgIHByZVByb2Nlc3NHcmFwaChnKTtcblxuICAgIHZhciBvdXRwdXRHcm91cCA9IGNyZWF0ZU9yU2VsZWN0R3JvdXAoc3ZnLCBcIm91dHB1dFwiKSxcbiAgICAgICAgY2x1c3RlcnNHcm91cCA9IGNyZWF0ZU9yU2VsZWN0R3JvdXAob3V0cHV0R3JvdXAsIFwiY2x1c3RlcnNcIiksXG4gICAgICAgIGVkZ2VQYXRoc0dyb3VwID0gY3JlYXRlT3JTZWxlY3RHcm91cChvdXRwdXRHcm91cCwgXCJlZGdlUGF0aHNcIiksXG4gICAgICAgIGVkZ2VMYWJlbHMgPSBjcmVhdGVFZGdlTGFiZWxzKGNyZWF0ZU9yU2VsZWN0R3JvdXAob3V0cHV0R3JvdXAsIFwiZWRnZUxhYmVsc1wiKSwgZyksXG4gICAgICAgIG5vZGVzID0gY3JlYXRlTm9kZXMoY3JlYXRlT3JTZWxlY3RHcm91cChvdXRwdXRHcm91cCwgXCJub2Rlc1wiKSwgZywgc2hhcGVzKTtcblxuICAgIGxheW91dChnKTtcblxuICAgIHBvc2l0aW9uTm9kZXMobm9kZXMsIGcpO1xuICAgIHBvc2l0aW9uRWRnZUxhYmVscyhlZGdlTGFiZWxzLCBnKTtcbiAgICBjcmVhdGVFZGdlUGF0aHMoZWRnZVBhdGhzR3JvdXAsIGcsIGFycm93cyk7XG5cbiAgICB2YXIgY2x1c3RlcnMgPSBjcmVhdGVDbHVzdGVycyhjbHVzdGVyc0dyb3VwLCBnKTtcbiAgICBwb3NpdGlvbkNsdXN0ZXJzKGNsdXN0ZXJzLCBnKTtcblxuICAgIHBvc3RQcm9jZXNzR3JhcGgoZyk7XG4gIH07XG5cbiAgZm4uY3JlYXRlTm9kZXMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNyZWF0ZU5vZGVzO1xuICAgIGNyZWF0ZU5vZGVzID0gdmFsdWU7XG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIGZuLmNyZWF0ZUNsdXN0ZXJzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjcmVhdGVDbHVzdGVycztcbiAgICBjcmVhdGVDbHVzdGVycyA9IHZhbHVlO1xuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICBmbi5jcmVhdGVFZGdlTGFiZWxzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjcmVhdGVFZGdlTGFiZWxzO1xuICAgIGNyZWF0ZUVkZ2VMYWJlbHMgPSB2YWx1ZTtcbiAgICByZXR1cm4gZm47XG4gIH07XG5cbiAgZm4uY3JlYXRlRWRnZVBhdGhzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjcmVhdGVFZGdlUGF0aHM7XG4gICAgY3JlYXRlRWRnZVBhdGhzID0gdmFsdWU7XG4gICAgcmV0dXJuIGZuO1xuICB9O1xuXG4gIGZuLnNoYXBlcyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2hhcGVzO1xuICAgIHNoYXBlcyA9IHZhbHVlO1xuICAgIHJldHVybiBmbjtcbiAgfTtcblxuICBmbi5hcnJvd3MgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGFycm93cztcbiAgICBhcnJvd3MgPSB2YWx1ZTtcbiAgICByZXR1cm4gZm47XG4gIH07XG5cbiAgcmV0dXJuIGZuO1xufVxuXG52YXIgTk9ERV9ERUZBVUxUX0FUVFJTID0ge1xuICBwYWRkaW5nTGVmdDogMTAsXG4gIHBhZGRpbmdSaWdodDogMTAsXG4gIHBhZGRpbmdUb3A6IDEwLFxuICBwYWRkaW5nQm90dG9tOiAxMCxcbiAgcng6IDAsXG4gIHJ5OiAwLFxuICBzaGFwZTogXCJyZWN0XCJcbn07XG5cbnZhciBFREdFX0RFRkFVTFRfQVRUUlMgPSB7XG4gIGFycm93aGVhZDogXCJub3JtYWxcIixcbiAgbGluZUludGVycG9sYXRlOiBcImxpbmVhclwiXG59O1xuXG5mdW5jdGlvbiBwcmVQcm9jZXNzR3JhcGgoZykge1xuICBnLm5vZGVzKCkuZm9yRWFjaChmdW5jdGlvbih2KSB7XG4gICAgdmFyIG5vZGUgPSBnLm5vZGUodik7XG4gICAgaWYgKCFfLmhhcyhub2RlLCBcImxhYmVsXCIpICYmICFnLmNoaWxkcmVuKHYpLmxlbmd0aCkgeyBub2RlLmxhYmVsID0gdjsgfVxuXG4gICAgaWYgKF8uaGFzKG5vZGUsIFwicGFkZGluZ1hcIikpIHtcbiAgICAgIF8uZGVmYXVsdHMobm9kZSwge1xuICAgICAgICBwYWRkaW5nTGVmdDogbm9kZS5wYWRkaW5nWCxcbiAgICAgICAgcGFkZGluZ1JpZ2h0OiBub2RlLnBhZGRpbmdYXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoXy5oYXMobm9kZSwgXCJwYWRkaW5nWVwiKSkge1xuICAgICAgXy5kZWZhdWx0cyhub2RlLCB7XG4gICAgICAgIHBhZGRpbmdUb3A6IG5vZGUucGFkZGluZ1ksXG4gICAgICAgIHBhZGRpbmdCb3R0b206IG5vZGUucGFkZGluZ1lcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChfLmhhcyhub2RlLCBcInBhZGRpbmdcIikpIHtcbiAgICAgIF8uZGVmYXVsdHMobm9kZSwge1xuICAgICAgICBwYWRkaW5nTGVmdDogbm9kZS5wYWRkaW5nLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6IG5vZGUucGFkZGluZyxcbiAgICAgICAgcGFkZGluZ1RvcDogbm9kZS5wYWRkaW5nLFxuICAgICAgICBwYWRkaW5nQm90dG9tOiBub2RlLnBhZGRpbmdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIF8uZGVmYXVsdHMobm9kZSwgTk9ERV9ERUZBVUxUX0FUVFJTKTtcblxuICAgIF8uZWFjaChbXCJwYWRkaW5nTGVmdFwiLCBcInBhZGRpbmdSaWdodFwiLCBcInBhZGRpbmdUb3BcIiwgXCJwYWRkaW5nQm90dG9tXCJdLCBmdW5jdGlvbihrKSB7XG4gICAgICBub2RlW2tdID0gTnVtYmVyKG5vZGVba10pO1xuICAgIH0pO1xuXG4gICAgLy8gU2F2ZSBkaW1lbnNpb25zIGZvciByZXN0b3JlIGR1cmluZyBwb3N0LXByb2Nlc3NpbmdcbiAgICBpZiAoXy5oYXMobm9kZSwgXCJ3aWR0aFwiKSkgeyBub2RlLl9wcmV2V2lkdGggPSBub2RlLndpZHRoOyB9XG4gICAgaWYgKF8uaGFzKG5vZGUsIFwiaGVpZ2h0XCIpKSB7IG5vZGUuX3ByZXZIZWlnaHQgPSBub2RlLmhlaWdodDsgfVxuICB9KTtcblxuICBnLmVkZ2VzKCkuZm9yRWFjaChmdW5jdGlvbihlKSB7XG4gICAgdmFyIGVkZ2UgPSBnLmVkZ2UoZSk7XG4gICAgaWYgKCFfLmhhcyhlZGdlLCBcImxhYmVsXCIpKSB7IGVkZ2UubGFiZWwgPSBcIlwiOyB9XG4gICAgXy5kZWZhdWx0cyhlZGdlLCBFREdFX0RFRkFVTFRfQVRUUlMpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcG9zdFByb2Nlc3NHcmFwaChnKSB7XG4gIF8uZWFjaChnLm5vZGVzKCksIGZ1bmN0aW9uKHYpIHtcbiAgICB2YXIgbm9kZSA9IGcubm9kZSh2KTtcblxuICAgIC8vIFJlc3RvcmUgb3JpZ2luYWwgZGltZW5zaW9uc1xuICAgIGlmIChfLmhhcyhub2RlLCBcIl9wcmV2V2lkdGhcIikpIHtcbiAgICAgIG5vZGUud2lkdGggPSBub2RlLl9wcmV2V2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBub2RlLndpZHRoO1xuICAgIH1cblxuICAgIGlmIChfLmhhcyhub2RlLCBcIl9wcmV2SGVpZ2h0XCIpKSB7XG4gICAgICBub2RlLmhlaWdodCA9IG5vZGUuX3ByZXZIZWlnaHQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBub2RlLmhlaWdodDtcbiAgICB9XG5cbiAgICBkZWxldGUgbm9kZS5fcHJldldpZHRoO1xuICAgIGRlbGV0ZSBub2RlLl9wcmV2SGVpZ2h0O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT3JTZWxlY3RHcm91cChyb290LCBuYW1lKSB7XG4gIHZhciBzZWxlY3Rpb24gPSByb290LnNlbGVjdChcImcuXCIgKyBuYW1lKTtcbiAgaWYgKHNlbGVjdGlvbi5lbXB0eSgpKSB7XG4gICAgc2VsZWN0aW9uID0gcm9vdC5hcHBlbmQoXCJnXCIpLmF0dHIoXCJjbGFzc1wiLCBuYW1lKTtcbiAgfVxuICByZXR1cm4gc2VsZWN0aW9uO1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBpbnRlcnNlY3RSZWN0ID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0L2ludGVyc2VjdC1yZWN0XCIpLFxuICAgIGludGVyc2VjdEVsbGlwc2UgPSByZXF1aXJlKFwiLi9pbnRlcnNlY3QvaW50ZXJzZWN0LWVsbGlwc2VcIiksXG4gICAgaW50ZXJzZWN0Q2lyY2xlID0gcmVxdWlyZShcIi4vaW50ZXJzZWN0L2ludGVyc2VjdC1jaXJjbGVcIiksXG4gICAgaW50ZXJzZWN0UG9seWdvbiA9IHJlcXVpcmUoXCIuL2ludGVyc2VjdC9pbnRlcnNlY3QtcG9seWdvblwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHJlY3Q6IHJlY3QsXG4gIGVsbGlwc2U6IGVsbGlwc2UsXG4gIGNpcmNsZTogY2lyY2xlLFxuICBkaWFtb25kOiBkaWFtb25kXG59O1xuXG5mdW5jdGlvbiByZWN0KHBhcmVudCwgYmJveCwgbm9kZSkge1xuICB2YXIgc2hhcGVTdmcgPSBwYXJlbnQuaW5zZXJ0KFwicmVjdFwiLCBcIjpmaXJzdC1jaGlsZFwiKVxuICAgICAgICAuYXR0cihcInJ4XCIsIG5vZGUucngpXG4gICAgICAgIC5hdHRyKFwicnlcIiwgbm9kZS5yeSlcbiAgICAgICAgLmF0dHIoXCJ4XCIsIC1iYm94LndpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoXCJ5XCIsIC1iYm94LmhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKFwid2lkdGhcIiwgYmJveC53aWR0aClcbiAgICAgICAgLmF0dHIoXCJoZWlnaHRcIiwgYmJveC5oZWlnaHQpO1xuXG4gIG5vZGUuaW50ZXJzZWN0ID0gZnVuY3Rpb24ocG9pbnQpIHtcbiAgICByZXR1cm4gaW50ZXJzZWN0UmVjdChub2RlLCBwb2ludCk7XG4gIH07XG5cbiAgcmV0dXJuIHNoYXBlU3ZnO1xufVxuXG5mdW5jdGlvbiBlbGxpcHNlKHBhcmVudCwgYmJveCwgbm9kZSkge1xuICB2YXIgcnggPSBiYm94LndpZHRoIC8gMixcbiAgICAgIHJ5ID0gYmJveC5oZWlnaHQgLyAyLFxuICAgICAgc2hhcGVTdmcgPSBwYXJlbnQuaW5zZXJ0KFwiZWxsaXBzZVwiLCBcIjpmaXJzdC1jaGlsZFwiKVxuICAgICAgICAuYXR0cihcInhcIiwgLWJib3gud2lkdGggLyAyKVxuICAgICAgICAuYXR0cihcInlcIiwgLWJib3guaGVpZ2h0IC8gMilcbiAgICAgICAgLmF0dHIoXCJyeFwiLCByeClcbiAgICAgICAgLmF0dHIoXCJyeVwiLCByeSk7XG5cbiAgbm9kZS5pbnRlcnNlY3QgPSBmdW5jdGlvbihwb2ludCkge1xuICAgIHJldHVybiBpbnRlcnNlY3RFbGxpcHNlKG5vZGUsIHJ4LCByeSwgcG9pbnQpO1xuICB9O1xuXG4gIHJldHVybiBzaGFwZVN2Zztcbn1cblxuZnVuY3Rpb24gY2lyY2xlKHBhcmVudCwgYmJveCwgbm9kZSkge1xuICB2YXIgciA9IE1hdGgubWF4KGJib3gud2lkdGgsIGJib3guaGVpZ2h0KSAvIDIsXG4gICAgICBzaGFwZVN2ZyA9IHBhcmVudC5pbnNlcnQoXCJjaXJjbGVcIiwgXCI6Zmlyc3QtY2hpbGRcIilcbiAgICAgICAgLmF0dHIoXCJ4XCIsIC1iYm94LndpZHRoIC8gMilcbiAgICAgICAgLmF0dHIoXCJ5XCIsIC1iYm94LmhlaWdodCAvIDIpXG4gICAgICAgIC5hdHRyKFwiclwiLCByKTtcblxuICBub2RlLmludGVyc2VjdCA9IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgcmV0dXJuIGludGVyc2VjdENpcmNsZShub2RlLCByLCBwb2ludCk7XG4gIH07XG5cbiAgcmV0dXJuIHNoYXBlU3ZnO1xufVxuXG4vLyBDaXJjdW1zY3JpYmUgYW4gZWxsaXBzZSBmb3IgdGhlIGJvdW5kaW5nIGJveCB3aXRoIGEgZGlhbW9uZCBzaGFwZS4gSSBkZXJpdmVkXG4vLyB0aGUgZnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBkaWFtb25kIHNoYXBlIGZyb206XG4vLyBodHRwOi8vbWF0aGZvcnVtLm9yZy9rYi9tZXNzYWdlLmpzcGE/bWVzc2FnZUlEPTM3NTAyMzZcbmZ1bmN0aW9uIGRpYW1vbmQocGFyZW50LCBiYm94LCBub2RlKSB7XG4gIHZhciB3ID0gKGJib3gud2lkdGggKiBNYXRoLlNRUlQyKSAvIDIsXG4gICAgICBoID0gKGJib3guaGVpZ2h0ICogTWF0aC5TUVJUMikgLyAyLFxuICAgICAgcG9pbnRzID0gW1xuICAgICAgICB7IHg6ICAwLCB5OiAtaCB9LFxuICAgICAgICB7IHg6IC13LCB5OiAgMCB9LFxuICAgICAgICB7IHg6ICAwLCB5OiAgaCB9LFxuICAgICAgICB7IHg6ICB3LCB5OiAgMCB9XG4gICAgICBdLFxuICAgICAgc2hhcGVTdmcgPSBwYXJlbnQuaW5zZXJ0KFwicG9seWdvblwiLCBcIjpmaXJzdC1jaGlsZFwiKVxuICAgICAgICAuYXR0cihcInBvaW50c1wiLCBwb2ludHMubWFwKGZ1bmN0aW9uKHApIHsgcmV0dXJuIHAueCArIFwiLFwiICsgcC55OyB9KS5qb2luKFwiIFwiKSk7XG5cbiAgbm9kZS5pbnRlcnNlY3QgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuIGludGVyc2VjdFBvbHlnb24obm9kZSwgcG9pbnRzLCBwKTtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVTdmc7XG59XG4iLCJ2YXIgXyA9IHJlcXVpcmUoXCIuL2xvZGFzaFwiKTtcblxuLy8gUHVibGljIHV0aWxpdHkgZnVuY3Rpb25zXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgaXNTdWJncmFwaDogaXNTdWJncmFwaCxcbiAgZWRnZVRvSWQ6IGVkZ2VUb0lkLFxuICBhcHBseVN0eWxlOiBhcHBseVN0eWxlLFxuICBhcHBseUNsYXNzOiBhcHBseUNsYXNzLFxuICBhcHBseVRyYW5zaXRpb246IGFwcGx5VHJhbnNpdGlvblxufTtcblxuLypcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIG5vZGUgaW4gdGhlIGdyYXBoIGlzIGEgc3ViZ3JhcGggbm9kZS4gQVxuICogc3ViZ3JhcGggbm9kZSBpcyBvbmUgdGhhdCBjb250YWlucyBvdGhlciBub2Rlcy5cbiAqL1xuZnVuY3Rpb24gaXNTdWJncmFwaChnLCB2KSB7XG4gIHJldHVybiAhIWcuY2hpbGRyZW4odikubGVuZ3RoO1xufVxuXG5mdW5jdGlvbiBlZGdlVG9JZChlKSB7XG4gIHJldHVybiBlc2NhcGVJZChlLnYpICsgXCI6XCIgKyBlc2NhcGVJZChlLncpICsgXCI6XCIgKyBlc2NhcGVJZChlLm5hbWUpO1xufVxuXG52YXIgSURfREVMSU0gPSAvOi9nO1xuZnVuY3Rpb24gZXNjYXBlSWQoc3RyKSB7XG4gIHJldHVybiBzdHIgPyBTdHJpbmcoc3RyKS5yZXBsYWNlKElEX0RFTElNLCBcIlxcXFw6XCIpIDogXCJcIjtcbn1cblxuZnVuY3Rpb24gYXBwbHlTdHlsZShkb20sIHN0eWxlRm4pIHtcbiAgaWYgKHN0eWxlRm4pIHtcbiAgICBkb20uYXR0cihcInN0eWxlXCIsIHN0eWxlRm4pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5Q2xhc3MoZG9tLCBjbGFzc0ZuLCBvdGhlckNsYXNzZXMpIHtcbiAgaWYgKGNsYXNzRm4pIHtcbiAgICBkb21cbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgY2xhc3NGbilcbiAgICAgIC5hdHRyKFwiY2xhc3NcIiwgb3RoZXJDbGFzc2VzICsgXCIgXCIgKyBkb20uYXR0cihcImNsYXNzXCIpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhcHBseVRyYW5zaXRpb24oc2VsZWN0aW9uLCBnKSB7XG4gIHZhciBncmFwaCA9IGcuZ3JhcGgoKTtcblxuICBpZiAoXy5pc1BsYWluT2JqZWN0KGdyYXBoKSkge1xuICAgIHZhciB0cmFuc2l0aW9uID0gZ3JhcGgudHJhbnNpdGlvbjtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKHRyYW5zaXRpb24pKSB7XG4gICAgICByZXR1cm4gdHJhbnNpdGlvbihzZWxlY3Rpb24pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzZWxlY3Rpb247XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiMC40LjE0XCI7XG4iXX0=
