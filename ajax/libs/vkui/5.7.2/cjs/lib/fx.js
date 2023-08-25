/**
 * ease function
 * @param x absolute progress of the animation in bounds 0 (beginning) and 1 (end)
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "easeInOutSine", {
    enumerable: true,
    get: function() {
        return easeInOutSine;
    }
});
function easeInOutSine(x) {
    return 0.5 * (1 - Math.cos(Math.PI * x));
}

//# sourceMappingURL=fx.js.map