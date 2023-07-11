"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePlatform", {
    enumerable: true,
    get: function() {
        return usePlatform;
    }
});
var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function usePlatform() {
    var platform = (0, _ConfigProviderContext.useConfigProvider)().platform;
    return platform;
}

//# sourceMappingURL=usePlatform.js.map