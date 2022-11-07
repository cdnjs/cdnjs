"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CellCheckbox = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _icons = require("@vkontakte/icons");

var _getClassName = require("../../../helpers/getClassName");

var _usePlatform = require("../../../hooks/usePlatform");

var _classNames = require("../../../lib/classNames");

var _platform = require("../../../lib/platform");

var _excluded = ["className", "style"];

var CellCheckbox = function CellCheckbox(_ref) {
  var className = _ref.className,
      style = _ref.style,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var IconOff = platform === _platform.ANDROID ? _icons.Icon24CheckBoxOff : _icons.Icon24CheckCircleOff;
  var IconOn = platform === _platform.ANDROID ? _icons.Icon24CheckBoxOn : _icons.Icon24CheckCircleOn;
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("CellCheckbox", platform)),
    className: className,
    style: style
  }, (0, _jsxRuntime.createScopedElement)("input", (0, _extends2.default)({
    vkuiClass: "CellCheckbox__input",
    type: "checkbox"
  }, restProps)), (0, _jsxRuntime.createScopedElement)(IconOff, {
    vkuiClass: "CellCheckbox__icon CellCheckbox__icon--off"
  }), (0, _jsxRuntime.createScopedElement)(IconOn, {
    vkuiClass: "CellCheckbox__icon CellCheckbox__icon--on"
  }));
};

exports.CellCheckbox = CellCheckbox;
//# sourceMappingURL=CellCheckbox.js.map