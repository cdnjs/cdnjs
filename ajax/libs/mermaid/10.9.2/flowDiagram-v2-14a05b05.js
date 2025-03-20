import { p as e, f as o } from "./flowDb-eb72ec24.js";
import { f as t, g as a } from "./styles-7f9bfd39.js";
import { u as i } from "./mermaid-1fcb8b31.js";
import "./graph-71d8872f.js";
import "./index-86c44211.js";
import "./layout-8444cf3b.js";
import "./clone-e3dc8f2f.js";
import "./edges-83606b8f.js";
import "./createText-a0fe220c.js";
import "./line-c65adc04.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
import "./channel-d29179aa.js";
const M = {
  parser: e,
  db: o,
  renderer: t,
  styles: a,
  init: (r) => {
    r.flowchart || (r.flowchart = {}), r.flowchart.arrowMarkerAbsolute = r.arrowMarkerAbsolute, i({ flowchart: { arrowMarkerAbsolute: r.arrowMarkerAbsolute } }), t.setConf(r.flowchart), o.clear(), o.setGen("gen-2");
  }
};
export {
  M as diagram
};
