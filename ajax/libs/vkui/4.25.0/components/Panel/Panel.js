import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["centered", "children", "getRootRef", "sizeX", "nav"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { Touch } from "../Touch/Touch";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
export var Panel = withAdaptivity(function (_ref) {
  var _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      sizeX = _ref.sizeX,
      nav = _ref.nav,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames(getClassName("Panel", platform), "Panel--".concat(sizeX), _defineProperty({
      "Panel--centered": centered
    }, "Panel--sizeX-".concat(sizeX), true))
  }), createScopedElement(Touch, {
    Component: TooltipContainer,
    vkuiClass: "Panel__in"
  }, platform === IOS && createScopedElement("div", {
    vkuiClass: "Panel__fade"
  }), createScopedElement("div", {
    vkuiClass: "Panel__in-before"
  }), centered ? createScopedElement("div", {
    vkuiClass: "Panel__centered"
  }, children) : children, createScopedElement("div", {
    vkuiClass: "Panel__in-after"
  })));
}, {
  sizeX: true
});
//# sourceMappingURL=Panel.js.map