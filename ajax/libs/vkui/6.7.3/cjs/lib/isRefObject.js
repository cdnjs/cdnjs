"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "isRefObject", {
    enumerable: true,
    get: function() {
        return isRefObject;
    }
});
const isRefObject = (refObject)=>{
    return typeof refObject === 'object' && refObject !== null && refObject.hasOwnProperty('current');
};

//# sourceMappingURL=isRefObject.js.map