import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["icon", "sizeY", "children", "Component"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Tappable from "../Tappable/Tappable";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity } from "../../hoc/withAdaptivity";
import { IOS } from "../../lib/platform";

var IconButton = function IconButton(_ref) {
  var icon = _ref.icon,
      sizeY = _ref.sizeY,
      children = _ref.children,
      Component = _ref.Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({}, restProps, {
    Component: restProps.href ? 'a' : Component,
    activeEffectDelay: 200,
    activeMode: platform === IOS ? 'opacity' : 'IconButton--active',
    vkuiClass: classNames(getClassName('IconButton', platform), "IconButton--sizeY-".concat(sizeY))
  }), icon || children);
};

IconButton.defaultProps = {
  Component: 'button'
};
export default withAdaptivity(IconButton, {
  sizeY: true
});
//# sourceMappingURL=IconButton.js.map