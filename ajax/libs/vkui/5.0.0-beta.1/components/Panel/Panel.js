import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["centered", "children", "getRootRef", "nav"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getSizeXClassName } from "../../helpers/getSizeXClassName";
import { classNames } from "../../lib/classNames";
import { Touch } from "../Touch/Touch";
import { TooltipContainer } from "../Tooltip/TooltipContainer";
import { Platform } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";

/**
 * @see https://vkcom.github.io/VKUI/#/Panel
 */
export var Panel = function Panel(_ref) {
  var _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      nav = _ref.nav,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeX = _useAdaptivity.sizeX;

  return createScopedElement("div", _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames("Panel", platform === Platform.IOS && "Panel--ios", platform === Platform.VKCOM && "Panel--vkcom", getSizeXClassName("Panel", sizeX), centered && "Panel--centered")
  }), createScopedElement(Touch, {
    Component: TooltipContainer,
    vkuiClass: "Panel__in"
  }, platform === Platform.IOS && createScopedElement("div", {
    vkuiClass: "Panel__fade"
  }), createScopedElement("div", {
    vkuiClass: "Panel__in-before"
  }), centered ? createScopedElement("div", {
    vkuiClass: "Panel__centered"
  }, children) : children, createScopedElement("div", {
    vkuiClass: "Panel__in-after"
  })));
};
//# sourceMappingURL=Panel.js.map