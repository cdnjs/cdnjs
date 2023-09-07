import { p as e, f as o } from "./flowDb-20d6d7d4.js";
import { f as t, g as a } from "./styles-d31f2c67.js";
import { t as s } from "./mermaid-2aa9f9d3.js";
import "./layout-5e3bc0fc.js";
import "./index-31824900.js";
import "./edges-4eab8f28.js";
import "./createText-4209acc9.js";
import "./line-f7faaa1a.js";
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
