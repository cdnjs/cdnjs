import { p as parser, f as flowDb } from "./flowDb-1eee23f7.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-54d17f25.js";
import { t as setConfig } from "./mermaid-e34b92d5.js";
import "./layout-839e5077.js";
import "./index-278968f8.js";
import "./edges-2d591174.js";
import "./createText-38c84005.js";
import "./line-52f5ded7.js";
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
