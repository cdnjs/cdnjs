/** @jsx jsx */
import { InputHTMLAttributes } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase } from '../types';
export interface InputSpecificProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends InputHTMLAttributes<HTMLInputElement>, CommonPropsAndClassName<Option, IsMulti, Group> {
    /** Reference to the internal element */
    innerRef?: (instance: HTMLInputElement | null) => void;
    /** Set whether the input should be visible. Does not affect input size. */
    isHidden: boolean;
    /** Whether the input is disabled */
    isDisabled?: boolean;
    /** The ID of the form that the input belongs to */
    form?: string;
    /** Set className for the input element */
    inputClassName?: string;
}
export declare type InputProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> = InputSpecificProps<Option, IsMulti, Group>;
export declare const inputCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isDisabled, theme: { spacing, colors }, }: InputProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
declare const Input: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: InputProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Input;
