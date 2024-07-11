"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    getPaginationPageClassNames: function() {
        return getPaginationPageClassNames;
    },
    usePaginationPageClassNames: function() {
        return usePaginationPageClassNames;
    }
});
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../../hooks/useAdaptivity");
const getPaginationPageClassNames = (opts)=>{
    return (0, _vkjs.classNames)("vkuiPaginationPage", opts.sizeY == null && "vkuiPaginationPage--sizeY-none", opts.sizeY === 'compact' && "vkuiPaginationPage--sizeY-compact", opts.isCurrent && "vkuiPaginationPage--current", opts.disabled && "vkuiPaginationPage--disabled");
};
function usePaginationPageClassNames({ isCurrent, disabled }) {
    const { sizeY } = (0, _useAdaptivity.useAdaptivity)();
    return getPaginationPageClassNames({
        isCurrent,
        disabled,
        sizeY
    });
}

//# sourceMappingURL=usePaginationPageClasses.js.map