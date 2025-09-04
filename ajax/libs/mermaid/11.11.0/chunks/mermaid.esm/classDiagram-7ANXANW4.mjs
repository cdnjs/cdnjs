import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-HFAZRO7C.mjs";
import "./chunk-SCLVSU6P.mjs";
import "./chunk-3ZOY36ND.mjs";
import "./chunk-U57ABKDG.mjs";
import "./chunk-EDGLOVWR.mjs";
import "./chunk-XNMDYEEV.mjs";
import "./chunk-XYDUGYMI.mjs";
import "./chunk-WIGNHSP5.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-VRYEIBKM.mjs";
import "./chunk-CGAWHQUF.mjs";
import "./chunk-SPAXJLTM.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-R5S5RMWI.mjs";
import "./chunk-PKVCJXSI.mjs";
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
