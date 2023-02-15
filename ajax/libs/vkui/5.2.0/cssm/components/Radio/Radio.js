import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
import _extends from "@babel/runtime/helpers/extends";
var _excluded = ["children", "description", "style", "className", "getRootRef"];
import * as React from 'react';
import { ACTIVE_EFFECT_DELAY, Tappable } from '../Tappable/Tappable';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Platform } from '../../lib/platform';
import { usePlatform } from '../../hooks/usePlatform';
import { VisuallyHiddenInput } from '../VisuallyHiddenInput/VisuallyHiddenInput';
import { Footnote } from '../Typography/Footnote/Footnote';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import "./Radio.module.css";
var RadioIcon = function RadioIcon(props) {
  return /*#__PURE__*/React.createElement("svg", _extends({
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 24 24",
    "aria-hidden": true
  }, props), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "11",
    stroke: "currentColor",
    strokeWidth: "2",
    fill: "none"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "7.5",
    className: "vkuiRadio__pin",
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
  return /*#__PURE__*/React.createElement(Tappable, {
    Component: "label",
    style: style,
    className: classNames("vkuiRadio", getSizeYClassName("vkuiRadio", sizeY), className),
    activeEffectDelay: platform === Platform.IOS ? 100 : ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, /*#__PURE__*/React.createElement(VisuallyHiddenInput, _extends({}, restProps, {
    className: "vkuiRadio__input",
    type: "radio"
  })), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRadio__container"
  }, /*#__PURE__*/React.createElement(RadioIcon, {
    className: "vkuiRadio__icon"
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRadio__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiRadio__children"
  }, children), hasReactNode(description) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiRadio__description"
  }, description))));
};
//# sourceMappingURL=Radio.js.map