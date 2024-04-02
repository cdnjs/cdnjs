"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "calcInitialsAvatarColor", {
    enumerable: true,
    get: function() {
        return calcInitialsAvatarColor;
    }
});
function calcInitialsAvatarColor(objectId) {
    return objectId % 6 + 1;
}

//# sourceMappingURL=avatar.js.map