"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, // eslint-disable-next-line import/no-default-export
"default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
/**
 * Контекст для компонентов, использующих Touch в качестве корневой обёртки,
 * и для которых важно не предотвращать всплытие тач-событий от дочерних компонентов
 */ const TouchRootContext = _react.createContext(false);
const _default = TouchRootContext;

//# sourceMappingURL=TouchContext.js.map