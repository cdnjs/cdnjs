import { p as parser, f as flowDb } from "./flowDb-cf2c7b50.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-cfcfe3d2.js";
import { i as setConfig } from "./commonDb-89160e91.js";
import "./utils-1aebe9b6.js";
import "./mermaidAPI-b1da2278.js";
import "./layout-50eed59a.js";
import "./index-2385d712.js";
import "./edges-b51cdd98.js";
import "./createText-4d638299.js";
import "./svgDraw-dd61ddfa.js";
import "./line-fbe8f138.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./selectAll-7c7a6d44.js";
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
//# sourceMappingURL=flowDiagram-v2-d7225c85.js.map
