import { p as parser, f as flowDb } from "./flowDb-d1e60c58.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-2793e8b2.js";
import { u as setConfig } from "./mermaid-5545c3f9.js";
import "./layout-c19815a0.js";
import "./index-b5da7a65.js";
import "./edges-12fbaa05.js";
import "./createText-c4d6f03f.js";
import "./svgDraw-c79e1d7d.js";
import "./line-62b84ae2.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-57c75e66.js";
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
