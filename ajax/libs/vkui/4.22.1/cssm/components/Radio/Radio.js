import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "description", "style", "className", "getRef", "getRootRef", "sizeY"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Tappable, { ACTIVE_EFFECT_DELAY } from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { IOS, VKCOM } from "../../lib/platform";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity, SizeType } from "../../hoc/withAdaptivity";
import { hasReactNode } from "../../lib/utils";
import Subhead from "../Typography/Subhead/Subhead";
import Headline from "../Typography/Headline/Headline";
import Text from "../Typography/Text/Text";
import "./Radio.css";

var Radio = function Radio(props) {
  var children = props.children,
      description = props.description,
      style = props.style,
      className = props.className,
      getRef = props.getRef,
      getRootRef = props.getRootRef,
      sizeY = props.sizeY,
      restProps = _objectWithoutProperties(props, _excluded);

  var platform = usePlatform();
  var ContentComponent = platform === VKCOM || sizeY === SizeType.COMPACT ? Text : Headline;
  return createScopedElement(Tappable, {
    Component: "label",
    style: style,
    className: className,
    vkuiClass: classNames(getClassName('Radio', platform), "Radio--sizeY-".concat(sizeY)),
    activeEffectDelay: platform === IOS ? 100 : ACTIVE_EFFECT_DELAY,
    disabled: restProps.disabled,
    getRootRef: getRootRef
  }, createScopedElement("input", _extends({}, restProps, {
    type: "radio",
    vkuiClass: "Radio__input",
    ref: getRef
  })), createScopedElement("div", {
    vkuiClass: "Radio__container"
  }, createScopedElement("i", {
    vkuiClass: "Radio__icon",
    role: "presentation"
  }), createScopedElement(ContentComponent, {
    weight: "regular",
    vkuiClass: "Radio__content",
    Component: "div"
  }, createScopedElement("div", {
    vkuiClass: "Radio__children"
  }, children), hasReactNode(description) && createScopedElement(Subhead, {
    Component: "span",
    weight: "regular",
    vkuiClass: "Radio__description"
  }, description))));
};

export default withAdaptivity(Radio, {
  sizeY: true
});
//# sourceMappingURL=Radio.js.map