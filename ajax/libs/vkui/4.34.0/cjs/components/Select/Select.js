"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SelectTypography = exports.SelectType = exports.Select = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _NativeSelect = require("../NativeSelect/NativeSelect");

var _CustomSelect = require("../CustomSelect/CustomSelect");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _AdaptivityContext = require("../AdaptivityProvider/AdaptivityContext");

var _Paragraph = require("../Typography/Paragraph/Paragraph");

var _Text = require("../Typography/Text/Text");

var _Headline = require("../Typography/Headline/Headline");

var _excluded = ["selectType", "children"],
    _excluded2 = ["hasMouse"],
    _excluded3 = ["children"],
    _excluded4 = ["options", "popupDirection", "renderOption"];
var SelectType = {
  default: "default",
  plain: "plain",
  accent: "accent"
}; // TODO v5.0.0 поправить под новую адаптивность

/**
 * @see https://vkcom.github.io/VKUI/#/SelectTypography
 */

exports.SelectType = SelectType;

var SelectTypography = function SelectTypography(_ref) {
  var _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? SelectType.default : _ref$selectType,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  if (selectType === SelectType.accent) {
    return (0, _jsxRuntime.createScopedElement)(_Paragraph.Paragraph, (0, _extends2.default)({
      weight: platform === _platform.Platform.ANDROID ? "2" : "1"
    }, restProps), children);
  }

  var Component = platform === _platform.VKCOM || sizeY === _AdaptivityContext.SizeType.COMPACT ? _Text.Text : _Headline.Headline;
  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({
    Component: "span"
  }, restProps), children);
};

exports.SelectTypography = SelectTypography;

var SelectComponent = function SelectComponent(_ref2) {
  var hasMouse = _ref2.hasMouse,
      props = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);

  // Use custom select if device has connected a mouse
  if (hasMouse) {
    var children = props.children,
        _restProps = (0, _objectWithoutProperties2.default)(props, _excluded3);

    return (0, _jsxRuntime.createScopedElement)(_CustomSelect.CustomSelect, _restProps);
  }

  var _props$options = props.options,
      options = _props$options === void 0 ? [] : _props$options,
      popupDirection = props.popupDirection,
      renderOption = props.renderOption,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded4);
  return (0, _jsxRuntime.createScopedElement)(_NativeSelect.NativeSelect, restProps, options.map(function (_ref3) {
    var label = _ref3.label,
        value = _ref3.value;
    return (0, _jsxRuntime.createScopedElement)("option", {
      value: value,
      key: "".concat(value)
    }, label);
  }));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Select
 */


var Select = (0, _withAdaptivity.withAdaptivity)(SelectComponent, {
  hasMouse: true
});
exports.Select = Select;
//# sourceMappingURL=Select.js.map