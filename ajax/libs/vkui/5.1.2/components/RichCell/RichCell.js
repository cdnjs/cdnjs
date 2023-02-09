import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["subhead", "children", "text", "caption", "before", "after", "afterCaption", "bottom", "actions", "multiline", "className"];
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../Tappable/Tappable';
import { Subhead } from '../Typography/Subhead/Subhead';
import { getSizeYClassName } from '../../helpers/getSizeYClassName';
import { useAdaptivity } from '../../hooks/useAdaptivity';
/**
 * @see https://vkcom.github.io/VKUI/#/RichCell
 */
export var RichCell = function RichCell(_ref) {
  var subhead = _ref.subhead,
    children = _ref.children,
    text = _ref.text,
    caption = _ref.caption,
    before = _ref.before,
    after = _ref.after,
    afterCaption = _ref.afterCaption,
    bottom = _ref.bottom,
    actions = _ref.actions,
    multiline = _ref.multiline,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(Tappable, _extends({}, restProps, {
    className: classNames("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", getSizeYClassName("vkuiRichCell", sizeY), className)
  }), before && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__content-before"
  }, subhead && /*#__PURE__*/React.createElement(Subhead, {
    Component: "div",
    className: "vkuiRichCell__subhead"
  }, subhead), /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__children"
  }, children), text && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__text"
  }, text), caption && /*#__PURE__*/React.createElement(Subhead, {
    Component: "div",
    className: "vkuiRichCell__caption"
  }, caption)), (after || afterCaption) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__content-after"
  }, after && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__after-children"
  }, after), afterCaption && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__after-caption"
  }, afterCaption))), bottom && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__bottom"
  }, bottom), actions && /*#__PURE__*/React.createElement("div", {
    className: "vkuiRichCell__actions"
  }, actions)));
};
//# sourceMappingURL=RichCell.js.map