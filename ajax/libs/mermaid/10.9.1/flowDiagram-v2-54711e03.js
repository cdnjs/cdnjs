import { p as parser, f as flowDb } from "./flowDb-ba9bd7fa.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-727cdd61.js";
import { u as setConfig } from "./mermaid-dcacb631.js";
import "./graph-fe24fab6.js";
import "./index-fc479858.js";
import "./layout-163b9689.js";
import "./clone-9ea6bfeb.js";
import "./edges-ce5cfb7c.js";
import "./createText-b70fe78a.js";
import "./line-87f517ef.js";
import "./array-b7dcf730.js";
import "./path-39bad7e2.js";
import "./channel-f9001828.js";
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
