import { vAutoAnimate } from '../index.mjs';

const autoAnimatePlugin = {
    install(app) {
        app.directive("auto-animate", vAutoAnimate);
    },
};

export { autoAnimatePlugin };
