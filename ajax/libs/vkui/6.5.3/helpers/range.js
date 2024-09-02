/**
 * Генерирует массив с диапазоном чисел.
 */ export function range(from, to, step = 1) {
    const direction = from < to ? 1 : -1;
    const distance = Math.abs(from - to) + 1;
    const arrayLength = Math.ceil(distance / step);
    const arr = Array(arrayLength);
    for(let index = 0; index < arr.length; index++){
        arr[index] = from + index * step * direction;
    }
    return arr;
}
/**
 * Генерирует массив с диапазоном чисел в порядке возрастания.
 * Если `from` меньше `to`, вернется пустой массив.
 */ export function rangeIncrement(from, to, step = 1) {
    if (from > to) {
        return [];
    }
    return range(from, to, step);
}

//# sourceMappingURL=range.js.map