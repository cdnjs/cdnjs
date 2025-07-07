import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-QHWODCXN.mjs";
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

// src/diagrams/state/stateDiagram-v2.ts
var diagram = {
  parser: stateDiagram_default,
  get db() {
    return new StateDB(2);
  },
  renderer: stateRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.state) {
      cnf.state = {};
    }
    cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
