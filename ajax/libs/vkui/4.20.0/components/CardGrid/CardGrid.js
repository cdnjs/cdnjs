import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["children", "size", "sizeX"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { getClassName } from "../../helpers/getClassName";
import { usePlatform } from "../../hooks/usePlatform";
import { withAdaptivity } from "../../hoc/withAdaptivity";

var CardGrid = function CardGrid(_ref) {
  var children = _ref.children,
      size = _ref.size,
      sizeX = _ref.sizeX,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement("div", _extends({}, restProps, {
    vkuiClass: classNames(getClassName('CardGrid', platform), "CardGrid--".concat(size), "CardGrid--sizeX-".concat(sizeX))
  }), children);
};

CardGrid.defaultProps = {
  size: 's'
};
export default withAdaptivity(CardGrid, {
  sizeX: true
});
//# sourceMappingURL=CardGrid.js.map