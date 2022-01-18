import {
  runtime,
  theme,
  tw
} from "./_/chunks/chunk-XFJPXPDR.js";

// src/core.ts
export * from "@twind/core";
if (typeof document != "undefined" && document.currentScript) {
  autoSetupTimeoutRef = setTimeout(setup);
}
var autoSetupTimeoutRef;
function setup(config = {}, target) {
  clearTimeout(autoSetupTimeoutRef);
  return runtime(config, target);
}
export {
  setup,
  theme,
  tw
};
//# sourceMappingURL=core.esnext.js.map
