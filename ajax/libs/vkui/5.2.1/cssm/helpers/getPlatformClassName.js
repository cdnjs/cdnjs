import { platform } from '../lib/platform';
export function getPlatformClassName(base) {
  var osname = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : platform();
  var
  /**
   * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
   *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
   */
  styles = arguments.length > 2 ? arguments[2] : undefined;
  var platformClassName = "".concat(String(base), "--").concat(osname);
  return styles ? styles[platformClassName] : platformClassName;
}
//# sourceMappingURL=getPlatformClassName.js.map