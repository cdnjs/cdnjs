import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { usePlatform } from "../../hooks/usePlatform";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import "./SubnavigationBar.css";
export var SubnavigationBar = function SubnavigationBar(props) {
  var platform = usePlatform();

  var mode = props.mode,
      children = props.children,
      restProps = _objectWithoutProperties(props, _excluded);

  var ScrollWrapper = mode === 'fixed' ? 'div' : HorizontalScroll;
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('SubnavigationBar', platform), "SubnavigationBar--".concat(mode))
  }), createScopedElement(ScrollWrapper, {
    vkuiClass: "SubnavigationBar__in"
  }, createScopedElement("div", {
    vkuiClass: "SubnavigationBar__scrollIn"
  }, children)));
};
SubnavigationBar.defaultProps = {
  mode: 'overflow'
};
//# sourceMappingURL=SubnavigationBar.js.map