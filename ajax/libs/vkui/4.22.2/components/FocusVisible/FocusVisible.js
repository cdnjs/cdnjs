import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
export var FocusVisible = function FocusVisible(_ref) {
  var mode = _ref.mode;
  return createScopedElement("span", {
    "aria-hidden": "true",
    vkuiClass: classNames('FocusVisible', "FocusVisible--".concat(mode))
  });
};
//# sourceMappingURL=FocusVisible.js.map