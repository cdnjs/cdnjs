"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrDefault = getOrDefault;
/**
 * Вернёт первый аргумент если он есть, иначе вернёт значение по умолчанию.
 */
function getOrDefault(value, defaultValue) {
  return value !== null && value !== void 0 ? value : defaultValue;
}
//# sourceMappingURL=getOrDefault.js.map