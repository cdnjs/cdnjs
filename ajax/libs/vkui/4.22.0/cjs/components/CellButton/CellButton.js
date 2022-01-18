"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellButton = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _getClassName = require("../../helpers/getClassName");

var _classNames2 = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _SimpleCell = _interopRequireDefault(require("../SimpleCell/SimpleCell"));

var _excluded = ["centered", "mode"];

var CellButton = function CellButton(_ref) {
  var _ref$centered = _ref.centered,
      centered = _ref$centered === void 0 ? false : _ref$centered,
      _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? 'primary' : _ref$mode,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_SimpleCell.default, (0, _extends2.default)({
    stopPropagation: true
  }, restProps, {
    vkuiClass: (0, _classNames2.classNames)((0, _getClassName.getClassName)('CellButton', platform), "CellButton--".concat(mode), (0, _defineProperty2.default)({}, 'CellButton--centered', centered))
  }));
};

exports.CellButton = CellButton;
//# sourceMappingURL=CellButton.js.map