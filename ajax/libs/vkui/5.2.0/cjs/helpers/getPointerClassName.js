"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPointerClassName = getPointerClassName;
function getPointerClassName(base, mouse,
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
  var mouseState = 'none';
  if (mouse === true) {
    mouseState = 'has';
  } else if (mouse === false) {
    mouseState = 'has-not';
  }
  var className = "".concat(String(base), "--pointer-").concat(mouseState);
  return styles ? styles[className] : className;
}
//# sourceMappingURL=getPointerClassName.js.map