import {
  parse
} from "./chunk-IX6JBRAH.mjs";
import "./chunk-KD72OHMT.mjs";
import "./chunk-K47TKXNK.mjs";
import "./chunk-L4EHP3G4.mjs";
import "./chunk-ZZTKDDEP.mjs";
import "./chunk-756FOT2E.mjs";
import {
  package_default
} from "./chunk-2T6YPBFS.mjs";
import {
  selectSvgElement
} from "./chunk-67Z47TF3.mjs";
import {
  configureSvgSize,
  log
} from "./chunk-MLCAUZSU.mjs";
import "./chunk-RLJI5OQH.mjs";
import "./chunk-VAZROYUI.mjs";
import "./chunk-LR7B4BSU.mjs";
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
