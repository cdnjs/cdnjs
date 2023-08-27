import { p as parser, f as flowDb } from "./flowDb-3647b264.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-6e9ebeb4.js";
import { u as setConfig } from "./mermaid-f185fde2.js";
import "./layout-7899ed33.js";
import "./index-1bb7dfb9.js";
import "./edges-ecd2ecb8.js";
import "./createText-6836bc4a.js";
import "./svgDraw-092a0897.js";
import "./line-eb9172ee.js";
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
