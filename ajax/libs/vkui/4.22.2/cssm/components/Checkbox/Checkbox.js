import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "className", "style", "getRootRef", "getRef", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Tappable, { ACTIVE_EFFECT_DELAY } from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { Icon20CheckBoxOn, Icon20CheckBoxOff, Icon24CheckBoxOn, Icon24CheckBoxOff } from '@vkontakte/icons';
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import Text from "../Typography/Text/Text";
import Headline from "../Typography/Headline/Headline";
import "./Checkbox.css";
export var Checkbox = function Checkbox(_ref) {
  var children = _ref.children,
      className = _ref.className,
      style = _ref.style,
      getRootRef = _ref.getRootRef,
      getRef = _ref.getRef,
      sizeY = _ref.sizeY,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  var ContentComponent = platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;
  return createScopedElement(Tappable, {
    Component: "label",
    vkuiClass: classNames(getClassName('Checkbox', platform), "Checkbox--sizeY-".concat(sizeY)),
    className: className,
    style: style,
    disabled: restProps.disabled,
    activeEffectDelay: platform === IOS ? 100 : ACTIVE_EFFECT_DELAY,
    getRootRef: getRootRef
  }, createScopedElement("input", _extends({}, restProps, {
    type: "checkbox",
    vkuiClass: "Checkbox__input",
    ref: getRef
  })), createScopedElement("div", {
    vkuiClass: "Checkbox__container"
  }, createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--on"
  }, sizeY === SizeType.COMPACT || platform === VKCOM ? createScopedElement(Icon20CheckBoxOn, null) : createScopedElement(Icon24CheckBoxOn, null)), createScopedElement("div", {
    vkuiClass: "Checkbox__icon Checkbox__icon--off"
  }, sizeY === SizeType.COMPACT || platform === VKCOM ? createScopedElement(Icon20CheckBoxOff, null) : createScopedElement(Icon24CheckBoxOff, null)), createScopedElement(ContentComponent, {
    weight: "regular",
    vkuiClass: "Checkbox__content"
  }, children)));
};
export default withAdaptivity(Checkbox, {
  sizeY: true
});
//# sourceMappingURL=Checkbox.js.map