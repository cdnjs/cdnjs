"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Div", {
    enumerable: true,
    get: function() {
        return Div;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var Div = function(_param) {
    var children = _param.children, getRootRef = _param.getRootRef, className = _param.className, restProps = _object_without_properties._(_param, [
        "children",
        "getRootRef",
        "className"
    ]);
    return /*#__PURE__*/ _react.createElement("div", _object_spread_props._(_object_spread._({}, restProps), {
        ref: getRootRef,
        className: (0, _vkjs.classNames)("vkuiDiv", className)
    }), children);
};

//# sourceMappingURL=Div.js.map