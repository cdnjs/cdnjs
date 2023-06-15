"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellButton = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _SimpleCell = require("../SimpleCell/SimpleCell");
var _excluded = ["centered", "mode", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */
var CellButton = function CellButton(_ref) {
  var _ref$centered = _ref.centered,
    centered = _ref$centered === void 0 ? false : _ref$centered,
    _ref$mode = _ref.mode,
    mode = _ref$mode === void 0 ? 'primary' : _ref$mode,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return /*#__PURE__*/React.createElement(_SimpleCell.SimpleCell, (0, _extends2.default)({
    stopPropagation: true
  }, restProps, {
    className: (0, _vkjs.classNames)("vkuiCellButton", styles["CellButton--mode-".concat(mode)], centered && "vkuiCellButton--centered", className)
  }));
};
exports.CellButton = CellButton;
var styles = {
  "CellButton--mode-danger": "vkuiCellButton--mode-danger",
  "CellButton--mode-primary": "vkuiCellButton--mode-primary"
};
//# sourceMappingURL=CellButton.js.map