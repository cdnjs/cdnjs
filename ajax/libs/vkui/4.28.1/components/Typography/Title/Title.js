import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "level", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";
import { warnOnce } from "../../../lib/warnOnce";
import { resolveWeight } from "../../../helpers/typography";
var warn = warnOnce("Title");

var Title = function Title(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$level = _ref.level,
      level = _ref$level === void 0 ? "1" : _ref$level,
      Component = _ref.Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  if (!Component) {
    Component = "h" + level;
  }

  if (process.env.NODE_ENV === "development") {
    if (weight && ["heavy", "bold", "semibold", "medium", "regular"].includes(weight)) warn("\u041D\u0430\u0447\u0435\u0440\u0442\u0430\u043D\u0438\u0435 weight=\"".concat(weight, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"1\", \"2\" \u0438 \"3\""));
  }

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames("Title", "Title--l-".concat(level), _defineProperty({}, "Title--w-".concat(resolveWeight(weight)), !!weight))
  }), children);
}; // eslint-disable-next-line import/no-default-export


export default Title;
//# sourceMappingURL=Title.js.map