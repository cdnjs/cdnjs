import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-JZAHL7AJ.mjs";
import "./chunk-EICJXIV7.mjs";
import "./chunk-TM57GTNK.mjs";
import "./chunk-SGE5E2BZ.mjs";
import "./chunk-HKLBG3BQ.mjs";
import "./chunk-32DZJKXY.mjs";
import "./chunk-XHTJQHD2.mjs";
import "./chunk-V2CZVG6A.mjs";
import "./chunk-U6O4IJP6.mjs";
import "./chunk-MCANT3UC.mjs";
import {
  __name
} from "./chunk-P27NXTFD.mjs";

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
