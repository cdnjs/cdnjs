import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-WO6OZ4WK.mjs";
import "./chunk-ZSF2CFIE.mjs";
import "./chunk-PW4I2ZZ4.mjs";
import "./chunk-CZNOFAJR.mjs";
import "./chunk-TPF7GGO3.mjs";
import "./chunk-KW7S66XI.mjs";
import "./chunk-RXPGP5SA.mjs";
import "./chunk-5GOTHXGK.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-ZT3Z3A3D.mjs";
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
