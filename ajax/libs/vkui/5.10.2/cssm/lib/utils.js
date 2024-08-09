import * as React from 'react';
export function debounce(fn, delay) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>fn(...args), delay);
    };
}
export function setRef(element1, ref) {
    if (ref) {
        if (typeof ref === 'function') {
            ref(element1);
        } else {
            ref.current = element1;
        }
    }
}
export function multiRef(...refs) {
    let current = null;
    return {
        get current () {
            return current;
        },
        set current (element){
            current = element;
            refs.forEach((ref)=>ref && setRef(element, ref));
        }
    };
}
export function getTitleFromChildren(children) {
    let label = '';
    React.Children.map(children, (child)=>{
        if (typeof child === 'string') {
            label += ' ' + child;
        }
    });
    return label.trim();
}
export const stopPropagation = (event)=>event.stopPropagation();
export function addClassNameToElement(element1, className) {
    const elementClassName = element1.getAttribute('class') || '';
    const updatedClassName = `${elementClassName}${elementClassName ? ' ' : ''}${className}`;
    element1.setAttribute('class', updatedClassName);
}
export function removeClassNameFromElement(element1, classNameToRemove) {
    const classNamesArray = (element1.getAttribute('class') || '').split(/\s+/);
    const elementIndexToRemove = classNamesArray.findIndex((className)=>className === classNameToRemove);
    if (elementIndexToRemove === -1) {
        return;
    }
    classNamesArray.splice(elementIndexToRemove, 1);
    element1.setAttribute('class', classNamesArray.join(' '));
}
export const excludeKeysWithUndefined = (obj)=>{
    const filteredObj = {};
    for(const key in obj){
        if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
};

//# sourceMappingURL=utils.js.map