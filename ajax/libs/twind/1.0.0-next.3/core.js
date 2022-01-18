import {
  apply,
  runtime,
  theme,
  tw
} from "./_/chunks/chunk-PUOHJDKQ.js";

// src/core.ts
export * from "@twind/core";
if (typeof document != "undefined" && document.currentScript) {
  autoSetupTimeoutRef = setTimeout(runtime, 0, {});
}
var autoSetupTimeoutRef;
function setup(config, target) {
  clearTimeout(autoSetupTimeoutRef);
  return runtime(config, target);
}
export {
  apply,
  setup,
  theme,
  tw
};
//# sourceMappingURL=core.js.map
