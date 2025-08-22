import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-JBRWN2VN.mjs";
import "./chunk-GLLZNHP4.mjs";
import "./chunk-WVR4S24B.mjs";
import "./chunk-NRVI72HA.mjs";
import "./chunk-NXG7ZM6U.mjs";
import "./chunk-NCRKNZAS.mjs";
import "./chunk-WH6PBGIT.mjs";
import "./chunk-CV3G5MRU.mjs";
import "./chunk-JSVUIEYQ.mjs";
import "./chunk-7RNWAQOT.mjs";
import "./chunk-62K37W7T.mjs";
import "./chunk-U37J5Y7L.mjs";
import {
  __name
} from "./chunk-VIW5F6AA.mjs";

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
