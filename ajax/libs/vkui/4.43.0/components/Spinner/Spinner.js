import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["size", "aria-label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import * as React from "react";
import { Icon24Spinner, Icon32Spinner, Icon44Spinner, Icon16Spinner } from "@vkontakte/icons";
/**
 * @see https://vkcom.github.io/VKUI/#/Spinner
 */
export var Spinner = /*#__PURE__*/React.memo(function (_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? "regular" : _ref$size,
    _ref$ariaLabel = _ref["aria-label"],
    ariaLabel = _ref$ariaLabel === void 0 ? "Загружается..." : _ref$ariaLabel,
    restProps = _objectWithoutProperties(_ref, _excluded);
  var SpinnerIcon = {
    small: Icon16Spinner,
    regular: Icon24Spinner,
    medium: Icon32Spinner,
    large: Icon44Spinner
  }[size];
  return createScopedElement("span", _extends({
    role: "status",
    "aria-label": ariaLabel
  }, restProps, {
    vkuiClass: "Spinner"
  }), createScopedElement(SpinnerIcon, {
    "aria-hidden": "true",
    vkuiClass: "Spinner__self"
  }));
});
Spinner.displayName = "Spinner";
//# sourceMappingURL=Spinner.js.map