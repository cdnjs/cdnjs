import { p as parser, f as flowDb } from "./flowDb-e0e3fd7a.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-82a206d5.js";
import { u as setConfig } from "./mermaid-34beccd0.js";
import "./layout-db328a38.js";
import "./index-714fe675.js";
import "./edges-e08b4480.js";
import "./createText-d34e51c6.js";
import "./svgDraw-591e3474.js";
import "./line-9ed8ba8b.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-c295459b.js";
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
