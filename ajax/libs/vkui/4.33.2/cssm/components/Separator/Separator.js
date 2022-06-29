import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["wide", "expanded"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import "./Separator.css";

/**
 * @see https://vkcom.github.io/VKUI/#/Separator
 */
export var Separator = function Separator(_ref) {
  var wide = _ref.wide,
      expanded = _ref.expanded,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement("div", _extends({}, restProps, {
    "aria-hidden": "true",
    vkuiClass: classNames("Separator", wide && "Separator--wide", // TODO: v5 remove
    !wide && "Separator--padded")
  }), createScopedElement("div", {
    vkuiClass: classNames("Separator__in", expanded && "Separator__in--expanded")
  }));
};
//# sourceMappingURL=Separator.js.map