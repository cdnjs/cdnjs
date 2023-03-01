import { p as parser, f as flowDb } from "./flowDb-9c2750f9.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-f0015600.js";
import { f as setConfig } from "./config-389b86ff.js";
import "d3";
import "./utils-d5eeff82.js";
import "@braintree/sanitize-url";
import "./setupGraphViewbox-e35e4124.js";
import "./commonDb-2ace122b.js";
import "lodash-es/memoize.js";
import "./mermaidAPI-77f3d76b.js";
import "stylis";
import "./errorRenderer-d05351b9.js";
import "dompurify";
import "lodash-es/isEmpty.js";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-41369532.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-02f426ee.js";
import "./svgDraw-6a237a99.js";
import "dagre-d3-es/src/dagre-js/label/add-html-label.js";
import "dayjs";
import "khroma";
const diagram = {
  parser,
  db: flowDb,
  renderer: flowRendererV2,
  styles: flowStyles,
  init: (cnf) => {
    if (!cnf.flowchart) {
      cnf.flowchart = {};
    }
    cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
    setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
    flowRendererV2.setConf(cnf.flowchart);
    flowDb.clear();
    flowDb.setGen("gen-2");
  }
};
export {
  diagram
};
//# sourceMappingURL=flowDiagram-v2-64f361a0.js.map
