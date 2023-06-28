/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase } from '../types';
import { Props } from '../Select';
interface MultiValueComponents<Option, IsMulti extends boolean, Group extends GroupBase<Option>> {
    Container: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
    Label: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
    Remove: ComponentType<MultiValueRemoveProps<Option, IsMulti, Group>>;
}
export interface MultiValueProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    children: ReactNode;
    components: MultiValueComponents<Option, IsMulti, Group>;
    cropWithEllipsis?: boolean;
    data: Option;
    innerProps: JSX.IntrinsicElements['div'];
    isFocused: boolean;
    isDisabled: boolean;
    removeProps: JSX.IntrinsicElements['div'];
    index: number;
}
export declare const multiValueCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing, borderRadius, colors }, }: MultiValueProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export declare const multiValueLabelCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { borderRadius, colors }, cropWithEllipsis, }: MultiValueProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export declare const multiValueRemoveCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing, borderRadius, colors }, isFocused, }: MultiValueProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export interface MultiValueGenericProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> {
    children: ReactNode;
    data: any;
    innerProps: {
        className?: string;
    };
    selectProps: Props<Option, IsMulti, Group>;
}
export declare const MultiValueGeneric: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, }: MultiValueGenericProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const MultiValueContainer: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, }: MultiValueGenericProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const MultiValueLabel: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, }: MultiValueGenericProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export interface MultiValueRemoveProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> {
    children?: ReactNode;
    data: Option;
    innerProps: JSX.IntrinsicElements['div'];
    selectProps: Props<Option, IsMulti, Group>;
}
export declare function MultiValueRemove<Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps }: MultiValueRemoveProps<Option, IsMulti, Group>): jsx.JSX.Element;
declare const MultiValue: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MultiValueProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default MultiValue;
