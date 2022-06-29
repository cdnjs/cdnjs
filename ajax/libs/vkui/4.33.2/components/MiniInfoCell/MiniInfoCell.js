import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["before", "after", "mode", "textWrap", "textLevel", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { getClassName } from "../../helpers/getClassName";
import { Text } from "../Typography/Text/Text";
import { Tappable } from "../../components/Tappable/Tappable";
import { hasReactNode } from "../../lib/utils";

/**
 * @see https://vkcom.github.io/VKUI/#/MiniInfoCell
 */
export var MiniInfoCell = function MiniInfoCell(props) {
  var _classNames;

  var platform = usePlatform();

  var before = props.before,
      after = props.after,
      mode = props.mode,
      textWrap = props.textWrap,
      textLevel = props.textLevel,
      children = props.children,
      restProps = _objectWithoutProperties(props, _excluded);

  var isClickable = !!restProps.onClick;
  return createScopedElement(Tappable, _extends({
    Component: "div",
    disabled: !isClickable,
    role: isClickable ? "button" : undefined
  }, restProps, {
    // eslint-disable-next-line vkui/no-object-expression-in-arguments
    vkuiClass: classNames(getClassName("MiniInfoCell", platform), (_classNames = {}, _defineProperty(_classNames, "MiniInfoCell--md-".concat(mode), mode !== "base"), _defineProperty(_classNames, "MiniInfoCell--wr-".concat(textWrap), textWrap !== "nowrap"), _classNames), "MiniInfoCell--lvl-".concat(textLevel))
  }), createScopedElement("span", {
    vkuiClass: "MiniInfoCell__icon"
  }, before), createScopedElement(Text, {
    vkuiClass: "MiniInfoCell__content",
    weight: mode === "more" ? "2" : undefined
  }, children), hasReactNode(after) && createScopedElement("span", {
    vkuiClass: "MiniInfoCell__after"
  }, after));
};
MiniInfoCell.defaultProps = {
  mode: "base",
  textWrap: "nowrap",
  textLevel: "secondary"
};
//# sourceMappingURL=MiniInfoCell.js.map