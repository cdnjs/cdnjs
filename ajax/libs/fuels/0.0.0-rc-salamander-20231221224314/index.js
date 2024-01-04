"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  Commands: () => Commands,
  Script: () => import_script.Script,
  createConfig: () => createConfig
});
module.exports = __toCommonJS(src_exports);
var import_script = require("@fuel-ts/script");

// src/cli/utils/createConfig.ts
function createConfig(config) {
  return config;
}

// src/cli/types.ts
var Commands = /* @__PURE__ */ ((Commands2) => {
  Commands2["build"] = "build";
  Commands2["deploy"] = "deploy";
  Commands2["dev"] = "dev";
  Commands2["init"] = "init";
  return Commands2;
})(Commands || {});

// src/index.ts
__reExport(src_exports, require("@fuel-ts/abi-coder"), module.exports);
__reExport(src_exports, require("@fuel-ts/address"), module.exports);
__reExport(src_exports, require("@fuel-ts/address/configs"), module.exports);
__reExport(src_exports, require("@fuel-ts/contract"), module.exports);
__reExport(src_exports, require("@fuel-ts/crypto"), module.exports);
__reExport(src_exports, require("@fuel-ts/hasher"), module.exports);
__reExport(src_exports, require("@fuel-ts/interfaces"), module.exports);
__reExport(src_exports, require("@fuel-ts/math"), module.exports);
__reExport(src_exports, require("@fuel-ts/math/configs"), module.exports);
__reExport(src_exports, require("@fuel-ts/mnemonic"), module.exports);
__reExport(src_exports, require("@fuel-ts/predicate"), module.exports);
__reExport(src_exports, require("@fuel-ts/predicate"), module.exports);
__reExport(src_exports, require("@fuel-ts/program"), module.exports);
__reExport(src_exports, require("@fuel-ts/program/configs"), module.exports);
__reExport(src_exports, require("@fuel-ts/providers"), module.exports);
__reExport(src_exports, require("@fuel-ts/signer"), module.exports);
__reExport(src_exports, require("@fuel-ts/transactions"), module.exports);
__reExport(src_exports, require("@fuel-ts/utils"), module.exports);
__reExport(src_exports, require("@fuel-ts/wallet"), module.exports);
__reExport(src_exports, require("@fuel-ts/transactions/configs"), module.exports);
__reExport(src_exports, require("@fuel-ts/wallet"), module.exports);
__reExport(src_exports, require("@fuel-ts/wallet/configs"), module.exports);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Commands,
  Script,
  createConfig,
  ...require("@fuel-ts/abi-coder"),
  ...require("@fuel-ts/address"),
  ...require("@fuel-ts/address/configs"),
  ...require("@fuel-ts/contract"),
  ...require("@fuel-ts/crypto"),
  ...require("@fuel-ts/hasher"),
  ...require("@fuel-ts/interfaces"),
  ...require("@fuel-ts/math"),
  ...require("@fuel-ts/math/configs"),
  ...require("@fuel-ts/mnemonic"),
  ...require("@fuel-ts/predicate"),
  ...require("@fuel-ts/predicate"),
  ...require("@fuel-ts/program"),
  ...require("@fuel-ts/program/configs"),
  ...require("@fuel-ts/providers"),
  ...require("@fuel-ts/signer"),
  ...require("@fuel-ts/transactions"),
  ...require("@fuel-ts/utils"),
  ...require("@fuel-ts/wallet"),
  ...require("@fuel-ts/transactions/configs"),
  ...require("@fuel-ts/wallet"),
  ...require("@fuel-ts/wallet/configs")
});
//# sourceMappingURL=index.js.map