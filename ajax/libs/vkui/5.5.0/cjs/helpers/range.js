/**
 * Генерирует массив с диапазоном чисел.
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
    range: function() {
        return range;
    },
    rangeIncrement: function() {
        return rangeIncrement;
    }
});
function range(from, to) {
    var step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    var direction = from < to ? 1 : -1;
    var distance = Math.abs(from - to) + 1;
    var arrayLength = Math.ceil(distance / step);
    var arr = Array(arrayLength);
    for(var index = 0; index < arr.length; index++){
        arr[index] = from + index * step * direction;
    }
    return arr;
}
function rangeIncrement(from, to) {
    var step = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
    if (from > to) {
        return [];
    }
    return range(from, to, step);
}

//# sourceMappingURL=range.js.map