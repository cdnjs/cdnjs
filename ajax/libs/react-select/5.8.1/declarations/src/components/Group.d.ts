/** @jsx jsx */
import { ComponentType, ReactNode } from 'react';
import { jsx } from '@emotion/react';
import { CommonProps, CommonPropsAndClassName, CSSObjectWithLabel, CX, GetStyles, GroupBase, Options, Theme } from '../types';
import { Props } from '../Select';
export interface ForwardedHeadingProps<Option, Group extends GroupBase<Option>> {
    id: string;
    data: Group;
}
export interface GroupProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered. */
    children: ReactNode;
    /** Component to wrap the label, receives headingProps. */
    Heading: ComponentType<GroupHeadingProps<Option, IsMulti, Group>>;
    /** Props to pass to Heading. */
    headingProps: ForwardedHeadingProps<Option, Group>;
    /** Props to be passed to the group element. */
    innerProps: JSX.IntrinsicElements['div'];
    /** Label to be displayed in the heading component. */
    label: ReactNode;
    /** The data of the group. */
    data: Group;
    options: Options<Option>;
}
export declare const groupCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing } }: GroupProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
declare const Group: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: GroupProps<Option, IsMulti, Group>) => jsx.JSX.Element;
interface GroupHeadingPropsDefinedProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends ForwardedHeadingProps<Option, Group> {
    className?: string | undefined;
    selectProps: Props<Option, IsMulti, Group>;
    theme: Theme;
    getStyles: GetStyles<Option, IsMulti, Group>;
    getClassNames: CommonProps<Option, IsMulti, Group>['getClassNames'];
    cx: CX;
}
export declare type GroupHeadingProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> = GroupHeadingPropsDefinedProps<Option, IsMulti, Group> & JSX.IntrinsicElements['div'];
export declare const groupHeadingCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { colors, spacing } }: GroupHeadingProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export declare const GroupHeading: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: GroupHeadingProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Group;
