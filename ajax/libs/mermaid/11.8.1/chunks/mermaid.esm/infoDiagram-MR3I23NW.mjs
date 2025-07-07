import {
  parse
} from "./chunk-7LW6ZPQI.mjs";
import "./chunk-6AUCXA4W.mjs";
import "./chunk-FGMUQTMK.mjs";
import "./chunk-HW2PUK3C.mjs";
import "./chunk-E4AGEALA.mjs";
import "./chunk-6QHZEHLH.mjs";
import {
  package_default
} from "./chunk-7QBZR7TA.mjs";
import {
  selectSvgElement
} from "./chunk-A7PVAP6S.mjs";
import {
  configureSvgSize,
  log
} from "./chunk-GA7OR7NX.mjs";
import "./chunk-VVBZZP4U.mjs";
import "./chunk-TKYGFYLN.mjs";
import "./chunk-M2LLTEOO.mjs";
import "./chunk-TGZYFRKZ.mjs";
import "./chunk-GRZAG2UZ.mjs";
import "./chunk-HD3LK5B5.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

// src/diagrams/info/infoParser.ts
var parser = {
  parse: /* @__PURE__ */ __name(async (input) => {
    const ast = await parse("info", input);
    log.debug(ast);
  }, "parse")
};

// src/diagrams/info/infoDb.ts
var DEFAULT_INFO_DB = {
  version: package_default.version + (true ? "" : "-tiny")
};
var getVersion = /* @__PURE__ */ __name(() => DEFAULT_INFO_DB.version, "getVersion");
var db = {
  getVersion
};

// src/diagrams/info/infoRenderer.ts
var draw = /* @__PURE__ */ __name((text, id, version) => {
  log.debug("rendering info diagram\n" + text);
  const svg = selectSvgElement(id);
  configureSvgSize(svg, 100, 400, true);
  const group = svg.append("g");
  group.append("text").attr("x", 100).attr("y", 40).attr("class", "version").attr("font-size", 32).style("text-anchor", "middle").text(`v${version}`);
}, "draw");
var renderer = { draw };

// src/diagrams/info/infoDiagram.ts
var diagram = {
  parser,
  db,
  renderer
};
export {
  diagram
};
