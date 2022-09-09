import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "level", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";

/**
 * @see https://vkcom.github.io/VKUI/#/Title
 */
export var Title = function Title(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      Component = _ref.Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (!Component) {
    Component = "h" + level;
  }

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames("Title", "Title--level-".concat(level), weight && "Title--weight-".concat(weight))
  }), children);
};
//# sourceMappingURL=Title.js.map