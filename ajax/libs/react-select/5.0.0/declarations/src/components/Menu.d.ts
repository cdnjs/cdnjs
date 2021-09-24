/** @jsx jsx */
import { Component, ReactNode, RefCallback, ContextType } from 'react';
import { jsx } from '@emotion/react';
import { RectType } from '../utils';
import { MenuPlacement, MenuPosition, CommonProps, Theme, GroupBase, CommonPropsAndClassName, CoercedMenuPlacement, CSSObjectWithLabel } from '../types';
interface MenuState {
    placement: CoercedMenuPlacement | null;
    maxHeight: number;
}
interface PlacementArgs {
    maxHeight: number;
    menuEl: HTMLDivElement | null;
    minHeight: number;
    placement: MenuPlacement;
    shouldScroll: boolean;
    isFixedPosition: boolean;
    theme: Theme;
}
export declare function getMenuPlacement({ maxHeight, menuEl, minHeight, placement, shouldScroll, isFixedPosition, theme, }: PlacementArgs): MenuState;
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
    innerRef: RefCallback<HTMLDivElement>;
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
    ref: RefCallback<HTMLDivElement>;
    placerProps: PlacerProps;
}
export interface MenuPlacerProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends CommonProps<Option, IsMulti, Group>, MenuPlacementProps {
    /** The children to be rendered. */
    children: (childrenProps: ChildrenProps) => ReactNode;
}
export declare const menuCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ placement, theme: { borderRadius, spacing, colors }, }: MenuProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
declare const PortalPlacementContext: import("react").Context<{
    getPortalPlacement: ((menuState: MenuState) => void) | null;
}>;
export declare class MenuPlacer<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends Component<MenuPlacerProps<Option, IsMulti, Group>, MenuState> {
    state: MenuState;
    static contextType: import("react").Context<{
        getPortalPlacement: ((menuState: MenuState) => void) | null;
    }>;
    context: ContextType<typeof PortalPlacementContext>;
    getPlacement: RefCallback<HTMLDivElement>;
    getUpdatedProps: () => {
        placement: CoercedMenuPlacement;
        maxHeight: number;
        children: ((childrenProps: ChildrenProps) => ReactNode) & ReactNode;
        clearValue: () => void;
        cx: import("../types").CX;
        getStyles: import("../types").GetStyles<Option, IsMulti, Group>;
        getValue: () => import("../types").Options<Option>;
        hasValue: boolean;
        isMulti: boolean;
        isRtl: boolean;
        options: import("../types").OptionsOrGroups<Option, Group>;
        selectOption: (newValue: Option) => void;
        selectProps: import("../Select").Props<Option, IsMulti, Group>;
        setValue: (newValue: import("../types").OnChangeValue<Option, IsMulti>, action: import("../types").SetValueAction, option: Option) => void;
        theme: Theme;
        minMenuHeight: number;
        maxMenuHeight: number;
        menuPlacement: MenuPlacement;
        menuPosition: MenuPosition;
        menuShouldScrollIntoView: boolean;
    };
    render(): ReactNode;
}
declare const Menu: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export default Menu;
export interface MenuListProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** Set the max height of the Menu component  */
    maxHeight: number;
    /** The children to be rendered. */
    children: ReactNode;
    /** Inner ref to DOM ReactNode */
    innerRef: RefCallback<HTMLDivElement>;
    /** The currently focused option */
    focusedOption: Option;
    /** Props to be passed to the menu-list wrapper. */
    innerProps: JSX.IntrinsicElements['div'];
}
export declare const menuListCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ maxHeight, theme: { spacing: { baseUnit }, }, }: MenuListProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const MenuList: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: MenuListProps<Option, IsMulti, Group>) => jsx.JSX.Element;
export declare const noOptionsMessageCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing: { baseUnit }, colors, }, }: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export declare const loadingMessageCSS: <Option, IsMulti extends boolean, Group extends GroupBase<Option>>({ theme: { spacing: { baseUnit }, colors, }, }: NoticeProps<Option, IsMulti, Group>) => CSSObjectWithLabel;
export interface NoticeProps<Option = unknown, IsMulti extends boolean = boolean, Group extends GroupBase<Option> = GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    /** The children to be rendered. */
    children: ReactNode;
    /** Props to be passed on to the wrapper. */
    innerProps: JSX.IntrinsicElements['div'];
}
export declare const NoOptionsMessage: {
    <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: NoticeProps<Option, IsMulti, Group>): jsx.JSX.Element;
    defaultProps: {
        children: string;
    };
};
export declare const LoadingMessage: {
    <Option, IsMulti extends boolean, Group extends GroupBase<Option>>(props: NoticeProps<Option, IsMulti, Group>): jsx.JSX.Element;
    defaultProps: {
        children: string;
    };
};
export interface MenuPortalProps<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends CommonPropsAndClassName<Option, IsMulti, Group> {
    appendTo: HTMLElement | undefined;
    children: ReactNode;
    controlElement: HTMLDivElement | null;
    innerProps: JSX.IntrinsicElements['div'];
    menuPlacement: MenuPlacement;
    menuPosition: MenuPosition;
}
interface MenuPortalState {
    placement: 'bottom' | 'top' | null;
}
export interface PortalStyleArgs {
    offset: number;
    position: MenuPosition;
    rect: RectType;
}
export declare const menuPortalCSS: ({ rect, offset, position, }: PortalStyleArgs) => CSSObjectWithLabel;
export declare class MenuPortal<Option, IsMulti extends boolean, Group extends GroupBase<Option>> extends Component<MenuPortalProps<Option, IsMulti, Group>, MenuPortalState> {
    state: MenuPortalState;
    getPortalPlacement: ({ placement }: MenuState) => void;
    render(): jsx.JSX.Element | null;
}
