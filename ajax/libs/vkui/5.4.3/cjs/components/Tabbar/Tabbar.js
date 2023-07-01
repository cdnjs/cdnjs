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
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _usePlatform = require("../../hooks/usePlatform");
var _platform = require("../../lib/platform");
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
    var children = _param.children, _param_shadow = _param.shadow, shadow = _param_shadow === void 0 ? true : _param_shadow, mode = _param.mode, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "shadow",
        "mode",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement("div", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiInternalTabbar", "vkuiTabbar", platform === _platform.Platform.IOS && "vkuiTabbar--ios", getItemsLayoutClassName(mode, children), shadow && "vkuiTabbar--shadow", className)
    }, restProps), children);
};

//# sourceMappingURL=Tabbar.js.map