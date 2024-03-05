import { p as parser, f as flowDb } from "./flowDb-147da10a.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-c171666c.js";
import { u as setConfig } from "./mermaid-c5809711.js";
import "./graph-af3d5df6.js";
import "./index-c8395ba2.js";
import "./layout-6685625a.js";
import "./clone-d2e37f8c.js";
import "./edges-1e1ebc73.js";
import "./createText-f6615236.js";
import "./line-65d70945.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-d3ac35ac.js";
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
