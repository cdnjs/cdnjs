import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-RLOJ5SS7.mjs";
import "./chunk-SCLVSU6P.mjs";
import "./chunk-PBUFIUIK.mjs";
import "./chunk-KMWNKJ5C.mjs";
import "./chunk-PBBTAR5V.mjs";
import "./chunk-5LQ36VGT.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-EECOFZZB.mjs";
import "./chunk-BF2ETNBY.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-SSVL3WCV.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

// src/diagrams/class/classDiagram-v2.ts
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
