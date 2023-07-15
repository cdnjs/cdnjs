import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["children", "description", "style", "className", "getRootRef", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { ACTIVE_EFFECT_DELAY, Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { hasReactNode } from "../../lib/utils";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";
import { Caption } from "../Typography/Caption/Caption";
import { Headline } from "../Typography/Headline/Headline";
import { Text } from "../Typography/Text/Text";
import "./Radio.css";
var RadioIcon = function RadioIcon(props) {
  return createScopedElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-hidden": true
  }, props), createScopedElement("circle", {
    cx: "12",
    cy: "12",
    r: "11",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }), createScopedElement("circle", {
    cx: "12",
    cy: "12",
    r: "7.5",
    vkuiClass: "Radio__pin",
    fill: "currentColor"
  }));
};
var RadioComponent = function RadioComponent(_ref) {
  var children = _ref.children,
    description = _ref.description,
    style = _ref.style,
    className = _ref.className,
    getRootRef = _ref.getRootRef,
    sizeY = _ref.sizeY,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var RadioTypography = platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;
  return createScopedElement(Tappable, {
    Component: "label",
    style: style,
    className: className,
    vkuiClass: classNames("Radio", "Radio--sizeY-".concat(sizeY)),
    activeEffectDelay: platform === IOS ? 100 : ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    vkuiClass: "Radio__input",
    type: "radio"
  })), createScopedElement("div", {
    vkuiClass: "Radio__container"
  }, createScopedElement(RadioIcon, {
    vkuiClass: "Radio__icon"
  }), createScopedElement(RadioTypography, {
    vkuiClass: "Radio__content",
    Component: "div"
  }, createScopedElement("div", {
    vkuiClass: "Radio__children"
  }, children), hasReactNode(description) && createScopedElement(Caption, {
    vkuiClass: "Radio__description"
  }, description))));
};

/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */
export var Radio = withAdaptivity(RadioComponent, {
  sizeY: true
});
Radio.displayName = "Radio";
//# sourceMappingURL=Radio.js.map