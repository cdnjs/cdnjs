import {
  __name as __name2
} from "./chunk-TIBB5VVI.mjs";
import {
  __name
} from "./chunk-DLQEHMXD.mjs";

// ../parser/dist/mermaid-parser.core.mjs
var parsers = {};
var initializers = {
  info: /* @__PURE__ */ __name2(async () => {
    const { createInfoServices: createInfoServices2 } = await import("./info-3VTXS3R3-3BMQEUMA.mjs");
    const parser = createInfoServices2().Info.parser.LangiumParser;
    parsers.info = parser;
  }, "info"),
  packet: /* @__PURE__ */ __name2(async () => {
    const { createPacketServices: createPacketServices2 } = await import("./packet-DSR6H3E6-VY7RIAVM.mjs");
    const parser = createPacketServices2().Packet.parser.LangiumParser;
    parsers.packet = parser;
  }, "packet"),
  pie: /* @__PURE__ */ __name2(async () => {
    const { createPieServices: createPieServices2 } = await import("./pie-GAM7RPQU-ELTXQ7XN.mjs");
    const parser = createPieServices2().Pie.parser.LangiumParser;
    parsers.pie = parser;
  }, "pie"),
  architecture: /* @__PURE__ */ __name2(async () => {
    const { createArchitectureServices: createArchitectureServices2 } = await import("./architecture-I2MV5QL6-LB4DIP7G.mjs");
    const parser = createArchitectureServices2().Architecture.parser.LangiumParser;
    parsers.architecture = parser;
  }, "architecture"),
  gitGraph: /* @__PURE__ */ __name2(async () => {
    const { createGitGraphServices: createGitGraphServices2 } = await import("./gitGraph-PIIEIUND-J73MRUXT.mjs");
    const parser = createGitGraphServices2().GitGraph.parser.LangiumParser;
    parsers.gitGraph = parser;
  }, "gitGraph"),
  radar: /* @__PURE__ */ __name2(async () => {
    const { createRadarServices: createRadarServices2 } = await import("./radar-NEH6LVNW-QN626J2C.mjs");
    const parser = createRadarServices2().Radar.parser.LangiumParser;
    parsers.radar = parser;
  }, "radar"),
  treemap: /* @__PURE__ */ __name2(async () => {
    const { createTreemapServices: createTreemapServices2 } = await import("./treemap-FKARHQ26-ASUFZ6V3.mjs");
    const parser = createTreemapServices2().Treemap.parser.LangiumParser;
    parsers.treemap = parser;
  }, "treemap")
};
async function parse(diagramType, text) {
  const initializer = initializers[diagramType];
  if (!initializer) {
    throw new Error(`Unknown diagram type: ${diagramType}`);
  }
  if (!parsers[diagramType]) {
    await initializer();
  }
  const parser = parsers[diagramType];
  const result = parser.parse(text);
  if (result.lexerErrors.length > 0 || result.parserErrors.length > 0) {
    throw new MermaidParseError(result);
  }
  return result.value;
}
__name(parse, "parse");
__name2(parse, "parse");
var MermaidParseError = class extends Error {
  static {
    __name(this, "MermaidParseError");
  }
  constructor(result) {
    const lexerErrors = result.lexerErrors.map((err) => err.message).join("\n");
    const parserErrors = result.parserErrors.map((err) => err.message).join("\n");
    super(`Parsing failed: ${lexerErrors} ${parserErrors}`);
    this.result = result;
  }
  static {
    __name2(this, "MermaidParseError");
  }
};

export {
  parse
};
