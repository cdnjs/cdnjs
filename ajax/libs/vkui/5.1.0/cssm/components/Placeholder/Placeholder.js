import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "header", "action", "children", "stretched", "getRootRef", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Title } from '../Typography/Title/Title';
import { Headline } from '../Typography/Headline/Headline';
import "./Placeholder.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/Placeholder
 */
export var Placeholder = function Placeholder(_ref) {
  var icon = _ref.icon,
    header = _ref.header,
    action = _ref.action,
    children = _ref.children,
    stretched = _ref.stretched,
    getRootRef = _ref.getRootRef,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    ref: getRootRef,
    className: classNames("vkuiPlaceholder", stretched && "vkuiPlaceholder--stretched", className)
  }), /*#__PURE__*/React.createElement("div", {
    className: "vkuiPlaceholder__in"
  }, hasReactNode(icon) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPlaceholder__icon"
  }, icon), hasReactNode(header) && /*#__PURE__*/React.createElement(Title, {
    level: "2",
    weight: "2",
    className: "vkuiPlaceholder__header"
  }, header), hasReactNode(children) && /*#__PURE__*/React.createElement(Headline, {
    weight: "3",
    className: "vkuiPlaceholder__text"
  }, children), hasReactNode(action) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiPlaceholder__action"
  }, action)));
};
//# sourceMappingURL=Placeholder.js.map