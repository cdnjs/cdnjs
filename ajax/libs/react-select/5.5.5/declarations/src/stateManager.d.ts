import { ReactElement, RefAttributes } from 'react';
import { GroupBase } from './types';
import Select from './Select';
import type { StateManagerProps } from './useStateManager';
export type { StateManagerProps };
declare type StateManagedSelect = <Option = unknown, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: StateManagerProps<Option, IsMulti, Group> & RefAttributes<Select<Option, IsMulti, Group>>) => ReactElement;
declare const StateManagedSelect: StateManagedSelect;
export default StateManagedSelect;
