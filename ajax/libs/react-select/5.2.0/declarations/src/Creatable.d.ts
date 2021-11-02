import { ReactElement, RefAttributes } from 'react';
import Select from './Select';
import { GroupBase } from './types';
import { StateManagerProps } from './useStateManager';
import { CreatableAdditionalProps } from './useCreatable';
export declare type CreatableProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> = StateManagerProps<Option, IsMulti, Group> & CreatableAdditionalProps<Option, Group>;
declare type CreatableSelect = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: CreatableProps<Option, IsMulti, Group> & RefAttributes<Select<Option, IsMulti, Group>>) => ReactElement;
declare const CreatableSelect: CreatableSelect;
export default CreatableSelect;
