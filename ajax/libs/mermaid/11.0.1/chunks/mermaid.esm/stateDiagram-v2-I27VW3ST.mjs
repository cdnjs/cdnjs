import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-H45IWRZP.mjs";
import "./chunk-GVMN75T7.mjs";
import "./chunk-6EWVL5FX.mjs";
import "./chunk-F5W4U7WW.mjs";
import "./chunk-X3COATXT.mjs";
import "./chunk-KW7S66XI.mjs";
import "./chunk-FTFGN3TU.mjs";
import "./chunk-54IALGMX.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-HD3LK5B5.mjs";
import "./chunk-DD37ZF33.mjs";
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
