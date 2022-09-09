import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "after", "children", "mode", "textWrap", "expandable"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { Paragraph } from "../Typography/Paragraph/Paragraph";
import { Tappable } from "../Tappable/Tappable";
import { hasReactNode } from "../../lib/utils";
import { Icon16Chevron } from "@vkontakte/icons";
import "./MiniInfoCell.css";

/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
export var MiniInfoCell = function MiniInfoCell(_ref) {
  var before = _ref.before,
      after = _ref.after,
      children = _ref.children,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "base" : _ref$mode,
      _ref$textWrap = _ref.textWrap,
      textWrap = _ref$textWrap === void 0 ? "nowrap" : _ref$textWrap,
      _ref$expandable = _ref.expandable,
      expandable = _ref$expandable === void 0 ? false : _ref$expandable,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var isClickable = !!restProps.onClick;
  return createScopedElement(Tappable, _extends({
    Component: "div",
    disabled: !isClickable,
    role: isClickable ? "button" : undefined
  }, restProps, {
    vkuiClass: classNames("MiniInfoCell", "MiniInfoCell--textWrap-".concat(textWrap), mode !== "base" && "MiniInfoCell--mode-".concat(mode))
  }), createScopedElement("span", {
    vkuiClass: "MiniInfoCell__before"
  }, before), createScopedElement("div", {
    vkuiClass: "MiniInfoCell__middle"
  }, createScopedElement(Paragraph, {
    vkuiClass: "MiniInfoCell__content",
    weight: mode === "more" ? "2" : undefined
  }, children), expandable && createScopedElement(Icon16Chevron, null)), hasReactNode(after) && createScopedElement("span", {
    vkuiClass: "MiniInfoCell__after"
  }, after));
};
//# sourceMappingURL=MiniInfoCell.js.map