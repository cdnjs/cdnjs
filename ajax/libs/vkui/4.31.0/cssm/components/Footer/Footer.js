import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Caption } from "../Typography/Caption/Caption";
import "./Footer.css";
export var Footer = function Footer(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(Caption, _extends({
    Component: "footer"
  }, restProps, {
    vkuiClass: "Footer"
  }), children);
};
//# sourceMappingURL=Footer.js.map