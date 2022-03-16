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

var _classNames2 = require("../../lib/classNames");

var _DropdownIcon = require("../DropdownIcon/DropdownIcon");

var _FormField = require("../FormField/FormField");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _platform = require("../../lib/platform");

var _CustomSelect = require("../CustomSelect/CustomSelect");

var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "sizeX", "sizeY", "after", "selectType"];

var SelectMimicry = function SelectMimicry(_ref) {
  var _classNames;

  var tabIndex = _ref.tabIndex,
      placeholder = _ref.placeholder,
      children = _ref.children,
      align = _ref.align,
      getRootRef = _ref.getRootRef,
      multiline = _ref.multiline,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      sizeX = _ref.sizeX,
      sizeY = _ref.sizeY,
      _ref$after = _ref.after,
      after = _ref$after === void 0 ? (0, _jsxRuntime.createScopedElement)(_DropdownIcon.DropdownIcon, null) : _ref$after,
      _ref$selectType = _ref.selectType,
      selectType = _ref$selectType === void 0 ? _CustomSelect.SelectType.Default : _ref$selectType,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var TypographyComponent = platform === _platform.VKCOM || sizeY === _withAdaptivity.SizeType.COMPACT ? _Text.default : _Headline.default;
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, (0, _extends2.default)({}, restProps, {
    tabIndex: disabled ? undefined : tabIndex,
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)("Select", platform), "Select--mimicry", "Select--mimicry-".concat(selectType), (_classNames = {
      "Select--not-selected": !children,
      "Select--multiline": multiline
    }, (0, _defineProperty2.default)(_classNames, "Select--align-".concat(align), !!align), (0, _defineProperty2.default)(_classNames, "Select--sizeX--".concat(sizeX), !!sizeX), (0, _defineProperty2.default)(_classNames, "Select--sizeY--".concat(sizeY), !!sizeY), _classNames)),
    getRootRef: getRootRef,
    onClick: disabled ? undefined : onClick,
    disabled: disabled,
    after: after
  }), (0, _jsxRuntime.createScopedElement)(TypographyComponent, {
    Component: "div",
    weight: selectType === _CustomSelect.SelectType.Plain ? "semibold" : "regular",
    vkuiClass: (0, _classNames2.classNames)("Select__container", "Select__container--".concat(selectType))
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Select__title"
  }, children || placeholder)));
};

SelectMimicry.defaultProps = {
  tabIndex: 0
}; // eslint-disable-next-line import/no-default-export

var _default = (0, _withAdaptivity.withAdaptivity)(SelectMimicry, {
  sizeX: true,
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=SelectMimicry.js.map