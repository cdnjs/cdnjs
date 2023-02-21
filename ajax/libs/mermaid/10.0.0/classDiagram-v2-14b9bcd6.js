import { p as parser, d as db, s as styles } from "./styles-65b0ba63.js";
import { l as log, g as getConfig, f as select, e as common } from "./config-69acf485.js";
import { G as Graph } from "./index-f31f2880.js";
import { r as render } from "./index-a81fe323.js";
import { u as utils, z as interpolateToCurve, x as curveLinear, y as getStylesFromArray } from "./utils-f7327cf6.js";
import { s as setupGraphViewbox } from "./setupGraphViewbox-7e84bca9.js";
import "./mermaidAPI-26e20305.js";
import "./errorRenderer-11af1d78.js";
import "./commonDb-79d171e7.js";
import "./isPlainObject-31787f80.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./edges-7f71a4e6.js";
import "./svgDraw-ab1cb17f.js";
const sanitizeText = (txt) => common.sanitizeText(txt, getConfig());
let conf = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10
};
const addClasses = function(classes, g, _id, diagObj) {
  const keys = Object.keys(classes);
  log.info("keys:", keys);
  log.info(classes);
  keys.forEach(function(id) {
    const vertex = classes[id];
    let cssClassStr = "";
    if (vertex.cssClasses.length > 0) {
      cssClassStr = cssClassStr + " " + vertex.cssClasses.join(" ");
    }
    const styles2 = { labelStyle: "" };
    let vertexText = vertex.text !== void 0 ? vertex.text : vertex.id;
    let radious = 0;
    let _shape = "";
    switch (vertex.type) {
      case "class":
        _shape = "class_box";
        break;
      default:
        _shape = "class_box";
    }
    g.setNode(vertex.id, {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: sanitizeText(vertexText),
      classData: vertex,
      rx: radious,
      ry: radious,
      class: cssClassStr,
      style: styles2.style,
      id: vertex.id,
      domId: vertex.domId,
      tooltip: diagObj.db.getTooltip(vertex.id) || "",
      haveCallback: vertex.haveCallback,
      link: vertex.link,
      width: vertex.type === "group" ? 500 : void 0,
      type: vertex.type,
      padding: getConfig().flowchart.padding
    });
    log.info("setNode", {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: vertexText,
      rx: radious,
      ry: radious,
      class: cssClassStr,
      style: styles2.style,
      id: vertex.id,
      width: vertex.type === "group" ? 500 : void 0,
      type: vertex.type,
      padding: getConfig().flowchart.padding
    });
  });
};
const addNotes = function(notes, g, startEdgeId, classes) {
  log.info(notes);
  notes.forEach(function(note, i) {
    const vertex = note;
    let cssNoteStr = "";
    const styles2 = { labelStyle: "", style: "" };
    let vertexText = vertex.text;
    let radious = 0;
    let _shape = "note";
    g.setNode(vertex.id, {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: sanitizeText(vertexText),
      noteData: vertex,
      rx: radious,
      ry: radious,
      class: cssNoteStr,
      style: styles2.style,
      id: vertex.id,
      domId: vertex.id,
      tooltip: "",
      type: "note",
      padding: getConfig().flowchart.padding
    });
    log.info("setNode", {
      labelStyle: styles2.labelStyle,
      shape: _shape,
      labelText: vertexText,
      rx: radious,
      ry: radious,
      style: styles2.style,
      id: vertex.id,
      type: "note",
      padding: getConfig().flowchart.padding
    });
    if (!vertex.class || !(vertex.class in classes)) {
      return;
    }
    const edgeId = startEdgeId + i;
    const edgeData = {};
    edgeData.classes = "relation";
    edgeData.pattern = "dotted";
    edgeData.id = `edgeNote${edgeId}`;
    edgeData.arrowhead = "none";
    log.info(`Note edge: ${JSON.stringify(edgeData)}, ${JSON.stringify(vertex)}`);
    edgeData.startLabelRight = "";
    edgeData.endLabelLeft = "";
    edgeData.arrowTypeStart = "none";
    edgeData.arrowTypeEnd = "none";
    let style = "fill:none";
    let labelStyle = "";
    edgeData.style = style;
    edgeData.labelStyle = labelStyle;
    edgeData.curve = interpolateToCurve(conf.curve, curveLinear);
    g.setEdge(vertex.id, vertex.class, edgeData, edgeId);
  });
};
const addRelations = function(relations, g) {
  const conf2 = getConfig().flowchart;
  let cnt = 0;
  relations.forEach(function(edge) {
    cnt++;
    const edgeData = {};
    edgeData.classes = "relation";
    edgeData.pattern = edge.relation.lineType == 1 ? "dashed" : "solid";
    edgeData.id = "id" + cnt;
    if (edge.type === "arrow_open") {
      edgeData.arrowhead = "none";
    } else {
      edgeData.arrowhead = "normal";
    }
    log.info(edgeData, edge);
    edgeData.startLabelRight = edge.relationTitle1 === "none" ? "" : edge.relationTitle1;
    edgeData.endLabelLeft = edge.relationTitle2 === "none" ? "" : edge.relationTitle2;
    edgeData.arrowTypeStart = getArrowMarker(edge.relation.type1);
    edgeData.arrowTypeEnd = getArrowMarker(edge.relation.type2);
    let style = "";
    let labelStyle = "";
    if (edge.style !== void 0) {
      const styles2 = getStylesFromArray(edge.style);
      style = styles2.style;
      labelStyle = styles2.labelStyle;
    } else {
      style = "fill:none";
    }
    edgeData.style = style;
    edgeData.labelStyle = labelStyle;
    if (edge.interpolate !== void 0) {
      edgeData.curve = interpolateToCurve(edge.interpolate, curveLinear);
    } else if (relations.defaultInterpolate !== void 0) {
      edgeData.curve = interpolateToCurve(relations.defaultInterpolate, curveLinear);
    } else {
      edgeData.curve = interpolateToCurve(conf2.curve, curveLinear);
    }
    edge.text = edge.title;
    if (edge.text === void 0) {
      if (edge.style !== void 0) {
        edgeData.arrowheadStyle = "fill: #333";
      }
    } else {
      edgeData.arrowheadStyle = "fill: #333";
      edgeData.labelpos = "c";
      if (getConfig().flowchart.htmlLabels) {
        edgeData.labelType = "html";
        edgeData.label = '<span class="edgeLabel">' + edge.text + "</span>";
      } else {
        edgeData.labelType = "text";
        edgeData.label = edge.text.replace(common.lineBreakRegex, "\n");
        if (edge.style === void 0) {
          edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none";
        }
        edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
      }
    }
    g.setEdge(edge.id1, edge.id2, edgeData, cnt);
  });
};
const setConf = function(cnf) {
  const keys = Object.keys(cnf);
  keys.forEach(function(key) {
    conf[key] = cnf[key];
  });
};
const draw = function(text, id, _version, diagObj) {
  log.info("Drawing class - ", id);
  const conf2 = getConfig().flowchart;
  const securityLevel = getConfig().securityLevel;
  log.info("config:", conf2);
  const nodeSpacing = conf2.nodeSpacing || 50;
  const rankSpacing = conf2.rankSpacing || 50;
  const g = new Graph({
    multigraph: true,
    compound: true
  }).setGraph({
    rankdir: diagObj.db.getDirection(),
    nodesep: nodeSpacing,
    ranksep: rankSpacing,
    marginx: 8,
    marginy: 8
  }).setDefaultEdgeLabel(function() {
    return {};
  });
  const classes = diagObj.db.getClasses();
  const relations = diagObj.db.getRelations();
  const notes = diagObj.db.getNotes();
  log.info(relations);
  addClasses(classes, g, id, diagObj);
  addRelations(relations, g);
  addNotes(notes, g, relations.length + 1, classes);
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select("#i" + id);
  }
  const root = securityLevel === "sandbox" ? select(sandboxElement.nodes()[0].contentDocument.body) : select("body");
  const svg = root.select(`[id="${id}"]`);
  const element = root.select("#" + id + " g");
  render(
    element,
    g,
    ["aggregation", "extension", "composition", "dependency", "lollipop"],
    "classDiagram",
    id
  );
  utils.insertTitle(svg, "classTitleText", conf2.titleTopMargin, diagObj.db.getDiagramTitle());
  setupGraphViewbox(g, svg, conf2.diagramPadding, conf2.useMaxWidth);
  if (!conf2.htmlLabels) {
    const doc = securityLevel === "sandbox" ? sandboxElement.nodes()[0].contentDocument : document;
    const labels = doc.querySelectorAll('[id="' + id + '"] .edgeLabel .label');
    for (const label of labels) {
      const dim = label.getBBox();
      const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("rx", 0);
      rect.setAttribute("ry", 0);
      rect.setAttribute("width", dim.width);
      rect.setAttribute("height", dim.height);
      label.insertBefore(rect, label.firstChild);
    }
  }
};
function getArrowMarker(type) {
  let marker;
  switch (type) {
    case 0:
      marker = "aggregation";
      break;
    case 1:
      marker = "extension";
      break;
    case 2:
      marker = "composition";
      break;
    case 3:
      marker = "dependency";
      break;
    case 4:
      marker = "lollipop";
      break;
    default:
      marker = "none";
  }
  return marker;
}
const renderer = {
  setConf,
  draw
};
const diagram = {
  parser,
  db,
  renderer,
  styles,
  init: (cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    db.clear();
  }
};
export {
  diagram
};
//# sourceMappingURL=classDiagram-v2-14b9bcd6.js.map
