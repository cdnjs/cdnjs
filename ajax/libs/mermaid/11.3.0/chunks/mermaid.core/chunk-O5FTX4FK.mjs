import {
  getIconSVG
} from "./chunk-CTJGIJSU.mjs";
import {
  getLineFunctionsWithOffset,
  getSubGraphTitleMargins
} from "./chunk-I3FGKTZ5.mjs";
import {
  createText
} from "./chunk-U7L4IQIU.mjs";
import {
  decodeEntities,
  utils_default
} from "./chunk-TLUHKHBO.mjs";
import {
  __name,
  common_default,
  evaluate,
  getConfig2 as getConfig,
  hasKatex,
  log,
  renderKatex,
  sanitizeText
} from "./chunk-S24QXQKS.mjs";

// src/rendering-util/rendering-elements/clusters.js
import { select as select2 } from "d3";
import rough from "roughjs";

// src/rendering-util/rendering-elements/intersect/intersect-rect.js
var intersectRect = /* @__PURE__ */ __name((node, point2) => {
  var x = node.x;
  var y = node.y;
  var dx = point2.x - x;
  var dy = point2.y - y;
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
}, "intersectRect");
var intersect_rect_default = intersectRect;

// src/rendering-util/rendering-elements/createLabel.js
import { select } from "d3";
function applyStyle(dom, styleFn) {
  if (styleFn) {
    dom.attr("style", styleFn);
  }
}
__name(applyStyle, "applyStyle");
async function addHtmlLabel(node) {
  const fo = select(document.createElementNS("http://www.w3.org/2000/svg", "foreignObject"));
  const div = fo.append("xhtml:div");
  let label = node.label;
  if (node.label && hasKatex(node.label)) {
    label = await renderKatex(node.label.replace(common_default.lineBreakRegex, "\n"), getConfig());
  }
  const labelClass = node.isNode ? "nodeLabel" : "edgeLabel";
  div.html(
    '<span class="' + labelClass + '" ' + (node.labelStyle ? 'style="' + node.labelStyle + '"' : "") + // codeql [js/html-constructed-from-input] : false positive
    ">" + label + "</span>"
  );
  applyStyle(div, node.labelStyle);
  div.style("display", "inline-block");
  div.style("padding-right", "1px");
  div.style("white-space", "nowrap");
  div.attr("xmlns", "http://www.w3.org/1999/xhtml");
  return fo.node();
}
__name(addHtmlLabel, "addHtmlLabel");
var createLabel = /* @__PURE__ */ __name(async (_vertexText, style, isTitle, isNode) => {
  let vertexText = _vertexText || "";
  if (typeof vertexText === "object") {
    vertexText = vertexText[0];
  }
  if (evaluate(getConfig().flowchart.htmlLabels)) {
    vertexText = vertexText.replace(/\\n|\n/g, "<br />");
    log.info("vertexText" + vertexText);
    const node = {
      isNode,
      label: decodeEntities(vertexText).replace(
        /fa[blrs]?:fa-[\w-]+/g,
        (s) => `<i class='${s.replace(":", " ")}'></i>`
      ),
      labelStyle: style ? style.replace("fill:", "color:") : style
    };
    let vertexNode = await addHtmlLabel(node);
    return vertexNode;
  } else {
    const svgLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
    svgLabel.setAttribute("style", style.replace("color:", "fill:"));
    let rows = [];
    if (typeof vertexText === "string") {
      rows = vertexText.split(/\\n|\n|<br\s*\/?>/gi);
    } else if (Array.isArray(vertexText)) {
      rows = vertexText;
    } else {
      rows = [];
    }
    for (const row of rows) {
      const tspan = document.createElementNS("http://www.w3.org/2000/svg", "tspan");
      tspan.setAttributeNS("http://www.w3.org/XML/1998/namespace", "xml:space", "preserve");
      tspan.setAttribute("dy", "1em");
      tspan.setAttribute("x", "0");
      if (isTitle) {
        tspan.setAttribute("class", "title-row");
      } else {
        tspan.setAttribute("class", "row");
      }
      tspan.textContent = row.trim();
      svgLabel.appendChild(tspan);
    }
    return svgLabel;
  }
}, "createLabel");
var createLabel_default = createLabel;

// src/rendering-util/rendering-elements/shapes/roundedRectPath.ts
var createRoundedRectPathD = /* @__PURE__ */ __name((x, y, totalWidth, totalHeight, radius) => [
  "M",
  x + radius,
  y,
  // Move to the first point
  "H",
  x + totalWidth - radius,
  // Draw horizontal line to the beginning of the right corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x + totalWidth,
  y + radius,
  // Draw arc to the right top corner
  "V",
  y + totalHeight - radius,
  // Draw vertical line down to the beginning of the right bottom corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x + totalWidth - radius,
  y + totalHeight,
  // Draw arc to the right bottom corner
  "H",
  x + radius,
  // Draw horizontal line to the beginning of the left bottom corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x,
  y + totalHeight - radius,
  // Draw arc to the left bottom corner
  "V",
  y + radius,
  // Draw vertical line up to the beginning of the left top corner
  "A",
  radius,
  radius,
  0,
  0,
  1,
  x + radius,
  y,
  // Draw arc to the left top corner
  "Z"
  // Close the path
].join(" "), "createRoundedRectPathD");

// src/rendering-util/rendering-elements/shapes/handDrawnShapeStyles.ts
var solidStateFill = /* @__PURE__ */ __name((color) => {
  const { handDrawnSeed } = getConfig();
  return {
    fill: color,
    hachureAngle: 120,
    // angle of hachure,
    hachureGap: 4,
    fillWeight: 2,
    roughness: 0.7,
    stroke: color,
    seed: handDrawnSeed
  };
}, "solidStateFill");
var compileStyles = /* @__PURE__ */ __name((node) => {
  const stylesMap = styles2Map([...node.cssCompiledStyles || [], ...node.cssStyles || []]);
  return { stylesMap, stylesArray: [...stylesMap] };
}, "compileStyles");
var styles2Map = /* @__PURE__ */ __name((styles) => {
  const styleMap = /* @__PURE__ */ new Map();
  styles.forEach((style) => {
    const [key, value] = style.split(":");
    styleMap.set(key.trim(), value?.trim());
  });
  return styleMap;
}, "styles2Map");
var styles2String = /* @__PURE__ */ __name((node) => {
  const { stylesArray } = compileStyles(node);
  const labelStyles = [];
  const nodeStyles = [];
  const borderStyles = [];
  const backgroundStyles = [];
  stylesArray.forEach((style) => {
    const key = style[0];
    if (key === "color" || key === "font-size" || key === "font-family" || key === "font-weight" || key === "font-style" || key === "text-decoration" || key === "text-align" || key === "text-transform" || key === "line-height" || key === "letter-spacing" || key === "word-spacing" || key === "text-shadow" || key === "text-overflow" || key === "white-space" || key === "word-wrap" || key === "word-break" || key === "overflow-wrap" || key === "hyphens") {
      labelStyles.push(style.join(":") + " !important");
    } else {
      nodeStyles.push(style.join(":") + " !important");
      if (key.includes("stroke")) {
        borderStyles.push(style.join(":") + " !important");
      }
      if (key === "fill") {
        backgroundStyles.push(style.join(":") + " !important");
      }
    }
  });
  return {
    labelStyles: labelStyles.join(";"),
    nodeStyles: nodeStyles.join(";"),
    stylesArray,
    borderStyles,
    backgroundStyles
  };
}, "styles2String");
var userNodeOverrides = /* @__PURE__ */ __name((node, options) => {
  const { themeVariables, handDrawnSeed } = getConfig();
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const result = Object.assign(
    {
      roughness: 0.7,
      fill: stylesMap.get("fill") || mainBkg,
      fillStyle: "hachure",
      // solid fill
      fillWeight: 4,
      hachureGap: 5.2,
      stroke: stylesMap.get("stroke") || nodeBorder,
      seed: handDrawnSeed,
      strokeWidth: stylesMap.get("stroke-width")?.replace("px", "") || 1.3,
      fillLineDash: [0, 0]
    },
    options
  );
  return result;
}, "userNodeOverrides");

// src/rendering-util/rendering-elements/clusters.js
var rect = /* @__PURE__ */ __name(async (parent, node) => {
  log.info("Creating subgraph rect for ", node.id, node);
  const siteConfig = getConfig();
  const { themeVariables, handDrawnSeed } = siteConfig;
  const { clusterBkg, clusterBorder } = themeVariables;
  const { labelStyles, nodeStyles, borderStyles, backgroundStyles } = styles2String(node);
  const shapeSvg = parent.insert("g").attr("class", "cluster " + node.cssClasses).attr("id", node.id).attr("data-look", node.look);
  const useHtmlLabels = evaluate(siteConfig.flowchart.htmlLabels);
  const labelEl = shapeSvg.insert("g").attr("class", "cluster-label ");
  const text2 = await createText(labelEl, node.label, {
    style: node.labelStyle,
    useHtmlLabels,
    isNode: true
  });
  let bbox = text2.getBBox();
  if (evaluate(siteConfig.flowchart.htmlLabels)) {
    const div = text2.children[0];
    const dv = select2(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const width = node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  log.trace("Data ", node, JSON.stringify(node));
  let rect2;
  if (node.look === "handDrawn") {
    const rc = rough.svg(shapeSvg);
    const options = userNodeOverrides(node, {
      roughness: 0.7,
      fill: clusterBkg,
      // fill: 'red',
      stroke: clusterBorder,
      fillWeight: 3,
      seed: handDrawnSeed
    });
    const roughNode = rc.path(createRoundedRectPathD(x, y, width, height, 0), options);
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
    rect2.select("path:nth-child(2)").attr("style", borderStyles.join(";"));
    rect2.select("path").attr("style", backgroundStyles.join(";").replace("fill", "stroke"));
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("style", nodeStyles).attr("rx", node.rx).attr("ry", node.ry).attr("x", x).attr("y", y).attr("width", width).attr("height", height);
  }
  const { subGraphTitleTopMargin } = getSubGraphTitleMargins(siteConfig);
  labelEl.attr(
    "transform",
    // This puts the label on top of the box instead of inside it
    `translate(${node.x - bbox.width / 2}, ${node.y - node.height / 2 + subGraphTitleTopMargin})`
  );
  if (labelStyles) {
    const span = labelEl.select("span");
    if (span) {
      span.attr("style", labelStyles);
    }
  }
  const rectBox = rect2.node().getBBox();
  node.offsetX = 0;
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.offsetY = bbox.height - node.padding / 2;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "rect");
var noteGroup = /* @__PURE__ */ __name((parent, node) => {
  const shapeSvg = parent.insert("g").attr("class", "note-cluster").attr("id", node.id);
  const rect2 = shapeSvg.insert("rect", ":first-child");
  const padding = 0 * node.padding;
  const halfPadding = padding / 2;
  rect2.attr("rx", node.rx).attr("ry", node.ry).attr("x", node.x - node.width / 2 - halfPadding).attr("y", node.y - node.height / 2 - halfPadding).attr("width", node.width + padding).attr("height", node.height + padding).attr("fill", "none");
  const rectBox = rect2.node().getBBox();
  node.width = rectBox.width;
  node.height = rectBox.height;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: { width: 0, height: 0 } };
}, "noteGroup");
var roundedWithTitle = /* @__PURE__ */ __name(async (parent, node) => {
  const siteConfig = getConfig();
  const { themeVariables, handDrawnSeed } = siteConfig;
  const { altBackground, compositeBackground, compositeTitleBackground, nodeBorder } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.id).attr("data-id", node.id).attr("data-look", node.look);
  const outerRectG = shapeSvg.insert("g", ":first-child");
  const label = shapeSvg.insert("g").attr("class", "cluster-label");
  let innerRect = shapeSvg.append("rect");
  const text2 = label.node().appendChild(await createLabel_default(node.label, node.labelStyle, void 0, true));
  let bbox = text2.getBBox();
  if (evaluate(siteConfig.flowchart.htmlLabels)) {
    const div = text2.children[0];
    const dv = select2(text2);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  const padding = 0 * node.padding;
  const halfPadding = padding / 2;
  const width = (node.width <= bbox.width + node.padding ? bbox.width + node.padding : node.width) + padding;
  if (node.width <= bbox.width + node.padding) {
    node.diff = (width - node.width) / 2 - node.padding;
  } else {
    node.diff = -node.padding;
  }
  const height = node.height + padding;
  const innerHeight = node.height + padding - bbox.height - 6;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  node.width = width;
  const innerY = node.y - node.height / 2 - halfPadding + bbox.height + 2;
  let rect2;
  if (node.look === "handDrawn") {
    const isAlt = node.cssClasses.includes("statediagram-cluster-alt");
    const rc = rough.svg(shapeSvg);
    const roughOuterNode = node.rx || node.ry ? rc.path(createRoundedRectPathD(x, y, width, height, 10), {
      roughness: 0.7,
      fill: compositeTitleBackground,
      fillStyle: "solid",
      stroke: nodeBorder,
      seed: handDrawnSeed
    }) : rc.rectangle(x, y, width, height, { seed: handDrawnSeed });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
    const roughInnerNode = rc.rectangle(x, innerY, width, innerHeight, {
      fill: isAlt ? altBackground : compositeBackground,
      fillStyle: isAlt ? "hachure" : "solid",
      stroke: nodeBorder,
      seed: handDrawnSeed
    });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
    innerRect = shapeSvg.insert(() => roughInnerNode);
  } else {
    rect2 = outerRectG.insert("rect", ":first-child");
    const outerRectClass = "outer";
    rect2.attr("class", outerRectClass).attr("x", x).attr("y", y).attr("width", width).attr("height", height).attr("data-look", node.look);
    innerRect.attr("class", "inner").attr("x", x).attr("y", innerY).attr("width", width).attr("height", innerHeight);
  }
  label.attr(
    "transform",
    `translate(${node.x - bbox.width / 2}, ${y + 1 - (evaluate(siteConfig.flowchart.htmlLabels) ? 0 : 3)})`
  );
  const rectBox = rect2.node().getBBox();
  node.height = rectBox.height;
  node.offsetX = 0;
  node.offsetY = bbox.height - node.padding / 2;
  node.labelBBox = bbox;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: bbox };
}, "roundedWithTitle");
var divider = /* @__PURE__ */ __name((parent, node) => {
  const siteConfig = getConfig();
  const { themeVariables, handDrawnSeed } = siteConfig;
  const { nodeBorder } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", node.cssClasses).attr("id", node.id).attr("data-look", node.look);
  const outerRectG = shapeSvg.insert("g", ":first-child");
  const padding = 0 * node.padding;
  const width = node.width + padding;
  node.diff = -node.padding;
  const height = node.height + padding;
  const x = node.x - width / 2;
  const y = node.y - height / 2;
  node.width = width;
  let rect2;
  if (node.look === "handDrawn") {
    const rc = rough.svg(shapeSvg);
    const roughOuterNode = rc.rectangle(x, y, width, height, {
      fill: "lightgrey",
      roughness: 0.5,
      strokeLineDash: [5],
      stroke: nodeBorder,
      seed: handDrawnSeed
    });
    rect2 = shapeSvg.insert(() => roughOuterNode, ":first-child");
  } else {
    rect2 = outerRectG.insert("rect", ":first-child");
    const outerRectClass = "divider";
    rect2.attr("class", outerRectClass).attr("x", x).attr("y", y).attr("width", width).attr("height", height).attr("data-look", node.look);
  }
  const rectBox = rect2.node().getBBox();
  node.height = rectBox.height;
  node.offsetX = 0;
  node.offsetY = 0;
  node.intersect = function(point2) {
    return intersect_rect_default(node, point2);
  };
  return { cluster: shapeSvg, labelBBox: {} };
}, "divider");
var squareRect = rect;
var shapes = {
  rect,
  squareRect,
  roundedWithTitle,
  noteGroup,
  divider
};
var clusterElems = /* @__PURE__ */ new Map();
var insertCluster = /* @__PURE__ */ __name(async (elem, node) => {
  const shape = node.shape || "rect";
  const cluster = await shapes[shape](elem, node);
  clusterElems.set(node.id, cluster);
  return cluster;
}, "insertCluster");
var clear = /* @__PURE__ */ __name(() => {
  clusterElems = /* @__PURE__ */ new Map();
}, "clear");

// src/rendering-util/rendering-elements/edges.js
import { curveBasis, line, select as select3 } from "d3";
import rough2 from "roughjs";

// src/rendering-util/rendering-elements/edgeMarker.ts
var addEdgeMarkers = /* @__PURE__ */ __name((svgPath, edge, url, id, diagramType) => {
  if (edge.arrowTypeStart) {
    addEdgeMarker(svgPath, "start", edge.arrowTypeStart, url, id, diagramType);
  }
  if (edge.arrowTypeEnd) {
    addEdgeMarker(svgPath, "end", edge.arrowTypeEnd, url, id, diagramType);
  }
}, "addEdgeMarkers");
var arrowTypesMap = {
  arrow_cross: "cross",
  arrow_point: "point",
  arrow_barb: "barb",
  arrow_circle: "circle",
  aggregation: "aggregation",
  extension: "extension",
  composition: "composition",
  dependency: "dependency",
  lollipop: "lollipop"
};
var addEdgeMarker = /* @__PURE__ */ __name((svgPath, position, arrowType, url, id, diagramType) => {
  const endMarkerType = arrowTypesMap[arrowType];
  if (!endMarkerType) {
    log.warn(`Unknown arrow type: ${arrowType}`);
    return;
  }
  const suffix = position === "start" ? "Start" : "End";
  svgPath.attr(`marker-${position}`, `url(${url}#${id}_${diagramType}-${endMarkerType}${suffix})`);
}, "addEdgeMarker");

// src/rendering-util/rendering-elements/edges.js
var edgeLabels = /* @__PURE__ */ new Map();
var terminalLabels = /* @__PURE__ */ new Map();
var clear2 = /* @__PURE__ */ __name(() => {
  edgeLabels.clear();
  terminalLabels.clear();
}, "clear");
var getLabelStyles = /* @__PURE__ */ __name((styleArray) => {
  let styles = styleArray ? styleArray.reduce((acc, style) => acc + ";" + style, "") : "";
  return styles;
}, "getLabelStyles");
var insertEdgeLabel = /* @__PURE__ */ __name(async (elem, edge) => {
  let useHtmlLabels = evaluate(getConfig().flowchart.htmlLabels);
  const labelElement = await createText(elem, edge.label, {
    style: getLabelStyles(edge.labelStyle),
    useHtmlLabels,
    addSvgBackground: true,
    isNode: false
  });
  log.info("abc82", edge, edge.labelType);
  const edgeLabel = elem.insert("g").attr("class", "edgeLabel");
  const label = edgeLabel.insert("g").attr("class", "label");
  label.node().appendChild(labelElement);
  let bbox = labelElement.getBBox();
  if (useHtmlLabels) {
    const div = labelElement.children[0];
    const dv = select3(labelElement);
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  label.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  edgeLabels.set(edge.id, edgeLabel);
  edge.width = bbox.width;
  edge.height = bbox.height;
  let fo;
  if (edge.startLabelLeft) {
    const startLabelElement = await createLabel_default(
      edge.startLabelLeft,
      getLabelStyles(edge.labelStyle)
    );
    const startEdgeLabelLeft = elem.insert("g").attr("class", "edgeTerminals");
    const inner = startEdgeLabelLeft.insert("g").attr("class", "inner");
    fo = inner.node().appendChild(startLabelElement);
    const slBox = startLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).startLeft = startEdgeLabelLeft;
    setTerminalWidth(fo, edge.startLabelLeft);
  }
  if (edge.startLabelRight) {
    const startLabelElement = await createLabel_default(
      edge.startLabelRight,
      getLabelStyles(edge.labelStyle)
    );
    const startEdgeLabelRight = elem.insert("g").attr("class", "edgeTerminals");
    const inner = startEdgeLabelRight.insert("g").attr("class", "inner");
    fo = startEdgeLabelRight.node().appendChild(startLabelElement);
    inner.node().appendChild(startLabelElement);
    const slBox = startLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).startRight = startEdgeLabelRight;
    setTerminalWidth(fo, edge.startLabelRight);
  }
  if (edge.endLabelLeft) {
    const endLabelElement = await createLabel_default(edge.endLabelLeft, getLabelStyles(edge.labelStyle));
    const endEdgeLabelLeft = elem.insert("g").attr("class", "edgeTerminals");
    const inner = endEdgeLabelLeft.insert("g").attr("class", "inner");
    fo = inner.node().appendChild(endLabelElement);
    const slBox = endLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    endEdgeLabelLeft.node().appendChild(endLabelElement);
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).endLeft = endEdgeLabelLeft;
    setTerminalWidth(fo, edge.endLabelLeft);
  }
  if (edge.endLabelRight) {
    const endLabelElement = await createLabel_default(edge.endLabelRight, getLabelStyles(edge.labelStyle));
    const endEdgeLabelRight = elem.insert("g").attr("class", "edgeTerminals");
    const inner = endEdgeLabelRight.insert("g").attr("class", "inner");
    fo = inner.node().appendChild(endLabelElement);
    const slBox = endLabelElement.getBBox();
    inner.attr("transform", "translate(" + -slBox.width / 2 + ", " + -slBox.height / 2 + ")");
    endEdgeLabelRight.node().appendChild(endLabelElement);
    if (!terminalLabels.get(edge.id)) {
      terminalLabels.set(edge.id, {});
    }
    terminalLabels.get(edge.id).endRight = endEdgeLabelRight;
    setTerminalWidth(fo, edge.endLabelRight);
  }
  return labelElement;
}, "insertEdgeLabel");
function setTerminalWidth(fo, value) {
  if (getConfig().flowchart.htmlLabels && fo) {
    fo.style.width = value.length * 9 + "px";
    fo.style.height = "12px";
  }
}
__name(setTerminalWidth, "setTerminalWidth");
var positionEdgeLabel = /* @__PURE__ */ __name((edge, paths) => {
  log.debug("Moving label abc88 ", edge.id, edge.label, edgeLabels.get(edge.id), paths);
  let path = paths.updatedPath ? paths.updatedPath : paths.originalPath;
  const siteConfig = getConfig();
  const { subGraphTitleTotalMargin } = getSubGraphTitleMargins(siteConfig);
  if (edge.label) {
    const el = edgeLabels.get(edge.id);
    let x = edge.x;
    let y = edge.y;
    if (path) {
      const pos = utils_default.calcLabelPosition(path);
      log.debug(
        "Moving label " + edge.label + " from (",
        x,
        ",",
        y,
        ") to (",
        pos.x,
        ",",
        pos.y,
        ") abc88"
      );
      if (paths.updatedPath) {
        x = pos.x;
        y = pos.y;
      }
    }
    el.attr("transform", `translate(${x}, ${y + subGraphTitleTotalMargin / 2})`);
  }
  if (edge.startLabelLeft) {
    const el = terminalLabels.get(edge.id).startLeft;
    let x = edge.x;
    let y = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(edge.arrowTypeStart ? 10 : 0, "start_left", path);
      x = pos.x;
      y = pos.y;
    }
    el.attr("transform", `translate(${x}, ${y})`);
  }
  if (edge.startLabelRight) {
    const el = terminalLabels.get(edge.id).startRight;
    let x = edge.x;
    let y = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(
        edge.arrowTypeStart ? 10 : 0,
        "start_right",
        path
      );
      x = pos.x;
      y = pos.y;
    }
    el.attr("transform", `translate(${x}, ${y})`);
  }
  if (edge.endLabelLeft) {
    const el = terminalLabels.get(edge.id).endLeft;
    let x = edge.x;
    let y = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(edge.arrowTypeEnd ? 10 : 0, "end_left", path);
      x = pos.x;
      y = pos.y;
    }
    el.attr("transform", `translate(${x}, ${y})`);
  }
  if (edge.endLabelRight) {
    const el = terminalLabels.get(edge.id).endRight;
    let x = edge.x;
    let y = edge.y;
    if (path) {
      const pos = utils_default.calcTerminalLabelPosition(edge.arrowTypeEnd ? 10 : 0, "end_right", path);
      x = pos.x;
      y = pos.y;
    }
    el.attr("transform", `translate(${x}, ${y})`);
  }
}, "positionEdgeLabel");
var outsideNode = /* @__PURE__ */ __name((node, point2) => {
  const x = node.x;
  const y = node.y;
  const dx = Math.abs(point2.x - x);
  const dy = Math.abs(point2.y - y);
  const w = node.width / 2;
  const h = node.height / 2;
  return dx >= w || dy >= h;
}, "outsideNode");
var intersection = /* @__PURE__ */ __name((node, outsidePoint, insidePoint) => {
  log.debug(`intersection calc abc89:
  outsidePoint: ${JSON.stringify(outsidePoint)}
  insidePoint : ${JSON.stringify(insidePoint)}
  node        : x:${node.x} y:${node.y} w:${node.width} h:${node.height}`);
  const x = node.x;
  const y = node.y;
  const dx = Math.abs(x - insidePoint.x);
  const w = node.width / 2;
  let r = insidePoint.x < outsidePoint.x ? w - dx : w + dx;
  const h = node.height / 2;
  const Q = Math.abs(outsidePoint.y - insidePoint.y);
  const R = Math.abs(outsidePoint.x - insidePoint.x);
  if (Math.abs(y - outsidePoint.y) * w > Math.abs(x - outsidePoint.x) * h) {
    let q = insidePoint.y < outsidePoint.y ? outsidePoint.y - h - y : y - h - outsidePoint.y;
    r = R * q / Q;
    const res = {
      x: insidePoint.x < outsidePoint.x ? insidePoint.x + r : insidePoint.x - R + r,
      y: insidePoint.y < outsidePoint.y ? insidePoint.y + Q - q : insidePoint.y - Q + q
    };
    if (r === 0) {
      res.x = outsidePoint.x;
      res.y = outsidePoint.y;
    }
    if (R === 0) {
      res.x = outsidePoint.x;
    }
    if (Q === 0) {
      res.y = outsidePoint.y;
    }
    log.debug(`abc89 top/bottom calc, Q ${Q}, q ${q}, R ${R}, r ${r}`, res);
    return res;
  } else {
    if (insidePoint.x < outsidePoint.x) {
      r = outsidePoint.x - w - x;
    } else {
      r = x - w - outsidePoint.x;
    }
    let q = Q * r / R;
    let _x = insidePoint.x < outsidePoint.x ? insidePoint.x + R - r : insidePoint.x - R + r;
    let _y = insidePoint.y < outsidePoint.y ? insidePoint.y + q : insidePoint.y - q;
    log.debug(`sides calc abc89, Q ${Q}, q ${q}, R ${R}, r ${r}`, { _x, _y });
    if (r === 0) {
      _x = outsidePoint.x;
      _y = outsidePoint.y;
    }
    if (R === 0) {
      _x = outsidePoint.x;
    }
    if (Q === 0) {
      _y = outsidePoint.y;
    }
    return { x: _x, y: _y };
  }
}, "intersection");
var cutPathAtIntersect = /* @__PURE__ */ __name((_points, boundaryNode) => {
  log.warn("abc88 cutPathAtIntersect", _points, boundaryNode);
  let points = [];
  let lastPointOutside = _points[0];
  let isInside = false;
  _points.forEach((point2) => {
    log.info("abc88 checking point", point2, boundaryNode);
    if (!outsideNode(boundaryNode, point2) && !isInside) {
      const inter = intersection(boundaryNode, lastPointOutside, point2);
      log.debug("abc88 inside", point2, lastPointOutside, inter);
      log.debug("abc88 intersection", inter, boundaryNode);
      let pointPresent = false;
      points.forEach((p) => {
        pointPresent = pointPresent || p.x === inter.x && p.y === inter.y;
      });
      if (!points.some((e) => e.x === inter.x && e.y === inter.y)) {
        points.push(inter);
      } else {
        log.warn("abc88 no intersect", inter, points);
      }
      isInside = true;
    } else {
      log.warn("abc88 outside", point2, lastPointOutside);
      lastPointOutside = point2;
      if (!isInside) {
        points.push(point2);
      }
    }
  });
  log.debug("returning points", points);
  return points;
}, "cutPathAtIntersect");
function extractCornerPoints(points) {
  const cornerPoints = [];
  const cornerPointPositions = [];
  for (let i = 1; i < points.length - 1; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const next = points[i + 1];
    if (prev.x === curr.x && curr.y === next.y && Math.abs(curr.x - next.x) > 5 && Math.abs(curr.y - prev.y) > 5) {
      cornerPoints.push(curr);
      cornerPointPositions.push(i);
    } else if (prev.y === curr.y && curr.x === next.x && Math.abs(curr.x - prev.x) > 5 && Math.abs(curr.y - next.y) > 5) {
      cornerPoints.push(curr);
      cornerPointPositions.push(i);
    }
  }
  return { cornerPoints, cornerPointPositions };
}
__name(extractCornerPoints, "extractCornerPoints");
var findAdjacentPoint = /* @__PURE__ */ __name(function(pointA, pointB, distance) {
  const xDiff = pointB.x - pointA.x;
  const yDiff = pointB.y - pointA.y;
  const length = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
  const ratio = distance / length;
  return { x: pointB.x - ratio * xDiff, y: pointB.y - ratio * yDiff };
}, "findAdjacentPoint");
var fixCorners = /* @__PURE__ */ __name(function(lineData) {
  const { cornerPointPositions } = extractCornerPoints(lineData);
  const newLineData = [];
  for (let i = 0; i < lineData.length; i++) {
    if (cornerPointPositions.includes(i)) {
      const prevPoint = lineData[i - 1];
      const nextPoint = lineData[i + 1];
      const cornerPoint = lineData[i];
      const newPrevPoint = findAdjacentPoint(prevPoint, cornerPoint, 5);
      const newNextPoint = findAdjacentPoint(nextPoint, cornerPoint, 5);
      const xDiff = newNextPoint.x - newPrevPoint.x;
      const yDiff = newNextPoint.y - newPrevPoint.y;
      newLineData.push(newPrevPoint);
      const a = Math.sqrt(2) * 2;
      let newCornerPoint = { x: cornerPoint.x, y: cornerPoint.y };
      if (Math.abs(nextPoint.x - prevPoint.x) > 10 && Math.abs(nextPoint.y - prevPoint.y) >= 10) {
        log.debug(
          "Corner point fixing",
          Math.abs(nextPoint.x - prevPoint.x),
          Math.abs(nextPoint.y - prevPoint.y)
        );
        const r = 5;
        if (cornerPoint.x === newPrevPoint.x) {
          newCornerPoint = {
            x: xDiff < 0 ? newPrevPoint.x - r + a : newPrevPoint.x + r - a,
            y: yDiff < 0 ? newPrevPoint.y - a : newPrevPoint.y + a
          };
        } else {
          newCornerPoint = {
            x: xDiff < 0 ? newPrevPoint.x - a : newPrevPoint.x + a,
            y: yDiff < 0 ? newPrevPoint.y - r + a : newPrevPoint.y + r - a
          };
        }
      } else {
        log.debug(
          "Corner point skipping fixing",
          Math.abs(nextPoint.x - prevPoint.x),
          Math.abs(nextPoint.y - prevPoint.y)
        );
      }
      newLineData.push(newCornerPoint, newNextPoint);
    } else {
      newLineData.push(lineData[i]);
    }
  }
  return newLineData;
}, "fixCorners");
var insertEdge = /* @__PURE__ */ __name(function(elem, edge, clusterDb, diagramType, startNode, endNode, id) {
  const { handDrawnSeed } = getConfig();
  let points = edge.points;
  let pointsHasChanged = false;
  const tail = startNode;
  var head = endNode;
  if (head.intersect && tail.intersect) {
    points = points.slice(1, edge.points.length - 1);
    points.unshift(tail.intersect(points[0]));
    log.debug(
      "Last point APA12",
      edge.start,
      "-->",
      edge.end,
      points[points.length - 1],
      head,
      head.intersect(points[points.length - 1])
    );
    points.push(head.intersect(points[points.length - 1]));
  }
  if (edge.toCluster) {
    log.info("to cluster abc88", clusterDb.get(edge.toCluster));
    points = cutPathAtIntersect(edge.points, clusterDb.get(edge.toCluster).node);
    pointsHasChanged = true;
  }
  if (edge.fromCluster) {
    log.debug(
      "from cluster abc88",
      clusterDb.get(edge.fromCluster),
      JSON.stringify(points, null, 2)
    );
    points = cutPathAtIntersect(points.reverse(), clusterDb.get(edge.fromCluster).node).reverse();
    pointsHasChanged = true;
  }
  let lineData = points.filter((p) => !Number.isNaN(p.y));
  lineData = fixCorners(lineData);
  let lastPoint = lineData[lineData.length - 1];
  if (lineData.length > 1) {
    lastPoint = lineData[lineData.length - 1];
    const secondLastPoint = lineData[lineData.length - 2];
    const diffX = (lastPoint.x - secondLastPoint.x) / 2;
    const diffY = (lastPoint.y - secondLastPoint.y) / 2;
    const midPoint = { x: secondLastPoint.x + diffX, y: secondLastPoint.y + diffY };
    lineData.splice(-1, 0, midPoint);
  }
  let curve = curveBasis;
  if (edge.curve) {
    curve = edge.curve;
  }
  const { x, y } = getLineFunctionsWithOffset(edge);
  const lineFunction = line().x(x).y(y).curve(curve);
  let strokeClasses;
  switch (edge.thickness) {
    case "normal":
      strokeClasses = "edge-thickness-normal";
      break;
    case "thick":
      strokeClasses = "edge-thickness-thick";
      break;
    case "invisible":
      strokeClasses = "edge-thickness-invisible";
      break;
    default:
      strokeClasses = "edge-thickness-normal";
  }
  switch (edge.pattern) {
    case "solid":
      strokeClasses += " edge-pattern-solid";
      break;
    case "dotted":
      strokeClasses += " edge-pattern-dotted";
      break;
    case "dashed":
      strokeClasses += " edge-pattern-dashed";
      break;
    default:
      strokeClasses += " edge-pattern-solid";
  }
  let svgPath;
  let linePath = lineFunction(lineData);
  const edgeStyles = Array.isArray(edge.style) ? edge.style : [edge.style];
  if (edge.look === "handDrawn") {
    const rc = rough2.svg(elem);
    Object.assign([], lineData);
    const svgPathNode = rc.path(linePath, {
      roughness: 0.3,
      seed: handDrawnSeed
    });
    strokeClasses += " transition";
    svgPath = select3(svgPathNode).select("path").attr("id", edge.id).attr("class", " " + strokeClasses + (edge.classes ? " " + edge.classes : "")).attr("style", edgeStyles ? edgeStyles.reduce((acc, style) => acc + ";" + style, "") : "");
    let d = svgPath.attr("d");
    svgPath.attr("d", d);
    elem.node().appendChild(svgPath.node());
  } else {
    svgPath = elem.append("path").attr("d", linePath).attr("id", edge.id).attr("class", " " + strokeClasses + (edge.classes ? " " + edge.classes : "")).attr("style", edgeStyles ? edgeStyles.reduce((acc, style) => acc + ";" + style, "") : "");
  }
  let url = "";
  if (getConfig().flowchart.arrowMarkerAbsolute || getConfig().state.arrowMarkerAbsolute) {
    url = window.location.protocol + "//" + window.location.host + window.location.pathname + window.location.search;
    url = url.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
  }
  log.info("arrowTypeStart", edge.arrowTypeStart);
  log.info("arrowTypeEnd", edge.arrowTypeEnd);
  addEdgeMarkers(svgPath, edge, url, id, diagramType);
  let paths = {};
  if (pointsHasChanged) {
    paths.updatedPath = points;
  }
  paths.originalPath = edge.points;
  return paths;
}, "insertEdge");

// src/rendering-util/rendering-elements/markers.js
var insertMarkers = /* @__PURE__ */ __name((elem, markerArray, type, id) => {
  markerArray.forEach((markerName) => {
    markers[markerName](elem, type, id);
  });
}, "insertMarkers");
var extension = /* @__PURE__ */ __name((elem, type, id) => {
  log.trace("Making markers for ", id);
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-extensionStart").attr("class", "marker extension " + type).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 1,7 L18,13 V 1 Z");
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-extensionEnd").attr("class", "marker extension " + type).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 1,1 V 13 L18,7 Z");
}, "extension");
var composition = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-compositionStart").attr("class", "marker composition " + type).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-compositionEnd").attr("class", "marker composition " + type).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "composition");
var aggregation = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-aggregationStart").attr("class", "marker aggregation " + type).attr("refX", 18).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-aggregationEnd").attr("class", "marker aggregation " + type).attr("refX", 1).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L1,7 L9,1 Z");
}, "aggregation");
var dependency = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-dependencyStart").attr("class", "marker dependency " + type).attr("refX", 6).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("path").attr("d", "M 5,7 L9,13 L1,7 L9,1 Z");
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-dependencyEnd").attr("class", "marker dependency " + type).attr("refX", 13).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 28).attr("orient", "auto").append("path").attr("d", "M 18,7 L9,13 L14,7 L9,1 Z");
}, "dependency");
var lollipop = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-lollipopStart").attr("class", "marker lollipop " + type).attr("refX", 13).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-lollipopEnd").attr("class", "marker lollipop " + type).attr("refX", 1).attr("refY", 7).attr("markerWidth", 190).attr("markerHeight", 240).attr("orient", "auto").append("circle").attr("stroke", "black").attr("fill", "transparent").attr("cx", 7).attr("cy", 7).attr("r", 6);
}, "lollipop");
var point = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("marker").attr("id", id + "_" + type + "-pointEnd").attr("class", "marker " + type).attr("viewBox", "0 0 10 10").attr("refX", 5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 0 L 10 5 L 0 10 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  elem.append("marker").attr("id", id + "_" + type + "-pointStart").attr("class", "marker " + type).attr("viewBox", "0 0 10 10").attr("refX", 4.5).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 8).attr("markerHeight", 8).attr("orient", "auto").append("path").attr("d", "M 0 5 L 10 10 L 10 0 z").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, "point");
var circle = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("marker").attr("id", id + "_" + type + "-circleEnd").attr("class", "marker " + type).attr("viewBox", "0 0 10 10").attr("refX", 11).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
  elem.append("marker").attr("id", id + "_" + type + "-circleStart").attr("class", "marker " + type).attr("viewBox", "0 0 10 10").attr("refX", -1).attr("refY", 5).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("circle").attr("cx", "5").attr("cy", "5").attr("r", "5").attr("class", "arrowMarkerPath").style("stroke-width", 1).style("stroke-dasharray", "1,0");
}, "circle");
var cross = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("marker").attr("id", id + "_" + type + "-crossEnd").attr("class", "marker cross " + type).attr("viewBox", "0 0 11 11").attr("refX", 12).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
  elem.append("marker").attr("id", id + "_" + type + "-crossStart").attr("class", "marker cross " + type).attr("viewBox", "0 0 11 11").attr("refX", -1).attr("refY", 5.2).attr("markerUnits", "userSpaceOnUse").attr("markerWidth", 11).attr("markerHeight", 11).attr("orient", "auto").append("path").attr("d", "M 1,1 l 9,9 M 10,1 l -9,9").attr("class", "arrowMarkerPath").style("stroke-width", 2).style("stroke-dasharray", "1,0");
}, "cross");
var barb = /* @__PURE__ */ __name((elem, type, id) => {
  elem.append("defs").append("marker").attr("id", id + "_" + type + "-barbEnd").attr("refX", 19).attr("refY", 7).attr("markerWidth", 20).attr("markerHeight", 14).attr("markerUnits", "userSpaceOnUse").attr("orient", "auto").append("path").attr("d", "M 19,7 L9,13 L14,7 L9,1 Z");
}, "barb");
var markers = {
  extension,
  composition,
  aggregation,
  dependency,
  lollipop,
  point,
  circle,
  cross,
  barb
};
var markers_default = insertMarkers;

// src/rendering-util/rendering-elements/shapes/util.js
import { select as select4 } from "d3";
var labelHelper = /* @__PURE__ */ __name(async (parent, node, _classes) => {
  let cssClasses;
  const useHtmlLabels = node.useHtmlLabels || evaluate(getConfig().flowchart.htmlLabels);
  if (!_classes) {
    cssClasses = "node default";
  } else {
    cssClasses = _classes;
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const labelEl = shapeSvg.insert("g").attr("class", "label").attr("style", node.labelStyle);
  let label;
  if (node.label === void 0) {
    label = "";
  } else {
    label = typeof node.label === "string" ? node.label : node.label[0];
  }
  let text2;
  text2 = await createText(labelEl, sanitizeText(decodeEntities(label), getConfig()), {
    useHtmlLabels,
    width: node.width || getConfig().flowchart.wrappingWidth,
    cssClasses: "markdown-node-label",
    style: node.labelStyle,
    addSvgBackground: !!node.icon || !!node.img
  });
  let bbox = text2.getBBox();
  const halfPadding = node.padding / 2;
  if (evaluate(getConfig().flowchart.htmlLabels)) {
    const div = text2.children[0];
    const dv = select4(text2);
    const images = div.getElementsByTagName("img");
    if (images) {
      const noImgText = label.replace(/<img[^>]*>/g, "").trim() === "";
      await Promise.all(
        [...images].map(
          (img) => new Promise((res) => {
            function setupImage() {
              img.style.display = "flex";
              img.style.flexDirection = "column";
              if (noImgText) {
                const bodyFontSize = getConfig().fontSize ? getConfig().fontSize : window.getComputedStyle(document.body).fontSize;
                const enlargingFactor = 5;
                const width = parseInt(bodyFontSize, 10) * enlargingFactor + "px";
                img.style.minWidth = width;
                img.style.maxWidth = width;
              } else {
                img.style.width = "100%";
              }
              res(img);
            }
            __name(setupImage, "setupImage");
            setTimeout(() => {
              if (img.complete) {
                setupImage();
              }
            });
            img.addEventListener("error", setupImage);
            img.addEventListener("load", setupImage);
          })
        )
      );
    }
    bbox = div.getBoundingClientRect();
    dv.attr("width", bbox.width);
    dv.attr("height", bbox.height);
  }
  if (useHtmlLabels) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  } else {
    labelEl.attr("transform", "translate(0, " + -bbox.height / 2 + ")");
  }
  if (node.centerLabel) {
    labelEl.attr("transform", "translate(" + -bbox.width / 2 + ", " + -bbox.height / 2 + ")");
  }
  labelEl.insert("rect", ":first-child");
  return { shapeSvg, bbox, halfPadding, label: labelEl };
}, "labelHelper");
var updateNodeBounds = /* @__PURE__ */ __name((node, element) => {
  const bbox = element.node().getBBox();
  node.width = bbox.width;
  node.height = bbox.height;
}, "updateNodeBounds");
var getNodeClasses = /* @__PURE__ */ __name((node, extra) => (node.look === "handDrawn" ? "rough-node" : "node") + " " + node.cssClasses + " " + (extra || ""), "getNodeClasses");
function createPathFromPoints(points) {
  const pointStrings = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`);
  pointStrings.push("Z");
  return pointStrings.join(" ");
}
__name(createPathFromPoints, "createPathFromPoints");
function generateFullSineWavePoints(x1, y1, x2, y2, amplitude, numCycles) {
  const points = [];
  const steps = 50;
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const cycleLength = deltaX / numCycles;
  const frequency = 2 * Math.PI / cycleLength;
  const midY = y1 + deltaY / 2;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = x1 + t * deltaX;
    const y = midY + amplitude * Math.sin(frequency * (x - x1));
    points.push({ x, y });
  }
  return points;
}
__name(generateFullSineWavePoints, "generateFullSineWavePoints");
function generateCirclePoints(centerX, centerY, radius, numPoints, startAngle, endAngle) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x: -x, y: -y });
  }
  return points;
}
__name(generateCirclePoints, "generateCirclePoints");

// src/rendering-util/rendering-elements/intersect/intersect-node.js
function intersectNode(node, point2) {
  return node.intersect(point2);
}
__name(intersectNode, "intersectNode");
var intersect_node_default = intersectNode;

// src/rendering-util/rendering-elements/intersect/intersect-ellipse.js
function intersectEllipse(node, rx, ry, point2) {
  var cx = node.x;
  var cy = node.y;
  var px = cx - point2.x;
  var py = cy - point2.y;
  var det = Math.sqrt(rx * rx * py * py + ry * ry * px * px);
  var dx = Math.abs(rx * ry * px / det);
  if (point2.x < cx) {
    dx = -dx;
  }
  var dy = Math.abs(rx * ry * py / det);
  if (point2.y < cy) {
    dy = -dy;
  }
  return { x: cx + dx, y: cy + dy };
}
__name(intersectEllipse, "intersectEllipse");
var intersect_ellipse_default = intersectEllipse;

// src/rendering-util/rendering-elements/intersect/intersect-circle.js
function intersectCircle(node, rx, point2) {
  return intersect_ellipse_default(node, rx, rx, point2);
}
__name(intersectCircle, "intersectCircle");
var intersect_circle_default = intersectCircle;

// src/rendering-util/rendering-elements/intersect/intersect-line.js
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
var intersect_line_default = intersectLine;

// src/rendering-util/rendering-elements/intersect/intersect-polygon.js
function intersectPolygon(node, polyPoints, point2) {
  let x1 = node.x;
  let y1 = node.y;
  let intersections = [];
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  if (typeof polyPoints.forEach === "function") {
    polyPoints.forEach(function(entry) {
      minX = Math.min(minX, entry.x);
      minY = Math.min(minY, entry.y);
    });
  } else {
    minX = Math.min(minX, polyPoints.x);
    minY = Math.min(minY, polyPoints.y);
  }
  let left = x1 - node.width / 2 - minX;
  let top = y1 - node.height / 2 - minY;
  for (let i = 0; i < polyPoints.length; i++) {
    let p1 = polyPoints[i];
    let p2 = polyPoints[i < polyPoints.length - 1 ? i + 1 : 0];
    let intersect = intersect_line_default(
      node,
      point2,
      { x: left + p1.x, y: top + p1.y },
      { x: left + p2.x, y: top + p2.y }
    );
    if (intersect) {
      intersections.push(intersect);
    }
  }
  if (!intersections.length) {
    return node;
  }
  if (intersections.length > 1) {
    intersections.sort(function(p, q) {
      let pdx = p.x - point2.x;
      let pdy = p.y - point2.y;
      let distp = Math.sqrt(pdx * pdx + pdy * pdy);
      let qdx = q.x - point2.x;
      let qdy = q.y - point2.y;
      let distq = Math.sqrt(qdx * qdx + qdy * qdy);
      return distp < distq ? -1 : distp === distq ? 0 : 1;
    });
  }
  return intersections[0];
}
__name(intersectPolygon, "intersectPolygon");
var intersect_polygon_default = intersectPolygon;

// src/rendering-util/rendering-elements/intersect/index.js
var intersect_default = {
  node: intersect_node_default,
  circle: intersect_circle_default,
  ellipse: intersect_ellipse_default,
  polygon: intersect_polygon_default,
  rect: intersect_rect_default
};

// src/rendering-util/rendering-elements/shapes/drawRect.ts
import rough3 from "roughjs";
var drawRect = /* @__PURE__ */ __name(async (parent, node, options) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + options.labelPaddingX * 2, node?.width || 0);
  const totalHeight = Math.max(bbox.height + options.labelPaddingY * 2, node?.height || 0);
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  let rect2;
  let { rx, ry } = node;
  const { cssStyles } = node;
  if (options?.rx && options.ry) {
    rx = options.rx;
    ry = options.ry;
  }
  if (node.look === "handDrawn") {
    const rc = rough3.svg(shapeSvg);
    const options2 = userNodeOverrides(node, {});
    const roughNode = rx || ry ? rc.path(createRoundedRectPathD(x, y, totalWidth, totalHeight, rx || 0), options2) : rc.rectangle(x, y, totalWidth, totalHeight, options2);
    rect2 = shapeSvg.insert(() => roughNode, ":first-child");
    rect2.attr("class", "basic label-container").attr("style", cssStyles);
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("class", "basic label-container").attr("style", nodeStyles).attr("rx", rx).attr("ry", ry).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight);
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "drawRect");

// src/rendering-util/rendering-elements/shapes/state.ts
var state = /* @__PURE__ */ __name(async (parent, node) => {
  const options = {
    rx: 5,
    ry: 5,
    classes: "flowchart-node"
  };
  return drawRect(parent, node, options);
}, "state");

// src/rendering-util/rendering-elements/shapes/roundedRect.ts
var roundedRect = /* @__PURE__ */ __name(async (parent, node) => {
  const options = {
    rx: 5,
    ry: 5,
    classes: "",
    labelPaddingX: (node?.padding || 0) * 1,
    labelPaddingY: (node?.padding || 0) * 1
  };
  return drawRect(parent, node, options);
}, "roundedRect");

// src/rendering-util/rendering-elements/shapes/squareRect.ts
var squareRect2 = /* @__PURE__ */ __name(async (parent, node) => {
  const options = {
    rx: 0,
    ry: 0,
    classes: "",
    labelPaddingX: (node?.padding || 0) * 2,
    labelPaddingY: (node?.padding || 0) * 1
  };
  return drawRect(parent, node, options);
}, "squareRect");

// src/rendering-util/rendering-elements/shapes/stateStart.ts
import rough4 from "roughjs";
var stateStart = /* @__PURE__ */ __name((parent, node, { config: { themeVariables } }) => {
  const { lineColor } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
  let circle3;
  if (node.look === "handDrawn") {
    const rc = rough4.svg(shapeSvg);
    const roughNode = rc.circle(0, 0, 14, solidStateFill(lineColor));
    circle3 = shapeSvg.insert(() => roughNode);
  } else {
    circle3 = shapeSvg.insert("circle", ":first-child");
  }
  circle3.attr("class", "state-start").attr("r", 7).attr("width", 14).attr("height", 14);
  updateNodeBounds(node, circle3);
  node.intersect = function(point2) {
    return intersect_default.circle(node, 7, point2);
  };
  return shapeSvg;
}, "stateStart");

// src/rendering-util/rendering-elements/shapes/stateEnd.ts
import rough5 from "roughjs";
var stateEnd = /* @__PURE__ */ __name((parent, node, { config: { themeVariables } }) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { cssStyles } = node;
  const { lineColor, stateBorder, nodeBorder } = themeVariables;
  const shapeSvg = parent.insert("g").attr("class", "node default").attr("id", node.domId || node.id);
  const rc = rough5.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughNode = rc.circle(0, 0, 14, {
    ...options,
    stroke: lineColor,
    strokeWidth: 2
  });
  const innerFill = stateBorder ?? nodeBorder;
  const roughInnerNode = rc.circle(0, 0, 5, {
    ...options,
    fill: innerFill,
    stroke: innerFill,
    strokeWidth: 2,
    fillStyle: "solid"
  });
  const circle3 = shapeSvg.insert(() => roughNode, ":first-child");
  circle3.insert(() => roughInnerNode);
  if (cssStyles) {
    circle3.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles) {
    circle3.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, circle3);
  node.intersect = function(point2) {
    return intersect_default.circle(node, 7, point2);
  };
  return shapeSvg;
}, "stateEnd");

// src/rendering-util/rendering-elements/shapes/forkJoin.ts
import rough6 from "roughjs";
var forkJoin = /* @__PURE__ */ __name((parent, node, { dir, config: { state: state2, themeVariables } }) => {
  const { nodeStyles } = styles2String(node);
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  let width = Math.max(70, node?.width ?? 0);
  let height = Math.max(10, node?.height ?? 0);
  if (dir === "LR") {
    width = Math.max(10, node?.width ?? 0);
    height = Math.max(70, node?.height ?? 0);
  }
  const x = -1 * width / 2;
  const y = -1 * height / 2;
  const rc = rough6.svg(shapeSvg);
  const options = userNodeOverrides(node, {
    stroke: themeVariables.lineColor,
    fill: themeVariables.lineColor
  });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const roughNode = rc.rectangle(x, y, width, height, options);
  const shape = shapeSvg.insert(() => roughNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, shape);
  const padding = state2?.padding ?? 0;
  if (node.width && node.height) {
    node.width += padding / 2 || 0;
    node.height += padding / 2 || 0;
  }
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "forkJoin");

// src/rendering-util/rendering-elements/shapes/choice.ts
import rough7 from "roughjs";
var choice = /* @__PURE__ */ __name((parent, node) => {
  const { nodeStyles } = styles2String(node);
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  const s = Math.max(28, node.width ?? 0);
  const points = [
    { x: 0, y: s / 2 },
    { x: s / 2, y: 0 },
    { x: 0, y: -s / 2 },
    { x: -s / 2, y: 0 }
  ];
  const rc = rough7.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const choicePath = createPathFromPoints(points);
  const roughNode = rc.path(choicePath, options);
  const choiceShape = shapeSvg.insert(() => roughNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    choiceShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    choiceShape.selectAll("path").attr("style", nodeStyles);
  }
  node.width = 28;
  node.height = 28;
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "choice");

// src/rendering-util/rendering-elements/shapes/note.ts
import rough8 from "roughjs";
var note = /* @__PURE__ */ __name(async (parent, node, { config: { themeVariables } }) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const totalHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const { cssStyles } = node;
  const useHtmlLabels = node.useHtmlLabels;
  if (!useHtmlLabels) {
    node.centerLabel = true;
  }
  const rc = rough8.svg(shapeSvg);
  const options = userNodeOverrides(node, {
    fill: themeVariables.noteBkgColor,
    stroke: themeVariables.noteBorderColor
  });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const noteShapeNode = rc.rectangle(x, y, totalWidth, totalHeight, options);
  const rect2 = shapeSvg.insert(() => noteShapeNode, ":first-child");
  rect2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "note");

// src/rendering-util/rendering-elements/shapes/stadium.ts
import rough9 from "roughjs";
var stadium = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = bbox.height + node.padding;
  const w = bbox.width + h / 4 + node.padding;
  let rect2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough9.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createRoundedRectPathD(-w / 2, -h / 2, w, h, h / 2);
    const roughNode = rc.path(pathData, options);
    rect2 = shapeSvg.insert(() => roughNode, ":first-child");
    rect2.attr("class", "basic label-container").attr("style", cssStyles);
  } else {
    rect2 = shapeSvg.insert("rect", ":first-child");
    rect2.attr("class", "basic label-container").attr("style", nodeStyles).attr("rx", h / 2).attr("ry", h / 2).attr("x", -w / 2).attr("y", -h / 2).attr("width", w).attr("height", h);
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "stadium");

// src/rendering-util/rendering-elements/shapes/rectWithTitle.ts
import { select as select5 } from "d3";
import rough10 from "roughjs";
var rectWithTitle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  let classes;
  if (!node.cssClasses) {
    classes = "node default";
  } else {
    classes = "node " + node.cssClasses;
  }
  const shapeSvg = parent.insert("g").attr("class", classes).attr("id", node.domId || node.id);
  const g = shapeSvg.insert("g");
  const label = shapeSvg.insert("g").attr("class", "label").attr("style", nodeStyles);
  const description = node.description;
  const title = node.label;
  const text2 = label.node().appendChild(await createLabel_default(title, node.labelStyle, true, true));
  let bbox = { width: 0, height: 0 };
  if (evaluate(getConfig()?.flowchart?.htmlLabels)) {
    const div2 = text2.children[0];
    const dv2 = select5(text2);
    bbox = div2.getBoundingClientRect();
    dv2.attr("width", bbox.width);
    dv2.attr("height", bbox.height);
  }
  log.info("Text 2", description);
  const textRows = description || [];
  const titleBox = text2.getBBox();
  const descr = label.node().appendChild(
    await createLabel_default(
      textRows.join ? textRows.join("<br/>") : textRows,
      node.labelStyle,
      true,
      true
    )
  );
  const div = descr.children[0];
  const dv = select5(descr);
  bbox = div.getBoundingClientRect();
  dv.attr("width", bbox.width);
  dv.attr("height", bbox.height);
  const halfPadding = (node.padding || 0) / 2;
  select5(descr).attr(
    "transform",
    "translate( " + (bbox.width > titleBox.width ? 0 : (titleBox.width - bbox.width) / 2) + ", " + (titleBox.height + halfPadding + 5) + ")"
  );
  select5(text2).attr(
    "transform",
    "translate( " + (bbox.width < titleBox.width ? 0 : -(titleBox.width - bbox.width) / 2) + ", 0)"
  );
  bbox = label.node().getBBox();
  label.attr(
    "transform",
    "translate(" + -bbox.width / 2 + ", " + (-bbox.height / 2 - halfPadding + 3) + ")"
  );
  const totalWidth = bbox.width + (node.padding || 0);
  const totalHeight = bbox.height + (node.padding || 0);
  const x = -bbox.width / 2 - halfPadding;
  const y = -bbox.height / 2 - halfPadding;
  let rect2;
  let innerLine;
  if (node.look === "handDrawn") {
    const rc = rough10.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.path(
      createRoundedRectPathD(x, y, totalWidth, totalHeight, node.rx || 0),
      options
    );
    const roughLine = rc.line(
      -bbox.width / 2 - halfPadding,
      -bbox.height / 2 - halfPadding + titleBox.height + halfPadding,
      bbox.width / 2 + halfPadding,
      -bbox.height / 2 - halfPadding + titleBox.height + halfPadding,
      options
    );
    innerLine = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughLine;
    }, ":first-child");
    rect2 = shapeSvg.insert(() => {
      log.debug("Rough node insert CXC", roughNode);
      return roughNode;
    }, ":first-child");
  } else {
    rect2 = g.insert("rect", ":first-child");
    innerLine = g.insert("line");
    rect2.attr("class", "outer title-state").attr("style", nodeStyles).attr("x", -bbox.width / 2 - halfPadding).attr("y", -bbox.height / 2 - halfPadding).attr("width", bbox.width + (node.padding || 0)).attr("height", bbox.height + (node.padding || 0));
    innerLine.attr("class", "divider").attr("x1", -bbox.width / 2 - halfPadding).attr("x2", bbox.width / 2 + halfPadding).attr("y1", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding).attr("y2", -bbox.height / 2 - halfPadding + titleBox.height + halfPadding);
  }
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "rectWithTitle");

// src/rendering-util/rendering-elements/shapes/subroutine.ts
import rough11 from "roughjs";

// src/rendering-util/rendering-elements/shapes/insertPolygonShape.ts
function insertPolygonShape(parent, w, h, points) {
  return parent.insert("polygon", ":first-child").attr(
    "points",
    points.map(function(d) {
      return d.x + "," + d.y;
    }).join(" ")
  ).attr("class", "label-container").attr("transform", "translate(" + -w / 2 + "," + h / 2 + ")");
}
__name(insertPolygonShape, "insertPolygonShape");

// src/rendering-util/rendering-elements/shapes/subroutine.ts
var subroutine = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const halfPadding = (node?.padding || 0) / 2;
  const w = bbox.width + node.padding;
  const h = bbox.height + node.padding;
  const x = -bbox.width / 2 - halfPadding;
  const y = -bbox.height / 2 - halfPadding;
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
  if (node.look === "handDrawn") {
    const rc = rough11.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.rectangle(x - 8, y, w + 16, h, options);
    const l1 = rc.line(x, y, x, y + h, options);
    const l2 = rc.line(x + w, y, x + w, y + h, options);
    shapeSvg.insert(() => l1, ":first-child");
    shapeSvg.insert(() => l2, ":first-child");
    const rect2 = shapeSvg.insert(() => roughNode, ":first-child");
    const { cssStyles } = node;
    rect2.attr("class", "basic label-container").attr("style", cssStyles);
    updateNodeBounds(node, rect2);
  } else {
    const el = insertPolygonShape(shapeSvg, w, h, points);
    if (nodeStyles) {
      el.attr("style", nodeStyles);
    }
    updateNodeBounds(node, el);
  }
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "subroutine");

// src/rendering-util/rendering-elements/shapes/cylinder.ts
import rough12 from "roughjs";
var createCylinderPathD = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return [
    `M${x},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`
  ].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return [
    `M${x},${y + ry}`,
    `M${x + width},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return [`M${x - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
var cylinder = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + node.padding, node.width ?? 0);
  const rx = w / 2;
  const ry = rx / (2.5 + w / 50);
  const h = Math.max(bbox.height + ry + node.padding, node.height ?? 0);
  let cylinder2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough12.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD(0, 0, w, h, rx, ry);
    const innerPathData = createInnerCylinderPathD(0, ry, w, h, rx, ry);
    const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
    const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
    cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD(0, 0, w, h, rx, ry);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", cssStyles).attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-y", ry);
  cylinder2.attr("transform", `translate(${-w / 2}, ${-(h / 2 + ry)})`);
  updateNodeBounds(node, cylinder2);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + (node.padding ?? 0) / 1.5 - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    const x = pos.x - (node.x ?? 0);
    if (rx != 0 && (Math.abs(x) < (node.width ?? 0) / 2 || Math.abs(x) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
      let y = ry * ry * (1 - x * x / (rx * rx));
      if (y > 0) {
        y = Math.sqrt(y);
      }
      y = ry - y;
      if (point2.y - (node.y ?? 0) > 0) {
        y = -y;
      }
      pos.y += y;
    }
    return pos;
  };
  return shapeSvg;
}, "cylinder");

// src/rendering-util/rendering-elements/shapes/circle.ts
import rough13 from "roughjs";
var circle2 = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
  const radius = bbox.width / 2 + halfPadding;
  let circleElem;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough13.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const roughNode = rc.circle(0, 0, radius * 2, options);
    circleElem = shapeSvg.insert(() => roughNode, ":first-child");
    circleElem.attr("class", "basic label-container").attr("style", cssStyles);
  } else {
    circleElem = shapeSvg.insert("circle", ":first-child").attr("class", "basic label-container").attr("style", nodeStyles).attr("r", radius).attr("cx", 0).attr("cy", 0);
  }
  updateNodeBounds(node, circleElem);
  node.intersect = function(point2) {
    log.info("Circle intersect", node, radius, point2);
    return intersect_default.circle(node, radius, point2);
  };
  return shapeSvg;
}, "circle");

// src/rendering-util/rendering-elements/shapes/doubleCircle.ts
import rough14 from "roughjs";
var doublecircle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, halfPadding } = await labelHelper(parent, node, getNodeClasses(node));
  const gap = 5;
  const outerRadius = bbox.width / 2 + halfPadding + gap;
  const innerRadius = bbox.width / 2 + halfPadding;
  let circleGroup;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough14.svg(shapeSvg);
    const outerOptions = userNodeOverrides(node, { roughness: 0.2, strokeWidth: 2.5 });
    const innerOptions = userNodeOverrides(node, { roughness: 0.2, strokeWidth: 1.5 });
    const outerRoughNode = rc.circle(0, 0, outerRadius * 2, outerOptions);
    const innerRoughNode = rc.circle(0, 0, innerRadius * 2, innerOptions);
    circleGroup = shapeSvg.insert("g", ":first-child");
    circleGroup.attr("class", node.cssClasses).attr("style", cssStyles);
    circleGroup.node()?.appendChild(outerRoughNode);
    circleGroup.node()?.appendChild(innerRoughNode);
  } else {
    circleGroup = shapeSvg.insert("g", ":first-child");
    const outerCircle = circleGroup.insert("circle", ":first-child");
    const innerCircle = circleGroup.insert("circle");
    circleGroup.attr("class", "basic label-container").attr("style", nodeStyles);
    outerCircle.attr("class", "outer-circle").attr("style", nodeStyles).attr("r", outerRadius).attr("cx", 0).attr("cy", 0);
    innerCircle.attr("class", "inner-circle").attr("style", nodeStyles).attr("r", innerRadius).attr("cx", 0).attr("cy", 0);
  }
  updateNodeBounds(node, circleGroup);
  node.intersect = function(point2) {
    log.info("DoubleCircle intersect", node, outerRadius, point2);
    return intersect_default.circle(node, outerRadius, point2);
  };
  return shapeSvg;
}, "doublecircle");

// src/rendering-util/rendering-elements/shapes/rectLeftInvArrow.ts
import rough15 from "roughjs";
var rect_left_inv_arrow = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0), node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0), node?.height ?? 0);
  const x = -w / 2;
  const y = -h / 2;
  const notch = y / 2;
  const points = [
    { x: x + notch, y },
    { x, y: 0 },
    { x: x + notch, y: -y },
    { x: -x, y: -y },
    { x: -x, y }
  ];
  const { cssStyles } = node;
  const rc = rough15.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => roughNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-notch / 2},0)`);
  label.attr(
    "transform",
    `translate(${-notch / 2 - bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "rect_left_inv_arrow");

// src/rendering-util/rendering-elements/shapes/question.ts
import rough16 from "roughjs";
var createDecisionBoxPathD = /* @__PURE__ */ __name((x, y, size) => {
  return [
    `M${x + size / 2},${y}`,
    `L${x + size},${y - size / 2}`,
    `L${x + size / 2},${y - size}`,
    `L${x},${y - size / 2}`,
    "Z"
  ].join(" ");
}, "createDecisionBoxPathD");
var question = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + node.padding;
  const h = bbox.height + node.padding;
  const s = w + h;
  const points = [
    { x: s / 2, y: 0 },
    { x: s, y: -s / 2 },
    { x: s / 2, y: -s },
    { x: 0, y: -s / 2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough16.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createDecisionBoxPathD(0, 0, s);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-s / 2}, ${s / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, s, s, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    log.debug(
      "APA12 Intersect called SPLIT\npoint:",
      point2,
      "\nnode:\n",
      node,
      "\nres:",
      intersect_default.polygon(node, points, point2)
    );
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "question");

// src/rendering-util/rendering-elements/shapes/hexagon.ts
import rough17 from "roughjs";
var createHexagonPathD = /* @__PURE__ */ __name((x, y, width, height, m) => {
  return [
    `M${x + m},${y}`,
    `L${x + width - m},${y}`,
    `L${x + width},${y - height / 2}`,
    `L${x + width - m},${y - height}`,
    `L${x + m},${y - height}`,
    `L${x},${y - height / 2}`,
    "Z"
  ].join(" ");
}, "createHexagonPathD");
var hexagon = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const f = 4;
  const h = bbox.height + node.padding;
  const m = h / f;
  const w = bbox.width + 2 * m + node.padding;
  const points = [
    { x: m, y: 0 },
    { x: w - m, y: 0 },
    { x: w, y: -h / 2 },
    { x: w - m, y: -h },
    { x: m, y: -h },
    { x: 0, y: -h / 2 }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough17.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createHexagonPathD(0, 0, w, h, m);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "hexagon");

// src/rendering-util/rendering-elements/shapes/text.ts
async function text(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const totalWidth = Math.max(bbox.width + node.padding, node?.width || 0);
  const totalHeight = Math.max(bbox.height + node.padding, node?.height || 0);
  const x = -totalWidth / 2;
  const y = -totalHeight / 2;
  const rect2 = shapeSvg.insert("rect", ":first-child");
  rect2.attr("class", "text").attr("style", nodeStyles).attr("rx", 0).attr("ry", 0).attr("x", x).attr("y", y).attr("width", totalWidth).attr("height", totalHeight);
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}
__name(text, "text");

// src/rendering-util/rendering-elements/shapes/card.ts
import rough18 from "roughjs";
async function card(parent, node) {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const h = bbox.height + node.padding;
  const padding = 12;
  const w = bbox.width + node.padding + padding;
  const left = 0;
  const right = w;
  const top = -h;
  const bottom = 0;
  const points = [
    { x: left + padding, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
    { x: left, y: top + padding },
    { x: left + padding, y: top }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough18.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}
__name(card, "card");

// src/rendering-util/rendering-elements/shapes/shadedProcess.ts
import rough19 from "roughjs";
var shadedProcess = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const halfPadding = node?.padding ?? 0;
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const x = -bbox.width / 2 - halfPadding;
  const y = -bbox.height / 2 - halfPadding;
  const { cssStyles } = node;
  const rc = rough19.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x, y },
    { x: x + w + 8, y },
    { x: x + w + 8, y: y + h },
    { x: x - 8, y: y + h },
    { x: x - 8, y },
    { x, y },
    { x, y: y + h }
  ];
  const roughNode = rc.polygon(
    points.map((p) => [p.x, p.y]),
    options
  );
  const rect2 = shapeSvg.insert(() => roughNode, ":first-child");
  rect2.attr("class", "basic label-container").attr("style", cssStyles);
  if (nodeStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", nodeStyles);
  }
  if (cssStyles && node.look !== "handDrawn") {
    rect2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-w / 2 + 4 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "shadedProcess");

// src/rendering-util/rendering-elements/shapes/anchor.ts
import rough20 from "roughjs";
var anchor = /* @__PURE__ */ __name((parent, node) => {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const classes = getNodeClasses(node);
  let cssClasses = classes;
  if (!classes) {
    cssClasses = "anchor";
  }
  const shapeSvg = parent.insert("g").attr("class", cssClasses).attr("id", node.domId || node.id);
  const radius = 1;
  const { cssStyles } = node;
  const rc = rough20.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "black", stroke: "none", fillStyle: "solid" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
  }
  const roughNode = rc.circle(0, 0, radius * 2, options);
  const circleElem = shapeSvg.insert(() => roughNode, ":first-child");
  circleElem.attr("class", "anchor").attr("style", cssStyles);
  updateNodeBounds(node, circleElem);
  node.intersect = function(point2) {
    log.info("Circle intersect", node, radius, point2);
    return intersect_default.circle(node, radius, point2);
  };
  return shapeSvg;
}, "anchor");

// src/rendering-util/rendering-elements/shapes/leanRight.ts
import rough21 from "roughjs";
var lean_right = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0), node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0), node?.height ?? 0);
  const points = [
    { x: -3 * h / 6, y: 0 },
    { x: w, y: 0 },
    { x: w + 3 * h / 6, y: -h },
    { x: 0, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough21.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "lean_right");

// src/rendering-util/rendering-elements/shapes/leanLeft.ts
import rough22 from "roughjs";
var lean_left = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0), node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0), node?.height ?? 0);
  const points = [
    { x: 0, y: 0 },
    { x: w + 3 * h / 6, y: 0 },
    { x: w, y: -h },
    { x: -(3 * h) / 6, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough22.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "lean_left");

// src/rendering-util/rendering-elements/shapes/trapezoid.ts
import rough23 from "roughjs";
var trapezoid = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + node.padding;
  const h = bbox.height + node.padding;
  const points = [
    { x: -3 * h / 6, y: 0 },
    { x: w + 3 * h / 6, y: 0 },
    { x: w, y: -h },
    { x: 0, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough23.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "trapezoid");

// src/rendering-util/rendering-elements/shapes/invertedTrapezoid.ts
import rough24 from "roughjs";
var inv_trapezoid = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: w + 3 * h / 6, y: -h },
    { x: -3 * h / 6, y: -h }
  ];
  let polygon;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough24.svg(shapeSvg);
    const options = userNodeOverrides(node, {});
    const pathData = createPathFromPoints(points);
    const roughNode = rc.path(pathData, options);
    polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-w / 2}, ${h / 2})`);
    if (cssStyles) {
      polygon.attr("style", cssStyles);
    }
  } else {
    polygon = insertPolygonShape(shapeSvg, w, h, points);
  }
  if (nodeStyles) {
    polygon.attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "inv_trapezoid");

// src/rendering-util/rendering-elements/shapes/labelRect.ts
var labelRect = /* @__PURE__ */ __name(async (parent, node) => {
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "label");
  const rect2 = shapeSvg.insert("rect", ":first-child");
  const totalWidth = 0.1;
  const totalHeight = 0.1;
  rect2.attr("width", totalWidth).attr("height", totalHeight);
  shapeSvg.attr("class", "label edgeLabel");
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, rect2);
  node.intersect = function(point2) {
    return intersect_default.rect(node, point2);
  };
  return shapeSvg;
}, "labelRect");

// src/rendering-util/rendering-elements/shapes/triangle.ts
import rough25 from "roughjs";
var triangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const useHtmlLabels = evaluate(getConfig().flowchart?.htmlLabels);
  const w = bbox.width + (node.padding ?? 0);
  const h = w + bbox.height;
  const tw = w + bbox.height;
  const points = [
    { x: 0, y: 0 },
    { x: tw, y: 0 },
    { x: tw / 2, y: -h }
  ];
  const { cssStyles } = node;
  const rc = rough25.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h / 2}, ${h / 2})`);
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, polygon);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${h / 2 - (bbox.height + (node.padding ?? 0) / (useHtmlLabels ? 2 : 1) - (bbox.y - (bbox.top ?? 0)))})`
  );
  node.intersect = function(point2) {
    log.info("Triangle intersect", node, points, point2);
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "triangle");

// src/rendering-util/rendering-elements/shapes/halfRoundedRectangle.ts
import rough26 from "roughjs";
var halfRoundedRectangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const minWidth = 80, minHeight = 50;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(minWidth, bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const radius = h / 2;
  const { cssStyles } = node;
  const rc = rough26.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2, y: -h / 2 },
    { x: w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints(-w / 2 + radius, 0, radius, 50, 90, 270),
    { x: w / 2 - radius, y: h / 2 },
    { x: -w / 2, y: h / 2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    log.info("Pill intersect", node, { radius, point: point2 });
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "halfRoundedRectangle");

// src/rendering-util/rendering-elements/shapes/curvedTrapezoid.ts
import rough27 from "roughjs";
var curvedTrapezoid = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const minWidth = 80, minHeight = 20;
  const w = Math.max(minWidth, (bbox.width + (node.padding ?? 0) * 2) * 1.25, node?.width ?? 0);
  const h = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const radius = h / 2;
  const { cssStyles } = node;
  const rc = rough27.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const totalWidth = w, totalHeight = h;
  const rw = totalWidth - radius;
  const tw = totalHeight / 4;
  const points = [
    { x: rw, y: 0 },
    { x: tw, y: 0 },
    { x: 0, y: totalHeight / 2 },
    { x: tw, y: totalHeight },
    { x: rw, y: totalHeight },
    ...generateCirclePoints(-rw, -totalHeight / 2, radius, 50, 270, 90)
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-w / 2}, ${-h / 2})`);
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "curvedTrapezoid");

// src/rendering-util/rendering-elements/shapes/slopedRect.ts
import rough28 from "roughjs";
var slopedRect = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = rough28.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x, y },
    { x, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y: y - h / 2 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(0, ${h / 4})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))}, ${-h / 4 + (node.padding ?? 0) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "slopedRect");

// src/rendering-util/rendering-elements/shapes/bowTieRect.ts
import rough29 from "roughjs";
function generateArcPoints(x1, y1, x2, y2, rx, ry, clockwise) {
  const numPoints = 20;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const dx = (x2 - x1) / 2;
  const dy = (y2 - y1) / 2;
  const transformedX = dx / rx;
  const transformedY = dy / ry;
  const distance = Math.sqrt(transformedX ** 2 + transformedY ** 2);
  if (distance > 1) {
    throw new Error("The given radii are too small to create an arc between the points.");
  }
  const scaledCenterDistance = Math.sqrt(1 - distance ** 2);
  const centerX = midX + scaledCenterDistance * ry * Math.sin(angle) * (clockwise ? -1 : 1);
  const centerY = midY - scaledCenterDistance * rx * Math.cos(angle) * (clockwise ? -1 : 1);
  const startAngle = Math.atan2((y1 - centerY) / ry, (x1 - centerX) / rx);
  const endAngle = Math.atan2((y2 - centerY) / ry, (x2 - centerX) / rx);
  let angleRange = endAngle - startAngle;
  if (clockwise && angleRange < 0) {
    angleRange += 2 * Math.PI;
  }
  if (!clockwise && angleRange > 0) {
    angleRange -= 2 * Math.PI;
  }
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1);
    const angle2 = startAngle + t * angleRange;
    const x = centerX + rx * Math.cos(angle2);
    const y = centerY + ry * Math.sin(angle2);
    points.push({ x, y });
  }
  return points;
}
__name(generateArcPoints, "generateArcPoints");
var bowTieRect = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + node.padding + 20;
  const h = bbox.height + node.padding;
  const ry = h / 2;
  const rx = ry / (2.5 + h / 50);
  const { cssStyles } = node;
  const points = [
    { x: w / 2, y: -h / 2 },
    { x: -w / 2, y: -h / 2 },
    ...generateArcPoints(-w / 2, -h / 2, -w / 2, h / 2, rx, ry, false),
    { x: w / 2, y: h / 2 },
    ...generateArcPoints(w / 2, h / 2, w / 2, -h / 2, rx, ry, true)
  ];
  const rc = rough29.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const bowTieRectPath = createPathFromPoints(points);
  const bowTieRectShapePath = rc.path(bowTieRectPath, options);
  const bowTieRectShape = shapeSvg.insert(() => bowTieRectShapePath, ":first-child");
  bowTieRectShape.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    bowTieRectShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    bowTieRectShape.selectAll("path").attr("style", nodeStyles);
  }
  bowTieRectShape.attr("transform", `translate(${rx / 2}, 0)`);
  updateNodeBounds(node, bowTieRectShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "bowTieRect");

// src/rendering-util/rendering-elements/shapes/dividedRect.ts
import rough30 from "roughjs";
var dividedRectangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + node.padding;
  const h = bbox.height + node.padding;
  const rectOffset = h * 0.2;
  const x = -w / 2;
  const y = -h / 2 - rectOffset / 2;
  const { cssStyles } = node;
  const rc = rough30.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pts = [
    { x, y: y + rectOffset },
    { x: -x, y: y + rectOffset },
    { x: -x, y: -y },
    { x, y: -y },
    { x, y },
    { x: -x, y },
    { x: -x, y: y + rectOffset }
  ];
  const poly = rc.polygon(
    pts.map((p) => [p.x, p.y]),
    options
  );
  const polygon = shapeSvg.insert(() => poly, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${x + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))}, ${y + rectOffset + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    return pos;
  };
  return shapeSvg;
}, "dividedRectangle");

// src/rendering-util/rendering-elements/shapes/crossedCircle.ts
import rough31 from "roughjs";
function createLine(r) {
  const xAxis45 = Math.cos(Math.PI / 4);
  const yAxis45 = Math.sin(Math.PI / 4);
  const lineLength = r * 2;
  const pointQ1 = { x: lineLength / 2 * xAxis45, y: lineLength / 2 * yAxis45 };
  const pointQ2 = { x: -(lineLength / 2) * xAxis45, y: lineLength / 2 * yAxis45 };
  const pointQ3 = { x: -(lineLength / 2) * xAxis45, y: -(lineLength / 2) * yAxis45 };
  const pointQ4 = { x: lineLength / 2 * xAxis45, y: -(lineLength / 2) * yAxis45 };
  return `M ${pointQ2.x},${pointQ2.y} L ${pointQ4.x},${pointQ4.y}
                   M ${pointQ1.x},${pointQ1.y} L ${pointQ3.x},${pointQ3.y}`;
}
__name(createLine, "createLine");
var crossedCircle = /* @__PURE__ */ __name((parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  node.label = "";
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const radius = Math.max(30, node?.width ?? 0);
  const { cssStyles } = node;
  const rc = rough31.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const circleNode = rc.circle(0, 0, radius * 2, options);
  const linePath = createLine(radius);
  const lineNode = rc.path(linePath, options);
  const crossedCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
  crossedCircle2.insert(() => lineNode);
  if (cssStyles && node.look !== "handDrawn") {
    crossedCircle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    crossedCircle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, crossedCircle2);
  node.intersect = function(point2) {
    log.info("crossedCircle intersect", node, { radius, point: point2 });
    const pos = intersect_default.circle(node, radius, point2);
    return pos;
  };
  return shapeSvg;
}, "crossedCircle");

// src/rendering-util/rendering-elements/shapes/waveRectangle.ts
import rough32 from "roughjs";
var waveRectangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const minWidth = 100;
  const minHeight = 50;
  const baseWidth = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const baseHeight = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const aspectRatio = baseWidth / baseHeight;
  let w = baseWidth;
  let h = baseHeight;
  if (w > h * aspectRatio) {
    h = w / aspectRatio;
  } else {
    w = h * aspectRatio;
  }
  w = Math.max(w, minWidth);
  h = Math.max(h, minHeight);
  const waveAmplitude = Math.min(h * 0.2, h / 4);
  const finalH = h + waveAmplitude * 2;
  const { cssStyles } = node;
  const rc = rough32.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2, y: finalH / 2 },
    ...generateFullSineWavePoints(-w / 2, finalH / 2, w / 2, finalH / 2, waveAmplitude, 1),
    { x: w / 2, y: -finalH / 2 },
    ...generateFullSineWavePoints(w / 2, -finalH / 2, -w / 2, -finalH / 2, waveAmplitude, -1)
  ];
  const waveRectPath = createPathFromPoints(points);
  const waveRectNode = rc.path(waveRectPath, options);
  const waveRect = shapeSvg.insert(() => waveRectNode, ":first-child");
  waveRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveRect.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, waveRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "waveRectangle");

// src/rendering-util/rendering-elements/shapes/tiltedCylinder.ts
import rough33 from "roughjs";
var createCylinderPathD2 = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return `M${x},${y}
    a${rx},${ry} 0,0,1 ${0},${-height}
    l${width},${0}
    a${rx},${ry} 0,0,1 ${0},${height}
    M${width},${-height}
    a${rx},${ry} 0,0,0 ${0},${height}
    l${-width},${0}`;
}, "createCylinderPathD");
var createOuterCylinderPathD2 = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return [
    `M${x},${y}`,
    `M${x + width},${y}`,
    `a${rx},${ry} 0,0,0 ${0},${-height}`,
    `l${-width},0`,
    `a${rx},${ry} 0,0,0 ${0},${height}`,
    `l${width},0`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD2 = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return [`M${x + width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 0,${height}`].join(" ");
}, "createInnerCylinderPathD");
var tiltedCylinder = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label, halfPadding } = await labelHelper(
    parent,
    node,
    getNodeClasses(node)
  );
  const labelPadding = node.look === "neo" ? halfPadding * 2 : halfPadding;
  const h = bbox.height + labelPadding;
  const ry = h / 2;
  const rx = ry / (2.5 + h / 50);
  const w = bbox.width + rx + labelPadding;
  const { cssStyles } = node;
  let cylinder2;
  if (node.look === "handDrawn") {
    const rc = rough33.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD2(0, 0, w, h, rx, ry);
    const innerPathData = createInnerCylinderPathD2(0, 0, w, h, rx, ry);
    const outerNode = rc.path(outerPathData, userNodeOverrides(node, {}));
    const innerLine = rc.path(innerPathData, userNodeOverrides(node, { fill: "none" }));
    cylinder2 = shapeSvg.insert(() => innerLine, ":first-child");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD2(0, 0, w, h, rx, ry);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", cssStyles).attr("style", nodeStyles);
  }
  cylinder2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    cylinder2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    cylinder2.selectAll("path").attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-x", rx);
  cylinder2.attr("transform", `translate(${-w / 2}, ${h / 2} )`);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rx - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, cylinder2);
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    const y = pos.y - (node.y ?? 0);
    if (ry != 0 && (Math.abs(y) < (node.height ?? 0) / 2 || Math.abs(y) == (node.height ?? 0) / 2 && Math.abs(pos.x - (node.x ?? 0)) > (node.width ?? 0) / 2 - rx)) {
      let x = rx * rx * (1 - y * y / (ry * ry));
      if (x != 0) {
        x = Math.sqrt(x);
      }
      x = rx - x;
      if (point2.x - (node.x ?? 0) > 0) {
        x = -x;
      }
      pos.x += x;
    }
    return pos;
  };
  return shapeSvg;
}, "tiltedCylinder");

// src/rendering-util/rendering-elements/shapes/trapezoidalPentagon.ts
import rough34 from "roughjs";
var trapezoidalPentagon = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const minWidth = 60, minHeight = 20;
  const w = Math.max(minWidth, bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(minHeight, bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const { cssStyles } = node;
  const rc = rough34.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 * 0.8, y: -h / 2 },
    { x: w / 2 * 0.8, y: -h / 2 },
    { x: w / 2, y: -h / 2 * 0.6 },
    { x: w / 2, y: h / 2 },
    { x: -w / 2, y: h / 2 },
    { x: -w / 2, y: -h / 2 * 0.6 }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "trapezoidalPentagon");

// src/rendering-util/rendering-elements/shapes/flippedTriangle.ts
import rough35 from "roughjs";
var flippedTriangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + (node.padding ?? 0);
  const h = w + bbox.height;
  const tw = w + bbox.height;
  const points = [
    { x: 0, y: -h },
    { x: tw, y: -h },
    { x: tw / 2, y: 0 }
  ];
  const { cssStyles } = node;
  const rc = rough35.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const pathData = createPathFromPoints(points);
  const roughNode = rc.path(pathData, options);
  const flippedTriangle2 = shapeSvg.insert(() => roughNode, ":first-child").attr("transform", `translate(${-h / 2}, ${h / 2})`);
  if (cssStyles && node.look !== "handDrawn") {
    flippedTriangle2.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    flippedTriangle2.selectChildren("path").attr("style", nodeStyles);
  }
  node.width = w;
  node.height = h;
  updateNodeBounds(node, flippedTriangle2);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))}, ${-h / 2 + (node.padding ?? 0) / 2 + (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point2) {
    log.info("Triangle intersect", node, points, point2);
    return intersect_default.polygon(node, points, point2);
  };
  return shapeSvg;
}, "flippedTriangle");

// src/rendering-util/rendering-elements/shapes/hourglass.ts
import rough36 from "roughjs";
var hourglass = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const { shapeSvg } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(30, node?.width ?? 0);
  const h = Math.max(30, node?.height ?? 0);
  const { cssStyles } = node;
  const rc = rough36.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: 0, y: 0 },
    { x: w, y: 0 },
    { x: 0, y: h },
    { x: w, y: h }
  ];
  const pathData = createPathFromPoints(points);
  const shapeNode = rc.path(pathData, options);
  const polygon = shapeSvg.insert(() => shapeNode, ":first-child");
  polygon.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    polygon.selectChildren("path").attr("style", nodeStyles);
  }
  polygon.attr("transform", `translate(${-w / 2}, ${-h / 2})`);
  updateNodeBounds(node, polygon);
  node.intersect = function(point2) {
    log.info("Pill intersect", node, { points });
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "hourglass");

// src/rendering-util/rendering-elements/shapes/taggedRect.ts
import rough37 from "roughjs";
var taggedRect = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const x = -w / 2;
  const y = -h / 2;
  const tagWidth = 0.2 * h;
  const tagHeight = 0.2 * h;
  const { cssStyles } = node;
  const rc = rough37.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const rectPoints = [
    { x: x - tagWidth / 2, y },
    { x: x + w + tagWidth / 2, y },
    { x: x + w + tagWidth / 2, y: y + h },
    { x: x - tagWidth / 2, y: y + h }
  ];
  const tagPoints = [
    { x: x + w - tagWidth / 2, y: y + h },
    { x: x + w + tagWidth / 2, y: y + h },
    { x: x + w + tagWidth / 2, y: y + h - tagHeight }
  ];
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const rectPath = createPathFromPoints(rectPoints);
  const rectNode = rc.path(rectPath, options);
  const tagPath = createPathFromPoints(tagPoints);
  const tagNode = rc.path(tagPath, { ...options, fillStyle: "solid" });
  const taggedRect2 = shapeSvg.insert(() => tagNode, ":first-child");
  taggedRect2.insert(() => rectNode, ":first-child");
  taggedRect2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    taggedRect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    taggedRect2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, taggedRect2);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "taggedRect");

// src/rendering-util/rendering-elements/shapes/multiRect.ts
import rough38 from "roughjs";
var multiRect = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const rectOffset = 5;
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = rough38.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const outerPathPoints = [
    { x: x - rectOffset, y: y + rectOffset },
    { x: x - rectOffset, y: y + h + rectOffset },
    { x: x + w - rectOffset, y: y + h + rectOffset },
    { x: x + w - rectOffset, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y: y + h - rectOffset },
    { x: x + w + rectOffset, y: y + h - rectOffset },
    { x: x + w + rectOffset, y: y - rectOffset },
    { x: x + rectOffset, y: y - rectOffset },
    { x: x + rectOffset, y },
    { x, y },
    { x, y: y + rectOffset }
  ];
  const innerPathPoints = [
    { x, y: y + rectOffset },
    { x: x + w - rectOffset, y: y + rectOffset },
    { x: x + w - rectOffset, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y },
    { x, y }
  ];
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const outerPath = createPathFromPoints(outerPathPoints);
  const outerNode = rc.path(outerPath, options);
  const innerPath = createPathFromPoints(innerPathPoints);
  const innerNode = rc.path(innerPath, { ...options, fill: "none" });
  const multiRect2 = shapeSvg.insert(() => innerNode, ":first-child");
  multiRect2.insert(() => outerNode, ":first-child");
  multiRect2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    multiRect2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    multiRect2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rectOffset - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, multiRect2);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, outerPathPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "multiRect");

// src/rendering-util/rendering-elements/shapes/linedCylinder.ts
import rough39 from "roughjs";
var createCylinderPathD3 = /* @__PURE__ */ __name((x, y, width, height, rx, ry, outerOffset) => {
  return [
    `M${x},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`,
    `M${x},${y + ry + outerOffset}`,
    `a${rx},${ry} 0,0,0 ${width},0`
  ].join(" ");
}, "createCylinderPathD");
var createOuterCylinderPathD3 = /* @__PURE__ */ __name((x, y, width, height, rx, ry, outerOffset) => {
  return [
    `M${x},${y + ry}`,
    `M${x + width},${y + ry}`,
    `a${rx},${ry} 0,0,0 ${-width},0`,
    `l0,${height}`,
    `a${rx},${ry} 0,0,0 ${width},0`,
    `l0,${-height}`,
    `M${x},${y + ry + outerOffset}`,
    `a${rx},${ry} 0,0,0 ${width},0`
  ].join(" ");
}, "createOuterCylinderPathD");
var createInnerCylinderPathD3 = /* @__PURE__ */ __name((x, y, width, height, rx, ry) => {
  return [`M${x - width / 2},${-height / 2}`, `a${rx},${ry} 0,0,0 ${width},0`].join(" ");
}, "createInnerCylinderPathD");
var linedCylinder = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0), node.width ?? 0);
  const rx = w / 2;
  const ry = rx / (2.5 + w / 50);
  const h = Math.max(bbox.height + ry + (node.padding ?? 0), node.height ?? 0);
  const outerOffset = h * 0.1;
  let cylinder2;
  const { cssStyles } = node;
  if (node.look === "handDrawn") {
    const rc = rough39.svg(shapeSvg);
    const outerPathData = createOuterCylinderPathD3(0, 0, w, h, rx, ry, outerOffset);
    const innerPathData = createInnerCylinderPathD3(0, ry, w, h, rx, ry);
    const options = userNodeOverrides(node, {});
    const outerNode = rc.path(outerPathData, options);
    const innerLine = rc.path(innerPathData, options);
    const innerLineEl = shapeSvg.insert(() => innerLine, ":first-child");
    innerLineEl.attr("class", "line");
    cylinder2 = shapeSvg.insert(() => outerNode, ":first-child");
    cylinder2.attr("class", "basic label-container");
    if (cssStyles) {
      cylinder2.attr("style", cssStyles);
    }
  } else {
    const pathData = createCylinderPathD3(0, 0, w, h, rx, ry, outerOffset);
    cylinder2 = shapeSvg.insert("path", ":first-child").attr("d", pathData).attr("class", "basic label-container").attr("style", cssStyles).attr("style", nodeStyles);
  }
  cylinder2.attr("label-offset-y", ry);
  cylinder2.attr("transform", `translate(${-w / 2}, ${-(h / 2 + ry)})`);
  updateNodeBounds(node, cylinder2);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + ry - (bbox.y - (bbox.top ?? 0))})`
  );
  node.intersect = function(point2) {
    const pos = intersect_default.rect(node, point2);
    const x = pos.x - (node.x ?? 0);
    if (rx != 0 && (Math.abs(x) < (node.width ?? 0) / 2 || Math.abs(x) == (node.width ?? 0) / 2 && Math.abs(pos.y - (node.y ?? 0)) > (node.height ?? 0) / 2 - ry)) {
      let y = ry * ry * (1 - x * x / (rx * rx));
      if (y > 0) {
        y = Math.sqrt(y);
      }
      y = ry - y;
      if (point2.y - (node.y ?? 0) > 0) {
        y = -y;
      }
      pos.y += y;
    }
    return pos;
  };
  return shapeSvg;
}, "linedCylinder");

// src/rendering-util/rendering-elements/shapes/waveEdgedRectangle.ts
import rough40 from "roughjs";
var waveEdgedRectangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const waveAmplitude = h / 8;
  const finalH = h + waveAmplitude;
  const { cssStyles } = node;
  const minWidth = 70;
  const widthDif = minWidth - w;
  const extraW = widthDif > 0 ? widthDif / 2 : 0;
  const rc = rough40.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 - extraW, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w / 2 - extraW,
      finalH / 2,
      w / 2 + extraW,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w / 2 + extraW, y: -finalH / 2 },
    { x: -w / 2 - extraW, y: -finalH / 2 }
  ];
  const waveEdgeRectPath = createPathFromPoints(points);
  const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
  const waveEdgeRect = shapeSvg.insert(() => waveEdgeRectNode, ":first-child");
  waveEdgeRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - waveAmplitude - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "waveEdgedRectangle");

// src/rendering-util/rendering-elements/shapes/lightningBolt.ts
import rough41 from "roughjs";
var lightningBolt = /* @__PURE__ */ __name((parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const { cssStyles } = node;
  const width = Math.max(35, node?.width ?? 0);
  const height = Math.max(35, node?.height ?? 0);
  const gap = 7;
  const points = [
    { x: width, y: 0 },
    { x: 0, y: height + gap / 2 },
    { x: width - 2 * gap, y: height + gap / 2 },
    { x: 0, y: 2 * height },
    { x: width, y: height - gap / 2 },
    { x: 2 * gap, y: height - gap / 2 }
  ];
  const rc = rough41.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const linePath = createPathFromPoints(points);
  const lineNode = rc.path(linePath, options);
  const lightningBolt2 = shapeSvg.insert(() => lineNode, ":first-child");
  if (cssStyles && node.look !== "handDrawn") {
    lightningBolt2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    lightningBolt2.selectAll("path").attr("style", nodeStyles);
  }
  lightningBolt2.attr("transform", `translate(-${width / 2},${-height})`);
  updateNodeBounds(node, lightningBolt2);
  node.intersect = function(point2) {
    log.info("lightningBolt intersect", node, point2);
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "lightningBolt");

// src/rendering-util/rendering-elements/shapes/filledCircle.ts
import rough42 from "roughjs";
var filledCircle = /* @__PURE__ */ __name((parent, node, { config: { themeVariables } }) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.label = "";
  node.labelStyle = labelStyles;
  const shapeSvg = parent.insert("g").attr("class", getNodeClasses(node)).attr("id", node.domId ?? node.id);
  const radius = 7;
  const { cssStyles } = node;
  const rc = rough42.svg(shapeSvg);
  const { nodeBorder } = themeVariables;
  const options = userNodeOverrides(node, { fillStyle: "solid" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
  }
  const circleNode = rc.circle(0, 0, radius * 2, options);
  const filledCircle2 = shapeSvg.insert(() => circleNode, ":first-child");
  filledCircle2.selectAll("path").attr("style", `fill: ${nodeBorder} !important;`);
  if (cssStyles && cssStyles.length > 0 && node.look !== "handDrawn") {
    filledCircle2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    filledCircle2.selectAll("path").attr("style", nodeStyles);
  }
  updateNodeBounds(node, filledCircle2);
  node.intersect = function(point2) {
    log.info("filledCircle intersect", node, { radius, point: point2 });
    const pos = intersect_default.circle(node, radius, point2);
    return pos;
  };
  return shapeSvg;
}, "filledCircle");

// src/rendering-util/rendering-elements/shapes/multiWaveEdgedRectangle.ts
import rough43 from "roughjs";
var multiWaveEdgedRectangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const waveAmplitude = h / 4;
  const finalH = h + waveAmplitude;
  const x = -w / 2;
  const y = -finalH / 2;
  const rectOffset = 5;
  const { cssStyles } = node;
  const wavePoints = generateFullSineWavePoints(
    x - rectOffset,
    y + finalH + rectOffset,
    x + w - rectOffset,
    y + finalH + rectOffset,
    waveAmplitude,
    0.8
  );
  const lastWavePoint = wavePoints?.[wavePoints.length - 1];
  const outerPathPoints = [
    { x: x - rectOffset, y: y + rectOffset },
    { x: x - rectOffset, y: y + finalH + rectOffset },
    ...wavePoints,
    { x: x + w - rectOffset, y: lastWavePoint.y - rectOffset },
    { x: x + w, y: lastWavePoint.y - rectOffset },
    { x: x + w, y: lastWavePoint.y - 2 * rectOffset },
    { x: x + w + rectOffset, y: lastWavePoint.y - 2 * rectOffset },
    { x: x + w + rectOffset, y: y - rectOffset },
    { x: x + rectOffset, y: y - rectOffset },
    { x: x + rectOffset, y },
    { x, y },
    { x, y: y + rectOffset }
  ];
  const innerPathPoints = [
    { x, y: y + rectOffset },
    { x: x + w - rectOffset, y: y + rectOffset },
    { x: x + w - rectOffset, y: lastWavePoint.y - rectOffset },
    { x: x + w, y: lastWavePoint.y - rectOffset },
    { x: x + w, y },
    { x, y }
  ];
  const rc = rough43.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const outerPath = createPathFromPoints(outerPathPoints);
  const outerNode = rc.path(outerPath, options);
  const innerPath = createPathFromPoints(innerPathPoints);
  const innerNode = rc.path(innerPath, options);
  const shape = shapeSvg.insert(() => outerNode, ":first-child");
  shape.insert(() => innerNode);
  shape.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    shape.selectAll("path").attr("style", nodeStyles);
  }
  shape.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) - rectOffset - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, shape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, outerPathPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "multiWaveEdgedRectangle");

// src/rendering-util/rendering-elements/shapes/windowPane.ts
import rough44 from "roughjs";
var windowPane = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const rectOffset = 5;
  const x = -w / 2;
  const y = -h / 2;
  const { cssStyles } = node;
  const rc = rough44.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  const outerPathPoints = [
    { x: x - rectOffset, y: y - rectOffset },
    { x: x - rectOffset, y: y + h },
    { x: x + w, y: y + h },
    { x: x + w, y: y - rectOffset }
  ];
  const path = `M${x - rectOffset},${y - rectOffset} L${x + w},${y - rectOffset} L${x + w},${y + h} L${x - rectOffset},${y + h} L${x - rectOffset},${y - rectOffset}
                M${x - rectOffset},${y} L${x + w},${y}
                M${x},${y - rectOffset} L${x},${y + h}`;
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const no = rc.path(path, options);
  const windowPane2 = shapeSvg.insert(() => no, ":first-child");
  windowPane2.attr("transform", `translate(${rectOffset / 2}, ${rectOffset / 2})`);
  windowPane2.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    windowPane2.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    windowPane2.selectAll("path").attr("style", nodeStyles);
  }
  label.attr(
    "transform",
    `translate(${-(bbox.width / 2) + rectOffset / 2 - (bbox.x - (bbox.left ?? 0))}, ${-(bbox.height / 2) + rectOffset / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, windowPane2);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, outerPathPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "windowPane");

// src/rendering-util/rendering-elements/shapes/linedWaveEdgedRect.ts
import rough45 from "roughjs";
var linedWaveEdgedRect = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const waveAmplitude = h / 4;
  const finalH = h + waveAmplitude;
  const { cssStyles } = node;
  const rc = rough45.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 - w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2 - w / 2 * 0.1, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w / 2 - w / 2 * 0.1,
      finalH / 2,
      w / 2 + w / 2 * 0.1,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w / 2 + w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2 - w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2, y: -finalH / 2 },
    { x: -w / 2, y: finalH / 2 * 1.1 },
    { x: -w / 2, y: -finalH / 2 }
  ];
  const poly = rc.polygon(
    points.map((p) => [p.x, p.y]),
    options
  );
  const waveEdgeRect = shapeSvg.insert(() => poly, ":first-child");
  waveEdgeRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) + w / 2 * 0.1 / 2 - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "linedWaveEdgedRect");

// src/rendering-util/rendering-elements/shapes/taggedWaveEdgedRectangle.ts
import rough46 from "roughjs";
var taggedWaveEdgedRectangle = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = Math.max(bbox.width + (node.padding ?? 0) * 2, node?.width ?? 0);
  const h = Math.max(bbox.height + (node.padding ?? 0) * 2, node?.height ?? 0);
  const waveAmplitude = h / 4;
  const tagWidth = 0.2 * w;
  const tagHeight = 0.2 * h;
  const finalH = h + waveAmplitude;
  const { cssStyles } = node;
  const rc = rough46.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const points = [
    { x: -w / 2 - w / 2 * 0.1, y: finalH / 2 },
    ...generateFullSineWavePoints(
      -w / 2 - w / 2 * 0.1,
      finalH / 2,
      w / 2 + w / 2 * 0.1,
      finalH / 2,
      waveAmplitude,
      0.8
    ),
    { x: w / 2 + w / 2 * 0.1, y: -finalH / 2 },
    { x: -w / 2 - w / 2 * 0.1, y: -finalH / 2 }
  ];
  const x = -w / 2 + w / 2 * 0.1;
  const y = -finalH / 2 - tagHeight * 0.4;
  const tagPoints = [
    { x: x + w - tagWidth, y: (y + h) * 1.4 },
    { x: x + w, y: y + h - tagHeight },
    { x: x + w, y: (y + h) * 0.9 },
    ...generateFullSineWavePoints(
      x + w,
      (y + h) * 1.3,
      x + w - tagWidth,
      (y + h) * 1.5,
      -h * 0.03,
      0.5
    )
  ];
  const waveEdgeRectPath = createPathFromPoints(points);
  const waveEdgeRectNode = rc.path(waveEdgeRectPath, options);
  const taggedWaveEdgeRectPath = createPathFromPoints(tagPoints);
  const taggedWaveEdgeRectNode = rc.path(taggedWaveEdgeRectPath, {
    ...options,
    fillStyle: "solid"
  });
  const waveEdgeRect = shapeSvg.insert(() => taggedWaveEdgeRectNode, ":first-child");
  waveEdgeRect.insert(() => waveEdgeRectNode, ":first-child");
  waveEdgeRect.attr("class", "basic label-container");
  if (cssStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    waveEdgeRect.selectAll("path").attr("style", nodeStyles);
  }
  waveEdgeRect.attr("transform", `translate(0,${-waveAmplitude / 2})`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) - waveAmplitude / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, waveEdgeRect);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "taggedWaveEdgedRectangle");

// src/rendering-util/rendering-elements/shapes/curlyBraceLeft.ts
import rough47 from "roughjs";
function generateCirclePoints2(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x: -x, y: -y });
  }
  return points;
}
__name(generateCirclePoints2, "generateCirclePoints");
var curlyBraceLeft = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + (node.padding ?? 0);
  const h = bbox.height + (node.padding ?? 0);
  const radius = Math.max(5, h * 0.1);
  const { cssStyles } = node;
  const points = [
    ...generateCirclePoints2(w / 2, -h / 2, radius, 30, -90, 0),
    { x: -w / 2 - radius, y: radius },
    ...generateCirclePoints2(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints2(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints2(w / 2, h / 2, radius, 20, 0, 90)
  ];
  const rectPoints = [
    { x: w / 2, y: -h / 2 - radius },
    { x: -w / 2, y: -h / 2 - radius },
    ...generateCirclePoints2(w / 2, -h / 2, radius, 20, -90, 0),
    { x: -w / 2 - radius, y: -radius },
    ...generateCirclePoints2(w / 2 + w * 0.1, -radius, radius, 20, -180, -270),
    ...generateCirclePoints2(w / 2 + w * 0.1, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: h / 2 },
    ...generateCirclePoints2(w / 2, h / 2, radius, 20, 0, 90),
    { x: -w / 2, y: h / 2 + radius },
    { x: w / 2, y: h / 2 + radius }
  ];
  const rc = rough47.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const curlyBraceLeftPath = createPathFromPoints(points);
  const newCurlyBracePath = curlyBraceLeftPath.replace("Z", "");
  const curlyBraceLeftNode = rc.path(newCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBraceLeftShape = shapeSvg.insert("g", ":first-child");
  curlyBraceLeftShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBraceLeftShape.insert(() => curlyBraceLeftNode, ":first-child");
  curlyBraceLeftShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBraceLeftShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBraceLeftShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBraceLeftShape.attr("transform", `translate(${radius}, 0)`);
  label.attr(
    "transform",
    `translate(${-w / 2 + radius - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBraceLeftShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "curlyBraceLeft");

// src/rendering-util/rendering-elements/shapes/curlyBraceRight.ts
import rough48 from "roughjs";
function generateCirclePoints3(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x, y });
  }
  return points;
}
__name(generateCirclePoints3, "generateCirclePoints");
var curlyBraceRight = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + (node.padding ?? 0);
  const h = bbox.height + (node.padding ?? 0);
  const radius = Math.max(5, h * 0.1);
  const { cssStyles } = node;
  const points = [
    ...generateCirclePoints3(w / 2, -h / 2, radius, 20, -90, 0),
    { x: w / 2 + radius, y: -radius },
    ...generateCirclePoints3(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints3(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: w / 2 + radius, y: h / 2 },
    ...generateCirclePoints3(w / 2, h / 2, radius, 20, 0, 90)
  ];
  const rectPoints = [
    { x: -w / 2, y: -h / 2 - radius },
    { x: w / 2, y: -h / 2 - radius },
    ...generateCirclePoints3(w / 2, -h / 2, radius, 20, -90, 0),
    { x: w / 2 + radius, y: -radius },
    ...generateCirclePoints3(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints3(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: w / 2 + radius, y: h / 2 },
    ...generateCirclePoints3(w / 2, h / 2, radius, 20, 0, 90),
    { x: w / 2, y: h / 2 + radius },
    { x: -w / 2, y: h / 2 + radius }
  ];
  const rc = rough48.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const curlyBraceRightPath = createPathFromPoints(points);
  const newCurlyBracePath = curlyBraceRightPath.replace("Z", "");
  const curlyBraceRightNode = rc.path(newCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBraceRightShape = shapeSvg.insert("g", ":first-child");
  curlyBraceRightShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBraceRightShape.insert(() => curlyBraceRightNode, ":first-child");
  curlyBraceRightShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBraceRightShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBraceRightShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBraceRightShape.attr("transform", `translate(${-radius}, 0)`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBraceRightShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "curlyBraceRight");

// src/rendering-util/rendering-elements/shapes/curlyBraces.ts
import rough49 from "roughjs";
function generateCirclePoints4(centerX, centerY, radius, numPoints = 100, startAngle = 0, endAngle = 180) {
  const points = [];
  const startAngleRad = startAngle * Math.PI / 180;
  const endAngleRad = endAngle * Math.PI / 180;
  const angleRange = endAngleRad - startAngleRad;
  const angleStep = angleRange / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    const angle = startAngleRad + i * angleStep;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    points.push({ x: -x, y: -y });
  }
  return points;
}
__name(generateCirclePoints4, "generateCirclePoints");
var curlyBraces = /* @__PURE__ */ __name(async (parent, node) => {
  const { labelStyles, nodeStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, getNodeClasses(node));
  const w = bbox.width + (node.padding ?? 0);
  const h = bbox.height + (node.padding ?? 0);
  const radius = Math.max(5, h * 0.1);
  const { cssStyles } = node;
  const leftCurlyBracePoints = [
    ...generateCirclePoints4(w / 2, -h / 2, radius, 30, -90, 0),
    { x: -w / 2 - radius, y: radius },
    ...generateCirclePoints4(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints4(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: -h / 2 },
    ...generateCirclePoints4(w / 2, h / 2, radius, 20, 0, 90)
  ];
  const rightCurlyBracePoints = [
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, -h / 2, radius, 20, -90, -180),
    { x: w / 2 - radius / 2, y: radius },
    ...generateCirclePoints4(-w / 2 - radius / 2, -radius, radius, 20, 0, 90),
    ...generateCirclePoints4(-w / 2 - radius / 2, radius, radius, 20, -90, 0),
    { x: w / 2 - radius / 2, y: -radius },
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, h / 2, radius, 30, -180, -270)
  ];
  const rectPoints = [
    { x: w / 2, y: -h / 2 - radius },
    { x: -w / 2, y: -h / 2 - radius },
    ...generateCirclePoints4(w / 2, -h / 2, radius, 20, -90, 0),
    { x: -w / 2 - radius, y: -radius },
    ...generateCirclePoints4(w / 2 + radius * 2, -radius, radius, 20, -180, -270),
    ...generateCirclePoints4(w / 2 + radius * 2, radius, radius, 20, -90, -180),
    { x: -w / 2 - radius, y: h / 2 },
    ...generateCirclePoints4(w / 2, h / 2, radius, 20, 0, 90),
    { x: -w / 2, y: h / 2 + radius },
    { x: w / 2 - radius - radius / 2, y: h / 2 + radius },
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, -h / 2, radius, 20, -90, -180),
    { x: w / 2 - radius / 2, y: radius },
    ...generateCirclePoints4(-w / 2 - radius / 2, -radius, radius, 20, 0, 90),
    ...generateCirclePoints4(-w / 2 - radius / 2, radius, radius, 20, -90, 0),
    { x: w / 2 - radius / 2, y: -radius },
    ...generateCirclePoints4(-w / 2 + radius + radius / 2, h / 2, radius, 30, -180, -270)
  ];
  const rc = rough49.svg(shapeSvg);
  const options = userNodeOverrides(node, { fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const leftCurlyBracePath = createPathFromPoints(leftCurlyBracePoints);
  const newLeftCurlyBracePath = leftCurlyBracePath.replace("Z", "");
  const leftCurlyBraceNode = rc.path(newLeftCurlyBracePath, options);
  const rightCurlyBracePath = createPathFromPoints(rightCurlyBracePoints);
  const newRightCurlyBracePath = rightCurlyBracePath.replace("Z", "");
  const rightCurlyBraceNode = rc.path(newRightCurlyBracePath, options);
  const rectPath = createPathFromPoints(rectPoints);
  const rectShape = rc.path(rectPath, { ...options });
  const curlyBracesShape = shapeSvg.insert("g", ":first-child");
  curlyBracesShape.insert(() => rectShape, ":first-child").attr("stroke-opacity", 0);
  curlyBracesShape.insert(() => leftCurlyBraceNode, ":first-child");
  curlyBracesShape.insert(() => rightCurlyBraceNode, ":first-child");
  curlyBracesShape.attr("class", "text");
  if (cssStyles && node.look !== "handDrawn") {
    curlyBracesShape.selectAll("path").attr("style", cssStyles);
  }
  if (nodeStyles && node.look !== "handDrawn") {
    curlyBracesShape.selectAll("path").attr("style", nodeStyles);
  }
  curlyBracesShape.attr("transform", `translate(${radius - radius / 4}, 0)`);
  label.attr(
    "transform",
    `translate(${-w / 2 + (node.padding ?? 0) / 2 - (bbox.x - (bbox.left ?? 0))},${-h / 2 + (node.padding ?? 0) / 2 - (bbox.y - (bbox.top ?? 0))})`
  );
  updateNodeBounds(node, curlyBracesShape);
  node.intersect = function(point2) {
    const pos = intersect_default.polygon(node, rectPoints, point2);
    return pos;
  };
  return shapeSvg;
}, "curlyBraces");

// src/rendering-util/rendering-elements/shapes/iconSquare.ts
import rough50 from "roughjs";
var iconSquare = /* @__PURE__ */ __name(async (parent, node, { config: { themeVariables, flowchart } }) => {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart?.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    "icon-shape default"
  );
  const topLabel = node.pos === "t";
  const height = iconSize + halfPadding * 2;
  const width = iconSize + halfPadding * 2;
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x = -width / 2;
  const y = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = rough50.svg(shapeSvg);
  const options = userNodeOverrides(node, { stroke: stylesMap.get("fill") || mainBkg });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const iconNode = rc.rectangle(x, y, width, height, options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.selectAll("path").attr("fill", stylesMap.get("stroke") ?? nodeBorder);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "iconSquare");

// src/rendering-util/rendering-elements/shapes/iconCircle.ts
import rough51 from "roughjs";
var iconCircle = /* @__PURE__ */ __name(async (parent, node, { config: { themeVariables, flowchart } }) => {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart?.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
  const padding = 20;
  const labelPadding = node.label ? 8 : 0;
  const topLabel = node.pos === "t";
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const rc = rough51.svg(shapeSvg);
  const options = userNodeOverrides(node, { stroke: stylesMap.get("fill") || mainBkg });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const iconElem = shapeSvg.append("g");
  if (node.icon) {
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
  }
  const iconBBox = iconElem.node().getBBox();
  const iconWidth = iconBBox.width;
  const iconHeight = iconBBox.height;
  const iconX = iconBBox.x;
  const iconY = iconBBox.y;
  const diameter = Math.max(iconWidth, iconHeight) * Math.SQRT2 + padding * 2;
  const iconNode = rc.circle(0, 0, diameter, options);
  const outerWidth = Math.max(diameter, bbox.width);
  const outerHeight = diameter + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  iconElem.attr(
    "transform",
    `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
  );
  iconElem.selectAll("path").attr("fill", stylesMap.get("stroke") || nodeBorder);
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    const pos = intersect_default.rect(node, point2);
    return pos;
  };
  return shapeSvg;
}, "iconCircle");

// src/rendering-util/rendering-elements/shapes/icon.ts
import rough52 from "roughjs";
var icon = /* @__PURE__ */ __name(async (parent, node, { config: { themeVariables, flowchart } }) => {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart?.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "icon-shape default");
  const topLabel = node.pos === "t";
  const height = iconSize;
  const width = iconSize;
  const { nodeBorder } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x = -width / 2;
  const y = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = rough52.svg(shapeSvg);
  const options = userNodeOverrides(node, { stroke: "none", fill: "none" });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const iconNode = rc.rectangle(x, y, width, height, options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.selectAll("path").attr("fill", stylesMap.get("stroke") || nodeBorder);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "icon");

// src/rendering-util/rendering-elements/shapes/imageSquare.ts
import rough53 from "roughjs";
var imageSquare = /* @__PURE__ */ __name(async (parent, node, { config: { flowchart } }) => {
  const img = new Image();
  img.src = node?.img ?? "";
  await img.decode();
  const imageNaturalWidth = Number(img.naturalWidth.toString().replace("px", ""));
  const imageNaturalHeight = Number(img.naturalHeight.toString().replace("px", ""));
  node.imageAspectRatio = imageNaturalWidth / imageNaturalHeight;
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const defaultWidth = flowchart?.wrappingWidth;
  node.defaultWidth = flowchart?.wrappingWidth;
  const imageRawWidth = Math.max(
    node.label ? defaultWidth ?? 0 : 0,
    node?.assetWidth ?? imageNaturalWidth
  );
  const imageWidth = node.constraint === "on" ? node?.assetHeight ? node.assetHeight * node.imageAspectRatio : imageRawWidth : imageRawWidth;
  const imageHeight = node.constraint === "on" ? imageWidth / node.imageAspectRatio : node?.assetHeight ?? imageNaturalHeight;
  node.width = Math.max(imageWidth, defaultWidth ?? 0);
  const { shapeSvg, bbox, label } = await labelHelper(parent, node, "image-shape default");
  const topLabel = node.pos === "t";
  const x = -imageWidth / 2;
  const y = -imageHeight / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = rough53.svg(shapeSvg);
  const options = userNodeOverrides(node, {});
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const imageNode = rc.rectangle(x, y, imageWidth, imageHeight, options);
  const outerWidth = Math.max(imageWidth, bbox.width);
  const outerHeight = imageHeight + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "none",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => imageNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.img) {
    const image = shapeSvg.append("image");
    image.attr("href", node.img);
    image.attr("width", imageWidth);
    image.attr("height", imageHeight);
    image.attr("preserveAspectRatio", "none");
    image.attr(
      "transform",
      `translate(${-imageWidth / 2},${topLabel ? outerHeight / 2 - imageHeight : -outerHeight / 2})`
    );
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -imageHeight / 2 - bbox.height / 2 - labelPadding / 2 : imageHeight / 2 - bbox.height / 2 + labelPadding / 2})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + imageWidth / 2, y: dy + nodeHeight / 2 },
        { x: dx - imageWidth / 2, y: dy + nodeHeight / 2 },
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 },
        { x: dx + imageWidth / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + imageHeight },
        { x: dx - imageWidth / 2, y: dy - nodeHeight / 2 + imageHeight }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "imageSquare");

// src/rendering-util/rendering-elements/shapes/iconRounded.ts
import rough54 from "roughjs";
var iconRounded = /* @__PURE__ */ __name(async (parent, node, { config: { themeVariables, flowchart } }) => {
  const { labelStyles } = styles2String(node);
  node.labelStyle = labelStyles;
  const assetHeight = node.assetHeight ?? 48;
  const assetWidth = node.assetWidth ?? 48;
  const iconSize = Math.max(assetHeight, assetWidth);
  const defaultWidth = flowchart?.wrappingWidth;
  node.width = Math.max(iconSize, defaultWidth ?? 0);
  const { shapeSvg, bbox, halfPadding, label } = await labelHelper(
    parent,
    node,
    "icon-shape default"
  );
  const topLabel = node.pos === "t";
  const height = iconSize + halfPadding * 2;
  const width = iconSize + halfPadding * 2;
  const { nodeBorder, mainBkg } = themeVariables;
  const { stylesMap } = compileStyles(node);
  const x = -width / 2;
  const y = -height / 2;
  const labelPadding = node.label ? 8 : 0;
  const rc = rough54.svg(shapeSvg);
  const options = userNodeOverrides(node, { stroke: stylesMap.get("fill") || mainBkg });
  if (node.look !== "handDrawn") {
    options.roughness = 0;
    options.fillStyle = "solid";
  }
  const iconNode = rc.path(createRoundedRectPathD(x, y, width, height, 5), options);
  const outerWidth = Math.max(width, bbox.width);
  const outerHeight = height + bbox.height + labelPadding;
  const outerNode = rc.rectangle(-outerWidth / 2, -outerHeight / 2, outerWidth, outerHeight, {
    ...options,
    fill: "transparent",
    stroke: "none"
  });
  const iconShape = shapeSvg.insert(() => iconNode, ":first-child");
  const outerShape = shapeSvg.insert(() => outerNode);
  if (node.icon) {
    const iconElem = shapeSvg.append("g");
    iconElem.html(
      `<g>${await getIconSVG(node.icon, {
        height: iconSize,
        width: iconSize,
        fallbackPrefix: ""
      })}</g>`
    );
    const iconBBox = iconElem.node().getBBox();
    const iconWidth = iconBBox.width;
    const iconHeight = iconBBox.height;
    const iconX = iconBBox.x;
    const iconY = iconBBox.y;
    iconElem.attr(
      "transform",
      `translate(${-iconWidth / 2 - iconX},${topLabel ? bbox.height / 2 + labelPadding / 2 - iconHeight / 2 - iconY : -bbox.height / 2 - labelPadding / 2 - iconHeight / 2 - iconY})`
    );
    iconElem.selectAll("path").attr("fill", stylesMap.get("stroke") ?? nodeBorder);
  }
  label.attr(
    "transform",
    `translate(${-bbox.width / 2 - (bbox.x - (bbox.left ?? 0))},${topLabel ? -outerHeight / 2 : outerHeight / 2 - bbox.height})`
  );
  iconShape.attr(
    "transform",
    `translate(${0},${topLabel ? bbox.height / 2 + labelPadding / 2 : -bbox.height / 2 - labelPadding / 2})`
  );
  updateNodeBounds(node, outerShape);
  node.intersect = function(point2) {
    log.info("iconSquare intersect", node, point2);
    if (!node.label) {
      return intersect_default.rect(node, point2);
    }
    const dx = node.x ?? 0;
    const dy = node.y ?? 0;
    const nodeHeight = node.height ?? 0;
    let points = [];
    if (topLabel) {
      points = [
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx + width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy + nodeHeight / 2 },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + bbox.height + labelPadding }
      ];
    } else {
      points = [
        { x: dx - width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 },
        { x: dx + width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx + bbox.width / 2 / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy + nodeHeight / 2 },
        { x: dx - bbox.width / 2, y: dy - nodeHeight / 2 + height },
        { x: dx - width / 2, y: dy - nodeHeight / 2 + height }
      ];
    }
    const pos = intersect_default.polygon(node, points, point2);
    return pos;
  };
  return shapeSvg;
}, "iconRounded");

// src/rendering-util/rendering-elements/nodes.js
var shapes2 = {
  // States
  state,
  stateStart,
  stateEnd,
  forkJoin,
  choice,
  note,
  // Rectangles
  rectWithTitle,
  roundedRect,
  squareRect: squareRect2,
  // Rectangle with alias: 'process', 'rect', 'proc', 'rectangle'
  rectangle: squareRect2,
  rect: squareRect2,
  process: squareRect2,
  proc: squareRect2,
  // Rounded Rectangle with alias: 'event', 'rounded'
  rounded: roundedRect,
  event: roundedRect,
  // Stadium with alias: 'terminal','pill', 'stadium'
  stadium,
  pill: stadium,
  terminal: stadium,
  // Subprocess with alias: 'fr-rect', 'subproc', 'subprocess', 'framed-rectangle', 'subroutine'
  subroutine,
  "framed-rectangle": subroutine,
  "fr-rect": subroutine,
  subprocess: subroutine,
  subproc: subroutine,
  // Cylinder with alias: 'db', 'database', 'cylinder', 'cyl'
  cylinder,
  db: cylinder,
  cyl: cylinder,
  database: cylinder,
  // Diamond with alias: 'diam', 'decision', 'diamond'
  question,
  diam: question,
  diamond: question,
  decision: question,
  // Hexagon with alias: 'hex', 'hexagon', 'prepare'
  hexagon,
  hex: hexagon,
  prepare: hexagon,
  // Lean Right with alias: 'lean-r', 'lean-right', 'in-out'
  lean_right,
  // used in old syntax for flowchart
  "lean-r": lean_right,
  "lean-right": lean_right,
  "in-out": lean_right,
  // Lean Left with alias: 'lean-l', 'lean-left', 'out-in'
  lean_left,
  // used in old syntax for flowchart
  "lean-l": lean_left,
  "lean-left": lean_left,
  "out-in": lean_left,
  // Trapezoid with alias: 'trap-b', 'trapezoid-bottom', 'priority'
  trapezoid,
  // used in old syntax for flowchart
  "trap-b": trapezoid,
  "trapezoid-bottom": trapezoid,
  priority: trapezoid,
  // Inverted Trapezoid with alias: 'inv-trapezoid', 'trapezoid-top', 'trap-t', 'manual'
  inv_trapezoid,
  // used in old syntax for flowchart
  "inv-trapezoid": inv_trapezoid,
  "trapezoid-top": inv_trapezoid,
  "trap-t": inv_trapezoid,
  manual: inv_trapezoid,
  // Double Circle with alias: 'dbl-circ', 'double-circle'
  doublecircle,
  // used in old syntax for flowchart
  "dbl-circ": doublecircle,
  "double-circle": doublecircle,
  // circle with alias: 'circ', 'circle'
  circle: circle2,
  circ: circle2,
  // Rect Left Inv Arrow with alias: 'odd', 'rect-left-inv-arrow'
  rect_left_inv_arrow,
  odd: rect_left_inv_arrow,
  // Notched Rectangle with alias: 'notched-rectangle', 'notch-rect', 'card'
  card,
  "notched-rectangle": card,
  "notch-rect": card,
  // Lined rectangle with alias: 'lin-rect', 'lined-rectangle', 'lin-proc', lined-process', 'shaded-process'
  "lined-rectangle": shadedProcess,
  "lin-rect": shadedProcess,
  "lin-proc": shadedProcess,
  "lined-process": shadedProcess,
  "shaded-process": shadedProcess,
  //  Small circle with alias: 'sm-circ', 'small-circle', 'start'
  "small-circle": stateStart,
  "sm-circ": stateStart,
  start: stateStart,
  // framed circle with alias: 'stop', 'framed-circle', 'fr-circ'
  stop: stateEnd,
  "framed-circle": stateEnd,
  "fr-circ": stateEnd,
  // fork with alias: 'join', 'fork'
  join: forkJoin,
  fork: forkJoin,
  // comment with alias: 'comment', 'brace-l'
  comment: curlyBraceLeft,
  "brace-l": curlyBraceLeft,
  // lightening bolt with alias: 'bolt', 'com-link', 'lightning-bolt'
  bolt: lightningBolt,
  "com-link": lightningBolt,
  "lightning-bolt": lightningBolt,
  // document with alias: 'doc', 'document'
  doc: waveEdgedRectangle,
  document: waveEdgedRectangle,
  // delay with alias: 'delay', 'half-rounded-rectangle'
  delay: halfRoundedRectangle,
  "half-rounded-rectangle": halfRoundedRectangle,
  // horizontal cylinder with alias: 'h-cyl', 'das', 'horizontal-cylinder'
  "horizontal-cylinder": tiltedCylinder,
  "h-cyl": tiltedCylinder,
  das: tiltedCylinder,
  // lined cylinder with alias: 'lin-cyl', 'lined-cylinder', 'disk'
  "lined-cylinder": linedCylinder,
  "lin-cyl": linedCylinder,
  disk: linedCylinder,
  // curved trapezoid with alias: 'curv-trap', 'curved-trapezoid', 'display'
  "curved-trapezoid": curvedTrapezoid,
  "curv-trap": curvedTrapezoid,
  display: curvedTrapezoid,
  // divided rectangle with alias: 'div-rect', 'divided-rectangle', 'div-proc', 'divided-process'
  "divided-rectangle": dividedRectangle,
  "div-rect": dividedRectangle,
  "div-proc": dividedRectangle,
  "divided-process": dividedRectangle,
  // triangle with alias: 'tri', 'triangle', 'extract'
  triangle,
  tri: triangle,
  extract: triangle,
  // window pane with alias: 'window-pane', 'win-pane', 'internal-storage'
  "window-pane": windowPane,
  "win-pane": windowPane,
  "internal-storage": windowPane,
  // filled circle with alias: 'f-circ', 'filled-circle', 'junction'
  "f-circ": filledCircle,
  junction: filledCircle,
  "filled-circle": filledCircle,
  // lined document with alias: 'lin-doc', 'lined-document'
  "lin-doc": linedWaveEdgedRect,
  "lined-document": linedWaveEdgedRect,
  // notched pentagon with alias: 'notch-pent', 'notched-pentagon', 'loop-limit'
  "notched-pentagon": trapezoidalPentagon,
  "notch-pent": trapezoidalPentagon,
  "loop-limit": trapezoidalPentagon,
  // flipped triangle with alias: 'flip-tri', 'flipped-triangle', 'manual-file'
  "flipped-triangle": flippedTriangle,
  "flip-tri": flippedTriangle,
  "manual-file": flippedTriangle,
  // sloped rectangle with alias: 'sl-rect', 'sloped-rectangle', 'manual-input'
  "sloped-rectangle": slopedRect,
  "sl-rect": slopedRect,
  "manual-input": slopedRect,
  // documents with alias: 'docs', 'documents', 'st-doc', 'stacked-document'
  docs: multiWaveEdgedRectangle,
  documents: multiWaveEdgedRectangle,
  "st-doc": multiWaveEdgedRectangle,
  "stacked-document": multiWaveEdgedRectangle,
  // 'processes' with alias: 'procs', 'processes', 'st-rect', 'stacked-rectangle'
  processes: multiRect,
  procs: multiRect,
  "stacked-rectangle": multiRect,
  "st-rect": multiRect,
  // flag with alias: 'flag', 'paper-tape'
  flag: waveRectangle,
  "paper-tape": waveRectangle,
  // bow tie rectangle with alias: 'bow-rect', 'bow-tie-rectangle', 'stored-data'
  "bow-tie-rectangle": bowTieRect,
  "bow-rect": bowTieRect,
  "stored-data": bowTieRect,
  // crossed circle with alias: 'cross-circ', 'crossed-circle', 'summary'
  "crossed-circle": crossedCircle,
  "cross-circ": crossedCircle,
  summary: crossedCircle,
  // tagged document with alias: 'tag-doc', 'tagged-document'
  "tag-doc": taggedWaveEdgedRectangle,
  "tagged-document": taggedWaveEdgedRectangle,
  // tagged rectangle with alias: 'tag-rect', 'tagged-rectangle', 'tag-proc', 'tagged-process'
  "tag-rect": taggedRect,
  "tagged-rectangle": taggedRect,
  "tag-proc": taggedRect,
  "tagged-process": taggedRect,
  // hourglass with alias: 'hourglass', 'collate'
  hourglass,
  collate: hourglass,
  text,
  anchor,
  brace: curlyBraceLeft,
  labelRect,
  "brace-r": curlyBraceRight,
  braces: curlyBraces,
  iconSquare,
  iconCircle,
  icon,
  iconRounded,
  imageSquare
};
var nodeElems = /* @__PURE__ */ new Map();
var insertNode = /* @__PURE__ */ __name(async (elem, node, renderOptions) => {
  let newEl;
  let el;
  if (node.shape === "rect") {
    if (node.rx && node.ry) {
      node.shape = "roundedRect";
    } else {
      node.shape = "squareRect";
    }
  }
  if (!shapes2[node.shape]) {
    throw new Error(`No such shape: ${node.shape}. Please check your syntax.`);
  }
  if (node.link) {
    let target;
    if (renderOptions.config.securityLevel === "sandbox") {
      target = "_top";
    } else if (node.linkTarget) {
      target = node.linkTarget || "_blank";
    }
    newEl = elem.insert("svg:a").attr("xlink:href", node.link).attr("target", target);
    el = await shapes2[node.shape](newEl, node, renderOptions);
  } else {
    el = await shapes2[node.shape](elem, node, renderOptions);
    newEl = el;
  }
  if (node.tooltip) {
    el.attr("title", node.tooltip);
  }
  nodeElems.set(node.id, newEl);
  if (node.haveCallback) {
    nodeElems.get(node.id).attr("class", nodeElems.get(node.id).attr("class") + " clickable");
  }
  return newEl;
}, "insertNode");
var setNodeElem = /* @__PURE__ */ __name((elem, node) => {
  nodeElems.set(node.id, elem);
}, "setNodeElem");
var clear3 = /* @__PURE__ */ __name(() => {
  nodeElems.clear();
}, "clear");
var positionNode = /* @__PURE__ */ __name((node) => {
  const el = nodeElems.get(node.id);
  log.trace(
    "Transforming node",
    node.diff,
    node,
    "translate(" + (node.x - node.width / 2 - 5) + ", " + node.width / 2 + ")"
  );
  const padding = 8;
  const diff = node.diff || 0;
  if (node.clusterNode) {
    el.attr(
      "transform",
      "translate(" + (node.x + diff - node.width / 2) + ", " + (node.y - node.height / 2 - padding) + ")"
    );
  } else {
    el.attr("transform", "translate(" + node.x + ", " + node.y + ")");
  }
  return diff;
}, "positionNode");

export {
  insertCluster,
  clear,
  clear2,
  insertEdgeLabel,
  positionEdgeLabel,
  insertEdge,
  markers_default,
  labelHelper,
  updateNodeBounds,
  insertNode,
  setNodeElem,
  clear3,
  positionNode
};
