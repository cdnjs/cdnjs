/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase, OptionBase } from '../types';
import { Props } from '../Select';
interface MultiValueComponents<Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>> {
    Container: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
    Label: ComponentType<MultiValueGenericProps<Option, IsMulti, Group>>;
    Remove: ComponentType<MultiValueRemoveProps<Option, IsMulti, Group>>;
}
export interface MultiValueProps<Option extends OptionBase = OptionBase, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    children: ReactNode;
    components: MultiValueComponents<Option, IsMulti, Group>;
    cropWithEllipsis?: boolean;
    data: Option;
    innerProps: JSX.IntrinsicElements['div'];
    isFocused: boolean;
    isDisabled: boolean;
    removeProps: JSX.IntrinsicElements['div'];
}
export declare const multiValueCSS: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing, borderRadius, colors }, }: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const multiValueLabelCSS: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { borderRadius, colors }, cropWithEllipsis, }: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const multiValueRemoveCSS: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing, borderRadius, colors }, isFocused, }: MultiValueProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export interface MultiValueGenericProps<Option extends OptionBase = OptionBase, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> {
    children: ReactNode;
    data: any;
    innerProps: {
        className?: string;
    };
    selectProps: Props<Option, IsMulti, Group>;
}
export declare const MultiValueGeneric: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, }: MultiValueGenericProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const MultiValueContainer: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, }: MultiValueGenericProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const MultiValueLabel: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, }: MultiValueGenericProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export interface MultiValueRemoveProps<Option extends OptionBase = OptionBase, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> {
    children?: ReactNode;
    data: Option;
    innerProps: JSX.IntrinsicElements['div'];
    selectProps: Props<Option, IsMulti, Group>;
}
export declare function MultiValueRemove<Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps }: MultiValueRemoveProps<Option, IsMulti, Group>): jsx.JSX.Element;
declare const MultiValue: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MultiValueProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default MultiValue;
