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
export const isDOMTypeElement = (element1)=>typeof element1.type === 'string';
export function isValidNotReactFragmentElement(children) {
    return React.isValidElement(children) && // @ts-expect-error: TS2339 $$typeof всегда symbol, в отличии от type, благодаря этому пропускаем лишние проверки на тип.
    children.$$typeof !== Symbol.for('react.fragment');
}
export function isForwardRefElement(children) {
    if (!React.isValidElement(children)) {
        return false;
    }
    // @ts-expect-error: TS2339 $$typeof всегда symbol, в отличии от type, благодаря этому пропускаем лишние проверки на тип.
    // черпаем вдохновение из react-is https://github.com/facebook/react/blob/d48dbb824985166ecb7b2959db03090a8593dce0/packages/react-is/src/ReactIs.js#L119-L121
    const typeOfOfType = children.type && children.type.$$typeof;
    return typeOfOfType === Symbol.for('react.forward_ref');
}

//# sourceMappingURL=utils.js.map