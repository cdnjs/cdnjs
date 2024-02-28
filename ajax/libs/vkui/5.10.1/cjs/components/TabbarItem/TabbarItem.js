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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _RootComponent = require("../RootComponent/RootComponent");
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var warn = (0, _warnOnce.warnOnce)("TabbarItem");
var TabbarItem = function(_param) {
    var children = _param.children, selected = _param.selected, indicator = _param.indicator, text = _param.text, href = _param.href, _param_Component = _param.Component, Component = _param_Component === void 0 ? href ? "a" : "button" : _param_Component, disabled = _param.disabled, restProps = _object_without_properties._(_param, [
        "children",
        "selected",
        "indicator",
        "text",
        "href",
        "Component",
        "disabled"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    if (process.env.NODE_ENV === "development") {
        var hasAccessibleName = text || restProps["aria-label"] || restProps["aria-labelledby"];
        if (!hasAccessibleName) {
            warn(_warnOnce.COMMON_WARNINGS.a11y[Component === "a" ? "link-name" : "button-name"], "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread_props._(_object_spread._({
        Component: Component
    }, restProps), {
        disabled: disabled,
        href: href,
        baseClassName: (0, _vkjs.classNames)("vkuiTabbarItem", platform === _platform.Platform.IOS && "vkuiTabbarItem--ios", platform === _platform.Platform.ANDROID && "vkuiTabbarItem--android", selected && "vkuiTabbarItem--selected")
    }), /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        role: "presentation",
        Component: "div",
        disabled: disabled,
        activeMode: platform === _platform.Platform.IOS ? "vkuiTabbarItem__tappable--active" : "background",
        activeEffectDelay: platform === _platform.Platform.IOS ? 0 : 300,
        hasHover: false,
        className: "vkuiTabbarItem__tappable"
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