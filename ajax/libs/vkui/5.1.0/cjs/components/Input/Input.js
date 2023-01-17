"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _FormField = require("../FormField/FormField");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _excluded = ["type", "align", "getRef", "className", "getRootRef", "style", "before", "after", "status"];
/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */
var Input = function Input(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? 'text' : _ref$type,
    align = _ref.align,
    getRef = _ref.getRef,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    style = _ref.style,
    before = _ref.before,
    after = _ref.after,
    status = _ref.status,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(_FormField.FormField, {
    style: style,
    className: (0, _vkjs.classNames)("vkuiInput", align && styles["Input--align-".concat(align)], (0, _getSizeYClassName.getSizeYClassName)("vkuiInput", sizeY), before && "vkuiInput--hasBefore", after && "vkuiInput--hasAfter", className),
    getRootRef: getRootRef,
    before: before,
    after: after,
    disabled: restProps.disabled,
    status: status
  }, /*#__PURE__*/React.createElement("input", (0, _extends2.default)({}, restProps, {
    type: type,
    className: "vkuiInput__el",
    ref: getRef
  })));
};
exports.Input = Input;
var styles = {
  "Input--align-center": "vkuiInput--align-center",
  "Input--align-right": "vkuiInput--align-right",
  "Input--align-left": "vkuiInput--align-left"
};
//# sourceMappingURL=Input.js.map