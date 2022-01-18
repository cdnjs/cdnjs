import { autoInit, init } from '@twind/runtime';
export { theme, tw } from '@twind/runtime';
export * from '@twind/core';

const cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
  cancelAutoInit();
  return init(config, sheet, target);
}

export { setup };
//# sourceMappingURL=core.esnext.js.map
