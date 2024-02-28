"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "useAppearance", {
    enumerable: true,
    get: function() {
        return useAppearance;
    }
});
var _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
function useAppearance() {
    var appearance = (0, _ConfigProviderContext.useConfigProvider)().appearance;
    return appearance !== null && appearance !== void 0 ? appearance : "light";
}

//# sourceMappingURL=useAppearance.js.map