import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-QBDURH3N.mjs";
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
