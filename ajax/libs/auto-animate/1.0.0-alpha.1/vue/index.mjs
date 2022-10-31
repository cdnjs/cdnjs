import { vAutoAnimate } from '../index';

const autoAnimatePlugin = {
    install(app) {
        app.directive("auto-animate", vAutoAnimate);
    },
};

export { autoAnimatePlugin };
