import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-VMON4BCG.mjs";
import "./chunk-ZSF2CFIE.mjs";
import "./chunk-N67ZKMX4.mjs";
import "./chunk-GGMAQEHU.mjs";
import "./chunk-JOQSTCTT.mjs";
import "./chunk-KW7S66XI.mjs";
import "./chunk-UDMKZ6GD.mjs";
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
