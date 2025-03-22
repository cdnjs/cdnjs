import { p as e, f as o } from "./flowDb-63accdbc.js";
import { f as t, g as a } from "./styles-c1090ffc.js";
import { u as i } from "./mermaid-5a5980d4.js";
import "./graph-e9862b7e.js";
import "./index-5e3196ce.js";
import "./layout-2e6f21ea.js";
import "./clone-06085faa.js";
import "./edges-16a2be2d.js";
import "./createText-323577ec.js";
import "./line-552be4bc.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
import "./channel-93f63185.js";
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
