"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IconButton = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Tappable = require("../Tappable/Tappable");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _platform = require("../../lib/platform");

var _getSizeYClassName = require("../../helpers/getSizeYClassName");

var _useAdaptivity2 = require("../../hooks/useAdaptivity");

var _excluded = ["children", "Component"];

/**
 * @see https://vkcom.github.io/VKUI/#/IconButton
 */
var IconButton = function IconButton(_ref) {
  var children = _ref.children,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? "button" : _ref$Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
      sizeY = _useAdaptivity.sizeY;

  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({
    activeEffectDelay: 200,
    activeMode: "background"
  }, restProps, {
    Component: restProps.href ? "a" : Component,
    vkuiClass: (0, _classNames.classNames)("IconButton", (0, _getSizeYClassName.getSizeYClassName)("IconButton", sizeY), platform === _platform.Platform.IOS && "IconButton--ios")
  }), children);
};

exports.IconButton = IconButton;
//# sourceMappingURL=IconButton.js.map