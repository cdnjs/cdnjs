import { p as e, f as o } from "./add-html-label-ce7f9292.js";
import { f as t, a } from "./styles-d461a25b.js";
import { h as i } from "./config-e567ef17.js";
import "./utils-aa888deb.js";
import "./setupGraphViewbox-a4603a92.js";
import "./commonDb-4dc3d465.js";
import "./mermaidAPI-51c0c26b.js";
import "./errorRenderer-a3c4bedb.js";
import "./isPlainObject-bb374f45.js";
import "./array-2ff2c7a6.js";
import "./constant-2fe7eae5.js";
import "./layout-10a68736.js";
import "./index-f4462e28.js";
import "./edges-a2733861.js";
import "./svgDraw-c2c52520.js";
import "./selectAll-8155f162.js";
const y = {
  parser: e,
  db: o,
  renderer: t,
  styles: a,
  init: (r) => {
    r.flowchart || (r.flowchart = {}), r.flowchart.arrowMarkerAbsolute = r.arrowMarkerAbsolute, i({ flowchart: { arrowMarkerAbsolute: r.arrowMarkerAbsolute } }), t.setConf(r.flowchart), o.clear(), o.setGen("gen-2");
  }
};
export {
  y as diagram
};
//# sourceMappingURL=flowDiagram-v2-f8463bb5.js.map
