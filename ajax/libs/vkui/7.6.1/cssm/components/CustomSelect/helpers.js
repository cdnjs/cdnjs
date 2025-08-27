import { getTextFromChildren } from "../../lib/children.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { NOT_SELECTED } from "../NativeSelect/NativeSelect.js";
export const findIndexAfter = (options = [], startIndex = -1)=>{
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex((option, i)=>i > startIndex && !option.disabled);
};
export const findIndexBefore = (options = [], endIndex = options.length)=>{
    let result = -1;
    if (endIndex <= 0) {
        return result;
    }
    for(let i = endIndex - 1; i >= 0; i--){
        let option = options[i];
        if (!option.disabled) {
            result = i;
            break;
        }
    }
    return result;
};
const warn = warnOnce('CustomSelect');
export const checkOptionsValueType = (options)=>{
    if (new Set(options.map((item)=>typeof item.value)).size > 1) {
        warn('Некоторые значения ваших опций имеют разные типы. onChange всегда возвращает строковый тип.', 'error');
    }
};
export const checkMixControlledAndUncontrolledState = (oldIsControlled, newIsControlled)=>{
    if (!oldIsControlled && newIsControlled) {
        warn(`Похоже, что компонент был переведен из состояния Uncontrolled в Controlled. Пожалуйста, не делайте так. Если вам нужно отобразить невыбранное состояние компонента, используйте value=null вместо undefined`, 'error');
    }
    if (oldIsControlled && !newIsControlled) {
        warn(`Похоже, что компонент был переведен из состояния Controlled в Uncontrolled. Пожалуйста, не делайте так. Если вам нужно отобразить невыбранное состояние компонента, используйте value=null вместо undefined`, 'error');
    }
};
export function findSelectedIndex(options = [], value) {
    if (value === NOT_SELECTED.CUSTOM) {
        return -1;
    }
    return options.findIndex((item)=>{
        value = typeof item.value === 'number' ? Number(value) : value;
        return item.value === value;
    }) ?? -1;
}
export function getOptionByValue(options = [], value) {
    const index = findSelectedIndex(options, value);
    if (index === -1) {
        return null;
    }
    return options[index];
}
export const filter = (options, inputValue, filterFn)=>{
    return typeof filterFn === 'function' ? options.filter((option)=>filterFn(inputValue, option)) : options;
};
export function calculateInputValueFromOptions(options = [], selectValue) {
    const selectedOption = getOptionByValue(options, selectValue);
    return selectedOption ? getTextFromChildren(selectedOption.label) : '';
}

//# sourceMappingURL=helpers.js.map