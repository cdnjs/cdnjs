import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";

/**
 * @see https://vkcom.github.io/VKUI/#/Badge
 */
export var Badge = function Badge(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "new" : _ref$mode,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement("span", _extends({
    vkuiClass: classNames("Badge", "Badge--".concat(mode))
  }, restProps));
};
//# sourceMappingURL=Badge.js.map