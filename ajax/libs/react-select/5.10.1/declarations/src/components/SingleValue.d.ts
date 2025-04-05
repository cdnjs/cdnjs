/** @jsx jsx */
import { JSX, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase } from '../types';
export interface SingleValueProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered. */
    children: ReactNode;
    /** The data of the selected option rendered in the Single Value component. */
    data: Option;
    /** Props passed to the wrapping element for the group. */
    innerProps: JSX.IntrinsicElements['div'];
    /** Whether this is disabled. */
    isDisabled: boolean;
}
export declare const css: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ isDisabled, theme: { spacing, colors }, }: SingleValueProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
declare const SingleValue: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: SingleValueProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default SingleValue;
