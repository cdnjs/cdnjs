import { defineConfig, asArray } from '@twind/core';
export * from '@twind/core';
import { autoInit, init } from '@twind/runtime';
export { tw } from '@twind/runtime';
import autoprefix from '@twind/preset-autoprefix';
import ext from '@twind/preset-ext';

const cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(defineConfig({
    ...config,
    presets: [autoprefix(), ...asArray(config.presets), ext()]
  }), sheet, target);
}

export { setup };
//# sourceMappingURL=ext.js.map
