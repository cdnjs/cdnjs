import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["platform", "mode"],
    _excluded2 = ["mode", "children", "subtitle", "indicator", "aside", "getRootRef", "multiline"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode, isPrimitiveReactNode } from "../../lib/utils";
import { Platform } from "../../lib/platform";
import { Headline } from "../Typography/Headline/Headline";
import { Caption } from "../Typography/Caption/Caption";
import { Title } from "../Typography/Title/Title";
import { Text } from "../Typography/Text/Text";
import { Subhead } from "../Typography/Subhead/Subhead";

var HeaderContent = function HeaderContent(_ref) {
  var platform = _ref.platform,
      mode = _ref.mode,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (platform === Platform.IOS) {
    switch (mode) {
      case "primary":
      case "tertiary":
        return createScopedElement(Title, _extends({
          weight: "1",
          level: "3"
        }, restProps));

      case "secondary":
        return createScopedElement(Caption, _extends({
          weight: "2",
          caps: true
        }, restProps));
    }
  }

  if (platform === Platform.VKCOM) {
    switch (mode) {
      case "primary":
        return createScopedElement(Headline, _extends({
          weight: "3"
        }, restProps));

      case "secondary":
      case "tertiary":
        return createScopedElement(Caption, restProps);
    }
  }

  switch (mode) {
    case "primary":
    case "tertiary":
      return createScopedElement(Headline, _extends({
        weight: "2"
      }, restProps));

    case "secondary":
      return createScopedElement(Caption, _extends({
        weight: "1",
        caps: true
      }, restProps));
  }

  return null;
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */


export var Header = function Header(_ref2) {
  var _ref2$mode = _ref2.mode,
      mode = _ref2$mode === void 0 ? "primary" : _ref2$mode,
      children = _ref2.children,
      subtitle = _ref2.subtitle,
      indicator = _ref2.indicator,
      aside = _ref2.aside,
      getRootRef = _ref2.getRootRef,
      multiline = _ref2.multiline,
      restProps = _objectWithoutProperties(_ref2, _excluded2);

  var platform = usePlatform();
  var AsideTypography = platform === Platform.VKCOM ? Subhead : Text;
  var SubtitleTypography = mode === "secondary" ? Subhead : Caption;
  return createScopedElement("header", _extends({}, restProps, {
    ref: getRootRef // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: classNames(getClassName("Header", platform), "Header--mode-".concat(mode), {
      "Header--pi": isPrimitiveReactNode(indicator)
    })
  }), createScopedElement("div", {
    vkuiClass: "Header__main"
  }, createScopedElement(HeaderContent, {
    vkuiClass: "Header__content",
    Component: "span",
    mode: mode,
    platform: platform
  }, createScopedElement("span", {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: classNames("Header__content-in", {
      "Header__content-in--multiline": multiline
    })
  }, children), hasReactNode(indicator) && createScopedElement(Caption, {
    vkuiClass: "Header__indicator",
    weight: mode === "primary" || mode === "secondary" ? "1" : undefined
  }, indicator)), hasReactNode(subtitle) && createScopedElement(SubtitleTypography, {
    vkuiClass: "Header__subtitle",
    Component: "span"
  }, subtitle)), hasReactNode(aside) && createScopedElement(AsideTypography, {
    vkuiClass: "Header__aside",
    Component: "span"
  }, aside));
};
//# sourceMappingURL=Header.js.map