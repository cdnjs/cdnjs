"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Panel", {
    enumerable: true,
    get: function() {
        return Panel;
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
const _AppRootContext = require("../AppRoot/AppRootContext");
const _NavIdContext = require("../NavIdContext/NavIdContext");
const _OnboardingTooltipContainer = require("../OnboardingTooltip/OnboardingTooltipContainer");
const _RootComponent = require("../RootComponent/RootComponent");
const _Touch = require("../Touch/Touch");
const sizeXClassNames = {
    none: "vkuiPanel--sizeX-none",
    compact: "vkuiPanel--sizeX-compact",
    regular: "vkuiPanel--sizeX-regular"
};
const stylesMode = {
    none: "vkuiPanel--mode-none",
    plain: "vkuiPanel--mode-plain",
    card: "vkuiPanel--mode-card"
};
const Panel = (_param)=>{
    var { centered = false, children, nav, mode: modeProp, disableBackground } = _param, restProps = _object_without_properties._(_param, [
        "centered",
        "children",
        "nav",
        "mode",
        "disableBackground"
    ]);
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const mode = usePanelMode(modeProp, sizeX);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_NavIdContext.NavPanelIdContext.Provider, {
        value: restProps.id || nav,
        children: /*#__PURE__*/ (0, _jsxruntime.jsx)(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
            baseClassName: (0, _vkjs.classNames)("vkuiPanel", sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', disableBackground && "vkuiPanel--disableBackground", stylesMode[mode]),
            children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Touch.Touch, {
                Component: _OnboardingTooltipContainer.OnboardingTooltipContainer,
                className: (0, _vkjs.classNames)("vkuiPanel__in", 'vkuiInternalPanel__in'),
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiPanel__in-before"
                    }),
                    centered ? /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiPanel__centered",
                        children: children
                    }) : children,
                    /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                        className: "vkuiPanel__in-after"
                    })
                ]
            })
        }))
    });
};
function usePanelMode(modeProp, sizeX) {
    const { layout } = _react.useContext(_AppRootContext.AppRootContext);
    if (modeProp) {
        return modeProp;
    }
    if (layout) {
        return layout;
    }
    if (sizeX !== 'none') {
        return sizeX === 'regular' ? 'card' : 'plain';
    }
    return 'none';
}

//# sourceMappingURL=Panel.js.map