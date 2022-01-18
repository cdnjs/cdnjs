import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Caption from "../Typography/Caption/Caption";

var Footer = function Footer(_ref) {
  var children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(Caption, _extends({
    Component: "footer"
  }, restProps, {
    level: "1",
    weight: "regular",
    vkuiClass: "Footer"
  }), children);
};

export default Footer;
//# sourceMappingURL=Footer.js.map