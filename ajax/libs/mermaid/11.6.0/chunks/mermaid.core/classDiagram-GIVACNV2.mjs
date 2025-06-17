import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-A2AXSNBT.mjs";
import "./chunk-RZ5BOZE2.mjs";
import "./chunk-TYCBKAJE.mjs";
import "./chunk-IIMUDSI4.mjs";
import "./chunk-VV3M67IP.mjs";
import "./chunk-HRU6DDCH.mjs";
import "./chunk-K557N5IZ.mjs";
import "./chunk-H2D2JQ3I.mjs";
import "./chunk-C3MQ5ANM.mjs";
import "./chunk-O4NI6UNU.mjs";
import {
  __name
} from "./chunk-YTJNT7DU.mjs";

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
