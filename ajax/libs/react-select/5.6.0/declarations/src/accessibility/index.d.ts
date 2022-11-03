import type { AriaAttributes } from 'react';
import { ActionMeta, GroupBase, InitialInputFocusedActionMeta, OnChangeValue, Options, OptionsOrGroups } from '../types';
export declare type OptionContext = 'menu' | 'value';
export declare type GuidanceContext = 'menu' | 'input' | 'value';
export declare type AriaSelection<Option, IsMulti extends boolean> = InitialInputFocusedActionMeta<Option, IsMulti> | (ActionMeta<Option> & {
    value: OnChangeValue<Option, IsMulti>;
    option?: Option;
    options?: Options<Option>;
});
export interface AriaGuidanceProps {
    /** String value of selectProp aria-label */
    'aria-label': AriaAttributes['aria-label'];
    /** String indicating user's current context and available keyboard interactivity */
    context: GuidanceContext;
    /** Boolean value of selectProp isSearchable */
    isSearchable: boolean;
    /** Boolean value of selectProp isMulti */
    isMulti: boolean;
    /** Boolean value of selectProp isDisabled */
    isDisabled: boolean | null;
    /** Boolean value of selectProp tabSelectsValue */
    tabSelectsValue: boolean;
}
export declare type AriaOnChangeProps<Option, IsMulti extends boolean> = AriaSelection<Option, IsMulti> & {
    /** String derived label from selected or removed option/value */
    label: string;
    /** Array of labels derived from multiple selected or cleared options */
    labels: string[];
    /** Boolean indicating if the selected menu option is disabled */
    isDisabled: boolean | null;
};
export interface AriaOnFilterProps {
    /** String indicating current inputValue of the input */
    inputValue: string;
    /** String derived from selectProp screenReaderStatus */
    resultsMessage: string;
}
export interface AriaOnFocusProps<Option, Group extends GroupBase<Option>> {
    /** String indicating whether the option was focused in the menu or as (multi-) value */
    context: OptionContext;
    /** Option that is being focused */
    focused: Option;
    /** Boolean indicating whether focused menu option has been disabled */
    isDisabled: boolean;
    /** Boolean indicating whether focused menu option is an already selected option */
    isSelected: boolean;
    /** String derived label from focused option/value */
    label: string;
    /** Options provided as props to Select used to determine indexing */
    options: OptionsOrGroups<Option, Group>;
    /** selected option(s) of the Select */
    selectValue: Options<Option>;
}
export declare type AriaGuidance = (props: AriaGuidanceProps) => string;
export declare type AriaOnChange<Option, IsMulti extends boolean> = (props: AriaOnChangeProps<Option, IsMulti>) => string;
export declare type AriaOnFilter = (props: AriaOnFilterProps) => string;
export declare type AriaOnFocus<Option, Group extends GroupBase<Option> = GroupBase<Option>> = (props: AriaOnFocusProps<Option, Group>) => string;
export interface AriaLiveMessages<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    /** Guidance message used to convey component state and specific keyboard interactivity */
    guidance?: (props: AriaGuidanceProps) => string;
    /** OnChange message used to convey changes to value but also called when user selects disabled option */
    onChange?: (props: AriaOnChangeProps<Option, IsMulti>) => string;
    /** OnFilter message used to convey information about filtered results displayed in the menu */
    onFilter?: (props: AriaOnFilterProps) => string;
    /** OnFocus message used to convey information about the currently focused option or value */
    onFocus?: (props: AriaOnFocusProps<Option, Group>) => string;
}
export declare const defaultAriaLiveMessages: {
    guidance: (props: AriaGuidanceProps) => string;
    onChange: <Option, IsMulti extends boolean>(props: AriaOnChangeProps<Option, IsMulti>) => string;
    onFocus: <Option_1, Group extends GroupBase<Option_1>>(props: AriaOnFocusProps<Option_1, Group>) => string;
    onFilter: (props: AriaOnFilterProps) => string;
};
