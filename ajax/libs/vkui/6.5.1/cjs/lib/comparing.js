/**
 * Определяет, является ли значение не `undefined`
 *
 * ## Пример
 *
 * ```ts
 * import { strict as assert } from 'node:assert';
 *
 * assert.equal(isNotUndefined("Some string"), true);
 * assert.equal(isNotUndefined(undefined), false);
 * ```
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "minOr", {
    enumerable: true,
    get: function() {
        return minOr;
    }
});
function isNotUndefined(value) {
    return value !== undefined;
}
/**
 * Фильтрует `undefined` значения и возвращает результат выполнение `fn`. Если
 * значений не существует, вернется значение по умолчанию `defaultValue`.
 */ function fnArgsOr(fn, args, defaultValue) {
    const definedArgs = args.filter(isNotUndefined);
    if (definedArgs.length) {
        return fn(...definedArgs);
    }
    return defaultValue;
}
function minOr(args, defaultValue) {
    return fnArgsOr(Math.min, args, defaultValue);
}

//# sourceMappingURL=comparing.js.map