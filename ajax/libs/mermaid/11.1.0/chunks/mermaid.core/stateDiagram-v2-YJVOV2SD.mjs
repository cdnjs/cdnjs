import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-W3SRJFPQ.mjs";
import "./chunk-WZBIATSK.mjs";
import "./chunk-GWHMDDHB.mjs";
import "./chunk-NQF7NIBN.mjs";
import "./chunk-ROKYUVCU.mjs";
import "./chunk-23ATMZXV.mjs";
import "./chunk-ZI6V2UE2.mjs";
import "./chunk-2EDTWDYI.mjs";
import {
  __name
} from "./chunk-IIKMQLIC.mjs";

// src/diagrams/state/stateDiagram-v2.ts
var diagram = {
  parser: stateDiagram_default,
  db: stateDb_default,
  renderer: stateRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.state) {
      cnf.state = {};
    }
    cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    stateDb_default.clear();
  }, "init")
};
export {
  diagram
};
