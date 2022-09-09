import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "closing", "toggleRef", "popupDirection"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getSizeYClassName } from "../../helpers/getSizeYClassName";
import { classNames } from "../../lib/classNames";
import { Platform } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { useAdaptivityWithMediaQueries } from "../../hooks/useAdaptivityWithMediaQueries";
import { FocusTrap } from "../FocusTrap/FocusTrap";
import "./ActionSheet.css";

var stopPropagation = function stopPropagation(e) {
  return e.stopPropagation();
};

export var ActionSheetDropdown = function ActionSheetDropdown(_ref) {
  var children = _ref.children,
      closing = _ref.closing,
      toggleRef = _ref.toggleRef,
      popupDirection = _ref.popupDirection,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivityWithMed = useAdaptivityWithMediaQueries(),
      sizeY = _useAdaptivityWithMed.sizeY;

  var platform = usePlatform();
  return createScopedElement(FocusTrap, _extends({}, restProps, {
    onClick: stopPropagation,
    vkuiClass: classNames("ActionSheet", platform === Platform.IOS && "ActionSheet--ios", closing && "ActionSheet--closing", getSizeYClassName("ActionSheet", sizeY))
  }), children);
};
//# sourceMappingURL=ActionSheetDropdown.js.map