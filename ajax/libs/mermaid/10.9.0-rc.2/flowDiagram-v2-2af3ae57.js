import { p as parser, f as flowDb } from "./flowDb-52df62f3.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-64497a8b.js";
import { u as setConfig } from "./mermaid-c4d264b5.js";
import "./graph-924e7708.js";
import "./index-ae785d24.js";
import "./layout-e520476c.js";
import "./clone-aba7f7b3.js";
import "./edges-2ecd3777.js";
import "./createText-1d1b6558.js";
import "./line-bbe8ce87.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-3613b000.js";
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
