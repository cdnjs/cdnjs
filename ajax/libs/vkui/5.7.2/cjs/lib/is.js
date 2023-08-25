// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "is", {
    enumerable: true,
    get: function() {
        return is;
    }
});
function is(x, y) {
    return x === y && // -0 is not +0
    (x !== 0 || 1 / x === 1 / y) || // both NaN
    x !== x && y !== y;
}

//# sourceMappingURL=is.js.map