/*
 * Задает стиль трансформации элементу с учетом префиксов
 */ export function setTransformStyle(element, transform) {
    if (element) {
        element.style.transform = transform;
        element.style.webkitTransform = transform;
    }
}

//# sourceMappingURL=styles.js.map