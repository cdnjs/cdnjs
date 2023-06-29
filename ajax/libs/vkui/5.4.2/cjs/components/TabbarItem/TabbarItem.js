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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _tappable = require("../Tappable/Tappable");
var _footnote = require("../Typography/Footnote/Footnote");
var warn = (0, _warnOnce.warnOnce)("TabbarItem");
var TabbarItem = function(_param) {
    var children = _param.children, selected = _param.selected, indicator = _param.indicator, text = _param.text, href = _param.href, _param_Component = _param.Component, Component = _param_Component === void 0 ? href ? "a" : "button" : _param_Component, disabled = _param.disabled, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "selected",
        "indicator",
        "text",
        "href",
        "Component",
        "disabled",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    if (process.env.NODE_ENV === "development") {
        var hasAccessibleName = text || restProps["aria-label"] || restProps["aria-labelledby"];
        if (!hasAccessibleName) {
            warn(_warnOnce.COMMON_WARNINGS.a11y[Component === "a" ? "link-name" : "button-name"], "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(Component, _objectSpreadProps(_objectSpread({}, restProps), {
        disabled: disabled,
        href: href,
        className: (0, _vkjs.classNames)("vkuiTabbarItem", platform === _platform.Platform.IOS && "vkuiTabbarItem--ios", platform === _platform.Platform.ANDROID && "vkuiTabbarItem--android", selected && "vkuiTabbarItem--selected", !!text && "vkuiTabbarItem--text", className)
    }), /*#__PURE__*/ _react.createElement(_tappable.Tappable, {
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
    }, (0, _vkjs.hasReactNode)(indicator) && indicator)), text && /*#__PURE__*/ _react.createElement(_footnote.Footnote, {
        Component: "div",
        className: "vkuiTabbarItem__text",
        weight: "2"
    }, text)));
};

//# sourceMappingURL=TabbarItem.js.map