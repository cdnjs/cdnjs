"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SimpleCell = void 0;
var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));
var _jsxRuntime = require("../../lib/jsxRuntime");
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _classNames = require("../../lib/classNames");
var _getClassName = require("../../helpers/getClassName");
var _Tappable = require("../Tappable/Tappable");
var _icons = require("@vkontakte/icons");
var _platform = require("../../lib/platform");
var _usePlatform = require("../../hooks/usePlatform");
var _utils = require("../../lib/utils");
var _useAdaptivity2 = require("../../hooks/useAdaptivity");
var _withAdaptivity = require("../../hoc/withAdaptivity");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Headline = require("../Typography/Headline/Headline");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Caption = require("../Typography/Caption/Caption");
var _excluded = ["badge", "badgeBeforeTitle", "badgeAfterTitle", "badgeBeforeSubtitle", "badgeAfterSubtitle", "before", "indicator", "children", "after", "description", "expandable", "multiline", "sizeY", "subhead", "subtitle", "extraSubtitle"];
var SubtitleTypography = function SubtitleTypography(props) {
  var _useAdaptivity = (0, _useAdaptivity2.useAdaptivity)(),
    sizeY = _useAdaptivity.sizeY;
  if (sizeY === _withAdaptivity.SizeType.COMPACT) {
    return (0, _jsxRuntime.createScopedElement)(_Caption.Caption, (0, _extends2.default)({
      level: "2"
    }, props));
  }
  return (0, _jsxRuntime.createScopedElement)(_Footnote.Footnote, props);
};
var SimpleCellComponent = function SimpleCellComponent(_ref) {
  var badge = _ref.badge,
    badgeBeforeTitle = _ref.badgeBeforeTitle,
    _ref$badgeAfterTitle = _ref.badgeAfterTitle,
    badgeAfterTitle = _ref$badgeAfterTitle === void 0 ? badge : _ref$badgeAfterTitle,
    badgeBeforeSubtitle = _ref.badgeBeforeSubtitle,
    badgeAfterSubtitle = _ref.badgeAfterSubtitle,
    before = _ref.before,
    indicator = _ref.indicator,
    children = _ref.children,
    after = _ref.after,
    description = _ref.description,
    expandable = _ref.expandable,
    multiline = _ref.multiline,
    sizeY = _ref.sizeY,
    subhead = _ref.subhead,
    _ref$subtitle = _ref.subtitle,
    subtitle = _ref$subtitle === void 0 ? description : _ref$subtitle,
    extraSubtitle = _ref.extraSubtitle,
    restProps = (0, _objectWithoutProperties2.default)(_ref, _excluded);
  var platform = (0, _usePlatform.usePlatform)();
  var hasAfter = (0, _utils.hasReactNode)(after) || expandable && platform === _platform.IOS;
  return (0, _jsxRuntime.createScopedElement)(_Tappable.Tappable, (0, _extends2.default)({}, restProps, {
    vkuiClass: (0, _classNames.classNames)((0, _getClassName.getClassName)("SimpleCell", platform), expandable && "SimpleCell--exp", multiline && "SimpleCell--mult", "SimpleCell--sizeY-".concat(sizeY))
  }), before, (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__main"
  }, subhead && (0, _jsxRuntime.createScopedElement)(_Subhead.Subhead, {
    Component: "span",
    vkuiClass: "SimpleCell__text SimpleCell__subhead"
  }, subhead), (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__content"
  }, badgeBeforeTitle && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeBeforeTitle), (0, _jsxRuntime.createScopedElement)(_Headline.Headline, {
    Component: "span",
    vkuiClass: "SimpleCell__children",
    weight: "3"
  }, children), (0, _utils.hasReactNode)(badgeAfterTitle) && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeAfterTitle)), subtitle && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__content"
  }, badgeBeforeSubtitle && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeBeforeSubtitle), (0, _jsxRuntime.createScopedElement)(SubtitleTypography, {
    vkuiClass: "SimpleCell__text SimpleCell__subtitle"
  }, subtitle), badgeAfterSubtitle && (0, _jsxRuntime.createScopedElement)("span", {
    vkuiClass: "SimpleCell__badge"
  }, badgeAfterSubtitle)), extraSubtitle && (0, _jsxRuntime.createScopedElement)(SubtitleTypography, {
    vkuiClass: "SimpleCell__text SimpleCell__extraSubtitle"
  }, extraSubtitle)), (0, _utils.hasReactNode)(indicator) && (0, _jsxRuntime.createScopedElement)(_Headline.Headline, {
    Component: "span",
    weight: "3",
    vkuiClass: "SimpleCell__indicator"
  }, indicator), hasAfter && (0, _jsxRuntime.createScopedElement)("div", {
    vkuiClass: "SimpleCell__after"
  }, after, expandable && platform === _platform.IOS && (0, _jsxRuntime.createScopedElement)(_icons.Icon24Chevron, null)));
};

/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */
var SimpleCell = (0, _withAdaptivity.withAdaptivity)(SimpleCellComponent, {
  sizeY: true
});
exports.SimpleCell = SimpleCell;
SimpleCell.displayName = "SimpleCell";
//# sourceMappingURL=SimpleCell.js.map