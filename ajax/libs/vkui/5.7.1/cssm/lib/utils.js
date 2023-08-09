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

//# sourceMappingURL=utils.js.map