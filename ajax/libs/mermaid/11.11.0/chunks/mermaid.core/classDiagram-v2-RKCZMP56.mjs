import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-K7UQS3LO.mjs";
import "./chunk-FMBD7UC4.mjs";
import "./chunk-55IACEB6.mjs";
import "./chunk-QN33PNHL.mjs";
import "./chunk-6OXUPJBA.mjs";
import "./chunk-3AY6CYHV.mjs";
import "./chunk-7GE3RBXV.mjs";
import "./chunk-CXMOBAN2.mjs";
import "./chunk-CVBHYZKI.mjs";
import "./chunk-QYVHNE3D.mjs";
import "./chunk-JA3XYJ7Z.mjs";
import "./chunk-S3R3BYOJ.mjs";
import "./chunk-ABZYJK2D.mjs";
import {
  __name
} from "./chunk-AGHRB4JF.mjs";

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
