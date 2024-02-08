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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _usePlatform = require("../../hooks/usePlatform");
const _RootComponent = require("../RootComponent/RootComponent");
const getItemsLayoutClassName = (itemsLayout, children)=>{
    switch(itemsLayout){
        case 'horizontal':
            return 'vkuiInternalTabbar--layout-horizontal';
        case 'vertical':
            return 'vkuiInternalTabbar--layout-vertical';
        default:
            return _react.Children.count(children) > 2 ? getItemsLayoutClassName('vertical', []) : getItemsLayoutClassName('horizontal', []);
    }
};
const Tabbar = (_param)=>{
    var { plain = false, mode } = _param, restProps = _object_without_properties._(_param, [
        "plain",
        "mode"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)('vkuiInternalTabbar', "vkuiTabbar", platform === 'ios' && "vkuiTabbar--ios", getItemsLayoutClassName(mode, restProps.children), !plain && "vkuiTabbar--shadow")
    }, restProps));
};

//# sourceMappingURL=Tabbar.js.map