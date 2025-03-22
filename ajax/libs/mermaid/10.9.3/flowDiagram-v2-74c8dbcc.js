import { p as parser, f as flowDb } from "./flowDb-ce16de8c.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-91e7de3c.js";
import { u as setConfig } from "./mermaid-bea41e51.js";
import "./graph-cdf81e0e.js";
import "./index-ade8a1b6.js";
import "./layout-833f5d09.js";
import "./clone-64cfc140.js";
import "./edges-56c921ab.js";
import "./createText-a21f6bb1.js";
import "./line-ef4db9e4.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-34943bd6.js";
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
