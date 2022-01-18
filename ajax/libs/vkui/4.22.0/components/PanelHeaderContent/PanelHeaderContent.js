import _extends from "@babel/runtime/helpers/extends";
import _objectSpread from "@babel/runtime/helpers/objectSpread2";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style", "aside", "status", "before", "children", "onClick"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import Tappable from "../Tappable/Tappable";
import { usePlatform } from "../../hooks/usePlatform";
import { hasReactNode } from "../../lib/utils";
import Caption from "../Typography/Caption/Caption";
import Headline from "../Typography/Headline/Headline";
import { IOS } from "../../lib/platform";

var PanelHeaderContent = function PanelHeaderContent(_ref) {
  var className = _ref.className,
      style = _ref.style,
      aside = _ref.aside,
      status = _ref.status,
      before = _ref.before,
      children = _ref.children,
      onClick = _ref.onClick,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var InComponent = onClick ? Tappable : 'div';
  var rootProps = onClick ? {} : restProps;
  var platform = usePlatform();
  var inProps = onClick ? _objectSpread(_objectSpread({}, restProps), {}, {
    onClick: onClick,
    activeEffectDelay: 200,
    hasActive: platform === IOS,
    activeMode: 'opacity'
  }) : {};
  var baseClassNames = getClassName('PanelHeaderContent', platform);
  return createScopedElement("div", _extends({}, rootProps, {
    vkuiClass: baseClassNames,
    style: style,
    className: className
  }), hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "PanelHeaderContent__before"
  }, before), createScopedElement(InComponent, _extends({}, inProps, {
    vkuiClass: "PanelHeaderContent__in"
  }), hasReactNode(status) && createScopedElement(Caption, {
    level: "1",
    weight: "regular",
    vkuiClass: "PanelHeaderContent__status"
  }, status), createScopedElement("div", {
    vkuiClass: "PanelHeaderContent__children"
  }, hasReactNode(status) ? createScopedElement(Headline, {
    Component: "span",
    weight: "medium"
  }, children) : createScopedElement("span", {
    vkuiClass: "PanelHeaderContent__children-in"
  }, children), hasReactNode(aside) && createScopedElement("div", {
    vkuiClass: "PanelHeaderContent__aside"
  }, aside)), hasReactNode(before) && createScopedElement("div", {
    vkuiClass: "PanelHeaderContent__width"
  })));
};

export default PanelHeaderContent;
//# sourceMappingURL=PanelHeaderContent.js.map