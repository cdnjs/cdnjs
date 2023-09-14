import { p as e, f as o } from "./flowDb-26b67297.js";
import { f as t, g as a } from "./styles-2de18e98.js";
import { t as s } from "./mermaid-252479bb.js";
import "./layout-469a6ab9.js";
import "./index-d3bcc01b.js";
import "./edges-48de0a28.js";
import "./createText-066873a1.js";
import "./line-c57e7b20.js";
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
