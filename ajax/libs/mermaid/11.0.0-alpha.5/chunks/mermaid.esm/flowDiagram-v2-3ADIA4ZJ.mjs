import {
  flowDb_default,
  flowRenderer_v2_default,
  flow_default,
  styles_default
} from "./chunk-YOVYGJMA.mjs";
import "./chunk-7X5N4G4X.mjs";
import "./chunk-ILFCNAY3.mjs";
import "./chunk-NIE3KUHP.mjs";
import "./chunk-UBK4ATPH.mjs";
import "./chunk-6VGLYYIQ.mjs";
import "./chunk-GI3XPZAN.mjs";
import "./chunk-43ZLPYW7.mjs";
import "./chunk-4RVYQ3EB.mjs";
import "./chunk-BHRT2E43.mjs";
import "./chunk-XJO53F2G.mjs";
import {
  setConfig2 as setConfig
} from "./chunk-T24N4LJA.mjs";

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
