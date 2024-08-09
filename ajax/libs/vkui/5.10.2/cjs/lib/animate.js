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
var _dom = require("./dom");
function animate(param) {
    var duration = param.duration, timing = param.timing, draw = param.draw, _param_animationQueue = param.animationQueue, animationQueue = _param_animationQueue === void 0 ? [] : _param_animationQueue;
    if (!_dom.canUseDOM) {
        return;
    }
    var start;
    requestAnimationFrame(function animate(time) {
        if (!start) {
            start = time;
        }
        var timeFraction = Math.min((time - start) / duration, 1);
        var progress = timing(timeFraction);
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