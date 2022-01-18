import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["textLevel"],
    _excluded2 = ["size", "selected", "textLevel", "before", "after", "expandable", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { getTitleFromChildren, hasReactNode } from "../../lib/utils";
import Tappable from "../Tappable/Tappable";
import { Icon16Dropdown } from '@vkontakte/icons';
import { usePlatform } from "../../hooks/usePlatform";
import Caption from "../Typography/Caption/Caption";
import Subhead from "../Typography/Subhead/Subhead";

var SubnavigationButtonTypography = function SubnavigationButtonTypography(_ref) {
  var textLevel = _ref.textLevel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (textLevel === 1) {
    return createScopedElement(Subhead, _extends({
      weight: "regular"
    }, restProps));
  }

  return createScopedElement(Caption, _extends({
    level: textLevel === 2 ? '1' : '2',
    weight: "regular"
  }, restProps));
};

export var SubnavigationButton = function SubnavigationButton(props) {
  var platform = usePlatform();

  var size = props.size,
      selected = props.selected,
      textLevel = props.textLevel,
      before = props.before,
      after = props.after,
      expandable = props.expandable,
      children = props.children,
      restProps = _objectWithoutProperties(props, _excluded2);

  return createScopedElement(Tappable, _extends({}, restProps, {
    hasActive: false,
    focusVisibleMode: "outside",
    vkuiClass: classNames(getClassName('SubnavigationButton', platform), "SubnavigationButton--".concat(size), {
      'SubnavigationButton--selected': selected
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
SubnavigationButton.defaultProps = {
  size: 'm',
  textLevel: 1
};
//# sourceMappingURL=SubnavigationButton.js.map