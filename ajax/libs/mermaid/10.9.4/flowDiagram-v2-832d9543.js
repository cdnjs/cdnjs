import { p as e, f as o } from "./flowDb-2e5ba0d2.js";
import { f as t, g as a } from "./styles-b514864b.js";
import { u as i } from "./mermaid-e07dac3d.js";
import "./graph-0f379662.js";
import "./index-7a48438c.js";
import "./layout-67fde652.js";
import "./clone-b6975030.js";
import "./edges-d4a9e74e.js";
import "./createText-908267de.js";
import "./line-6e74982d.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
import "./channel-bc508e47.js";
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
