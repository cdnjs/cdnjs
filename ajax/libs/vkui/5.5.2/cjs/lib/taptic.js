"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "runTapticImpactOccurred", {
    enumerable: true,
    get: function() {
        return runTapticImpactOccurred;
    }
});
var _interop_require_default = require("@swc/helpers/_/_interop_require_default");
var _vkbridge = /*#__PURE__*/ _interop_require_default._(require("@vkontakte/vk-bridge"));
function runTapticImpactOccurred(style) {
    if (_vkbridge.default.supports("VKWebAppTapticImpactOccurred")) {
        _vkbridge.default.send("VKWebAppTapticImpactOccurred", {
            style: style
        }).catch(function() {
            return undefined;
        });
    }
}

//# sourceMappingURL=taptic.js.map