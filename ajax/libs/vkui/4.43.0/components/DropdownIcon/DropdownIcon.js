import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["opened"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon20Dropdown, Icon24ChevronDown, Icon24ChevronUp, Icon20ChevronUp } from "@vkontakte/icons";
import { classNames } from "../../lib/classNames";
import { SizeType } from "../AdaptivityProvider/AdaptivityContext";
import { useAdaptivity } from "../../hooks/useAdaptivity";
export var DropdownIcon = function DropdownIcon(_ref) {
  var _ref$opened = _ref.opened,
    opened = _ref$opened === void 0 ? false : _ref$opened,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var _useAdaptivity = useAdaptivity(),
    sizeY = _useAdaptivity.sizeY;
  var Icon = sizeY === SizeType.COMPACT ? Icon20Dropdown : Icon24ChevronDown;
  if (opened) {
    Icon = sizeY === SizeType.COMPACT ? Icon20ChevronUp : Icon24ChevronUp;
  }
  return createScopedElement(Icon, _extends({
    vkuiClass: classNames("DropdownIcon"),
    "aria-hidden": true
  }, restProps));
};
//# sourceMappingURL=DropdownIcon.js.map