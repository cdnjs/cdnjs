import { p as parser, f as flowDb } from "./flowDb-7f7635cc.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-ad91cc54.js";
import { u as setConfig } from "./mermaid-c66525a4.js";
import "./layout-23ab7ebc.js";
import "./index-ce156fd5.js";
import "./edges-84ec6f60.js";
import "./createText-2f2a343a.js";
import "./svgDraw-d5bb5edb.js";
import "./line-850ff9a1.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-378e90f0.js";
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
