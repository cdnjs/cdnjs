import { p as e, f as o } from "./flowDb-b96f714d.js";
import { f as t, g as a } from "./styles-313a4a41.js";
import { u as s } from "./mermaid-8ea29a40.js";
import "./layout-3ecfba7d.js";
import "./index-e1d945fd.js";
import "./edges-b5d62f50.js";
import "./createText-f4a1d776.js";
import "./svgDraw-b2141e90.js";
import "./line-130fa1e5.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-92b901d1.js";
const A = {
  parser: e,
  db: o,
  renderer: t,
  styles: a,
  init: (r) => {
    r.flowchart || (r.flowchart = {}), r.flowchart.arrowMarkerAbsolute = r.arrowMarkerAbsolute, s({ flowchart: { arrowMarkerAbsolute: r.arrowMarkerAbsolute } }), t.setConf(r.flowchart), o.clear(), o.setGen("gen-2");
  }
};
export {
  A as diagram
};
