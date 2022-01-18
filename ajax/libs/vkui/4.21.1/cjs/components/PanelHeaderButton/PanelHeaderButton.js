"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PanelHeaderButton = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _jsxRuntime = require("../../lib/jsxRuntime");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _platform = require("../../lib/platform");

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _excluded = ["children", "primary", "label"];

var ButtonTypography = function ButtonTypography(_ref) {
  var primary = _ref.primary,
      children = _ref.children;
  var platform = (0, _usePlatform.usePlatform)();

  if (platform === _platform.IOS) {
    return (0, _jsxRuntime.createScopedElement)(_Title.default, {
      Component: "span",
      level: "3",
      weight: primary ? 'semibold' : 'regular'
    }, children);
  }

  return (0, _jsxRuntime.createScopedElement)(_Text.default, {
    weight: platform === _platform.VKCOM ? 'regular' : 'medium'
  }, children);
};

var PanelHeaderButton = function PanelHeaderButton(_ref2) {
  var children = _ref2.children,
      primary = _ref2.primary,
      label = _ref2.label,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded);
  var isPrimitive = (0, _utils.isPrimitiveReactNode)(children);
  var isPrimitiveLabel = (0, _utils.isPrimitiveReactNode)(label);
  var platform = (0, _usePlatform.usePlatform)();
  var hoverMode;
  var activeMode;

  switch (platform) {
    case _platform.ANDROID:
      hoverMode = 'background';
      activeMode = 'background';
      break;

    case _platform.IOS:
      hoverMode = 'background';
      activeMode = 'opacity';
      break;

    case _platform.VKCOM:
      hoverMode = 'PanelHeaderButton--hover';
      activeMode = 'PanelHeaderButton--active';
  }

  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    hoverMode: hoverMode,
    Component: restProps.href ? 'a' : 'button',
    activeEffectDelay: 200,
    activeMode: activeMode,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('PanelHeaderButton', platform), {
      'PanelHeaderButton--primary': primary,
      'PanelHeaderButton--primitive': isPrimitive,
      'PanelHeaderButton--notPrimitive': !isPrimitive && !isPrimitiveLabel
    })
  }), isPrimitive ? (0, _jsxRuntime.createScopedElement)(ButtonTypography, {
    primary: primary
  }, children) : children, isPrimitiveLabel ? (0, _jsxRuntime.createScopedElement)(ButtonTypography, {
    primary: primary
  }, label) : label);
};

exports.PanelHeaderButton = PanelHeaderButton;
PanelHeaderButton.defaultProps = {
  'primary': false,
  'aria-label': 'Закрыть'
};
//# sourceMappingURL=PanelHeaderButton.js.map