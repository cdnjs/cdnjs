import { defineConfig, asArray } from '@twind/core';
export * from '@twind/core';
import { autoInit, init } from '@twind/runtime';
export { tw } from '@twind/runtime';
import autoprefix from '@twind/preset-autoprefix';
import tailwind from '@twind/preset-tailwind';

const cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(defineConfig({
    ...config,
    presets: [autoprefix(), ...asArray(config.presets), tailwind()]
  }), sheet, target);
}

export { setup };
//# sourceMappingURL=twind.js.map
