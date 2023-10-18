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
var _dom = require("./dom");
var isTesting = Boolean(_dom.canUseDOM && window.__isVkuiTesting);

//# sourceMappingURL=testing.js.map