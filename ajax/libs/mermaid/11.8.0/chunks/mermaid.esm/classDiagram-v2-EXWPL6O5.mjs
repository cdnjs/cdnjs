import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-S7DX7DFU.mjs";
import "./chunk-SCLVSU6P.mjs";
import "./chunk-4FAEZMD3.mjs";
import "./chunk-MMEYTEFI.mjs";
import "./chunk-MG6GQBJK.mjs";
import "./chunk-QPUYNVSK.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-X5UWI3TU.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-5PTZTJ2S.mjs";
import "./chunk-XHPWOR6L.mjs";
import "./chunk-DVXNQI2Z.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-GA7OR7NX.mjs";
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
