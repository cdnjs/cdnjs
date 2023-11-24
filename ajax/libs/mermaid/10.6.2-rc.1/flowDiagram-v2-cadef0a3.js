import { p as parser, f as flowDb } from "./flowDb-39be8cbe.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-1b5c82da.js";
import { p as setConfig } from "./mermaid-d3e25389.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-4b9a133f.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-ee4b7c95.js";
import "./createText-985ba056.js";
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
