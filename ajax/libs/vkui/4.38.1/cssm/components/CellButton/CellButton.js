import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["centered", "mode"];
import { createScopedElement } from "../../lib/jsxRuntime";
import { classNames } from "../../lib/classNames";
import { SimpleCell } from "../SimpleCell/SimpleCell";
import "./CellButton.css";

/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */
export var CellButton = function CellButton(_ref) {
  var _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "primary" : _ref$mode,
      restProps = _objectWithoutProperties(_ref, _excluded);

  return createScopedElement(SimpleCell, _extends({
    stopPropagation: true
  }, restProps, {
    vkuiClass: classNames("CellButton", "CellButton--".concat(mode), centered && "CellButton--centered")
  }));
};
//# sourceMappingURL=CellButton.js.map