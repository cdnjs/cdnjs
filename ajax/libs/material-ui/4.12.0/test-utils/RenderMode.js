"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderContext = RenderContext;
exports.useIsSsr = useIsSsr;

var React = _interopRequireWildcard(require("react"));

var PropTypes = _interopRequireWildcard(require("prop-types"));

var Context = React.createContext();

if (process.env.NODE_ENV !== 'production') {
  Context.displayName = 'RenderContext';
}
/**
 * @ignore - internal component.
 */


function RenderContext(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/React.createElement(Context.Provider, {
    value: "render"
  }, children);
}

process.env.NODE_ENV !== "production" ? RenderContext.propTypes = {
  children: PropTypes.node.isRequired
} : void 0;

function useIsSsr() {
  return React.useContext(Context) === 'render';
}