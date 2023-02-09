"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellDragger = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _getPlatformClassName = require("../../../helpers/getPlatformClassName");
var _usePlatform = require("../../../hooks/usePlatform");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../../lib/platform");
var _Touch = require("../../Touch/Touch");
var _excluded = ["onDragStart", "onDragMove", "onDragEnd", "className"];
var CellDragger = function CellDragger(_ref) {
  var onDragStart = _ref.onDragStart,
    onDragMove = _ref.onDragMove,
    onDragEnd = _ref.onDragEnd,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var onClick = React.useCallback(function (e) {
    e.preventDefault();
  }, []);
  return /*#__PURE__*/React.createElement(_Touch.Touch, (0, _extends2.default)({
    className: (0, _vkjs.classNames)("vkuiCellDragger", (0, _getPlatformClassName.getPlatformClassName)("vkuiCellDragger", platform), className),
    onStart: onDragStart,
    onMoveY: onDragMove,
    onEnd: onDragEnd,
    onClick: onClick
  }, restProps), platform === _platform.Platform.IOS ? /*#__PURE__*/React.createElement(_icons.Icon24ReorderIos, null) : /*#__PURE__*/React.createElement(_icons.Icon24Reorder, null));
};
exports.CellDragger = CellDragger;
//# sourceMappingURL=CellDragger.js.map