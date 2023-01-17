import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "after", "children", "mode", "textWrap", "expandable", "className"];
import * as React from 'react';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { Tappable } from '../Tappable/Tappable';
import { Icon16Chevron } from '@vkontakte/icons';
import "./MiniInfoCell.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
export var MiniInfoCell = function MiniInfoCell(_ref) {
  var before = _ref.before,
    after = _ref.after,
    children = _ref.children,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'base' : _ref$mode,
    _ref$textWrap = _ref.textWrap,
    textWrap = _ref$textWrap === void 0 ? 'nowrap' : _ref$textWrap,
    _ref$expandable = _ref.expandable,
    expandable = _ref$expandable === void 0 ? false : _ref$expandable,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var cellClasses = classNames("vkuiMiniInfoCell", styles["MiniInfoCell--textWrap-".concat(textWrap)], mode !== 'base' && styles["MiniInfoCell--mode-".concat(mode)], className);
  var cellContent = /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "vkuiMiniInfoCell__before"
  }, before), /*#__PURE__*/React.createElement("div", {
    className: "vkuiMiniInfoCell__middle"
  }, /*#__PURE__*/React.createElement(Paragraph, {
    className: "vkuiMiniInfoCell__content",
    weight: mode === 'more' ? '2' : undefined
  }, children), expandable && /*#__PURE__*/React.createElement(Icon16Chevron, null)), hasReactNode(after) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiMiniInfoCell__after"
  }, after));
  return restProps.onClick ? /*#__PURE__*/React.createElement(Tappable, _extends({
    Component: "div",
    role: "button"
  }, restProps, {
    className: cellClasses
  }), cellContent) : /*#__PURE__*/React.createElement("div", _extends({}, restProps, {
    className: cellClasses
  }), cellContent);
};
var styles = {
  "MiniInfoCell--textWrap-short": "vkuiMiniInfoCell--textWrap-short",
  "MiniInfoCell--textWrap-full": "vkuiMiniInfoCell--textWrap-full",
  "MiniInfoCell--textWrap-nowrap": "vkuiMiniInfoCell--textWrap-nowrap",
  "MiniInfoCell--mode-accent": "vkuiMiniInfoCell--mode-accent",
  "MiniInfoCell--mode-add": "vkuiMiniInfoCell--mode-add",
  "MiniInfoCell--mode-more": "vkuiMiniInfoCell--mode-more"
};
//# sourceMappingURL=MiniInfoCell.js.map