import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Headline } from "../Typography/Headline/Headline";
import { hasReactNode } from "../../lib/utils";
import "./InfoRow.css";

/**
 * @see https://vkcom.github.io/VKUI/#/InfoRow
 */
export var InfoRow = function InfoRow(_ref) {
  var header = _ref.header,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(Headline, _extends({}, restProps, {
    vkuiClass: "InfoRow",
    weight: "3"
  }), hasReactNode(header) && createScopedElement(Subhead, {
    Component: "span",
    vkuiClass: "InfoRow__header"
  }, header), children);
};
//# sourceMappingURL=InfoRow.js.map