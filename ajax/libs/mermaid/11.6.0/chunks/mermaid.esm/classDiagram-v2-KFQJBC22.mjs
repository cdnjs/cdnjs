import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-EFPBJHX4.mjs";
import "./chunk-Q7VUVKE6.mjs";
import "./chunk-H62MP5RN.mjs";
import "./chunk-AGEMWPJR.mjs";
import "./chunk-ZVRJXRH7.mjs";
import "./chunk-Q7X626QO.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-STFVS7YW.mjs";
import "./chunk-YFKFDTKC.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-3L32CQKD.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

// src/diagrams/class/classDiagram-v2.ts
var diagram = {
  parser: classDiagram_default,
  get db() {
    return new ClassDB();
  },
  renderer: classRenderer_v3_unified_default,
  styles: styles_default,
  init: /* @__PURE__ */ __name((cnf) => {
    if (!cnf.class) {
      cnf.class = {};
    }
    cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
  }, "init")
};
export {
  diagram
};
