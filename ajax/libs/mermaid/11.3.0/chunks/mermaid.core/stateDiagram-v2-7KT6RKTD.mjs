import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-5RIWM3LS.mjs";
import "./chunk-4LC2V6XN.mjs";
import "./chunk-U2OMI7UW.mjs";
import "./chunk-O5FTX4FK.mjs";
import "./chunk-CTJGIJSU.mjs";
import "./chunk-I3FGKTZ5.mjs";
import "./chunk-U7L4IQIU.mjs";
import "./chunk-TLUHKHBO.mjs";
import {
  __name
} from "./chunk-S24QXQKS.mjs";

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
