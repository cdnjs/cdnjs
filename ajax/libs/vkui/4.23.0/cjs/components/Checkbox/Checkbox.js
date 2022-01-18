"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Checkbox = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Tappable = _interopRequireWildcard(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _platform = require("../../lib/platform");

var _icons = require("@vkontakte/icons");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _excluded = ["children", "className", "style", "getRootRef", "getRef", "sizeY"];

var Checkbox = function Checkbox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      sizeY = _ref.sizeY,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var ContentComponent = platform === _platform.VKCOM || sizeY === _withAdaptivity.SizeType.COMPACT ? _Text.default : _Headline.default;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, {
    Component: "label",
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Checkbox', platform), "Checkbox--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === _platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({}, restProps, {
    type: "checkbox",
    vkuiClass: "Checkbox__input",
    ref: getRef
  })), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__container"
  }, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--on"
  }, sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxOn, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckBoxOn, null)), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--off"
  }, sizeY === _withAdaptivity.SizeType.COMPACT || platform === _platform.VKCOM ? (0, _jsxRuntime.createScopedElement)(_icons.Icon20CheckBoxOff, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24CheckBoxOff, null)), (0, _jsxRuntime.createScopedElement)(ContentComponent, {
    weight: "regular",
    vkuiClass: "Checkbox__content"
  }, children)));
};

exports.Checkbox = Checkbox;

var _default = (0, _withAdaptivity.withAdaptivity)(Checkbox, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=Checkbox.js.map