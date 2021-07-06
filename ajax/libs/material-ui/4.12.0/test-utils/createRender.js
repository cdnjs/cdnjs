"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createRender;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _enzyme = require("enzyme");

var React = _interopRequireWildcard(require("react"));

var _RenderMode = require("./RenderMode");

var warnedOnce = false;
/**
 * Generate a render to string function.
 * @deprecated to remvoe in v5
 */

function createRender() {
  var options1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!warnedOnce) {
    warnedOnce = true;
    console.warn(['Material-UI: the test utils are deprecated, they are no longer present in v5.', 'The helpers were designed to work with enzyme.', 'However, the tests of the core components were moved to react-testing-library.'].join('\n'));
  }

  var _options1$render = options1.render,
      render = _options1$render === void 0 ? _enzyme.render : _options1$render,
      other1 = (0, _objectWithoutProperties2.default)(options1, ["render"]);

  var renderWithContext = function renderWithContext(node) {
    var options2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return render( /*#__PURE__*/React.createElement(_RenderMode.RenderContext, null, node), (0, _extends2.default)({}, other1, options2));
  };

  return renderWithContext;
}