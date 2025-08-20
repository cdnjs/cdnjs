import { p as parser, f as flowDb } from "./flowDb-0b641388.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-49ff09da.js";
import { u as setConfig } from "./mermaid-4d916eb6.js";
import "./graph-03572d9e.js";
import "./index-9896b085.js";
import "./layout-88d04346.js";
import "./clone-10868998.js";
import "./edges-9967bbb2.js";
import "./createText-098dba42.js";
import "./line-e4c85ea0.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-bf5394f6.js";
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
