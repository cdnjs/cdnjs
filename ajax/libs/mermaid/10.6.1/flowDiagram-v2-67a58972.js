import { p as e, f as o } from "./flowDb-262ad9dc.js";
import { f as t, g as a } from "./styles-026871b4.js";
import { t as s } from "./mermaid-d06ecb0d.js";
import "./layout-61b0da4f.js";
import "./index-8f0054e7.js";
import "./edges-b7626ef5.js";
import "./createText-8ec3b59b.js";
import "./line-6e3107d9.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
const k = {
  parser: e,
  db: o,
  renderer: t,
  styles: a,
  init: (r) => {
    r.flowchart || (r.flowchart = {}), r.flowchart.arrowMarkerAbsolute = r.arrowMarkerAbsolute, s({ flowchart: { arrowMarkerAbsolute: r.arrowMarkerAbsolute } }), t.setConf(r.flowchart), o.clear(), o.setGen("gen-2");
  }
};
export {
  k as diagram
};
