import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "level", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { getClassName } from "../../../helpers/getClassName";
import { ANDROID } from "../../../lib/platform";
import Headline from "../Headline/Headline";

var Title = function Title(_ref) {
  var children = _ref.children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? "regular" : _ref$weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      Component = _ref.Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  if (!Component) {
    Component = "h" + level;
  }

  if (platform === ANDROID && level === "3") {
    var headlineWeight = weight === "regular" ? weight : "medium";
    return createScopedElement(Headline, _extends({
      Component: Component
    }, restProps, {
      weight: headlineWeight
    }), children);
  }

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames(getClassName("Title", platform), "Title--w-".concat(weight), "Title--l-".concat(level))
  }), children);
}; // eslint-disable-next-line import/no-default-export


export default Title;
//# sourceMappingURL=Title.js.map