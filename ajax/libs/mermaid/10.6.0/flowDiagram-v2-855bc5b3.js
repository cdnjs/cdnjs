import { p as parser, f as flowDb } from "./flowDb-1972c806.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-080da4f6.js";
import { p as setConfig } from "./mermaid-8af3addd.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-2c4b9a3b.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-f2ad444c.js";
import "./createText-62fc7601.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "dagre-d3-es/src/dagre-js/label/add-html-label.js";
import "khroma";
import "dayjs";
import "@braintree/sanitize-url";
import "dompurify";
import "lodash-es/memoize.js";
import "lodash-es/merge.js";
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
