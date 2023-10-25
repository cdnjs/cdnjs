import { p as parser, f as flowDb } from "./flowDb-98fc3877.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-e9091698.js";
import { t as setConfig } from "./mermaid-e42d37a0.js";
import "./layout-fa5fa804.js";
import "./index-b9fee07a.js";
import "./edges-2823b089.js";
import "./createText-13a582be.js";
import "./line-4dac5d36.js";
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
