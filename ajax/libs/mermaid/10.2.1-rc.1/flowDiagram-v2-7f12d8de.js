import { p as parser, f as flowDb } from "./flowDb-11941109.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-92e415d1.js";
import { u as setConfig } from "./mermaid-67675950.js";
import "./layout-9b88737a.js";
import "./index-4146a43c.js";
import "./edges-53ef138f.js";
import "./createText-3587760b.js";
import "./svgDraw-e45ecc63.js";
import "./line-b130d0fc.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-cb0a16aa.js";
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
