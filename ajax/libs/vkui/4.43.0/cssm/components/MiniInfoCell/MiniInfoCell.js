import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "after", "mode", "textWrap", "textLevel", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { classNames } from "../../lib/classNames";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Tappable } from "../Tappable/Tappable";
import { hasReactNode } from "../../lib/utils";
import "./MiniInfoCell.css";
/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
export var MiniInfoCell = function MiniInfoCell(_ref) {
  var before = _ref.before,
    after = _ref.after,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "base" : _ref$mode,
    _ref$textWrap = _ref.textWrap,
    textWrap = _ref$textWrap === void 0 ? "nowrap" : _ref$textWrap,
    _ref$textLevel = _ref.textLevel,
    textLevel = _ref$textLevel === void 0 ? "secondary" : _ref$textLevel,
    children = _ref.children,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var cellClasses = classNames("MiniInfoCell", mode !== "base" && "MiniInfoCell--md-".concat(mode), textWrap !== "nowrap" && "MiniInfoCell--wr-".concat(textWrap), "MiniInfoCell--lvl-".concat(textLevel));
  var cellContent = createScopedElement(React.Fragment, null, createScopedElement("span", {
    vkuiClass: "MiniInfoCell__icon"
  }, before), createScopedElement(Paragraph, {
    vkuiClass: "MiniInfoCell__content",
    weight: mode === "more" ? "2" : undefined
  }, children), hasReactNode(after) && createScopedElement("span", {
    vkuiClass: "MiniInfoCell__after"
  }, after));
  return restProps.onClick ? createScopedElement(Tappable, _extends({
    Component: "div",
    role: "button"
  }, restProps, {
    vkuiClass: cellClasses
  }), cellContent) : createScopedElement("div", _extends({}, restProps, {
    vkuiClass: cellClasses
  }), cellContent);
};
//# sourceMappingURL=MiniInfoCell.js.map