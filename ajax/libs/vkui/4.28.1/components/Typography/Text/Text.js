import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "Component", "getRootRef"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { usePlatform } from "../../../hooks/usePlatform";
import { classNames } from "../../../lib/classNames";
import { getClassName } from "../../../helpers/getClassName";
import { warnOnce } from "../../../lib/warnOnce";
var warn = warnOnce("Text");

var Text = function Text(_ref) {
  var children = _ref.children,
      _ref$weight = _ref.weight,
      weight = _ref$weight === void 0 ? "regular" : _ref$weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "span" : _ref$Component,
      getRootRef = _ref.getRootRef,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();

  if (process.env.NODE_ENV === "development" && typeof Component !== "string" && getRootRef) {
    warn("getRootRef can only be used with DOM components");
  }

  return createScopedElement(Component, _extends({}, restProps, {
    ref: getRootRef,
    vkuiClass: classNames(getClassName("Text", platform), "Text--w-".concat(weight))
  }), children);
}; // eslint-disable-next-line import/no-default-export


export default Text;
//# sourceMappingURL=Text.js.map