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
const isInputValueEmpty = (value)=>value === _constants.DEFAULT_INPUT_VALUE;
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
    switch(navigateTo){
        case 'first':
            return 0;
        case 'prev':
            return currentIndex - 1;
        case 'next':
            return currentIndex + 1;
        case 'last':
            return length - 1;
        default:
            return -1;
    }
};

//# sourceMappingURL=helpers.js.map