import { p as parser, f as flowDb } from "./flowDb-ff651a22.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-1b0c237a.js";
import { q as setConfig } from "./mermaid-768dc893.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-f58d48f9.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-0005682e.js";
import "./createText-3b1f58a4.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-70101091.js";
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
