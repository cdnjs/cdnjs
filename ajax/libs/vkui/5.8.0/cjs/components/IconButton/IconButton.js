"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "IconButton", {
    enumerable: true,
    get: function() {
        return IconButton;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _Tappable = require("../Tappable/Tappable");
var sizeYClassNames = _define_property._({
    none: "vkuiIconButton--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiIconButton--sizeY-compact");
var warn = (0, _warnOnce.warnOnce)("IconButton");
var IconButton = function(_param) {
    var children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    if (process.env.NODE_ENV === "development") {
        var isAccessible = restProps["aria-label"] || restProps["aria-labelledby"];
        if (!isAccessible) {
            warn(_warnOnce.COMMON_WARNINGS.a11y[restProps.href ? "link-name" : "button-name"], "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread_props._(_object_spread._({
        activeEffectDelay: 200,
        activeMode: "background",
        Component: restProps.href ? "a" : "button"
    }, restProps), {
        className: (0, _vkjs.classNames)("vkuiIconButton", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], platform === _platform.Platform.IOS && "vkuiIconButton--ios", className)
    }), children);
};

//# sourceMappingURL=IconButton.js.map