import { defineConfig, asArray } from '@twind/core';
import { auto, init } from '@twind/runtime';
import autoprefix from '@twind/preset-autoprefix';
import tailwind from '@twind/preset-tailwind';

const cancelAutoSetup = auto(setup);
function setup(config = {}, sheet, target) {
    cancelAutoSetup();
    return init(defineConfig({
        ...config,
        presets: [
            autoprefix(),
            tailwind(),
            ...asArray(config.presets)
        ]
    }), sheet, target);
}

export { setup };
//# sourceMappingURL=cdn.esnext.js.map
