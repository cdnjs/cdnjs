import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["wide"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import "./Separator.css";

/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */
export var Separator = function Separator(_ref) {
  var wide = _ref.wide,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement("div", _extends({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: classNames("Separator", !wide && "Separator--padded"),
    role: "separator"
  }), createScopedElement("div", {
    vkuiClass: "Separator__in"
  }));
};
//# sourceMappingURL=Separator.js.map