import { p as e, f as o } from "./flowDb-a0fd579e.js";
import { f as t, g as a } from "./styles-85d3a00b.js";
import { u as s } from "./mermaid-ebb4e3f3.js";
import "./layout-b511e79d.js";
import "./index-b67252a9.js";
import "./edges-c2ac7d47.js";
import "./createText-13c656ab.js";
import "./svgDraw-9788a2cc.js";
import "./line-bc199cff.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-09331676.js";
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
