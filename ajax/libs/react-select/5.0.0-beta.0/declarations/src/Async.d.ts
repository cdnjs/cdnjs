import { ReactElement, RefAttributes } from 'react';
import Select from './Select';
import { OptionBase, GroupBase } from './types';
import type { AsyncProps } from './useAsync';
export type { AsyncProps };
declare type AsyncSelect = <Option extends OptionBase = OptionBase, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(props: AsyncProps<Option, IsMulti, Group> & RefAttributes<Select<Option, IsMulti, Group>>) => ReactElement;
declare const AsyncSelect: AsyncSelect;
export default AsyncSelect;
