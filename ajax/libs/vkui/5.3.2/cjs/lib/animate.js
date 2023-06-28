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
    var duration = param.duration, timing = param.timing, draw = param.draw;
    if (!_dom.canUseDOM) {
        return;
    }
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / duration;
        if (timeFraction > 1) {
            timeFraction = 1;
        }
        var progress = timing(timeFraction);
        draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

//# sourceMappingURL=animate.js.map