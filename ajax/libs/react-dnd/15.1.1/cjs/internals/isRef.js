"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isRef = isRef;
function isRef(obj) {
    return(// eslint-disable-next-line no-prototype-builtins
    obj !== null && typeof obj === 'object' && Object.prototype.hasOwnProperty.call(obj, 'current'));
}

//# sourceMappingURL=isRef.js.map