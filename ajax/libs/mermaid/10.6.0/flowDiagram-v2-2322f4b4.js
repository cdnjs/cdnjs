import { p as e, f as o } from "./flowDb-81211f6b.js";
import { f as t, g as a } from "./styles-b9dbf4ed.js";
import { t as s } from "./mermaid-c2fb2af7.js";
import "./layout-1c860ba8.js";
import "./index-dc7010be.js";
import "./edges-6f4cf161.js";
import "./createText-f99b4cea.js";
import "./line-3446947e.js";
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
