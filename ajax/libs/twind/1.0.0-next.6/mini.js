import {
  runtime,
  theme,
  tw
} from "./_/chunks/chunk-XFJPXPDR.js";

// src/mini.ts
import {
  defineConfig
} from "@twind/core";
import autoprefix from "@twind/preset-autoprefix";
import mini from "@twind/preset-mini";
export * from "@twind/core";
if (typeof document != "undefined" && document.currentScript) {
  autoSetupTimeoutRef = setTimeout(setup);
}
var autoSetupTimeoutRef;
function setup(config = {}, target) {
  clearTimeout(autoSetupTimeoutRef);
  return runtime(defineConfig({
    ...config,
    presets: [autoprefix(), ...config.presets || [], mini()]
  }), target);
}
export {
  setup,
  theme,
  tw
};
//# sourceMappingURL=mini.js.map
