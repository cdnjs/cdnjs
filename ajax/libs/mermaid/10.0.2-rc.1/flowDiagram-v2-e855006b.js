import { p as parser, f as flowDb } from "./add-html-label-8eac770d.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-dca945c5.js";
import { h as setConfig } from "./config-b4fa35bb.js";
import "./utils-872dfc50.js";
import "./setupGraphViewbox-16a0ba81.js";
import "./commonDb-7f40ab5a.js";
import "./mermaidAPI-a66ccec5.js";
import "./errorRenderer-ebf63d74.js";
import "./isPlainObject-a444bea3.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./layout-158ba943.js";
import "./index-809649c2.js";
import "./edges-d75762d7.js";
import "./svgDraw-6ad7bfe1.js";
import "./selectAll-b147441f.js";
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
//# sourceMappingURL=flowDiagram-v2-e855006b.js.map
