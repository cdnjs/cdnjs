export function getSizeXClassName(base) {
  var sizeX = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  var
  /**
   * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
   *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
   */
  styles = arguments.length > 2 ? arguments[2] : undefined;
  var sizeXClassName = "".concat(String(base), "--sizeX-").concat(sizeX);
  return styles ? styles[sizeXClassName] : sizeXClassName;
}
//# sourceMappingURL=getSizeXClassName.js.map