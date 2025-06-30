import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-GOYUR5SG.mjs";
import "./chunk-HPOVUXKZ.mjs";
import "./chunk-BRE4QBWZ.mjs";
import "./chunk-AEN23PCK.mjs";
import "./chunk-NUTPFWZB.mjs";
import "./chunk-DS2CGKN3.mjs";
import "./chunk-YL523NDC.mjs";
import "./chunk-7N6UNFX7.mjs";
import "./chunk-F7MYA6JM.mjs";
import {
  __name
} from "./chunk-BMRFU3JQ.mjs";

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
