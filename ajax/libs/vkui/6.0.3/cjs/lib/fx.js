/**
 * ease function
 * @param x absolute progress of the animation in bounds 0 (beginning) and 1 (end)
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    cubicBezier: function() {
        return cubicBezier;
    },
    easeInOutSine: function() {
        return easeInOutSine;
    }
});
function easeInOutSine(x) {
    return 0.5 * (1 - Math.cos(Math.PI * x));
}
function cubicBezier(x1, x2) {
    return function(progress) {
        const t = progress;
        const cx = 3 * x1;
        const bx = 3 * (x2 - x1) - cx;
        const ax = 1 - cx - bx;
        const x = ax * Math.pow(t, 3) + bx * Math.pow(t, 2) + cx * t;
        return x;
    };
}

//# sourceMappingURL=fx.js.map