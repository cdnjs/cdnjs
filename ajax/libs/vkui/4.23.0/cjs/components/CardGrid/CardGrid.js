"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _withAdaptivity = require("../../hoc/withAdaptivity");

var _excluded = ["children", "size", "sizeX"];

var CardGrid = function CardGrid(_ref) {
  var children = _ref.children,
      size = _ref.size,
      sizeX = _ref.sizeX,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("div", (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('CardGrid', platform), "CardGrid--".concat(size), "CardGrid--sizeX-".concat(sizeX))
  }), children);
};

CardGrid.defaultProps = {
  size: 's'
};

var _default = (0, _withAdaptivity.withAdaptivity)(CardGrid, {
  sizeX: true
});

exports.default = _default;
//# sourceMappingURL=CardGrid.js.map