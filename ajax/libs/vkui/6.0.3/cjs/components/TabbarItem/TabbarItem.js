"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "TabbarItem", {
    enumerable: true,
    get: function() {
        return TabbarItem;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _warnOnce = require("../../lib/warnOnce");
const _RootComponent = require("../RootComponent/RootComponent");
const _Tappable = require("../Tappable/Tappable");
const _Footnote = require("../Typography/Footnote/Footnote");
const warn = (0, _warnOnce.warnOnce)('TabbarItem');
const TabbarItem = (_param)=>{
    var { children, selected, indicator, text, href, Component = href ? 'a' : 'button', disabled } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "selected",
        "indicator",
        "text",
        "href",
        "Component",
        "disabled"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    if (process.env.NODE_ENV === 'development') {
        const hasAccessibleName = text || restProps['aria-label'] || restProps['aria-labelledby'];
        if (!hasAccessibleName) {
            warn(_warnOnce.COMMON_WARNINGS.a11y[Component === 'a' ? 'link-name' : 'button-name'], 'error');
        }
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: Component
    }, restProps), {
        disabled: disabled,
        href: href,
        baseClassName: (0, _vkjs.classNames)("vkuiTabbarItem", platform === 'ios' && "vkuiTabbarItem--ios", platform === 'android' && "vkuiTabbarItem--android", selected && "vkuiTabbarItem--selected")
    }), /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        role: "presentation",
        disabled: disabled,
        activeMode: platform === 'ios' ? "vkuiTabbarItem__tappable--active" : 'background',
        activeEffectDelay: platform === 'ios' ? 0 : 300,
        hasHover: false,
        className: "vkuiTabbarItem__tappable",
        onClick: _vkjs.noop
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabbarItem__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiTabbarItem__icon"
    }, children, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiInternalTabbarItem__label"
    }, (0, _vkjs.hasReactNode)(indicator) && indicator)), text && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        Component: "div",
        className: "vkuiTabbarItem__text",
        weight: "2"
    }, text)));
};

//# sourceMappingURL=TabbarItem.js.map