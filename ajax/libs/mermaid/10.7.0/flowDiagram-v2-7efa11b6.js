import { p as e, f as o } from "./flowDb-0bfef4f8.js";
import { f as t, g as a } from "./styles-81fcde1e.js";
import { t as s } from "./mermaid-ee29d047.js";
import "./layout-56edf4e8.js";
import "./index-5e9361c0.js";
import "./edges-13d9e871.js";
import "./createText-abfe125e.js";
import "./line-0dd38c26.js";
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
