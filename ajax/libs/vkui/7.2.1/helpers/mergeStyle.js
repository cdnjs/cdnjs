/**
 * Мержит стили, пытаясь уменьшить кол-во копирований
 *
 * ## Пример
 *
 * ```ts
 * const style = mergeStyle(arrowStyles, styleProp)
 * ```
 */ import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
export function mergeStyle(a, b) {
    return a && b ? _object_spread({}, a, b) : a || b;
}

//# sourceMappingURL=mergeStyle.js.map