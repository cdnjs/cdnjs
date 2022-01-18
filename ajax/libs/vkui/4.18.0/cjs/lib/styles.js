"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setTransformStyle = setTransformStyle;

/*
 * Задает стиль трансформации элементу с учетом префиксов
 */
function setTransformStyle(element, transform) {
  element.style.transform = transform;
  element.style.webkitTransform = transform;
}
//# sourceMappingURL=styles.js.map