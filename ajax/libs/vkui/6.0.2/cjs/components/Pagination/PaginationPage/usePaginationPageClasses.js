"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "usePaginationPageClassNames", {
    enumerable: true,
    get: function() {
        return usePaginationPageClassNames;
    }
});
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
function usePaginationPageClassNames({ isCurrent, disabled }) {
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return (0, _vkjs.classNames)("vkuiPaginationPage", sizeY === 'none' && "vkuiPaginationPage--sizeY-none", sizeY === 'compact' && "vkuiPaginationPage--sizeY-compact", isCurrent && "vkuiPaginationPage--current", disabled && "vkuiPaginationPage--disabled");
}

//# sourceMappingURL=usePaginationPageClasses.js.map