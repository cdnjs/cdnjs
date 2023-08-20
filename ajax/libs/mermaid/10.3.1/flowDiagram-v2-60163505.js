import { p as parser, f as flowDb } from "./flowDb-a18fdd2a.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-5664cd4f.js";
import { u as setConfig } from "./mermaid-a918c5c0.js";
import "./layout-9d8f8f12.js";
import "./index-e3189d15.js";
import "./edges-46e4f833.js";
import "./createText-24393182.js";
import "./svgDraw-d3f2a258.js";
import "./line-b5e58ece.js";
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
