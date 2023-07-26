import { p as parser, f as flowDb } from "./flowDb-7a27455c.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-8ef4cf23.js";
import { u as setConfig } from "./mermaid-766fee4c.js";
import "./layout-cc6d5710.js";
import "./index-4ba10627.js";
import "./edges-df708b89.js";
import "./createText-2c3b104b.js";
import "./svgDraw-f57324fe.js";
import "./line-cdadca5f.js";
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
