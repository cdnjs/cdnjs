import { p as parser, f as flowDb } from "./flowDb-2e52ea1d.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-a1ab4530.js";
import { u as setConfig } from "./mermaid-107e9a78.js";
import "./layout-93b24b24.js";
import "./index-067562d0.js";
import "./edges-805efb63.js";
import "./createText-4ae4617c.js";
import "./svgDraw-301cd042.js";
import "./line-a2448407.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-6e4f2dbd.js";
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
