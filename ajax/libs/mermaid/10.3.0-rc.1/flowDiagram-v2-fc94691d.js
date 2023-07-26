import { p as parser, f as flowDb } from "./flowDb-8a2a4d75.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-9b0d8ccd.js";
import { q as setConfig } from "./mermaid-1684d499.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-de47a42b.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-28b9b96b.js";
import "./createText-f81967ad.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-d563164c.js";
import "dagre-d3-es/src/dagre-js/label/add-html-label.js";
import "khroma";
import "dayjs";
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
