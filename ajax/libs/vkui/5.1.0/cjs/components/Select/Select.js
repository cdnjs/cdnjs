"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectTypography = exports.Select = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _NativeSelect = require("../NativeSelect/NativeSelect");
var _CustomSelect = require("../CustomSelect/CustomSelect");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _usePlatform = require("../../hooks/usePlatform");
var _vkjs = require("@vkontakte/vkjs");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["selectType", "children", "className"],
  _excluded2 = ["children", "options", "popupDirection", "renderOption", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/SelectTypography
 */
var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
    selectType = _ref$selectType === void 0 ? 'default' : _ref$selectType,
    children = _ref.children,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement("span", (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiSelectTypography", (0, _getPlatformClassName.getPlatformClassName)("vkuiSelectTypography", platform), (0, _getSizeYClassName.getSizeYClassName)("vkuiSelectTypography", sizeY), styles["SelectTypography--selectType-".concat(selectType)], className)
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
    className = _ref2.className,
    props = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
  return /*#__PURE__*/React.createElement(React.Fragment, null, (hasPointer === undefined || hasPointer) && /*#__PURE__*/React.createElement(_CustomSelect.CustomSelect, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiSelect__custom", className),
    options: options,
    popupDirection: popupDirection,
    renderOption: renderOption
  }, props)), (hasPointer === undefined || !hasPointer) && /*#__PURE__*/React.createElement(_NativeSelect.NativeSelect, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiSelect__native", className)
  }, props), options.map(function (_ref3) {
    var label = _ref3.label,
      value = _ref3.value;
    return /*#__PURE__*/React.createElement("option", {
      value: value,
      key: "".concat(value)
    }, label);
  })));
};
exports.Select = Select;
var styles = {
  "SelectTypography--selectType-accent": "vkuiSelectTypography--selectType-accent",
  "SelectTypography--selectType-default": "vkuiSelectTypography--selectType-default",
  "SelectTypography--selectType-plain": "vkuiSelectTypography--selectType-plain"
};
//# sourceMappingURL=Select.js.map