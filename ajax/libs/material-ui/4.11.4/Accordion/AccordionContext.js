"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

/**
 * @ignore - internal component.
 * @type {React.Context<{} | {expanded: boolean, disabled: boolean, toggle: () => void}>}
 */
var AccordionContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

var _default = AccordionContext;
exports.default = _default;