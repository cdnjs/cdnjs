/**
 * Вернёт первый аргумент если он есть, иначе вернёт значение по умолчанию.
 */ "use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getOrDefault", {
    enumerable: true,
    get: function() {
        return getOrDefault;
    }
});
function getOrDefault(value, defaultValue) {
    return value !== null && value !== void 0 ? value : defaultValue;
}

//# sourceMappingURL=getOrDefault.js.map