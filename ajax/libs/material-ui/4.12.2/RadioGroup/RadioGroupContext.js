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
var RadioGroupContext = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  RadioGroupContext.displayName = 'RadioGroupContext';
}

var _default = RadioGroupContext;
exports.default = _default;