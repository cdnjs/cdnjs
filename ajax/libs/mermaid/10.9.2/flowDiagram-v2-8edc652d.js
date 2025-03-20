import { p as parser, f as flowDb } from "./flowDb-c651c1c4.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-33ce42fe.js";
import { u as setConfig } from "./mermaid-f9ac9e20.js";
import "./graph-f4d57e7d.js";
import "./index-3a036f99.js";
import "./layout-9426627a.js";
import "./clone-15d89db6.js";
import "./edges-7e353d40.js";
import "./createText-fbf41b59.js";
import "./line-45f13744.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-585a36af.js";
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
