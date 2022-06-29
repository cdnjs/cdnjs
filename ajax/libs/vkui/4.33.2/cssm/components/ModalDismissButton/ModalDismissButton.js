import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["aria-label"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon20Cancel } from "@vkontakte/icons";
import { Tappable } from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import "./ModalDismissButton.css";

/**
 * @see https://vkcom.github.io/VKUI/#/ModalDismissButton
 */
export var ModalDismissButton = function ModalDismissButton(_ref) {
  var _ref$ariaLabel = _ref["aria-label"],
      ariaLabel = _ref$ariaLabel === void 0 ? "Закрыть" : _ref$ariaLabel,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({
    vkuiClass: getClassName("ModalDismissButton", platform)
  }, restProps, {
    "aria-label": ariaLabel,
    activeMode: "ModalDismissButton--active",
    hoverMode: "ModalDismissButton--hover"
  }), createScopedElement(Icon20Cancel, null));
};
//# sourceMappingURL=ModalDismissButton.js.map