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
const ImageListContext = /*#__PURE__*/React.createContext({});

if (process.env.NODE_ENV !== 'production') {
  ImageListContext.displayName = 'ImageListContext';
}

var _default = ImageListContext;
exports.default = _default;