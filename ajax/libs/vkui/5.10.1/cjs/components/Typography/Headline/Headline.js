"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Headline", {
    enumerable: true,
    get: function() {
        return Headline;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../../hooks/useAdaptivity");
var _adaptivity = require("../../../lib/adaptivity");
var _Typography = require("../Typography");
var stylesLevel = {
    "1": "vkuiHeadline--level-1",
    "2": "vkuiHeadline--level-2"
};
var sizeYClassNames = _define_property._({
    none: "vkuiHeadline--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiHeadline--sizeY-compact");
var Headline = function(_param) {
    var className = _param.className, _param_weight = _param.weight, weight = _param_weight === void 0 ? "3" : _param_weight, _param_level = _param.level, level = _param_level === void 0 ? "1" : _param_level, _param_Component = _param.Component, Component = _param_Component === void 0 ? "h4" : _param_Component, _param_normalize = _param.normalize, normalize = _param_normalize === void 0 ? true : _param_normalize, restProps = _object_without_properties._(_param, [
        "className",
        "weight",
        "level",
        "Component",
        "normalize"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_Typography.Typography, _object_spread._({
        Component: Component,
        normalize: normalize,
        weight: weight,
        className: (0, _vkjs.classNames)(className, sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], stylesLevel[level])
    }, restProps));
};

//# sourceMappingURL=Headline.js.map