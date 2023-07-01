import { p as e, f as o } from "./flowDb-667e91e9.js";
import { f as t, g as a } from "./styles-88253b19.js";
import { u as s } from "./mermaid-1260cb94.js";
import "./layout-bf6c9c10.js";
import "./index-9cfc71d9.js";
import "./edges-9ef2b21b.js";
import "./createText-d9206b7e.js";
import "./svgDraw-f080acf7.js";
import "./line-2acb2eac.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-e2aa769d.js";
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
