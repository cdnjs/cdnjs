import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-IUOD7KOP.mjs";
import "./chunk-SCLVSU6P.mjs";
import "./chunk-FOZUH6DQ.mjs";
import "./chunk-RKBYWBGH.mjs";
import "./chunk-S53Z4TL4.mjs";
import "./chunk-HAKAEWLD.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-2GEBMJTE.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-ZM34AICB.mjs";
import "./chunk-NJFTO43U.mjs";
import "./chunk-YI45AO2Z.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-MLCAUZSU.mjs";
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
