import { p as parser, f as flowDb } from "./flowDb-3d0a1362.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-23e67235.js";
import { u as setConfig } from "./mermaid-d088a70a.js";
import "./layout-71dca320.js";
import "./index-59513c53.js";
import "./edges-100593e4.js";
import "./createText-bba40910.js";
import "./svgDraw-d109f02c.js";
import "./line-8c0d1ce4.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-a3888f04.js";
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
