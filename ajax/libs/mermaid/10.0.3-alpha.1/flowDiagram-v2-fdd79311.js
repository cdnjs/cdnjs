import { p as parser, f as flowDb } from "./add-html-label-21980bb0.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-237fa90e.js";
import { h as setConfig } from "./config-59a2f5c3.js";
import "./utils-23df6275.js";
import "./setupGraphViewbox-65b798c7.js";
import "./commonDb-8c8c6330.js";
import "./mermaidAPI-c412b915.js";
import "./errorRenderer-30a07823.js";
import "./isPlainObject-652d3ad5.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./layout-a46fc34c.js";
import "./index-87a3c39e.js";
import "./edges-bf74c2d8.js";
import "./svgDraw-dc4181c2.js";
import "./selectAll-e68e5c64.js";
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
//# sourceMappingURL=flowDiagram-v2-fdd79311.js.map
