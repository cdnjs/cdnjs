import {
  apply,
  runtime,
  theme,
  tw
} from "./_/chunks/chunk-PUOHJDKQ.js";

// src/index.ts
import {
  defineConfig
} from "@twind/core";
import autoprefix from "@twind/preset-autoprefix";
import tailwind from "@twind/preset-tailwind";
export * from "@twind/core";
if (typeof document != "undefined" && document.currentScript) {
  autoSetupTimeoutRef = setTimeout(runtime, 0, {});
}
var autoSetupTimeoutRef;
function setup(config, target) {
  clearTimeout(autoSetupTimeoutRef);
  return runtime(defineConfig({
    ...config,
    presets: [autoprefix(), ...config.presets || [], tailwind()]
  }), target);
}
export {
  apply,
  setup,
  theme,
  tw
};
//# sourceMappingURL=twind.js.map
