import { p as parser, f as flowDb } from "./flowDb-ab4144b2.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-8f10a3c1.js";
import { u as setConfig } from "./mermaid-4b4b971d.js";
import "./layout-e57aec3f.js";
import "./index-f7dc402e.js";
import "./edges-a0c69811.js";
import "./createText-b06b2794.js";
import "./svgDraw-1b15aedc.js";
import "./line-53c588d2.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-f3da6cb0.js";
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
