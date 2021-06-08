"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

/**
 * @ignore - internal component.
 */
const GridContext = /*#__PURE__*/React.createContext();

if (process.env.NODE_ENV !== 'production') {
  GridContext.displayName = 'GridContext';
}

var _default = GridContext;
exports.default = _default;