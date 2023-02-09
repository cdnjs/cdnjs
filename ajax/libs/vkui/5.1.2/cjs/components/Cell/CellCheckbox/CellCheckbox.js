"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellCheckbox = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _getPlatformClassName = require("../../../helpers/getPlatformClassName");
var _usePlatform = require("../../../hooks/usePlatform");
var _vkjs = require("@vkontakte/vkjs");
var _platform = require("../../../lib/platform");
var _excluded = ["className", "style"];
var CellCheckbox = function CellCheckbox(_ref) {
  var className = _ref.className,
    style = _ref.style,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var IconOff = platform === _platform.Platform.IOS || platform === _platform.Platform.VKCOM ? _icons.Icon24CheckCircleOff : _icons.Icon24CheckBoxOff;
  var IconOn = platform === _platform.Platform.IOS || platform === _platform.Platform.VKCOM ? _icons.Icon24CheckCircleOn : _icons.Icon24CheckBoxOn;
  return /*#__PURE__*/React.createElement("div", {
    className: (0, _vkjs.classNames)("vkuiCellCheckbox", (0, _getPlatformClassName.getPlatformClassName)("vkuiCellCheckbox", platform), className),
    style: style
  }, /*#__PURE__*/React.createElement("input", (0, _extends2.default)({
    className: "vkuiCellCheckbox__input",
    type: "checkbox"
  }, restProps)), /*#__PURE__*/React.createElement("span", {
    className: (0, _vkjs.classNames)("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--off")
  }, /*#__PURE__*/React.createElement(IconOff, null)), /*#__PURE__*/React.createElement("span", {
    className: (0, _vkjs.classNames)("vkuiCellCheckbox__icon", "vkuiCellCheckbox__icon--on")
  }, /*#__PURE__*/React.createElement(IconOn, null)));
};
exports.CellCheckbox = CellCheckbox;
//# sourceMappingURL=CellCheckbox.js.map