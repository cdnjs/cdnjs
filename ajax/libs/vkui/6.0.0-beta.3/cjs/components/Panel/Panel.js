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
    ['compact']: "vkuiPanel--sizeX-compact",
    ['regular']: "vkuiPanel--sizeX-regular"
};
const Panel = (_param)=>{
    var { centered = false, children, nav } = _param, restProps = _object_without_properties._(_param, [
        "centered",
        "children",
        "nav"
    ]);
    const { sizeX = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const { layout } = _react.useContext(_AppRootContext.AppRootContext);
    return /*#__PURE__*/ _react.createElement(_NavIdContext.NavPanelIdContext.Provider, {
        value: restProps.id || nav
    }, /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({}, restProps), {
        baseClassName: (0, _vkjs.classNames)("vkuiPanel", sizeXClassNames[sizeX], centered && 'vkuiInternalPanel--centered', layout === 'card' && "vkuiPanel--layout-card")
    }), /*#__PURE__*/ _react.createElement(_Touch.Touch, {
        Component: _OnboardingTooltipContainer.OnboardingTooltipContainer,
        className: (0, _vkjs.classNames)("vkuiPanel__in", 'vkuiInternalPanel__in')
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__in-before"
    }), centered ? /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__centered"
    }, children) : children, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPanel__in-after"
    }))));
};

//# sourceMappingURL=Panel.js.map