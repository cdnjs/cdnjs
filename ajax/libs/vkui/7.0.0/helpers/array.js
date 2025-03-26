/**
 * Сравнивает два массива
 */ export function arraysEquals(arrA, arrB) {
    if (arrA.length !== arrB.length) {
        return false;
    }
    return arrA.every((item, index)=>item === arrB[index]);
}

//# sourceMappingURL=array.js.map