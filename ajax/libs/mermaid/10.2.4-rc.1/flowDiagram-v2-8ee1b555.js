import { p as parser, f as flowDb } from "./flowDb-54f0defa.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-2c881d9d.js";
import { u as setConfig } from "./mermaid-21949a01.js";
import "./layout-950cf54e.js";
import "./index-2b71bec7.js";
import "./edges-2111e03a.js";
import "./createText-ef907cb5.js";
import "./svgDraw-d2612c91.js";
import "./line-9387b160.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-e0cb2982.js";
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
