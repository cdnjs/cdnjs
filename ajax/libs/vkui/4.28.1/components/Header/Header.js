import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["platform", "mode"],
    _excluded2 = ["platform"],
    _excluded3 = ["mode"],
    _excluded4 = ["mode", "children", "subtitle", "indicator", "aside", "getRootRef", "multiline"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode, isPrimitiveReactNode } from "../../lib/utils";
import { Platform } from "../../lib/platform";
import Headline from "../Typography/Headline/Headline";
import { Caption } from "../Typography/Caption/Caption";
import Title from "../Typography/Title/Title";
import Text from "../Typography/Text/Text";
import Subhead from "../Typography/Subhead/Subhead";

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
          weight: "regular"
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
        weight: "medium"
      }, restProps));

    case "secondary":
      return createScopedElement(Caption, _extends({
        weight: "1",
        caps: true
      }, restProps));
  }

  return null;
};

var HeaderAside = function HeaderAside(_ref2) {
  var platform = _ref2.platform,
      restProps = _objectWithoutProperties(_ref2, _excluded2);

  return platform === Platform.VKCOM ? createScopedElement(Subhead, restProps) : createScopedElement(Text, _extends({
    weight: "regular"
  }, restProps));
};

var HeaderSubtitle = function HeaderSubtitle(_ref3) {
  var mode = _ref3.mode,
      restProps = _objectWithoutProperties(_ref3, _excluded3);

  return mode === "secondary" ? createScopedElement(Subhead, restProps) : createScopedElement(Caption, restProps);
};

var Header = function Header(_ref4) {
  var mode = _ref4.mode,
      children = _ref4.children,
      subtitle = _ref4.subtitle,
      indicator = _ref4.indicator,
      aside = _ref4.aside,
      getRootRef = _ref4.getRootRef,
      multiline = _ref4.multiline,
      restProps = _objectWithoutProperties(_ref4, _excluded4);

  var platform = usePlatform();
  return createScopedElement("header", _extends({}, restProps, {
    ref: getRootRef,
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
    vkuiClass: classNames("Header__content-in", {
      "Header__content-in--multiline": multiline
    })
  }, children), hasReactNode(indicator) && createScopedElement(Caption, {
    vkuiClass: "Header__indicator",
    weight: mode === "primary" || mode === "secondary" ? "1" : undefined
  }, indicator)), hasReactNode(subtitle) && createScopedElement(HeaderSubtitle, {
    vkuiClass: "Header__subtitle",
    Component: "span"
  }, subtitle)), hasReactNode(aside) && createScopedElement(HeaderAside, {
    vkuiClass: "Header__aside",
    Component: "span",
    platform: platform
  }, aside));
};

Header.defaultProps = {
  mode: "primary"
}; // eslint-disable-next-line import/no-default-export

export default Header;
//# sourceMappingURL=Header.js.map