import { p as e, f as o } from "./add-html-label-d40b2200.js";
import { f as t, a } from "./styles-22f81b94.js";
import { h as i } from "./config-d3eb77a7.js";
import "./utils-9337f219.js";
import "./setupGraphViewbox-b1cfe372.js";
import "./commonDb-cf9156a6.js";
import "./mermaidAPI-5d6b6957.js";
import "./errorRenderer-af58fc57.js";
import "./isPlainObject-adb25d66.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./layout-8379ba19.js";
import "./index-6061220e.js";
import "./edges-dd67c27b.js";
import "./svgDraw-75b72ba1.js";
import "./selectAll-33ad1cfb.js";
const y = {
  parser: e,
  db: o,
  renderer: t,
  styles: a,
  init: (r) => {
    r.flowchart || (r.flowchart = {}), r.flowchart.arrowMarkerAbsolute = r.arrowMarkerAbsolute, i({ flowchart: { arrowMarkerAbsolute: r.arrowMarkerAbsolute } }), t.setConf(r.flowchart), o.clear(), o.setGen("gen-2");
  }
};
export {
  y as diagram
};
//# sourceMappingURL=flowDiagram-v2-ebd7f0c4.js.map
