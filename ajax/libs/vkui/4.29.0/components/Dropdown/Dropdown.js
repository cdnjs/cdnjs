import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["action", "hideDelay", "showDelay"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { HoverPopper } from "../HoverPopper/HoverPopper";
import { ClickPopper } from "../ClickPopper/ClickPopper";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
export var Dropdown = function Dropdown(_ref) {
  var _ref$action = _ref.action,
      action = _ref$action === void 0 ? "click" : _ref$action,
      hideDelay = _ref.hideDelay,
      showDelay = _ref.showDelay,
      popperProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var Component;
  var actionSpecificProps = {};

  switch (action) {
    case "click":
      Component = ClickPopper;
      break;

    case "hover":
      actionSpecificProps = {
        hideDelay: hideDelay,
        showDelay: showDelay
      };
      Component = HoverPopper;
      break;
  }

  return createScopedElement(Component, _extends({
    vkuiClass: getClassName("Dropdown", platform)
  }, actionSpecificProps, popperProps));
};
//# sourceMappingURL=Dropdown.js.map