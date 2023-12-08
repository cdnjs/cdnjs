"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AspectRatio", {
    enumerable: true,
    get: function() {
        return AspectRatio;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _RootComponent = require("../RootComponent/RootComponent");
function AspectRatio(_param) {
    var { ratio, mode = 'stretch', style: styleProp } = _param, props = _object_without_properties._(_param, [
        "ratio",
        "mode",
        "style"
    ]);
    const style = {
        ['--vkui_internal--aspect_ratio']: String(ratio)
    };
    return /*#__PURE__*/ _react.createElement(_RootComponent.RootComponent, _object_spread._({
        baseClassName: (0, _vkjs.classNames)("vkuiAspectRatio", mode === 'stretch' && "vkuiAspectRatio--mode-stretch"),
        style: _object_spread._({}, styleProp, style)
    }, props));
}

//# sourceMappingURL=AspectRatio.js.map