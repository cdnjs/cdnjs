"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    addClassNameToElement: function() {
        return addClassNameToElement;
    },
    debounce: function() {
        return debounce;
    },
    excludeKeysWithUndefined: function() {
        return excludeKeysWithUndefined;
    },
    isDOMTypeElement: function() {
        return isDOMTypeElement;
    },
    isForwardRefElement: function() {
        return isForwardRefElement;
    },
    isValidNotReactFragmentElement: function() {
        return isValidNotReactFragmentElement;
    },
    multiRef: function() {
        return multiRef;
    },
    removeClassNameFromElement: function() {
        return removeClassNameFromElement;
    },
    setRef: function() {
        return setRef;
    },
    stopPropagation: function() {
        return stopPropagation;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
function debounce(fn, delay) {
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>fn(...args), delay);
    };
}
function setRef(element1, ref) {
    if (ref) {
        if (typeof ref === 'function') {
            ref(element1);
        } else {
            ref.current = element1;
        }
    }
}
function multiRef(...refs) {
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
const stopPropagation = (event)=>event.stopPropagation();
function addClassNameToElement(element1, className) {
    const elementClassName = element1.getAttribute('class') || '';
    const updatedClassName = `${elementClassName}${elementClassName ? ' ' : ''}${className}`;
    element1.setAttribute('class', updatedClassName);
}
function removeClassNameFromElement(element1, classNameToRemove) {
    const classNamesArray = (element1.getAttribute('class') || '').split(/\s+/);
    const elementIndexToRemove = classNamesArray.findIndex((className)=>className === classNameToRemove);
    if (elementIndexToRemove === -1) {
        return;
    }
    classNamesArray.splice(elementIndexToRemove, 1);
    element1.setAttribute('class', classNamesArray.join(' '));
}
const excludeKeysWithUndefined = (obj)=>{
    const filteredObj = {};
    for(const key in obj){
        if (obj.hasOwnProperty(key) && obj[key] !== undefined) {
            filteredObj[key] = obj[key];
        }
    }
    return filteredObj;
};
const isDOMTypeElement = (element1)=>typeof element1.type === 'string';
function isValidNotReactFragmentElement(children) {
    return _react.isValidElement(children) && // @ts-expect-error: TS2339 $$typeof всегда symbol, в отличии от type, благодаря этому пропускаем лишние проверки на тип.
    children.$$typeof !== Symbol.for('react.fragment');
}
function isForwardRefElement(children) {
    if (!_react.isValidElement(children)) {
        return false;
    }
    // @ts-expect-error: TS2339 $$typeof всегда symbol, в отличии от type, благодаря этому пропускаем лишние проверки на тип.
    // черпаем вдохновение из react-is https://github.com/facebook/react/blob/d48dbb824985166ecb7b2959db03090a8593dce0/packages/react-is/src/ReactIs.js#L119-L121
    const typeOfOfType = children.type && children.type.$$typeof;
    return typeOfOfType === Symbol.for('react.forward_ref');
}

//# sourceMappingURL=utils.js.map