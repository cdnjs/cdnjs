import * as React from 'react';
import { CustomSelectOption } from '../CustomSelectOption/CustomSelectOption';
export const DEFAULT_SELECTED_BEHAVIOR = 'highlight';
export const DEFAULT_EMPTY_TEXT = 'Ничего не найдено';
export const FOCUS_ACTION_NEXT = 'next';
export const FOCUS_ACTION_PREV = 'prev';
export const renderOptionDefault = (props)=>/*#__PURE__*/ React.createElement(CustomSelectOption, props);
export const isCreateNewOptionPreset = (option)=>option && 'actionText' in option;
export const isEmptyOptionPreset = (option)=>option && 'placeholder' in option;
export const isNotServicePreset = (option)=>!isCreateNewOptionPreset(option) && !isEmptyOptionPreset(option);

//# sourceMappingURL=constants.js.map