import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "sizeY", "platform"],
    _excluded2 = ["size", "mode", "appearance", "stretched", "align", "children", "before", "after", "getRootRef", "sizeY", "Component", "loading", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { ConfigProviderContext } from "../ConfigProvider/ConfigProviderContext";
import Tappable from "../Tappable/Tappable";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import Subhead from "../Typography/Subhead/Subhead";
import { Caption } from "../Typography/Caption/Caption";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType, withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS, VKCOM, ANDROID } from "../../lib/platform";
import Spinner from "../Spinner/Spinner";
import Headline from "../Typography/Headline/Headline";

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
          weight: "medium"
        }, restProps));
      }

      if (platform === ANDROID) {
        return createScopedElement(Headline, _extends({
          weight: "medium"
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
        weight: "medium"
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

var Button = function Button(props) {
  var _classNames;

  var platform = usePlatform();

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
      restProps = _objectWithoutProperties(props, _excluded2);

  var hasIcons = Boolean(before || after);

  var _resolveButtonAppeara = resolveButtonAppearance(appearance, mode),
      resolvedMode = _resolveButtonAppeara.resolvedMode,
      resolvedAppearance = _resolveButtonAppeara.resolvedAppearance;

  var hasNewTokens = React.useContext(ConfigProviderContext).hasNewTokens;
  return createScopedElement(Tappable, _extends({}, restProps, {
    Component: restProps.href ? "a" : Component,
    onClick: loading ? undefined : onClick,
    focusVisibleMode: "outside",
    vkuiClass: classNames("Button", "Button--sz-".concat(size), "Button--lvl-".concat(resolvedMode), "Button--clr-".concat(resolvedAppearance), "Button--aln-".concat(align), "Button--sizeY-".concat(sizeY), (_classNames = {}, _defineProperty(_classNames, "Button--stretched", stretched), _defineProperty(_classNames, "Button--with-icon", hasIcons), _defineProperty(_classNames, "Button--singleIcon", Boolean(!children && !after && before || !children && after && !before)), _classNames)),
    getRootRef: getRootRef,
    hoverMode: hasNewTokens ? "Button--hover" : "background",
    activeMode: hasNewTokens ? "Button--active" : "opacity"
  }), loading && createScopedElement(Spinner, {
    size: "small",
    vkuiClass: "Button__spinner"
  }), createScopedElement("span", {
    vkuiClass: "Button__in"
  }, before && createScopedElement("span", {
    vkuiClass: "Button__before"
  }, before), children && createScopedElement(ButtonTypography, {
    size: size,
    sizeY: sizeY,
    platform: platform,
    vkuiClass: "Button__content",
    Component: "span"
  }, children), after && createScopedElement("span", {
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

export default withAdaptivity(Button, {
  sizeY: true
});
//# sourceMappingURL=Button.js.map