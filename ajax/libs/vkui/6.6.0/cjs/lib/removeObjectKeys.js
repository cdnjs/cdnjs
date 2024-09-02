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
const _object_spread = require("@swc/helpers/_/_object_spread");
function removeObjectKeys(obj, keys = []) {
    let newObj = _object_spread._({}, obj);
    keys.forEach((key)=>delete newObj[key]);
    return newObj;
}

//# sourceMappingURL=removeObjectKeys.js.map