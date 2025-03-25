import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-7U56Z5CX.mjs";
import "./chunk-5HRBRIJM.mjs";
import "./chunk-BO7VGL7K.mjs";
import "./chunk-66SQ7PYY.mjs";
import "./chunk-7NZE2EM7.mjs";
import "./chunk-OPO4IU42.mjs";
import "./chunk-3JNJP5BE.mjs";
import "./chunk-3X56UNUX.mjs";
import "./chunk-6JOS74DS.mjs";
import "./chunk-7DKRZKHE.mjs";
import {
  __name
} from "./chunk-6DBFFHIP.mjs";

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
