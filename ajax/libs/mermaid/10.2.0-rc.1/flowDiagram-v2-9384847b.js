import { p as e, f as o } from "./flowDb-6db2189d.js";
import { f as t, g as a } from "./styles-cde70245.js";
import { u as s } from "./mermaid-29dd296b.js";
import "./layout-2ee26998.js";
import "./index-e8442b04.js";
import "./edges-91610ede.js";
import "./createText-742d30a7.js";
import "./svgDraw-69fa6853.js";
import "./line-4e7c049f.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./selectAll-d9baada8.js";
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
