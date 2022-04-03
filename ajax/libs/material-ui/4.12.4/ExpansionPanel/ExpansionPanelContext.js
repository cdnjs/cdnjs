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
var ExpansionPanelContext = React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ExpansionPanelContext.displayName = 'ExpansionPanelContext';
}

var _default = ExpansionPanelContext;
exports.default = _default;