import { p as parser, f as flowDb } from "./flowDb-6a57c1b4.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5f89df53.js";
import { q as setConfig } from "./mermaid-b0ad2de1.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-a92ac404.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-49ac43a2.js";
import "./createText-3df630b5.js";
import "mdast-util-from-markdown";
import "ts-dedent";
import "./svgDraw-0fcc813d.js";
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
