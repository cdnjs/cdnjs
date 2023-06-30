import { p as parser, f as flowDb } from "./flowDb-85a8ec50.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-8707656d.js";
import { u as setConfig } from "./mermaid-d4cb7d83.js";
import "./layout-003fc995.js";
import "./index-83e4f7ce.js";
import "./edges-a0303f04.js";
import "./createText-fae126d3.js";
import "./svgDraw-6bc55079.js";
import "./line-9f93e78a.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-11be62c2.js";
const diagram = {
  parser,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
