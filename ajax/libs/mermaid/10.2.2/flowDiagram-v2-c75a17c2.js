import { p as e, f as o } from "./flowDb-4e7c4aec.js";
import { f as t, g as a } from "./styles-1557db13.js";
import { u as s } from "./mermaid-08b2ff5f.js";
import "./layout-1171b506.js";
import "./index-bf86b901.js";
import "./edges-8c2fb38e.js";
import "./createText-34ecf23e.js";
import "./svgDraw-39291d2f.js";
import "./line-47adbd5d.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-776a0c51.js";
const A = {
  parser: e,
  db: o,
  renderer: t,
  styles: a,
  init: (r) => {
    r.flowchart || (r.flowchart = {}), r.flowchart.arrowMarkerAbsolute = r.arrowMarkerAbsolute, s({ flowchart: { arrowMarkerAbsolute: r.arrowMarkerAbsolute } }), t.setConf(r.flowchart), o.clear(), o.setGen("gen-2");
  }
};
export {
  A as diagram
};
