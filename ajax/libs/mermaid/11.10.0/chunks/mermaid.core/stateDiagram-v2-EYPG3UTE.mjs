import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-LXBSTHXV.mjs";
import "./chunk-WVR4S24B.mjs";
import "./chunk-NRVI72HA.mjs";
import "./chunk-NXG7ZM6U.mjs";
import "./chunk-NCRKNZAS.mjs";
import "./chunk-WH6PBGIT.mjs";
import "./chunk-CV3G5MRU.mjs";
import "./chunk-JSVUIEYQ.mjs";
import "./chunk-7RNWAQOT.mjs";
import "./chunk-62K37W7T.mjs";
import "./chunk-U37J5Y7L.mjs";
import {
  __name
} from "./chunk-VIW5F6AA.mjs";

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
