"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Card = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _excluded = ["mode", "children", "getRootRef"];

var Card = function Card(_ref) {
  var _ref$mode = _ref.mode,
      mode = _ref$mode === void 0 ? "tint" : _ref$mode,
      children = _ref.children,
      getRootRef = _ref.getRootRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    ref: getRootRef,
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("Card", platform), "Card--md-".concat(mode))
  }), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "Card__in"
  }, children));
};

exports.Card = Card;
//# sourceMappingURL=Card.js.map