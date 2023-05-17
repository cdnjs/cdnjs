"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Input = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _classNames = require("../../lib/classNames");
var _FormField = require("../FormField/FormField");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _excluded = ["type", "align", "getRef", "className", "getRootRef", "sizeY", "style", "before", "after", "status"];
var InputComponent = function InputComponent(_ref) {
  var _ref$type = _ref.type,
    type = _ref$type === void 0 ? "text" : _ref$type,
    align = _ref.align,
    getRef = _ref.getRef,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    sizeY = _ref.sizeY,
    style = _ref.style,
    before = _ref.before,
    after = _ref.after,
    status = _ref.status,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, {
    vkuiClass: (0, _classNames.classNames)("Input", !!align && "Input--".concat(align), "Input--sizeY-".concat(sizeY),
    // TODO v5.0.0 поправить под новую адаптивность
    before && "Input--hasBefore", after && "Input--hasAfter"),
    style: style,
    className: className,
    getRootRef: getRootRef,
    before: before,
    after: after,
    disabled: restProps.disabled,
    status: status
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    type: type,
    vkuiClass: "Input__el",
    ref: getRef
  })));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Input
 */
var Input = (0, _withAdaptivity.withAdaptivity)(InputComponent, {
  sizeY: true
});
exports.Input = Input;
Input.displayName = "Input";
//# sourceMappingURL=Input.js.map