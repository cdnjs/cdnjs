"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "animate", {
    enumerable: true,
    get: function() {
        return animate;
    }
});
const _dom = require("./dom");
function animate({ duration, timing, draw, animationQueue = [] }) {
    if (!_dom.canUseDOM) {
        return;
    }
    let start;
    requestAnimationFrame(function animate(time) {
        if (!start) {
            start = time;
        }
        let timeFraction = Math.min((time - start) / duration, 1);
        const progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
            return;
        }
        animationQueue.shift();
        if (animationQueue.length > 0) {
            animationQueue[0]();
        }
    });
}

//# sourceMappingURL=animate.js.map