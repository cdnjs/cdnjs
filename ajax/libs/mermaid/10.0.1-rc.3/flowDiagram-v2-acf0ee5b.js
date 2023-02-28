import { p as parser, f as flowDb } from "./add-html-label-157170b7.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-2cfa16f0.js";
import { h as setConfig } from "./config-6850764f.js";
import "./utils-bd4440bf.js";
import "./setupGraphViewbox-7dc9988d.js";
import "./commonDb-2e421fa4.js";
import "./mermaidAPI-fcd8480a.js";
import "./errorRenderer-72a9157f.js";
import "./isPlainObject-5588410a.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./layout-9277e4e9.js";
import "./index-0ca4e36b.js";
import "./edges-e151653b.js";
import "./svgDraw-58d6fd15.js";
import "./selectAll-20135765.js";
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
//# sourceMappingURL=flowDiagram-v2-acf0ee5b.js.map
