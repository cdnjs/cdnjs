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
function range(from, to, step = 1) {
    const direction = from < to ? 1 : -1;
    const distance = Math.abs(from - to) + 1;
    const arrayLength = Math.ceil(distance / step);
    const arr = Array(arrayLength);
    for(let index = 0; index < arr.length; index++){
        arr[index] = from + index * step * direction;
    }
    return arr;
}
function rangeIncrement(from, to, step = 1) {
    if (from > to) {
        return [];
    }
    return range(from, to, step);
}

//# sourceMappingURL=range.js.map