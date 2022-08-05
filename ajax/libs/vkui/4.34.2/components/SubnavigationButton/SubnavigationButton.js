import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["textLevel"],
    _excluded2 = ["size", "selected", "textLevel", "before", "after", "expandable", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { getTitleFromChildren, hasReactNode } from "../../lib/utils";
import { Tappable } from "../Tappable/Tappable";
import { Icon16Dropdown } from "@vkontakte/icons";
import { usePlatform } from "../../hooks/usePlatform";
import { Caption } from "../Typography/Caption/Caption";
import { Subhead } from "../Typography/Subhead/Subhead";

var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (textLevel === 1) {
    return createScopedElement(Subhead, restProps);
  }

  return createScopedElement(Caption, _extends({
    level: textLevel === 2 ? "1" : "2"
  }, restProps));
};
/**
 * @see https://vkcom.github.io/VKUI/#/SubnavigationButton
 */


export var SubnavigationButton = function SubnavigationButton(_ref2) {
  var _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? "m" : _ref2$size,
      selected = _ref2.selected,
      _ref2$textLevel = _ref2.textLevel,
      textLevel = _ref2$textLevel === void 0 ? 1 : _ref2$textLevel,
      before = _ref2.before,
      after = _ref2.after,
      expandable = _ref2.expandable,
      children = _ref2.children,
      restProps = _objectWithoutProperties(_ref2, _excluded2);

  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside" // eslint-disable-next-line vkui/no-object-expression-in-arguments
    ,
    vkuiClass: classNames(getClassName("SubnavigationButton", platform), "SubnavigationButton--".concat(size), {
      "SubnavigationButton--selected": selected
    }),
    "aria-label": getTitleFromChildren(children)
  }), createScopedElement("span", {
    vkuiClass: "SubnavigationButton__in"
  }, hasReactNode(before) && createScopedElement("span", {
    vkuiClass: "SubnavigationButton__before"
  }, before), createScopedElement(SubnavigationButtonTypography, {
    textLevel: textLevel,
    vkuiClass: "SubnavigationButton__label",
    Component: "span"
  }, children), hasReactNode(after) && createScopedElement("span", {
    vkuiClass: "SubnavigationButton__after"
  }, after), expandable && createScopedElement(Icon16Dropdown, {
    vkuiClass: "SubnavigationButton__expandableIcon"
  })));
};
//# sourceMappingURL=SubnavigationButton.js.map