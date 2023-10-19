"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "generateVKUITokensClassName", {
    enumerable: true,
    get: function() {
        return generateVKUITokensClassName;
    }
});
var _platform = require("../lib/platform");
var generateVKUITokensClassName = function(platform, appearance) {
    var tokensPlatform;
    switch(platform){
        case _platform.Platform.ANDROID:
            tokensPlatform = "vkBase";
            break;
        case _platform.Platform.IOS:
            tokensPlatform = "vkIOS";
            break;
        case _platform.Platform.VKCOM:
            tokensPlatform = "vkCom";
            break;
        default:
            tokensPlatform = platform;
    }
    return "vkui--".concat(tokensPlatform, "--").concat(appearance);
};

//# sourceMappingURL=generateVKUITokensClassName.js.map