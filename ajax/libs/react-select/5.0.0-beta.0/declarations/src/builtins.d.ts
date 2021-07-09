import { GroupBase, OptionBase } from './types';
export declare const formatGroupLabel: <Option extends OptionBase, Group extends GroupBase<Option>>(group: Group) => string;
export declare const getOptionLabel: <Option extends OptionBase>(option: Option) => string;
export declare const getOptionValue: <Option extends OptionBase>(option: Option) => string;
export declare const isOptionDisabled: <Option extends OptionBase>(option: Option) => boolean;
