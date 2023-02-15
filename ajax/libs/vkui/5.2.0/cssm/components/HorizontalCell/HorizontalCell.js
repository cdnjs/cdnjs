import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "children"],
  _excluded2 = ["className", "header", "style", "subtitle", "size", "children", "getRootRef", "getRef"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Caption } from '../Typography/Caption/Caption';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Avatar } from '../Avatar/Avatar';
import "./HorizontalCell.module.css";
var CellTypography = function CellTypography(_ref) {
  var size = _ref.size,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return size === 's' ? /*#__PURE__*/React.createElement(Caption, restProps, children) : /*#__PURE__*/React.createElement(Subhead, restProps, children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */
export var HorizontalCell = function HorizontalCell(_ref2) {
  var className = _ref2.className,
    header = _ref2.header,
    style = _ref2.style,
    subtitle = _ref2.subtitle,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 's' : _ref2$size,
    _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? /*#__PURE__*/React.createElement(Avatar, {
      size: 56
    }) : _ref2$children,
    getRootRef = _ref2.getRootRef,
    getRef = _ref2.getRef,
    restProps = _objectWithoutProperties(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement("div", {
    ref: getRootRef,
    style: style,
    className: classNames("vkuiHorizontalCell", styles["HorizontalCell--size-".concat(size)], className)
  }, /*#__PURE__*/React.createElement(Tappable, _extends({
    className: "vkuiHorizontalCell__body",
    getRootRef: getRef
  }, restProps), hasReactNode(children) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiHorizontalCell__image"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "vkuiHorizontalCell__content"
  }, hasReactNode(header) && /*#__PURE__*/React.createElement(CellTypography, {
    size: size,
    className: "vkuiHorizontalCell__title"
  }, header), hasReactNode(subtitle) && /*#__PURE__*/React.createElement(Footnote, {
    className: "vkuiHorizontalCell__subtitle"
  }, subtitle))));
};
var styles = {
  "HorizontalCell--size-s": "vkuiHorizontalCell--size-s",
  "HorizontalCell--size-m": "vkuiHorizontalCell--size-m",
  "HorizontalCell--size-l": "vkuiHorizontalCell--size-l"
};
//# sourceMappingURL=HorizontalCell.js.map