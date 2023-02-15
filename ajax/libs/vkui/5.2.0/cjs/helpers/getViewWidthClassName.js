"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getViewWidthClassName = getViewWidthClassName;
var _adaptivity = require("../lib/adaptivity");
function getViewWidthClassName(base, viewWidth,
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
  var className = "".concat(String(base), "--viewWidth-");
  switch (viewWidth) {
    case _adaptivity.ViewWidth.SMALL_MOBILE:
      className += 'smallMobile';
      break;
    case _adaptivity.ViewWidth.MOBILE:
      className += 'mobile';
      break;
    case _adaptivity.ViewWidth.SMALL_TABLET:
      className += 'smallTablet';
      break;
    case _adaptivity.ViewWidth.TABLET:
      className += 'tablet';
      break;
    case _adaptivity.ViewWidth.DESKTOP:
      className += 'desktop';
      break;
    default:
      className += 'none';
      break;
  }
  className = styles ? styles[className] : className;
  if (viewWidth && viewWidth >= _adaptivity.ViewWidth.SMALL_TABLET) {
    if (styles) {
      className += ' ' + styles["".concat(String(base), "--viewWidth-smallTabletPlus")];
    } else {
      className += " ".concat(String(base), "--viewWidth-smallTabletPlus");
    }
  }
  if (viewWidth && viewWidth >= _adaptivity.ViewWidth.TABLET) {
    if (styles) {
      className += ' ' + styles["".concat(String(base), "--viewWidth-tabletPlus")];
    } else {
      className += " ".concat(String(base), "--viewWidth-tabletPlus");
    }
  }
  return className;
}
//# sourceMappingURL=getViewWidthClassName.js.map