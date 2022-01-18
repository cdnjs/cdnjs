// src/core.ts
import { init, autoInit } from "@twind/runtime";
export * from "@twind/core";
import { tw, theme } from "@twind/runtime";
var cancelAutoInit = autoInit(setup);
function setup(config = {}, target, sheet) {
  cancelAutoInit();
  return init(config, target, sheet);
}
export {
  setup,
  theme,
  tw
};
//# sourceMappingURL=core.esnext.js.map
