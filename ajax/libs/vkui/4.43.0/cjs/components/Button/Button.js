"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _classNames = require("../../lib/classNames");
var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");
var _Tappable = require("../Tappable/Tappable");
var _Title = require("../Typography/Title/Title");
var _Text = require("../Typography/Text/Text");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Caption = require("../Typography/Caption/Caption");
var _usePlatform = require("../../hooks/usePlatform");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _platform = require("../../lib/platform");
var _Spinner = require("../Spinner/Spinner");
var _Headline = require("../Typography/Headline/Headline");
var _excluded = ["size", "sizeY", "platform"],
  _excluded2 = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "sizeY", "Component", "loading", "onClick", "stopPropagation"];
var ButtonTypography = function ButtonTypography(_ref) {
  var size = _ref.size,
    sizeY = _ref.sizeY,
    platform = _ref.platform,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var isCompact = sizeY === _withAdaptivity.SizeType.COMPACT;
  switch (size) {
    case "l":
      if (isCompact) {
        return (0, _jsxRuntime.createScopedElement)(_Text.Text, (0, _extends2.default)({
          weight: "2"
        }, restProps));
      }
      if (platform === _platform.ANDROID) {
        return (0, _jsxRuntime.createScopedElement)(_Headline.Headline, (0, _extends2.default)({
          weight: "2"
        }, restProps));
      }
      return (0, _jsxRuntime.createScopedElement)(_Title.Title, (0, _extends2.default)({
        level: "3",
        weight: "2"
      }, restProps));
    case "m":
      if (isCompact) {
        return (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, (0, _extends2.default)({
          weight: platform === _platform.VKCOM ? "3" : "2"
        }, restProps));
      }
      return (0, _jsxRuntime.createScopedElement)(_Text.Text, (0, _extends2.default)({
        weight: "2"
      }, restProps));
    case "s":
    default:
      if (platform === _platform.IOS) {
        return (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, (0, _extends2.default)({
          weight: "2"
        }, restProps));
      }
      if (platform === _platform.VKCOM) {
        return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, restProps);
      }
      if (isCompact) {
        return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
          weight: "2"
        }, restProps));
      }
      return (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, (0, _extends2.default)({
        weight: "2"
      }, restProps));
  }
};
function resolveButtonAppearance(appearance, mode) {
  var resolvedAppearance = appearance;
  var resolvedMode = mode;
  if (appearance === undefined) {
    switch (mode) {
      case "tertiary":
      case "secondary":
      case "primary":
      case "outline":
        resolvedAppearance = "accent";
        break;
      case "commerce":
        resolvedMode = "primary";
        resolvedAppearance = "positive";
        break;
      case "destructive":
        resolvedMode = "primary";
        resolvedAppearance = "negative";
        break;
      case "overlay_primary":
        resolvedMode = "primary";
        resolvedAppearance = "overlay";
        break;
      case "overlay_secondary":
        resolvedMode = "secondary";
        resolvedAppearance = "overlay";
        break;
      case "overlay_outline":
        resolvedMode = "outline";
        resolvedAppearance = "overlay";
        break;
    }
  }
  return {
    resolvedAppearance: resolvedAppearance,
    resolvedMode: resolvedMode
  };
}
var ButtonComponent = function ButtonComponent(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? "s" : _ref2$size,
    _ref2$mode = _ref2.mode,
    mode = _ref2$mode === void 0 ? "primary" : _ref2$mode,
    appearance = _ref2.appearance,
    _ref2$stretched = _ref2.stretched,
    stretched = _ref2$stretched === void 0 ? false : _ref2$stretched,
    _ref2$align = _ref2.align,
    align = _ref2$align === void 0 ? "center" : _ref2$align,
    children = _ref2.children,
    before = _ref2.before,
    after = _ref2.after,
    getRootRef = _ref2.getRootRef,
    sizeY = _ref2.sizeY,
    _ref2$Component = _ref2.Component,
    Component = _ref2$Component === void 0 ? "button" : _ref2$Component,
    loading = _ref2.loading,
    onClick = _ref2.onClick,
    _ref2$stopPropagation = _ref2.stopPropagation,
    stopPropagation = _ref2$stopPropagation === void 0 ? true : _ref2$stopPropagation,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();
  var hasIcons = Boolean(before || after);
  var hasIconOnly = !children && Boolean(after) !== Boolean(before);
  var _resolveButtonAppeara = resolveButtonAppearance(appearance, mode),
    resolvedMode = _resolveButtonAppeara.resolvedMode,
    resolvedAppearance = _resolveButtonAppeara.resolvedAppearance;
  var hasNewTokens = React.useContext(_ConfigProviderContext.ConfigProviderContext).hasNewTokens;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    hoverMode: hasNewTokens ? "Button--hover" : "background",
    activeMode: hasNewTokens ? "Button--active" : "opacity"
  }, restProps, {
    Component: restProps.href ? "a" : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    stopPropagation: stopPropagation,
    vkuiClass: (0, _classNames.classNames)("Button", "Button--sz-".concat(size), "Button--lvl-".concat(resolvedMode), "Button--clr-".concat(resolvedAppearance), "Button--aln-".concat(align), "Button--sizeY-".concat(sizeY), stretched && "Button--stretched", hasIcons && "Button--with-icon", hasIconOnly && "Button--singleIcon", loading && "Button--loading"),
    getRootRef: getRootRef
  }), loading && (0, _jsxRuntime.createScopedElement)(_Spinner.Spinner, {
    size: "small",
    vkuiClass: "Button__spinner"
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Button__in"
  }, before && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Button__before",
    role: "presentation"
  }, before), children && (0, _jsxRuntime.createScopedElement)(ButtonTypography, {
    size: size,
    sizeY: sizeY,
    platform: platform,
    vkuiClass: "Button__content",
    Component: "span"
  }, children), after && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Button__after",
    role: "presentation"
  }, after)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */
var Button = (0, _withAdaptivity.withAdaptivity)(ButtonComponent, {
  sizeY: true
});
exports.Button = Button;
Button.displayName = "Button";
//# sourceMappingURL=Button.js.map