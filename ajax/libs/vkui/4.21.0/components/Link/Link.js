import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import Tappable from "../Tappable/Tappable";

var Link = function Link(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Tappable, _extends({
    Component: restProps.href ? 'a' : 'button'
  }, restProps, {
    vkuiClass: getClassName('Link', platform),
    hasActive: false,
    hoverMode: "opacity",
    focusVisibleMode: "outside"
  }), children);
};

export default Link;
//# sourceMappingURL=Link.js.map