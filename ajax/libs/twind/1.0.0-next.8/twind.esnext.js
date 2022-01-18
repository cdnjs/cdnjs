// src/index.ts
import {
  defineConfig
} from "@twind/core";
import { init, autoInit } from "@twind/runtime";
import autoprefix from "@twind/preset-autoprefix";
import tailwind from "@twind/preset-tailwind";
export * from "@twind/core";
import { tw, theme } from "@twind/runtime";
var cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(defineConfig({
    ...config,
    presets: [autoprefix(), ...config.presets || [], tailwind()]
  }), sheet, target);
}
export {
  setup,
  theme,
  tw
};
//# sourceMappingURL=twind.esnext.js.map
