import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-6OLS64BW.mjs";
import "./chunk-BFAMUDN2.mjs";
import "./chunk-SKB7J2MH.mjs";
import "./chunk-27ZLIBVY.mjs";
import "./chunk-CPHRQXFT.mjs";
import "./chunk-MXNHSMXR.mjs";
import "./chunk-Y3GBUOFX.mjs";
import "./chunk-AC5SNWB5.mjs";
import "./chunk-UWXLY5YG.mjs";
import "./chunk-QESNASVV.mjs";
import "./chunk-55PJQP7W.mjs";
import {
  __name
} from "./chunk-3XYRH5AP.mjs";

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
