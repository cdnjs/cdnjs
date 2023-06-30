import { p as parser, f as flowDb } from "./flowDb-a707052f.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-40ddcbf3.js";
import { q as setConfig } from "./mermaid-a953d906.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-05087a90.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-97052da4.js";
import "./createText-2f679d62.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-6750006d.js";
import "dagre-d3-es/src/dagre-js/label/add-html-label.js";
import "khroma";
import "dayjs/esm/index.js";
import "@braintree/sanitize-url";
import "dompurify";
import "lodash-es/memoize.js";
import "stylis";
import "lodash-es/isEmpty.js";
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
