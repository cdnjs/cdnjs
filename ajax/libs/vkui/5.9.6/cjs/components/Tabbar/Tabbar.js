"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Tabbar", {
    enumerable: true,
    get: function() {
        return Tabbar;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
var _RootComponent = require("../RootComponent/RootComponent");
var getItemsLayoutClassName = function(itemsLayout, children) {
    switch(itemsLayout){
        case "horizontal":
            return "vkuiInternalTabbar--layout-horizontal";
        case "vertical":
            return "vkuiInternalTabbar--layout-vertical";
        default:
            return _react.Children.count(children) > 2 ? getItemsLayoutClassName("vertical", []) : getItemsLayoutClassName("horizontal", []);
    }
};
var Tabbar = function(_param) {
    var _param_shadow = _param.shadow, shadow = _param_shadow === void 0 ? true : _param_shadow, mode = _param.mode, restProps = _object_without_properties._(_param, [
        "shadow",
        "mode"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiInternalTabbar", "vkuiTabbar", platform === _platform.Platform.IOS && "vkuiTabbar--ios", getItemsLayoutClassName(mode, restProps.children), shadow && "vkuiTabbar--shadow")
    }, restProps));
};

//# sourceMappingURL=Tabbar.js.map