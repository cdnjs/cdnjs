// src/mini.ts
import {
  defineConfig
} from "@twind/core";
import { init, autoInit } from "@twind/runtime";
import autoprefix from "@twind/preset-autoprefix";
import mini from "@twind/preset-mini";
export * from "@twind/core";
import { tw, theme } from "@twind/runtime";
var cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(defineConfig({
    ...config,
    presets: [autoprefix(), ...config.presets || [], mini()]
  }), sheet, target);
}
export {
  setup,
  theme,
  tw
};
//# sourceMappingURL=mini.js.map
