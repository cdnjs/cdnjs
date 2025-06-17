import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-AEK57VVT.mjs";
import "./chunk-RZ5BOZE2.mjs";
import "./chunk-TYCBKAJE.mjs";
import "./chunk-IIMUDSI4.mjs";
import "./chunk-VV3M67IP.mjs";
import "./chunk-HRU6DDCH.mjs";
import "./chunk-K557N5IZ.mjs";
import "./chunk-H2D2JQ3I.mjs";
import "./chunk-C3MQ5ANM.mjs";
import "./chunk-O4NI6UNU.mjs";
import {
  __name
} from "./chunk-YTJNT7DU.mjs";

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
