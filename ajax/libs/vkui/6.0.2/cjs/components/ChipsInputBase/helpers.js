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
    getChipOptionIndexByHTMLElement: function() {
        return getChipOptionIndexByHTMLElement;
    },
    getChipOptionIndexByValueProp: function() {
        return getChipOptionIndexByValueProp;
    },
    getChipOptionValueByHTMLElement: function() {
        return getChipOptionValueByHTMLElement;
    },
    getNextChipOptionIndexByNavigateToProp: function() {
        return getNextChipOptionIndexByNavigateToProp;
    },
    isInputValueEmpty: function() {
        return isInputValueEmpty;
    },
    isValueLikeChipOptionObject: function() {
        return isValueLikeChipOptionObject;
    }
});
const _constants = require("./constants");
const isValueLikeChipOptionObject = (v)=>typeof v === 'object' && 'value' in v;
const isInputValueEmpty = (input)=>input ? input.value === _constants.DEFAULT_INPUT_VALUE : true;
const getChipOptionIndexByValueProp = (optionProp, valueProp)=>{
    const value = isValueLikeChipOptionObject(optionProp) ? optionProp.value : optionProp;
    return valueProp.findIndex((option)=>option.value === value);
};
const getChipOptionIndexByHTMLElement = (el)=>{
    const value = el && el.dataset.index;
    return typeof value === 'string' ? Number(value) : -1;
};
const getChipOptionValueByHTMLElement = (el)=>{
    const value = el && el.dataset.value;
    return typeof value === 'string' ? value : -1;
};
const getNextChipOptionIndexByNavigateToProp = (currentIndex, navigateTo, length)=>{
    const FIRST_INDEX = 0;
    const LAST_INDEX = length - 1;
    switch(navigateTo){
        case 'first':
            return FIRST_INDEX;
        case 'prev':
            const prevIndex = currentIndex - 1;
            return prevIndex < 0 ? LAST_INDEX : prevIndex;
        case 'next':
            const nextIndex = currentIndex + 1;
            return nextIndex > LAST_INDEX ? 0 : nextIndex;
        case 'last':
            return LAST_INDEX;
        default:
            /* istanbul ignore next */ return -1;
    }
};

//# sourceMappingURL=helpers.js.map