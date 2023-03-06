"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.range = range;
exports.rangeIncrement = rangeIncrement;
/**
 * Генерирует массив с диапазоном чисел.
 */
function range(from, to) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  var direction = from < to ? 1 : -1;
  var distance = Math.abs(from - to) + 1;
  var arrayLength = Math.ceil(distance / step);
  var arr = Array(arrayLength);
  for (var index = 0; index < arr.length; index++) {
    arr[index] = from + index * step * direction;
  }
  return arr;
}
/**
 * Генерирует массив с диапазоном чисел в порядке возрастания.
 * Если `from` меньше `to`, вернется пустой массив.
 */
function rangeIncrement(from, to) {
  var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
  if (from > to) {
    return [];
  }
  return range(from, to, step);
}
//# sourceMappingURL=range.js.map