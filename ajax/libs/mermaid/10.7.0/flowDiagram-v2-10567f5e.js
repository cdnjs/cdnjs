import { p as parser, f as flowDb } from "./flowDb-a32fc02b.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-a35956af.js";
import { t as setConfig } from "./mermaid-354acb24.js";
import "./layout-94e1e85f.js";
import "./index-20c9cf41.js";
import "./edges-9f0d1f4d.js";
import "./createText-77e212b0.js";
import "./line-b015ae81.js";
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
