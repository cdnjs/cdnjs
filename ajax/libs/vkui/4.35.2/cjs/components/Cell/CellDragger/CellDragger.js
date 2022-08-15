"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellDragger = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var React = _interopRequireWildcard(require("react"));

var _icons = require("@vkontakte/icons");

var _getClassName = require("../../../helpers/getClassName");

var _usePlatform = require("../../../hooks/usePlatform");

var _classNames = require("../../../lib/classNames");

var _platform = require("../../../lib/platform");

var _Touch = require("../../Touch/Touch");

var _excluded = ["onDragStart", "onDragMove", "onDragEnd"];

var CellDragger = function CellDragger(_ref) {
  var onDragStart = _ref.onDragStart,
      onDragMove = _ref.onDragMove,
      onDragEnd = _ref.onDragEnd,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var onClick = React.useCallback(function (e) {
    e.preventDefault();
  }, []);
  return (0, _jsxRuntime.createScopedElement)(_Touch.Touch, (0, _extends2.default)({
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("CellDragger", platform)),
    onStart: onDragStart,
    onMoveY: onDragMove,
    onEnd: onDragEnd,
    onClick: onClick
  }, restProps), platform === _platform.IOS ? (0, _jsxRuntime.createScopedElement)(_icons.Icon24ReorderIos, null) : (0, _jsxRuntime.createScopedElement)(_icons.Icon24Reorder, null));
};

exports.CellDragger = CellDragger;
//# sourceMappingURL=CellDragger.js.map