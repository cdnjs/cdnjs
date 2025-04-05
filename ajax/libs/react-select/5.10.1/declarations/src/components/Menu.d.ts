/** @jsx jsx */
import { JSX, ReactElement, ReactNode, Ref } from 'react';
import { jsx } from '@emotion/react';
import { MenuPlacement, MenuPosition, CommonProps, GroupBase, CommonPropsAndClassName, CoercedMenuPlacement, CSSObjectWithLabel } from '../types';
interface CalculatedMenuPlacementAndHeight {
    placement: CoercedMenuPlacement;
    maxHeight: number;
}
interface PlacementArgs {
    maxHeight: number;
    menuEl: HTMLDivElement | null;
    minHeight: number;
    placement: MenuPlacement;
    shouldScroll: boolean;
    isFixedPosition: boolean;
    controlHeight: number;
}
export declare function getMenuPlacement({ maxHeight: preferredMaxHeight, menuEl, minHeight, placement: preferredPlacement, shouldScroll, isFixedPosition, controlHeight, }: PlacementArgs): CalculatedMenuPlacementAndHeight;
export interface MenuPlacementProps {
    /** Set the minimum height of the menu. */
    minMenuHeight: number;
    /** Set the maximum height of the menu. */
    maxMenuHeight: number;
    /** Set whether the menu should be at the top, at the bottom. The auto options sets it to bottom. */
    menuPlacement: MenuPlacement;
    /** The CSS position value of the menu, when "fixed" extra layout management is required */
    menuPosition: MenuPosition;
    /** Set whether the page should scroll to show the menu. */
    menuShouldScrollIntoView: boolean;
}
export interface MenuProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group>, MenuPlacementProps {
    /** Reference to the internal element, consumed by the MenuPlacer component */
    innerRef: Ref<HTMLDivElement>;
    innerProps: JSX.IntrinsicElements['div'];
    isLoading: boolean;
    placement: CoercedMenuPlacement;
    /** The children to be rendered. */
    children: ReactNode;
}
interface PlacerProps {
    placement: CoercedMenuPlacement;
    maxHeight: number;
}
interface ChildrenProps {
    ref: Ref<HTMLDivElement>;
    placerProps: PlacerProps;
}
export interface MenuPlacerProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends CommonProps<Option, IsMulti, Group>, MenuPlacementProps {
    /** The children to be rendered. */
    children: (childrenProps: ChildrenProps) => ReactElement;
}
export declare const menuCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ placement, theme: { borderRadius, spacing, colors }, }: MenuProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export declare const MenuPlacer: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuPlacerProps<Option, IsMulti, Group>) => ReactElement<any, string | import("react").JSXElementConstructor<any>>;
declare const Menu: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Menu;
export interface MenuListProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** Set the max height of the Menu component  */
    maxHeight: number;
    /** The children to be rendered. */
    children: ReactNode;
    /** Inner ref to DOM ReactNode */
    innerRef: Ref<HTMLDivElement>;
    /** The currently focused option */
    focusedOption: Option;
    /** Props to be passed to the menu-list wrapper. */
    innerProps: JSX.IntrinsicElements['div'];
}
export declare const menuListCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ maxHeight, theme: { spacing: { baseUnit }, }, }: MenuListProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export declare const MenuList: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuListProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const noOptionsMessageCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing: { baseUnit }, colors, }, }: NoticeProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export declare const loadingMessageCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing: { baseUnit }, colors, }, }: NoticeProps<Option, IsMulti, Group>, unstyled: boolean) => CSSObjectWithLabel;
export interface NoticeProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered. */
    children: ReactNode;
    /** Props to be passed on to the wrapper. */
    innerProps: JSX.IntrinsicElements['div'];
}
export declare const NoOptionsMessage: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, ...restProps }: NoticeProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const LoadingMessage: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ children, innerProps, ...restProps }: NoticeProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export interface MenuPortalProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    appendTo: HTMLElement | undefined;
    children: ReactNode;
    controlElement: HTMLDivElement | null;
    innerProps: JSX.IntrinsicElements['div'];
    menuPlacement: MenuPlacement;
    menuPosition: MenuPosition;
}
export interface PortalStyleArgs {
    offset: number;
    position: MenuPosition;
    rect: {
        left: number;
        width: number;
    };
}
export declare const menuPortalCSS: ({ rect, offset, position, }: PortalStyleArgs) => CSSObjectWithLabel;
export declare const MenuPortal: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuPortalProps<Option, IsMulti, Group>) => jsx.JSX.Element | null;
