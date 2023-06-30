import { p as e, f as o } from "./flowDb-2dd08e93.js";
import { f as t, g as a } from "./styles-fd47dd48.js";
import { u as s } from "./mermaid-f9e1d345.js";
import "./layout-20b8b9d3.js";
import "./index-d32e8c46.js";
import "./edges-ad979fa7.js";
import "./createText-3056e4e3.js";
import "./svgDraw-008784ed.js";
import "./line-08ce83d5.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-1ca3f704.js";
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
