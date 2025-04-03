import {
  StateDB,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-3STGH65N.mjs";
import "./chunk-TYVWEU6W.mjs";
import "./chunk-7FBYRRDF.mjs";
import "./chunk-IGXODGKB.mjs";
import "./chunk-L72FIZ47.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-J27IQOO4.mjs";
import "./chunk-IMEVYGKY.mjs";
import "./chunk-24TQISEA.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-TCSJUOMA.mjs";
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
