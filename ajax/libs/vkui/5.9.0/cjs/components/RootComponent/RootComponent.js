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
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var RootComponent = function(_param) /*#__PURE__*/ {
    var _param_Component = _param.Component, Component = _param_Component === void 0 ? "div" : _param_Component, baseClassName = _param.baseClassName, className = _param.className, getRootRef = _param.getRootRef, restProps = _object_without_properties._(_param, [
        "Component",
        "baseClassName",
        "className",
        "getRootRef"
    ]);
    return _react.createElement(Component, _object_spread._({
        ref: getRootRef,
        className: (0, _vkjs.classNames)(baseClassName, className)
    }, restProps));
};

//# sourceMappingURL=RootComponent.js.map