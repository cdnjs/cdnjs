import {
  ClassDB,
  classDiagram_default,
  classRenderer_v3_unified_default,
  styles_default
} from "./chunk-JUNTMEQM.mjs";
import "./chunk-SCLVSU6P.mjs";
import "./chunk-ITLJA4XN.mjs";
import "./chunk-DYEWET5N.mjs";
import "./chunk-MYTZ56J7.mjs";
import "./chunk-UNAYP6HA.mjs";
import "./chunk-VKJI5BFR.mjs";
import "./chunk-3AU3J4PQ.mjs";
import "./chunk-SVWLYT5M.mjs";
import "./chunk-G7G7YTX4.mjs";
import "./chunk-VNOTBLTU.mjs";
import "./chunk-UKINNZLQ.mjs";
import "./chunk-GKOISANM.mjs";
import "./chunk-NC4V57XB.mjs";
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
