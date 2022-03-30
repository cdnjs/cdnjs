import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "primary", "label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Tappable from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { warnOnce } from "../../lib/warnOnce";
import { usePlatform } from "../../hooks/usePlatform";
import { getTitleFromChildren, isPrimitiveReactNode } from "../../lib/utils";
import { IOS, VKCOM, ANDROID } from "../../lib/platform";
import Text from "../Typography/Text/Text";
import Title from "../Typography/Title/Title";
import "./PanelHeaderButton.css";

var ButtonTypography = function ButtonTypography(_ref) {
  var primary = _ref.primary,
      children = _ref.children;
  var platform = usePlatform();

  if (platform === IOS) {
    return createScopedElement(Title, {
      Component: "span",
      level: "3",
      weight: primary ? "1" : "3"
    }, children);
  }

  return createScopedElement(Text, {
    weight: platform === VKCOM ? "regular" : "medium"
  }, children);
};

var warn = warnOnce("PanelHeaderButton");
export var PanelHeaderButton = function PanelHeaderButton(_ref2) {
  var children = _ref2.children,
      _ref2$primary = _ref2.primary,
      primary = _ref2$primary === void 0 ? false : _ref2$primary,
      label = _ref2.label,
      restProps = _objectWithoutProperties(_ref2, _excluded);

  var isPrimitive = isPrimitiveReactNode(children);
  var isPrimitiveLabel = isPrimitiveReactNode(label);
  var platform = usePlatform();
  var hoverMode;
  var activeMode;

  switch (platform) {
    case ANDROID:
      hoverMode = "background";
      activeMode = "background";
      break;

    case IOS:
      hoverMode = "background";
      activeMode = "opacity";
      break;

    case VKCOM:
      hoverMode = "PanelHeaderButton--hover";
      activeMode = "PanelHeaderButton--active";
  }

  if (process.env.NODE_ENV === "development") {
    var hasAccessibleName = Boolean(getTitleFromChildren(children) || getTitleFromChildren(label) || restProps["aria-label"] || restProps["aria-labelledby"]);

    if (!hasAccessibleName) {
      warn("a11y: У кнопки нет названия, которое может прочитать скринридер, и она недоступна для части пользователей. Замените содержимое на текст или добавьте описание действия с помощью пропа aria-label.");
    }
  }

  return createScopedElement(Tappable, _extends({}, restProps, {
    hoverMode: hoverMode,
    Component: restProps.href ? "a" : "button",
    activeEffectDelay: 200,
    activeMode: activeMode,
    vkuiClass: classNames(getClassName("PanelHeaderButton", platform), {
      "PanelHeaderButton--primary": primary,
      "PanelHeaderButton--primitive": isPrimitive,
      "PanelHeaderButton--notPrimitive": !isPrimitive && !isPrimitiveLabel
    })
  }), isPrimitive ? createScopedElement(ButtonTypography, {
    primary: primary
  }, children) : children, isPrimitiveLabel ? createScopedElement(ButtonTypography, {
    primary: primary
  }, label) : label);
};
//# sourceMappingURL=PanelHeaderButton.js.map