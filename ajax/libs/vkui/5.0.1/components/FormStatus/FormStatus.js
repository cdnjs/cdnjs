import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode", "children", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { Banner } from "../Banner/Banner";
/**
 * @see https://vkcom.github.io/VKUI/#/FormStatus
 */
export var FormStatus = function FormStatus(_ref) {
  var mode = _ref.mode,
    children = _ref.children,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Banner, _extends({}, restProps, {
    subheader: children,
    className: classNamesString("vkuiFormStatus", mode === "error" && "vkuiFormStatus--mode-error", className)
  }));
};
//# sourceMappingURL=FormStatus.js.map