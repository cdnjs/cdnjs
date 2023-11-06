import { p as parser, f as flowDb } from "./flowDb-7d3dad3c.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-5a52a490.js";
import { t as setConfig } from "./mermaid-8e069ad8.js";
import "./layout-a8f6de6a.js";
import "./index-40c81eee.js";
import "./edges-2dbfd539.js";
import "./createText-8791661f.js";
import "./line-26bf7380.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
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
