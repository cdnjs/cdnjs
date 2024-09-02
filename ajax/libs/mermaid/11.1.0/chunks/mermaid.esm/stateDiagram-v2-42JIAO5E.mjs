import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-F2NFOW3N.mjs";
import "./chunk-J7WRJK5U.mjs";
import "./chunk-HAXCHQOQ.mjs";
import "./chunk-7XDRE4YH.mjs";
import "./chunk-LLL7KA6E.mjs";
import "./chunk-KW7S66XI.mjs";
import "./chunk-ZBQAY7VC.mjs";
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
