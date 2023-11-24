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
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../../hooks/useAdaptivity");
var _adaptivity = require("../../../lib/adaptivity");
function usePaginationPageClassNames(param) {
    var isCurrent = param.isCurrent, disabled = param.disabled;
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return (0, _vkjs.classNames)("vkuiPaginationPage", sizeY === "none" && "vkuiPaginationPage--sizeY-none", sizeY === _adaptivity.SizeType.COMPACT && "vkuiPaginationPage--sizeY-compact", isCurrent && "vkuiPaginationPage--current", disabled && "vkuiPaginationPage--disabled");
}

//# sourceMappingURL=usePaginationPageClasses.js.map