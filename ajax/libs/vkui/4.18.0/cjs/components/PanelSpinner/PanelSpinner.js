"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _Spinner = _interopRequireDefault(require("../Spinner/Spinner"));

var _excluded = ["height", "style"];

var PanelSpinner = function PanelSpinner(_ref) {
  var height = _ref.height,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_Spinner.default, (0, _extends2.default)({
    size: "regular"
  }, restProps, {
    style: (0, _objectSpread2.default)({
      height: height
    }, style)
  }));
};

PanelSpinner.defaultProps = {
  height: 96
};

var _default = /*#__PURE__*/React.memo(PanelSpinner);

exports.default = _default;
//# sourceMappingURL=PanelSpinner.js.map