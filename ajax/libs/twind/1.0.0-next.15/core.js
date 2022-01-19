import { auto, init } from '@twind/runtime';
export { tw } from '@twind/runtime';
export * from '@twind/core';

const cancelAutoSetup = auto(setup);
function setup(config = {}, sheet, target) {
    cancelAutoSetup();
    return init(config, sheet, target);
}

export { setup };
//# sourceMappingURL=core.js.map
