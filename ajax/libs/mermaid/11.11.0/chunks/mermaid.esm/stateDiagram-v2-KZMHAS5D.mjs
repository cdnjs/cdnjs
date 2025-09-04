import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-RZ6K4I6V.mjs";
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
