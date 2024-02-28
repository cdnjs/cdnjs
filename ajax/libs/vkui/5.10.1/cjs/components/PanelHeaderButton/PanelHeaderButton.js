"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PanelHeaderButton", {
    enumerable: true,
    get: function() {
        return PanelHeaderButton;
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
var _utils = require("../../lib/utils");
var _warnOnce = require("../../lib/warnOnce");
var _Tappable = require("../Tappable/Tappable");
var _Text = require("../Typography/Text/Text");
var _Title = require("../Typography/Title/Title");
var platformClassNames = {
    ios: "vkuiPanelHeaderButton--ios",
    android: "vkuiPanelHeaderButton--android",
    vkcom: "vkuiPanelHeaderButton--vkcom"
};
var ButtonTypography = function(param) {
    var primary = param.primary, children = param.children;
    var platform = (0, _usePlatform.usePlatform)();
    if (platform === _platform.Platform.IOS) {
        return /*#__PURE__*/ _react.createElement(_Title.Title, {
            Component: "span",
            level: "3",
            weight: primary ? "1" : "3"
        }, children);
    }
    return /*#__PURE__*/ _react.createElement(_Text.Text, {
        weight: platform === _platform.Platform.VKCOM ? undefined : "2"
    }, children);
};
var warn = (0, _warnOnce.warnOnce)("PanelHeaderButton");
var PanelHeaderButton = function(_param) {
    var children = _param.children, _param_primary = _param.primary, primary = _param_primary === void 0 ? false : _param_primary, label = _param.label, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "primary",
        "label",
        "className"
    ]);
    var isPrimitive = (0, _vkjs.isPrimitiveReactNode)(children);
    var isPrimitiveLabel = (0, _vkjs.isPrimitiveReactNode)(label);
    var platform = (0, _usePlatform.usePlatform)();
    var hoverMode;
    var activeMode;
    switch(platform){
        case _platform.Platform.IOS:
            hoverMode = "opacity";
            activeMode = "opacity";
            break;
        case _platform.Platform.VKCOM:
            hoverMode = "vkuiPanelHeaderButton--hover";
            activeMode = "vkuiPanelHeaderButton--active";
            break;
        default:
            hoverMode = "background";
            activeMode = "background";
    }
    if (process.env.NODE_ENV === "development") {
        var hasAccessibleName = Boolean((0, _utils.getTitleFromChildren)(children) || (0, _utils.getTitleFromChildren)(label) || restProps["aria-label"] || restProps["aria-labelledby"]);
        if (!hasAccessibleName) {
            warn("a11y: У кнопки нет названия, которое может прочитать скринридер, и она недоступна для части пользователей. Замените содержимое на текст или добавьте описание действия с помощью пропа aria-label.", "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        hoverMode: hoverMode,
        activeEffectDelay: 200,
        activeMode: activeMode,
        className: (0, _vkjs.classNames)("vkuiInternalPanelHeaderButton", "vkuiPanelHeaderButton", platformClassNames.hasOwnProperty(platform) ? platformClassNames[platform] : platformClassNames.android, isPrimitive && "vkuiPanelHeaderButton--primitive", !isPrimitive && !isPrimitiveLabel && "vkuiPanelHeaderButton--notPrimitive", className)
    }), isPrimitive ? /*#__PURE__*/ _react.createElement(ButtonTypography, {
        primary: primary
    }, children) : children, isPrimitiveLabel ? /*#__PURE__*/ _react.createElement(ButtonTypography, {
        primary: primary,
        className: "vkuiPanelHeaderButton__label"
    }, label) : label);
};

//# sourceMappingURL=PanelHeaderButton.js.map