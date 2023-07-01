import { p as parser, f as flowDb } from "./flowDb-197cd6d1.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-aea5c17b.js";
import { q as setConfig } from "./mermaid-ddfd1cde.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-7484f147.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-06fe0e9b.js";
import "./createText-31812fd1.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-14f13a51.js";
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
