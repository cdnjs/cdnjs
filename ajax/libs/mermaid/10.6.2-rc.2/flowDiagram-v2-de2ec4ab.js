import { p as e, f as o } from "./flowDb-0edb55bb.js";
import { f as t, g as a } from "./styles-6d5a864a.js";
import { t as s } from "./mermaid-635594ce.js";
import "./layout-67a2723a.js";
import "./index-b66f4828.js";
import "./edges-ab2964ed.js";
import "./createText-e0cdef87.js";
import "./line-5fd5224c.js";
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
