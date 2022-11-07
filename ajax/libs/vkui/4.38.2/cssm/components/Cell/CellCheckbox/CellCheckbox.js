import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["className", "style"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { Icon24CheckBoxOff, Icon24CheckBoxOn, Icon24CheckCircleOff, Icon24CheckCircleOn } from "@vkontakte/icons";
import { getClassName } from "../../../helpers/getClassName";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { ANDROID } from "../../../lib/platform";
import "./CellCheckbox.css";
export var CellCheckbox = function CellCheckbox(_ref) {
  var className = _ref.className,
      style = _ref.style,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var IconOff = platform === ANDROID ? Icon24CheckBoxOff : Icon24CheckCircleOff;
  var IconOn = platform === ANDROID ? Icon24CheckBoxOn : Icon24CheckCircleOn;
  return createScopedElement("div", {
    vkuiClass: classNames(getClassName("CellCheckbox", platform)),
    className: className,
    style: style
  }, createScopedElement("input", _extends({
    vkuiClass: "CellCheckbox__input",
    type: "checkbox"
  }, restProps)), createScopedElement(IconOff, {
    vkuiClass: "CellCheckbox__icon CellCheckbox__icon--off"
  }), createScopedElement(IconOn, {
    vkuiClass: "CellCheckbox__icon CellCheckbox__icon--on"
  }));
};
//# sourceMappingURL=CellCheckbox.js.map