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
 */ function isNotUndefined(value) {
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
/**
 * Функция для определения минимального числа. Если чисел не существует,
 * вернется значение по умолчанию `defaultValue`.
 *
 * ## Пример
 *
 * ```js
 * import { strict as assert } from 'node:assert';
 *
 * const defaultValue = 24;
 * assert.equal(minOr([48, 10, 12], defaultValue), 10);
 * assert.equal(minOr([undefined], defaultValue), 24);
 * ```
 */ export function minOr(args, defaultValue) {
    return fnArgsOr(Math.min, args, defaultValue);
}

//# sourceMappingURL=comparing.js.map