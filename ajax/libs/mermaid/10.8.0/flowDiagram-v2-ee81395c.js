import { p as parser, f as flowDb } from "./flowDb-abd5d876.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-bd906223.js";
import { t as setConfig } from "./mermaid-4f066ae1.js";
import "./graph-03626afa.js";
import "./index-b5c99bd1.js";
import "./layout-23a94ccc.js";
import "./clone-0d7cbc00.js";
import "./edges-77d431ff.js";
import "./createText-ac1cb2fc.js";
import "./line-379dbf1c.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-649fb47b.js";
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
