import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "sizeY", "platform"],
    _excluded2 = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "sizeY", "Component", "loading", "onClick", "stopPropagation"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import { Tappable } from "../Tappable/Tappable";
import { Title } from "../Typography/Title/Title";
import { Text } from "../Typography/Text/Text";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Caption } from "../Typography/Caption/Caption";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS, VKCOM, ANDROID } from "../../lib/platform";
import { Spinner } from "../Spinner/Spinner";
import { Headline } from "../Typography/Headline/Headline";
import "./Button.css";

var ButtonTypography = function ButtonTypography(props) {
  var size = props.size,
      sizeY = props.sizeY,
      platform = props.platform,
      restProps = _objectWithoutProperties(props, _excluded);

  var isCompact = sizeY === SizeType.COMPACT;

  switch (size) {
    case "l":
      if (isCompact) {
        return createScopedElement(Text, _extends({
          weight: "2"
        }, restProps));
      }

      if (platform === ANDROID) {
        return createScopedElement(Headline, _extends({
          weight: "2"
        }, restProps));
      }

      return createScopedElement(Title, _extends({
        level: "3",
        weight: "2"
      }, restProps));

    case "m":
      if (isCompact) {
        return createScopedElement(Subhead, _extends({
          weight: platform === VKCOM ? "3" : "2"
        }, restProps));
      }

      return createScopedElement(Text, _extends({
        weight: "2"
      }, restProps));

    case "s":
    default:
      if (platform === IOS) {
        return createScopedElement(Subhead, _extends({
          weight: "2"
        }, restProps));
      }

      if (platform === VKCOM) {
        return createScopedElement(Caption, restProps);
      }

      if (isCompact) {
        return createScopedElement(Caption, _extends({
          weight: "2"
        }, restProps));
      }

      return createScopedElement(Subhead, _extends({
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

var ButtonComponent = function ButtonComponent(_ref) {
  var _ref$size = _ref.size,
      size = _ref$size === void 0 ? "s" : _ref$size,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "primary" : _ref$mode,
      appearance = _ref.appearance,
      _ref$stretched = _ref.stretched,
      stretched = _ref$stretched === void 0 ? false : _ref$stretched,
      _ref$align = _ref.align,
      align = _ref$align === void 0 ? "center" : _ref$align,
      children = _ref.children,
      before = _ref.before,
      after = _ref.after,
      getRootRef = _ref.getRootRef,
      sizeY = _ref.sizeY,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "button" : _ref$Component,
      loading = _ref.loading,
      onClick = _ref.onClick,
      _ref$stopPropagation = _ref.stopPropagation,
      stopPropagation = _ref$stopPropagation === void 0 ? true : _ref$stopPropagation,
      restProps = _objectWithoutProperties(_ref, _excluded2);

  var platform = usePlatform();
  var hasIcons = Boolean(before || after);
  var hasIconOnly = !children && Boolean(after) !== Boolean(before);

  var _resolveButtonAppeara = resolveButtonAppearance(appearance, mode),
      resolvedMode = _resolveButtonAppeara.resolvedMode,
      resolvedAppearance = _resolveButtonAppeara.resolvedAppearance;

  var hasNewTokens = React.useContext(ConfigProviderContext).hasNewTokens;
  return createScopedElement(Tappable, _extends({}, restProps, {
    Component: restProps.href ? "a" : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    stopPropagation: stopPropagation,
    vkuiClass: classNames("Button", "Button--sz-".concat(size), "Button--lvl-".concat(resolvedMode), "Button--clr-".concat(resolvedAppearance), "Button--aln-".concat(align), "Button--sizeY-".concat(sizeY), stretched && "Button--stretched", hasIcons && "Button--with-icon", hasIconOnly && "Button--singleIcon", loading && "Button--loading"),
    getRootRef: getRootRef,
    hoverMode: hasNewTokens ? "Button--hover" : "background",
    activeMode: hasNewTokens ? "Button--active" : "opacity"
  }), loading && createScopedElement(Spinner, {
    size: "small",
    vkuiClass: "Button__spinner"
  }), createScopedElement("span", {
    vkuiClass: "Button__in"
  }, before && createScopedElement("span", {
    vkuiClass: "Button__before",
    role: "presentation"
  }, before), children && createScopedElement(ButtonTypography, {
    size: size,
    sizeY: sizeY,
    platform: platform,
    vkuiClass: "Button__content",
    Component: "span"
  }, children), after && createScopedElement("span", {
    vkuiClass: "Button__after",
    role: "presentation"
  }, after)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Button
 */


export var Button = withAdaptivity(ButtonComponent, {
  sizeY: true
});
//# sourceMappingURL=Button.js.map