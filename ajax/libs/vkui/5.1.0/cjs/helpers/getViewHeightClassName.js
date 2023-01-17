"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewHeightClassName = getViewHeightClassName;
var _adaptivity = require("../lib/adaptivity");
function getViewHeightClassName(base, viewHeight,
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
  var className = "".concat(String(base), "--viewHeight-");
  switch (viewHeight) {
    case _adaptivity.ViewHeight.EXTRA_SMALL:
      className += 'extraSmall';
      break;
    case _adaptivity.ViewHeight.SMALL:
      className += 'small';
      break;
    case _adaptivity.ViewHeight.MEDIUM:
      className += 'medium';
      break;
    default:
      className += 'none';
      break;
  }
  return styles ? styles[className] : className;
}
//# sourceMappingURL=getViewHeightClassName.js.map