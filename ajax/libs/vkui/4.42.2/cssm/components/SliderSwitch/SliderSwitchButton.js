import _extends from "@babel/runtime/helpers/extends";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["active", "hovered", "children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Tappable } from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { Text } from "../Typography/Text/Text";
import "./SliderSwitch.css";
/**
 * @deprecated Этот компонент устарел и будет удален в 5.0.0.
 */
export var SliderSwitchButton = function SliderSwitchButton(_ref) {
  var active = _ref.active,
    hovered = _ref.hovered,
    children = _ref.children,
    getRootRef = _ref.getRootRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var platform = usePlatform();
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    focus = _React$useState2[0],
    setFocus = _React$useState2[1];
  var toggleFocus = function toggleFocus() {
    setFocus(!focus);
  };
  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("SliderSwitch__button", platform), active && "SliderSwitch__button--active", !active && hovered && "SliderSwitch__button--hover", active && hovered && "SliderSwitch__button--activeHover", focus && !hovered && "SliderSwitch__button--focus"),
    Component: "button",
    type: "button",
    getRootRef: getRootRef,
    "aria-pressed": active,
    onFocus: toggleFocus,
    onBlur: toggleFocus,
    tabIndex: 0,
    hasActive: false,
    hoverMode: "opacity"
  }), createScopedElement(Text, {
    weight: "2"
  }, children));
};
//# sourceMappingURL=SliderSwitchButton.js.map