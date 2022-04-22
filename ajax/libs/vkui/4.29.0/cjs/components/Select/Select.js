"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Select = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _NativeSelect = _interopRequireDefault(require("../NativeSelect/NativeSelect"));

var _CustomSelect = require("../CustomSelect/CustomSelect");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["hasMouse"],
    _excluded2 = ["children"],
    _excluded3 = ["options", "popupDirection", "renderOption"];

var SelectComponent = function SelectComponent(_ref) {
  var hasMouse = _ref.hasMouse,
      props = (0, _objectWithoutProperties2.default)(_ref, _excluded);

  // Use custom select if device has connected a mouse
  if (hasMouse) {
    var children = props.children,
        _restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);

    return (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, _restProps);
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

var Select = (0, _withAdaptivity.withAdaptivity)(SelectComponent, {
  hasMouse: true
});
exports.Select = Select;
//# sourceMappingURL=Select.js.map