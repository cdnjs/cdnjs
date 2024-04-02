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
    DEFAULT_EMPTY_TEXT: function() {
        return DEFAULT_EMPTY_TEXT;
    },
    DEFAULT_SELECTED_BEHAVIOR: function() {
        return DEFAULT_SELECTED_BEHAVIOR;
    },
    FOCUS_ACTION_NEXT: function() {
        return FOCUS_ACTION_NEXT;
    },
    FOCUS_ACTION_PREV: function() {
        return FOCUS_ACTION_PREV;
    },
    isCreateNewOptionPreset: function() {
        return isCreateNewOptionPreset;
    },
    isEmptyOptionPreset: function() {
        return isEmptyOptionPreset;
    },
    isNotServicePreset: function() {
        return isNotServicePreset;
    },
    renderOptionDefault: function() {
        return renderOptionDefault;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _CustomSelectOption = require("../CustomSelectOption/CustomSelectOption");
const DEFAULT_SELECTED_BEHAVIOR = 'highlight';
const DEFAULT_EMPTY_TEXT = 'Ничего не найдено';
const FOCUS_ACTION_NEXT = 'next';
const FOCUS_ACTION_PREV = 'prev';
const renderOptionDefault = (props)=>/*#__PURE__*/ _react.createElement(_CustomSelectOption.CustomSelectOption, props);
const isCreateNewOptionPreset = (option)=>option && 'actionText' in option;
const isEmptyOptionPreset = (option)=>option && 'placeholder' in option;
const isNotServicePreset = (option)=>!isCreateNewOptionPreset(option) && !isEmptyOptionPreset(option);

//# sourceMappingURL=constants.js.map