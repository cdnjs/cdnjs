import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "level", "caps", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { getClassName } from "../../../helpers/getClassName";
import "./Caption.css";

var Caption = function Caption(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      level = _ref.level,
      caps = _ref.caps,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'span' : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames(getClassName('Caption', platform), "Caption--w-".concat(weight), "Caption--l-".concat(level), {
      'Caption--caps': caps
    })
  }), children);
};

export default Caption;
//# sourceMappingURL=Caption.js.map