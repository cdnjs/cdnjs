"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderContent", {
    enumerable: true,
    get: function() {
        return PanelHeaderContent;
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
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Text = require("../Typography/Text/Text");
const platformClassNames = {
    ios: "vkuiPanelHeaderContent--ios",
    android: "vkuiPanelHeaderContent--android",
    vkcom: "vkuiPanelHeaderContent--vkcom"
};
const sizeYClassNames = {
    none: "vkuiPanelHeaderContent--sizeY-none",
    compact: "vkuiPanelHeaderContent--sizeY-compact"
};
const PanelHeaderChildren = ({ hasStatus, hasBefore, children })=>{
    const platform = (0, _usePlatform.usePlatform)();
    return hasStatus || hasBefore ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, {
        className: "vkuiPanelHeaderContent__childrenText",
        Component: "div",
        weight: platform === 'vkcom' ? '2' : undefined,
        children: children
    }) : /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
        className: "vkuiPanelHeaderContent__children-in",
        children: children
    });
};
const PanelHeaderContent = (_param)=>{
    var { aside, status, before, children, onClick } = _param, restProps = _object_without_properties._(_param, [
        "aside",
        "status",
        "before",
        "children",
        "onClick"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const InComponent = onClick ? _Tappable.Tappable : 'div';
    const rootProps = onClick ? {} : restProps;
    const platform = (0, _usePlatform.usePlatform)();
    const inProps = onClick ? _object_spread_props._(_object_spread._({}, restProps), {
        onClick,
        activeEffectDelay: 200,
        hasActive: platform === 'ios',
        activeMode: 'opacity'
    }) : {};
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, rootProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPanelHeaderContent", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, sizeY !== 'regular' && sizeYClassNames[sizeY]),
        children: [
            (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiPanelHeaderContent__before",
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)(InComponent, _object_spread_props._(_object_spread._({}, inProps), {
                className: (0, _vkjs.classNames)("vkuiPanelHeaderContent__in", !before && platform !== 'android' && "vkuiPanelHeaderContent__in--centered"),
                children: [
                    (0, _vkjs.hasReactNode)(status) && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                        className: "vkuiPanelHeaderContent__status",
                        children: status
                    }),
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: "vkuiPanelHeaderContent__children",
                        children: [
                            /*#__PURE__*/ (0, _jsxruntime.jsx)(PanelHeaderChildren, {
                                hasStatus: (0, _vkjs.hasReactNode)(status),
                                hasBefore: (0, _vkjs.hasReactNode)(before),
                                children: children
                            }),
                            (0, _vkjs.hasReactNode)(aside) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                                className: "vkuiPanelHeaderContent__aside",
                                children: aside
                            })
                        ]
                    }),
                    (0, _vkjs.hasReactNode)(before) && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiPanelHeaderContent__width"
                    })
                ]
            }))
        ]
    }));
};

//# sourceMappingURL=PanelHeaderContent.js.map