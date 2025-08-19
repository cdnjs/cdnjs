import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-JRY5QETF.mjs";
import "./chunk-ITLJA4XN.mjs";
import "./chunk-DYEWET5N.mjs";
import "./chunk-MYTZ56J7.mjs";
import "./chunk-UNAYP6HA.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-3AU3J4PQ.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-G7G7YTX4.mjs";
import "./chunk-VNOTBLTU.mjs";
import "./chunk-UKINNZLQ.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-NC4V57XB.mjs";
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
