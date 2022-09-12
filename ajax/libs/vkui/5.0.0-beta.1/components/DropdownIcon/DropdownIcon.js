import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["opened"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon20Dropdown, Icon24ChevronDown, Icon24ChevronUp, Icon20ChevronUp } from "@vkontakte/icons";
import { SizeYConditionalRender } from "../SizeYConditionalRender/SizeYConditionalRender";
export var DropdownIcon = function DropdownIcon(_ref) {
  var _ref$opened = _ref.opened,
      opened = _ref$opened === void 0 ? false : _ref$opened,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var IconCompact = opened ? Icon20ChevronUp : Icon20Dropdown;
  var IconRegular = opened ? Icon24ChevronUp : Icon24ChevronDown;
  return createScopedElement(SizeYConditionalRender, {
    compact: createScopedElement(IconCompact, _extends({
      vkuiClass: "DropdownIcon"
    }, restProps)),
    regular: createScopedElement(IconRegular, _extends({
      vkuiClass: "DropdownIcon"
    }, restProps))
  });
};
//# sourceMappingURL=DropdownIcon.js.map