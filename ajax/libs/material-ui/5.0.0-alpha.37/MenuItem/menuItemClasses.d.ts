export interface MenuItemClasses {
    /** Styles applied to the root element. */
    root: string;
    /** Styles applied to the root element unless `disableGutters={true}`. */
    gutters: string;
    /** Styles applied to the root element if `selected={true}`. */
    selected: string;
    /** Styles applied to the root element if dense. */
    dense: string;
}
export declare type MenuItemClassKey = keyof MenuItemClasses;
export declare function getMenuItemUtilityClass(slot: string): string;
declare const menuItemClasses: MenuItemClasses;
export default menuItemClasses;
