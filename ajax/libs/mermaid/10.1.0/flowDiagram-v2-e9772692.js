import { p as parser, f as flowDb } from "./flowDb-bb61b53c.js";
import { f as flowRendererV2, g as flowStyles } from "./styles-fd236c01.js";
import { i as setConfig } from "./commonDb-89160e91.js";
import "./utils-1aebe9b6.js";
import "./mermaidAPI-c841a67f.js";
import "./layout-3ff13c4c.js";
import "./index-c47ff54b.js";
import "./edges-17d4be60.js";
import "./createText-b0d5c0ec.js";
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
//# sourceMappingURL=flowDiagram-v2-e9772692.js.map
