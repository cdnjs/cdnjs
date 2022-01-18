import _extends from "@babel/runtime/helpers/extends";
import { createScopedElement } from "../../lib/jsxRuntime";
import { Icon20Cancel } from '@vkontakte/icons';
import Tappable from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import "./ModalDismissButton.css";

var ModalDismissButton = function ModalDismissButton(props) {
  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({
    vkuiClass: getClassName('ModalDismissButton', platform)
  }, props, {
    activeMode: "ModalDismissButton--active",
    hoverMode: "ModalDismissButton--hover"
  }), createScopedElement(Icon20Cancel, null));
};

ModalDismissButton.defaultProps = {
  'aria-label': 'Закрыть'
};
export default ModalDismissButton;
//# sourceMappingURL=ModalDismissButton.js.map