import { p as parser, f as flowDb } from "./add-html-label-51612b6a.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-ffe62e6c.js";
import { h as setConfig } from "./config-b4fa35bb.js";
import "./utils-872dfc50.js";
import "./setupGraphViewbox-16a0ba81.js";
import "./commonDb-7f40ab5a.js";
import "./mermaidAPI-2357847b.js";
import "./errorRenderer-ebf63d74.js";
import "./isPlainObject-18bec547.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./layout-62e2930e.js";
import "./index-ba54b3e3.js";
import "./edges-1068568e.js";
import "./svgDraw-ec7cd827.js";
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
//# sourceMappingURL=flowDiagram-v2-9e080dce.js.map
