import { p as e, f as o } from "./flowDb-1d600296.js";
import { f as t, g as a } from "./styles-472dd00e.js";
import { u as s } from "./mermaid-d733041c.js";
import "./layout-df07420e.js";
import "./index-c449e2c7.js";
import "./edges-6be02a86.js";
import "./createText-98e4790d.js";
import "./svgDraw-8c7d5329.js";
import "./line-b0ce4b23.js";
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
