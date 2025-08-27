import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import { CustomSelectOption } from "../CustomSelectOption/CustomSelectOption.js";
export const DEFAULT_SELECTED_BEHAVIOR = 'highlight';
export const DEFAULT_EMPTY_TEXT = 'Ничего не найдено';
export const FOCUS_ACTION_NEXT = 'next';
export const FOCUS_ACTION_PREV = 'prev';
export const renderOptionDefault = (props)=>/*#__PURE__*/ _jsx(CustomSelectOption, _object_spread({}, props));
export const isCreateNewOptionPreset = (option)=>option && 'actionText' in option;
export const isEmptyOptionPreset = (option)=>option && 'placeholder' in option;
export const isNotServicePreset = (option)=>!isCreateNewOptionPreset(option) && !isEmptyOptionPreset(option);

//# sourceMappingURL=constants.js.map