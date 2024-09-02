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
    calculateInputValueFromOptions: function() {
        return calculateInputValueFromOptions;
    },
    defaultRenderOptionFn: function() {
        return defaultRenderOptionFn;
    },
    findIndexAfter: function() {
        return findIndexAfter;
    },
    findIndexBefore: function() {
        return findIndexBefore;
    },
    findSelectedIndex: function() {
        return findSelectedIndex;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _children = require("../../lib/children");
const _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
const findIndexAfter = (options = [], startIndex = -1)=>{
    if (startIndex >= options.length - 1) {
        return -1;
    }
    return options.findIndex((option, i)=>i > startIndex && !option.disabled);
};
const findIndexBefore = (options = [], endIndex = options.length)=>{
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
function findSelectedIndex(options = [], value, withClear) {
    if (withClear && value === '') {
        return -1;
    }
    var _options_findIndex;
    return (_options_findIndex = options.findIndex((item)=>{
        value = typeof item.value === 'number' ? Number(value) : value;
        return item.value === value;
    })) !== null && _options_findIndex !== void 0 ? _options_findIndex : -1;
}
function calculateInputValueFromOptions(options = [], selectValue) {
    const selectedOption = options.find((option)=>option.value === selectValue);
    return selectedOption ? (0, _children.getTextFromChildren)(selectedOption.label) : '';
}
function defaultRenderOptionFn(_param) {
    var { option } = _param, props = _object_without_properties._(_param, [
        "option"
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_CustomSelectOption.CustomSelectOption, _object_spread._({}, props));
}

//# sourceMappingURL=helpers.js.map