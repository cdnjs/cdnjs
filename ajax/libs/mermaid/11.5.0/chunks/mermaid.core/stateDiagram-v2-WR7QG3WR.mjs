import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-4IRHCMPZ.mjs";
import "./chunk-2O5F6CEG.mjs";
import "./chunk-SSJB2B2L.mjs";
import "./chunk-XWQKHCUW.mjs";
import "./chunk-JXS2JFWQ.mjs";
import "./chunk-VRARSN5C.mjs";
import "./chunk-6Q42YGA5.mjs";
import "./chunk-KIRMWWLE.mjs";
import "./chunk-4BQVQIO5.mjs";
import "./chunk-ABD7OU7K.mjs";
import {
  __name
} from "./chunk-O7R7247Q.mjs";

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
