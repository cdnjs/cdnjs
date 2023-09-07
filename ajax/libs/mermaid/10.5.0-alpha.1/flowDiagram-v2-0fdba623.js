import { p as parser, f as flowDb } from "./flowDb-5eabb736.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-1af72d42.js";
import { t as setConfig } from "./mermaid-5a2ef2e7.js";
import "./layout-23e7182d.js";
import "./index-b037782b.js";
import "./edges-083732fe.js";
import "./createText-62610a0f.js";
import "./line-e35b108b.js";
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
