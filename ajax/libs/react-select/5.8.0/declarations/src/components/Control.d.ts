/** @jsx jsx */
import { ReactNode, Ref } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase } from '../types';
export interface ControlProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
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
export declare const css: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isDisabled, isFocused, theme: { colors, borderRadius, spacing }, }: ControlProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
declare const Control: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: ControlProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Control;
