import _extends from "@babel/runtime/helpers/extends";
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon20Dropdown, Icon24ChevronDown } from "@vkontakte/icons";
import { SizeType } from "../AdaptivityProvider/AdaptivityContext";
import { getClassName } from "../../helpers/getClassName";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
export var DropdownIcon = function DropdownIcon(props) {
  var platform = usePlatform();

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  var Icon = sizeY === SizeType.COMPACT ? Icon20Dropdown : Icon24ChevronDown;
  return createScopedElement(Icon, _extends({
    vkuiClass: getClassName("DropdownIcon", platform)
  }, props));
};
//# sourceMappingURL=DropdownIcon.js.map