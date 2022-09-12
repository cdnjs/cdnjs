import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["children", "description", "style", "className", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { ACTIVE_EFFECT_DELAY, Tappable } from "../Tappable/Tappable";
import { classNames } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import { VisuallyHiddenInput } from "../VisuallyHiddenInput/VisuallyHiddenInput";
import { Footnote } from "../Typography/Footnote/Footnote";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";

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

/**
 * @see https://vkcom.github.io/VKUI/#/Radio
 */
export var Radio = function Radio(_ref) {
  var children = _ref.children,
      description = _ref.description,
      style = _ref.style,
      className = _ref.className,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  return createScopedElement(Tappable, {
    Component: "label",
    style: style,
    className: className,
    vkuiClass: classNames("Radio", getSizeYClassName("Radio", sizeY)),
    activeEffectDelay: platform === Platform.IOS ? 100 : ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, createScopedElement(VisuallyHiddenInput, _extends({}, restProps, {
    vkuiClass: "Radio__input",
    type: "radio"
  })), createScopedElement("div", {
    vkuiClass: "Radio__container"
  }, createScopedElement(RadioIcon, {
    vkuiClass: "Radio__icon"
  }), createScopedElement("div", {
    vkuiClass: "Radio__content"
  }, createScopedElement("div", {
    vkuiClass: "Radio__children"
  }, children), hasReactNode(description) && createScopedElement(Footnote, {
    vkuiClass: "Radio__description"
  }, description))));
};
//# sourceMappingURL=Radio.js.map