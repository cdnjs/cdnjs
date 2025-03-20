import {
  stateDb_default,
  stateDiagram_default,
  stateRenderer_v3_unified_default,
  styles_default
} from "./chunk-2JBRQKJ5.mjs";
import "./chunk-DUMQOTYW.mjs";
import "./chunk-YWFND7JV.mjs";
import "./chunk-WSMKYKZ5.mjs";
import "./chunk-VR7AIV22.mjs";
import "./chunk-23ATMZXV.mjs";
import "./chunk-5N55DQE6.mjs";
import "./chunk-2EDTWDYI.mjs";
import {
  __name
} from "./chunk-IIKMQLIC.mjs";

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
