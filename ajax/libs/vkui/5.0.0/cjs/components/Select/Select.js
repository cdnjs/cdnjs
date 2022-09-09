"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectTypography = exports.Select = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _NativeSelect = require("../NativeSelect/NativeSelect");

var _CustomSelect = require("../CustomSelect/CustomSelect");

var _useAdaptivity3 = require("../../hooks/useAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _getSizeYClassName = require("../../helpers/getSizeYClassName");

var _getMouseClassName = require("../../helpers/getMouseClassName");

var _excluded = ["selectType", "children"],
    _excluded2 = ["children", "options", "popupDirection", "renderOption"];

/**
 * @see https://vkcom.github.io/VKUI/#/SelectTypography
 */
var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? "default" : _ref$selectType,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity3.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)("span", (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("SelectTypography", platform), (0, _getSizeYClassName.getSizeYClassName)("SelectTypography", sizeY), "SelectTypography--selectType-".concat(selectType))
  }, restProps), children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */


exports.SelectTypography = SelectTypography;

var Select = function Select(_ref2) {
  var children = _ref2.children,
      _ref2$options = _ref2.options,
      options = _ref2$options === void 0 ? [] : _ref2$options,
      popupDirection = _ref2.popupDirection,
      renderOption = _ref2.renderOption,
      props = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);

  var _useAdaptivity2 = (0, _useAdaptivity3.useAdaptivity)(),
      hasMouse = _useAdaptivity2.hasMouse;

  return (0, _jsxRuntime.createScopedElement)(React.Fragment, null, (hasMouse === undefined || hasMouse === true) && (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("Select__custom", (0, _getMouseClassName.getMouseClassName)("Select__custom", hasMouse)),
    options: options,
    popupDirection: popupDirection,
    renderOption: renderOption
  }, props)), (hasMouse === undefined || hasMouse === false) && (0, _jsxRuntime.createScopedElement)(_NativeSelect.NativeSelect, (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)("Select__native", (0, _getMouseClassName.getMouseClassName)("Select__native", hasMouse))
  }, props), options.map(function (_ref3) {
    var label = _ref3.label,
        value = _ref3.value;
    return (0, _jsxRuntime.createScopedElement)("option", {
      value: value,
      key: "".concat(value)
    }, label);
  })));
};

exports.Select = Select;
//# sourceMappingURL=Select.js.map