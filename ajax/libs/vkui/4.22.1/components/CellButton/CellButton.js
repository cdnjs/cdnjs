import _extends from "@babel/runtime/helpers/extends";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["centered", "mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { getClassName } from "../../helpers/getClassName";
import { classNames } from "../../lib/classNames";
import { usePlatform } from "../../hooks/usePlatform";
import SimpleCell from "../SimpleCell/SimpleCell";

var CellButton = function CellButton(_ref) {
  var _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'primary' : _ref$mode,
      restProps = _objectWithoutProperties(_ref, _excluded);

  var platform = usePlatform();
  return createScopedElement(SimpleCell, _extends({
    stopPropagation: true
  }, restProps, {
    vkuiClass: classNames(getClassName('CellButton', platform), "CellButton--".concat(mode), _defineProperty({}, 'CellButton--centered', centered))
  }));
};

export { CellButton };
//# sourceMappingURL=CellButton.js.map