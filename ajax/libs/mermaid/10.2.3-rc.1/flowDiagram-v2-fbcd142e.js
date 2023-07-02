import { p as parser, f as flowDb } from "./flowDb-e15548f8.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-fec2655d.js";
import { q as setConfig } from "./mermaid-9949cda1.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-dff21f02.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-784dee5c.js";
import "./createText-390f04cb.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-87ea9cff.js";
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
