import { auto, setup as setup$1 } from '@twind/runtime';
export { tw } from '@twind/runtime';
export * from '@twind/core';

const cancelAutoSetup = auto(setup);
function setup(config = {}, sheet, target) {
    cancelAutoSetup();
    return setup$1(config, sheet, target);
}

export { setup };
//# sourceMappingURL=core.js.map
