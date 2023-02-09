"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCell = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var React = _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _getPlatformClassName = require("../../helpers/getPlatformClassName");
var _Tappable = require("../Tappable/Tappable");
var _icons = require("@vkontakte/icons");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _getSizeYClassName = require("../../helpers/getSizeYClassName");
var _excluded = ["badgeBeforeTitle", "badgeAfterTitle", "badgeBeforeSubtitle", "badgeAfterSubtitle", "before", "indicator", "children", "after", "expandable", "multiline", "subhead", "subtitle", "extraSubtitle", "className"];
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */
var SimpleCell = function SimpleCell(_ref) {
  var badgeBeforeTitle = _ref.badgeBeforeTitle,
    badgeAfterTitle = _ref.badgeAfterTitle,
    badgeBeforeSubtitle = _ref.badgeBeforeSubtitle,
    badgeAfterSubtitle = _ref.badgeAfterSubtitle,
    before = _ref.before,
    indicator = _ref.indicator,
    children = _ref.children,
    after = _ref.after,
    expandable = _ref.expandable,
    multiline = _ref.multiline,
    subhead = _ref.subhead,
    subtitle = _ref.subtitle,
    extraSubtitle = _ref.extraSubtitle,
    className = _ref.className,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var hasAfter = (0, _vkjs.hasReactNode)(after) || expandable && platform === _platform.Platform.IOS;
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  return /*#__PURE__*/React.createElement(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    className: (0, _vkjs.classNames)("vkuiSimpleCell", (0, _getPlatformClassName.getPlatformClassName)("vkuiSimpleCell", platform), (0, _getSizeYClassName.getSizeYClassName)("vkuiSimpleCell", sizeY), expandable && "vkuiSimpleCell--exp", multiline && "vkuiSimpleCell--mult", className)
  }), before, /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__main"
  }, subhead && /*#__PURE__*/React.createElement(_Subhead.Subhead, {
    Component: "span",
    className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__subhead")
  }, subhead), /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__content"
  }, badgeBeforeTitle && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeBeforeTitle), /*#__PURE__*/React.createElement(_Headline.Headline, {
    Component: "span",
    className: "vkuiSimpleCell__children",
    weight: "3"
  }, children), (0, _vkjs.hasReactNode)(badgeAfterTitle) && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeAfterTitle)), subtitle && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__content"
  }, badgeBeforeSubtitle && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeBeforeSubtitle), /*#__PURE__*/React.createElement("span", {
    className: (0, _vkjs.classNames)("vkuiSimpleCell__typography", "vkuiSimpleCell__text", "vkuiSimpleCell__subtitle")
  }, subtitle), badgeAfterSubtitle && /*#__PURE__*/React.createElement("span", {
    className: "vkuiSimpleCell__badge"
  }, badgeAfterSubtitle)), extraSubtitle && /*#__PURE__*/React.createElement("span", {
    className: (0, _vkjs.classNames)("vkuiSimpleCell__typography", "vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle")
  }, extraSubtitle)), (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/React.createElement(_Headline.Headline, {
    Component: "span",
    weight: "3",
    className: "vkuiSimpleCell__indicator"
  }, indicator), hasAfter && /*#__PURE__*/React.createElement("div", {
    className: "vkuiSimpleCell__after"
  }, after, expandable && platform === _platform.Platform.IOS && /*#__PURE__*/React.createElement(_icons.Icon24Chevron, null)));
};
exports.SimpleCell = SimpleCell;
//# sourceMappingURL=SimpleCell.js.map