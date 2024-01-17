import { DEFAULT_INPUT_VALUE } from './constants';
/**
 * @private
 */ export const isValueLikeChipOptionObject = (v)=>typeof v === 'object' && 'value' in v;
/**
 * @private
 */ export const isInputValueEmpty = (value)=>value === DEFAULT_INPUT_VALUE;
/**
 * @private
 */ export const getChipOptionIndexByValueProp = (optionProp, valueProp)=>{
    const value = isValueLikeChipOptionObject(optionProp) ? optionProp.value : optionProp;
    return valueProp.findIndex((option)=>option.value === value);
};
/**
 * @private
 */ export const getChipOptionIndexByHTMLElement = (el)=>{
    const value = el && el.dataset.index;
    return typeof value === 'string' ? Number(value) : -1;
};
/**
 * @private
 */ export const getChipOptionValueByHTMLElement = (el)=>{
    const value = el && el.dataset.value;
    return typeof value === 'string' ? value : -1;
};
/**
 * @private
 */ export const getNextChipOptionIndexByNavigateToProp = (currentIndex, navigateTo, length)=>{
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