"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _getClassName = require("../../helpers/getClassName");

var _classNames = require("../../lib/classNames");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _platform = require("../../lib/platform");

var _excluded = ["icon", "sizeY", "children", "Component"];

var IconButton = function IconButton(_ref) {
  var icon = _ref.icon,
      sizeY = _ref.sizeY,
      children = _ref.children,
      Component = _ref.Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({}, restProps, {
    Component: restProps.href ? 'a' : Component,
    activeEffectDelay: 200,
    activeMode: platform === _platform.IOS ? 'opacity' : 'IconButton--active',
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('IconButton', platform), "IconButton--sizeY-".concat(sizeY))
  }), icon || children);
};

IconButton.defaultProps = {
  Component: 'button'
};

var _default = (0, _withAdaptivity.withAdaptivity)(IconButton, {
  sizeY: true
});

exports.default = _default;
//# sourceMappingURL=IconButton.js.map