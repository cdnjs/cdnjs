import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { Tappable } from "../Tappable/Tappable";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Headline } from "../Typography/Headline/Headline";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Chevron } from "./Chevron/Chevron";
var warn = warnOnce("SimpleCell");
var sizeYClassNames = _define_property({
    none: "vkuiSimpleCell--sizeY-none"
}, SizeType.COMPACT, "vkuiSimpleCell--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/SimpleCell
 */ export var SimpleCell = function(_param) {
    var badgeBeforeTitle = _param.badgeBeforeTitle, badgeAfterTitle = _param.badgeAfterTitle, badgeBeforeSubtitle = _param.badgeBeforeSubtitle, badgeAfterSubtitle = _param.badgeAfterSubtitle, before = _param.before, indicator = _param.indicator, children = _param.children, after = _param.after, expandable = _param.expandable, multiline = _param.multiline, subhead = _param.subhead, subtitle = _param.subtitle, extraSubtitle = _param.extraSubtitle, className = _param.className, _param_chevronSize = _param.chevronSize, chevronSize = _param_chevronSize === void 0 ? "m" : _param_chevronSize, restProps = _object_without_properties(_param, [
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
    var platform = usePlatform();
    if (process.env.NODE_ENV === "development" && expandable === true) {
        // TODO [>=6]: Обновить типизацию для expandable свойства
        warn('Значение true свойства expandable устарело и будет удалено в v6. Используйте expandable="auto"');
    }
    var hasChevron = expandable === "always" || (expandable === true || expandable === "auto") && platform === Platform.IOS;
    var hasAfter = hasReactNode(after) || hasChevron;
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ React.createElement(Tappable, _object_spread_props(_object_spread({}, restProps), {
        className: classNames("vkuiSimpleCell", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], multiline && "vkuiSimpleCell--mult", className)
    }), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__middle"
    }, subhead && /*#__PURE__*/ React.createElement(Subhead, {
        Component: "span",
        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subhead")
    }, subhead), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__content"
    }, badgeBeforeTitle && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeBeforeTitle), /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        className: "vkuiSimpleCell__children",
        weight: "3"
    }, children), hasReactNode(badgeAfterTitle) && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeAfterTitle)), subtitle && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiSimpleCell__content"
    }, badgeBeforeSubtitle && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeBeforeSubtitle), /*#__PURE__*/ React.createElement(Footnote, {
        normalize: false,
        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__subtitle")
    }, subtitle), badgeAfterSubtitle && /*#__PURE__*/ React.createElement("span", {
        className: "vkuiSimpleCell__badge"
    }, badgeAfterSubtitle)), extraSubtitle && /*#__PURE__*/ React.createElement(Footnote, {
        className: classNames("vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle")
    }, extraSubtitle)), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Headline, {
        Component: "span",
        weight: "3",
        className: "vkuiSimpleCell__indicator"
    }, indicator), hasAfter && /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiSimpleCell__after", "vkuiInternalSimpleCell__after")
    }, after, hasChevron && /*#__PURE__*/ React.createElement(Chevron, {
        size: chevronSize,
        className: "vkuiSimpleCell__chevronIcon"
    })));
};

//# sourceMappingURL=SimpleCell.js.map