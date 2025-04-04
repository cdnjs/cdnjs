import { ReactNode } from 'react';
import { PublicBaseSelectProps } from './Select';
import { GetOptionLabel, GetOptionValue, GroupBase, Options, OptionsOrGroups } from './types';
export interface Accessors<Option> {
    getOptionValue: GetOptionValue<Option>;
    getOptionLabel: GetOptionLabel<Option>;
}
export interface CreatableAdditionalProps<Option, Group extends GroupBase<Option>> {
    /**
     * Allow options to be created while the `isLoading` prop is true. Useful to
     * prevent the "create new ..." option being displayed while async results are
     * still being loaded.
     */
    allowCreateWhileLoading?: boolean;
    /** Sets the position of the createOption element in your options list. Defaults to 'last' */
    createOptionPosition?: 'first' | 'last';
    /**
     * Gets the label for the "create new ..." option in the menu. Is given the
     * current input value.
     */
    formatCreateLabel?: (inputValue: string) => ReactNode;
    /**
     * Determines whether the "create new ..." option should be displayed based on
     * the current input value, select value and options array.
     */
    isValidNewOption?: (inputValue: string, value: Options<Option>, options: OptionsOrGroups<Option, Group>, accessors: Accessors<Option>) => boolean;
    /**
     * Returns the data for the new option when it is created. Used to display the
     * value, and is passed to `onChange`.
     */
    getNewOptionData?: (inputValue: string, optionLabel: ReactNode) => Option;
    /**
     * If provided, this will be called with the input value when a new option is
     * created, and `onChange` will **not** be called. Use this when you need more
     * control over what happens when new options are created.
     */
    onCreateOption?: (inputValue: string) => void;
}
declare type BaseCreatableProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = PublicBaseSelectProps<Option, IsMulti, Group> & CreatableAdditionalProps<Option, Group>;
export default function useCreatable<Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ allowCreateWhileLoading, createOptionPosition, formatCreateLabel, isValidNewOption, getNewOptionData, onCreateOption, options: propsOptions, onChange: propsOnChange, ...restSelectProps }: BaseCreatableProps<Option, IsMulti, Group>): PublicBaseSelectProps<Option, IsMulti, Group>;
export {};
