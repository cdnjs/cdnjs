"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _classNames2 = require("../../lib/classNames");

var _ConfigProviderContext = require("../ConfigProvider/ConfigProviderContext");

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _Title = _interopRequireDefault(require("../Typography/Title/Title"));

var _Text = _interopRequireDefault(require("../Typography/Text/Text"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Caption = require("../Typography/Caption/Caption");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _platform = require("../../lib/platform");

var _Spinner = _interopRequireDefault(require("../Spinner/Spinner"));

var _Headline = _interopRequireDefault(require("../Typography/Headline/Headline"));

var _excluded = ["size", "sizeY", "platform"],
    _excluded2 = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "sizeY", "Component", "loading", "onClick"];

var ButtonTypography = function ButtonTypography(props) {
  var size = props.size,
      sizeY = props.sizeY,
      platform = props.platform,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var isCompact = sizeY === _withAdaptivity.SizeType.COMPACT;

  switch (size) {
    case "l":
      if (isCompact) {
        return (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({
          weight: "medium"
        }, restProps));
      }

      if (platform === _platform.ANDROID) {
        return (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({
          weight: "medium"
        }, restProps));
      }

      return (0, _jsxRuntime.createScopedElement)(_Title.default, (0, _extends2.default)({
        level: "3",
        weight: "2"
      }, restProps));

    case "m":
      if (isCompact) {
        return (0, _jsxRuntime.createScopedElement)(_Subhead.default, (0, _extends2.default)({
          weight: platform === _platform.VKCOM ? "3" : "2"
        }, restProps));
      }

      return (0, _jsxRuntime.createScopedElement)(_Text.default, (0, _extends2.default)({
        weight: "medium"
      }, restProps));

    case "s":
    default:
      if (platform === _platform.IOS) {
        return (0, _jsxRuntime.createScopedElement)(_Subhead.default, (0, _extends2.default)({
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

      return (0, _jsxRuntime.createScopedElement)(_Subhead.default, (0, _extends2.default)({
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

var Button = function Button(props) {
  var _classNames;

  var platform = (0, _usePlatform.usePlatform)();
  var size = props.size,
      mode = props.mode,
      appearance = props.appearance,
      stretched = props.stretched,
      align = props.align,
      children = props.children,
      before = props.before,
      after = props.after,
      getRootRef = props.getRootRef,
      sizeY = props.sizeY,
      _props$Component = props.Component,
      Component = _props$Component === void 0 ? "button" : _props$Component,
      loading = props.loading,
      onClick = props.onClick,
      restProps = (0, _objectWithoutProperties2.default)(props, _excluded2);
  var hasIcons = Boolean(before || after);

  var _resolveButtonAppeara = resolveButtonAppearance(appearance, mode),
      resolvedMode = _resolveButtonAppeara.resolvedMode,
      resolvedAppearance = _resolveButtonAppeara.resolvedAppearance;

  var hasNewTokens = React.useContext(_ConfigProviderContext.ConfigProviderContext).hasNewTokens;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    Component: restProps.href ? "a" : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    vkuiClass: (0, _classNames2.classNames)("Button", "Button--sz-".concat(size), "Button--lvl-".concat(resolvedMode), "Button--clr-".concat(resolvedAppearance), "Button--aln-".concat(align), "Button--sizeY-".concat(sizeY), (_classNames = {}, (0, _defineProperty2.default)(_classNames, "Button--stretched", stretched), (0, _defineProperty2.default)(_classNames, "Button--with-icon", hasIcons), (0, _defineProperty2.default)(_classNames, "Button--singleIcon", Boolean(!children && !after && before || !children && after && !before)), _classNames)),
    getRootRef: getRootRef,
    hoverMode: hasNewTokens ? "Button--hover" : "background",
    activeMode: hasNewTokens ? "Button--active" : "opacity"
  }), loading && (0, _jsxRuntime.createScopedElement)(_Spinner.default, {
    size: "small",
    vkuiClass: "Button__spinner"
  }), (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Button__in"
  }, before && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Button__before"
  }, before), children && (0, _jsxRuntime.createScopedElement)(ButtonTypography, {
    size: size,
    sizeY: sizeY,
    platform: platform,
    vkuiClass: "Button__content",
    Component: "span"
  }, children), after && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "Button__after"
  }, after)));
};

Button.defaultProps = {
  mode: "primary",
  align: "center",
  size: "s",
  stretched: false,
  stopPropagation: true
}; // eslint-disable-next-line import/no-default-export

var _default = (0, _withAdaptivity.withAdaptivity)(Button, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=Button.js.map