import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-NOLL7BTH.mjs";
import "./chunk-FOZUH6DQ.mjs";
import "./chunk-RKBYWBGH.mjs";
import "./chunk-S53Z4TL4.mjs";
import "./chunk-HAKAEWLD.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-2GEBMJTE.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-ZM34AICB.mjs";
import "./chunk-NJFTO43U.mjs";
import "./chunk-YI45AO2Z.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-MLCAUZSU.mjs";
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
