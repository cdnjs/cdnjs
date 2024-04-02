import * as React from 'react';
const isFunctionExistInProps = (props, key)=>typeof props[key] === 'function';
/**
 * Полезен, когда нужно сохранить пользовательские события.
 *
 * Приоритет даём пользовательскому событию. Например, можно будет отловить был ли вызван
 * `event.preventDefault()` через `event.defaultPrevented`.
 *
 * @private
 */ export const getMergedSameEventsByProps = (mainProps, secondProps)=>{
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