import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "closing", "toggleRef"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import "./ActionSheet.css";
var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};
export var ActionSheetDropdown = function ActionSheetDropdown(_ref) {
  var children = _ref.children,
    closing = _ref.closing,
    toggleRef = _ref.toggleRef,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var platform = usePlatform();
  return createScopedElement(FocusTrap, _extends({}, restProps, {
    onClick: stopPropagation,
    vkuiClass: classNames("ActionSheet", platform === Platform.IOS && "ActionSheet--ios", closing && "ActionSheet--closing", "ActionSheet--sizeY-".concat(sizeY))
  }), children);
};
//# sourceMappingURL=ActionSheetDropdown.js.map