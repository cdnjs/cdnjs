export function getHoverClassName(base, hover,
/**
 * Note: ввиду того, что Typescript не поддерживает `typescript-plugin-css-modules` во время компиляции,
 *  не удалось покрыть дженерик типом параметр `styles`. Поэтому может вернуться undefined.
 */
styles) {
  var hoverState = 'none';
  if (hover === true) {
    hoverState = 'has';
  } else if (hover === false) {
    hoverState = 'has-not';
  }
  var hoverClassName = "".concat(String(base), "--hover-").concat(hoverState);
  return styles ? styles[hoverClassName] : hoverClassName;
}
//# sourceMappingURL=getHoverClassName.js.map