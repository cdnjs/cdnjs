"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRef = void 0;
function isRef(obj) {
    return (
    // eslint-disable-next-line no-prototype-builtins
    obj !== null &&
        typeof obj === 'object' &&
        Object.prototype.hasOwnProperty.call(obj, 'current'));
}
exports.isRef = isRef;
