import { p as e, f as o } from "./flowDb-75f44c3b.js";
import { f as t, g as a } from "./styles-4e208409.js";
import { t as s } from "./mermaid-8d01e515.js";
import "./layout-05534f1b.js";
import "./index-59883ea8.js";
import "./edges-55a3dd09.js";
import "./createText-cadb7b3f.js";
import "./line-973c5b8b.js";
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
