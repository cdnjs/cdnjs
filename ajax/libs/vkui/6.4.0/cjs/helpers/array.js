/**
 * Сравнивает два массива
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "arraysEquals", {
    enumerable: true,
    get: function() {
        return arraysEquals;
    }
});
function arraysEquals(arrA, arrB) {
    if (arrA.length !== arrB.length) {
        return false;
    }
    return arrA.every((item, index)=>item === arrB[index]);
}

//# sourceMappingURL=array.js.map