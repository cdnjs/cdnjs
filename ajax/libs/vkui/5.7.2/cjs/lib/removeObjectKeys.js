"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "removeObjectKeys", {
    enumerable: true,
    get: function() {
        return removeObjectKeys;
    }
});
var _object_spread = require("@swc/helpers/_/_object_spread");
function removeObjectKeys(obj) {
    var keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    var newObj = _object_spread._({}, obj);
    keys.forEach(function(key) {
        return delete newObj[key];
    });
    return newObj;
}

//# sourceMappingURL=removeObjectKeys.js.map