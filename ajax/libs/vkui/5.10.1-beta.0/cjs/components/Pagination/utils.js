"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getPageAriaLabelDefault", {
    enumerable: true,
    get: function() {
        return getPageAriaLabelDefault;
    }
});
function getPageAriaLabelDefault(page, isCurrent) {
    return isCurrent ? "".concat(page, " страница") : "Перейти на ".concat(page, " страницу");
}

//# sourceMappingURL=utils.js.map