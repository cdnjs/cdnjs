"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Title", {
    enumerable: true,
    get: function() {
        return Title;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _Typography = require("../Typography");
var stylesLevel = {
    "1": "vkuiTitle--level-1",
    "2": "vkuiTitle--level-2",
    "3": "vkuiTitle--level-3"
};
var Title = function(_param) {
    var className = _param.className, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, Component = _param.Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties._(_param, [
        "className",
        "level",
        "Component",
        "normalize"
    ]);
    if (!Component) {
        Component = "h" + level;
    }
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        className: (0, _vkjs.classNames)(className, stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Title.js.map