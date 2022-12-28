import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import "./FocusVisible.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/FocusVisible
 */
export var FocusVisible = function FocusVisible(_ref) {
  var mode = _ref.mode;
  return /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: classNamesString("vkuiFocusVisible", styles["FocusVisible--mode-".concat(mode)])
  });
};
var styles = {
  "FocusVisible--mode-inside": "vkuiFocusVisible--mode-inside",
  "FocusVisible--mode-outside": "vkuiFocusVisible--mode-outside"
};
//# sourceMappingURL=FocusVisible.js.map