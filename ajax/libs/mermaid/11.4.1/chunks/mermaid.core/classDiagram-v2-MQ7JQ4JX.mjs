import {
  classDb_default,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-T2TOU4HS.mjs";
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

// src/diagrams/class/classDiagram-v2.ts
var diagram = {
  parser: classDiagram_default,
  db: classDb_default,
  renderer: classRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    classDb_default.clear();
  }, "init")
};
export {
  diagram
};
