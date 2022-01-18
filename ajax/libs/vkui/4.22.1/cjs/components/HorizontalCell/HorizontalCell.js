"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizontalCell = void 0;

var _jsxRuntime = require("../../lib/jsxRuntime");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classNames = require("../../lib/classNames");

var _getClassName = require("../../helpers/getClassName");

var _usePlatform = require("../../hooks/usePlatform");

var _utils = require("../../lib/utils");

var _Caption = _interopRequireDefault(require("../Typography/Caption/Caption"));

var _Tappable = _interopRequireDefault(require("../Tappable/Tappable"));

var _Subhead = _interopRequireDefault(require("../Typography/Subhead/Subhead"));

var _Avatar = _interopRequireDefault(require("../Avatar/Avatar"));

var _excluded = ["size", "children"],
    _excluded2 = ["className", "header", "style", "subtitle", "size", "children", "getRootRef", "getRef"];

var CellTypography = function CellTypography(_ref) {
  var size = _ref.size,
      children = _ref.children,
      restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return size === 's' ? (0, _jsxRuntime.createScopedElement)(_Caption.default, (0, _extends2.default)({
    level: "2",
    weight: "regular"
  }, restProps), children) : (0, _jsxRuntime.createScopedElement)(_Subhead.default, (0, _extends2.default)({
    weight: "regular"
  }, restProps), children);
};

var HorizontalCell = function HorizontalCell(_ref2) {
  var className = _ref2.className,
      header = _ref2.header,
      style = _ref2.style,
      subtitle = _ref2.subtitle,
      _ref2$size = _ref2.size,
      size = _ref2$size === void 0 ? 's' : _ref2$size,
      _ref2$children = _ref2.children,
      children = _ref2$children === void 0 ? (0, _jsxRuntime.createScopedElement)(_Avatar.default, {
    size: 56
  }) : _ref2$children,
      getRootRef = _ref2.getRootRef,
      getRef = _ref2.getRef,
      restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  var platform = (0, _usePlatform.usePlatform)();
  return (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)('HorizontalCell', platform), "HorizontalCell--".concat(size)),
    ref: getRootRef,
    style: style,
    className: className
  }, (0, _jsxRuntime.createScopedElement)(_Tappable.default, (0, _extends2.default)({
    vkuiClass: "HorizontalCell__body",
    getRootRef: getRef
  }, restProps), (0, _utils.hasReactNode)(children) && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "HorizontalCell__image"
  }, children), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "HorizontalCell__content"
  }, (0, _utils.hasReactNode)(header) && (0, _jsxRuntime.createScopedElement)(CellTypography, {
    size: size,
    vkuiClass: "HorizontalCell__title"
  }, header), (0, _utils.hasReactNode)(subtitle) && (0, _jsxRuntime.createScopedElement)(_Caption.default, {
    weight: "regular",
    level: "1",
    vkuiClass: "HorizontalCell__subtitle"
  }, subtitle))));
};

exports.HorizontalCell = HorizontalCell;
//# sourceMappingURL=HorizontalCell.js.map