"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _usePlatform = require("../../../hooks/usePlatform");

var _classNames = require("../../../lib/classNames");

var _getClassName = require("../../../helpers/getClassName");

var _platform = require("../../../lib/platform");

var _Headline = _interopRequireDefault(require("../Headline/Headline"));

var _excluded = ["children", "weight", "level", "Component"];

var Title = function Title(_ref) {
  var children = _ref.children,
      weight = _ref.weight,
      level = _ref.level,
      _ref$Component = _ref.Component,
      Component = _ref$Component === void 0 ? 'h' + level : _ref$Component,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();

  if (platform === _platform.ANDROID && level === '3') {
    var headlineWeight = weight === 'regular' ? weight : 'medium';
    return (0, _jsxRuntime.createScopedElement)(_Headline.default, (0, _extends2.default)({
      Component: Component
    }, restProps, {
      weight: headlineWeight
    }), children);
  }

  return (0, _jsxRuntime.createScopedElement)(Component, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('Title', platform), "Title--w-".concat(weight), "Title--l-".concat(level))
  }), children);
};

var _default = Title;
exports.default = _default;
//# sourceMappingURL=Title.js.map