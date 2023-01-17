"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelSpinner = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _Spinner = require("../Spinner/Spinner");
var _excluded = ["height", "style"];
/**
 * @see https://vkcom.github.io/VKUI/#/PanelSpinner
 */
var PanelSpinner = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$height = _ref.height,
    height = _ref$height === void 0 ? 96 : _ref$height,
    style = _ref.style,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_Spinner.Spinner, (0, _extends2.default)({
    size: "regular"
  }, restProps, {
    style: (0, _objectSpread2.default)({
      height: height
    }, style)
  }));
});
exports.PanelSpinner = PanelSpinner;
PanelSpinner.displayName = 'PanelSpinner';
//# sourceMappingURL=PanelSpinner.js.map