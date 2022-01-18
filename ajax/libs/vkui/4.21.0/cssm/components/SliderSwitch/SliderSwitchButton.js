import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _slicedToArray from "@babel/runtime/helpers/slicedToArray";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["active", "hovered", "children", "getRootRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from 'react';
import Tappable from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import Text from "../Typography/Text/Text";
import "./SliderSwitch.css";

var SliderSwitchButton = function SliderSwitchButton(props) {
  var _classNames;

  var active = props.active,
      hovered = props.hovered,
      children = props.children,
      getRootRef = props.getRootRef,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();

  var _React$useState = React.useState(false),
      _React$useState2 = _slicedToArray(_React$useState, 2),
      focus = _React$useState2[0],
      setFocus = _React$useState2[1];

  var toggleFocus = function toggleFocus() {
    setFocus(!focus);
  };

  return createScopedElement(Tappable, _extends({}, restProps, {
    vkuiClass: classNames(getClassName('SliderSwitch__button', platform), (_classNames = {}, _defineProperty(_classNames, 'SliderSwitch__button--active', active), _defineProperty(_classNames, 'SliderSwitch__button--hover', !active && hovered), _defineProperty(_classNames, 'SliderSwitch__button--activeHover', active && hovered), _defineProperty(_classNames, 'SliderSwitch__button--focus', focus && !hovered), _classNames)),
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
    weight: "medium"
  }, children));
};

export default SliderSwitchButton;
//# sourceMappingURL=SliderSwitchButton.js.map