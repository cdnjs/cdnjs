import {
  flowDb_default,
  flowRenderer_v2_default,
  flow_default,
  styles_default
} from "./chunk-ZSZIII3C.mjs";
import "./chunk-JT6ULSEW.mjs";
import "./chunk-X76F5IC7.mjs";
import "./chunk-ZY4GJCQS.mjs";
import "./chunk-3OB5YAUD.mjs";
import "./chunk-IYIPNYDK.mjs";
import {
  setConfig2 as setConfig
} from "./chunk-MAC4DWXR.mjs";

// src/diagrams/flowchart/flowDiagram-v2.ts
var diagram = {
  parser: flow_default,
  db: flowDb_default,
  renderer: flowRenderer_v2_default,
  styles: styles_default,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRenderer_v2_default.setConf(cnf.flowchart);
    flowDb_default.clear();
    flowDb_default.setGen("gen-2");
  }
};
export {
  diagram
};
