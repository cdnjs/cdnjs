"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SimpleCell", {
    enumerable: true,
    get: function() {
        return SimpleCell;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Headline = require("../Typography/Headline/Headline");
var _Subhead = require("../Typography/Subhead/Subhead");
var _Chevron = require("./Chevron/Chevron");
var warn = (0, _warnOnce.warnOnce)("SimpleCell");
var sizeYClassNames = _define_property._({
    none: "vkuiSimpleCell--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiSimpleCell--sizeY-compact");
var SimpleCell = function(_param) {
    var badgeBeforeTitle = _param.badgeBeforeTitle, badgeAfterTitle = _param.badgeAfterTitle, badgeBeforeSubtitle = _param.badgeBeforeSubtitle, badgeAfterSubtitle = _param.badgeAfterSubtitle, before = _param.before, indicator = _param.indicator, children = _param.children, after = _param.after, expandable = _param.expandable, multiline = _param.multiline, subhead = _param.subhead, subtitle = _param.subtitle, extraSubtitle = _param.extraSubtitle, className = _param.className, _param_chevronSize = _param.chevronSize, chevronSize = _param_chevronSize === void 0 ? "m" : _param_chevronSize, restProps = _object_without_properties._(_param, [
        "badgeBeforeTitle",
        "badgeAfterTitle",
        "badgeBeforeSubtitle",
        "badgeAfterSubtitle",
        "before",
        "indicator",
        "children",
        "after",
        "expandable",
        "multiline",
        "subhead",
        "subtitle",
        "extraSubtitle",
        "className",
        "chevronSize"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    if (process.env.NODE_ENV === "development" && expandable === true) {
        // TODO [>=6]: Обновить типизацию для expandable свойства
        warn('Значение true свойства expandable устарело и будет удалено в v6. Используйте expandable="auto"');
    }
    var hasChevron = expandable === "always" || (expandable === true || expandable === "auto") && platform === _platform.Platform.IOS;
    var hasAfter = (0, _vkjs.hasReactNode)(after) || hasChevron;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiSimpleCell", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], multiline && "vkuiSimpleCell--mult", className)
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSimpleCell__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSimpleCell__middle"
    }, subhead && /*#__PURE__*/ _react.createElement(_Subhead.Subhead, {
        Component: "span",
        className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__subhead")
    }, subhead), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSimpleCell__content"
    }, badgeBeforeTitle && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeBeforeTitle), /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        Component: "span",
        className: "vkuiSimpleCell__children",
        weight: "3"
    }, children), (0, _vkjs.hasReactNode)(badgeAfterTitle) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeAfterTitle)), subtitle && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSimpleCell__content"
    }, badgeBeforeSubtitle && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeBeforeSubtitle), /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        normalize: false,
        className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__subtitle")
    }, subtitle), badgeAfterSubtitle && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeAfterSubtitle)), extraSubtitle && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle")
    }, extraSubtitle)), (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/ _react.createElement(_Headline.Headline, {
        Component: "span",
        weight: "3",
        className: "vkuiSimpleCell__indicator"
    }, indicator), hasAfter && /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiSimpleCell__after", "vkuiInternalSimpleCell__after")
    }, after, hasChevron && /*#__PURE__*/ _react.createElement(_Chevron.Chevron, {
        size: chevronSize,
        className: "vkuiSimpleCell__chevronIcon"
    })));
};

//# sourceMappingURL=SimpleCell.js.map