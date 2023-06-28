import { p as parser, f as flowDb } from "./flowDb-90c64253.js";
import { f as flowRendererV2, a as flowStyles } from "./styles-5771358d.js";
import { q as setConfig } from "./mermaid-df7b3201.js";
import "d3";
import "dagre-d3-es/src/graphlib/index.js";
import "./index-82f83d92.js";
import "dagre-d3-es/src/dagre/index.js";
import "dagre-d3-es/src/graphlib/json.js";
import "./edges-54deabd2.js";
import "./createText-f0358e8e.js";
import "@khanacademy/simple-markdown";
import "./svgDraw-b1b0b95c.js";
import "dagre-d3-es/src/dagre-js/label/add-html-label.js";
import "ts-dedent";
import "dayjs/esm/index.js";
import "@braintree/sanitize-url";
import "dompurify";
import "khroma";
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
