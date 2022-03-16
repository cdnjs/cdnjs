import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "weight", "Component"];
import { createScopedElement } from "../../../lib/jsxRuntime";
import { classNames } from "../../../lib/classNames";
import { warnOnce } from "../../../lib/warnOnce";
import { useAdaptivity } from "../../../hooks/useAdaptivity";
import "./Subhead.css";
var warn = warnOnce("Subhead");

var Subhead = function Subhead(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "h5" : _ref$Component,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var _useAdaptivity = useAdaptivity(),
      sizeY = _useAdaptivity.sizeY;

  if (process.env.NODE_ENV === "development") {
    if (weight && ["heavy", "bold", "semibold", "medium", "regular"].includes(weight)) warn("\u041D\u0430\u0447\u0435\u0440\u0442\u0430\u043D\u0438\u0435 weight=\"".concat(weight, "\" \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E \u0438 \u0431\u0443\u0434\u0435\u0442 \u0443\u0434\u0430\u043B\u0435\u043D\u043E \u0432 5.0.0. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \"1\", \"2\" \u0438 \"3\""));
  }

  return createScopedElement(Component, _extends({}, restProps, {
    vkuiClass: classNames("Subhead", "Subhead--sizeY-".concat(sizeY), "Subhead--w-".concat(weight))
  }), children);
}; // eslint-disable-next-line import/no-default-export


export default Subhead;
//# sourceMappingURL=Subhead.js.map