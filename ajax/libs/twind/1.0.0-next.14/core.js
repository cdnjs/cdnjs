import { autoInit, init } from '@twind/runtime';
export { tw } from '@twind/runtime';
export * from '@twind/core';

const cancelAutoInit = autoInit(setup);
function setup(config = {}, sheet, target) {
    cancelAutoInit();
    return init(config, sheet, target);
}

export { setup };
//# sourceMappingURL=core.js.map
