import { p as e, f as o } from "./flowDb-b820d5dc.js";
import { f as t, g as a } from "./styles-1a7a9ff9.js";
import { t as s } from "./mermaid-e4a58915.js";
import "./layout-545b2d5b.js";
import "./index-5f5016a9.js";
import "./edges-020bfa8c.js";
import "./createText-4be7776a.js";
import "./line-4ba3c4fa.js";
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
