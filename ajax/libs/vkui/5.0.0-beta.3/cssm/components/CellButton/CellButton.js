import _extends from "@babel/runtime/helpers/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/objectWithoutProperties";
var _excluded = ["centered", "mode", "className"];
import * as React from "react";
import { classNamesString } from "../../lib/classNames";
import { SimpleCell } from "../SimpleCell/SimpleCell";
import "./CellButton.module.css";
/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */
export var CellButton = function CellButton(_ref) {
  var _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? false : _ref$centered,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? "primary" : _ref$mode,
    className = _ref.className,
    restProps = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(SimpleCell, _extends({
    stopPropagation: true
  }, restProps, {
    className: classNamesString("vkuiCellButton", styles["CellButton--mode-".concat(mode)], centered && "vkuiCellButton--centered", className)
  }));
};
var styles = {
  "CellButton--mode-danger": "vkuiCellButton--mode-danger",
  "CellButton--mode-primary": "vkuiCellButton--mode-primary"
};
//# sourceMappingURL=CellButton.js.map