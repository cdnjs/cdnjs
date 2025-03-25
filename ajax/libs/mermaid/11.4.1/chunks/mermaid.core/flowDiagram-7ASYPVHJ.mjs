import {
  getDiagramElement,
  setupViewPortForSVG
} from "./chunk-5HRBRIJM.mjs";
import {
  JSON_SCHEMA,
  load
} from "./chunk-S3SWNSAA.mjs";
import {
  getRegisteredLayoutAlgorithm,
  render
} from "./chunk-BO7VGL7K.mjs";
import "./chunk-66SQ7PYY.mjs";
import {
  isValidShape
} from "./chunk-7NZE2EM7.mjs";
import "./chunk-OPO4IU42.mjs";
import "./chunk-3JNJP5BE.mjs";
import "./chunk-3X56UNUX.mjs";
import "./chunk-6JOS74DS.mjs";
import {
  getEdgeId,
  utils_default
} from "./chunk-7DKRZKHE.mjs";
import {
  __name,
  clear,
  common_default,
  defaultConfig2 as defaultConfig,
  getAccDescription,
  getAccTitle,
  getConfig2 as getConfig,
  getDiagramTitle,
  log,
  setAccDescription,
  setAccTitle,
  setConfig2 as setConfig,
  setDiagramTitle
} from "./chunk-6DBFFHIP.mjs";

// src/diagrams/flowchart/flowDb.ts
import { select } from "d3";
var MERMAID_DOM_ID_PREFIX = "flowchart-";
var vertexCounter = 0;
var config = getConfig();
var vertices = /* @__PURE__ */ new Map();
var edges = [];
var classes = /* @__PURE__ */ new Map();
var subGraphs = [];
var subGraphLookup = /* @__PURE__ */ new Map();
var tooltips = /* @__PURE__ */ new Map();
var subCount = 0;
var firstGraphFlag = true;
var direction;
var version;
var funs = [];
var sanitizeText = /* @__PURE__ */ __name((txt) => common_default.sanitizeText(txt, config), "sanitizeText");
var lookUpDomId = /* @__PURE__ */ __name(function(id) {
  for (const vertex of vertices.values()) {
    if (vertex.id === id) {
      return vertex.domId;
    }
  }
  return id;
}, "lookUpDomId");
var addVertex = /* @__PURE__ */ __name(function(id, textObj, type, style, classes2, dir, props = {}, shapeData) {
  if (!id || id.trim().length === 0) {
    return;
  }
  let txt;
  let vertex = vertices.get(id);
  if (vertex === void 0) {
    vertex = {
      id,
      labelType: "text",
      domId: MERMAID_DOM_ID_PREFIX + id + "-" + vertexCounter,
      styles: [],
      classes: []
    };
    vertices.set(id, vertex);
  }
  vertexCounter++;
  if (textObj !== void 0) {
    config = getConfig();
    txt = sanitizeText(textObj.text.trim());
    vertex.labelType = textObj.type;
    if (txt.startsWith('"') && txt.endsWith('"')) {
      txt = txt.substring(1, txt.length - 1);
    }
    vertex.text = txt;
  } else {
    if (vertex.text === void 0) {
      vertex.text = id;
    }
  }
  if (type !== void 0) {
    vertex.type = type;
  }
  if (style !== void 0 && style !== null) {
    style.forEach(function(s) {
      vertex.styles.push(s);
    });
  }
  if (classes2 !== void 0 && classes2 !== null) {
    classes2.forEach(function(s) {
      vertex.classes.push(s);
    });
  }
  if (dir !== void 0) {
    vertex.dir = dir;
  }
  if (vertex.props === void 0) {
    vertex.props = props;
  } else if (props !== void 0) {
    Object.assign(vertex.props, props);
  }
  if (shapeData !== void 0) {
    let yamlData;
    if (!shapeData.includes("\n")) {
      yamlData = "{\n" + shapeData + "\n}";
    } else {
      yamlData = shapeData + "\n";
    }
    const doc = load(yamlData, { schema: JSON_SCHEMA });
    if (doc.shape) {
      if (doc.shape !== doc.shape.toLowerCase() || doc.shape.includes("_")) {
        throw new Error(`No such shape: ${doc.shape}. Shape names should be lowercase.`);
      } else if (!isValidShape(doc.shape)) {
        throw new Error(`No such shape: ${doc.shape}.`);
      }
      vertex.type = doc?.shape;
    }
    if (doc?.label) {
      vertex.text = doc?.label;
    }
    if (doc?.icon) {
      vertex.icon = doc?.icon;
      if (!doc.label?.trim() && vertex.text === id) {
        vertex.text = "";
      }
    }
    if (doc?.form) {
      vertex.form = doc?.form;
    }
    if (doc?.pos) {
      vertex.pos = doc?.pos;
    }
    if (doc?.img) {
      vertex.img = doc?.img;
      if (!doc.label?.trim() && vertex.text === id) {
        vertex.text = "";
      }
    }
    if (doc?.constraint) {
      vertex.constraint = doc.constraint;
    }
    if (doc.w) {
      vertex.assetWidth = Number(doc.w);
    }
    if (doc.h) {
      vertex.assetHeight = Number(doc.h);
    }
  }
}, "addVertex");
var addSingleLink = /* @__PURE__ */ __name(function(_start, _end, type) {
  const start = _start;
  const end = _end;
  const edge = { start, end, type: void 0, text: "", labelType: "text" };
  log.info("abc78 Got edge...", edge);
  const linkTextObj = type.text;
  if (linkTextObj !== void 0) {
    edge.text = sanitizeText(linkTextObj.text.trim());
    if (edge.text.startsWith('"') && edge.text.endsWith('"')) {
      edge.text = edge.text.substring(1, edge.text.length - 1);
    }
    edge.labelType = linkTextObj.type;
  }
  if (type !== void 0) {
    edge.type = type.type;
    edge.stroke = type.stroke;
    edge.length = type.length > 10 ? 10 : type.length;
  }
  if (edges.length < (config.maxEdges ?? 500)) {
    log.info("Pushing edge...");
    edges.push(edge);
  } else {
    throw new Error(
      `Edge limit exceeded. ${edges.length} edges found, but the limit is ${config.maxEdges}.

Initialize mermaid with maxEdges set to a higher number to allow more edges.
You cannot set this config via configuration inside the diagram as it is a secure config.
You have to call mermaid.initialize.`
    );
  }
}, "addSingleLink");
var addLink = /* @__PURE__ */ __name(function(_start, _end, type) {
  log.info("addLink", _start, _end, type);
  for (const start of _start) {
    for (const end of _end) {
      addSingleLink(start, end, type);
    }
  }
}, "addLink");
var updateLinkInterpolate = /* @__PURE__ */ __name(function(positions, interpolate) {
  positions.forEach(function(pos) {
    if (pos === "default") {
      edges.defaultInterpolate = interpolate;
    } else {
      edges[pos].interpolate = interpolate;
    }
  });
}, "updateLinkInterpolate");
var updateLink = /* @__PURE__ */ __name(function(positions, style) {
  positions.forEach(function(pos) {
    if (typeof pos === "number" && pos >= edges.length) {
      throw new Error(
        `The index ${pos} for linkStyle is out of bounds. Valid indices for linkStyle are between 0 and ${edges.length - 1}. (Help: Ensure that the index is within the range of existing edges.)`
      );
    }
    if (pos === "default") {
      edges.defaultStyle = style;
    } else {
      edges[pos].style = style;
      if ((edges[pos]?.style?.length ?? 0) > 0 && !edges[pos]?.style?.some((s) => s?.startsWith("fill"))) {
        edges[pos]?.style?.push("fill:none");
      }
    }
  });
}, "updateLink");
var addClass = /* @__PURE__ */ __name(function(ids, style) {
  ids.split(",").forEach(function(id) {
    let classNode = classes.get(id);
    if (classNode === void 0) {
      classNode = { id, styles: [], textStyles: [] };
      classes.set(id, classNode);
    }
    if (style !== void 0 && style !== null) {
      style.forEach(function(s) {
        if (/color/.exec(s)) {
          const newStyle = s.replace("fill", "bgFill");
          classNode.textStyles.push(newStyle);
        }
        classNode.styles.push(s);
      });
    }
  });
}, "addClass");
var setDirection = /* @__PURE__ */ __name(function(dir) {
  direction = dir;
  if (/.*</.exec(direction)) {
    direction = "RL";
  }
  if (/.*\^/.exec(direction)) {
    direction = "BT";
  }
  if (/.*>/.exec(direction)) {
    direction = "LR";
  }
  if (/.*v/.exec(direction)) {
    direction = "TB";
  }
  if (direction === "TD") {
    direction = "TB";
  }
}, "setDirection");
var setClass = /* @__PURE__ */ __name(function(ids, className) {
  for (const id of ids.split(",")) {
    const vertex = vertices.get(id);
    if (vertex) {
      vertex.classes.push(className);
    }
    const subGraph = subGraphLookup.get(id);
    if (subGraph) {
      subGraph.classes.push(className);
    }
  }
}, "setClass");
var setTooltip = /* @__PURE__ */ __name(function(ids, tooltip) {
  if (tooltip === void 0) {
    return;
  }
  tooltip = sanitizeText(tooltip);
  for (const id of ids.split(",")) {
    tooltips.set(version === "gen-1" ? lookUpDomId(id) : id, tooltip);
  }
}, "setTooltip");
var setClickFun = /* @__PURE__ */ __name(function(id, functionName, functionArgs) {
  const domId = lookUpDomId(id);
  if (getConfig().securityLevel !== "loose") {
    return;
  }
  if (functionName === void 0) {
    return;
  }
  let argList = [];
  if (typeof functionArgs === "string") {
    argList = functionArgs.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
    for (let i = 0; i < argList.length; i++) {
      let item = argList[i].trim();
      if (item.startsWith('"') && item.endsWith('"')) {
        item = item.substr(1, item.length - 2);
      }
      argList[i] = item;
    }
  }
  if (argList.length === 0) {
    argList.push(id);
  }
  const vertex = vertices.get(id);
  if (vertex) {
    vertex.haveCallback = true;
    funs.push(function() {
      const elem = document.querySelector(`[id="${domId}"]`);
      if (elem !== null) {
        elem.addEventListener(
          "click",
          function() {
            utils_default.runFunc(functionName, ...argList);
          },
          false
        );
      }
    });
  }
}, "setClickFun");
var setLink = /* @__PURE__ */ __name(function(ids, linkStr, target) {
  ids.split(",").forEach(function(id) {
    const vertex = vertices.get(id);
    if (vertex !== void 0) {
      vertex.link = utils_default.formatUrl(linkStr, config);
      vertex.linkTarget = target;
    }
  });
  setClass(ids, "clickable");
}, "setLink");
var getTooltip = /* @__PURE__ */ __name(function(id) {
  return tooltips.get(id);
}, "getTooltip");
var setClickEvent = /* @__PURE__ */ __name(function(ids, functionName, functionArgs) {
  ids.split(",").forEach(function(id) {
    setClickFun(id, functionName, functionArgs);
  });
  setClass(ids, "clickable");
}, "setClickEvent");
var bindFunctions = /* @__PURE__ */ __name(function(element) {
  funs.forEach(function(fun) {
    fun(element);
  });
}, "bindFunctions");
var getDirection = /* @__PURE__ */ __name(function() {
  return direction.trim();
}, "getDirection");
var getVertices = /* @__PURE__ */ __name(function() {
  return vertices;
}, "getVertices");
var getEdges = /* @__PURE__ */ __name(function() {
  return edges;
}, "getEdges");
var getClasses = /* @__PURE__ */ __name(function() {
  return classes;
}, "getClasses");
var setupToolTips = /* @__PURE__ */ __name(function(element) {
  let tooltipElem = select(".mermaidTooltip");
  if ((tooltipElem._groups || tooltipElem)[0][0] === null) {
    tooltipElem = select("body").append("div").attr("class", "mermaidTooltip").style("opacity", 0);
  }
  const svg = select(element).select("svg");
  const nodes = svg.selectAll("g.node");
  nodes.on("mouseover", function() {
    const el = select(this);
    const title = el.attr("title");
    if (title === null) {
      return;
    }
    const rect = this?.getBoundingClientRect();
    tooltipElem.transition().duration(200).style("opacity", ".9");
    tooltipElem.text(el.attr("title")).style("left", window.scrollX + rect.left + (rect.right - rect.left) / 2 + "px").style("top", window.scrollY + rect.bottom + "px");
    tooltipElem.html(tooltipElem.html().replace(/&lt;br\/&gt;/g, "<br/>"));
    el.classed("hover", true);
  }).on("mouseout", function() {
    tooltipElem.transition().duration(500).style("opacity", 0);
    const el = select(this);
    el.classed("hover", false);
  });
}, "setupToolTips");
funs.push(setupToolTips);
var clear2 = /* @__PURE__ */ __name(function(ver = "gen-1") {
  vertices = /* @__PURE__ */ new Map();
  classes = /* @__PURE__ */ new Map();
  edges = [];
  funs = [setupToolTips];
  subGraphs = [];
  subGraphLookup = /* @__PURE__ */ new Map();
  subCount = 0;
  tooltips = /* @__PURE__ */ new Map();
  firstGraphFlag = true;
  version = ver;
  config = getConfig();
  clear();
}, "clear");
var setGen = /* @__PURE__ */ __name((ver) => {
  version = ver || "gen-2";
}, "setGen");
var defaultStyle = /* @__PURE__ */ __name(function() {
  return "fill:#ffa;stroke: #f66; stroke-width: 3px; stroke-dasharray: 5, 5;fill:#ffa;stroke: #666;";
}, "defaultStyle");
var addSubGraph = /* @__PURE__ */ __name(function(_id, list, _title) {
  let id = _id.text.trim();
  let title = _title.text;
  if (_id === _title && /\s/.exec(_title.text)) {
    id = void 0;
  }
  function uniq(a) {
    const prims = { boolean: {}, number: {}, string: {} };
    const objs = [];
    let dir2;
    const nodeList2 = a.filter(function(item) {
      const type = typeof item;
      if (item.stmt && item.stmt === "dir") {
        dir2 = item.value;
        return false;
      }
      if (item.trim() === "") {
        return false;
      }
      if (type in prims) {
        return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;
      } else {
        return objs.includes(item) ? false : objs.push(item);
      }
    });
    return { nodeList: nodeList2, dir: dir2 };
  }
  __name(uniq, "uniq");
  const { nodeList, dir } = uniq(list.flat());
  if (version === "gen-1") {
    for (let i = 0; i < nodeList.length; i++) {
      nodeList[i] = lookUpDomId(nodeList[i]);
    }
  }
  id = id ?? "subGraph" + subCount;
  title = title || "";
  title = sanitizeText(title);
  subCount = subCount + 1;
  const subGraph = {
    id,
    nodes: nodeList,
    title: title.trim(),
    classes: [],
    dir,
    labelType: _title.type
  };
  log.info("Adding", subGraph.id, subGraph.nodes, subGraph.dir);
  subGraph.nodes = makeUniq(subGraph, subGraphs).nodes;
  subGraphs.push(subGraph);
  subGraphLookup.set(id, subGraph);
  return id;
}, "addSubGraph");
var getPosForId = /* @__PURE__ */ __name(function(id) {
  for (const [i, subGraph] of subGraphs.entries()) {
    if (subGraph.id === id) {
      return i;
    }
  }
  return -1;
}, "getPosForId");
var secCount = -1;
var posCrossRef = [];
var indexNodes2 = /* @__PURE__ */ __name(function(id, pos) {
  const nodes = subGraphs[pos].nodes;
  secCount = secCount + 1;
  if (secCount > 2e3) {
    return {
      result: false,
      count: 0
    };
  }
  posCrossRef[secCount] = pos;
  if (subGraphs[pos].id === id) {
    return {
      result: true,
      count: 0
    };
  }
  let count = 0;
  let posCount = 1;
  while (count < nodes.length) {
    const childPos = getPosForId(nodes[count]);
    if (childPos >= 0) {
      const res = indexNodes2(id, childPos);
      if (res.result) {
        return {
          result: true,
          count: posCount + res.count
        };
      } else {
        posCount = posCount + res.count;
      }
    }
    count = count + 1;
  }
  return {
    result: false,
    count: posCount
  };
}, "indexNodes2");
var getDepthFirstPos = /* @__PURE__ */ __name(function(pos) {
  return posCrossRef[pos];
}, "getDepthFirstPos");
var indexNodes = /* @__PURE__ */ __name(function() {
  secCount = -1;
  if (subGraphs.length > 0) {
    indexNodes2("none", subGraphs.length - 1);
  }
}, "indexNodes");
var getSubGraphs = /* @__PURE__ */ __name(function() {
  return subGraphs;
}, "getSubGraphs");
var firstGraph = /* @__PURE__ */ __name(() => {
  if (firstGraphFlag) {
    firstGraphFlag = false;
    return true;
  }
  return false;
}, "firstGraph");
var destructStartLink = /* @__PURE__ */ __name((_str) => {
  let str = _str.trim();
  let type = "arrow_open";
  switch (str[0]) {
    case "<":
      type = "arrow_point";
      str = str.slice(1);
      break;
    case "x":
      type = "arrow_cross";
      str = str.slice(1);
      break;
    case "o":
      type = "arrow_circle";
      str = str.slice(1);
      break;
  }
  let stroke = "normal";
  if (str.includes("=")) {
    stroke = "thick";
  }
  if (str.includes(".")) {
    stroke = "dotted";
  }
  return { type, stroke };
}, "destructStartLink");
var countChar = /* @__PURE__ */ __name((char, str) => {
  const length = str.length;
  let count = 0;
  for (let i = 0; i < length; ++i) {
    if (str[i] === char) {
      ++count;
    }
  }
  return count;
}, "countChar");
var destructEndLink = /* @__PURE__ */ __name((_str) => {
  const str = _str.trim();
  let line = str.slice(0, -1);
  let type = "arrow_open";
  switch (str.slice(-1)) {
    case "x":
      type = "arrow_cross";
      if (str.startsWith("x")) {
        type = "double_" + type;
        line = line.slice(1);
      }
      break;
    case ">":
      type = "arrow_point";
      if (str.startsWith("<")) {
        type = "double_" + type;
        line = line.slice(1);
      }
      break;
    case "o":
      type = "arrow_circle";
      if (str.startsWith("o")) {
        type = "double_" + type;
        line = line.slice(1);
      }
      break;
  }
  let stroke = "normal";
  let length = line.length - 1;
  if (line.startsWith("=")) {
    stroke = "thick";
  }
  if (line.startsWith("~")) {
    stroke = "invisible";
  }
  const dots = countChar(".", line);
  if (dots) {
    stroke = "dotted";
    length = dots;
  }
  return { type, stroke, length };
}, "destructEndLink");
var destructLink = /* @__PURE__ */ __name((_str, _startStr) => {
  const info = destructEndLink(_str);
  let startInfo;
  if (_startStr) {
    startInfo = destructStartLink(_startStr);
    if (startInfo.stroke !== info.stroke) {
      return { type: "INVALID", stroke: "INVALID" };
    }
    if (startInfo.type === "arrow_open") {
      startInfo.type = info.type;
    } else {
      if (startInfo.type !== info.type) {
        return { type: "INVALID", stroke: "INVALID" };
      }
      startInfo.type = "double_" + startInfo.type;
    }
    if (startInfo.type === "double_arrow") {
      startInfo.type = "double_arrow_point";
    }
    startInfo.length = info.length;
    return startInfo;
  }
  return info;
}, "destructLink");
var exists = /* @__PURE__ */ __name((allSgs, _id) => {
  for (const sg of allSgs) {
    if (sg.nodes.includes(_id)) {
      return true;
    }
  }
  return false;
}, "exists");
var makeUniq = /* @__PURE__ */ __name((sg, allSubgraphs) => {
  const res = [];
  sg.nodes.forEach((_id, pos) => {
    if (!exists(allSubgraphs, _id)) {
      res.push(sg.nodes[pos]);
    }
  });
  return { nodes: res };
}, "makeUniq");
var lex = {
  firstGraph
};
var getTypeFromVertex = /* @__PURE__ */ __name((vertex) => {
  if (vertex.img) {
    return "imageSquare";
  }
  if (vertex.icon) {
    if (vertex.form === "circle") {
      return "iconCircle";
    }
    if (vertex.form === "square") {
      return "iconSquare";
    }
    if (vertex.form === "rounded") {
      return "iconRounded";
    }
    return "icon";
  }
  switch (vertex.type) {
    case "square":
    case void 0:
      return "squareRect";
    case "round":
      return "roundedRect";
    case "ellipse":
      return "ellipse";
    default:
      return vertex.type;
  }
}, "getTypeFromVertex");
var findNode = /* @__PURE__ */ __name((nodes, id) => nodes.find((node) => node.id === id), "findNode");
var destructEdgeType = /* @__PURE__ */ __name((type) => {
  let arrowTypeStart = "none";
  let arrowTypeEnd = "arrow_point";
  switch (type) {
    case "arrow_point":
    case "arrow_circle":
    case "arrow_cross":
      arrowTypeEnd = type;
      break;
    case "double_arrow_point":
    case "double_arrow_circle":
    case "double_arrow_cross":
      arrowTypeStart = type.replace("double_", "");
      arrowTypeEnd = arrowTypeStart;
      break;
  }
  return { arrowTypeStart, arrowTypeEnd };
}, "destructEdgeType");
var addNodeFromVertex = /* @__PURE__ */ __name((vertex, nodes, parentDB, subGraphDB, config2, look) => {
  const parentId = parentDB.get(vertex.id);
  const isGroup = subGraphDB.get(vertex.id) ?? false;
  const node = findNode(nodes, vertex.id);
  if (node) {
    node.cssStyles = vertex.styles;
    node.cssCompiledStyles = getCompiledStyles(vertex.classes);
    node.cssClasses = vertex.classes.join(" ");
  } else {
    const baseNode = {
      id: vertex.id,
      label: vertex.text,
      labelStyle: "",
      parentId,
      padding: config2.flowchart?.padding || 8,
      cssStyles: vertex.styles,
      cssCompiledStyles: getCompiledStyles(["default", "node", ...vertex.classes]),
      cssClasses: "default " + vertex.classes.join(" "),
      dir: vertex.dir,
      domId: vertex.domId,
      look,
      link: vertex.link,
      linkTarget: vertex.linkTarget,
      tooltip: getTooltip(vertex.id),
      icon: vertex.icon,
      pos: vertex.pos,
      img: vertex.img,
      assetWidth: vertex.assetWidth,
      assetHeight: vertex.assetHeight,
      constraint: vertex.constraint
    };
    if (isGroup) {
      nodes.push({
        ...baseNode,
        isGroup: true,
        shape: "rect"
      });
    } else {
      nodes.push({
        ...baseNode,
        isGroup: false,
        shape: getTypeFromVertex(vertex)
      });
    }
  }
}, "addNodeFromVertex");
function getCompiledStyles(classDefs) {
  let compiledStyles = [];
  for (const customClass of classDefs) {
    const cssClass = classes.get(customClass);
    if (cssClass?.styles) {
      compiledStyles = [...compiledStyles, ...cssClass.styles ?? []].map((s) => s.trim());
    }
    if (cssClass?.textStyles) {
      compiledStyles = [...compiledStyles, ...cssClass.textStyles ?? []].map((s) => s.trim());
    }
  }
  return compiledStyles;
}
__name(getCompiledStyles, "getCompiledStyles");
var getData = /* @__PURE__ */ __name(() => {
  const config2 = getConfig();
  const nodes = [];
  const edges2 = [];
  const subGraphs2 = getSubGraphs();
  const parentDB = /* @__PURE__ */ new Map();
  const subGraphDB = /* @__PURE__ */ new Map();
  for (let i = subGraphs2.length - 1; i >= 0; i--) {
    const subGraph = subGraphs2[i];
    if (subGraph.nodes.length > 0) {
      subGraphDB.set(subGraph.id, true);
    }
    for (const id of subGraph.nodes) {
      parentDB.set(id, subGraph.id);
    }
  }
  for (let i = subGraphs2.length - 1; i >= 0; i--) {
    const subGraph = subGraphs2[i];
    nodes.push({
      id: subGraph.id,
      label: subGraph.title,
      labelStyle: "",
      parentId: parentDB.get(subGraph.id),
      padding: 8,
      cssCompiledStyles: getCompiledStyles(subGraph.classes),
      cssClasses: subGraph.classes.join(" "),
      shape: "rect",
      dir: subGraph.dir,
      isGroup: true,
      look: config2.look
    });
  }
  const n = getVertices();
  n.forEach((vertex) => {
    addNodeFromVertex(vertex, nodes, parentDB, subGraphDB, config2, config2.look || "classic");
  });
  const e = getEdges();
  e.forEach((rawEdge, index) => {
    const { arrowTypeStart, arrowTypeEnd } = destructEdgeType(rawEdge.type);
    const styles = [...e.defaultStyle ?? []];
    if (rawEdge.style) {
      styles.push(...rawEdge.style);
    }
    const edge = {
      id: getEdgeId(rawEdge.start, rawEdge.end, { counter: index, prefix: "L" }),
      start: rawEdge.start,
      end: rawEdge.end,
      type: rawEdge.type ?? "normal",
      label: rawEdge.text,
      labelpos: "c",
      thickness: rawEdge.stroke,
      minlen: rawEdge.length,
      classes: rawEdge?.stroke === "invisible" ? "" : "edge-thickness-normal edge-pattern-solid flowchart-link",
      arrowTypeStart: rawEdge?.stroke === "invisible" ? "none" : arrowTypeStart,
      arrowTypeEnd: rawEdge?.stroke === "invisible" ? "none" : arrowTypeEnd,
      arrowheadStyle: "fill: #333",
      labelStyle: styles,
      style: styles,
      pattern: rawEdge.stroke,
      look: config2.look
    };
    edges2.push(edge);
  });
  return { nodes, edges: edges2, other: {}, config: config2 };
}, "getData");
var flowDb_default = {
  defaultConfig: /* @__PURE__ */ __name(() => defaultConfig.flowchart, "defaultConfig"),
  setAccTitle,
  getAccTitle,
  getAccDescription,
  getData,
  setAccDescription,
  addVertex,
  lookUpDomId,
  addLink,
  updateLinkInterpolate,
  updateLink,
  addClass,
  setDirection,
  setClass,
  setTooltip,
  getTooltip,
  setClickEvent,
  setLink,
  bindFunctions,
  getDirection,
  getVertices,
  getEdges,
  getClasses,
  clear: clear2,
  setGen,
  defaultStyle,
  addSubGraph,
  getDepthFirstPos,
  indexNodes,
  getSubGraphs,
  destructLink,
  lex,
  exists,
  makeUniq,
  setDiagramTitle,
  getDiagramTitle
};

// src/diagrams/flowchart/flowRenderer-v3-unified.ts
import { select as select2 } from "d3";
var getClasses2 = /* @__PURE__ */ __name(function(text, diagramObj) {
  return diagramObj.db.getClasses();
}, "getClasses");
var draw = /* @__PURE__ */ __name(async function(text, id, _version, diag) {
  log.info("REF0:");
  log.info("Drawing state diagram (v2)", id);
  const { securityLevel, flowchart: conf, layout } = getConfig();
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select2("#i" + id);
  }
  const doc = securityLevel === "sandbox" ? sandboxElement.nodes()[0].contentDocument : document;
  log.debug("Before getData: ");
  const data4Layout = diag.db.getData();
  log.debug("Data: ", data4Layout);
  const svg = getDiagramElement(id, securityLevel);
  const direction2 = getDirection();
  data4Layout.type = diag.type;
  data4Layout.layoutAlgorithm = getRegisteredLayoutAlgorithm(layout);
  if (data4Layout.layoutAlgorithm === "dagre" && layout === "elk") {
    log.warn(
      "flowchart-elk was moved to an external package in Mermaid v11. Please refer [release notes](https://github.com/mermaid-js/mermaid/releases/tag/v11.0.0) for more details. This diagram will be rendered using `dagre` layout as a fallback."
    );
  }
  data4Layout.direction = direction2;
  data4Layout.nodeSpacing = conf?.nodeSpacing || 50;
  data4Layout.rankSpacing = conf?.rankSpacing || 50;
  data4Layout.markers = ["point", "circle", "cross"];
  data4Layout.diagramId = id;
  log.debug("REF1:", data4Layout);
  await render(data4Layout, svg);
  const padding = data4Layout.config.flowchart?.diagramPadding ?? 8;
  utils_default.insertTitle(
    svg,
    "flowchartTitleText",
    conf?.titleTopMargin || 0,
    diag.db.getDiagramTitle()
  );
  setupViewPortForSVG(svg, padding, "flowchart", conf?.useMaxWidth || false);
  for (const vertex of data4Layout.nodes) {
    const node = select2(`#${id} [id="${vertex.id}"]`);
    if (!node || !vertex.link) {
      continue;
    }
    const link = doc.createElementNS("http://www.w3.org/2000/svg", "a");
    link.setAttributeNS("http://www.w3.org/2000/svg", "class", vertex.cssClasses);
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
}, "draw");
var flowRenderer_v3_unified_default = {
  getClasses: getClasses2,
  draw
};

// src/diagrams/flowchart/parser/flow.jison
var parser = function() {
  var o = /* @__PURE__ */ __name(function(k, v, o2, l) {
    for (o2 = o2 || {}, l = k.length; l--; o2[k[l]] = v) ;
    return o2;
  }, "o"), $V0 = [1, 4], $V1 = [1, 3], $V2 = [1, 5], $V3 = [1, 8, 9, 10, 11, 27, 34, 36, 38, 44, 60, 83, 84, 85, 86, 87, 88, 101, 104, 105, 108, 110, 113, 114, 115, 120, 121, 122, 123], $V4 = [2, 2], $V5 = [1, 13], $V6 = [1, 14], $V7 = [1, 15], $V8 = [1, 16], $V9 = [1, 23], $Va = [1, 25], $Vb = [1, 26], $Vc = [1, 27], $Vd = [1, 49], $Ve = [1, 48], $Vf = [1, 29], $Vg = [1, 30], $Vh = [1, 31], $Vi = [1, 32], $Vj = [1, 33], $Vk = [1, 44], $Vl = [1, 46], $Vm = [1, 42], $Vn = [1, 47], $Vo = [1, 43], $Vp = [1, 50], $Vq = [1, 45], $Vr = [1, 51], $Vs = [1, 52], $Vt = [1, 34], $Vu = [1, 35], $Vv = [1, 36], $Vw = [1, 37], $Vx = [1, 57], $Vy = [1, 8, 9, 10, 11, 27, 32, 34, 36, 38, 44, 60, 83, 84, 85, 86, 87, 88, 101, 104, 105, 108, 110, 113, 114, 115, 120, 121, 122, 123], $Vz = [1, 61], $VA = [1, 60], $VB = [1, 62], $VC = [8, 9, 11, 75, 77], $VD = [1, 77], $VE = [1, 90], $VF = [1, 95], $VG = [1, 94], $VH = [1, 91], $VI = [1, 87], $VJ = [1, 93], $VK = [1, 89], $VL = [1, 96], $VM = [1, 92], $VN = [1, 97], $VO = [1, 88], $VP = [8, 9, 10, 11, 40, 75, 77], $VQ = [8, 9, 10, 11, 40, 46, 75, 77], $VR = [8, 9, 10, 11, 29, 40, 44, 46, 48, 50, 52, 54, 56, 58, 60, 63, 65, 67, 68, 70, 75, 77, 88, 101, 104, 105, 108, 110, 113, 114, 115], $VS = [8, 9, 11, 44, 60, 75, 77, 88, 101, 104, 105, 108, 110, 113, 114, 115], $VT = [44, 60, 88, 101, 104, 105, 108, 110, 113, 114, 115], $VU = [1, 123], $VV = [1, 122], $VW = [1, 130], $VX = [1, 144], $VY = [1, 145], $VZ = [1, 146], $V_ = [1, 147], $V$ = [1, 132], $V01 = [1, 134], $V11 = [1, 138], $V21 = [1, 139], $V31 = [1, 140], $V41 = [1, 141], $V51 = [1, 142], $V61 = [1, 143], $V71 = [1, 148], $V81 = [1, 149], $V91 = [1, 128], $Va1 = [1, 129], $Vb1 = [1, 136], $Vc1 = [1, 131], $Vd1 = [1, 135], $Ve1 = [1, 133], $Vf1 = [8, 9, 10, 11, 27, 32, 34, 36, 38, 44, 60, 83, 84, 85, 86, 87, 88, 101, 104, 105, 108, 110, 113, 114, 115, 120, 121, 122, 123], $Vg1 = [1, 151], $Vh1 = [1, 153], $Vi1 = [8, 9, 11], $Vj1 = [8, 9, 10, 11, 14, 44, 60, 88, 104, 105, 108, 110, 113, 114, 115], $Vk1 = [1, 173], $Vl1 = [1, 169], $Vm1 = [1, 170], $Vn1 = [1, 174], $Vo1 = [1, 171], $Vp1 = [1, 172], $Vq1 = [77, 115, 118], $Vr1 = [8, 9, 10, 11, 12, 14, 27, 29, 32, 44, 60, 75, 83, 84, 85, 86, 87, 88, 89, 104, 108, 110, 113, 114, 115], $Vs1 = [10, 105], $Vt1 = [31, 49, 51, 53, 55, 57, 62, 64, 66, 67, 69, 71, 115, 116, 117], $Vu1 = [1, 242], $Vv1 = [1, 240], $Vw1 = [1, 244], $Vx1 = [1, 238], $Vy1 = [1, 239], $Vz1 = [1, 241], $VA1 = [1, 243], $VB1 = [1, 245], $VC1 = [1, 263], $VD1 = [8, 9, 11, 105], $VE1 = [8, 9, 10, 11, 60, 83, 104, 105, 108, 109, 110, 111];
  var parser2 = {
    trace: /* @__PURE__ */ __name(function trace() {
    }, "trace"),
    yy: {},
    symbols_: { "error": 2, "start": 3, "graphConfig": 4, "document": 5, "line": 6, "statement": 7, "SEMI": 8, "NEWLINE": 9, "SPACE": 10, "EOF": 11, "GRAPH": 12, "NODIR": 13, "DIR": 14, "FirstStmtSeparator": 15, "ending": 16, "endToken": 17, "spaceList": 18, "spaceListNewline": 19, "vertexStatement": 20, "separator": 21, "styleStatement": 22, "linkStyleStatement": 23, "classDefStatement": 24, "classStatement": 25, "clickStatement": 26, "subgraph": 27, "textNoTags": 28, "SQS": 29, "text": 30, "SQE": 31, "end": 32, "direction": 33, "acc_title": 34, "acc_title_value": 35, "acc_descr": 36, "acc_descr_value": 37, "acc_descr_multiline_value": 38, "shapeData": 39, "SHAPE_DATA": 40, "link": 41, "node": 42, "styledVertex": 43, "AMP": 44, "vertex": 45, "STYLE_SEPARATOR": 46, "idString": 47, "DOUBLECIRCLESTART": 48, "DOUBLECIRCLEEND": 49, "PS": 50, "PE": 51, "(-": 52, "-)": 53, "STADIUMSTART": 54, "STADIUMEND": 55, "SUBROUTINESTART": 56, "SUBROUTINEEND": 57, "VERTEX_WITH_PROPS_START": 58, "NODE_STRING[field]": 59, "COLON": 60, "NODE_STRING[value]": 61, "PIPE": 62, "CYLINDERSTART": 63, "CYLINDEREND": 64, "DIAMOND_START": 65, "DIAMOND_STOP": 66, "TAGEND": 67, "TRAPSTART": 68, "TRAPEND": 69, "INVTRAPSTART": 70, "INVTRAPEND": 71, "linkStatement": 72, "arrowText": 73, "TESTSTR": 74, "START_LINK": 75, "edgeText": 76, "LINK": 77, "edgeTextToken": 78, "STR": 79, "MD_STR": 80, "textToken": 81, "keywords": 82, "STYLE": 83, "LINKSTYLE": 84, "CLASSDEF": 85, "CLASS": 86, "CLICK": 87, "DOWN": 88, "UP": 89, "textNoTagsToken": 90, "stylesOpt": 91, "idString[vertex]": 92, "idString[class]": 93, "CALLBACKNAME": 94, "CALLBACKARGS": 95, "HREF": 96, "LINK_TARGET": 97, "STR[link]": 98, "STR[tooltip]": 99, "alphaNum": 100, "DEFAULT": 101, "numList": 102, "INTERPOLATE": 103, "NUM": 104, "COMMA": 105, "style": 106, "styleComponent": 107, "NODE_STRING": 108, "UNIT": 109, "BRKT": 110, "PCT": 111, "idStringToken": 112, "MINUS": 113, "MULT": 114, "UNICODE_TEXT": 115, "TEXT": 116, "TAGSTART": 117, "EDGE_TEXT": 118, "alphaNumToken": 119, "direction_tb": 120, "direction_bt": 121, "direction_rl": 122, "direction_lr": 123, "$accept": 0, "$end": 1 },
    terminals_: { 2: "error", 8: "SEMI", 9: "NEWLINE", 10: "SPACE", 11: "EOF", 12: "GRAPH", 13: "NODIR", 14: "DIR", 27: "subgraph", 29: "SQS", 31: "SQE", 32: "end", 34: "acc_title", 35: "acc_title_value", 36: "acc_descr", 37: "acc_descr_value", 38: "acc_descr_multiline_value", 40: "SHAPE_DATA", 44: "AMP", 46: "STYLE_SEPARATOR", 48: "DOUBLECIRCLESTART", 49: "DOUBLECIRCLEEND", 50: "PS", 51: "PE", 52: "(-", 53: "-)", 54: "STADIUMSTART", 55: "STADIUMEND", 56: "SUBROUTINESTART", 57: "SUBROUTINEEND", 58: "VERTEX_WITH_PROPS_START", 59: "NODE_STRING[field]", 60: "COLON", 61: "NODE_STRING[value]", 62: "PIPE", 63: "CYLINDERSTART", 64: "CYLINDEREND", 65: "DIAMOND_START", 66: "DIAMOND_STOP", 67: "TAGEND", 68: "TRAPSTART", 69: "TRAPEND", 70: "INVTRAPSTART", 71: "INVTRAPEND", 74: "TESTSTR", 75: "START_LINK", 77: "LINK", 79: "STR", 80: "MD_STR", 83: "STYLE", 84: "LINKSTYLE", 85: "CLASSDEF", 86: "CLASS", 87: "CLICK", 88: "DOWN", 89: "UP", 92: "idString[vertex]", 93: "idString[class]", 94: "CALLBACKNAME", 95: "CALLBACKARGS", 96: "HREF", 97: "LINK_TARGET", 98: "STR[link]", 99: "STR[tooltip]", 101: "DEFAULT", 103: "INTERPOLATE", 104: "NUM", 105: "COMMA", 108: "NODE_STRING", 109: "UNIT", 110: "BRKT", 111: "PCT", 113: "MINUS", 114: "MULT", 115: "UNICODE_TEXT", 116: "TEXT", 117: "TAGSTART", 118: "EDGE_TEXT", 120: "direction_tb", 121: "direction_bt", 122: "direction_rl", 123: "direction_lr" },
    productions_: [0, [3, 2], [5, 0], [5, 2], [6, 1], [6, 1], [6, 1], [6, 1], [6, 1], [4, 2], [4, 2], [4, 2], [4, 3], [16, 2], [16, 1], [17, 1], [17, 1], [17, 1], [15, 1], [15, 1], [15, 2], [19, 2], [19, 2], [19, 1], [19, 1], [18, 2], [18, 1], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 2], [7, 9], [7, 6], [7, 4], [7, 1], [7, 2], [7, 2], [7, 1], [21, 1], [21, 1], [21, 1], [39, 2], [39, 1], [20, 4], [20, 3], [20, 4], [20, 2], [20, 2], [20, 1], [42, 1], [42, 6], [42, 5], [43, 1], [43, 3], [45, 4], [45, 4], [45, 6], [45, 4], [45, 4], [45, 4], [45, 8], [45, 4], [45, 4], [45, 4], [45, 6], [45, 4], [45, 4], [45, 4], [45, 4], [45, 4], [45, 1], [41, 2], [41, 3], [41, 3], [41, 1], [41, 3], [76, 1], [76, 2], [76, 1], [76, 1], [72, 1], [73, 3], [30, 1], [30, 2], [30, 1], [30, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [82, 1], [28, 1], [28, 2], [28, 1], [28, 1], [24, 5], [25, 5], [26, 2], [26, 4], [26, 3], [26, 5], [26, 3], [26, 5], [26, 5], [26, 7], [26, 2], [26, 4], [26, 2], [26, 4], [26, 4], [26, 6], [22, 5], [23, 5], [23, 5], [23, 9], [23, 9], [23, 7], [23, 7], [102, 1], [102, 3], [91, 1], [91, 3], [106, 1], [106, 2], [107, 1], [107, 1], [107, 1], [107, 1], [107, 1], [107, 1], [107, 1], [107, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [112, 1], [81, 1], [81, 1], [81, 1], [81, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [90, 1], [78, 1], [78, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [119, 1], [47, 1], [47, 2], [100, 1], [100, 2], [33, 1], [33, 1], [33, 1], [33, 1]],
    performAction: /* @__PURE__ */ __name(function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {
      var $0 = $$.length - 1;
      switch (yystate) {
        case 2:
          this.$ = [];
          break;
        case 3:
          if (!Array.isArray($$[$0]) || $$[$0].length > 0) {
            $$[$0 - 1].push($$[$0]);
          }
          this.$ = $$[$0 - 1];
          break;
        case 4:
        case 181:
          this.$ = $$[$0];
          break;
        case 11:
          yy.setDirection("TB");
          this.$ = "TB";
          break;
        case 12:
          yy.setDirection($$[$0 - 1]);
          this.$ = $$[$0 - 1];
          break;
        case 27:
          this.$ = $$[$0 - 1].nodes;
          break;
        case 28:
        case 29:
        case 30:
        case 31:
        case 32:
          this.$ = [];
          break;
        case 33:
          this.$ = yy.addSubGraph($$[$0 - 6], $$[$0 - 1], $$[$0 - 4]);
          break;
        case 34:
          this.$ = yy.addSubGraph($$[$0 - 3], $$[$0 - 1], $$[$0 - 3]);
          break;
        case 35:
          this.$ = yy.addSubGraph(void 0, $$[$0 - 1], void 0);
          break;
        case 37:
          this.$ = $$[$0].trim();
          yy.setAccTitle(this.$);
          break;
        case 38:
        case 39:
          this.$ = $$[$0].trim();
          yy.setAccDescription(this.$);
          break;
        case 43:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 44:
          this.$ = $$[$0];
          break;
        case 45:
          yy.addVertex($$[$0 - 1][0], void 0, void 0, void 0, void 0, void 0, void 0, $$[$0]);
          yy.addLink($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2]);
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1].concat($$[$0 - 3].nodes) };
          break;
        case 46:
          yy.addLink($$[$0 - 2].stmt, $$[$0], $$[$0 - 1]);
          this.$ = { stmt: $$[$0], nodes: $$[$0].concat($$[$0 - 2].nodes) };
          break;
        case 47:
          yy.addLink($$[$0 - 3].stmt, $$[$0 - 1], $$[$0 - 2]);
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1].concat($$[$0 - 3].nodes) };
          break;
        case 48:
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1] };
          break;
        case 49:
          yy.addVertex($$[$0 - 1][0], void 0, void 0, void 0, void 0, void 0, void 0, $$[$0]);
          this.$ = { stmt: $$[$0 - 1], nodes: $$[$0 - 1], shapeData: $$[$0] };
          break;
        case 50:
          this.$ = { stmt: $$[$0], nodes: $$[$0] };
          break;
        case 51:
          this.$ = [$$[$0]];
          break;
        case 52:
          yy.addVertex($$[$0 - 5][0], void 0, void 0, void 0, void 0, void 0, void 0, $$[$0 - 4]);
          this.$ = $$[$0 - 5].concat($$[$0]);
          break;
        case 53:
          this.$ = $$[$0 - 4].concat($$[$0]);
          break;
        case 54:
          this.$ = $$[$0];
          break;
        case 55:
          this.$ = $$[$0 - 2];
          yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 56:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "square");
          break;
        case 57:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "doublecircle");
          break;
        case 58:
          this.$ = $$[$0 - 5];
          yy.addVertex($$[$0 - 5], $$[$0 - 2], "circle");
          break;
        case 59:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "ellipse");
          break;
        case 60:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "stadium");
          break;
        case 61:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "subroutine");
          break;
        case 62:
          this.$ = $$[$0 - 7];
          yy.addVertex($$[$0 - 7], $$[$0 - 1], "rect", void 0, void 0, void 0, Object.fromEntries([[$$[$0 - 5], $$[$0 - 3]]]));
          break;
        case 63:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "cylinder");
          break;
        case 64:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "round");
          break;
        case 65:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "diamond");
          break;
        case 66:
          this.$ = $$[$0 - 5];
          yy.addVertex($$[$0 - 5], $$[$0 - 2], "hexagon");
          break;
        case 67:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "odd");
          break;
        case 68:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "trapezoid");
          break;
        case 69:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "inv_trapezoid");
          break;
        case 70:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "lean_right");
          break;
        case 71:
          this.$ = $$[$0 - 3];
          yy.addVertex($$[$0 - 3], $$[$0 - 1], "lean_left");
          break;
        case 72:
          this.$ = $$[$0];
          yy.addVertex($$[$0]);
          break;
        case 73:
          $$[$0 - 1].text = $$[$0];
          this.$ = $$[$0 - 1];
          break;
        case 74:
        case 75:
          $$[$0 - 2].text = $$[$0 - 1];
          this.$ = $$[$0 - 2];
          break;
        case 76:
          this.$ = $$[$0];
          break;
        case 77:
          var inf = yy.destructLink($$[$0], $$[$0 - 2]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length, "text": $$[$0 - 1] };
          break;
        case 78:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 79:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 80:
          this.$ = { text: $$[$0], type: "string" };
          break;
        case 81:
          this.$ = { text: $$[$0], type: "markdown" };
          break;
        case 82:
          var inf = yy.destructLink($$[$0]);
          this.$ = { "type": inf.type, "stroke": inf.stroke, "length": inf.length };
          break;
        case 83:
          this.$ = $$[$0 - 1];
          break;
        case 84:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 85:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 86:
          this.$ = { text: $$[$0], type: "string" };
          break;
        case 87:
        case 102:
          this.$ = { text: $$[$0], type: "markdown" };
          break;
        case 99:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 100:
          this.$ = { text: $$[$0 - 1].text + "" + $$[$0], type: $$[$0 - 1].type };
          break;
        case 101:
          this.$ = { text: $$[$0], type: "text" };
          break;
        case 103:
          this.$ = $$[$0 - 4];
          yy.addClass($$[$0 - 2], $$[$0]);
          break;
        case 104:
          this.$ = $$[$0 - 4];
          yy.setClass($$[$0 - 2], $$[$0]);
          break;
        case 105:
        case 113:
          this.$ = $$[$0 - 1];
          yy.setClickEvent($$[$0 - 1], $$[$0]);
          break;
        case 106:
        case 114:
          this.$ = $$[$0 - 3];
          yy.setClickEvent($$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 3], $$[$0]);
          break;
        case 107:
          this.$ = $$[$0 - 2];
          yy.setClickEvent($$[$0 - 2], $$[$0 - 1], $$[$0]);
          break;
        case 108:
          this.$ = $$[$0 - 4];
          yy.setClickEvent($$[$0 - 4], $$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 4], $$[$0]);
          break;
        case 109:
          this.$ = $$[$0 - 2];
          yy.setLink($$[$0 - 2], $$[$0]);
          break;
        case 110:
          this.$ = $$[$0 - 4];
          yy.setLink($$[$0 - 4], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 4], $$[$0]);
          break;
        case 111:
          this.$ = $$[$0 - 4];
          yy.setLink($$[$0 - 4], $$[$0 - 2], $$[$0]);
          break;
        case 112:
          this.$ = $$[$0 - 6];
          yy.setLink($$[$0 - 6], $$[$0 - 4], $$[$0]);
          yy.setTooltip($$[$0 - 6], $$[$0 - 2]);
          break;
        case 115:
          this.$ = $$[$0 - 1];
          yy.setLink($$[$0 - 1], $$[$0]);
          break;
        case 116:
          this.$ = $$[$0 - 3];
          yy.setLink($$[$0 - 3], $$[$0 - 2]);
          yy.setTooltip($$[$0 - 3], $$[$0]);
          break;
        case 117:
          this.$ = $$[$0 - 3];
          yy.setLink($$[$0 - 3], $$[$0 - 2], $$[$0]);
          break;
        case 118:
          this.$ = $$[$0 - 5];
          yy.setLink($$[$0 - 5], $$[$0 - 4], $$[$0]);
          yy.setTooltip($$[$0 - 5], $$[$0 - 2]);
          break;
        case 119:
          this.$ = $$[$0 - 4];
          yy.addVertex($$[$0 - 2], void 0, void 0, $$[$0]);
          break;
        case 120:
          this.$ = $$[$0 - 4];
          yy.updateLink([$$[$0 - 2]], $$[$0]);
          break;
        case 121:
          this.$ = $$[$0 - 4];
          yy.updateLink($$[$0 - 2], $$[$0]);
          break;
        case 122:
          this.$ = $$[$0 - 8];
          yy.updateLinkInterpolate([$$[$0 - 6]], $$[$0 - 2]);
          yy.updateLink([$$[$0 - 6]], $$[$0]);
          break;
        case 123:
          this.$ = $$[$0 - 8];
          yy.updateLinkInterpolate($$[$0 - 6], $$[$0 - 2]);
          yy.updateLink($$[$0 - 6], $$[$0]);
          break;
        case 124:
          this.$ = $$[$0 - 6];
          yy.updateLinkInterpolate([$$[$0 - 4]], $$[$0]);
          break;
        case 125:
          this.$ = $$[$0 - 6];
          yy.updateLinkInterpolate($$[$0 - 4], $$[$0]);
          break;
        case 126:
        case 128:
          this.$ = [$$[$0]];
          break;
        case 127:
        case 129:
          $$[$0 - 2].push($$[$0]);
          this.$ = $$[$0 - 2];
          break;
        case 131:
          this.$ = $$[$0 - 1] + $$[$0];
          break;
        case 179:
          this.$ = $$[$0];
          break;
        case 180:
          this.$ = $$[$0 - 1] + "" + $$[$0];
          break;
        case 182:
          this.$ = $$[$0 - 1] + "" + $$[$0];
          break;
        case 183:
          this.$ = { stmt: "dir", value: "TB" };
          break;
        case 184:
          this.$ = { stmt: "dir", value: "BT" };
          break;
        case 185:
          this.$ = { stmt: "dir", value: "RL" };
          break;
        case 186:
          this.$ = { stmt: "dir", value: "LR" };
          break;
      }
    }, "anonymous"),
    table: [{ 3: 1, 4: 2, 9: $V0, 10: $V1, 12: $V2 }, { 1: [3] }, o($V3, $V4, { 5: 6 }), { 4: 7, 9: $V0, 10: $V1, 12: $V2 }, { 4: 8, 9: $V0, 10: $V1, 12: $V2 }, { 13: [1, 9], 14: [1, 10] }, { 1: [2, 1], 6: 11, 7: 12, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V9, 33: 24, 34: $Va, 36: $Vb, 38: $Vc, 42: 28, 43: 38, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 83: $Vf, 84: $Vg, 85: $Vh, 86: $Vi, 87: $Vj, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs, 120: $Vt, 121: $Vu, 122: $Vv, 123: $Vw }, o($V3, [2, 9]), o($V3, [2, 10]), o($V3, [2, 11]), { 8: [1, 54], 9: [1, 55], 10: $Vx, 15: 53, 18: 56 }, o($Vy, [2, 3]), o($Vy, [2, 4]), o($Vy, [2, 5]), o($Vy, [2, 6]), o($Vy, [2, 7]), o($Vy, [2, 8]), { 8: $Vz, 9: $VA, 11: $VB, 21: 58, 41: 59, 72: 63, 75: [1, 64], 77: [1, 65] }, { 8: $Vz, 9: $VA, 11: $VB, 21: 66 }, { 8: $Vz, 9: $VA, 11: $VB, 21: 67 }, { 8: $Vz, 9: $VA, 11: $VB, 21: 68 }, { 8: $Vz, 9: $VA, 11: $VB, 21: 69 }, { 8: $Vz, 9: $VA, 11: $VB, 21: 70 }, { 8: $Vz, 9: $VA, 10: [1, 71], 11: $VB, 21: 72 }, o($Vy, [2, 36]), { 35: [1, 73] }, { 37: [1, 74] }, o($Vy, [2, 39]), o($VC, [2, 50], { 18: 75, 39: 76, 10: $Vx, 40: $VD }), { 10: [1, 78] }, { 10: [1, 79] }, { 10: [1, 80] }, { 10: [1, 81] }, { 14: $VE, 44: $VF, 60: $VG, 79: [1, 85], 88: $VH, 94: [1, 82], 96: [1, 83], 100: 84, 104: $VI, 105: $VJ, 108: $VK, 110: $VL, 113: $VM, 114: $VN, 115: $VO, 119: 86 }, o($Vy, [2, 183]), o($Vy, [2, 184]), o($Vy, [2, 185]), o($Vy, [2, 186]), o($VP, [2, 51]), o($VP, [2, 54], { 46: [1, 98] }), o($VQ, [2, 72], { 112: 111, 29: [1, 99], 44: $Vd, 48: [1, 100], 50: [1, 101], 52: [1, 102], 54: [1, 103], 56: [1, 104], 58: [1, 105], 60: $Ve, 63: [1, 106], 65: [1, 107], 67: [1, 108], 68: [1, 109], 70: [1, 110], 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 113: $Vq, 114: $Vr, 115: $Vs }), o($VR, [2, 179]), o($VR, [2, 140]), o($VR, [2, 141]), o($VR, [2, 142]), o($VR, [2, 143]), o($VR, [2, 144]), o($VR, [2, 145]), o($VR, [2, 146]), o($VR, [2, 147]), o($VR, [2, 148]), o($VR, [2, 149]), o($VR, [2, 150]), o($V3, [2, 12]), o($V3, [2, 18]), o($V3, [2, 19]), { 9: [1, 112] }, o($VS, [2, 26], { 18: 113, 10: $Vx }), o($Vy, [2, 27]), { 42: 114, 43: 38, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, o($Vy, [2, 40]), o($Vy, [2, 41]), o($Vy, [2, 42]), o($VT, [2, 76], { 73: 115, 62: [1, 117], 74: [1, 116] }), { 76: 118, 78: 119, 79: [1, 120], 80: [1, 121], 115: $VU, 118: $VV }, o([44, 60, 62, 74, 88, 101, 104, 105, 108, 110, 113, 114, 115], [2, 82]), o($Vy, [2, 28]), o($Vy, [2, 29]), o($Vy, [2, 30]), o($Vy, [2, 31]), o($Vy, [2, 32]), { 10: $VW, 12: $VX, 14: $VY, 27: $VZ, 28: 124, 32: $V_, 44: $V$, 60: $V01, 75: $V11, 79: [1, 126], 80: [1, 127], 82: 137, 83: $V21, 84: $V31, 85: $V41, 86: $V51, 87: $V61, 88: $V71, 89: $V81, 90: 125, 104: $V91, 108: $Va1, 110: $Vb1, 113: $Vc1, 114: $Vd1, 115: $Ve1 }, o($Vf1, $V4, { 5: 150 }), o($Vy, [2, 37]), o($Vy, [2, 38]), o($VC, [2, 48], { 44: $Vg1 }), o($VC, [2, 49], { 18: 152, 10: $Vx, 40: $Vh1 }), o($VP, [2, 44]), { 44: $Vd, 47: 154, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, { 101: [1, 155], 102: 156, 104: [1, 157] }, { 44: $Vd, 47: 158, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, { 44: $Vd, 47: 159, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, o($Vi1, [2, 105], { 10: [1, 160], 95: [1, 161] }), { 79: [1, 162] }, o($Vi1, [2, 113], { 119: 164, 10: [1, 163], 14: $VE, 44: $VF, 60: $VG, 88: $VH, 104: $VI, 105: $VJ, 108: $VK, 110: $VL, 113: $VM, 114: $VN, 115: $VO }), o($Vi1, [2, 115], { 10: [1, 165] }), o($Vj1, [2, 181]), o($Vj1, [2, 168]), o($Vj1, [2, 169]), o($Vj1, [2, 170]), o($Vj1, [2, 171]), o($Vj1, [2, 172]), o($Vj1, [2, 173]), o($Vj1, [2, 174]), o($Vj1, [2, 175]), o($Vj1, [2, 176]), o($Vj1, [2, 177]), o($Vj1, [2, 178]), { 44: $Vd, 47: 166, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, { 30: 167, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 175, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 177, 50: [1, 176], 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 178, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 179, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 180, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 108: [1, 181] }, { 30: 182, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 183, 65: [1, 184], 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 185, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 186, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 187, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($VR, [2, 180]), o($V3, [2, 20]), o($VS, [2, 25]), o($VC, [2, 46], { 39: 188, 18: 189, 10: $Vx, 40: $VD }), o($VT, [2, 73], { 10: [1, 190] }), { 10: [1, 191] }, { 30: 192, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 77: [1, 193], 78: 194, 115: $VU, 118: $VV }, o($Vq1, [2, 78]), o($Vq1, [2, 80]), o($Vq1, [2, 81]), o($Vq1, [2, 166]), o($Vq1, [2, 167]), { 8: $Vz, 9: $VA, 10: $VW, 11: $VB, 12: $VX, 14: $VY, 21: 196, 27: $VZ, 29: [1, 195], 32: $V_, 44: $V$, 60: $V01, 75: $V11, 82: 137, 83: $V21, 84: $V31, 85: $V41, 86: $V51, 87: $V61, 88: $V71, 89: $V81, 90: 197, 104: $V91, 108: $Va1, 110: $Vb1, 113: $Vc1, 114: $Vd1, 115: $Ve1 }, o($Vr1, [2, 99]), o($Vr1, [2, 101]), o($Vr1, [2, 102]), o($Vr1, [2, 155]), o($Vr1, [2, 156]), o($Vr1, [2, 157]), o($Vr1, [2, 158]), o($Vr1, [2, 159]), o($Vr1, [2, 160]), o($Vr1, [2, 161]), o($Vr1, [2, 162]), o($Vr1, [2, 163]), o($Vr1, [2, 164]), o($Vr1, [2, 165]), o($Vr1, [2, 88]), o($Vr1, [2, 89]), o($Vr1, [2, 90]), o($Vr1, [2, 91]), o($Vr1, [2, 92]), o($Vr1, [2, 93]), o($Vr1, [2, 94]), o($Vr1, [2, 95]), o($Vr1, [2, 96]), o($Vr1, [2, 97]), o($Vr1, [2, 98]), { 6: 11, 7: 12, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V9, 32: [1, 198], 33: 24, 34: $Va, 36: $Vb, 38: $Vc, 42: 28, 43: 38, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 83: $Vf, 84: $Vg, 85: $Vh, 86: $Vi, 87: $Vj, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs, 120: $Vt, 121: $Vu, 122: $Vv, 123: $Vw }, { 10: $Vx, 18: 199 }, { 44: [1, 200] }, o($VP, [2, 43]), { 10: [1, 201], 44: $Vd, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 111, 113: $Vq, 114: $Vr, 115: $Vs }, { 10: [1, 202] }, { 10: [1, 203], 105: [1, 204] }, o($Vs1, [2, 126]), { 10: [1, 205], 44: $Vd, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 111, 113: $Vq, 114: $Vr, 115: $Vs }, { 10: [1, 206], 44: $Vd, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 111, 113: $Vq, 114: $Vr, 115: $Vs }, { 79: [1, 207] }, o($Vi1, [2, 107], { 10: [1, 208] }), o($Vi1, [2, 109], { 10: [1, 209] }), { 79: [1, 210] }, o($Vj1, [2, 182]), { 79: [1, 211], 97: [1, 212] }, o($VP, [2, 55], { 112: 111, 44: $Vd, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 113: $Vq, 114: $Vr, 115: $Vs }), { 31: [1, 213], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($Vt1, [2, 84]), o($Vt1, [2, 86]), o($Vt1, [2, 87]), o($Vt1, [2, 151]), o($Vt1, [2, 152]), o($Vt1, [2, 153]), o($Vt1, [2, 154]), { 49: [1, 215], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 216, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 51: [1, 217], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 53: [1, 218], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 55: [1, 219], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 57: [1, 220], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 60: [1, 221] }, { 64: [1, 222], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 66: [1, 223], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 30: 224, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 31: [1, 225], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 67: $Vk1, 69: [1, 226], 71: [1, 227], 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 67: $Vk1, 69: [1, 229], 71: [1, 228], 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($VC, [2, 45], { 18: 152, 10: $Vx, 40: $Vh1 }), o($VC, [2, 47], { 44: $Vg1 }), o($VT, [2, 75]), o($VT, [2, 74]), { 62: [1, 230], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($VT, [2, 77]), o($Vq1, [2, 79]), { 30: 231, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($Vf1, $V4, { 5: 232 }), o($Vr1, [2, 100]), o($Vy, [2, 35]), { 43: 233, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, { 10: $Vx, 18: 234 }, { 10: $Vu1, 60: $Vv1, 83: $Vw1, 91: 235, 104: $Vx1, 106: 236, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, { 10: $Vu1, 60: $Vv1, 83: $Vw1, 91: 246, 103: [1, 247], 104: $Vx1, 106: 236, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, { 10: $Vu1, 60: $Vv1, 83: $Vw1, 91: 248, 103: [1, 249], 104: $Vx1, 106: 236, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, { 104: [1, 250] }, { 10: $Vu1, 60: $Vv1, 83: $Vw1, 91: 251, 104: $Vx1, 106: 236, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, { 44: $Vd, 47: 252, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, o($Vi1, [2, 106]), { 79: [1, 253] }, { 79: [1, 254], 97: [1, 255] }, o($Vi1, [2, 114]), o($Vi1, [2, 116], { 10: [1, 256] }), o($Vi1, [2, 117]), o($VQ, [2, 56]), o($Vt1, [2, 85]), o($VQ, [2, 57]), { 51: [1, 257], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($VQ, [2, 64]), o($VQ, [2, 59]), o($VQ, [2, 60]), o($VQ, [2, 61]), { 108: [1, 258] }, o($VQ, [2, 63]), o($VQ, [2, 65]), { 66: [1, 259], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($VQ, [2, 67]), o($VQ, [2, 68]), o($VQ, [2, 70]), o($VQ, [2, 69]), o($VQ, [2, 71]), o([10, 44, 60, 88, 101, 104, 105, 108, 110, 113, 114, 115], [2, 83]), { 31: [1, 260], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 6: 11, 7: 12, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V9, 32: [1, 261], 33: 24, 34: $Va, 36: $Vb, 38: $Vc, 42: 28, 43: 38, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 83: $Vf, 84: $Vg, 85: $Vh, 86: $Vi, 87: $Vj, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs, 120: $Vt, 121: $Vu, 122: $Vv, 123: $Vw }, o($VP, [2, 53]), { 43: 262, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs }, o($Vi1, [2, 119], { 105: $VC1 }), o($VD1, [2, 128], { 107: 264, 10: $Vu1, 60: $Vv1, 83: $Vw1, 104: $Vx1, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }), o($VE1, [2, 130]), o($VE1, [2, 132]), o($VE1, [2, 133]), o($VE1, [2, 134]), o($VE1, [2, 135]), o($VE1, [2, 136]), o($VE1, [2, 137]), o($VE1, [2, 138]), o($VE1, [2, 139]), o($Vi1, [2, 120], { 105: $VC1 }), { 10: [1, 265] }, o($Vi1, [2, 121], { 105: $VC1 }), { 10: [1, 266] }, o($Vs1, [2, 127]), o($Vi1, [2, 103], { 105: $VC1 }), o($Vi1, [2, 104], { 112: 111, 44: $Vd, 60: $Ve, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 113: $Vq, 114: $Vr, 115: $Vs }), o($Vi1, [2, 108]), o($Vi1, [2, 110], { 10: [1, 267] }), o($Vi1, [2, 111]), { 97: [1, 268] }, { 51: [1, 269] }, { 62: [1, 270] }, { 66: [1, 271] }, { 8: $Vz, 9: $VA, 11: $VB, 21: 272 }, o($Vy, [2, 34]), o($VP, [2, 52]), { 10: $Vu1, 60: $Vv1, 83: $Vw1, 104: $Vx1, 106: 273, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, o($VE1, [2, 131]), { 14: $VE, 44: $VF, 60: $VG, 88: $VH, 100: 274, 104: $VI, 105: $VJ, 108: $VK, 110: $VL, 113: $VM, 114: $VN, 115: $VO, 119: 86 }, { 14: $VE, 44: $VF, 60: $VG, 88: $VH, 100: 275, 104: $VI, 105: $VJ, 108: $VK, 110: $VL, 113: $VM, 114: $VN, 115: $VO, 119: 86 }, { 97: [1, 276] }, o($Vi1, [2, 118]), o($VQ, [2, 58]), { 30: 277, 67: $Vk1, 79: $Vl1, 80: $Vm1, 81: 168, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, o($VQ, [2, 66]), o($Vf1, $V4, { 5: 278 }), o($VD1, [2, 129], { 107: 264, 10: $Vu1, 60: $Vv1, 83: $Vw1, 104: $Vx1, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }), o($Vi1, [2, 124], { 119: 164, 10: [1, 279], 14: $VE, 44: $VF, 60: $VG, 88: $VH, 104: $VI, 105: $VJ, 108: $VK, 110: $VL, 113: $VM, 114: $VN, 115: $VO }), o($Vi1, [2, 125], { 119: 164, 10: [1, 280], 14: $VE, 44: $VF, 60: $VG, 88: $VH, 104: $VI, 105: $VJ, 108: $VK, 110: $VL, 113: $VM, 114: $VN, 115: $VO }), o($Vi1, [2, 112]), { 31: [1, 281], 67: $Vk1, 81: 214, 115: $Vn1, 116: $Vo1, 117: $Vp1 }, { 6: 11, 7: 12, 8: $V5, 9: $V6, 10: $V7, 11: $V8, 20: 17, 22: 18, 23: 19, 24: 20, 25: 21, 26: 22, 27: $V9, 32: [1, 282], 33: 24, 34: $Va, 36: $Vb, 38: $Vc, 42: 28, 43: 38, 44: $Vd, 45: 39, 47: 40, 60: $Ve, 83: $Vf, 84: $Vg, 85: $Vh, 86: $Vi, 87: $Vj, 88: $Vk, 101: $Vl, 104: $Vm, 105: $Vn, 108: $Vo, 110: $Vp, 112: 41, 113: $Vq, 114: $Vr, 115: $Vs, 120: $Vt, 121: $Vu, 122: $Vv, 123: $Vw }, { 10: $Vu1, 60: $Vv1, 83: $Vw1, 91: 283, 104: $Vx1, 106: 236, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, { 10: $Vu1, 60: $Vv1, 83: $Vw1, 91: 284, 104: $Vx1, 106: 236, 107: 237, 108: $Vy1, 109: $Vz1, 110: $VA1, 111: $VB1 }, o($VQ, [2, 62]), o($Vy, [2, 33]), o($Vi1, [2, 122], { 105: $VC1 }), o($Vi1, [2, 123], { 105: $VC1 })],
    defaultActions: {},
    parseError: /* @__PURE__ */ __name(function parseError(str, hash) {
      if (hash.recoverable) {
        this.trace(str);
      } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
      }
    }, "parseError"),
    parse: /* @__PURE__ */ __name(function parse(input) {
      var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
      var args = lstack.slice.call(arguments, 1);
      var lexer2 = Object.create(this.lexer);
      var sharedState = { yy: {} };
      for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
          sharedState.yy[k] = this.yy[k];
        }
      }
      lexer2.setInput(input, sharedState.yy);
      sharedState.yy.lexer = lexer2;
      sharedState.yy.parser = this;
      if (typeof lexer2.yylloc == "undefined") {
        lexer2.yylloc = {};
      }
      var yyloc = lexer2.yylloc;
      lstack.push(yyloc);
      var ranges = lexer2.options && lexer2.options.ranges;
      if (typeof sharedState.yy.parseError === "function") {
        this.parseError = sharedState.yy.parseError;
      } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
      }
      function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
      }
      __name(popStack, "popStack");
      function lex2() {
        var token;
        token = tstack.pop() || lexer2.lex() || EOF;
        if (typeof token !== "number") {
          if (token instanceof Array) {
            tstack = token;
            token = tstack.pop();
          }
          token = self.symbols_[token] || token;
        }
        return token;
      }
      __name(lex2, "lex");
      var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
      while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
          action = this.defaultActions[state];
        } else {
          if (symbol === null || typeof symbol == "undefined") {
            symbol = lex2();
          }
          action = table[state] && table[state][symbol];
        }
        if (typeof action === "undefined" || !action.length || !action[0]) {
          var errStr = "";
          expected = [];
          for (p in table[state]) {
            if (this.terminals_[p] && p > TERROR) {
              expected.push("'" + this.terminals_[p] + "'");
            }
          }
          if (lexer2.showPosition) {
            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + lexer2.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + (this.terminals_[symbol] || symbol) + "'";
          } else {
            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == EOF ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
          }
          this.parseError(errStr, {
            text: lexer2.match,
            token: this.terminals_[symbol] || symbol,
            line: lexer2.yylineno,
            loc: yyloc,
            expected
          });
        }
        if (action[0] instanceof Array && action.length > 1) {
          throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
        }
        switch (action[0]) {
          case 1:
            stack.push(symbol);
            vstack.push(lexer2.yytext);
            lstack.push(lexer2.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
              yyleng = lexer2.yyleng;
              yytext = lexer2.yytext;
              yylineno = lexer2.yylineno;
              yyloc = lexer2.yylloc;
              if (recovering > 0) {
                recovering--;
              }
            } else {
              symbol = preErrorSymbol;
              preErrorSymbol = null;
            }
            break;
          case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
              first_line: lstack[lstack.length - (len || 1)].first_line,
              last_line: lstack[lstack.length - 1].last_line,
              first_column: lstack[lstack.length - (len || 1)].first_column,
              last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
              yyval._$.range = [
                lstack[lstack.length - (len || 1)].range[0],
                lstack[lstack.length - 1].range[1]
              ];
            }
            r = this.performAction.apply(yyval, [
              yytext,
              yyleng,
              yylineno,
              sharedState.yy,
              action[1],
              vstack,
              lstack
            ].concat(args));
            if (typeof r !== "undefined") {
              return r;
            }
            if (len) {
              stack = stack.slice(0, -1 * len * 2);
              vstack = vstack.slice(0, -1 * len);
              lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
          case 3:
            return true;
        }
      }
      return true;
    }, "parse")
  };
  var lexer = /* @__PURE__ */ function() {
    var lexer2 = {
      EOF: 1,
      parseError: /* @__PURE__ */ __name(function parseError(str, hash) {
        if (this.yy.parser) {
          this.yy.parser.parseError(str, hash);
        } else {
          throw new Error(str);
        }
      }, "parseError"),
      // resets the lexer, sets new input
      setInput: /* @__PURE__ */ __name(function(input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = "";
        this.conditionStack = ["INITIAL"];
        this.yylloc = {
          first_line: 1,
          first_column: 0,
          last_line: 1,
          last_column: 0
        };
        if (this.options.ranges) {
          this.yylloc.range = [0, 0];
        }
        this.offset = 0;
        return this;
      }, "setInput"),
      // consumes and returns one char from the input
      input: /* @__PURE__ */ __name(function() {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno++;
          this.yylloc.last_line++;
        } else {
          this.yylloc.last_column++;
        }
        if (this.options.ranges) {
          this.yylloc.range[1]++;
        }
        this._input = this._input.slice(1);
        return ch;
      }, "input"),
      // unshifts one char (or a string) into the input
      unput: /* @__PURE__ */ __name(function(ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);
        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);
        if (lines.length - 1) {
          this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;
        this.yylloc = {
          first_line: this.yylloc.first_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.first_column,
          last_column: lines ? (lines.length === oldLines.length ? this.yylloc.first_column : 0) + oldLines[oldLines.length - lines.length].length - lines[0].length : this.yylloc.first_column - len
        };
        if (this.options.ranges) {
          this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
      }, "unput"),
      // When called from action, caches matched text and appends it on next action
      more: /* @__PURE__ */ __name(function() {
        this._more = true;
        return this;
      }, "more"),
      // When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
      reject: /* @__PURE__ */ __name(function() {
        if (this.options.backtrack_lexer) {
          this._backtrack = true;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
        return this;
      }, "reject"),
      // retain first n characters of the match
      less: /* @__PURE__ */ __name(function(n) {
        this.unput(this.match.slice(n));
      }, "less"),
      // displays already matched input, i.e. for error messages
      pastInput: /* @__PURE__ */ __name(function() {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? "..." : "") + past.substr(-20).replace(/\n/g, "");
      }, "pastInput"),
      // displays upcoming input, i.e. for error messages
      upcomingInput: /* @__PURE__ */ __name(function() {
        var next = this.match;
        if (next.length < 20) {
          next += this._input.substr(0, 20 - next.length);
        }
        return (next.substr(0, 20) + (next.length > 20 ? "..." : "")).replace(/\n/g, "");
      }, "upcomingInput"),
      // displays the character position where the lexing error occurred, i.e. for error messages
      showPosition: /* @__PURE__ */ __name(function() {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
      }, "showPosition"),
      // test the lexed token: return FALSE when not a match, otherwise return token
      test_match: /* @__PURE__ */ __name(function(match, indexed_rule) {
        var token, lines, backup;
        if (this.options.backtrack_lexer) {
          backup = {
            yylineno: this.yylineno,
            yylloc: {
              first_line: this.yylloc.first_line,
              last_line: this.last_line,
              first_column: this.yylloc.first_column,
              last_column: this.yylloc.last_column
            },
            yytext: this.yytext,
            match: this.match,
            matches: this.matches,
            matched: this.matched,
            yyleng: this.yyleng,
            offset: this.offset,
            _more: this._more,
            _input: this._input,
            yy: this.yy,
            conditionStack: this.conditionStack.slice(0),
            done: this.done
          };
          if (this.options.ranges) {
            backup.yylloc.range = this.yylloc.range.slice(0);
          }
        }
        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
          this.yylineno += lines.length;
        }
        this.yylloc = {
          first_line: this.yylloc.last_line,
          last_line: this.yylineno + 1,
          first_column: this.yylloc.last_column,
          last_column: lines ? lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
          this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
          this.done = false;
        }
        if (token) {
          return token;
        } else if (this._backtrack) {
          for (var k in backup) {
            this[k] = backup[k];
          }
          return false;
        }
        return false;
      }, "test_match"),
      // return next match in input
      next: /* @__PURE__ */ __name(function() {
        if (this.done) {
          return this.EOF;
        }
        if (!this._input) {
          this.done = true;
        }
        var token, match, tempMatch, index;
        if (!this._more) {
          this.yytext = "";
          this.match = "";
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
          tempMatch = this._input.match(this.rules[rules[i]]);
          if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
            match = tempMatch;
            index = i;
            if (this.options.backtrack_lexer) {
              token = this.test_match(tempMatch, rules[i]);
              if (token !== false) {
                return token;
              } else if (this._backtrack) {
                match = false;
                continue;
              } else {
                return false;
              }
            } else if (!this.options.flex) {
              break;
            }
          }
        }
        if (match) {
          token = this.test_match(match, rules[index]);
          if (token !== false) {
            return token;
          }
          return false;
        }
        if (this._input === "") {
          return this.EOF;
        } else {
          return this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
            text: "",
            token: null,
            line: this.yylineno
          });
        }
      }, "next"),
      // return next match that has a token
      lex: /* @__PURE__ */ __name(function lex2() {
        var r = this.next();
        if (r) {
          return r;
        } else {
          return this.lex();
        }
      }, "lex"),
      // activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
      begin: /* @__PURE__ */ __name(function begin(condition) {
        this.conditionStack.push(condition);
      }, "begin"),
      // pop the previously active lexer condition state off the condition stack
      popState: /* @__PURE__ */ __name(function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
          return this.conditionStack.pop();
        } else {
          return this.conditionStack[0];
        }
      }, "popState"),
      // produce the lexer rule set which is active for the currently active lexer condition state
      _currentRules: /* @__PURE__ */ __name(function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
          return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
          return this.conditions["INITIAL"].rules;
        }
      }, "_currentRules"),
      // return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
      topState: /* @__PURE__ */ __name(function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
          return this.conditionStack[n];
        } else {
          return "INITIAL";
        }
      }, "topState"),
      // alias for begin(condition)
      pushState: /* @__PURE__ */ __name(function pushState(condition) {
        this.begin(condition);
      }, "pushState"),
      // return the number of states currently on the stack
      stateStackSize: /* @__PURE__ */ __name(function stateStackSize() {
        return this.conditionStack.length;
      }, "stateStackSize"),
      options: {},
      performAction: /* @__PURE__ */ __name(function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {
        var YYSTATE = YY_START;
        switch ($avoiding_name_collisions) {
          case 0:
            this.begin("acc_title");
            return 34;
            break;
          case 1:
            this.popState();
            return "acc_title_value";
            break;
          case 2:
            this.begin("acc_descr");
            return 36;
            break;
          case 3:
            this.popState();
            return "acc_descr_value";
            break;
          case 4:
            this.begin("acc_descr_multiline");
            break;
          case 5:
            this.popState();
            break;
          case 6:
            return "acc_descr_multiline_value";
            break;
          case 7:
            this.pushState("shapeData");
            yy_.yytext = "";
            return 40;
            break;
          case 8:
            this.pushState("shapeDataStr");
            return 40;
            break;
          case 9:
            this.popState();
            return 40;
            break;
          case 10:
            const re = /\n\s*/g;
            yy_.yytext = yy_.yytext.replace(re, "<br/>");
            return 40;
            break;
          case 11:
            return 40;
            break;
          case 12:
            this.popState();
            break;
          case 13:
            this.begin("callbackname");
            break;
          case 14:
            this.popState();
            break;
          case 15:
            this.popState();
            this.begin("callbackargs");
            break;
          case 16:
            return 94;
            break;
          case 17:
            this.popState();
            break;
          case 18:
            return 95;
            break;
          case 19:
            return "MD_STR";
            break;
          case 20:
            this.popState();
            break;
          case 21:
            this.begin("md_string");
            break;
          case 22:
            return "STR";
            break;
          case 23:
            this.popState();
            break;
          case 24:
            this.pushState("string");
            break;
          case 25:
            return 83;
            break;
          case 26:
            return 101;
            break;
          case 27:
            return 84;
            break;
          case 28:
            return 103;
            break;
          case 29:
            return 85;
            break;
          case 30:
            return 86;
            break;
          case 31:
            return 96;
            break;
          case 32:
            this.begin("click");
            break;
          case 33:
            this.popState();
            break;
          case 34:
            return 87;
            break;
          case 35:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 12;
            break;
          case 36:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 12;
            break;
          case 37:
            if (yy.lex.firstGraph()) {
              this.begin("dir");
            }
            return 12;
            break;
          case 38:
            return 27;
            break;
          case 39:
            return 32;
            break;
          case 40:
            return 97;
            break;
          case 41:
            return 97;
            break;
          case 42:
            return 97;
            break;
          case 43:
            return 97;
            break;
          case 44:
            this.popState();
            return 13;
            break;
          case 45:
            this.popState();
            return 14;
            break;
          case 46:
            this.popState();
            return 14;
            break;
          case 47:
            this.popState();
            return 14;
            break;
          case 48:
            this.popState();
            return 14;
            break;
          case 49:
            this.popState();
            return 14;
            break;
          case 50:
            this.popState();
            return 14;
            break;
          case 51:
            this.popState();
            return 14;
            break;
          case 52:
            this.popState();
            return 14;
            break;
          case 53:
            this.popState();
            return 14;
            break;
          case 54:
            this.popState();
            return 14;
            break;
          case 55:
            return 120;
            break;
          case 56:
            return 121;
            break;
          case 57:
            return 122;
            break;
          case 58:
            return 123;
            break;
          case 59:
            return 104;
            break;
          case 60:
            return 110;
            break;
          case 61:
            return 46;
            break;
          case 62:
            return 60;
            break;
          case 63:
            return 44;
            break;
          case 64:
            return 8;
            break;
          case 65:
            return 105;
            break;
          case 66:
            return 114;
            break;
          case 67:
            this.popState();
            return 77;
            break;
          case 68:
            this.pushState("edgeText");
            return 75;
            break;
          case 69:
            return 118;
            break;
          case 70:
            this.popState();
            return 77;
            break;
          case 71:
            this.pushState("thickEdgeText");
            return 75;
            break;
          case 72:
            return 118;
            break;
          case 73:
            this.popState();
            return 77;
            break;
          case 74:
            this.pushState("dottedEdgeText");
            return 75;
            break;
          case 75:
            return 118;
            break;
          case 76:
            return 77;
            break;
          case 77:
            this.popState();
            return 53;
            break;
          case 78:
            return "TEXT";
            break;
          case 79:
            this.pushState("ellipseText");
            return 52;
            break;
          case 80:
            this.popState();
            return 55;
            break;
          case 81:
            this.pushState("text");
            return 54;
            break;
          case 82:
            this.popState();
            return 57;
            break;
          case 83:
            this.pushState("text");
            return 56;
            break;
          case 84:
            return 58;
            break;
          case 85:
            this.pushState("text");
            return 67;
            break;
          case 86:
            this.popState();
            return 64;
            break;
          case 87:
            this.pushState("text");
            return 63;
            break;
          case 88:
            this.popState();
            return 49;
            break;
          case 89:
            this.pushState("text");
            return 48;
            break;
          case 90:
            this.popState();
            return 69;
            break;
          case 91:
            this.popState();
            return 71;
            break;
          case 92:
            return 116;
            break;
          case 93:
            this.pushState("trapText");
            return 68;
            break;
          case 94:
            this.pushState("trapText");
            return 70;
            break;
          case 95:
            return 117;
            break;
          case 96:
            return 67;
            break;
          case 97:
            return 89;
            break;
          case 98:
            return "SEP";
            break;
          case 99:
            return 88;
            break;
          case 100:
            return 114;
            break;
          case 101:
            return 110;
            break;
          case 102:
            return 44;
            break;
          case 103:
            return 108;
            break;
          case 104:
            return 113;
            break;
          case 105:
            return 115;
            break;
          case 106:
            this.popState();
            return 62;
            break;
          case 107:
            this.pushState("text");
            return 62;
            break;
          case 108:
            this.popState();
            return 51;
            break;
          case 109:
            this.pushState("text");
            return 50;
            break;
          case 110:
            this.popState();
            return 31;
            break;
          case 111:
            this.pushState("text");
            return 29;
            break;
          case 112:
            this.popState();
            return 66;
            break;
          case 113:
            this.pushState("text");
            return 65;
            break;
          case 114:
            return "TEXT";
            break;
          case 115:
            return "QUOTE";
            break;
          case 116:
            return 9;
            break;
          case 117:
            return 10;
            break;
          case 118:
            return 11;
            break;
        }
      }, "anonymous"),
      rules: [/^(?:accTitle\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*:\s*)/, /^(?:(?!\n||)*[^\n]*)/, /^(?:accDescr\s*\{\s*)/, /^(?:[\}])/, /^(?:[^\}]*)/, /^(?:@\{)/, /^(?:["])/, /^(?:["])/, /^(?:[^\"]+)/, /^(?:[^}^"]+)/, /^(?:\})/, /^(?:call[\s]+)/, /^(?:\([\s]*\))/, /^(?:\()/, /^(?:[^(]*)/, /^(?:\))/, /^(?:[^)]*)/, /^(?:[^`"]+)/, /^(?:[`]["])/, /^(?:["][`])/, /^(?:[^"]+)/, /^(?:["])/, /^(?:["])/, /^(?:style\b)/, /^(?:default\b)/, /^(?:linkStyle\b)/, /^(?:interpolate\b)/, /^(?:classDef\b)/, /^(?:class\b)/, /^(?:href[\s])/, /^(?:click[\s]+)/, /^(?:[\s\n])/, /^(?:[^\s\n]*)/, /^(?:flowchart-elk\b)/, /^(?:graph\b)/, /^(?:flowchart\b)/, /^(?:subgraph\b)/, /^(?:end\b\s*)/, /^(?:_self\b)/, /^(?:_blank\b)/, /^(?:_parent\b)/, /^(?:_top\b)/, /^(?:(\r?\n)*\s*\n)/, /^(?:\s*LR\b)/, /^(?:\s*RL\b)/, /^(?:\s*TB\b)/, /^(?:\s*BT\b)/, /^(?:\s*TD\b)/, /^(?:\s*BR\b)/, /^(?:\s*<)/, /^(?:\s*>)/, /^(?:\s*\^)/, /^(?:\s*v\b)/, /^(?:.*direction\s+TB[^\n]*)/, /^(?:.*direction\s+BT[^\n]*)/, /^(?:.*direction\s+RL[^\n]*)/, /^(?:.*direction\s+LR[^\n]*)/, /^(?:[0-9]+)/, /^(?:#)/, /^(?::::)/, /^(?::)/, /^(?:&)/, /^(?:;)/, /^(?:,)/, /^(?:\*)/, /^(?:\s*[xo<]?--+[-xo>]\s*)/, /^(?:\s*[xo<]?--\s*)/, /^(?:[^-]|-(?!-)+)/, /^(?:\s*[xo<]?==+[=xo>]\s*)/, /^(?:\s*[xo<]?==\s*)/, /^(?:[^=]|=(?!))/, /^(?:\s*[xo<]?-?\.+-[xo>]?\s*)/, /^(?:\s*[xo<]?-\.\s*)/, /^(?:[^\.]|\.(?!))/, /^(?:\s*~~[\~]+\s*)/, /^(?:[-/\)][\)])/, /^(?:[^\(\)\[\]\{\}]|!\)+)/, /^(?:\(-)/, /^(?:\]\))/, /^(?:\(\[)/, /^(?:\]\])/, /^(?:\[\[)/, /^(?:\[\|)/, /^(?:>)/, /^(?:\)\])/, /^(?:\[\()/, /^(?:\)\)\))/, /^(?:\(\(\()/, /^(?:[\\(?=\])][\]])/, /^(?:\/(?=\])\])/, /^(?:\/(?!\])|\\(?!\])|[^\\\[\]\(\)\{\}\/]+)/, /^(?:\[\/)/, /^(?:\[\\)/, /^(?:<)/, /^(?:>)/, /^(?:\^)/, /^(?:\\\|)/, /^(?:v\b)/, /^(?:\*)/, /^(?:#)/, /^(?:&)/, /^(?:([A-Za-z0-9!"\#$%&'*+\.`?\\_\/]|-(?=[^\>\-\.])|(?!))+)/, /^(?:-)/, /^(?:[\u00AA\u00B5\u00BA\u00C0-\u00D6\u00D8-\u00F6]|[\u00F8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377]|[\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5]|[\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA]|[\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE]|[\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA]|[\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0]|[\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977]|[\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2]|[\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A]|[\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39]|[\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8]|[\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C]|[\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C]|[\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99]|[\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0]|[\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D]|[\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3]|[\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10]|[\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1]|[\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81]|[\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3]|[\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6]|[\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A]|[\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081]|[\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D]|[\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0]|[\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310]|[\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C]|[\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u1700-\u170C\u170E-\u1711]|[\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7]|[\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C]|[\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16]|[\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF]|[\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC]|[\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D]|[\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D]|[\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3]|[\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F]|[\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128]|[\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184]|[\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3]|[\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6]|[\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE]|[\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C]|[\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D]|[\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC]|[\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B]|[\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788]|[\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805]|[\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB]|[\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28]|[\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5]|[\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4]|[\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E]|[\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D]|[\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36]|[\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D]|[\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC]|[\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF]|[\uFFD2-\uFFD7\uFFDA-\uFFDC])/, /^(?:\|)/, /^(?:\|)/, /^(?:\))/, /^(?:\()/, /^(?:\])/, /^(?:\[)/, /^(?:(\}))/, /^(?:\{)/, /^(?:[^\[\]\(\)\{\}\|\"]+)/, /^(?:")/, /^(?:(\r?\n)+)/, /^(?:\s)/, /^(?:$)/],
      conditions: { "shapeDataEndBracket": { "rules": [21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "shapeDataStr": { "rules": [9, 10, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "shapeData": { "rules": [8, 11, 12, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "callbackargs": { "rules": [17, 18, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "callbackname": { "rules": [14, 15, 16, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "href": { "rules": [21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "click": { "rules": [21, 24, 33, 34, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "dottedEdgeText": { "rules": [21, 24, 73, 75, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "thickEdgeText": { "rules": [21, 24, 70, 72, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "edgeText": { "rules": [21, 24, 67, 69, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "trapText": { "rules": [21, 24, 76, 79, 81, 83, 87, 89, 90, 91, 92, 93, 94, 107, 109, 111, 113], "inclusive": false }, "ellipseText": { "rules": [21, 24, 76, 77, 78, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "text": { "rules": [21, 24, 76, 79, 80, 81, 82, 83, 86, 87, 88, 89, 93, 94, 106, 107, 108, 109, 110, 111, 112, 113, 114], "inclusive": false }, "vertex": { "rules": [21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "dir": { "rules": [21, 24, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "acc_descr_multiline": { "rules": [5, 6, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "acc_descr": { "rules": [3, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "acc_title": { "rules": [1, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "md_string": { "rules": [19, 20, 21, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "string": { "rules": [21, 22, 23, 24, 76, 79, 81, 83, 87, 89, 93, 94, 107, 109, 111, 113], "inclusive": false }, "INITIAL": { "rules": [0, 2, 4, 7, 13, 21, 24, 25, 26, 27, 28, 29, 30, 31, 32, 35, 36, 37, 38, 39, 40, 41, 42, 43, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 70, 71, 73, 74, 76, 79, 81, 83, 84, 85, 87, 89, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 107, 109, 111, 113, 115, 116, 117, 118], "inclusive": true } }
    };
    return lexer2;
  }();
  parser2.lexer = lexer;
  function Parser() {
    this.yy = {};
  }
  __name(Parser, "Parser");
  Parser.prototype = parser2;
  parser2.Parser = Parser;
  return new Parser();
}();
parser.parser = parser;
var flow_default = parser;

// src/diagrams/flowchart/styles.ts
import * as khroma from "khroma";
var fade = /* @__PURE__ */ __name((color, opacity) => {
  const channel2 = khroma.channel;
  const r = channel2(color, "r");
  const g = channel2(color, "g");
  const b = channel2(color, "b");
  return khroma.rgba(r, g, b, opacity);
}, "fade");
var getStyles = /* @__PURE__ */ __name((options) => `.label {
    font-family: ${options.fontFamily};
    color: ${options.nodeTextColor || options.textColor};
  }
  .cluster-label text {
    fill: ${options.titleColor};
  }
  .cluster-label span {
    color: ${options.titleColor};
  }
  .cluster-label span p {
    background-color: transparent;
  }

  .label text,span {
    fill: ${options.nodeTextColor || options.textColor};
    color: ${options.nodeTextColor || options.textColor};
  }

  .node rect,
  .node circle,
  .node ellipse,
  .node polygon,
  .node path {
    fill: ${options.mainBkg};
    stroke: ${options.nodeBorder};
    stroke-width: 1px;
  }
  .rough-node .label text , .node .label text, .image-shape .label, .icon-shape .label {
    text-anchor: middle;
  }
  // .flowchart-label .text-outer-tspan {
  //   text-anchor: middle;
  // }
  // .flowchart-label .text-inner-tspan {
  //   text-anchor: start;
  // }

  .node .katex path {
    fill: #000;
    stroke: #000;
    stroke-width: 1px;
  }

  .rough-node .label,.node .label, .image-shape .label, .icon-shape .label {
    text-align: center;
  }
  .node.clickable {
    cursor: pointer;
  }


  .root .anchor path {
    fill: ${options.lineColor} !important;
    stroke-width: 0;
    stroke: ${options.lineColor};
  }

  .arrowheadPath {
    fill: ${options.arrowheadColor};
  }

  .edgePath .path {
    stroke: ${options.lineColor};
    stroke-width: 2.0px;
  }

  .flowchart-link {
    stroke: ${options.lineColor};
    fill: none;
  }

  .edgeLabel {
    background-color: ${options.edgeLabelBackground};
    p {
      background-color: ${options.edgeLabelBackground};
    }
    rect {
      opacity: 0.5;
      background-color: ${options.edgeLabelBackground};
      fill: ${options.edgeLabelBackground};
    }
    text-align: center;
  }

  /* For html labels only */
  .labelBkg {
    background-color: ${fade(options.edgeLabelBackground, 0.5)};
    // background-color:
  }

  .cluster rect {
    fill: ${options.clusterBkg};
    stroke: ${options.clusterBorder};
    stroke-width: 1px;
  }

  .cluster text {
    fill: ${options.titleColor};
  }

  .cluster span {
    color: ${options.titleColor};
  }
  /* .cluster div {
    color: ${options.titleColor};
  } */

  div.mermaidTooltip {
    position: absolute;
    text-align: center;
    max-width: 200px;
    padding: 2px;
    font-family: ${options.fontFamily};
    font-size: 12px;
    background: ${options.tertiaryColor};
    border: 1px solid ${options.border2};
    border-radius: 2px;
    pointer-events: none;
    z-index: 100;
  }

  .flowchartTitleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${options.textColor};
  }

  rect.text {
    fill: none;
    stroke-width: 0;
  }

  .icon-shape, .image-shape {
    background-color: ${options.edgeLabelBackground};
    p {
      background-color: ${options.edgeLabelBackground};
      padding: 2px;
    }
    rect {
      opacity: 0.5;
      background-color: ${options.edgeLabelBackground};
      fill: ${options.edgeLabelBackground};
    }
    text-align: center;
  }
`, "getStyles");
var styles_default = getStyles;

// src/diagrams/flowchart/flowDiagram.ts
var diagram = {
  parser: flow_default,
  db: flowDb_default,
  renderer: flowRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    if (cnf.layout) {
      setConfig({ layout: cnf.layout });
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowDb_default.clear();
    flowDb_default.setGen("gen-2");
  }, "init")
};
export {
  diagram
};
