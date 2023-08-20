import { p as e, f as o } from "./flowDb-03a8f48d.js";
import { f as t, g as a } from "./styles-cb6bcb55.js";
import { u as s } from "./mermaid-7e6c58c3.js";
import "./layout-2be1671e.js";
import "./index-c821dd4c.js";
import "./edges-55004f96.js";
import "./createText-c64d47ca.js";
import "./svgDraw-3570afd5.js";
import "./line-331572f9.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
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
