import { GroupBase } from './types';
export declare const formatGroupLabel: <Option, Group extends GroupBase<Option>>(group: Group) => string;
export declare const getOptionLabel: <Option>(option: Option) => string;
export declare const getOptionValue: <Option>(option: Option) => string;
export declare const isOptionDisabled: <Option>(option: Option) => boolean;
