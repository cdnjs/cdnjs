"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "getMergedSameEventsByProps", {
    enumerable: true,
    get: function() {
        return getMergedSameEventsByProps;
    }
});
const isFunctionExistInProps = (props, key)=>typeof props[key] === 'function';
const getMergedSameEventsByProps = (mainProps, secondProps)=>{
    const result = {};
    for(const eventName in mainProps){
        if (mainProps.hasOwnProperty(eventName) && secondProps.hasOwnProperty(eventName) && isFunctionExistInProps(mainProps, eventName) && isFunctionExistInProps(secondProps, eventName)) {
            result[eventName] = function mergeSameEventsByProps(...args) {
                secondProps[eventName].apply(this, args);
                mainProps[eventName].apply(this, args);
            };
        }
    }
    return result;
};

//# sourceMappingURL=getMergedSameEventsByProps.js.map