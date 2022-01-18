"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames2 = require("../../lib/classNames");

var _FormField = require("../FormField/FormField");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["align", "getRef", "className", "getRootRef", "sizeY", "style", "after"];

var Input = function Input(_ref) {
  var align = _ref.align,
      getRef = _ref.getRef,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      style = _ref.style,
      after = _ref.after,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, {
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)('Input', platform), (0, _defineProperty2.default)({}, "Input--".concat(align), !!align), "Input--sizeY-".concat(sizeY)),
    style: style,
    className: className,
    getRootRef: getRootRef,
    after: after,
    disabled: restProps.disabled
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    vkuiClass: "Input__el",
    ref: getRef
  })));
};

Input.defaultProps = {
  type: 'text'
};

var _default = (0, _withAdaptivity.withAdaptivity)(Input, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=Input.js.map