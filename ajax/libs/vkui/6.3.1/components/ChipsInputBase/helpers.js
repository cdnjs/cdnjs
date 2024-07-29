import { DEFAULT_INPUT_VALUE } from './constants';
/**
 * @private
 */ export const isValueLikeChipOptionObject = (v)=>typeof v === 'object' && 'value' in v;
/**
 * @private
 */ export const isInputValueEmpty = (input)=>input ? input.value === DEFAULT_INPUT_VALUE : true;
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