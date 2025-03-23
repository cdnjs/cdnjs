import {
  classDb_default,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-CXDZ2C6O.mjs";
import "./chunk-EICJXIV7.mjs";
import "./chunk-TM57GTNK.mjs";
import "./chunk-SGE5E2BZ.mjs";
import "./chunk-HKLBG3BQ.mjs";
import "./chunk-32DZJKXY.mjs";
import "./chunk-XHTJQHD2.mjs";
import "./chunk-V2CZVG6A.mjs";
import "./chunk-U6O4IJP6.mjs";
import "./chunk-MCANT3UC.mjs";
import {
  __name
} from "./chunk-P27NXTFD.mjs";

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
