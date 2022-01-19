import { auto, setup as setup$1, defineConfig, asArray } from '@twind/runtime';
import autoprefix from '@twind/preset-autoprefix';
import tailwind from '@twind/preset-tailwind';

const cancelAutoSetup = auto(setup);
function setup(config = {}, sheet, target) {
    cancelAutoSetup();
    return setup$1(defineConfig({
        ...config,
        presets: [
            autoprefix(),
            tailwind(),
            ...asArray(config.presets)
        ]
    }), sheet, target);
}

export { setup };
//# sourceMappingURL=cdn.js.map
