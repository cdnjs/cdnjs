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
var _interopRequireDefault = require("@swc/helpers/lib/_interop_require_default.js").default;
var _vkBridge = /*#__PURE__*/ _interopRequireDefault(require("@vkontakte/vk-bridge"));
function runTapticImpactOccurred(style) {
    if (_vkBridge.default.supports("VKWebAppTapticImpactOccurred")) {
        _vkBridge.default.send("VKWebAppTapticImpactOccurred", {
            style: style
        }).catch(function() {
            return undefined;
        });
    }
}

//# sourceMappingURL=taptic.js.map