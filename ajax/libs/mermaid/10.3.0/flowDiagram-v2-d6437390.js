import { p as parser, f as flowDb } from "./flowDb-8f9fc471.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-ff678862.js";
import { q as setConfig } from "./mermaid-a98f434b.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-4c4adb72.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-b00f0ec2.js";
import "./createText-285e50b4.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-5d8a058e.js";
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
