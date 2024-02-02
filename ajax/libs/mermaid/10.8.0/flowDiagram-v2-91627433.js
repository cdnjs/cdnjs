import { p as e, f as o } from "./flowDb-116e16bb.js";
import { f as t, g as a } from "./styles-7e0c8b80.js";
import { t as i } from "./mermaid-a09fe7cd.js";
import "./graph-940f1512.js";
import "./index-4400e55d.js";
import "./layout-5e46170e.js";
import "./clone-e2cbe4d9.js";
import "./edges-a720f28b.js";
import "./createText-e916aecc.js";
import "./line-0f31738a.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
import "./channel-b111d153.js";
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
