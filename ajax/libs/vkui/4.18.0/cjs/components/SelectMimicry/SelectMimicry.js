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

var _icons = require("@vkontakte/icons");

var _FormField = require("../FormField/FormField");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _usePlatform = require("../../hooks/usePlatform");

var _getClassName = require("../../helpers/getClassName");

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _platform = require("../../lib/platform");

var _excluded = ["tabIndex", "placeholder", "children", "align", "getRootRef", "multiline", "disabled", "onClick", "sizeX", "sizeY"];

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
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var TypographyComponent = platform === _platform.VKCOM || sizeY === _withAdaptivity.SizeType.COMPACT ? _Text.default : _Headline.default;
  return (0, _jsxRuntime.createScopedElement)(_FormField.FormField, (0, _extends2.default)({}, restProps, {
    tabIndex: disabled ? null : tabIndex,
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)('Select', platform), 'Select--mimicry', (_classNames = {
      'Select--not-selected': !children,
      'Select--multiline': multiline
    }, (0, _defineProperty2.default)(_classNames, "Select--align-".concat(align), !!align), (0, _defineProperty2.default)(_classNames, "Select--sizeX--".concat(sizeX), !!sizeX), (0, _defineProperty2.default)(_classNames, "Select--sizeY--".concat(sizeY), !!sizeY), _classNames)),
    getRootRef: getRootRef,
    onClick: disabled ? null : onClick,
    disabled: disabled,
    after: sizeY === _withAdaptivity.SizeType.COMPACT ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20Dropdown, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24Dropdown, null)
  }), (0, _jsxRuntime.createScopedElement)(TypographyComponent, {
    Component: "div",
    weight: "regular",
    vkuiClass: "Select__container"
  }, (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Select__title"
  }, children || placeholder)));
};

SelectMimicry.defaultProps = {
  tabIndex: 0
};

var _default = (0, _withAdaptivity.withAdaptivity)(SelectMimicry, {
  sizeX: true,
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=SelectMimicry.js.map