import { defineConfig, asArray } from '@twind/core';
export * from '@twind/core';
import { autoInit, init } from '@twind/runtime';
export { theme, tw } from '@twind/runtime';
import autoprefix from '@twind/preset-autoprefix';
import mini from '@twind/preset-mini';

const cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(defineConfig({
    ...config,
    presets: [autoprefix(), ...asArray(config.presets), mini()]
  }), sheet, target);
}

export { setup };
//# sourceMappingURL=mini.js.map
