import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-LKBXYQP2.mjs";
import "./chunk-DX2SMGRI.mjs";
import "./chunk-ILQNPUG4.mjs";
import "./chunk-U2ZFMNUS.mjs";
import "./chunk-FPMURM56.mjs";
import "./chunk-KW7S66XI.mjs";
import "./chunk-KZHXEMGG.mjs";
import "./chunk-F3FIDV27.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-ZXHTWV66.mjs";
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
