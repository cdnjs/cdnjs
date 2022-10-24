/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase } from '../types';
export declare type CrossIconProps = JSX.IntrinsicElements['svg'] & {
    size?: number;
};
export declare const CrossIcon: (props: CrossIconProps) => jsx.JSX.Element;
export declare type DownChevronProps = JSX.IntrinsicElements['svg'] & {
    size?: number;
};
export declare const DownChevron: (props: DownChevronProps) => jsx.JSX.Element;
export interface DropdownIndicatorProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered inside the indicator. */
    children?: ReactNode;
    /** Props that will be passed on to the children. */
    innerProps: JSX.IntrinsicElements['div'];
    /** The focused state of the select. */
    isFocused: boolean;
    isDisabled: boolean;
}
export declare const dropdownIndicatorCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isFocused, theme: { spacing: { baseUnit }, colors, }, }: DropdownIndicatorProps<Option, IsMulti, Group> | ClearIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const DropdownIndicator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: DropdownIndicatorProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export interface ClearIndicatorProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered inside the indicator. */
    children?: ReactNode;
    /** Props that will be passed on to the children. */
    innerProps: JSX.IntrinsicElements['div'];
    /** The focused state of the select. */
    isFocused: boolean;
}
export declare const clearIndicatorCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isFocused, theme: { spacing: { baseUnit }, colors, }, }: DropdownIndicatorProps<Option, IsMulti, Group> | ClearIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const ClearIndicator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ClearIndicatorProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export interface IndicatorSeparatorProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    isDisabled: boolean;
    isFocused: boolean;
    innerProps?: JSX.IntrinsicElements['span'];
}
export declare const indicatorSeparatorCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isDisabled, theme: { spacing: { baseUnit }, colors, }, }: IndicatorSeparatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const IndicatorSeparator: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: IndicatorSeparatorProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const loadingIndicatorCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isFocused, size, theme: { colors, spacing: { baseUnit }, }, }: LoadingIndicatorProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export interface LoadingIndicatorProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** Props that will be passed on to the children. */
    innerProps: JSX.IntrinsicElements['div'];
    /** The focused state of the select. */
    isFocused: boolean;
    isDisabled: boolean;
    /** Set size of the container. */
    size: number;
}
export declare const LoadingIndicator: {
    <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: LoadingIndicatorProps<Option, IsMulti, Group>): jsx.JSX.Element;
    defaultProps: {
        size: number;
    };
};
