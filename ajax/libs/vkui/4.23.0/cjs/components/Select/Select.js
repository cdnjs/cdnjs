"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _NativeSelect = _interopRequireDefault(require("../NativeSelect/NativeSelect"));

var _CustomSelect = _interopRequireDefault(require("../CustomSelect/CustomSelect"));

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["hasMouse"],
    _excluded2 = ["children"],
    _excluded3 = ["options", "popupDirection", "renderOption"];

var Select = function Select(_ref) {
  var hasMouse = _ref.hasMouse,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  // Use custom select if device has connected a mouse
  if (hasMouse) {
    var children = props.children,
        _restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);

    return (0, _jsxRuntime.createScopedElement)(_CustomSelect.default, _restProps);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      popupDirection = props.popupDirection,
      renderOption = props.renderOption,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded3);
  return (0, _jsxRuntime.createScopedElement)(_NativeSelect.default, restProps, options.map(function (_ref2) {
    var label = _ref2.label,
        value = _ref2.value;
    return (0, _jsxRuntime.createScopedElement)("option", {
      value: value,
      key: "".concat(value)
    }, label);
  }));
};

var _default = (0, _withAdaptivity.withAdaptivity)(Select, {
  hasMouse: true
});

exports.default = _default;
//# sourceMappingURL=Select.js.map