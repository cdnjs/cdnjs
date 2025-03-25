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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePlatform = require("../../hooks/usePlatform");
const _Tappable = require("../Tappable/Tappable");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Headline = require("../Typography/Headline/Headline");
const _Subhead = require("../Typography/Subhead/Subhead");
const _Chevron = require("./Chevron/Chevron");
const sizeYClassNames = {
    none: "vkuiSimpleCell--sizeY-none",
    compact: "vkuiSimpleCell--sizeY-compact"
};
const SimpleCell = (_param)=>{
    var { badgeBeforeTitle, badgeAfterTitle, badgeBeforeSubtitle, badgeAfterSubtitle, before, indicator, children, after, expandable, multiline, subhead, subtitle, extraSubtitle, className, chevronSize = 'm' } = _param, restProps = _object_without_properties._(_param, [
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
    const platform = (0, _usePlatform.usePlatform)();
    const hasChevron = expandable === 'always' || expandable === 'auto' && platform === 'ios';
    const hasAfter = (0, _vkjs.hasReactNode)(after) || hasChevron;
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiSimpleCell", restProps.disabled && "vkuiSimpleCell--disabled", sizeY !== 'regular' && sizeYClassNames[sizeY], multiline && "vkuiSimpleCell--mult", className),
        children: [
            /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: (0, _vkjs.classNames)("vkuiSimpleCell__before", platform === 'ios' && "vkuiSimpleCell__before--ios"),
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiSimpleCell__middle",
                children: [
                    subhead && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                        Component: "span",
                        className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__subhead"),
                        children: subhead
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiSimpleCell__content",
                        children: [
                            badgeBeforeTitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeBeforeTitle
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, {
                                Component: "span",
                                className: "vkuiSimpleCell__children",
                                weight: "3",
                                children: children
                            }),
                            (0, _vkjs.hasReactNode)(badgeAfterTitle) && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeAfterTitle
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiSimpleCell__content",
                        children: [
                            badgeBeforeSubtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeBeforeSubtitle
                            }),
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                                normalize: false,
                                className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__subtitle"),
                                children: subtitle
                            }),
                            badgeAfterSubtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)("span", {
                                className: "vkuiSimpleCell__badge",
                                children: badgeAfterSubtitle
                            })
                        ]
                    }),
                    extraSubtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                        className: (0, _vkjs.classNames)("vkuiSimpleCell__text", "vkuiSimpleCell__extraSubtitle"),
                        children: extraSubtitle
                    })
                ]
            }),
            (0, _vkjs.hasReactNode)(indicator) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Headline.Headline, {
                Component: "span",
                weight: "3",
                className: "vkuiSimpleCell__indicator",
                children: indicator
            }),
            hasAfter && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: (0, _vkjs.classNames)("vkuiSimpleCell__after", 'vkuiInternalSimpleCell__after'),
                children: [
                    after,
                    hasChevron && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Chevron.Chevron, {
                        size: chevronSize,
                        className: "vkuiSimpleCell__chevronIcon"
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=SimpleCell.js.map