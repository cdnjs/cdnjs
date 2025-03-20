"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RichCell", {
    enumerable: true,
    get: function() {
        return RichCell;
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
const _Tappable = require("../Tappable/Tappable");
const _Subhead = require("../Typography/Subhead/Subhead");
const _RichCellIcon = require("./RichCellIcon/RichCellIcon");
const sizeYClassNames = {
    none: "vkuiRichCell--sizeY-none",
    compact: "vkuiRichCell--sizeY-compact"
};
const alignAfterClassNames = {
    start: "vkuiRichCell__content-after--align-start",
    center: "vkuiRichCell__content-after--align-center",
    end: "vkuiRichCell__content-after--align-end"
};
const RichCell = (_param)=>{
    var { subhead, children, text, caption, before, after, afterCaption, bottom, actions, multiline, className, afterAlign = 'start' } = _param, restProps = _object_without_properties._(_param, [
        "subhead",
        "children",
        "text",
        "caption",
        "before",
        "after",
        "afterCaption",
        "bottom",
        "actions",
        "multiline",
        "className",
        "afterAlign"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const afterRender = ()=>{
        if (!after && !afterCaption) {
            return;
        }
        return /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
            className: (0, _vkjs.classNames)("vkuiRichCell__content-after", alignAfterClassNames[afterAlign]),
            children: [
                after && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiRichCell__after-children",
                    children: after
                }),
                afterCaption && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiRichCell__after-caption",
                    children: afterCaption
                })
            ]
        });
    };
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        children: [
            before && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiRichCell__before",
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiRichCell__in",
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiRichCell__content",
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                                className: "vkuiRichCell__content-before",
                                children: [
                                    subhead && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                                        Component: "div",
                                        className: "vkuiRichCell__subhead",
                                        children: subhead
                                    }),
                                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                        className: "vkuiRichCell__children",
                                        children: children
                                    }),
                                    text && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                        className: "vkuiRichCell__text",
                                        children: text
                                    }),
                                    caption && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                                        Component: "div",
                                        className: "vkuiRichCell__caption",
                                        children: caption
                                    })
                                ]
                            }),
                            afterAlign === 'start' && afterRender()
                        ]
                    }),
                    bottom && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiRichCell__bottom",
                        children: bottom
                    }),
                    actions && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiRichCell__actions",
                        children: actions
                    })
                ]
            }),
            afterAlign !== 'start' && afterRender()
        ]
    }));
};
RichCell.Icon = _RichCellIcon.RichCellIcon;

//# sourceMappingURL=RichCell.js.map