"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellButton = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _SimpleCell = require("../SimpleCell/SimpleCell");

var _excluded = ["centered", "mode"];

/**
 * @see https://vkcom.github.io/VKUI/#/CellButton
 */
var CellButton = function CellButton(_ref) {
  var _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "primary" : _ref$mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return (0, _jsxRuntime.createScopedElement)(_SimpleCell.SimpleCell, (0, _extends2.default)({
    stopPropagation: true
  }, restProps, {
    vkuiClass: (0, _classNames.classNames)("CellButton", "CellButton--".concat(mode), centered && "CellButton--centered")
  }));
};

exports.CellButton = CellButton;
//# sourceMappingURL=CellButton.js.map