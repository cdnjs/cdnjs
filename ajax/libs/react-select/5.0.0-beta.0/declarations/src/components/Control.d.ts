/** @jsx jsx */
import { ReactNode, Ref } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase, OptionBase } from '../types';
export interface ControlProps<Option extends OptionBase = OptionBase, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** Children to render. */
    children: ReactNode;
    innerRef: Ref<HTMLDivElement>;
    /** The mouse down event and the innerRef to pass down to the controller element. */
    innerProps: JSX.IntrinsicElements['div'];
    /** Whether the select is disabled. */
    isDisabled: boolean;
    /** Whether the select is focused. */
    isFocused: boolean;
    /** Whether the select is expanded. */
    menuIsOpen: boolean;
}
export declare const css: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ isDisabled, isFocused, theme: { colors, borderRadius, spacing }, }: ControlProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
declare const Control: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ControlProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Control;
