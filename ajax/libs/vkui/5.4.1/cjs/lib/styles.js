/*
 * Задает стиль трансформации элементу с учетом префиксов
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "setTransformStyle", {
    enumerable: true,
    get: function() {
        return setTransformStyle;
    }
});
function setTransformStyle(element, transform) {
    if (element) {
        element.style.transform = transform;
        element.style.webkitTransform = transform;
    }
}

//# sourceMappingURL=styles.js.map