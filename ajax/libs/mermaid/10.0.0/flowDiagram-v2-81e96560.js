import { p as parser, f as flowDb } from "./add-html-label-99f21418.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-c2237eef.js";
import { h as setConfig } from "./config-69acf485.js";
import "./utils-f7327cf6.js";
import "./setupGraphViewbox-7e84bca9.js";
import "./commonDb-79d171e7.js";
import "./mermaidAPI-26e20305.js";
import "./errorRenderer-11af1d78.js";
import "./isPlainObject-31787f80.js";
import "./array-b7dcf730.js";
import "./constant-b644328d.js";
import "./index-f31f2880.js";
import "./index-a81fe323.js";
import "./edges-7f71a4e6.js";
import "./svgDraw-ab1cb17f.js";
import "./selectAll-63396edc.js";
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
//# sourceMappingURL=flowDiagram-v2-81e96560.js.map
