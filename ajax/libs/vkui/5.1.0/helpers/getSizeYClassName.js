export function getSizeYClassName(base) {
  var sizeY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'none';
  var
  /**
   * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
   *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
   */
  styles = arguments.length > 2 ? arguments[2] : undefined;
  var sizeYClassName = "".concat(String(base), "--sizeY-").concat(sizeY);
  return styles ? styles[sizeYClassName] : sizeYClassName;
}
//# sourceMappingURL=getSizeYClassName.js.map