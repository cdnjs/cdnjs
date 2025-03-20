"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isTesting", {
    enumerable: true,
    get: function() {
        return isTesting;
    }
});
const _dom = require("./dom");
const isTesting = Boolean(_dom.canUseDOM && window.__isVkuiTesting);

//# sourceMappingURL=testing.js.map