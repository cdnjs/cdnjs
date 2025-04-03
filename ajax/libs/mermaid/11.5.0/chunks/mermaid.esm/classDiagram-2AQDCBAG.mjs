import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-QSL4ZBBU.mjs";
import "./chunk-TYVWEU6W.mjs";
import "./chunk-7FBYRRDF.mjs";
import "./chunk-IGXODGKB.mjs";
import "./chunk-L72FIZ47.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-J27IQOO4.mjs";
import "./chunk-IMEVYGKY.mjs";
import "./chunk-24TQISEA.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-TCSJUOMA.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

// src/diagrams/class/classDiagram.ts
var diagram = {
  parser: classDiagram_default,
  get db() {
    return new ClassDB();
  },
  renderer: classRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
