"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Switch = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _useExternRef = require("../../hooks/useExternRef");

var _excluded = ["style", "className", "getRef", "getRootRef", "sizeY"];
var Switch = (0, _withAdaptivity.withAdaptivity)(function (_ref) {
  var style = _ref.style,
      className = _ref.className,
      getRef = _ref.getRef,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var inputRef = (0, _useExternRef.useExternRef)(getRef);
  return (0, _jsxRuntime.createScopedElement)("label", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Switch', platform), "Switch--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    ref: getRootRef
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    type: "checkbox",
    vkuiClass: "Switch__self",
    ref: inputRef
  })), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Switch__pseudo"
  }));
}, {
  sizeY: true
});
exports.Switch = Switch;
//# sourceMappingURL=Switch.js.map