import { p as parser, f as flowDb } from "./flowDb-52e24d17.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-26373982.js";
import { h as setConfig } from "./commonDb-573409be.js";
import "d3";
import "./utils-d622194a.js";
import "@braintree/sanitize-url";
import "lodash-es/memoize.js";
import "./mermaidAPI-3ae0f2f0.js";
import "stylis";
import "dompurify";
import "lodash-es/isEmpty.js";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-5219d011.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-2e77835f.js";
import "./createText-1f5f8f92.js";
import "@khanacademy/simple-markdown";
import "./svgDraw-2526cba0.js";
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
//# sourceMappingURL=flowDiagram-v2-8e52592d.js.map
