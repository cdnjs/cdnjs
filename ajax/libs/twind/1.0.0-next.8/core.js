// src/core.ts
import { init, autoInit } from "@twind/runtime";
export * from "@twind/core";
import { tw, theme } from "@twind/runtime";
var cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(config, sheet, target);
}
export {
  setup,
  theme,
  tw
};
//# sourceMappingURL=core.js.map
