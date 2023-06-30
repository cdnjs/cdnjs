import { p as e, f as o } from "./flowDb-0019c359.js";
import { f as t, g as a } from "./styles-9a36b1c0.js";
import { u as s } from "./mermaid-9357f3d0.js";
import "./layout-816c0a3e.js";
import "./index-b9fa59d5.js";
import "./edges-9aecf713.js";
import "./createText-8ca1146d.js";
import "./svgDraw-c2b80d25.js";
import "./line-a77fdd5a.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-9c9e0fdb.js";
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
