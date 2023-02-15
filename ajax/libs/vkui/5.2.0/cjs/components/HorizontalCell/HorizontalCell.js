"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HorizontalCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Caption = require("../Typography/Caption/Caption");
var _Tappable = require("../Tappable/Tappable");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Avatar = require("../Avatar/Avatar");
var _excluded = ["size", "children"],
  _excluded2 = ["className", "header", "style", "subtitle", "size", "children", "getRootRef", "getRef"];
var CellTypography = function CellTypography(_ref) {
  var size = _ref.size,
    children = _ref.children,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  return size === 's' ? /*#__PURE__*/React.createElement(_Caption.Caption, restProps, children) : /*#__PURE__*/React.createElement(_Subhead.Subhead, restProps, children);
};
/**
 * @see https://vkcom.github.io/VKUI/#/HorizontalCell
 */
var HorizontalCell = function HorizontalCell(_ref2) {
  var className = _ref2.className,
    header = _ref2.header,
    style = _ref2.style,
    subtitle = _ref2.subtitle,
    _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 's' : _ref2$size,
    _ref2$children = _ref2.children,
    children = _ref2$children === void 0 ? /*#__PURE__*/React.createElement(_Avatar.Avatar, {
      size: 56
    }) : _ref2$children,
    getRootRef = _ref2.getRootRef,
    getRef = _ref2.getRef,
    restProps = (0, _objectWithoutProperties2.default)(_ref2, _excluded2);
  return /*#__PURE__*/React.createElement("div", {
    ref: getRootRef,
    style: style,
    className: (0, _vkjs.classNames)("vkuiHorizontalCell", styles["HorizontalCell--size-".concat(size)], className)
  }, /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({
    className: "vkuiHorizontalCell__body",
    getRootRef: getRef
  }, restProps), (0, _vkjs.hasReactNode)(children) && /*#__PURE__*/React.createElement("div", {
    className: "vkuiHorizontalCell__image"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "vkuiHorizontalCell__content"
  }, (0, _vkjs.hasReactNode)(header) && /*#__PURE__*/React.createElement(CellTypography, {
    size: size,
    className: "vkuiHorizontalCell__title"
  }, header), (0, _vkjs.hasReactNode)(subtitle) && /*#__PURE__*/React.createElement(_Footnote.Footnote, {
    className: "vkuiHorizontalCell__subtitle"
  }, subtitle))));
};
exports.HorizontalCell = HorizontalCell;
var styles = {
  "HorizontalCell--size-s": "vkuiHorizontalCell--size-s",
  "HorizontalCell--size-m": "vkuiHorizontalCell--size-m",
  "HorizontalCell--size-l": "vkuiHorizontalCell--size-l"
};
//# sourceMappingURL=HorizontalCell.js.map