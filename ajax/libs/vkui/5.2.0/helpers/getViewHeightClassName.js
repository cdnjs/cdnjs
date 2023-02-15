import { ViewHeight } from '../lib/adaptivity';
export function getViewHeightClassName(base, viewHeight,
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
  var className = "".concat(String(base), "--viewHeight-");
  switch (viewHeight) {
    case ViewHeight.EXTRA_SMALL:
      className += 'extraSmall';
      break;
    case ViewHeight.SMALL:
      className += 'small';
      break;
    case ViewHeight.MEDIUM:
      className += 'medium';
      break;
    default:
      className += 'none';
      break;
  }
  return styles ? styles[className] : className;
}
//# sourceMappingURL=getViewHeightClassName.js.map