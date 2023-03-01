import { p as parser, f as flowDb } from "./add-html-label-f3a0bd34.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-7d79a37d.js";
import { h as setConfig } from "./config-b4fa35bb.js";
import "./utils-872dfc50.js";
import "./setupGraphViewbox-16a0ba81.js";
import "./commonDb-7f40ab5a.js";
import "./mermaidAPI-a31c2c80.js";
import "./errorRenderer-ebf63d74.js";
import "./isPlainObject-53794b96.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./layout-47a4d1ce.js";
import "./index-70db0a05.js";
import "./edges-3b4dbffd.js";
import "./svgDraw-aae20718.js";
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
//# sourceMappingURL=flowDiagram-v2-1c493a4f.js.map
