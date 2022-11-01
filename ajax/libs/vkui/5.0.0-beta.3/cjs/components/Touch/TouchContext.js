"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
/**
 * Контекст для компонентов, использующих Touch в качестве корневой обёртки,
 * и для которых важно не предотвращать всплытие тач-событий от дочерних компонентов
 */
var TouchRootContext = /*#__PURE__*/React.createContext(false);

// eslint-disable-next-line import/no-default-export
var _default = TouchRootContext;
exports.default = _default;
//# sourceMappingURL=TouchContext.js.map