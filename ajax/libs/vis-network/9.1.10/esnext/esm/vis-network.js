/**
 * vis-network
 * https://visjs.github.io/vis-network/
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 9.1.10
 * @date    2025-05-10T16:57:42.930Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */

import Emitter from 'component-emitter';
import { topMost, forEach, deepExtend, overrideOpacity, bridgeObject, selectiveNotDeepExtend, parseColor, mergeOptions, fillIfDefined, VALIDATOR_PRINT_STYLE, selectiveDeepExtend, isString, Alea, HSVToHex, Hammer, easingFunctions, getAbsoluteLeft, getAbsoluteTop, Popup, recursiveDOMDelete, Validator, Configurator, Activator } from 'vis-util/esnext/esm/vis-util.js';
import { isDataViewLike, DataSet } from 'vis-data/esnext/esm/vis-data.js';
import { v4 } from 'uuid';
import keycharm from 'keycharm';

/**
 * Draw a circle.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - The radius of the circle.
 */
function drawCircle(ctx, x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.closePath();
}
/**
 * Draw a square.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the width and height of the square.
 */
function drawSquare(ctx, x, y, r) {
    ctx.beginPath();
    ctx.rect(x - r, y - r, r * 2, r * 2);
    ctx.closePath();
}
/**
 * Draw an equilateral triangle standing on a side.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the length of the sides.
 * @remarks
 * http://en.wikipedia.org/wiki/Equilateral_triangle
 */
function drawTriangle(ctx, x, y, r) {
    ctx.beginPath();
    // the change in radius and the offset is here to center the shape
    r *= 1.15;
    y += 0.275 * r;
    const s = r * 2;
    const s2 = s / 2;
    const ir = (Math.sqrt(3) / 6) * s; // radius of inner circle
    const h = Math.sqrt(s * s - s2 * s2); // height
    ctx.moveTo(x, y - (h - ir));
    ctx.lineTo(x + s2, y + ir);
    ctx.lineTo(x - s2, y + ir);
    ctx.lineTo(x, y - (h - ir));
    ctx.closePath();
}
/**
 * Draw an equilateral triangle standing on a vertex.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the length of the sides.
 * @remarks
 * http://en.wikipedia.org/wiki/Equilateral_triangle
 */
function drawTriangleDown(ctx, x, y, r) {
    ctx.beginPath();
    // the change in radius and the offset is here to center the shape
    r *= 1.15;
    y -= 0.275 * r;
    const s = r * 2;
    const s2 = s / 2;
    const ir = (Math.sqrt(3) / 6) * s; // radius of inner circle
    const h = Math.sqrt(s * s - s2 * s2); // height
    ctx.moveTo(x, y + (h - ir));
    ctx.lineTo(x + s2, y - ir);
    ctx.lineTo(x - s2, y - ir);
    ctx.lineTo(x, y + (h - ir));
    ctx.closePath();
}
/**
 * Draw a star.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - The outer radius of the star.
 */
function drawStar(ctx, x, y, r) {
    // http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
    ctx.beginPath();
    // the change in radius and the offset is here to center the shape
    r *= 0.82;
    y += 0.1 * r;
    for (let n = 0; n < 10; n++) {
        const radius = n % 2 === 0 ? r * 1.3 : r * 0.5;
        ctx.lineTo(x + radius * Math.sin((n * 2 * Math.PI) / 10), y - radius * Math.cos((n * 2 * Math.PI) / 10));
    }
    ctx.closePath();
}
/**
 * Draw a diamond.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - Half of the width and height of the diamond.
 * @remarks
 * http://www.html5canvastutorials.com/labs/html5-canvas-star-spinner/
 */
function drawDiamond(ctx, x, y, r) {
    ctx.beginPath();
    ctx.lineTo(x, y + r);
    ctx.lineTo(x + r, y);
    ctx.lineTo(x, y - r);
    ctx.lineTo(x - r, y);
    ctx.closePath();
}
/**
 * Draw a rectangle with rounded corners.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param w - The width of the rectangle.
 * @param h - The height of the rectangle.
 * @param r - The radius of the corners.
 * @remarks
 * http://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
 */
function drawRoundRect(ctx, x, y, w, h, r) {
    const r2d = Math.PI / 180;
    if (w - 2 * r < 0) {
        r = w / 2;
    } //ensure that the radius isn't too large for x
    if (h - 2 * r < 0) {
        r = h / 2;
    } //ensure that the radius isn't too large for y
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.arc(x + w - r, y + r, r, r2d * 270, r2d * 360, false);
    ctx.lineTo(x + w, y + h - r);
    ctx.arc(x + w - r, y + h - r, r, 0, r2d * 90, false);
    ctx.lineTo(x + r, y + h);
    ctx.arc(x + r, y + h - r, r, r2d * 90, r2d * 180, false);
    ctx.lineTo(x, y + r);
    ctx.arc(x + r, y + r, r, r2d * 180, r2d * 270, false);
    ctx.closePath();
}
/**
 * Draw an ellipse.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param w - The width of the ellipse.
 * @param h - The height of the ellipse.
 * @remarks
 * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
 *
 * Postfix '_vis' added to discern it from standard method ellipse().
 */
function drawEllipse(ctx, x, y, w, h) {
    const kappa = 0.5522848, ox = (w / 2) * kappa, // control point offset horizontal
    oy = (h / 2) * kappa, // control point offset vertical
    xe = x + w, // x-end
    ye = y + h, // y-end
    xm = x + w / 2, // x-middle
    ym = y + h / 2; // y-middle
    ctx.beginPath();
    ctx.moveTo(x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.closePath();
}
/**
 * Draw an isometric cylinder.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param w - The width of the database.
 * @param h - The height of the database.
 * @remarks
 * http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas
 */
function drawDatabase(ctx, x, y, w, h) {
    const f = 1 / 3;
    const wEllipse = w;
    const hEllipse = h * f;
    const kappa = 0.5522848, ox = (wEllipse / 2) * kappa, // control point offset horizontal
    oy = (hEllipse / 2) * kappa, // control point offset vertical
    xe = x + wEllipse, // x-end
    ye = y + hEllipse, // y-end
    xm = x + wEllipse / 2, // x-middle
    ym = y + hEllipse / 2, // y-middle
    ymb = y + (h - hEllipse / 2), // y-midlle, bottom ellipse
    yeb = y + h; // y-end, bottom ellipse
    ctx.beginPath();
    ctx.moveTo(xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
    ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
    ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
    ctx.lineTo(xe, ymb);
    ctx.bezierCurveTo(xe, ymb + oy, xm + ox, yeb, xm, yeb);
    ctx.bezierCurveTo(xm - ox, yeb, x, ymb + oy, x, ymb);
    ctx.lineTo(x, ym);
}
/**
 * Draw a dashed line.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The start position on the x axis.
 * @param y - The start position on the y axis.
 * @param x2 - The end position on the x axis.
 * @param y2 - The end position on the y axis.
 * @param pattern - List of lengths starting with line and then alternating between space and line.
 * @author David Jordan
 * @remarks
 * date 2012-08-08
 * http://stackoverflow.com/questions/4576724/dotted-stroke-in-canvas
 */
function drawDashedLine(ctx, x, y, x2, y2, pattern) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    const patternLength = pattern.length;
    const dx = x2 - x;
    const dy = y2 - y;
    const slope = dy / dx;
    let distRemaining = Math.sqrt(dx * dx + dy * dy);
    let patternIndex = 0;
    let draw = true;
    let xStep = 0;
    let dashLength = +pattern[0];
    while (distRemaining >= 0.1) {
        dashLength = +pattern[patternIndex++ % patternLength];
        if (dashLength > distRemaining) {
            dashLength = distRemaining;
        }
        xStep = Math.sqrt((dashLength * dashLength) / (1 + slope * slope));
        xStep = dx < 0 ? -xStep : xStep;
        x += xStep;
        y += slope * xStep;
        if (draw === true) {
            ctx.lineTo(x, y);
        }
        else {
            ctx.moveTo(x, y);
        }
        distRemaining -= dashLength;
        draw = !draw;
    }
}
/**
 * Draw a hexagon.
 *
 * @param ctx - The context this shape will be rendered to.
 * @param x - The position of the center on the x axis.
 * @param y - The position of the center on the y axis.
 * @param r - The radius of the hexagon.
 */
function drawHexagon(ctx, x, y, r) {
    ctx.beginPath();
    const sides = 6;
    const a = (Math.PI * 2) / sides;
    ctx.moveTo(x + r, y);
    for (let i = 1; i < sides; i++) {
        ctx.lineTo(x + r * Math.cos(a * i), y + r * Math.sin(a * i));
    }
    ctx.closePath();
}
const shapeMap = {
    circle: drawCircle,
    dashedLine: drawDashedLine,
    database: drawDatabase,
    diamond: drawDiamond,
    ellipse: drawEllipse,
    ellipse_vis: drawEllipse,
    hexagon: drawHexagon,
    roundRect: drawRoundRect,
    square: drawSquare,
    star: drawStar,
    triangle: drawTriangle,
    triangleDown: drawTriangleDown,
};
/**
 * Returns either custom or native drawing function base on supplied name.
 *
 * @param name - The name of the function. Either the name of a
 * CanvasRenderingContext2D property or an export from shapes.ts without the
 * draw prefix.
 * @returns The function that can be used for rendering. In case of native
 * CanvasRenderingContext2D function the API is normalized to
 * `(ctx: CanvasRenderingContext2D, ...originalArgs) => void`.
 */
function getShape(name) {
    if (Object.prototype.hasOwnProperty.call(shapeMap, name)) {
        return shapeMap[name];
    }
    else {
        return function (ctx, ...args) {
            CanvasRenderingContext2D.prototype[name].call(ctx, args);
        };
    }
}

/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */

/**
 * Parse a text source containing data in DOT language into a JSON object.
 * The object contains two lists: one with nodes and one with edges.
 *
 * DOT language reference: http://www.graphviz.org/doc/info/lang.html
 *
 * DOT language attributes: http://graphviz.org/content/attrs
 *
 * @param {string} data     Text containing a graph in DOT-notation
 * @returns {object} graph   An object containing two parameters:
 *                          {Object[]} nodes
 *                          {Object[]} edges
 *
 * -------------------------------------------
 * TODO
 * ====
 *
 * For label handling, this is an incomplete implementation. From docs (quote #3015):
 *
 * > the escape sequences "\n", "\l" and "\r" divide the label into lines, centered,
 * > left-justified, and right-justified, respectively.
 *
 * Source: http://www.graphviz.org/content/attrs#kescString
 *
 * > As another aid for readability, dot allows double-quoted strings to span multiple physical
 * > lines using the standard C convention of a backslash immediately preceding a newline
 * > character
 * > In addition, double-quoted strings can be concatenated using a '+' operator.
 * > As HTML strings can contain newline characters, which are used solely for formatting,
 * > the language does not allow escaped newlines or concatenation operators to be used
 * > within them.
 *
 * - Currently, only '\\n' is handled
 * - Note that text explicitly says 'labels'; the dot parser currently handles escape
 *   sequences in **all** strings.
 */
function parseDOT(data) {
  dot = data;
  return parseGraph();
}

// mapping of attributes from DOT (the keys) to vis.js (the values)
var NODE_ATTR_MAPPING = {
  fontsize: "font.size",
  fontcolor: "font.color",
  labelfontcolor: "font.color",
  fontname: "font.face",
  color: ["color.border", "color.background"],
  fillcolor: "color.background",
  tooltip: "title",
  labeltooltip: "title",
};
var EDGE_ATTR_MAPPING = Object.create(NODE_ATTR_MAPPING);
EDGE_ATTR_MAPPING.color = "color.color";
EDGE_ATTR_MAPPING.style = "dashes";

// token types enumeration
var TOKENTYPE = {
  NULL: 0,
  DELIMITER: 1,
  IDENTIFIER: 2,
  UNKNOWN: 3,
};

// map with all delimiters
var DELIMITERS = {
  "{": true,
  "}": true,
  "[": true,
  "]": true,
  ";": true,
  "=": true,
  ",": true,

  "->": true,
  "--": true,
};

var dot = ""; // current dot file
var index = 0; // current index in dot file
var c = ""; // current token character in expr
var token = ""; // current token
var tokenType = TOKENTYPE.NULL; // type of the token

/**
 * Get the first character from the dot file.
 * The character is stored into the char c. If the end of the dot file is
 * reached, the function puts an empty string in c.
 */
function first() {
  index = 0;
  c = dot.charAt(0);
}

/**
 * Get the next character from the dot file.
 * The character is stored into the char c. If the end of the dot file is
 * reached, the function puts an empty string in c.
 */
function next() {
  index++;
  c = dot.charAt(index);
}

/**
 * Preview the next character from the dot file.
 *
 * @returns {string} cNext
 */
function nextPreview() {
  return dot.charAt(index + 1);
}

/**
 * Test whether given character is alphabetic or numeric ( a-zA-Z_0-9.:# )
 *
 * @param {string} c
 * @returns {boolean} isAlphaNumeric
 */
function isAlphaNumeric(c) {
  var charCode = c.charCodeAt(0);

  if (charCode < 47) {
    // #.
    return charCode === 35 || charCode === 46;
  }
  if (charCode < 59) {
    // 0-9 and :
    return charCode > 47;
  }
  if (charCode < 91) {
    // A-Z
    return charCode > 64;
  }
  if (charCode < 96) {
    // _
    return charCode === 95;
  }
  if (charCode < 123) {
    // a-z
    return charCode > 96;
  }

  return false;
}

/**
 * Merge all options of object b into object b
 *
 * @param {object} a
 * @param {object} b
 * @returns {object} a
 */
function merge(a, b) {
  if (!a) {
    a = {};
  }

  if (b) {
    for (var name in b) {
      if (b.hasOwnProperty(name)) {
        a[name] = b[name];
      }
    }
  }
  return a;
}

/**
 * Set a value in an object, where the provided parameter name can be a
 * path with nested parameters. For example:
 *
 *     var obj = {a: 2};
 *     setValue(obj, 'b.c', 3);     // obj = {a: 2, b: {c: 3}}
 *
 * @param {object} obj
 * @param {string} path  A parameter name or dot-separated parameter path,
 *                      like "color.highlight.border".
 * @param {*} value
 */
function setValue(obj, path, value) {
  var keys = path.split(".");
  var o = obj;
  while (keys.length) {
    var key = keys.shift();
    if (keys.length) {
      // this isn't the end point
      if (!o[key]) {
        o[key] = {};
      }
      o = o[key];
    } else {
      // this is the end point
      o[key] = value;
    }
  }
}

/**
 * Add a node to a graph object. If there is already a node with
 * the same id, their attributes will be merged.
 *
 * @param {object} graph
 * @param {object} node
 */
function addNode(graph, node) {
  var i, len;
  var current = null;

  // find root graph (in case of subgraph)
  var graphs = [graph]; // list with all graphs from current graph to root graph
  var root = graph;
  while (root.parent) {
    graphs.push(root.parent);
    root = root.parent;
  }

  // find existing node (at root level) by its id
  if (root.nodes) {
    for (i = 0, len = root.nodes.length; i < len; i++) {
      if (node.id === root.nodes[i].id) {
        current = root.nodes[i];
        break;
      }
    }
  }

  if (!current) {
    // this is a new node
    current = {
      id: node.id,
    };
    if (graph.node) {
      // clone default attributes
      current.attr = merge(current.attr, graph.node);
    }
  }

  // add node to this (sub)graph and all its parent graphs
  for (i = graphs.length - 1; i >= 0; i--) {
    var g = graphs[i];

    if (!g.nodes) {
      g.nodes = [];
    }
    if (g.nodes.indexOf(current) === -1) {
      g.nodes.push(current);
    }
  }

  // merge attributes
  if (node.attr) {
    current.attr = merge(current.attr, node.attr);
  }
}

/**
 * Add an edge to a graph object
 *
 * @param {object} graph
 * @param {object} edge
 */
function addEdge(graph, edge) {
  if (!graph.edges) {
    graph.edges = [];
  }
  graph.edges.push(edge);
  if (graph.edge) {
    var attr = merge({}, graph.edge); // clone default attributes
    edge.attr = merge(attr, edge.attr); // merge attributes
  }
}

/**
 * Create an edge to a graph object
 *
 * @param {object} graph
 * @param {string | number | object} from
 * @param {string | number | object} to
 * @param {string} type
 * @param {object | null} attr
 * @returns {object} edge
 */
function createEdge(graph, from, to, type, attr) {
  var edge = {
    from: from,
    to: to,
    type: type,
  };

  if (graph.edge) {
    edge.attr = merge({}, graph.edge); // clone default attributes
  }
  edge.attr = merge(edge.attr || {}, attr); // merge attributes

  // Move arrows attribute from attr to edge temporally created in
  // parseAttributeList().
  if (attr != null) {
    if (attr.hasOwnProperty("arrows") && attr["arrows"] != null) {
      edge["arrows"] = { to: { enabled: true, type: attr.arrows.type } };
      attr["arrows"] = null;
    }
  }
  return edge;
}

/**
 * Get next token in the current dot file.
 * The token and token type are available as token and tokenType
 */
function getToken() {
  tokenType = TOKENTYPE.NULL;
  token = "";

  // skip over whitespaces
  while (c === " " || c === "\t" || c === "\n" || c === "\r") {
    // space, tab, enter
    next();
  }

  do {
    var isComment = false;

    // skip comment
    if (c === "#") {
      // find the previous non-space character
      var i = index - 1;
      while (dot.charAt(i) === " " || dot.charAt(i) === "\t") {
        i--;
      }
      if (dot.charAt(i) === "\n" || dot.charAt(i) === "") {
        // the # is at the start of a line, this is indeed a line comment
        while (c != "" && c != "\n") {
          next();
        }
        isComment = true;
      }
    }
    if (c === "/" && nextPreview() === "/") {
      // skip line comment
      while (c != "" && c != "\n") {
        next();
      }
      isComment = true;
    }
    if (c === "/" && nextPreview() === "*") {
      // skip block comment
      while (c != "") {
        if (c === "*" && nextPreview() === "/") {
          // end of block comment found. skip these last two characters
          next();
          next();
          break;
        } else {
          next();
        }
      }
      isComment = true;
    }

    // skip over whitespaces
    while (c === " " || c === "\t" || c === "\n" || c === "\r") {
      // space, tab, enter
      next();
    }
  } while (isComment);

  // check for end of dot file
  if (c === "") {
    // token is still empty
    tokenType = TOKENTYPE.DELIMITER;
    return;
  }

  // check for delimiters consisting of 2 characters
  var c2 = c + nextPreview();
  if (DELIMITERS[c2]) {
    tokenType = TOKENTYPE.DELIMITER;
    token = c2;
    next();
    next();
    return;
  }

  // check for delimiters consisting of 1 character
  if (DELIMITERS[c]) {
    tokenType = TOKENTYPE.DELIMITER;
    token = c;
    next();
    return;
  }

  // check for an identifier (number or string)
  // TODO: more precise parsing of numbers/strings (and the port separator ':')
  if (isAlphaNumeric(c) || c === "-") {
    token += c;
    next();

    while (isAlphaNumeric(c)) {
      token += c;
      next();
    }
    if (token === "false") {
      token = false; // convert to boolean
    } else if (token === "true") {
      token = true; // convert to boolean
    } else if (!isNaN(Number(token))) {
      token = Number(token); // convert to number
    }
    tokenType = TOKENTYPE.IDENTIFIER;
    return;
  }

  // check for a string enclosed by double quotes
  if (c === '"') {
    next();
    while (c != "" && (c != '"' || (c === '"' && nextPreview() === '"'))) {
      if (c === '"') {
        // skip the escape character
        token += c;
        next();
      } else if (c === "\\" && nextPreview() === "n") {
        // Honor a newline escape sequence
        token += "\n";
        next();
      } else {
        token += c;
      }
      next();
    }
    if (c != '"') {
      throw newSyntaxError('End of string " expected');
    }
    next();
    tokenType = TOKENTYPE.IDENTIFIER;
    return;
  }

  // something unknown is found, wrong characters, a syntax error
  tokenType = TOKENTYPE.UNKNOWN;
  while (c != "") {
    token += c;
    next();
  }
  throw new SyntaxError('Syntax error in part "' + chop(token, 30) + '"');
}

/**
 * Parse a graph.
 *
 * @returns {object} graph
 */
function parseGraph() {
  var graph = {};

  first();
  getToken();

  // optional strict keyword
  if (token === "strict") {
    graph.strict = true;
    getToken();
  }

  // graph or digraph keyword
  if (token === "graph" || token === "digraph") {
    graph.type = token;
    getToken();
  }

  // optional graph id
  if (tokenType === TOKENTYPE.IDENTIFIER) {
    graph.id = token;
    getToken();
  }

  // open angle bracket
  if (token != "{") {
    throw newSyntaxError("Angle bracket { expected");
  }
  getToken();

  // statements
  parseStatements(graph);

  // close angle bracket
  if (token != "}") {
    throw newSyntaxError("Angle bracket } expected");
  }
  getToken();

  // end of file
  if (token !== "") {
    throw newSyntaxError("End of file expected");
  }
  getToken();

  // remove temporary default options
  delete graph.node;
  delete graph.edge;
  delete graph.graph;

  return graph;
}

/**
 * Parse a list with statements.
 *
 * @param {object} graph
 */
function parseStatements(graph) {
  while (token !== "" && token != "}") {
    parseStatement(graph);
    if (token === ";") {
      getToken();
    }
  }
}

/**
 * Parse a single statement. Can be a an attribute statement, node
 * statement, a series of node statements and edge statements, or a
 * parameter.
 *
 * @param {object} graph
 */
function parseStatement(graph) {
  // parse subgraph
  var subgraph = parseSubgraph(graph);
  if (subgraph) {
    // edge statements
    parseEdge(graph, subgraph);

    return;
  }

  // parse an attribute statement
  var attr = parseAttributeStatement(graph);
  if (attr) {
    return;
  }

  // parse node
  if (tokenType != TOKENTYPE.IDENTIFIER) {
    throw newSyntaxError("Identifier expected");
  }
  var id = token; // id can be a string or a number
  getToken();

  if (token === "=") {
    // id statement
    getToken();
    if (tokenType != TOKENTYPE.IDENTIFIER) {
      throw newSyntaxError("Identifier expected");
    }
    graph[id] = token;
    getToken();
    // TODO: implement comma separated list with "a_list: ID=ID [','] [a_list] "
  } else {
    parseNodeStatement(graph, id);
  }
}

/**
 * Parse a subgraph
 *
 * @param {object} graph    parent graph object
 * @returns {object | null} subgraph
 */
function parseSubgraph(graph) {
  var subgraph = null;

  // optional subgraph keyword
  if (token === "subgraph") {
    subgraph = {};
    subgraph.type = "subgraph";
    getToken();

    // optional graph id
    if (tokenType === TOKENTYPE.IDENTIFIER) {
      subgraph.id = token;
      getToken();
    }
  }

  // open angle bracket
  if (token === "{") {
    getToken();

    if (!subgraph) {
      subgraph = {};
    }
    subgraph.parent = graph;
    subgraph.node = graph.node;
    subgraph.edge = graph.edge;
    subgraph.graph = graph.graph;

    // statements
    parseStatements(subgraph);

    // close angle bracket
    if (token != "}") {
      throw newSyntaxError("Angle bracket } expected");
    }
    getToken();

    // remove temporary default options
    delete subgraph.node;
    delete subgraph.edge;
    delete subgraph.graph;
    delete subgraph.parent;

    // register at the parent graph
    if (!graph.subgraphs) {
      graph.subgraphs = [];
    }
    graph.subgraphs.push(subgraph);
  }

  return subgraph;
}

/**
 * parse an attribute statement like "node [shape=circle fontSize=16]".
 * Available keywords are 'node', 'edge', 'graph'.
 * The previous list with default attributes will be replaced
 *
 * @param {object} graph
 * @returns {string | null} keyword Returns the name of the parsed attribute
 *                                  (node, edge, graph), or null if nothing
 *                                  is parsed.
 */
function parseAttributeStatement(graph) {
  // attribute statements
  if (token === "node") {
    getToken();

    // node attributes
    graph.node = parseAttributeList();
    return "node";
  } else if (token === "edge") {
    getToken();

    // edge attributes
    graph.edge = parseAttributeList();
    return "edge";
  } else if (token === "graph") {
    getToken();

    // graph attributes
    graph.graph = parseAttributeList();
    return "graph";
  }

  return null;
}

/**
 * parse a node statement
 *
 * @param {object} graph
 * @param {string | number} id
 */
function parseNodeStatement(graph, id) {
  // node statement
  var node = {
    id: id,
  };
  var attr = parseAttributeList();
  if (attr) {
    node.attr = attr;
  }
  addNode(graph, node);

  // edge statements
  parseEdge(graph, id);
}

/**
 * Parse an edge or a series of edges
 *
 * @param {object} graph
 * @param {string | number} from        Id of the from node
 */
function parseEdge(graph, from) {
  while (token === "->" || token === "--") {
    var to;
    var type = token;
    getToken();

    var subgraph = parseSubgraph(graph);
    if (subgraph) {
      to = subgraph;
    } else {
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError("Identifier or subgraph expected");
      }
      to = token;
      addNode(graph, {
        id: to,
      });
      getToken();
    }

    // parse edge attributes
    var attr = parseAttributeList();

    // create edge
    var edge = createEdge(graph, from, to, type, attr);
    addEdge(graph, edge);

    from = to;
  }
}

/**
 * Parse a set with attributes,
 * for example [label="1.000", shape=solid]
 *
 * @returns {object | null} attr
 */
function parseAttributeList() {
  var i;
  var attr = null;

  // edge styles of dot and vis
  var edgeStyles = {
    dashed: true,
    solid: false,
    dotted: [1, 5],
  };

  /**
   * Define arrow types.
   * vis currently supports types defined in 'arrowTypes'.
   * Details of arrow shapes are described in
   * http://www.graphviz.org/content/arrow-shapes
   */
  var arrowTypes = {
    dot: "circle",
    box: "box",
    crow: "crow",
    curve: "curve",
    icurve: "inv_curve",
    normal: "triangle",
    inv: "inv_triangle",
    diamond: "diamond",
    tee: "bar",
    vee: "vee",
  };

  /**
   * 'attr_list' contains attributes for checking if some of them are affected
   * later. For instance, both of 'arrowhead' and 'dir' (edge style defined
   * in DOT) make changes to 'arrows' attribute in vis.
   */
  var attr_list = new Array();
  var attr_names = new Array(); // used for checking the case.

  // parse attributes
  while (token === "[") {
    getToken();
    attr = {};
    while (token !== "" && token != "]") {
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError("Attribute name expected");
      }
      var name = token;

      getToken();
      if (token != "=") {
        throw newSyntaxError("Equal sign = expected");
      }
      getToken();

      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError("Attribute value expected");
      }
      var value = token;

      // convert from dot style to vis
      if (name === "style") {
        value = edgeStyles[value];
      }

      var arrowType;
      if (name === "arrowhead") {
        arrowType = arrowTypes[value];
        name = "arrows";
        value = { to: { enabled: true, type: arrowType } };
      }

      if (name === "arrowtail") {
        arrowType = arrowTypes[value];
        name = "arrows";
        value = { from: { enabled: true, type: arrowType } };
      }

      attr_list.push({ attr: attr, name: name, value: value });
      attr_names.push(name);

      getToken();
      if (token == ",") {
        getToken();
      }
    }

    if (token != "]") {
      throw newSyntaxError("Bracket ] expected");
    }
    getToken();
  }

  /**
   * As explained in [1], graphviz has limitations for combination of
   * arrow[head|tail] and dir. If attribute list includes 'dir',
   * following cases just be supported.
   *   1. both or none + arrowhead, arrowtail
   *   2. forward + arrowhead (arrowtail is not affedted)
   *   3. back + arrowtail (arrowhead is not affected)
   * [1] https://www.graphviz.org/doc/info/attrs.html#h:undir_note
   */
  if (attr_names.includes("dir")) {
    var idx = {}; // get index of 'arrows' and 'dir'
    idx.arrows = {};
    for (i = 0; i < attr_list.length; i++) {
      if (attr_list[i].name === "arrows") {
        if (attr_list[i].value.to != null) {
          idx.arrows.to = i;
        } else if (attr_list[i].value.from != null) {
          idx.arrows.from = i;
        } else {
          throw newSyntaxError("Invalid value of arrows");
        }
      } else if (attr_list[i].name === "dir") {
        idx.dir = i;
      }
    }

    // first, add default arrow shape if it is not assigned to avoid error
    var dir_type = attr_list[idx.dir].value;
    if (!attr_names.includes("arrows")) {
      if (dir_type === "both") {
        attr_list.push({
          attr: attr_list[idx.dir].attr,
          name: "arrows",
          value: { to: { enabled: true } },
        });
        idx.arrows.to = attr_list.length - 1;
        attr_list.push({
          attr: attr_list[idx.dir].attr,
          name: "arrows",
          value: { from: { enabled: true } },
        });
        idx.arrows.from = attr_list.length - 1;
      } else if (dir_type === "forward") {
        attr_list.push({
          attr: attr_list[idx.dir].attr,
          name: "arrows",
          value: { to: { enabled: true } },
        });
        idx.arrows.to = attr_list.length - 1;
      } else if (dir_type === "back") {
        attr_list.push({
          attr: attr_list[idx.dir].attr,
          name: "arrows",
          value: { from: { enabled: true } },
        });
        idx.arrows.from = attr_list.length - 1;
      } else if (dir_type === "none") {
        attr_list.push({
          attr: attr_list[idx.dir].attr,
          name: "arrows",
          value: "",
        });
        idx.arrows.to = attr_list.length - 1;
      } else {
        throw newSyntaxError('Invalid dir type "' + dir_type + '"');
      }
    }

    var from_type;
    var to_type;
    // update 'arrows' attribute from 'dir'.
    if (dir_type === "both") {
      // both of shapes of 'from' and 'to' are given
      if (idx.arrows.to && idx.arrows.from) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.to].attr,
          name: attr_list[idx.arrows.to].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };
        attr_list.splice(idx.arrows.from, 1);

        // shape of 'to' is assigned and use default to 'from'
      } else if (idx.arrows.to) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = "arrow";
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.to].attr,
          name: attr_list[idx.arrows.to].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };

        // only shape of 'from' is assigned and use default for 'to'
      } else if (idx.arrows.from) {
        to_type = "arrow";
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.from] = {
          attr: attr_list[idx.arrows.from].attr,
          name: attr_list[idx.arrows.from].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };
      }
    } else if (dir_type === "back") {
      // given both of shapes, but use only 'from'
      if (idx.arrows.to && idx.arrows.from) {
        to_type = "";
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.from] = {
          attr: attr_list[idx.arrows.from].attr,
          name: attr_list[idx.arrows.from].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };

        // given shape of 'to', but does not use it
      } else if (idx.arrows.to) {
        to_type = "";
        from_type = "arrow";
        idx.arrows.from = idx.arrows.to;
        attr_list[idx.arrows.from] = {
          attr: attr_list[idx.arrows.from].attr,
          name: attr_list[idx.arrows.from].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };

        // assign given 'from' shape
      } else if (idx.arrows.from) {
        to_type = "";
        from_type = attr_list[idx.arrows.from].value.from.type;
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.from].attr,
          name: attr_list[idx.arrows.from].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };
      }

      attr_list[idx.arrows.from] = {
        attr: attr_list[idx.arrows.from].attr,
        name: attr_list[idx.arrows.from].name,
        value: {
          from: {
            enabled: true,
            type: attr_list[idx.arrows.from].value.from.type,
          },
        },
      };
    } else if (dir_type === "none") {
      var idx_arrow;
      if (idx.arrows.to) {
        idx_arrow = idx.arrows.to;
      } else {
        idx_arrow = idx.arrows.from;
      }

      attr_list[idx_arrow] = {
        attr: attr_list[idx_arrow].attr,
        name: attr_list[idx_arrow].name,
        value: "",
      };
    } else if (dir_type === "forward") {
      // given both of shapes, but use only 'to'
      if (idx.arrows.to && idx.arrows.from) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = "";
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.to].attr,
          name: attr_list[idx.arrows.to].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };

        // assign given 'to' shape
      } else if (idx.arrows.to) {
        to_type = attr_list[idx.arrows.to].value.to.type;
        from_type = "";
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.to].attr,
          name: attr_list[idx.arrows.to].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };

        // given shape of 'from', but does not use it
      } else if (idx.arrows.from) {
        to_type = "arrow";
        from_type = "";
        idx.arrows.to = idx.arrows.from;
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.to].attr,
          name: attr_list[idx.arrows.to].name,
          value: {
            to: { enabled: true, type: to_type },
            from: { enabled: true, type: from_type },
          },
        };
      }

      attr_list[idx.arrows.to] = {
        attr: attr_list[idx.arrows.to].attr,
        name: attr_list[idx.arrows.to].name,
        value: {
          to: { enabled: true, type: attr_list[idx.arrows.to].value.to.type },
        },
      };
    } else {
      throw newSyntaxError('Invalid dir type "' + dir_type + '"');
    }

    // remove 'dir' attribute no need anymore
    attr_list.splice(idx.dir, 1);
  }

  // parse 'penwidth'
  var nof_attr_list;
  if (attr_names.includes("penwidth")) {
    var tmp_attr_list = [];

    nof_attr_list = attr_list.length;
    for (i = 0; i < nof_attr_list; i++) {
      // exclude 'width' from attr_list if 'penwidth' exists
      if (attr_list[i].name !== "width") {
        if (attr_list[i].name === "penwidth") {
          attr_list[i].name = "width";
        }
        tmp_attr_list.push(attr_list[i]);
      }
    }
    attr_list = tmp_attr_list;
  }

  nof_attr_list = attr_list.length;
  for (i = 0; i < nof_attr_list; i++) {
    setValue(attr_list[i].attr, attr_list[i].name, attr_list[i].value);
  }

  return attr;
}

/**
 * Create a syntax error with extra information on current token and index.
 *
 * @param {string} message
 * @returns {SyntaxError} err
 */
function newSyntaxError(message) {
  return new SyntaxError(
    message + ', got "' + chop(token, 30) + '" (char ' + index + ")"
  );
}

/**
 * Chop off text after a maximum length
 *
 * @param {string} text
 * @param {number} maxLength
 * @returns {string}
 */
function chop(text, maxLength) {
  return text.length <= maxLength ? text : text.substr(0, 27) + "...";
}

/**
 * Execute a function fn for each pair of elements in two arrays
 *
 * @param {Array | *} array1
 * @param {Array | *} array2
 * @param {Function} fn
 */
function forEach2(array1, array2, fn) {
  if (Array.isArray(array1)) {
    array1.forEach(function (elem1) {
      if (Array.isArray(array2)) {
        array2.forEach(function (elem2) {
          fn(elem1, elem2);
        });
      } else {
        fn(elem1, array2);
      }
    });
  } else {
    if (Array.isArray(array2)) {
      array2.forEach(function (elem2) {
        fn(array1, elem2);
      });
    } else {
      fn(array1, array2);
    }
  }
}

/**
 * Set a nested property on an object
 * When nested objects are missing, they will be created.
 * For example setProp({}, 'font.color', 'red') will return {font: {color: 'red'}}
 *
 * @param {object} object
 * @param {string} path   A dot separated string like 'font.color'
 * @param {*} value       Value for the property
 * @returns {object} Returns the original object, allows for chaining.
 */
function setProp(object, path, value) {
  var names = path.split(".");
  var prop = names.pop();

  // traverse over the nested objects
  var obj = object;
  for (var i = 0; i < names.length; i++) {
    var name = names[i];
    if (!(name in obj)) {
      obj[name] = {};
    }
    obj = obj[name];
  }

  // set the property value
  obj[prop] = value;

  return object;
}

/**
 * Convert an object with DOT attributes to their vis.js equivalents.
 *
 * @param {object} attr     Object with DOT attributes
 * @param {object} mapping
 * @returns {object}         Returns an object with vis.js attributes
 */
function convertAttr(attr, mapping) {
  var converted = {};

  for (var prop in attr) {
    if (attr.hasOwnProperty(prop)) {
      var visProp = mapping[prop];
      if (Array.isArray(visProp)) {
        visProp.forEach(function (visPropI) {
          setProp(converted, visPropI, attr[prop]);
        });
      } else if (typeof visProp === "string") {
        setProp(converted, visProp, attr[prop]);
      } else {
        setProp(converted, prop, attr[prop]);
      }
    }
  }

  return converted;
}

/**
 * Convert a string containing a graph in DOT language into a map containing
 * with nodes and edges in the format of graph.
 *
 * @param {string} data         Text containing a graph in DOT-notation
 * @returns {object} graphData
 */
function DOTToGraph(data) {
  // parse the DOT file
  var dotData = parseDOT(data);
  var graphData = {
    nodes: [],
    edges: [],
    options: {},
  };

  // copy the nodes
  if (dotData.nodes) {
    dotData.nodes.forEach(function (dotNode) {
      var graphNode = {
        id: dotNode.id,
        label: String(dotNode.label || dotNode.id),
      };
      merge(graphNode, convertAttr(dotNode.attr, NODE_ATTR_MAPPING));
      if (graphNode.image) {
        graphNode.shape = "image";
      }
      graphData.nodes.push(graphNode);
    });
  }

  // copy the edges
  if (dotData.edges) {
    /**
     * Convert an edge in DOT format to an edge with VisGraph format
     *
     * @param {object} dotEdge
     * @returns {object} graphEdge
     */
    var convertEdge = function (dotEdge) {
      var graphEdge = {
        from: dotEdge.from,
        to: dotEdge.to,
      };
      merge(graphEdge, convertAttr(dotEdge.attr, EDGE_ATTR_MAPPING));

      // Add arrows attribute to default styled arrow.
      // The reason why default style is not added in parseAttributeList() is
      // because only default is cleared before here.
      if (graphEdge.arrows == null && dotEdge.type === "->") {
        graphEdge.arrows = "to";
      }

      return graphEdge;
    };

    dotData.edges.forEach(function (dotEdge) {
      var from, to;
      if (dotEdge.from instanceof Object) {
        from = dotEdge.from.nodes;
      } else {
        from = {
          id: dotEdge.from,
        };
      }

      if (dotEdge.to instanceof Object) {
        to = dotEdge.to.nodes;
      } else {
        to = {
          id: dotEdge.to,
        };
      }

      if (dotEdge.from instanceof Object && dotEdge.from.edges) {
        dotEdge.from.edges.forEach(function (subEdge) {
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });
      }

      forEach2(from, to, function (from, to) {
        var subEdge = createEdge(
          graphData,
          from.id,
          to.id,
          dotEdge.type,
          dotEdge.attr
        );
        var graphEdge = convertEdge(subEdge);
        graphData.edges.push(graphEdge);
      });

      if (dotEdge.to instanceof Object && dotEdge.to.edges) {
        dotEdge.to.edges.forEach(function (subEdge) {
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });
      }
    });
  }

  // copy the options
  if (dotData.attr) {
    graphData.options = dotData.attr;
  }

  return graphData;
}

/* eslint-enable no-var */
/* eslint-enable no-unused-vars */
/* eslint-enable no-prototype-builtins */

var dotparser = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DOTToGraph: DOTToGraph,
  parseDOT: parseDOT
});

/**
 * Convert Gephi to Vis.
 *
 * @param gephiJSON - The parsed JSON data in Gephi format.
 * @param optionsObj - Additional options.
 * @returns The converted data ready to be used in Vis.
 */
function parseGephi(gephiJSON, optionsObj) {
    const options = {
        edges: {
            inheritColor: false,
        },
        nodes: {
            fixed: false,
            parseColor: false,
        },
    };
    if (optionsObj != null) {
        if (optionsObj.fixed != null) {
            options.nodes.fixed = optionsObj.fixed;
        }
        if (optionsObj.parseColor != null) {
            options.nodes.parseColor = optionsObj.parseColor;
        }
        if (optionsObj.inheritColor != null) {
            options.edges.inheritColor = optionsObj.inheritColor;
        }
    }
    const gEdges = gephiJSON.edges;
    const vEdges = gEdges.map((gEdge) => {
        const vEdge = {
            from: gEdge.source,
            id: gEdge.id,
            to: gEdge.target,
        };
        if (gEdge.attributes != null) {
            vEdge.attributes = gEdge.attributes;
        }
        if (gEdge.label != null) {
            vEdge.label = gEdge.label;
        }
        if (gEdge.attributes != null && gEdge.attributes.title != null) {
            vEdge.title = gEdge.attributes.title;
        }
        if (gEdge.type === "Directed") {
            vEdge.arrows = "to";
        }
        // edge['value'] = gEdge.attributes != null ? gEdge.attributes.Weight : undefined;
        // edge['width'] = edge['value'] != null ? undefined : edgegEdge.size;
        if (gEdge.color && options.edges.inheritColor === false) {
            vEdge.color = gEdge.color;
        }
        return vEdge;
    });
    const vNodes = gephiJSON.nodes.map((gNode) => {
        const vNode = {
            id: gNode.id,
            fixed: options.nodes.fixed && gNode.x != null && gNode.y != null,
        };
        if (gNode.attributes != null) {
            vNode.attributes = gNode.attributes;
        }
        if (gNode.label != null) {
            vNode.label = gNode.label;
        }
        if (gNode.size != null) {
            vNode.size = gNode.size;
        }
        if (gNode.attributes != null && gNode.attributes.title != null) {
            vNode.title = gNode.attributes.title;
        }
        if (gNode.title != null) {
            vNode.title = gNode.title;
        }
        if (gNode.x != null) {
            vNode.x = gNode.x;
        }
        if (gNode.y != null) {
            vNode.y = gNode.y;
        }
        if (gNode.color != null) {
            if (options.nodes.parseColor === true) {
                vNode.color = gNode.color;
            }
            else {
                vNode.color = {
                    background: gNode.color,
                    border: gNode.color,
                    highlight: {
                        background: gNode.color,
                        border: gNode.color,
                    },
                    hover: {
                        background: gNode.color,
                        border: gNode.color,
                    },
                };
            }
        }
        return vNode;
    });
    return { nodes: vNodes, edges: vEdges };
}

var gephiParser = /*#__PURE__*/Object.freeze({
  __proto__: null,
  parseGephi: parseGephi
});

// English
const en = {
    addDescription: "Click in an empty space to place a new node.",
    addEdge: "Add Edge",
    addNode: "Add Node",
    back: "Back",
    close: "Close",
    createEdgeError: "Cannot link edges to a cluster.",
    del: "Delete selected",
    deleteClusterError: "Clusters cannot be deleted.",
    edgeDescription: "Click on a node and drag the edge to another node to connect them.",
    edit: "Edit",
    editClusterError: "Clusters cannot be edited.",
    editEdge: "Edit Edge",
    editEdgeDescription: "Click on the control points and drag them to a node to connect to it.",
    editNode: "Edit Node",
};
// German
const de = {
    addDescription: "Klicke auf eine freie Stelle, um einen neuen Knoten zu plazieren.",
    addEdge: "Kante hinzuf\u00fcgen",
    addNode: "Knoten hinzuf\u00fcgen",
    back: "Zur\u00fcck",
    close: "Schließen",
    createEdgeError: "Es ist nicht m\u00f6glich, Kanten mit Clustern zu verbinden.",
    del: "L\u00f6sche Auswahl",
    deleteClusterError: "Cluster k\u00f6nnen nicht gel\u00f6scht werden.",
    edgeDescription: "Klicke auf einen Knoten und ziehe die Kante zu einem anderen Knoten, um diese zu verbinden.",
    edit: "Editieren",
    editClusterError: "Cluster k\u00f6nnen nicht editiert werden.",
    editEdge: "Kante editieren",
    editEdgeDescription: "Klicke auf die Verbindungspunkte und ziehe diese auf einen Knoten, um sie zu verbinden.",
    editNode: "Knoten editieren",
};
// Spanish
const es = {
    addDescription: "Haga clic en un lugar vac\u00edo para colocar un nuevo nodo.",
    addEdge: "A\u00f1adir arista",
    addNode: "A\u00f1adir nodo",
    back: "Atr\u00e1s",
    close: "Cerrar",
    createEdgeError: "No se puede conectar una arista a un grupo.",
    del: "Eliminar selecci\u00f3n",
    deleteClusterError: "No es posible eliminar grupos.",
    edgeDescription: "Haga clic en un nodo y arrastre la arista hacia otro nodo para conectarlos.",
    edit: "Editar",
    editClusterError: "No es posible editar grupos.",
    editEdge: "Editar arista",
    editEdgeDescription: "Haga clic en un punto de control y arrastrelo a un nodo para conectarlo.",
    editNode: "Editar nodo",
};
//Italiano
const it = {
    addDescription: "Clicca per aggiungere un nuovo nodo",
    addEdge: "Aggiungi un vertice",
    addNode: "Aggiungi un nodo",
    back: "Indietro",
    close: "Chiudere",
    createEdgeError: "Non si possono collegare vertici ad un cluster",
    del: "Cancella la selezione",
    deleteClusterError: "I cluster non possono essere cancellati",
    edgeDescription: "Clicca su un nodo e trascinalo ad un altro nodo per connetterli.",
    edit: "Modifica",
    editClusterError: "I clusters non possono essere modificati.",
    editEdge: "Modifica il vertice",
    editEdgeDescription: "Clicca sui Punti di controllo e trascinali ad un nodo per connetterli.",
    editNode: "Modifica il nodo",
};
// Dutch
const nl = {
    addDescription: "Klik op een leeg gebied om een nieuwe node te maken.",
    addEdge: "Link toevoegen",
    addNode: "Node toevoegen",
    back: "Terug",
    close: "Sluiten",
    createEdgeError: "Kan geen link maken naar een cluster.",
    del: "Selectie verwijderen",
    deleteClusterError: "Clusters kunnen niet worden verwijderd.",
    edgeDescription: "Klik op een node en sleep de link naar een andere node om ze te verbinden.",
    edit: "Wijzigen",
    editClusterError: "Clusters kunnen niet worden aangepast.",
    editEdge: "Link wijzigen",
    editEdgeDescription: "Klik op de verbindingspunten en sleep ze naar een node om daarmee te verbinden.",
    editNode: "Node wijzigen",
};
// Portuguese Brazil
const pt = {
    addDescription: "Clique em um espaço em branco para adicionar um novo nó",
    addEdge: "Adicionar aresta",
    addNode: "Adicionar nó",
    back: "Voltar",
    close: "Fechar",
    createEdgeError: "Não foi possível linkar arestas a um cluster.",
    del: "Remover selecionado",
    deleteClusterError: "Clusters não puderam ser removidos.",
    edgeDescription: "Clique em um nó e arraste a aresta até outro nó para conectá-los",
    edit: "Editar",
    editClusterError: "Clusters não puderam ser editados.",
    editEdge: "Editar aresta",
    editEdgeDescription: "Clique nos pontos de controle e os arraste para um nó para conectá-los",
    editNode: "Editar nó",
};
// Russian
const ru = {
    addDescription: "Кликните в свободное место, чтобы добавить новый узел.",
    addEdge: "Добавить ребро",
    addNode: "Добавить узел",
    back: "Назад",
    close: "Закрывать",
    createEdgeError: "Невозможно соединить ребра в кластер.",
    del: "Удалить выбранное",
    deleteClusterError: "Кластеры не могут быть удалены",
    edgeDescription: "Кликните на узел и протяните ребро к другому узлу, чтобы соединить их.",
    edit: "Редактировать",
    editClusterError: "Кластеры недоступны для редактирования.",
    editEdge: "Редактировать ребро",
    editEdgeDescription: "Кликните на контрольные точки и перетащите их в узел, чтобы подключиться к нему.",
    editNode: "Редактировать узел",
};
// Chinese
const cn = {
    addDescription: "单击空白处放置新节点。",
    addEdge: "添加连接线",
    addNode: "添加节点",
    back: "返回",
    close: "關閉",
    createEdgeError: "无法将连接线连接到群集。",
    del: "删除选定",
    deleteClusterError: "无法删除群集。",
    edgeDescription: "单击某个节点并将该连接线拖动到另一个节点以连接它们。",
    edit: "编辑",
    editClusterError: "无法编辑群集。",
    editEdge: "编辑连接线",
    editEdgeDescription: "单击控制节点并将它们拖到节点上连接。",
    editNode: "编辑节点",
};
// Ukrainian
const uk = {
    addDescription: "Kлікніть на вільне місце, щоб додати новий вузол.",
    addEdge: "Додати край",
    addNode: "Додати вузол",
    back: "Назад",
    close: "Закрити",
    createEdgeError: "Не можливо об'єднати краї в групу.",
    del: "Видалити обране",
    deleteClusterError: "Групи не можуть бути видалені.",
    edgeDescription: "Клікніть на вузол і перетягніть край до іншого вузла, щоб їх з'єднати.",
    edit: "Редагувати",
    editClusterError: "Групи недоступні для редагування.",
    editEdge: "Редагувати край",
    editEdgeDescription: "Клікніть на контрольні точки і перетягніть їх у вузол, щоб підключитися до нього.",
    editNode: "Редагувати вузол",
};
// French
const fr = {
    addDescription: "Cliquez dans un endroit vide pour placer un nœud.",
    addEdge: "Ajouter un lien",
    addNode: "Ajouter un nœud",
    back: "Retour",
    close: "Fermer",
    createEdgeError: "Impossible de créer un lien vers un cluster.",
    del: "Effacer la sélection",
    deleteClusterError: "Les clusters ne peuvent pas être effacés.",
    edgeDescription: "Cliquez sur un nœud et glissez le lien vers un autre nœud pour les connecter.",
    edit: "Éditer",
    editClusterError: "Les clusters ne peuvent pas être édités.",
    editEdge: "Éditer le lien",
    editEdgeDescription: "Cliquez sur les points de contrôle et glissez-les pour connecter un nœud.",
    editNode: "Éditer le nœud",
};
// Czech
const cs = {
    addDescription: "Kluknutím do prázdného prostoru můžete přidat nový vrchol.",
    addEdge: "Přidat hranu",
    addNode: "Přidat vrchol",
    back: "Zpět",
    close: "Zavřít",
    createEdgeError: "Nelze připojit hranu ke shluku.",
    del: "Smazat výběr",
    deleteClusterError: "Nelze mazat shluky.",
    edgeDescription: "Přetažením z jednoho vrcholu do druhého můžete spojit tyto vrcholy novou hranou.",
    edit: "Upravit",
    editClusterError: "Nelze upravovat shluky.",
    editEdge: "Upravit hranu",
    editEdgeDescription: "Přetažením kontrolního vrcholu hrany ji můžete připojit k jinému vrcholu.",
    editNode: "Upravit vrchol",
};

var locales = /*#__PURE__*/Object.freeze({
  __proto__: null,
  cn: cn,
  cs: cs,
  de: de,
  en: en,
  es: es,
  fr: fr,
  it: it,
  nl: nl,
  pt: pt,
  ru: ru,
  uk: uk
});

/**
 * Normalizes language code into the format used internally.
 *
 * @param locales - All the available locales.
 * @param rawCode - The original code as supplied by the user.
 * @returns Language code in the format language-COUNTRY or language, eventually
 * fallbacks to en.
 */
function normalizeLanguageCode(locales, rawCode) {
    try {
        const [rawLanguage, rawCountry] = rawCode.split(/[-_ /]/, 2);
        const language = rawLanguage != null ? rawLanguage.toLowerCase() : null;
        const country = rawCountry != null ? rawCountry.toUpperCase() : null;
        if (language && country) {
            const code = language + "-" + country;
            if (Object.prototype.hasOwnProperty.call(locales, code)) {
                return code;
            }
            else {
                console.warn(`Unknown variant ${country} of language ${language}.`);
            }
        }
        if (language) {
            const code = language;
            if (Object.prototype.hasOwnProperty.call(locales, code)) {
                return code;
            }
            else {
                console.warn(`Unknown language ${language}`);
            }
        }
        console.warn(`Unknown locale ${rawCode}, falling back to English.`);
        return "en";
    }
    catch (error) {
        console.error(error);
        console.warn(`Unexpected error while normalizing locale ${rawCode}, falling back to English.`);
        return "en";
    }
}

/**
 * Associates a canvas to a given image, containing a number of renderings
 * of the image at various sizes.
 *
 * This technique is known as 'mipmapping'.
 *
 * NOTE: Images can also be of type 'data:svg+xml`. This code also works
 *       for svg, but the mipmapping may not be necessary.
 *
 * @param {Image} image
 */
class CachedImage {
  /**
   * @ignore
   */
  constructor() {
    this.NUM_ITERATIONS = 4; // Number of items in the coordinates array

    this.image = new Image();
    this.canvas = document.createElement("canvas");
  }

  /**
   * Called when the image has been successfully loaded.
   */
  init() {
    if (this.initialized()) return;

    this.src = this.image.src; // For same interface with Image
    const w = this.image.width;
    const h = this.image.height;

    // Ease external access
    this.width = w;
    this.height = h;

    const h2 = Math.floor(h / 2);
    const h4 = Math.floor(h / 4);
    const h8 = Math.floor(h / 8);
    const h16 = Math.floor(h / 16);

    const w2 = Math.floor(w / 2);
    const w4 = Math.floor(w / 4);
    const w8 = Math.floor(w / 8);
    const w16 = Math.floor(w / 16);

    // Make canvas as small as possible
    this.canvas.width = 3 * w4;
    this.canvas.height = h2;

    // Coordinates and sizes of images contained in the canvas
    // Values per row:  [top x, left y, width, height]

    this.coordinates = [
      [0, 0, w2, h2],
      [w2, 0, w4, h4],
      [w2, h4, w8, h8],
      [5 * w8, h4, w16, h16],
    ];

    this._fillMipMap();
  }

  /**
   * @returns {boolean} true if init() has been called, false otherwise.
   */
  initialized() {
    return this.coordinates !== undefined;
  }

  /**
   * Redraw main image in various sizes to the context.
   *
   * The rationale behind this is to reduce artefacts due to interpolation
   * at differing zoom levels.
   *
   * Source: http://stackoverflow.com/q/18761404/1223531
   *
   * This methods takes the resizing out of the drawing loop, in order to
   * reduce performance overhead.
   *
   * TODO: The code assumes that a 2D context can always be gotten. This is
   *       not necessarily true! OTOH, if not true then usage of this class
   *       is senseless.
   *
   * @private
   */
  _fillMipMap() {
    const ctx = this.canvas.getContext("2d");

    // First zoom-level comes from the image
    const to = this.coordinates[0];
    ctx.drawImage(this.image, to[0], to[1], to[2], to[3]);

    // The rest are copy actions internal to the canvas/context
    for (let iterations = 1; iterations < this.NUM_ITERATIONS; iterations++) {
      const from = this.coordinates[iterations - 1];
      const to = this.coordinates[iterations];

      ctx.drawImage(
        this.canvas,
        from[0],
        from[1],
        from[2],
        from[3],
        to[0],
        to[1],
        to[2],
        to[3]
      );
    }
  }

  /**
   * Draw the image, using the mipmap if necessary.
   *
   * MipMap is only used if param factor > 2; otherwise, original bitmap
   * is resized. This is also used to skip mipmap usage, e.g. by setting factor = 1
   *
   * Credits to 'Alex de Mulder' for original implementation.
   *
   * @param {CanvasRenderingContext2D} ctx  context on which to draw zoomed image
   * @param {Float} factor scale factor at which to draw
   * @param {number} left
   * @param {number} top
   * @param {number} width
   * @param {number} height
   */
  drawImageAtPosition(ctx, factor, left, top, width, height) {
    if (!this.initialized()) return; //can't draw image yet not intialized

    if (factor > 2) {
      // Determine which zoomed image to use
      factor *= 0.5;
      let iterations = 0;
      while (factor > 2 && iterations < this.NUM_ITERATIONS) {
        factor *= 0.5;
        iterations += 1;
      }

      if (iterations >= this.NUM_ITERATIONS) {
        iterations = this.NUM_ITERATIONS - 1;
      }
      //console.log("iterations: " + iterations);

      const from = this.coordinates[iterations];
      ctx.drawImage(
        this.canvas,
        from[0],
        from[1],
        from[2],
        from[3],
        left,
        top,
        width,
        height
      );
    } else {
      // Draw image directly
      ctx.drawImage(this.image, left, top, width, height);
    }
  }
}

/**
 * This callback is a callback that accepts an Image.
 *
 * @callback ImageCallback
 * @param {Image} image
 */

/**
 * This class loads images and keeps them stored.
 *
 * @param {ImageCallback} callback
 */
class Images {
  /**
   * @param {ImageCallback} callback
   */
  constructor(callback) {
    this.images = {};
    this.imageBroken = {};
    this.callback = callback;
  }

  /**
   * @param {string} url                      The original Url that failed to load, if the broken image is successfully loaded it will be added to the cache using this Url as the key so that subsequent requests for this Url will return the broken image
   * @param {string} brokenUrl                Url the broken image to try and load
   * @param {Image} imageToLoadBrokenUrlOn   The image object
   */
  _tryloadBrokenUrl(url, brokenUrl, imageToLoadBrokenUrlOn) {
    //If these parameters aren't specified then exit the function because nothing constructive can be done
    if (url === undefined || imageToLoadBrokenUrlOn === undefined) return;
    if (brokenUrl === undefined) {
      console.warn("No broken url image defined");
      return;
    }

    //Clear the old subscription to the error event and put a new in place that only handle errors in loading the brokenImageUrl
    imageToLoadBrokenUrlOn.image.onerror = () => {
      console.error("Could not load brokenImage:", brokenUrl);
      // cache item will contain empty image, this should be OK for default
    };

    //Set the source of the image to the brokenUrl, this is actually what kicks off the loading of the broken image
    imageToLoadBrokenUrlOn.image.src = brokenUrl;
  }

  /**
   *
   * @param {vis.Image} imageToRedrawWith
   * @private
   */
  _redrawWithImage(imageToRedrawWith) {
    if (this.callback) {
      this.callback(imageToRedrawWith);
    }
  }

  /**
   * @param {string} url          Url of the image
   * @param {string} brokenUrl    Url of an image to use if the url image is not found
   * @returns {Image} img          The image object
   */
  load(url, brokenUrl) {
    //Try and get the image from the cache, if successful then return the cached image
    const cachedImage = this.images[url];
    if (cachedImage) return cachedImage;

    //Create a new image
    const img = new CachedImage();

    // Need to add to cache here, otherwise final return will spawn different copies of the same image,
    // Also, there will be multiple loads of the same image.
    this.images[url] = img;

    //Subscribe to the event that is raised if the image loads successfully
    img.image.onload = () => {
      // Properly init the cached item and then request a redraw
      this._fixImageCoordinates(img.image);
      img.init();
      this._redrawWithImage(img);
    };

    //Subscribe to the event that is raised if the image fails to load
    img.image.onerror = () => {
      console.error("Could not load image:", url);
      //Try and load the image specified by the brokenUrl using
      this._tryloadBrokenUrl(url, brokenUrl, img);
    };

    //Set the source of the image to the url, this is what actually kicks off the loading of the image
    img.image.src = url;

    //Return the new image
    return img;
  }

  /**
   * IE11 fix -- thanks dponch!
   *
   * Local helper function
   *
   * @param {vis.Image} imageToCache
   * @private
   */
  _fixImageCoordinates(imageToCache) {
    if (imageToCache.width === 0) {
      document.body.appendChild(imageToCache);
      imageToCache.width = imageToCache.offsetWidth;
      imageToCache.height = imageToCache.offsetHeight;
      document.body.removeChild(imageToCache);
    }
  }
}

/**
 * This class can store groups and options specific for groups.
 */
class Groups {
  /**
   * @ignore
   */
  constructor() {
    this.clear();
    this._defaultIndex = 0;
    this._groupIndex = 0;

    this._defaultGroups = [
      {
        border: "#2B7CE9",
        background: "#97C2FC",
        highlight: { border: "#2B7CE9", background: "#D2E5FF" },
        hover: { border: "#2B7CE9", background: "#D2E5FF" },
      }, // 0: blue
      {
        border: "#FFA500",
        background: "#FFFF00",
        highlight: { border: "#FFA500", background: "#FFFFA3" },
        hover: { border: "#FFA500", background: "#FFFFA3" },
      }, // 1: yellow
      {
        border: "#FA0A10",
        background: "#FB7E81",
        highlight: { border: "#FA0A10", background: "#FFAFB1" },
        hover: { border: "#FA0A10", background: "#FFAFB1" },
      }, // 2: red
      {
        border: "#41A906",
        background: "#7BE141",
        highlight: { border: "#41A906", background: "#A1EC76" },
        hover: { border: "#41A906", background: "#A1EC76" },
      }, // 3: green
      {
        border: "#E129F0",
        background: "#EB7DF4",
        highlight: { border: "#E129F0", background: "#F0B3F5" },
        hover: { border: "#E129F0", background: "#F0B3F5" },
      }, // 4: magenta
      {
        border: "#7C29F0",
        background: "#AD85E4",
        highlight: { border: "#7C29F0", background: "#D3BDF0" },
        hover: { border: "#7C29F0", background: "#D3BDF0" },
      }, // 5: purple
      {
        border: "#C37F00",
        background: "#FFA807",
        highlight: { border: "#C37F00", background: "#FFCA66" },
        hover: { border: "#C37F00", background: "#FFCA66" },
      }, // 6: orange
      {
        border: "#4220FB",
        background: "#6E6EFD",
        highlight: { border: "#4220FB", background: "#9B9BFD" },
        hover: { border: "#4220FB", background: "#9B9BFD" },
      }, // 7: darkblue
      {
        border: "#FD5A77",
        background: "#FFC0CB",
        highlight: { border: "#FD5A77", background: "#FFD1D9" },
        hover: { border: "#FD5A77", background: "#FFD1D9" },
      }, // 8: pink
      {
        border: "#4AD63A",
        background: "#C2FABC",
        highlight: { border: "#4AD63A", background: "#E6FFE3" },
        hover: { border: "#4AD63A", background: "#E6FFE3" },
      }, // 9: mint

      {
        border: "#990000",
        background: "#EE0000",
        highlight: { border: "#BB0000", background: "#FF3333" },
        hover: { border: "#BB0000", background: "#FF3333" },
      }, // 10:bright red

      {
        border: "#FF6000",
        background: "#FF6000",
        highlight: { border: "#FF6000", background: "#FF6000" },
        hover: { border: "#FF6000", background: "#FF6000" },
      }, // 12: real orange
      {
        border: "#97C2FC",
        background: "#2B7CE9",
        highlight: { border: "#D2E5FF", background: "#2B7CE9" },
        hover: { border: "#D2E5FF", background: "#2B7CE9" },
      }, // 13: blue
      {
        border: "#399605",
        background: "#255C03",
        highlight: { border: "#399605", background: "#255C03" },
        hover: { border: "#399605", background: "#255C03" },
      }, // 14: green
      {
        border: "#B70054",
        background: "#FF007E",
        highlight: { border: "#B70054", background: "#FF007E" },
        hover: { border: "#B70054", background: "#FF007E" },
      }, // 15: magenta
      {
        border: "#AD85E4",
        background: "#7C29F0",
        highlight: { border: "#D3BDF0", background: "#7C29F0" },
        hover: { border: "#D3BDF0", background: "#7C29F0" },
      }, // 16: purple
      {
        border: "#4557FA",
        background: "#000EA1",
        highlight: { border: "#6E6EFD", background: "#000EA1" },
        hover: { border: "#6E6EFD", background: "#000EA1" },
      }, // 17: darkblue
      {
        border: "#FFC0CB",
        background: "#FD5A77",
        highlight: { border: "#FFD1D9", background: "#FD5A77" },
        hover: { border: "#FFD1D9", background: "#FD5A77" },
      }, // 18: pink
      {
        border: "#C2FABC",
        background: "#74D66A",
        highlight: { border: "#E6FFE3", background: "#74D66A" },
        hover: { border: "#E6FFE3", background: "#74D66A" },
      }, // 19: mint

      {
        border: "#EE0000",
        background: "#990000",
        highlight: { border: "#FF3333", background: "#BB0000" },
        hover: { border: "#FF3333", background: "#BB0000" },
      }, // 20:bright red
    ];

    this.options = {};
    this.defaultOptions = {
      useDefaultGroups: true,
    };
    Object.assign(this.options, this.defaultOptions);
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    const optionFields = ["useDefaultGroups"];

    if (options !== undefined) {
      for (const groupName in options) {
        if (Object.prototype.hasOwnProperty.call(options, groupName)) {
          if (optionFields.indexOf(groupName) === -1) {
            const group = options[groupName];
            this.add(groupName, group);
          }
        }
      }
    }
  }

  /**
   * Clear all groups
   */
  clear() {
    this._groups = new Map();
    this._groupNames = [];
  }

  /**
   * Get group options of a groupname.
   * If groupname is not found, a new group may be created.
   *
   * @param {*}       groupname     Can be a number, string, Date, etc.
   * @param {boolean} [shouldCreate=true] If true, create a new group
   * @returns {object} The found or created group
   */
  get(groupname, shouldCreate = true) {
    let group = this._groups.get(groupname);

    if (group === undefined && shouldCreate) {
      if (
        this.options.useDefaultGroups === false &&
        this._groupNames.length > 0
      ) {
        // create new group
        const index = this._groupIndex % this._groupNames.length;
        ++this._groupIndex;
        group = {};
        group.color = this._groups.get(this._groupNames[index]);
        this._groups.set(groupname, group);
      } else {
        // create new group
        const index = this._defaultIndex % this._defaultGroups.length;
        this._defaultIndex++;
        group = {};
        group.color = this._defaultGroups[index];
        this._groups.set(groupname, group);
      }
    }

    return group;
  }

  /**
   * Add custom group style.
   *
   * @param {string} groupName - The name of the group, a new group will be
   * created if a group with the same name doesn't exist, otherwise the old
   * groups style will be overwritten.
   * @param {object} style - An object containing borderColor, backgroundColor,
   * etc.
   * @returns {object} The created group object.
   */
  add(groupName, style) {
    // Only push group name once to prevent duplicates which would consume more
    // RAM and also skew the distribution towards more often updated groups,
    // neither of which is desirable.
    if (!this._groups.has(groupName)) {
      this._groupNames.push(groupName);
    }
    this._groups.set(groupName, style);
    return style;
  }
}

/**
 * Helper functions for components
 */

/**
 * Determine values to use for (sub)options of 'chosen'.
 *
 * This option is either a boolean or an object whose values should be examined further.
 * The relevant structures are:
 *
 * - chosen: <boolean value>
 * - chosen: { subOption: <boolean or function> }
 *
 * Where subOption is 'node', 'edge' or 'label'.
 *
 * The intention of this method appears to be to set a specific priority to the options;
 * Since most properties are either bridged or merged into the local options objects, there
 * is not much point in handling them separately.
 * TODO: examine if 'most' in previous sentence can be replaced with 'all'. In that case, we
 *       should be able to get rid of this method.
 *
 * @param {string}  subOption  option within object 'chosen' to consider; either 'node', 'edge' or 'label'
 * @param {object}  pile       array of options objects to consider
 * @returns {boolean | Function}  value for passed subOption of 'chosen' to use
 */
function choosify(subOption, pile) {
  // allowed values for subOption
  const allowed = ["node", "edge", "label"];
  let value = true;

  const chosen = topMost(pile, "chosen");
  if (typeof chosen === "boolean") {
    value = chosen;
  } else if (typeof chosen === "object") {
    if (allowed.indexOf(subOption) === -1) {
      throw new Error(
        "choosify: subOption '" +
          subOption +
          "' should be one of " +
          "'" +
          allowed.join("', '") +
          "'"
      );
    }

    const chosenEdge = topMost(pile, ["chosen", subOption]);
    if (typeof chosenEdge === "boolean" || typeof chosenEdge === "function") {
      value = chosenEdge;
    }
  }

  return value;
}

/**
 * Check if the point falls within the given rectangle.
 *
 * @param {rect} rect
 * @param {point} point
 * @param {rotationPoint} [rotationPoint] if specified, the rotation that applies to the rectangle.
 * @returns {boolean}  true if point within rectangle, false otherwise
 */
function pointInRect(rect, point, rotationPoint) {
  if (rect.width <= 0 || rect.height <= 0) {
    return false; // early out
  }

  if (rotationPoint !== undefined) {
    // Rotate the point the same amount as the rectangle
    const tmp = {
      x: point.x - rotationPoint.x,
      y: point.y - rotationPoint.y,
    };

    if (rotationPoint.angle !== 0) {
      // In order to get the coordinates the same, you need to
      // rotate in the reverse direction
      const angle = -rotationPoint.angle;

      const tmp2 = {
        x: Math.cos(angle) * tmp.x - Math.sin(angle) * tmp.y,
        y: Math.sin(angle) * tmp.x + Math.cos(angle) * tmp.y,
      };
      point = tmp2;
    } else {
      point = tmp;
    }

    // Note that if a rotation is specified, the rectangle coordinates
    // are **not* the full canvas coordinates. They are relative to the
    // rotationPoint. Hence, the point coordinates need not be translated
    // back in this case.
  }

  const right = rect.x + rect.width;
  const bottom = rect.y + rect.width;

  return (
    rect.left < point.x &&
    right > point.x &&
    rect.top < point.y &&
    bottom > point.y
  );
}

/**
 * Check if given value is acceptable as a label text.
 *
 * @param {*} text value to check; can be anything at this point
 * @returns {boolean} true if valid label value, false otherwise
 */
function isValidLabel(text) {
  // Note that this is quite strict: types that *might* be converted to string are disallowed
  return typeof text === "string" && text !== "";
}

/**
 * Returns x, y of self reference circle based on provided angle
 *
 * @param {object} ctx
 * @param {number} angle
 * @param {number} radius
 * @param {VisNode} node
 * @returns {object} x and y coordinates
 */
function getSelfRefCoordinates(ctx, angle, radius, node) {
  let x = node.x;
  let y = node.y;

  if (typeof node.distanceToBorder === "function") {
    //calculating opposite and adjacent
    //distaneToBorder becomes Hypotenuse.
    //Formulas sin(a) = Opposite / Hypotenuse and cos(a) = Adjacent / Hypotenuse
    const toBorderDist = node.distanceToBorder(ctx, angle);
    const yFromNodeCenter = Math.sin(angle) * toBorderDist;
    const xFromNodeCenter = Math.cos(angle) * toBorderDist;
    //xFromNodeCenter is basically x and if xFromNodeCenter equals to the distance to border then it means
    //that y does not need calculation because it is equal node.height / 2 or node.y
    //same thing with yFromNodeCenter and if yFromNodeCenter equals to the distance to border then it means
    //that x is equal node.width / 2 or node.x
    if (xFromNodeCenter === toBorderDist) {
      x += toBorderDist;
      y = node.y;
    } else if (yFromNodeCenter === toBorderDist) {
      x = node.x;
      y -= toBorderDist;
    } else {
      x += xFromNodeCenter;
      y -= yFromNodeCenter;
    }
  } else if (node.shape.width > node.shape.height) {
    x = node.x + node.shape.width * 0.5;
    y = node.y - radius;
  } else {
    x = node.x + radius;
    y = node.y - node.shape.height * 0.5;
  }

  return { x, y };
}

/**
 * Callback to determine text dimensions, using the parent label settings.
 *
 * @callback MeasureText
 * @param {text} text
 * @param {text} mod
 * @returns {object} { width, values} width in pixels and font attributes
 */

/**
 * Helper class for Label which collects results of splitting labels into lines and blocks.
 *
 * @private
 */
class LabelAccumulator {
  /**
   * @param {MeasureText} measureText
   */
  constructor(measureText) {
    this.measureText = measureText;
    this.current = 0;
    this.width = 0;
    this.height = 0;
    this.lines = [];
  }

  /**
   * Append given text to the given line.
   *
   * @param {number}  l    index of line to add to
   * @param {string}  text string to append to line
   * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
   * @private
   */
  _add(l, text, mod = "normal") {
    if (this.lines[l] === undefined) {
      this.lines[l] = {
        width: 0,
        height: 0,
        blocks: [],
      };
    }

    // We still need to set a block for undefined and empty texts, hence return at this point
    // This is necessary because we don't know at this point if we're at the
    // start of an empty line or not.
    // To compensate, empty blocks are removed in `finalize()`.
    //
    // Empty strings should still have a height
    let tmpText = text;
    if (text === undefined || text === "") tmpText = " ";

    // Determine width and get the font properties
    const result = this.measureText(tmpText, mod);
    const block = Object.assign({}, result.values);
    block.text = text;
    block.width = result.width;
    block.mod = mod;

    if (text === undefined || text === "") {
      block.width = 0;
    }

    this.lines[l].blocks.push(block);

    // Update the line width. We need this for determining if a string goes over max width
    this.lines[l].width += block.width;
  }

  /**
   * Returns the width in pixels of the current line.
   *
   * @returns {number}
   */
  curWidth() {
    const line = this.lines[this.current];
    if (line === undefined) return 0;

    return line.width;
  }

  /**
   * Add text in block to current line
   *
   * @param {string} text
   * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
   */
  append(text, mod = "normal") {
    this._add(this.current, text, mod);
  }

  /**
   * Add text in block to current line and start a new line
   *
   * @param {string} text
   * @param {'bold'|'ital'|'boldital'|'mono'|'normal'} [mod='normal']
   */
  newLine(text, mod = "normal") {
    this._add(this.current, text, mod);
    this.current++;
  }

  /**
   * Determine and set the heights of all the lines currently contained in this instance
   *
   * Note that width has already been set.
   *
   * @private
   */
  determineLineHeights() {
    for (let k = 0; k < this.lines.length; k++) {
      const line = this.lines[k];

      // Looking for max height of blocks in line
      let height = 0;

      if (line.blocks !== undefined) {
        // Can happen if text contains e.g. '\n '
        for (let l = 0; l < line.blocks.length; l++) {
          const block = line.blocks[l];

          if (height < block.height) {
            height = block.height;
          }
        }
      }

      line.height = height;
    }
  }

  /**
   * Determine the full size of the label text, as determined by current lines and blocks
   *
   * @private
   */
  determineLabelSize() {
    let width = 0;
    let height = 0;
    for (let k = 0; k < this.lines.length; k++) {
      const line = this.lines[k];

      if (line.width > width) {
        width = line.width;
      }
      height += line.height;
    }

    this.width = width;
    this.height = height;
  }

  /**
   * Remove all empty blocks and empty lines we don't need
   *
   * This must be done after the width/height determination,
   * so that these are set properly for processing here.
   *
   * @returns {Array<Line>} Lines with empty blocks (and some empty lines) removed
   * @private
   */
  removeEmptyBlocks() {
    const tmpLines = [];
    for (let k = 0; k < this.lines.length; k++) {
      const line = this.lines[k];

      // Note: an empty line in between text has width zero but is still relevant to layout.
      // So we can't use width for testing empty line here
      if (line.blocks.length === 0) continue;

      // Discard final empty line always
      if (k === this.lines.length - 1) {
        if (line.width === 0) continue;
      }

      const tmpLine = {};
      Object.assign(tmpLine, line);
      tmpLine.blocks = [];

      let firstEmptyBlock;
      const tmpBlocks = [];
      for (let l = 0; l < line.blocks.length; l++) {
        const block = line.blocks[l];
        if (block.width !== 0) {
          tmpBlocks.push(block);
        } else {
          if (firstEmptyBlock === undefined) {
            firstEmptyBlock = block;
          }
        }
      }

      // Ensure that there is *some* text present
      if (tmpBlocks.length === 0 && firstEmptyBlock !== undefined) {
        tmpBlocks.push(firstEmptyBlock);
      }

      tmpLine.blocks = tmpBlocks;

      tmpLines.push(tmpLine);
    }

    return tmpLines;
  }

  /**
   * Set the sizes for all lines and the whole thing.
   *
   * @returns {{width: (number|*), height: (number|*), lines: Array}}
   */
  finalize() {
    //console.log(JSON.stringify(this.lines, null, 2));

    this.determineLineHeights();
    this.determineLabelSize();
    const tmpLines = this.removeEmptyBlocks();

    // Return a simple hash object for further processing.
    return {
      width: this.width,
      height: this.height,
      lines: tmpLines,
    };
  }
}

// Hash of prepared regexp's for tags
const tagPattern = {
  // HTML
  "<b>": /<b>/,
  "<i>": /<i>/,
  "<code>": /<code>/,
  "</b>": /<\/b>/,
  "</i>": /<\/i>/,
  "</code>": /<\/code>/,
  // Markdown
  "*": /\*/, // bold
  _: /_/, // ital
  "`": /`/, // mono
  afterBold: /[^*]/,
  afterItal: /[^_]/,
  afterMono: /[^`]/,
};

/**
 * Internal helper class for parsing the markup tags for HTML and Markdown.
 *
 * NOTE: Sequences of tabs and spaces are reduced to single space.
 *       Scan usage of `this.spacing` within method
 */
class MarkupAccumulator {
  /**
   * Create an instance
   *
   * @param {string} text  text to parse for markup
   */
  constructor(text) {
    this.text = text;
    this.bold = false;
    this.ital = false;
    this.mono = false;
    this.spacing = false;
    this.position = 0;
    this.buffer = "";
    this.modStack = [];

    this.blocks = [];
  }

  /**
   * Return the mod label currently on the top of the stack
   *
   * @returns {string}  label of topmost mod
   * @private
   */
  mod() {
    return this.modStack.length === 0 ? "normal" : this.modStack[0];
  }

  /**
   * Return the mod label currently active
   *
   * @returns {string}  label of active mod
   * @private
   */
  modName() {
    if (this.modStack.length === 0) return "normal";
    else if (this.modStack[0] === "mono") return "mono";
    else {
      if (this.bold && this.ital) {
        return "boldital";
      } else if (this.bold) {
        return "bold";
      } else if (this.ital) {
        return "ital";
      }
    }
  }

  /**
   * @private
   */
  emitBlock() {
    if (this.spacing) {
      this.add(" ");
      this.spacing = false;
    }
    if (this.buffer.length > 0) {
      this.blocks.push({ text: this.buffer, mod: this.modName() });
      this.buffer = "";
    }
  }

  /**
   * Output text to buffer
   *
   * @param {string} text  text to add
   * @private
   */
  add(text) {
    if (text === " ") {
      this.spacing = true;
    }
    if (this.spacing) {
      this.buffer += " ";
      this.spacing = false;
    }
    if (text != " ") {
      this.buffer += text;
    }
  }

  /**
   * Handle parsing of whitespace
   *
   * @param {string} ch  the character to check
   * @returns {boolean} true if the character was processed as whitespace, false otherwise
   */
  parseWS(ch) {
    if (/[ \t]/.test(ch)) {
      if (!this.mono) {
        this.spacing = true;
      } else {
        this.add(ch);
      }
      return true;
    }

    return false;
  }

  /**
   * @param {string} tagName  label for block type to set
   * @private
   */
  setTag(tagName) {
    this.emitBlock();
    this[tagName] = true;
    this.modStack.unshift(tagName);
  }

  /**
   * @param {string} tagName  label for block type to unset
   * @private
   */
  unsetTag(tagName) {
    this.emitBlock();
    this[tagName] = false;
    this.modStack.shift();
  }

  /**
   * @param {string} tagName label for block type we are currently processing
   * @param {string|RegExp} tag string to match in text
   * @returns {boolean} true if the tag was processed, false otherwise
   */
  parseStartTag(tagName, tag) {
    // Note: if 'mono' passed as tagName, there is a double check here. This is OK
    if (!this.mono && !this[tagName] && this.match(tag)) {
      this.setTag(tagName);
      return true;
    }

    return false;
  }

  /**
   * @param {string|RegExp} tag
   * @param {number} [advance=true] if set, advance current position in text
   * @returns {boolean} true if match at given position, false otherwise
   * @private
   */
  match(tag, advance = true) {
    const [regExp, length] = this.prepareRegExp(tag);
    const matched = regExp.test(this.text.substr(this.position, length));

    if (matched && advance) {
      this.position += length - 1;
    }

    return matched;
  }

  /**
   * @param {string} tagName label for block type we are currently processing
   * @param {string|RegExp} tag string to match in text
   * @param {RegExp} [nextTag] regular expression to match for characters *following* the current tag
   * @returns {boolean} true if the tag was processed, false otherwise
   */
  parseEndTag(tagName, tag, nextTag) {
    let checkTag = this.mod() === tagName;
    if (tagName === "mono") {
      // special handling for 'mono'
      checkTag = checkTag && this.mono;
    } else {
      checkTag = checkTag && !this.mono;
    }

    if (checkTag && this.match(tag)) {
      if (nextTag !== undefined) {
        // Purpose of the following match is to prevent a direct unset/set of a given tag
        // E.g. '*bold **still bold*' => '*bold still bold*'
        if (
          this.position === this.text.length - 1 ||
          this.match(nextTag, false)
        ) {
          this.unsetTag(tagName);
        }
      } else {
        this.unsetTag(tagName);
      }

      return true;
    }

    return false;
  }

  /**
   * @param {string|RegExp} tag  string to match in text
   * @param {value} value  string to replace tag with, if found at current position
   * @returns {boolean} true if the tag was processed, false otherwise
   */
  replace(tag, value) {
    if (this.match(tag)) {
      this.add(value);
      this.position += length - 1;
      return true;
    }

    return false;
  }

  /**
   * Create a regular expression for the tag if it isn't already one.
   *
   * The return value is an array `[RegExp, number]`, with exactly two value, where:
   *  - RegExp is the regular expression to use
   *  - number is the lenth of the input string to match
   *
   * @param {string|RegExp} tag  string to match in text
   * @returns {Array}  regular expression to use and length of input string to match
   * @private
   */
  prepareRegExp(tag) {
    let length;
    let regExp;
    if (tag instanceof RegExp) {
      regExp = tag;
      length = 1; // ASSUMPTION: regexp only tests one character
    } else {
      // use prepared regexp if present
      const prepared = tagPattern[tag];
      if (prepared !== undefined) {
        regExp = prepared;
      } else {
        regExp = new RegExp(tag);
      }

      length = tag.length;
    }

    return [regExp, length];
  }
}

/**
 * Helper class for Label which explodes the label text into lines and blocks within lines
 *
 * @private
 */
class LabelSplitter {
  /**
   * @param {CanvasRenderingContext2D} ctx Canvas rendering context
   * @param {Label} parent reference to the Label instance using current instance
   * @param {boolean} selected
   * @param {boolean} hover
   */
  constructor(ctx, parent, selected, hover) {
    this.ctx = ctx;
    this.parent = parent;
    this.selected = selected;
    this.hover = hover;

    /**
     * Callback to determine text width; passed to LabelAccumulator instance
     *
     * @param  {string} text string to determine width of
     * @param  {string} mod  font type to use for this text
     * @returns {object} { width, values} width in pixels and font attributes
     */
    const textWidth = (text, mod) => {
      if (text === undefined) return 0;

      // TODO: This can be done more efficiently with caching
      // This will set the ctx.font correctly, depending on selected/hover and mod - so that ctx.measureText() will be accurate.
      const values = this.parent.getFormattingValues(ctx, selected, hover, mod);

      let width = 0;
      if (text !== "") {
        const measure = this.ctx.measureText(text);
        width = measure.width;
      }

      return { width, values: values };
    };

    this.lines = new LabelAccumulator(textWidth);
  }

  /**
   * Split passed text of a label into lines and blocks.
   *
   * # NOTE
   *
   * The handling of spacing is option dependent:
   *
   * - if `font.multi : false`, all spaces are retained
   * - if `font.multi : true`, every sequence of spaces is compressed to a single space
   *
   * This might not be the best way to do it, but this is as it has been working till now.
   * In order not to break existing functionality, for the time being this behaviour will
   * be retained in any code changes.
   *
   * @param {string} text  text to split
   * @returns {Array<line>}
   */
  process(text) {
    if (!isValidLabel(text)) {
      return this.lines.finalize();
    }

    const font = this.parent.fontOptions;

    // Normalize the end-of-line's to a single representation - order important
    text = text.replace(/\r\n/g, "\n"); // Dos EOL's
    text = text.replace(/\r/g, "\n"); // Mac EOL's

    // Note that at this point, there can be no \r's in the text.
    // This is used later on splitStringIntoLines() to split multifont texts.

    const nlLines = String(text).split("\n");
    const lineCount = nlLines.length;

    if (font.multi) {
      // Multi-font case: styling tags active
      for (let i = 0; i < lineCount; i++) {
        const blocks = this.splitBlocks(nlLines[i], font.multi);
        // Post: Sequences of tabs and spaces are reduced to single space

        if (blocks === undefined) continue;

        if (blocks.length === 0) {
          this.lines.newLine("");
          continue;
        }

        if (font.maxWdt > 0) {
          // widthConstraint.maximum defined
          //console.log('Running widthConstraint multi, max: ' + this.fontOptions.maxWdt);
          for (let j = 0; j < blocks.length; j++) {
            const mod = blocks[j].mod;
            const text = blocks[j].text;
            this.splitStringIntoLines(text, mod, true);
          }
        } else {
          // widthConstraint.maximum NOT defined
          for (let j = 0; j < blocks.length; j++) {
            const mod = blocks[j].mod;
            const text = blocks[j].text;
            this.lines.append(text, mod);
          }
        }

        this.lines.newLine();
      }
    } else {
      // Single-font case
      if (font.maxWdt > 0) {
        // widthConstraint.maximum defined
        // console.log('Running widthConstraint normal, max: ' + this.fontOptions.maxWdt);
        for (let i = 0; i < lineCount; i++) {
          this.splitStringIntoLines(nlLines[i]);
        }
      } else {
        // widthConstraint.maximum NOT defined
        for (let i = 0; i < lineCount; i++) {
          this.lines.newLine(nlLines[i]);
        }
      }
    }

    return this.lines.finalize();
  }

  /**
   * normalize the markup system
   *
   * @param {boolean|'md'|'markdown'|'html'} markupSystem
   * @returns {string}
   */
  decodeMarkupSystem(markupSystem) {
    let system = "none";
    if (markupSystem === "markdown" || markupSystem === "md") {
      system = "markdown";
    } else if (markupSystem === true || markupSystem === "html") {
      system = "html";
    }
    return system;
  }

  /**
   *
   * @param {string} text
   * @returns {Array}
   */
  splitHtmlBlocks(text) {
    const s = new MarkupAccumulator(text);

    const parseEntities = (ch) => {
      if (/&/.test(ch)) {
        const parsed =
          s.replace(s.text, "&lt;", "<") || s.replace(s.text, "&amp;", "&");

        if (!parsed) {
          s.add("&");
        }

        return true;
      }

      return false;
    };

    while (s.position < s.text.length) {
      const ch = s.text.charAt(s.position);

      const parsed =
        s.parseWS(ch) ||
        (/</.test(ch) &&
          (s.parseStartTag("bold", "<b>") ||
            s.parseStartTag("ital", "<i>") ||
            s.parseStartTag("mono", "<code>") ||
            s.parseEndTag("bold", "</b>") ||
            s.parseEndTag("ital", "</i>") ||
            s.parseEndTag("mono", "</code>"))) ||
        parseEntities(ch);

      if (!parsed) {
        s.add(ch);
      }
      s.position++;
    }
    s.emitBlock();
    return s.blocks;
  }

  /**
   *
   * @param {string} text
   * @returns {Array}
   */
  splitMarkdownBlocks(text) {
    const s = new MarkupAccumulator(text);
    let beginable = true;

    const parseOverride = (ch) => {
      if (/\\/.test(ch)) {
        if (s.position < this.text.length + 1) {
          s.position++;
          ch = this.text.charAt(s.position);
          if (/ \t/.test(ch)) {
            s.spacing = true;
          } else {
            s.add(ch);
            beginable = false;
          }
        }

        return true;
      }

      return false;
    };

    while (s.position < s.text.length) {
      const ch = s.text.charAt(s.position);

      const parsed =
        s.parseWS(ch) ||
        parseOverride(ch) ||
        ((beginable || s.spacing) &&
          (s.parseStartTag("bold", "*") ||
            s.parseStartTag("ital", "_") ||
            s.parseStartTag("mono", "`"))) ||
        s.parseEndTag("bold", "*", "afterBold") ||
        s.parseEndTag("ital", "_", "afterItal") ||
        s.parseEndTag("mono", "`", "afterMono");

      if (!parsed) {
        s.add(ch);
        beginable = false;
      }
      s.position++;
    }
    s.emitBlock();
    return s.blocks;
  }

  /**
   * Explodes a piece of text into single-font blocks using a given markup
   *
   * @param {string} text
   * @param {boolean|'md'|'markdown'|'html'} markupSystem
   * @returns {Array.<{text: string, mod: string}>}
   * @private
   */
  splitBlocks(text, markupSystem) {
    const system = this.decodeMarkupSystem(markupSystem);
    if (system === "none") {
      return [
        {
          text: text,
          mod: "normal",
        },
      ];
    } else if (system === "markdown") {
      return this.splitMarkdownBlocks(text);
    } else if (system === "html") {
      return this.splitHtmlBlocks(text);
    }
  }

  /**
   * @param {string} text
   * @returns {boolean} true if text length over the current max with
   * @private
   */
  overMaxWidth(text) {
    const width = this.ctx.measureText(text).width;
    return this.lines.curWidth() + width > this.parent.fontOptions.maxWdt;
  }

  /**
   * Determine the longest part of the sentence which still fits in the
   * current max width.
   *
   * @param {Array} words  Array of strings signifying a text lines
   * @returns {number}      index of first item in string making string go over max
   * @private
   */
  getLongestFit(words) {
    let text = "";
    let w = 0;

    while (w < words.length) {
      const pre = text === "" ? "" : " ";
      const newText = text + pre + words[w];

      if (this.overMaxWidth(newText)) break;
      text = newText;
      w++;
    }

    return w;
  }

  /**
   * Determine the longest part of the string which still fits in the
   * current max width.
   *
   * @param {Array} words Array of strings signifying a text lines
   * @returns {number} index of first item in string making string go over max
   */
  getLongestFitWord(words) {
    let w = 0;

    while (w < words.length) {
      if (this.overMaxWidth(words.slice(0, w))) break;
      w++;
    }

    return w;
  }

  /**
   * Split the passed text into lines, according to width constraint (if any).
   *
   * The method assumes that the input string is a single line, i.e. without lines break.
   *
   * This method retains spaces, if still present (case `font.multi: false`).
   * A space which falls on an internal line break, will be replaced by a newline.
   * There is no special handling of tabs; these go along with the flow.
   *
   * @param {string} str
   * @param {string} [mod='normal']
   * @param {boolean} [appendLast=false]
   * @private
   */
  splitStringIntoLines(str, mod = "normal", appendLast = false) {
    // Set the canvas context font, based upon the current selected/hover state
    // and the provided mod, so the text measurement performed by getLongestFit
    // will be accurate - and not just use the font of whoever last used the canvas.
    this.parent.getFormattingValues(this.ctx, this.selected, this.hover, mod);

    // Still-present spaces are relevant, retain them
    str = str.replace(/^( +)/g, "$1\r");
    str = str.replace(/([^\r][^ ]*)( +)/g, "$1\r$2\r");
    let words = str.split("\r");

    while (words.length > 0) {
      let w = this.getLongestFit(words);

      if (w === 0) {
        // Special case: the first word is already larger than the max width.
        const word = words[0];

        // Break the word to the largest part that fits the line
        const x = this.getLongestFitWord(word);
        this.lines.newLine(word.slice(0, x), mod);

        // Adjust the word, so that the rest will be done next iteration
        words[0] = word.slice(x);
      } else {
        // skip any space that is replaced by a newline
        let newW = w;
        if (words[w - 1] === " ") {
          w--;
        } else if (words[newW] === " ") {
          newW++;
        }

        const text = words.slice(0, w).join("");

        if (w == words.length && appendLast) {
          this.lines.append(text, mod);
        } else {
          this.lines.newLine(text, mod);
        }

        // Adjust the word, so that the rest will be done next iteration
        words = words.slice(newW);
      }
    }
  }
}

/**
 * List of special styles for multi-fonts
 *
 * @private
 */
const multiFontStyle = ["bold", "ital", "boldital", "mono"];

/**
 * A Label to be used for Nodes or Edges.
 */
class Label {
  /**
   * @param {object} body
   * @param {object} options
   * @param {boolean} [edgelabel=false]
   */
  constructor(body, options, edgelabel = false) {
    this.body = body;
    this.pointToSelf = false;
    this.baseSize = undefined;
    this.fontOptions = {}; // instance variable containing the *instance-local* font options
    this.setOptions(options);
    this.size = { top: 0, left: 0, width: 0, height: 0, yLine: 0 };
    this.isEdgeLabel = edgelabel;
  }

  /**
   * @param {object} options the options of the parent Node-instance
   */
  setOptions(options) {
    this.elementOptions = options; // Reference to the options of the parent Node-instance

    this.initFontOptions(options.font);

    if (isValidLabel(options.label)) {
      this.labelDirty = true;
    } else {
      // Bad label! Change the option value to prevent bad stuff happening
      options.label = undefined;
    }

    if (options.font !== undefined && options.font !== null) {
      // font options can be deleted at various levels
      if (typeof options.font === "string") {
        this.baseSize = this.fontOptions.size;
      } else if (typeof options.font === "object") {
        const size = options.font.size;

        if (size !== undefined) {
          this.baseSize = size;
        }
      }
    }
  }

  /**
   * Init the font Options structure.
   *
   * Member fontOptions serves as an accumulator for the current font options.
   * As such, it needs to be completely separated from the node options.
   *
   * @param {object} newFontOptions the new font options to process
   * @private
   */
  initFontOptions(newFontOptions) {
    // Prepare the multi-font option objects.
    // These will be filled in propagateFonts(), if required
    forEach(multiFontStyle, (style) => {
      this.fontOptions[style] = {};
    });

    // Handle shorthand option, if present
    if (Label.parseFontString(this.fontOptions, newFontOptions)) {
      this.fontOptions.vadjust = 0;
      return;
    }

    // Copy over the non-multifont options, if specified
    forEach(newFontOptions, (prop, n) => {
      if (prop !== undefined && prop !== null && typeof prop !== "object") {
        this.fontOptions[n] = prop;
      }
    });
  }

  /**
   * If in-variable is a string, parse it as a font specifier.
   *
   * Note that following is not done here and have to be done after the call:
   * - Not all font options are set (vadjust, mod)
   *
   * @param {object} outOptions  out-parameter, object in which to store the parse results (if any)
   * @param {object} inOptions  font options to parse
   * @returns {boolean} true if font parsed as string, false otherwise
   * @static
   */
  static parseFontString(outOptions, inOptions) {
    if (!inOptions || typeof inOptions !== "string") return false;

    const newOptionsArray = inOptions.split(" ");

    outOptions.size = +newOptionsArray[0].replace("px", "");
    outOptions.face = newOptionsArray[1];
    outOptions.color = newOptionsArray[2];

    return true;
  }

  /**
   * Set the width and height constraints based on 'nearest' value
   *
   * @param {Array} pile array of option objects to consider
   * @returns {object} the actual constraint values to use
   * @private
   */
  constrain(pile) {
    // NOTE: constrainWidth and  constrainHeight never set!
    // NOTE: for edge labels, only 'maxWdt' set
    // Node labels can set all the fields
    const fontOptions = {
      constrainWidth: false,
      maxWdt: -1,
      minWdt: -1,
      constrainHeight: false,
      minHgt: -1,
      valign: "middle",
    };

    const widthConstraint = topMost(pile, "widthConstraint");
    if (typeof widthConstraint === "number") {
      fontOptions.maxWdt = Number(widthConstraint);
      fontOptions.minWdt = Number(widthConstraint);
    } else if (typeof widthConstraint === "object") {
      const widthConstraintMaximum = topMost(pile, [
        "widthConstraint",
        "maximum",
      ]);
      if (typeof widthConstraintMaximum === "number") {
        fontOptions.maxWdt = Number(widthConstraintMaximum);
      }
      const widthConstraintMinimum = topMost(pile, [
        "widthConstraint",
        "minimum",
      ]);
      if (typeof widthConstraintMinimum === "number") {
        fontOptions.minWdt = Number(widthConstraintMinimum);
      }
    }

    const heightConstraint = topMost(pile, "heightConstraint");
    if (typeof heightConstraint === "number") {
      fontOptions.minHgt = Number(heightConstraint);
    } else if (typeof heightConstraint === "object") {
      const heightConstraintMinimum = topMost(pile, [
        "heightConstraint",
        "minimum",
      ]);
      if (typeof heightConstraintMinimum === "number") {
        fontOptions.minHgt = Number(heightConstraintMinimum);
      }
      const heightConstraintValign = topMost(pile, [
        "heightConstraint",
        "valign",
      ]);
      if (typeof heightConstraintValign === "string") {
        if (
          heightConstraintValign === "top" ||
          heightConstraintValign === "bottom"
        ) {
          fontOptions.valign = heightConstraintValign;
        }
      }
    }

    return fontOptions;
  }

  /**
   * Set options and update internal state
   *
   * @param {object} options  options to set
   * @param {Array}  pile     array of option objects to consider for option 'chosen'
   */
  update(options, pile) {
    this.setOptions(options, true);
    this.propagateFonts(pile);
    deepExtend(this.fontOptions, this.constrain(pile));
    this.fontOptions.chooser = choosify("label", pile);
  }

  /**
   * When margins are set in an element, adjust sizes is called to remove them
   * from the width/height constraints. This must be done prior to label sizing.
   *
   * @param {{top: number, right: number, bottom: number, left: number}} margins
   */
  adjustSizes(margins) {
    const widthBias = margins ? margins.right + margins.left : 0;
    if (this.fontOptions.constrainWidth) {
      this.fontOptions.maxWdt -= widthBias;
      this.fontOptions.minWdt -= widthBias;
    }
    const heightBias = margins ? margins.top + margins.bottom : 0;
    if (this.fontOptions.constrainHeight) {
      this.fontOptions.minHgt -= heightBias;
    }
  }

  /////////////////////////////////////////////////////////
  // Methods for handling options piles
  // Eventually, these will be moved to a separate class
  /////////////////////////////////////////////////////////

  /**
   * Add the font members of the passed list of option objects to the pile.
   *
   * @param {Pile} dstPile  pile of option objects add to
   * @param {Pile} srcPile  pile of option objects to take font options from
   * @private
   */
  addFontOptionsToPile(dstPile, srcPile) {
    for (let i = 0; i < srcPile.length; ++i) {
      this.addFontToPile(dstPile, srcPile[i]);
    }
  }

  /**
   * Add given font option object to the list of objects (the 'pile') to consider for determining
   * multi-font option values.
   *
   * @param {Pile} pile  pile of option objects to use
   * @param {object} options  instance to add to pile
   * @private
   */
  addFontToPile(pile, options) {
    if (options === undefined) return;
    if (options.font === undefined || options.font === null) return;

    const item = options.font;
    pile.push(item);
  }

  /**
   * Collect all own-property values from the font pile that aren't multi-font option objectss.
   *
   * @param {Pile} pile  pile of option objects to use
   * @returns {object} object with all current own basic font properties
   * @private
   */
  getBasicOptions(pile) {
    const ret = {};

    // Scans the whole pile to get all options present
    for (let n = 0; n < pile.length; ++n) {
      let fontOptions = pile[n];

      // Convert shorthand if necessary
      const tmpShorthand = {};
      if (Label.parseFontString(tmpShorthand, fontOptions)) {
        fontOptions = tmpShorthand;
      }

      forEach(fontOptions, (opt, name) => {
        if (opt === undefined) return; // multi-font option need not be present
        if (Object.prototype.hasOwnProperty.call(ret, name)) return; // Keep first value we encounter

        if (multiFontStyle.indexOf(name) !== -1) {
          // Skip multi-font properties but we do need the structure
          ret[name] = {};
        } else {
          ret[name] = opt;
        }
      });
    }

    return ret;
  }

  /**
   * Return the value for given option for the given multi-font.
   *
   * All available option objects are trawled in the set order to construct the option values.
   *
   * ---------------------------------------------------------------------
   * ## Traversal of pile for multi-fonts
   *
   * The determination of multi-font option values is a special case, because any values not
   * present in the multi-font options should by definition be taken from the main font options,
   * i.e. from the current 'parent' object of the multi-font option.
   *
   * ### Search order for multi-fonts
   *
   * 'bold' used as example:
   *
   *   - search in option group 'bold' in local properties
   *   - search in main font option group in local properties
   *
   * ---------------------------------------------------------------------
   *
   * @param {Pile} pile  pile of option objects to use
   * @param {MultiFontStyle} multiName sub path for the multi-font
   * @param {string} option  the option to search for, for the given multi-font
   * @returns {string|number} the value for the given option
   * @private
   */
  getFontOption(pile, multiName, option) {
    let multiFont;

    // Search multi font in local properties
    for (let n = 0; n < pile.length; ++n) {
      const fontOptions = pile[n];

      if (Object.prototype.hasOwnProperty.call(fontOptions, multiName)) {
        multiFont = fontOptions[multiName];
        if (multiFont === undefined || multiFont === null) continue;

        // Convert shorthand if necessary
        // TODO: inefficient to do this conversion every time; find a better way.
        const tmpShorthand = {};
        if (Label.parseFontString(tmpShorthand, multiFont)) {
          multiFont = tmpShorthand;
        }

        if (Object.prototype.hasOwnProperty.call(multiFont, option)) {
          return multiFont[option];
        }
      }
    }

    // Option is not mentioned in the multi font options; take it from the parent font options.
    // These have already been converted with getBasicOptions(), so use the converted values.
    if (Object.prototype.hasOwnProperty.call(this.fontOptions, option)) {
      return this.fontOptions[option];
    }

    // A value **must** be found; you should never get here.
    throw new Error(
      "Did not find value for multi-font for property: '" + option + "'"
    );
  }

  /**
   * Return all options values for the given multi-font.
   *
   * All available option objects are trawled in the set order to construct the option values.
   *
   * @param {Pile} pile  pile of option objects to use
   * @param {MultiFontStyle} multiName sub path for the mod-font
   * @returns {MultiFontOptions}
   * @private
   */
  getFontOptions(pile, multiName) {
    const result = {};
    const optionNames = ["color", "size", "face", "mod", "vadjust"]; // List of allowed options per multi-font

    for (let i = 0; i < optionNames.length; ++i) {
      const mod = optionNames[i];
      result[mod] = this.getFontOption(pile, multiName, mod);
    }

    return result;
  }

  /////////////////////////////////////////////////////////
  // End methods for handling options piles
  /////////////////////////////////////////////////////////

  /**
   * Collapse the font options for the multi-font to single objects, from
   * the chain of option objects passed (the 'pile').
   *
   * @param {Pile} pile  sequence of option objects to consider.
   *                     First item in list assumed to be the newly set options.
   */
  propagateFonts(pile) {
    const fontPile = []; // sequence of font objects to consider, order important

    // Note that this.elementOptions is not used here.
    this.addFontOptionsToPile(fontPile, pile);
    this.fontOptions = this.getBasicOptions(fontPile);

    // We set multifont values even if multi === false, for consistency (things break otherwise)
    for (let i = 0; i < multiFontStyle.length; ++i) {
      const mod = multiFontStyle[i];
      const modOptions = this.fontOptions[mod];
      const tmpMultiFontOptions = this.getFontOptions(fontPile, mod);

      // Copy over found values
      forEach(tmpMultiFontOptions, (option, n) => {
        modOptions[n] = option;
      });

      modOptions.size = Number(modOptions.size);
      modOptions.vadjust = Number(modOptions.vadjust);
    }
  }

  /**
   * Main function. This is called from anything that wants to draw a label.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {string} [baseline='middle']
   */
  draw(ctx, x, y, selected, hover, baseline = "middle") {
    // if no label, return
    if (this.elementOptions.label === undefined) return;

    // check if we have to render the label
    let viewFontSize = this.fontOptions.size * this.body.view.scale;
    if (
      this.elementOptions.label &&
      viewFontSize < this.elementOptions.scaling.label.drawThreshold - 1
    )
      return;

    // This ensures that there will not be HUGE letters on screen
    // by setting an upper limit on the visible text size (regardless of zoomLevel)
    if (viewFontSize >= this.elementOptions.scaling.label.maxVisible) {
      viewFontSize =
        Number(this.elementOptions.scaling.label.maxVisible) /
        this.body.view.scale;
    }

    // update the size cache if required
    this.calculateLabelSize(ctx, selected, hover, x, y, baseline);
    this._drawBackground(ctx);
    this._drawText(ctx, x, this.size.yLine, baseline, viewFontSize);
  }

  /**
   * Draws the label background
   *
   * @param {CanvasRenderingContext2D} ctx
   * @private
   */
  _drawBackground(ctx) {
    if (
      this.fontOptions.background !== undefined &&
      this.fontOptions.background !== "none"
    ) {
      ctx.fillStyle = this.fontOptions.background;
      const size = this.getSize();
      ctx.fillRect(size.left, size.top, size.width, size.height);
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {string} [baseline='middle']
   * @param {number} viewFontSize
   * @private
   */
  _drawText(ctx, x, y, baseline = "middle", viewFontSize) {
    [x, y] = this._setAlignment(ctx, x, y, baseline);

    ctx.textAlign = "left";
    x = x - this.size.width / 2; // Shift label 1/2-distance to the left
    if (this.fontOptions.valign && this.size.height > this.size.labelHeight) {
      if (this.fontOptions.valign === "top") {
        y -= (this.size.height - this.size.labelHeight) / 2;
      }
      if (this.fontOptions.valign === "bottom") {
        y += (this.size.height - this.size.labelHeight) / 2;
      }
    }

    // draw the text
    for (let i = 0; i < this.lineCount; i++) {
      const line = this.lines[i];
      if (line && line.blocks) {
        let width = 0;
        if (this.isEdgeLabel || this.fontOptions.align === "center") {
          width += (this.size.width - line.width) / 2;
        } else if (this.fontOptions.align === "right") {
          width += this.size.width - line.width;
        }
        for (let j = 0; j < line.blocks.length; j++) {
          const block = line.blocks[j];
          ctx.font = block.font;
          const [fontColor, strokeColor] = this._getColor(
            block.color,
            viewFontSize,
            block.strokeColor
          );
          if (block.strokeWidth > 0) {
            ctx.lineWidth = block.strokeWidth;
            ctx.strokeStyle = strokeColor;
            ctx.lineJoin = "round";
          }
          ctx.fillStyle = fontColor;

          if (block.strokeWidth > 0) {
            ctx.strokeText(block.text, x + width, y + block.vadjust);
          }
          ctx.fillText(block.text, x + width, y + block.vadjust);
          width += block.width;
        }
        y += line.height;
      }
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {string} baseline
   * @returns {Array.<number>}
   * @private
   */
  _setAlignment(ctx, x, y, baseline) {
    // check for label alignment (for edges)
    // TODO: make alignment for nodes
    if (
      this.isEdgeLabel &&
      this.fontOptions.align !== "horizontal" &&
      this.pointToSelf === false
    ) {
      x = 0;
      y = 0;

      const lineMargin = 2;
      if (this.fontOptions.align === "top") {
        ctx.textBaseline = "alphabetic";
        y -= 2 * lineMargin; // distance from edge, required because we use alphabetic. Alphabetic has less difference between browsers
      } else if (this.fontOptions.align === "bottom") {
        ctx.textBaseline = "hanging";
        y += 2 * lineMargin; // distance from edge, required because we use hanging. Hanging has less difference between browsers
      } else {
        ctx.textBaseline = "middle";
      }
    } else {
      ctx.textBaseline = baseline;
    }
    return [x, y];
  }

  /**
   * fade in when relative scale is between threshold and threshold - 1.
   * If the relative scale would be smaller than threshold -1 the draw function would have returned before coming here.
   *
   * @param {string} color  The font color to use
   * @param {number} viewFontSize
   * @param {string} initialStrokeColor
   * @returns {Array.<string>} An array containing the font color and stroke color
   * @private
   */
  _getColor(color, viewFontSize, initialStrokeColor) {
    let fontColor = color || "#000000";
    let strokeColor = initialStrokeColor || "#ffffff";
    if (viewFontSize <= this.elementOptions.scaling.label.drawThreshold) {
      const opacity = Math.max(
        0,
        Math.min(
          1,
          1 - (this.elementOptions.scaling.label.drawThreshold - viewFontSize)
        )
      );
      fontColor = overrideOpacity(fontColor, opacity);
      strokeColor = overrideOpacity(strokeColor, opacity);
    }
    return [fontColor, strokeColor];
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   * @returns {{width: number, height: number}}
   */
  getTextSize(ctx, selected = false, hover = false) {
    this._processLabel(ctx, selected, hover);
    return {
      width: this.size.width,
      height: this.size.height,
      lineCount: this.lineCount,
    };
  }

  /**
   * Get the current dimensions of the label
   *
   * @returns {rect}
   */
  getSize() {
    const lineMargin = 2;
    let x = this.size.left; // default values which might be overridden below
    let y = this.size.top - 0.5 * lineMargin; // idem

    if (this.isEdgeLabel) {
      const x2 = -this.size.width * 0.5;

      switch (this.fontOptions.align) {
        case "middle":
          x = x2;
          y = -this.size.height * 0.5;
          break;
        case "top":
          x = x2;
          y = -(this.size.height + lineMargin);
          break;
        case "bottom":
          x = x2;
          y = lineMargin;
          break;
      }
    }

    const ret = {
      left: x,
      top: y,
      width: this.size.width,
      height: this.size.height,
    };

    return ret;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {number} [x=0]
   * @param {number} [y=0]
   * @param {'middle'|'hanging'} [baseline='middle']
   */
  calculateLabelSize(ctx, selected, hover, x = 0, y = 0, baseline = "middle") {
    this._processLabel(ctx, selected, hover);
    this.size.left = x - this.size.width * 0.5;
    this.size.top = y - this.size.height * 0.5;
    this.size.yLine = y + (1 - this.lineCount) * 0.5 * this.fontOptions.size;
    if (baseline === "hanging") {
      this.size.top += 0.5 * this.fontOptions.size;
      this.size.top += 4; // distance from node, required because we use hanging. Hanging has less difference between browsers
      this.size.yLine += 4; // distance from node
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {string} mod
   * @returns {{color, size, face, mod, vadjust, strokeWidth: *, strokeColor: (*|string|allOptions.edges.font.strokeColor|{string}|allOptions.nodes.font.strokeColor|Array)}}
   */
  getFormattingValues(ctx, selected, hover, mod) {
    const getValue = function (fontOptions, mod, option) {
      if (mod === "normal") {
        if (option === "mod") return "";
        return fontOptions[option];
      }

      if (fontOptions[mod][option] !== undefined) {
        // Grumbl leaving out test on undefined equals false for ""
        return fontOptions[mod][option];
      } else {
        // Take from parent font option
        return fontOptions[option];
      }
    };

    const values = {
      color: getValue(this.fontOptions, mod, "color"),
      size: getValue(this.fontOptions, mod, "size"),
      face: getValue(this.fontOptions, mod, "face"),
      mod: getValue(this.fontOptions, mod, "mod"),
      vadjust: getValue(this.fontOptions, mod, "vadjust"),
      strokeWidth: this.fontOptions.strokeWidth,
      strokeColor: this.fontOptions.strokeColor,
    };
    if (selected || hover) {
      if (
        mod === "normal" &&
        this.fontOptions.chooser === true &&
        this.elementOptions.labelHighlightBold
      ) {
        values.mod = "bold";
      } else {
        if (typeof this.fontOptions.chooser === "function") {
          this.fontOptions.chooser(
            values,
            this.elementOptions.id,
            selected,
            hover
          );
        }
      }
    }

    let fontString = "";
    if (values.mod !== undefined && values.mod !== "") {
      // safeguard for undefined - this happened
      fontString += values.mod + " ";
    }
    fontString += values.size + "px " + values.face;

    ctx.font = fontString.replace(/"/g, "");
    values.font = ctx.font;
    values.height = values.size;
    return values;
  }

  /**
   *
   * @param {boolean} selected
   * @param {boolean} hover
   * @returns {boolean}
   */
  differentState(selected, hover) {
    return selected !== this.selectedState || hover !== this.hoverState;
  }

  /**
   * This explodes the passed text into lines and determines the width, height and number of lines.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {string} inText  the text to explode
   * @returns {{width, height, lines}|*}
   * @private
   */
  _processLabelText(ctx, selected, hover, inText) {
    const splitter = new LabelSplitter(ctx, this, selected, hover);
    return splitter.process(inText);
  }

  /**
   * This explodes the label string into lines and sets the width, height and number of lines.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   * @private
   */
  _processLabel(ctx, selected, hover) {
    if (this.labelDirty === false && !this.differentState(selected, hover))
      return;

    const state = this._processLabelText(
      ctx,
      selected,
      hover,
      this.elementOptions.label
    );

    if (this.fontOptions.minWdt > 0 && state.width < this.fontOptions.minWdt) {
      state.width = this.fontOptions.minWdt;
    }

    this.size.labelHeight = state.height;
    if (this.fontOptions.minHgt > 0 && state.height < this.fontOptions.minHgt) {
      state.height = this.fontOptions.minHgt;
    }

    this.lines = state.lines;
    this.lineCount = state.lines.length;
    this.size.width = state.width;
    this.size.height = state.height;
    this.selectedState = selected;
    this.hoverState = hover;

    this.labelDirty = false;
  }

  /**
   * Check if this label is visible
   *
   * @returns {boolean} true if this label will be show, false otherwise
   */
  visible() {
    if (
      this.size.width === 0 ||
      this.size.height === 0 ||
      this.elementOptions.label === undefined
    ) {
      return false; // nothing to display
    }

    const viewFontSize = this.fontOptions.size * this.body.view.scale;
    if (viewFontSize < this.elementOptions.scaling.label.drawThreshold - 1) {
      return false; // Too small or too far away to show
    }

    return true;
  }
}

/**
 * The Base class for all Nodes.
 */
class NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    this.body = body;
    this.labelModule = labelModule;
    this.setOptions(options);
    this.top = undefined;
    this.left = undefined;
    this.height = undefined;
    this.width = undefined;
    this.radius = undefined;
    this.margin = undefined;
    this.refreshNeeded = true;
    this.boundingBox = { top: 0, left: 0, right: 0, bottom: 0 };
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   *
   * @param {Label} labelModule
   * @private
   */
  _setMargins(labelModule) {
    this.margin = {};
    if (this.options.margin) {
      if (typeof this.options.margin == "object") {
        this.margin.top = this.options.margin.top;
        this.margin.right = this.options.margin.right;
        this.margin.bottom = this.options.margin.bottom;
        this.margin.left = this.options.margin.left;
      } else {
        this.margin.top = this.options.margin;
        this.margin.right = this.options.margin;
        this.margin.bottom = this.options.margin;
        this.margin.left = this.options.margin;
      }
    }
    labelModule.adjustSizes(this.margin);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   * @private
   */
  _distanceToBorder(ctx, angle) {
    const borderWidth = this.options.borderWidth;
    if (ctx) {
      this.resize(ctx);
    }
    return (
      Math.min(
        Math.abs(this.width / 2 / Math.cos(angle)),
        Math.abs(this.height / 2 / Math.sin(angle))
      ) + borderWidth
    );
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  enableShadow(ctx, values) {
    if (values.shadow) {
      ctx.shadowColor = values.shadowColor;
      ctx.shadowBlur = values.shadowSize;
      ctx.shadowOffsetX = values.shadowX;
      ctx.shadowOffsetY = values.shadowY;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  disableShadow(ctx, values) {
    if (values.shadow) {
      ctx.shadowColor = "rgba(0,0,0,0)";
      ctx.shadowBlur = 0;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  enableBorderDashes(ctx, values) {
    if (values.borderDashes !== false) {
      if (ctx.setLineDash !== undefined) {
        let dashes = values.borderDashes;
        if (dashes === true) {
          dashes = [5, 15];
        }
        ctx.setLineDash(dashes);
      } else {
        console.warn(
          "setLineDash is not supported in this browser. The dashed borders cannot be used."
        );
        this.options.shapeProperties.borderDashes = false;
        values.borderDashes = false;
      }
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  disableBorderDashes(ctx, values) {
    if (values.borderDashes !== false) {
      if (ctx.setLineDash !== undefined) {
        ctx.setLineDash([0]);
      } else {
        console.warn(
          "setLineDash is not supported in this browser. The dashed borders cannot be used."
        );
        this.options.shapeProperties.borderDashes = false;
        values.borderDashes = false;
      }
    }
  }

  /**
   * Determine if the shape of a node needs to be recalculated.
   *
   * @param {boolean} selected
   * @param {boolean} hover
   * @returns {boolean}
   * @protected
   */
  needsRefresh(selected, hover) {
    if (this.refreshNeeded === true) {
      // This is probably not the best location to reset this member.
      // However, in the current logic, it is the most convenient one.
      this.refreshNeeded = false;
      return true;
    }

    return (
      this.width === undefined ||
      this.labelModule.differentState(selected, hover)
    );
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  initContextForDraw(ctx, values) {
    const borderWidth = values.borderWidth / this.body.view.scale;

    ctx.lineWidth = Math.min(this.width, borderWidth);
    ctx.strokeStyle = values.borderColor;
    ctx.fillStyle = values.color;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  performStroke(ctx, values) {
    const borderWidth = values.borderWidth / this.body.view.scale;

    //draw dashed border if enabled, save and restore is required for firefox not to crash on unix.
    ctx.save();
    // if borders are zero width, they will be drawn with width 1 by default. This prevents that
    if (borderWidth > 0) {
      this.enableBorderDashes(ctx, values);
      //draw the border
      ctx.stroke();
      //disable dashed border for other elements
      this.disableBorderDashes(ctx, values);
    }
    ctx.restore();
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   */
  performFill(ctx, values) {
    ctx.save();
    ctx.fillStyle = values.color;
    // draw shadow if enabled
    this.enableShadow(ctx, values);
    // draw the background
    ctx.fill();
    // disable shadows for other elements.
    this.disableShadow(ctx, values);

    ctx.restore();
    this.performStroke(ctx, values);
  }

  /**
   *
   * @param {number} margin
   * @private
   */
  _addBoundingBoxMargin(margin) {
    this.boundingBox.left -= margin;
    this.boundingBox.top -= margin;
    this.boundingBox.bottom += margin;
    this.boundingBox.right += margin;
  }

  /**
   * Actual implementation of this method call.
   *
   * Doing it like this makes it easier to override
   * in the child classes.
   *
   * @param {number} x width
   * @param {number} y height
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   * @private
   */
  _updateBoundingBox(x, y, ctx, selected, hover) {
    if (ctx !== undefined) {
      this.resize(ctx, selected, hover);
    }

    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.boundingBox.left = this.left;
    this.boundingBox.top = this.top;
    this.boundingBox.bottom = this.top + this.height;
    this.boundingBox.right = this.left + this.width;
  }

  /**
   * Default implementation of this method call.
   * This acts as a stub which can be overridden.
   *
   * @param {number} x width
   * @param {number} y height
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */
  updateBoundingBox(x, y, ctx, selected, hover) {
    this._updateBoundingBox(x, y, ctx, selected, hover);
  }

  /**
   * Determine the dimensions to use for nodes with an internal label
   *
   * Currently, these are: Circle, Ellipse, Database, Box
   * The other nodes have external labels, and will not call this method
   *
   * If there is no label, decent default values are supplied.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   * @returns {{width:number, height:number}}
   */
  getDimensionsFromLabel(ctx, selected, hover) {
    // NOTE: previously 'textSize' was not put in 'this' for Ellipse
    // TODO: examine the consequences.
    this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
    let width = this.textSize.width;
    let height = this.textSize.height;

    const DEFAULT_SIZE = 14;
    if (width === 0) {
      // This happens when there is no label text set
      width = DEFAULT_SIZE; // use a decent default
      height = DEFAULT_SIZE; // if width zero, then height also always zero
    }

    return { width: width, height: height };
  }
}

/**
 * A Box Node/Cluster shape.
 *
 * @augments NodeBase
 */
let Box$1 = class Box extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this._setMargins(labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);

      this.width = dimensions.width + this.margin.right + this.margin.left;
      this.height = dimensions.height + this.margin.top + this.margin.bottom;
      this.radius = this.width / 2;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    drawRoundRect(
      ctx,
      this.left,
      this.top,
      this.width,
      this.height,
      values.borderRadius
    );
    this.performFill(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
    this.labelModule.draw(
      ctx,
      this.left + this.textSize.width / 2 + this.margin.left,
      this.top + this.textSize.height / 2 + this.margin.top,
      selected,
      hover
    );
  }

  /**
   *
   * @param {number} x width
   * @param {number} y height
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */
  updateBoundingBox(x, y, ctx, selected, hover) {
    this._updateBoundingBox(x, y, ctx, selected, hover);

    const borderRadius = this.options.shapeProperties.borderRadius; // only effective for box
    this._addBoundingBoxMargin(borderRadius);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    if (ctx) {
      this.resize(ctx);
    }
    const borderWidth = this.options.borderWidth;

    return (
      Math.min(
        Math.abs(this.width / 2 / Math.cos(angle)),
        Math.abs(this.height / 2 / Math.sin(angle))
      ) + borderWidth
    );
  }
};

/**
 * NOTE: This is a bad base class
 *
 * Child classes are:
 *
 *   Image       - uses *only* image methods
 *   Circle      - uses *only* _drawRawCircle
 *   CircleImage - uses all
 *
 * TODO: Refactor, move _drawRawCircle to different module, derive Circle from NodeBase
 *       Rename this to ImageBase
 *       Consolidate common code in Image and CircleImage to base class
 *
 * @augments NodeBase
 */
class CircleImageBase extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this.labelOffset = 0;
    this.selected = false;
  }

  /**
   *
   * @param {object} options
   * @param {object} [imageObj]
   * @param {object} [imageObjAlt]
   */
  setOptions(options, imageObj, imageObjAlt) {
    this.options = options;

    if (!(imageObj === undefined && imageObjAlt === undefined)) {
      this.setImages(imageObj, imageObjAlt);
    }
  }

  /**
   * Set the images for this node.
   *
   * The images can be updated after the initial setting of options;
   * therefore, this method needs to be reentrant.
   *
   * For correct working in error cases, it is necessary to properly set
   * field 'nodes.brokenImage' in the options.
   *
   * @param {Image} imageObj  required; main image to show for this node
   * @param {Image|undefined} imageObjAlt optional; image to show when node is selected
   */
  setImages(imageObj, imageObjAlt) {
    if (imageObjAlt && this.selected) {
      this.imageObj = imageObjAlt;
      this.imageObjAlt = imageObj;
    } else {
      this.imageObj = imageObj;
      this.imageObjAlt = imageObjAlt;
    }
  }

  /**
   * Set selection and switch between the base and the selected image.
   *
   * Do the switch only if imageObjAlt exists.
   *
   * @param {boolean} selected value of new selected state for current node
   */
  switchImages(selected) {
    const selection_changed =
      (selected && !this.selected) || (!selected && this.selected);
    this.selected = selected; // Remember new selection

    if (this.imageObjAlt !== undefined && selection_changed) {
      const imageTmp = this.imageObj;
      this.imageObj = this.imageObjAlt;
      this.imageObjAlt = imageTmp;
    }
  }

  /**
   * Returns Image Padding from node options
   *
   * @returns {{top: number,left: number,bottom: number,right: number}} image padding inside this shape
   * @private
   */
  _getImagePadding() {
    const imgPadding = { top: 0, right: 0, bottom: 0, left: 0 };
    if (this.options.imagePadding) {
      const optImgPadding = this.options.imagePadding;
      if (typeof optImgPadding == "object") {
        imgPadding.top = optImgPadding.top;
        imgPadding.right = optImgPadding.right;
        imgPadding.bottom = optImgPadding.bottom;
        imgPadding.left = optImgPadding.left;
      } else {
        imgPadding.top = optImgPadding;
        imgPadding.right = optImgPadding;
        imgPadding.bottom = optImgPadding;
        imgPadding.left = optImgPadding;
      }
    }

    return imgPadding;
  }

  /**
   * Adjust the node dimensions for a loaded image.
   *
   * Pre: this.imageObj is valid
   */
  _resizeImage() {
    let width, height;

    if (this.options.shapeProperties.useImageSize === false) {
      // Use the size property
      let ratio_width = 1;
      let ratio_height = 1;

      // Only calculate the proper ratio if both width and height not zero
      if (this.imageObj.width && this.imageObj.height) {
        if (this.imageObj.width > this.imageObj.height) {
          ratio_width = this.imageObj.width / this.imageObj.height;
        } else {
          ratio_height = this.imageObj.height / this.imageObj.width;
        }
      }

      width = this.options.size * 2 * ratio_width;
      height = this.options.size * 2 * ratio_height;
    } else {
      // Use the image size with image padding
      const imgPadding = this._getImagePadding();
      width = this.imageObj.width + imgPadding.left + imgPadding.right;
      height = this.imageObj.height + imgPadding.top + imgPadding.bottom;
    }

    this.width = width;
    this.height = height;
    this.radius = 0.5 * this.width;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {ArrowOptions} values
   * @private
   */
  _drawRawCircle(ctx, x, y, values) {
    this.initContextForDraw(ctx, values);
    drawCircle(ctx, x, y, values.size);
    this.performFill(ctx, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {ArrowOptions} values
   * @private
   */
  _drawImageAtPosition(ctx, values) {
    if (this.imageObj.width != 0) {
      // draw the image
      ctx.globalAlpha = values.opacity !== undefined ? values.opacity : 1;

      // draw shadow if enabled
      this.enableShadow(ctx, values);

      let factor = 1;
      if (this.options.shapeProperties.interpolation === true) {
        factor = this.imageObj.width / this.width / this.body.view.scale;
      }

      const imgPadding = this._getImagePadding();

      const imgPosLeft = this.left + imgPadding.left;
      const imgPosTop = this.top + imgPadding.top;
      const imgWidth = this.width - imgPadding.left - imgPadding.right;
      const imgHeight = this.height - imgPadding.top - imgPadding.bottom;
      this.imageObj.drawImageAtPosition(
        ctx,
        factor,
        imgPosLeft,
        imgPosTop,
        imgWidth,
        imgHeight
      );

      // disable shadows for other elements.
      this.disableShadow(ctx, values);
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @private
   */
  _drawImageLabel(ctx, x, y, selected, hover) {
    let offset = 0;

    if (this.height !== undefined) {
      offset = this.height * 0.5;
      const labelDimensions = this.labelModule.getTextSize(
        ctx,
        selected,
        hover
      );
      if (labelDimensions.lineCount >= 1) {
        offset += labelDimensions.height / 2;
      }
    }

    const yLabel = y + offset;

    if (this.options.label) {
      this.labelOffset = offset;
    }
    this.labelModule.draw(ctx, x, yLabel, selected, hover, "hanging");
  }
}

/**
 * A Circle Node/Cluster shape.
 *
 * @augments CircleImageBase
 */
let Circle$1 = class Circle extends CircleImageBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this._setMargins(labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);

      const diameter = Math.max(
        dimensions.width + this.margin.right + this.margin.left,
        dimensions.height + this.margin.top + this.margin.bottom
      );

      this.options.size = diameter / 2; // NOTE: this size field only set here, not in Ellipse, Database, Box
      this.width = diameter;
      this.height = diameter;
      this.radius = this.width / 2;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this._drawRawCircle(ctx, x, y, values);

    this.updateBoundingBox(x, y);
    this.labelModule.draw(
      ctx,
      this.left + this.textSize.width / 2 + this.margin.left,
      y,
      selected,
      hover
    );
  }

  /**
   *
   * @param {number} x width
   * @param {number} y height
   */
  updateBoundingBox(x, y) {
    this.boundingBox.top = y - this.options.size;
    this.boundingBox.left = x - this.options.size;
    this.boundingBox.right = x + this.options.size;
    this.boundingBox.bottom = y + this.options.size;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @returns {number}
   */
  distanceToBorder(ctx) {
    if (ctx) {
      this.resize(ctx);
    }
    return this.width * 0.5;
  }
};

/**
 * A CircularImage Node/Cluster shape.
 *
 * @augments CircleImageBase
 */
class CircularImage extends CircleImageBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   * @param {Image} imageObj
   * @param {Image} imageObjAlt
   */
  constructor(options, body, labelModule, imageObj, imageObjAlt) {
    super(options, body, labelModule);

    this.setImages(imageObj, imageObjAlt);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    const imageAbsent =
      this.imageObj.src === undefined ||
      this.imageObj.width === undefined ||
      this.imageObj.height === undefined;

    if (imageAbsent) {
      const diameter = this.options.size * 2;
      this.width = diameter;
      this.height = diameter;
      this.radius = 0.5 * this.width;
      return;
    }

    // At this point, an image is present, i.e. this.imageObj is valid.
    if (this.needsRefresh(selected, hover)) {
      this._resizeImage();
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.switchImages(selected);
    this.resize();

    let labelX = x,
      labelY = y;

    if (this.options.shapeProperties.coordinateOrigin === "top-left") {
      this.left = x;
      this.top = y;
      labelX += this.width / 2;
      labelY += this.height / 2;
    } else {
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
    }

    // draw the background circle. IMPORTANT: the stroke in this method is used by the clip method below.
    this._drawRawCircle(ctx, labelX, labelY, values);

    // now we draw in the circle, we save so we can revert the clip operation after drawing.
    ctx.save();
    // clip is used to use the stroke in drawRawCircle as an area that we can draw in.
    ctx.clip();
    // draw the image
    this._drawImageAtPosition(ctx, values);
    // restore so we can again draw on the full canvas
    ctx.restore();

    this._drawImageLabel(ctx, labelX, labelY, selected, hover);

    this.updateBoundingBox(x, y);
  }

  // TODO: compare with Circle.updateBoundingBox(), consolidate? More stuff is happening here
  /**
   *
   * @param {number} x width
   * @param {number} y height
   */
  updateBoundingBox(x, y) {
    if (this.options.shapeProperties.coordinateOrigin === "top-left") {
      this.boundingBox.top = y;
      this.boundingBox.left = x;
      this.boundingBox.right = x + this.options.size * 2;
      this.boundingBox.bottom = y + this.options.size * 2;
    } else {
      this.boundingBox.top = y - this.options.size;
      this.boundingBox.left = x - this.options.size;
      this.boundingBox.right = x + this.options.size;
      this.boundingBox.bottom = y + this.options.size;
    }

    // TODO: compare with Image.updateBoundingBox(), consolidate?
    this.boundingBox.left = Math.min(
      this.boundingBox.left,
      this.labelModule.size.left
    );
    this.boundingBox.right = Math.max(
      this.boundingBox.right,
      this.labelModule.size.left + this.labelModule.size.width
    );
    this.boundingBox.bottom = Math.max(
      this.boundingBox.bottom,
      this.boundingBox.bottom + this.labelOffset
    );
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @returns {number}
   */
  distanceToBorder(ctx) {
    if (ctx) {
      this.resize(ctx);
    }
    return this.width * 0.5;
  }
}

/**
 * Base class for constructing Node/Cluster Shapes.
 *
 * @augments NodeBase
 */
class ShapeBase extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   * @param {object} [values={size: this.options.size}]
   */
  resize(
    ctx,
    selected = this.selected,
    hover = this.hover,
    values = { size: this.options.size }
  ) {
    if (this.needsRefresh(selected, hover)) {
      this.labelModule.getTextSize(ctx, selected, hover);
      const size = 2 * values.size;
      this.width = this.customSizeWidth ?? size;
      this.height = this.customSizeHeight ?? size;
      this.radius = 0.5 * this.width;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} shape
   * @param {number} sizeMultiplier - Unused! TODO: Remove next major release
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @private
   * @returns {object} Callbacks to draw later on higher layers.
   */
  _drawShape(ctx, shape, sizeMultiplier, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover, values);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    getShape(shape)(ctx, x, y, values.size);
    this.performFill(ctx, values);

    if (this.options.icon !== undefined) {
      if (this.options.icon.code !== undefined) {
        ctx.font =
          (selected ? "bold " : "") +
          this.height / 2 +
          "px " +
          (this.options.icon.face || "FontAwesome");
        ctx.fillStyle = this.options.icon.color || "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(this.options.icon.code, x, y);
      }
    }

    return {
      drawExternalLabel: () => {
        if (this.options.label !== undefined) {
          // Need to call following here in order to ensure value for
          // `this.labelModule.size.height`.
          this.labelModule.calculateLabelSize(
            ctx,
            selected,
            hover,
            x,
            y,
            "hanging"
          );
          const yLabel =
            y + 0.5 * this.height + 0.5 * this.labelModule.size.height;
          this.labelModule.draw(ctx, x, yLabel, selected, hover, "hanging");
        }

        this.updateBoundingBox(x, y);
      },
    };
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  updateBoundingBox(x, y) {
    this.boundingBox.top = y - this.options.size;
    this.boundingBox.left = x - this.options.size;
    this.boundingBox.right = x + this.options.size;
    this.boundingBox.bottom = y + this.options.size;

    if (this.options.label !== undefined && this.labelModule.size.width > 0) {
      this.boundingBox.left = Math.min(
        this.boundingBox.left,
        this.labelModule.size.left
      );
      this.boundingBox.right = Math.max(
        this.boundingBox.right,
        this.labelModule.size.left + this.labelModule.size.width
      );
      this.boundingBox.bottom = Math.max(
        this.boundingBox.bottom,
        this.boundingBox.bottom + this.labelModule.size.height
      );
    }
  }
}

/**
 * A CustomShape Node/Cluster shape.
 *
 * @augments ShapeBase
 */
class CustomShape extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   * @param {Function} ctxRenderer
   */
  constructor(options, body, labelModule, ctxRenderer) {
    super(options, body, labelModule, ctxRenderer);
    this.ctxRenderer = ctxRenderer;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on different layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover, values);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    // Guard right away because someone may just draw in the function itself.
    ctx.save();
    const drawLater = this.ctxRenderer({
      ctx,
      id: this.options.id,
      x,
      y,
      state: { selected, hover },
      style: { ...values },
      label: this.options.label,
    });
    // Render the node shape bellow arrows.
    if (drawLater.drawNode != null) {
      drawLater.drawNode();
    }
    ctx.restore();

    if (drawLater.drawExternalLabel) {
      // Guard the external label (above arrows) drawing function.
      const drawExternalLabel = drawLater.drawExternalLabel;
      drawLater.drawExternalLabel = () => {
        ctx.save();
        drawExternalLabel();
        ctx.restore();
      };
    }

    if (drawLater.nodeDimensions) {
      this.customSizeWidth = drawLater.nodeDimensions.width;
      this.customSizeHeight = drawLater.nodeDimensions.height;
    }

    return drawLater;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A Database Node/Cluster shape.
 *
 * @augments NodeBase
 */
class Database extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this._setMargins(labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */
  resize(ctx, selected, hover) {
    if (this.needsRefresh(selected, hover)) {
      const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
      const size = dimensions.width + this.margin.right + this.margin.left;

      this.width = size;
      this.height = size;
      this.radius = this.width / 2;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    this.initContextForDraw(ctx, values);
    drawDatabase(
      ctx,
      x - this.width / 2,
      y - this.height / 2,
      this.width,
      this.height
    );
    this.performFill(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
    this.labelModule.draw(
      ctx,
      this.left + this.textSize.width / 2 + this.margin.left,
      this.top + this.textSize.height / 2 + this.margin.top,
      selected,
      hover
    );
  }
  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A Diamond Node/Cluster shape.
 *
 * @augments ShapeBase
 */
let Diamond$1 = class Diamond extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(ctx, "diamond", 4, x, y, selected, hover, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
};

/**
 * A Dot Node/Cluster shape.
 *
 * @augments ShapeBase
 */
class Dot extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(ctx, "circle", 2, x, y, selected, hover, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @returns {number}
   */
  distanceToBorder(ctx) {
    if (ctx) {
      this.resize(ctx);
    }
    return this.options.size;
  }
}

/**
 * Am Ellipse Node/Cluster shape.
 *
 * @augments NodeBase
 */
class Ellipse extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    if (this.needsRefresh(selected, hover)) {
      const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);

      this.height = dimensions.height * 2;
      this.width = dimensions.width + dimensions.height;
      this.radius = 0.5 * this.width;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width * 0.5;
    this.top = y - this.height * 0.5;

    this.initContextForDraw(ctx, values);
    drawEllipse(ctx, this.left, this.top, this.width, this.height);
    this.performFill(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
    this.labelModule.draw(ctx, x, y, selected, hover);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    if (ctx) {
      this.resize(ctx);
    }
    const a = this.width * 0.5;
    const b = this.height * 0.5;
    const w = Math.sin(angle) * a;
    const h = Math.cos(angle) * b;
    return (a * b) / Math.sqrt(w * w + h * h);
  }
}

/**
 * An icon replacement for the default Node shape.
 *
 * @augments NodeBase
 */
class Icon extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this._setMargins(labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx - Unused.
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected, hover) {
    if (this.needsRefresh(selected, hover)) {
      this.iconSize = {
        width: Number(this.options.icon.size),
        height: Number(this.options.icon.size),
      };
      this.width = this.iconSize.width + this.margin.right + this.margin.left;
      this.height = this.iconSize.height + this.margin.top + this.margin.bottom;
      this.radius = 0.5 * this.width;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.options.icon.size = this.options.icon.size || 50;

    this.left = x - this.width / 2;
    this.top = y - this.height / 2;
    this._icon(ctx, x, y, selected, hover, values);

    return {
      drawExternalLabel: () => {
        if (this.options.label !== undefined) {
          const iconTextSpacing = 5;
          this.labelModule.draw(
            ctx,
            this.left + this.iconSize.width / 2 + this.margin.left,
            y + this.height / 2 + iconTextSpacing,
            selected
          );
        }

        this.updateBoundingBox(x, y);
      },
    };
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  updateBoundingBox(x, y) {
    this.boundingBox.top = y - this.options.icon.size * 0.5;
    this.boundingBox.left = x - this.options.icon.size * 0.5;
    this.boundingBox.right = x + this.options.icon.size * 0.5;
    this.boundingBox.bottom = y + this.options.icon.size * 0.5;

    if (this.options.label !== undefined && this.labelModule.size.width > 0) {
      const iconTextSpacing = 5;
      this.boundingBox.left = Math.min(
        this.boundingBox.left,
        this.labelModule.size.left
      );
      this.boundingBox.right = Math.max(
        this.boundingBox.right,
        this.labelModule.size.left + this.labelModule.size.width
      );
      this.boundingBox.bottom = Math.max(
        this.boundingBox.bottom,
        this.boundingBox.bottom + this.labelModule.size.height + iconTextSpacing
      );
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover - Unused
   * @param {ArrowOptions} values
   */
  _icon(ctx, x, y, selected, hover, values) {
    const iconSize = Number(this.options.icon.size);

    if (this.options.icon.code !== undefined) {
      ctx.font = [
        this.options.icon.weight != null
          ? this.options.icon.weight
          : selected
          ? "bold"
          : "",
        // If the weight is forced (for example to make Font Awesome 5 work
        // properly) substitute slightly bigger size for bold font face.
        (this.options.icon.weight != null && selected ? 5 : 0) +
          iconSize +
          "px",
        this.options.icon.face,
      ].join(" ");

      // draw icon
      ctx.fillStyle = this.options.icon.color || "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // draw shadow if enabled
      this.enableShadow(ctx, values);
      ctx.fillText(this.options.icon.code, x, y);

      // disable shadows for other elements.
      this.disableShadow(ctx, values);
    } else {
      console.error(
        "When using the icon shape, you need to define the code in the icon options object. This can be done per node or globally."
      );
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * An image-based replacement for the default Node shape.
 *
 * @augments CircleImageBase
 */
let Image$2 = class Image extends CircleImageBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   * @param {Image} imageObj
   * @param {Image} imageObjAlt
   */
  constructor(options, body, labelModule, imageObj, imageObjAlt) {
    super(options, body, labelModule);

    this.setImages(imageObj, imageObjAlt);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx - Unused.
   * @param {boolean} [selected]
   * @param {boolean} [hover]
   */
  resize(ctx, selected = this.selected, hover = this.hover) {
    const imageAbsent =
      this.imageObj.src === undefined ||
      this.imageObj.width === undefined ||
      this.imageObj.height === undefined;

    if (imageAbsent) {
      const side = this.options.size * 2;
      this.width = side;
      this.height = side;
      return;
    }

    if (this.needsRefresh(selected, hover)) {
      this._resizeImage();
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    ctx.save();
    this.switchImages(selected);
    this.resize();

    let labelX = x,
      labelY = y;

    if (this.options.shapeProperties.coordinateOrigin === "top-left") {
      this.left = x;
      this.top = y;
      labelX += this.width / 2;
      labelY += this.height / 2;
    } else {
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
    }

    if (this.options.shapeProperties.useBorderWithImage === true) {
      const neutralborderWidth = this.options.borderWidth;
      const selectionLineWidth =
        this.options.borderWidthSelected || 2 * this.options.borderWidth;
      const borderWidth =
        (selected ? selectionLineWidth : neutralborderWidth) /
        this.body.view.scale;
      ctx.lineWidth = Math.min(this.width, borderWidth);

      ctx.beginPath();
      let strokeStyle = selected
        ? this.options.color.highlight.border
        : hover
        ? this.options.color.hover.border
        : this.options.color.border;
      let fillStyle = selected
        ? this.options.color.highlight.background
        : hover
        ? this.options.color.hover.background
        : this.options.color.background;

      if (values.opacity !== undefined) {
        strokeStyle = overrideOpacity(strokeStyle, values.opacity);
        fillStyle = overrideOpacity(fillStyle, values.opacity);
      }
      // setup the line properties.
      ctx.strokeStyle = strokeStyle;

      // set a fillstyle
      ctx.fillStyle = fillStyle;

      // draw a rectangle to form the border around. This rectangle is filled so the opacity of a picture (in future vis releases?) can be used to tint the image
      ctx.rect(
        this.left - 0.5 * ctx.lineWidth,
        this.top - 0.5 * ctx.lineWidth,
        this.width + ctx.lineWidth,
        this.height + ctx.lineWidth
      );
      ctx.fill();

      this.performStroke(ctx, values);

      ctx.closePath();
    }

    this._drawImageAtPosition(ctx, values);

    this._drawImageLabel(ctx, labelX, labelY, selected, hover);

    this.updateBoundingBox(x, y);
    ctx.restore();
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   */
  updateBoundingBox(x, y) {
    this.resize();

    if (this.options.shapeProperties.coordinateOrigin === "top-left") {
      this.left = x;
      this.top = y;
    } else {
      this.left = x - this.width / 2;
      this.top = y - this.height / 2;
    }

    this.boundingBox.left = this.left;
    this.boundingBox.top = this.top;
    this.boundingBox.bottom = this.top + this.height;
    this.boundingBox.right = this.left + this.width;

    if (this.options.label !== undefined && this.labelModule.size.width > 0) {
      this.boundingBox.left = Math.min(
        this.boundingBox.left,
        this.labelModule.size.left
      );
      this.boundingBox.right = Math.max(
        this.boundingBox.right,
        this.labelModule.size.left + this.labelModule.size.width
      );
      this.boundingBox.bottom = Math.max(
        this.boundingBox.bottom,
        this.boundingBox.bottom + this.labelOffset
      );
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
};

/**
 * A Square Node/Cluster shape.
 *
 * @augments ShapeBase
 */
class Square extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(ctx, "square", 2, x, y, selected, hover, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A Hexagon Node/Cluster shape.
 *
 * @augments ShapeBase
 */
class Hexagon extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(ctx, "hexagon", 4, x, y, selected, hover, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A Star Node/Cluster shape.
 *
 * @augments ShapeBase
 */
class Star extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(ctx, "star", 4, x, y, selected, hover, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A text-based replacement for the default Node shape.
 *
 * @augments NodeBase
 */
class Text extends NodeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
    this._setMargins(labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {boolean} selected
   * @param {boolean} hover
   */
  resize(ctx, selected, hover) {
    if (this.needsRefresh(selected, hover)) {
      this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
      this.width = this.textSize.width + this.margin.right + this.margin.left;
      this.height = this.textSize.height + this.margin.top + this.margin.bottom;
      this.radius = 0.5 * this.width;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x width
   * @param {number} y height
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   */
  draw(ctx, x, y, selected, hover, values) {
    this.resize(ctx, selected, hover);
    this.left = x - this.width / 2;
    this.top = y - this.height / 2;

    // draw shadow if enabled
    this.enableShadow(ctx, values);
    this.labelModule.draw(
      ctx,
      this.left + this.textSize.width / 2 + this.margin.left,
      this.top + this.textSize.height / 2 + this.margin.top,
      selected,
      hover
    );

    // disable shadows for other elements.
    this.disableShadow(ctx, values);

    this.updateBoundingBox(x, y, ctx, selected, hover);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A Triangle Node/Cluster shape.
 *
 * @augments ShapeBase
 */
let Triangle$1 = class Triangle extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(ctx, "triangle", 3, x, y, selected, hover, values);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
};

/**
 * A downward facing Triangle Node/Cluster shape.
 *
 * @augments ShapeBase
 */
class TriangleDown extends ShapeBase {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Label} labelModule
   */
  constructor(options, body, labelModule) {
    super(options, body, labelModule);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} x
   * @param {number} y
   * @param {boolean} selected
   * @param {boolean} hover
   * @param {ArrowOptions} values
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx, x, y, selected, hover, values) {
    return this._drawShape(
      ctx,
      "triangleDown",
      3,
      x,
      y,
      selected,
      hover,
      values
    );
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {number} angle
   * @returns {number}
   */
  distanceToBorder(ctx, angle) {
    return this._distanceToBorder(ctx, angle);
  }
}

/**
 * A node. A node can be connected to other nodes via one or multiple edges.
 */
class Node {
  /**
   *
   * @param {object} options An object containing options for the node. All
   *                            options are optional, except for the id.
   *                              {number} id     Id of the node. Required
   *                              {string} label  Text label for the node
   *                              {number} x      Horizontal position of the node
   *                              {number} y      Vertical position of the node
   *                              {string} shape  Node shape
   *                              {string} image  An image url
   *                              {string} title  A title text, can be HTML
   *                              {anytype} group A group name or number
   * @param {object} body               Shared state of current network instance
   * @param {Network.Images} imagelist  A list with images. Only needed when the node has an image
   * @param {Groups} grouplist          A list with groups. Needed for retrieving group options
   * @param {object} globalOptions      Current global node options; these serve as defaults for the node instance
   * @param {object} defaultOptions     Global default options for nodes; note that this is also the prototype
   *                                    for parameter `globalOptions`.
   */
  constructor(
    options,
    body,
    imagelist,
    grouplist,
    globalOptions,
    defaultOptions
  ) {
    this.options = bridgeObject(globalOptions);
    this.globalOptions = globalOptions;
    this.defaultOptions = defaultOptions;
    this.body = body;

    this.edges = []; // all edges connected to this node

    // set defaults for the options
    this.id = undefined;
    this.imagelist = imagelist;
    this.grouplist = grouplist;

    // state options
    this.x = undefined;
    this.y = undefined;
    this.baseSize = this.options.size;
    this.baseFontSize = this.options.font.size;
    this.predefinedPosition = false; // used to check if initial fit should just take the range or approximate
    this.selected = false;
    this.hover = false;

    this.labelModule = new Label(
      this.body,
      this.options,
      false /* Not edge label */
    );
    this.setOptions(options);
  }

  /**
   * Attach a edge to the node
   *
   * @param {Edge} edge
   */
  attachEdge(edge) {
    if (this.edges.indexOf(edge) === -1) {
      this.edges.push(edge);
    }
  }

  /**
   * Detach a edge from the node
   *
   * @param {Edge} edge
   */
  detachEdge(edge) {
    const index = this.edges.indexOf(edge);
    if (index != -1) {
      this.edges.splice(index, 1);
    }
  }

  /**
   * Set or overwrite options for the node
   *
   * @param {object} options an object with options
   * @returns {null|boolean}
   */
  setOptions(options) {
    const currentShape = this.options.shape;

    if (!options) {
      return; // Note that the return value will be 'undefined'! This is OK.
    }

    // Save the color for later.
    // This is necessary in order to prevent local color from being overwritten by group color.
    // TODO: To prevent such workarounds the way options are handled should be rewritten from scratch.
    // This is not the only problem with current options handling.
    if (typeof options.color !== "undefined") {
      this._localColor = options.color;
    }

    // basic options
    if (options.id !== undefined) {
      this.id = options.id;
    }

    if (this.id === undefined) {
      throw new Error("Node must have an id");
    }

    Node.checkMass(options, this.id);

    // set these options locally
    // clear x and y positions
    if (options.x !== undefined) {
      if (options.x === null) {
        this.x = undefined;
        this.predefinedPosition = false;
      } else {
        this.x = parseInt(options.x);
        this.predefinedPosition = true;
      }
    }
    if (options.y !== undefined) {
      if (options.y === null) {
        this.y = undefined;
        this.predefinedPosition = false;
      } else {
        this.y = parseInt(options.y);
        this.predefinedPosition = true;
      }
    }
    if (options.size !== undefined) {
      this.baseSize = options.size;
    }
    if (options.value !== undefined) {
      options.value = parseFloat(options.value);
    }

    // this transforms all shorthands into fully defined options
    Node.parseOptions(
      this.options,
      options,
      true,
      this.globalOptions,
      this.grouplist
    );

    const pile = [options, this.options, this.defaultOptions];
    this.chooser = choosify("node", pile);

    this._load_images();
    this.updateLabelModule(options);

    // Need to set local opacity after `this.updateLabelModule(options);` because `this.updateLabelModule(options);` overrites local opacity with group opacity
    if (options.opacity !== undefined && Node.checkOpacity(options.opacity)) {
      this.options.opacity = options.opacity;
    }

    this.updateShape(currentShape);

    return options.hidden !== undefined || options.physics !== undefined;
  }

  /**
   * Load the images from the options, for the nodes that need them.
   *
   * Images are always loaded, even if they are not used in the current shape.
   * The user may switch to an image shape later on.
   *
   * @private
   */
  _load_images() {
    if (
      this.options.shape === "circularImage" ||
      this.options.shape === "image"
    ) {
      if (this.options.image === undefined) {
        throw new Error(
          "Option image must be defined for node type '" +
            this.options.shape +
            "'"
        );
      }
    }

    if (this.options.image === undefined) {
      return;
    }

    if (this.imagelist === undefined) {
      throw new Error("Internal Error: No images provided");
    }

    if (typeof this.options.image === "string") {
      this.imageObj = this.imagelist.load(
        this.options.image,
        this.options.brokenImage,
        this.id
      );
    } else {
      if (this.options.image.unselected === undefined) {
        throw new Error("No unselected image provided");
      }

      this.imageObj = this.imagelist.load(
        this.options.image.unselected,
        this.options.brokenImage,
        this.id
      );

      if (this.options.image.selected !== undefined) {
        this.imageObjAlt = this.imagelist.load(
          this.options.image.selected,
          this.options.brokenImage,
          this.id
        );
      } else {
        this.imageObjAlt = undefined;
      }
    }
  }

  /**
   * Check that opacity is only between 0 and 1
   *
   * @param {number} opacity
   * @returns {boolean}
   */
  static checkOpacity(opacity) {
    return 0 <= opacity && opacity <= 1;
  }

  /**
   * Check that origin is 'center' or 'top-left'
   *
   * @param {string} origin
   * @returns {boolean}
   */
  static checkCoordinateOrigin(origin) {
    return origin === undefined || origin === "center" || origin === "top-left";
  }

  /**
   * Copy group option values into the node options.
   *
   * The group options override the global node options, so the copy of group options
   *  must happen *after* the global node options have been set.
   *
   * This method must also be called also if the global node options have changed and the group options did not.
   *
   * @param {object} parentOptions
   * @param {object} newOptions  new values for the options, currently only passed in for check
   * @param {object} groupList
   */
  static updateGroupOptions(parentOptions, newOptions, groupList) {
    if (groupList === undefined) return; // No groups, nothing to do

    const group = parentOptions.group;

    // paranoia: the selected group is already merged into node options, check.
    if (
      newOptions !== undefined &&
      newOptions.group !== undefined &&
      group !== newOptions.group
    ) {
      throw new Error(
        "updateGroupOptions: group values in options don't match."
      );
    }

    const hasGroup =
      typeof group === "number" || (typeof group === "string" && group != "");
    if (!hasGroup) return; // current node has no group, no need to merge

    const groupObj = groupList.get(group);

    if (groupObj.opacity !== undefined && newOptions.opacity === undefined) {
      if (!Node.checkOpacity(groupObj.opacity)) {
        console.error(
          "Invalid option for node opacity. Value must be between 0 and 1, found: " +
            groupObj.opacity
        );
        groupObj.opacity = undefined;
      }
    }

    // Skip any new option to avoid them being overridden by the group options.
    const skipProperties = Object.getOwnPropertyNames(newOptions).filter(
      (p) => newOptions[p] != null
    );
    // Always skip merging group font options into parent; these are required to be distinct for labels
    skipProperties.push("font");
    selectiveNotDeepExtend(skipProperties, parentOptions, groupObj);

    // the color object needs to be completely defined.
    // Since groups can partially overwrite the colors, we parse it again, just in case.
    parentOptions.color = parseColor(parentOptions.color);
  }

  /**
   * This process all possible shorthands in the new options and makes sure that the parentOptions are fully defined.
   * Static so it can also be used by the handler.
   *
   * @param {object} parentOptions
   * @param {object} newOptions
   * @param {boolean} [allowDeletion=false]
   * @param {object} [globalOptions={}]
   * @param {object} [groupList]
   * @static
   */
  static parseOptions(
    parentOptions,
    newOptions,
    allowDeletion = false,
    globalOptions = {},
    groupList
  ) {
    const fields = ["color", "fixed", "shadow"];
    selectiveNotDeepExtend(fields, parentOptions, newOptions, allowDeletion);

    Node.checkMass(newOptions);

    if (parentOptions.opacity !== undefined) {
      if (!Node.checkOpacity(parentOptions.opacity)) {
        console.error(
          "Invalid option for node opacity. Value must be between 0 and 1, found: " +
            parentOptions.opacity
        );
        parentOptions.opacity = undefined;
      }
    }

    if (newOptions.opacity !== undefined) {
      if (!Node.checkOpacity(newOptions.opacity)) {
        console.error(
          "Invalid option for node opacity. Value must be between 0 and 1, found: " +
            newOptions.opacity
        );
        newOptions.opacity = undefined;
      }
    }

    if (
      newOptions.shapeProperties &&
      !Node.checkCoordinateOrigin(newOptions.shapeProperties.coordinateOrigin)
    ) {
      console.error(
        "Invalid option for node coordinateOrigin, found: " +
          newOptions.shapeProperties.coordinateOrigin
      );
    }

    // merge the shadow options into the parent.
    mergeOptions(parentOptions, newOptions, "shadow", globalOptions);

    // individual shape newOptions
    if (newOptions.color !== undefined && newOptions.color !== null) {
      const parsedColor = parseColor(newOptions.color);
      fillIfDefined(parentOptions.color, parsedColor);
    } else if (allowDeletion === true && newOptions.color === null) {
      parentOptions.color = bridgeObject(globalOptions.color); // set the object back to the global options
    }

    // handle the fixed options
    if (newOptions.fixed !== undefined && newOptions.fixed !== null) {
      if (typeof newOptions.fixed === "boolean") {
        parentOptions.fixed.x = newOptions.fixed;
        parentOptions.fixed.y = newOptions.fixed;
      } else {
        if (
          newOptions.fixed.x !== undefined &&
          typeof newOptions.fixed.x === "boolean"
        ) {
          parentOptions.fixed.x = newOptions.fixed.x;
        }
        if (
          newOptions.fixed.y !== undefined &&
          typeof newOptions.fixed.y === "boolean"
        ) {
          parentOptions.fixed.y = newOptions.fixed.y;
        }
      }
    }

    if (allowDeletion === true && newOptions.font === null) {
      parentOptions.font = bridgeObject(globalOptions.font); // set the object back to the global options
    }

    Node.updateGroupOptions(parentOptions, newOptions, groupList);

    // handle the scaling options, specifically the label part
    if (newOptions.scaling !== undefined) {
      mergeOptions(
        parentOptions.scaling,
        newOptions.scaling,
        "label",
        globalOptions.scaling
      );
    }
  }

  /**
   *
   * @returns {{color: *, borderWidth: *, borderColor: *, size: *, borderDashes: (boolean|Array|allOptions.nodes.shapeProperties.borderDashes|{boolean, array}), borderRadius: (number|allOptions.nodes.shapeProperties.borderRadius|{number}|Array), shadow: *, shadowColor: *, shadowSize: *, shadowX: *, shadowY: *}}
   */
  getFormattingValues() {
    const values = {
      color: this.options.color.background,
      opacity: this.options.opacity,
      borderWidth: this.options.borderWidth,
      borderColor: this.options.color.border,
      size: this.options.size,
      borderDashes: this.options.shapeProperties.borderDashes,
      borderRadius: this.options.shapeProperties.borderRadius,
      shadow: this.options.shadow.enabled,
      shadowColor: this.options.shadow.color,
      shadowSize: this.options.shadow.size,
      shadowX: this.options.shadow.x,
      shadowY: this.options.shadow.y,
    };
    if (this.selected || this.hover) {
      if (this.chooser === true) {
        if (this.selected) {
          if (this.options.borderWidthSelected != null) {
            values.borderWidth = this.options.borderWidthSelected;
          } else {
            values.borderWidth *= 2;
          }
          values.color = this.options.color.highlight.background;
          values.borderColor = this.options.color.highlight.border;
          values.shadow = this.options.shadow.enabled;
        } else if (this.hover) {
          values.color = this.options.color.hover.background;
          values.borderColor = this.options.color.hover.border;
          values.shadow = this.options.shadow.enabled;
        }
      } else if (typeof this.chooser === "function") {
        this.chooser(values, this.options.id, this.selected, this.hover);
        if (values.shadow === false) {
          if (
            values.shadowColor !== this.options.shadow.color ||
            values.shadowSize !== this.options.shadow.size ||
            values.shadowX !== this.options.shadow.x ||
            values.shadowY !== this.options.shadow.y
          ) {
            values.shadow = true;
          }
        }
      }
    } else {
      values.shadow = this.options.shadow.enabled;
    }
    if (this.options.opacity !== undefined) {
      const opacity = this.options.opacity;
      values.borderColor = overrideOpacity(values.borderColor, opacity);
      values.color = overrideOpacity(values.color, opacity);
      values.shadowColor = overrideOpacity(values.shadowColor, opacity);
    }
    return values;
  }

  /**
   *
   * @param {object} options
   */
  updateLabelModule(options) {
    if (this.options.label === undefined || this.options.label === null) {
      this.options.label = "";
    }

    Node.updateGroupOptions(
      this.options,
      {
        ...options,
        color: (options && options.color) || this._localColor || undefined,
      },
      this.grouplist
    );

    //
    // Note:The prototype chain for this.options is:
    //
    // this.options ->    NodesHandler.options    -> NodesHandler.defaultOptions
    //                 (also: this.globalOptions)
    //
    // Note that the prototypes are mentioned explicitly in the pile list below;
    // WE DON'T WANT THE ORDER OF THE PROTOTYPES!!!! At least, not for font handling of labels.
    // This is a good indication that the prototype usage of options is deficient.
    //
    const currentGroup = this.grouplist.get(this.options.group, false);
    const pile = [
      options, // new options
      this.options, // current node options, see comment above for prototype
      currentGroup, // group options, if any
      this.globalOptions, // Currently set global node options
      this.defaultOptions, // Default global node options
    ];
    this.labelModule.update(this.options, pile);

    if (this.labelModule.baseSize !== undefined) {
      this.baseFontSize = this.labelModule.baseSize;
    }
  }

  /**
   *
   * @param {string} currentShape
   */
  updateShape(currentShape) {
    if (currentShape === this.options.shape && this.shape) {
      this.shape.setOptions(this.options, this.imageObj, this.imageObjAlt);
    } else {
      // choose draw method depending on the shape
      switch (this.options.shape) {
        case "box":
          this.shape = new Box$1(this.options, this.body, this.labelModule);
          break;
        case "circle":
          this.shape = new Circle$1(this.options, this.body, this.labelModule);
          break;
        case "circularImage":
          this.shape = new CircularImage(
            this.options,
            this.body,
            this.labelModule,
            this.imageObj,
            this.imageObjAlt
          );
          break;
        case "custom":
          this.shape = new CustomShape(
            this.options,
            this.body,
            this.labelModule,
            this.options.ctxRenderer
          );
          break;
        case "database":
          this.shape = new Database(this.options, this.body, this.labelModule);
          break;
        case "diamond":
          this.shape = new Diamond$1(this.options, this.body, this.labelModule);
          break;
        case "dot":
          this.shape = new Dot(this.options, this.body, this.labelModule);
          break;
        case "ellipse":
          this.shape = new Ellipse(this.options, this.body, this.labelModule);
          break;
        case "icon":
          this.shape = new Icon(this.options, this.body, this.labelModule);
          break;
        case "image":
          this.shape = new Image$2(
            this.options,
            this.body,
            this.labelModule,
            this.imageObj,
            this.imageObjAlt
          );
          break;
        case "square":
          this.shape = new Square(this.options, this.body, this.labelModule);
          break;
        case "hexagon":
          this.shape = new Hexagon(this.options, this.body, this.labelModule);
          break;
        case "star":
          this.shape = new Star(this.options, this.body, this.labelModule);
          break;
        case "text":
          this.shape = new Text(this.options, this.body, this.labelModule);
          break;
        case "triangle":
          this.shape = new Triangle$1(this.options, this.body, this.labelModule);
          break;
        case "triangleDown":
          this.shape = new TriangleDown(
            this.options,
            this.body,
            this.labelModule
          );
          break;
        default:
          this.shape = new Ellipse(this.options, this.body, this.labelModule);
          break;
      }
    }
    this.needsRefresh();
  }

  /**
   * select this node
   */
  select() {
    this.selected = true;
    this.needsRefresh();
  }

  /**
   * unselect this node
   */
  unselect() {
    this.selected = false;
    this.needsRefresh();
  }

  /**
   * Reset the calculated size of the node, forces it to recalculate its size
   */
  needsRefresh() {
    this.shape.refreshNeeded = true;
  }

  /**
   * get the title of this node.
   *
   * @returns {string} title    The title of the node, or undefined when no title
   *                           has been set.
   */
  getTitle() {
    return this.options.title;
  }

  /**
   * Calculate the distance to the border of the Node
   *
   * @param {CanvasRenderingContext2D}   ctx
   * @param {number} angle        Angle in radians
   * @returns {number} distance   Distance to the border in pixels
   */
  distanceToBorder(ctx, angle) {
    return this.shape.distanceToBorder(ctx, angle);
  }

  /**
   * Check if this node has a fixed x and y position
   *
   * @returns {boolean}      true if fixed, false if not
   */
  isFixed() {
    return this.options.fixed.x && this.options.fixed.y;
  }

  /**
   * check if this node is selecte
   *
   * @returns {boolean} selected   True if node is selected, else false
   */
  isSelected() {
    return this.selected;
  }

  /**
   * Retrieve the value of the node. Can be undefined
   *
   * @returns {number} value
   */
  getValue() {
    return this.options.value;
  }

  /**
   * Get the current dimensions of the label
   *
   * @returns {rect}
   */
  getLabelSize() {
    return this.labelModule.size();
  }

  /**
   * Adjust the value range of the node. The node will adjust it's size
   * based on its value.
   *
   * @param {number} min
   * @param {number} max
   * @param {number} total
   */
  setValueRange(min, max, total) {
    if (this.options.value !== undefined) {
      const scale = this.options.scaling.customScalingFunction(
        min,
        max,
        total,
        this.options.value
      );
      const sizeDiff = this.options.scaling.max - this.options.scaling.min;
      if (this.options.scaling.label.enabled === true) {
        const fontDiff =
          this.options.scaling.label.max - this.options.scaling.label.min;
        this.options.font.size =
          this.options.scaling.label.min + scale * fontDiff;
      }
      this.options.size = this.options.scaling.min + scale * sizeDiff;
    } else {
      this.options.size = this.baseSize;
      this.options.font.size = this.baseFontSize;
    }

    this.updateLabelModule();
  }

  /**
   * Draw this node in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   *
   * @param {CanvasRenderingContext2D}   ctx
   * @returns {object} Callbacks to draw later on higher layers.
   */
  draw(ctx) {
    const values = this.getFormattingValues();
    return (
      this.shape.draw(ctx, this.x, this.y, this.selected, this.hover, values) ||
      {}
    );
  }

  /**
   * Update the bounding box of the shape
   *
   * @param {CanvasRenderingContext2D}   ctx
   */
  updateBoundingBox(ctx) {
    this.shape.updateBoundingBox(this.x, this.y, ctx);
  }

  /**
   * Recalculate the size of this node in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   *
   * @param {CanvasRenderingContext2D}   ctx
   */
  resize(ctx) {
    const values = this.getFormattingValues();
    this.shape.resize(ctx, this.selected, this.hover, values);
  }

  /**
   * Determine all visual elements of this node instance, in which the given
   * point falls within the bounding shape.
   *
   * @param {point} point
   * @returns {Array.<nodeClickItem|nodeLabelClickItem>} list with the items which are on the point
   */
  getItemsOnPoint(point) {
    const ret = [];

    if (this.labelModule.visible()) {
      if (pointInRect(this.labelModule.getSize(), point)) {
        ret.push({ nodeId: this.id, labelId: 0 });
      }
    }

    if (pointInRect(this.shape.boundingBox, point)) {
      ret.push({ nodeId: this.id });
    }

    return ret;
  }

  /**
   * Check if this object is overlapping with the provided object
   *
   * @param {object} obj   an object with parameters left, top, right, bottom
   * @returns {boolean}     True if location is located on node
   */
  isOverlappingWith(obj) {
    return (
      this.shape.left < obj.right &&
      this.shape.left + this.shape.width > obj.left &&
      this.shape.top < obj.bottom &&
      this.shape.top + this.shape.height > obj.top
    );
  }

  /**
   * Check if this object is overlapping with the provided object
   *
   * @param {object} obj   an object with parameters left, top, right, bottom
   * @returns {boolean}     True if location is located on node
   */
  isBoundingBoxOverlappingWith(obj) {
    return (
      this.shape.boundingBox.left < obj.right &&
      this.shape.boundingBox.right > obj.left &&
      this.shape.boundingBox.top < obj.bottom &&
      this.shape.boundingBox.bottom > obj.top
    );
  }

  /**
   * Check valid values for mass
   *
   * The mass may not be negative or zero. If it is, reset to 1
   *
   * @param {object} options
   * @param {Node.id} id
   * @static
   */
  static checkMass(options, id) {
    if (options.mass !== undefined && options.mass <= 0) {
      let strId = "";
      if (id !== undefined) {
        strId = " in node id: " + id;
      }
      console.error(
        "%cNegative or zero mass disallowed" + strId + ", setting mass to 1.",
        VALIDATOR_PRINT_STYLE
      );
      options.mass = 1;
    }
  }
}

/**
 * Handler for Nodes
 */
class NodesHandler {
  /**
   * @param {object} body
   * @param {Images} images
   * @param {Array.<Group>} groups
   * @param {LayoutEngine} layoutEngine
   */
  constructor(body, images, groups, layoutEngine) {
    this.body = body;
    this.images = images;
    this.groups = groups;
    this.layoutEngine = layoutEngine;

    // create the node API in the body container
    this.body.functions.createNode = this.create.bind(this);

    this.nodesListeners = {
      add: (event, params) => {
        this.add(params.items);
      },
      update: (event, params) => {
        this.update(params.items, params.data, params.oldData);
      },
      remove: (event, params) => {
        this.remove(params.items);
      },
    };

    this.defaultOptions = {
      borderWidth: 1,
      borderWidthSelected: undefined,
      brokenImage: undefined,
      color: {
        border: "#2B7CE9",
        background: "#97C2FC",
        highlight: {
          border: "#2B7CE9",
          background: "#D2E5FF",
        },
        hover: {
          border: "#2B7CE9",
          background: "#D2E5FF",
        },
      },
      opacity: undefined, // number between 0 and 1
      fixed: {
        x: false,
        y: false,
      },
      font: {
        color: "#343434",
        size: 14, // px
        face: "arial",
        background: "none",
        strokeWidth: 0, // px
        strokeColor: "#ffffff",
        align: "center",
        vadjust: 0,
        multi: false,
        bold: {
          mod: "bold",
        },
        boldital: {
          mod: "bold italic",
        },
        ital: {
          mod: "italic",
        },
        mono: {
          mod: "",
          size: 15, // px
          face: "monospace",
          vadjust: 2,
        },
      },
      group: undefined,
      hidden: false,
      icon: {
        face: "FontAwesome", //'FontAwesome',
        code: undefined, //'\uf007',
        size: 50, //50,
        color: "#2B7CE9", //'#aa00ff'
      },
      image: undefined, // --> URL
      imagePadding: {
        // only for image shape
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      label: undefined,
      labelHighlightBold: true,
      level: undefined,
      margin: {
        top: 5,
        right: 5,
        bottom: 5,
        left: 5,
      },
      mass: 1,
      physics: true,
      scaling: {
        min: 10,
        max: 30,
        label: {
          enabled: false,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5,
        },
        customScalingFunction: function (min, max, total, value) {
          if (max === min) {
            return 0.5;
          } else {
            const scale = 1 / (max - min);
            return Math.max(0, (value - min) * scale);
          }
        },
      },
      shadow: {
        enabled: false,
        color: "rgba(0,0,0,0.5)",
        size: 10,
        x: 5,
        y: 5,
      },
      shape: "ellipse",
      shapeProperties: {
        borderDashes: false, // only for borders
        borderRadius: 6, // only for box shape
        interpolation: true, // only for image and circularImage shapes
        useImageSize: false, // only for image and circularImage shapes
        useBorderWithImage: false, // only for image shape
        coordinateOrigin: "center", // only for image and circularImage shapes
      },
      size: 25,
      title: undefined,
      value: undefined,
      x: undefined,
      y: undefined,
    };

    // Protect from idiocy
    if (this.defaultOptions.mass <= 0) {
      throw "Internal error: mass in defaultOptions of NodesHandler may not be zero or negative";
    }

    this.options = bridgeObject(this.defaultOptions);

    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    // refresh the nodes. Used when reverting from hierarchical layout
    this.body.emitter.on("refreshNodes", this.refresh.bind(this));
    this.body.emitter.on("refresh", this.refresh.bind(this));
    this.body.emitter.on("destroy", () => {
      forEach(this.nodesListeners, (callback, event) => {
        if (this.body.data.nodes) this.body.data.nodes.off(event, callback);
      });
      delete this.body.functions.createNode;
      delete this.nodesListeners.add;
      delete this.nodesListeners.update;
      delete this.nodesListeners.remove;
      delete this.nodesListeners;
    });
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      Node.parseOptions(this.options, options);

      // Need to set opacity here because Node.parseOptions is also used for groups,
      // if you set opacity in Node.parseOptions it overwrites group opacity.
      if (options.opacity !== undefined) {
        if (
          Number.isNaN(options.opacity) ||
          !Number.isFinite(options.opacity) ||
          options.opacity < 0 ||
          options.opacity > 1
        ) {
          console.error(
            "Invalid option for node opacity. Value must be between 0 and 1, found: " +
              options.opacity
          );
        } else {
          this.options.opacity = options.opacity;
        }
      }

      // update the shape in all nodes
      if (options.shape !== undefined) {
        for (const nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            this.body.nodes[nodeId].updateShape();
          }
        }
      }

      // Update the labels of nodes if any relevant options changed.
      if (
        typeof options.font !== "undefined" ||
        typeof options.widthConstraint !== "undefined" ||
        typeof options.heightConstraint !== "undefined"
      ) {
        for (const nodeId of Object.keys(this.body.nodes)) {
          this.body.nodes[nodeId].updateLabelModule();
          this.body.nodes[nodeId].needsRefresh();
        }
      }

      // update the shape size in all nodes
      if (options.size !== undefined) {
        for (const nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            this.body.nodes[nodeId].needsRefresh();
          }
        }
      }

      // update the state of the variables if needed
      if (options.hidden !== undefined || options.physics !== undefined) {
        this.body.emitter.emit("_dataChanged");
      }
    }
  }

  /**
   * Set a data set with nodes for the network
   *
   * @param {Array | DataSet | DataView} nodes         The data containing the nodes.
   * @param {boolean} [doNotEmit=false] - Suppress data changed event.
   * @private
   */
  setData(nodes, doNotEmit = false) {
    const oldNodesData = this.body.data.nodes;

    if (isDataViewLike("id", nodes)) {
      this.body.data.nodes = nodes;
    } else if (Array.isArray(nodes)) {
      this.body.data.nodes = new DataSet();
      this.body.data.nodes.add(nodes);
    } else if (!nodes) {
      this.body.data.nodes = new DataSet();
    } else {
      throw new TypeError("Array or DataSet expected");
    }

    if (oldNodesData) {
      // unsubscribe from old dataset
      forEach(this.nodesListeners, function (callback, event) {
        oldNodesData.off(event, callback);
      });
    }

    // remove drawn nodes
    this.body.nodes = {};

    if (this.body.data.nodes) {
      // subscribe to new dataset
      const me = this;
      forEach(this.nodesListeners, function (callback, event) {
        me.body.data.nodes.on(event, callback);
      });

      // draw all new nodes
      const ids = this.body.data.nodes.getIds();
      this.add(ids, true);
    }

    if (doNotEmit === false) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   * Add nodes
   *
   * @param {number[] | string[]} ids
   * @param {boolean} [doNotEmit=false]
   * @private
   */
  add(ids, doNotEmit = false) {
    let id;
    const newNodes = [];
    for (let i = 0; i < ids.length; i++) {
      id = ids[i];
      const properties = this.body.data.nodes.get(id);
      const node = this.create(properties);
      newNodes.push(node);
      this.body.nodes[id] = node; // note: this may replace an existing node
    }

    this.layoutEngine.positionInitially(newNodes);

    if (doNotEmit === false) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   * Update existing nodes, or create them when not yet existing
   *
   * @param {number[] | string[]} ids id's of changed nodes
   * @param {Array} changedData array with changed data
   * @param {Array|undefined} oldData optional; array with previous data
   * @private
   */
  update(ids, changedData, oldData) {
    const nodes = this.body.nodes;
    let dataChanged = false;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      let node = nodes[id];
      const data = changedData[i];
      if (node !== undefined) {
        // update node
        if (node.setOptions(data)) {
          dataChanged = true;
        }
      } else {
        dataChanged = true;
        // create node
        node = this.create(data);
        nodes[id] = node;
      }
    }

    if (!dataChanged && oldData !== undefined) {
      // Check for any changes which should trigger a layout recalculation
      // For now, this is just 'level' for hierarchical layout
      // Assumption: old and new data arranged in same order; at time of writing, this holds.
      dataChanged = changedData.some(function (newValue, index) {
        const oldValue = oldData[index];
        return oldValue && oldValue.level !== newValue.level;
      });
    }

    if (dataChanged === true) {
      this.body.emitter.emit("_dataChanged");
    } else {
      this.body.emitter.emit("_dataUpdated");
    }
  }

  /**
   * Remove existing nodes. If nodes do not exist, the method will just ignore it.
   *
   * @param {number[] | string[]} ids
   * @private
   */
  remove(ids) {
    const nodes = this.body.nodes;

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      delete nodes[id];
    }

    this.body.emitter.emit("_dataChanged");
  }

  /**
   * create a node
   *
   * @param {object} properties
   * @param {class} [constructorClass=Node.default]
   * @returns {*}
   */
  create(properties, constructorClass = Node) {
    return new constructorClass(
      properties,
      this.body,
      this.images,
      this.groups,
      this.options,
      this.defaultOptions
    );
  }

  /**
   *
   * @param {boolean} [clearPositions=false]
   */
  refresh(clearPositions = false) {
    forEach(this.body.nodes, (node, nodeId) => {
      const data = this.body.data.nodes.get(nodeId);
      if (data !== undefined) {
        if (clearPositions === true) {
          node.setOptions({ x: null, y: null });
        }
        node.setOptions({ fixed: false });
        node.setOptions(data);
      }
    });
  }

  /**
   * Returns the positions of the nodes.
   *
   * @param {Array.<Node.id> | string} [ids]  --> optional, can be array of nodeIds, can be string
   * @returns {{}}
   */
  getPositions(ids) {
    const dataArray = {};
    if (ids !== undefined) {
      if (Array.isArray(ids) === true) {
        for (let i = 0; i < ids.length; i++) {
          if (this.body.nodes[ids[i]] !== undefined) {
            const node = this.body.nodes[ids[i]];
            dataArray[ids[i]] = {
              x: Math.round(node.x),
              y: Math.round(node.y),
            };
          }
        }
      } else {
        if (this.body.nodes[ids] !== undefined) {
          const node = this.body.nodes[ids];
          dataArray[ids] = { x: Math.round(node.x), y: Math.round(node.y) };
        }
      }
    } else {
      for (let i = 0; i < this.body.nodeIndices.length; i++) {
        const node = this.body.nodes[this.body.nodeIndices[i]];
        dataArray[this.body.nodeIndices[i]] = {
          x: Math.round(node.x),
          y: Math.round(node.y),
        };
      }
    }
    return dataArray;
  }

  /**
   * Retrieves the x y position of a specific id.
   *
   * @param {string} id The id to retrieve.
   * @throws {TypeError} If no id is included.
   * @throws {ReferenceError} If an invalid id is provided.
   * @returns {{ x: number, y: number }} Returns X, Y canvas position of the node with given id.
   */
  getPosition(id) {
    if (id == undefined) {
      throw new TypeError("No id was specified for getPosition method.");
    } else if (this.body.nodes[id] == undefined) {
      throw new ReferenceError(
        `NodeId provided for getPosition does not exist. Provided: ${id}`
      );
    } else {
      return {
        x: Math.round(this.body.nodes[id].x),
        y: Math.round(this.body.nodes[id].y),
      };
    }
  }

  /**
   * Load the XY positions of the nodes into the dataset.
   */
  storePositions() {
    // todo: add support for clusters and hierarchical.
    const dataArray = [];
    const dataset = this.body.data.nodes.getDataSet();

    for (const dsNode of dataset.get()) {
      const id = dsNode.id;
      const bodyNode = this.body.nodes[id];
      const x = Math.round(bodyNode.x);
      const y = Math.round(bodyNode.y);

      if (dsNode.x !== x || dsNode.y !== y) {
        dataArray.push({ id, x, y });
      }
    }

    dataset.update(dataArray);
  }

  /**
   * get the bounding box of a node.
   *
   * @param {Node.id} nodeId
   * @returns {j|*}
   */
  getBoundingBox(nodeId) {
    if (this.body.nodes[nodeId] !== undefined) {
      return this.body.nodes[nodeId].shape.boundingBox;
    }
  }

  /**
   * Get the Ids of nodes connected to this node.
   *
   * @param {Node.id} nodeId
   * @param {'to'|'from'|undefined} direction values 'from' and 'to' select respectively parent and child nodes only.
   *                                          Any other value returns both parent and child nodes.
   * @returns {Array}
   */
  getConnectedNodes(nodeId, direction) {
    const nodeList = [];
    if (this.body.nodes[nodeId] !== undefined) {
      const node = this.body.nodes[nodeId];
      const nodeObj = {}; // used to quickly check if node already exists
      for (let i = 0; i < node.edges.length; i++) {
        const edge = node.edges[i];
        if (direction !== "to" && edge.toId == node.id) {
          // these are double equals since ids can be numeric or string
          if (nodeObj[edge.fromId] === undefined) {
            nodeList.push(edge.fromId);
            nodeObj[edge.fromId] = true;
          }
        } else if (direction !== "from" && edge.fromId == node.id) {
          // these are double equals since ids can be numeric or string
          if (nodeObj[edge.toId] === undefined) {
            nodeList.push(edge.toId);
            nodeObj[edge.toId] = true;
          }
        }
      }
    }
    return nodeList;
  }

  /**
   * Get the ids of the edges connected to this node.
   *
   * @param {Node.id} nodeId
   * @returns {*}
   */
  getConnectedEdges(nodeId) {
    const edgeList = [];
    if (this.body.nodes[nodeId] !== undefined) {
      const node = this.body.nodes[nodeId];
      for (let i = 0; i < node.edges.length; i++) {
        edgeList.push(node.edges[i].id);
      }
    } else {
      console.error(
        "NodeId provided for getConnectedEdges does not exist. Provided: ",
        nodeId
      );
    }
    return edgeList;
  }

  /**
   * Move a node.
   *
   * @param {Node.id} nodeId
   * @param {number} x
   * @param {number} y
   */
  moveNode(nodeId, x, y) {
    if (this.body.nodes[nodeId] !== undefined) {
      this.body.nodes[nodeId].x = Number(x);
      this.body.nodes[nodeId].y = Number(y);
      setTimeout(() => {
        this.body.emitter.emit("startSimulation");
      }, 0);
    } else {
      console.error(
        "Node id supplied to moveNode does not exist. Provided: ",
        nodeId
      );
    }
  }
}

/**
 * ============================================================================
 * Location of all the endpoint drawing routines.
 *
 * Every endpoint has its own drawing routine, which contains an endpoint definition.
 *
 * The endpoint definitions must have the following properies:
 *
 * - (0,0) is the connection point to the node it attaches to
 * - The endpoints are orientated to the positive x-direction
 * - The length of the endpoint is at most 1
 *
 * As long as the endpoint classes remain simple and not too numerous, they will
 * be contained within this module.
 * All classes here except `EndPoints` should be considered as private to this module.
 *
 * -----------------------------------------------------------------------------
 * ### Further Actions
 *
 * After adding a new endpoint here, you also need to do the following things:
 *
 * - Add the new endpoint name to `network/options.js` in array `endPoints`.
 * - Add the new endpoint name to the documentation.
 *   Scan for 'arrows.to.type` and add it to the description.
 * - Add the endpoint to the examples. At the very least, add it to example
 *   `edgeStyles/arrowTypes`.
 * =============================================================================
 */
/**
 * Common methods for endpoints
 *
 * @class
 */
class EndPoint {
    /**
     * Apply transformation on points for display.
     *
     * The following is done:
     * - rotate by the specified angle
     * - multiply the (normalized) coordinates by the passed length
     * - offset by the target coordinates
     *
     * @param points - The point(s) to be transformed.
     * @param arrowData - The data determining the result of the transformation.
     */
    static transform(points, arrowData) {
        if (!Array.isArray(points)) {
            points = [points];
        }
        const x = arrowData.point.x;
        const y = arrowData.point.y;
        const angle = arrowData.angle;
        const length = arrowData.length;
        for (let i = 0; i < points.length; ++i) {
            const p = points[i];
            const xt = p.x * Math.cos(angle) - p.y * Math.sin(angle);
            const yt = p.x * Math.sin(angle) + p.y * Math.cos(angle);
            p.x = x + length * xt;
            p.y = y + length * yt;
        }
    }
    /**
     * Draw a closed path using the given real coordinates.
     *
     * @param ctx - The path will be rendered into this context.
     * @param points - The points of the path.
     */
    static drawPath(ctx, points) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length; ++i) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.closePath();
    }
}
/**
 * Drawing methods for the arrow endpoint.
 */
let Image$1 = class Image extends EndPoint {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns False as there is no way to fill an image.
     */
    static draw(ctx, arrowData) {
        if (arrowData.image) {
            ctx.save();
            ctx.translate(arrowData.point.x, arrowData.point.y);
            ctx.rotate(Math.PI / 2 + arrowData.angle);
            const width = arrowData.imageWidth != null
                ? arrowData.imageWidth
                : arrowData.image.width;
            const height = arrowData.imageHeight != null
                ? arrowData.imageHeight
                : arrowData.image.height;
            arrowData.image.drawImageAtPosition(ctx, 1, // scale
            -width / 2, // x
            0, // y
            width, height);
            ctx.restore();
        }
        return false;
    }
};
/**
 * Drawing methods for the arrow endpoint.
 */
class Arrow extends EndPoint {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const points = [
            { x: 0, y: 0 },
            { x: -1, y: 0.3 },
            { x: -0.9, y: 0 },
            { x: -1, y: -0.3 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the crow endpoint.
 */
class Crow {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const points = [
            { x: -1, y: 0 },
            { x: 0, y: 0.3 },
            { x: -0.4, y: 0 },
            { x: 0, y: -0.3 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the curve endpoint.
 */
class Curve {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const point = { x: -0.4, y: 0 };
        EndPoint.transform(point, arrowData);
        // Update endpoint style for drawing transparent arc.
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        // Define curve endpoint as semicircle.
        const pi = Math.PI;
        const startAngle = arrowData.angle - pi / 2;
        const endAngle = arrowData.angle + pi / 2;
        ctx.beginPath();
        ctx.arc(point.x, point.y, arrowData.length * 0.4, startAngle, endAngle, false);
        ctx.stroke();
        return true;
    }
}
/**
 * Drawing methods for the inverted curve endpoint.
 */
class InvertedCurve {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const point = { x: -0.3, y: 0 };
        EndPoint.transform(point, arrowData);
        // Update endpoint style for drawing transparent arc.
        ctx.strokeStyle = ctx.fillStyle;
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        // Define inverted curve endpoint as semicircle.
        const pi = Math.PI;
        const startAngle = arrowData.angle + pi / 2;
        const endAngle = arrowData.angle + (3 * pi) / 2;
        ctx.beginPath();
        ctx.arc(point.x, point.y, arrowData.length * 0.4, startAngle, endAngle, false);
        ctx.stroke();
        return true;
    }
}
/**
 * Drawing methods for the trinagle endpoint.
 */
class Triangle {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const points = [
            { x: 0.02, y: 0 },
            { x: -1, y: 0.3 },
            { x: -1, y: -0.3 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the inverted trinagle endpoint.
 */
class InvertedTriangle {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const points = [
            { x: 0, y: 0.3 },
            { x: 0, y: -0.3 },
            { x: -1, y: 0 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the circle endpoint.
 */
class Circle {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        const point = { x: -0.4, y: 0 };
        EndPoint.transform(point, arrowData);
        drawCircle(ctx, point.x, point.y, arrowData.length * 0.4);
        return true;
    }
}
/**
 * Drawing methods for the bar endpoint.
 */
class Bar {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        /*
        var points = [
          {x:0, y:0.5},
          {x:0, y:-0.5}
        ];
    
        EndPoint.transform(points, arrowData);
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.stroke();
    */
        const points = [
            { x: 0, y: 0.5 },
            { x: 0, y: -0.5 },
            { x: -0.15, y: -0.5 },
            { x: -0.15, y: 0.5 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the box endpoint.
 */
class Box {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        const points = [
            { x: 0, y: 0.3 },
            { x: 0, y: -0.3 },
            { x: -0.6, y: -0.3 },
            { x: -0.6, y: 0.3 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the diamond endpoint.
 */
class Diamond {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        const points = [
            { x: 0, y: 0 },
            { x: -0.5, y: -0.3 },
            { x: -1, y: 0 },
            { x: -0.5, y: 0.3 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the vee endpoint.
 */
class Vee {
    /**
     * Draw this shape at the end of a line.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True because ctx.fill() can be used to fill the arrow.
     */
    static draw(ctx, arrowData) {
        // Normalized points of closed path, in the order that they should be drawn.
        // (0, 0) is the attachment point, and the point around which should be rotated
        const points = [
            { x: -1, y: 0.3 },
            { x: -0.5, y: 0 },
            { x: -1, y: -0.3 },
            { x: 0, y: 0 },
        ];
        EndPoint.transform(points, arrowData);
        EndPoint.drawPath(ctx, points);
        return true;
    }
}
/**
 * Drawing methods for the endpoints.
 */
class EndPoints {
    /**
     * Draw an endpoint.
     *
     * @param ctx - The shape will be rendered into this context.
     * @param arrowData - The data determining the shape.
     * @returns True if ctx.fill() can be used to fill the arrow, false otherwise.
     */
    static draw(ctx, arrowData) {
        let type;
        if (arrowData.type) {
            type = arrowData.type.toLowerCase();
        }
        switch (type) {
            case "image":
                return Image$1.draw(ctx, arrowData);
            case "circle":
                return Circle.draw(ctx, arrowData);
            case "box":
                return Box.draw(ctx, arrowData);
            case "crow":
                return Crow.draw(ctx, arrowData);
            case "curve":
                return Curve.draw(ctx, arrowData);
            case "diamond":
                return Diamond.draw(ctx, arrowData);
            case "inv_curve":
                return InvertedCurve.draw(ctx, arrowData);
            case "triangle":
                return Triangle.draw(ctx, arrowData);
            case "inv_triangle":
                return InvertedTriangle.draw(ctx, arrowData);
            case "bar":
                return Bar.draw(ctx, arrowData);
            case "vee":
                return Vee.draw(ctx, arrowData);
            case "arrow": // fall-through
            default:
                return Arrow.draw(ctx, arrowData);
        }
    }
}

/**
 * The Base Class for all edges.
 */
class EdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param _body - The body of the network.
     * @param _labelModule - Label module.
     */
    constructor(options, _body, _labelModule) {
        this._body = _body;
        this._labelModule = _labelModule;
        this.color = {};
        this.colorDirty = true;
        this.hoverWidth = 1.5;
        this.selectionWidth = 2;
        this.setOptions(options);
        this.fromPoint = this.from;
        this.toPoint = this.to;
    }
    /** @inheritDoc */
    connect() {
        this.from = this._body.nodes[this.options.from];
        this.to = this._body.nodes[this.options.to];
    }
    /** @inheritDoc */
    cleanup() {
        return false;
    }
    /**
     * Set new edge options.
     *
     * @param options - The new edge options object.
     */
    setOptions(options) {
        this.options = options;
        this.from = this._body.nodes[this.options.from];
        this.to = this._body.nodes[this.options.to];
        this.id = this.options.id;
    }
    /** @inheritDoc */
    drawLine(ctx, values, _selected, _hover, viaNode = this.getViaNode()) {
        // set style
        ctx.strokeStyle = this.getColor(ctx, values);
        ctx.lineWidth = values.width;
        if (values.dashes !== false) {
            this._drawDashedLine(ctx, values, viaNode);
        }
        else {
            this._drawLine(ctx, values, viaNode);
        }
    }
    /**
     * Draw a line with given style between two nodes through supplied node(s).
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param viaNode - Additional control point(s) for the edge.
     * @param fromPoint - TODO: Seems ignored, remove?
     * @param toPoint - TODO: Seems ignored, remove?
     */
    _drawLine(ctx, values, viaNode, fromPoint, toPoint) {
        if (this.from != this.to) {
            // draw line
            this._line(ctx, values, viaNode, fromPoint, toPoint);
        }
        else {
            const [x, y, radius] = this._getCircleData(ctx);
            this._circle(ctx, values, x, y, radius);
        }
    }
    /**
     * Draw a dashed line with given style between two nodes through supplied node(s).
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param viaNode - Additional control point(s) for the edge.
     * @param _fromPoint - Ignored (TODO: remove in the future).
     * @param _toPoint - Ignored (TODO: remove in the future).
     */
    _drawDashedLine(ctx, values, viaNode, _fromPoint, _toPoint) {
        ctx.lineCap = "round";
        const pattern = Array.isArray(values.dashes) ? values.dashes : [5, 5];
        // only firefox and chrome support this method, else we use the legacy one.
        if (ctx.setLineDash !== undefined) {
            ctx.save();
            // set dash settings for chrome or firefox
            ctx.setLineDash(pattern);
            ctx.lineDashOffset = 0;
            // draw the line
            if (this.from != this.to) {
                // draw line
                this._line(ctx, values, viaNode);
            }
            else {
                const [x, y, radius] = this._getCircleData(ctx);
                this._circle(ctx, values, x, y, radius);
            }
            // restore the dash settings.
            ctx.setLineDash([0]);
            ctx.lineDashOffset = 0;
            ctx.restore();
        }
        else {
            // unsupporting smooth lines
            if (this.from != this.to) {
                // draw line
                drawDashedLine(ctx, this.from.x, this.from.y, this.to.x, this.to.y, pattern);
            }
            else {
                const [x, y, radius] = this._getCircleData(ctx);
                this._circle(ctx, values, x, y, radius);
            }
            // draw shadow if enabled
            this.enableShadow(ctx, values);
            ctx.stroke();
            // disable shadows for other elements.
            this.disableShadow(ctx, values);
        }
    }
    /**
     * Find the intersection between the border of the node and the edge.
     *
     * @param node - The node (either from or to node of the edge).
     * @param ctx - The context that will be used for rendering.
     * @param options - Additional options.
     * @returns Cartesian coordinates of the intersection between the border of the node and the edge.
     */
    findBorderPosition(node, ctx, options) {
        if (this.from != this.to) {
            return this._findBorderPosition(node, ctx, options);
        }
        else {
            return this._findBorderPositionCircle(node, ctx, options);
        }
    }
    /** @inheritDoc */
    findBorderPositions(ctx) {
        if (this.from != this.to) {
            return {
                from: this._findBorderPosition(this.from, ctx),
                to: this._findBorderPosition(this.to, ctx),
            };
        }
        else {
            const [x, y] = this._getCircleData(ctx).slice(0, 2);
            return {
                from: this._findBorderPositionCircle(this.from, ctx, {
                    x,
                    y,
                    low: 0.25,
                    high: 0.6,
                    direction: -1,
                }),
                to: this._findBorderPositionCircle(this.from, ctx, {
                    x,
                    y,
                    low: 0.6,
                    high: 0.8,
                    direction: 1,
                }),
            };
        }
    }
    /**
     * Compute the center point and radius of an edge connected to the same node at both ends.
     *
     * @param ctx - The context that will be used for rendering.
     * @returns `[x, y, radius]`
     */
    _getCircleData(ctx) {
        const radius = this.options.selfReference.size;
        if (ctx !== undefined) {
            if (this.from.shape.width === undefined) {
                this.from.shape.resize(ctx);
            }
        }
        // get circle coordinates
        const coordinates = getSelfRefCoordinates(ctx, this.options.selfReference.angle, radius, this.from);
        return [coordinates.x, coordinates.y, radius];
    }
    /**
     * Get a point on a circle.
     *
     * @param x - Center of the circle on the x axis.
     * @param y - Center of the circle on the y axis.
     * @param radius - Radius of the circle.
     * @param position - Value between 0 (line start) and 1 (line end).
     * @returns Cartesian coordinates of requested point on the circle.
     */
    _pointOnCircle(x, y, radius, position) {
        const angle = position * 2 * Math.PI;
        return {
            x: x + radius * Math.cos(angle),
            y: y - radius * Math.sin(angle),
        };
    }
    /**
     * Find the intersection between the border of the node and the edge.
     *
     * @remarks
     * This function uses binary search to look for the point where the circle crosses the border of the node.
     * @param nearNode - The node (either from or to node of the edge).
     * @param ctx - The context that will be used for rendering.
     * @param options - Additional options.
     * @returns Cartesian coordinates of the intersection between the border of the node and the edge.
     */
    _findBorderPositionCircle(nearNode, ctx, options) {
        const x = options.x;
        const y = options.y;
        let low = options.low;
        let high = options.high;
        const direction = options.direction;
        const maxIterations = 10;
        const radius = this.options.selfReference.size;
        const threshold = 0.05;
        let pos;
        let middle = (low + high) * 0.5;
        let endPointOffset = 0;
        if (this.options.arrowStrikethrough === true) {
            if (direction === -1) {
                endPointOffset = this.options.endPointOffset.from;
            }
            else if (direction === 1) {
                endPointOffset = this.options.endPointOffset.to;
            }
        }
        let iteration = 0;
        do {
            middle = (low + high) * 0.5;
            pos = this._pointOnCircle(x, y, radius, middle);
            const angle = Math.atan2(nearNode.y - pos.y, nearNode.x - pos.x);
            const distanceToBorder = nearNode.distanceToBorder(ctx, angle) + endPointOffset;
            const distanceToPoint = Math.sqrt(Math.pow(pos.x - nearNode.x, 2) + Math.pow(pos.y - nearNode.y, 2));
            const difference = distanceToBorder - distanceToPoint;
            if (Math.abs(difference) < threshold) {
                break; // found
            }
            else if (difference > 0) {
                // distance to nodes is larger than distance to border --> t needs to be bigger if we're looking at the to node.
                if (direction > 0) {
                    low = middle;
                }
                else {
                    high = middle;
                }
            }
            else {
                if (direction > 0) {
                    high = middle;
                }
                else {
                    low = middle;
                }
            }
            ++iteration;
        } while (low <= high && iteration < maxIterations);
        return {
            ...pos,
            t: middle,
        };
    }
    /**
     * Get the line width of the edge. Depends on width and whether one of the connected nodes is selected.
     *
     * @param selected - Determines wheter the line is selected.
     * @param hover - Determines wheter the line is being hovered, only applies if selected is false.
     * @returns The width of the line.
     */
    getLineWidth(selected, hover) {
        if (selected === true) {
            return Math.max(this.selectionWidth, 0.3 / this._body.view.scale);
        }
        else if (hover === true) {
            return Math.max(this.hoverWidth, 0.3 / this._body.view.scale);
        }
        else {
            return Math.max(this.options.width, 0.3 / this._body.view.scale);
        }
    }
    /**
     * Compute the color or gradient for given edge.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param _selected - Ignored (TODO: remove in the future).
     * @param _hover - Ignored (TODO: remove in the future).
     * @returns Color string if single color is inherited or gradient if two.
     */
    getColor(ctx, values) {
        if (values.inheritsColor !== false) {
            // when this is a loop edge, just use the 'from' method
            if (values.inheritsColor === "both" && this.from.id !== this.to.id) {
                const grd = ctx.createLinearGradient(this.from.x, this.from.y, this.to.x, this.to.y);
                let fromColor = this.from.options.color.highlight.border;
                let toColor = this.to.options.color.highlight.border;
                if (this.from.selected === false && this.to.selected === false) {
                    fromColor = overrideOpacity(this.from.options.color.border, values.opacity);
                    toColor = overrideOpacity(this.to.options.color.border, values.opacity);
                }
                else if (this.from.selected === true && this.to.selected === false) {
                    toColor = this.to.options.color.border;
                }
                else if (this.from.selected === false && this.to.selected === true) {
                    fromColor = this.from.options.color.border;
                }
                grd.addColorStop(0, fromColor);
                grd.addColorStop(1, toColor);
                // -------------------- this returns -------------------- //
                return grd;
            }
            if (values.inheritsColor === "to") {
                return overrideOpacity(this.to.options.color.border, values.opacity);
            }
            else {
                // "from"
                return overrideOpacity(this.from.options.color.border, values.opacity);
            }
        }
        else {
            return overrideOpacity(values.color, values.opacity);
        }
    }
    /**
     * Draw a line from a node to itself, a circle.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values like color, opacity or shadow.
     * @param x - Center of the circle on the x axis.
     * @param y - Center of the circle on the y axis.
     * @param radius - Radius of the circle.
     */
    _circle(ctx, values, x, y, radius) {
        // draw shadow if enabled
        this.enableShadow(ctx, values);
        //full circle
        let angleFrom = 0;
        let angleTo = Math.PI * 2;
        if (!this.options.selfReference.renderBehindTheNode) {
            //render only parts which are not overlaping with parent node
            //need to find x,y of from point and x,y to point
            //calculating radians
            const low = this.options.selfReference.angle;
            const high = this.options.selfReference.angle + Math.PI;
            const pointTFrom = this._findBorderPositionCircle(this.from, ctx, {
                x,
                y,
                low,
                high,
                direction: -1,
            });
            const pointTTo = this._findBorderPositionCircle(this.from, ctx, {
                x,
                y,
                low,
                high,
                direction: 1,
            });
            angleFrom = Math.atan2(pointTFrom.y - y, pointTFrom.x - x);
            angleTo = Math.atan2(pointTTo.y - y, pointTTo.x - x);
        }
        // draw a circle
        ctx.beginPath();
        ctx.arc(x, y, radius, angleFrom, angleTo, false);
        ctx.stroke();
        // disable shadows for other elements.
        this.disableShadow(ctx, values);
    }
    /**
     * @inheritDoc
     * @remarks
     * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
     */
    getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
        if (this.from != this.to) {
            return this._getDistanceToEdge(x1, y1, x2, y2, x3, y3);
        }
        else {
            const [x, y, radius] = this._getCircleData(undefined);
            const dx = x - x3;
            const dy = y - y3;
            return Math.abs(Math.sqrt(dx * dx + dy * dy) - radius);
        }
    }
    /**
     * Calculate the distance between a point (x3, y3) and a line segment from (x1, y1) to (x2, y2).
     *
     * @param x1 - First end of the line segment on the x axis.
     * @param y1 - First end of the line segment on the y axis.
     * @param x2 - Second end of the line segment on the x axis.
     * @param y2 - Second end of the line segment on the y axis.
     * @param x3 - Position of the point on the x axis.
     * @param y3 - Position of the point on the y axis.
     * @returns The distance between the line segment and the point.
     */
    _getDistanceToLine(x1, y1, x2, y2, x3, y3) {
        const px = x2 - x1;
        const py = y2 - y1;
        const something = px * px + py * py;
        let u = ((x3 - x1) * px + (y3 - y1) * py) / something;
        if (u > 1) {
            u = 1;
        }
        else if (u < 0) {
            u = 0;
        }
        const x = x1 + u * px;
        const y = y1 + u * py;
        const dx = x - x3;
        const dy = y - y3;
        //# Note: If the actual distance does not matter,
        //# if you only want to compare what this function
        //# returns to other results of this function, you
        //# can just return the squared distance instead
        //# (i.e. remove the sqrt) to gain a little performance
        return Math.sqrt(dx * dx + dy * dy);
    }
    /** @inheritDoc */
    getArrowData(ctx, position, viaNode, _selected, _hover, values) {
        // set lets
        let angle;
        let arrowPoint;
        let node1;
        let node2;
        let reversed;
        let scaleFactor;
        let type;
        const lineWidth = values.width;
        if (position === "from") {
            node1 = this.from;
            node2 = this.to;
            reversed = values.fromArrowScale < 0;
            scaleFactor = Math.abs(values.fromArrowScale);
            type = values.fromArrowType;
        }
        else if (position === "to") {
            node1 = this.to;
            node2 = this.from;
            reversed = values.toArrowScale < 0;
            scaleFactor = Math.abs(values.toArrowScale);
            type = values.toArrowType;
        }
        else {
            node1 = this.to;
            node2 = this.from;
            reversed = values.middleArrowScale < 0;
            scaleFactor = Math.abs(values.middleArrowScale);
            type = values.middleArrowType;
        }
        const length = 15 * scaleFactor + 3 * lineWidth; // 3* lineWidth is the width of the edge.
        // if not connected to itself
        if (node1 != node2) {
            const approximateEdgeLength = Math.hypot(node1.x - node2.x, node1.y - node2.y);
            const relativeLength = length / approximateEdgeLength;
            if (position !== "middle") {
                // draw arrow head
                if (this.options.smooth.enabled === true) {
                    const pointT = this._findBorderPosition(node1, ctx, { via: viaNode });
                    const guidePos = this.getPoint(pointT.t + relativeLength * (position === "from" ? 1 : -1), viaNode);
                    angle = Math.atan2(pointT.y - guidePos.y, pointT.x - guidePos.x);
                    arrowPoint = pointT;
                }
                else {
                    angle = Math.atan2(node1.y - node2.y, node1.x - node2.x);
                    arrowPoint = this._findBorderPosition(node1, ctx);
                }
            }
            else {
                // Negative half length reverses arrow direction.
                const halfLength = (reversed ? -relativeLength : relativeLength) / 2;
                const guidePos1 = this.getPoint(0.5 + halfLength, viaNode);
                const guidePos2 = this.getPoint(0.5 - halfLength, viaNode);
                angle = Math.atan2(guidePos1.y - guidePos2.y, guidePos1.x - guidePos2.x);
                arrowPoint = this.getPoint(0.5, viaNode);
            }
        }
        else {
            // draw circle
            const [x, y, radius] = this._getCircleData(ctx);
            if (position === "from") {
                const low = this.options.selfReference.angle;
                const high = this.options.selfReference.angle + Math.PI;
                const pointT = this._findBorderPositionCircle(this.from, ctx, {
                    x,
                    y,
                    low,
                    high,
                    direction: -1,
                });
                angle = pointT.t * -2 * Math.PI + 1.5 * Math.PI + 0.1 * Math.PI;
                arrowPoint = pointT;
            }
            else if (position === "to") {
                const low = this.options.selfReference.angle;
                const high = this.options.selfReference.angle + Math.PI;
                const pointT = this._findBorderPositionCircle(this.from, ctx, {
                    x,
                    y,
                    low,
                    high,
                    direction: 1,
                });
                angle = pointT.t * -2 * Math.PI + 1.5 * Math.PI - 1.1 * Math.PI;
                arrowPoint = pointT;
            }
            else {
                const pos = this.options.selfReference.angle / (2 * Math.PI);
                arrowPoint = this._pointOnCircle(x, y, radius, pos);
                angle = pos * -2 * Math.PI + 1.5 * Math.PI + 0.1 * Math.PI;
            }
        }
        const xi = arrowPoint.x - length * 0.9 * Math.cos(angle);
        const yi = arrowPoint.y - length * 0.9 * Math.sin(angle);
        const arrowCore = { x: xi, y: yi };
        return {
            point: arrowPoint,
            core: arrowCore,
            angle: angle,
            length: length,
            type: type,
        };
    }
    /** @inheritDoc */
    drawArrowHead(ctx, values, _selected, _hover, arrowData) {
        // set style
        ctx.strokeStyle = this.getColor(ctx, values);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.lineWidth = values.width;
        const canFill = EndPoints.draw(ctx, arrowData);
        if (canFill) {
            // draw shadow if enabled
            this.enableShadow(ctx, values);
            ctx.fill();
            // disable shadows for other elements.
            this.disableShadow(ctx, values);
        }
    }
    /**
     * Set the shadow formatting values in the context if enabled, do nothing otherwise.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values for the shadow.
     */
    enableShadow(ctx, values) {
        if (values.shadow === true) {
            ctx.shadowColor = values.shadowColor;
            ctx.shadowBlur = values.shadowSize;
            ctx.shadowOffsetX = values.shadowX;
            ctx.shadowOffsetY = values.shadowY;
        }
    }
    /**
     * Reset the shadow formatting values in the context if enabled, do nothing otherwise.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values for the shadow.
     */
    disableShadow(ctx, values) {
        if (values.shadow === true) {
            ctx.shadowColor = "rgba(0,0,0,0)";
            ctx.shadowBlur = 0;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
        }
    }
    /**
     * Render the background according to the formatting values.
     *
     * @param ctx - The context that will be used for rendering.
     * @param values - Formatting values for the background.
     */
    drawBackground(ctx, values) {
        if (values.background !== false) {
            // save original line attrs
            const origCtxAttr = {
                strokeStyle: ctx.strokeStyle,
                lineWidth: ctx.lineWidth,
                dashes: ctx.dashes,
            };
            ctx.strokeStyle = values.backgroundColor;
            ctx.lineWidth = values.backgroundSize;
            this.setStrokeDashed(ctx, values.backgroundDashes);
            ctx.stroke();
            // restore original line attrs
            ctx.strokeStyle = origCtxAttr.strokeStyle;
            ctx.lineWidth = origCtxAttr.lineWidth;
            ctx.dashes = origCtxAttr.dashes;
            this.setStrokeDashed(ctx, values.dashes);
        }
    }
    /**
     * Set the line dash pattern if supported. Logs a warning to the console if it isn't supported.
     *
     * @param ctx - The context that will be used for rendering.
     * @param dashes - The pattern [line, space, line…], true for default dashed line or false for normal line.
     */
    setStrokeDashed(ctx, dashes) {
        if (dashes !== false) {
            if (ctx.setLineDash !== undefined) {
                const pattern = Array.isArray(dashes) ? dashes : [5, 5];
                ctx.setLineDash(pattern);
            }
            else {
                console.warn("setLineDash is not supported in this browser. The dashed stroke cannot be used.");
            }
        }
        else {
            if (ctx.setLineDash !== undefined) {
                ctx.setLineDash([]);
            }
            else {
                console.warn("setLineDash is not supported in this browser. The dashed stroke cannot be used.");
            }
        }
    }
}

/**
 * The Base Class for all Bezier edges.
 * Bezier curves are used to model smooth gradual curves in paths between nodes.
 */
class BezierEdgeBase extends EdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param body - The body of the network.
     * @param labelModule - Label module.
     */
    constructor(options, body, labelModule) {
        super(options, body, labelModule);
    }
    /**
     * Find the intersection between the border of the node and the edge.
     *
     * @remarks
     * This function uses binary search to look for the point where the bezier curve crosses the border of the node.
     * @param nearNode - The node (either from or to node of the edge).
     * @param ctx - The context that will be used for rendering.
     * @param viaNode - Additional node(s) the edge passes through.
     * @returns Cartesian coordinates of the intersection between the border of the node and the edge.
     */
    _findBorderPositionBezier(nearNode, ctx, viaNode = this._getViaCoordinates()) {
        const maxIterations = 10;
        const threshold = 0.2;
        let from = false;
        let high = 1;
        let low = 0;
        let node = this.to;
        let pos;
        let middle;
        let endPointOffset = this.options.endPointOffset
            ? this.options.endPointOffset.to
            : 0;
        if (nearNode.id === this.from.id) {
            node = this.from;
            from = true;
            endPointOffset = this.options.endPointOffset
                ? this.options.endPointOffset.from
                : 0;
        }
        if (this.options.arrowStrikethrough === false) {
            endPointOffset = 0;
        }
        let iteration = 0;
        do {
            middle = (low + high) * 0.5;
            pos = this.getPoint(middle, viaNode);
            const angle = Math.atan2(node.y - pos.y, node.x - pos.x);
            const distanceToBorder = node.distanceToBorder(ctx, angle) + endPointOffset;
            const distanceToPoint = Math.sqrt(Math.pow(pos.x - node.x, 2) + Math.pow(pos.y - node.y, 2));
            const difference = distanceToBorder - distanceToPoint;
            if (Math.abs(difference) < threshold) {
                break; // found
            }
            else if (difference < 0) {
                // distance to nodes is larger than distance to border --> t needs to be bigger if we're looking at the to node.
                if (from === false) {
                    low = middle;
                }
                else {
                    high = middle;
                }
            }
            else {
                if (from === false) {
                    high = middle;
                }
                else {
                    low = middle;
                }
            }
            ++iteration;
        } while (low <= high && iteration < maxIterations);
        return {
            ...pos,
            t: middle,
        };
    }
    /**
     * Calculate the distance between a point (x3,y3) and a line segment from (x1,y1) to (x2,y2).
     *
     * @remarks
     * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
     * @param x1 - First end of the line segment on the x axis.
     * @param y1 - First end of the line segment on the y axis.
     * @param x2 - Second end of the line segment on the x axis.
     * @param y2 - Second end of the line segment on the y axis.
     * @param x3 - Position of the point on the x axis.
     * @param y3 - Position of the point on the y axis.
     * @param via - The control point for the edge.
     * @returns The distance between the line segment and the point.
     */
    _getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, via) {
        // x3,y3 is the point
        let minDistance = 1e9;
        let distance;
        let i, t, x, y;
        let lastX = x1;
        let lastY = y1;
        for (i = 1; i < 10; i++) {
            t = 0.1 * i;
            x =
                Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * via.x + Math.pow(t, 2) * x2;
            y =
                Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * via.y + Math.pow(t, 2) * y2;
            if (i > 0) {
                distance = this._getDistanceToLine(lastX, lastY, x, y, x3, y3);
                minDistance = distance < minDistance ? distance : minDistance;
            }
            lastX = x;
            lastY = y;
        }
        return minDistance;
    }
    /**
     * Render a bezier curve between two nodes.
     *
     * @remarks
     * The method accepts zero, one or two control points.
     * Passing zero control points just draws a straight line.
     * @param ctx - The context that will be used for rendering.
     * @param values - Style options for edge drawing.
     * @param viaNode1 - First control point for curve drawing.
     * @param viaNode2 - Second control point for curve drawing.
     */
    _bezierCurve(ctx, values, viaNode1, viaNode2) {
        ctx.beginPath();
        ctx.moveTo(this.fromPoint.x, this.fromPoint.y);
        if (viaNode1 != null && viaNode1.x != null) {
            if (viaNode2 != null && viaNode2.x != null) {
                ctx.bezierCurveTo(viaNode1.x, viaNode1.y, viaNode2.x, viaNode2.y, this.toPoint.x, this.toPoint.y);
            }
            else {
                ctx.quadraticCurveTo(viaNode1.x, viaNode1.y, this.toPoint.x, this.toPoint.y);
            }
        }
        else {
            // fallback to normal straight edge
            ctx.lineTo(this.toPoint.x, this.toPoint.y);
        }
        // draw a background
        this.drawBackground(ctx, values);
        // draw shadow if enabled
        this.enableShadow(ctx, values);
        ctx.stroke();
        this.disableShadow(ctx, values);
    }
    /** @inheritDoc */
    getViaNode() {
        return this._getViaCoordinates();
    }
}

/**
 * A Dynamic Bezier Edge. Bezier curves are used to model smooth gradual
 * curves in paths between nodes. The Dynamic piece refers to how the curve
 * reacts to physics changes.
 *
 * @augments BezierEdgeBase
 */
class BezierEdgeDynamic extends BezierEdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param body - The body of the network.
     * @param labelModule - Label module.
     */
    constructor(options, body, labelModule) {
        //this.via = undefined; // Here for completeness but not allowed to defined before super() is invoked.
        super(options, body, labelModule); // --> this calls the setOptions below
        this.via = this.via; // constructor → super → super → setOptions → setupSupportNode
        this._boundFunction = () => {
            this.positionBezierNode();
        };
        this._body.emitter.on("_repositionBezierNodes", this._boundFunction);
    }
    /** @inheritDoc */
    setOptions(options) {
        super.setOptions(options);
        // check if the physics has changed.
        let physicsChange = false;
        if (this.options.physics !== options.physics) {
            physicsChange = true;
        }
        // set the options and the to and from nodes
        this.options = options;
        this.id = this.options.id;
        this.from = this._body.nodes[this.options.from];
        this.to = this._body.nodes[this.options.to];
        // setup the support node and connect
        this.setupSupportNode();
        this.connect();
        // when we change the physics state of the edge, we reposition the support node.
        if (physicsChange === true) {
            this.via.setOptions({ physics: this.options.physics });
            this.positionBezierNode();
        }
    }
    /** @inheritDoc */
    connect() {
        this.from = this._body.nodes[this.options.from];
        this.to = this._body.nodes[this.options.to];
        if (this.from === undefined ||
            this.to === undefined ||
            this.options.physics === false) {
            this.via.setOptions({ physics: false });
        }
        else {
            // fix weird behaviour where a self referencing node has physics enabled
            if (this.from.id === this.to.id) {
                this.via.setOptions({ physics: false });
            }
            else {
                this.via.setOptions({ physics: true });
            }
        }
    }
    /** @inheritDoc */
    cleanup() {
        this._body.emitter.off("_repositionBezierNodes", this._boundFunction);
        if (this.via !== undefined) {
            delete this._body.nodes[this.via.id];
            this.via = undefined;
            return true;
        }
        return false;
    }
    /**
     * Create and add a support node if not already present.
     *
     * @remarks
     * Bezier curves require an anchor point to calculate the smooth flow.
     * These points are nodes.
     * These nodes are invisible but are used for the force calculation.
     *
     * The changed data is not called, if needed, it is returned by the main edge constructor.
     */
    setupSupportNode() {
        if (this.via === undefined) {
            const nodeId = "edgeId:" + this.id;
            const node = this._body.functions.createNode({
                id: nodeId,
                shape: "circle",
                physics: true,
                hidden: true,
            });
            this._body.nodes[nodeId] = node;
            this.via = node;
            this.via.parentEdgeId = this.id;
            this.positionBezierNode();
        }
    }
    /**
     * Position bezier node.
     */
    positionBezierNode() {
        if (this.via !== undefined &&
            this.from !== undefined &&
            this.to !== undefined) {
            this.via.x = 0.5 * (this.from.x + this.to.x);
            this.via.y = 0.5 * (this.from.y + this.to.y);
        }
        else if (this.via !== undefined) {
            this.via.x = 0;
            this.via.y = 0;
        }
    }
    /** @inheritDoc */
    _line(ctx, values, viaNode) {
        this._bezierCurve(ctx, values, viaNode);
    }
    /** @inheritDoc */
    _getViaCoordinates() {
        return this.via;
    }
    /** @inheritDoc */
    getViaNode() {
        return this.via;
    }
    /** @inheritDoc */
    getPoint(position, viaNode = this.via) {
        if (this.from === this.to) {
            const [cx, cy, cr] = this._getCircleData();
            const a = 2 * Math.PI * (1 - position);
            return {
                x: cx + cr * Math.sin(a),
                y: cy + cr - cr * (1 - Math.cos(a)),
            };
        }
        else {
            return {
                x: Math.pow(1 - position, 2) * this.fromPoint.x +
                    2 * position * (1 - position) * viaNode.x +
                    Math.pow(position, 2) * this.toPoint.x,
                y: Math.pow(1 - position, 2) * this.fromPoint.y +
                    2 * position * (1 - position) * viaNode.y +
                    Math.pow(position, 2) * this.toPoint.y,
            };
        }
    }
    /** @inheritDoc */
    _findBorderPosition(nearNode, ctx) {
        return this._findBorderPositionBezier(nearNode, ctx, this.via);
    }
    /** @inheritDoc */
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
        // x3,y3 is the point
        return this._getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, this.via);
    }
}

/**
 * A Static Bezier Edge. Bezier curves are used to model smooth gradual curves in paths between nodes.
 */
class BezierEdgeStatic extends BezierEdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param body - The body of the network.
     * @param labelModule - Label module.
     */
    constructor(options, body, labelModule) {
        super(options, body, labelModule);
    }
    /** @inheritDoc */
    _line(ctx, values, viaNode) {
        this._bezierCurve(ctx, values, viaNode);
    }
    /** @inheritDoc */
    getViaNode() {
        return this._getViaCoordinates();
    }
    /**
     * Compute the coordinates of the via node.
     *
     * @remarks
     * We do not use the to and fromPoints here to make the via nodes the same as edges without arrows.
     * @returns Cartesian coordinates of the via node.
     */
    _getViaCoordinates() {
        // Assumption: x/y coordinates in from/to always defined
        const factor = this.options.smooth.roundness;
        const type = this.options.smooth.type;
        let dx = Math.abs(this.from.x - this.to.x);
        let dy = Math.abs(this.from.y - this.to.y);
        if (type === "discrete" || type === "diagonalCross") {
            let stepX;
            let stepY;
            if (dx <= dy) {
                stepX = stepY = factor * dy;
            }
            else {
                stepX = stepY = factor * dx;
            }
            if (this.from.x > this.to.x) {
                stepX = -stepX;
            }
            if (this.from.y >= this.to.y) {
                stepY = -stepY;
            }
            let xVia = this.from.x + stepX;
            let yVia = this.from.y + stepY;
            if (type === "discrete") {
                if (dx <= dy) {
                    xVia = dx < factor * dy ? this.from.x : xVia;
                }
                else {
                    yVia = dy < factor * dx ? this.from.y : yVia;
                }
            }
            return { x: xVia, y: yVia };
        }
        else if (type === "straightCross") {
            let stepX = (1 - factor) * dx;
            let stepY = (1 - factor) * dy;
            if (dx <= dy) {
                // up - down
                stepX = 0;
                if (this.from.y < this.to.y) {
                    stepY = -stepY;
                }
            }
            else {
                // left - right
                if (this.from.x < this.to.x) {
                    stepX = -stepX;
                }
                stepY = 0;
            }
            return {
                x: this.to.x + stepX,
                y: this.to.y + stepY,
            };
        }
        else if (type === "horizontal") {
            let stepX = (1 - factor) * dx;
            if (this.from.x < this.to.x) {
                stepX = -stepX;
            }
            return {
                x: this.to.x + stepX,
                y: this.from.y,
            };
        }
        else if (type === "vertical") {
            let stepY = (1 - factor) * dy;
            if (this.from.y < this.to.y) {
                stepY = -stepY;
            }
            return {
                x: this.from.x,
                y: this.to.y + stepY,
            };
        }
        else if (type === "curvedCW") {
            dx = this.to.x - this.from.x;
            dy = this.from.y - this.to.y;
            const radius = Math.sqrt(dx * dx + dy * dy);
            const pi = Math.PI;
            const originalAngle = Math.atan2(dy, dx);
            const myAngle = (originalAngle + (factor * 0.5 + 0.5) * pi) % (2 * pi);
            return {
                x: this.from.x + (factor * 0.5 + 0.5) * radius * Math.sin(myAngle),
                y: this.from.y + (factor * 0.5 + 0.5) * radius * Math.cos(myAngle),
            };
        }
        else if (type === "curvedCCW") {
            dx = this.to.x - this.from.x;
            dy = this.from.y - this.to.y;
            const radius = Math.sqrt(dx * dx + dy * dy);
            const pi = Math.PI;
            const originalAngle = Math.atan2(dy, dx);
            const myAngle = (originalAngle + (-factor * 0.5 + 0.5) * pi) % (2 * pi);
            return {
                x: this.from.x + (factor * 0.5 + 0.5) * radius * Math.sin(myAngle),
                y: this.from.y + (factor * 0.5 + 0.5) * radius * Math.cos(myAngle),
            };
        }
        else {
            // continuous
            let stepX;
            let stepY;
            if (dx <= dy) {
                stepX = stepY = factor * dy;
            }
            else {
                stepX = stepY = factor * dx;
            }
            if (this.from.x > this.to.x) {
                stepX = -stepX;
            }
            if (this.from.y >= this.to.y) {
                stepY = -stepY;
            }
            let xVia = this.from.x + stepX;
            let yVia = this.from.y + stepY;
            if (dx <= dy) {
                if (this.from.x <= this.to.x) {
                    xVia = this.to.x < xVia ? this.to.x : xVia;
                }
                else {
                    xVia = this.to.x > xVia ? this.to.x : xVia;
                }
            }
            else {
                if (this.from.y >= this.to.y) {
                    yVia = this.to.y > yVia ? this.to.y : yVia;
                }
                else {
                    yVia = this.to.y < yVia ? this.to.y : yVia;
                }
            }
            return { x: xVia, y: yVia };
        }
    }
    /** @inheritDoc */
    _findBorderPosition(nearNode, ctx, options = {}) {
        return this._findBorderPositionBezier(nearNode, ctx, options.via);
    }
    /** @inheritDoc */
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3, viaNode = this._getViaCoordinates()) {
        // x3,y3 is the point
        return this._getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, viaNode);
    }
    /** @inheritDoc */
    getPoint(position, viaNode = this._getViaCoordinates()) {
        const t = position;
        const x = Math.pow(1 - t, 2) * this.fromPoint.x +
            2 * t * (1 - t) * viaNode.x +
            Math.pow(t, 2) * this.toPoint.x;
        const y = Math.pow(1 - t, 2) * this.fromPoint.y +
            2 * t * (1 - t) * viaNode.y +
            Math.pow(t, 2) * this.toPoint.y;
        return { x: x, y: y };
    }
}

/**
 * A Base Class for all Cubic Bezier Edges. Bezier curves are used to model
 * smooth gradual curves in paths between nodes.
 *
 * @augments BezierEdgeBase
 */
class CubicBezierEdgeBase extends BezierEdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param body - The body of the network.
     * @param labelModule - Label module.
     */
    constructor(options, body, labelModule) {
        super(options, body, labelModule);
    }
    /**
     * Calculate the distance between a point (x3,y3) and a line segment from (x1,y1) to (x2,y2).
     *
     * @remarks
     * http://stackoverflow.com/questions/849211/shortest-distancae-between-a-point-and-a-line-segment
     * https://en.wikipedia.org/wiki/B%C3%A9zier_curve
     * @param x1 - First end of the line segment on the x axis.
     * @param y1 - First end of the line segment on the y axis.
     * @param x2 - Second end of the line segment on the x axis.
     * @param y2 - Second end of the line segment on the y axis.
     * @param x3 - Position of the point on the x axis.
     * @param y3 - Position of the point on the y axis.
     * @param via1 - The first point this edge passes through.
     * @param via2 - The second point this edge passes through.
     * @returns The distance between the line segment and the point.
     */
    _getDistanceToBezierEdge2(x1, y1, x2, y2, x3, y3, via1, via2) {
        // x3,y3 is the point
        let minDistance = 1e9;
        let lastX = x1;
        let lastY = y1;
        const vec = [0, 0, 0, 0];
        for (let i = 1; i < 10; i++) {
            const t = 0.1 * i;
            vec[0] = Math.pow(1 - t, 3);
            vec[1] = 3 * t * Math.pow(1 - t, 2);
            vec[2] = 3 * Math.pow(t, 2) * (1 - t);
            vec[3] = Math.pow(t, 3);
            const x = vec[0] * x1 + vec[1] * via1.x + vec[2] * via2.x + vec[3] * x2;
            const y = vec[0] * y1 + vec[1] * via1.y + vec[2] * via2.y + vec[3] * y2;
            if (i > 0) {
                const distance = this._getDistanceToLine(lastX, lastY, x, y, x3, y3);
                minDistance = distance < minDistance ? distance : minDistance;
            }
            lastX = x;
            lastY = y;
        }
        return minDistance;
    }
}

/**
 * A Cubic Bezier Edge. Bezier curves are used to model smooth gradual curves in paths between nodes.
 */
class CubicBezierEdge extends CubicBezierEdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param body - The body of the network.
     * @param labelModule - Label module.
     */
    constructor(options, body, labelModule) {
        super(options, body, labelModule);
    }
    /** @inheritDoc */
    _line(ctx, values, viaNodes) {
        // get the coordinates of the support points.
        const via1 = viaNodes[0];
        const via2 = viaNodes[1];
        this._bezierCurve(ctx, values, via1, via2);
    }
    /**
     * Compute the additional points the edge passes through.
     *
     * @returns Cartesian coordinates of the points the edge passes through.
     */
    _getViaCoordinates() {
        const dx = this.from.x - this.to.x;
        const dy = this.from.y - this.to.y;
        let x1;
        let y1;
        let x2;
        let y2;
        const roundness = this.options.smooth.roundness;
        // horizontal if x > y or if direction is forced or if direction is horizontal
        if ((Math.abs(dx) > Math.abs(dy) ||
            this.options.smooth.forceDirection === true ||
            this.options.smooth.forceDirection === "horizontal") &&
            this.options.smooth.forceDirection !== "vertical") {
            y1 = this.from.y;
            y2 = this.to.y;
            x1 = this.from.x - roundness * dx;
            x2 = this.to.x + roundness * dx;
        }
        else {
            y1 = this.from.y - roundness * dy;
            y2 = this.to.y + roundness * dy;
            x1 = this.from.x;
            x2 = this.to.x;
        }
        return [
            { x: x1, y: y1 },
            { x: x2, y: y2 },
        ];
    }
    /** @inheritDoc */
    getViaNode() {
        return this._getViaCoordinates();
    }
    /** @inheritDoc */
    _findBorderPosition(nearNode, ctx) {
        return this._findBorderPositionBezier(nearNode, ctx);
    }
    /** @inheritDoc */
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3, [via1, via2] = this._getViaCoordinates()) {
        // x3,y3 is the point
        return this._getDistanceToBezierEdge2(x1, y1, x2, y2, x3, y3, via1, via2);
    }
    /** @inheritDoc */
    getPoint(position, [via1, via2] = this._getViaCoordinates()) {
        const t = position;
        const vec = [
            Math.pow(1 - t, 3),
            3 * t * Math.pow(1 - t, 2),
            3 * Math.pow(t, 2) * (1 - t),
            Math.pow(t, 3),
        ];
        const x = vec[0] * this.fromPoint.x +
            vec[1] * via1.x +
            vec[2] * via2.x +
            vec[3] * this.toPoint.x;
        const y = vec[0] * this.fromPoint.y +
            vec[1] * via1.y +
            vec[2] * via2.y +
            vec[3] * this.toPoint.y;
        return { x: x, y: y };
    }
}

/**
 * A Straight Edge.
 */
class StraightEdge extends EdgeBase {
    /**
     * Create a new instance.
     *
     * @param options - The options object of given edge.
     * @param body - The body of the network.
     * @param labelModule - Label module.
     */
    constructor(options, body, labelModule) {
        super(options, body, labelModule);
    }
    /** @inheritDoc */
    _line(ctx, values) {
        // draw a straight line
        ctx.beginPath();
        ctx.moveTo(this.fromPoint.x, this.fromPoint.y);
        ctx.lineTo(this.toPoint.x, this.toPoint.y);
        // draw shadow if enabled
        this.enableShadow(ctx, values);
        ctx.stroke();
        this.disableShadow(ctx, values);
    }
    /** @inheritDoc */
    getViaNode() {
        return undefined;
    }
    /** @inheritDoc */
    getPoint(position) {
        return {
            x: (1 - position) * this.fromPoint.x + position * this.toPoint.x,
            y: (1 - position) * this.fromPoint.y + position * this.toPoint.y,
        };
    }
    /** @inheritDoc */
    _findBorderPosition(nearNode, ctx) {
        let node1 = this.to;
        let node2 = this.from;
        if (nearNode.id === this.from.id) {
            node1 = this.from;
            node2 = this.to;
        }
        const angle = Math.atan2(node1.y - node2.y, node1.x - node2.x);
        const dx = node1.x - node2.x;
        const dy = node1.y - node2.y;
        const edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
        const toBorderDist = nearNode.distanceToBorder(ctx, angle);
        const toBorderPoint = (edgeSegmentLength - toBorderDist) / edgeSegmentLength;
        return {
            x: (1 - toBorderPoint) * node2.x + toBorderPoint * node1.x,
            y: (1 - toBorderPoint) * node2.y + toBorderPoint * node1.y,
            t: 0,
        };
    }
    /** @inheritDoc */
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
        // x3,y3 is the point
        return this._getDistanceToLine(x1, y1, x2, y2, x3, y3);
    }
}

/**
 * An edge connects two nodes and has a specific direction.
 */
class Edge {
  /**
   * @param {object} options        values specific to this edge, must contain at least 'from' and 'to'
   * @param {object} body           shared state from Network instance
   * @param {Network.Images} imagelist  A list with images. Only needed when the edge has image arrows.
   * @param {object} globalOptions  options from the EdgesHandler instance
   * @param {object} defaultOptions default options from the EdgeHandler instance. Value and reference are constant
   */
  constructor(options, body, imagelist, globalOptions, defaultOptions) {
    if (body === undefined) {
      throw new Error("No body provided");
    }

    // Since globalOptions is constant in values as well as reference,
    // Following needs to be done only once.

    this.options = bridgeObject(globalOptions);
    this.globalOptions = globalOptions;
    this.defaultOptions = defaultOptions;
    this.body = body;
    this.imagelist = imagelist;

    // initialize variables
    this.id = undefined;
    this.fromId = undefined;
    this.toId = undefined;
    this.selected = false;
    this.hover = false;
    this.labelDirty = true;

    this.baseWidth = this.options.width;
    this.baseFontSize = this.options.font.size;

    this.from = undefined; // a node
    this.to = undefined; // a node

    this.edgeType = undefined;

    this.connected = false;

    this.labelModule = new Label(
      this.body,
      this.options,
      true /* It's an edge label */
    );
    this.setOptions(options);
  }

  /**
   * Set or overwrite options for the edge
   *
   * @param {object} options  an object with options
   * @returns {undefined|boolean} undefined if no options, true if layout affecting data changed, false otherwise.
   */
  setOptions(options) {
    if (!options) {
      return;
    }

    // Following options if changed affect the layout.
    let affectsLayout =
      (typeof options.physics !== "undefined" &&
        this.options.physics !== options.physics) ||
      (typeof options.hidden !== "undefined" &&
        (this.options.hidden || false) !== (options.hidden || false)) ||
      (typeof options.from !== "undefined" &&
        this.options.from !== options.from) ||
      (typeof options.to !== "undefined" && this.options.to !== options.to);

    Edge.parseOptions(this.options, options, true, this.globalOptions);

    if (options.id !== undefined) {
      this.id = options.id;
    }
    if (options.from !== undefined) {
      this.fromId = options.from;
    }
    if (options.to !== undefined) {
      this.toId = options.to;
    }
    if (options.title !== undefined) {
      this.title = options.title;
    }
    if (options.value !== undefined) {
      options.value = parseFloat(options.value);
    }

    const pile = [options, this.options, this.defaultOptions];
    this.chooser = choosify("edge", pile);

    // update label Module
    this.updateLabelModule(options);

    // Update edge type, this if changed affects the layout.
    affectsLayout = this.updateEdgeType() || affectsLayout;

    // if anything has been updates, reset the selection width and the hover width
    this._setInteractionWidths();

    // A node is connected when it has a from and to node that both exist in the network.body.nodes.
    this.connect();

    return affectsLayout;
  }

  /**
   *
   * @param {object} parentOptions
   * @param {object} newOptions
   * @param {boolean} [allowDeletion=false]
   * @param {object} [globalOptions={}]
   * @param {boolean} [copyFromGlobals=false]
   */
  static parseOptions(
    parentOptions,
    newOptions,
    allowDeletion = false,
    globalOptions = {},
    copyFromGlobals = false
  ) {
    const fields = [
      "endPointOffset",
      "arrowStrikethrough",
      "id",
      "from",
      "hidden",
      "hoverWidth",
      "labelHighlightBold",
      "length",
      "line",
      "opacity",
      "physics",
      "scaling",
      "selectionWidth",
      "selfReferenceSize",
      "selfReference",
      "to",
      "title",
      "value",
      "width",
      "font",
      "chosen",
      "widthConstraint",
    ];

    // only deep extend the items in the field array. These do not have shorthand.
    selectiveDeepExtend(fields, parentOptions, newOptions, allowDeletion);

    // Only use endPointOffset values (from and to) if it's valid values
    if (
      newOptions.endPointOffset !== undefined &&
      newOptions.endPointOffset.from !== undefined
    ) {
      if (Number.isFinite(newOptions.endPointOffset.from)) {
        parentOptions.endPointOffset.from = newOptions.endPointOffset.from;
      } else {
        parentOptions.endPointOffset.from =
          globalOptions.endPointOffset.from !== undefined
            ? globalOptions.endPointOffset.from
            : 0;
        console.error("endPointOffset.from is not a valid number");
      }
    }

    if (
      newOptions.endPointOffset !== undefined &&
      newOptions.endPointOffset.to !== undefined
    ) {
      if (Number.isFinite(newOptions.endPointOffset.to)) {
        parentOptions.endPointOffset.to = newOptions.endPointOffset.to;
      } else {
        parentOptions.endPointOffset.to =
          globalOptions.endPointOffset.to !== undefined
            ? globalOptions.endPointOffset.to
            : 0;
        console.error("endPointOffset.to is not a valid number");
      }
    }

    // Only copy label if it's a legal value.
    if (isValidLabel(newOptions.label)) {
      parentOptions.label = newOptions.label;
    } else if (!isValidLabel(parentOptions.label)) {
      parentOptions.label = undefined;
    }

    mergeOptions(parentOptions, newOptions, "smooth", globalOptions);
    mergeOptions(parentOptions, newOptions, "shadow", globalOptions);
    mergeOptions(parentOptions, newOptions, "background", globalOptions);

    if (newOptions.dashes !== undefined && newOptions.dashes !== null) {
      parentOptions.dashes = newOptions.dashes;
    } else if (allowDeletion === true && newOptions.dashes === null) {
      parentOptions.dashes = Object.create(globalOptions.dashes); // this sets the pointer of the option back to the global option.
    }

    // set the scaling newOptions
    if (newOptions.scaling !== undefined && newOptions.scaling !== null) {
      if (newOptions.scaling.min !== undefined) {
        parentOptions.scaling.min = newOptions.scaling.min;
      }
      if (newOptions.scaling.max !== undefined) {
        parentOptions.scaling.max = newOptions.scaling.max;
      }
      mergeOptions(
        parentOptions.scaling,
        newOptions.scaling,
        "label",
        globalOptions.scaling
      );
    } else if (allowDeletion === true && newOptions.scaling === null) {
      parentOptions.scaling = Object.create(globalOptions.scaling); // this sets the pointer of the option back to the global option.
    }

    // handle multiple input cases for arrows
    if (newOptions.arrows !== undefined && newOptions.arrows !== null) {
      if (typeof newOptions.arrows === "string") {
        const arrows = newOptions.arrows.toLowerCase();
        parentOptions.arrows.to.enabled = arrows.indexOf("to") != -1;
        parentOptions.arrows.middle.enabled = arrows.indexOf("middle") != -1;
        parentOptions.arrows.from.enabled = arrows.indexOf("from") != -1;
      } else if (typeof newOptions.arrows === "object") {
        mergeOptions(
          parentOptions.arrows,
          newOptions.arrows,
          "to",
          globalOptions.arrows
        );
        mergeOptions(
          parentOptions.arrows,
          newOptions.arrows,
          "middle",
          globalOptions.arrows
        );
        mergeOptions(
          parentOptions.arrows,
          newOptions.arrows,
          "from",
          globalOptions.arrows
        );
      } else {
        throw new Error(
          "The arrow newOptions can only be an object or a string. Refer to the documentation. You used:" +
            JSON.stringify(newOptions.arrows)
        );
      }
    } else if (allowDeletion === true && newOptions.arrows === null) {
      parentOptions.arrows = Object.create(globalOptions.arrows); // this sets the pointer of the option back to the global option.
    }

    // handle multiple input cases for color
    if (newOptions.color !== undefined && newOptions.color !== null) {
      const fromColor = isString(newOptions.color)
        ? {
            color: newOptions.color,
            highlight: newOptions.color,
            hover: newOptions.color,
            inherit: false,
            opacity: 1,
          }
        : newOptions.color;
      const toColor = parentOptions.color;

      // If passed, fill in values from default options - required in the case of no prototype bridging
      if (copyFromGlobals) {
        deepExtend(toColor, globalOptions.color, false, allowDeletion);
      } else {
        // Clear local properties - need to do it like this in order to retain prototype bridges
        for (const i in toColor) {
          if (Object.prototype.hasOwnProperty.call(toColor, i)) {
            delete toColor[i];
          }
        }
      }

      if (isString(toColor)) {
        toColor.color = toColor;
        toColor.highlight = toColor;
        toColor.hover = toColor;
        toColor.inherit = false;
        if (fromColor.opacity === undefined) {
          toColor.opacity = 1.0; // set default
        }
      } else {
        let colorsDefined = false;
        if (fromColor.color !== undefined) {
          toColor.color = fromColor.color;
          colorsDefined = true;
        }
        if (fromColor.highlight !== undefined) {
          toColor.highlight = fromColor.highlight;
          colorsDefined = true;
        }
        if (fromColor.hover !== undefined) {
          toColor.hover = fromColor.hover;
          colorsDefined = true;
        }
        if (fromColor.inherit !== undefined) {
          toColor.inherit = fromColor.inherit;
        }
        if (fromColor.opacity !== undefined) {
          toColor.opacity = Math.min(1, Math.max(0, fromColor.opacity));
        }

        if (colorsDefined === true) {
          toColor.inherit = false;
        } else {
          if (toColor.inherit === undefined) {
            toColor.inherit = "from"; // Set default
          }
        }
      }
    } else if (allowDeletion === true && newOptions.color === null) {
      parentOptions.color = bridgeObject(globalOptions.color); // set the object back to the global options
    }

    if (allowDeletion === true && newOptions.font === null) {
      parentOptions.font = bridgeObject(globalOptions.font); // set the object back to the global options
    }

    if (Object.prototype.hasOwnProperty.call(newOptions, "selfReferenceSize")) {
      console.warn(
        "The selfReferenceSize property has been deprecated. Please use selfReference property instead. The selfReference can be set like thise selfReference:{size:30, angle:Math.PI / 4}"
      );
      parentOptions.selfReference.size = newOptions.selfReferenceSize;
    }
  }

  /**
   *
   * @returns {ArrowOptions}
   */
  getFormattingValues() {
    const toArrow =
      this.options.arrows.to === true ||
      this.options.arrows.to.enabled === true;
    const fromArrow =
      this.options.arrows.from === true ||
      this.options.arrows.from.enabled === true;
    const middleArrow =
      this.options.arrows.middle === true ||
      this.options.arrows.middle.enabled === true;
    const inheritsColor = this.options.color.inherit;
    const values = {
      toArrow: toArrow,
      toArrowScale: this.options.arrows.to.scaleFactor,
      toArrowType: this.options.arrows.to.type,
      toArrowSrc: this.options.arrows.to.src,
      toArrowImageWidth: this.options.arrows.to.imageWidth,
      toArrowImageHeight: this.options.arrows.to.imageHeight,
      middleArrow: middleArrow,
      middleArrowScale: this.options.arrows.middle.scaleFactor,
      middleArrowType: this.options.arrows.middle.type,
      middleArrowSrc: this.options.arrows.middle.src,
      middleArrowImageWidth: this.options.arrows.middle.imageWidth,
      middleArrowImageHeight: this.options.arrows.middle.imageHeight,
      fromArrow: fromArrow,
      fromArrowScale: this.options.arrows.from.scaleFactor,
      fromArrowType: this.options.arrows.from.type,
      fromArrowSrc: this.options.arrows.from.src,
      fromArrowImageWidth: this.options.arrows.from.imageWidth,
      fromArrowImageHeight: this.options.arrows.from.imageHeight,
      arrowStrikethrough: this.options.arrowStrikethrough,
      color: inheritsColor ? undefined : this.options.color.color,
      inheritsColor: inheritsColor,
      opacity: this.options.color.opacity,
      hidden: this.options.hidden,
      length: this.options.length,
      shadow: this.options.shadow.enabled,
      shadowColor: this.options.shadow.color,
      shadowSize: this.options.shadow.size,
      shadowX: this.options.shadow.x,
      shadowY: this.options.shadow.y,
      dashes: this.options.dashes,
      width: this.options.width,
      background: this.options.background.enabled,
      backgroundColor: this.options.background.color,
      backgroundSize: this.options.background.size,
      backgroundDashes: this.options.background.dashes,
    };
    if (this.selected || this.hover) {
      if (this.chooser === true) {
        if (this.selected) {
          const selectedWidth = this.options.selectionWidth;
          if (typeof selectedWidth === "function") {
            values.width = selectedWidth(values.width);
          } else if (typeof selectedWidth === "number") {
            values.width += selectedWidth;
          }
          values.width = Math.max(values.width, 0.3 / this.body.view.scale);
          values.color = this.options.color.highlight;
          values.shadow = this.options.shadow.enabled;
        } else if (this.hover) {
          const hoverWidth = this.options.hoverWidth;
          if (typeof hoverWidth === "function") {
            values.width = hoverWidth(values.width);
          } else if (typeof hoverWidth === "number") {
            values.width += hoverWidth;
          }
          values.width = Math.max(values.width, 0.3 / this.body.view.scale);
          values.color = this.options.color.hover;
          values.shadow = this.options.shadow.enabled;
        }
      } else if (typeof this.chooser === "function") {
        this.chooser(values, this.options.id, this.selected, this.hover);
        if (values.color !== undefined) {
          values.inheritsColor = false;
        }
        if (values.shadow === false) {
          if (
            values.shadowColor !== this.options.shadow.color ||
            values.shadowSize !== this.options.shadow.size ||
            values.shadowX !== this.options.shadow.x ||
            values.shadowY !== this.options.shadow.y
          ) {
            values.shadow = true;
          }
        }
      }
    } else {
      values.shadow = this.options.shadow.enabled;
      values.width = Math.max(values.width, 0.3 / this.body.view.scale);
    }
    return values;
  }

  /**
   * update the options in the label module
   *
   * @param {object} options
   */
  updateLabelModule(options) {
    const pile = [
      options,
      this.options,
      this.globalOptions, // Currently set global edge options
      this.defaultOptions,
    ];

    this.labelModule.update(this.options, pile);

    if (this.labelModule.baseSize !== undefined) {
      this.baseFontSize = this.labelModule.baseSize;
    }
  }

  /**
   * update the edge type, set the options
   *
   * @returns {boolean}
   */
  updateEdgeType() {
    const smooth = this.options.smooth;
    let dataChanged = false;
    let changeInType = true;
    if (this.edgeType !== undefined) {
      if (
        (this.edgeType instanceof BezierEdgeDynamic &&
          smooth.enabled === true &&
          smooth.type === "dynamic") ||
        (this.edgeType instanceof CubicBezierEdge &&
          smooth.enabled === true &&
          smooth.type === "cubicBezier") ||
        (this.edgeType instanceof BezierEdgeStatic &&
          smooth.enabled === true &&
          smooth.type !== "dynamic" &&
          smooth.type !== "cubicBezier") ||
        (this.edgeType instanceof StraightEdge && smooth.type.enabled === false)
      ) {
        changeInType = false;
      }
      if (changeInType === true) {
        dataChanged = this.cleanup();
      }
    }
    if (changeInType === true) {
      if (smooth.enabled === true) {
        if (smooth.type === "dynamic") {
          dataChanged = true;
          this.edgeType = new BezierEdgeDynamic(
            this.options,
            this.body,
            this.labelModule
          );
        } else if (smooth.type === "cubicBezier") {
          this.edgeType = new CubicBezierEdge(
            this.options,
            this.body,
            this.labelModule
          );
        } else {
          this.edgeType = new BezierEdgeStatic(
            this.options,
            this.body,
            this.labelModule
          );
        }
      } else {
        this.edgeType = new StraightEdge(
          this.options,
          this.body,
          this.labelModule
        );
      }
    } else {
      // if nothing changes, we just set the options.
      this.edgeType.setOptions(this.options);
    }
    return dataChanged;
  }

  /**
   * Connect an edge to its nodes
   */
  connect() {
    this.disconnect();

    this.from = this.body.nodes[this.fromId] || undefined;
    this.to = this.body.nodes[this.toId] || undefined;
    this.connected = this.from !== undefined && this.to !== undefined;

    if (this.connected === true) {
      this.from.attachEdge(this);
      this.to.attachEdge(this);
    } else {
      if (this.from) {
        this.from.detachEdge(this);
      }
      if (this.to) {
        this.to.detachEdge(this);
      }
    }

    this.edgeType.connect();
  }

  /**
   * Disconnect an edge from its nodes
   */
  disconnect() {
    if (this.from) {
      this.from.detachEdge(this);
      this.from = undefined;
    }
    if (this.to) {
      this.to.detachEdge(this);
      this.to = undefined;
    }

    this.connected = false;
  }

  /**
   * get the title of this edge.
   *
   * @returns {string} title    The title of the edge, or undefined when no title
   *                           has been set.
   */
  getTitle() {
    return this.title;
  }

  /**
   * check if this node is selecte
   *
   * @returns {boolean} selected   True if node is selected, else false
   */
  isSelected() {
    return this.selected;
  }

  /**
   * Retrieve the value of the edge. Can be undefined
   *
   * @returns {number} value
   */
  getValue() {
    return this.options.value;
  }

  /**
   * Adjust the value range of the edge. The edge will adjust it's width
   * based on its value.
   *
   * @param {number} min
   * @param {number} max
   * @param {number} total
   */
  setValueRange(min, max, total) {
    if (this.options.value !== undefined) {
      const scale = this.options.scaling.customScalingFunction(
        min,
        max,
        total,
        this.options.value
      );
      const widthDiff = this.options.scaling.max - this.options.scaling.min;
      if (this.options.scaling.label.enabled === true) {
        const fontDiff =
          this.options.scaling.label.max - this.options.scaling.label.min;
        this.options.font.size =
          this.options.scaling.label.min + scale * fontDiff;
      }
      this.options.width = this.options.scaling.min + scale * widthDiff;
    } else {
      this.options.width = this.baseWidth;
      this.options.font.size = this.baseFontSize;
    }

    this._setInteractionWidths();
    this.updateLabelModule();
  }

  /**
   *
   * @private
   */
  _setInteractionWidths() {
    if (typeof this.options.hoverWidth === "function") {
      this.edgeType.hoverWidth = this.options.hoverWidth(this.options.width);
    } else {
      this.edgeType.hoverWidth = this.options.hoverWidth + this.options.width;
    }
    if (typeof this.options.selectionWidth === "function") {
      this.edgeType.selectionWidth = this.options.selectionWidth(
        this.options.width
      );
    } else {
      this.edgeType.selectionWidth =
        this.options.selectionWidth + this.options.width;
    }
  }

  /**
   * Redraw a edge
   * Draw this edge in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   *
   * @param {CanvasRenderingContext2D}   ctx
   */
  draw(ctx) {
    const values = this.getFormattingValues();
    if (values.hidden) {
      return;
    }

    // get the via node from the edge type
    const viaNode = this.edgeType.getViaNode();

    // draw line and label
    this.edgeType.drawLine(ctx, values, this.selected, this.hover, viaNode);
    this.drawLabel(ctx, viaNode);
  }

  /**
   * Redraw arrows
   * Draw this arrows in the given canvas
   * The 2d context of a HTML canvas can be retrieved by canvas.getContext("2d");
   *
   * @param {CanvasRenderingContext2D}   ctx
   */
  drawArrows(ctx) {
    const values = this.getFormattingValues();
    if (values.hidden) {
      return;
    }

    // get the via node from the edge type
    const viaNode = this.edgeType.getViaNode();
    const arrowData = {};

    // restore edge targets to defaults
    this.edgeType.fromPoint = this.edgeType.from;
    this.edgeType.toPoint = this.edgeType.to;

    // from and to arrows give a different end point for edges. we set them here
    if (values.fromArrow) {
      arrowData.from = this.edgeType.getArrowData(
        ctx,
        "from",
        viaNode,
        this.selected,
        this.hover,
        values
      );
      if (values.arrowStrikethrough === false)
        this.edgeType.fromPoint = arrowData.from.core;
      if (values.fromArrowSrc) {
        arrowData.from.image = this.imagelist.load(values.fromArrowSrc);
      }
      if (values.fromArrowImageWidth) {
        arrowData.from.imageWidth = values.fromArrowImageWidth;
      }
      if (values.fromArrowImageHeight) {
        arrowData.from.imageHeight = values.fromArrowImageHeight;
      }
    }
    if (values.toArrow) {
      arrowData.to = this.edgeType.getArrowData(
        ctx,
        "to",
        viaNode,
        this.selected,
        this.hover,
        values
      );
      if (values.arrowStrikethrough === false)
        this.edgeType.toPoint = arrowData.to.core;
      if (values.toArrowSrc) {
        arrowData.to.image = this.imagelist.load(values.toArrowSrc);
      }
      if (values.toArrowImageWidth) {
        arrowData.to.imageWidth = values.toArrowImageWidth;
      }
      if (values.toArrowImageHeight) {
        arrowData.to.imageHeight = values.toArrowImageHeight;
      }
    }

    // the middle arrow depends on the line, which can depend on the to and from arrows so we do this one lastly.
    if (values.middleArrow) {
      arrowData.middle = this.edgeType.getArrowData(
        ctx,
        "middle",
        viaNode,
        this.selected,
        this.hover,
        values
      );

      if (values.middleArrowSrc) {
        arrowData.middle.image = this.imagelist.load(values.middleArrowSrc);
      }
      if (values.middleArrowImageWidth) {
        arrowData.middle.imageWidth = values.middleArrowImageWidth;
      }
      if (values.middleArrowImageHeight) {
        arrowData.middle.imageHeight = values.middleArrowImageHeight;
      }
    }

    if (values.fromArrow) {
      this.edgeType.drawArrowHead(
        ctx,
        values,
        this.selected,
        this.hover,
        arrowData.from
      );
    }
    if (values.middleArrow) {
      this.edgeType.drawArrowHead(
        ctx,
        values,
        this.selected,
        this.hover,
        arrowData.middle
      );
    }
    if (values.toArrow) {
      this.edgeType.drawArrowHead(
        ctx,
        values,
        this.selected,
        this.hover,
        arrowData.to
      );
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {Node} viaNode
   */
  drawLabel(ctx, viaNode) {
    if (this.options.label !== undefined) {
      // set style
      const node1 = this.from;
      const node2 = this.to;

      if (this.labelModule.differentState(this.selected, this.hover)) {
        this.labelModule.getTextSize(ctx, this.selected, this.hover);
      }

      let point;
      if (node1.id != node2.id) {
        this.labelModule.pointToSelf = false;
        point = this.edgeType.getPoint(0.5, viaNode);
        ctx.save();

        const rotationPoint = this._getRotation(ctx);
        if (rotationPoint.angle != 0) {
          ctx.translate(rotationPoint.x, rotationPoint.y);
          ctx.rotate(rotationPoint.angle);
        }

        // draw the label
        this.labelModule.draw(ctx, point.x, point.y, this.selected, this.hover);

        /*
        // Useful debug code: draw a border around the label
        // This should **not** be enabled in production!
        var size = this.labelModule.getSize();; // ;; intentional so lint catches it
        ctx.strokeStyle = "#ff0000";
        ctx.strokeRect(size.left, size.top, size.width, size.height);
        // End  debug code
*/

        ctx.restore();
      } else {
        // Ignore the orientations.
        this.labelModule.pointToSelf = true;

        // get circle coordinates
        const coordinates = getSelfRefCoordinates(
          ctx,
          this.options.selfReference.angle,
          this.options.selfReference.size,
          node1
        );

        point = this._pointOnCircle(
          coordinates.x,
          coordinates.y,
          this.options.selfReference.size,
          this.options.selfReference.angle
        );

        this.labelModule.draw(ctx, point.x, point.y, this.selected, this.hover);
      }
    }
  }

  /**
   * Determine all visual elements of this edge instance, in which the given
   * point falls within the bounding shape.
   *
   * @param {point} point
   * @returns {Array.<edgeClickItem|edgeLabelClickItem>} list with the items which are on the point
   */
  getItemsOnPoint(point) {
    const ret = [];

    if (this.labelModule.visible()) {
      const rotationPoint = this._getRotation();
      if (pointInRect(this.labelModule.getSize(), point, rotationPoint)) {
        ret.push({ edgeId: this.id, labelId: 0 });
      }
    }

    const obj = {
      left: point.x,
      top: point.y,
    };

    if (this.isOverlappingWith(obj)) {
      ret.push({ edgeId: this.id });
    }

    return ret;
  }

  /**
   * Check if this object is overlapping with the provided object
   *
   * @param {object} obj   an object with parameters left, top
   * @returns {boolean}     True if location is located on the edge
   */
  isOverlappingWith(obj) {
    if (this.connected) {
      const distMax = 10;
      const xFrom = this.from.x;
      const yFrom = this.from.y;
      const xTo = this.to.x;
      const yTo = this.to.y;
      const xObj = obj.left;
      const yObj = obj.top;

      const dist = this.edgeType.getDistanceToEdge(
        xFrom,
        yFrom,
        xTo,
        yTo,
        xObj,
        yObj
      );

      return dist < distMax;
    } else {
      return false;
    }
  }

  /**
   * Determine the rotation point, if any.
   *
   * @param {CanvasRenderingContext2D} [ctx] if passed, do a recalculation of the label size
   * @returns {rotationPoint} the point to rotate around and the angle in radians to rotate
   * @private
   */
  _getRotation(ctx) {
    const viaNode = this.edgeType.getViaNode();
    const point = this.edgeType.getPoint(0.5, viaNode);

    if (ctx !== undefined) {
      this.labelModule.calculateLabelSize(
        ctx,
        this.selected,
        this.hover,
        point.x,
        point.y
      );
    }

    const ret = {
      x: point.x,
      y: this.labelModule.size.yLine,
      angle: 0,
    };

    if (!this.labelModule.visible()) {
      return ret; // Don't even bother doing the atan2, there's nothing to draw
    }

    if (this.options.font.align === "horizontal") {
      return ret; // No need to calculate angle
    }

    const dy = this.from.y - this.to.y;
    const dx = this.from.x - this.to.x;
    let angle = Math.atan2(dy, dx); // radians

    // rotate so that label is readable
    if ((angle < -1 && dx < 0) || (angle > 0 && dx < 0)) {
      angle += Math.PI;
    }
    ret.angle = angle;

    return ret;
  }

  /**
   * Get a point on a circle
   *
   * @param {number} x
   * @param {number} y
   * @param {number} radius
   * @param {number} angle
   * @returns {object} point
   * @private
   */
  _pointOnCircle(x, y, radius, angle) {
    return {
      x: x + radius * Math.cos(angle),
      y: y - radius * Math.sin(angle),
    };
  }

  /**
   * Sets selected state to true
   */
  select() {
    this.selected = true;
  }

  /**
   * Sets selected state to false
   */
  unselect() {
    this.selected = false;
  }

  /**
   * cleans all required things on delete
   *
   * @returns {*}
   */
  cleanup() {
    return this.edgeType.cleanup();
  }

  /**
   * Remove edge from the list and perform necessary cleanup.
   */
  remove() {
    this.cleanup();
    this.disconnect();
    delete this.body.edges[this.id];
  }

  /**
   * Check if both connecting nodes exist
   *
   * @returns {boolean}
   */
  endPointsValid() {
    return (
      this.body.nodes[this.fromId] !== undefined &&
      this.body.nodes[this.toId] !== undefined
    );
  }
}

/**
 * Handler for Edges
 */
class EdgesHandler {
  /**
   * @param {object} body
   * @param {Array.<Image>} images
   * @param {Array.<Group>} groups
   */
  constructor(body, images, groups) {
    this.body = body;
    this.images = images;
    this.groups = groups;

    // create the edge API in the body container
    this.body.functions.createEdge = this.create.bind(this);

    this.edgesListeners = {
      add: (event, params) => {
        this.add(params.items);
      },
      update: (event, params) => {
        this.update(params.items);
      },
      remove: (event, params) => {
        this.remove(params.items);
      },
    };

    this.options = {};
    this.defaultOptions = {
      arrows: {
        to: { enabled: false, scaleFactor: 1, type: "arrow" }, // boolean / {arrowScaleFactor:1} / {enabled: false, arrowScaleFactor:1}
        middle: { enabled: false, scaleFactor: 1, type: "arrow" },
        from: { enabled: false, scaleFactor: 1, type: "arrow" },
      },
      endPointOffset: {
        from: 0,
        to: 0,
      },
      arrowStrikethrough: true,
      color: {
        color: "#848484",
        highlight: "#848484",
        hover: "#848484",
        inherit: "from",
        opacity: 1.0,
      },
      dashes: false,
      font: {
        color: "#343434",
        size: 14, // px
        face: "arial",
        background: "none",
        strokeWidth: 2, // px
        strokeColor: "#ffffff",
        align: "horizontal",
        multi: false,
        vadjust: 0,
        bold: {
          mod: "bold",
        },
        boldital: {
          mod: "bold italic",
        },
        ital: {
          mod: "italic",
        },
        mono: {
          mod: "",
          size: 15, // px
          face: "courier new",
          vadjust: 2,
        },
      },
      hidden: false,
      hoverWidth: 1.5,
      label: undefined,
      labelHighlightBold: true,
      length: undefined,
      physics: true,
      scaling: {
        min: 1,
        max: 15,
        label: {
          enabled: true,
          min: 14,
          max: 30,
          maxVisible: 30,
          drawThreshold: 5,
        },
        customScalingFunction: function (min, max, total, value) {
          if (max === min) {
            return 0.5;
          } else {
            const scale = 1 / (max - min);
            return Math.max(0, (value - min) * scale);
          }
        },
      },
      selectionWidth: 1.5,
      selfReference: {
        size: 20,
        angle: Math.PI / 4,
        renderBehindTheNode: true,
      },
      shadow: {
        enabled: false,
        color: "rgba(0,0,0,0.5)",
        size: 10,
        x: 5,
        y: 5,
      },
      background: {
        enabled: false,
        color: "rgba(111,111,111,1)",
        size: 10,
        dashes: false,
      },
      smooth: {
        enabled: true,
        type: "dynamic",
        forceDirection: "none",
        roundness: 0.5,
      },
      title: undefined,
      width: 1,
      value: undefined,
    };

    deepExtend(this.options, this.defaultOptions);

    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    // this allows external modules to force all dynamic curves to turn static.
    this.body.emitter.on("_forceDisableDynamicCurves", (type, emit = true) => {
      if (type === "dynamic") {
        type = "continuous";
      }
      let dataChanged = false;
      for (const edgeId in this.body.edges) {
        if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
          const edge = this.body.edges[edgeId];
          const edgeData = this.body.data.edges.get(edgeId);

          // only forcibly remove the smooth curve if the data has been set of the edge has the smooth curves defined.
          // this is because a change in the global would not affect these curves.
          if (edgeData != null) {
            const smoothOptions = edgeData.smooth;
            if (smoothOptions !== undefined) {
              if (
                smoothOptions.enabled === true &&
                smoothOptions.type === "dynamic"
              ) {
                if (type === undefined) {
                  edge.setOptions({ smooth: false });
                } else {
                  edge.setOptions({ smooth: { type: type } });
                }
                dataChanged = true;
              }
            }
          }
        }
      }
      if (emit === true && dataChanged === true) {
        this.body.emitter.emit("_dataChanged");
      }
    });

    // this is called when options of EXISTING nodes or edges have changed.
    //
    // NOTE: Not true, called when options have NOT changed, for both existing as well as new nodes.
    //       See update() for logic.
    // TODO: Verify and examine the consequences of this. It might still trigger when
    //       non-option fields have changed, but then reconnecting edges is still useless.
    //       Alternatively, it might also be called when edges are removed.
    //
    this.body.emitter.on("_dataUpdated", () => {
      this.reconnectEdges();
    });

    // refresh the edges. Used when reverting from hierarchical layout
    this.body.emitter.on("refreshEdges", this.refresh.bind(this));
    this.body.emitter.on("refresh", this.refresh.bind(this));
    this.body.emitter.on("destroy", () => {
      forEach(this.edgesListeners, (callback, event) => {
        if (this.body.data.edges) this.body.data.edges.off(event, callback);
      });
      delete this.body.functions.createEdge;
      delete this.edgesListeners.add;
      delete this.edgesListeners.update;
      delete this.edgesListeners.remove;
      delete this.edgesListeners;
    });
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      // use the parser from the Edge class to fill in all shorthand notations
      Edge.parseOptions(this.options, options, true, this.defaultOptions, true);

      // update smooth settings in all edges
      let dataChanged = false;
      if (options.smooth !== undefined) {
        for (const edgeId in this.body.edges) {
          if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
            dataChanged =
              this.body.edges[edgeId].updateEdgeType() || dataChanged;
          }
        }
      }

      // update fonts in all edges
      if (options.font !== undefined) {
        for (const edgeId in this.body.edges) {
          if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
            this.body.edges[edgeId].updateLabelModule();
          }
        }
      }

      // update the state of the variables if needed
      if (
        options.hidden !== undefined ||
        options.physics !== undefined ||
        dataChanged === true
      ) {
        this.body.emitter.emit("_dataChanged");
      }
    }
  }

  /**
   * Load edges by reading the data table
   *
   * @param {Array | DataSet | DataView} edges    The data containing the edges.
   * @param {boolean} [doNotEmit=false] - Suppress data changed event.
   * @private
   */
  setData(edges, doNotEmit = false) {
    const oldEdgesData = this.body.data.edges;

    if (isDataViewLike("id", edges)) {
      this.body.data.edges = edges;
    } else if (Array.isArray(edges)) {
      this.body.data.edges = new DataSet();
      this.body.data.edges.add(edges);
    } else if (!edges) {
      this.body.data.edges = new DataSet();
    } else {
      throw new TypeError("Array or DataSet expected");
    }

    // TODO: is this null or undefined or false?
    if (oldEdgesData) {
      // unsubscribe from old dataset
      forEach(this.edgesListeners, (callback, event) => {
        oldEdgesData.off(event, callback);
      });
    }

    // remove drawn edges
    this.body.edges = {};

    // TODO: is this null or undefined or false?
    if (this.body.data.edges) {
      // subscribe to new dataset
      forEach(this.edgesListeners, (callback, event) => {
        this.body.data.edges.on(event, callback);
      });

      // draw all new nodes
      const ids = this.body.data.edges.getIds();
      this.add(ids, true);
    }

    this.body.emitter.emit("_adjustEdgesForHierarchicalLayout");
    if (doNotEmit === false) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   * Add edges
   *
   * @param {number[] | string[]} ids
   * @param {boolean} [doNotEmit=false]
   * @private
   */
  add(ids, doNotEmit = false) {
    const edges = this.body.edges;
    const edgesData = this.body.data.edges;

    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];

      const oldEdge = edges[id];
      if (oldEdge) {
        oldEdge.disconnect();
      }

      const data = edgesData.get(id, { showInternalIds: true });
      edges[id] = this.create(data);
    }

    this.body.emitter.emit("_adjustEdgesForHierarchicalLayout");

    if (doNotEmit === false) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   * Update existing edges, or create them when not yet existing
   *
   * @param {number[] | string[]} ids
   * @private
   */
  update(ids) {
    const edges = this.body.edges;
    const edgesData = this.body.data.edges;
    let dataChanged = false;
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const data = edgesData.get(id);
      const edge = edges[id];
      if (edge !== undefined) {
        // update edge
        edge.disconnect();
        dataChanged = edge.setOptions(data) || dataChanged; // if a support node is added, data can be changed.
        edge.connect();
      } else {
        // create edge
        this.body.edges[id] = this.create(data);
        dataChanged = true;
      }
    }

    if (dataChanged === true) {
      this.body.emitter.emit("_adjustEdgesForHierarchicalLayout");
      this.body.emitter.emit("_dataChanged");
    } else {
      this.body.emitter.emit("_dataUpdated");
    }
  }

  /**
   * Remove existing edges. Non existing ids will be ignored
   *
   * @param {number[] | string[]} ids
   * @param {boolean} [emit=true]
   * @private
   */
  remove(ids, emit = true) {
    if (ids.length === 0) return; // early out

    const edges = this.body.edges;
    forEach(ids, (id) => {
      const edge = edges[id];
      if (edge !== undefined) {
        edge.remove();
      }
    });

    if (emit) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   * Refreshes Edge Handler
   */
  refresh() {
    forEach(this.body.edges, (edge, edgeId) => {
      const data = this.body.data.edges.get(edgeId);
      if (data !== undefined) {
        edge.setOptions(data);
      }
    });
  }

  /**
   *
   * @param {object} properties
   * @returns {Edge}
   */
  create(properties) {
    return new Edge(
      properties,
      this.body,
      this.images,
      this.options,
      this.defaultOptions
    );
  }

  /**
   * Reconnect all edges
   *
   * @private
   */
  reconnectEdges() {
    let id;
    const nodes = this.body.nodes;
    const edges = this.body.edges;

    for (id in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, id)) {
        nodes[id].edges = [];
      }
    }

    for (id in edges) {
      if (Object.prototype.hasOwnProperty.call(edges, id)) {
        const edge = edges[id];
        edge.from = null;
        edge.to = null;
        edge.connect();
      }
    }
  }

  /**
   *
   * @param {Edge.id} edgeId
   * @returns {Array}
   */
  getConnectedNodes(edgeId) {
    const nodeList = [];
    if (this.body.edges[edgeId] !== undefined) {
      const edge = this.body.edges[edgeId];
      if (edge.fromId !== undefined) {
        nodeList.push(edge.fromId);
      }
      if (edge.toId !== undefined) {
        nodeList.push(edge.toId);
      }
    }
    return nodeList;
  }

  /**
   * There is no direct relation between the nodes and the edges DataSet,
   * so the right place to do call this is in the handler for event `_dataUpdated`.
   */
  _updateState() {
    this._addMissingEdges();
    this._removeInvalidEdges();
  }

  /**
   * Scan for missing nodes and remove corresponding edges, if any.
   *
   * @private
   */
  _removeInvalidEdges() {
    const edgesToDelete = [];

    forEach(this.body.edges, (edge, id) => {
      const toNode = this.body.nodes[edge.toId];
      const fromNode = this.body.nodes[edge.fromId];

      // Skip clustering edges here, let the Clustering module handle those
      if (
        (toNode !== undefined && toNode.isCluster === true) ||
        (fromNode !== undefined && fromNode.isCluster === true)
      ) {
        return;
      }

      if (toNode === undefined || fromNode === undefined) {
        edgesToDelete.push(id);
      }
    });

    this.remove(edgesToDelete, false);
  }

  /**
   * add all edges from dataset that are not in the cached state
   *
   * @private
   */
  _addMissingEdges() {
    const edgesData = this.body.data.edges;
    if (edgesData === undefined || edgesData === null) {
      return; // No edges DataSet yet; can happen on startup
    }

    const edges = this.body.edges;
    const addIds = [];

    edgesData.forEach((edgeData, edgeId) => {
      const edge = edges[edgeId];
      if (edge === undefined) {
        addIds.push(edgeId);
      }
    });

    this.add(addIds, true);
  }
}

/**
 * Barnes Hut Solver
 */
class BarnesHutSolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    this.body = body;
    this.physicsBody = physicsBody;
    this.barnesHutTree;
    this.setOptions(options);
    this._rng = Alea("BARNES HUT SOLVER");

    // debug: show grid
    // this.body.emitter.on("afterDrawing", (ctx) => {this._debug(ctx,'#ff0000')})
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
    this.thetaInversed = 1 / this.options.theta;

    // if 1 then min distance = 0.5, if 0.5 then min distance = 0.5 + 0.5*node.shape.radius
    this.overlapAvoidanceFactor =
      1 - Math.max(0, Math.min(1, this.options.avoidOverlap));
  }

  /**
   * This function calculates the forces the nodes apply on each other based on a gravitational model.
   * The Barnes Hut method is used to speed up this N-body simulation.
   *
   * @private
   */
  solve() {
    if (
      this.options.gravitationalConstant !== 0 &&
      this.physicsBody.physicsNodeIndices.length > 0
    ) {
      let node;
      const nodes = this.body.nodes;
      const nodeIndices = this.physicsBody.physicsNodeIndices;
      const nodeCount = nodeIndices.length;

      // create the tree
      const barnesHutTree = this._formBarnesHutTree(nodes, nodeIndices);

      // for debugging
      this.barnesHutTree = barnesHutTree;

      // place the nodes one by one recursively
      for (let i = 0; i < nodeCount; i++) {
        node = nodes[nodeIndices[i]];
        if (node.options.mass > 0) {
          // starting with root is irrelevant, it never passes the BarnesHutSolver condition
          this._getForceContributions(barnesHutTree.root, node);
        }
      }
    }
  }

  /**
   * @param {object} parentBranch
   * @param {Node} node
   * @private
   */
  _getForceContributions(parentBranch, node) {
    this._getForceContribution(parentBranch.children.NW, node);
    this._getForceContribution(parentBranch.children.NE, node);
    this._getForceContribution(parentBranch.children.SW, node);
    this._getForceContribution(parentBranch.children.SE, node);
  }

  /**
   * This function traverses the barnesHutTree. It checks when it can approximate distant nodes with their center of mass.
   * If a region contains a single node, we check if it is not itself, then we apply the force.
   *
   * @param {object} parentBranch
   * @param {Node} node
   * @private
   */
  _getForceContribution(parentBranch, node) {
    // we get no force contribution from an empty region
    if (parentBranch.childrenCount > 0) {
      // get the distance from the center of mass to the node.
      const dx = parentBranch.centerOfMass.x - node.x;
      const dy = parentBranch.centerOfMass.y - node.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // BarnesHutSolver condition
      // original condition : s/d < theta = passed  ===  d/s > 1/theta = passed
      // calcSize = 1/s --> d * 1/s > 1/theta = passed
      if (distance * parentBranch.calcSize > this.thetaInversed) {
        this._calculateForces(distance, dx, dy, node, parentBranch);
      } else {
        // Did not pass the condition, go into children if available
        if (parentBranch.childrenCount === 4) {
          this._getForceContributions(parentBranch, node);
        } else {
          // parentBranch must have only one node, if it was empty we wouldnt be here
          if (parentBranch.children.data.id != node.id) {
            // if it is not self
            this._calculateForces(distance, dx, dy, node, parentBranch);
          }
        }
      }
    }
  }

  /**
   * Calculate the forces based on the distance.
   *
   * @param {number} distance
   * @param {number} dx
   * @param {number} dy
   * @param {Node} node
   * @param {object} parentBranch
   * @private
   */
  _calculateForces(distance, dx, dy, node, parentBranch) {
    if (distance === 0) {
      distance = 0.1;
      dx = distance;
    }

    if (this.overlapAvoidanceFactor < 1 && node.shape.radius) {
      distance = Math.max(
        0.1 + this.overlapAvoidanceFactor * node.shape.radius,
        distance - node.shape.radius
      );
    }

    // the dividing by the distance cubed instead of squared allows us to get the fx and fy components without sines and cosines
    // it is shorthand for gravityforce with distance squared and fx = dx/distance * gravityForce
    const gravityForce =
      (this.options.gravitationalConstant *
        parentBranch.mass *
        node.options.mass) /
      Math.pow(distance, 3);
    const fx = dx * gravityForce;
    const fy = dy * gravityForce;

    this.physicsBody.forces[node.id].x += fx;
    this.physicsBody.forces[node.id].y += fy;
  }

  /**
   * This function constructs the barnesHut tree recursively. It creates the root, splits it and starts placing the nodes.
   *
   * @param {Array.<Node>} nodes
   * @param {Array.<number>} nodeIndices
   * @returns {{root: {centerOfMass: {x: number, y: number}, mass: number, range: {minX: number, maxX: number, minY: number, maxY: number}, size: number, calcSize: number, children: {data: null}, maxWidth: number, level: number, childrenCount: number}}} BarnesHutTree
   * @private
   */
  _formBarnesHutTree(nodes, nodeIndices) {
    let node;
    const nodeCount = nodeIndices.length;

    let minX = nodes[nodeIndices[0]].x;
    let minY = nodes[nodeIndices[0]].y;
    let maxX = nodes[nodeIndices[0]].x;
    let maxY = nodes[nodeIndices[0]].y;

    // get the range of the nodes
    for (let i = 1; i < nodeCount; i++) {
      const node = nodes[nodeIndices[i]];
      const x = node.x;
      const y = node.y;
      if (node.options.mass > 0) {
        if (x < minX) {
          minX = x;
        }
        if (x > maxX) {
          maxX = x;
        }
        if (y < minY) {
          minY = y;
        }
        if (y > maxY) {
          maxY = y;
        }
      }
    }
    // make the range a square
    const sizeDiff = Math.abs(maxX - minX) - Math.abs(maxY - minY); // difference between X and Y
    if (sizeDiff > 0) {
      minY -= 0.5 * sizeDiff;
      maxY += 0.5 * sizeDiff;
    } // xSize > ySize
    else {
      minX += 0.5 * sizeDiff;
      maxX -= 0.5 * sizeDiff;
    } // xSize < ySize

    const minimumTreeSize = 1e-5;
    const rootSize = Math.max(minimumTreeSize, Math.abs(maxX - minX));
    const halfRootSize = 0.5 * rootSize;
    const centerX = 0.5 * (minX + maxX),
      centerY = 0.5 * (minY + maxY);

    // construct the barnesHutTree
    const barnesHutTree = {
      root: {
        centerOfMass: { x: 0, y: 0 },
        mass: 0,
        range: {
          minX: centerX - halfRootSize,
          maxX: centerX + halfRootSize,
          minY: centerY - halfRootSize,
          maxY: centerY + halfRootSize,
        },
        size: rootSize,
        calcSize: 1 / rootSize,
        children: { data: null },
        maxWidth: 0,
        level: 0,
        childrenCount: 4,
      },
    };
    this._splitBranch(barnesHutTree.root);

    // place the nodes one by one recursively
    for (let i = 0; i < nodeCount; i++) {
      node = nodes[nodeIndices[i]];
      if (node.options.mass > 0) {
        this._placeInTree(barnesHutTree.root, node);
      }
    }

    // make global
    return barnesHutTree;
  }

  /**
   * this updates the mass of a branch. this is increased by adding a node.
   *
   * @param {object} parentBranch
   * @param {Node} node
   * @private
   */
  _updateBranchMass(parentBranch, node) {
    const centerOfMass = parentBranch.centerOfMass;
    const totalMass = parentBranch.mass + node.options.mass;
    const totalMassInv = 1 / totalMass;

    centerOfMass.x =
      centerOfMass.x * parentBranch.mass + node.x * node.options.mass;
    centerOfMass.x *= totalMassInv;

    centerOfMass.y =
      centerOfMass.y * parentBranch.mass + node.y * node.options.mass;
    centerOfMass.y *= totalMassInv;

    parentBranch.mass = totalMass;
    const biggestSize = Math.max(
      Math.max(node.height, node.radius),
      node.width
    );
    parentBranch.maxWidth =
      parentBranch.maxWidth < biggestSize ? biggestSize : parentBranch.maxWidth;
  }

  /**
   * determine in which branch the node will be placed.
   *
   * @param {object} parentBranch
   * @param {Node} node
   * @param {boolean} skipMassUpdate
   * @private
   */
  _placeInTree(parentBranch, node, skipMassUpdate) {
    if (skipMassUpdate != true || skipMassUpdate === undefined) {
      // update the mass of the branch.
      this._updateBranchMass(parentBranch, node);
    }

    const range = parentBranch.children.NW.range;
    let region;
    if (range.maxX > node.x) {
      // in NW or SW
      if (range.maxY > node.y) {
        region = "NW";
      } else {
        region = "SW";
      }
    } else {
      // in NE or SE
      if (range.maxY > node.y) {
        region = "NE";
      } else {
        region = "SE";
      }
    }

    this._placeInRegion(parentBranch, node, region);
  }

  /**
   * actually place the node in a region (or branch)
   *
   * @param {object} parentBranch
   * @param {Node} node
   * @param {'NW'| 'NE' | 'SW' | 'SE'} region
   * @private
   */
  _placeInRegion(parentBranch, node, region) {
    const children = parentBranch.children[region];

    switch (children.childrenCount) {
      case 0: // place node here
        children.children.data = node;
        children.childrenCount = 1;
        this._updateBranchMass(children, node);
        break;
      case 1: // convert into children
        // if there are two nodes exactly overlapping (on init, on opening of cluster etc.)
        // we move one node a little bit and we do not put it in the tree.
        if (
          children.children.data.x === node.x &&
          children.children.data.y === node.y
        ) {
          node.x += this._rng();
          node.y += this._rng();
        } else {
          this._splitBranch(children);
          this._placeInTree(children, node);
        }
        break;
      case 4: // place in branch
        this._placeInTree(children, node);
        break;
    }
  }

  /**
   * this function splits a branch into 4 sub branches. If the branch contained a node, we place it in the subbranch
   * after the split is complete.
   *
   * @param {object} parentBranch
   * @private
   */
  _splitBranch(parentBranch) {
    // if the branch is shaded with a node, replace the node in the new subset.
    let containedNode = null;
    if (parentBranch.childrenCount === 1) {
      containedNode = parentBranch.children.data;
      parentBranch.mass = 0;
      parentBranch.centerOfMass.x = 0;
      parentBranch.centerOfMass.y = 0;
    }
    parentBranch.childrenCount = 4;
    parentBranch.children.data = null;
    this._insertRegion(parentBranch, "NW");
    this._insertRegion(parentBranch, "NE");
    this._insertRegion(parentBranch, "SW");
    this._insertRegion(parentBranch, "SE");

    if (containedNode != null) {
      this._placeInTree(parentBranch, containedNode);
    }
  }

  /**
   * This function subdivides the region into four new segments.
   * Specifically, this inserts a single new segment.
   * It fills the children section of the parentBranch
   *
   * @param {object} parentBranch
   * @param {'NW'| 'NE' | 'SW' | 'SE'} region
   * @private
   */
  _insertRegion(parentBranch, region) {
    let minX, maxX, minY, maxY;
    const childSize = 0.5 * parentBranch.size;
    switch (region) {
      case "NW":
        minX = parentBranch.range.minX;
        maxX = parentBranch.range.minX + childSize;
        minY = parentBranch.range.minY;
        maxY = parentBranch.range.minY + childSize;
        break;
      case "NE":
        minX = parentBranch.range.minX + childSize;
        maxX = parentBranch.range.maxX;
        minY = parentBranch.range.minY;
        maxY = parentBranch.range.minY + childSize;
        break;
      case "SW":
        minX = parentBranch.range.minX;
        maxX = parentBranch.range.minX + childSize;
        minY = parentBranch.range.minY + childSize;
        maxY = parentBranch.range.maxY;
        break;
      case "SE":
        minX = parentBranch.range.minX + childSize;
        maxX = parentBranch.range.maxX;
        minY = parentBranch.range.minY + childSize;
        maxY = parentBranch.range.maxY;
        break;
    }

    parentBranch.children[region] = {
      centerOfMass: { x: 0, y: 0 },
      mass: 0,
      range: { minX: minX, maxX: maxX, minY: minY, maxY: maxY },
      size: 0.5 * parentBranch.size,
      calcSize: 2 * parentBranch.calcSize,
      children: { data: null },
      maxWidth: 0,
      level: parentBranch.level + 1,
      childrenCount: 0,
    };
  }

  //---------------------------  DEBUGGING BELOW  ---------------------------//

  /**
   * This function is for debugging purposed, it draws the tree.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} color
   * @private
   */
  _debug(ctx, color) {
    if (this.barnesHutTree !== undefined) {
      ctx.lineWidth = 1;

      this._drawBranch(this.barnesHutTree.root, ctx, color);
    }
  }

  /**
   * This function is for debugging purposes. It draws the branches recursively.
   *
   * @param {object} branch
   * @param {CanvasRenderingContext2D} ctx
   * @param {string} color
   * @private
   */
  _drawBranch(branch, ctx, color) {
    if (color === undefined) {
      color = "#FF0000";
    }

    if (branch.childrenCount === 4) {
      this._drawBranch(branch.children.NW, ctx);
      this._drawBranch(branch.children.NE, ctx);
      this._drawBranch(branch.children.SE, ctx);
      this._drawBranch(branch.children.SW, ctx);
    }
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(branch.range.minX, branch.range.minY);
    ctx.lineTo(branch.range.maxX, branch.range.minY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.maxX, branch.range.minY);
    ctx.lineTo(branch.range.maxX, branch.range.maxY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.maxX, branch.range.maxY);
    ctx.lineTo(branch.range.minX, branch.range.maxY);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(branch.range.minX, branch.range.maxY);
    ctx.lineTo(branch.range.minX, branch.range.minY);
    ctx.stroke();

    /*
     if (branch.mass > 0) {
     ctx.circle(branch.centerOfMass.x, branch.centerOfMass.y, 3*branch.mass);
     ctx.stroke();
     }
     */
  }
}

/**
 * Repulsion Solver
 */
class RepulsionSolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    this._rng = Alea("REPULSION SOLVER");

    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * Calculate the forces the nodes apply on each other based on a repulsion field.
   * This field is linearly approximated.
   *
   * @private
   */
  solve() {
    let dx, dy, distance, fx, fy, repulsingForce, node1, node2;

    const nodes = this.body.nodes;
    const nodeIndices = this.physicsBody.physicsNodeIndices;
    const forces = this.physicsBody.forces;

    // repulsing forces between nodes
    const nodeDistance = this.options.nodeDistance;

    // approximation constants
    const a = -2 / 3 / nodeDistance;
    const b = 4 / 3;

    // we loop from i over all but the last entree in the array
    // j loops from i+1 to the last. This way we do not double count any of the indices, nor i === j
    for (let i = 0; i < nodeIndices.length - 1; i++) {
      node1 = nodes[nodeIndices[i]];
      for (let j = i + 1; j < nodeIndices.length; j++) {
        node2 = nodes[nodeIndices[j]];

        dx = node2.x - node1.x;
        dy = node2.y - node1.y;
        distance = Math.sqrt(dx * dx + dy * dy);

        // same condition as BarnesHutSolver, making sure nodes are never 100% overlapping.
        if (distance === 0) {
          distance = 0.1 * this._rng();
          dx = distance;
        }

        if (distance < 2 * nodeDistance) {
          if (distance < 0.5 * nodeDistance) {
            repulsingForce = 1.0;
          } else {
            repulsingForce = a * distance + b; // linear approx of  1 / (1 + Math.exp((distance / nodeDistance - 1) * steepness))
          }
          repulsingForce = repulsingForce / distance;

          fx = dx * repulsingForce;
          fy = dy * repulsingForce;

          forces[node1.id].x -= fx;
          forces[node1.id].y -= fy;
          forces[node2.id].x += fx;
          forces[node2.id].y += fy;
        }
      }
    }
  }
}

/**
 * Hierarchical Repulsion Solver
 */
class HierarchicalRepulsionSolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
    this.overlapAvoidanceFactor = Math.max(
      0,
      Math.min(1, this.options.avoidOverlap || 0)
    );
  }

  /**
   * Calculate the forces the nodes apply on each other based on a repulsion field.
   * This field is linearly approximated.
   *
   * @private
   */
  solve() {
    const nodes = this.body.nodes;
    const nodeIndices = this.physicsBody.physicsNodeIndices;
    const forces = this.physicsBody.forces;

    // repulsing forces between nodes
    const nodeDistance = this.options.nodeDistance;

    // we loop from i over all but the last entree in the array
    // j loops from i+1 to the last. This way we do not double count any of the indices, nor i === j
    for (let i = 0; i < nodeIndices.length - 1; i++) {
      const node1 = nodes[nodeIndices[i]];
      for (let j = i + 1; j < nodeIndices.length; j++) {
        const node2 = nodes[nodeIndices[j]];

        // nodes only affect nodes on their level
        if (node1.level === node2.level) {
          const theseNodesDistance =
            nodeDistance +
            this.overlapAvoidanceFactor *
              ((node1.shape.radius || 0) / 2 + (node2.shape.radius || 0) / 2);

          const dx = node2.x - node1.x;
          const dy = node2.y - node1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const steepness = 0.05;
          let repulsingForce;
          if (distance < theseNodesDistance) {
            repulsingForce =
              -Math.pow(steepness * distance, 2) +
              Math.pow(steepness * theseNodesDistance, 2);
          } else {
            repulsingForce = 0;
          }
          // normalize force with
          if (distance !== 0) {
            repulsingForce = repulsingForce / distance;
          }
          const fx = dx * repulsingForce;
          const fy = dy * repulsingForce;

          forces[node1.id].x -= fx;
          forces[node1.id].y -= fy;
          forces[node2.id].x += fx;
          forces[node2.id].y += fy;
        }
      }
    }
  }
}

/**
 * Spring Solver
 */
class SpringSolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * This function calculates the springforces on the nodes, accounting for the support nodes.
   *
   * @private
   */
  solve() {
    let edgeLength, edge;
    const edgeIndices = this.physicsBody.physicsEdgeIndices;
    const edges = this.body.edges;
    let node1, node2, node3;

    // forces caused by the edges, modelled as springs
    for (let i = 0; i < edgeIndices.length; i++) {
      edge = edges[edgeIndices[i]];
      if (edge.connected === true && edge.toId !== edge.fromId) {
        // only calculate forces if nodes are in the same sector
        if (
          this.body.nodes[edge.toId] !== undefined &&
          this.body.nodes[edge.fromId] !== undefined
        ) {
          if (edge.edgeType.via !== undefined) {
            edgeLength =
              edge.options.length === undefined
                ? this.options.springLength
                : edge.options.length;
            node1 = edge.to;
            node2 = edge.edgeType.via;
            node3 = edge.from;

            this._calculateSpringForce(node1, node2, 0.5 * edgeLength);
            this._calculateSpringForce(node2, node3, 0.5 * edgeLength);
          } else {
            // the * 1.5 is here so the edge looks as large as a smooth edge. It does not initially because the smooth edges use
            // the support nodes which exert a repulsive force on the to and from nodes, making the edge appear larger.
            edgeLength =
              edge.options.length === undefined
                ? this.options.springLength * 1.5
                : edge.options.length;
            this._calculateSpringForce(edge.from, edge.to, edgeLength);
          }
        }
      }
    }
  }

  /**
   * This is the code actually performing the calculation for the function above.
   *
   * @param {Node} node1
   * @param {Node} node2
   * @param {number} edgeLength
   * @private
   */
  _calculateSpringForce(node1, node2, edgeLength) {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);

    // the 1/distance is so the fx and fy can be calculated without sine or cosine.
    const springForce =
      (this.options.springConstant * (edgeLength - distance)) / distance;

    const fx = dx * springForce;
    const fy = dy * springForce;

    // handle the case where one node is not part of the physcis
    if (this.physicsBody.forces[node1.id] !== undefined) {
      this.physicsBody.forces[node1.id].x += fx;
      this.physicsBody.forces[node1.id].y += fy;
    }

    if (this.physicsBody.forces[node2.id] !== undefined) {
      this.physicsBody.forces[node2.id].x -= fx;
      this.physicsBody.forces[node2.id].y -= fy;
    }
  }
}

/**
 * Hierarchical Spring Solver
 */
class HierarchicalSpringSolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * This function calculates the springforces on the nodes, accounting for the support nodes.
   *
   * @private
   */
  solve() {
    let edgeLength, edge;
    let dx, dy, fx, fy, springForce, distance;
    const edges = this.body.edges;
    const factor = 0.5;

    const edgeIndices = this.physicsBody.physicsEdgeIndices;
    const nodeIndices = this.physicsBody.physicsNodeIndices;
    const forces = this.physicsBody.forces;

    // initialize the spring force counters
    for (let i = 0; i < nodeIndices.length; i++) {
      const nodeId = nodeIndices[i];
      forces[nodeId].springFx = 0;
      forces[nodeId].springFy = 0;
    }

    // forces caused by the edges, modelled as springs
    for (let i = 0; i < edgeIndices.length; i++) {
      edge = edges[edgeIndices[i]];
      if (edge.connected === true) {
        edgeLength =
          edge.options.length === undefined
            ? this.options.springLength
            : edge.options.length;

        dx = edge.from.x - edge.to.x;
        dy = edge.from.y - edge.to.y;
        distance = Math.sqrt(dx * dx + dy * dy);
        distance = distance === 0 ? 0.01 : distance;

        // the 1/distance is so the fx and fy can be calculated without sine or cosine.
        springForce =
          (this.options.springConstant * (edgeLength - distance)) / distance;

        fx = dx * springForce;
        fy = dy * springForce;

        if (edge.to.level != edge.from.level) {
          if (forces[edge.toId] !== undefined) {
            forces[edge.toId].springFx -= fx;
            forces[edge.toId].springFy -= fy;
          }
          if (forces[edge.fromId] !== undefined) {
            forces[edge.fromId].springFx += fx;
            forces[edge.fromId].springFy += fy;
          }
        } else {
          if (forces[edge.toId] !== undefined) {
            forces[edge.toId].x -= factor * fx;
            forces[edge.toId].y -= factor * fy;
          }
          if (forces[edge.fromId] !== undefined) {
            forces[edge.fromId].x += factor * fx;
            forces[edge.fromId].y += factor * fy;
          }
        }
      }
    }

    // normalize spring forces
    springForce = 1;
    let springFx, springFy;
    for (let i = 0; i < nodeIndices.length; i++) {
      const nodeId = nodeIndices[i];
      springFx = Math.min(
        springForce,
        Math.max(-springForce, forces[nodeId].springFx)
      );
      springFy = Math.min(
        springForce,
        Math.max(-springForce, forces[nodeId].springFy)
      );

      forces[nodeId].x += springFx;
      forces[nodeId].y += springFy;
    }

    // retain energy balance
    let totalFx = 0;
    let totalFy = 0;
    for (let i = 0; i < nodeIndices.length; i++) {
      const nodeId = nodeIndices[i];
      totalFx += forces[nodeId].x;
      totalFy += forces[nodeId].y;
    }
    const correctionFx = totalFx / nodeIndices.length;
    const correctionFy = totalFy / nodeIndices.length;

    for (let i = 0; i < nodeIndices.length; i++) {
      const nodeId = nodeIndices[i];
      forces[nodeId].x -= correctionFx;
      forces[nodeId].y -= correctionFy;
    }
  }
}

/**
 * Central Gravity Solver
 */
class CentralGravitySolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    this.body = body;
    this.physicsBody = physicsBody;
    this.setOptions(options);
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    this.options = options;
  }

  /**
   * Calculates forces for each node
   */
  solve() {
    let dx, dy, distance, node;
    const nodes = this.body.nodes;
    const nodeIndices = this.physicsBody.physicsNodeIndices;
    const forces = this.physicsBody.forces;

    for (let i = 0; i < nodeIndices.length; i++) {
      const nodeId = nodeIndices[i];
      node = nodes[nodeId];
      dx = -node.x;
      dy = -node.y;
      distance = Math.sqrt(dx * dx + dy * dy);

      this._calculateForces(distance, dx, dy, forces, node);
    }
  }

  /**
   * Calculate the forces based on the distance.
   *
   * @param {number} distance
   * @param {number} dx
   * @param {number} dy
   * @param {Object<Node.id, vis.Node>} forces
   * @param {Node} node
   * @private
   */
  _calculateForces(distance, dx, dy, forces, node) {
    const gravityForce =
      distance === 0 ? 0 : this.options.centralGravity / distance;
    forces[node.id].x = dx * gravityForce;
    forces[node.id].y = dy * gravityForce;
  }
}

/**
 * @augments BarnesHutSolver
 */
class ForceAtlas2BasedRepulsionSolver extends BarnesHutSolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    super(body, physicsBody, options);

    this._rng = Alea("FORCE ATLAS 2 BASED REPULSION SOLVER");
  }

  /**
   * Calculate the forces based on the distance.
   *
   * @param {number} distance
   * @param {number} dx
   * @param {number} dy
   * @param {Node} node
   * @param {object} parentBranch
   * @private
   */
  _calculateForces(distance, dx, dy, node, parentBranch) {
    if (distance === 0) {
      distance = 0.1 * this._rng();
      dx = distance;
    }

    if (this.overlapAvoidanceFactor < 1 && node.shape.radius) {
      distance = Math.max(
        0.1 + this.overlapAvoidanceFactor * node.shape.radius,
        distance - node.shape.radius
      );
    }

    const degree = node.edges.length + 1;
    // the dividing by the distance cubed instead of squared allows us to get the fx and fy components without sines and cosines
    // it is shorthand for gravityforce with distance squared and fx = dx/distance * gravityForce
    const gravityForce =
      (this.options.gravitationalConstant *
        parentBranch.mass *
        node.options.mass *
        degree) /
      Math.pow(distance, 2);
    const fx = dx * gravityForce;
    const fy = dy * gravityForce;

    this.physicsBody.forces[node.id].x += fx;
    this.physicsBody.forces[node.id].y += fy;
  }
}

/**
 * @augments CentralGravitySolver
 */
class ForceAtlas2BasedCentralGravitySolver extends CentralGravitySolver {
  /**
   * @param {object} body
   * @param {{physicsNodeIndices: Array, physicsEdgeIndices: Array, forces: {}, velocities: {}}} physicsBody
   * @param {object} options
   */
  constructor(body, physicsBody, options) {
    super(body, physicsBody, options);
  }

  /**
   * Calculate the forces based on the distance.
   *
   * @param {number} distance
   * @param {number} dx
   * @param {number} dy
   * @param {Object<Node.id, Node>} forces
   * @param {Node} node
   * @private
   */
  _calculateForces(distance, dx, dy, forces, node) {
    if (distance > 0) {
      const degree = node.edges.length + 1;
      const gravityForce =
        this.options.centralGravity * degree * node.options.mass;
      forces[node.id].x = dx * gravityForce;
      forces[node.id].y = dy * gravityForce;
    }
  }
}

/**
 * The physics engine
 */
class PhysicsEngine {
  /**
   * @param {object} body
   */
  constructor(body) {
    this.body = body;
    this.physicsBody = {
      physicsNodeIndices: [],
      physicsEdgeIndices: [],
      forces: {},
      velocities: {},
    };

    this.physicsEnabled = true;
    this.simulationInterval = 1000 / 60;
    this.requiresTimeout = true;
    this.previousStates = {};
    this.referenceState = {};
    this.freezeCache = {};
    this.renderTimer = undefined;

    // parameters for the adaptive timestep
    this.adaptiveTimestep = false;
    this.adaptiveTimestepEnabled = false;
    this.adaptiveCounter = 0;
    this.adaptiveInterval = 3;

    this.stabilized = false;
    this.startedStabilization = false;
    this.stabilizationIterations = 0;
    this.ready = false; // will be set to true if the stabilize

    // default options
    this.options = {};
    this.defaultOptions = {
      enabled: true,
      barnesHut: {
        theta: 0.5,
        gravitationalConstant: -2000,
        centralGravity: 0.3,
        springLength: 95,
        springConstant: 0.04,
        damping: 0.09,
        avoidOverlap: 0,
      },
      forceAtlas2Based: {
        theta: 0.5,
        gravitationalConstant: -50,
        centralGravity: 0.01,
        springConstant: 0.08,
        springLength: 100,
        damping: 0.4,
        avoidOverlap: 0,
      },
      repulsion: {
        centralGravity: 0.2,
        springLength: 200,
        springConstant: 0.05,
        nodeDistance: 100,
        damping: 0.09,
        avoidOverlap: 0,
      },
      hierarchicalRepulsion: {
        centralGravity: 0.0,
        springLength: 100,
        springConstant: 0.01,
        nodeDistance: 120,
        damping: 0.09,
      },
      maxVelocity: 50,
      minVelocity: 0.75, // px/s
      solver: "barnesHut",
      stabilization: {
        enabled: true,
        iterations: 1000, // maximum number of iteration to stabilize
        updateInterval: 50,
        onlyDynamicEdges: false,
        fit: true,
      },
      timestep: 0.5,
      adaptiveTimestep: true,
      wind: { x: 0, y: 0 },
    };
    Object.assign(this.options, this.defaultOptions);
    this.timestep = 0.5;
    this.layoutFailed = false;

    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    this.body.emitter.on("initPhysics", () => {
      this.initPhysics();
    });
    this.body.emitter.on("_layoutFailed", () => {
      this.layoutFailed = true;
    });
    this.body.emitter.on("resetPhysics", () => {
      this.stopSimulation();
      this.ready = false;
    });
    this.body.emitter.on("disablePhysics", () => {
      this.physicsEnabled = false;
      this.stopSimulation();
    });
    this.body.emitter.on("restorePhysics", () => {
      this.setOptions(this.options);
      if (this.ready === true) {
        this.startSimulation();
      }
    });
    this.body.emitter.on("startSimulation", () => {
      if (this.ready === true) {
        this.startSimulation();
      }
    });
    this.body.emitter.on("stopSimulation", () => {
      this.stopSimulation();
    });
    this.body.emitter.on("destroy", () => {
      this.stopSimulation(false);
      this.body.emitter.off();
    });
    this.body.emitter.on("_dataChanged", () => {
      // Nodes and/or edges have been added or removed, update shortcut lists.
      this.updatePhysicsData();
    });

    // debug: show forces
    // this.body.emitter.on("afterDrawing", (ctx) => {this._drawForces(ctx);});
  }

  /**
   * set the physics options
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      if (options === false) {
        this.options.enabled = false;
        this.physicsEnabled = false;
        this.stopSimulation();
      } else if (options === true) {
        this.options.enabled = true;
        this.physicsEnabled = true;
        this.startSimulation();
      } else {
        this.physicsEnabled = true;
        selectiveNotDeepExtend(["stabilization"], this.options, options);
        mergeOptions(this.options, options, "stabilization");

        if (options.enabled === undefined) {
          this.options.enabled = true;
        }

        if (this.options.enabled === false) {
          this.physicsEnabled = false;
          this.stopSimulation();
        }

        const wind = this.options.wind;
        if (wind) {
          if (typeof wind.x !== "number" || Number.isNaN(wind.x)) {
            wind.x = 0;
          }
          if (typeof wind.y !== "number" || Number.isNaN(wind.y)) {
            wind.y = 0;
          }
        }

        // set the timestep
        this.timestep = this.options.timestep;
      }
    }
    this.init();
  }

  /**
   * configure the engine.
   */
  init() {
    let options;
    if (this.options.solver === "forceAtlas2Based") {
      options = this.options.forceAtlas2Based;
      this.nodesSolver = new ForceAtlas2BasedRepulsionSolver(
        this.body,
        this.physicsBody,
        options
      );
      this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options);
      this.gravitySolver = new ForceAtlas2BasedCentralGravitySolver(
        this.body,
        this.physicsBody,
        options
      );
    } else if (this.options.solver === "repulsion") {
      options = this.options.repulsion;
      this.nodesSolver = new RepulsionSolver(this.body, this.physicsBody, options);
      this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options);
      this.gravitySolver = new CentralGravitySolver(
        this.body,
        this.physicsBody,
        options
      );
    } else if (this.options.solver === "hierarchicalRepulsion") {
      options = this.options.hierarchicalRepulsion;
      this.nodesSolver = new HierarchicalRepulsionSolver(
        this.body,
        this.physicsBody,
        options
      );
      this.edgesSolver = new HierarchicalSpringSolver(
        this.body,
        this.physicsBody,
        options
      );
      this.gravitySolver = new CentralGravitySolver(
        this.body,
        this.physicsBody,
        options
      );
    } else {
      // barnesHut
      options = this.options.barnesHut;
      this.nodesSolver = new BarnesHutSolver(
        this.body,
        this.physicsBody,
        options
      );
      this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options);
      this.gravitySolver = new CentralGravitySolver(
        this.body,
        this.physicsBody,
        options
      );
    }

    this.modelOptions = options;
  }

  /**
   * initialize the engine
   */
  initPhysics() {
    if (this.physicsEnabled === true && this.options.enabled === true) {
      if (this.options.stabilization.enabled === true) {
        this.stabilize();
      } else {
        this.stabilized = false;
        this.ready = true;
        this.body.emitter.emit("fit", {}, this.layoutFailed); // if the layout failed, we use the approximation for the zoom
        this.startSimulation();
      }
    } else {
      this.ready = true;
      this.body.emitter.emit("fit");
    }
  }

  /**
   * Start the simulation
   */
  startSimulation() {
    if (this.physicsEnabled === true && this.options.enabled === true) {
      this.stabilized = false;

      // when visible, adaptivity is disabled.
      this.adaptiveTimestep = false;

      // this sets the width of all nodes initially which could be required for the avoidOverlap
      this.body.emitter.emit("_resizeNodes");
      if (this.viewFunction === undefined) {
        this.viewFunction = this.simulationStep.bind(this);
        this.body.emitter.on("initRedraw", this.viewFunction);
        this.body.emitter.emit("_startRendering");
      }
    } else {
      this.body.emitter.emit("_redraw");
    }
  }

  /**
   * Stop the simulation, force stabilization.
   *
   * @param {boolean} [emit=true]
   */
  stopSimulation(emit = true) {
    this.stabilized = true;
    if (emit === true) {
      this._emitStabilized();
    }
    if (this.viewFunction !== undefined) {
      this.body.emitter.off("initRedraw", this.viewFunction);
      this.viewFunction = undefined;
      if (emit === true) {
        this.body.emitter.emit("_stopRendering");
      }
    }
  }

  /**
   * The viewFunction inserts this step into each render loop. It calls the physics tick and handles the cleanup at stabilized.
   *
   */
  simulationStep() {
    // check if the physics have settled
    const startTime = Date.now();
    this.physicsTick();
    const physicsTime = Date.now() - startTime;

    // run double speed if it is a little graph
    if (
      (physicsTime < 0.4 * this.simulationInterval ||
        this.runDoubleSpeed === true) &&
      this.stabilized === false
    ) {
      this.physicsTick();

      // this makes sure there is no jitter. The decision is taken once to run it at double speed.
      this.runDoubleSpeed = true;
    }

    if (this.stabilized === true) {
      this.stopSimulation();
    }
  }

  /**
   * trigger the stabilized event.
   *
   * @param {number} [amountOfIterations=this.stabilizationIterations]
   * @private
   */
  _emitStabilized(amountOfIterations = this.stabilizationIterations) {
    if (
      this.stabilizationIterations > 1 ||
      this.startedStabilization === true
    ) {
      setTimeout(() => {
        this.body.emitter.emit("stabilized", {
          iterations: amountOfIterations,
        });
        this.startedStabilization = false;
        this.stabilizationIterations = 0;
      }, 0);
    }
  }

  /**
   * Calculate the forces for one physics iteration and move the nodes.
   *
   * @private
   */
  physicsStep() {
    this.gravitySolver.solve();
    this.nodesSolver.solve();
    this.edgesSolver.solve();
    this.moveNodes();
  }

  /**
   * Make dynamic adjustments to the timestep, based on current state.
   *
   * Helper function for physicsTick().
   *
   * @private
   */
  adjustTimeStep() {
    const factor = 1.2; // Factor for increasing the timestep on success.

    // we compare the two steps. if it is acceptable we double the step.
    if (this._evaluateStepQuality() === true) {
      this.timestep = factor * this.timestep;
    } else {
      // if not, we decrease the step to a minimum of the options timestep.
      // if the decreased timestep is smaller than the options step, we do not reset the counter
      // we assume that the options timestep is stable enough.
      if (this.timestep / factor < this.options.timestep) {
        this.timestep = this.options.timestep;
      } else {
        // if the timestep was larger than 2 times the option one we check the adaptivity again to ensure
        // that large instabilities do not form.
        this.adaptiveCounter = -1; // check again next iteration
        this.timestep = Math.max(this.options.timestep, this.timestep / factor);
      }
    }
  }

  /**
   * A single simulation step (or 'tick') in the physics simulation
   *
   * @private
   */
  physicsTick() {
    this._startStabilizing(); // this ensures that there is no start event when the network is already stable.
    if (this.stabilized === true) return;

    // adaptivity means the timestep adapts to the situation, only applicable for stabilization
    if (
      this.adaptiveTimestep === true &&
      this.adaptiveTimestepEnabled === true
    ) {
      // timestep remains stable for "interval" iterations.
      const doAdaptive = this.adaptiveCounter % this.adaptiveInterval === 0;

      if (doAdaptive) {
        // first the big step and revert.
        this.timestep = 2 * this.timestep;
        this.physicsStep();
        this.revert(); // saves the reference state

        // now the normal step. Since this is the last step, it is the more stable one and we will take this.
        this.timestep = 0.5 * this.timestep;

        // since it's half the step, we do it twice.
        this.physicsStep();
        this.physicsStep();

        this.adjustTimeStep();
      } else {
        this.physicsStep(); // normal step, keeping timestep constant
      }

      this.adaptiveCounter += 1;
    } else {
      // case for the static timestep, we reset it to the one in options and take a normal step.
      this.timestep = this.options.timestep;
      this.physicsStep();
    }

    if (this.stabilized === true) this.revert();
    this.stabilizationIterations++;
  }

  /**
   * Nodes and edges can have the physics toggles on or off. A collection of indices is created here so we can skip the check all the time.
   *
   * @private
   */
  updatePhysicsData() {
    this.physicsBody.forces = {};
    this.physicsBody.physicsNodeIndices = [];
    this.physicsBody.physicsEdgeIndices = [];
    const nodes = this.body.nodes;
    const edges = this.body.edges;

    // get node indices for physics
    for (const nodeId in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
        if (nodes[nodeId].options.physics === true) {
          this.physicsBody.physicsNodeIndices.push(nodes[nodeId].id);
        }
      }
    }

    // get edge indices for physics
    for (const edgeId in edges) {
      if (Object.prototype.hasOwnProperty.call(edges, edgeId)) {
        if (edges[edgeId].options.physics === true) {
          this.physicsBody.physicsEdgeIndices.push(edges[edgeId].id);
        }
      }
    }

    // get the velocity and the forces vector
    for (let i = 0; i < this.physicsBody.physicsNodeIndices.length; i++) {
      const nodeId = this.physicsBody.physicsNodeIndices[i];
      this.physicsBody.forces[nodeId] = { x: 0, y: 0 };

      // forces can be reset because they are recalculated. Velocities have to persist.
      if (this.physicsBody.velocities[nodeId] === undefined) {
        this.physicsBody.velocities[nodeId] = { x: 0, y: 0 };
      }
    }

    // clean deleted nodes from the velocity vector
    for (const nodeId in this.physicsBody.velocities) {
      if (nodes[nodeId] === undefined) {
        delete this.physicsBody.velocities[nodeId];
      }
    }
  }

  /**
   * Revert the simulation one step. This is done so after stabilization, every new start of the simulation will also say stabilized.
   */
  revert() {
    const nodeIds = Object.keys(this.previousStates);
    const nodes = this.body.nodes;
    const velocities = this.physicsBody.velocities;
    this.referenceState = {};

    for (let i = 0; i < nodeIds.length; i++) {
      const nodeId = nodeIds[i];
      if (nodes[nodeId] !== undefined) {
        if (nodes[nodeId].options.physics === true) {
          this.referenceState[nodeId] = {
            positions: { x: nodes[nodeId].x, y: nodes[nodeId].y },
          };
          velocities[nodeId].x = this.previousStates[nodeId].vx;
          velocities[nodeId].y = this.previousStates[nodeId].vy;
          nodes[nodeId].x = this.previousStates[nodeId].x;
          nodes[nodeId].y = this.previousStates[nodeId].y;
        }
      } else {
        delete this.previousStates[nodeId];
      }
    }
  }

  /**
   * This compares the reference state to the current state
   *
   * @returns {boolean}
   * @private
   */
  _evaluateStepQuality() {
    let dx, dy, dpos;
    const nodes = this.body.nodes;
    const reference = this.referenceState;
    const posThreshold = 0.3;

    for (const nodeId in this.referenceState) {
      if (
        Object.prototype.hasOwnProperty.call(this.referenceState, nodeId) &&
        nodes[nodeId] !== undefined
      ) {
        dx = nodes[nodeId].x - reference[nodeId].positions.x;
        dy = nodes[nodeId].y - reference[nodeId].positions.y;

        dpos = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));

        if (dpos > posThreshold) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * move the nodes one timestep and check if they are stabilized
   */
  moveNodes() {
    const nodeIndices = this.physicsBody.physicsNodeIndices;
    let maxNodeVelocity = 0;
    let averageNodeVelocity = 0;

    // the velocity threshold (energy in the system) for the adaptivity toggle
    const velocityAdaptiveThreshold = 5;

    for (let i = 0; i < nodeIndices.length; i++) {
      const nodeId = nodeIndices[i];
      const nodeVelocity = this._performStep(nodeId);
      // stabilized is true if stabilized is true and velocity is smaller than vmin --> all nodes must be stabilized
      maxNodeVelocity = Math.max(maxNodeVelocity, nodeVelocity);
      averageNodeVelocity += nodeVelocity;
    }

    // evaluating the stabilized and adaptiveTimestepEnabled conditions
    this.adaptiveTimestepEnabled =
      averageNodeVelocity / nodeIndices.length < velocityAdaptiveThreshold;
    this.stabilized = maxNodeVelocity < this.options.minVelocity;
  }

  /**
   * Calculate new velocity for a coordinate direction
   *
   * @param {number} v  velocity for current coordinate
   * @param {number} f  regular force for current coordinate
   * @param {number} m  mass of current node
   * @returns {number} new velocity for current coordinate
   * @private
   */
  calculateComponentVelocity(v, f, m) {
    const df = this.modelOptions.damping * v; // damping force
    const a = (f - df) / m; // acceleration

    v += a * this.timestep;

    // Put a limit on the velocities if it is really high
    const maxV = this.options.maxVelocity || 1e9;
    if (Math.abs(v) > maxV) {
      v = v > 0 ? maxV : -maxV;
    }

    return v;
  }

  /**
   * Perform the actual step
   *
   * @param {Node.id} nodeId
   * @returns {number} the new velocity of given node
   * @private
   */
  _performStep(nodeId) {
    const node = this.body.nodes[nodeId];
    const force = this.physicsBody.forces[nodeId];

    if (this.options.wind) {
      force.x += this.options.wind.x;
      force.y += this.options.wind.y;
    }

    const velocity = this.physicsBody.velocities[nodeId];

    // store the state so we can revert
    this.previousStates[nodeId] = {
      x: node.x,
      y: node.y,
      vx: velocity.x,
      vy: velocity.y,
    };

    if (node.options.fixed.x === false) {
      velocity.x = this.calculateComponentVelocity(
        velocity.x,
        force.x,
        node.options.mass
      );
      node.x += velocity.x * this.timestep;
    } else {
      force.x = 0;
      velocity.x = 0;
    }

    if (node.options.fixed.y === false) {
      velocity.y = this.calculateComponentVelocity(
        velocity.y,
        force.y,
        node.options.mass
      );
      node.y += velocity.y * this.timestep;
    } else {
      force.y = 0;
      velocity.y = 0;
    }

    const totalVelocity = Math.sqrt(
      Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2)
    );
    return totalVelocity;
  }

  /**
   * When initializing and stabilizing, we can freeze nodes with a predefined position.
   * This greatly speeds up stabilization because only the supportnodes for the smoothCurves have to settle.
   *
   * @private
   */
  _freezeNodes() {
    const nodes = this.body.nodes;
    for (const id in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, id)) {
        if (nodes[id].x && nodes[id].y) {
          const fixed = nodes[id].options.fixed;
          this.freezeCache[id] = { x: fixed.x, y: fixed.y };
          fixed.x = true;
          fixed.y = true;
        }
      }
    }
  }

  /**
   * Unfreezes the nodes that have been frozen by _freezeDefinedNodes.
   *
   * @private
   */
  _restoreFrozenNodes() {
    const nodes = this.body.nodes;
    for (const id in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, id)) {
        if (this.freezeCache[id] !== undefined) {
          nodes[id].options.fixed.x = this.freezeCache[id].x;
          nodes[id].options.fixed.y = this.freezeCache[id].y;
        }
      }
    }
    this.freezeCache = {};
  }

  /**
   * Find a stable position for all nodes
   *
   * @param {number} [iterations=this.options.stabilization.iterations]
   */
  stabilize(iterations = this.options.stabilization.iterations) {
    if (typeof iterations !== "number") {
      iterations = this.options.stabilization.iterations;
      console.error(
        "The stabilize method needs a numeric amount of iterations. Switching to default: ",
        iterations
      );
    }

    if (this.physicsBody.physicsNodeIndices.length === 0) {
      this.ready = true;
      return;
    }

    // enable adaptive timesteps
    this.adaptiveTimestep = this.options.adaptiveTimestep;

    // this sets the width of all nodes initially which could be required for the avoidOverlap
    this.body.emitter.emit("_resizeNodes");

    this.stopSimulation(); // stop the render loop
    this.stabilized = false;

    // block redraw requests
    this.body.emitter.emit("_blockRedraw");
    this.targetIterations = iterations;

    // start the stabilization
    if (this.options.stabilization.onlyDynamicEdges === true) {
      this._freezeNodes();
    }
    this.stabilizationIterations = 0;

    setTimeout(() => this._stabilizationBatch(), 0);
  }

  /**
   * If not already stabilizing, start it and emit a start event.
   *
   * @returns {boolean} true if stabilization started with this call
   * @private
   */
  _startStabilizing() {
    if (this.startedStabilization === true) return false;

    this.body.emitter.emit("startStabilizing");
    this.startedStabilization = true;
    return true;
  }

  /**
   * One batch of stabilization
   *
   * @private
   */
  _stabilizationBatch() {
    const running = () =>
      this.stabilized === false &&
      this.stabilizationIterations < this.targetIterations;

    const sendProgress = () => {
      this.body.emitter.emit("stabilizationProgress", {
        iterations: this.stabilizationIterations,
        total: this.targetIterations,
      });
    };

    if (this._startStabilizing()) {
      sendProgress(); // Ensure that there is at least one start event.
    }

    let count = 0;
    while (running() && count < this.options.stabilization.updateInterval) {
      this.physicsTick();
      count++;
    }

    sendProgress();

    if (running()) {
      setTimeout(this._stabilizationBatch.bind(this), 0);
    } else {
      this._finalizeStabilization();
    }
  }

  /**
   * Wrap up the stabilization, fit and emit the events.
   *
   * @private
   */
  _finalizeStabilization() {
    this.body.emitter.emit("_allowRedraw");
    if (this.options.stabilization.fit === true) {
      this.body.emitter.emit("fit");
    }

    if (this.options.stabilization.onlyDynamicEdges === true) {
      this._restoreFrozenNodes();
    }

    this.body.emitter.emit("stabilizationIterationsDone");
    this.body.emitter.emit("_requestRedraw");

    if (this.stabilized === true) {
      this._emitStabilized();
    } else {
      this.startSimulation();
    }

    this.ready = true;
  }

  //---------------------------  DEBUGGING BELOW  ---------------------------//

  /**
   * Debug function that display arrows for the forces currently active in the network.
   *
   * Use this when debugging only.
   *
   * @param {CanvasRenderingContext2D} ctx
   * @private
   */
  _drawForces(ctx) {
    for (let i = 0; i < this.physicsBody.physicsNodeIndices.length; i++) {
      const index = this.physicsBody.physicsNodeIndices[i];
      const node = this.body.nodes[index];
      const force = this.physicsBody.forces[index];
      const factor = 20;
      const colorFactor = 0.03;
      const forceSize = Math.sqrt(Math.pow(force.x, 2) + Math.pow(force.x, 2));

      const size = Math.min(Math.max(5, forceSize), 15);
      const arrowSize = 3 * size;

      const color = HSVToHex(
        (180 - Math.min(1, Math.max(0, colorFactor * forceSize)) * 180) / 360,
        1,
        1
      );

      const point = {
        x: node.x + factor * force.x,
        y: node.y + factor * force.y,
      };

      ctx.lineWidth = size;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(node.x, node.y);
      ctx.lineTo(point.x, point.y);
      ctx.stroke();

      const angle = Math.atan2(force.y, force.x);
      ctx.fillStyle = color;
      EndPoints.draw(ctx, {
        type: "arrow",
        point: point,
        angle: angle,
        length: arrowSize,
      });
      ctx.fill();
    }
  }
}

/**
 * Utility Class
 */
class NetworkUtil {
  /**
   * @ignore
   */
  constructor() {}

  /**
   * Find the center position of the network considering the bounding boxes
   *
   * @param {Array.<Node>} allNodes
   * @param {Array.<Node>} [specificNodes=[]]
   * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
   * @static
   */
  static getRange(allNodes, specificNodes = []) {
    let minY = 1e9,
      maxY = -1e9,
      minX = 1e9,
      maxX = -1e9,
      node;
    if (specificNodes.length > 0) {
      for (let i = 0; i < specificNodes.length; i++) {
        node = allNodes[specificNodes[i]];
        if (minX > node.shape.boundingBox.left) {
          minX = node.shape.boundingBox.left;
        }
        if (maxX < node.shape.boundingBox.right) {
          maxX = node.shape.boundingBox.right;
        }
        if (minY > node.shape.boundingBox.top) {
          minY = node.shape.boundingBox.top;
        } // top is negative, bottom is positive
        if (maxY < node.shape.boundingBox.bottom) {
          maxY = node.shape.boundingBox.bottom;
        } // top is negative, bottom is positive
      }
    }

    if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
      (minY = 0), (maxY = 0), (minX = 0), (maxX = 0);
    }
    return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
  }

  /**
   * Find the center position of the network
   *
   * @param {Array.<Node>} allNodes
   * @param {Array.<Node>} [specificNodes=[]]
   * @returns {{minX: number, maxX: number, minY: number, maxY: number}}
   * @static
   */
  static getRangeCore(allNodes, specificNodes = []) {
    let minY = 1e9,
      maxY = -1e9,
      minX = 1e9,
      maxX = -1e9,
      node;
    if (specificNodes.length > 0) {
      for (let i = 0; i < specificNodes.length; i++) {
        node = allNodes[specificNodes[i]];
        if (minX > node.x) {
          minX = node.x;
        }
        if (maxX < node.x) {
          maxX = node.x;
        }
        if (minY > node.y) {
          minY = node.y;
        } // top is negative, bottom is positive
        if (maxY < node.y) {
          maxY = node.y;
        } // top is negative, bottom is positive
      }
    }

    if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
      (minY = 0), (maxY = 0), (minX = 0), (maxX = 0);
    }
    return { minX: minX, maxX: maxX, minY: minY, maxY: maxY };
  }

  /**
   * @param {object} range = {minX: minX, maxX: maxX, minY: minY, maxY: maxY};
   * @returns {{x: number, y: number}}
   * @static
   */
  static findCenter(range) {
    return {
      x: 0.5 * (range.maxX + range.minX),
      y: 0.5 * (range.maxY + range.minY),
    };
  }

  /**
   * This returns a clone of the options or options of the edge or node to be used for construction of new edges or check functions for new nodes.
   *
   * @param {vis.Item} item
   * @param {'node'|undefined} type
   * @returns {{}}
   * @static
   */
  static cloneOptions(item, type) {
    const clonedOptions = {};
    if (type === undefined || type === "node") {
      deepExtend(clonedOptions, item.options, true);
      clonedOptions.x = item.x;
      clonedOptions.y = item.y;
      clonedOptions.amountOfConnections = item.edges.length;
    } else {
      deepExtend(clonedOptions, item.options, true);
    }
    return clonedOptions;
  }
}

/**
 * A Cluster is a special Node that allows a group of Nodes positioned closely together
 * to be represented by a single Cluster Node.
 *
 * @augments Node
 */
class Cluster extends Node {
  /**
   * @param {object} options
   * @param {object} body
   * @param {Array.<HTMLImageElement>}imagelist
   * @param {Array} grouplist
   * @param {object} globalOptions
   * @param {object} defaultOptions     Global default options for nodes
   */
  constructor(
    options,
    body,
    imagelist,
    grouplist,
    globalOptions,
    defaultOptions
  ) {
    super(options, body, imagelist, grouplist, globalOptions, defaultOptions);

    this.isCluster = true;
    this.containedNodes = {};
    this.containedEdges = {};
  }

  /**
   * Transfer child cluster data to current and disconnect the child cluster.
   *
   * Please consult the header comment in 'Clustering.js' for the fields set here.
   *
   * @param {string|number} childClusterId  id of child cluster to open
   */
  _openChildCluster(childClusterId) {
    const childCluster = this.body.nodes[childClusterId];
    if (this.containedNodes[childClusterId] === undefined) {
      throw new Error(
        "node with id: " + childClusterId + " not in current cluster"
      );
    }
    if (!childCluster.isCluster) {
      throw new Error("node with id: " + childClusterId + " is not a cluster");
    }

    // Disconnect child cluster from current cluster
    delete this.containedNodes[childClusterId];
    forEach(childCluster.edges, (edge) => {
      delete this.containedEdges[edge.id];
    });

    // Transfer nodes and edges
    forEach(childCluster.containedNodes, (node, nodeId) => {
      this.containedNodes[nodeId] = node;
    });
    childCluster.containedNodes = {};

    forEach(childCluster.containedEdges, (edge, edgeId) => {
      this.containedEdges[edgeId] = edge;
    });
    childCluster.containedEdges = {};

    // Transfer edges within cluster edges which are clustered
    forEach(childCluster.edges, (clusterEdge) => {
      forEach(this.edges, (parentClusterEdge) => {
        // Assumption: a clustered edge can only be present in a single clustering edge
        // Not tested here
        const index = parentClusterEdge.clusteringEdgeReplacingIds.indexOf(
          clusterEdge.id
        );
        if (index === -1) return;

        forEach(clusterEdge.clusteringEdgeReplacingIds, (srcId) => {
          parentClusterEdge.clusteringEdgeReplacingIds.push(srcId);

          // Maintain correct bookkeeping for transferred edge
          this.body.edges[srcId].edgeReplacedById = parentClusterEdge.id;
        });

        // Remove cluster edge from parent cluster edge
        parentClusterEdge.clusteringEdgeReplacingIds.splice(index, 1);
      });
    });
    childCluster.edges = [];
  }
}

/* ===========================================================================

# TODO

- `edgeReplacedById` not cleaned up yet on cluster edge removal
- allowSingleNodeCluster could be a global option as well; currently needs to always
  be passed to clustering methods

----------------------------------------------

# State Model for Clustering

The total state for clustering is non-trivial. It is useful to have a model
available as to how it works. The following documents the relevant state items.


## Network State

The following `network`-members are relevant to clustering:

- `body.nodes`       - all nodes actively participating in the network
- `body.edges`       - same for edges
- `body.nodeIndices` - id's of nodes that are visible at a given moment
- `body.edgeIndices` - same for edges

This includes:

- helper nodes for dragging in `manipulation`
- helper nodes for edge type `dynamic`
- cluster nodes and edges
- there may be more than this.

A node/edge may be missing in the `Indices` member if:

- it is a helper node
- the node or edge state has option `hidden` set
- It is not visible due to clustering


## Clustering State

For the hashes, the id's of the nodes/edges are used as key.

Member `network.clustering` contains the following items:

- `clusteredNodes` - hash with values: { clusterId: <id of cluster>, node: <node instance>}
- `clusteredEdges` - hash with values: restore information for given edge


Due to nesting of clusters, these members can contain cluster nodes and edges as well.

The important thing to note here, is that the clustered nodes and edges also
appear in the members of the cluster nodes. For data update, it is therefore
important to scan these lists as well as the cluster nodes.


### Cluster Node

A cluster node has the following extra fields:

- `isCluster : true` - indication that this is a cluster node
- `containedNodes`   - hash of nodes contained in this cluster
- `containedEdges`   - same for edges
- `edges`            - array of cluster edges for this node


**NOTE:**

- `containedEdges` can also contain edges which are not clustered; e.g. an edge
   connecting two nodes in the same cluster.


### Cluster Edge

These are the items in the `edges` member of a clustered node. They have the
following relevant members:

- 'clusteringEdgeReplacingIds` - array of id's of edges replaced by this edge

Note that it's possible to nest clusters, so that `clusteringEdgeReplacingIds`
can contain edge id's of other clusters.


### Clustered Edge

This is any edge contained by a cluster edge. It gets the following additional
member:

- `edgeReplacedById` - id of the cluster edge in which current edge is clustered


   =========================================================================== */

/**
 * The clustering engine
 */
class ClusterEngine {
  /**
   * @param {object} body
   */
  constructor(body) {
    this.body = body;
    this.clusteredNodes = {}; // key: node id, value: { clusterId: <id of cluster>, node: <node instance>}
    this.clusteredEdges = {}; // key: edge id, value: restore information for given edge

    this.options = {};
    this.defaultOptions = {};
    Object.assign(this.options, this.defaultOptions);

    this.body.emitter.on("_resetData", () => {
      this.clusteredNodes = {};
      this.clusteredEdges = {};
    });
  }

  /**
   *
   * @param {number} hubsize
   * @param {object} options
   */
  clusterByHubsize(hubsize, options) {
    if (hubsize === undefined) {
      hubsize = this._getHubSize();
    } else if (typeof hubsize === "object") {
      options = this._checkOptions(hubsize);
      hubsize = this._getHubSize();
    }

    const nodesToCluster = [];
    for (let i = 0; i < this.body.nodeIndices.length; i++) {
      const node = this.body.nodes[this.body.nodeIndices[i]];
      if (node.edges.length >= hubsize) {
        nodesToCluster.push(node.id);
      }
    }

    for (let i = 0; i < nodesToCluster.length; i++) {
      this.clusterByConnection(nodesToCluster[i], options, true);
    }

    this.body.emitter.emit("_dataChanged");
  }

  /**
   * loop over all nodes, check if they adhere to the condition and cluster if needed.
   *
   * @param {object} options
   * @param {boolean} [refreshData=true]
   */
  cluster(options = {}, refreshData = true) {
    if (options.joinCondition === undefined) {
      throw new Error(
        "Cannot call clusterByNodeData without a joinCondition function in the options."
      );
    }

    // check if the options object is fine, append if needed
    options = this._checkOptions(options);

    const childNodesObj = {};
    const childEdgesObj = {};

    // collect the nodes that will be in the cluster
    forEach(this.body.nodes, (node, nodeId) => {
      if (node.options && options.joinCondition(node.options) === true) {
        childNodesObj[nodeId] = node;

        // collect the edges that will be in the cluster
        forEach(node.edges, (edge) => {
          if (this.clusteredEdges[edge.id] === undefined) {
            childEdgesObj[edge.id] = edge;
          }
        });
      }
    });

    this._cluster(childNodesObj, childEdgesObj, options, refreshData);
  }

  /**
   * Cluster all nodes in the network that have only X edges
   *
   * @param {number} edgeCount
   * @param {object} options
   * @param {boolean} [refreshData=true]
   */
  clusterByEdgeCount(edgeCount, options, refreshData = true) {
    options = this._checkOptions(options);
    const clusters = [];
    const usedNodes = {};
    let edge, edges, relevantEdgeCount;
    // collect the nodes that will be in the cluster
    for (let i = 0; i < this.body.nodeIndices.length; i++) {
      const childNodesObj = {};
      const childEdgesObj = {};
      const nodeId = this.body.nodeIndices[i];
      const node = this.body.nodes[nodeId];

      // if this node is already used in another cluster this session, we do not have to re-evaluate it.
      if (usedNodes[nodeId] === undefined) {
        relevantEdgeCount = 0;
        edges = [];
        for (let j = 0; j < node.edges.length; j++) {
          edge = node.edges[j];
          if (this.clusteredEdges[edge.id] === undefined) {
            if (edge.toId !== edge.fromId) {
              relevantEdgeCount++;
            }
            edges.push(edge);
          }
        }

        // this node qualifies, we collect its neighbours to start the clustering process.
        if (relevantEdgeCount === edgeCount) {
          const checkJoinCondition = function (node) {
            if (
              options.joinCondition === undefined ||
              options.joinCondition === null
            ) {
              return true;
            }

            const clonedOptions = NetworkUtil.cloneOptions(node);
            return options.joinCondition(clonedOptions);
          };

          let gatheringSuccessful = true;
          for (let j = 0; j < edges.length; j++) {
            edge = edges[j];
            const childNodeId = this._getConnectedId(edge, nodeId);
            // add the nodes to the list by the join condition.
            if (checkJoinCondition(node)) {
              childEdgesObj[edge.id] = edge;
              childNodesObj[nodeId] = node;
              childNodesObj[childNodeId] = this.body.nodes[childNodeId];
              usedNodes[nodeId] = true;
            } else {
              // this node does not qualify after all.
              gatheringSuccessful = false;
              break;
            }
          }

          // add to the cluster queue
          if (
            Object.keys(childNodesObj).length > 0 &&
            Object.keys(childEdgesObj).length > 0 &&
            gatheringSuccessful === true
          ) {
            /**
             * Search for cluster data that contains any of the node id's
             *
             * @returns {boolean} true if no joinCondition, otherwise return value of joinCondition
             */
            const findClusterData = function () {
              for (let n = 0; n < clusters.length; ++n) {
                // Search for a cluster containing any of the node id's
                for (const m in childNodesObj) {
                  if (clusters[n].nodes[m] !== undefined) {
                    return clusters[n];
                  }
                }
              }

              return undefined;
            };

            // If any of the found nodes is part of a cluster found in this method,
            // add the current values to that cluster
            const foundCluster = findClusterData();
            if (foundCluster !== undefined) {
              // Add nodes to found cluster if not present
              for (const m in childNodesObj) {
                if (foundCluster.nodes[m] === undefined) {
                  foundCluster.nodes[m] = childNodesObj[m];
                }
              }

              // Add edges to found cluster, if not present
              for (const m in childEdgesObj) {
                if (foundCluster.edges[m] === undefined) {
                  foundCluster.edges[m] = childEdgesObj[m];
                }
              }
            } else {
              // Create a new cluster group
              clusters.push({ nodes: childNodesObj, edges: childEdgesObj });
            }
          }
        }
      }
    }

    for (let i = 0; i < clusters.length; i++) {
      this._cluster(clusters[i].nodes, clusters[i].edges, options, false);
    }

    if (refreshData === true) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   * Cluster all nodes in the network that have only 1 edge
   *
   * @param {object} options
   * @param {boolean} [refreshData=true]
   */
  clusterOutliers(options, refreshData = true) {
    this.clusterByEdgeCount(1, options, refreshData);
  }

  /**
   * Cluster all nodes in the network that have only 2 edge
   *
   * @param {object} options
   * @param {boolean} [refreshData=true]
   */
  clusterBridges(options, refreshData = true) {
    this.clusterByEdgeCount(2, options, refreshData);
  }

  /**
   * suck all connected nodes of a node into the node.
   *
   * @param {Node.id} nodeId
   * @param {object} options
   * @param {boolean} [refreshData=true]
   */
  clusterByConnection(nodeId, options, refreshData = true) {
    // kill conditions
    if (nodeId === undefined) {
      throw new Error("No nodeId supplied to clusterByConnection!");
    }
    if (this.body.nodes[nodeId] === undefined) {
      throw new Error(
        "The nodeId given to clusterByConnection does not exist!"
      );
    }

    const node = this.body.nodes[nodeId];
    options = this._checkOptions(options, node);
    if (options.clusterNodeProperties.x === undefined) {
      options.clusterNodeProperties.x = node.x;
    }
    if (options.clusterNodeProperties.y === undefined) {
      options.clusterNodeProperties.y = node.y;
    }
    if (options.clusterNodeProperties.fixed === undefined) {
      options.clusterNodeProperties.fixed = {};
      options.clusterNodeProperties.fixed.x = node.options.fixed.x;
      options.clusterNodeProperties.fixed.y = node.options.fixed.y;
    }

    const childNodesObj = {};
    const childEdgesObj = {};
    const parentNodeId = node.id;
    const parentClonedOptions = NetworkUtil.cloneOptions(node);
    childNodesObj[parentNodeId] = node;

    // collect the nodes that will be in the cluster
    for (let i = 0; i < node.edges.length; i++) {
      const edge = node.edges[i];
      if (this.clusteredEdges[edge.id] === undefined) {
        const childNodeId = this._getConnectedId(edge, parentNodeId);

        // if the child node is not in a cluster
        if (this.clusteredNodes[childNodeId] === undefined) {
          if (childNodeId !== parentNodeId) {
            if (options.joinCondition === undefined) {
              childEdgesObj[edge.id] = edge;
              childNodesObj[childNodeId] = this.body.nodes[childNodeId];
            } else {
              // clone the options and insert some additional parameters that could be interesting.
              const childClonedOptions = NetworkUtil.cloneOptions(
                this.body.nodes[childNodeId]
              );
              if (
                options.joinCondition(
                  parentClonedOptions,
                  childClonedOptions
                ) === true
              ) {
                childEdgesObj[edge.id] = edge;
                childNodesObj[childNodeId] = this.body.nodes[childNodeId];
              }
            }
          } else {
            // swallow the edge if it is self-referencing.
            childEdgesObj[edge.id] = edge;
          }
        }
      }
    }
    const childNodeIDs = Object.keys(childNodesObj).map(function (childNode) {
      return childNodesObj[childNode].id;
    });

    for (const childNodeKey in childNodesObj) {
      if (!Object.prototype.hasOwnProperty.call(childNodesObj, childNodeKey))
        continue;

      const childNode = childNodesObj[childNodeKey];
      for (let y = 0; y < childNode.edges.length; y++) {
        const childEdge = childNode.edges[y];
        if (
          childNodeIDs.indexOf(this._getConnectedId(childEdge, childNode.id)) >
          -1
        ) {
          childEdgesObj[childEdge.id] = childEdge;
        }
      }
    }
    this._cluster(childNodesObj, childEdgesObj, options, refreshData);
  }

  /**
   * This function creates the edges that will be attached to the cluster
   * It looks for edges that are connected to the nodes from the "outside' of the cluster.
   *
   * @param {{Node.id: vis.Node}} childNodesObj
   * @param {{vis.Edge.id: vis.Edge}} childEdgesObj
   * @param {object} clusterNodeProperties
   * @param {object} clusterEdgeProperties
   * @private
   */
  _createClusterEdges(
    childNodesObj,
    childEdgesObj,
    clusterNodeProperties,
    clusterEdgeProperties
  ) {
    let edge, childNodeId, childNode, toId, fromId, otherNodeId;

    // loop over all child nodes and their edges to find edges going out of the cluster
    // these edges will be replaced by clusterEdges.
    const childKeys = Object.keys(childNodesObj);
    const createEdges = [];
    for (let i = 0; i < childKeys.length; i++) {
      childNodeId = childKeys[i];
      childNode = childNodesObj[childNodeId];

      // construct new edges from the cluster to others
      for (let j = 0; j < childNode.edges.length; j++) {
        edge = childNode.edges[j];
        // we only handle edges that are visible to the system, not the disabled ones from the clustering process.
        if (this.clusteredEdges[edge.id] === undefined) {
          // self-referencing edges will be added to the "hidden" list
          if (edge.toId == edge.fromId) {
            childEdgesObj[edge.id] = edge;
          } else {
            // set up the from and to.
            if (edge.toId == childNodeId) {
              // this is a double equals because ints and strings can be interchanged here.
              toId = clusterNodeProperties.id;
              fromId = edge.fromId;
              otherNodeId = fromId;
            } else {
              toId = edge.toId;
              fromId = clusterNodeProperties.id;
              otherNodeId = toId;
            }
          }

          // Only edges from the cluster outwards are being replaced.
          if (childNodesObj[otherNodeId] === undefined) {
            createEdges.push({ edge: edge, fromId: fromId, toId: toId });
          }
        }
      }
    }

    //
    // Here we actually create the replacement edges.
    //
    // We could not do this in the loop above as the creation process
    // would add an edge to the edges array we are iterating over.
    //
    // NOTE: a clustered edge can have multiple base edges!
    //
    const newEdges = [];

    /**
     * Find a cluster edge which matches the given created edge.
     *
     * @param {vis.Edge} createdEdge
     * @returns {vis.Edge}
     */
    const getNewEdge = function (createdEdge) {
      for (let j = 0; j < newEdges.length; j++) {
        const newEdge = newEdges[j];

        // We replace both to and from edges with a single cluster edge
        const matchToDirection =
          createdEdge.fromId === newEdge.fromId &&
          createdEdge.toId === newEdge.toId;
        const matchFromDirection =
          createdEdge.fromId === newEdge.toId &&
          createdEdge.toId === newEdge.fromId;

        if (matchToDirection || matchFromDirection) {
          return newEdge;
        }
      }

      return null;
    };

    for (let j = 0; j < createEdges.length; j++) {
      const createdEdge = createEdges[j];
      const edge = createdEdge.edge;
      let newEdge = getNewEdge(createdEdge);

      if (newEdge === null) {
        // Create a clustered edge for this connection
        newEdge = this._createClusteredEdge(
          createdEdge.fromId,
          createdEdge.toId,
          edge,
          clusterEdgeProperties
        );

        newEdges.push(newEdge);
      } else {
        newEdge.clusteringEdgeReplacingIds.push(edge.id);
      }

      // also reference the new edge in the old edge
      this.body.edges[edge.id].edgeReplacedById = newEdge.id;

      // hide the replaced edge
      this._backupEdgeOptions(edge);
      edge.setOptions({ physics: false });
    }
  }

  /**
   * This function checks the options that can be supplied to the different cluster functions
   * for certain fields and inserts defaults if needed
   *
   * @param {object} options
   * @returns {*}
   * @private
   */
  _checkOptions(options = {}) {
    if (options.clusterEdgeProperties === undefined) {
      options.clusterEdgeProperties = {};
    }
    if (options.clusterNodeProperties === undefined) {
      options.clusterNodeProperties = {};
    }

    return options;
  }

  /**
   *
   * @param {object}    childNodesObj         | object with node objects, id as keys, same as childNodes except it also contains a source node
   * @param {object}    childEdgesObj         | object with edge objects, id as keys
   * @param {Array}     options               | object with {clusterNodeProperties, clusterEdgeProperties, processProperties}
   * @param {boolean}   refreshData | when true, do not wrap up
   * @private
   */
  _cluster(childNodesObj, childEdgesObj, options, refreshData = true) {
    // Remove nodes which are already clustered
    const tmpNodesToRemove = [];
    for (const nodeId in childNodesObj) {
      if (Object.prototype.hasOwnProperty.call(childNodesObj, nodeId)) {
        if (this.clusteredNodes[nodeId] !== undefined) {
          tmpNodesToRemove.push(nodeId);
        }
      }
    }

    for (let n = 0; n < tmpNodesToRemove.length; ++n) {
      delete childNodesObj[tmpNodesToRemove[n]];
    }

    // kill condition: no nodes don't bother
    if (Object.keys(childNodesObj).length == 0) {
      return;
    }

    // allow clusters of 1 if options allow
    if (
      Object.keys(childNodesObj).length == 1 &&
      options.clusterNodeProperties.allowSingleNodeCluster != true
    ) {
      return;
    }

    let clusterNodeProperties = deepExtend({}, options.clusterNodeProperties);

    // construct the clusterNodeProperties
    if (options.processProperties !== undefined) {
      // get the childNode options
      const childNodesOptions = [];
      for (const nodeId in childNodesObj) {
        if (Object.prototype.hasOwnProperty.call(childNodesObj, nodeId)) {
          const clonedOptions = NetworkUtil.cloneOptions(childNodesObj[nodeId]);
          childNodesOptions.push(clonedOptions);
        }
      }

      // get cluster properties based on childNodes
      const childEdgesOptions = [];
      for (const edgeId in childEdgesObj) {
        if (Object.prototype.hasOwnProperty.call(childEdgesObj, edgeId)) {
          // these cluster edges will be removed on creation of the cluster.
          if (edgeId.substr(0, 12) !== "clusterEdge:") {
            const clonedOptions = NetworkUtil.cloneOptions(
              childEdgesObj[edgeId],
              "edge"
            );
            childEdgesOptions.push(clonedOptions);
          }
        }
      }

      clusterNodeProperties = options.processProperties(
        clusterNodeProperties,
        childNodesOptions,
        childEdgesOptions
      );
      if (!clusterNodeProperties) {
        throw new Error(
          "The processProperties function does not return properties!"
        );
      }
    }

    // check if we have an unique id;
    if (clusterNodeProperties.id === undefined) {
      clusterNodeProperties.id = "cluster:" + v4();
    }
    const clusterId = clusterNodeProperties.id;

    if (clusterNodeProperties.label === undefined) {
      clusterNodeProperties.label = "cluster";
    }

    // give the clusterNode a position if it does not have one.
    let pos = undefined;
    if (clusterNodeProperties.x === undefined) {
      pos = this._getClusterPosition(childNodesObj);
      clusterNodeProperties.x = pos.x;
    }
    if (clusterNodeProperties.y === undefined) {
      if (pos === undefined) {
        pos = this._getClusterPosition(childNodesObj);
      }
      clusterNodeProperties.y = pos.y;
    }

    // force the ID to remain the same
    clusterNodeProperties.id = clusterId;

    // create the cluster Node
    // Note that allowSingleNodeCluster, if present, is stored in the options as well
    const clusterNode = this.body.functions.createNode(
      clusterNodeProperties,
      Cluster
    );
    clusterNode.containedNodes = childNodesObj;
    clusterNode.containedEdges = childEdgesObj;
    // cache a copy from the cluster edge properties if we have to reconnect others later on
    clusterNode.clusterEdgeProperties = options.clusterEdgeProperties;

    // finally put the cluster node into global
    this.body.nodes[clusterNodeProperties.id] = clusterNode;

    this._clusterEdges(
      childNodesObj,
      childEdgesObj,
      clusterNodeProperties,
      options.clusterEdgeProperties
    );

    // set ID to undefined so no duplicates arise
    clusterNodeProperties.id = undefined;

    // wrap up
    if (refreshData === true) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   *
   * @param {Edge} edge
   * @private
   */
  _backupEdgeOptions(edge) {
    if (this.clusteredEdges[edge.id] === undefined) {
      this.clusteredEdges[edge.id] = { physics: edge.options.physics };
    }
  }

  /**
   *
   * @param {Edge} edge
   * @private
   */
  _restoreEdge(edge) {
    const originalOptions = this.clusteredEdges[edge.id];
    if (originalOptions !== undefined) {
      edge.setOptions({ physics: originalOptions.physics });
      delete this.clusteredEdges[edge.id];
    }
  }

  /**
   * Check if a node is a cluster.
   *
   * @param {Node.id} nodeId
   * @returns {*}
   */
  isCluster(nodeId) {
    if (this.body.nodes[nodeId] !== undefined) {
      return this.body.nodes[nodeId].isCluster === true;
    } else {
      console.error("Node does not exist.");
      return false;
    }
  }

  /**
   * get the position of the cluster node based on what's inside
   *
   * @param {object} childNodesObj    | object with node objects, id as keys
   * @returns {{x: number, y: number}}
   * @private
   */
  _getClusterPosition(childNodesObj) {
    const childKeys = Object.keys(childNodesObj);
    let minX = childNodesObj[childKeys[0]].x;
    let maxX = childNodesObj[childKeys[0]].x;
    let minY = childNodesObj[childKeys[0]].y;
    let maxY = childNodesObj[childKeys[0]].y;
    let node;
    for (let i = 1; i < childKeys.length; i++) {
      node = childNodesObj[childKeys[i]];
      minX = node.x < minX ? node.x : minX;
      maxX = node.x > maxX ? node.x : maxX;
      minY = node.y < minY ? node.y : minY;
      maxY = node.y > maxY ? node.y : maxY;
    }

    return { x: 0.5 * (minX + maxX), y: 0.5 * (minY + maxY) };
  }

  /**
   * Open a cluster by calling this function.
   *
   * @param {vis.Edge.id}  clusterNodeId | the ID of the cluster node
   * @param {object} options
   * @param {boolean} refreshData | wrap up afterwards if not true
   */
  openCluster(clusterNodeId, options, refreshData = true) {
    // kill conditions
    if (clusterNodeId === undefined) {
      throw new Error("No clusterNodeId supplied to openCluster.");
    }

    const clusterNode = this.body.nodes[clusterNodeId];

    if (clusterNode === undefined) {
      throw new Error(
        "The clusterNodeId supplied to openCluster does not exist."
      );
    }
    if (
      clusterNode.isCluster !== true ||
      clusterNode.containedNodes === undefined ||
      clusterNode.containedEdges === undefined
    ) {
      throw new Error("The node:" + clusterNodeId + " is not a valid cluster.");
    }

    // Check if current cluster is clustered itself
    const stack = this.findNode(clusterNodeId);
    const parentIndex = stack.indexOf(clusterNodeId) - 1;
    if (parentIndex >= 0) {
      // Current cluster is clustered; transfer contained nodes and edges to parent
      const parentClusterNodeId = stack[parentIndex];
      const parentClusterNode = this.body.nodes[parentClusterNodeId];

      // clustering.clusteredNodes and clustering.clusteredEdges remain unchanged
      parentClusterNode._openChildCluster(clusterNodeId);

      // All components of child cluster node have been transferred. It can die now.
      delete this.body.nodes[clusterNodeId];
      if (refreshData === true) {
        this.body.emitter.emit("_dataChanged");
      }

      return;
    }

    // main body
    const containedNodes = clusterNode.containedNodes;
    const containedEdges = clusterNode.containedEdges;

    // allow the user to position the nodes after release.
    if (
      options !== undefined &&
      options.releaseFunction !== undefined &&
      typeof options.releaseFunction === "function"
    ) {
      const positions = {};
      const clusterPosition = { x: clusterNode.x, y: clusterNode.y };
      for (const nodeId in containedNodes) {
        if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
          const containedNode = this.body.nodes[nodeId];
          positions[nodeId] = { x: containedNode.x, y: containedNode.y };
        }
      }
      const newPositions = options.releaseFunction(clusterPosition, positions);

      for (const nodeId in containedNodes) {
        if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
          const containedNode = this.body.nodes[nodeId];
          if (newPositions[nodeId] !== undefined) {
            containedNode.x =
              newPositions[nodeId].x === undefined
                ? clusterNode.x
                : newPositions[nodeId].x;
            containedNode.y =
              newPositions[nodeId].y === undefined
                ? clusterNode.y
                : newPositions[nodeId].y;
          }
        }
      }
    } else {
      // copy the position from the cluster
      forEach(containedNodes, function (containedNode) {
        // inherit position
        if (containedNode.options.fixed.x === false) {
          containedNode.x = clusterNode.x;
        }
        if (containedNode.options.fixed.y === false) {
          containedNode.y = clusterNode.y;
        }
      });
    }

    // release nodes
    for (const nodeId in containedNodes) {
      if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
        const containedNode = this.body.nodes[nodeId];

        // inherit speed
        containedNode.vx = clusterNode.vx;
        containedNode.vy = clusterNode.vy;

        containedNode.setOptions({ physics: true });

        delete this.clusteredNodes[nodeId];
      }
    }

    // copy the clusterNode edges because we cannot iterate over an object that we add or remove from.
    const edgesToBeDeleted = [];
    for (let i = 0; i < clusterNode.edges.length; i++) {
      edgesToBeDeleted.push(clusterNode.edges[i]);
    }

    // actually handling the deleting.
    for (let i = 0; i < edgesToBeDeleted.length; i++) {
      const edge = edgesToBeDeleted[i];
      const otherNodeId = this._getConnectedId(edge, clusterNodeId);
      const otherNode = this.clusteredNodes[otherNodeId];

      for (let j = 0; j < edge.clusteringEdgeReplacingIds.length; j++) {
        const transferId = edge.clusteringEdgeReplacingIds[j];
        const transferEdge = this.body.edges[transferId];
        if (transferEdge === undefined) continue;

        // if the other node is in another cluster, we transfer ownership of this edge to the other cluster
        if (otherNode !== undefined) {
          // transfer ownership:
          const otherCluster = this.body.nodes[otherNode.clusterId];
          otherCluster.containedEdges[transferEdge.id] = transferEdge;

          // delete local reference
          delete containedEdges[transferEdge.id];

          // get to and from
          let fromId = transferEdge.fromId;
          let toId = transferEdge.toId;
          if (transferEdge.toId == otherNodeId) {
            toId = otherNode.clusterId;
          } else {
            fromId = otherNode.clusterId;
          }

          // create new cluster edge from the otherCluster
          this._createClusteredEdge(
            fromId,
            toId,
            transferEdge,
            otherCluster.clusterEdgeProperties,
            { hidden: false, physics: true }
          );
        } else {
          this._restoreEdge(transferEdge);
        }
      }

      edge.remove();
    }

    // handle the releasing of the edges
    for (const edgeId in containedEdges) {
      if (Object.prototype.hasOwnProperty.call(containedEdges, edgeId)) {
        this._restoreEdge(containedEdges[edgeId]);
      }
    }

    // remove clusterNode
    delete this.body.nodes[clusterNodeId];

    if (refreshData === true) {
      this.body.emitter.emit("_dataChanged");
    }
  }

  /**
   *
   * @param {Cluster.id} clusterId
   * @returns {Array.<Node.id>}
   */
  getNodesInCluster(clusterId) {
    const nodesArray = [];
    if (this.isCluster(clusterId) === true) {
      const containedNodes = this.body.nodes[clusterId].containedNodes;
      for (const nodeId in containedNodes) {
        if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
          nodesArray.push(this.body.nodes[nodeId].id);
        }
      }
    }

    return nodesArray;
  }

  /**
   * Get the stack clusterId's that a certain node resides in. cluster A -> cluster B -> cluster C -> node
   *
   * If a node can't be found in the chain, return an empty array.
   *
   * @param {string|number} nodeId
   * @returns {Array}
   */
  findNode(nodeId) {
    const stack = [];
    const max = 100;
    let counter = 0;
    let node;

    while (this.clusteredNodes[nodeId] !== undefined && counter < max) {
      node = this.body.nodes[nodeId];
      if (node === undefined) return [];
      stack.push(node.id);

      nodeId = this.clusteredNodes[nodeId].clusterId;
      counter++;
    }

    node = this.body.nodes[nodeId];
    if (node === undefined) return [];
    stack.push(node.id);

    stack.reverse();
    return stack;
  }

  /**
   * Using a clustered nodeId, update with the new options
   *
   * @param {Node.id} clusteredNodeId
   * @param {object} newOptions
   */
  updateClusteredNode(clusteredNodeId, newOptions) {
    if (clusteredNodeId === undefined) {
      throw new Error("No clusteredNodeId supplied to updateClusteredNode.");
    }
    if (newOptions === undefined) {
      throw new Error("No newOptions supplied to updateClusteredNode.");
    }
    if (this.body.nodes[clusteredNodeId] === undefined) {
      throw new Error(
        "The clusteredNodeId supplied to updateClusteredNode does not exist."
      );
    }

    this.body.nodes[clusteredNodeId].setOptions(newOptions);
    this.body.emitter.emit("_dataChanged");
  }

  /**
   * Using a base edgeId, update all related clustered edges with the new options
   *
   * @param {vis.Edge.id} startEdgeId
   * @param {object} newOptions
   */
  updateEdge(startEdgeId, newOptions) {
    if (startEdgeId === undefined) {
      throw new Error("No startEdgeId supplied to updateEdge.");
    }
    if (newOptions === undefined) {
      throw new Error("No newOptions supplied to updateEdge.");
    }
    if (this.body.edges[startEdgeId] === undefined) {
      throw new Error("The startEdgeId supplied to updateEdge does not exist.");
    }

    const allEdgeIds = this.getClusteredEdges(startEdgeId);
    for (let i = 0; i < allEdgeIds.length; i++) {
      const edge = this.body.edges[allEdgeIds[i]];
      edge.setOptions(newOptions);
    }
    this.body.emitter.emit("_dataChanged");
  }

  /**
   * Get a stack of clusterEdgeId's (+base edgeid) that a base edge is the same as. cluster edge C -> cluster edge B -> cluster edge A -> base edge(edgeId)
   *
   * @param {vis.Edge.id} edgeId
   * @returns {Array.<vis.Edge.id>}
   */
  getClusteredEdges(edgeId) {
    const stack = [];
    const max = 100;
    let counter = 0;

    while (
      edgeId !== undefined &&
      this.body.edges[edgeId] !== undefined &&
      counter < max
    ) {
      stack.push(this.body.edges[edgeId].id);
      edgeId = this.body.edges[edgeId].edgeReplacedById;
      counter++;
    }
    stack.reverse();
    return stack;
  }

  /**
   * Get the base edge id of clusterEdgeId. cluster edge (clusteredEdgeId) -> cluster edge B -> cluster edge C -> base edge
   *
   * @param {vis.Edge.id} clusteredEdgeId
   * @returns {vis.Edge.id} baseEdgeId
   *
   * TODO: deprecate in 5.0.0. Method getBaseEdges() is the correct one to use.
   */
  getBaseEdge(clusteredEdgeId) {
    // Just kludge this by returning the first base edge id found
    return this.getBaseEdges(clusteredEdgeId)[0];
  }

  /**
   * Get all regular edges for this clustered edge id.
   *
   * @param {vis.Edge.id} clusteredEdgeId
   * @returns {Array.<vis.Edge.id>} all baseEdgeId's under this clustered edge
   */
  getBaseEdges(clusteredEdgeId) {
    const IdsToHandle = [clusteredEdgeId];
    const doneIds = [];
    const foundIds = [];
    const max = 100;
    let counter = 0;

    while (IdsToHandle.length > 0 && counter < max) {
      const nextId = IdsToHandle.pop();
      if (nextId === undefined) continue; // Paranoia here and onwards
      const nextEdge = this.body.edges[nextId];
      if (nextEdge === undefined) continue;
      counter++;

      const replacingIds = nextEdge.clusteringEdgeReplacingIds;
      if (replacingIds === undefined) {
        // nextId is a base id
        foundIds.push(nextId);
      } else {
        // Another cluster edge, unravel this one as well
        for (let i = 0; i < replacingIds.length; ++i) {
          const replacingId = replacingIds[i];

          // Don't add if already handled
          // TODO: never triggers; find a test-case which does
          if (
            IdsToHandle.indexOf(replacingIds) !== -1 ||
            doneIds.indexOf(replacingIds) !== -1
          ) {
            continue;
          }

          IdsToHandle.push(replacingId);
        }
      }

      doneIds.push(nextId);
    }

    return foundIds;
  }

  /**
   * Get the Id the node is connected to
   *
   * @param {vis.Edge} edge
   * @param {Node.id} nodeId
   * @returns {*}
   * @private
   */
  _getConnectedId(edge, nodeId) {
    if (edge.toId != nodeId) {
      return edge.toId;
    } else if (edge.fromId != nodeId) {
      return edge.fromId;
    } else {
      return edge.fromId;
    }
  }

  /**
   * We determine how many connections denote an important hub.
   * We take the mean + 2*std as the important hub size. (Assuming a normal distribution of data, ~2.2%)
   *
   * @returns {number}
   * @private
   */
  _getHubSize() {
    let average = 0;
    let averageSquared = 0;
    let hubCounter = 0;
    let largestHub = 0;

    for (let i = 0; i < this.body.nodeIndices.length; i++) {
      const node = this.body.nodes[this.body.nodeIndices[i]];
      if (node.edges.length > largestHub) {
        largestHub = node.edges.length;
      }
      average += node.edges.length;
      averageSquared += Math.pow(node.edges.length, 2);
      hubCounter += 1;
    }
    average = average / hubCounter;
    averageSquared = averageSquared / hubCounter;

    const variance = averageSquared - Math.pow(average, 2);
    const standardDeviation = Math.sqrt(variance);

    let hubThreshold = Math.floor(average + 2 * standardDeviation);

    // always have at least one to cluster
    if (hubThreshold > largestHub) {
      hubThreshold = largestHub;
    }

    return hubThreshold;
  }

  /**
   * Create an edge for the cluster representation.
   *
   * @param {Node.id} fromId
   * @param {Node.id} toId
   * @param {vis.Edge} baseEdge
   * @param {object} clusterEdgeProperties
   * @param {object} extraOptions
   * @returns {Edge} newly created clustered edge
   * @private
   */
  _createClusteredEdge(
    fromId,
    toId,
    baseEdge,
    clusterEdgeProperties,
    extraOptions
  ) {
    // copy the options of the edge we will replace
    const clonedOptions = NetworkUtil.cloneOptions(baseEdge, "edge");
    // make sure the properties of clusterEdges are superimposed on it
    deepExtend(clonedOptions, clusterEdgeProperties);

    // set up the edge
    clonedOptions.from = fromId;
    clonedOptions.to = toId;
    clonedOptions.id = "clusterEdge:" + v4();

    // apply the edge specific options to it if specified
    if (extraOptions !== undefined) {
      deepExtend(clonedOptions, extraOptions);
    }

    const newEdge = this.body.functions.createEdge(clonedOptions);
    newEdge.clusteringEdgeReplacingIds = [baseEdge.id];
    newEdge.connect();

    // Register the new edge
    this.body.edges[newEdge.id] = newEdge;

    return newEdge;
  }

  /**
   * Add the passed child nodes and edges to the given cluster node.
   *
   * @param {object | Node} childNodes  hash of nodes or single node to add in cluster
   * @param {object | Edge} childEdges  hash of edges or single edge to take into account when clustering
   * @param {Node} clusterNode  cluster node to add nodes and edges to
   * @param {object} [clusterEdgeProperties]
   * @private
   */
  _clusterEdges(childNodes, childEdges, clusterNode, clusterEdgeProperties) {
    if (childEdges instanceof Edge) {
      const edge = childEdges;
      const obj = {};
      obj[edge.id] = edge;
      childEdges = obj;
    }

    if (childNodes instanceof Node) {
      const node = childNodes;
      const obj = {};
      obj[node.id] = node;
      childNodes = obj;
    }

    if (clusterNode === undefined || clusterNode === null) {
      throw new Error("_clusterEdges: parameter clusterNode required");
    }

    if (clusterEdgeProperties === undefined) {
      // Take the required properties from the cluster node
      clusterEdgeProperties = clusterNode.clusterEdgeProperties;
    }

    // create the new edges that will connect to the cluster.
    // All self-referencing edges will be added to childEdges here.
    this._createClusterEdges(
      childNodes,
      childEdges,
      clusterNode,
      clusterEdgeProperties
    );

    // disable the childEdges
    for (const edgeId in childEdges) {
      if (Object.prototype.hasOwnProperty.call(childEdges, edgeId)) {
        if (this.body.edges[edgeId] !== undefined) {
          const edge = this.body.edges[edgeId];
          // cache the options before changing
          this._backupEdgeOptions(edge);
          // disable physics and hide the edge
          edge.setOptions({ physics: false });
        }
      }
    }

    // disable the childNodes
    for (const nodeId in childNodes) {
      if (Object.prototype.hasOwnProperty.call(childNodes, nodeId)) {
        this.clusteredNodes[nodeId] = {
          clusterId: clusterNode.id,
          node: this.body.nodes[nodeId],
        };
        this.body.nodes[nodeId].setOptions({ physics: false });
      }
    }
  }

  /**
   * Determine in which cluster given nodeId resides.
   *
   * If not in cluster, return undefined.
   *
   * NOTE: If you know a cleaner way to do this, please enlighten me (wimrijnders).
   *
   * @param {Node.id} nodeId
   * @returns {Node|undefined} Node instance for cluster, if present
   * @private
   */
  _getClusterNodeForNode(nodeId) {
    if (nodeId === undefined) return undefined;
    const clusteredNode = this.clusteredNodes[nodeId];

    // NOTE: If no cluster info found, it should actually be an error
    if (clusteredNode === undefined) return undefined;
    const clusterId = clusteredNode.clusterId;
    if (clusterId === undefined) return undefined;

    return this.body.nodes[clusterId];
  }

  /**
   * Internal helper function for conditionally removing items in array
   *
   * Done like this because Array.filter() is not fully supported by all IE's.
   *
   * @param {Array} arr
   * @param {Function} callback
   * @returns {Array}
   * @private
   */
  _filter(arr, callback) {
    const ret = [];

    forEach(arr, (item) => {
      if (callback(item)) {
        ret.push(item);
      }
    });

    return ret;
  }

  /**
   * Scan all edges for changes in clustering and adjust this if necessary.
   *
   * Call this (internally) after there has been a change in node or edge data.
   *
   * Pre: States of this.body.nodes and this.body.edges consistent
   * Pre: this.clusteredNodes and this.clusteredEdge consistent with containedNodes and containedEdges
   *      of cluster nodes.
   */
  _updateState() {
    let nodeId;
    const deletedNodeIds = [];
    const deletedEdgeIds = {};

    /**
     * Utility function to iterate over clustering nodes only
     *
     * @param {Function} callback  function to call for each cluster node
     */
    const eachClusterNode = (callback) => {
      forEach(this.body.nodes, (node) => {
        if (node.isCluster === true) {
          callback(node);
        }
      });
    };

    //
    // Remove deleted regular nodes from clustering
    //

    // Determine the deleted nodes
    for (nodeId in this.clusteredNodes) {
      if (!Object.prototype.hasOwnProperty.call(this.clusteredNodes, nodeId))
        continue;
      const node = this.body.nodes[nodeId];

      if (node === undefined) {
        deletedNodeIds.push(nodeId);
      }
    }

    // Remove nodes from cluster nodes
    eachClusterNode(function (clusterNode) {
      for (let n = 0; n < deletedNodeIds.length; n++) {
        delete clusterNode.containedNodes[deletedNodeIds[n]];
      }
    });

    // Remove nodes from cluster list
    for (let n = 0; n < deletedNodeIds.length; n++) {
      delete this.clusteredNodes[deletedNodeIds[n]];
    }

    //
    // Remove deleted edges from clustering
    //

    // Add the deleted clustered edges to the list
    forEach(this.clusteredEdges, (edgeId) => {
      const edge = this.body.edges[edgeId];
      if (edge === undefined || !edge.endPointsValid()) {
        deletedEdgeIds[edgeId] = edgeId;
      }
    });

    // Cluster nodes can also contain edges which are not clustered,
    // i.e. nodes 1-2 within cluster with an edge in between.
    // So the cluster nodes also need to be scanned for invalid edges
    eachClusterNode(function (clusterNode) {
      forEach(clusterNode.containedEdges, (edge, edgeId) => {
        if (!edge.endPointsValid() && !deletedEdgeIds[edgeId]) {
          deletedEdgeIds[edgeId] = edgeId;
        }
      });
    });

    // Also scan for cluster edges which need to be removed in the active list.
    // Regular edges have been removed beforehand, so this only picks up the cluster edges.
    forEach(this.body.edges, (edge, edgeId) => {
      // Explicitly scan the contained edges for validity
      let isValid = true;
      const replacedIds = edge.clusteringEdgeReplacingIds;
      if (replacedIds !== undefined) {
        let numValid = 0;

        forEach(replacedIds, (containedEdgeId) => {
          const containedEdge = this.body.edges[containedEdgeId];

          if (containedEdge !== undefined && containedEdge.endPointsValid()) {
            numValid += 1;
          }
        });

        isValid = numValid > 0;
      }

      if (!edge.endPointsValid() || !isValid) {
        deletedEdgeIds[edgeId] = edgeId;
      }
    });

    // Remove edges from cluster nodes
    eachClusterNode((clusterNode) => {
      forEach(deletedEdgeIds, (deletedEdgeId) => {
        delete clusterNode.containedEdges[deletedEdgeId];

        forEach(clusterNode.edges, (edge, m) => {
          if (edge.id === deletedEdgeId) {
            clusterNode.edges[m] = null; // Don't want to directly delete here, because in the loop
            return;
          }

          edge.clusteringEdgeReplacingIds = this._filter(
            edge.clusteringEdgeReplacingIds,
            function (id) {
              return !deletedEdgeIds[id];
            }
          );
        });

        // Clean up the nulls
        clusterNode.edges = this._filter(clusterNode.edges, function (item) {
          return item !== null;
        });
      });
    });

    // Remove from cluster list
    forEach(deletedEdgeIds, (edgeId) => {
      delete this.clusteredEdges[edgeId];
    });

    // Remove cluster edges from active list (this.body.edges).
    // deletedEdgeIds still contains id of regular edges, but these should all
    // be gone when you reach here.
    forEach(deletedEdgeIds, (edgeId) => {
      delete this.body.edges[edgeId];
    });

    //
    // Check changed cluster state of edges
    //

    // Iterating over keys here, because edges may be removed in the loop
    const ids = Object.keys(this.body.edges);
    forEach(ids, (edgeId) => {
      const edge = this.body.edges[edgeId];

      const shouldBeClustered =
        this._isClusteredNode(edge.fromId) || this._isClusteredNode(edge.toId);
      if (shouldBeClustered === this._isClusteredEdge(edge.id)) {
        return; // all is well
      }

      if (shouldBeClustered) {
        // add edge to clustering
        const clusterFrom = this._getClusterNodeForNode(edge.fromId);
        if (clusterFrom !== undefined) {
          this._clusterEdges(this.body.nodes[edge.fromId], edge, clusterFrom);
        }

        const clusterTo = this._getClusterNodeForNode(edge.toId);
        if (clusterTo !== undefined) {
          this._clusterEdges(this.body.nodes[edge.toId], edge, clusterTo);
        }

        // TODO: check that it works for both edges clustered
        //       (This might be paranoia)
      } else {
        delete this._clusterEdges[edgeId];
        this._restoreEdge(edge);
        // This should not be happening, the state should
        // be properly updated at this point.
        //
        // If it *is* reached during normal operation, then we have to implement
        // undo clustering for this edge here.
        // throw new Error('remove edge from clustering not implemented!')
      }
    });

    // Clusters may be nested to any level. Keep on opening until nothing to open
    let changed = false;
    let continueLoop = true;
    while (continueLoop) {
      const clustersToOpen = [];

      // Determine the id's of clusters that need opening
      eachClusterNode(function (clusterNode) {
        const numNodes = Object.keys(clusterNode.containedNodes).length;
        const allowSingle = clusterNode.options.allowSingleNodeCluster === true;
        if ((allowSingle && numNodes < 1) || (!allowSingle && numNodes < 2)) {
          clustersToOpen.push(clusterNode.id);
        }
      });

      // Open them
      for (let n = 0; n < clustersToOpen.length; ++n) {
        this.openCluster(
          clustersToOpen[n],
          {},
          false /* Don't refresh, we're in an refresh/update already */
        );
      }

      continueLoop = clustersToOpen.length > 0;
      changed = changed || continueLoop;
    }

    if (changed) {
      this._updateState(); // Redo this method (recursion possible! should be safe)
    }
  }

  /**
   * Determine if node with given id is part of a cluster.
   *
   * @param {Node.id} nodeId
   * @returns {boolean} true if part of a cluster.
   */
  _isClusteredNode(nodeId) {
    return this.clusteredNodes[nodeId] !== undefined;
  }

  /**
   * Determine if edge with given id is not visible due to clustering.
   *
   * An edge is considered clustered if:
   * - it is directly replaced by a clustering edge
   * - any of its connecting nodes is in a cluster
   *
   * @param {vis.Edge.id} edgeId
   * @returns {boolean} true if part of a cluster.
   */
  _isClusteredEdge(edgeId) {
    return this.clusteredEdges[edgeId] !== undefined;
  }
}

/**
 * Initializes window.requestAnimationFrame() to a usable form.
 *
 * Specifically, set up this method for the case of running on node.js with jsdom enabled.
 *
 * NOTES:
 *
 * On node.js, when calling this directly outside of this class, `window` is not defined.
 *   This happens even if jsdom is used.
 * For node.js + jsdom, `window` is available at the moment the constructor is called.
 *   For this reason, the called is placed within the constructor.
 * Even then, `window.requestAnimationFrame()` is not defined, so it still needs to be added.
 * During unit testing, it happens that the window object is reset during execution, causing
 *   a runtime error due to missing `requestAnimationFrame()`. This needs to be compensated for,
 *   see `_requestNextFrame()`.
 * Since this is a global object, it may affect other modules besides `Network`. With normal
 *   usage, this does not cause any problems. During unit testing, errors may occur. These have
 *   been compensated for, see comment block in _requestNextFrame().
 *
 * @private
 */
function _initRequestAnimationFrame() {
  let func;

  if (window !== undefined) {
    func =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;
  }

  if (func === undefined) {
    // window or method not present, setting mock requestAnimationFrame
    window.requestAnimationFrame = function (callback) {
      //console.log("Called mock requestAnimationFrame");
      callback();
    };
  } else {
    window.requestAnimationFrame = func;
  }
}

/**
 * The canvas renderer
 */
class CanvasRenderer {
  /**
   * @param {object} body
   * @param {Canvas} canvas
   */
  constructor(body, canvas) {
    _initRequestAnimationFrame();
    this.body = body;
    this.canvas = canvas;

    this.redrawRequested = false;
    this.renderTimer = undefined;
    this.requiresTimeout = true;
    this.renderingActive = false;
    this.renderRequests = 0;
    this.allowRedraw = true;

    this.dragging = false;
    this.zooming = false;
    this.options = {};
    this.defaultOptions = {
      hideEdgesOnDrag: false,
      hideEdgesOnZoom: false,
      hideNodesOnDrag: false,
    };
    Object.assign(this.options, this.defaultOptions);

    this._determineBrowserMethod();
    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    this.body.emitter.on("dragStart", () => {
      this.dragging = true;
    });
    this.body.emitter.on("dragEnd", () => {
      this.dragging = false;
    });
    this.body.emitter.on("zoom", () => {
      this.zooming = true;
      window.clearTimeout(this.zoomTimeoutId);
      this.zoomTimeoutId = window.setTimeout(() => {
        this.zooming = false;
        this._requestRedraw.bind(this)();
      }, 250);
    });
    this.body.emitter.on("_resizeNodes", () => {
      this._resizeNodes();
    });
    this.body.emitter.on("_redraw", () => {
      if (this.renderingActive === false) {
        this._redraw();
      }
    });
    this.body.emitter.on("_blockRedraw", () => {
      this.allowRedraw = false;
    });
    this.body.emitter.on("_allowRedraw", () => {
      this.allowRedraw = true;
      this.redrawRequested = false;
    });
    this.body.emitter.on("_requestRedraw", this._requestRedraw.bind(this));
    this.body.emitter.on("_startRendering", () => {
      this.renderRequests += 1;
      this.renderingActive = true;
      this._startRendering();
    });
    this.body.emitter.on("_stopRendering", () => {
      this.renderRequests -= 1;
      this.renderingActive = this.renderRequests > 0;
      this.renderTimer = undefined;
    });
    this.body.emitter.on("destroy", () => {
      this.renderRequests = 0;
      this.allowRedraw = false;
      this.renderingActive = false;
      if (this.requiresTimeout === true) {
        clearTimeout(this.renderTimer);
      } else {
        window.cancelAnimationFrame(this.renderTimer);
      }
      this.body.emitter.off();
    });
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      const fields = ["hideEdgesOnDrag", "hideEdgesOnZoom", "hideNodesOnDrag"];
      selectiveDeepExtend(fields, this.options, options);
    }
  }

  /**
   * Prepare the drawing of the next frame.
   *
   * Calls the callback when the next frame can or will be drawn.
   *
   * @param {Function} callback
   * @param {number} delay - timeout case only, wait this number of milliseconds
   * @returns {Function | undefined}
   * @private
   */
  _requestNextFrame(callback, delay) {
    // During unit testing, it happens that the mock window object is reset while
    // the next frame is still pending. Then, either 'window' is not present, or
    // 'requestAnimationFrame()' is not present because it is not defined on the
    // mock window object.
    //
    // As a consequence, unrelated unit tests may appear to fail, even if the problem
    // described happens in the current unit test.
    //
    // This is not something that will happen in normal operation, but we still need
    // to take it into account.
    //
    if (typeof window === "undefined") return; // Doing `if (window === undefined)` does not work here!

    let timer;

    const myWindow = window; // Grab a reference to reduce the possibility that 'window' is reset
    // while running this method.

    if (this.requiresTimeout === true) {
      // wait given number of milliseconds and perform the animation step function
      timer = myWindow.setTimeout(callback, delay);
    } else {
      if (myWindow.requestAnimationFrame) {
        timer = myWindow.requestAnimationFrame(callback);
      }
    }

    return timer;
  }

  /**
   *
   * @private
   */
  _startRendering() {
    if (this.renderingActive === true) {
      if (this.renderTimer === undefined) {
        this.renderTimer = this._requestNextFrame(
          this._renderStep.bind(this),
          this.simulationInterval
        );
      }
    }
  }

  /**
   *
   * @private
   */
  _renderStep() {
    if (this.renderingActive === true) {
      // reset the renderTimer so a new scheduled animation step can be set
      this.renderTimer = undefined;

      if (this.requiresTimeout === true) {
        // this schedules a new simulation step
        this._startRendering();
      }

      this._redraw();

      if (this.requiresTimeout === false) {
        // this schedules a new simulation step
        this._startRendering();
      }
    }
  }

  /**
   * Redraw the network with the current data
   * chart will be resized too.
   */
  redraw() {
    this.body.emitter.emit("setSize");
    this._redraw();
  }

  /**
   * Redraw the network with the current data
   *
   * @private
   */
  _requestRedraw() {
    if (
      this.redrawRequested !== true &&
      this.renderingActive === false &&
      this.allowRedraw === true
    ) {
      this.redrawRequested = true;
      this._requestNextFrame(() => {
        this._redraw(false);
      }, 0);
    }
  }

  /**
   * Redraw the network with the current data
   *
   * @param {boolean} [hidden=false] | Used to get the first estimate of the node sizes.
   *                                   Only the nodes are drawn after which they are quickly drawn over.
   * @private
   */
  _redraw(hidden = false) {
    if (this.allowRedraw === true) {
      this.body.emitter.emit("initRedraw");

      this.redrawRequested = false;

      const drawLater = {
        drawExternalLabels: null,
      };

      // when the container div was hidden, this fixes it back up!
      if (
        this.canvas.frame.canvas.width === 0 ||
        this.canvas.frame.canvas.height === 0
      ) {
        this.canvas.setSize();
      }

      this.canvas.setTransform();

      const ctx = this.canvas.getContext();

      // clear the canvas
      const w = this.canvas.frame.canvas.clientWidth;
      const h = this.canvas.frame.canvas.clientHeight;
      ctx.clearRect(0, 0, w, h);

      // if the div is hidden, we stop the redraw here for performance.
      if (this.canvas.frame.clientWidth === 0) {
        return;
      }

      // set scaling and translation
      ctx.save();
      ctx.translate(this.body.view.translation.x, this.body.view.translation.y);
      ctx.scale(this.body.view.scale, this.body.view.scale);

      ctx.beginPath();
      this.body.emitter.emit("beforeDrawing", ctx);
      ctx.closePath();

      if (hidden === false) {
        if (
          (this.dragging === false ||
            (this.dragging === true &&
              this.options.hideEdgesOnDrag === false)) &&
          (this.zooming === false ||
            (this.zooming === true && this.options.hideEdgesOnZoom === false))
        ) {
          this._drawEdges(ctx);
        }
      }

      if (
        this.dragging === false ||
        (this.dragging === true && this.options.hideNodesOnDrag === false)
      ) {
        const { drawExternalLabels } = this._drawNodes(ctx, hidden);
        drawLater.drawExternalLabels = drawExternalLabels;
      }

      // draw the arrows last so they will be at the top
      if (hidden === false) {
        if (
          (this.dragging === false ||
            (this.dragging === true &&
              this.options.hideEdgesOnDrag === false)) &&
          (this.zooming === false ||
            (this.zooming === true && this.options.hideEdgesOnZoom === false))
        ) {
          this._drawArrows(ctx);
        }
      }

      if (drawLater.drawExternalLabels != null) {
        drawLater.drawExternalLabels();
      }

      if (hidden === false) {
        this._drawSelectionBox(ctx);
      }

      ctx.beginPath();
      this.body.emitter.emit("afterDrawing", ctx);
      ctx.closePath();

      // restore original scaling and translation
      ctx.restore();
      if (hidden === true) {
        ctx.clearRect(0, 0, w, h);
      }
    }
  }

  /**
   * Redraw all nodes
   *
   * @param {CanvasRenderingContext2D}   ctx
   * @param {boolean} [alwaysShow]
   * @private
   */
  _resizeNodes() {
    this.canvas.setTransform();
    const ctx = this.canvas.getContext();
    ctx.save();
    ctx.translate(this.body.view.translation.x, this.body.view.translation.y);
    ctx.scale(this.body.view.scale, this.body.view.scale);

    const nodes = this.body.nodes;
    let node;

    // resize all nodes
    for (const nodeId in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
        node = nodes[nodeId];
        node.resize(ctx);
        node.updateBoundingBox(ctx, node.selected);
      }
    }

    // restore original scaling and translation
    ctx.restore();
  }

  /**
   * Redraw all nodes
   *
   * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
   * @param {boolean} [alwaysShow]
   * @private
   * @returns {object} Callbacks to draw later on higher layers.
   */
  _drawNodes(ctx, alwaysShow = false) {
    const nodes = this.body.nodes;
    const nodeIndices = this.body.nodeIndices;
    let node;
    const selected = [];
    const hovered = [];
    const margin = 20;
    const topLeft = this.canvas.DOMtoCanvas({ x: -margin, y: -margin });
    const bottomRight = this.canvas.DOMtoCanvas({
      x: this.canvas.frame.canvas.clientWidth + margin,
      y: this.canvas.frame.canvas.clientHeight + margin,
    });
    const viewableArea = {
      top: topLeft.y,
      left: topLeft.x,
      bottom: bottomRight.y,
      right: bottomRight.x,
    };

    const drawExternalLabels = [];

    // draw unselected nodes;
    for (let i = 0; i < nodeIndices.length; i++) {
      node = nodes[nodeIndices[i]];
      // set selected and hovered nodes aside
      if (node.hover) {
        hovered.push(nodeIndices[i]);
      } else if (node.isSelected()) {
        selected.push(nodeIndices[i]);
      } else {
        if (alwaysShow === true) {
          const drawLater = node.draw(ctx);
          if (drawLater.drawExternalLabel != null) {
            drawExternalLabels.push(drawLater.drawExternalLabel);
          }
        } else if (node.isBoundingBoxOverlappingWith(viewableArea) === true) {
          const drawLater = node.draw(ctx);
          if (drawLater.drawExternalLabel != null) {
            drawExternalLabels.push(drawLater.drawExternalLabel);
          }
        } else {
          node.updateBoundingBox(ctx, node.selected);
        }
      }
    }

    let i;
    const selectedLength = selected.length;
    const hoveredLength = hovered.length;

    // draw the selected nodes on top
    for (i = 0; i < selectedLength; i++) {
      node = nodes[selected[i]];
      const drawLater = node.draw(ctx);
      if (drawLater.drawExternalLabel != null) {
        drawExternalLabels.push(drawLater.drawExternalLabel);
      }
    }

    // draw hovered nodes above everything else: fixes https://github.com/visjs/vis-network/issues/226
    for (i = 0; i < hoveredLength; i++) {
      node = nodes[hovered[i]];
      const drawLater = node.draw(ctx);
      if (drawLater.drawExternalLabel != null) {
        drawExternalLabels.push(drawLater.drawExternalLabel);
      }
    }

    return {
      drawExternalLabels: () => {
        for (const draw of drawExternalLabels) {
          draw();
        }
      },
    };
  }

  /**
   * Redraw all edges
   *
   * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
   * @private
   */
  _drawEdges(ctx) {
    const edges = this.body.edges;
    const edgeIndices = this.body.edgeIndices;

    for (let i = 0; i < edgeIndices.length; i++) {
      const edge = edges[edgeIndices[i]];
      if (edge.connected === true) {
        edge.draw(ctx);
      }
    }
  }

  /**
   * Redraw all arrows
   *
   * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
   * @private
   */
  _drawArrows(ctx) {
    const edges = this.body.edges;
    const edgeIndices = this.body.edgeIndices;

    for (let i = 0; i < edgeIndices.length; i++) {
      const edge = edges[edgeIndices[i]];
      if (edge.connected === true) {
        edge.drawArrows(ctx);
      }
    }
  }

  /**
   * Determine if the browser requires a setTimeout or a requestAnimationFrame. This was required because
   * some implementations (safari and IE9) did not support requestAnimationFrame
   *
   * @private
   */
  _determineBrowserMethod() {
    if (typeof window !== "undefined") {
      const browserType = navigator.userAgent.toLowerCase();
      this.requiresTimeout = false;
      if (browserType.indexOf("msie 9.0") != -1) {
        // IE 9
        this.requiresTimeout = true;
      } else if (browserType.indexOf("safari") != -1) {
        // safari
        if (browserType.indexOf("chrome") <= -1) {
          this.requiresTimeout = true;
        }
      }
    } else {
      this.requiresTimeout = true;
    }
  }

  /**
   * Redraw selection box
   *
   * @param {CanvasRenderingContext2D} ctx  2D context of a HTML canvas
   * @private
   */
  _drawSelectionBox(ctx) {
    if (this.body.selectionBox.show) {
      ctx.beginPath();
      const width =
        this.body.selectionBox.position.end.x -
        this.body.selectionBox.position.start.x;
      const height =
        this.body.selectionBox.position.end.y -
        this.body.selectionBox.position.start.y;
      ctx.rect(
        this.body.selectionBox.position.start.x,
        this.body.selectionBox.position.start.y,
        width,
        height
      );
      ctx.fillStyle = "rgba(151, 194, 252, 0.2)";
      ctx.fillRect(
        this.body.selectionBox.position.start.x,
        this.body.selectionBox.position.start.y,
        width,
        height
      );
      ctx.strokeStyle = "rgba(151, 194, 252, 1)";
      ctx.stroke();
    } else {
      ctx.closePath();
    }
  }
}

/**
 * Register a touch event, taking place before a gesture
 *
 * @param {Hammer} hammer       A hammer instance
 * @param {Function} callback   Callback, called as callback(event)
 */
function onTouch(hammer, callback) {
  callback.inputHandler = function (event) {
    if (event.isFirst) {
      callback(event);
    }
  };

  hammer.on("hammer.input", callback.inputHandler);
}

/**
 * Register a release event, taking place after a gesture
 *
 * @param {Hammer} hammer       A hammer instance
 * @param {Function} callback   Callback, called as callback(event)
 * @returns {*}
 */
function onRelease(hammer, callback) {
  callback.inputHandler = function (event) {
    if (event.isFinal) {
      callback(event);
    }
  };

  return hammer.on("hammer.input", callback.inputHandler);
}

/**
 * Create the main frame for the Network.
 * This function is executed once when a Network object is created. The frame
 * contains a canvas, and this canvas contains all objects like the axis and
 * nodes.
 */
class Canvas {
  /**
   * @param {object} body
   */
  constructor(body) {
    this.body = body;
    this.pixelRatio = 1;
    this.cameraState = {};
    this.initialized = false;
    this.canvasViewCenter = {};
    this._cleanupCallbacks = [];

    this.options = {};
    this.defaultOptions = {
      autoResize: true,
      height: "100%",
      width: "100%",
    };
    Object.assign(this.options, this.defaultOptions);

    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    // bind the events
    this.body.emitter.once("resize", (obj) => {
      if (obj.width !== 0) {
        this.body.view.translation.x = obj.width * 0.5;
      }
      if (obj.height !== 0) {
        this.body.view.translation.y = obj.height * 0.5;
      }
    });
    this.body.emitter.on("setSize", this.setSize.bind(this));
    this.body.emitter.on("destroy", () => {
      this.hammerFrame.destroy();
      this.hammer.destroy();
      this._cleanUp();
    });
  }

  /**
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      const fields = ["width", "height", "autoResize"];
      selectiveDeepExtend(fields, this.options, options);
    }

    // Automatically adapt to changing size of the container element.
    this._cleanUp();
    if (this.options.autoResize === true) {
      if (window.ResizeObserver) {
        // decent browsers, immediate reactions
        const observer = new ResizeObserver(() => {
          const changed = this.setSize();
          if (changed === true) {
            this.body.emitter.emit("_requestRedraw");
          }
        });
        const { frame } = this;

        observer.observe(frame);
        this._cleanupCallbacks.push(() => {
          observer.unobserve(frame);
        });
      } else {
        // IE11, continous polling
        const resizeTimer = setInterval(() => {
          const changed = this.setSize();
          if (changed === true) {
            this.body.emitter.emit("_requestRedraw");
          }
        }, 1000);
        this._cleanupCallbacks.push(() => {
          clearInterval(resizeTimer);
        });
      }

      // Automatically adapt to changing size of the browser.
      const resizeFunction = this._onResize.bind(this);
      window.addEventListener("resize", resizeFunction);
      this._cleanupCallbacks.push(() => {
        window.removeEventListener("resize", resizeFunction);
      });
    }
  }

  /**
   * @private
   */
  _cleanUp() {
    this._cleanupCallbacks
      .splice(0)
      .reverse()
      .forEach((callback) => {
        try {
          callback();
        } catch (error) {
          console.error(error);
        }
      });
  }

  /**
   * @private
   */
  _onResize() {
    this.setSize();
    this.body.emitter.emit("_redraw");
  }

  /**
   * Get and store the cameraState
   *
   * @param {number} [pixelRatio=this.pixelRatio]
   * @private
   */
  _getCameraState(pixelRatio = this.pixelRatio) {
    if (this.initialized === true) {
      this.cameraState.previousWidth = this.frame.canvas.width / pixelRatio;
      this.cameraState.previousHeight = this.frame.canvas.height / pixelRatio;
      this.cameraState.scale = this.body.view.scale;
      this.cameraState.position = this.DOMtoCanvas({
        x: (0.5 * this.frame.canvas.width) / pixelRatio,
        y: (0.5 * this.frame.canvas.height) / pixelRatio,
      });
    }
  }

  /**
   * Set the cameraState
   *
   * @private
   */
  _setCameraState() {
    if (
      this.cameraState.scale !== undefined &&
      this.frame.canvas.clientWidth !== 0 &&
      this.frame.canvas.clientHeight !== 0 &&
      this.pixelRatio !== 0 &&
      this.cameraState.previousWidth > 0 &&
      this.cameraState.previousHeight > 0
    ) {
      const widthRatio =
        this.frame.canvas.width /
        this.pixelRatio /
        this.cameraState.previousWidth;
      const heightRatio =
        this.frame.canvas.height /
        this.pixelRatio /
        this.cameraState.previousHeight;
      let newScale = this.cameraState.scale;

      if (widthRatio != 1 && heightRatio != 1) {
        newScale = this.cameraState.scale * 0.5 * (widthRatio + heightRatio);
      } else if (widthRatio != 1) {
        newScale = this.cameraState.scale * widthRatio;
      } else if (heightRatio != 1) {
        newScale = this.cameraState.scale * heightRatio;
      }

      this.body.view.scale = newScale;
      // this comes from the view module.
      const currentViewCenter = this.DOMtoCanvas({
        x: 0.5 * this.frame.canvas.clientWidth,
        y: 0.5 * this.frame.canvas.clientHeight,
      });

      const distanceFromCenter = {
        // offset from view, distance view has to change by these x and y to center the node
        x: currentViewCenter.x - this.cameraState.position.x,
        y: currentViewCenter.y - this.cameraState.position.y,
      };
      this.body.view.translation.x +=
        distanceFromCenter.x * this.body.view.scale;
      this.body.view.translation.y +=
        distanceFromCenter.y * this.body.view.scale;
    }
  }

  /**
   *
   * @param {number|string} value
   * @returns {string}
   * @private
   */
  _prepareValue(value) {
    if (typeof value === "number") {
      return value + "px";
    } else if (typeof value === "string") {
      if (value.indexOf("%") !== -1 || value.indexOf("px") !== -1) {
        return value;
      } else if (value.indexOf("%") === -1) {
        return value + "px";
      }
    }
    throw new Error(
      "Could not use the value supplied for width or height:" + value
    );
  }

  /**
   * Create the HTML
   */
  _create() {
    // remove all elements from the container element.
    while (this.body.container.hasChildNodes()) {
      this.body.container.removeChild(this.body.container.firstChild);
    }

    this.frame = document.createElement("div");
    this.frame.className = "vis-network";
    this.frame.style.position = "relative";
    this.frame.style.overflow = "hidden";
    this.frame.tabIndex = 0; // tab index is required for keycharm to bind keystrokes to the div instead of the window

    //////////////////////////////////////////////////////////////////

    this.frame.canvas = document.createElement("canvas");
    this.frame.canvas.style.position = "relative";
    this.frame.appendChild(this.frame.canvas);

    if (!this.frame.canvas.getContext) {
      const noCanvas = document.createElement("DIV");
      noCanvas.style.color = "red";
      noCanvas.style.fontWeight = "bold";
      noCanvas.style.padding = "10px";
      noCanvas.innerText = "Error: your browser does not support HTML canvas";
      this.frame.canvas.appendChild(noCanvas);
    } else {
      this._setPixelRatio();
      this.setTransform();
    }

    // add the frame to the container element
    this.body.container.appendChild(this.frame);

    this.body.view.scale = 1;
    this.body.view.translation = {
      x: 0.5 * this.frame.canvas.clientWidth,
      y: 0.5 * this.frame.canvas.clientHeight,
    };

    this._bindHammer();
  }

  /**
   * This function binds hammer, it can be repeated over and over due to the uniqueness check.
   *
   * @private
   */
  _bindHammer() {
    if (this.hammer !== undefined) {
      this.hammer.destroy();
    }
    this.drag = {};
    this.pinch = {};

    // init hammer
    this.hammer = new Hammer(this.frame.canvas);
    this.hammer.get("pinch").set({ enable: true });
    // enable to get better response, todo: test on mobile.
    this.hammer
      .get("pan")
      .set({ threshold: 5, direction: Hammer.DIRECTION_ALL });

    onTouch(this.hammer, (event) => {
      this.body.eventListeners.onTouch(event);
    });
    this.hammer.on("tap", (event) => {
      this.body.eventListeners.onTap(event);
    });
    this.hammer.on("doubletap", (event) => {
      this.body.eventListeners.onDoubleTap(event);
    });
    this.hammer.on("press", (event) => {
      this.body.eventListeners.onHold(event);
    });
    this.hammer.on("panstart", (event) => {
      this.body.eventListeners.onDragStart(event);
    });
    this.hammer.on("panmove", (event) => {
      this.body.eventListeners.onDrag(event);
    });
    this.hammer.on("panend", (event) => {
      this.body.eventListeners.onDragEnd(event);
    });
    this.hammer.on("pinch", (event) => {
      this.body.eventListeners.onPinch(event);
    });

    // TODO: neatly cleanup these handlers when re-creating the Canvas, IF these are done with hammer, event.stopPropagation will not work?
    this.frame.canvas.addEventListener("wheel", (event) => {
      this.body.eventListeners.onMouseWheel(event);
    });

    this.frame.canvas.addEventListener("mousemove", (event) => {
      this.body.eventListeners.onMouseMove(event);
    });
    this.frame.canvas.addEventListener("contextmenu", (event) => {
      this.body.eventListeners.onContext(event);
    });

    this.hammerFrame = new Hammer(this.frame);
    onRelease(this.hammerFrame, (event) => {
      this.body.eventListeners.onRelease(event);
    });
  }

  /**
   * Set a new size for the network
   *
   * @param {string} width   Width in pixels or percentage (for example '800px'
   *                         or '50%')
   * @param {string} height  Height in pixels or percentage  (for example '400px'
   *                         or '30%')
   * @returns {boolean}
   */
  setSize(width = this.options.width, height = this.options.height) {
    width = this._prepareValue(width);
    height = this._prepareValue(height);

    let emitEvent = false;
    const oldWidth = this.frame.canvas.width;
    const oldHeight = this.frame.canvas.height;

    // update the pixel ratio
    //
    // NOTE: Comment in following is rather inconsistent; this is the ONLY place in the code
    //       where it is assumed that the pixel ratio could change at runtime.
    //       The only way I can think of this happening is a rotating screen or tablet; but then
    //       there should be a mechanism for reloading the data (TODO: check if this is present).
    //
    //       If the assumption is true (i.e. pixel ratio can change at runtime), then *all* usage
    //       of pixel ratio must be overhauled for this.
    //
    //       For the time being, I will humor the assumption here, and in the rest of the code assume it is
    //       constant.
    const previousRatio = this.pixelRatio; // we cache this because the camera state storage needs the old value
    this._setPixelRatio();

    if (
      width != this.options.width ||
      height != this.options.height ||
      this.frame.style.width != width ||
      this.frame.style.height != height
    ) {
      this._getCameraState(previousRatio);

      this.frame.style.width = width;
      this.frame.style.height = height;

      this.frame.canvas.style.width = "100%";
      this.frame.canvas.style.height = "100%";

      this.frame.canvas.width = Math.round(
        this.frame.canvas.clientWidth * this.pixelRatio
      );
      this.frame.canvas.height = Math.round(
        this.frame.canvas.clientHeight * this.pixelRatio
      );

      this.options.width = width;
      this.options.height = height;

      this.canvasViewCenter = {
        x: 0.5 * this.frame.clientWidth,
        y: 0.5 * this.frame.clientHeight,
      };

      emitEvent = true;
    } else {
      // this would adapt the width of the canvas to the width from 100% if and only if
      // there is a change.

      const newWidth = Math.round(
        this.frame.canvas.clientWidth * this.pixelRatio
      );
      const newHeight = Math.round(
        this.frame.canvas.clientHeight * this.pixelRatio
      );

      // store the camera if there is a change in size.
      if (
        this.frame.canvas.width !== newWidth ||
        this.frame.canvas.height !== newHeight
      ) {
        this._getCameraState(previousRatio);
      }

      if (this.frame.canvas.width !== newWidth) {
        this.frame.canvas.width = newWidth;
        emitEvent = true;
      }
      if (this.frame.canvas.height !== newHeight) {
        this.frame.canvas.height = newHeight;
        emitEvent = true;
      }
    }

    if (emitEvent === true) {
      this.body.emitter.emit("resize", {
        width: Math.round(this.frame.canvas.width / this.pixelRatio),
        height: Math.round(this.frame.canvas.height / this.pixelRatio),
        oldWidth: Math.round(oldWidth / this.pixelRatio),
        oldHeight: Math.round(oldHeight / this.pixelRatio),
      });

      // restore the camera on change.
      this._setCameraState();
    }

    // set initialized so the get and set camera will work from now on.
    this.initialized = true;
    return emitEvent;
  }

  /**
   *
   * @returns {CanvasRenderingContext2D}
   */
  getContext() {
    return this.frame.canvas.getContext("2d");
  }

  /**
   * Determine the pixel ratio for various browsers.
   *
   * @returns {number}
   * @private
   */
  _determinePixelRatio() {
    const ctx = this.getContext();
    if (ctx === undefined) {
      throw new Error("Could not get canvax context");
    }

    let numerator = 1;
    if (typeof window !== "undefined") {
      // (window !== undefined) doesn't work here!
      // Protection during unit tests, where 'window' can be missing
      numerator = window.devicePixelRatio || 1;
    }

    const denominator =
      ctx.webkitBackingStorePixelRatio ||
      ctx.mozBackingStorePixelRatio ||
      ctx.msBackingStorePixelRatio ||
      ctx.oBackingStorePixelRatio ||
      ctx.backingStorePixelRatio ||
      1;

    return numerator / denominator;
  }

  /**
   * Lazy determination of pixel ratio.
   *
   * @private
   */
  _setPixelRatio() {
    this.pixelRatio = this._determinePixelRatio();
  }

  /**
   * Set the transform in the contained context, based on its pixelRatio
   */
  setTransform() {
    const ctx = this.getContext();
    if (ctx === undefined) {
      throw new Error("Could not get canvax context");
    }

    ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
  }

  /**
   * Convert the X coordinate in DOM-space (coordinate point in browser relative to the container div) to
   * the X coordinate in canvas-space (the simulation sandbox, which the camera looks upon)
   *
   * @param {number} x
   * @returns {number}
   * @private
   */
  _XconvertDOMtoCanvas(x) {
    return (x - this.body.view.translation.x) / this.body.view.scale;
  }

  /**
   * Convert the X coordinate in canvas-space (the simulation sandbox, which the camera looks upon) to
   * the X coordinate in DOM-space (coordinate point in browser relative to the container div)
   *
   * @param {number} x
   * @returns {number}
   * @private
   */
  _XconvertCanvasToDOM(x) {
    return x * this.body.view.scale + this.body.view.translation.x;
  }

  /**
   * Convert the Y coordinate in DOM-space (coordinate point in browser relative to the container div) to
   * the Y coordinate in canvas-space (the simulation sandbox, which the camera looks upon)
   *
   * @param {number} y
   * @returns {number}
   * @private
   */
  _YconvertDOMtoCanvas(y) {
    return (y - this.body.view.translation.y) / this.body.view.scale;
  }

  /**
   * Convert the Y coordinate in canvas-space (the simulation sandbox, which the camera looks upon) to
   * the Y coordinate in DOM-space (coordinate point in browser relative to the container div)
   *
   * @param {number} y
   * @returns {number}
   * @private
   */
  _YconvertCanvasToDOM(y) {
    return y * this.body.view.scale + this.body.view.translation.y;
  }

  /**
   * @param {point} pos
   * @returns {point}
   */
  canvasToDOM(pos) {
    return {
      x: this._XconvertCanvasToDOM(pos.x),
      y: this._YconvertCanvasToDOM(pos.y),
    };
  }

  /**
   *
   * @param {point} pos
   * @returns {point}
   */
  DOMtoCanvas(pos) {
    return {
      x: this._XconvertDOMtoCanvas(pos.x),
      y: this._YconvertDOMtoCanvas(pos.y),
    };
  }
}

/**
 * Validate the fit options, replace missing optional values by defaults etc.
 *
 * @param rawOptions - The raw options.
 * @param allNodeIds - All node ids that will be used if nodes are omitted in
 * the raw options.
 * @returns Options with everything filled in and validated.
 */
function normalizeFitOptions(rawOptions, allNodeIds) {
    const options = Object.assign({
        nodes: allNodeIds,
        minZoomLevel: Number.MIN_VALUE,
        maxZoomLevel: 1,
    }, rawOptions ?? {});
    if (!Array.isArray(options.nodes)) {
        throw new TypeError("Nodes has to be an array of ids.");
    }
    if (options.nodes.length === 0) {
        options.nodes = allNodeIds;
    }
    if (!(typeof options.minZoomLevel === "number" && options.minZoomLevel > 0)) {
        throw new TypeError("Min zoom level has to be a number higher than zero.");
    }
    if (!(typeof options.maxZoomLevel === "number" &&
        options.minZoomLevel <= options.maxZoomLevel)) {
        throw new TypeError("Max zoom level has to be a number higher than min zoom level.");
    }
    return options;
}

/**
 * The view
 */
class View {
  /**
   * @param {object} body
   * @param {Canvas} canvas
   */
  constructor(body, canvas) {
    this.body = body;
    this.canvas = canvas;

    this.animationSpeed = 1 / this.renderRefreshRate;
    this.animationEasingFunction = "easeInOutQuint";
    this.easingTime = 0;
    this.sourceScale = 0;
    this.targetScale = 0;
    this.sourceTranslation = 0;
    this.targetTranslation = 0;
    this.lockedOnNodeId = undefined;
    this.lockedOnNodeOffset = undefined;
    this.touchTime = 0;

    this.viewFunction = undefined;

    this.body.emitter.on("fit", this.fit.bind(this));
    this.body.emitter.on("animationFinished", () => {
      this.body.emitter.emit("_stopRendering");
    });
    this.body.emitter.on("unlockNode", this.releaseNode.bind(this));
  }

  /**
   *
   * @param {object} [options={}]
   */
  setOptions(options = {}) {
    this.options = options;
  }

  /**
   * This function zooms out to fit all data on screen based on amount of nodes
   *
   * @param {object} [options={{nodes=Array}}]
   * @param options
   * @param {boolean} [initialZoom=false]  | zoom based on fitted formula or range, true = fitted, default = false;
   */
  fit(options, initialZoom = false) {
    options = normalizeFitOptions(options, this.body.nodeIndices);

    const canvasWidth = this.canvas.frame.canvas.clientWidth;
    const canvasHeight = this.canvas.frame.canvas.clientHeight;

    let range;
    let zoomLevel;
    if (canvasWidth === 0 || canvasHeight === 0) {
      // There's no point in trying to fit into zero sized canvas. This could
      // potentially even result in invalid values being computed. For example
      // for network without nodes and zero sized canvas the zoom level would
      // end up being computed as 0/0 which results in NaN. In any other case
      // this would be 0/something which is again pointless to compute.
      zoomLevel = 1;

      range = NetworkUtil.getRange(this.body.nodes, options.nodes);
    } else if (initialZoom === true) {
      // check if more than half of the nodes have a predefined position. If so, we use the range, not the approximation.
      let positionDefined = 0;
      for (const nodeId in this.body.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
          const node = this.body.nodes[nodeId];
          if (node.predefinedPosition === true) {
            positionDefined += 1;
          }
        }
      }
      if (positionDefined > 0.5 * this.body.nodeIndices.length) {
        this.fit(options, false);
        return;
      }

      range = NetworkUtil.getRange(this.body.nodes, options.nodes);

      const numberOfNodes = this.body.nodeIndices.length;
      zoomLevel = 12.662 / (numberOfNodes + 7.4147) + 0.0964822; // this is obtained from fitting a dataset from 5 points with scale levels that looked good.

      // correct for larger canvasses.
      const factor = Math.min(canvasWidth / 600, canvasHeight / 600);
      zoomLevel *= factor;
    } else {
      this.body.emitter.emit("_resizeNodes");
      range = NetworkUtil.getRange(this.body.nodes, options.nodes);

      const xDistance = Math.abs(range.maxX - range.minX) * 1.1;
      const yDistance = Math.abs(range.maxY - range.minY) * 1.1;

      const xZoomLevel = canvasWidth / xDistance;
      const yZoomLevel = canvasHeight / yDistance;

      zoomLevel = xZoomLevel <= yZoomLevel ? xZoomLevel : yZoomLevel;
    }

    if (zoomLevel > options.maxZoomLevel) {
      zoomLevel = options.maxZoomLevel;
    } else if (zoomLevel < options.minZoomLevel) {
      zoomLevel = options.minZoomLevel;
    }

    const center = NetworkUtil.findCenter(range);
    const animationOptions = {
      position: center,
      scale: zoomLevel,
      animation: options.animation,
    };
    this.moveTo(animationOptions);
  }

  // animation

  /**
   * Center a node in view.
   *
   * @param {number} nodeId
   * @param {number} [options]
   */
  focus(nodeId, options = {}) {
    if (this.body.nodes[nodeId] !== undefined) {
      const nodePosition = {
        x: this.body.nodes[nodeId].x,
        y: this.body.nodes[nodeId].y,
      };
      options.position = nodePosition;
      options.lockedOnNode = nodeId;

      this.moveTo(options);
    } else {
      console.error("Node: " + nodeId + " cannot be found.");
    }
  }

  /**
   *
   * @param {object} options  |  options.offset   = {x:number, y:number}   // offset from the center in DOM pixels
   *                          |  options.scale    = number                 // scale to move to
   *                          |  options.position = {x:number, y:number}   // position to move to
   *                          |  options.animation = {duration:number, easingFunction:String} || Boolean   // position to move to
   */
  moveTo(options) {
    if (options === undefined) {
      options = {};
      return;
    }

    if (options.offset != null) {
      if (options.offset.x != null) {
        // Coerce and verify that x is valid.
        options.offset.x = +options.offset.x;
        if (!Number.isFinite(options.offset.x)) {
          throw new TypeError(
            'The option "offset.x" has to be a finite number.'
          );
        }
      } else {
        options.offset.x = 0;
      }

      if (options.offset.y != null) {
        // Coerce and verify that y is valid.
        options.offset.y = +options.offset.y;
        if (!Number.isFinite(options.offset.y)) {
          throw new TypeError(
            'The option "offset.y" has to be a finite number.'
          );
        }
      } else {
        options.offset.x = 0;
      }
    } else {
      options.offset = {
        x: 0,
        y: 0,
      };
    }

    if (options.position != null) {
      if (options.position.x != null) {
        // Coerce and verify that x is valid.
        options.position.x = +options.position.x;
        if (!Number.isFinite(options.position.x)) {
          throw new TypeError(
            'The option "position.x" has to be a finite number.'
          );
        }
      } else {
        options.position.x = 0;
      }

      if (options.position.y != null) {
        // Coerce and verify that y is valid.
        options.position.y = +options.position.y;
        if (!Number.isFinite(options.position.y)) {
          throw new TypeError(
            'The option "position.y" has to be a finite number.'
          );
        }
      } else {
        options.position.x = 0;
      }
    } else {
      options.position = this.getViewPosition();
    }

    if (options.scale != null) {
      // Coerce and verify that the scale is valid.
      options.scale = +options.scale;
      if (!(options.scale > 0)) {
        throw new TypeError(
          'The option "scale" has to be a number greater than zero.'
        );
      }
    } else {
      options.scale = this.body.view.scale;
    }

    if (options.animation === undefined) {
      options.animation = { duration: 0 };
    }
    if (options.animation === false) {
      options.animation = { duration: 0 };
    }
    if (options.animation === true) {
      options.animation = {};
    }
    if (options.animation.duration === undefined) {
      options.animation.duration = 1000;
    } // default duration
    if (options.animation.easingFunction === undefined) {
      options.animation.easingFunction = "easeInOutQuad";
    } // default easing function

    this.animateView(options);
  }

  /**
   *
   * @param {object} options  |  options.offset   = {x:number, y:number}   // offset from the center in DOM pixels
   *                          |  options.time     = number                 // animation time in milliseconds
   *                          |  options.scale    = number                 // scale to animate to
   *                          |  options.position = {x:number, y:number}   // position to animate to
   *                          |  options.easingFunction = String           // linear, easeInQuad, easeOutQuad, easeInOutQuad,
   *                                                                       // easeInCubic, easeOutCubic, easeInOutCubic,
   *                                                                       // easeInQuart, easeOutQuart, easeInOutQuart,
   *                                                                       // easeInQuint, easeOutQuint, easeInOutQuint
   */
  animateView(options) {
    if (options === undefined) {
      return;
    }
    this.animationEasingFunction = options.animation.easingFunction;
    // release if something focussed on the node
    this.releaseNode();
    if (options.locked === true) {
      this.lockedOnNodeId = options.lockedOnNode;
      this.lockedOnNodeOffset = options.offset;
    }

    // forcefully complete the old animation if it was still running
    if (this.easingTime != 0) {
      this._transitionRedraw(true); // by setting easingtime to 1, we finish the animation.
    }

    this.sourceScale = this.body.view.scale;
    this.sourceTranslation = this.body.view.translation;
    this.targetScale = options.scale;

    // set the scale so the viewCenter is based on the correct zoom level. This is overridden in the transitionRedraw
    // but at least then we'll have the target transition
    this.body.view.scale = this.targetScale;
    const viewCenter = this.canvas.DOMtoCanvas({
      x: 0.5 * this.canvas.frame.canvas.clientWidth,
      y: 0.5 * this.canvas.frame.canvas.clientHeight,
    });

    const distanceFromCenter = {
      // offset from view, distance view has to change by these x and y to center the node
      x: viewCenter.x - options.position.x,
      y: viewCenter.y - options.position.y,
    };
    this.targetTranslation = {
      x:
        this.sourceTranslation.x +
        distanceFromCenter.x * this.targetScale +
        options.offset.x,
      y:
        this.sourceTranslation.y +
        distanceFromCenter.y * this.targetScale +
        options.offset.y,
    };

    // if the time is set to 0, don't do an animation
    if (options.animation.duration === 0) {
      if (this.lockedOnNodeId != undefined) {
        this.viewFunction = this._lockedRedraw.bind(this);
        this.body.emitter.on("initRedraw", this.viewFunction);
      } else {
        this.body.view.scale = this.targetScale;
        this.body.view.translation = this.targetTranslation;
        this.body.emitter.emit("_requestRedraw");
      }
    } else {
      this.animationSpeed =
        1 / (60 * options.animation.duration * 0.001) || 1 / 60; // 60 for 60 seconds, 0.001 for milli's
      this.animationEasingFunction = options.animation.easingFunction;

      this.viewFunction = this._transitionRedraw.bind(this);
      this.body.emitter.on("initRedraw", this.viewFunction);
      this.body.emitter.emit("_startRendering");
    }
  }

  /**
   * used to animate smoothly by hijacking the redraw function.
   *
   * @private
   */
  _lockedRedraw() {
    const nodePosition = {
      x: this.body.nodes[this.lockedOnNodeId].x,
      y: this.body.nodes[this.lockedOnNodeId].y,
    };
    const viewCenter = this.canvas.DOMtoCanvas({
      x: 0.5 * this.canvas.frame.canvas.clientWidth,
      y: 0.5 * this.canvas.frame.canvas.clientHeight,
    });
    const distanceFromCenter = {
      // offset from view, distance view has to change by these x and y to center the node
      x: viewCenter.x - nodePosition.x,
      y: viewCenter.y - nodePosition.y,
    };
    const sourceTranslation = this.body.view.translation;
    const targetTranslation = {
      x:
        sourceTranslation.x +
        distanceFromCenter.x * this.body.view.scale +
        this.lockedOnNodeOffset.x,
      y:
        sourceTranslation.y +
        distanceFromCenter.y * this.body.view.scale +
        this.lockedOnNodeOffset.y,
    };

    this.body.view.translation = targetTranslation;
  }

  /**
   * Resets state of a locked on Node
   */
  releaseNode() {
    if (this.lockedOnNodeId !== undefined && this.viewFunction !== undefined) {
      this.body.emitter.off("initRedraw", this.viewFunction);
      this.lockedOnNodeId = undefined;
      this.lockedOnNodeOffset = undefined;
    }
  }

  /**
   * @param {boolean} [finished=false]
   * @private
   */
  _transitionRedraw(finished = false) {
    this.easingTime += this.animationSpeed;
    this.easingTime = finished === true ? 1.0 : this.easingTime;

    const progress = easingFunctions[this.animationEasingFunction](
      this.easingTime
    );

    this.body.view.scale =
      this.sourceScale + (this.targetScale - this.sourceScale) * progress;
    this.body.view.translation = {
      x:
        this.sourceTranslation.x +
        (this.targetTranslation.x - this.sourceTranslation.x) * progress,
      y:
        this.sourceTranslation.y +
        (this.targetTranslation.y - this.sourceTranslation.y) * progress,
    };

    // cleanup
    if (this.easingTime >= 1.0) {
      this.body.emitter.off("initRedraw", this.viewFunction);
      this.easingTime = 0;
      if (this.lockedOnNodeId != undefined) {
        this.viewFunction = this._lockedRedraw.bind(this);
        this.body.emitter.on("initRedraw", this.viewFunction);
      }
      this.body.emitter.emit("animationFinished");
    }
  }

  /**
   *
   * @returns {number}
   */
  getScale() {
    return this.body.view.scale;
  }

  /**
   *
   * @returns {{x: number, y: number}}
   */
  getViewPosition() {
    return this.canvas.DOMtoCanvas({
      x: 0.5 * this.canvas.frame.canvas.clientWidth,
      y: 0.5 * this.canvas.frame.canvas.clientHeight,
    });
  }
}

/**
 * Navigation Handler
 */
class NavigationHandler {
  /**
   * @param {object} body
   * @param {Canvas} canvas
   */
  constructor(body, canvas) {
    this.body = body;
    this.canvas = canvas;

    this.iconsCreated = false;
    this.navigationHammers = [];
    this.boundFunctions = {};
    this.touchTime = 0;
    this.activated = false;

    this.body.emitter.on("activate", () => {
      this.activated = true;
      this.configureKeyboardBindings();
    });
    this.body.emitter.on("deactivate", () => {
      this.activated = false;
      this.configureKeyboardBindings();
    });
    this.body.emitter.on("destroy", () => {
      if (this.keycharm !== undefined) {
        this.keycharm.destroy();
      }
    });

    this.options = {};
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      this.options = options;
      this.create();
    }
  }

  /**
   * Creates or refreshes navigation and sets key bindings
   */
  create() {
    if (this.options.navigationButtons === true) {
      if (this.iconsCreated === false) {
        this.loadNavigationElements();
      }
    } else if (this.iconsCreated === true) {
      this.cleanNavigation();
    }

    this.configureKeyboardBindings();
  }

  /**
   * Cleans up previous navigation items
   */
  cleanNavigation() {
    // clean hammer bindings
    if (this.navigationHammers.length != 0) {
      for (let i = 0; i < this.navigationHammers.length; i++) {
        this.navigationHammers[i].destroy();
      }
      this.navigationHammers = [];
    }

    // clean up previous navigation items
    if (
      this.navigationDOM &&
      this.navigationDOM["wrapper"] &&
      this.navigationDOM["wrapper"].parentNode
    ) {
      this.navigationDOM["wrapper"].parentNode.removeChild(
        this.navigationDOM["wrapper"]
      );
    }

    this.iconsCreated = false;
  }

  /**
   * Creation of the navigation controls nodes. They are drawn over the rest of the nodes and are not affected by scale and translation
   * they have a triggerFunction which is called on click. If the position of the navigation controls is dependent
   * on this.frame.canvas.clientWidth or this.frame.canvas.clientHeight, we flag horizontalAlignLeft and verticalAlignTop false.
   * This means that the location will be corrected by the _relocateNavigation function on a size change of the canvas.
   *
   * @private
   */
  loadNavigationElements() {
    this.cleanNavigation();

    this.navigationDOM = {};
    const navigationDivs = [
      "up",
      "down",
      "left",
      "right",
      "zoomIn",
      "zoomOut",
      "zoomExtends",
    ];
    const navigationDivActions = [
      "_moveUp",
      "_moveDown",
      "_moveLeft",
      "_moveRight",
      "_zoomIn",
      "_zoomOut",
      "_fit",
    ];

    this.navigationDOM["wrapper"] = document.createElement("div");
    this.navigationDOM["wrapper"].className = "vis-navigation";
    this.canvas.frame.appendChild(this.navigationDOM["wrapper"]);

    for (let i = 0; i < navigationDivs.length; i++) {
      this.navigationDOM[navigationDivs[i]] = document.createElement("div");
      this.navigationDOM[navigationDivs[i]].className =
        "vis-button vis-" + navigationDivs[i];
      this.navigationDOM["wrapper"].appendChild(
        this.navigationDOM[navigationDivs[i]]
      );

      const hammer = new Hammer(this.navigationDOM[navigationDivs[i]]);
      if (navigationDivActions[i] === "_fit") {
        onTouch(hammer, this._fit.bind(this));
      } else {
        onTouch(hammer, this.bindToRedraw.bind(this, navigationDivActions[i]));
      }

      this.navigationHammers.push(hammer);
    }

    // use a hammer for the release so we do not require the one used in the rest of the network
    // the one the rest uses can be overloaded by the manipulation system.
    const hammerFrame = new Hammer(this.canvas.frame);
    onRelease(hammerFrame, () => {
      this._stopMovement();
    });
    this.navigationHammers.push(hammerFrame);

    this.iconsCreated = true;
  }

  /**
   *
   * @param {string} action
   */
  bindToRedraw(action) {
    if (this.boundFunctions[action] === undefined) {
      this.boundFunctions[action] = this[action].bind(this);
      this.body.emitter.on("initRedraw", this.boundFunctions[action]);
      this.body.emitter.emit("_startRendering");
    }
  }

  /**
   *
   * @param {string} action
   */
  unbindFromRedraw(action) {
    if (this.boundFunctions[action] !== undefined) {
      this.body.emitter.off("initRedraw", this.boundFunctions[action]);
      this.body.emitter.emit("_stopRendering");
      delete this.boundFunctions[action];
    }
  }

  /**
   * this stops all movement induced by the navigation buttons
   *
   * @private
   */
  _fit() {
    if (new Date().valueOf() - this.touchTime > 700) {
      // TODO: fix ugly hack to avoid hammer's double fireing of event (because we use release?)
      this.body.emitter.emit("fit", { duration: 700 });
      this.touchTime = new Date().valueOf();
    }
  }

  /**
   * this stops all movement induced by the navigation buttons
   *
   * @private
   */
  _stopMovement() {
    for (const boundAction in this.boundFunctions) {
      if (
        Object.prototype.hasOwnProperty.call(this.boundFunctions, boundAction)
      ) {
        this.body.emitter.off("initRedraw", this.boundFunctions[boundAction]);
        this.body.emitter.emit("_stopRendering");
      }
    }
    this.boundFunctions = {};
  }
  /**
   *
   * @private
   */
  _moveUp() {
    this.body.view.translation.y += this.options.keyboard.speed.y;
  }
  /**
   *
   * @private
   */
  _moveDown() {
    this.body.view.translation.y -= this.options.keyboard.speed.y;
  }
  /**
   *
   * @private
   */
  _moveLeft() {
    this.body.view.translation.x += this.options.keyboard.speed.x;
  }
  /**
   *
   * @private
   */
  _moveRight() {
    this.body.view.translation.x -= this.options.keyboard.speed.x;
  }
  /**
   *
   * @private
   */
  _zoomIn() {
    const scaleOld = this.body.view.scale;
    const scale = this.body.view.scale * (1 + this.options.keyboard.speed.zoom);
    const translation = this.body.view.translation;
    const scaleFrac = scale / scaleOld;
    const tx =
      (1 - scaleFrac) * this.canvas.canvasViewCenter.x +
      translation.x * scaleFrac;
    const ty =
      (1 - scaleFrac) * this.canvas.canvasViewCenter.y +
      translation.y * scaleFrac;

    this.body.view.scale = scale;
    this.body.view.translation = { x: tx, y: ty };
    this.body.emitter.emit("zoom", {
      direction: "+",
      scale: this.body.view.scale,
      pointer: null,
    });
  }

  /**
   *
   * @private
   */
  _zoomOut() {
    const scaleOld = this.body.view.scale;
    const scale = this.body.view.scale / (1 + this.options.keyboard.speed.zoom);
    const translation = this.body.view.translation;
    const scaleFrac = scale / scaleOld;
    const tx =
      (1 - scaleFrac) * this.canvas.canvasViewCenter.x +
      translation.x * scaleFrac;
    const ty =
      (1 - scaleFrac) * this.canvas.canvasViewCenter.y +
      translation.y * scaleFrac;

    this.body.view.scale = scale;
    this.body.view.translation = { x: tx, y: ty };
    this.body.emitter.emit("zoom", {
      direction: "-",
      scale: this.body.view.scale,
      pointer: null,
    });
  }

  /**
   * bind all keys using keycharm.
   */
  configureKeyboardBindings() {
    if (this.keycharm !== undefined) {
      this.keycharm.destroy();
    }

    if (this.options.keyboard.enabled === true) {
      if (this.options.keyboard.bindToWindow === true) {
        this.keycharm = keycharm({ container: window, preventDefault: true });
      } else {
        this.keycharm = keycharm({
          container: this.canvas.frame,
          preventDefault: true,
        });
      }

      this.keycharm.reset();

      if (this.activated === true) {
        this.keycharm.bind(
          "up",
          () => {
            this.bindToRedraw("_moveUp");
          },
          "keydown"
        );
        this.keycharm.bind(
          "down",
          () => {
            this.bindToRedraw("_moveDown");
          },
          "keydown"
        );
        this.keycharm.bind(
          "left",
          () => {
            this.bindToRedraw("_moveLeft");
          },
          "keydown"
        );
        this.keycharm.bind(
          "right",
          () => {
            this.bindToRedraw("_moveRight");
          },
          "keydown"
        );
        this.keycharm.bind(
          "=",
          () => {
            this.bindToRedraw("_zoomIn");
          },
          "keydown"
        );
        this.keycharm.bind(
          "num+",
          () => {
            this.bindToRedraw("_zoomIn");
          },
          "keydown"
        );
        this.keycharm.bind(
          "num-",
          () => {
            this.bindToRedraw("_zoomOut");
          },
          "keydown"
        );
        this.keycharm.bind(
          "-",
          () => {
            this.bindToRedraw("_zoomOut");
          },
          "keydown"
        );
        this.keycharm.bind(
          "[",
          () => {
            this.bindToRedraw("_zoomOut");
          },
          "keydown"
        );
        this.keycharm.bind(
          "]",
          () => {
            this.bindToRedraw("_zoomIn");
          },
          "keydown"
        );
        this.keycharm.bind(
          "pageup",
          () => {
            this.bindToRedraw("_zoomIn");
          },
          "keydown"
        );
        this.keycharm.bind(
          "pagedown",
          () => {
            this.bindToRedraw("_zoomOut");
          },
          "keydown"
        );

        this.keycharm.bind(
          "up",
          () => {
            this.unbindFromRedraw("_moveUp");
          },
          "keyup"
        );
        this.keycharm.bind(
          "down",
          () => {
            this.unbindFromRedraw("_moveDown");
          },
          "keyup"
        );
        this.keycharm.bind(
          "left",
          () => {
            this.unbindFromRedraw("_moveLeft");
          },
          "keyup"
        );
        this.keycharm.bind(
          "right",
          () => {
            this.unbindFromRedraw("_moveRight");
          },
          "keyup"
        );
        this.keycharm.bind(
          "=",
          () => {
            this.unbindFromRedraw("_zoomIn");
          },
          "keyup"
        );
        this.keycharm.bind(
          "num+",
          () => {
            this.unbindFromRedraw("_zoomIn");
          },
          "keyup"
        );
        this.keycharm.bind(
          "num-",
          () => {
            this.unbindFromRedraw("_zoomOut");
          },
          "keyup"
        );
        this.keycharm.bind(
          "-",
          () => {
            this.unbindFromRedraw("_zoomOut");
          },
          "keyup"
        );
        this.keycharm.bind(
          "[",
          () => {
            this.unbindFromRedraw("_zoomOut");
          },
          "keyup"
        );
        this.keycharm.bind(
          "]",
          () => {
            this.unbindFromRedraw("_zoomIn");
          },
          "keyup"
        );
        this.keycharm.bind(
          "pageup",
          () => {
            this.unbindFromRedraw("_zoomIn");
          },
          "keyup"
        );
        this.keycharm.bind(
          "pagedown",
          () => {
            this.unbindFromRedraw("_zoomOut");
          },
          "keyup"
        );
      }
    }
  }
}

/**
 * Handler for interactions
 */
class InteractionHandler {
  /**
   * @param {object} body
   * @param {Canvas} canvas
   * @param {SelectionHandler} selectionHandler
   */
  constructor(body, canvas, selectionHandler) {
    this.body = body;
    this.canvas = canvas;
    this.selectionHandler = selectionHandler;
    this.navigationHandler = new NavigationHandler(body, canvas);

    // bind the events from hammer to functions in this object
    this.body.eventListeners.onTap = this.onTap.bind(this);
    this.body.eventListeners.onTouch = this.onTouch.bind(this);
    this.body.eventListeners.onDoubleTap = this.onDoubleTap.bind(this);
    this.body.eventListeners.onHold = this.onHold.bind(this);
    this.body.eventListeners.onDragStart = this.onDragStart.bind(this);
    this.body.eventListeners.onDrag = this.onDrag.bind(this);
    this.body.eventListeners.onDragEnd = this.onDragEnd.bind(this);
    this.body.eventListeners.onMouseWheel = this.onMouseWheel.bind(this);
    this.body.eventListeners.onPinch = this.onPinch.bind(this);
    this.body.eventListeners.onMouseMove = this.onMouseMove.bind(this);
    this.body.eventListeners.onRelease = this.onRelease.bind(this);
    this.body.eventListeners.onContext = this.onContext.bind(this);

    this.touchTime = 0;
    this.drag = {};
    this.pinch = {};
    this.popup = undefined;
    this.popupObj = undefined;
    this.popupTimer = undefined;

    this.body.functions.getPointer = this.getPointer.bind(this);

    this.options = {};
    this.defaultOptions = {
      dragNodes: true,
      dragView: true,
      hover: false,
      keyboard: {
        enabled: false,
        speed: { x: 10, y: 10, zoom: 0.02 },
        bindToWindow: true,
        autoFocus: true,
      },
      navigationButtons: false,
      tooltipDelay: 300,
      zoomView: true,
      zoomSpeed: 1,
    };
    Object.assign(this.options, this.defaultOptions);

    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    this.body.emitter.on("destroy", () => {
      clearTimeout(this.popupTimer);
      delete this.body.functions.getPointer;
    });
  }

  /**
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options !== undefined) {
      // extend all but the values in fields
      const fields = [
        "hideEdgesOnDrag",
        "hideEdgesOnZoom",
        "hideNodesOnDrag",
        "keyboard",
        "multiselect",
        "selectable",
        "selectConnectedEdges",
      ];
      selectiveNotDeepExtend(fields, this.options, options);

      // merge the keyboard options in.
      mergeOptions(this.options, options, "keyboard");

      if (options.tooltip) {
        Object.assign(this.options.tooltip, options.tooltip);
        if (options.tooltip.color) {
          this.options.tooltip.color = parseColor(options.tooltip.color);
        }
      }
    }

    this.navigationHandler.setOptions(this.options);
  }

  /**
   * Get the pointer location from a touch location
   *
   * @param {{x: number, y: number}} touch
   * @returns {{x: number, y: number}} pointer
   * @private
   */
  getPointer(touch) {
    return {
      x: touch.x - getAbsoluteLeft(this.canvas.frame.canvas),
      y: touch.y - getAbsoluteTop(this.canvas.frame.canvas),
    };
  }

  /**
   * On start of a touch gesture, store the pointer
   *
   * @param {Event}  event   The event
   * @private
   */
  onTouch(event) {
    if (new Date().valueOf() - this.touchTime > 50) {
      this.drag.pointer = this.getPointer(event.center);
      this.drag.pinched = false;
      this.pinch.scale = this.body.view.scale;
      // to avoid double fireing of this event because we have two hammer instances. (on canvas and on frame)
      this.touchTime = new Date().valueOf();
    }
  }

  /**
   * handle tap/click event: select/unselect a node
   *
   * @param {Event} event
   * @private
   */
  onTap(event) {
    const pointer = this.getPointer(event.center);
    const multiselect =
      this.selectionHandler.options.multiselect &&
      (event.changedPointers[0].ctrlKey || event.changedPointers[0].metaKey);

    this.checkSelectionChanges(pointer, multiselect);

    this.selectionHandler.commitAndEmit(pointer, event);
    this.selectionHandler.generateClickEvent("click", event, pointer);
  }

  /**
   * handle doubletap event
   *
   * @param {Event} event
   * @private
   */
  onDoubleTap(event) {
    const pointer = this.getPointer(event.center);
    this.selectionHandler.generateClickEvent("doubleClick", event, pointer);
  }

  /**
   * handle long tap event: multi select nodes
   *
   * @param {Event} event
   * @private
   */
  onHold(event) {
    const pointer = this.getPointer(event.center);
    const multiselect = this.selectionHandler.options.multiselect;

    this.checkSelectionChanges(pointer, multiselect);

    this.selectionHandler.commitAndEmit(pointer, event);
    this.selectionHandler.generateClickEvent("click", event, pointer);
    this.selectionHandler.generateClickEvent("hold", event, pointer);
  }

  /**
   * handle the release of the screen
   *
   * @param {Event} event
   * @private
   */
  onRelease(event) {
    if (new Date().valueOf() - this.touchTime > 10) {
      const pointer = this.getPointer(event.center);
      this.selectionHandler.generateClickEvent("release", event, pointer);
      // to avoid double fireing of this event because we have two hammer instances. (on canvas and on frame)
      this.touchTime = new Date().valueOf();
    }
  }

  /**
   *
   * @param {Event} event
   */
  onContext(event) {
    const pointer = this.getPointer({ x: event.clientX, y: event.clientY });
    this.selectionHandler.generateClickEvent("oncontext", event, pointer);
  }

  /**
   * Select and deselect nodes depending current selection change.
   *
   * @param {{x: number, y: number}} pointer
   * @param {boolean} [add=false]
   */
  checkSelectionChanges(pointer, add = false) {
    if (add === true) {
      this.selectionHandler.selectAdditionalOnPoint(pointer);
    } else {
      this.selectionHandler.selectOnPoint(pointer);
    }
  }

  /**
   * Remove all node and edge id's from the first set that are present in the second one.
   *
   * @param {{nodes: Array.<Node>, edges: Array.<vis.Edge>}} firstSet
   * @param {{nodes: Array.<Node>, edges: Array.<vis.Edge>}} secondSet
   * @returns {{nodes: Array.<Node>, edges: Array.<vis.Edge>}}
   * @private
   */
  _determineDifference(firstSet, secondSet) {
    const arrayDiff = function (firstArr, secondArr) {
      const result = [];

      for (let i = 0; i < firstArr.length; i++) {
        const value = firstArr[i];
        if (secondArr.indexOf(value) === -1) {
          result.push(value);
        }
      }

      return result;
    };

    return {
      nodes: arrayDiff(firstSet.nodes, secondSet.nodes),
      edges: arrayDiff(firstSet.edges, secondSet.edges),
    };
  }

  /**
   * This function is called by onDragStart.
   * It is separated out because we can then overload it for the datamanipulation system.
   *
   * @param {Event} event
   * @private
   */
  onDragStart(event) {
    // if already dragging, do not start
    // this can happen on touch screens with multiple fingers
    if (this.drag.dragging) {
      return;
    }

    //in case the touch event was triggered on an external div, do the initial touch now.
    if (this.drag.pointer === undefined) {
      this.onTouch(event);
    }

    // note: drag.pointer is set in onTouch to get the initial touch location
    const node = this.selectionHandler.getNodeAt(this.drag.pointer);

    this.drag.dragging = true;
    this.drag.selection = [];
    this.drag.translation = Object.assign({}, this.body.view.translation); // copy the object
    this.drag.nodeId = undefined;

    if (event.srcEvent.shiftKey) {
      this.body.selectionBox.show = true;
      const pointer = this.getPointer(event.center);

      this.body.selectionBox.position.start = {
        x: this.canvas._XconvertDOMtoCanvas(pointer.x),
        y: this.canvas._YconvertDOMtoCanvas(pointer.y),
      };
      this.body.selectionBox.position.end = {
        x: this.canvas._XconvertDOMtoCanvas(pointer.x),
        y: this.canvas._YconvertDOMtoCanvas(pointer.y),
      };
    } else if (node !== undefined && this.options.dragNodes === true) {
      this.drag.nodeId = node.id;
      // select the clicked node if not yet selected
      if (node.isSelected() === false) {
        this.selectionHandler.setSelection({ nodes: [node.id] });
      }

      // after select to contain the node
      this.selectionHandler.generateClickEvent(
        "dragStart",
        event,
        this.drag.pointer
      );

      // create an array with the selected nodes and their original location and status
      for (const node of this.selectionHandler.getSelectedNodes()) {
        const s = {
          id: node.id,
          node: node,

          // store original x, y, xFixed and yFixed, make the node temporarily Fixed
          x: node.x,
          y: node.y,
          xFixed: node.options.fixed.x,
          yFixed: node.options.fixed.y,
        };

        node.options.fixed.x = true;
        node.options.fixed.y = true;

        this.drag.selection.push(s);
      }
    } else {
      // fallback if no node is selected and thus the view is dragged.
      this.selectionHandler.generateClickEvent(
        "dragStart",
        event,
        this.drag.pointer,
        undefined,
        true
      );
    }
  }

  /**
   * handle drag event
   *
   * @param {Event} event
   * @private
   */
  onDrag(event) {
    if (this.drag.pinched === true) {
      return;
    }

    // remove the focus on node if it is focussed on by the focusOnNode
    this.body.emitter.emit("unlockNode");

    const pointer = this.getPointer(event.center);

    const selection = this.drag.selection;
    if (selection && selection.length && this.options.dragNodes === true) {
      this.selectionHandler.generateClickEvent("dragging", event, pointer);

      // calculate delta's and new location
      const deltaX = pointer.x - this.drag.pointer.x;
      const deltaY = pointer.y - this.drag.pointer.y;

      // update position of all selected nodes
      selection.forEach((selection) => {
        const node = selection.node;
        // only move the node if it was not fixed initially
        if (selection.xFixed === false) {
          node.x = this.canvas._XconvertDOMtoCanvas(
            this.canvas._XconvertCanvasToDOM(selection.x) + deltaX
          );
        }
        // only move the node if it was not fixed initially
        if (selection.yFixed === false) {
          node.y = this.canvas._YconvertDOMtoCanvas(
            this.canvas._YconvertCanvasToDOM(selection.y) + deltaY
          );
        }
      });

      // start the simulation of the physics
      this.body.emitter.emit("startSimulation");
    } else {
      // create selection box
      if (event.srcEvent.shiftKey) {
        this.selectionHandler.generateClickEvent(
          "dragging",
          event,
          pointer,
          undefined,
          true
        );

        // if the drag was not started properly because the click started outside the network div, start it now.
        if (this.drag.pointer === undefined) {
          this.onDragStart(event);
          return;
        }

        this.body.selectionBox.position.end = {
          x: this.canvas._XconvertDOMtoCanvas(pointer.x),
          y: this.canvas._YconvertDOMtoCanvas(pointer.y),
        };
        this.body.emitter.emit("_requestRedraw");
      }

      // move the network
      if (this.options.dragView === true && !event.srcEvent.shiftKey) {
        this.selectionHandler.generateClickEvent(
          "dragging",
          event,
          pointer,
          undefined,
          true
        );

        // if the drag was not started properly because the click started outside the network div, start it now.
        if (this.drag.pointer === undefined) {
          this.onDragStart(event);
          return;
        }

        const diffX = pointer.x - this.drag.pointer.x;
        const diffY = pointer.y - this.drag.pointer.y;

        this.body.view.translation = {
          x: this.drag.translation.x + diffX,
          y: this.drag.translation.y + diffY,
        };
        this.body.emitter.emit("_requestRedraw");
      }
    }
  }

  /**
   * handle drag start event
   *
   * @param {Event} event
   * @private
   */
  onDragEnd(event) {
    this.drag.dragging = false;

    if (this.body.selectionBox.show) {
      this.body.selectionBox.show = false;
      const selectionBoxPosition = this.body.selectionBox.position;
      const selectionBoxPositionMinMax = {
        minX: Math.min(
          selectionBoxPosition.start.x,
          selectionBoxPosition.end.x
        ),
        minY: Math.min(
          selectionBoxPosition.start.y,
          selectionBoxPosition.end.y
        ),
        maxX: Math.max(
          selectionBoxPosition.start.x,
          selectionBoxPosition.end.x
        ),
        maxY: Math.max(
          selectionBoxPosition.start.y,
          selectionBoxPosition.end.y
        ),
      };

      const toBeSelectedNodes = this.body.nodeIndices.filter((nodeId) => {
        const node = this.body.nodes[nodeId];
        return (
          node.x >= selectionBoxPositionMinMax.minX &&
          node.x <= selectionBoxPositionMinMax.maxX &&
          node.y >= selectionBoxPositionMinMax.minY &&
          node.y <= selectionBoxPositionMinMax.maxY
        );
      });

      toBeSelectedNodes.forEach((nodeId) =>
        this.selectionHandler.selectObject(this.body.nodes[nodeId])
      );

      const pointer = this.getPointer(event.center);
      this.selectionHandler.commitAndEmit(pointer, event);
      this.selectionHandler.generateClickEvent(
        "dragEnd",
        event,
        this.getPointer(event.center),
        undefined,
        true
      );
      this.body.emitter.emit("_requestRedraw");
    } else {
      const selection = this.drag.selection;
      if (selection && selection.length) {
        selection.forEach(function (s) {
          // restore original xFixed and yFixed
          s.node.options.fixed.x = s.xFixed;
          s.node.options.fixed.y = s.yFixed;
        });
        this.selectionHandler.generateClickEvent(
          "dragEnd",
          event,
          this.getPointer(event.center)
        );
        this.body.emitter.emit("startSimulation");
      } else {
        this.selectionHandler.generateClickEvent(
          "dragEnd",
          event,
          this.getPointer(event.center),
          undefined,
          true
        );
        this.body.emitter.emit("_requestRedraw");
      }
    }
  }

  /**
   * Handle pinch event
   *
   * @param {Event}  event   The event
   * @private
   */
  onPinch(event) {
    const pointer = this.getPointer(event.center);

    this.drag.pinched = true;
    if (this.pinch["scale"] === undefined) {
      this.pinch.scale = 1;
    }

    // TODO: enabled moving while pinching?
    const scale = this.pinch.scale * event.scale;
    this.zoom(scale, pointer);
  }

  /**
   * Zoom the network in or out
   *
   * @param {number} scale a number around 1, and between 0.01 and 10
   * @param {{x: number, y: number}} pointer    Position on screen
   * @private
   */
  zoom(scale, pointer) {
    if (this.options.zoomView === true) {
      const scaleOld = this.body.view.scale;
      if (scale < 0.00001) {
        scale = 0.00001;
      }
      if (scale > 10) {
        scale = 10;
      }

      let preScaleDragPointer = undefined;
      if (this.drag !== undefined) {
        if (this.drag.dragging === true) {
          preScaleDragPointer = this.canvas.DOMtoCanvas(this.drag.pointer);
        }
      }
      // + this.canvas.frame.canvas.clientHeight / 2
      const translation = this.body.view.translation;

      const scaleFrac = scale / scaleOld;
      const tx = (1 - scaleFrac) * pointer.x + translation.x * scaleFrac;
      const ty = (1 - scaleFrac) * pointer.y + translation.y * scaleFrac;

      this.body.view.scale = scale;
      this.body.view.translation = { x: tx, y: ty };

      if (preScaleDragPointer != undefined) {
        const postScaleDragPointer =
          this.canvas.canvasToDOM(preScaleDragPointer);
        this.drag.pointer.x = postScaleDragPointer.x;
        this.drag.pointer.y = postScaleDragPointer.y;
      }

      this.body.emitter.emit("_requestRedraw");

      if (scaleOld < scale) {
        this.body.emitter.emit("zoom", {
          direction: "+",
          scale: this.body.view.scale,
          pointer: pointer,
        });
      } else {
        this.body.emitter.emit("zoom", {
          direction: "-",
          scale: this.body.view.scale,
          pointer: pointer,
        });
      }
    }
  }

  /**
   * Event handler for mouse wheel event, used to zoom the timeline
   * See http://adomas.org/javascript-mouse-wheel/
   *     https://github.com/EightMedia/hammer.js/issues/256
   *
   * @param {MouseEvent}  event
   * @private
   */
  onMouseWheel(event) {
    if (this.options.zoomView === true) {
      // If delta is nonzero, handle it.
      // Basically, delta is now positive if wheel was scrolled up,
      // and negative, if wheel was scrolled down.
      if (event.deltaY !== 0) {
        // calculate the new scale
        let scale = this.body.view.scale;
        scale *=
          1 + (event.deltaY < 0 ? 1 : -1) * (this.options.zoomSpeed * 0.1);

        // calculate the pointer location
        const pointer = this.getPointer({ x: event.clientX, y: event.clientY });

        // apply the new scale
        this.zoom(scale, pointer);
      }

      // Prevent default actions caused by mouse wheel.
      event.preventDefault();
    }
  }

  /**
   * Mouse move handler for checking whether the title moves over a node with a title.
   *
   * @param  {Event} event
   * @private
   */
  onMouseMove(event) {
    const pointer = this.getPointer({ x: event.clientX, y: event.clientY });
    let popupVisible = false;

    // check if the previously selected node is still selected
    if (this.popup !== undefined) {
      if (this.popup.hidden === false) {
        this._checkHidePopup(pointer);
      }

      // if the popup was not hidden above
      if (this.popup.hidden === false) {
        popupVisible = true;
        this.popup.setPosition(pointer.x + 3, pointer.y - 5);
        this.popup.show();
      }
    }

    // if we bind the keyboard to the div, we have to highlight it to use it. This highlights it on mouse over.
    if (
      this.options.keyboard.autoFocus &&
      this.options.keyboard.bindToWindow === false &&
      this.options.keyboard.enabled === true
    ) {
      this.canvas.frame.focus();
    }

    // start a timeout that will check if the mouse is positioned above an element
    if (popupVisible === false) {
      if (this.popupTimer !== undefined) {
        clearInterval(this.popupTimer); // stop any running calculationTimer
        this.popupTimer = undefined;
      }
      if (!this.drag.dragging) {
        this.popupTimer = setTimeout(
          () => this._checkShowPopup(pointer),
          this.options.tooltipDelay
        );
      }
    }

    // adding hover highlights
    if (this.options.hover === true) {
      this.selectionHandler.hoverObject(event, pointer);
    }
  }

  /**
   * Check if there is an element on the given position in the network
   * (a node or edge). If so, and if this element has a title,
   * show a popup window with its title.
   *
   * @param {{x:number, y:number}} pointer
   * @private
   */
  _checkShowPopup(pointer) {
    const x = this.canvas._XconvertDOMtoCanvas(pointer.x);
    const y = this.canvas._YconvertDOMtoCanvas(pointer.y);
    const pointerObj = {
      left: x,
      top: y,
      right: x,
      bottom: y,
    };

    const previousPopupObjId =
      this.popupObj === undefined ? undefined : this.popupObj.id;
    let nodeUnderCursor = false;
    let popupType = "node";

    // check if a node is under the cursor.
    if (this.popupObj === undefined) {
      // search the nodes for overlap, select the top one in case of multiple nodes
      const nodeIndices = this.body.nodeIndices;
      const nodes = this.body.nodes;
      let node;
      const overlappingNodes = [];
      for (let i = 0; i < nodeIndices.length; i++) {
        node = nodes[nodeIndices[i]];
        if (node.isOverlappingWith(pointerObj) === true) {
          nodeUnderCursor = true;
          if (node.getTitle() !== undefined) {
            overlappingNodes.push(nodeIndices[i]);
          }
        }
      }

      if (overlappingNodes.length > 0) {
        // if there are overlapping nodes, select the last one, this is the one which is drawn on top of the others
        this.popupObj = nodes[overlappingNodes[overlappingNodes.length - 1]];
        // if you hover over a node, the title of the edge is not supposed to be shown.
        nodeUnderCursor = true;
      }
    }

    if (this.popupObj === undefined && nodeUnderCursor === false) {
      // search the edges for overlap
      const edgeIndices = this.body.edgeIndices;
      const edges = this.body.edges;
      let edge;
      const overlappingEdges = [];
      for (let i = 0; i < edgeIndices.length; i++) {
        edge = edges[edgeIndices[i]];
        if (edge.isOverlappingWith(pointerObj) === true) {
          if (edge.connected === true && edge.getTitle() !== undefined) {
            overlappingEdges.push(edgeIndices[i]);
          }
        }
      }

      if (overlappingEdges.length > 0) {
        this.popupObj = edges[overlappingEdges[overlappingEdges.length - 1]];
        popupType = "edge";
      }
    }

    if (this.popupObj !== undefined) {
      // show popup message window
      if (this.popupObj.id !== previousPopupObjId) {
        if (this.popup === undefined) {
          this.popup = new Popup(this.canvas.frame);
        }

        this.popup.popupTargetType = popupType;
        this.popup.popupTargetId = this.popupObj.id;

        // adjust a small offset such that the mouse cursor is located in the
        // bottom left location of the popup, and you can easily move over the
        // popup area
        this.popup.setPosition(pointer.x + 3, pointer.y - 5);
        this.popup.setText(this.popupObj.getTitle());
        this.popup.show();
        this.body.emitter.emit("showPopup", this.popupObj.id);
      }
    } else {
      if (this.popup !== undefined) {
        this.popup.hide();
        this.body.emitter.emit("hidePopup");
      }
    }
  }

  /**
   * Check if the popup must be hidden, which is the case when the mouse is no
   * longer hovering on the object
   *
   * @param {{x:number, y:number}} pointer
   * @private
   */
  _checkHidePopup(pointer) {
    const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);

    let stillOnObj = false;
    if (this.popup.popupTargetType === "node") {
      if (this.body.nodes[this.popup.popupTargetId] !== undefined) {
        stillOnObj =
          this.body.nodes[this.popup.popupTargetId].isOverlappingWith(
            pointerObj
          );

        // if the mouse is still one the node, we have to check if it is not also on one that is drawn on top of it.
        // we initially only check stillOnObj because this is much faster.
        if (stillOnObj === true) {
          const overNode = this.selectionHandler.getNodeAt(pointer);
          stillOnObj =
            overNode === undefined
              ? false
              : overNode.id === this.popup.popupTargetId;
        }
      }
    } else {
      if (this.selectionHandler.getNodeAt(pointer) === undefined) {
        if (this.body.edges[this.popup.popupTargetId] !== undefined) {
          stillOnObj =
            this.body.edges[this.popup.popupTargetId].isOverlappingWith(
              pointerObj
            );
        }
      }
    }

    if (stillOnObj === false) {
      this.popupObj = undefined;
      this.popup.hide();
      this.body.emitter.emit("hidePopup");
    }
  }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var _SingleTypeSelectionAccumulator_previousSelection, _SingleTypeSelectionAccumulator_selection, _SelectionAccumulator_nodes, _SelectionAccumulator_edges, _SelectionAccumulator_commitHandler;
/**
 * @param prev
 * @param next
 */
function diffSets(prev, next) {
    const diff = new Set();
    for (const item of next) {
        if (!prev.has(item)) {
            diff.add(item);
        }
    }
    return diff;
}
class SingleTypeSelectionAccumulator {
    constructor() {
        _SingleTypeSelectionAccumulator_previousSelection.set(this, new Set());
        _SingleTypeSelectionAccumulator_selection.set(this, new Set());
    }
    get size() {
        return __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").size;
    }
    add(...items) {
        for (const item of items) {
            __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").add(item);
        }
    }
    delete(...items) {
        for (const item of items) {
            __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").delete(item);
        }
    }
    clear() {
        __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").clear();
    }
    getSelection() {
        return [...__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f")];
    }
    getChanges() {
        return {
            added: [...diffSets(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f"), __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"))],
            deleted: [...diffSets(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"), __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f"))],
            previous: [...new Set(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f"))],
            current: [...new Set(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"))],
        };
    }
    commit() {
        const changes = this.getChanges();
        __classPrivateFieldSet(this, _SingleTypeSelectionAccumulator_previousSelection, __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"), "f");
        __classPrivateFieldSet(this, _SingleTypeSelectionAccumulator_selection, new Set(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f")), "f");
        for (const item of changes.added) {
            item.select();
        }
        for (const item of changes.deleted) {
            item.unselect();
        }
        return changes;
    }
}
_SingleTypeSelectionAccumulator_previousSelection = new WeakMap(), _SingleTypeSelectionAccumulator_selection = new WeakMap();
class SelectionAccumulator {
    constructor(commitHandler = () => { }) {
        _SelectionAccumulator_nodes.set(this, new SingleTypeSelectionAccumulator());
        _SelectionAccumulator_edges.set(this, new SingleTypeSelectionAccumulator());
        _SelectionAccumulator_commitHandler.set(this, void 0);
        __classPrivateFieldSet(this, _SelectionAccumulator_commitHandler, commitHandler, "f");
    }
    get sizeNodes() {
        return __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").size;
    }
    get sizeEdges() {
        return __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").size;
    }
    getNodes() {
        return __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").getSelection();
    }
    getEdges() {
        return __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").getSelection();
    }
    addNodes(...nodes) {
        __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").add(...nodes);
    }
    addEdges(...edges) {
        __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").add(...edges);
    }
    deleteNodes(node) {
        __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").delete(node);
    }
    deleteEdges(edge) {
        __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").delete(edge);
    }
    clear() {
        __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").clear();
        __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").clear();
    }
    commit(...rest) {
        const summary = {
            nodes: __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").commit(),
            edges: __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").commit(),
        };
        __classPrivateFieldGet(this, _SelectionAccumulator_commitHandler, "f").call(this, summary, ...rest);
        return summary;
    }
}
_SelectionAccumulator_nodes = new WeakMap(), _SelectionAccumulator_edges = new WeakMap(), _SelectionAccumulator_commitHandler = new WeakMap();

/**
 * The handler for selections
 */
class SelectionHandler {
  /**
   * @param {object} body
   * @param {Canvas} canvas
   */
  constructor(body, canvas) {
    this.body = body;
    this.canvas = canvas;
    // TODO: Consider firing an event on any change to the selection, not
    // only those caused by clicks and taps. It would be easy to implement
    // now and (at least to me) it seems like something that could be
    // quite useful.
    this._selectionAccumulator = new SelectionAccumulator();
    this.hoverObj = { nodes: {}, edges: {} };

    this.options = {};
    this.defaultOptions = {
      multiselect: false,
      selectable: true,
      selectConnectedEdges: true,
      hoverConnectedEdges: true,
    };
    Object.assign(this.options, this.defaultOptions);

    this.body.emitter.on("_dataChanged", () => {
      this.updateSelection();
    });
  }

  /**
   *
   * @param {object} [options]
   */
  setOptions(options) {
    if (options !== undefined) {
      const fields = [
        "multiselect",
        "hoverConnectedEdges",
        "selectable",
        "selectConnectedEdges",
      ];
      selectiveDeepExtend(fields, this.options, options);
    }
  }

  /**
   * handles the selection part of the tap;
   *
   * @param {{x: number, y: number}} pointer
   * @returns {boolean}
   */
  selectOnPoint(pointer) {
    let selected = false;
    if (this.options.selectable === true) {
      const obj = this.getNodeAt(pointer) || this.getEdgeAt(pointer);

      // unselect after getting the objects in order to restore width and height.
      this.unselectAll();

      if (obj !== undefined) {
        selected = this.selectObject(obj);
      }
      this.body.emitter.emit("_requestRedraw");
    }
    return selected;
  }

  /**
   *
   * @param {{x: number, y: number}} pointer
   * @returns {boolean}
   */
  selectAdditionalOnPoint(pointer) {
    let selectionChanged = false;
    if (this.options.selectable === true) {
      const obj = this.getNodeAt(pointer) || this.getEdgeAt(pointer);

      if (obj !== undefined) {
        selectionChanged = true;
        if (obj.isSelected() === true) {
          this.deselectObject(obj);
        } else {
          this.selectObject(obj);
        }

        this.body.emitter.emit("_requestRedraw");
      }
    }
    return selectionChanged;
  }

  /**
   * Create an object containing the standard fields for an event.
   *
   * @param {Event} event
   * @param {{x: number, y: number}} pointer Object with the x and y screen coordinates of the mouse
   * @returns {{}}
   * @private
   */
  _initBaseEvent(event, pointer) {
    const properties = {};

    properties["pointer"] = {
      DOM: { x: pointer.x, y: pointer.y },
      canvas: this.canvas.DOMtoCanvas(pointer),
    };
    properties["event"] = event;

    return properties;
  }

  /**
   * Generate an event which the user can catch.
   *
   * This adds some extra data to the event with respect to cursor position and
   * selected nodes and edges.
   *
   * @param {string} eventType                          Name of event to send
   * @param {Event}  event
   * @param {{x: number, y: number}} pointer            Object with the x and y screen coordinates of the mouse
   * @param {object | undefined} oldSelection             If present, selection state before event occured
   * @param {boolean|undefined} [emptySelection=false]  Indicate if selection data should be passed
   */
  generateClickEvent(
    eventType,
    event,
    pointer,
    oldSelection,
    emptySelection = false
  ) {
    const properties = this._initBaseEvent(event, pointer);

    if (emptySelection === true) {
      properties.nodes = [];
      properties.edges = [];
    } else {
      const tmp = this.getSelection();
      properties.nodes = tmp.nodes;
      properties.edges = tmp.edges;
    }

    if (oldSelection !== undefined) {
      properties["previousSelection"] = oldSelection;
    }

    if (eventType == "click") {
      // For the time being, restrict this functionality to
      // just the click event.
      properties.items = this.getClickedItems(pointer);
    }

    if (event.controlEdge !== undefined) {
      properties.controlEdge = event.controlEdge;
    }

    this.body.emitter.emit(eventType, properties);
  }

  /**
   *
   * @param {object} obj
   * @param {boolean} [highlightEdges=this.options.selectConnectedEdges]
   * @returns {boolean}
   */
  selectObject(obj, highlightEdges = this.options.selectConnectedEdges) {
    if (obj !== undefined) {
      if (obj instanceof Node) {
        if (highlightEdges === true) {
          this._selectionAccumulator.addEdges(...obj.edges);
        }
        this._selectionAccumulator.addNodes(obj);
      } else {
        this._selectionAccumulator.addEdges(obj);
      }
      return true;
    }
    return false;
  }

  /**
   *
   * @param {object} obj
   */
  deselectObject(obj) {
    if (obj.isSelected() === true) {
      obj.selected = false;
      this._removeFromSelection(obj);
    }
  }

  /**
   * retrieve all nodes overlapping with given object
   *
   * @param {object} object  An object with parameters left, top, right, bottom
   * @returns {number[]}   An array with id's of the overlapping nodes
   * @private
   */
  _getAllNodesOverlappingWith(object) {
    const overlappingNodes = [];
    const nodes = this.body.nodes;
    for (let i = 0; i < this.body.nodeIndices.length; i++) {
      const nodeId = this.body.nodeIndices[i];
      if (nodes[nodeId].isOverlappingWith(object)) {
        overlappingNodes.push(nodeId);
      }
    }
    return overlappingNodes;
  }

  /**
   * Return a position object in canvasspace from a single point in screenspace
   *
   * @param {{x: number, y: number}} pointer
   * @returns {{left: number, top: number, right: number, bottom: number}}
   * @private
   */
  _pointerToPositionObject(pointer) {
    const canvasPos = this.canvas.DOMtoCanvas(pointer);
    return {
      left: canvasPos.x - 1,
      top: canvasPos.y + 1,
      right: canvasPos.x + 1,
      bottom: canvasPos.y - 1,
    };
  }

  /**
   * Get the top node at the passed point (like a click)
   *
   * @param {{x: number, y: number}} pointer
   * @param {boolean} [returnNode=true]
   * @returns {Node | undefined} node
   */
  getNodeAt(pointer, returnNode = true) {
    // we first check if this is an navigation controls element
    const positionObject = this._pointerToPositionObject(pointer);
    const overlappingNodes = this._getAllNodesOverlappingWith(positionObject);
    // if there are overlapping nodes, select the last one, this is the
    // one which is drawn on top of the others
    if (overlappingNodes.length > 0) {
      if (returnNode === true) {
        return this.body.nodes[overlappingNodes[overlappingNodes.length - 1]];
      } else {
        return overlappingNodes[overlappingNodes.length - 1];
      }
    } else {
      return undefined;
    }
  }

  /**
   * retrieve all edges overlapping with given object, selector is around center
   *
   * @param {object} object  An object with parameters left, top, right, bottom
   * @param {number[]} overlappingEdges An array with id's of the overlapping nodes
   * @private
   */
  _getEdgesOverlappingWith(object, overlappingEdges) {
    const edges = this.body.edges;
    for (let i = 0; i < this.body.edgeIndices.length; i++) {
      const edgeId = this.body.edgeIndices[i];
      if (edges[edgeId].isOverlappingWith(object)) {
        overlappingEdges.push(edgeId);
      }
    }
  }

  /**
   * retrieve all nodes overlapping with given object
   *
   * @param {object} object  An object with parameters left, top, right, bottom
   * @returns {number[]}   An array with id's of the overlapping nodes
   * @private
   */
  _getAllEdgesOverlappingWith(object) {
    const overlappingEdges = [];
    this._getEdgesOverlappingWith(object, overlappingEdges);
    return overlappingEdges;
  }

  /**
   * Get the edges nearest to the passed point (like a click)
   *
   * @param {{x: number, y: number}} pointer
   * @param {boolean} [returnEdge=true]
   * @returns {Edge | undefined} node
   */
  getEdgeAt(pointer, returnEdge = true) {
    // Iterate over edges, pick closest within 10
    const canvasPos = this.canvas.DOMtoCanvas(pointer);
    let mindist = 10;
    let overlappingEdge = null;
    const edges = this.body.edges;
    for (let i = 0; i < this.body.edgeIndices.length; i++) {
      const edgeId = this.body.edgeIndices[i];
      const edge = edges[edgeId];
      if (edge.connected) {
        const xFrom = edge.from.x;
        const yFrom = edge.from.y;
        const xTo = edge.to.x;
        const yTo = edge.to.y;
        const dist = edge.edgeType.getDistanceToEdge(
          xFrom,
          yFrom,
          xTo,
          yTo,
          canvasPos.x,
          canvasPos.y
        );
        if (dist < mindist) {
          overlappingEdge = edgeId;
          mindist = dist;
        }
      }
    }
    if (overlappingEdge !== null) {
      if (returnEdge === true) {
        return this.body.edges[overlappingEdge];
      } else {
        return overlappingEdge;
      }
    } else {
      return undefined;
    }
  }

  /**
   * Add object to the selection array.
   *
   * @param {object} obj
   * @private
   */
  _addToHover(obj) {
    if (obj instanceof Node) {
      this.hoverObj.nodes[obj.id] = obj;
    } else {
      this.hoverObj.edges[obj.id] = obj;
    }
  }

  /**
   * Remove a single option from selection.
   *
   * @param {object} obj
   * @private
   */
  _removeFromSelection(obj) {
    if (obj instanceof Node) {
      this._selectionAccumulator.deleteNodes(obj);
      this._selectionAccumulator.deleteEdges(...obj.edges);
    } else {
      this._selectionAccumulator.deleteEdges(obj);
    }
  }

  /**
   * Unselect all nodes and edges.
   */
  unselectAll() {
    this._selectionAccumulator.clear();
  }

  /**
   * return the number of selected nodes
   *
   * @returns {number}
   */
  getSelectedNodeCount() {
    return this._selectionAccumulator.sizeNodes;
  }

  /**
   * return the number of selected edges
   *
   * @returns {number}
   */
  getSelectedEdgeCount() {
    return this._selectionAccumulator.sizeEdges;
  }

  /**
   * select the edges connected to the node that is being selected
   *
   * @param {Node} node
   * @private
   */
  _hoverConnectedEdges(node) {
    for (let i = 0; i < node.edges.length; i++) {
      const edge = node.edges[i];
      edge.hover = true;
      this._addToHover(edge);
    }
  }

  /**
   * Remove the highlight from a node or edge, in response to mouse movement
   *
   * @param {Event}  event
   * @param {{x: number, y: number}} pointer object with the x and y screen coordinates of the mouse
   * @param {Node|vis.Edge} object
   * @private
   */
  emitBlurEvent(event, pointer, object) {
    const properties = this._initBaseEvent(event, pointer);

    if (object.hover === true) {
      object.hover = false;
      if (object instanceof Node) {
        properties.node = object.id;
        this.body.emitter.emit("blurNode", properties);
      } else {
        properties.edge = object.id;
        this.body.emitter.emit("blurEdge", properties);
      }
    }
  }

  /**
   * Create the highlight for a node or edge, in response to mouse movement
   *
   * @param {Event}  event
   * @param {{x: number, y: number}} pointer object with the x and y screen coordinates of the mouse
   * @param {Node|vis.Edge} object
   * @returns {boolean} hoverChanged
   * @private
   */
  emitHoverEvent(event, pointer, object) {
    const properties = this._initBaseEvent(event, pointer);
    let hoverChanged = false;

    if (object.hover === false) {
      object.hover = true;
      this._addToHover(object);
      hoverChanged = true;
      if (object instanceof Node) {
        properties.node = object.id;
        this.body.emitter.emit("hoverNode", properties);
      } else {
        properties.edge = object.id;
        this.body.emitter.emit("hoverEdge", properties);
      }
    }

    return hoverChanged;
  }

  /**
   * Perform actions in response to a mouse movement.
   *
   * @param {Event}  event
   * @param {{x: number, y: number}} pointer | object with the x and y screen coordinates of the mouse
   */
  hoverObject(event, pointer) {
    let object = this.getNodeAt(pointer);
    if (object === undefined) {
      object = this.getEdgeAt(pointer);
    }

    let hoverChanged = false;
    // remove all node hover highlights
    for (const nodeId in this.hoverObj.nodes) {
      if (Object.prototype.hasOwnProperty.call(this.hoverObj.nodes, nodeId)) {
        if (
          object === undefined ||
          (object instanceof Node && object.id != nodeId) ||
          object instanceof Edge
        ) {
          this.emitBlurEvent(event, pointer, this.hoverObj.nodes[nodeId]);
          delete this.hoverObj.nodes[nodeId];
          hoverChanged = true;
        }
      }
    }

    // removing all edge hover highlights
    for (const edgeId in this.hoverObj.edges) {
      if (Object.prototype.hasOwnProperty.call(this.hoverObj.edges, edgeId)) {
        // if the hover has been changed here it means that the node has been hovered over or off
        // we then do not use the emitBlurEvent method here.
        if (hoverChanged === true) {
          this.hoverObj.edges[edgeId].hover = false;
          delete this.hoverObj.edges[edgeId];
        }
        // if the blur remains the same and the object is undefined (mouse off) or another
        // edge has been hovered, or another node has been hovered we blur the edge.
        else if (
          object === undefined ||
          (object instanceof Edge && object.id != edgeId) ||
          (object instanceof Node && !object.hover)
        ) {
          this.emitBlurEvent(event, pointer, this.hoverObj.edges[edgeId]);
          delete this.hoverObj.edges[edgeId];
          hoverChanged = true;
        }
      }
    }

    if (object !== undefined) {
      const hoveredEdgesCount = Object.keys(this.hoverObj.edges).length;
      const hoveredNodesCount = Object.keys(this.hoverObj.nodes).length;
      const newOnlyHoveredEdge =
        object instanceof Edge &&
        hoveredEdgesCount === 0 &&
        hoveredNodesCount === 0;
      const newOnlyHoveredNode =
        object instanceof Node &&
        hoveredEdgesCount === 0 &&
        hoveredNodesCount === 0;

      if (hoverChanged || newOnlyHoveredEdge || newOnlyHoveredNode) {
        hoverChanged = this.emitHoverEvent(event, pointer, object);
      }

      if (object instanceof Node && this.options.hoverConnectedEdges === true) {
        this._hoverConnectedEdges(object);
      }
    }

    if (hoverChanged === true) {
      this.body.emitter.emit("_requestRedraw");
    }
  }

  /**
   * Commit the selection changes but don't emit any events.
   */
  commitWithoutEmitting() {
    this._selectionAccumulator.commit();
  }

  /**
   * Select and deselect nodes depending current selection change.
   *
   * For changing nodes, select/deselect events are fired.
   *
   * NOTE: For a given edge, if one connecting node is deselected and with the
   * same click the other node is selected, no events for the edge will fire. It
   * was selected and it will remain selected.
   *
   * @param {{x: number, y: number}} pointer - The x and y coordinates of the
   * click, tap, dragend… that triggered this.
   * @param {UIEvent} event - The event that triggered this.
   */
  commitAndEmit(pointer, event) {
    let selected = false;

    const selectionChanges = this._selectionAccumulator.commit();
    const previousSelection = {
      nodes: selectionChanges.nodes.previous,
      edges: selectionChanges.edges.previous,
    };

    if (selectionChanges.edges.deleted.length > 0) {
      this.generateClickEvent(
        "deselectEdge",
        event,
        pointer,
        previousSelection
      );
      selected = true;
    }

    if (selectionChanges.nodes.deleted.length > 0) {
      this.generateClickEvent(
        "deselectNode",
        event,
        pointer,
        previousSelection
      );
      selected = true;
    }

    if (selectionChanges.nodes.added.length > 0) {
      this.generateClickEvent("selectNode", event, pointer);
      selected = true;
    }

    if (selectionChanges.edges.added.length > 0) {
      this.generateClickEvent("selectEdge", event, pointer);
      selected = true;
    }

    // fire the select event if anything has been selected or deselected
    if (selected === true) {
      // select or unselect
      this.generateClickEvent("select", event, pointer);
    }
  }

  /**
   * Retrieve the currently selected node and edge ids.
   *
   * @returns {{nodes: Array.<string>, edges: Array.<string>}} Arrays with the
   * ids of the selected nodes and edges.
   */
  getSelection() {
    return {
      nodes: this.getSelectedNodeIds(),
      edges: this.getSelectedEdgeIds(),
    };
  }

  /**
   * Retrieve the currently selected nodes.
   *
   * @returns {Array} An array with selected nodes.
   */
  getSelectedNodes() {
    return this._selectionAccumulator.getNodes();
  }

  /**
   * Retrieve the currently selected edges.
   *
   * @returns {Array} An array with selected edges.
   */
  getSelectedEdges() {
    return this._selectionAccumulator.getEdges();
  }

  /**
   * Retrieve the currently selected node ids.
   *
   * @returns {Array} An array with the ids of the selected nodes.
   */
  getSelectedNodeIds() {
    return this._selectionAccumulator.getNodes().map((node) => node.id);
  }

  /**
   * Retrieve the currently selected edge ids.
   *
   * @returns {Array} An array with the ids of the selected edges.
   */
  getSelectedEdgeIds() {
    return this._selectionAccumulator.getEdges().map((edge) => edge.id);
  }

  /**
   * Updates the current selection
   *
   * @param {{nodes: Array.<string>, edges: Array.<string>}} selection
   * @param {object} options                                 Options
   */
  setSelection(selection, options = {}) {
    if (!selection || (!selection.nodes && !selection.edges)) {
      throw new TypeError(
        "Selection must be an object with nodes and/or edges properties"
      );
    }

    // first unselect any selected node, if option is true or undefined
    if (options.unselectAll || options.unselectAll === undefined) {
      this.unselectAll();
    }
    if (selection.nodes) {
      for (const id of selection.nodes) {
        const node = this.body.nodes[id];
        if (!node) {
          throw new RangeError('Node with id "' + id + '" not found');
        }
        // don't select edges with it
        this.selectObject(node, options.highlightEdges);
      }
    }

    if (selection.edges) {
      for (const id of selection.edges) {
        const edge = this.body.edges[id];
        if (!edge) {
          throw new RangeError('Edge with id "' + id + '" not found');
        }
        this.selectObject(edge);
      }
    }
    this.body.emitter.emit("_requestRedraw");
    this._selectionAccumulator.commit();
  }

  /**
   * select zero or more nodes with the option to highlight edges
   *
   * @param {number[] | string[]} selection     An array with the ids of the
   *                                            selected nodes.
   * @param {boolean} [highlightEdges]
   */
  selectNodes(selection, highlightEdges = true) {
    if (!selection || selection.length === undefined)
      throw "Selection must be an array with ids";

    this.setSelection({ nodes: selection }, { highlightEdges: highlightEdges });
  }

  /**
   * select zero or more edges
   *
   * @param {number[] | string[]} selection     An array with the ids of the
   *                                            selected nodes.
   */
  selectEdges(selection) {
    if (!selection || selection.length === undefined)
      throw "Selection must be an array with ids";

    this.setSelection({ edges: selection });
  }

  /**
   * Validate the selection: remove ids of nodes which no longer exist
   *
   * @private
   */
  updateSelection() {
    for (const node in this._selectionAccumulator.getNodes()) {
      if (!Object.prototype.hasOwnProperty.call(this.body.nodes, node.id)) {
        this._selectionAccumulator.deleteNodes(node);
      }
    }
    for (const edge in this._selectionAccumulator.getEdges()) {
      if (!Object.prototype.hasOwnProperty.call(this.body.edges, edge.id)) {
        this._selectionAccumulator.deleteEdges(edge);
      }
    }
  }

  /**
   * Determine all the visual elements clicked which are on the given point.
   *
   * All elements are returned; this includes nodes, edges and their labels.
   * The order returned is from highest to lowest, i.e. element 0 of the return
   * value is the topmost item clicked on.
   *
   * The return value consists of an array of the following possible elements:
   *
   * - `{nodeId:number}`             - node with given id clicked on
   * - `{nodeId:number, labelId:0}`  - label of node with given id clicked on
   * - `{edgeId:number}`             - edge with given id clicked on
   * - `{edge:number, labelId:0}`    - label of edge with given id clicked on
   *
   * ## NOTES
   *
   * - Currently, there is only one label associated with a node or an edge,
   *   but this is expected to change somewhere in the future.
   * - Since there is no z-indexing yet, it is not really possible to set the nodes and
   *   edges in the correct order. For the time being, nodes come first.
   *
   * @param {point} pointer  mouse position in screen coordinates
   * @returns {Array.<nodeClickItem|nodeLabelClickItem|edgeClickItem|edgeLabelClickItem>}
   * @private
   */
  getClickedItems(pointer) {
    const point = this.canvas.DOMtoCanvas(pointer);
    const items = [];

    // Note reverse order; we want the topmost clicked items to be first in the array
    // Also note that selected nodes are disregarded here; these normally display on top
    const nodeIndices = this.body.nodeIndices;
    const nodes = this.body.nodes;
    for (let i = nodeIndices.length - 1; i >= 0; i--) {
      const node = nodes[nodeIndices[i]];
      const ret = node.getItemsOnPoint(point);
      items.push.apply(items, ret); // Append the return value to the running list.
    }

    const edgeIndices = this.body.edgeIndices;
    const edges = this.body.edges;
    for (let i = edgeIndices.length - 1; i >= 0; i--) {
      const edge = edges[edgeIndices[i]];
      const ret = edge.getItemsOnPoint(point);
      items.push.apply(items, ret); // Append the return value to the running list.
    }

    return items;
  }
}

/**
 * Helper classes for LayoutEngine.
 *
 * Strategy pattern for usage of direction methods for hierarchical layouts.
 */

/**
 * Interface definition for direction strategy classes.
 *
 * This class describes the interface for the Strategy
 * pattern classes used to differentiate horizontal and vertical
 * direction of hierarchical results.
 *
 * For a given direction, one coordinate will be 'fixed', meaning that it is
 * determined by level.
 * The other coordinate is 'unfixed', meaning that the nodes on a given level
 * can still move along that coordinate. So:
 *
 * - `vertical` layout: `x` unfixed, `y` fixed per level
 * - `horizontal` layout: `x` fixed per level, `y` unfixed
 *
 * The local methods are stubs and should be regarded as abstract.
 * Derived classes **must** implement all the methods themselves.
 *
 * @private
 */
class DirectionInterface {
  /**
   * @ignore
   */
  abstract() {
    throw new Error("Can't instantiate abstract class!");
  }

  /**
   * This is a dummy call which is used to suppress the jsdoc errors of type:
   *
   *   "'param' is assigned a value but never used"
   *
   * @ignore
   */
  fake_use() {
    // Do nothing special
  }

  /**
   * Type to use to translate dynamic curves to, in the case of hierarchical layout.
   * Dynamic curves do not work for these.
   *
   * The value should be perpendicular to the actual direction of the layout.
   *
   * @returns {string} Direction, either 'vertical' or 'horizontal'
   */
  curveType() {
    return this.abstract();
  }

  /**
   * Return the value of the coordinate that is not fixed for this direction.
   *
   * @param {Node} node The node to read
   * @returns {number} Value of the unfixed coordinate
   */
  getPosition(node) {
    this.fake_use(node);
    return this.abstract();
  }

  /**
   * Set the value of the coordinate that is not fixed for this direction.
   *
   * @param {Node} node The node to adjust
   * @param {number} position
   * @param {number} [level] if specified, the hierarchy level that this node should be fixed to
   */
  setPosition(node, position, level = undefined) {
    this.fake_use(node, position, level);
    this.abstract();
  }

  /**
   * Get the width of a tree.
   *
   * A `tree` here is a subset of nodes within the network which are not connected to other nodes,
   * only among themselves. In essence, it is a sub-network.
   *
   * @param {number} index The index number of a tree
   * @returns {number} the width of a tree in the view coordinates
   */
  getTreeSize(index) {
    this.fake_use(index);
    return this.abstract();
  }

  /**
   * Sort array of nodes on the unfixed coordinates.
   *
   * Note:** chrome has non-stable sorting implementation, which
   * has a tendency to change the order of the array items,
   * even if the custom sort function returns 0.
   *
   * For this reason, an external sort implementation is used,
   * which has the added benefit of being faster than the standard
   * platforms implementation. This has been verified on `node.js`,
   * `firefox` and `chrome` (all linux).
   *
   * @param {Array.<Node>} nodeArray array of nodes to sort
   */
  sort(nodeArray) {
    this.fake_use(nodeArray);
    this.abstract();
  }

  /**
   * Assign the fixed coordinate of the node to the given level
   *
   * @param {Node} node The node to adjust
   * @param {number} level The level to fix to
   */
  fix(node, level) {
    this.fake_use(node, level);
    this.abstract();
  }

  /**
   * Add an offset to the unfixed coordinate of the given node.
   *
   * @param {NodeId} nodeId Id of the node to adjust
   * @param {number} diff Offset to add to the unfixed coordinate
   */
  shift(nodeId, diff) {
    this.fake_use(nodeId, diff);
    this.abstract();
  }
}

/**
 * Vertical Strategy
 *
 * Coordinate `y` is fixed on levels, coordinate `x` is unfixed.
 *
 * @augments DirectionInterface
 * @private
 */
class VerticalStrategy extends DirectionInterface {
  /**
   * Constructor
   *
   * @param {object} layout reference to the parent LayoutEngine instance.
   */
  constructor(layout) {
    super();
    this.layout = layout;
  }

  /** @inheritDoc */
  curveType() {
    return "horizontal";
  }

  /** @inheritDoc */
  getPosition(node) {
    return node.x;
  }

  /** @inheritDoc */
  setPosition(node, position, level = undefined) {
    if (level !== undefined) {
      this.layout.hierarchical.addToOrdering(node, level);
    }
    node.x = position;
  }

  /** @inheritDoc */
  getTreeSize(index) {
    const res = this.layout.hierarchical.getTreeSize(
      this.layout.body.nodes,
      index
    );
    return { min: res.min_x, max: res.max_x };
  }

  /** @inheritDoc */
  sort(nodeArray) {
    nodeArray.sort(function (a, b) {
      return a.x - b.x;
    });
  }

  /** @inheritDoc */
  fix(node, level) {
    node.y = this.layout.options.hierarchical.levelSeparation * level;
    node.options.fixed.y = true;
  }

  /** @inheritDoc */
  shift(nodeId, diff) {
    this.layout.body.nodes[nodeId].x += diff;
  }
}

/**
 * Horizontal Strategy
 *
 * Coordinate `x` is fixed on levels, coordinate `y` is unfixed.
 *
 * @augments DirectionInterface
 * @private
 */
class HorizontalStrategy extends DirectionInterface {
  /**
   * Constructor
   *
   * @param {object} layout reference to the parent LayoutEngine instance.
   */
  constructor(layout) {
    super();
    this.layout = layout;
  }

  /** @inheritDoc */
  curveType() {
    return "vertical";
  }

  /** @inheritDoc */
  getPosition(node) {
    return node.y;
  }

  /** @inheritDoc */
  setPosition(node, position, level = undefined) {
    if (level !== undefined) {
      this.layout.hierarchical.addToOrdering(node, level);
    }
    node.y = position;
  }

  /** @inheritDoc */
  getTreeSize(index) {
    const res = this.layout.hierarchical.getTreeSize(
      this.layout.body.nodes,
      index
    );
    return { min: res.min_y, max: res.max_y };
  }

  /** @inheritDoc */
  sort(nodeArray) {
    nodeArray.sort(function (a, b) {
      return a.y - b.y;
    });
  }

  /** @inheritDoc */
  fix(node, level) {
    node.x = this.layout.options.hierarchical.levelSeparation * level;
    node.options.fixed.x = true;
  }

  /** @inheritDoc */
  shift(nodeId, diff) {
    this.layout.body.nodes[nodeId].y += diff;
  }
}

/**
 * Try to assign levels to nodes according to their positions in the cyclic “hierarchy”.
 *
 * @param nodes - Visible nodes of the graph.
 * @param levels - If present levels will be added to it, if not a new object will be created.
 * @returns Populated node levels.
 */
function fillLevelsByDirectionCyclic(nodes, levels) {
    const edges = new Set();
    nodes.forEach((node) => {
        node.edges.forEach((edge) => {
            if (edge.connected) {
                edges.add(edge);
            }
        });
    });
    edges.forEach((edge) => {
        const fromId = edge.from.id;
        const toId = edge.to.id;
        if (levels[fromId] == null) {
            levels[fromId] = 0;
        }
        if (levels[toId] == null || levels[fromId] >= levels[toId]) {
            levels[toId] = levels[fromId] + 1;
        }
    });
    return levels;
}
/**
 * Assign levels to nodes according to their positions in the hierarchy. Leaves will be lined up at the bottom and all other nodes as close to their children as possible.
 *
 * @param nodes - Visible nodes of the graph.
 * @returns Populated node levels.
 */
function fillLevelsByDirectionLeaves(nodes) {
    return fillLevelsByDirection(
    // Pick only leaves (nodes without children).
    (node) => node.edges
        // Take only visible nodes into account.
        .filter((edge) => nodes.has(edge.toId))
        // Check that all edges lead to this node (leaf).
        .every((edge) => edge.to === node), 
    // Use the lowest level.
    (newLevel, oldLevel) => oldLevel > newLevel, 
    // Go against the direction of the edges.
    "from", nodes);
}
/**
 * Assign levels to nodes according to their positions in the hierarchy. Roots will be lined up at the top and all nodes as close to their parents as possible.
 *
 * @param nodes - Visible nodes of the graph.
 * @returns Populated node levels.
 */
function fillLevelsByDirectionRoots(nodes) {
    return fillLevelsByDirection(
    // Pick only roots (nodes without parents).
    (node) => node.edges
        // Take only visible nodes into account.
        .filter((edge) => nodes.has(edge.toId))
        // Check that all edges lead from this node (root).
        .every((edge) => edge.from === node), 
    // Use the highest level.
    (newLevel, oldLevel) => oldLevel < newLevel, 
    // Go in the direction of the edges.
    "to", nodes);
}
/**
 * Assign levels to nodes according to their positions in the hierarchy.
 *
 * @param isEntryNode - Checks and return true if the graph should be traversed from this node.
 * @param shouldLevelBeReplaced - Checks and returns true if the level of given node should be updated to the new value.
 * @param direction - Wheter the graph should be traversed in the direction of the edges `"to"` or in the other way `"from"`.
 * @param nodes - Visible nodes of the graph.
 * @returns Populated node levels.
 */
function fillLevelsByDirection(isEntryNode, shouldLevelBeReplaced, direction, nodes) {
    const levels = Object.create(null);
    // If acyclic, the graph can be walked through with (most likely way) fewer
    // steps than the number bellow. The exact value isn't too important as long
    // as it's quick to compute (doesn't impact acyclic graphs too much), is
    // higher than the number of steps actually needed (doesn't cut off before
    // acyclic graph is walked through) and prevents infinite loops (cuts off for
    // cyclic graphs).
    const limit = [...nodes.values()].reduce((acc, node) => acc + 1 + node.edges.length, 0);
    const edgeIdProp = (direction + "Id");
    const newLevelDiff = direction === "to" ? 1 : -1;
    for (const [entryNodeId, entryNode] of nodes) {
        if (
        // Skip if the node is not visible.
        !nodes.has(entryNodeId) ||
            // Skip if the node is not an entry node.
            !isEntryNode(entryNode)) {
            continue;
        }
        // Line up all the entry nodes on level 0.
        levels[entryNodeId] = 0;
        const stack = [entryNode];
        let done = 0;
        let node;
        while ((node = stack.pop())) {
            if (!nodes.has(entryNodeId)) {
                // Skip if the node is not visible.
                continue;
            }
            const newLevel = levels[node.id] + newLevelDiff;
            node.edges
                .filter((edge) => 
            // Ignore disconnected edges.
            edge.connected &&
                // Ignore circular edges.
                edge.to !== edge.from &&
                // Ignore edges leading to the node that's currently being processed.
                edge[direction] !== node &&
                // Ignore edges connecting to an invisible node.
                nodes.has(edge.toId) &&
                // Ignore edges connecting from an invisible node.
                nodes.has(edge.fromId))
                .forEach((edge) => {
                const targetNodeId = edge[edgeIdProp];
                const oldLevel = levels[targetNodeId];
                if (oldLevel == null || shouldLevelBeReplaced(newLevel, oldLevel)) {
                    levels[targetNodeId] = newLevel;
                    stack.push(edge[direction]);
                }
            });
            if (done > limit) {
                // This would run forever on a cyclic graph.
                return fillLevelsByDirectionCyclic(nodes, levels);
            }
            else {
                ++done;
            }
        }
    }
    return levels;
}

/**
 * There's a mix-up with terms in the code. Following are the formal definitions:
 *
 *   tree   - a strict hierarchical network, i.e. every node has at most one parent
 *   forest - a collection of trees. These distinct trees are thus not connected.
 *
 * So:
 * - in a network that is not a tree, there exist nodes with multiple parents.
 * - a network consisting of unconnected sub-networks, of which at least one
 *   is not a tree, is not a forest.
 *
 * In the code, the definitions are:
 *
 *   tree   - any disconnected sub-network, strict hierarchical or not.
 *   forest - a bunch of these sub-networks
 *
 * The difference between tree and not-tree is important in the code, notably within
 * to the block-shifting algorithm. The algorithm assumes formal trees and fails
 * for not-trees, often in a spectacular manner (search for 'exploding network' in the issues).
 *
 * In order to distinguish the definitions in the following code, the adjective 'formal' is
 * used. If 'formal' is absent, you must assume the non-formal definition.
 *
 * ----------------------------------------------------------------------------------
 * NOTES
 * =====
 *
 * A hierarchical layout is a different thing from a hierarchical network.
 * The layout is a way to arrange the nodes in the view; this can be done
 * on non-hierarchical networks as well. The converse is also possible.
 */

/**
 * Container for derived data on current network, relating to hierarchy.
 *
 * @private
 */
class HierarchicalStatus {
  /**
   * @ignore
   */
  constructor() {
    this.childrenReference = {}; // child id's per node id
    this.parentReference = {}; // parent id's per node id
    this.trees = {}; // tree id per node id; i.e. to which tree does given node id belong

    this.distributionOrdering = {}; // The nodes per level, in the display order
    this.levels = {}; // hierarchy level per node id
    this.distributionIndex = {}; // The position of the node in the level sorting order, per node id.

    this.isTree = false; // True if current network is a formal tree
    this.treeIndex = -1; // Highest tree id in current network.
  }

  /**
   * Add the relation between given nodes to the current state.
   *
   * @param {Node.id} parentNodeId
   * @param {Node.id} childNodeId
   */
  addRelation(parentNodeId, childNodeId) {
    if (this.childrenReference[parentNodeId] === undefined) {
      this.childrenReference[parentNodeId] = [];
    }
    this.childrenReference[parentNodeId].push(childNodeId);

    if (this.parentReference[childNodeId] === undefined) {
      this.parentReference[childNodeId] = [];
    }
    this.parentReference[childNodeId].push(parentNodeId);
  }

  /**
   * Check if the current state is for a formal tree or formal forest.
   *
   * This is the case if every node has at most one parent.
   *
   * Pre: parentReference init'ed properly for current network
   */
  checkIfTree() {
    for (const i in this.parentReference) {
      if (this.parentReference[i].length > 1) {
        this.isTree = false;
        return;
      }
    }

    this.isTree = true;
  }

  /**
   * Return the number of separate trees in the current network.
   *
   * @returns {number}
   */
  numTrees() {
    return this.treeIndex + 1; // This assumes the indexes are assigned consecitively
  }

  /**
   * Assign a tree id to a node
   *
   * @param {Node} node
   * @param {string|number} treeId
   */
  setTreeIndex(node, treeId) {
    if (treeId === undefined) return; // Don't bother

    if (this.trees[node.id] === undefined) {
      this.trees[node.id] = treeId;
      this.treeIndex = Math.max(treeId, this.treeIndex);
    }
  }

  /**
   * Ensure level for given id is defined.
   *
   * Sets level to zero for given node id if not already present
   *
   * @param {Node.id} nodeId
   */
  ensureLevel(nodeId) {
    if (this.levels[nodeId] === undefined) {
      this.levels[nodeId] = 0;
    }
  }

  /**
   * get the maximum level of a branch.
   *
   * TODO: Never entered; find a test case to test this!
   *
   * @param {Node.id} nodeId
   * @returns {number}
   */
  getMaxLevel(nodeId) {
    const accumulator = {};

    const _getMaxLevel = (nodeId) => {
      if (accumulator[nodeId] !== undefined) {
        return accumulator[nodeId];
      }
      let level = this.levels[nodeId];
      if (this.childrenReference[nodeId]) {
        const children = this.childrenReference[nodeId];
        if (children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            level = Math.max(level, _getMaxLevel(children[i]));
          }
        }
      }
      accumulator[nodeId] = level;
      return level;
    };

    return _getMaxLevel(nodeId);
  }

  /**
   *
   * @param {Node} nodeA
   * @param {Node} nodeB
   */
  levelDownstream(nodeA, nodeB) {
    if (this.levels[nodeB.id] === undefined) {
      // set initial level
      if (this.levels[nodeA.id] === undefined) {
        this.levels[nodeA.id] = 0;
      }
      // set level
      this.levels[nodeB.id] = this.levels[nodeA.id] + 1;
    }
  }

  /**
   * Small util method to set the minimum levels of the nodes to zero.
   *
   * @param {Array.<Node>} nodes
   */
  setMinLevelToZero(nodes) {
    let minLevel = 1e9;
    // get the minimum level
    for (const nodeId in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
        if (this.levels[nodeId] !== undefined) {
          minLevel = Math.min(this.levels[nodeId], minLevel);
        }
      }
    }

    // subtract the minimum from the set so we have a range starting from 0
    for (const nodeId in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
        if (this.levels[nodeId] !== undefined) {
          this.levels[nodeId] -= minLevel;
        }
      }
    }
  }

  /**
   * Get the min and max xy-coordinates of a given tree
   *
   * @param {Array.<Node>} nodes
   * @param {number} index
   * @returns {{min_x: number, max_x: number, min_y: number, max_y: number}}
   */
  getTreeSize(nodes, index) {
    let min_x = 1e9;
    let max_x = -1e9;
    let min_y = 1e9;
    let max_y = -1e9;

    for (const nodeId in this.trees) {
      if (Object.prototype.hasOwnProperty.call(this.trees, nodeId)) {
        if (this.trees[nodeId] === index) {
          const node = nodes[nodeId];
          min_x = Math.min(node.x, min_x);
          max_x = Math.max(node.x, max_x);
          min_y = Math.min(node.y, min_y);
          max_y = Math.max(node.y, max_y);
        }
      }
    }

    return {
      min_x: min_x,
      max_x: max_x,
      min_y: min_y,
      max_y: max_y,
    };
  }

  /**
   * Check if two nodes have the same parent(s)
   *
   * @param {Node} node1
   * @param {Node} node2
   * @returns {boolean} true if the two nodes have a same ancestor node, false otherwise
   */
  hasSameParent(node1, node2) {
    const parents1 = this.parentReference[node1.id];
    const parents2 = this.parentReference[node2.id];
    if (parents1 === undefined || parents2 === undefined) {
      return false;
    }

    for (let i = 0; i < parents1.length; i++) {
      for (let j = 0; j < parents2.length; j++) {
        if (parents1[i] == parents2[j]) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Check if two nodes are in the same tree.
   *
   * @param {Node} node1
   * @param {Node} node2
   * @returns {boolean} true if this is so, false otherwise
   */
  inSameSubNetwork(node1, node2) {
    return this.trees[node1.id] === this.trees[node2.id];
  }

  /**
   * Get a list of the distinct levels in the current network
   *
   * @returns {Array}
   */
  getLevels() {
    return Object.keys(this.distributionOrdering);
  }

  /**
   * Add a node to the ordering per level
   *
   * @param {Node} node
   * @param {number} level
   */
  addToOrdering(node, level) {
    if (this.distributionOrdering[level] === undefined) {
      this.distributionOrdering[level] = [];
    }

    let isPresent = false;
    const curLevel = this.distributionOrdering[level];
    for (const n in curLevel) {
      //if (curLevel[n].id === node.id) {
      if (curLevel[n] === node) {
        isPresent = true;
        break;
      }
    }

    if (!isPresent) {
      this.distributionOrdering[level].push(node);
      this.distributionIndex[node.id] =
        this.distributionOrdering[level].length - 1;
    }
  }
}

/**
 * The Layout Engine
 */
class LayoutEngine {
  /**
   * @param {object} body
   */
  constructor(body) {
    this.body = body;

    // Make sure there always is some RNG because the setOptions method won't
    // set it unless there's a seed for it.
    this._resetRNG(Math.random() + ":" + Date.now());

    this.setPhysics = false;
    this.options = {};
    this.optionsBackup = { physics: {} };

    this.defaultOptions = {
      randomSeed: undefined,
      improvedLayout: true,
      clusterThreshold: 150,
      hierarchical: {
        enabled: false,
        levelSeparation: 150,
        nodeSpacing: 100,
        treeSpacing: 200,
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: "UD", // UD, DU, LR, RL
        sortMethod: "hubsize", // hubsize, directed
      },
    };
    Object.assign(this.options, this.defaultOptions);
    this.bindEventListeners();
  }

  /**
   * Binds event listeners
   */
  bindEventListeners() {
    this.body.emitter.on("_dataChanged", () => {
      this.setupHierarchicalLayout();
    });
    this.body.emitter.on("_dataLoaded", () => {
      this.layoutNetwork();
    });
    this.body.emitter.on("_resetHierarchicalLayout", () => {
      this.setupHierarchicalLayout();
    });
    this.body.emitter.on("_adjustEdgesForHierarchicalLayout", () => {
      if (this.options.hierarchical.enabled !== true) {
        return;
      }
      // get the type of static smooth curve in case it is required
      const type = this.direction.curveType();

      // force all edges into static smooth curves.
      this.body.emitter.emit("_forceDisableDynamicCurves", type, false);
    });
  }

  /**
   *
   * @param {object} options
   * @param {object} allOptions
   * @returns {object}
   */
  setOptions(options, allOptions) {
    if (options !== undefined) {
      const hierarchical = this.options.hierarchical;
      const prevHierarchicalState = hierarchical.enabled;
      selectiveDeepExtend(
        ["randomSeed", "improvedLayout", "clusterThreshold"],
        this.options,
        options
      );
      mergeOptions(this.options, options, "hierarchical");

      if (options.randomSeed !== undefined) {
        this._resetRNG(options.randomSeed);
      }

      if (hierarchical.enabled === true) {
        if (prevHierarchicalState === true) {
          // refresh the overridden options for nodes and edges.
          this.body.emitter.emit("refresh", true);
        }

        // make sure the level separation is the right way up
        if (
          hierarchical.direction === "RL" ||
          hierarchical.direction === "DU"
        ) {
          if (hierarchical.levelSeparation > 0) {
            hierarchical.levelSeparation *= -1;
          }
        } else {
          if (hierarchical.levelSeparation < 0) {
            hierarchical.levelSeparation *= -1;
          }
        }

        this.setDirectionStrategy();

        this.body.emitter.emit("_resetHierarchicalLayout");
        // because the hierarchical system needs it's own physics and smooth curve settings,
        // we adapt the other options if needed.
        return this.adaptAllOptionsForHierarchicalLayout(allOptions);
      } else {
        if (prevHierarchicalState === true) {
          // refresh the overridden options for nodes and edges.
          this.body.emitter.emit("refresh");
          return deepExtend(allOptions, this.optionsBackup);
        }
      }
    }
    return allOptions;
  }

  /**
   * Reset the random number generator with given seed.
   *
   * @param {any} seed - The seed that will be forwarded the the RNG.
   */
  _resetRNG(seed) {
    this.initialRandomSeed = seed;
    this._rng = Alea(this.initialRandomSeed);
  }

  /**
   *
   * @param {object} allOptions
   * @returns {object}
   */
  adaptAllOptionsForHierarchicalLayout(allOptions) {
    if (this.options.hierarchical.enabled === true) {
      const backupPhysics = this.optionsBackup.physics;

      // set the physics
      if (allOptions.physics === undefined || allOptions.physics === true) {
        allOptions.physics = {
          enabled:
            backupPhysics.enabled === undefined ? true : backupPhysics.enabled,
          solver: "hierarchicalRepulsion",
        };
        backupPhysics.enabled =
          backupPhysics.enabled === undefined ? true : backupPhysics.enabled;
        backupPhysics.solver = backupPhysics.solver || "barnesHut";
      } else if (typeof allOptions.physics === "object") {
        backupPhysics.enabled =
          allOptions.physics.enabled === undefined
            ? true
            : allOptions.physics.enabled;
        backupPhysics.solver = allOptions.physics.solver || "barnesHut";
        allOptions.physics.solver = "hierarchicalRepulsion";
      } else if (allOptions.physics !== false) {
        backupPhysics.solver = "barnesHut";
        allOptions.physics = { solver: "hierarchicalRepulsion" };
      }

      // get the type of static smooth curve in case it is required
      let type = this.direction.curveType();

      // disable smooth curves if nothing is defined. If smooth curves have been turned on,
      // turn them into static smooth curves.
      if (allOptions.edges === undefined) {
        this.optionsBackup.edges = {
          smooth: { enabled: true, type: "dynamic" },
        };
        allOptions.edges = { smooth: false };
      } else if (allOptions.edges.smooth === undefined) {
        this.optionsBackup.edges = {
          smooth: { enabled: true, type: "dynamic" },
        };
        allOptions.edges.smooth = false;
      } else {
        if (typeof allOptions.edges.smooth === "boolean") {
          this.optionsBackup.edges = { smooth: allOptions.edges.smooth };
          allOptions.edges.smooth = {
            enabled: allOptions.edges.smooth,
            type: type,
          };
        } else {
          const smooth = allOptions.edges.smooth;

          // allow custom types except for dynamic
          if (smooth.type !== undefined && smooth.type !== "dynamic") {
            type = smooth.type;
          }

          // TODO: this is options merging; see if the standard routines can be used here.
          this.optionsBackup.edges = {
            smooth: {
              enabled: smooth.enabled === undefined ? true : smooth.enabled,
              type: smooth.type === undefined ? "dynamic" : smooth.type,
              roundness:
                smooth.roundness === undefined ? 0.5 : smooth.roundness,
              forceDirection:
                smooth.forceDirection === undefined
                  ? false
                  : smooth.forceDirection,
            },
          };

          // NOTE: Copying an object to self; this is basically setting defaults for undefined variables
          allOptions.edges.smooth = {
            enabled: smooth.enabled === undefined ? true : smooth.enabled,
            type: type,
            roundness: smooth.roundness === undefined ? 0.5 : smooth.roundness,
            forceDirection:
              smooth.forceDirection === undefined
                ? false
                : smooth.forceDirection,
          };
        }
      }

      // Force all edges into static smooth curves.
      // Only applies to edges that do not use the global options for smooth.
      this.body.emitter.emit("_forceDisableDynamicCurves", type);
    }

    return allOptions;
  }

  /**
   *
   * @param {Array.<Node>} nodesArray
   */
  positionInitially(nodesArray) {
    if (this.options.hierarchical.enabled !== true) {
      this._resetRNG(this.initialRandomSeed);
      const radius = nodesArray.length + 50;
      for (let i = 0; i < nodesArray.length; i++) {
        const node = nodesArray[i];
        const angle = 2 * Math.PI * this._rng();
        if (node.x === undefined) {
          node.x = radius * Math.cos(angle);
        }
        if (node.y === undefined) {
          node.y = radius * Math.sin(angle);
        }
      }
    }
  }

  /**
   * Use Kamada Kawai to position nodes. This is quite a heavy algorithm so if there are a lot of nodes we
   * cluster them first to reduce the amount.
   */
  layoutNetwork() {
    if (
      this.options.hierarchical.enabled !== true &&
      this.options.improvedLayout === true
    ) {
      const indices = this.body.nodeIndices;

      // first check if we should Kamada Kawai to layout. The threshold is if less than half of the visible
      // nodes have predefined positions we use this.
      let positionDefined = 0;
      for (let i = 0; i < indices.length; i++) {
        const node = this.body.nodes[indices[i]];
        if (node.predefinedPosition === true) {
          positionDefined += 1;
        }
      }

      // if less than half of the nodes have a predefined position we continue
      if (positionDefined < 0.5 * indices.length) {
        const MAX_LEVELS = 10;
        let level = 0;
        const clusterThreshold = this.options.clusterThreshold;

        //
        // Define the options for the hidden cluster nodes
        // These options don't propagate outside the clustering phase.
        //
        // Some options are explicitly disabled, because they may be set in group or default node options.
        // The clusters are never displayed, so most explicit settings here serve as performance optimizations.
        //
        // The explicit setting of 'shape' is to avoid `shape: 'image'`; images are not passed to the hidden
        // cluster nodes, leading to an exception on creation.
        //
        // All settings here are performance related, except when noted otherwise.
        //
        const clusterOptions = {
          clusterNodeProperties: {
            shape: "ellipse", // Bugfix: avoid type 'image', no images supplied
            label: "", // avoid label handling
            group: "", // avoid group handling
            font: { multi: false }, // avoid font propagation
          },
          clusterEdgeProperties: {
            label: "", // avoid label handling
            font: { multi: false }, // avoid font propagation
            smooth: {
              enabled: false, // avoid drawing penalty for complex edges
            },
          },
        };

        // if there are a lot of nodes, we cluster before we run the algorithm.
        // NOTE: this part fails to find clusters for large scale-free networks, which should
        //       be easily clusterable.
        // TODO: examine why this is so
        if (indices.length > clusterThreshold) {
          const startLength = indices.length;
          while (indices.length > clusterThreshold && level <= MAX_LEVELS) {
            //console.time("clustering")
            level += 1;
            const before = indices.length;
            // if there are many nodes we do a hubsize cluster
            if (level % 3 === 0) {
              this.body.modules.clustering.clusterBridges(clusterOptions);
            } else {
              this.body.modules.clustering.clusterOutliers(clusterOptions);
            }
            const after = indices.length;
            if (before == after && level % 3 !== 0) {
              this._declusterAll();
              this.body.emitter.emit("_layoutFailed");
              console.info(
                "This network could not be positioned by this version of the improved layout algorithm." +
                  " Please disable improvedLayout for better performance."
              );
              return;
            }
            //console.timeEnd("clustering")
            //console.log(before,level,after);
          }
          // increase the size of the edges
          this.body.modules.kamadaKawai.setOptions({
            springLength: Math.max(150, 2 * startLength),
          });
        }
        if (level > MAX_LEVELS) {
          console.info(
            "The clustering didn't succeed within the amount of interations allowed," +
              " progressing with partial result."
          );
        }

        // position the system for these nodes and edges
        this.body.modules.kamadaKawai.solve(
          indices,
          this.body.edgeIndices,
          true
        );

        // shift to center point
        this._shiftToCenter();

        // perturb the nodes a little bit to force the physics to kick in
        const offset = 70;
        for (let i = 0; i < indices.length; i++) {
          // Only perturb the nodes that aren't fixed
          const node = this.body.nodes[indices[i]];
          if (node.predefinedPosition === false) {
            node.x += (0.5 - this._rng()) * offset;
            node.y += (0.5 - this._rng()) * offset;
          }
        }

        // uncluster all clusters
        this._declusterAll();

        // reposition all bezier nodes.
        this.body.emitter.emit("_repositionBezierNodes");
      }
    }
  }

  /**
   * Move all the nodes towards to the center so gravitational pull wil not move the nodes away from view
   *
   * @private
   */
  _shiftToCenter() {
    const range = NetworkUtil.getRangeCore(
      this.body.nodes,
      this.body.nodeIndices
    );
    const center = NetworkUtil.findCenter(range);
    for (let i = 0; i < this.body.nodeIndices.length; i++) {
      const node = this.body.nodes[this.body.nodeIndices[i]];
      node.x -= center.x;
      node.y -= center.y;
    }
  }

  /**
   * Expands all clusters
   *
   * @private
   */
  _declusterAll() {
    let clustersPresent = true;
    while (clustersPresent === true) {
      clustersPresent = false;
      for (let i = 0; i < this.body.nodeIndices.length; i++) {
        if (this.body.nodes[this.body.nodeIndices[i]].isCluster === true) {
          clustersPresent = true;
          this.body.modules.clustering.openCluster(
            this.body.nodeIndices[i],
            {},
            false
          );
        }
      }
      if (clustersPresent === true) {
        this.body.emitter.emit("_dataChanged");
      }
    }
  }

  /**
   *
   * @returns {number|*}
   */
  getSeed() {
    return this.initialRandomSeed;
  }

  /**
   * This is the main function to layout the nodes in a hierarchical way.
   * It checks if the node details are supplied correctly
   *
   * @private
   */
  setupHierarchicalLayout() {
    if (
      this.options.hierarchical.enabled === true &&
      this.body.nodeIndices.length > 0
    ) {
      // get the size of the largest hubs and check if the user has defined a level for a node.
      let node, nodeId;
      let definedLevel = false;
      let undefinedLevel = false;
      this.lastNodeOnLevel = {};
      this.hierarchical = new HierarchicalStatus();

      for (nodeId in this.body.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
          node = this.body.nodes[nodeId];
          if (node.options.level !== undefined) {
            definedLevel = true;
            this.hierarchical.levels[nodeId] = node.options.level;
          } else {
            undefinedLevel = true;
          }
        }
      }

      // if the user defined some levels but not all, alert and run without hierarchical layout
      if (undefinedLevel === true && definedLevel === true) {
        throw new Error(
          "To use the hierarchical layout, nodes require either no predefined levels" +
            " or levels have to be defined for all nodes."
        );
      } else {
        // define levels if undefined by the users. Based on hubsize.
        if (undefinedLevel === true) {
          const sortMethod = this.options.hierarchical.sortMethod;
          if (sortMethod === "hubsize") {
            this._determineLevelsByHubsize();
          } else if (sortMethod === "directed") {
            this._determineLevelsDirected();
          } else if (sortMethod === "custom") {
            this._determineLevelsCustomCallback();
          }
        }

        // fallback for cases where there are nodes but no edges
        for (const nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            this.hierarchical.ensureLevel(nodeId);
          }
        }
        // check the distribution of the nodes per level.
        const distribution = this._getDistribution();

        // get the parent children relations.
        this._generateMap();

        // place the nodes on the canvas.
        this._placeNodesByHierarchy(distribution);

        // condense the whitespace.
        this._condenseHierarchy();

        // shift to center so gravity does not have to do much
        this._shiftToCenter();
      }
    }
  }

  /**
   * @private
   */
  _condenseHierarchy() {
    // Global var in this scope to define when the movement has stopped.
    let stillShifting = false;
    const branches = {};
    // first we have some methods to help shifting trees around.
    // the main method to shift the trees
    const shiftTrees = () => {
      const treeSizes = getTreeSizes();
      let shiftBy = 0;
      for (let i = 0; i < treeSizes.length - 1; i++) {
        const diff = treeSizes[i].max - treeSizes[i + 1].min;
        shiftBy += diff + this.options.hierarchical.treeSpacing;
        shiftTree(i + 1, shiftBy);
      }
    };

    // shift a single tree by an offset
    const shiftTree = (index, offset) => {
      const trees = this.hierarchical.trees;

      for (const nodeId in trees) {
        if (Object.prototype.hasOwnProperty.call(trees, nodeId)) {
          if (trees[nodeId] === index) {
            this.direction.shift(nodeId, offset);
          }
        }
      }
    };

    // get the width of all trees
    const getTreeSizes = () => {
      const treeWidths = [];
      for (let i = 0; i < this.hierarchical.numTrees(); i++) {
        treeWidths.push(this.direction.getTreeSize(i));
      }
      return treeWidths;
    };

    // get a map of all nodes in this branch
    const getBranchNodes = (source, map) => {
      if (map[source.id]) {
        return;
      }
      map[source.id] = true;
      if (this.hierarchical.childrenReference[source.id]) {
        const children = this.hierarchical.childrenReference[source.id];
        if (children.length > 0) {
          for (let i = 0; i < children.length; i++) {
            getBranchNodes(this.body.nodes[children[i]], map);
          }
        }
      }
    };

    // get a min max width as well as the maximum movement space it has on either sides
    // we use min max terminology because width and height can interchange depending on the direction of the layout
    const getBranchBoundary = (branchMap, maxLevel = 1e9) => {
      let minSpace = 1e9;
      let maxSpace = 1e9;
      let min = 1e9;
      let max = -1e9;
      for (const branchNode in branchMap) {
        if (Object.prototype.hasOwnProperty.call(branchMap, branchNode)) {
          const node = this.body.nodes[branchNode];
          const level = this.hierarchical.levels[node.id];
          const position = this.direction.getPosition(node);

          // get the space around the node.
          const [minSpaceNode, maxSpaceNode] = this._getSpaceAroundNode(
            node,
            branchMap
          );
          minSpace = Math.min(minSpaceNode, minSpace);
          maxSpace = Math.min(maxSpaceNode, maxSpace);

          // the width is only relevant for the levels two nodes have in common. This is why we filter on this.
          if (level <= maxLevel) {
            min = Math.min(position, min);
            max = Math.max(position, max);
          }
        }
      }

      return [min, max, minSpace, maxSpace];
    };

    // check what the maximum level is these nodes have in common.
    const getCollisionLevel = (node1, node2) => {
      const maxLevel1 = this.hierarchical.getMaxLevel(node1.id);
      const maxLevel2 = this.hierarchical.getMaxLevel(node2.id);
      return Math.min(maxLevel1, maxLevel2);
    };

    /**
     * Condense elements. These can be nodes or branches depending on the callback.
     *
     * @param {Function} callback
     * @param {Array.<number>} levels
     * @param {*} centerParents
     */
    const shiftElementsCloser = (callback, levels, centerParents) => {
      const hier = this.hierarchical;

      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        const levelNodes = hier.distributionOrdering[level];
        if (levelNodes.length > 1) {
          for (let j = 0; j < levelNodes.length - 1; j++) {
            const node1 = levelNodes[j];
            const node2 = levelNodes[j + 1];

            // NOTE: logic maintained as it was; if nodes have same ancestor,
            //       then of course they are in the same sub-network.
            if (
              hier.hasSameParent(node1, node2) &&
              hier.inSameSubNetwork(node1, node2)
            ) {
              callback(node1, node2, centerParents);
            }
          }
        }
      }
    };

    // callback for shifting branches
    const branchShiftCallback = (node1, node2, centerParent = false) => {
      //window.CALLBACKS.push(() => {
      const pos1 = this.direction.getPosition(node1);
      const pos2 = this.direction.getPosition(node2);
      const diffAbs = Math.abs(pos2 - pos1);
      const nodeSpacing = this.options.hierarchical.nodeSpacing;
      //console.log("NOW CHECKING:", node1.id, node2.id, diffAbs);
      if (diffAbs > nodeSpacing) {
        const branchNodes1 = {};
        const branchNodes2 = {};

        getBranchNodes(node1, branchNodes1);
        getBranchNodes(node2, branchNodes2);

        // check the largest distance between the branches
        const maxLevel = getCollisionLevel(node1, node2);
        const branchNodeBoundary1 = getBranchBoundary(branchNodes1, maxLevel);
        const branchNodeBoundary2 = getBranchBoundary(branchNodes2, maxLevel);
        const max1 = branchNodeBoundary1[1];
        const min2 = branchNodeBoundary2[0];
        const minSpace2 = branchNodeBoundary2[2];

        //console.log(node1.id, getBranchBoundary(branchNodes1, maxLevel), node2.id,
        //            getBranchBoundary(branchNodes2, maxLevel), maxLevel);
        const diffBranch = Math.abs(max1 - min2);
        if (diffBranch > nodeSpacing) {
          let offset = max1 - min2 + nodeSpacing;
          if (offset < -minSpace2 + nodeSpacing) {
            offset = -minSpace2 + nodeSpacing;
            //console.log("RESETTING OFFSET", max1 - min2 + this.options.hierarchical.nodeSpacing, -minSpace2, offset);
          }
          if (offset < 0) {
            //console.log("SHIFTING", node2.id, offset);
            this._shiftBlock(node2.id, offset);
            stillShifting = true;

            if (centerParent === true) this._centerParent(node2);
          }
        }
      }
      //this.body.emitter.emit("_redraw");})
    };

    const minimizeEdgeLength = (iterations, node) => {
      //window.CALLBACKS.push(() => {
      //  console.log("ts",node.id);
      const nodeId = node.id;
      const allEdges = node.edges;
      const nodeLevel = this.hierarchical.levels[node.id];

      // gather constants
      const C2 =
        this.options.hierarchical.levelSeparation *
        this.options.hierarchical.levelSeparation;
      const referenceNodes = {};
      const aboveEdges = [];
      for (let i = 0; i < allEdges.length; i++) {
        const edge = allEdges[i];
        if (edge.toId != edge.fromId) {
          const otherNode = edge.toId == nodeId ? edge.from : edge.to;
          referenceNodes[allEdges[i].id] = otherNode;
          if (this.hierarchical.levels[otherNode.id] < nodeLevel) {
            aboveEdges.push(edge);
          }
        }
      }

      // differentiated sum of lengths based on only moving one node over one axis
      const getFx = (point, edges) => {
        let sum = 0;
        for (let i = 0; i < edges.length; i++) {
          if (referenceNodes[edges[i].id] !== undefined) {
            const a =
              this.direction.getPosition(referenceNodes[edges[i].id]) - point;
            sum += a / Math.sqrt(a * a + C2);
          }
        }
        return sum;
      };

      // doubly differentiated sum of lengths based on only moving one node over one axis
      const getDFx = (point, edges) => {
        let sum = 0;
        for (let i = 0; i < edges.length; i++) {
          if (referenceNodes[edges[i].id] !== undefined) {
            const a =
              this.direction.getPosition(referenceNodes[edges[i].id]) - point;
            sum -= C2 * Math.pow(a * a + C2, -1.5);
          }
        }
        return sum;
      };

      const getGuess = (iterations, edges) => {
        let guess = this.direction.getPosition(node);
        // Newton's method for optimization
        const guessMap = {};
        for (let i = 0; i < iterations; i++) {
          const fx = getFx(guess, edges);
          const dfx = getDFx(guess, edges);

          // we limit the movement to avoid instability.
          const limit = 40;
          const ratio = Math.max(-limit, Math.min(limit, Math.round(fx / dfx)));
          guess = guess - ratio;
          // reduce duplicates
          if (guessMap[guess] !== undefined) {
            break;
          }
          guessMap[guess] = i;
        }
        return guess;
      };

      const moveBranch = (guess) => {
        // position node if there is space
        const nodePosition = this.direction.getPosition(node);

        // check movable area of the branch
        if (branches[node.id] === undefined) {
          const branchNodes = {};
          getBranchNodes(node, branchNodes);
          branches[node.id] = branchNodes;
        }
        const branchBoundary = getBranchBoundary(branches[node.id]);
        const minSpaceBranch = branchBoundary[2];
        const maxSpaceBranch = branchBoundary[3];

        const diff = guess - nodePosition;

        // check if we are allowed to move the node:
        let branchOffset = 0;
        if (diff > 0) {
          branchOffset = Math.min(
            diff,
            maxSpaceBranch - this.options.hierarchical.nodeSpacing
          );
        } else if (diff < 0) {
          branchOffset = -Math.min(
            -diff,
            minSpaceBranch - this.options.hierarchical.nodeSpacing
          );
        }

        if (branchOffset != 0) {
          //console.log("moving branch:",branchOffset, maxSpaceBranch, minSpaceBranch)
          this._shiftBlock(node.id, branchOffset);
          //this.body.emitter.emit("_redraw");
          stillShifting = true;
        }
      };

      const moveNode = (guess) => {
        const nodePosition = this.direction.getPosition(node);

        // position node if there is space
        const [minSpace, maxSpace] = this._getSpaceAroundNode(node);
        const diff = guess - nodePosition;
        // check if we are allowed to move the node:
        let newPosition = nodePosition;
        if (diff > 0) {
          newPosition = Math.min(
            nodePosition + (maxSpace - this.options.hierarchical.nodeSpacing),
            guess
          );
        } else if (diff < 0) {
          newPosition = Math.max(
            nodePosition - (minSpace - this.options.hierarchical.nodeSpacing),
            guess
          );
        }

        if (newPosition !== nodePosition) {
          //console.log("moving Node:",diff, minSpace, maxSpace);
          this.direction.setPosition(node, newPosition);
          //this.body.emitter.emit("_redraw");
          stillShifting = true;
        }
      };

      let guess = getGuess(iterations, aboveEdges);
      moveBranch(guess);
      guess = getGuess(iterations, allEdges);
      moveNode(guess);
      //})
    };

    // method to remove whitespace between branches. Because we do bottom up, we can center the parents.
    const minimizeEdgeLengthBottomUp = (iterations) => {
      let levels = this.hierarchical.getLevels();
      levels = levels.reverse();
      for (let i = 0; i < iterations; i++) {
        stillShifting = false;
        for (let j = 0; j < levels.length; j++) {
          const level = levels[j];
          const levelNodes = this.hierarchical.distributionOrdering[level];
          for (let k = 0; k < levelNodes.length; k++) {
            minimizeEdgeLength(1000, levelNodes[k]);
          }
        }
        if (stillShifting !== true) {
          //console.log("FINISHED minimizeEdgeLengthBottomUp IN " + i);
          break;
        }
      }
    };

    // method to remove whitespace between branches. Because we do bottom up, we can center the parents.
    const shiftBranchesCloserBottomUp = (iterations) => {
      let levels = this.hierarchical.getLevels();
      levels = levels.reverse();
      for (let i = 0; i < iterations; i++) {
        stillShifting = false;
        shiftElementsCloser(branchShiftCallback, levels, true);
        if (stillShifting !== true) {
          //console.log("FINISHED shiftBranchesCloserBottomUp IN " + (i+1));
          break;
        }
      }
    };

    // center all parents
    const centerAllParents = () => {
      for (const nodeId in this.body.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId))
          this._centerParent(this.body.nodes[nodeId]);
      }
    };

    // center all parents
    const centerAllParentsBottomUp = () => {
      let levels = this.hierarchical.getLevels();
      levels = levels.reverse();
      for (let i = 0; i < levels.length; i++) {
        const level = levels[i];
        const levelNodes = this.hierarchical.distributionOrdering[level];
        for (let j = 0; j < levelNodes.length; j++) {
          this._centerParent(levelNodes[j]);
        }
      }
    };

    // the actual work is done here.
    if (this.options.hierarchical.blockShifting === true) {
      shiftBranchesCloserBottomUp(5);
      centerAllParents();
    }

    // minimize edge length
    if (this.options.hierarchical.edgeMinimization === true) {
      minimizeEdgeLengthBottomUp(20);
    }

    if (this.options.hierarchical.parentCentralization === true) {
      centerAllParentsBottomUp();
    }

    shiftTrees();
  }

  /**
   * This gives the space around the node. IF a map is supplied, it will only check against nodes NOT in the map.
   * This is used to only get the distances to nodes outside of a branch.
   *
   * @param {Node} node
   * @param {{Node.id: vis.Node}} map
   * @returns {number[]}
   * @private
   */
  _getSpaceAroundNode(node, map) {
    let useMap = true;
    if (map === undefined) {
      useMap = false;
    }
    const level = this.hierarchical.levels[node.id];
    if (level !== undefined) {
      const index = this.hierarchical.distributionIndex[node.id];
      const position = this.direction.getPosition(node);
      const ordering = this.hierarchical.distributionOrdering[level];
      let minSpace = 1e9;
      let maxSpace = 1e9;
      if (index !== 0) {
        const prevNode = ordering[index - 1];
        if (
          (useMap === true && map[prevNode.id] === undefined) ||
          useMap === false
        ) {
          const prevPos = this.direction.getPosition(prevNode);
          minSpace = position - prevPos;
        }
      }

      if (index != ordering.length - 1) {
        const nextNode = ordering[index + 1];
        if (
          (useMap === true && map[nextNode.id] === undefined) ||
          useMap === false
        ) {
          const nextPos = this.direction.getPosition(nextNode);
          maxSpace = Math.min(maxSpace, nextPos - position);
        }
      }

      return [minSpace, maxSpace];
    } else {
      return [0, 0];
    }
  }

  /**
   * We use this method to center a parent node and check if it does not cross other nodes when it does.
   *
   * @param {Node} node
   * @private
   */
  _centerParent(node) {
    if (this.hierarchical.parentReference[node.id]) {
      const parents = this.hierarchical.parentReference[node.id];
      for (let i = 0; i < parents.length; i++) {
        const parentId = parents[i];
        const parentNode = this.body.nodes[parentId];
        const children = this.hierarchical.childrenReference[parentId];

        if (children !== undefined) {
          // get the range of the children
          const newPosition = this._getCenterPosition(children);

          const position = this.direction.getPosition(parentNode);
          const [minSpace, maxSpace] = this._getSpaceAroundNode(parentNode);
          const diff = position - newPosition;
          if (
            (diff < 0 &&
              Math.abs(diff) <
                maxSpace - this.options.hierarchical.nodeSpacing) ||
            (diff > 0 &&
              Math.abs(diff) < minSpace - this.options.hierarchical.nodeSpacing)
          ) {
            this.direction.setPosition(parentNode, newPosition);
          }
        }
      }
    }
  }

  /**
   * This function places the nodes on the canvas based on the hierarchial distribution.
   *
   * @param {object} distribution | obtained by the function this._getDistribution()
   * @private
   */
  _placeNodesByHierarchy(distribution) {
    this.positionedNodes = {};
    // start placing all the level 0 nodes first. Then recursively position their branches.
    for (const level in distribution) {
      if (Object.prototype.hasOwnProperty.call(distribution, level)) {
        // sort nodes in level by position:
        let nodeArray = Object.keys(distribution[level]);
        nodeArray = this._indexArrayToNodes(nodeArray);
        this.direction.sort(nodeArray);
        let handledNodeCount = 0;

        for (let i = 0; i < nodeArray.length; i++) {
          const node = nodeArray[i];
          if (this.positionedNodes[node.id] === undefined) {
            const spacing = this.options.hierarchical.nodeSpacing;
            let pos = spacing * handledNodeCount;
            // We get the X or Y values we need and store them in pos and previousPos.
            // The get and set make sure we get X or Y
            if (handledNodeCount > 0) {
              pos = this.direction.getPosition(nodeArray[i - 1]) + spacing;
            }
            this.direction.setPosition(node, pos, level);
            this._validatePositionAndContinue(node, level, pos);

            handledNodeCount++;
          }
        }
      }
    }
  }

  /**
   * This is a recursively called function to enumerate the branches from the largest hubs and place the nodes
   * on a X position that ensures there will be no overlap.
   *
   * @param {Node.id} parentId
   * @param {number} parentLevel
   * @private
   */
  _placeBranchNodes(parentId, parentLevel) {
    const childRef = this.hierarchical.childrenReference[parentId];

    // if this is not a parent, cancel the placing. This can happen with multiple parents to one child.
    if (childRef === undefined) {
      return;
    }

    // get a list of childNodes
    const childNodes = [];
    for (let i = 0; i < childRef.length; i++) {
      childNodes.push(this.body.nodes[childRef[i]]);
    }

    // use the positions to order the nodes.
    this.direction.sort(childNodes);

    // position the childNodes
    for (let i = 0; i < childNodes.length; i++) {
      const childNode = childNodes[i];
      const childNodeLevel = this.hierarchical.levels[childNode.id];
      // check if the child node is below the parent node and if it has already been positioned.
      if (
        childNodeLevel > parentLevel &&
        this.positionedNodes[childNode.id] === undefined
      ) {
        // get the amount of space required for this node. If parent the width is based on the amount of children.
        const spacing = this.options.hierarchical.nodeSpacing;
        let pos;

        // we get the X or Y values we need and store them in pos and previousPos.
        // The get and set make sure we get X or Y
        if (i === 0) {
          pos = this.direction.getPosition(this.body.nodes[parentId]);
        } else {
          pos = this.direction.getPosition(childNodes[i - 1]) + spacing;
        }
        this.direction.setPosition(childNode, pos, childNodeLevel);
        this._validatePositionAndContinue(childNode, childNodeLevel, pos);
      } else {
        return;
      }
    }

    // center the parent nodes.
    const center = this._getCenterPosition(childNodes);
    this.direction.setPosition(this.body.nodes[parentId], center, parentLevel);
  }

  /**
   * This method checks for overlap and if required shifts the branch. It also keeps records of positioned nodes.
   * Finally it will call _placeBranchNodes to place the branch nodes.
   *
   * @param {Node} node
   * @param {number} level
   * @param {number} pos
   * @private
   */
  _validatePositionAndContinue(node, level, pos) {
    // This method only works for formal trees and formal forests
    // Early exit if this is not the case
    if (!this.hierarchical.isTree) return;

    // if overlap has been detected, we shift the branch
    if (this.lastNodeOnLevel[level] !== undefined) {
      const previousPos = this.direction.getPosition(
        this.body.nodes[this.lastNodeOnLevel[level]]
      );
      if (pos - previousPos < this.options.hierarchical.nodeSpacing) {
        const diff = previousPos + this.options.hierarchical.nodeSpacing - pos;
        const sharedParent = this._findCommonParent(
          this.lastNodeOnLevel[level],
          node.id
        );
        this._shiftBlock(sharedParent.withChild, diff);
      }
    }

    this.lastNodeOnLevel[level] = node.id; // store change in position.
    this.positionedNodes[node.id] = true;
    this._placeBranchNodes(node.id, level);
  }

  /**
   * Receives an array with node indices and returns an array with the actual node references.
   * Used for sorting based on node properties.
   *
   * @param {Array.<Node.id>} idArray
   * @returns {Array.<Node>}
   */
  _indexArrayToNodes(idArray) {
    const array = [];
    for (let i = 0; i < idArray.length; i++) {
      array.push(this.body.nodes[idArray[i]]);
    }
    return array;
  }

  /**
   * This function get the distribution of levels based on hubsize
   *
   * @returns {object}
   * @private
   */
  _getDistribution() {
    const distribution = {};
    let nodeId, node;

    // we fix Y because the hierarchy is vertical,
    // we fix X so we do not give a node an x position for a second time.
    // the fix of X is removed after the x value has been set.
    for (nodeId in this.body.nodes) {
      if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
        node = this.body.nodes[nodeId];
        const level =
          this.hierarchical.levels[nodeId] === undefined
            ? 0
            : this.hierarchical.levels[nodeId];
        this.direction.fix(node, level);
        if (distribution[level] === undefined) {
          distribution[level] = {};
        }
        distribution[level][nodeId] = node;
      }
    }
    return distribution;
  }

  /**
   * Return the active (i.e. visible) edges for this node
   *
   * @param {Node} node
   * @returns {Array.<vis.Edge>} Array of edge instances
   * @private
   */
  _getActiveEdges(node) {
    const result = [];

    forEach(node.edges, (edge) => {
      if (this.body.edgeIndices.indexOf(edge.id) !== -1) {
        result.push(edge);
      }
    });

    return result;
  }

  /**
   * Get the hubsizes for all active nodes.
   *
   * @returns {number}
   * @private
   */
  _getHubSizes() {
    const hubSizes = {};
    const nodeIds = this.body.nodeIndices;

    forEach(nodeIds, (nodeId) => {
      const node = this.body.nodes[nodeId];
      const hubSize = this._getActiveEdges(node).length;
      hubSizes[hubSize] = true;
    });

    // Make an array of the size sorted descending
    const result = [];
    forEach(hubSizes, (size) => {
      result.push(Number(size));
    });

    result.sort(function (a, b) {
      return b - a;
    });

    return result;
  }

  /**
   * this function allocates nodes in levels based on the recursive branching from the largest hubs.
   *
   * @private
   */
  _determineLevelsByHubsize() {
    const levelDownstream = (nodeA, nodeB) => {
      this.hierarchical.levelDownstream(nodeA, nodeB);
    };

    const hubSizes = this._getHubSizes();

    for (let i = 0; i < hubSizes.length; ++i) {
      const hubSize = hubSizes[i];
      if (hubSize === 0) break;

      forEach(this.body.nodeIndices, (nodeId) => {
        const node = this.body.nodes[nodeId];

        if (hubSize === this._getActiveEdges(node).length) {
          this._crawlNetwork(levelDownstream, nodeId);
        }
      });
    }
  }

  /**
   * TODO: release feature
   * TODO: Determine if this feature is needed at all
   *
   * @private
   */
  _determineLevelsCustomCallback() {
    const minLevel = 100000;

    // TODO: this should come from options.
    // eslint-disable-next-line no-unused-vars -- This should eventually be implemented with these parameters used.
    const customCallback = function (nodeA, nodeB, edge) {};

    // TODO: perhaps move to HierarchicalStatus.
    //       But I currently don't see the point, this method is not used.
    const levelByDirection = (nodeA, nodeB, edge) => {
      let levelA = this.hierarchical.levels[nodeA.id];
      // set initial level
      if (levelA === undefined) {
        levelA = this.hierarchical.levels[nodeA.id] = minLevel;
      }

      const diff = customCallback(
        NetworkUtil.cloneOptions(nodeA, "node"),
        NetworkUtil.cloneOptions(nodeB, "node"),
        NetworkUtil.cloneOptions(edge, "edge")
      );

      this.hierarchical.levels[nodeB.id] = levelA + diff;
    };

    this._crawlNetwork(levelByDirection);
    this.hierarchical.setMinLevelToZero(this.body.nodes);
  }

  /**
   * Allocate nodes in levels based on the direction of the edges.
   *
   * @private
   */
  _determineLevelsDirected() {
    const nodes = this.body.nodeIndices.reduce((acc, id) => {
      acc.set(id, this.body.nodes[id]);
      return acc;
    }, new Map());

    if (this.options.hierarchical.shakeTowards === "roots") {
      this.hierarchical.levels = fillLevelsByDirectionRoots(nodes);
    } else {
      this.hierarchical.levels = fillLevelsByDirectionLeaves(nodes);
    }

    this.hierarchical.setMinLevelToZero(this.body.nodes);
  }

  /**
   * Update the bookkeeping of parent and child.
   *
   * @private
   */
  _generateMap() {
    const fillInRelations = (parentNode, childNode) => {
      if (
        this.hierarchical.levels[childNode.id] >
        this.hierarchical.levels[parentNode.id]
      ) {
        this.hierarchical.addRelation(parentNode.id, childNode.id);
      }
    };

    this._crawlNetwork(fillInRelations);
    this.hierarchical.checkIfTree();
  }

  /**
   * Crawl over the entire network and use a callback on each node couple that is connected to each other.
   *
   * @param {Function} [callback=function(){}]          | will receive nodeA, nodeB and the connecting edge. A and B are distinct.
   * @param {Node.id} startingNodeId
   * @private
   */
  _crawlNetwork(callback = function () {}, startingNodeId) {
    const progress = {};

    const crawler = (node, tree) => {
      if (progress[node.id] === undefined) {
        this.hierarchical.setTreeIndex(node, tree);

        progress[node.id] = true;
        let childNode;
        const edges = this._getActiveEdges(node);
        for (let i = 0; i < edges.length; i++) {
          const edge = edges[i];
          if (edge.connected === true) {
            if (edge.toId == node.id) {
              // Not '===' because id's can be string and numeric
              childNode = edge.from;
            } else {
              childNode = edge.to;
            }

            if (node.id != childNode.id) {
              // Not '!==' because id's can be string and numeric
              callback(node, childNode, edge);
              crawler(childNode, tree);
            }
          }
        }
      }
    };

    if (startingNodeId === undefined) {
      // Crawl over all nodes
      let treeIndex = 0; // Serves to pass a unique id for the current distinct tree

      for (let i = 0; i < this.body.nodeIndices.length; i++) {
        const nodeId = this.body.nodeIndices[i];

        if (progress[nodeId] === undefined) {
          const node = this.body.nodes[nodeId];
          crawler(node, treeIndex);
          treeIndex += 1;
        }
      }
    } else {
      // Crawl from the given starting node
      const node = this.body.nodes[startingNodeId];
      if (node === undefined) {
        console.error("Node not found:", startingNodeId);
        return;
      }
      crawler(node);
    }
  }

  /**
   * Shift a branch a certain distance
   *
   * @param {Node.id} parentId
   * @param {number} diff
   * @private
   */
  _shiftBlock(parentId, diff) {
    const progress = {};
    const shifter = (parentId) => {
      if (progress[parentId]) {
        return;
      }
      progress[parentId] = true;
      this.direction.shift(parentId, diff);

      const childRef = this.hierarchical.childrenReference[parentId];
      if (childRef !== undefined) {
        for (let i = 0; i < childRef.length; i++) {
          shifter(childRef[i]);
        }
      }
    };
    shifter(parentId);
  }

  /**
   * Find a common parent between branches.
   *
   * @param {Node.id} childA
   * @param {Node.id} childB
   * @returns {{foundParent, withChild}}
   * @private
   */
  _findCommonParent(childA, childB) {
    const parents = {};
    const iterateParents = (parents, child) => {
      const parentRef = this.hierarchical.parentReference[child];
      if (parentRef !== undefined) {
        for (let i = 0; i < parentRef.length; i++) {
          const parent = parentRef[i];
          parents[parent] = true;
          iterateParents(parents, parent);
        }
      }
    };
    const findParent = (parents, child) => {
      const parentRef = this.hierarchical.parentReference[child];
      if (parentRef !== undefined) {
        for (let i = 0; i < parentRef.length; i++) {
          const parent = parentRef[i];
          if (parents[parent] !== undefined) {
            return { foundParent: parent, withChild: child };
          }
          const branch = findParent(parents, parent);
          if (branch.foundParent !== null) {
            return branch;
          }
        }
      }
      return { foundParent: null, withChild: child };
    };

    iterateParents(parents, childA);
    return findParent(parents, childB);
  }

  /**
   * Set the strategy pattern for handling the coordinates given the current direction.
   *
   * The individual instances contain all the operations and data specific to a layout direction.
   *
   * @param {Node} node
   * @param {{x: number, y: number}} position
   * @param {number} level
   * @param {boolean} [doNotUpdate=false]
   * @private
   */
  setDirectionStrategy() {
    const isVertical =
      this.options.hierarchical.direction === "UD" ||
      this.options.hierarchical.direction === "DU";

    if (isVertical) {
      this.direction = new VerticalStrategy(this);
    } else {
      this.direction = new HorizontalStrategy(this);
    }
  }

  /**
   * Determine the center position of a branch from the passed list of child nodes
   *
   * This takes into account the positions of all the child nodes.
   *
   * @param {Array.<Node|vis.Node.id>} childNodes  Array of either child nodes or node id's
   * @returns {number}
   * @private
   */
  _getCenterPosition(childNodes) {
    let minPos = 1e9;
    let maxPos = -1e9;

    for (let i = 0; i < childNodes.length; i++) {
      let childNode;
      if (childNodes[i].id !== undefined) {
        childNode = childNodes[i];
      } else {
        const childNodeId = childNodes[i];
        childNode = this.body.nodes[childNodeId];
      }

      const position = this.direction.getPosition(childNode);
      minPos = Math.min(minPos, position);
      maxPos = Math.max(maxPos, position);
    }

    return 0.5 * (minPos + maxPos);
  }
}

/**
 * Clears the toolbar div element of children
 *
 * @private
 */
class ManipulationSystem {
  /**
   * @param {object} body
   * @param {Canvas} canvas
   * @param {SelectionHandler} selectionHandler
   * @param {InteractionHandler} interactionHandler
   */
  constructor(body, canvas, selectionHandler, interactionHandler) {
    this.body = body;
    this.canvas = canvas;
    this.selectionHandler = selectionHandler;
    this.interactionHandler = interactionHandler;

    this.editMode = false;
    this.manipulationDiv = undefined;
    this.editModeDiv = undefined;
    this.closeDiv = undefined;

    this._domEventListenerCleanupQueue = [];
    this.temporaryUIFunctions = {};
    this.temporaryEventFunctions = [];

    this.touchTime = 0;
    this.temporaryIds = { nodes: [], edges: [] };
    this.guiEnabled = false;
    this.inMode = false;
    this.selectedControlNode = undefined;

    this.options = {};
    this.defaultOptions = {
      enabled: false,
      initiallyActive: false,
      addNode: true,
      addEdge: true,
      editNode: undefined,
      editEdge: true,
      deleteNode: true,
      deleteEdge: true,
      controlNodeStyle: {
        shape: "dot",
        size: 6,
        color: {
          background: "#ff0000",
          border: "#3c3c3c",
          highlight: { background: "#07f968", border: "#3c3c3c" },
        },
        borderWidth: 2,
        borderWidthSelected: 2,
      },
    };
    Object.assign(this.options, this.defaultOptions);

    this.body.emitter.on("destroy", () => {
      this._clean();
    });
    this.body.emitter.on("_dataChanged", this._restore.bind(this));
    this.body.emitter.on("_resetData", this._restore.bind(this));
  }

  /**
   * If something changes in the data during editing, switch back to the initial datamanipulation state and close all edit modes.
   *
   * @private
   */
  _restore() {
    if (this.inMode !== false) {
      if (this.options.initiallyActive === true) {
        this.enableEditMode();
      } else {
        this.disableEditMode();
      }
    }
  }

  /**
   * Set the Options
   *
   * @param {object} options
   * @param {object} allOptions
   * @param {object} globalOptions
   */
  setOptions(options, allOptions, globalOptions) {
    if (allOptions !== undefined) {
      if (allOptions.locale !== undefined) {
        this.options.locale = allOptions.locale;
      } else {
        this.options.locale = globalOptions.locale;
      }
      if (allOptions.locales !== undefined) {
        this.options.locales = allOptions.locales;
      } else {
        this.options.locales = globalOptions.locales;
      }
    }

    if (options !== undefined) {
      if (typeof options === "boolean") {
        this.options.enabled = options;
      } else {
        this.options.enabled = true;
        deepExtend(this.options, options);
      }
      if (this.options.initiallyActive === true) {
        this.editMode = true;
      }
      this._setup();
    }
  }

  /**
   * Enable or disable edit-mode. Draws the DOM required and cleans up after itself.
   *
   * @private
   */
  toggleEditMode() {
    if (this.editMode === true) {
      this.disableEditMode();
    } else {
      this.enableEditMode();
    }
  }

  /**
   * Enables Edit Mode
   */
  enableEditMode() {
    this.editMode = true;

    this._clean();
    if (this.guiEnabled === true) {
      this.manipulationDiv.style.display = "block";
      this.closeDiv.style.display = "block";
      this.editModeDiv.style.display = "none";
      this.showManipulatorToolbar();
    }
  }

  /**
   * Disables Edit Mode
   */
  disableEditMode() {
    this.editMode = false;

    this._clean();
    if (this.guiEnabled === true) {
      this.manipulationDiv.style.display = "none";
      this.closeDiv.style.display = "none";
      this.editModeDiv.style.display = "block";
      this._createEditButton();
    }
  }

  /**
   * Creates the main toolbar. Removes functions bound to the select event. Binds all the buttons of the toolbar.
   *
   * @private
   */
  showManipulatorToolbar() {
    // restore the state of any bound functions or events, remove control nodes, restore physics
    this._clean();

    // reset global variables
    this.manipulationDOM = {};

    // if the gui is enabled, draw all elements.
    if (this.guiEnabled === true) {
      // a _restore will hide these menus
      this.editMode = true;
      this.manipulationDiv.style.display = "block";
      this.closeDiv.style.display = "block";

      const selectedNodeCount = this.selectionHandler.getSelectedNodeCount();
      const selectedEdgeCount = this.selectionHandler.getSelectedEdgeCount();
      const selectedTotalCount = selectedNodeCount + selectedEdgeCount;
      const locale = this.options.locales[this.options.locale];
      let needSeperator = false;

      if (this.options.addNode !== false) {
        this._createAddNodeButton(locale);
        needSeperator = true;
      }
      if (this.options.addEdge !== false) {
        if (needSeperator === true) {
          this._createSeperator(1);
        } else {
          needSeperator = true;
        }
        this._createAddEdgeButton(locale);
      }

      if (
        selectedNodeCount === 1 &&
        typeof this.options.editNode === "function"
      ) {
        if (needSeperator === true) {
          this._createSeperator(2);
        } else {
          needSeperator = true;
        }
        this._createEditNodeButton(locale);
      } else if (
        selectedEdgeCount === 1 &&
        selectedNodeCount === 0 &&
        this.options.editEdge !== false
      ) {
        if (needSeperator === true) {
          this._createSeperator(3);
        } else {
          needSeperator = true;
        }
        this._createEditEdgeButton(locale);
      }

      // remove buttons
      if (selectedTotalCount !== 0) {
        if (selectedNodeCount > 0 && this.options.deleteNode !== false) {
          if (needSeperator === true) {
            this._createSeperator(4);
          }
          this._createDeleteButton(locale);
        } else if (
          selectedNodeCount === 0 &&
          this.options.deleteEdge !== false
        ) {
          if (needSeperator === true) {
            this._createSeperator(4);
          }
          this._createDeleteButton(locale);
        }
      }

      // bind the close button
      this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));

      // refresh this bar based on what has been selected
      this._temporaryBindEvent(
        "select",
        this.showManipulatorToolbar.bind(this)
      );
    }

    // redraw to show any possible changes
    this.body.emitter.emit("_redraw");
  }

  /**
   * Create the toolbar for adding Nodes
   */
  addNodeMode() {
    // when using the gui, enable edit mode if it wasnt already.
    if (this.editMode !== true) {
      this.enableEditMode();
    }

    // restore the state of any bound functions or events, remove control nodes, restore physics
    this._clean();

    this.inMode = "addNode";
    if (this.guiEnabled === true) {
      const locale = this.options.locales[this.options.locale];
      this.manipulationDOM = {};
      this._createBackButton(locale);
      this._createSeperator();
      this._createDescription(
        locale["addDescription"] || this.options.locales["en"]["addDescription"]
      );

      // bind the close button
      this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
    }

    this._temporaryBindEvent("click", this._performAddNode.bind(this));
  }

  /**
   * call the bound function to handle the editing of the node. The node has to be selected.
   */
  editNode() {
    // when using the gui, enable edit mode if it wasnt already.
    if (this.editMode !== true) {
      this.enableEditMode();
    }

    // restore the state of any bound functions or events, remove control nodes, restore physics
    this._clean();
    const node = this.selectionHandler.getSelectedNodes()[0];
    if (node !== undefined) {
      this.inMode = "editNode";
      if (typeof this.options.editNode === "function") {
        if (node.isCluster !== true) {
          const data = deepExtend({}, node.options, false);
          data.x = node.x;
          data.y = node.y;

          if (this.options.editNode.length === 2) {
            this.options.editNode(data, (finalizedData) => {
              if (
                finalizedData !== null &&
                finalizedData !== undefined &&
                this.inMode === "editNode"
              ) {
                // if for whatever reason the mode has changes (due to dataset change) disregard the callback) {
                this.body.data.nodes.getDataSet().update(finalizedData);
              }
              this.showManipulatorToolbar();
            });
          } else {
            throw new Error(
              "The function for edit does not support two arguments (data, callback)"
            );
          }
        } else {
          alert(
            this.options.locales[this.options.locale]["editClusterError"] ||
              this.options.locales["en"]["editClusterError"]
          );
        }
      } else {
        throw new Error(
          "No function has been configured to handle the editing of nodes."
        );
      }
    } else {
      this.showManipulatorToolbar();
    }
  }

  /**
   * create the toolbar to connect nodes
   */
  addEdgeMode() {
    // when using the gui, enable edit mode if it wasnt already.
    if (this.editMode !== true) {
      this.enableEditMode();
    }

    // restore the state of any bound functions or events, remove control nodes, restore physics
    this._clean();

    this.inMode = "addEdge";
    if (this.guiEnabled === true) {
      const locale = this.options.locales[this.options.locale];
      this.manipulationDOM = {};
      this._createBackButton(locale);
      this._createSeperator();
      this._createDescription(
        locale["edgeDescription"] ||
          this.options.locales["en"]["edgeDescription"]
      );

      // bind the close button
      this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
    }

    // temporarily overload functions
    this._temporaryBindUI("onTouch", this._handleConnect.bind(this));
    this._temporaryBindUI("onDragEnd", this._finishConnect.bind(this));
    this._temporaryBindUI("onDrag", this._dragControlNode.bind(this));
    this._temporaryBindUI("onRelease", this._finishConnect.bind(this));
    this._temporaryBindUI("onDragStart", this._dragStartEdge.bind(this));
    this._temporaryBindUI("onHold", () => {});
  }

  /**
   * create the toolbar to edit edges
   */
  editEdgeMode() {
    // when using the gui, enable edit mode if it wasn't already.
    if (this.editMode !== true) {
      this.enableEditMode();
    }

    // restore the state of any bound functions or events, remove control nodes, restore physics
    this._clean();

    this.inMode = "editEdge";
    if (
      typeof this.options.editEdge === "object" &&
      typeof this.options.editEdge.editWithoutDrag === "function"
    ) {
      this.edgeBeingEditedId = this.selectionHandler.getSelectedEdgeIds()[0];
      if (this.edgeBeingEditedId !== undefined) {
        const edge = this.body.edges[this.edgeBeingEditedId];
        this._performEditEdge(edge.from.id, edge.to.id);
        return;
      }
    }
    if (this.guiEnabled === true) {
      const locale = this.options.locales[this.options.locale];
      this.manipulationDOM = {};
      this._createBackButton(locale);
      this._createSeperator();
      this._createDescription(
        locale["editEdgeDescription"] ||
          this.options.locales["en"]["editEdgeDescription"]
      );

      // bind the close button
      this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
    }

    this.edgeBeingEditedId = this.selectionHandler.getSelectedEdgeIds()[0];
    if (this.edgeBeingEditedId !== undefined) {
      const edge = this.body.edges[this.edgeBeingEditedId];

      // create control nodes
      const controlNodeFrom = this._getNewTargetNode(edge.from.x, edge.from.y);
      const controlNodeTo = this._getNewTargetNode(edge.to.x, edge.to.y);

      this.temporaryIds.nodes.push(controlNodeFrom.id);
      this.temporaryIds.nodes.push(controlNodeTo.id);

      this.body.nodes[controlNodeFrom.id] = controlNodeFrom;
      this.body.nodeIndices.push(controlNodeFrom.id);
      this.body.nodes[controlNodeTo.id] = controlNodeTo;
      this.body.nodeIndices.push(controlNodeTo.id);

      // temporarily overload UI functions, cleaned up automatically because of _temporaryBindUI
      this._temporaryBindUI("onTouch", this._controlNodeTouch.bind(this)); // used to get the position
      this._temporaryBindUI("onTap", () => {}); // disabled
      this._temporaryBindUI("onHold", () => {}); // disabled
      this._temporaryBindUI(
        "onDragStart",
        this._controlNodeDragStart.bind(this)
      ); // used to select control node
      this._temporaryBindUI("onDrag", this._controlNodeDrag.bind(this)); // used to drag control node
      this._temporaryBindUI("onDragEnd", this._controlNodeDragEnd.bind(this)); // used to connect or revert control nodes
      this._temporaryBindUI("onMouseMove", () => {}); // disabled

      // create function to position control nodes correctly on movement
      // automatically cleaned up because we use the temporary bind
      this._temporaryBindEvent("beforeDrawing", (ctx) => {
        const positions = edge.edgeType.findBorderPositions(ctx);
        if (controlNodeFrom.selected === false) {
          controlNodeFrom.x = positions.from.x;
          controlNodeFrom.y = positions.from.y;
        }
        if (controlNodeTo.selected === false) {
          controlNodeTo.x = positions.to.x;
          controlNodeTo.y = positions.to.y;
        }
      });

      this.body.emitter.emit("_redraw");
    } else {
      this.showManipulatorToolbar();
    }
  }

  /**
   * delete everything in the selection
   */
  deleteSelected() {
    // when using the gui, enable edit mode if it wasnt already.
    if (this.editMode !== true) {
      this.enableEditMode();
    }

    // restore the state of any bound functions or events, remove control nodes, restore physics
    this._clean();

    this.inMode = "delete";
    const selectedNodes = this.selectionHandler.getSelectedNodeIds();
    const selectedEdges = this.selectionHandler.getSelectedEdgeIds();
    let deleteFunction = undefined;
    if (selectedNodes.length > 0) {
      for (let i = 0; i < selectedNodes.length; i++) {
        if (this.body.nodes[selectedNodes[i]].isCluster === true) {
          alert(
            this.options.locales[this.options.locale]["deleteClusterError"] ||
              this.options.locales["en"]["deleteClusterError"]
          );
          return;
        }
      }

      if (typeof this.options.deleteNode === "function") {
        deleteFunction = this.options.deleteNode;
      }
    } else if (selectedEdges.length > 0) {
      if (typeof this.options.deleteEdge === "function") {
        deleteFunction = this.options.deleteEdge;
      }
    }

    if (typeof deleteFunction === "function") {
      const data = { nodes: selectedNodes, edges: selectedEdges };
      if (deleteFunction.length === 2) {
        deleteFunction(data, (finalizedData) => {
          if (
            finalizedData !== null &&
            finalizedData !== undefined &&
            this.inMode === "delete"
          ) {
            // if for whatever reason the mode has changes (due to dataset change) disregard the callback) {
            this.body.data.edges.getDataSet().remove(finalizedData.edges);
            this.body.data.nodes.getDataSet().remove(finalizedData.nodes);
            this.body.emitter.emit("startSimulation");
            this.showManipulatorToolbar();
          } else {
            this.body.emitter.emit("startSimulation");
            this.showManipulatorToolbar();
          }
        });
      } else {
        throw new Error(
          "The function for delete does not support two arguments (data, callback)"
        );
      }
    } else {
      this.body.data.edges.getDataSet().remove(selectedEdges);
      this.body.data.nodes.getDataSet().remove(selectedNodes);
      this.body.emitter.emit("startSimulation");
      this.showManipulatorToolbar();
    }
  }

  //********************************************** PRIVATE ***************************************//

  /**
   * draw or remove the DOM
   *
   * @private
   */
  _setup() {
    if (this.options.enabled === true) {
      // Enable the GUI
      this.guiEnabled = true;

      this._createWrappers();
      if (this.editMode === false) {
        this._createEditButton();
      } else {
        this.showManipulatorToolbar();
      }
    } else {
      this._removeManipulationDOM();

      // disable the gui
      this.guiEnabled = false;
    }
  }

  /**
   * create the div overlays that contain the DOM
   *
   * @private
   */
  _createWrappers() {
    // load the manipulator HTML elements. All styling done in css.
    if (this.manipulationDiv === undefined) {
      this.manipulationDiv = document.createElement("div");
      this.manipulationDiv.className = "vis-manipulation";
      if (this.editMode === true) {
        this.manipulationDiv.style.display = "block";
      } else {
        this.manipulationDiv.style.display = "none";
      }
      this.canvas.frame.appendChild(this.manipulationDiv);
    }

    // container for the edit button.
    if (this.editModeDiv === undefined) {
      this.editModeDiv = document.createElement("div");
      this.editModeDiv.className = "vis-edit-mode";
      if (this.editMode === true) {
        this.editModeDiv.style.display = "none";
      } else {
        this.editModeDiv.style.display = "block";
      }
      this.canvas.frame.appendChild(this.editModeDiv);
    }

    // container for the close div button
    if (this.closeDiv === undefined) {
      this.closeDiv = document.createElement("button");
      this.closeDiv.className = "vis-close";
      this.closeDiv.setAttribute(
        "aria-label",
        this.options.locales[this.options.locale]?.["close"] ??
          this.options.locales["en"]["close"]
      );
      this.closeDiv.style.display = this.manipulationDiv.style.display;
      this.canvas.frame.appendChild(this.closeDiv);
    }
  }

  /**
   * generate a new target node. Used for creating new edges and editing edges
   *
   * @param {number} x
   * @param {number} y
   * @returns {Node}
   * @private
   */
  _getNewTargetNode(x, y) {
    const controlNodeStyle = deepExtend({}, this.options.controlNodeStyle);

    controlNodeStyle.id = "targetNode" + v4();
    controlNodeStyle.hidden = false;
    controlNodeStyle.physics = false;
    controlNodeStyle.x = x;
    controlNodeStyle.y = y;

    // we have to define the bounding box in order for the nodes to be drawn immediately
    const node = this.body.functions.createNode(controlNodeStyle);
    node.shape.boundingBox = { left: x, right: x, top: y, bottom: y };

    return node;
  }

  /**
   * Create the edit button
   */
  _createEditButton() {
    // restore everything to it's original state (if applicable)
    this._clean();

    // reset the manipulationDOM
    this.manipulationDOM = {};

    // empty the editModeDiv
    recursiveDOMDelete(this.editModeDiv);

    // create the contents for the editMode button
    const locale = this.options.locales[this.options.locale];
    const button = this._createButton(
      "editMode",
      "vis-edit vis-edit-mode",
      locale["edit"] || this.options.locales["en"]["edit"]
    );
    this.editModeDiv.appendChild(button);

    // bind a hammer listener to the button, calling the function toggleEditMode.
    this._bindElementEvents(button, this.toggleEditMode.bind(this));
  }

  /**
   * this function cleans up after everything this module does. Temporary elements, functions and events are removed, physics restored, hammers removed.
   *
   * @private
   */
  _clean() {
    // not in mode
    this.inMode = false;

    // _clean the divs
    if (this.guiEnabled === true) {
      recursiveDOMDelete(this.editModeDiv);
      recursiveDOMDelete(this.manipulationDiv);

      // removes all the bindings and overloads
      this._cleanupDOMEventListeners();
    }

    // remove temporary nodes and edges
    this._cleanupTemporaryNodesAndEdges();

    // restore overloaded UI functions
    this._unbindTemporaryUIs();

    // remove the temporaryEventFunctions
    this._unbindTemporaryEvents();

    // restore the physics if required
    this.body.emitter.emit("restorePhysics");
  }

  /**
   * Each dom element has it's own hammer. They are stored in this.manipulationHammers. This cleans them up.
   *
   * @private
   */
  _cleanupDOMEventListeners() {
    // _clean DOM event listener bindings
    for (const callback of this._domEventListenerCleanupQueue.splice(0)) {
      callback();
    }
  }

  /**
   * Remove all DOM elements created by this module.
   *
   * @private
   */
  _removeManipulationDOM() {
    // removes all the bindings and overloads
    this._clean();

    // empty the manipulation divs
    recursiveDOMDelete(this.manipulationDiv);
    recursiveDOMDelete(this.editModeDiv);
    recursiveDOMDelete(this.closeDiv);

    // remove the manipulation divs
    if (this.manipulationDiv) {
      this.canvas.frame.removeChild(this.manipulationDiv);
    }
    if (this.editModeDiv) {
      this.canvas.frame.removeChild(this.editModeDiv);
    }
    if (this.closeDiv) {
      this.canvas.frame.removeChild(this.closeDiv);
    }

    // set the references to undefined
    this.manipulationDiv = undefined;
    this.editModeDiv = undefined;
    this.closeDiv = undefined;
  }

  /**
   * create a seperator line. the index is to differentiate in the manipulation dom
   *
   * @param {number} [index=1]
   * @private
   */
  _createSeperator(index = 1) {
    this.manipulationDOM["seperatorLineDiv" + index] =
      document.createElement("div");
    this.manipulationDOM["seperatorLineDiv" + index].className =
      "vis-separator-line";
    this.manipulationDiv.appendChild(
      this.manipulationDOM["seperatorLineDiv" + index]
    );
  }

  // ----------------------    DOM functions for buttons    --------------------------//

  /**
   *
   * @param {Locale} locale
   * @private
   */
  _createAddNodeButton(locale) {
    const button = this._createButton(
      "addNode",
      "vis-add",
      locale["addNode"] || this.options.locales["en"]["addNode"]
    );
    this.manipulationDiv.appendChild(button);
    this._bindElementEvents(button, this.addNodeMode.bind(this));
  }

  /**
   *
   * @param {Locale} locale
   * @private
   */
  _createAddEdgeButton(locale) {
    const button = this._createButton(
      "addEdge",
      "vis-connect",
      locale["addEdge"] || this.options.locales["en"]["addEdge"]
    );
    this.manipulationDiv.appendChild(button);
    this._bindElementEvents(button, this.addEdgeMode.bind(this));
  }

  /**
   *
   * @param {Locale} locale
   * @private
   */
  _createEditNodeButton(locale) {
    const button = this._createButton(
      "editNode",
      "vis-edit",
      locale["editNode"] || this.options.locales["en"]["editNode"]
    );
    this.manipulationDiv.appendChild(button);
    this._bindElementEvents(button, this.editNode.bind(this));
  }

  /**
   *
   * @param {Locale} locale
   * @private
   */
  _createEditEdgeButton(locale) {
    const button = this._createButton(
      "editEdge",
      "vis-edit",
      locale["editEdge"] || this.options.locales["en"]["editEdge"]
    );
    this.manipulationDiv.appendChild(button);
    this._bindElementEvents(button, this.editEdgeMode.bind(this));
  }

  /**
   *
   * @param {Locale} locale
   * @private
   */
  _createDeleteButton(locale) {
    let deleteBtnClass;
    if (this.options.rtl) {
      deleteBtnClass = "vis-delete-rtl";
    } else {
      deleteBtnClass = "vis-delete";
    }
    const button = this._createButton(
      "delete",
      deleteBtnClass,
      locale["del"] || this.options.locales["en"]["del"]
    );
    this.manipulationDiv.appendChild(button);
    this._bindElementEvents(button, this.deleteSelected.bind(this));
  }

  /**
   *
   * @param {Locale} locale
   * @private
   */
  _createBackButton(locale) {
    const button = this._createButton(
      "back",
      "vis-back",
      locale["back"] || this.options.locales["en"]["back"]
    );
    this.manipulationDiv.appendChild(button);
    this._bindElementEvents(button, this.showManipulatorToolbar.bind(this));
  }

  /**
   *
   * @param {number|string} id
   * @param {string} className
   * @param {label} label
   * @param {string} labelClassName
   * @returns {HTMLElement}
   * @private
   */
  _createButton(id, className, label, labelClassName = "vis-label") {
    this.manipulationDOM[id + "Div"] = document.createElement("button");
    this.manipulationDOM[id + "Div"].className = "vis-button " + className;
    this.manipulationDOM[id + "Label"] = document.createElement("div");
    this.manipulationDOM[id + "Label"].className = labelClassName;
    this.manipulationDOM[id + "Label"].innerText = label;
    this.manipulationDOM[id + "Div"].appendChild(
      this.manipulationDOM[id + "Label"]
    );
    return this.manipulationDOM[id + "Div"];
  }

  /**
   *
   * @param {Label} label
   * @private
   */
  _createDescription(label) {
    this.manipulationDOM["descriptionLabel"] = document.createElement("div");
    this.manipulationDOM["descriptionLabel"].className = "vis-none";
    this.manipulationDOM["descriptionLabel"].innerText = label;
    this.manipulationDiv.appendChild(this.manipulationDOM["descriptionLabel"]);
  }

  // -------------------------- End of DOM functions for buttons ------------------------------//

  /**
   * this binds an event until cleanup by the clean functions.
   *
   * @param {Event}  event   The event
   * @param {Function} newFunction
   * @private
   */
  _temporaryBindEvent(event, newFunction) {
    this.temporaryEventFunctions.push({
      event: event,
      boundFunction: newFunction,
    });
    this.body.emitter.on(event, newFunction);
  }

  /**
   * this overrides an UI function until cleanup by the clean function
   *
   * @param {string} UIfunctionName
   * @param {Function} newFunction
   * @private
   */
  _temporaryBindUI(UIfunctionName, newFunction) {
    if (this.body.eventListeners[UIfunctionName] !== undefined) {
      this.temporaryUIFunctions[UIfunctionName] =
        this.body.eventListeners[UIfunctionName];
      this.body.eventListeners[UIfunctionName] = newFunction;
    } else {
      throw new Error(
        "This UI function does not exist. Typo? You tried: " +
          UIfunctionName +
          " possible are: " +
          JSON.stringify(Object.keys(this.body.eventListeners))
      );
    }
  }

  /**
   * Restore the overridden UI functions to their original state.
   *
   * @private
   */
  _unbindTemporaryUIs() {
    for (const functionName in this.temporaryUIFunctions) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.temporaryUIFunctions,
          functionName
        )
      ) {
        this.body.eventListeners[functionName] =
          this.temporaryUIFunctions[functionName];
        delete this.temporaryUIFunctions[functionName];
      }
    }
    this.temporaryUIFunctions = {};
  }

  /**
   * Unbind the events created by _temporaryBindEvent
   *
   * @private
   */
  _unbindTemporaryEvents() {
    for (let i = 0; i < this.temporaryEventFunctions.length; i++) {
      const eventName = this.temporaryEventFunctions[i].event;
      const boundFunction = this.temporaryEventFunctions[i].boundFunction;
      this.body.emitter.off(eventName, boundFunction);
    }
    this.temporaryEventFunctions = [];
  }

  /**
   * Bind an hammer instance to a DOM element.
   *
   * @param {Element} domElement
   * @param {Function} boundFunction
   */
  _bindElementEvents(domElement, boundFunction) {
    // Bind touch events.
    const hammer = new Hammer(domElement, {});
    onTouch(hammer, boundFunction);
    this._domEventListenerCleanupQueue.push(() => {
      hammer.destroy();
    });

    // Bind keyboard events.
    const keyupListener = ({ keyCode, key }) => {
      if (key === "Enter" || key === " " || keyCode === 13 || keyCode === 32) {
        boundFunction();
      }
    };
    domElement.addEventListener("keyup", keyupListener, false);
    this._domEventListenerCleanupQueue.push(() => {
      domElement.removeEventListener("keyup", keyupListener, false);
    });
  }

  /**
   * Neatly clean up temporary edges and nodes
   *
   * @private
   */
  _cleanupTemporaryNodesAndEdges() {
    // _clean temporary edges
    for (let i = 0; i < this.temporaryIds.edges.length; i++) {
      this.body.edges[this.temporaryIds.edges[i]].disconnect();
      delete this.body.edges[this.temporaryIds.edges[i]];
      const indexTempEdge = this.body.edgeIndices.indexOf(
        this.temporaryIds.edges[i]
      );
      if (indexTempEdge !== -1) {
        this.body.edgeIndices.splice(indexTempEdge, 1);
      }
    }

    // _clean temporary nodes
    for (let i = 0; i < this.temporaryIds.nodes.length; i++) {
      delete this.body.nodes[this.temporaryIds.nodes[i]];
      const indexTempNode = this.body.nodeIndices.indexOf(
        this.temporaryIds.nodes[i]
      );
      if (indexTempNode !== -1) {
        this.body.nodeIndices.splice(indexTempNode, 1);
      }
    }

    this.temporaryIds = { nodes: [], edges: [] };
  }

  // ------------------------------------------ EDIT EDGE FUNCTIONS -----------------------------------------//

  /**
   * the touch is used to get the position of the initial click
   *
   * @param {Event}  event   The event
   * @private
   */
  _controlNodeTouch(event) {
    this.selectionHandler.unselectAll();
    this.lastTouch = this.body.functions.getPointer(event.center);
    this.lastTouch.translation = Object.assign({}, this.body.view.translation); // copy the object
  }

  /**
   * the drag start is used to mark one of the control nodes as selected.
   *
   * @private
   */
  _controlNodeDragStart() {
    const pointer = this.lastTouch;
    const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
    const from = this.body.nodes[this.temporaryIds.nodes[0]];
    const to = this.body.nodes[this.temporaryIds.nodes[1]];
    const edge = this.body.edges[this.edgeBeingEditedId];
    this.selectedControlNode = undefined;

    const fromSelect = from.isOverlappingWith(pointerObj);
    const toSelect = to.isOverlappingWith(pointerObj);

    if (fromSelect === true) {
      this.selectedControlNode = from;
      edge.edgeType.from = from;
    } else if (toSelect === true) {
      this.selectedControlNode = to;
      edge.edgeType.to = to;
    }

    // we use the selection to find the node that is being dragged. We explicitly select it here.
    if (this.selectedControlNode !== undefined) {
      this.selectionHandler.selectObject(this.selectedControlNode);
    }

    this.body.emitter.emit("_redraw");
  }

  /**
   * dragging the control nodes or the canvas
   *
   * @param {Event}  event   The event
   * @private
   */
  _controlNodeDrag(event) {
    this.body.emitter.emit("disablePhysics");
    const pointer = this.body.functions.getPointer(event.center);
    const pos = this.canvas.DOMtoCanvas(pointer);
    if (this.selectedControlNode !== undefined) {
      this.selectedControlNode.x = pos.x;
      this.selectedControlNode.y = pos.y;
    } else {
      this.interactionHandler.onDrag(event);
    }
    this.body.emitter.emit("_redraw");
  }

  /**
   * connecting or restoring the control nodes.
   *
   * @param {Event}  event   The event
   * @private
   */
  _controlNodeDragEnd(event) {
    const pointer = this.body.functions.getPointer(event.center);
    const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
    const edge = this.body.edges[this.edgeBeingEditedId];
    // if the node that was dragged is not a control node, return
    if (this.selectedControlNode === undefined) {
      return;
    }

    // we use the selection to find the node that is being dragged. We explicitly DEselect the control node here.
    this.selectionHandler.unselectAll();
    const overlappingNodeIds =
      this.selectionHandler._getAllNodesOverlappingWith(pointerObj);
    let node = undefined;
    for (let i = overlappingNodeIds.length - 1; i >= 0; i--) {
      if (overlappingNodeIds[i] !== this.selectedControlNode.id) {
        node = this.body.nodes[overlappingNodeIds[i]];
        break;
      }
    }
    // perform the connection
    if (node !== undefined && this.selectedControlNode !== undefined) {
      if (node.isCluster === true) {
        alert(
          this.options.locales[this.options.locale]["createEdgeError"] ||
            this.options.locales["en"]["createEdgeError"]
        );
      } else {
        const from = this.body.nodes[this.temporaryIds.nodes[0]];
        if (this.selectedControlNode.id === from.id) {
          this._performEditEdge(node.id, edge.to.id);
        } else {
          this._performEditEdge(edge.from.id, node.id);
        }
      }
    } else {
      edge.updateEdgeType();
      this.body.emitter.emit("restorePhysics");
    }

    this.body.emitter.emit("_redraw");
  }

  // ------------------------------------ END OF EDIT EDGE FUNCTIONS -----------------------------------------//

  // ------------------------------------------- ADD EDGE FUNCTIONS -----------------------------------------//
  /**
   * the function bound to the selection event. It checks if you want to connect a cluster and changes the description
   * to walk the user through the process.
   *
   * @param {Event} event
   * @private
   */
  _handleConnect(event) {
    // check to avoid double fireing of this function.
    if (new Date().valueOf() - this.touchTime > 100) {
      this.lastTouch = this.body.functions.getPointer(event.center);
      this.lastTouch.translation = Object.assign(
        {},
        this.body.view.translation
      ); // copy the object

      this.interactionHandler.drag.pointer = this.lastTouch; // Drag pointer is not updated when adding edges
      this.interactionHandler.drag.translation = this.lastTouch.translation;

      const pointer = this.lastTouch;
      const node = this.selectionHandler.getNodeAt(pointer);

      if (node !== undefined) {
        if (node.isCluster === true) {
          alert(
            this.options.locales[this.options.locale]["createEdgeError"] ||
              this.options.locales["en"]["createEdgeError"]
          );
        } else {
          // create a node the temporary line can look at
          const targetNode = this._getNewTargetNode(node.x, node.y);
          this.body.nodes[targetNode.id] = targetNode;
          this.body.nodeIndices.push(targetNode.id);

          // create a temporary edge
          const connectionEdge = this.body.functions.createEdge({
            id: "connectionEdge" + v4(),
            from: node.id,
            to: targetNode.id,
            physics: false,
            smooth: {
              enabled: true,
              type: "continuous",
              roundness: 0.5,
            },
          });
          this.body.edges[connectionEdge.id] = connectionEdge;
          this.body.edgeIndices.push(connectionEdge.id);

          this.temporaryIds.nodes.push(targetNode.id);
          this.temporaryIds.edges.push(connectionEdge.id);
        }
      }
      this.touchTime = new Date().valueOf();
    }
  }

  /**
   *
   * @param {Event} event
   * @private
   */
  _dragControlNode(event) {
    const pointer = this.body.functions.getPointer(event.center);

    const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
    // remember the edge id
    let connectFromId = undefined;
    if (this.temporaryIds.edges[0] !== undefined) {
      connectFromId = this.body.edges[this.temporaryIds.edges[0]].fromId;
    }

    // get the overlapping node but NOT the temporary node;
    const overlappingNodeIds =
      this.selectionHandler._getAllNodesOverlappingWith(pointerObj);
    let node = undefined;
    for (let i = overlappingNodeIds.length - 1; i >= 0; i--) {
      // if the node id is NOT a temporary node, accept the node.
      if (this.temporaryIds.nodes.indexOf(overlappingNodeIds[i]) === -1) {
        node = this.body.nodes[overlappingNodeIds[i]];
        break;
      }
    }

    event.controlEdge = { from: connectFromId, to: node ? node.id : undefined };
    this.selectionHandler.generateClickEvent(
      "controlNodeDragging",
      event,
      pointer
    );

    if (this.temporaryIds.nodes[0] !== undefined) {
      const targetNode = this.body.nodes[this.temporaryIds.nodes[0]]; // there is only one temp node in the add edge mode.
      targetNode.x = this.canvas._XconvertDOMtoCanvas(pointer.x);
      targetNode.y = this.canvas._YconvertDOMtoCanvas(pointer.y);
      this.body.emitter.emit("_redraw");
    } else {
      this.interactionHandler.onDrag(event);
    }
  }

  /**
   * Connect the new edge to the target if one exists, otherwise remove temp line
   *
   * @param {Event}  event   The event
   * @private
   */
  _finishConnect(event) {
    const pointer = this.body.functions.getPointer(event.center);
    const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);

    // remember the edge id
    let connectFromId = undefined;
    if (this.temporaryIds.edges[0] !== undefined) {
      connectFromId = this.body.edges[this.temporaryIds.edges[0]].fromId;
    }

    // get the overlapping node but NOT the temporary node;
    const overlappingNodeIds =
      this.selectionHandler._getAllNodesOverlappingWith(pointerObj);
    let node = undefined;
    for (let i = overlappingNodeIds.length - 1; i >= 0; i--) {
      // if the node id is NOT a temporary node, accept the node.
      if (this.temporaryIds.nodes.indexOf(overlappingNodeIds[i]) === -1) {
        node = this.body.nodes[overlappingNodeIds[i]];
        break;
      }
    }

    // clean temporary nodes and edges.
    this._cleanupTemporaryNodesAndEdges();

    // perform the connection
    if (node !== undefined) {
      if (node.isCluster === true) {
        alert(
          this.options.locales[this.options.locale]["createEdgeError"] ||
            this.options.locales["en"]["createEdgeError"]
        );
      } else {
        if (
          this.body.nodes[connectFromId] !== undefined &&
          this.body.nodes[node.id] !== undefined
        ) {
          this._performAddEdge(connectFromId, node.id);
        }
      }
    }

    event.controlEdge = { from: connectFromId, to: node ? node.id : undefined };
    this.selectionHandler.generateClickEvent(
      "controlNodeDragEnd",
      event,
      pointer
    );

    // No need to do _generateclickevent('dragEnd') here, the regular dragEnd event fires.
    this.body.emitter.emit("_redraw");
  }

  /**
   *
   * @param {Event} event
   * @private
   */
  _dragStartEdge(event) {
    const pointer = this.lastTouch;
    this.selectionHandler.generateClickEvent(
      "dragStart",
      event,
      pointer,
      undefined,
      true
    );
  }

  // --------------------------------------- END OF ADD EDGE FUNCTIONS -------------------------------------//

  // ------------------------------ Performing all the actual data manipulation ------------------------//

  /**
   * Adds a node on the specified location
   *
   * @param {object} clickData
   * @private
   */
  _performAddNode(clickData) {
    const defaultData = {
      id: v4(),
      x: clickData.pointer.canvas.x,
      y: clickData.pointer.canvas.y,
      label: "new",
    };

    if (typeof this.options.addNode === "function") {
      if (this.options.addNode.length === 2) {
        this.options.addNode(defaultData, (finalizedData) => {
          if (
            finalizedData !== null &&
            finalizedData !== undefined &&
            this.inMode === "addNode"
          ) {
            // if for whatever reason the mode has changes (due to dataset change) disregard the callback
            this.body.data.nodes.getDataSet().add(finalizedData);
          }
          this.showManipulatorToolbar();
        });
      } else {
        this.showManipulatorToolbar();
        throw new Error(
          "The function for add does not support two arguments (data,callback)"
        );
      }
    } else {
      this.body.data.nodes.getDataSet().add(defaultData);
      this.showManipulatorToolbar();
    }
  }

  /**
   * connect two nodes with a new edge.
   *
   * @param {Node.id} sourceNodeId
   * @param {Node.id} targetNodeId
   * @private
   */
  _performAddEdge(sourceNodeId, targetNodeId) {
    const defaultData = { from: sourceNodeId, to: targetNodeId };
    if (typeof this.options.addEdge === "function") {
      if (this.options.addEdge.length === 2) {
        this.options.addEdge(defaultData, (finalizedData) => {
          if (
            finalizedData !== null &&
            finalizedData !== undefined &&
            this.inMode === "addEdge"
          ) {
            // if for whatever reason the mode has changes (due to dataset change) disregard the callback
            this.body.data.edges.getDataSet().add(finalizedData);
            this.selectionHandler.unselectAll();
            this.showManipulatorToolbar();
          }
        });
      } else {
        throw new Error(
          "The function for connect does not support two arguments (data,callback)"
        );
      }
    } else {
      this.body.data.edges.getDataSet().add(defaultData);
      this.selectionHandler.unselectAll();
      this.showManipulatorToolbar();
    }
  }

  /**
   * connect two nodes with a new edge.
   *
   * @param {Node.id} sourceNodeId
   * @param {Node.id} targetNodeId
   * @private
   */
  _performEditEdge(sourceNodeId, targetNodeId) {
    const defaultData = {
      id: this.edgeBeingEditedId,
      from: sourceNodeId,
      to: targetNodeId,
      label: this.body.data.edges.get(this.edgeBeingEditedId).label,
    };
    let eeFunct = this.options.editEdge;
    if (typeof eeFunct === "object") {
      eeFunct = eeFunct.editWithoutDrag;
    }
    if (typeof eeFunct === "function") {
      if (eeFunct.length === 2) {
        eeFunct(defaultData, (finalizedData) => {
          if (
            finalizedData === null ||
            finalizedData === undefined ||
            this.inMode !== "editEdge"
          ) {
            // if for whatever reason the mode has changes (due to dataset change) disregard the callback) {
            this.body.edges[defaultData.id].updateEdgeType();
            this.body.emitter.emit("_redraw");
            this.showManipulatorToolbar();
          } else {
            this.body.data.edges.getDataSet().update(finalizedData);
            this.selectionHandler.unselectAll();
            this.showManipulatorToolbar();
          }
        });
      } else {
        throw new Error(
          "The function for edit does not support two arguments (data, callback)"
        );
      }
    } else {
      this.body.data.edges.getDataSet().update(defaultData);
      this.selectionHandler.unselectAll();
      this.showManipulatorToolbar();
    }
  }
}

/**
 * This object contains all possible options. It will check if the types are correct, if required if the option is one
 * of the allowed values.
 *
 * __any__ means that the name of the property does not matter.
 * __type__ is a required field for all objects and contains the allowed types of all objects
 */
const string = "string";
const bool = "boolean";
const number = "number";
const array = "array";
const object = "object"; // should only be in a __type__ property
const dom = "dom";
const any = "any";
// List of endpoints
const endPoints = [
    "arrow",
    "bar",
    "box",
    "circle",
    "crow",
    "curve",
    "diamond",
    "image",
    "inv_curve",
    "inv_triangle",
    "triangle",
    "vee",
];
/* eslint-disable @typescript-eslint/naming-convention -- The __*__ format is used to prevent collisions with actual option names. */
const nodeOptions = {
    borderWidth: { number },
    borderWidthSelected: { number, undefined: "undefined" },
    brokenImage: { string, undefined: "undefined" },
    chosen: {
        label: { boolean: bool, function: "function" },
        node: { boolean: bool, function: "function" },
        __type__: { object, boolean: bool },
    },
    color: {
        border: { string },
        background: { string },
        highlight: {
            border: { string },
            background: { string },
            __type__: { object, string },
        },
        hover: {
            border: { string },
            background: { string },
            __type__: { object, string },
        },
        __type__: { object, string },
    },
    opacity: { number, undefined: "undefined" },
    fixed: {
        x: { boolean: bool },
        y: { boolean: bool },
        __type__: { object, boolean: bool },
    },
    font: {
        align: { string },
        color: { string },
        size: { number },
        face: { string },
        background: { string },
        strokeWidth: { number },
        strokeColor: { string },
        vadjust: { number },
        multi: { boolean: bool, string },
        bold: {
            color: { string },
            size: { number },
            face: { string },
            mod: { string },
            vadjust: { number },
            __type__: { object, string },
        },
        boldital: {
            color: { string },
            size: { number },
            face: { string },
            mod: { string },
            vadjust: { number },
            __type__: { object, string },
        },
        ital: {
            color: { string },
            size: { number },
            face: { string },
            mod: { string },
            vadjust: { number },
            __type__: { object, string },
        },
        mono: {
            color: { string },
            size: { number },
            face: { string },
            mod: { string },
            vadjust: { number },
            __type__: { object, string },
        },
        __type__: { object, string },
    },
    group: { string, number, undefined: "undefined" },
    heightConstraint: {
        minimum: { number },
        valign: { string },
        __type__: { object, boolean: bool, number },
    },
    hidden: { boolean: bool },
    icon: {
        face: { string },
        code: { string },
        size: { number },
        color: { string },
        weight: { string, number },
        __type__: { object },
    },
    id: { string, number },
    image: {
        selected: { string, undefined: "undefined" },
        unselected: { string, undefined: "undefined" },
        __type__: { object, string },
    },
    imagePadding: {
        top: { number },
        right: { number },
        bottom: { number },
        left: { number },
        __type__: { object, number },
    },
    label: { string, undefined: "undefined" },
    labelHighlightBold: { boolean: bool },
    level: { number, undefined: "undefined" },
    margin: {
        top: { number },
        right: { number },
        bottom: { number },
        left: { number },
        __type__: { object, number },
    },
    mass: { number },
    physics: { boolean: bool },
    scaling: {
        min: { number },
        max: { number },
        label: {
            enabled: { boolean: bool },
            min: { number },
            max: { number },
            maxVisible: { number },
            drawThreshold: { number },
            __type__: { object, boolean: bool },
        },
        customScalingFunction: { function: "function" },
        __type__: { object },
    },
    shadow: {
        enabled: { boolean: bool },
        color: { string },
        size: { number },
        x: { number },
        y: { number },
        __type__: { object, boolean: bool },
    },
    shape: {
        string: [
            "custom",
            "ellipse",
            "circle",
            "database",
            "box",
            "text",
            "image",
            "circularImage",
            "diamond",
            "dot",
            "star",
            "triangle",
            "triangleDown",
            "square",
            "icon",
            "hexagon",
        ],
    },
    ctxRenderer: { function: "function" },
    shapeProperties: {
        borderDashes: { boolean: bool, array },
        borderRadius: { number },
        interpolation: { boolean: bool },
        useImageSize: { boolean: bool },
        useBorderWithImage: { boolean: bool },
        coordinateOrigin: { string: ["center", "top-left"] },
        __type__: { object },
    },
    size: { number },
    title: { string, dom, undefined: "undefined" },
    value: { number, undefined: "undefined" },
    widthConstraint: {
        minimum: { number },
        maximum: { number },
        __type__: { object, boolean: bool, number },
    },
    x: { number },
    y: { number },
    __type__: { object },
};
const allOptions = {
    configure: {
        enabled: { boolean: bool },
        filter: { boolean: bool, string, array, function: "function" },
        container: { dom },
        showButton: { boolean: bool },
        __type__: { object, boolean: bool, string, array, function: "function" },
    },
    edges: {
        arrows: {
            to: {
                enabled: { boolean: bool },
                scaleFactor: { number },
                type: { string: endPoints },
                imageHeight: { number },
                imageWidth: { number },
                src: { string },
                __type__: { object, boolean: bool },
            },
            middle: {
                enabled: { boolean: bool },
                scaleFactor: { number },
                type: { string: endPoints },
                imageWidth: { number },
                imageHeight: { number },
                src: { string },
                __type__: { object, boolean: bool },
            },
            from: {
                enabled: { boolean: bool },
                scaleFactor: { number },
                type: { string: endPoints },
                imageWidth: { number },
                imageHeight: { number },
                src: { string },
                __type__: { object, boolean: bool },
            },
            __type__: { string: ["from", "to", "middle"], object },
        },
        endPointOffset: {
            from: {
                number: number,
            },
            to: {
                number: number,
            },
            __type__: {
                object: object,
                number: number,
            },
        },
        arrowStrikethrough: { boolean: bool },
        background: {
            enabled: { boolean: bool },
            color: { string },
            size: { number },
            dashes: { boolean: bool, array },
            __type__: { object, boolean: bool },
        },
        chosen: {
            label: { boolean: bool, function: "function" },
            edge: { boolean: bool, function: "function" },
            __type__: { object, boolean: bool },
        },
        color: {
            color: { string },
            highlight: { string },
            hover: { string },
            inherit: { string: ["from", "to", "both"], boolean: bool },
            opacity: { number },
            __type__: { object, string },
        },
        dashes: { boolean: bool, array },
        font: {
            color: { string },
            size: { number },
            face: { string },
            background: { string },
            strokeWidth: { number },
            strokeColor: { string },
            align: { string: ["horizontal", "top", "middle", "bottom"] },
            vadjust: { number },
            multi: { boolean: bool, string },
            bold: {
                color: { string },
                size: { number },
                face: { string },
                mod: { string },
                vadjust: { number },
                __type__: { object, string },
            },
            boldital: {
                color: { string },
                size: { number },
                face: { string },
                mod: { string },
                vadjust: { number },
                __type__: { object, string },
            },
            ital: {
                color: { string },
                size: { number },
                face: { string },
                mod: { string },
                vadjust: { number },
                __type__: { object, string },
            },
            mono: {
                color: { string },
                size: { number },
                face: { string },
                mod: { string },
                vadjust: { number },
                __type__: { object, string },
            },
            __type__: { object, string },
        },
        hidden: { boolean: bool },
        hoverWidth: { function: "function", number },
        label: { string, undefined: "undefined" },
        labelHighlightBold: { boolean: bool },
        length: { number, undefined: "undefined" },
        physics: { boolean: bool },
        scaling: {
            min: { number },
            max: { number },
            label: {
                enabled: { boolean: bool },
                min: { number },
                max: { number },
                maxVisible: { number },
                drawThreshold: { number },
                __type__: { object, boolean: bool },
            },
            customScalingFunction: { function: "function" },
            __type__: { object },
        },
        selectionWidth: { function: "function", number },
        selfReferenceSize: { number },
        selfReference: {
            size: { number },
            angle: { number },
            renderBehindTheNode: { boolean: bool },
            __type__: { object },
        },
        shadow: {
            enabled: { boolean: bool },
            color: { string },
            size: { number },
            x: { number },
            y: { number },
            __type__: { object, boolean: bool },
        },
        smooth: {
            enabled: { boolean: bool },
            type: {
                string: [
                    "dynamic",
                    "continuous",
                    "discrete",
                    "diagonalCross",
                    "straightCross",
                    "horizontal",
                    "vertical",
                    "curvedCW",
                    "curvedCCW",
                    "cubicBezier",
                ],
            },
            roundness: { number },
            forceDirection: {
                string: ["horizontal", "vertical", "none"],
                boolean: bool,
            },
            __type__: { object, boolean: bool },
        },
        title: { string, undefined: "undefined" },
        width: { number },
        widthConstraint: {
            maximum: { number },
            __type__: { object, boolean: bool, number },
        },
        value: { number, undefined: "undefined" },
        __type__: { object },
    },
    groups: {
        useDefaultGroups: { boolean: bool },
        __any__: nodeOptions,
        __type__: { object },
    },
    interaction: {
        dragNodes: { boolean: bool },
        dragView: { boolean: bool },
        hideEdgesOnDrag: { boolean: bool },
        hideEdgesOnZoom: { boolean: bool },
        hideNodesOnDrag: { boolean: bool },
        hover: { boolean: bool },
        keyboard: {
            enabled: { boolean: bool },
            speed: {
                x: { number },
                y: { number },
                zoom: { number },
                __type__: { object },
            },
            bindToWindow: { boolean: bool },
            autoFocus: { boolean: bool },
            __type__: { object, boolean: bool },
        },
        multiselect: { boolean: bool },
        navigationButtons: { boolean: bool },
        selectable: { boolean: bool },
        selectConnectedEdges: { boolean: bool },
        hoverConnectedEdges: { boolean: bool },
        tooltipDelay: { number },
        zoomView: { boolean: bool },
        zoomSpeed: { number },
        __type__: { object },
    },
    layout: {
        randomSeed: { undefined: "undefined", number, string },
        improvedLayout: { boolean: bool },
        clusterThreshold: { number },
        hierarchical: {
            enabled: { boolean: bool },
            levelSeparation: { number },
            nodeSpacing: { number },
            treeSpacing: { number },
            blockShifting: { boolean: bool },
            edgeMinimization: { boolean: bool },
            parentCentralization: { boolean: bool },
            direction: { string: ["UD", "DU", "LR", "RL"] },
            sortMethod: { string: ["hubsize", "directed"] },
            shakeTowards: { string: ["leaves", "roots"] },
            __type__: { object, boolean: bool },
        },
        __type__: { object },
    },
    manipulation: {
        enabled: { boolean: bool },
        initiallyActive: { boolean: bool },
        addNode: { boolean: bool, function: "function" },
        addEdge: { boolean: bool, function: "function" },
        editNode: { function: "function" },
        editEdge: {
            editWithoutDrag: { function: "function" },
            __type__: { object, boolean: bool, function: "function" },
        },
        deleteNode: { boolean: bool, function: "function" },
        deleteEdge: { boolean: bool, function: "function" },
        controlNodeStyle: nodeOptions,
        __type__: { object, boolean: bool },
    },
    nodes: nodeOptions,
    physics: {
        enabled: { boolean: bool },
        barnesHut: {
            theta: { number },
            gravitationalConstant: { number },
            centralGravity: { number },
            springLength: { number },
            springConstant: { number },
            damping: { number },
            avoidOverlap: { number },
            __type__: { object },
        },
        forceAtlas2Based: {
            theta: { number },
            gravitationalConstant: { number },
            centralGravity: { number },
            springLength: { number },
            springConstant: { number },
            damping: { number },
            avoidOverlap: { number },
            __type__: { object },
        },
        repulsion: {
            centralGravity: { number },
            springLength: { number },
            springConstant: { number },
            nodeDistance: { number },
            damping: { number },
            __type__: { object },
        },
        hierarchicalRepulsion: {
            centralGravity: { number },
            springLength: { number },
            springConstant: { number },
            nodeDistance: { number },
            damping: { number },
            avoidOverlap: { number },
            __type__: { object },
        },
        maxVelocity: { number },
        minVelocity: { number },
        solver: {
            string: [
                "barnesHut",
                "repulsion",
                "hierarchicalRepulsion",
                "forceAtlas2Based",
            ],
        },
        stabilization: {
            enabled: { boolean: bool },
            iterations: { number },
            updateInterval: { number },
            onlyDynamicEdges: { boolean: bool },
            fit: { boolean: bool },
            __type__: { object, boolean: bool },
        },
        timestep: { number },
        adaptiveTimestep: { boolean: bool },
        wind: {
            x: { number },
            y: { number },
            __type__: { object },
        },
        __type__: { object, boolean: bool },
    },
    //globals :
    autoResize: { boolean: bool },
    clickToUse: { boolean: bool },
    locale: { string },
    locales: {
        __any__: { any },
        __type__: { object },
    },
    height: { string },
    width: { string },
    __type__: { object },
};
/* eslint-enable @typescript-eslint/naming-convention */
/**
 * This provides ranges, initial values, steps and dropdown menu choices for the
 * configuration.
 *
 * @remarks
 * Checkbox: `boolean`
 *   The value supllied will be used as the initial value.
 *
 * Text field: `string`
 *   The passed text will be used as the initial value. Any text will be
 *   accepted afterwards.
 *
 * Number range: `[number, number, number, number]`
 *   The meanings are `[initial value, min, max, step]`.
 *
 * Dropdown: `[Exclude<string, "color">, ...(string | number | boolean)[]]`
 *   Translations for people with poor understanding of TypeScript: the first
 *   value always has to be a string but never `"color"`, the rest can be any
 *   combination of strings, numbers and booleans.
 *
 * Color picker: `["color", string]`
 *   The first value says this will be a color picker not a dropdown menu. The
 *   next value is the initial color.
 */
const configureOptions = {
    nodes: {
        borderWidth: [1, 0, 10, 1],
        borderWidthSelected: [2, 0, 10, 1],
        color: {
            border: ["color", "#2B7CE9"],
            background: ["color", "#97C2FC"],
            highlight: {
                border: ["color", "#2B7CE9"],
                background: ["color", "#D2E5FF"],
            },
            hover: {
                border: ["color", "#2B7CE9"],
                background: ["color", "#D2E5FF"],
            },
        },
        opacity: [0, 0, 1, 0.1],
        fixed: {
            x: false,
            y: false,
        },
        font: {
            color: ["color", "#343434"],
            size: [14, 0, 100, 1],
            face: ["arial", "verdana", "tahoma"],
            background: ["color", "none"],
            strokeWidth: [0, 0, 50, 1],
            strokeColor: ["color", "#ffffff"],
        },
        //group: 'string',
        hidden: false,
        labelHighlightBold: true,
        //icon: {
        //  face: 'string',  //'FontAwesome',
        //  code: 'string',  //'\uf007',
        //  size: [50, 0, 200, 1],  //50,
        //  color: ['color','#2B7CE9']   //'#aa00ff'
        //},
        //image: 'string', // --> URL
        physics: true,
        scaling: {
            min: [10, 0, 200, 1],
            max: [30, 0, 200, 1],
            label: {
                enabled: false,
                min: [14, 0, 200, 1],
                max: [30, 0, 200, 1],
                maxVisible: [30, 0, 200, 1],
                drawThreshold: [5, 0, 20, 1],
            },
        },
        shadow: {
            enabled: false,
            color: "rgba(0,0,0,0.5)",
            size: [10, 0, 20, 1],
            x: [5, -30, 30, 1],
            y: [5, -30, 30, 1],
        },
        shape: [
            "ellipse",
            "box",
            "circle",
            "database",
            "diamond",
            "dot",
            "square",
            "star",
            "text",
            "triangle",
            "triangleDown",
            "hexagon",
        ],
        shapeProperties: {
            borderDashes: false,
            borderRadius: [6, 0, 20, 1],
            interpolation: true,
            useImageSize: false,
        },
        size: [25, 0, 200, 1],
    },
    edges: {
        arrows: {
            to: { enabled: false, scaleFactor: [1, 0, 3, 0.05], type: "arrow" },
            middle: { enabled: false, scaleFactor: [1, 0, 3, 0.05], type: "arrow" },
            from: { enabled: false, scaleFactor: [1, 0, 3, 0.05], type: "arrow" },
        },
        endPointOffset: {
            from: [0, -10, 10, 1],
            to: [0, -10, 10, 1],
        },
        arrowStrikethrough: true,
        color: {
            color: ["color", "#848484"],
            highlight: ["color", "#848484"],
            hover: ["color", "#848484"],
            inherit: ["from", "to", "both", true, false],
            opacity: [1, 0, 1, 0.05],
        },
        dashes: false,
        font: {
            color: ["color", "#343434"],
            size: [14, 0, 100, 1],
            face: ["arial", "verdana", "tahoma"],
            background: ["color", "none"],
            strokeWidth: [2, 0, 50, 1],
            strokeColor: ["color", "#ffffff"],
            align: ["horizontal", "top", "middle", "bottom"],
        },
        hidden: false,
        hoverWidth: [1.5, 0, 5, 0.1],
        labelHighlightBold: true,
        physics: true,
        scaling: {
            min: [1, 0, 100, 1],
            max: [15, 0, 100, 1],
            label: {
                enabled: true,
                min: [14, 0, 200, 1],
                max: [30, 0, 200, 1],
                maxVisible: [30, 0, 200, 1],
                drawThreshold: [5, 0, 20, 1],
            },
        },
        selectionWidth: [1.5, 0, 5, 0.1],
        selfReferenceSize: [20, 0, 200, 1],
        selfReference: {
            size: [20, 0, 200, 1],
            angle: [Math.PI / 2, -6 * Math.PI, 6 * Math.PI, Math.PI / 8],
            renderBehindTheNode: true,
        },
        shadow: {
            enabled: false,
            color: "rgba(0,0,0,0.5)",
            size: [10, 0, 20, 1],
            x: [5, -30, 30, 1],
            y: [5, -30, 30, 1],
        },
        smooth: {
            enabled: true,
            type: [
                "dynamic",
                "continuous",
                "discrete",
                "diagonalCross",
                "straightCross",
                "horizontal",
                "vertical",
                "curvedCW",
                "curvedCCW",
                "cubicBezier",
            ],
            forceDirection: ["horizontal", "vertical", "none"],
            roundness: [0.5, 0, 1, 0.05],
        },
        width: [1, 0, 30, 1],
    },
    layout: {
        //randomSeed: [0, 0, 500, 1],
        //improvedLayout: true,
        hierarchical: {
            enabled: false,
            levelSeparation: [150, 20, 500, 5],
            nodeSpacing: [100, 20, 500, 5],
            treeSpacing: [200, 20, 500, 5],
            blockShifting: true,
            edgeMinimization: true,
            parentCentralization: true,
            direction: ["UD", "DU", "LR", "RL"],
            sortMethod: ["hubsize", "directed"],
            shakeTowards: ["leaves", "roots"], // leaves, roots
        },
    },
    interaction: {
        dragNodes: true,
        dragView: true,
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false,
        hover: false,
        keyboard: {
            enabled: false,
            speed: {
                x: [10, 0, 40, 1],
                y: [10, 0, 40, 1],
                zoom: [0.02, 0, 0.1, 0.005],
            },
            bindToWindow: true,
            autoFocus: true,
        },
        multiselect: false,
        navigationButtons: false,
        selectable: true,
        selectConnectedEdges: true,
        hoverConnectedEdges: true,
        tooltipDelay: [300, 0, 1000, 25],
        zoomView: true,
        zoomSpeed: [1, 0.1, 2, 0.1],
    },
    manipulation: {
        enabled: false,
        initiallyActive: false,
    },
    physics: {
        enabled: true,
        barnesHut: {
            theta: [0.5, 0.1, 1, 0.05],
            gravitationalConstant: [-2000, -30000, 0, 50],
            centralGravity: [0.3, 0, 10, 0.05],
            springLength: [95, 0, 500, 5],
            springConstant: [0.04, 0, 1.2, 0.005],
            damping: [0.09, 0, 1, 0.01],
            avoidOverlap: [0, 0, 1, 0.01],
        },
        forceAtlas2Based: {
            theta: [0.5, 0.1, 1, 0.05],
            gravitationalConstant: [-50, -500, 0, 1],
            centralGravity: [0.01, 0, 1, 0.005],
            springLength: [95, 0, 500, 5],
            springConstant: [0.08, 0, 1.2, 0.005],
            damping: [0.4, 0, 1, 0.01],
            avoidOverlap: [0, 0, 1, 0.01],
        },
        repulsion: {
            centralGravity: [0.2, 0, 10, 0.05],
            springLength: [200, 0, 500, 5],
            springConstant: [0.05, 0, 1.2, 0.005],
            nodeDistance: [100, 0, 500, 5],
            damping: [0.09, 0, 1, 0.01],
        },
        hierarchicalRepulsion: {
            centralGravity: [0.2, 0, 10, 0.05],
            springLength: [100, 0, 500, 5],
            springConstant: [0.01, 0, 1.2, 0.005],
            nodeDistance: [120, 0, 500, 5],
            damping: [0.09, 0, 1, 0.01],
            avoidOverlap: [0, 0, 1, 0.01],
        },
        maxVelocity: [50, 0, 150, 1],
        minVelocity: [0.1, 0.01, 0.5, 0.01],
        solver: [
            "barnesHut",
            "forceAtlas2Based",
            "repulsion",
            "hierarchicalRepulsion",
        ],
        timestep: [0.5, 0.01, 1, 0.01],
        wind: {
            x: [0, -10, 10, 0.1],
            y: [0, -10, 10, 0.1],
        },
        //adaptiveTimestep: true
    },
};
const configuratorHideOption = (parentPath, optionName, options) => {
    if (parentPath.includes("physics") &&
        configureOptions.physics.solver.includes(optionName) &&
        options.physics.solver !== optionName &&
        optionName !== "wind") {
        return true;
    }
    return false;
};

var options = /*#__PURE__*/Object.freeze({
  __proto__: null,
  allOptions: allOptions,
  configuratorHideOption: configuratorHideOption,
  configureOptions: configureOptions
});

/**
 *  The Floyd–Warshall algorithm is an algorithm for finding shortest paths in
 *  a weighted graph with positive or negative edge weights (but with no negative
 *  cycles). - https://en.wikipedia.org/wiki/Floyd–Warshall_algorithm
 */
class FloydWarshall {
  /**
   * @ignore
   */
  constructor() {}

  /**
   *
   * @param {object} body
   * @param {Array.<Node>} nodesArray
   * @param {Array.<Edge>} edgesArray
   * @returns {{}}
   */
  getDistances(body, nodesArray, edgesArray) {
    const D_matrix = {};
    const edges = body.edges;

    // prepare matrix with large numbers
    for (let i = 0; i < nodesArray.length; i++) {
      const node = nodesArray[i];
      const cell = {};
      D_matrix[node] = cell;
      for (let j = 0; j < nodesArray.length; j++) {
        cell[nodesArray[j]] = i == j ? 0 : 1e9;
      }
    }

    // put the weights for the edges in. This assumes unidirectionality.
    for (let i = 0; i < edgesArray.length; i++) {
      const edge = edges[edgesArray[i]];
      // edge has to be connected if it counts to the distances. If it is connected to inner clusters it will crash so we also check if it is in the D_matrix
      if (
        edge.connected === true &&
        D_matrix[edge.fromId] !== undefined &&
        D_matrix[edge.toId] !== undefined
      ) {
        D_matrix[edge.fromId][edge.toId] = 1;
        D_matrix[edge.toId][edge.fromId] = 1;
      }
    }

    const nodeCount = nodesArray.length;

    // Adapted FloydWarshall based on unidirectionality to greatly reduce complexity.
    for (let k = 0; k < nodeCount; k++) {
      const knode = nodesArray[k];
      const kcolm = D_matrix[knode];
      for (let i = 0; i < nodeCount - 1; i++) {
        const inode = nodesArray[i];
        const icolm = D_matrix[inode];
        for (let j = i + 1; j < nodeCount; j++) {
          const jnode = nodesArray[j];
          const jcolm = D_matrix[jnode];

          const val = Math.min(icolm[jnode], icolm[knode] + kcolm[jnode]);
          icolm[jnode] = val;
          jcolm[inode] = val;
        }
      }
    }

    return D_matrix;
  }
}

// distance finding algorithm

/**
 * KamadaKawai positions the nodes initially based on
 *
 * "AN ALGORITHM FOR DRAWING GENERAL UNDIRECTED GRAPHS"
 * -- Tomihisa KAMADA and Satoru KAWAI in 1989
 *
 * Possible optimizations in the distance calculation can be implemented.
 */
class KamadaKawai {
  /**
   * @param {object} body
   * @param {number} edgeLength
   * @param {number} edgeStrength
   */
  constructor(body, edgeLength, edgeStrength) {
    this.body = body;
    this.springLength = edgeLength;
    this.springConstant = edgeStrength;
    this.distanceSolver = new FloydWarshall();
  }

  /**
   * Not sure if needed but can be used to update the spring length and spring constant
   *
   * @param {object} options
   */
  setOptions(options) {
    if (options) {
      if (options.springLength) {
        this.springLength = options.springLength;
      }
      if (options.springConstant) {
        this.springConstant = options.springConstant;
      }
    }
  }

  /**
   * Position the system
   *
   * @param {Array.<Node>} nodesArray
   * @param {Array.<vis.Edge>} edgesArray
   * @param {boolean} [ignoreClusters=false]
   */
  solve(nodesArray, edgesArray, ignoreClusters = false) {
    // get distance matrix
    const D_matrix = this.distanceSolver.getDistances(
      this.body,
      nodesArray,
      edgesArray
    ); // distance matrix

    // get the L Matrix
    this._createL_matrix(D_matrix);

    // get the K Matrix
    this._createK_matrix(D_matrix);

    // initial E Matrix
    this._createE_matrix();

    // calculate positions
    const threshold = 0.01;
    const innerThreshold = 1;
    let iterations = 0;
    const maxIterations = Math.max(
      1000,
      Math.min(10 * this.body.nodeIndices.length, 6000)
    );
    const maxInnerIterations = 5;

    let maxEnergy = 1e9;
    let highE_nodeId = 0,
      dE_dx = 0,
      dE_dy = 0,
      delta_m = 0,
      subIterations = 0;

    while (maxEnergy > threshold && iterations < maxIterations) {
      iterations += 1;
      [highE_nodeId, maxEnergy, dE_dx, dE_dy] =
        this._getHighestEnergyNode(ignoreClusters);
      delta_m = maxEnergy;
      subIterations = 0;
      while (delta_m > innerThreshold && subIterations < maxInnerIterations) {
        subIterations += 1;
        this._moveNode(highE_nodeId, dE_dx, dE_dy);
        [delta_m, dE_dx, dE_dy] = this._getEnergy(highE_nodeId);
      }
    }
  }

  /**
   * get the node with the highest energy
   *
   * @param {boolean} ignoreClusters
   * @returns {number[]}
   * @private
   */
  _getHighestEnergyNode(ignoreClusters) {
    const nodesArray = this.body.nodeIndices;
    const nodes = this.body.nodes;
    let maxEnergy = 0;
    let maxEnergyNodeId = nodesArray[0];
    let dE_dx_max = 0,
      dE_dy_max = 0;

    for (let nodeIdx = 0; nodeIdx < nodesArray.length; nodeIdx++) {
      const m = nodesArray[nodeIdx];
      // by not evaluating nodes with predefined positions we should only move nodes that have no positions.
      if (
        nodes[m].predefinedPosition !== true ||
        (nodes[m].isCluster === true && ignoreClusters === true) ||
        nodes[m].options.fixed.x !== true ||
        nodes[m].options.fixed.y !== true
      ) {
        const [delta_m, dE_dx, dE_dy] = this._getEnergy(m);
        if (maxEnergy < delta_m) {
          maxEnergy = delta_m;
          maxEnergyNodeId = m;
          dE_dx_max = dE_dx;
          dE_dy_max = dE_dy;
        }
      }
    }

    return [maxEnergyNodeId, maxEnergy, dE_dx_max, dE_dy_max];
  }

  /**
   * calculate the energy of a single node
   *
   * @param {Node.id} m
   * @returns {number[]}
   * @private
   */
  _getEnergy(m) {
    const [dE_dx, dE_dy] = this.E_sums[m];
    const delta_m = Math.sqrt(dE_dx ** 2 + dE_dy ** 2);
    return [delta_m, dE_dx, dE_dy];
  }

  /**
   * move the node based on it's energy
   * the dx and dy are calculated from the linear system proposed by Kamada and Kawai
   *
   * @param {number} m
   * @param {number} dE_dx
   * @param {number} dE_dy
   * @private
   */
  _moveNode(m, dE_dx, dE_dy) {
    const nodesArray = this.body.nodeIndices;
    const nodes = this.body.nodes;
    let d2E_dx2 = 0;
    let d2E_dxdy = 0;
    let d2E_dy2 = 0;

    const x_m = nodes[m].x;
    const y_m = nodes[m].y;
    const km = this.K_matrix[m];
    const lm = this.L_matrix[m];

    for (let iIdx = 0; iIdx < nodesArray.length; iIdx++) {
      const i = nodesArray[iIdx];
      if (i !== m) {
        const x_i = nodes[i].x;
        const y_i = nodes[i].y;
        const kmat = km[i];
        const lmat = lm[i];
        const denominator = 1.0 / ((x_m - x_i) ** 2 + (y_m - y_i) ** 2) ** 1.5;
        d2E_dx2 += kmat * (1 - lmat * (y_m - y_i) ** 2 * denominator);
        d2E_dxdy += kmat * (lmat * (x_m - x_i) * (y_m - y_i) * denominator);
        d2E_dy2 += kmat * (1 - lmat * (x_m - x_i) ** 2 * denominator);
      }
    }
    // make the variable names easier to make the solving of the linear system easier to read
    const A = d2E_dx2,
      B = d2E_dxdy,
      C = dE_dx,
      D = d2E_dy2,
      E = dE_dy;

    // solve the linear system for dx and dy
    const dy = (C / A + E / B) / (B / A - D / B);
    const dx = -(B * dy + C) / A;

    // move the node
    nodes[m].x += dx;
    nodes[m].y += dy;

    // Recalculate E_matrix (should be incremental)
    this._updateE_matrix(m);
  }

  /**
   * Create the L matrix: edge length times shortest path
   *
   * @param {object} D_matrix
   * @private
   */
  _createL_matrix(D_matrix) {
    const nodesArray = this.body.nodeIndices;
    const edgeLength = this.springLength;

    this.L_matrix = [];
    for (let i = 0; i < nodesArray.length; i++) {
      this.L_matrix[nodesArray[i]] = {};
      for (let j = 0; j < nodesArray.length; j++) {
        this.L_matrix[nodesArray[i]][nodesArray[j]] =
          edgeLength * D_matrix[nodesArray[i]][nodesArray[j]];
      }
    }
  }

  /**
   * Create the K matrix: spring constants times shortest path
   *
   * @param {object} D_matrix
   * @private
   */
  _createK_matrix(D_matrix) {
    const nodesArray = this.body.nodeIndices;
    const edgeStrength = this.springConstant;

    this.K_matrix = [];
    for (let i = 0; i < nodesArray.length; i++) {
      this.K_matrix[nodesArray[i]] = {};
      for (let j = 0; j < nodesArray.length; j++) {
        this.K_matrix[nodesArray[i]][nodesArray[j]] =
          edgeStrength * D_matrix[nodesArray[i]][nodesArray[j]] ** -2;
      }
    }
  }

  /**
   *  Create matrix with all energies between nodes
   *
   *  @private
   */
  _createE_matrix() {
    const nodesArray = this.body.nodeIndices;
    const nodes = this.body.nodes;
    this.E_matrix = {};
    this.E_sums = {};
    for (let mIdx = 0; mIdx < nodesArray.length; mIdx++) {
      this.E_matrix[nodesArray[mIdx]] = [];
    }
    for (let mIdx = 0; mIdx < nodesArray.length; mIdx++) {
      const m = nodesArray[mIdx];
      const x_m = nodes[m].x;
      const y_m = nodes[m].y;
      let dE_dx = 0;
      let dE_dy = 0;
      for (let iIdx = mIdx; iIdx < nodesArray.length; iIdx++) {
        const i = nodesArray[iIdx];
        if (i !== m) {
          const x_i = nodes[i].x;
          const y_i = nodes[i].y;
          const denominator =
            1.0 / Math.sqrt((x_m - x_i) ** 2 + (y_m - y_i) ** 2);
          this.E_matrix[m][iIdx] = [
            this.K_matrix[m][i] *
              (x_m - x_i - this.L_matrix[m][i] * (x_m - x_i) * denominator),
            this.K_matrix[m][i] *
              (y_m - y_i - this.L_matrix[m][i] * (y_m - y_i) * denominator),
          ];
          this.E_matrix[i][mIdx] = this.E_matrix[m][iIdx];
          dE_dx += this.E_matrix[m][iIdx][0];
          dE_dy += this.E_matrix[m][iIdx][1];
        }
      }
      //Store sum
      this.E_sums[m] = [dE_dx, dE_dy];
    }
  }

  /**
   * Update method, just doing single column (rows are auto-updated) (update all sums)
   *
   * @param {number} m
   * @private
   */
  _updateE_matrix(m) {
    const nodesArray = this.body.nodeIndices;
    const nodes = this.body.nodes;
    const colm = this.E_matrix[m];
    const kcolm = this.K_matrix[m];
    const lcolm = this.L_matrix[m];
    const x_m = nodes[m].x;
    const y_m = nodes[m].y;
    let dE_dx = 0;
    let dE_dy = 0;
    for (let iIdx = 0; iIdx < nodesArray.length; iIdx++) {
      const i = nodesArray[iIdx];
      if (i !== m) {
        //Keep old energy value for sum modification below
        const cell = colm[iIdx];
        const oldDx = cell[0];
        const oldDy = cell[1];

        //Calc new energy:
        const x_i = nodes[i].x;
        const y_i = nodes[i].y;
        const denominator =
          1.0 / Math.sqrt((x_m - x_i) ** 2 + (y_m - y_i) ** 2);
        const dx =
          kcolm[i] * (x_m - x_i - lcolm[i] * (x_m - x_i) * denominator);
        const dy =
          kcolm[i] * (y_m - y_i - lcolm[i] * (y_m - y_i) * denominator);
        colm[iIdx] = [dx, dy];
        dE_dx += dx;
        dE_dy += dy;

        //add new energy to sum of each column
        const sum = this.E_sums[i];
        sum[0] += dx - oldDx;
        sum[1] += dy - oldDy;
      }
    }
    //Store sum at -1 index
    this.E_sums[m] = [dE_dx, dE_dy];
  }
}

// Load custom shapes into CanvasRenderingContext2D

/**
 * Create a network visualization, displaying nodes and edges.
 *
 * @param {Element} container   The DOM element in which the Network will
 *                                  be created. Normally a div element.
 * @param {object} data         An object containing parameters
 *                              {Array} nodes
 *                              {Array} edges
 * @param {object} options      Options
 * @class Network
 */
function Network(container, data, options) {
  if (!(this instanceof Network)) {
    throw new SyntaxError("Constructor must be called with the new operator");
  }

  // set constant values
  this.options = {};
  this.defaultOptions = {
    locale: "en",
    locales: locales,
    clickToUse: false,
  };
  Object.assign(this.options, this.defaultOptions);

  /**
   * Containers for nodes and edges.
   *
   * 'edges' and 'nodes' contain the full definitions of all the network elements.
   * 'nodeIndices' and 'edgeIndices' contain the id's of the active elements.
   *
   * The distinction is important, because a defined node need not be active, i.e.
   * visible on the canvas. This happens in particular when clusters are defined, in
   * that case there will be nodes and edges not displayed.
   * The bottom line is that all code with actions related to visibility, *must* use
   * 'nodeIndices' and 'edgeIndices', not 'nodes' and 'edges' directly.
   */
  this.body = {
    container: container,

    // See comment above for following fields
    nodes: {},
    nodeIndices: [],
    edges: {},
    edgeIndices: [],

    emitter: {
      on: this.on.bind(this),
      off: this.off.bind(this),
      emit: this.emit.bind(this),
      once: this.once.bind(this),
    },
    eventListeners: {
      onTap: function () {},
      onTouch: function () {},
      onDoubleTap: function () {},
      onHold: function () {},
      onDragStart: function () {},
      onDrag: function () {},
      onDragEnd: function () {},
      onMouseWheel: function () {},
      onPinch: function () {},
      onMouseMove: function () {},
      onRelease: function () {},
      onContext: function () {},
    },
    data: {
      nodes: null, // A DataSet or DataView
      edges: null, // A DataSet or DataView
    },
    functions: {
      createNode: function () {},
      createEdge: function () {},
      getPointer: function () {},
    },
    modules: {},
    view: {
      scale: 1,
      translation: { x: 0, y: 0 },
    },
    selectionBox: {
      show: false,
      position: {
        start: { x: 0, y: 0 },
        end: { x: 0, y: 0 },
      },
    },
  };

  // bind the event listeners
  this.bindEventListeners();

  // setting up all modules
  this.images = new Images(() => this.body.emitter.emit("_requestRedraw")); // object with images
  this.groups = new Groups(); // object with groups
  this.canvas = new Canvas(this.body); // DOM handler
  this.selectionHandler = new SelectionHandler(this.body, this.canvas); // Selection handler
  this.interactionHandler = new InteractionHandler(
    this.body,
    this.canvas,
    this.selectionHandler
  ); // Interaction handler handles all the hammer bindings (that are bound by canvas), key
  this.view = new View(this.body, this.canvas); // camera handler, does animations and zooms
  this.renderer = new CanvasRenderer(this.body, this.canvas); // renderer, starts renderloop, has events that modules can hook into
  this.physics = new PhysicsEngine(this.body); // physics engine, does all the simulations
  this.layoutEngine = new LayoutEngine(this.body); // layout engine for inital layout and hierarchical layout
  this.clustering = new ClusterEngine(this.body); // clustering api
  this.manipulation = new ManipulationSystem(
    this.body,
    this.canvas,
    this.selectionHandler,
    this.interactionHandler
  ); // data manipulation system

  this.nodesHandler = new NodesHandler(
    this.body,
    this.images,
    this.groups,
    this.layoutEngine
  ); // Handle adding, deleting and updating of nodes as well as global options
  this.edgesHandler = new EdgesHandler(this.body, this.images, this.groups); // Handle adding, deleting and updating of edges as well as global options

  this.body.modules["kamadaKawai"] = new KamadaKawai(this.body, 150, 0.05); // Layouting algorithm.
  this.body.modules["clustering"] = this.clustering;

  // create the DOM elements
  this.canvas._create();

  // apply options
  this.setOptions(options);

  // load data (the disable start variable will be the same as the enabled clustering)
  this.setData(data);
}

// Extend Network with an Emitter mixin
Emitter(Network.prototype);

/**
 * Set options
 *
 * @param {object} options
 */
Network.prototype.setOptions = function (options) {
  if (options === null) {
    options = undefined; // This ensures that options handling doesn't crash in the handling
  }

  if (options !== undefined) {
    const errorFound = Validator.validate(options, allOptions);
    if (errorFound === true) {
      console.error(
        "%cErrors have been found in the supplied options object.",
        VALIDATOR_PRINT_STYLE
      );
    }

    // copy the global fields over
    const fields = ["locale", "locales", "clickToUse"];
    selectiveDeepExtend(fields, this.options, options);

    // normalize the locale or use English
    if (options.locale !== undefined) {
      options.locale = normalizeLanguageCode(
        options.locales || this.options.locales,
        options.locale
      );
    }

    // the hierarchical system can adapt the edges and the physics to it's own options because not all combinations work with the hierarichical system.
    options = this.layoutEngine.setOptions(options.layout, options);

    this.canvas.setOptions(options); // options for canvas are in globals

    // pass the options to the modules
    this.groups.setOptions(options.groups);
    this.nodesHandler.setOptions(options.nodes);
    this.edgesHandler.setOptions(options.edges);
    this.physics.setOptions(options.physics);
    this.manipulation.setOptions(options.manipulation, options, this.options); // manipulation uses the locales in the globals

    this.interactionHandler.setOptions(options.interaction);
    this.renderer.setOptions(options.interaction); // options for rendering are in interaction
    this.selectionHandler.setOptions(options.interaction); // options for selection are in interaction

    // reload the settings of the nodes to apply changes in groups that are not referenced by pointer.
    if (options.groups !== undefined) {
      this.body.emitter.emit("refreshNodes");
    }
    // these two do not have options at the moment, here for completeness
    //this.view.setOptions(options.view);
    //this.clustering.setOptions(options.clustering);

    if ("configure" in options) {
      if (!this.configurator) {
        this.configurator = new Configurator(
          this,
          this.body.container,
          configureOptions,
          this.canvas.pixelRatio,
          configuratorHideOption
        );
      }

      this.configurator.setOptions(options.configure);
    }

    // if the configuration system is enabled, copy all options and put them into the config system
    if (this.configurator && this.configurator.options.enabled === true) {
      const networkOptions = {
        nodes: {},
        edges: {},
        layout: {},
        interaction: {},
        manipulation: {},
        physics: {},
        global: {},
      };
      deepExtend(networkOptions.nodes, this.nodesHandler.options);
      deepExtend(networkOptions.edges, this.edgesHandler.options);
      deepExtend(networkOptions.layout, this.layoutEngine.options);
      // load the selectionHandler and render default options in to the interaction group
      deepExtend(networkOptions.interaction, this.selectionHandler.options);
      deepExtend(networkOptions.interaction, this.renderer.options);

      deepExtend(networkOptions.interaction, this.interactionHandler.options);
      deepExtend(networkOptions.manipulation, this.manipulation.options);
      deepExtend(networkOptions.physics, this.physics.options);

      // load globals into the global object
      deepExtend(networkOptions.global, this.canvas.options);
      deepExtend(networkOptions.global, this.options);

      this.configurator.setModuleOptions(networkOptions);
    }

    // handle network global options
    if (options.clickToUse !== undefined) {
      if (options.clickToUse === true) {
        if (this.activator === undefined) {
          this.activator = new Activator(this.canvas.frame);
          this.activator.on("change", () => {
            this.body.emitter.emit("activate");
          });
        }
      } else {
        if (this.activator !== undefined) {
          this.activator.destroy();
          delete this.activator;
        }
        this.body.emitter.emit("activate");
      }
    } else {
      this.body.emitter.emit("activate");
    }

    this.canvas.setSize();
    // start the physics simulation. Can be safely called multiple times.
    this.body.emitter.emit("startSimulation");
  }
};

/**
 * Update the visible nodes and edges list with the most recent node state.
 *
 * Visible nodes are stored in this.body.nodeIndices.
 * Visible edges are stored in this.body.edgeIndices.
 * A node or edges is visible if it is not hidden or clustered.
 *
 * @private
 */
Network.prototype._updateVisibleIndices = function () {
  const nodes = this.body.nodes;
  const edges = this.body.edges;
  this.body.nodeIndices = [];
  this.body.edgeIndices = [];

  for (const nodeId in nodes) {
    if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
      if (
        !this.clustering._isClusteredNode(nodeId) &&
        nodes[nodeId].options.hidden === false
      ) {
        this.body.nodeIndices.push(nodes[nodeId].id);
      }
    }
  }

  for (const edgeId in edges) {
    if (Object.prototype.hasOwnProperty.call(edges, edgeId)) {
      const edge = edges[edgeId];

      // It can happen that this is executed *after* a node edge has been removed,
      // but *before* the edge itself has been removed. Taking this into account.
      const fromNode = nodes[edge.fromId];
      const toNode = nodes[edge.toId];
      const edgeNodesPresent = fromNode !== undefined && toNode !== undefined;

      const isVisible =
        !this.clustering._isClusteredEdge(edgeId) &&
        edge.options.hidden === false &&
        edgeNodesPresent &&
        fromNode.options.hidden === false && // Also hidden if any of its connecting nodes are hidden
        toNode.options.hidden === false; // idem

      if (isVisible) {
        this.body.edgeIndices.push(edge.id);
      }
    }
  }
};

/**
 * Bind all events
 */
Network.prototype.bindEventListeners = function () {
  // This event will trigger a rebuilding of the cache everything.
  // Used when nodes or edges have been added or removed.
  this.body.emitter.on("_dataChanged", () => {
    this.edgesHandler._updateState();
    this.body.emitter.emit("_dataUpdated");
  });

  // this is called when options of EXISTING nodes or edges have changed.
  this.body.emitter.on("_dataUpdated", () => {
    // Order important in following block
    this.clustering._updateState();
    this._updateVisibleIndices();

    this._updateValueRange(this.body.nodes);
    this._updateValueRange(this.body.edges);
    // start simulation (can be called safely, even if already running)
    this.body.emitter.emit("startSimulation");
    this.body.emitter.emit("_requestRedraw");
  });
};

/**
 * Set nodes and edges, and optionally options as well.
 *
 * @param {object} data              Object containing parameters:
 *                                   {Array | DataSet | DataView} [nodes] Array with nodes
 *                                   {Array | DataSet | DataView} [edges] Array with edges
 *                                   {String} [dot] String containing data in DOT format
 *                                   {String} [gephi] String containing data in gephi JSON format
 *                                   {Options} [options] Object with options
 */
Network.prototype.setData = function (data) {
  // reset the physics engine.
  this.body.emitter.emit("resetPhysics");
  this.body.emitter.emit("_resetData");

  // unselect all to ensure no selections from old data are carried over.
  this.selectionHandler.unselectAll();

  if (data && data.dot && (data.nodes || data.edges)) {
    throw new SyntaxError(
      'Data must contain either parameter "dot" or ' +
        ' parameter pair "nodes" and "edges", but not both.'
    );
  }

  // set options
  this.setOptions(data && data.options);
  // set all data
  if (data && data.dot) {
    console.warn(
      "The dot property has been deprecated. Please use the static convertDot method to convert DOT into vis.network format and use the normal data format with nodes and edges. This converter is used like this: var data = vis.network.convertDot(dotString);"
    );
    // parse DOT file
    const dotData = DOTToGraph(data.dot);
    this.setData(dotData);
    return;
  } else if (data && data.gephi) {
    // parse DOT file
    console.warn(
      "The gephi property has been deprecated. Please use the static convertGephi method to convert gephi into vis.network format and use the normal data format with nodes and edges. This converter is used like this: var data = vis.network.convertGephi(gephiJson);"
    );
    const gephiData = parseGephi(data.gephi);
    this.setData(gephiData);
    return;
  } else {
    this.nodesHandler.setData(data && data.nodes, true);
    this.edgesHandler.setData(data && data.edges, true);
  }

  // emit change in data
  this.body.emitter.emit("_dataChanged");

  // emit data loaded
  this.body.emitter.emit("_dataLoaded");

  // find a stable position or start animating to a stable position
  this.body.emitter.emit("initPhysics");
};

/**
 * Cleans up all bindings of the network, removing it fully from the memory IF the variable is set to null after calling this function.
 * var network = new vis.Network(..);
 * network.destroy();
 * network = null;
 */
Network.prototype.destroy = function () {
  this.body.emitter.emit("destroy");
  // clear events
  this.body.emitter.off();
  this.off();

  // delete modules
  delete this.groups;
  delete this.canvas;
  delete this.selectionHandler;
  delete this.interactionHandler;
  delete this.view;
  delete this.renderer;
  delete this.physics;
  delete this.layoutEngine;
  delete this.clustering;
  delete this.manipulation;
  delete this.nodesHandler;
  delete this.edgesHandler;
  delete this.configurator;
  delete this.images;

  for (const nodeId in this.body.nodes) {
    if (!Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId))
      continue;
    delete this.body.nodes[nodeId];
  }

  for (const edgeId in this.body.edges) {
    if (!Object.prototype.hasOwnProperty.call(this.body.edges, edgeId))
      continue;
    delete this.body.edges[edgeId];
  }

  // remove the container and everything inside it recursively
  recursiveDOMDelete(this.body.container);
};

/**
 * Update the values of all object in the given array according to the current
 * value range of the objects in the array.
 *
 * @param {object} obj    An object containing a set of Edges or Nodes
 *                        The objects must have a method getValue() and
 *                        setValueRange(min, max).
 * @private
 */
Network.prototype._updateValueRange = function (obj) {
  let id;

  // determine the range of the objects
  let valueMin = undefined;
  let valueMax = undefined;
  let valueTotal = 0;
  for (id in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, id)) {
      const value = obj[id].getValue();
      if (value !== undefined) {
        valueMin = valueMin === undefined ? value : Math.min(value, valueMin);
        valueMax = valueMax === undefined ? value : Math.max(value, valueMax);
        valueTotal += value;
      }
    }
  }

  // adjust the range of all objects
  if (valueMin !== undefined && valueMax !== undefined) {
    for (id in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, id)) {
        obj[id].setValueRange(valueMin, valueMax, valueTotal);
      }
    }
  }
};

/**
 * Returns true when the Network is active.
 *
 * @returns {boolean}
 */
Network.prototype.isActive = function () {
  return !this.activator || this.activator.active;
};

Network.prototype.setSize = function () {
  return this.canvas.setSize.apply(this.canvas, arguments);
};
Network.prototype.canvasToDOM = function () {
  return this.canvas.canvasToDOM.apply(this.canvas, arguments);
};
Network.prototype.DOMtoCanvas = function () {
  return this.canvas.DOMtoCanvas.apply(this.canvas, arguments);
};

/**
 * Nodes can be in clusters. Clusters can also be in clusters. This function returns and array of
 * nodeIds showing where the node is.
 *
 * If any nodeId in the chain, especially the first passed in as a parameter, is not present in
 * the current nodes list, an empty array is returned.
 *
 * Example:
 * cluster 'A' contains cluster 'B',
 * cluster 'B' contains cluster 'C',
 * cluster 'C' contains node 'fred'.
 * `jsnetwork.clustering.findNode('fred')` will return `['A','B','C','fred']`.
 *
 * @param {string|number} nodeId
 * @returns {Array}
 */
Network.prototype.findNode = function () {
  return this.clustering.findNode.apply(this.clustering, arguments);
};

Network.prototype.isCluster = function () {
  return this.clustering.isCluster.apply(this.clustering, arguments);
};
Network.prototype.openCluster = function () {
  return this.clustering.openCluster.apply(this.clustering, arguments);
};
Network.prototype.cluster = function () {
  return this.clustering.cluster.apply(this.clustering, arguments);
};
Network.prototype.getNodesInCluster = function () {
  return this.clustering.getNodesInCluster.apply(this.clustering, arguments);
};
Network.prototype.clusterByConnection = function () {
  return this.clustering.clusterByConnection.apply(this.clustering, arguments);
};
Network.prototype.clusterByHubsize = function () {
  return this.clustering.clusterByHubsize.apply(this.clustering, arguments);
};
Network.prototype.updateClusteredNode = function () {
  return this.clustering.updateClusteredNode.apply(this.clustering, arguments);
};
Network.prototype.getClusteredEdges = function () {
  return this.clustering.getClusteredEdges.apply(this.clustering, arguments);
};
Network.prototype.getBaseEdge = function () {
  return this.clustering.getBaseEdge.apply(this.clustering, arguments);
};
Network.prototype.getBaseEdges = function () {
  return this.clustering.getBaseEdges.apply(this.clustering, arguments);
};
Network.prototype.updateEdge = function () {
  return this.clustering.updateEdge.apply(this.clustering, arguments);
};

/**
 * This method will cluster all nodes with 1 edge with their respective connected node.
 * The options object is explained in full <a data-scroll="" data-options="{ &quot;easing&quot;: &quot;easeInCubic&quot; }" href="#optionsObject">below</a>.
 *
 * @param {object} [options]
 * @returns {undefined}
 */
Network.prototype.clusterOutliers = function () {
  return this.clustering.clusterOutliers.apply(this.clustering, arguments);
};

Network.prototype.getSeed = function () {
  return this.layoutEngine.getSeed.apply(this.layoutEngine, arguments);
};
Network.prototype.enableEditMode = function () {
  return this.manipulation.enableEditMode.apply(this.manipulation, arguments);
};
Network.prototype.disableEditMode = function () {
  return this.manipulation.disableEditMode.apply(this.manipulation, arguments);
};
Network.prototype.addNodeMode = function () {
  return this.manipulation.addNodeMode.apply(this.manipulation, arguments);
};
Network.prototype.editNode = function () {
  return this.manipulation.editNode.apply(this.manipulation, arguments);
};
Network.prototype.editNodeMode = function () {
  console.warn("Deprecated: Please use editNode instead of editNodeMode.");
  return this.manipulation.editNode.apply(this.manipulation, arguments);
};
Network.prototype.addEdgeMode = function () {
  return this.manipulation.addEdgeMode.apply(this.manipulation, arguments);
};
Network.prototype.editEdgeMode = function () {
  return this.manipulation.editEdgeMode.apply(this.manipulation, arguments);
};
Network.prototype.deleteSelected = function () {
  return this.manipulation.deleteSelected.apply(this.manipulation, arguments);
};
Network.prototype.getPositions = function () {
  return this.nodesHandler.getPositions.apply(this.nodesHandler, arguments);
};
Network.prototype.getPosition = function () {
  return this.nodesHandler.getPosition.apply(this.nodesHandler, arguments);
};
Network.prototype.storePositions = function () {
  return this.nodesHandler.storePositions.apply(this.nodesHandler, arguments);
};
Network.prototype.moveNode = function () {
  return this.nodesHandler.moveNode.apply(this.nodesHandler, arguments);
};
Network.prototype.getBoundingBox = function () {
  return this.nodesHandler.getBoundingBox.apply(this.nodesHandler, arguments);
};
Network.prototype.getConnectedNodes = function (objectId) {
  if (this.body.nodes[objectId] !== undefined) {
    return this.nodesHandler.getConnectedNodes.apply(
      this.nodesHandler,
      arguments
    );
  } else {
    return this.edgesHandler.getConnectedNodes.apply(
      this.edgesHandler,
      arguments
    );
  }
};
Network.prototype.getConnectedEdges = function () {
  return this.nodesHandler.getConnectedEdges.apply(
    this.nodesHandler,
    arguments
  );
};
Network.prototype.startSimulation = function () {
  return this.physics.startSimulation.apply(this.physics, arguments);
};
Network.prototype.stopSimulation = function () {
  return this.physics.stopSimulation.apply(this.physics, arguments);
};
Network.prototype.stabilize = function () {
  return this.physics.stabilize.apply(this.physics, arguments);
};
Network.prototype.getSelection = function () {
  return this.selectionHandler.getSelection.apply(
    this.selectionHandler,
    arguments
  );
};
Network.prototype.setSelection = function () {
  return this.selectionHandler.setSelection.apply(
    this.selectionHandler,
    arguments
  );
};
Network.prototype.getSelectedNodes = function () {
  return this.selectionHandler.getSelectedNodeIds.apply(
    this.selectionHandler,
    arguments
  );
};
Network.prototype.getSelectedEdges = function () {
  return this.selectionHandler.getSelectedEdgeIds.apply(
    this.selectionHandler,
    arguments
  );
};
Network.prototype.getNodeAt = function () {
  const node = this.selectionHandler.getNodeAt.apply(
    this.selectionHandler,
    arguments
  );
  if (node !== undefined && node.id !== undefined) {
    return node.id;
  }
  return node;
};
Network.prototype.getEdgeAt = function () {
  const edge = this.selectionHandler.getEdgeAt.apply(
    this.selectionHandler,
    arguments
  );
  if (edge !== undefined && edge.id !== undefined) {
    return edge.id;
  }
  return edge;
};
Network.prototype.selectNodes = function () {
  return this.selectionHandler.selectNodes.apply(
    this.selectionHandler,
    arguments
  );
};
Network.prototype.selectEdges = function () {
  return this.selectionHandler.selectEdges.apply(
    this.selectionHandler,
    arguments
  );
};
Network.prototype.unselectAll = function () {
  this.selectionHandler.unselectAll.apply(this.selectionHandler, arguments);
  this.selectionHandler.commitWithoutEmitting.apply(this.selectionHandler);
  this.redraw();
};
Network.prototype.redraw = function () {
  return this.renderer.redraw.apply(this.renderer, arguments);
};
Network.prototype.getScale = function () {
  return this.view.getScale.apply(this.view, arguments);
};
Network.prototype.getViewPosition = function () {
  return this.view.getViewPosition.apply(this.view, arguments);
};
Network.prototype.fit = function () {
  return this.view.fit.apply(this.view, arguments);
};
Network.prototype.moveTo = function () {
  return this.view.moveTo.apply(this.view, arguments);
};
Network.prototype.focus = function () {
  return this.view.focus.apply(this.view, arguments);
};
Network.prototype.releaseNode = function () {
  return this.view.releaseNode.apply(this.view, arguments);
};
Network.prototype.getOptionsFromConfigurator = function () {
  let options = {};
  if (this.configurator) {
    options = this.configurator.getOptions.apply(this.configurator);
  }
  return options;
};

const parseDOTNetwork = DOTToGraph;
// DataSet, utils etc. can't be reexported here because that would cause stack
// overflow in UMD builds. They all export vis namespace therefore reexporting
// leads to loading vis to load vis to load vis…

export { Network, Images as NetworkImages, dotparser as networkDOTParser, gephiParser as networkGephiParser, options as networkOptions, parseDOTNetwork, parseGephi as parseGephiNetwork };
//# sourceMappingURL=vis-network.js.map
