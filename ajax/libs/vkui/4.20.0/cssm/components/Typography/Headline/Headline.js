import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { getClassName } from "../../../helpers/getClassName";
import "./Headline.css";

var Headline = function Headline(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'h3' : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames(getClassName('Headline', platform), "Headline--w-".concat(weight))
  }), children);
};

export default Headline;
//# sourceMappingURL=Headline.js.map