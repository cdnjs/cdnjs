import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-5V4FS25O.mjs";
import "./chunk-2O5F6CEG.mjs";
import "./chunk-SSJB2B2L.mjs";
import "./chunk-XWQKHCUW.mjs";
import "./chunk-JXS2JFWQ.mjs";
import "./chunk-VRARSN5C.mjs";
import "./chunk-6Q42YGA5.mjs";
import "./chunk-KIRMWWLE.mjs";
import "./chunk-4BQVQIO5.mjs";
import "./chunk-ABD7OU7K.mjs";
import {
  __name
} from "./chunk-O7R7247Q.mjs";

// src/diagrams/class/classDiagram.ts
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
