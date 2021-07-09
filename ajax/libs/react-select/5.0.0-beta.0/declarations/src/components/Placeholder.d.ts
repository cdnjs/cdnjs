/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase, OptionBase } from '../types';
export interface PlaceholderProps<Option extends OptionBase = OptionBase, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered. */
    children: ReactNode;
    /** props passed to the wrapping element for the group. */
    innerProps: JSX.IntrinsicElements['div'];
    isDisabled: boolean;
    isFocused: boolean;
}
export declare const placeholderCSS: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing, colors }, }: PlaceholderProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
declare const Placeholder: <Option extends OptionBase, IsMulti extends boolean, Group extends GroupBase<Option>>(props: PlaceholderProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Placeholder;
