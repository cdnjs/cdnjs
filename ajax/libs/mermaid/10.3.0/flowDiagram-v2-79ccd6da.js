import { p as e, f as o } from "./flowDb-a4faf166.js";
import { f as t, g as a } from "./styles-3814544c.js";
import { u as s } from "./mermaid-42f7bf2b.js";
import "./layout-c5a37d74.js";
import "./index-d0b453e2.js";
import "./edges-558884ee.js";
import "./createText-94e3ebbf.js";
import "./svgDraw-af99a425.js";
import "./line-ce5d1152.js";
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
