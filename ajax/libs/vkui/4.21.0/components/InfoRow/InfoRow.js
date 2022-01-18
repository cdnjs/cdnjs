import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["header", "children"];
import { createScopedElement } from "../../lib/jsxRuntime";
import Subhead from "../Typography/Subhead/Subhead";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import Headline from "../Typography/Headline/Headline";
import { hasReactNode } from "../../lib/utils";

var InfoRow = function InfoRow(_ref) {
  var header = _ref.header,
      children = _ref.children,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(Headline, _extends({}, restProps, {
    vkuiClass: getClassName('InfoRow', platform),
    weight: "regular"
  }), hasReactNode(header) && createScopedElement(Subhead, {
    Component: "span",
    vkuiClass: "InfoRow__header",
    weight: "regular"
  }, header), children);
};

export default InfoRow;
//# sourceMappingURL=InfoRow.js.map