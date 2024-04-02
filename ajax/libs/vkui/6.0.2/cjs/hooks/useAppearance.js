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
const _ConfigProviderContext = require("../components/ConfigProvider/ConfigProviderContext");
const _appearance = require("../lib/appearance");
function useAppearance() {
    const { appearance } = (0, _ConfigProviderContext.useConfigProvider)();
    return appearance !== null && appearance !== void 0 ? appearance : _appearance.DEFAULT_APPEARANCE;
}

//# sourceMappingURL=useAppearance.js.map