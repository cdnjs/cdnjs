import {
  classDb_default,
  classDiagram_default,
  styles_default
} from "./chunk-SLR5LO6Q.mjs";
import {
  render
} from "./chunk-7X5N4G4X.mjs";
import "./chunk-ILFCNAY3.mjs";
import "./chunk-UBK4ATPH.mjs";
import {
  Graph
} from "./chunk-6VGLYYIQ.mjs";
import "./chunk-GI3XPZAN.mjs";
import {
  getStylesFromArray,
  interpolateToCurve,
  utils_default
} from "./chunk-43ZLPYW7.mjs";
import "./chunk-4RVYQ3EB.mjs";
import "./chunk-BHRT2E43.mjs";
import {
  __name,
  common_default,
  getConfig2 as getConfig,
  linear_default,
  log,
  select_default,
  setupGraphViewbox
} from "./chunk-T24N4LJA.mjs";

// src/diagrams/class/classRenderer-v2.ts
var sanitizeText = /* @__PURE__ */ __name((txt) => common_default.sanitizeText(txt, getConfig()), "sanitizeText");
var conf = {
  dividerMargin: 10,
  padding: 5,
  textHeight: 10,
  curve: void 0
};
var addNamespaces = /* @__PURE__ */ __name(function(namespaces, g, _id, diagObj) {
  const keys = Object.keys(namespaces);
  log.info("keys:", keys);
  log.info(namespaces);
  keys.forEach(function(id) {
    const vertex = namespaces[id];
    const shape = "rect";
    const node = {
      shape,
      id: vertex.id,
      domId: vertex.domId,
      labelText: sanitizeText(vertex.id),
      labelStyle: "",
      style: "fill: none; stroke: black",
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: getConfig().flowchart?.padding ?? getConfig().class?.padding
    };
    g.setNode(vertex.id, node);
    addClasses(vertex.classes, g, _id, diagObj, vertex.id);
    log.info("setNode", node);
  });
}, "addNamespaces");
var addClasses = /* @__PURE__ */ __name(function(classes, g, _id, diagObj, parent) {
  const keys = Object.keys(classes);
  log.info("keys:", keys);
  log.info(classes);
  keys.filter((id) => classes[id].parent == parent).forEach(function(id) {
    const vertex = classes[id];
    const cssClassStr = vertex.cssClasses.join(" ");
    const styles = { labelStyle: "", style: "" };
    const vertexText = vertex.label ?? vertex.id;
    const radius = 0;
    const shape = "class_box";
    const node = {
      labelStyle: styles.labelStyle,
      shape,
      labelText: sanitizeText(vertexText),
      classData: vertex,
      rx: radius,
      ry: radius,
      class: cssClassStr,
      style: styles.style,
      id: vertex.id,
      domId: vertex.domId,
      tooltip: diagObj.db.getTooltip(vertex.id, parent) || "",
      haveCallback: vertex.haveCallback,
      link: vertex.link,
      width: vertex.type === "group" ? 500 : void 0,
      type: vertex.type,
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: getConfig().flowchart?.padding ?? getConfig().class?.padding
    };
    g.setNode(vertex.id, node);
    if (parent) {
      g.setParent(vertex.id, parent);
    }
    log.info("setNode", node);
  });
}, "addClasses");
var addNotes = /* @__PURE__ */ __name(function(notes, g, startEdgeId, classes) {
  log.info(notes);
  notes.forEach(function(note, i) {
    const vertex = note;
    const cssNoteStr = "";
    const styles = { labelStyle: "", style: "" };
    const vertexText = vertex.text;
    const radius = 0;
    const shape = "note";
    const node = {
      labelStyle: styles.labelStyle,
      shape,
      labelText: sanitizeText(vertexText),
      noteData: vertex,
      rx: radius,
      ry: radius,
      class: cssNoteStr,
      style: styles.style,
      id: vertex.id,
      domId: vertex.id,
      tooltip: "",
      type: "note",
      // TODO V10: Flowchart ? Keeping flowchart for backwards compatibility. Remove in next major release
      padding: getConfig().flowchart?.padding ?? getConfig().class?.padding
    };
    g.setNode(vertex.id, node);
    log.info("setNode", node);
    if (!vertex.class || !(vertex.class in classes)) {
      return;
    }
    const edgeId = startEdgeId + i;
    const edgeData = {
      id: `edgeNote${edgeId}`,
      //Set relationship style and line type
      classes: "relation",
      pattern: "dotted",
      // Set link type for rendering
      arrowhead: "none",
      //Set edge extra labels
      startLabelRight: "",
      endLabelLeft: "",
      //Set relation arrow types
      arrowTypeStart: "none",
      arrowTypeEnd: "none",
      style: "fill:none",
      labelStyle: "",
      curve: interpolateToCurve(conf.curve, linear_default)
    };
    g.setEdge(vertex.id, vertex.class, edgeData, edgeId);
  });
}, "addNotes");
var addRelations = /* @__PURE__ */ __name(function(relations, g) {
  const conf2 = getConfig().flowchart;
  let cnt = 0;
  relations.forEach(function(edge) {
    cnt++;
    const edgeData = {
      //Set relationship style and line type
      classes: "relation",
      pattern: edge.relation.lineType == 1 ? "dashed" : "solid",
      id: `id_${edge.id1}_${edge.id2}_${cnt}`,
      // Set link type for rendering
      arrowhead: edge.type === "arrow_open" ? "none" : "normal",
      //Set edge extra labels
      startLabelRight: edge.relationTitle1 === "none" ? "" : edge.relationTitle1,
      endLabelLeft: edge.relationTitle2 === "none" ? "" : edge.relationTitle2,
      //Set relation arrow types
      arrowTypeStart: getArrowMarker(edge.relation.type1),
      arrowTypeEnd: getArrowMarker(edge.relation.type2),
      style: "fill:none",
      labelStyle: "",
      curve: interpolateToCurve(conf2?.curve, linear_default)
    };
    log.info(edgeData, edge);
    if (edge.style !== void 0) {
      const styles = getStylesFromArray(edge.style);
      edgeData.style = styles.style;
      edgeData.labelStyle = styles.labelStyle;
    }
    edge.text = edge.title;
    if (edge.text === void 0) {
      if (edge.style !== void 0) {
        edgeData.arrowheadStyle = "fill: #333";
      }
    } else {
      edgeData.arrowheadStyle = "fill: #333";
      edgeData.labelpos = "c";
      if (getConfig().flowchart?.htmlLabels ?? getConfig().htmlLabels) {
        edgeData.labelType = "html";
        edgeData.label = '<span class="edgeLabel">' + edge.text + "</span>";
      } else {
        edgeData.labelType = "text";
        edgeData.label = edge.text.replace(common_default.lineBreakRegex, "\n");
        if (edge.style === void 0) {
          edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none";
        }
        edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
      }
    }
    g.setEdge(edge.id1, edge.id2, edgeData, cnt);
  });
}, "addRelations");
var setConf = /* @__PURE__ */ __name(function(cnf) {
  conf = {
    ...conf,
    ...cnf
  };
}, "setConf");
var draw = /* @__PURE__ */ __name(async function(text, id, _version, diagObj) {
  log.info("Drawing class - ", id);
  const conf2 = getConfig().flowchart ?? getConfig().class;
  const securityLevel = getConfig().securityLevel;
  log.info("config:", conf2);
  const nodeSpacing = conf2?.nodeSpacing ?? 50;
  const rankSpacing = conf2?.rankSpacing ?? 50;
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
  const namespaces = diagObj.db.getNamespaces();
  const classes = diagObj.db.getClasses();
  const relations = diagObj.db.getRelations();
  const notes = diagObj.db.getNotes();
  log.info(relations);
  addNamespaces(namespaces, g, id, diagObj);
  addClasses(classes, g, id, diagObj);
  addRelations(relations, g);
  addNotes(notes, g, relations.length + 1, classes);
  let sandboxElement;
  if (securityLevel === "sandbox") {
    sandboxElement = select_default("#i" + id);
  }
  const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
  const svg = root.select(`[id="${id}"]`);
  const element = root.select("#" + id + " g");
  await render(
    element,
    g,
    ["aggregation", "extension", "composition", "dependency", "lollipop"],
    "classDiagram",
    id
  );
  utils_default.insertTitle(svg, "classTitleText", conf2?.titleTopMargin ?? 5, diagObj.db.getDiagramTitle());
  setupGraphViewbox(g, svg, conf2?.diagramPadding, conf2?.useMaxWidth);
  if (!conf2?.htmlLabels) {
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
}, "draw");
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
__name(getArrowMarker, "getArrowMarker");
var classRenderer_v2_default = {
  setConf,
  draw
};

// src/diagrams/class/classDiagram-v2.ts
var diagram = {
  parser: classDiagram_default,
  db: classDb_default,
  renderer: classRenderer_v2_default,
  styles: styles_default,
  init: (cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    classDb_default.clear();
  }
};
export {
  diagram
};
