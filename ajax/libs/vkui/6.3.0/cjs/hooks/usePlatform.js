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
const _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function usePlatform() {
    const { platform } = (0, _ConfigProviderContext.useConfigProvider)();
    return platform;
}

//# sourceMappingURL=usePlatform.js.map