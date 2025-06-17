/**
 * Мержит стили, пытаясь уменьшить кол-во копирований
 *
 * ## Пример
 *
 * ```ts
 * const style = mergeStyle(arrowStyles, styleProp)
 * ```
 */ export function mergeStyle(a, b) {
    return a && b ? {
        ...a,
        ...b
    } : a || b;
}

//# sourceMappingURL=mergeStyle.js.map