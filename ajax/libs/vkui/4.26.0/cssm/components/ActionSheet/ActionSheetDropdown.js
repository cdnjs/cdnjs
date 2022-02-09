import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "closing", "toggleRef", "popupDirection"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
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

  var platform = usePlatform();
  var baseClaseName = getClassName("ActionSheet", platform);
  return createScopedElement(FocusTrap, _extends({}, restProps, {
    onClick: stopPropagation,
    vkuiClass: classNames(baseClaseName, {
      "ActionSheet--closing": closing
    })
  }), children);
};
//# sourceMappingURL=ActionSheetDropdown.js.map