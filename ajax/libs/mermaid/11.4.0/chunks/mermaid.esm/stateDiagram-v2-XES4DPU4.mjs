import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-AE24M7GS.mjs";
import "./chunk-KGVUR73X.mjs";
import "./chunk-3UPVGKO7.mjs";
import "./chunk-FQ64OR5F.mjs";
import "./chunk-E5O2ULER.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-U274GMTD.mjs";
import "./chunk-F2NGE46Y.mjs";
import "./chunk-TVJ2DRIE.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-M7TDSP4I.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

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
