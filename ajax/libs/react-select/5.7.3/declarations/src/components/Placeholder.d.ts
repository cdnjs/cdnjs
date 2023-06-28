/** @jsx jsx */
import { ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonPropsAndClassName, CSSObjectWithLabel, GroupBase } from '../types';
export interface PlaceholderProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered. */
    children: ReactNode;
    /** props passed to the wrapping element for the group. */
    innerProps: JSX.IntrinsicElements['div'];
    isDisabled: boolean;
    isFocused: boolean;
}
export declare const placeholderCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing, colors } }: PlaceholderProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
declare const Placeholder: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: PlaceholderProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Placeholder;
