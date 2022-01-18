import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "children"],
    _excluded2 = ["className", "header", "style", "subtitle", "size", "children", "getRootRef", "getRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import Caption from "../Typography/Caption/Caption";
import Tappable from "../Tappable/Tappable";
import Subhead from "../Typography/Subhead/Subhead";
import Avatar from "../Avatar/Avatar";
import "./HorizontalCell.css";

var CellTypography = function CellTypography(_ref) {
  var size = _ref.size,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return size === 's' ? createScopedElement(Caption, _extends({
    level: "2",
    weight: "regular"
  }, restProps), children) : createScopedElement(Subhead, _extends({
    weight: "regular"
  }, restProps), children);
};

export var HorizontalCell = function HorizontalCell(_ref2) {
  var className = _ref2.className,
      header = _ref2.header,
      style = _ref2.style,
      subtitle = _ref2.subtitle,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 's' : _ref2$size,
      _ref2$children = _ref2.children,
      children = _ref2$children === void 0 ? createScopedElement(Avatar, {
    size: 56
  }) : _ref2$children,
      getRootRef = _ref2.getRootRef,
      getRef = _ref2.getRef,
      restProps = _objectWithoutProperties(_ref2, _excluded2);

  var platform = usePlatform();
  return createScopedElement("div", {
    vkuiClass: classNames(getClassName('HorizontalCell', platform), "HorizontalCell--".concat(size)),
    ref: getRootRef,
    style: style,
    className: className
  }, createScopedElement(Tappable, _extends({
    vkuiClass: "HorizontalCell__body",
    getRootRef: getRef
  }, restProps), hasReactNode(children) && createScopedElement("div", {
    vkuiClass: "HorizontalCell__image"
  }, children), createScopedElement("div", {
    vkuiClass: "HorizontalCell__content"
  }, hasReactNode(header) && createScopedElement(CellTypography, {
    size: size,
    vkuiClass: "HorizontalCell__title"
  }, header), hasReactNode(subtitle) && createScopedElement(Caption, {
    weight: "regular",
    level: "1",
    vkuiClass: "HorizontalCell__subtitle"
  }, subtitle))));
};
//# sourceMappingURL=HorizontalCell.js.map