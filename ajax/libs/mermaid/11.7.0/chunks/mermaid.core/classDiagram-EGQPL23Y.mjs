import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-YQZZRAKN.mjs";
import "./chunk-UIWBPB2F.mjs";
import "./chunk-HPOVUXKZ.mjs";
import "./chunk-BRE4QBWZ.mjs";
import "./chunk-AEN23PCK.mjs";
import "./chunk-NUTPFWZB.mjs";
import "./chunk-DS2CGKN3.mjs";
import "./chunk-YL523NDC.mjs";
import "./chunk-7N6UNFX7.mjs";
import "./chunk-F7MYA6JM.mjs";
import {
  __name
} from "./chunk-BMRFU3JQ.mjs";

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
