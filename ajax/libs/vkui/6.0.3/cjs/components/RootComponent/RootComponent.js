"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RootComponent", {
    enumerable: true,
    get: function() {
        return RootComponent;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const RootComponent = (_param)=>{
    var { Component = 'div', baseClassName, className, getRootRef } = _param, restProps = _object_without_properties._(_param, [
        "Component",
        "baseClassName",
        "className",
        "getRootRef"
    ]);
    return /*#__PURE__*/ _react.createElement(Component, _object_spread._({
        ref: getRootRef,
        className: (0, _vkjs.classNames)(baseClassName, className)
    }, restProps));
};

//# sourceMappingURL=RootComponent.js.map