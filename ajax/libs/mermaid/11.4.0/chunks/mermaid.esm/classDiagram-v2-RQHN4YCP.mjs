import {
  classDb_default,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-SG2W3SLO.mjs";
import "./chunk-KGVUR73X.mjs";
import "./chunk-3UPVGKO7.mjs";
import "./chunk-FQ64OR5F.mjs";
import "./chunk-E5O2ULER.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-U274GMTD.mjs";
import "./chunk-F2NGE46Y.mjs";
import "./chunk-TVJ2DRIE.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-M7TDSP4I.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

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
