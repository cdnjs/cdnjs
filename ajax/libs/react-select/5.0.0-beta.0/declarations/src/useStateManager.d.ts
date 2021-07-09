import { GroupBase, OptionBase, PropsValue } from './types';
import { PublicBaseSelectProps } from './Select';
declare type StateManagedPropKeys = 'inputValue' | 'menuIsOpen' | 'onChange' | 'onInputChange' | 'onMenuClose' | 'onMenuOpen' | 'value';
declare type SelectPropsWithOptionalStateManagedProps<Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>> = Omit<PublicBaseSelectProps<Option, IsMulti, Group>, StateManagedPropKeys> & Partial<PublicBaseSelectProps<Option, IsMulti, Group>>;
export interface StateManagerAdditionalProps<Option extends OptionBase> {
    defaultInputValue?: string;
    defaultMenuIsOpen?: boolean;
    defaultValue?: PropsValue<Option>;
}
export declare type StateManagerProps<Option extends OptionBase = OptionBase, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> = SelectPropsWithOptionalStateManagedProps<Option, IsMulti, Group> & StateManagerAdditionalProps<Option>;
export default function useStateManager<Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>, AdditionalProps>({ defaultInputValue, defaultMenuIsOpen, defaultValue, inputValue: propsInputValue, menuIsOpen: propsMenuIsOpen, onChange: propsOnChange, onInputChange: propsOnInputChange, onMenuClose: propsOnMenuClose, onMenuOpen: propsOnMenuOpen, value: propsValue, ...restSelectProps }: StateManagerProps<Option, IsMulti, Group> & AdditionalProps): PublicBaseSelectProps<Option, IsMulti, Group> & Omit<AdditionalProps, keyof StateManagerAdditionalProps<Option> | StateManagedPropKeys>;
export {};
