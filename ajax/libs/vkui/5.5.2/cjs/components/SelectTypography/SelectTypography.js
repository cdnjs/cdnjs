"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SelectTypography", {
    enumerable: true,
    get: function() {
        return SelectTypography;
    }
});
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var sizeYClassNames = {
    none: "vkuiSelectTypography--sizeY-none",
    compact: "vkuiSelectTypography--sizeY-compact"
};
var platformClassNames = {
    vkcom: "vkuiSelectTypography--vkcom",
    android: "vkuiSelectTypography--android"
};
var SelectTypography = function(_param) {
    var _param_selectType = _param.selectType, selectType = _param_selectType === void 0 ? "default" : _param_selectType, children = _param.children, className = _param.className, restProps = _object_without_properties._(_param, [
        "selectType",
        "children",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement("span", _object_spread._({
        className: (0, _vkjs.classNames)("vkuiSelectTypography", platformClassNames.hasOwnProperty(platform) && platformClassNames[platform], sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], selectType === "accent" && "vkuiSelectTypography--selectType-accent", className)
    }, restProps), children);
};

//# sourceMappingURL=SelectTypography.js.map