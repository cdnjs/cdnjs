import { p as e, f as o } from "./flowDb-9a89ea33.js";
import { f as t, g as a } from "./styles-e75131e4.js";
import { u as i } from "./mermaid-9f2aa176.js";
import "./graph-0ee63739.js";
import "./index-bb6d8841.js";
import "./layout-fd473db2.js";
import "./clone-afc2f047.js";
import "./edges-16357fde.js";
import "./createText-03b82060.js";
import "./line-24d93f1b.js";
import "./array-2ff2c7a6.js";
import "./path-428ebac9.js";
import "./channel-ebbc4130.js";
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
