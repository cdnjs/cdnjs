"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _utils = require("@material-ui/utils");

var useEnhancedEffect = typeof window !== 'undefined' && process.env.NODE_ENV !== 'test' ? React.useLayoutEffect : React.useEffect;
/**
 * NoSsr purposely removes components from the subject of Server Side Rendering (SSR).
 *
 * This component can be useful in a variety of situations:
 * - Escape hatch for broken dependencies not supporting SSR.
 * - Improve the time-to-first paint on the client by only rendering above the fold.
 * - Reduce the rendering time on the server.
 * - Under too heavy server load, you can turn on service degradation.
 */

function NoSsr(props) {
  var children = props.children,
      _props$defer = props.defer,
      defer = _props$defer === void 0 ? false : _props$defer,
      _props$fallback = props.fallback,
      fallback = _props$fallback === void 0 ? null : _props$fallback;

  var _React$useState = React.useState(false),
      mountedState = _React$useState[0],
      setMountedState = _React$useState[1];

  useEnhancedEffect(function () {
    if (!defer) {
      setMountedState(true);
    }
  }, [defer]);
  React.useEffect(function () {
    if (defer) {
      setMountedState(true);
    }
  }, [defer]); // We need the Fragment here to force react-docgen to recognise NoSsr as a component.

  return /*#__PURE__*/React.createElement(React.Fragment, null, mountedState ? children : fallback);
}

process.env.NODE_ENV !== "production" ? NoSsr.propTypes = {
  // ----------------------------- Warning --------------------------------
  // | These PropTypes are generated from the TypeScript type definitions |
  // |     To update them edit the d.ts file and run "yarn proptypes"     |
  // ----------------------------------------------------------------------

  /**
   * You can wrap a node.
   */
  children: _propTypes.default.node,

  /**
   * If `true`, the component will not only prevent server-side rendering.
   * It will also defer the rendering of the children into a different screen frame.
   */
  defer: _propTypes.default.bool,

  /**
   * The fallback content to display.
   */
  fallback: _propTypes.default.node
} : void 0;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  NoSsr['propTypes' + ''] = (0, _utils.exactProp)(NoSsr.propTypes);
}

var _default = NoSsr;
exports.default = _default;