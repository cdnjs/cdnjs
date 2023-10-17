import { p as parser, f as flowDb } from "./flowDb-6f29e09c.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-d9a10dba.js";
import { t as setConfig } from "./mermaid-d5465098.js";
import "./layout-4a0d14b0.js";
import "./index-11d67b20.js";
import "./edges-53e20eb4.js";
import "./createText-6f9f1277.js";
import "./line-e7109911.js";
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
