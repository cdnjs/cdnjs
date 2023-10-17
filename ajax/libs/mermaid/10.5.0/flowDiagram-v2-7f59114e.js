import { p as parser, f as flowDb } from "./flowDb-af7c12e0.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-f40f6c66.js";
import { t as setConfig } from "./mermaid-491db2d9.js";
import "./layout-a7b9ff07.js";
import "./index-cc269c15.js";
import "./edges-9bf94b2d.js";
import "./createText-2660bae1.js";
import "./line-8fd2bd69.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
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
