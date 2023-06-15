"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormStatus = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Banner = require("../Banner/Banner");
var _excluded = ["mode", "children", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/FormStatus
 */
var FormStatus = function FormStatus(_ref) {
  var mode = _ref.mode,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_Banner.Banner, (0, _extends2.default)({}, restProps, {
    subheader: children,
    className: (0, _vkjs.classNames)("vkuiFormStatus", mode === 'error' && "vkuiFormStatus--mode-error", className)
  }));
};
exports.FormStatus = FormStatus;
//# sourceMappingURL=FormStatus.js.map